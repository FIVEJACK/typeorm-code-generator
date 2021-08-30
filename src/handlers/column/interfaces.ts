export interface TypeormColumn {
    name: string;
    type: string;
    isPrimary?: boolean;
    isUnique?: boolean;
    isNullable?: boolean;
    unsigned?: boolean;
    isGenerated?: boolean;
    generationStrategy?: string;
    length?: string;
    width?: number;
    default?: number | string;
}
