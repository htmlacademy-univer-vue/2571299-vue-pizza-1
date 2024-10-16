import { defineStore } from "pinia";

export const usePizzaStore = defineStore("pizza", {
  state: () => ({
    ingredients: [
      {
        id: 1,
        name: "Грибы",
        image: "/public/img/filling/mushrooms.svg",
        price: 33,
      },
      {
        id: 2,
        name: "Чеддер",
        image: "/public/img/filling/cheddar.svg",
        price: 42,
      },
      {
        id: 3,
        name: "Томаты",
        image: "/public/img/filling/tomatoes.svg",
        price: 35,
      },
      {
        id: 4,
        name: "Лосось",
        image: "/public/img/filling/salmon.svg",
        price: 50,
      },
      {
        id: 5,
        name: "Моцарелла",
        image: "/public/img/filling/mozzarella.svg",
        price: 35,
      },
      {
        id: 6,
        name: "Пармезан",
        image: "/public/img/filling/parmesan.svg",
        price: 35,
      },
      {
        id: 7,
        name: "Салями",
        image: "/public/img/filling/salami.svg",
        price: 42,
      },
      {
        id: 8,
        name: "Блю чиз",
        image: "/public/img/filling/blue_cheese.svg",
        price: 50,
      },
      {
        id: 9,
        name: "Ветчина",
        image: "/public/img/filling/ham.svg",
        price: 42,
      },
      {
        id: 10,
        name: "Чили",
        image: "/public/img/filling/chile.svg",
        price: 21,
      },
      {
        id: 11,
        name: "Ананас",
        image: "/public/img/filling/ananas.svg",
        price: 25,
      },
      {
        id: 12,
        name: "Халапеньо",
        image: "/public/img/filling/jalapeno.svg",
        price: 25,
      },
      {
        id: 13,
        name: "Лук",
        image: "/public/img/filling/onion.svg",
        price: 21,
      },
      {
        id: 14,
        name: "Маслины",
        image: "/public/img/filling/olives.svg",
        price: 25,
      },
      {
        id: 15,
        name: "Бекон",
        image: "/public/img/filling/bacon.svg",
        price: 42,
      },
      {
        id: 16,
        name: "Грибы",
        image: "/public/img/filling/mushrooms.svg",
        price: 33,
      },
      {
        id: 17,
        name: "Чеддер",
        image: "/public/img/filling/cheddar.svg",
        price: 42,
      },
      {
        id: 18,
        name: "Томаты",
        image: "/public/img/filling/tomatoes.svg",
        price: 35,
      },
      {
        id: 19,
        name: "Лосось",
        image: "/public/img/filling/salmon.svg",
        price: 50,
      },
      {
        id: 20,
        name: "Моцарелла",
        image: "/public/img/filling/mozzarella.svg",
        price: 35,
      },
      {
        id: 21,
        name: "Пармезан",
        image: "/public/img/filling/parmesan.svg",
        price: 35,
      },
      {
        id: 22,
        name: "Блю чиз",
        image: "/public/img/filling/blue_cheese.svg",
        price: 50,
      },
      {
        id: 23,
        name: "Салями",
        image: "/public/img/filling/salami.svg",
        price: 42,
      },
      {
        id: 24,
        name: "Бекон",
        image: "/public/img/filling/bacon.svg",
        price: 42,
      },
      {
        id: 25,
        name: "Лук",
        image: "/public/img/filling/onion.svg",
        price: 21,
      },
      {
        id: 26,
        name: "Чили",
        image: "/public/img/filling/chile.svg",
        price: 21,
      },
      {
        id: 27,
        name: "Халапеньо",
        image: "/public/img/filling/jalapeno.svg",
        price: 25,
      },
      {
        id: 28,
        name: "Ветчина",
        image: "/public/img/filling/ham.svg",
        price: 42,
      },
      {
        id: 29,
        name: "Ананас",
        image: "/public/img/filling/ananas.svg",
        price: 25,
      },
      {
        id: 30,
        name: "Маслины",
        image: "/public/img/filling/olives.svg",
        price: 25,
      },
    ],
    dough: [
      {
        id: 1,
        name: "Тонкое",
        image: "/public/img/dough-light.svg",
        description: "Из твердых сортов пшеницы",
        price: 300,
      },
      {
        id: 2,
        name: "Толстое",
        image: "/public/img/dough-large.svg",
        description: "Из твердых сортов пшеницы",
        price: 300,
      },
    ],
    sauces: [
      {
        id: 1,
        name: "Томатный",
        price: 50,
      },
      {
        id: 2,
        name: "Сливочный",
        price: 50,
      },
      {
        id: 3,
        name: "Сливочный",
        price: 50,
      },
      {
        id: 4,
        name: "Томатный",
        price: 50,
      },
    ],
    sizes: [
      {
        id: 1,
        name: "23 см",
        image: "/public/img/diameter.svg",
        multiplier: 1,
      },
      {
        id: 2,
        name: "32 см",
        image: "/public/img/diameter.svg",
        multiplier: 2,
      },
      {
        id: 3,
        name: "45 см",
        image: "/public/img/diameter.svg",
        multiplier: 3,
      },
      {
        id: 4,
        name: "23 см",
        image: "/public/img/diameter.svg",
        multiplier: 1,
      },
      {
        id: 5,
        name: "32 см",
        image: "/public/img/diameter.svg",
        multiplier: 2,
      },
      {
        id: 6,
        name: "45 см",
        image: "/public/img/diameter.svg",
        multiplier: 3,
      },
    ],
    choosed: {
      name: "",
      sauceId: 1,
      doughId: 1,
      sizeId: 1,
      ingredients: Array.from({ length: 30 }, (_, i) => i + 1).map((i) => ({
        ingredientId: i,
        quantity: 0,
      })),
    },
  }),
  getters: {
    getDough: (state) =>
      state.dough.map((e) => ({
        ...e,
        type: e.image.split("/")[-1].split(".")[0].split("-")[-1],
      })),
    getIngredients: (state) =>
      state.ingredients.map((e) => ({
        ...e,
        enName: e.image.split("/")[-1].split(".")[0],
      })),
    getSauces: (state) => state.sauces,
    getSizes: (state) => state.sizes,

    getPrice: (state) => {
      let price = 0;

      price +=
        state.dough.find((v) => v.id == state.choosed.doughId)?.price ?? 0;
      price +=
        state.sauces.find((v) => v.id == state.choosed.sauceId)?.price ?? 0;
      price += state.choosed.ingredients
        .map(
          (choosedIngredient) =>
            (state.ingredients.find(
              (v) => v.id == choosedIngredient.ingredientId
            )?.price ?? 0) * choosedIngredient.quantity
        )
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      price *=
        state.sizes.find((v) => v.id == state.choosed.sizeId)?.multiplier ?? 1;

      return price;
    },
  },
  actions: {},
});
