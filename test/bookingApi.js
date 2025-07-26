import axios from "axios";
import { ENV } from "../env.js";

export class BookingApi {
  constructor() {
    this.baseUrl = ENV.BASE_URL;
    this.token = null;
  }

  async authenticate() {
    try {
      const response = await axios.post(
        `${this.baseUrl}/auth`,
        {
          username: ENV.ADMIN_USER,
          password: ENV.ADMIN_PASS,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      this.token = response.data.token;
      return this.token;
    } catch (error) {
      throw error;
    }
  }

  async sendPostRequest(url, payload) {
    try {
      return await axios.post(`${this.baseUrl}${url}`, payload, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async sendGetRequest(path) {
    try {
      return await axios.get(`${this.baseUrl}${path}`, {
        headers: { Accept: "application/json" },
      });
    } catch (error) {
      throw error;
    }
  }

  /*Cookie	string	
    Sets an authorization token to access the PUT endpoint, can be used as an alternative to the Authorization
    Default value: token=<token_value>*/ 

  async updateBooking(path, payload) {
    return await axios.put(`${this.baseUrl}${path}`, payload, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Cookie: `token=${this.token}`,
      },
    });
  }

  async sendDeleteRequest(path) {
    try {
      return await axios.delete(`${this.baseUrl}${path}`, {
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${this.token}`,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
