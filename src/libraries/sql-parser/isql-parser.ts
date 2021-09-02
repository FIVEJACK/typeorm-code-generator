import { TableColumn } from 'src/handlers/column/table-column';
import { TableIndex } from 'src/handlers/index/table-index';

export interface ISqlParser {
    getTableName(): string;
    getColumns(): TableColumn[];
    getIndices(): TableIndex[];
}
