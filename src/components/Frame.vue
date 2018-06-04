<template>
    <div>
        <div class="frame-top"></div>
            <div class="frame-mid">
                <div class='viewport-container'>
                    <OrthographicViewport view='top'/>
                </div>
            </div>
        <div class="frame-bottom"></div>
    </div>
</template>

<script>
import OrthographicViewport from './Cam.vue';

export default {
  components: {
    OrthographicViewport,
  },
};
</script>

<style>
    .frame-top {
        /* border: 1px solid black; */
    }
</style>
