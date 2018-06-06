import * as Three from 'three';
// const Three = require('three');

export default {
  scene: new Three.Scene(),
  bounds: {
    x: 200,
    y: 200,
    z: 400,
  },
  sliceThickness: 2,
  move: true,
  gui: {
    showObjectEdge: true,
    showGizmos: false,
    showSceneBorders: true,
    objectEdgeSize: 8,
    gizmoSize: 64,
  },
};
