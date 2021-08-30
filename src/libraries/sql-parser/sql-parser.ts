import { Parser } from 'node-sql-parser';
import { isDateTime, isInteger, isVarchar } from '../../helpers/sqlHelper';
import { TypeormColumn } from '../../handlers/column/interfaces';
import { ISqlParser } from './isql-parser';

export class SqlParser implements ISqlParser {
    private ast: any;

    constructor(sql: string) {
        const parser = new Parser();
        this.ast = parser.astify(sql);
    }

    public getColumns(): TypeormColumn[] {
        const columnMap: Map<string, TypeormColumn> = new Map();
        const columnASTs = this.getColumnASTs();

        console.log(columnASTs);

        for (const columnAST of columnASTs) {
            const typeormColumn: TypeormColumn = {
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

            columnMap.set(typeormColumn.name, typeormColumn);
        }

        const constraintASTs = this.getConstraintASTs();
        for (const constraintAST of constraintASTs) {
            const typeormColumn = columnMap.get(constraintAST.definition[0]);
            if (constraintAST.constraint_type === 'primary key') typeormColumn.isPrimary = true;
        }

        return Array.from(columnMap.values());
    }

    private getColumnASTs() {
        return this.ast.create_definitions.filter((definition) => definition.resource === 'column');
    }

    private getConstraintASTs() {
        return this.ast.create_definitions.filter((definition) => definition.resource === 'constraint');
    }
}
