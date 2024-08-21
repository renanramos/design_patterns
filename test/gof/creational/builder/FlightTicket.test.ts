import FlightTicket from "../../../../src/gof/creational/builder/FlightTicket";
import FlightTicketBuilder from "../../../../src/gof/creational/builder/FlightTicketBuilder";

test("Deve criar uma passagem aérea", function () {
    const builder = new FlightTicketBuilder();
    builder.withFlight("Azul", "9876")
        .withTrip("FLN", "GRU")
        .withPassenger("John Doe", "john.doe@gmail.com", "123.456.789-00", "M")
        .withEmergencyContact("Bob Simpson", "5511999999999")
        .withSeat("8A")
        .withCheckecBags(2)
        .withCheckinInformation(true, "1", "4A")
        .withPriority(5);

    const flightTicket = new FlightTicket(builder);

    expect(flightTicket.passengerName).toBe("John Doe");
    expect(flightTicket.flightCode).toBe("9876");
    expect(flightTicket.emergencyContactName).toBe("Bob Simpson");
    expect(flightTicket.seat).toBe("8A");
    expect(flightTicket.checkedBags).toBe(2);
    expect(flightTicket.hasCheckin).toBeTruthy();
});