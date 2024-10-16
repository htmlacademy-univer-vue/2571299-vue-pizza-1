import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    misc: [
      {
        id: 1,
        name: "Cola-Cola 0,5 литра",
        image: "/public/img/cola.svg",
        price: 56,
      },
      {
        id: 2,
        name: "Острый соус",
        image: "/public/img/sauce.svg",
        price: 10,
      },
      {
        id: 3,
        name: "Картошка из печи",
        image: "/public/img/potato.svg",
        price: 170,
      },
      {
        id: 4,
        name: "Cola-Cola 0,5 литра",
        image: "/public/img/cola.svg",
        price: 56,
      },
      {
        id: 5,
        name: "Острый соус",
        image: "/public/img/sauce.svg",
        price: 10,
      },
      {
        id: 6,
        name: "Картошка из печи",
        image: "/public/img/potato.svg",
        price: 170,
      },
    ],
  }),
  getters: {},
  actions: {},
});
