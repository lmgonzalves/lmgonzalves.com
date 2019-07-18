<template>
    <transition name="fade" appear>
        <div v-show="currentItem" class="text-slider" :class="{'animating': animating}" ref="slider">
            <div class="slider-progress">
                <svg width="60px" height="60px" viewBox="0 0 60 60" class="slider-progress-svg">
                    <path d="M 30 30 m 0 -25 a 25 25 0 0 1 0 50 a 25 25 0 0 1 0 -50 Z" class="slider-progress-bar" ref="progressBar"></path>
                </svg>
                <button class="button slider-toggle" @click="toggleSlider" @mousemove="pauseProgress" @mouseleave="resumeProgress">Pause Progress</button>
                <div class="slider-arrow-container slider-arrow-left-container" :class="{'slider-arrow-hidden': firstItem}">
                    <button class="button slider-arrow-button slider-arrow-left-button" @click="prevItem">Previous Letter</button>
                    <svg width="1300px" height="60px" viewBox="0 0 1300 60" class="slider-arrow-svg slider-arrow-left-svg" ref="arrowLeftSVG">
                        <path d="M 1270 30 l -1240 0 l 8 -8" class="slider-arrow slider-arrow-left" ref="arrowLeft" shape-rendering="crispEdges"></path>
                    </svg>
                </div>
                <div class="slider-arrow-container slider-arrow-right-container" :class="{'slider-arrow-hidden': lastItem}">
                    <button class="button slider-arrow-button slider-arrow-right-button" @click="nextItem">Next Letter</button>
                    <svg width="1300px" height="60px" viewBox="0 0 1300 60" class="slider-arrow-svg slider-arrow-right-svg" ref="arrowRightSVG">
                        <path d="M 30 30 l 1240 0 l -8 8" class="slider-arrow slider-arrow-right" ref="arrowRight" shape-rendering="crispEdges"></path>
                    </svg>
                </div>
                <transition name="number-transition">
                    <span class="slider-number" :key="currentNumber[0]">{{currentNumber[0]}}</span>
                </transition>
                <transition name="number-transition">
                    <span class="slider-number" :key="currentNumber[1]">{{currentNumber[1]}}</span>
                </transition>
            </div>
        </div>
    </transition>
</template>

