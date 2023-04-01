export interface Data {
    date: string;
    file: string;
    type: string;
    forks: number;
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
}

export interface GisListtResponseDetails {
    date: string;
    forks: Array<ForkData>;
    type: any;
    file: string;
}

export interface ForkData {
    forkUrl: string;
    avatarUrl: string;
}