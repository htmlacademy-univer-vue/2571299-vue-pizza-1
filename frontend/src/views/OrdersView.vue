<template>
  <div class="layout__title">
    <h1 class="title title--big">История заказов</h1>
  </div>

  <section v-for="order in userStore.getOrders" class="sheet order">
    <div class="order__wrapper">
      <div class="order__number">
        <b>Заказ №{{ order.id }}</b>
      </div>

      <div class="order__sum">
        <span>Сумма заказа: {{ calcOrderPrice(order) }} ₽</span>
      </div>

      <div class="order__button">
        <button type="button" class="button button--border">Удалить</button>
      </div>
      <div class="order__button">
        <button type="button" class="button">Повторить</button>
      </div>
    </div>

    <ul class="order__list">
      <li v-for="pizza in order.orderPizzas" class="order__item">
        <div class="product">
          <PizzaProduct
            :name="pizza.name"
            :sauce-id="pizza.sauceId"
            :dough-id="pizza.doughId"
            :size-id="pizza.sizeId"
            :ingredient-ids="
              pizza.ingredients.map((ingredient) => ingredient.ingredientId)
            "
          />
        </div>

        <p class="order__price">
          {{ pizza.quantity }}х{{ pizzaStore.getPizzaPrice(pizza) }} ₽
        </p>
      </li>
    </ul>

    <ul class="order__additional">
      <li
        v-for="mics in order.orderMisc.map((m) => ({
          ...cartStore.getMiscById(m.miscId),
          ...m,
        }))"
      >
        <img :src="mics.image" width="20" height="30" :alt="mics.name" />
        <p>
          <span>{{ mics.name }}</span>
          <b>{{ mics.quantity }}x{{ mics.price }} ₽</b>
        </p>
      </li>
    </ul>

    <p class="order__address">
      Адрес доставки:
      {{
        [
          order.orderAddress.street,
          order.orderAddress.building,
          order.orderAddress.flat,
        ].join(", ")
      }}
    </p>
  </section>
</template>

<script setup lang="ts">
import PizzaProduct from "../common/components/PizzaProduct.vue";
import { useCartStore } from "../stores/cart";
import { usePizzaStore } from "../stores/pizza";
import { Order, useUserStore } from "../stores/user";
const userStore = useUserStore();
const pizzaStore = usePizzaStore();
const cartStore = useCartStore();

const calcOrderPrice = (order: Order): number => {
  let price = 0;

  price += order.orderPizzas
    .map((pizza) => pizzaStore.getPizzaPrice(pizza) * pizza.quantity)
    .reduce((a, b) => a + b, 0);
  price += order.orderMisc
    .map((mics) => cartStore.getMiscById(mics.id)?.price ?? 0 * mics.quantity)
    .reduce((a, b) => a + b, 0);

  return price;
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.order {
  margin-bottom: 32px;
  padding-top: 0;
}

.order__wrapper {
  display: flex;
  align-items: center;

  padding: 6px 16px;

  border-bottom: 1px solid rgba($green-500, 0.1);

  b {
    @include b-s14-h16;
  }

  span {
    @include b-s14-h16;
  }

  button {
    padding: 8px 26px;
  }
}

.order__number {
  margin-right: auto;
}

.order__sum {
  margin-right: 16px;
}

.order__button {
  margin-left: 16px;
}

.order__list {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-top: 24px;
  padding-right: 10px;
  padding-left: 10px;
}

.order__item {
  display: flex;

  width: 310px;
  margin-right: 33px;
  margin-bottom: 32px;
}

.order__price {
  @include b-s16-h19;

  margin: 0;

  white-space: nowrap;
}

.order__additional {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-bottom: 5px;
  padding-left: 80px;

  li {
    @include b-s11-h16;

    width: 130px;
    margin-right: 24px;
    margin-bottom: 10px;
  }

  p {
    margin: 0;
  }

  img {
    float: left;

    margin-right: 7px;
  }

  b {
    display: block;
  }
}

.order__address {
  @include l-s11-h13;

  margin: 0;
  padding: 16px 10px;

  border-top: 1px solid rgba($green-500, 0.1);
}

.product {
  display: flex;
  align-items: center;
}

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

.layout__title {
  margin-bottom: 27px;
}
</style>
