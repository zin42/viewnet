<template>
    <div>
      <canvas class="layer3d"></canvas>
    </div>
</template>

<script>
import OrbitControlModule from 'three-orbit-controls';
import * as Three from 'three';
import resize from 'vue-resize-directive';
import { mapState, mapActions } from 'vuex';
import * as Tween from '@tweenjs/tween.js';

const OrbitControls = OrbitControlModule(Three);

export default {
  name: 'OrthographicViewport',
  directives: {
    resize,
  },
  props: ['options', 'view'],
  data() {
    return {
      raycaster: new Three.Raycaster(),
      mouse: new Three.Vector2(),
      width: 0,
      height: 0,
      shaded: true,
      zoom: 0,
      $firebaseRefs: '',
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.width = this.$el.offsetWidth;
      this.height = this.$el.offsetHeight;
      this.aspect = this.width / this.height;

      // Field of view, aspect, near, far
      this.camera = new Three.PerspectiveCamera(45, this.aspect, 1, 10000);
      switch (this.view) {
        case 'top':
          this.camera.position.set(0, 0, 8);
          break;
        case 'bottom':
          this.camera.position.set(0, 0, -8);
          break;
        case 'front':
          this.camera.position.set(0, -8, 0);
          break;
        case 'back':
          this.camera.position.set(0, 8, 0);
          break;
        case 'left':
          this.camera.position.set(-8, 0, 0);
          break;
        case 'right':
          this.camera.position.set(8, 0, 0);
          break;
        default:
          break;
      }
      // let fogHex;
      // let fogDensity;
      // fogHex = 0x000000; /* As black as your heart. */
      // fogDensity = 0.0007; /* So not terribly dense? */
      this.camera.up.set(0, 0, 1);

      this.camera.lookAt(new Three.Vector3(0, 0, 0));

      const vm = this;

      const cameraPosition = {
        x: 0,
        y: 0,
        z: 0,
      };

      setTimeout(() => {
        const tween = new Tween.Tween(cameraPosition).to({ x: 0, y: -500, z: 0 }, 2000);
        tween.easing(Tween.Easing.Quadratic.In);
        tween.onUpdate(() => {
          vm.camera.position.x = cameraPosition.x;
          vm.camera.position.y = cameraPosition.y;
          vm.camera.position.z = cameraPosition.z;
        });

        tween.start();
        vm.camera.lookAt(new Three.Vector3(0, 0, 0));
      }, 500);

      this.renderer = new Three.WebGLRenderer({
        alpha: true,
        antialias: false,
        canvas: this.$el.getElementsByTagName('canvas')[0],
      });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(this.width, this.height);
      this.controls = new OrbitControls(this.camera, this.$el);
      this.controls.enabled = true;
      // Start the rendering loop:
      this.loop();
    });
  },
  computed: {
    ...mapState({
      scene: state => state.three.scene,
    }),
    // aspect() {
    //   // return this.width / this.height;
    // },
    viewFormated() {
      return this.view.charAt(0).toUpperCase() + this.view.slice(1);
    },
  },
  methods: {
    ...mapActions([
      'RUN_LOOP',
    ]),
    logThis() {
      console.log(this, 'THIS IS THIS');
    },
    loop() {
      /* eslint-disable */
      /* eslint-enable */
      this.RUN_LOOP(this);
      Tween.update();
      requestAnimationFrame(this.loop);
    },

    // Returns position in 2D coordinates for point in 3D space:
    getPosition2D(point, camera, callback) {
      const result = point.clone().project(camera);
      if (typeof callback === 'function') {
        callback(result);
        return false;
      }
      return result;
    },
    // Normalize 2D coordinates to center (camera):
    normalizeToCenter(point, el, callback) {
      const result = new Three.Vector2();
      /* eslint-disable */
      result.x = (point.x / el.clientWidth) * 2 - 1;
      result.y = -(point.y / el.clientHeight) * 2 + 1;
      /* eslint-enable */
      if (typeof callback === 'function') {
        callback(result);
        return false;
      }
      return result;
    },
    // Normalize 2D coordinates to corner (typical HTML):
    normalizeToCorner(point, el) {
      return new Three.Vector2(
        /* eslint-disable */
        point.x * (el.clientWidth / 2) + el.clientWidth / 2,
        -1 * point.y * (el.clientHeight / 2) + el.clientHeight / 2,
        /* eslint-enable */
      );
    },
    /* eslint-disable */
    raycast(type) {
    /* eslint-enable */
      const position = this.normalizeToCenter(this.mouse, this.$el);
      this.raycaster.setFromCamera(position, this.camera);
      const intersects = this.raycaster.intersectObjects(this.scene.children, true);
      if (intersects.length > 0) {
        // Emit event to parent component to handle!
      }
    },
    // Mouse move:
    /* eslint-disable */
    mousemove(e) {
    /* eslint-enable */
      this.mouse.x = e.offsetX;
      this.mouse.y = e.offsetY;
      this.raycast('mousemove');
    },
    // Mouse down:
    /* eslint-disable */
    mousedown(e) {
    /* eslint-enable */
      this.raycast('mousedown');
    },
    // Mouse up:
    /* eslint-disable */
    mouseup(e) {
    /* eslint-enable */
      this.raycast('mouseup');
    },
    /* eslint-disable */
    onResize(e) {
    /* eslint-enable */
      this.width = this.$el.offsetWidth;
      this.height = this.$el.offsetHeight;
      this.aspect = this.width / this.height;
      /* eslint-disable */
      this.camera.left = this.zoom * this.aspect / -2;
      this.camera.right = this.zoom * this.aspect / 2;
      this.camera.top = this.zoom / 2;
      this.camera.bottom = this.zoom / -2;
      /* eslint-enable */
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.width, this.height);
    },
  },
};
</script>

<style scoped>
  div {
    height: 100vh;
    width: 100vw;
  }
</style>

