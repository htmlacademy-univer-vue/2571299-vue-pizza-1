<template>
  <label class="input">
    <span class="visually-hidden">Название пиццы</span>
    <input
      type="text"
      name="pizza_name"
      placeholder="Введите название пиццы"
      :value="store.getName"
      @input="store.setName($event.target.value)"
    />
  </label>
</template>

<script setup>
import { usePizzaStore } from "../../stores/pizza";
const store = usePizzaStore();
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
</style>
