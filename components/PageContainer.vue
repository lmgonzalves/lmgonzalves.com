<template>
    <div class="page-container" :class="{'page-menu-open': navMenuOpen}">
        <slot></slot>
        <div class="page-overlay"></div>
    </div>
</template>

<style lang="scss" rel="stylesheet/scss">
    .page-container, .page-overlay {
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }

    .page-container {
        position: absolute;
    }

    .page-overlay {
        position: fixed;
        background-color: #2C323D;
        opacity: 0;
        visibility: hidden;
        transition: 1s 0.5s;
        will-change: opacity;
        z-index: 8;
    }

    .page-menu-open {

        .page-overlay {
            visibility: visible;
            opacity: 0.98;
            transition: 0.5s 0s;
        }
    }
</style>

<script type="text/babel">
    import {mapState} from 'vuex';

    export default {
        data() {
            return {
            }
        },
        computed: {
            ...mapState(['navMenuOpen'])
        }
    }
</script>
