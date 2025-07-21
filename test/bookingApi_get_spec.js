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
        const createResponse = await bookingApi.sendPostRequest('/booking', bookingPayload);
        bookingId = createResponse.data.bookingid;
        console.log('Booking ID:', bookingId);
        response = await bookingApi.sendGetRequest(bookingId);
    });

    it('should return firstname John', function() {
        expect(response.data.firstname).to.equal('John');
    });

});