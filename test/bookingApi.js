import axios from 'axios';
import { ENV } from '../env.js';

export class BookingApi {
    constructor() {
        this.baseUrl = ENV.BASE_URL;
        this.token = null;
    }

    async authenticate() {
        const response = await axios.post(`${this.baseUrl}/auth`, {
            username: ENV.ADMIN_USER,
            password: ENV.ADMIN_PASS
        }, {
            headers: { 'Content-Type': 'application/json' }
        });
        this.token = response.data.token;
        return this.token;
    }

    async createBooking(payload) {
        return await axios.post(`${this.baseUrl}/booking`, payload, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    }

    async getBooking(bookingId) {
        return await axios.get(`${this.baseUrl}/booking/${bookingId}`, {
            headers: { 'Accept': 'application/json' }
        });

    }

    async updateBooking(bookingId, payload) {
        return await axios.put(`${this.baseUrl}/booking/${bookingId}`, payload, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cookie': `token=${this.token}`
            }
        });
    }

    async deleteBooking(bookingId) {
        return await axios.delete(`${this.baseUrl}/booking/${bookingId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `token=${this.token}`
            }
        });
    }
}