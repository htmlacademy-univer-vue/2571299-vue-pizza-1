<template>
  <img
    src="@/assets/img/product.svg"
    class="product__img"
    width="56"
    height="56"
    :alt="name"
  />
  <div class="product__text">
    <h2>{{ name }}</h2>
    <ul>
      <li>
        {{ pizzaStore.getSizeName(sizeId) }},
        {{ pizzaStore.getDoughName(doughId)?.toLowerCase() }} тесто
      </li>
      <li>Соус: {{ pizzaStore.getSauceName(sauceId)?.toLowerCase() }}</li>
      <li>
        Начинка:
        {{
          ingredientIds
            .map((ingredientId) =>
              pizzaStore.getIngredientName(Number(ingredientId))
            )
            .join(", ")
            .toLocaleLowerCase()
        }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { usePizzaStore } from "../../stores/pizza";
const pizzaStore = usePizzaStore();

defineProps({
  name: {
    type: String,
    required: true,
  },
  sizeId: {
    type: Number,
    required: true,
  },
  doughId: {
    type: Number,
    required: true,
  },
  sauceId: {
    type: Number,
    required: true,
  },
  ingredientIds: {
    type: Array,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.product__text {
  margin-left: 15px;

  h2 {
    @include b-s18-h21;

    margin-top: 0;
    margin-bottom: 10px;
  }

  ul {
    @include clear-list;
    @include l-s11-h13;
  }
}
</style>
