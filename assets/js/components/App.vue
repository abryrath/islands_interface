<template>
  <div>
    <h4>App</h4>
    <pre>Rules State: {{ current() }}</pre>
    <pre>Component State: {{ JSON.stringify({name, nameSet, availableGames, gameSet, id}, null, 2) }}</pre>
    <ConnectionInfo v-bind:room="room" v-bind:users="users" />
    <NameInput v-on:name-set="handleNameSet" />
    <Game />
    <Client
      ref="client"
      v-bind:name-set="nameSet"
      v-bind:name="name"
      v-bind:game-set="gameSet"
      v-on:update-users="updateUsers"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Game from "./Game.vue";
import NameInput from "./NameInput.vue";
import Rules from "../rules";
import Client from "./Client.vue";
import ConnectionInfo from "./ConnectionInfo.vue";

import IGame from "../interfaces/Game";
import IUser from "../interfaces/User";

@Component({
  components: {
    Game,
    NameInput,
    Client,
    ConnectionInfo
  }
})
export default class App extends Vue {
  name: string = "";
  nameSet: boolean = false;
  availableGames: IGame[] = [];
  rules = new Rules();
  gameSet: boolean = false;
  // socket = undefined;
  id: string = undefined;
  users: IUser[] = [];
  room: string = "";

  created() {
    const idElement: HTMLInputElement = document.querySelector("[data-id]");
    this.id = idElement.value as string;
  }

  handleNameSet(e: string) {
    // console.log(e);
    this.rules.setName();
    this.nameSet = true;
    this.name = e;
    this.room = "lobby";

    // this.$refs.client.joinLobby(this.name, this.id);
    // this.socsket = joinGame(this.socket, this.id, this.name)
  }

  handleGameSet(e: string) {
    this.rules.setGame();
    this.gameSet = true;
    this.room = this.name;
  }

  current() {
    return this.rules.getState();
  }

  updateUsers(e: IUser[]) {
    console.log("App - users updated in client");
    this.users = e;
  }
}
</script>