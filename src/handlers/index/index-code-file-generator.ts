import { SqlParser } from '../../libraries/sql-parser/sql-parser';
import { CodeFileGenerator } from '../code-file-generator';
import { IndexCodeGenerator } from './index-code-generator';
import { TableIndex } from './interfaces';

export class IndexCodeFileGenerator extends CodeFileGenerator<TableIndex> {
    constructor(inputFilename: string) {
        super(inputFilename);

        this.codeGenerator = new IndexCodeGenerator();
    }

    protected generateData(sql: string): TableIndex[] {
        const sqlParser = new SqlParser(sql);
        return sqlParser.getIndices();
    }

    protected onCodeGenerationError(error): void {
        console.log('Error generating index code:', error);
    }
}
