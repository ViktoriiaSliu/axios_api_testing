import axios from 'axios';
import { expect } from 'chai';

const BASE_URL = 'https://restful-booker.herokuapp.com';

describe('Booking API Operations', function() {

    this.timeout(10000); 

    let token; 
    let bookingId; 

    before('should create an authentication token', async function() {
        console.log('\n--- Running Token Creation ---');
        try {
            const response = await axios.post(`${BASE_URL}/auth`, {
                username: 'admin', 
                password: 'password123' 
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            expect(response.status).to.equal(200); 
            expect(response.headers['content-type']).to.include('application/json'); 
            expect(response.data).to.have.property('token'); 
            expect(response.data.token).to.be.a('string').and.not.be.empty; 

            this.token = response.data.token; 
            console.log(`Token created: ${this.token.substring(0, 10)}...`);
        } catch (error) {
            console.error('Error creating token:', error.response ? error.response.data : error.message);
            throw error; 
        }
    });

    it('should create a new booking', async function() {
        console.log('\n--- Running Create Booking ---');
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

        try {
            const response = await axios.post(`${BASE_URL}/booking`, bookingPayload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json' 
                }
            });

            expect(response.status).to.equal(200); 
            expect(response.headers['content-type']).to.include('application/json');
            expect(response.data).to.have.property('bookingid');
            expect(response.data.bookingid).to.be.a('number');
            expect(response.data).to.have.property('booking'); 

            const createdBooking = response.data.booking;
            expect(createdBooking.firstname).to.equal(bookingPayload.firstname);
            expect(createdBooking.lastname).to.equal(bookingPayload.lastname);
            expect(createdBooking.totalprice).to.equal(bookingPayload.totalprice);
            expect(createdBooking.depositpaid).to.equal(bookingPayload.depositpaid);
            expect(createdBooking.bookingdates.checkin).to.equal(bookingPayload.bookingdates.checkin);
            expect(createdBooking.bookingdates.checkout).to.equal(bookingPayload.bookingdates.checkout);
            expect(createdBooking.additionalneeds).to.equal(bookingPayload.additionalneeds);

            this.bookingId = response.data.bookingid;
            console.log(`Booking created with ID: ${this.bookingId}`);
        } catch (error) {
            console.error('Error creating booking:', error.response ? error.response.data : error.message);
            throw error;
        }
    });

    it('should retrieve the created booking by ID', async function() {
        console.log('\n--- Running Get Booking by ID ---');

        expect(this.bookingId).to.exist;

        try {
            const response = await axios.get(`${BASE_URL}/booking/${this.bookingId}`, {
                headers: {
                    'Accept': 'application/json'
                }
            });

            expect(response.status).to.equal(200); 
            expect(response.headers['content-type']).to.include('application/json');
            expect(response.data.firstname).to.equal('John');
            expect(response.data.lastname).to.equal('Doe');
            expect(response.data.totalprice).to.equal(150);
            expect(response.data.depositpaid).to.be.true;
            expect(response.data.bookingdates.checkin).to.equal('2025-08-01');
            expect(response.data.bookingdates.checkout).to.equal('2025-08-05');
            expect(response.data.additionalneeds).to.equal('Breakfast');

            console.log(`Successfully retrieved booking ID ${this.bookingId}`);
        } catch (error) {
            console.error('Error getting booking by ID:', error.response ? error.response.data : error.message);
            throw error;
        }
    });

    it('should update the created booking', async function() {
        console.log('\n--- Running Update Booking ---');
       
        expect(this.token).to.exist;
        expect(this.bookingId).to.exist;

        const updatedBookingPayload = {
            firstname: 'Jane',
            lastname: 'Smith',
            totalprice: 200,
            depositpaid: false,
            bookingdates: {
                checkin: '2025-07-05',
                checkout: '2025-07-15'
            },
            additionalneeds: 'Lunch'
        };

        try {
            const response = await axios.put(`${BASE_URL}/booking/${this.bookingId}`, updatedBookingPayload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Cookie': `token=${this.token}` 
                }
            });

            expect(response.status).to.equal(200); 
            expect(response.headers['content-type']).to.include('application/json'); 
            expect(response.data.firstname).to.equal(updatedBookingPayload.firstname); 
            expect(response.data.lastname).to.equal(updatedBookingPayload.lastname);
            expect(response.data.totalprice).to.equal(updatedBookingPayload.totalprice);
            expect(response.data.depositpaid).to.equal(updatedBookingPayload.depositpaid);
            expect(response.data.bookingdates.checkin).to.equal(updatedBookingPayload.bookingdates.checkin);
            expect(response.data.bookingdates.checkout).to.equal(updatedBookingPayload.bookingdates.checkout);
            expect(response.data.additionalneeds).to.equal(updatedBookingPayload.additionalneeds);

            console.log(`Successfully updated booking ID ${this.bookingId}`);
        } catch (error) {
            console.error('Error updating booking:', error.response ? error.response.data : error.message);
            throw error;
        }
    });

    it('should delete the created booking', async function() {
        console.log('\n--- Running Delete Booking ---');

        expect(this.token).to.exist;
        expect(this.bookingId).to.exist;

        try {
            const response = await axios.delete(`${BASE_URL}/booking/${this.bookingId}`, {
                headers: {
                    'Content-Type': 'application/json', 
                    'Cookie': `token=${this.token}` 
                }
            });

            expect(response.status).to.equal(201);

            expect(response.data).to.equal('Created');

            console.log(`Successfully deleted booking ID ${this.bookingId}`);

            try {
                await axios.get(`${BASE_URL}/booking/${this.bookingId}`);
              
                throw new Error('Booking was not actually deleted!');
            } catch (error) {
                expect(error.response.status).to.equal(404);
                expect(error.response.data).to.equal('Not Found');
                console.log(`Confirmed booking ID ${this.bookingId} is no longer found (404 as expected).`);
            }

        } catch (error) {
            console.error('Error deleting booking:', error.response ? error.response.data : error.message);
            throw error;
        }
    });
});
