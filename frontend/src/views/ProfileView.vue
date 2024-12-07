<template>
  <div class="layout__title">
    <h1 class="title title--big">Мои данные</h1>
  </div>

  <div class="user">
    <picture>
      <img
        :src="getPublicImage(userStore.getWhoAmI.avatar)"
        :alt="userStore.getWhoAmI.name"
        width="72"
        height="72"
      />
    </picture>
    <div class="user__name">
      <span>{{ userStore.getWhoAmI.name }}</span>
    </div>
    <p class="user__phone">
      Контактный телефон: <span>{{ userStore.getWhoAmI.phone }}</span>
    </p>
  </div>

  <div class="layout__address">
    <address-card
      v-for="(address, index) in userStore.addresses"
      :key="address.id"
      :address="address"
      :index="index + 1"
      @delete="userStore.removeAddress(address.id)"
      @save="updateAddress(address, $event)"
    />
  </div>

  <div v-if="!isNewAddressFormOpened" class="layout__button">
    <button
      type="button"
      class="button button--border"
      @click="isNewAddressFormOpened = true"
    >
      Добавить новый адрес
    </button>
  </div>

  <div v-else class="layout__address">
    <address-edit-form
      title="Новый адрес"
      @save="addAddress"
      @delete="isNewAddressFormOpened = false"
    />
  </div>
</template>

<script setup>
import { useUserStore } from "../stores/user";
import { getPublicImage } from "../common/helpers";
import AddressCard from "../common/components/address/AddressCard.vue";
import AddressEditForm from "../common/components/address/AddressEditForm.vue";
import { ref } from "vue";
const userStore = useUserStore();

userStore.fetchAddresses();
const isNewAddressFormOpened = ref(false);

const addAddress = async (address) => {
  await userStore.addAddress(address);
  isNewAddressFormOpened.value = false;
};

const updateAddress = (address, data) => {
  userStore.updateAddress({
    ...address,
    ...data,
  });
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

// user
.user {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  margin-bottom: 33px;
}

.user__name {
  @include b-s20-h23;

  margin-left: 30px;

  span {
    display: inline-block;

    vertical-align: middle;
  }
}

.user__button {
  display: inline-block;

  cursor: pointer;
  vertical-align: middle;
}

.user__phone {
  @include b-s16-h19;

  width: 100%;
  margin-top: 20px;

  span {
    font-weight: 400;
  }
}

.layout__address {
  margin-top: 16px;
}

.layout__button {
  margin-top: 40px;

  button {
    padding: 12px 23px;
  }
}

.layout__title {
  margin-bottom: 27px;
}
</style>
