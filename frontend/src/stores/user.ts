import { defineStore } from "pinia";

interface WhoAmI {
  name: string;
  email: string;
  password: string;
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

interface Order {
  id: number;
  userId: string;
  addressId: number;
  orderPizzas: OrderPizza[];
  orderMisc: OrderMisc[];
  orderAddress: OrderAddress;
}

interface UserState {
  whoAmI: WhoAmI;
  addresses: Address[];
  orders: Order[];
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    whoAmI: {
      name: "Вася Пупкин",
      email: "user@example.com",
      password: "user@example.com",
      avatar: "/public/img/users/user.jpg",
      phone: "+777 777 777",
    },
    addresses: [
      {
        id: 1,
        name: "string",
        street: "string",
        building: "string",
        flat: "string",
        comment: "string",
        userId: "string",
      },
    ],
    orders: [
      {
        id: 0,
        userId: "string",
        addressId: 0,
        orderPizzas: [
          {
            id: 0,
            name: "string",
            sauceId: 0,
            doughId: 0,
            sizeId: 0,
            quantity: 0,
            orderId: 0,
            ingredients: [
              {
                id: 0,
                pizzaId: 0,
                ingredientId: 0,
                quantity: 0,
              },
            ],
          },
        ],
        orderMisc: [
          {
            id: 0,
            orderId: 0,
            miscId: 0,
            quantity: 0,
          },
        ],
        orderAddress: {
          id: 0,
          name: "string",
          street: "string",
          building: "string",
          flat: "string",
          comment: "string",
          userId: "string",
        },
      },
    ],
  }),
  getters: {
    getWhoAmI: (state) => state.whoAmI,
    getAddresses: (state) => state.addresses,
    getOrders: (state) => state.orders,
  },
  actions: {
    setWhoAmI(whoAmI: WhoAmI) {
      this.whoAmI = whoAmI;
    },
    setAddresses(addresses: Address[]) {
      this.addresses = addresses;
    },
    setOrders(orders: Order[]) {
      this.orders = orders;
    },
  },
});
