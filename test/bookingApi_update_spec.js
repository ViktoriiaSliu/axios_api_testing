import { expect } from 'chai';
import { BookingApi } from '../test/bookingApi.js';
import { buildBookingPayload } from '../test/payload.js';

describe('Booking API - Update Booking', function() {
    this.timeout(10000);

    const bookingApi = new BookingApi();
    let bookingId, response, updatedBookingPayload;

    before(async function() {
        await bookingApi.authenticate();
        const bookingPayload = buildBookingPayload();
        const createResponse = await bookingApi.createBooking(bookingPayload);
        bookingId = createResponse.data.bookingid;
        updatedBookingPayload = buildBookingPayload({
            firstname: 'Jane',
            lastname: 'Smith',
            totalprice: 200,
            depositpaid: false,
            checkin: '2025-07-05',
            checkout: '2025-07-15',
            additionalneeds: 'Lunch'
        });
        response = await bookingApi.updateBooking(bookingId, updatedBookingPayload);
    });

    it('should return status 200', function() {
        expect(response.status).to.equal(200);
    });

    it('should update firstname', function() {
        expect(response.data.firstname).to.equal('Jane');
    });
});
