export default {
  ADD_SCENE: (state, payload) => {
    console.log(state);
    state.scene.add(payload);
  },
};
