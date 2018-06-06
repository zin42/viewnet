<template>
    <div></div>
</template>

<script>
import * as Three from 'three';
import { mapMutations, mapState } from 'vuex';

let cube;
// Deterministic loop:
function loop() {
  // cube.rotation.z += 0.0005;
  // cube.rotation.x += 0.005;
  // cube.rotation.y += 0.05;
}

export default {
  mounted() {
      this.$nextTick(() => {
        // Build the Three.js scene:
        const geometry = new Three.BoxGeometry(1, 1, 1);
        const material = new Three.MeshBasicMaterial({ color: 0xf2c8a5 });
        const axesHelper = new Three.AxesHelper(5);
        this.ADD_TO_SCENE(axesHelper);
        cube = new Three.Mesh(geometry, material);
        cube.name = 'myCube';
        this.ADD_TO_SCENE(cube);
        setInterval(loop, 1000 / 60);
      });
  },
  data() {
      return {};
  },
  methods: {
    ...mapMutations([
      'ADD_TO_SCENE',
    ]),
    /* eslint-disable */
    getWindowWidth(e) {
    /* eslint-enable */
      this.windowWidth = document.documentElement.clientWidth;
    },
    /* eslint-disable */
    getWindowHeight(e) {
    /* eslint-enable */
      this.windowHeight = document.documentElement.clientHeight;
    },
  },
  computed: {
    ...mapState({
      three: state => state.three.scene,
    }),
  },
};


</script>

<style>

</style>
