import { defineStore } from "pinia";
import AuthService from "../services/AuthService";
import { removeToken, setToken } from "../services/token-manager";
import AddressService from "../services/AddressService";
import OrderService from "../services/OrderService.ts";
import { useCartStore } from "./cart.ts";
import { usePizzaStore } from "./pizza.ts";

interface WhoAmI {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
}

interface Address {
  id: number;
  name: string;
  street: string;
  building: string;
  flat: string;
  comment: string;
  userId: string;
}

interface OrderIngredient {
  id: number;
  pizzaId: number;
  ingredientId: number;
  quantity: number;
}

interface OrderPizza {
  id: number;
  name: string;
  sauceId: number;
  doughId: number;
  sizeId: number;
  quantity: number;
  orderId: number;
  ingredients: OrderIngredient[];
}

interface OrderMisc {
  id: number;
  orderId: number;
  miscId: number;
  quantity: number;
}

interface OrderAddress {
  id: number;
  name: string;
  street: string;
  building: string;
  flat: string;
  comment: string;
  userId: string;
}

export interface Order {
  id: number;
  userId: string;
  addressId: number | null;
  orderPizzas?: OrderPizza[];
  orderMisc?: OrderMisc[];
  orderAddress?: OrderAddress;
  phone: string;
}

interface UserState {
  whoAmI: WhoAmI | null;
  addresses: Address[];
  orders: Order[];
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    whoAmI: null,
    addresses: [],
    orders: [],
  }),
  getters: {
    getWhoAmI: (state) => state.whoAmI,
    getAddresses: (state) => state.addresses,
    getOrders: (state) => state.orders,
    isAuthenticated: (state) => Boolean(state.whoAmI?.email),
  },
  actions: {
    async fetchAddresses() {
      this.addresses = await AddressService.fetch();
    },
    async fetchOrders() {
      this.orders = await OrderService.fetch();
    },
    async deleteOrder(id: number) {
      const indexInStore = this.orders.findIndex((order) => order.id == id);
      this.orders.splice(indexInStore, 1);
      await OrderService.deleteOrder(id);
    },

    setWhoAmI(whoAmI: WhoAmI) {
      this.whoAmI = whoAmI;
    },
    setAddresses(addresses: Address[]) {
      this.addresses = addresses;
    },
    setOrders(orders: Order[]) {
      this.orders = orders;
    },

    repeatOrder(id: number) {
      const pizzaStore = usePizzaStore();
      const cartStore = useCartStore();

      cartStore.clearCart();
      pizzaStore.clearChoosed();

      const order = this.getOrders.find((e) => e.id === id);
      cartStore.setChoosedAddress(
        order?.orderAddress ?? {
          street: "",
          building: "",
          flat: "",
          comment: "",
        }
      );
      cartStore.setChoosedPhone(order?.phone ?? "");
      cartStore.setChoosedReceivingOrderEnum(order?.addressId ? 3 : 1);
      for (const pizza of order?.orderPizzas ?? []) {
        cartStore.addPizza({
          ...pizza,
          price: pizzaStore.getPizzaPrice(pizza),
        });
      }
      for (const mics of order?.orderMisc ?? []) {
        cartStore.setMiscQuantity(mics.miscId, mics.quantity);
      }
    },

    calcOrderPrice(order: Order) {
      const pizzaStore = usePizzaStore();
      const cartStore = useCartStore();

      let price = 0;

      price += (order.orderPizzas ?? [])
        .map((pizza) => pizzaStore.getPizzaPrice(pizza) * pizza.quantity)
        .reduce((a, b) => a + b, 0);
      price += (order.orderMisc ?? [])
        .map(
          (mics) =>
            (cartStore.getMiscById(mics.miscId)?.price ?? 0) * mics.quantity
        )
        .reduce((a, b) => a + b, 0);

      return price;
    },

    async login(email: string, password: string) {
      try {
        const data = await AuthService.login(email, password);
        setToken(data.token);
        return "ok";
      } catch (e) {
        return e.message;
      }
    },
    async getMe() {
      this.whoAmI = await AuthService.whoAmI();
    },
    async logout(sendRequest = true) {
      await AuthService.logout();
      this.whoAmI = {};
      removeToken();
    },

    async addAddress(address) {
      const res = await AddressService.createAddress({
        ...address,
        userId: this.whoAmI.id,
      });
      if (res.id != undefined) {
        this.addresses.push(res);
      }
    },
    async removeAddress(addressId) {
      const res = await AddressService.deleteAddress(addressId);
      this.addresses = this.addresses.filter((i) => i.id !== addressId);
    },
    async updateAddress(address) {
      const res = await AddressService.updateAddress(address);
      this.addresses = this.addresses.map((i) =>
        i.id === address.id ? address : i
      );
    },
  },
});
