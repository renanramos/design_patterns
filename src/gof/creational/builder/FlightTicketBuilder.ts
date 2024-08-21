import FlightTicket from "./FlightTicket";

export default class FlightTicketBuilder {

    airline!: string;
    flightCode!: string;
    fromAirport!: string;
    toAirport!: string;
    passengerName!: string;
    passengerEmail!: string;
    passengerDocument!: string;
    passengerGender!: string;
    emergencyContactName!: string;
    emergencyContactTelephone!: string;
    seat!: string;
    checkedBags!: number;
    hasCheckin!: boolean;
    terminal!: string;
    gate!: string;
    priority!: number;


    withFlight(airline: string, code: string) {
        this.airline = airline;
        this.flightCode = code;
        return this;
    }

    withTrip(from: string, to: string) {
        this.fromAirport = from;
        this.toAirport = to;
        return this;
    }

    withPassenger(name: string, email: string, document: string, gender: string) {
        this.passengerName = name;
        this.passengerEmail = email;
        this.passengerDocument = document;
        this.passengerGender = gender;
        return this;
    }

    withEmergencyContact(name: string, telephone: string) {
        this.emergencyContactName = name;
        this.emergencyContactTelephone = telephone;
        return this;
    }

    withSeat(seat: string) {
        this.seat = seat;
        return this;
    }

    withCheckecBags(checkedBags: number) {
        this.checkedBags = checkedBags
        return this;
    }

    withCheckinInformation(hasCheckin: boolean, terminal: string, gate: string) {
        this.hasCheckin = hasCheckin;
        this.terminal = terminal;
        this.gate = gate;
        return this;
    }

    withPriority(priority: number) {
        this.priority = priority;
        return this;
    }

    getFlightTicket(): FlightTicket {
        return new FlightTicket(this);
    }

}
