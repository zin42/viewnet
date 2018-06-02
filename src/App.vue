<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import Home from '/components/Home.vue';
import Home from './components/Home.vue';

export default {
  name: 'app',
  components: {
    Home,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body {
  background: linear-gradient(rgb(84, 169, 169) 10%, rgb(93, 102, 108)) no-repeat;
  height: 100vh;
  width: 100vw;
  padding: 0;
  margin: 0;
  color: indianred;
}
</style>
