<!-- <template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  //
</script> -->

<template>
  <v-layout class="rounded rounded-md">
    <v-navigation-drawer>
      <v-list>
        <v-list-item title="Navigation drawer"></v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list-item rounded="xl" link title="List Item 1"></v-list-item>
      <v-list-item rounded="xl" link title="List Item 2"></v-list-item>
      <v-list-item rounded="xl" link title="List Item 3"></v-list-item>
    </v-navigation-drawer>

    <v-app-bar title="Application bar"></v-app-bar>

    <v-main class="d-flex align-center justify-center" style="min-height: 700px;">
      <router-view />

      <AppFooter />
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
//
</script>