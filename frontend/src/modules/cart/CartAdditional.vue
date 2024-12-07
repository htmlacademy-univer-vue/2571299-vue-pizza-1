<template>
  <div class="cart__additional">
    <ul class="additional-list">
      <li
        v-for="mics in cartStore.getChoosedMiscs"
        :key="mics.id"
        class="additional-list__item sheet"
      >
        <p class="additional-list__description">
          <img :src="mics.image" width="39" height="60" :alt="mics.name" />
          <span>{{ mics.name }}</span>
        </p>

        <div class="additional-list__wrapper">
          <div class="counter additional-list__counter">
            <AppCounter
              :value="mics.quantity"
              accent
              @update:value="cartStore.setMiscQuantity(mics.id, $event)"
            />
          </div>

          <div class="additional-list__price">
            <b>× {{ mics.price }} ₽</b>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "../../stores/cart";
import AppCounter from "../../common/components/AppCounter.vue";
const cartStore = useCartStore();
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.cart__additional {
  margin-top: 15px;
  margin-bottom: 25px;
}

// additional-list
.additional-list {
  @include clear-list;

  display: flex;
  flex-wrap: wrap;
}

.additional-list__description {
  display: flex;
  align-items: flex-start;

  margin: 0;
  margin-bottom: 8px;
}

.additional-list__item {
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  width: 200px;
  margin-right: 15px;
  margin-bottom: 15px;
  padding-top: 15px;
  padding-bottom: 15px;

  img {
    margin-right: 10px;
    margin-left: 15px;
  }

  span {
    @include b-s14-h16;

    display: inline;

    width: 100px;
    margin-right: 15px;
  }
}

.additional-list__wrapper {
  display: flex;
  align-items: center;

  box-sizing: border-box;
  width: 100%;
  margin-top: auto;
  padding-top: 18px;
  padding-right: 15px;
  padding-left: 15px;

  border-top: 1px solid rgba($green-500, 0.1);
}

.additional-list__counter {
  width: 54px;
  margin-right: auto;
}

.additional-list__price {
  @include b-s16-h19;
}
</style>
