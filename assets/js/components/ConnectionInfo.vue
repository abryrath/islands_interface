<template>
  <div>
    <h2>Connection Info</h2>
    <div class="flex flex-col">
      <div class="flex flex-row">
        <div class="w-1/2">
          <strong>Current Room</strong>
        </div>
        <div class="w-1/2">{{ $props.room }}</div>
      </div>
      <div class="flex flex-row">
        <div class="w-1/2">
          <strong>Current Users</strong>
        </div>
        <div class="w-1/2">{{ $props.users }}</div>
      </div>

      <strong>Current Users</strong>:
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({
    name: 'connection-info',
    props: [
        'room',
        'users',
    ]
})
export default class ConnectionInfo extends Vue {}
</script>

<style lang="scss">
</style>