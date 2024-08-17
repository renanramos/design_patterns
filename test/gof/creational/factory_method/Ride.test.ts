import { DistanceRide, TimeRide } from "../../../../src/gof/creational/factory_method/Ride";
import Location from "../../../../src/gof/creational/factory_method/Location";
import { DistanceSegment, TimeSegment } from "../../../../src/gof/creational/factory_method/Segment";

test("Deve criar e calcular a tarifa de uma corrida por distância", function () {
    const ride = DistanceRide.create(-27.584905257808835, -48.545022195325124, new Date("2024-08-15T10:00:00"));
    const lastLocation = new Location(-27.584905257808835, -48.545022195325124, new Date("2024-08-15T10:00:00"));
    const newLocation = new Location(-27.496887588317275, -48.522234807851476, new Date("2024-08-15T12:00:00"));
    const segment = new DistanceSegment(ride.rideId, lastLocation, newLocation);
    
    ride.updateLocation(new Location(-27.496887588317275, -48.522234807851476, new Date("2024-08-15T12:00:00")))

    const fare = ride.calculateFare([segment]);
    expect(fare).toBe(40);
});

test("Deve criar e calcular a tarifa de uma corrida por tempo", function () {
    const ride = TimeRide.create(-27.584905257808835, -48.545022195325124, new Date("2024-08-15T10:00:00"));
    const lastLocation = new Location(-27.584905257808835, -48.545022195325124, new Date("2024-08-15T10:00:00"));
    const newLocation = new Location(-27.496887588317275, -48.522234807851476, new Date("2024-08-15T12:00:00"));
    const segment = new TimeSegment(ride.rideId, lastLocation, newLocation);
    
    ride.updateLocation(new Location(-27.496887588317275, -48.522234807851476, new Date("2024-08-15T12:00:00")))

    const fare = ride.calculateFare([segment]);
    expect(fare).toBe(120);
});