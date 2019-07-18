<template>
    <transition name="timeline" appear>
        <div v-show="currentArticle" class="writing-timeline">
            <div class="timeline-year-container">
                <div class="timeline-year" ref="yearContainer">
                    <transition-group name="number-transition">
                        <span v-for="number in year" :key="number">{{number}}</span>
                    </transition-group>
                </div>
            </div>
        </div>
    </transition>
</template>

<style lang="scss" rel="stylesheet/scss">
    .writing-timeline {
        position: fixed;
        left: 0;
        top: 0;
        width: 200px;
        height: 100%;

        &:before {
            position: absolute;
            content: '';
            right: 60px;
            top: 0;
            width: 1px;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.1);
        }
    }

    .timeline-year-container {
        position: absolute;
        left: 20px;
        top: 0;
        transform-origin: 0 0;
        transform: rotate(-90deg);
        z-index: 1;
    }

    .timeline-year {
        position: relative;
        font-size: 80px;
        letter-spacing: 5px;
        text-indent: 5px;
        width: 250px;
        padding-left: 10px;
        color: rgba(0, 0, 0, 0.2);

        span {
            display: inline-block;
        }
    }

    .timeline-enter-active {
        transition: 1s;

        &:before {
            transition: 1s;
        }
    }

    .timeline-enter {
        transform: translateY(-100%);

        &:before {
            transform: translateY(-100%);
        }
    }

    @media screen and (max-width: 840px) {

        .writing-timeline {
            width: 100px;
        }

        .timeline-year-container {
            left: 2px;
            bottom: 0;
        }

        .timeline-year {
            font-size: 70px;
        }
    }
</style>

<script type="text/babel">
    import {mapState} from 'vuex';
    import anime from 'animejs';

    export default {
        props: {
            currentArticle: {
                type: Object,
                default: null
            }
        },
        data() {
            return {
            }
        },
        computed: {
            ...mapState(['windowWidth', 'windowHeight']),
            year() {
                return this.currentArticle ? this.currentArticle.year : '';
            }
        },
        methods: {
            moveYear() {
                if (this.currentArticle) {
                    const yearProgress = ((parseInt(this.currentArticle.month) - 1) * 31 + parseInt(this.currentArticle.day)) / (12 * 31);
                    const translateX = -this.windowHeight + (this.windowHeight - (this.windowWidth <= 840 ? 250 + 250 : 250 + 60)) * yearProgress;

                    const {yearContainer} = this.$refs;
                    anime.remove(yearContainer);
                    anime({
                        targets: yearContainer,
                        translateX: translateX,
                        duration: 1000,
                        easing: 'easeOutCubic'
                    });
                }
            }
        },
        watch: {
            currentArticle(newArticle, oldArticle) {
                if (!oldArticle || newArticle.image != oldArticle.image) {
                    this.moveYear();
                }
            },
            windowWidth() {
                this.moveYear();
            },
            windowHeight() {
                this.moveYear();
            }
        },
        mounted() {
            this.moveYear();
        },
        beforeDestroy() {
            anime.remove(this.$refs.yearContainer);
        }
    }
</script>
