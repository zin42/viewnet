<template>
    <div>
    </div>
</template>

<script>
import * as Three from 'three';
import { mapMutations, mapState } from 'vuex';

let cube;
// Deterministic loop:
function loop(ctx, controls) {
  controls.forEach((item) => {
    /* eslint-disable */
    item.rotation.x += 0.05;
    item.rotation.y += 0.05;
    /* eslint-enable */
  });
}

export default {
  mounted() {
    this.$nextTick(() => {
      // Build the Three.js scene:
      const geometry = new Three.BoxGeometry(1, 1, 1);

      const pointCloudGeo = new THREE.Geometry();

      const groundGeometry = new Three.BoxGeometry(10, 10, 0.1);
      const material = new Three.MeshBasicMaterial({ color: 0xf2c8a5 });
      const groundMaterial = new Three.MeshBasicMaterial({ color: 0x666666 });
      const axesHelper = new Three.AxesHelper(5);
      const grid = new Three.GridHelper(10, 2);

      grid.geometry.rotateX(Math.PI / 2);

      this.ADD_TO_SCENE(grid);
      this.ADD_TO_SCENE(axesHelper);
      for (let i = 0; i < 5; i += 1) {
        cube = new Three.Mesh(geometry, material);
        cube.name = `myCube${i}`;
        cube.position.x = 0 + i;
        cube.position.y = 0 + i;
        this.ADD_TO_SCENE(cube);
      }

      const ground = new Three.Mesh(groundGeometry, groundMaterial);
      ground.name = 'ground';
      ground.position.x = 0;
      ground.position.y = 0;
      ground.position.z = -1.1;
      // ground.scale.x = 1;
      // ground.scale.y = 20.5;
      this.ADD_TO_SCENE(ground);
      const object = this.three.getObjectByName('myCube0');
      const object2 = this.three.getObjectByName('myCube3');

      const controls = [object, object2];
      const vm = this;

      setInterval(() => {
        loop(vm, controls);
      }, 1000 / 60);
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
