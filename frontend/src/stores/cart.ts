import { defineStore } from "pinia";
import MiscService from "../services/MiscService";
import OrderService from "../services/OrderService.ts";
import { useUserStore } from "./user.ts";

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
  id?: number;
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
    misc: [],
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
      return state.choosedPhone && this.getPrice > 0;
    },
  },
  actions: {
    async fetchMisc() {
      this.misc = await MiscService.fetch();
    },
    async createOrder() {
      const userStore = useUserStore();

      await OrderService.create({
        userId: userStore.getWhoAmI!.id,
        phone: this.choosedPhone,
        address:
          this.choosedReceivingOrderEnum == 1
            ? null
            : {
                street: this.choosedAddress.street,
                building: this.choosedAddress.building,
                flat: this.choosedAddress?.flat,
                comment: this.choosedAddress?.comment,
              },
        pizzas: this.choosedPizzas.map((e: ChoosedPizza) => ({
          name: e.name,
          sauceId: e.sauceId,
          doughId: e.doughId,
          sizeId: e.sizeId,
          quantity: e.quantity,
          ingredients: e.ingredients.map((ingredient) => ({
            ingredientId: ingredient.ingredientId,
            quantity: ingredient.quantity,
          })),
        })),
        misc: this.choosedMiscs,
      });
    },

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
      const userStore = useUserStore();
      const numberIndex = Number(index);

      if (numberIndex == 1) {
        // Если выбрано "Заберу сам"
        this.setChoosedAddress(null);
        this.choosedReceivingOrderEnum = 1;
      } else if (numberIndex === 2) {
        // Если выбрано "Новый адрес"
        this.setChoosedAddress({} as any);
        this.choosedReceivingOrderEnum = 2;
      } else {
        // Если выбран один из существующих адресов
        const addressIndex = numberIndex - 3;
        this.setChoosedAddress(userStore.getAddresses[addressIndex]);
        this.choosedReceivingOrderEnum = 3;
      }
    },
    setChoosedPhone(phone: string) {
      this.choosedPhone = phone;
    },
    setChoosedAddress(address: ChoosedAddress | null) {
      this.choosedAddress = address;
    },

    clearCart() {
      this.choosedAddress = {
        street: "",
        building: "",
        flat: "",
        comment: "",
      };
      this.choosedPhone = "";
      this.choosedMiscs = [];
      this.choosedPizzas = [];
      this.choosedReceivingOrderEnum = 1;
    },
  },
});
