<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>
      <div class="sheet__content dough">
        <label
          v-for="dough in doughs"
          :key="dough.id"
          class="dough__input"
          :class="`dough__input--${dough.type}`"
        >
          <input
            type="radio"
            name="dought"
            class="visually-hidden"
            :value="dough.type"
            :checked="modelValue === dough.type"
            @input="emit('update:modelValue', $event.target.value)"
          />
          <b>{{ dough.name }}</b>
          <span>{{ dough.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import doughs from "@/mocks/dough.json";

defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);
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

  &--light {
    b {
      &::before {
        background-image: url("@/assets/img/dough-light.svg");
      }
    }
  }

  &--large {
    b {
      &::before {
        background-image: url("@/assets/img/dough-large.svg");
      }
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
