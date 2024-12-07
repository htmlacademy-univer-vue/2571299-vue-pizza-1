import { HttpClient } from "./HttpClient";
import httpProvider from "./providers";
import { getToken } from "./token-manager";

const BASE_URL = "/api/addresses";

class AddressService extends HttpClient {
  async fetch() {
    try {
      return this.get("/");
    } catch (e) {
      throw Error(e);
    }
  }
  async createAddress(data) {
    try {
      return this.post("/", { data });
    } catch (e) {
      throw Error(e);
    }
  }
  async updateAddress(data) {
    try {
      return this.put(`/${data.id}`, { data });
    } catch (e) {
      throw Error(e);
    }
  }
  async deleteAddress(id) {
    try {
      return await this.delete(`/${id}`);
    } catch (e) {
      throw Error(e);
    }
  }
}

export default new AddressService({
  httpProvider,
  baseURL: BASE_URL,
  getToken,
});
