<template>
  <div class="cart-form__address">
    <span class="cart-form__label">Новый адрес:</span>

    <div class="cart-form__input">
      <label class="input">
        <span>Улица*</span>
        <input
          v-model="cartStore.choosedAddress.street"
          :readonly="cartStore.choosedReceivingOrderEnum != 2"
          type="text"
          name="street"
        />
      </label>
    </div>

    <div class="cart-form__input cart-form__input--small">
      <label class="input">
        <span>Дом*</span>
        <input
          v-model="cartStore.choosedAddress.building"
          :readonly="cartStore.choosedReceivingOrderEnum != 2"
          type="text"
          name="house"
        />
      </label>
    </div>

    <div class="cart-form__input cart-form__input--small">
      <label class="input">
        <span>Квартира</span>
        <input
          v-model="cartStore.choosedAddress.flat"
          :readonly="cartStore.choosedReceivingOrderEnum != 2"
          type="text"
          name="apartment"
        />
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "../../stores/cart";
const cartStore = useCartStore();
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.cart-form__address {
  display: flex;
  align-items: center;

  width: 100%;
  margin-top: 20px;
}

.cart-form__label {
  @include b-s16-h19;

  white-space: nowrap;
}

.cart-form__input {
  flex-grow: 1;

  margin-bottom: 20px;
  margin-left: 16px;

  &--small {
    max-width: 120px;
  }
}
</style>
