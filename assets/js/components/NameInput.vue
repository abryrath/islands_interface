<template>
  <div>
    <form @submit="onSubmit">
      <input type="text" v-model="name" v-bind:disabled="nameSet" />
      <input type="submit" @click="onSubmit" value="Set" v-bind:disabled="nameSet" />
    </form>
  </div>
</template>

<script>
import Vue from "vue";
import { Component, Emit } from "vue-property-decorator";

@Component
export default class NameInput extends Vue {
  name = "Abry";
  nameSet = false;

  @Emit("name-set")
  onSubmit(e) {
    e.preventDefault();

    this.nameSet = true;
    return this.name;
  }
}
</script>