import { toCamelCase } from '../../helpers/utility';
import { CodeGenerator } from '../code-generator';
import { ColumnCodeGenerator } from '../column/column-code-generator';
import { IndexCodeGenerator } from '../index/index-code-generator';
import { Migration } from './migration';

export class MigrationCodeGenerator extends CodeGenerator<Migration> {
    public generateCode(migration: Migration): string {
        const hasIndex = migration.indices.length > 1;
        const className = toCamelCase(migration.fileName);
        const tableKey = toCamelCase(migration.tableName);
        const columnCodeGenerator = new ColumnCodeGenerator();
        const indexCodeGenerator = new IndexCodeGenerator();
        const columnCode = columnCodeGenerator.generateCode(migration.columns);
        let indexCode = indexCodeGenerator.generateCode(migration.indices);

        const re = new RegExp(`'${migration.tableName}'`, 'g');
        indexCode = indexCode.replace(re, `table.${tableKey}`);

        return `
            import { MigrationInterface, QueryRunner, Table${hasIndex ? ', TableIndex' : ''} } from 'typeorm';

            const table = {
                ${tableKey}: '${migration.tableName}'
            }

            export class ${className} implements MigrationInterface {
                public async up(queryRunner: QueryRunner): Promise<void> {
                    await queryRunner.createTable(new Table({
                        name: table.${tableKey},
                        columns:${columnCode}
                    }), false);

                    ${indexCode}
                }

                public async down(queryRunner: QueryRunner): Promise<void> {
                    await queryRunner.dropTable(table.${tableKey});
                }
            }
        `;
    }
}
