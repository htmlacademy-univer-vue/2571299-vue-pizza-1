<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>
      <div class="sheet__content dough">
        <label
          v-for="dough in store.getDough"
          :key="dough.id"
          class="dough__input"
          :style="{ '--background-image': `url(${dough.image})` }"
        >
          <input
            type="radio"
            name="dought"
            class="visually-hidden"
            :value="dough.id"
            :checked="store.choosed.doughId === dough.id"
            @input="store.setDoughId($event.target.value)"
          />
          <b>{{ dough.name }}</b>
          <span>{{ dough.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePizzaStore } from "../../stores/pizza";
const store = usePizzaStore();
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.dough__input {
  position: relative;

  margin-right: 8%;
  margin-bottom: 20px;
  padding-left: 50px;

  cursor: pointer;

  b {
    @include r-s16-h19;

    &::before {
      @include p_center-v;

      width: 36px;
      height: 36px;

      content: "";
      transition: 0.3s;

      border-radius: 50%;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
  }

  span {
    @include l-s11-h13;

    display: block;
  }

  b {
    &::before {
      background-image: var(--background-image);
    }
  }

  &:hover {
    b::before {
      box-shadow: $shadow-regular;
    }
  }

  input {
    &:checked + b::before {
      box-shadow: $shadow-large;
    }
  }
}

.content__dough {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}
</style>
