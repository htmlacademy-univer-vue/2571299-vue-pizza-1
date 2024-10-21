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

interface ChoosedAddress {
  street: string;
  building: string;
  flat: string;
  comment: string;
}

interface CartState {
  misc: Misc[];
  choosedMiscs: ChoosedMisc[];
  choosedPizzas: ChoosedPizza[];
  choosedReceivingOrderEnum: number;
  choosedPhone: string;
  choosedAddress: ChoosedAddress;
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
    ],
    choosedMiscs: [],
    choosedPizzas: [],
    choosedReceivingOrderEnum: 1,
    choosedPhone: "",
    choosedAddress: {
      street: "",
      building: "",
      flat: "",
      comment: "",
    },
  }),
  getters: {
    getMisc: (state) => state.misc,
    getMiscById: (state) => (id: number) => state.misc.find((e) => e.id == id),
    getChoosedPizzas: (state) => state.choosedPizzas,
    getChoosedMiscs: (state) =>
      state.misc.map((e) => ({
        ...e,
        quantity: 0,
        ...state.choosedMiscs.find((e2) => e2.miscId == e.id),
      })),

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
    isReadyForOrder(state) {
      return (
        state.choosedPhone &&
        state.choosedAddress.building &&
        state.choosedAddress.flat &&
        state.choosedAddress.street &&
        this.getPrice > 0
      );
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
    setPizzaQuantity(pizzaIndex: number, quantity: number) {
      this.choosedPizzas[pizzaIndex].quantity = quantity;
    },

    addPizza(pizza: ChoosedPizza) {
      this.choosedPizzas.push(pizza);
    },

    removePizza(index: number) {
      if (index >= 0 && index < this.choosedPizzas.length) {
        this.choosedPizzas.splice(index, 1);
      }
    },

    setChoosedReceivingOrderEnum(index: number | string) {
      this.choosedReceivingOrderEnum = Number(index);
    },
    setChoosedPhone(phone: string) {
      this.choosedPhone = phone;
    },

    clearCart() {
      this.choosedMiscs = [];
      this.choosedPizzas = [];
    },
  },
});
