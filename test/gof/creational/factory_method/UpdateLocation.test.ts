test("Deve atualizar a localização de uma corrida por distância", async () => {

    const rideRepository = new RideRepository();
    const segmentRepository = new SegmentRepository();
    const ride = new Ride(-27.584905257808835, -48.545022195325124, new Date("2024-08-15T12:00:00"));

    await rideRepository.save(ride);


    const updateLocation = new UpdateLocation(rideRepository, segmentRepository);


    const input = {
        rideId: ride.rideId,
        lat: -27.496887588317275,
        long: -48.522234807851476,
        date: new Date("2024-08-15T12:00:00")
    }

    await updateLocation.execute(input);
    const calculateFare = new CalculateFare(rideRepository, segmentRepository);
    const output = await calculateFare.execute(ride.rideId)

    expect(output.fare).toBe(40);
});