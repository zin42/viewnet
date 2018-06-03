<template>
    <div>
      <h1>Waa gwaaanery</h1>
      <p>Time for some D3</p>
      <p class="someClass">Edit Me!</p>
      <p @click="funky">{{something}}</p>
      <canvas ref="canvas" class="d3" :height="height" :width="width"></canvas>
    </div>
</template>
<script>
import * as d3 from 'd3';

export default {
  name: 'Home',
  data() {
    return {
      something: 'Default',
      windowHeight: this.$el,
      windowWidth: this.$el,
      graph: {
        nodes: [
          { name: 'Javi', size: `${Math.ceil(Math.random() * 10)}` },
          { name: 'Kisha', size: `${Math.ceil(Math.random() * 10)}` },
          { name: 'Vali', size: `${Math.ceil(Math.random() * 10)}` },
          { name: 'Boss', size: `${Math.ceil(Math.random() * 5)}` },
          { name: 'Matteo', size: '5' },
          { name: 'Sashie', size: '5' },
          { name: 'Newbie', size: '5' },
          { name: 'Minty', size: '5' },
        ],
        links: [
          { source: 'Javi', target: 'Minty' },
        ],
      },
      canvas: {},
      r: 2,
      width: 500,
      height: 500,
      simulation: {},
      getContext: {},
    };
  },
  created() {
    this.canvas = d3.select('d3').data(this.graph).attr('width', this.width).attr('height', this.height);
    this.funky();
  },
  methods: {
    funky() {
      this.something = 'finally working';
      setTimeout(() => {
        this.init();
        this.simulate();
      }, 100);
    },
    init() {
      this.getContext = this.$refs.canvas.getContext('2d');
    },
    makeSquaresNativeCanv() {
      this.getContext.fillStyle = 'rgb(200, 0, 0)';
      this.getContext.fillRect(10, 10, 50, 50);

      this.getContext.fillStyle = 'rgba(0, 0, 200, 0.5)';
      this.getContext.fillRect(30, 30, 50, 50);
    },
    simulate() {
      this.simulation = d3.forceSimulation()
        .force('x', d3.forceX(this.width / 2))
        .force('y', d3.forceY(this.height / 2))
        .force('collide', d3.forceCollide(this.r))
        .force('charge', d3.forceManyBody().strength(-20))
        .force('link', d3.forceLink().id(d => d.name))
        .on('tick', this.update);
      this.simulation.nodes(this.graph.nodes);
      this.simulation.force('link').links(this.graph.links);
    },
    update() {
      this.getContext.clearRect(0, 0, this.width, this.height);
      this.getContext.beginPath();
      this.graph.links.forEach(this.drawLink);
      this.getContext.stroke();

      this.getContext.beginPath();
      this.graph.nodes.forEach(this.drawNode);
      // this.getContext.fillStyle =
      /*
      `#${parseInt(Math.ceil(Math.random() * 5), 8)}
       ${parseInt(Math.ceil(Math.random() * 10), 8)}
       ${parseInt(Math.ceil(Math.random() * 10), 8)}
       ${parseInt(Math.ceil(Math.random() * 10), 8)}
       ${parseInt(Math.ceil(Math.random() * 10), 8)}
       ${parseInt(Math.ceil(Math.random() * 10), 8)}`;
      */
      this.getContext.fill();
    },
    drawNode(d) {
      // console.log(d);
      // debugger;
      this.getContext.moveTo(d.x, d.y);
      this.getContext.arc(d.x, d.y, parseInt(d.size, 10), 0, 2 * Math.PI);
    },
    drawLink(l) {
      this.getContext.moveTo(l.source.x, l.source.y);
      this.getContext.lineTo(l.target.x, l.target.y);
    },
  },
};
</script>
<style lang="scss" scoped>
  p {
    padding: 0;
    margin: 0;
  }
  canvas {
    // border: 1px solid black;
  }
</style>
