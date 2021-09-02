import { Parser } from 'node-sql-parser';
import { isDateTime, isInteger, isVarchar } from '../../helpers/sqlHelper';
import { TableColumn } from '../../handlers/column/table-column';
import { ISqlParser } from './isql-parser';
import { TableIndex } from 'src/handlers/index/table-index';

export class SqlParser implements ISqlParser {
    private ast: any;
    private columnMap: Map<string, TableColumn>;
    private tableIndices: TableIndex[];

    constructor(sql: string) {
        const parser = new Parser();
        this.ast = parser.astify(sql);
    }

    public getColumns(): TableColumn[] {
        this.columnMap = new Map();
        const columnASTs = this.getColumnASTs();
        const constraintASTs = this.getConstraintASTs();

        for (const columnAST of columnASTs) {
            this.addToColumnMap(columnAST);
        }

        for (const constraintAST of constraintASTs) {
            this.updateColumnConstraint(constraintAST);
        }

        return Array.from(this.columnMap.values());
    }

    public getIndices(): TableIndex[] {
        this.tableIndices = [];
        const indexASTs = this.getIndexASTs();
        const constraintASTs = this.getConstraintASTs();

        for (const indexAST of indexASTs) {
            this.addToTableIndices(indexAST);
        }

        for (const constraintAST of constraintASTs) {
            this.addToTableUniqueIndices(constraintAST);
        }

        return this.tableIndices;
    }

    private getColumnASTs() {
        return this.ast.create_definitions.filter((definition) => definition.resource === 'column');
    }

    private getConstraintASTs() {
        return this.ast.create_definitions.filter((definition) => definition.resource === 'constraint');
    }

    private getIndexASTs() {
        return this.ast.create_definitions.filter((definition) => definition.resource === 'index');
    }

    private addToColumnMap(columnAST: any) {
        const typeormColumn: TableColumn = {
            name: columnAST.column.column,
            type: columnAST.definition.dataType.toLowerCase(),
        };

        // Set width for int type, and length for varchar type
        if (isInteger(typeormColumn.type)) typeormColumn.width = columnAST.definition.length;
        if (isVarchar(typeormColumn.type)) typeormColumn.length = columnAST.definition.length.toString();

        // Set unsigned property
        if (columnAST.definition.suffix?.includes('UNSIGNED')) typeormColumn.unsigned = true;

        // Set isNullable property
        if (columnAST.nullable == undefined) typeormColumn.isNullable = true;

        // Set isGenerated and generationStrategy property
        if (columnAST.auto_increment === 'auto_increment') {
            typeormColumn.isGenerated = true;
            typeormColumn.generationStrategy = 'increment';
        }

        // Set default property
        if (columnAST.default_val?.value?.value != undefined) {
            let defaultValue = columnAST.default_val.value.value.toUpperCase();
            if (isInteger(typeormColumn.type)) defaultValue = +defaultValue;
            if (isDateTime(typeormColumn.type) && defaultValue === 'CURRENT_TIMESTAMP') {
                defaultValue = defaultValue + '()';
            }

            typeormColumn.default = defaultValue;
        }

        // Set comment property
        if (columnAST.comment != undefined) typeormColumn.comment = columnAST.comment.value?.value;

        this.columnMap.set(typeormColumn.name, typeormColumn);
    }

    private updateColumnConstraint(constraintAST: any) {
        const typeormColumn = this.columnMap.get(constraintAST.definition[0]);

        if (constraintAST.constraint_type === 'primary key') {
            typeormColumn.isPrimary = true;
        }
    }

    private addToTableIndices(indexAST: any) {
        const tableName = this.ast.table[0].table;

        const tableIndex: TableIndex = {
            table: tableName,
            name: indexAST.index,
            columnNames: indexAST.definition.slice(),
        };

        this.tableIndices.push(tableIndex);
    }

    private addToTableUniqueIndices(constraintAST: any) {
        if (constraintAST.constraint_type === 'unique key') {
            const tableName = this.ast.table[0].table;

            const tableIndex: TableIndex = {
                table: tableName,
                name: constraintAST.index,
                isUnique: true,
                columnNames: constraintAST.definition.slice(),
            };

            this.tableIndices.push(tableIndex);
        }
    }
}
