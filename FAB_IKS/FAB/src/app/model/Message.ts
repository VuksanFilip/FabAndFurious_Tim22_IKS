export interface Message{
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
    results: Message[];
}