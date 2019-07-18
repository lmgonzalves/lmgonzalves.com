<template>
    <transition name="icon" appear>
        <div class="social-icon">
            <svg viewBox="0 0 64 64"><path ref="path" :d="d"/></svg>
            <canvas class="social-icon-canvas" ref="canvas"></canvas>
            <a :href="href" target="_blank" class="social-icon-link" :class="{'icon-active': iconHover || iconFocus}" @mouseenter="enterIcon" @mouseleave="leaveIcon" @focus="focusIcon" @blur="blurIcon">
                <transition name="tooltip">
                    <span v-show="iconHover" class="icon-tooltip"><span>{{tooltip}}</span></span>
                </transition>
            </a>
        </div>
    </transition>
</template>

<style lang="scss" rel="stylesheet/scss">
    .social-icon {
        position: relative;
        display: inline-block;
        width: 64px;
        height: 64px;
        margin: 0 10px;

        path {
            fill: rgba(0, 0, 0, 0.6);
            opacity: 0.5;
        }
    }

    .social-icon-canvas {
        position: absolute;
        left: -100%;
        top: -100%;
        width: 300%;
        height: 300%;
    }

    .social-icon-link {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
    }

    .icon-tooltip {
        position: absolute;
        left: 50%;
        top: 100%;
        padding-top: 20px;
        transform: translate(-50%, 0);
        z-index: 3;

        span {
            position: relative;
            display: inline-block;
            font-size: 16px;
            padding: 5px 10px;
            letter-spacing: 3px;
            text-indent: 3px;
            text-align: center;
            white-space: nowrap;
            color: rgba(255, 255, 255, 0.8);
            background-color: #232830;

            &:before {
                position: absolute;
                content: '';
                left: 50%;
                bottom: 100%;
                width: 0;
                height: 0;
                border-left: 6px solid transparent;
                border-right: 6px solid transparent;
                border-bottom: 8px solid #232830;
                transform: translateX(-50%);
            }
        }
    }
    
    
    // Icon transition

    .icon-enter-active {
        transition: 0.5s;

        &:nth-child(1) {
            transition-delay: 1s;
        }
        &:nth-child(2) {
            transition-delay: 1.2s;
        }
        &:nth-child(3) {
            transition-delay: 1.4s;
        }
    }

    .icon-enter {
        opacity: 0;
        transform: translateY(30px);
    }
    
    
    // Tooltip transition

    .tooltip-enter-active, .tooltip-leave-active {
        transition: 0.5s;
    }

    .tooltip-enter, .tooltip-leave-to {
        opacity: 0;
        transform: translate(-50%, 30px);
    }
</style>

<script type="text/babel">
    import Pieces from '~/plugins/pieces';

    export default {
        props: {
            href: {
                type: String,
                default: ''
            },
            tooltip: {
                type: String,
                default: ''
            },
            d: {
                type: String,
                default: ''
            },
            color: {
                type: String,
                default: '#fff'
            }
        },
        data() {
            return {
                icon: null,
                iconHover: false,
                iconFocus: false
            }
        },
        methods: {
            enterIcon() {
                this.iconHover = true;
                this.icon.showPieces();
            },
            leaveIcon() {
                this.iconHover = false;
                if (!this.iconFocus) this.icon.hidePieces();
            },
            focusIcon() {
                this.iconFocus = true;
                this.icon.showPieces();
            },
            blurIcon() {
                this.iconFocus = false;
                if (!this.iconHover) this.icon.hidePieces();
            }
        },
        mounted() {
            this.icon = new Pieces({
                canvas: this.$refs.canvas,
                path: [this.$refs.path],
                svgWidth: [64],
                svgHeight: [64],
                x: 'center',
                y: 'center',
                ty: () => Pieces.random(-100, 100),
                piecesWidth: () => Pieces.random(10, 20),
                piecesSpacing: 0,
                extraSpacing: [10],
                angle: [45],
                color: [this.color],
                animation: {
                    duration: 1000,
                    easing: 'easeOutQuint'
                }
            });
        },
        beforeDestroy() {
            this.icon.stop();
        }
    }
</script>
