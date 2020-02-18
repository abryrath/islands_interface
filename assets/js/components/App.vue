<template>
  <div>
    <pre>{{ current() }}</pre>
    <NameInput v-on:name-set="handleNameSet"/>
    <Game />
    <Client ref="client"/>
  </div>
</template>

<script>
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Game from './Game.vue';
import NameInput from './NameInput.vue';
import Rules from '../rules';
import Client from './Client.vue';

@Component({
    components: {
        Game,
        NameInput,
        Client
    }
})
export default class App extends Vue {
    name = "";
    nameSet = false;
    availableGames = [];
    rules = new Rules();
    // socket = undefined;
    id = undefined;

    created() {
        this.id = document.querySelector('[data-id]').value;
        // this.socket = initClient();
        // console.log(this.socket);
        // this.socket = joinLobby(this.socket, this.id);
        // console.log(this.socket);
    }

    handleNameSet(e) {
        // console.log(e);
        this.rules.setName();
        this.name = e;
        this.$refs.client.joinLobby(this.name, this.id);
        // this.socsket = joinGame(this.socket, this.id, this.name)
    }

    current() {
        return this.rules.getState();
    }


}
</script>