<template>
    <div>
        <div class="frame-top"></div>
            <div class="frame-mid">
                <div class='viewport-container'>
                    <p>Javi Three Js Project</p>
                    <OrthographicViewport view='front'/>
                    <Cube/>
                </div>
            </div>
        <div class="frame-bottom"></div>
    </div>
</template>

<script>
import OrthographicViewport from './Cam.vue';
import Cube from './Cube.vue';

export default {
  components: {
    OrthographicViewport,
    Cube,
  },
};
</script>

<style>
    html, body {
        margin: 0;
        padding: 0;
    }
    .viewport-container {
        /* border: 1px solid black; */
        height: 100vh;
        width: 100vw;
        /* background: linear-gradient(rgb(44, 44, 44,), rbg(44, 44, 44)); */
        /* background-color: rgb(91, 106, 91); */
        /* background: url('../assets/Pink-Grid-Aesthetic.jpg') center center / cover no-repeat; */

        background: linear-gradient(#666, #000);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        font-size: 1.2em;
        color: white;
    }
</style>
