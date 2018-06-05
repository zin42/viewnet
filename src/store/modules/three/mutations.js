export default {
  ADD_TO_SCENE: (state, payload) => {
    console.log(state);
    state.scene.add(payload);
  },
  M_RUN_LOOP: (state, ctx) => {
    ctx.renderer.render(ctx.scene, ctx.camera);
    requestAnimationFrame(ctx.loop);
    // debugger;
  },
};
