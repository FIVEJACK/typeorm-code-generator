import { CodeGenerator } from '../code-generator';
import { TableIndex } from './table-index';

export class IndexCodeGenerator extends CodeGenerator<TableIndex> {
    public generateCode(tableIndices: TableIndex[]): string {
        let generatedCode: string = '';

        for (const tableIndex of tableIndices) {
            const typeormIndex = {
                name: tableIndex.name,
                isUnique: tableIndex.isUnique,
                columnNames: tableIndex.columnNames,
            };
            let typeormIndexString = JSON.stringify(typeormIndex);
            typeormIndexString = typeormIndexString.replace(/"([^"]+)":/g, '$1:');

            generatedCode += `await queryRunner.createIndex('${tableIndex.table}', new TableIndex(${typeormIndexString}));\n\n`;
        }

        return generatedCode;
    }
}
