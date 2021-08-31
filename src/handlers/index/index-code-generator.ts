import fs from 'fs';
import { SqlParser } from '../../libraries/sql-parser/sql-parser';
import { IndexCodeFormatter } from './index-code-formatter';
import { TableIndex } from './interfaces';

export class IndexCodeGenerator {
    private inputFilename: string;

    constructor(inputFilename: string) {
        this.inputFilename = inputFilename;
    }

    public generateCodeFile(outputFilename = 'output.ts'): void {
        try {
            const sql = this.readFileSync();
            const tableIndices = this.generateIndices(sql);
            this.writeCodeFile(outputFilename, tableIndices);

            console.log('Code generation succeeded:', outputFilename);
        } catch (error) {
            console.log('Error generating index code:', error);
        }
    }

    private readFileSync(): string {
        return fs.readFileSync(this.inputFilename, 'utf-8');
    }

    private generateIndices(sql: string): TableIndex[] {
        const sqlParser = new SqlParser(sql);
        return sqlParser.getIndices();
    }

    private writeCodeFile(outputFilename: string, tableIndices: TableIndex[]) {
        const outputString = IndexCodeFormatter.format(tableIndices);
        fs.writeFileSync(outputFilename, outputString);
    }
}
