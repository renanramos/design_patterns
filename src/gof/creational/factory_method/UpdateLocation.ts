import Location from './Location';


export default class UpdateLocation {

    
    constructor (readonly rideRepository: RideRepository, 
                readonly segmentRepository: SegmentRepository) {

    }   

    async execute (input: Input): Promise<void> {
        const ride = await this.rideRepository.getRideById(input.rideId);
        const newLocation = new Location(input.lat, input.long, input.date);
        const segment = new Segment(ride.lastLocation, newLocation);
        ride.updateLocation(newLocation);
        await this.rideRepository.save(ride);
        await this.segmentRepository.save(segment);
    }

}


type Input = {
    rideId: string,
    lat: number,
    long: number,
    date: Date
}