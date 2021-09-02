import fs from 'fs';
import { SqlParser } from '../../libraries/sql-parser/sql-parser';
import { CodeFileGenerator } from '../code-file-generator';
import { Migration } from './migration';
import { MigrationCodeGenerator } from './migration-code-generator';

export class MigrationCodeFileGenerator extends CodeFileGenerator<Migration> {
    constructor(inputFilename: string) {
        super(inputFilename);

        this.codeGenerator = new MigrationCodeGenerator();
    }

    protected generateData(sql: string): Migration {
        const sqlParser = new SqlParser(sql);

        return {
            columns: sqlParser.getColumns(),
            indices: sqlParser.getIndices(),
        } as Migration;
    }

    protected writeFileSync(outputFilename: string, data: string) {
        const timestamp = new Date().getTime();
        const path = `./database/migrations/${timestamp}-${outputFilename}.ts`;

        fs.writeFileSync(path, data);
    }

    protected onCodeGenerationError(error: any): void {
        console.log('Error generating migration code:', error);
    }
}
