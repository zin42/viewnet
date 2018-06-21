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
    this.$nextTick(() => {
      let particles = '';
      // const particleSize = 20;
      // const rayCaster;
      // const mouse;
      // const intersected;


      // const boxGeometry = new Three.BoxGeometry(200, 200, 200, 16, 16, 16);
      // For Debugging
      // this.geometryArr = boxGeometry.vertices;

      /* eslint-disable */
      // const vertices = boxGeometry.vertices;
      /* eslint-enable */

      // const positions = new Float32Array(vertices.length * 3);
      // const colors = new Float32Array(vertices.length * 3);
      // const sizes = new Float32Array(vertices.length);

      // let vertex;
      // const color = new Three.Color();
      // console.log(positions);
      // for (let i = 0; i < vertices.length; i += 1) {
      //   vertex = vertices[i];
      //   vertex.toArray(positions, i * 3);
      //   color.setHSL((0.01 + 0.1) * (i / vertices.length), 1.0, 0.5);
      //   color.toArray(colors, i * 3);
      //   sizes[i] = particleSize * 0.5;
      // }

      const geometry = new Three.BufferGeometry();
      // geometry.addAttribute('position', new Three.BufferAttribute(positions, 3));
      // geometry.addAttribute('customColor', new Three.BufferAttribute(colors, 3));
      // geometry.addAttribute('size', new Three.BufferAttribute(sizes * 1000, 1));
      // geometry.addAttribute('scale', new Three.BufferAttribute(positions, 3));
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
    });
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
