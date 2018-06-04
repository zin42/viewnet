<template>
  <div>
    <p>
      Squaresoft
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Home',
  created() {
    console.log('home');
  },
  data() {
    return {
      msg: 'hi there',
    };
  },
  methods: {
    // init() {
    // },
    // update() {
    // },
  },
  computed: {
    ...mapState({
      threejs: state => state.three,
    }),
  },
};
</script>
<style lang="scss" scoped>
  p {
    color: white;
  }
</style>
