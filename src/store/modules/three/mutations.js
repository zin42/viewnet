export default {
  ADD_TO_SCENE: (state, payload) => {
    console.log(state);
    state.scene.add(payload);
  },
};
