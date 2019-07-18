<template>
    <canvas class="canvas-full-size" ref="canvas"></canvas>
</template>

<script type="text/babel">
    import {mapState} from 'vuex';
    import Pieces from '~/plugins/pieces';

    export default {
        data() {
            return {
                bigText: null,
                translateY: [-30, 30]
            }
        },
        computed: {
            ...mapState(['currentIndex', 'windowWidth', 'windowHeight'])
        },
        methods: {
            selectItem(index) {
                this.bigText.showPieces({
                    items: this.bigText.items[index],
                    duration: 500,
                    ty: (l, i) => this.translateY[i % 2]
                });
            },
            deselectItem(index) {
                this.bigText.hidePieces({
                    items: this.bigText.items[index],
                    duration: 500
                });
            },
            showBigText() {
                this.bigText = new Pieces({
                    canvas: this.$refs.canvas,
                    text: ['l', 'm', 'g', 'o', 'n', 'z', 'a', 'l', 'v', 'e', 's'],
                    fontFamily: ["'Lato', sans-serif"],
                    fontSize: 600,
                    x: 'centerAll',
                    y: 'center',
                    piecesWidth: [280, 300, 300, 250, 250, 240, 260, 280, 260, 260, 230],
                    piecesSpacing: 10,
                    extraSpacing: [
                        {extraX: 200, extraY: 0},
                        {extraX: 45, extraY: 0},
                        {extraX: 140, extraY: 0},
                        {extraX: 80, extraY: 0},
                        {extraX: 80, extraY: 0},
                        {extraX: 100, extraY: 0},
                        {extraX: 100, extraY: 0},
                        {extraX: 200, extraY: 0},
                        {extraX: 100, extraY: 0},
                        {extraX: 100, extraY: 0},
                        {extraX: 100, extraY: 0}
                    ],
                    color: ['#373C47'],
                    animation: {
                        easing: 'linear'
                    }
                });

                this.bigText.animateItems({
                    duration: 20000,
                    angle: 360,
                    loop: true
                });

                if (this.currentIndex >= 0) {
                    this.selectItem(this.currentIndex);
                }
            }
        },
        watch: {
            currentIndex(newIndex, oldIndex) {
                if (oldIndex >= 0) {
                    this.deselectItem(oldIndex);
                }
                this.selectItem(newIndex);
            },
            windowWidth() {
                this.bigText.stop();
                this.showBigText();
            },
            windowHeight() {
                this.bigText.stop();
                this.showBigText();
            }
        },
        mounted() {
            this.showBigText();
        },
        beforeDestroy() {
            this.bigText.stop();
        }
    }
</script>
