import { TableColumn } from '../column/table-column';
import { TableIndex } from '../index/table-index';

export interface Migration {
    fileName: string;
    tableName: string;
    columns: TableColumn[];
    indices: TableIndex[];
}
