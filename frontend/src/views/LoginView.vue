<template>
  <div class="sign-form">
    <router-link :to="{ name: 'home' }" class="close close--white">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </router-link>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form @submit.prevent="login">
      <div class="sign-form__input">
        <label class="input">
          <span>E-mail</span>
          <app-input
            v-model="email"
            type="email"
            name="email"
            class="input"
            placeholder="E-mail"
            :error-text="validations.email.error"
          />
        </label>
      </div>

      <div class="sign-form__input">
        <label class="input">
          <span>Пароль</span>
          <app-input
            v-model="password"
            type="password"
            name="password"
            class="input"
            placeholder="Пароль"
            :error-text="validations.password.error"
          />
        </label>
      </div>
      <app-button class="button--primary" type="submit">
        Авторизоваться
      </app-button>
      <!--       Поле ошибок сервера-->
      <div v-if="serverErrorMessage" class="server-error-message">
        {{ serverErrorMessage }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import AppButton from "../common/components/AppButton.vue";
import AppInput from "../common/components/AppInput.vue";
import { validateFields, clearValidationErrors } from "../common/validator";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";

const router = useRouter();
const userStore = useUserStore();

const setEmptyValidations = () => ({
  email: {
    error: "",
    rules: ["required", "email"],
  },
  password: {
    error: "",
    rules: ["required"],
  },
});

const email = ref("");
const password = ref("");
const validations = ref(setEmptyValidations());
const serverErrorMessage = ref(null);

watch(email, () => {
  // Очищаем поля ошибок при вводе новых данных
  if (serverErrorMessage.value) serverErrorMessage.value = null;
  if (validations.value.email.error) clearValidationErrors(validations.value);
});

watch(password, () => {
  // Очищаем поля ошибок при вводе новых данных
  if (serverErrorMessage.value) serverErrorMessage.value = null;
  if (validations.value.password.error)
    clearValidationErrors(validations.value);
});

async function login() {
  if (
    !validateFields(
      { email: email.value, password: password.value },
      validations.value
    )
  ) {
    return;
  }
  const responseMessage = await userStore.login(email.value, password.value);
  // Проверяем, если возвращается статус не 'ok', то показываем ошибку сервера
  if (responseMessage !== "ok") {
    serverErrorMessage.value = responseMessage;
  } else {
    // Получаем данные пользователя
    await userStore.getMe();
    // Если логин без ошибок, перенаправляем на главную страницу
    await router.push({ name: "home" });
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.sign-form {
  @include pf_center-all;

  z-index: 10;

  display: block;

  box-sizing: border-box;
  width: 455px;
  padding-top: 146px;
  padding-right: 32px;
  padding-bottom: 32px;
  padding-left: 32px;

  background: $white url("@/assets/img/popup.svg") no-repeat center top;
  box-shadow: $shadow-light;

  button {
    margin: 0 auto;
    padding: 16px 14px;
  }
}

.sign-form__title {
  margin-bottom: 24px;

  text-align: center;
}

.sign-form__input {
  margin-bottom: 16px;
}

// new

.server-error-message {
  margin-top: 20px;
  color: $red-700;
}
</style>
