import Room from "./Room";
import pgp from "pg-promise";

export default interface RoomRepository {
    getAvailableRoomsByPeriodAndCategory(checkinDate: Date, checkoutDate: Date, category: string): Promise<Room[]>;
    getById(roomId: number): Promise<Room>;
}


export class RoomRepositoryDatabase implements RoomRepository {
    
    async getAvailableRoomsByPeriodAndCategory(checkinDate: Date, checkoutDate: Date, category: string): Promise<Room[]> {
        const connection = pgp()("jdbc://username:password@localhost:5432/app");
        const roomsData = await connection.query(
            "select * from design_patterns.room where category = $1 and status = 'available' and room_id not in (select room_id from design_patterns.booking where (checkin_date, checkout_date) overlaps ($2, $3) and status = 'confirmed')", 
             [category, checkinDate, checkoutDate]);
        const rooms: Room[] = [];
        for(const roomData of roomsData) {
            rooms.push(new Room(roomData.room_id, roomData.category, parseFloat(roomData.price), roomData.status));
        }
        await connection.$pool.end();
        return rooms;
    }

    async getById(roomId: number): Promise<Room> {
        const connection = pgp()("jdbc://username:password@localhost:5432/app");
        const [roomData] = await connection.query("Select * from design_patterns.room where room_id = $1", [1]);
        await connection.$pool.end();
        return new Room(roomData.room_id, roomData.category, parseFloat(roomData.price), roomData.status);
    }
    
}