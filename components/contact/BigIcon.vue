<template>
    <canvas class="canvas-full-size" ref="canvas"></canvas>
</template>

<script type="text/babel">
    import {mapState} from 'vuex';
    import Pieces from '~/plugins/pieces';

    export default {
        data() {
            return {
                bigIcon: null,
                translateY: [-10, 10]
            }
        },
        computed: {
            ...mapState(['windowWidth', 'windowHeight'])
        },
        methods: {
            showBigIcon() {
                this.bigIcon = new Pieces({
                    canvas: this.$refs.canvas,
                    text: ['@'],
                    fontFamily: ["'Lato', sans-serif"],
                    fontSize: 560,
                    x: 'centerAll',
                    y: 'center',
                    piecesWidth: [400],
                    piecesSpacing: [10],
                    extraSpacing: [{extraX: 160, extraY: 0}],
                    color: ['#373C47'],
                    animation: {
                        easing: 'linear'
                    }
                });

                this.bigIcon.animateItems({
                    duration: 20000,
                    angle: 360,
                    loop: true
                });

                this.bigIcon.showPieces({
                    duration: 500,
                    delay: 300,
                    ty: (l, i) => this.translateY[i % 2]
                });
            }
        },
        watch: {
            windowWidth() {
                this.bigIcon.stop();
                this.showBigIcon();
            },
            windowHeight() {
                this.bigIcon.stop();
                this.showBigIcon();
            }
        },
        mounted() {
            this.showBigIcon();
        },
        beforeDestroy() {
            this.bigIcon.stop();
        }
    }
</script>
