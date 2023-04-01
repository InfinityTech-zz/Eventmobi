export interface Data {
    date: string;
    file: string;
    type: any;
    forks: Array<any>;
  }
  

export interface Column {
    id: 'date' | 'file' | 'type' | 'forks';
    label: string;
    minWidth?: number;
    align?: 'right' | 'center';
    format?: (value: number) => string;
}

export interface TotalGists {
    totalNumGists: number;
    gistData: Array<any>;
    updateCurrentPage: Function;
}