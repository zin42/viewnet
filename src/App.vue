<template>
  <div id="app">
    <router-view></router-view>
    <Frame/>
  </div>
</template>

<script>
import Home from './components/Home.vue';
import Frame from './components/Frame.vue';

export default {
  name: 'app',
  components: {
    Home,
    Frame,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  /* margin-top: 60px; */
}
body {
  background: linear-gradient(rgb(55, 63, 63) 10%, rgb(93, 102, 108)) no-repeat;
  height: 100vh;
  width: 100vw;
  padding: 0;
  margin: 0;
  color: indianred;
}
</style>
