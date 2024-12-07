<template>
  <AppLayout>
    <Suspense>
      <router-view />
    </Suspense>
  </AppLayout>
</template>

<script setup>
import { AppLayout } from "@/layouts";
</script>

<style lang="scss">
@import "@/assets/scss/app.scss";
</style>
