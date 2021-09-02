import fs from 'fs';
import { CodeGenerator } from './code-generator';

export abstract class CodeFileGenerator<T> {
    protected inputFilename: string;
    protected codeGenerator: CodeGenerator<T>;

    constructor(inputFilename: string) {
        this.inputFilename = inputFilename;
    }

    public generateCodeFile(outputFilename: string = 'output.ts'): void {
        try {
            const sql = this.readFileSync();
            const data = this.generateData(sql);
            const code = this.codeGenerator.generate(data);
            this.writeFileSync(outputFilename, code);

            console.log('Code generation succeeded:', outputFilename);
        } catch (error) {
            this.onCodeGenerationError(error);
        }
    }

    protected readFileSync(): string {
        return fs.readFileSync(this.inputFilename, 'utf-8');
    }

    protected abstract generateData(sql: string): T[] | T;

    protected writeFileSync(outputFilename: string, data: string) {
        fs.writeFileSync(outputFilename, data);
    }

    protected abstract onCodeGenerationError(error): void;
}
