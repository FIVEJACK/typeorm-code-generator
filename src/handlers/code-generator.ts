export interface CodeGenerator<T> {
    generate(data: T[]): string;
}
