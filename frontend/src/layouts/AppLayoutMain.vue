<template>
  <div class="app_layout">
    <AppHeader />
    <slot />
  </div>
</template>

<script setup>
import AppHeader from "../common/components/AppHeader.vue";
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
</style>
