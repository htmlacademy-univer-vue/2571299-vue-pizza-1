import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
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
  getters: {},
  actions: {},
});
