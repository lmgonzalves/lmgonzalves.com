<template>
    <div class="about-text-container">
        <div class="text-scramble about-text" ref="el"></div>
        <div v-show="smallScreen" class="text-scramble about-text" ref="el2"></div>
    </div>
</template>

<style lang="scss" rel="stylesheet/scss">
    .about-text {
        font-size: 20px;
        color: rgba(255, 255, 255, 0.9);
        text-transform: uppercase;
        letter-spacing: 3px;
        text-indent: 3px;
        text-align: center;
    }

    @media screen and (max-width: 640px) {
        .about-text {
            font-size: 16px;
        }
    }

    @media screen and (max-width: 600px) {
        .about-text:first-child {
            margin-top: 30px;
        }
        .about-text:last-child {
            margin-top: 10px;
        }
    }

    @media screen and (max-width: 500px) {
        .about-text {
            font-size: 12px;
            letter-spacing: 2px;
            text-indent: 2px;
        }
    }
</style>

<script type="text/babel">
    import {mapState, mapGetters} from 'vuex';
    import TextScramble from '~/plugins/text-scramble';

    export default {
        data() {
            return {
                textScramble: null,
                textScramble2: null,
                phrases: [
                    ['Hi, I\'m Luis!'],
                    ['engineer &', '<front-end developer/>'],
                    ['passionate about', 'HTML, CSS and JS'],
                    ['web animations lover'],
                    ['technical writer'],
                    ['bringing beautiful', 'designs to life'],
                    ['helping people', 'through stylish apps'],
                    ['having fun', 'behind a keyboard'],
                    ['always sharing', 'knowledge and code'],
                    ['avid learner'],
                    ['available for hire']
                ]
            }
        },
        computed: {
            ...mapState(['currentIndex']),
            ...mapGetters(['smallScreen'])
        },
        methods: {
            setPhrase(index, noAnimate) {
                if (this.smallScreen) {
                    this.textScramble.setText(this.phrases[index][0], noAnimate);
                    this.textScramble2.setText(this.phrases[index][1] || '', noAnimate);
                } else {
                    this.textScramble.setText(this.phrases[index].join(' '), noAnimate);
                    this.textScramble2.setText('', noAnimate);
                }
            }
        },
        watch: {
            currentIndex(newIndex) {
                this.setPhrase(newIndex);
            },
            smallScreen() {
                this.setPhrase(this.currentIndex, true);
            }
        },
        mounted() {
            this.textScramble = new TextScramble(this.$refs.el);
            this.textScramble2 = new TextScramble(this.$refs.el2);
        }
    }
</script>
