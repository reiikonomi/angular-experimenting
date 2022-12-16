export interface Room {
    availableRooms: number;

    bookedRooms?: number;

    total?: number;
}


export interface RoomList {

    roomNumber: string;

    roomType: string;

    amenities: string;

    proce: number;

    photos: string;

    checkingTime: Date;

    checkoutTime : Date;

    rating: number;
}
