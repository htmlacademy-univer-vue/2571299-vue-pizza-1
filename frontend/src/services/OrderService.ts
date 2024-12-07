import { HttpClient } from "./HttpClient";
import httpProvider from "./providers";
import { getToken } from "./token-manager";

const BASE_URL = "/api/orders";

interface Address {
  street: string;
  building: string;
  flat: string;
  comment: string;
}

interface Ingredient {
  ingredientId: number;
  quantity: number;
}

interface Pizza {
  name: string;
  sauceId: number;
  doughId: number;
  sizeId: number;
  quantity: number;
  ingredients: Ingredient[];
}

interface Misc {
  miscId: number;
  quantity: number;
}

interface Order {
  userId: string;
  phone: string;
  address: Address | null;
  pizzas: Pizza[];
  misc: Misc[];
}

class OrderService extends HttpClient {
  async fetch() {
    try {
      return this.get("/");
    } catch (e) {
      throw Error(e);
    }
  }
  async create(data: Order) {
    try {
      return this.post("/", { data });
    } catch (e) {
      throw Error(e);
    }
  }
  async deleteOrder(id: string | number) {
    try {
      await this.delete(`/${id}`);
    } catch (e) {
      throw Error(e);
    }
  }
}

export default new OrderService({
  httpProvider,
  baseURL: BASE_URL,
  getToken,
});
