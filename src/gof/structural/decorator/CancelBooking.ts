import BookingRepository from "./BookingRepository";

export default class CancelBooking {

    constructor(readonly bookingRepository: BookingRepository) {

    }

    async execute(input:Input): Promise<void> {
        const booking = await this.bookingRepository.getBookingByCode(input.code);
        booking.cancel();
        await this.bookingRepository.updateBooking(booking);
    }
}

type Input = {
    code: string
};
