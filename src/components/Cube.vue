<template>
    <div>
    </div>
</template>

<script>
import * as Three from 'three';
import { mapMutations, mapState } from 'vuex';

// const vertexshader = document.getElementById('vertexshader');
// const fragmentshader = document.getElementById('fragmentshader');

// Deterministic loop:
function loop() {
  // ctx
  // particles
  // particles.rotation.x += 0.005;
  // particles.rotation.x += 0.5;
}

export default {
  mounted() {
    let particles = '';

    const geometry = new Three.BufferGeometry();
    geometry.needsUpdate = true;
    const sphereGeo = new Three.SphereGeometry(50, 20, 20);
    geometry.fromGeometry(sphereGeo);
    // eslint-disable-next-line
    const material = new Three.PointsMaterial({ color: 0xBADA55, size: 6.0, sizeAttenuation: true });

    particles = new Three.Points(geometry, material);
    this.ADD_TO_SCENE(particles);

    const vm = this;
    setInterval(() => {
      loop(vm, particles);
    }, 1000 / 60);

    // this.$nextTick(() => {
    // });
  },
  data() {
    return {
      geometryArr: [],
    };
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
