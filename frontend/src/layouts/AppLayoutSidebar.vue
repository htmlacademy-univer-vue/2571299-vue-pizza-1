<template>
  <div class="app_layout">
    <AppHeader />
    <AppSidebar />
    <div class="layout__content">
      <slot />
    </div>
  </div>
</template>

<script setup>
import AppHeader from "../common/components/AppHeader.vue";
import AppSidebar from "../common/components/AppSidebar.vue";
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.title {
  box-sizing: border-box;
  width: 100%;
  margin: 0;

  color: $black;

  &--big {
    @include b-s36-h42;
  }

  &--small {
    @include b-s18-h21;
  }
}

.layout__content {
  padding-top: 22px;
  padding-right: 2.12%;
  padding-left: 200px;
}
</style>
