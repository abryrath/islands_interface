<template>
  <div class="messages">
    <h5>Client</h5>
    <pre v-if="$props.nameSet">{{ JSON.stringify($props, null, 2) }}</pre>
    <ul>
      <li v-for="m,i in messages" v-bind:key="i">{{ m }}</li>
    </ul>
    <!-- <div>{{ $props.nameSet ? 'True' : 'False' }}</div> -->
    <ul>
      <li v-for="user in onlineUsers" v-bind:key="user.id">
        <pre>
                {{ JSON.stringify(user, null, 2) }}
            </pre>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import socket from "../socket";
import { Presence, Socket, Channel } from "phoenix";
import Vue from "vue";
import { Component, Watch, Emit } from "vue-property-decorator";
import IUser from "../interfaces/User";

@Component({
  props: ["nameSet", "name", "gameSet"]
})
export default class Client extends Vue {
  socket: Socket = undefined;
  channel: Channel = undefined;
  messages: string[] = [];
  presence: Presence = undefined;
  onlineUsers: IUser[] = [];

  created() {
    this.initClient();
  }

  initClient() {
    this.socket = socket;
    this.socket.connect();
    // return socket;
  }

  @Watch("nameSet")
  joinLobby(name: string) {
    console.log("joinLobby", this.$props.name);
    this.channel = this.socket.channel("game:lobby", {
      name: this.$props.name
    });
    this.channel
      .join()
      .receive("join", this.handleResp)
      .receive("ok", this.handleResp);

    this.channel.push("hello", {});
    this.presence = new Presence(this.channel);
    this.presence.onSync(this.updateUsers);
    // return s;
  }

  @Watch("gameSet")
  joinGame(gameId: string, name: string) {
    // s.leave();
    this.channel = this.socket.channel(`game:${gameId}`, {
      name: name
    });

    this.channel.join().receive("ok", this.handleResp);
    // return s;
  }

  handleResp(resp?: any) {
    console.log(resp);
    if (!resp) {
        this.messages.push('[Empty response]');
        return;
    }
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

  @Emit("update-users")
  updateUsers(): IUser[] {
    let users: IUser[] = [];
    this.presence.list((id, { metas: [meta, ...rest] }) => {
      users.push({
        id: id,
        metadata: meta,
        // additionalInfo: rest
      });
    });
    this.onlineUsers = users;
    return users;
  }
  //   getOnlineUsers(presence) {
  //       if (!this.presence) {
  //           return '';
  //       }
  //       let response = '';
  //       this.presence.list((id, {metas: [first, ...rest]}) => {
  //           let count = rest.length + 1;
  //           response += `<br>${id} ${count}`;
  //       })
  //   }
}
</script>