import { defineStore } from "pinia";
import { MAX_INGREDIENT_COUNT } from "../common/constants";
import DoughService from "../services/DoughService";
import IngredientService from "../services/IngredientService";
import SauceService from "../services/SauceService";
import SizeService from "../services/SizeService";

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
    ingredients: [],
    dough: [],
    sauces: [],
    sizes: [],
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

    getChoosedIngredientById: (state) => (id: number) =>
      state.choosed.ingredients.find((e) => e.ingredientId == id),

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
      state.choosed.name &&
      state.choosed.ingredients
        .map((e) => e.quantity)
        .reduce((a, b) => a + b, 0) > 0,
  },
  actions: {
    async fetchDough() {
      this.dough = await DoughService.fetch();
    },
    async fetchIngredients() {
      this.ingredients = await IngredientService.fetch();
    },
    async fetchSauces() {
      this.sauces = await SauceService.fetch();
    },
    async fetchSizes() {
      this.sizes = await SizeService.fetch();
    },

    setPizzaForChangeIt(pizza: Choosed) {
      this.choosed = pizza;
    },
    setSauceId(id: number | string) {
      this.choosed.sauceId = Number(id);
    },
    setDoughId(id: number | string) {
      this.choosed.doughId = Number(id);
    },
    setSizeId(id: number | string) {
      this.choosed.sizeId = Number(id);
    },
    setСhoosedIngredientQuantity(ingredientId: number, quantity: number) {
      const ingredientIndex = this.choosed.ingredients.findIndex(
        (ingredient: ChoosedIngredient) =>
          ingredient.ingredientId === ingredientId
      );

      if (ingredientIndex !== -1) {
        this.choosed.ingredients[ingredientIndex].quantity =
          quantity > MAX_INGREDIENT_COUNT ? MAX_INGREDIENT_COUNT : quantity;
      } else {
        this.choosed.ingredients.push({ ingredientId, quantity });
      }
    },
    incrementСhoosedIngredientQuantity(ingredientId: number) {
      const ingredientIndex = this.choosed.ingredients.findIndex(
        (ingredient: ChoosedIngredient) =>
          ingredient.ingredientId === ingredientId
      );

      if (ingredientIndex !== -1) {
        if (
          this.choosed.ingredients[ingredientIndex].quantity <
          MAX_INGREDIENT_COUNT
        ) {
          this.choosed.ingredients[ingredientIndex].quantity += 1;
        }
      } else {
        this.choosed.ingredients.push({ ingredientId, quantity: 1 });
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
