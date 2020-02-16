<template>
  <div>
    <NameInput/>
    <Game />
  </div>
</template>

<script>
import Game from "./Game.vue";
import NameInput from './NameInput.vue';
export default {
  data: function() {
    return {
      app: true
    };
  },
  components: {
    Game,
    NameInput
  }
};
</script>