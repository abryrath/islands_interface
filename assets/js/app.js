// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from '../css/app.css';

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//
import 'phoenix_html';

// Import local files
//
// Local files can be imported directly using relative paths, for example:
import socket from './socket';
import Vue from 'vue';
import App from './components/App.vue';

// class Client {

// }
// Vue.component('a-game', AGame);

const $vm = new Vue({
    el: '#app',
    components: {
        App,
        // Game
    }
    // render: h => h(<App/>),
});

// socket.connect();

// window.newChannel = function(subtopic, screenName) {
//   return socket.channel(`game:${subtopic}`, {
//     screenName,
//   });
// };

// window.join = function(channel) {
//   channel
//     .join()
//     .receive('ok', resp => {
//       console.log('Joined successfully!', resp);
//     })
//     .receive('error', resp => {
//       console.error('Unable to join', resp);
//     });
// };

// window.sayHello = function(channel, greeting) {
//     channel.push("hello", {message: greeting})
//     .receive("ok", resp => {
//         console.log("Hello", resp.message);
//     })
//     .receive("error", resp => {
//         console.log("Unable to say hello to the channel", resp.message);
//     });
// }

// let gameChannel = window.newChannel('moon', 'moon');
