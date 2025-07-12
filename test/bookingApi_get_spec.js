import { expect } from 'chai';
import { BookingApi } from '../test/bookingApi.js';


describe('Booking API - Get Booking', function() {
    this.timeout(10000);

    const bookingApi = new BookingApi();
    let bookingId, response;

    before(async function() {
        await bookingApi.authenticate();
        const bookingPayload = {
            firstname: 'John',
            lastname: 'Doe',
            totalprice: 150,
            depositpaid: true,
            bookingdates: {
                checkin: '2025-08-01',
                checkout: '2025-08-05'
            },
            additionalneeds: 'Breakfast'
        };
        const createResponse = await bookingApi.createBooking(bookingPayload);
        bookingId = createResponse.data.bookingid;
        response = await bookingApi.getBooking(bookingId);
    });

    it('should return firstname John', function() {
        expect(response.data.firstname).to.equal('John');
    });

    // ...add more property checks as needed
});