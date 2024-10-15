<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <DoughChooser v-model="doughtValue" />
        <DiameterChooser v-model="diameterEnumValue" />

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>

            <div class="sheet__content ingredients">
              <SauceChooser v-model="sauceValue" />
              <IngredientsChooser v-model="ingredientsValue" />
            </div>
          </div>
        </div>

        <div class="content__pizza">
          <PizzaNameInput v-model="pizzaNameValue" />
          <PizzaObject />
          <div class="content__result">
            <p>Итого: 0 ₽</p>
            <button type="button" class="button" disabled>Готовьте!</button>
          </div>
        </div>
        <div class="content">
          {{ ingredientsValue }}
        </div>
        <div class="content">{{ doughtValue }}</div>
        <div class="content">{{ diameterEnumValue }}</div>
        <div class="content">{{ pizzaNameValue }}</div>
        <div class="content">{{ sauceValue }}</div>
      </div>
    </form>
  </main>
</template>

<script setup>
import DoughChooser from "../modules/constructor/DoughChooser.vue";
import DiameterChooser from "../modules/constructor/DiameterChooser.vue";
import SauceChooser from "../modules/constructor/SauceChooser.vue";
import IngredientsChooser from "../modules/constructor/IngredientsChooser.vue";
import PizzaObject from "../modules/constructor/PizzaObject.vue";
import PizzaNameInput from "../modules/constructor/PizzaNameInput.vue";
import { ref } from "vue";
import { Ingredients } from "../modules/constructor/Ingredients";

const doughtValue = ref("");
const diameterEnumValue = ref();
const pizzaNameValue = ref("");
const sauceValue = ref("");
const ingredientsValue = ref(new Ingredients());
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

// content
.content__wrapper {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  width: 920px;
  margin: 0 auto;
  padding-right: 2.12%;
  padding-bottom: 30px;
  padding-left: 2.12%;
}

.content__ingredients {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}

.content__pizza {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.content__result {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 25px;

  p {
    font-size: 24px;
    line-height: 28px;

    margin: 0;
  }

  button {
    margin-left: 12px;
    padding: 16px 45px;
  }
}
</style>
