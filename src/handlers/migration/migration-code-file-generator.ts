import fs from 'fs';
import { SqlParser } from '../../libraries/sql-parser/sql-parser';
import { CodeFileGenerator } from '../code-file-generator';
import { Migration } from './migration';
import { MigrationCodeGenerator } from './migration-code-generator';

export class MigrationCodeFileGenerator extends CodeFileGenerator<Migration> {
    private outputFileName: string;
    private timestamp: number;

    constructor(inputFilename: string, outputFileName: string) {
        super(inputFilename);

        this.outputFileName = outputFileName;
        this.timestamp = new Date().getTime();
        this.codeGenerator = new MigrationCodeGenerator();
    }

    protected generateData(sql: string): Migration {
        const sqlParser = new SqlParser(sql);

        return {
            fileName: this.outputFileName + this.timestamp,
            tableName: sqlParser.getTableName(),
            columns: sqlParser.getColumns(),
            indices: sqlParser.getIndices(),
        } as Migration;
    }

    protected writeFileSync(outputFilename: string, data: string) {
        const path = `./database/migrations/${this.timestamp}-${outputFilename}.ts`;

        fs.writeFileSync(path, data);
    }

    protected onCodeGenerationError(error: any): void {
        console.log('Error generating migration code:', error);
    }
}
