import { expect } from 'chai';
import { BookingApi } from '../test/bookingApi.js';
import { buildBookingPayload } from '../test/payload.js';

describe('Booking API - Create Booking', function() {
    this.timeout(10000);

    const bookingApi = new BookingApi();
    let bookingId, response, bookingPayload;

    before(async function() {
        await bookingApi.authenticate();
        bookingPayload = buildBookingPayload();
        response = await bookingApi.createBooking(bookingPayload);
        bookingId = response.data.bookingid;
    });

    it('should return status 200', function() {
        expect(response.status).to.equal(200);
    });

    it('should have application/json content-type', function() {
        expect(response.headers['content-type']).to.include('application/json');
    });

    it('should have bookingid property', function() {
        expect(response.data).to.have.property('bookingid');
    });

    it('should have booking property', function() {
        expect(response.data).to.have.property('booking');
    });

    it('should match firstname', function() {
        expect(response.data.booking.firstname).to.equal(bookingPayload.firstname);
    });

 
});