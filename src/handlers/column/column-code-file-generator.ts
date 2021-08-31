import { SqlParser } from '../../libraries/sql-parser/sql-parser';
import { CodeFileGenerator } from '../code-file-generator';
import { ColumnCodeGenerator } from './column-code-generator';
import { TypeormColumn } from './interfaces';

export class ColumnCodeFileGenerator extends CodeFileGenerator<TypeormColumn> {
    constructor(inputFilename: string) {
        super(inputFilename);

        this.codeGenerator = new ColumnCodeGenerator();
    }

    protected generateData(sql: string): TypeormColumn[] {
        const sqlParser = new SqlParser(sql);
        return sqlParser.getColumns();
    }

    protected onCodeGenerationError(error): void {
        console.log('Error generating column code:', error);
    }
}
