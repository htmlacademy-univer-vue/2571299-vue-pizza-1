<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>

    <ul class="ingredients__list">
      <li
        v-for="ingredient in store.getIngredients"
        :key="ingredient.id"
        class="ingredients__item"
      >
        <span
          class="filling"
          :style="{ '--background-image': `url(${ingredient.image})` }"
          >{{ ingredient.name }}
        </span>
        <AppCounter
          :value="
            store.choosed.ingredients.find(
              (e) => e.ingredientId == ingredient.id
            )?.quantity ?? 0
          "
          @update:value="store.setIngredientQuantity(ingredient.id, $event)"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import AppCounter from "../../common/components/AppCounter.vue";

import { usePizzaStore } from "../../stores/pizza";
const store = usePizzaStore();
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

// ingredients
.ingredients__input {
  margin-right: 24px;
  margin-bottom: 10px;
}

.ingredients__filling {
  width: 100%;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
  }
}

.ingredients__list {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}

.ingredients__item {
  width: 100px;
  min-height: 40px;
  margin-right: 17px;
  margin-bottom: 35px;
}

.ingredients__counter {
  width: 54px;
  margin-top: 10px;
  margin-left: 36px;
}

// filling
.filling {
  @include r-s14-h16;

  position: relative;

  display: block;

  padding-left: 36px;

  &::before {
    @include p_center-v;

    display: block;

    width: 32px;
    height: 32px;

    content: "";

    border-radius: 50%;
    background-color: $white;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 80% 80%;
    background-image: var(--background-image);
  }
}
</style>
