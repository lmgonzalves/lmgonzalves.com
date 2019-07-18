<template>
    <div class="text-scramble text-scramble-contact" ref="el"></div>
</template>

<style lang="scss" rel="stylesheet/scss">
    .text-scramble-contact {
        position: relative;
        font-size: 20px;
        color: rgba(255, 255, 255, 0.9);
        text-transform: uppercase;
        letter-spacing: 3px;
        text-indent: 3px;
        text-align: center;
        z-index: 1;
    }
</style>

<script type="text/babel">
    import TextScramble from '~/plugins/text-scramble';

    export default {
        props: {
            phrases: {
                type: Array,
                default: ['']
            },
            delayed: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                textScramble: null,
                phraseIndex: 0,
                timer1: null,
                timer2: null,
                interval: null
            }
        },
        methods: {
            nextPhrase() {
                this.textScramble.setText(this.phrases[this.phraseIndex++ % this.phrases.length]);
            },
            nextPhraseInterval() {
                this.interval = setInterval(() => {
                    this.nextPhrase();
                }, 6000);
            }
        },
        mounted() {
            this.textScramble = new TextScramble(this.$refs.el, {});

            this.timer1 = setTimeout(() => {
                this.nextPhrase();
            }, this.delayed ? 1000 : 0);

            this.timer2 = setTimeout(() => {
                this.nextPhraseInterval();
            }, this.delayed ? 3000 : 0);
        },
        beforeDestroy() {
            clearTimeout(this.timer1);
            clearTimeout(this.timer2);
            clearInterval(this.interval);
        }
    }
</script>