<style lang="scss" rel="stylesheet/scss">
    $slider-width: 300px;
    $slider-height: 100px;
    $arrow-height: 60px;
    $progress-length: 2 * 3.15 * 25; // 2 * pi * r

    .text-slider {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: - $slider-width / 2;
        top: 0;
        width: $slider-width;
        height: $slider-height;

        &:not(.animating) {

            .slider-arrow-svg {
                transition: 0.2s transform;
            }

            .slider-arrow-left-button:hover + .slider-arrow-svg {
                transform: translateX(-10px) !important;
            }

            .slider-arrow-right-button:hover + .slider-arrow-svg {
                transform: translateX(10px) !important;
            }
        }
    }

    .slider-progress {
        position: relative;
        display: inline-block;
    }

    .slider-toggle {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 60px;
        height: 60px;
        transform: translate(-50%, -50%);
        border-radius: 100%;
        text-indent: -9999px;

        &:before {
            position: absolute;
            content: '';
            left: calc(50% - 21px);
            top: calc(50% - 21px);
            width: 42px;
            height: 42px;
            border-radius: 100%;
            background-color: rgba(0, 0, 0, 0.2);
            z-index: -1;
            opacity: 0;
            transform: scale(0.8);
            transition: 0.3s;
        }

        &:hover:before, &:focus:before {
            opacity: 1;
            transform: scale(1);
        }
    }

    .slider-progress-svg {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .slider-progress-border {
        fill: none;
        stroke: rgba(255, 255, 255, 0.05);
    }

    .slider-progress-bar {
        fill: none;
        stroke: rgba(255, 255, 255, 0.5);
        stroke-width: 2px;
        stroke-dasharray: $progress-length;
        stroke-dashoffset: $progress-length / 3;
    }

    .slider-arrow-container {
        position: absolute;
        top: calc(50% - #{$arrow-height / 2});
        overflow: hidden;
        transition: 0.5s 0.5s opacity;
    }

    .slider-arrow-hidden {
        opacity: 0;
        pointer-events: none;
    }

    .slider-arrow-left-container {
        right: 70px;
    }

    .slider-arrow-right-container {
        left: 70px;
    }

    .slider-arrow-svg {
        position: relative;
    }

    .slider-arrow-left-svg {
        left: calc(100% - 80px);
    }

    .slider-arrow-right-svg {
        right: calc(100% - 80px);
    }

    .slider-arrow {
        fill: none;
        stroke: rgba(255, 255, 255, 0.5);
        stroke-width: 1px;
    }

    .slider-arrow-button {
        position: absolute;
        top: calc(50% - 15px);
        width: 70px;
        height: 30px;
        text-indent: -9999px;
        z-index: 1;

        &:before {
            position: absolute;
            content: '';
            left: calc(50% - 15px);
            top: calc(50% - 15px);
            width: 30px;
            height: 30px;
            border-radius: 100%;
            background-color: rgba(0, 0, 0, 0.2);
            opacity: 0;
            transform: scale(0.8);
            transition: 0.3s;
        }

        &:hover:before, &:focus:before {
            opacity: 1;
            transform: scale(1);
        }
    }

    .slider-arrow-left-button {
        right: 0;
    }

    .slider-arrow-right-button {
        left: 0;
    }

    .slider-number {
        display: inline-block;
        font-size: 20px;
        color: rgba(255, 255, 255, 0.8);
        letter-spacing: 2px;
        text-indent: 2px;
        text-align: center;
    }

    @media screen and (max-width: 930px) {
        .text-slider {
            left: calc(50% - #{$slider-width / 2});
        }
    }

    @media screen and (max-width: 600px) {
        .text-slider {
            margin-top: 40px;
        }
    }
</style>

<script type="text/babel">
    import {mapState, mapGetters, mapMutations} from 'vuex';
    import anime from 'animejs';
    import Segment from '~/plugins/segment';

    export default {
        data() {
            return {
                progressBar: null,
                sliderPaused: false,
                textLength: 11,
                maxIndex: 10,
                animating: false,
                oldX: 0
            }
        },
        computed: {
            ...mapState(['currentIndex', 'navMenuOpen', 'mainTextCanvas', 'windowWidth', 'windowHeight']),
            ...mapGetters(['currentItem', 'hoveredItem', 'hoveredItemIndex', 'smallScreen', 'mediumScreen']),
            currentNumber() {
                return this.currentIndex + 1 < 10 ? `0${this.currentIndex + 1}` : `${this.currentIndex + 1}`;
            },
            firstItem() {
                return this.currentIndex === 0;
            },
            lastItem() {
                return this.currentIndex === this.maxIndex;
            }
        },
        methods: {
            ...mapMutations(['setCurrentIndex']),
            nextItem() {
                this.setCurrentIndex(this.lastItem ? 0 : this.currentIndex + 1);
            },
            prevItem() {
                this.setCurrentIndex(this.firstItem ? this.maxIndex : this.currentIndex < 0 ? this.maxIndex : this.currentIndex - 1);
            },
            pauseProgress() {
                if (!this.animating) {
                    this.progressBar.pause();
                }
            },
            resumeProgress() {
                if (!this.animating && !this.navMenuOpen && !this.sliderPaused) {
                    this.progressBar.resume();
                }
            },
            toggleSlider() {
                this.sliderPaused = !this.sliderPaused;
                if (this.sliderPaused) {
                    this.progressBar.pause();
                } else {
                    this.progressBar.resume();
                }
            },
            handleKeyDown(e) {
                const k = e.keyCode;
                if (k == 37) { // left
                    this.prevItem();
                } else if (k == 39) { // right
                    this.nextItem();
                }
            }
        },
        watch: {
            currentItem(newItem, oldItem) {
                if (newItem) {
                    const newX = newItem.x + (newItem.width / 2);
                    const newY = newItem.y + newItem.height;
                    if (oldItem) {
                        const oldX = this.oldX || oldItem.x + (oldItem.width / 2);
                        const oldY = oldItem.y + oldItem.height;
                        const arrow = newX < oldX ? this.$refs.arrowLeftSVG : this.$refs.arrowRightSVG;
                        let translateX;
                        if (this.animating) {
                            anime.remove(arrow);
                            translateX = newX - oldX;
                        } else {
                            translateX = [newX < oldX ? -10 : 10, newX - oldX]
                        }
                        this.oldX = oldX;
                        this.animating = true;
                        anime({
                            targets: arrow,
                            translateX: translateX,
                            duration: 500,
                            easing: 'easeOutCubic',
                            complete: () => {
                                this.oldX = 0;
                                anime.remove(this.$refs.slider);
                                anime({
                                    targets: this.$refs.slider,
                                    translateX: this.mediumScreen ? 0 : newX - (1500 - this.windowWidth) / 2,
                                    translateY: newY - (500 - this.windowHeight) / 2,
                                    duration: 500,
                                    easing: 'easeInOutQuint'
                                });
                                anime({
                                    targets: arrow,
                                    translateX: 0,
                                    duration: 450,
                                    easing: 'easeInOutQuint'
                                });

                                if (this.mediumScreen) {
                                    anime({
                                        targets: this.mainTextCanvas,
                                        translateX: 1500 / 2 - newX,
                                        duration: 500,
                                        easing: 'easeInOutQuint'
                                    });
                                } else {
                                    anime({
                                        targets: this.mainTextCanvas,
                                        translateX: 0,
                                        duration: 0
                                    });
                                }
                            }
                        });

                        const [begin, end] = newX < oldX ? ['-200%', '-200% + 1'] : ['200%', '200% + 1'];
                        this.progressBar.draw(begin, end, 1.5, {circular: true, easing: anime.easings['easeOutCubic'], callback: () => {
                            this.animating = false;
                            this.progressBar.draw(0, '100%', 5, {callback: this.nextItem});
                            if (this.navMenuOpen || this.sliderPaused) {
                                this.progressBar.pause();
                            }
                        }});
                    } else {
                        anime({
                            targets: this.$refs.slider,
                            translateX: this.mediumScreen ? 0 : newX - (1500 - this.windowWidth) / 2,
                            translateY: newY - (500 - this.windowHeight) / 2,
                            duration: 0
                        });

                        if (this.mediumScreen) {
                            anime({
                                targets: this.mainTextCanvas,
                                translateX: 1500 / 2 - newX,
                                duration: 500,
                                easing: 'easeInOutQuint'
                            });
                        } else {
                            anime({
                                targets: this.mainTextCanvas,
                                translateX: 0,
                                duration: 0
                            });
                        }

                        this.progressBar.draw(0, '100%', 5, {callback: this.nextItem});
                        if (this.navMenuOpen || this.sliderPaused) {
                            this.progressBar.pause();
                        }
                    }
                }
            },
            navMenuOpen(open) {
                if (open) {
                    this.progressBar.pause();
                } else if (!this.sliderPaused) {
                    this.progressBar.resume();
                }
            }
        },
        mounted() {
            document.addEventListener('keydown', this.handleKeyDown);
            this.progressBar = new Segment(this.$refs.progressBar, 0, 0);
        },
        beforeDestroy() {
            document.removeEventListener('keydown', this.handleKeyDown);
            this.progressBar.stop();
        }
    }
</script>
