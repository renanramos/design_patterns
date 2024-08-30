import { BookingRepositoryDatabase } from "../../../../src/gof/structural/decorator/BookingRepository";
import BookRoom from "../../../../src/gof/structural/decorator/BookRoom";
import CancelBooking from "../../../../src/gof/structural/decorator/CancelBooking";
import GetBookingByCode from "../../../../src/gof/structural/decorator/GetBookingByCode";
import ImportBooking from "../../../../src/gof/structural/decorator/ImportBooking";
import LogDecorator from "../../../../src/gof/structural/decorator/LogDecorator";
import { RoomRepositoryDatabase } from "../../../../src/gof/structural/decorator/RoomRepository";

test("Deve reservar um quarto", async function () {

    // Given
    const roomRepository = new RoomRepositoryDatabase();
    const bookingRepository = new BookingRepositoryDatabase();
    const input = {
        file: `email;checkin_date;checkout_date;category;
            john.doe1@gmail.com;2024-03-01T10:00:00;2024-03-03T10:00:00;suite;
            john.doe2@gmail.com;2024-03-06T10:00:00;2024-03-08T10:00:00;suite;
            john.doe3@gmail.com;2024-03-20T10:00:00;2024-03-22T10:00:00;suite;`
    };

    // When
    const importBooking = new LogDecorator(new ImportBooking(new LogDecorator(new BookRoom(roomRepository, bookingRepository))));
    const outputImportBooking = await importBooking.execute(input);
    for (const code of outputImportBooking.code) {
        const getBookinByCode = new GetBookingByCode(roomRepository, bookingRepository);
        const outputGetBookingByCode = await getBookinByCode.execute({ code });
        expect(outputGetBookingByCode.duration).toBe(2);
        expect(outputGetBookingByCode.price).toBe(1000);
        const cancelBooking = new CancelBooking(bookingRepository);
        await cancelBooking.execute({ code: code });
    }
});