import { SqlParser } from '../../libraries/sql-parser/sql-parser';
import { CodeFileGenerator } from '../code-file-generator';
import { ColumnCodeGenerator } from './column-code-generator';
import { TableColumn } from './table-column';

export class ColumnCodeFileGenerator extends CodeFileGenerator<TableColumn> {
    constructor(inputFilename: string) {
        super(inputFilename);

        this.codeGenerator = new ColumnCodeGenerator();
    }

    protected generateData(sql: string): TableColumn[] {
        const sqlParser = new SqlParser(sql);
        return sqlParser.getColumns();
    }

    protected onCodeGenerationError(error): void {
        console.log('Error generating column code:', error);
    }
}
