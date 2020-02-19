<template>
  <div class="messages">
    <ul>
      <li v-for="m in messages">{{ m }}</li>
    </ul>
    <div>{{ $props.nameSet ? 'True' : 'False' }}</div>
  </div>
</template>

<script>
import socket from "../socket";
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({
    props: {
        nameSet
    }
})
export default class Client extends Vue {
  socket = undefined;
  channel = undefined;
  messages = [];

  created() {
    this.initClient();
  }
  initClient() {
    this.socket = socket;
    this.socket.connect();
    // return socket;
  }
  joinLobby(name) {
      console.log('joinLobby');
    this.channel = this.socket
      .channel("game:lobby", {
        name
      });
    //   .join();
    // this.channel.j
    // this.channel.on("ok", a => console.log(a));
    // this.channel.push("hello");

    this.channel.join()
        .receive("join", resp => this.handleResp(resp))
        .receive("ok", resp => this.handleResp(resp));

    this.channel.push('hello');
    // return s;
  }
  joinGame(gameId, name) {
    // s.leave();
    this.channel = this.socket.channel(`game:${gameId}`, {
      name: name
    });

    this.channel.receive("ok", resp => this.handleResp);
    // return s;
  }

  handleResp(resp) {
    console.log(resp);
    this.messages.push(resp);
  }

  messagesMarkup() {
    let output = "<ul>";
    output += this.messages.reduce((acc, curr, i) => {
      return `${acc}<li data-index="${i}">${curr}</li>`;
    }, "");
    output += "</ul>";
    return output;
  }
}
</script>