export interface Document{
    id: number;
    name: string;
    documentImage: string;
    driverId: string;
}

export interface DocumentWithNoId{
    name: string;
    documentImage: string;
    driverId: string;
}