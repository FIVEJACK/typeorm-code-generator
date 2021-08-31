import prettier from 'prettier';
import { TableIndex } from './interfaces';

export class IndexCodeFormatter {
    public static format(tableIndices: TableIndex[]): string {
        let generatedCode: string = '';

        for (const tableIndex of tableIndices) {
            const typeormIndex = {
                name: tableIndex.name,
                columnNames: tableIndex.columnNames,
            };
            let typeormIndexString = JSON.stringify(typeormIndex);
            typeormIndexString = typeormIndexString.replace(/"([^"]+)":/g, '$1:');

            generatedCode += `await queryRunner.createIndex('${tableIndex.table}', new TableIndex(${typeormIndexString}));\n\n`;
        }

        return prettier.format(generatedCode, {
            tabWidth: 4,
            printWidth: 120,
            parser: 'babel',
            bracketSpacing: true,
            jsxBracketSameLine: true,
            singleQuote: true,
            trailingComma: 'all',
            semi: true,
        });
    }
}
