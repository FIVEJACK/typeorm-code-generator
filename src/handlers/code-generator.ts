export interface CodeGenerator<T> {
    generateCode(data: T[] | T): string;
    generateFormatedCode(data: T[] | T): string;
}
