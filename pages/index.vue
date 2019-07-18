<template>
    <div class="about-container">
        <text-lines-big></text-lines-big>
        <text-lines-main></text-lines-main>
        <text-scramble></text-scramble>
        <text-slider></text-slider>
    </div>
</template>

<style lang="scss" rel="stylesheet/scss">
    .about-container {
        position: relative;
        width: 100%;
        height: 100%;
        padding-top: 160px;
        overflow: hidden;
    }
</style>

<script>
    import TextLinesMain from '~/components/about/TextLinesMain.vue';
    import TextLinesBig from '~/components/about/TextLinesBig.vue';
    import TextScramble from '~/components/about/TextScramble.vue';
    import TextSlider from '~/components/about/TextSlider.vue';

    export default {
        components: {
            TextLinesMain,
            TextLinesBig,
            TextScramble,
            TextSlider
        }
    }
</script>
