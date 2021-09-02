export interface CodeGenerator<T> {
    generate(data: T[] | T): string;
}
