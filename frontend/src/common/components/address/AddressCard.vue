<template>
  <div class="layout__address">
    <div v-if="!editMode" class="sheet address-form">
      <div class="address-form__header">
        <b>{{ address.name }}</b>
        <div class="address-form__edit">
          <button type="button" class="icon" @click="editMode = true">
            <span class="visually-hidden"> Изменить адрес </span>
          </button>
        </div>
      </div>
      <p>{{ address.name }}</p>
      <small>{{ address.comment }}</small>
    </div>

    <address-edit-form
      v-else
      :address="address"
      :title="`Адрес ${index}`"
      @delete="emit('delete')"
      @save="save"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import AddressEditForm from "@/common/components/address/AddressEditForm.vue";

defineProps({
  address: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["delete", "save"]);

const editMode = ref(false);

const save = (address) => {
  emit("save", address);
  editMode.value = false;
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.layout__address {
  margin-top: 16px;
}

.icon {
  cursor: pointer;
  display: block;
  overflow: hidden;

  width: 32px;
  height: 32px;

  transition: 0.3s;

  border: none;
  border-radius: 50%;
  outline: none;
  background-color: $white;
  background-image: url("/api/public/img/edit.svg");
  background-repeat: no-repeat;
  background-position: center;

  &:hover {
    box-shadow: $shadow-light;
  }

  &:active {
    box-shadow: $shadow-large;
  }

  &:focus {
    box-shadow: $shadow-regular;
  }
}

.address-form {
  $bl: &;

  position: relative;

  padding-top: 0;
  padding-bottom: 26px;

  &--opened {
    #{$bl}__header {
      padding: 16px;
    }
  }

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
    padding: 0 16px;
  }

  small {
    @include l-s11-h13;

    display: block;

    padding: 0 16px;
  }
}

.address-form__wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  width: 80%;
  padding: 16px;
}

.address-form__input {
  width: 100%;
  margin-bottom: 16px;

  &--size {
    &--normal {
      width: 60.5%;
    }

    &--small {
      width: 18%;
    }
  }
}

.address-form__buttons {
  display: flex;
  justify-content: flex-end;

  padding: 0 16px;

  button {
    margin-left: 16px;
    padding: 16px 27px;
  }
}

.address-form__header {
  @include b-s14-h16;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 21px;
  padding: 10px 16px;

  border-bottom: 1px solid rgba($green-500, 0.1);
}
</style>
