import fs from 'fs';
import { SqlParser } from '../../libraries/sql-parser/sql-parser';
import { ColumnCodeFormatter } from './column-code-formatter';
import { TypeormColumn } from './interfaces';

export class ColumnCodeGenerator {
    private inputFilename: string;

    constructor(inputFilename: string) {
        this.inputFilename = inputFilename;
    }

    public generateCodeFile(outputFilename = 'output.ts'): void {
        try {
            const sql = this.readFileSync();
            const typeOrmColumns = this.generateColumns(sql);
            this.writeCodeFile(outputFilename, typeOrmColumns);

            console.log('Code generation succeeded');
        } catch (error) {
            console.log('Error generating column code:', error);
        }
    }

    private readFileSync(): string {
        return fs.readFileSync(this.inputFilename, 'utf-8');
    }

    private generateColumns(sql: string): TypeormColumn[] {
        const sqlParser = new SqlParser(sql);
        return sqlParser.getColumns();
    }

    private writeCodeFile(outputFilename: string, typeOrmColumns: TypeormColumn[]) {
        const outputString = ColumnCodeFormatter.format(typeOrmColumns);
        fs.writeFileSync(outputFilename, outputString);
    }
}
