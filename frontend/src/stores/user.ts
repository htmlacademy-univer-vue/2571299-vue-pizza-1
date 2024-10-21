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

export interface Order {
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
      avatar: "/public/img/users/user5@4x.jpg",
      phone: "+777 777 777",
    },
    addresses: [
      {
        id: 1,
        name: "Дом, милый дом",
        street: "ул Фучика",
        building: "дом 34",
        flat: "квартира 12",
        comment: "Не звоните в дверь, злая собака!!!",
        userId: "1",
      },
      {
        id: 2,
        name: "Дом тёщи",
        street: "ул Пакостей",
        building: "дом 34",
        flat: "квартира 12",
        comment: "Не звоните в дверь, злой кот!!!",
        userId: "1",
      },
    ],
    orders: [
      {
        id: 1,
        userId: "1",
        addressId: 1,
        orderPizzas: [
          {
            id: 1,
            name: "Лучшая",
            sauceId: 1,
            doughId: 2,
            sizeId: 3,
            quantity: 2,
            orderId: 1,
            ingredients: [
              {
                id: 1,
                pizzaId: 1,
                ingredientId: 1,
                quantity: 1,
              },
              {
                id: 2,
                pizzaId: 1,
                ingredientId: 2,
                quantity: 2,
              },
            ],
          },
          {
            id: 2,
            name: "Сочная, уххх",
            sauceId: 2,
            doughId: 2,
            sizeId: 1,
            quantity: 1,
            orderId: 1,
            ingredients: [
              {
                id: 1,
                pizzaId: 1,
                ingredientId: 5,
                quantity: 3,
              },
              {
                id: 2,
                pizzaId: 1,
                ingredientId: 10,
                quantity: 2,
              },
            ],
          },
        ],
        orderMisc: [
          {
            id: 1,
            orderId: 1,
            miscId: 1,
            quantity: 3,
          },
          {
            id: 2,
            orderId: 1,
            miscId: 2,
            quantity: 1,
          },
        ],
        orderAddress: {
          id: 1,
          name: "Дом, милый дом",
          street: "ул Фучика",
          building: "дом 34",
          flat: "квартира 12",
          comment: "Не звоните в дверь, злая собака!!!",
          userId: "1",
        },
      },
      {
        id: 2,
        userId: "1",
        addressId: 2,
        orderPizzas: [
          {
            id: 1,
            name: "Лучшая",
            sauceId: 1,
            doughId: 2,
            sizeId: 3,
            quantity: 1,
            orderId: 1,
            ingredients: [
              {
                id: 1,
                pizzaId: 1,
                ingredientId: 1,
                quantity: 1,
              },
              {
                id: 2,
                pizzaId: 1,
                ingredientId: 2,
                quantity: 2,
              },
            ],
          },
          {
            id: 3,
            name: "Сладкая",
            sauceId: 2,
            doughId: 3,
            sizeId: 2,
            quantity: 3,
            orderId: 2,
            ingredients: [
              {
                id: 1,
                pizzaId: 3,
                ingredientId: 9,
                quantity: 3,
              },
              {
                id: 2,
                pizzaId: 3,
                ingredientId: 14,
                quantity: 2,
              },
              {
                id: 3,
                pizzaId: 3,
                ingredientId: 8,
                quantity: 3,
              },
              {
                id: 4,
                pizzaId: 3,
                ingredientId: 11,
                quantity: 2,
              },
              {
                id: 5,
                pizzaId: 3,
                ingredientId: 6,
                quantity: 2,
              },
            ],
          },
        ],
        orderMisc: [
          {
            id: 1,
            orderId: 2,
            miscId: 1,
            quantity: 1,
          },
          {
            id: 2,
            orderId: 2,
            miscId: 2,
            quantity: 10,
          },
          {
            id: 3,
            orderId: 2,
            miscId: 3,
            quantity: 2,
          },
        ],
        orderAddress: {
          id: 2,
          name: "Дом подружки",
          street: "ул Славы",
          building: "дом 1",
          flat: "квартира 2",
          comment: "Не звоните в дверь!!!",
          userId: "1",
        },
      },
    ],
  }),
  getters: {
    getWhoAmI: (state) => state.whoAmI,
    getAddresses: (state) =>
      state.addresses.map((addr) => ({
        ...addr,
        fullAddress: [addr.street, addr.building, addr.flat].join(", "),
      })),
    getOrders: (state) => state.orders,
    isAuthed: (state) => Boolean(state.whoAmI.email),
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
