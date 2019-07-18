<template>
    <canvas class="canvas-main-text" :class="{'hovered-item': hoveredItem}" ref="canvas" @click="handleClick"></canvas>
</template>

<style lang="scss" rel="stylesheet/scss">
    $width: 1500px;
    $height: 500px;

    .canvas-main-text {
        position: fixed;
        left: calc(50% - #{$width / 2});
        top: calc(50% - #{$height / 2});
        width: $width;
        height: $height;
    }

    .hovered-item {
        cursor: pointer;
    }

    @media screen and (max-width: 600px) {
        .canvas-main-text {
            margin-top: 40px;
        }
    }
</style>

<script type="text/babel">
    import {mapState, mapMutations, mapGetters} from 'vuex';
    import Pieces from '~/plugins/pieces';

    export default {
        data() {
            return {
            }
        },
        computed: {
            ...mapState(['mainText', 'currentIndex', 'windowWidth', 'windowHeight']),
            ...mapGetters(['currentItem', 'hoveredItem'])
        },
        methods: {
            ...mapMutations(['setMainText', 'setMainTextCanvas', 'setCurrentIndex']),
            handleClick() {
                if (this.hoveredItem && this.hoveredItem.index !== this.currentIndex) {
                    this.setCurrentIndex(this.hoveredItem.index);
                }
            },
            selectItem(index) {
                const item = this.mainText.items[index];

                this.mainText.hidePieces({
                    items: item,
                    duration: 1000,
                    delay: 0,
                    easing: 'easeOutQuint'
                });

                this.mainText.animateItems({
                    items: item,
                    duration: 500,
                    easing: 'linear',
                    ghostOpacity: 1
                });

                this.mainText.animateItems({
                    items: item,
                    duration: 1000,
                    easing: 'linear',
                    ghostDashOffset: `-=${item.ghostDashArray[0] + item.ghostDashArray[1]}`,
                    loop: true,
                    remove: false
                });
            },
            deselectItem(index) {
                const item = this.mainText.items[index];

                this.mainText.showPieces({
                    items: item,
                    duration: 1000,
                    delay: 0,
                    easing: 'easeOutQuint'
                });

                this.mainText.animateItems({
                    items: item,
                    duration: 500,
                    easing: 'linear',
                    ghostOpacity: 0,
                    ghostDashOffset: `-=${(item.ghostDashArray[0] + item.ghostDashArray[1]) / 2}`
                });
            },
            itemEnter(item) {
                if (item.index !== this.currentIndex) {
                    this.mainText.showPieces({
                        items: item,
                        ty: () => Pieces.random(-20, 20),
                        duration: 500,
                        delay: 0,
                        easing: 'easeOutQuint'
                    });
                }
            },
            itemLeave(item) {
                if (item.index !== this.currentIndex) {
                    this.mainText.showPieces({
                        items: item,
                        duration: 500,
                        delay: 0,
                        easing: 'easeOutQuint'
                    });
                }
            },
            showMainText(first) {
                this.setMainTextCanvas(this.$refs.canvas);
                this.setMainText(new Pieces({
                    canvas: this.$refs.canvas,
                    text: ['l', 'm', 'g', 'o', 'n', 'z', 'a', 'l', 'v', 'e', 's'],
                    fontFamily: ["'Lato', sans-serif"],
                    fontSize: this.windowWidth <= 1200 ? 150 : 200,
                    x: 'center',
                    y: 'center',
                    itemSeparation: 5,
                    ty: () => Pieces.random(-300, 300),
                    piecesWidth: () => Pieces.random(20, 30),
                    piecesSpacing: 0,
                    extraSpacing: {extraX: 100, extraY: 0},
                    angle: [45],
                    color: ['#fff'],
                    ghost: true,
                    checkHover: true,
                    animation: {
                        duration: 2000,
                        delay: () => Pieces.random(0, 2000),
                        easing: 'easeInOutQuint'
                    },
                    itemEnter: this.itemEnter,
                    itemLeave: this.itemLeave,
                    saveShowState: true
                }));

                const selectFirst = () => {
                    if (this.currentIndex < 0) {
                        this.setCurrentIndex(0);
                    }
                };

                if (first) {
                    this.mainText.showPieces({
                        complete: selectFirst
                    });
                    this.selectFirstTimer = setTimeout(selectFirst, 3800);
                } else {
                    this.mainText.showPieces({
                        duration: 0,
                        delay: 0
                    });
                    selectFirst();
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
                this.mainText.stop();
                clearTimeout(this.selectFirstTimer);
                this.showMainText();
            },
            windowHeight() {
                this.mainText.stop();
                clearTimeout(this.selectFirstTimer);
                this.showMainText();
            }
        },
        mounted() {
            this.showMainText(true);
        },
        beforeDestroy() {
            this.mainText.stop();
            clearTimeout(this.selectFirstTimer);
        },
        destroyed() {
            this.setCurrentIndex(-1);
        }
    }
</script>
