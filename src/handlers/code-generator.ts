import prettier from 'prettier';
import { formatConfig } from '../config/format';

export abstract class CodeGenerator<T> {
    public abstract generateCode(data: T[] | T): string;

    public generateFormatedCode(data: T[] | T): string {
        const code = this.generateCode(data);
        return prettier.format(code, formatConfig);
    }
}
