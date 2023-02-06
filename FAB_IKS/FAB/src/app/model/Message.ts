export interface MessageDTO{
    id: number;
    date: string;
    senderId: number;
    receiverId: number;
    message: string;
    type: string;
    rideId: number;
}

export interface PageMessage{
    totalCount: number;
    results: MessageDTO[];
}

export interface Message {
    message: string,
    fromId: string,
    toId: string,
}