<template>
  <form class="layout-form" @submit.prevent="createOrder">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <CartPizza />
        <CartAdditional />

        <div class="cart__form">
          <div class="cart-form">
            <label class="cart-form__select">
              <span class="cart-form__label">Получение заказа:</span>

              <select
                v-model="cartStore.choosedReceivingOrderEnum"
                name="test"
                class="select"
                @change="handleSelectChange"
              >
                <option value="1">Заберу сам</option>
                <option value="2">Новый адрес</option>
                <option
                  v-for="(address, index) in userStore.getAddresses"
                  :key="address.id"
                  :value="3 + index"
                >
                  {{ address.name }}
                </option>
              </select>
            </label>

            <label class="input input--big-label">
              <span>Контактный телефон:</span>
              <input
                type="text"
                :value="cartStore.choosedPhone"
                name="tel"
                placeholder="+7 999-999-99-99"
                @input="cartStore.setChoosedPhone($event.target.value)"
              />
            </label>

            <CartFormAddress v-if="cartStore.choosedReceivingOrderEnum != 1" />
          </div>
        </div>
      </div>
    </main>
    <section class="footer">
      <div class="footer__more">
        <router-link
          :to="{ name: 'home' }"
          class="button button--border button--arrow"
          >Хочу еще одну</router-link
        >
      </div>
      <p class="footer__text">
        Перейти к конструктору<br />чтоб собрать ещё одну пиццу
      </p>
      <div class="footer__price">
        <b>Итого: {{ cartStore.getPrice }} ₽</b>
      </div>

      <div class="footer__submit">
        <button
          type="submit"
          class="button"
          :disabled="!cartStore.isReadyForOrder"
        >
          Оформить заказ
        </button>
      </div>
    </section>
  </form>
</template>

<script setup lang="ts">
import { useCartStore } from "../stores/cart";
import { useUserStore } from "../stores/user";
import CartFormAddress from "../modules/cart/CartFormAddress.vue";
import CartAdditional from "../modules/cart/CartAdditional.vue";
import CartPizza from "../modules/cart/CartPizza.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const cartStore = useCartStore();
const userStore = useUserStore();

cartStore.fetchMisc();
userStore.fetchAddresses();

async function createOrder() {
  await cartStore.createOrder();
  cartStore.clearCart();
  router.push({ name: "success" });
}

const handleSelectChange = (event) => {
  const selectedValue = event.target.value;
  cartStore.setChoosedReceivingOrderEnum(selectedValue);
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

// footer
.footer {
  display: flex;
  align-items: center;

  margin-top: auto;
  padding: 25px 2.12%;

  background-color: rgba($green-500, 0.1);
}

.footer__more {
  width: 220px;
  margin-right: 16px;

  a {
    padding-top: 16px;
    padding-bottom: 16px;
  }
}

.footer__text {
  @include l-s11-h13;

  color: rgba($black, 0.5);
}

.footer__price {
  @include b-s24-h28;

  margin-right: 12px;
  margin-left: auto;
}

.footer__submit {
  button {
    padding: 16px 14px;
  }
}

.container {
  width: 770px;
  margin: 0 auto;
}

// cart
.cart__title {
  margin-bottom: 15px;
}

.cart-form {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.cart-form__select {
  display: flex;
  align-items: center;

  margin-right: auto;

  span {
    margin-right: 16px;
  }
}

.cart-form__label {
  @include b-s16-h19;

  white-space: nowrap;
}

.layout-form {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.select {
  @include r-s16-h19;

  display: block;

  margin: 0;
  padding: 8px 16px;
  padding-right: 30px;

  cursor: pointer;
  transition: 0.3s;

  color: $black;
  border: 1px solid $purple-400;
  border-radius: 8px;
  outline: none;
  background-color: $silver-100;
  background-image: url("@/assets/img/select.svg");
  background-repeat: no-repeat;
  background-position: right 8px center;

  font-family: inherit;

  appearance: none;

  &:hover {
    border-color: $orange-100;
  }

  &:focus {
    border-color: $green-500;
  }
}
</style>
