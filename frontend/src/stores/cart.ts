import { defineStore } from "pinia";

interface Misc {
  id: number;
  name: string;
  image: string;
  price: number;
}

interface ChoosedMisc {
  miscId: number;
  quantity: number;
}

interface ChoosedIngredient {
  ingredientId: number;
  quantity: number;
}

interface ChoosedPizza {
  name: string;
  sauceId: number;
  doughId: number;
  quantity: number;
  price: number;
  sizeId: number;
  ingredients: ChoosedIngredient[];
}

interface CartState {
  misc: Misc[];
  choosedMiscs: ChoosedMisc[];
  choosedPizzas: ChoosedPizza[];
}

export const useCartStore = defineStore("cart", {
  state: (): CartState => ({
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
    choosedMiscs: [
      {
        miscId: 1,
        quantity: 1,
      },
    ],
    choosedPizzas: [
      {
        name: "",
        sauceId: 1,
        doughId: 1,
        quantity: 1,
        price: 100,
        sizeId: 1,
        ingredients: Array.from({ length: 30 }, (_, i) => i + 1).map((i) => ({
          ingredientId: i,
          quantity: 0,
        })),
      },
    ],
  }),
  getters: {
    getMisc: (state) => state.misc,

    getPrice: (state) => {
      let price = 0;

      price += state.choosedMiscs
        .map(
          (choosedMisc) =>
            (state.misc.find((v) => v.id == choosedMisc.miscId)?.price ?? 0) *
            choosedMisc.quantity
        )
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      price += state.choosedPizzas
        .map((choosedPizza) => choosedPizza.price * choosedPizza.quantity)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

      return price;
    },
  },
  actions: {
    setMiscQuantity(miscId: number, quantity: number) {
      const miscIndex = this.choosedMiscs.findIndex(
        (misc: ChoosedMisc) => misc.miscId === miscId
      );

      if (miscIndex !== -1) {
        this.choosedMiscs[miscIndex].quantity = quantity;
      } else {
        this.choosedMiscs.push({ miscId, quantity });
      }
    },

    addPizza(pizza: ChoosedPizza) {
      this.choosedPizzas.push(pizza);
    },

    removePizza(index: number) {
      if (index >= 0 && index < this.choosedPizzas.length) {
        this.choosedPizzas.splice(index, 1);
      }
    },

    clearCart() {
      this.choosedMiscs = [];
      this.choosedPizzas = [];
    },
  },
});
