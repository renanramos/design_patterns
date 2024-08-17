import Ride from "./Ride";

export default interface RideRepository {
    save(ride: Ride): Promise<void>;
    update(ride: Ride): Promise<void>;
    getRideById(rideId: string): Promise<Ride>;
}


export class RideRepositoryMemory implements RideRepository {
    rides: Ride[];

    constructor () {
        this.rides = [];
    }

    async save(ride: Ride): Promise<void> {
        this.rides.push(ride);
    }

    async update(ride: Ride): Promise<void> {
        const index = this.rides.findIndex((existing: Ride) => existing.rideId === ride.rideId);
        this.rides[index] = ride;
    }
    
    async getRideById(rideId: string): Promise<Ride> {
        const ride  = this.rides.find((ride: Ride) => ride.rideId === rideId);
        if (!ride) throw new Error("Ride not found");
        return ride;

    }
}