import { expect } from 'chai';
import { BookingApi } from '../test/bookingApi.js';
import { buildBookingPayload } from '../test/payload.js';

describe('Booking API - Delete Booking', function() {
    this.timeout(10000);

    const bookingApi = new BookingApi();
    let bookingId, deleteResult;

    before(async function() {
        await bookingApi.authenticate();
        const bookingPayload = buildBookingPayload();
        const createResponse = await bookingApi.sendPostRequest('/booking', bookingPayload);
        bookingId = createResponse.data.bookingid;
        deleteResult = await bookingApi.sendDeleteRequest(bookingId);
    });

    it('should return status 201', function() {
        expect(deleteResult.status).to.equal(201);
    });

    it('should return "Created"', function() {
        expect(deleteResult.data).to.equal('Created');
    });

    it('should not find the deleted booking', async function() {

        const response = await bookingApi.sendGetRequest(bookingId);
        expect(response.status).to.equal(404);
    });
});