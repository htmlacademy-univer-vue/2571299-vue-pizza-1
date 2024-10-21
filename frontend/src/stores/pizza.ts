import { defineStore } from "pinia";

interface Ingredient {
  id: number;
  name: string;
  image: string;
  price: number;
}

interface Dough {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
}

interface Sauce {
  id: number;
  name: string;
  price: number;
}

interface Size {
  id: number;
  name: string;
  image: string;
  multiplier: number;
}

interface ChoosedIngredient {
  ingredientId: number;
  quantity: number;
}

interface Choosed {
  name: string;
  sauceId: number;
  doughId: number;
  sizeId: number;
  ingredients: ChoosedIngredient[];
}

interface PizzaState {
  ingredients: Ingredient[];
  dough: Dough[];
  sauces: Sauce[];
  sizes: Size[];
  choosed: Choosed;
}

export const usePizzaStore = defineStore("pizza", {
  state: (): PizzaState => ({
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
    ],
    choosed: {
      name: "",
      sauceId: 1,
      doughId: 1,
      sizeId: 1,
      ingredients: [],
    },
  }),
  getters: {
    getSizeName: (state) => (id: number) =>
      state.sizes.find((e) => e.id == id)?.name,
    getDoughName: (state) => (id: number) =>
      state.dough.find((e) => e.id == id)?.name,
    getSauceName: (state) => (id: number) =>
      state.sauces.find((e) => e.id == id)?.name,
    getIngredientName: (state) => (id: number) =>
      state.ingredients.find((e) => e.id == id)?.name,

    getName: (state) => state.choosed.name,
    getDough: (state) => state.dough,
    getIngredientEnName: (state) => (id: number) =>
      state.ingredients
        .find((e) => e.id == id)!
        .image.split("/")[4]
        .split(".")[0],
    getIngredients: (state) => state.ingredients,
    getSauces: (state) => state.sauces,
    getSizes: (state) => state.sizes,

    getChoosedIngredients: (state) =>
      state.choosed.ingredients.map((i) => ({
        ...state.ingredients.find((e) => e.id == i.ingredientId),
        ...i,
      })),

    getPrice(state) {
      return this.getPizzaPrice(state.choosed);
    },

    getPizzaPrice:
      (state) =>
      (pizza: {
        sauceId: number;
        doughId: number;
        sizeId: number;
        ingredients: ChoosedIngredient[];
      }) => {
        let price = 0;

        price += state.dough.find((v) => v.id == pizza.doughId)?.price ?? 0;
        price += state.sauces.find((v) => v.id == pizza.sauceId)?.price ?? 0;
        price += pizza.ingredients
          .map(
            (choosedIngredient) =>
              (state.ingredients.find(
                (v) => v.id == choosedIngredient.ingredientId
              )?.price ?? 0) * choosedIngredient.quantity
          )
          .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        price *= state.sizes.find((v) => v.id == pizza.sizeId)?.multiplier ?? 1;

        return price;
      },
    isReadyForCooking: (state) =>
      state.choosed.ingredients.length > 0 && state.choosed.name,
  },
  actions: {
    setSauceId(id: number) {
      this.choosed.sauceId = id;
    },
    setDoughId(id: number) {
      this.choosed.doughId = id;
    },
    setSizeId(id: number) {
      this.choosed.sizeId = id;
    },
    setIngredientQuantity(ingredientId: number, quantity: number) {
      const ingredientIndex = this.choosed.ingredients.findIndex(
        (ingredient: ChoosedIngredient) =>
          ingredient.ingredientId === ingredientId
      );

      if (ingredientIndex !== -1) {
        this.choosed.ingredients[ingredientIndex].quantity = quantity;
      } else {
        this.choosed.ingredients.push({ ingredientId, quantity });
      }
    },
    setName(name: string) {
      this.choosed.name = name;
    },
    clearChoosed() {
      this.choosed = {
        name: "",
        sauceId: 1,
        doughId: 1,
        sizeId: 1,
        ingredients: [],
      };
    },
  },
});
