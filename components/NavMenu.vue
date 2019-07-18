<template>
    <transition name="fade" appear>
        <header class="nav-menu-container" :class="{'nav-menu-open': navMenuOpen}">
            <a href="/" class="logo" @click.prevent="handleClickNav('/', true)">lm</a>
            <nav class="nav-menu">
                <transition-group name="menu-transition" tag="ul" class="nav-menu-ul">
                    <li v-for="link in links" v-if="isCurrentRoute(link) || navMenuOpen" :key="link.to" class="nav-menu-link" :class="{'nuxt-link-exact-active': isCurrentRoute(link)}">
                        <a :href="link.to" @click.prevent="handleClickNav(link.to)" v-html="link.label"></a>
                    </li>
                </transition-group>
            </nav>
            <div class="nav-menu-button-container" :class="{'hide-overflow': navButtonHideOverflow}">
                <svg width="1400px" height="400px" viewBox="0 0 1400 400" class="nav-menu-button-svg">
                    <path d="M 1321 42 l -56 0 c -40 0 -40 -20 -20 -30 C 1270 0 1280 20 1295 35 l 24.1 24.1" class="nav-menu-button-line button-line-shadow" ref="topLineShadow"></path>
                    <path d="M 1321 42 l -56 0 c -40 0 -40 -20 -20 -30 C 1270 0 1280 20 1295 35 l 24.1 24.1" class="nav-menu-button-line button-line-main" ref="topLine"></path>
                    <path :d="pathCenter" class="nav-menu-button-line button-line-shadow" ref="centerLineShadow"></path>
                    <path :d="pathCenter" class="nav-menu-button-line button-line-main" ref="centerLine"></path>
                    <path d="M 1295 58 l 26 0 c 40 0 40 40 0 40 C 1290 98 1280 80 1295 65 l 24.1 -24.1" class="nav-menu-button-line button-line-shadow" ref="bottomLineShadow"></path>
                    <path d="M 1295 58 l 26 0 c 40 0 40 40 0 40 C 1290 98 1280 80 1295 65 l 24.1 -24.1" class="nav-menu-button-line button-line-main" ref="bottomLine"></path>
                </svg>
                <button class="button nav-menu-button" @click="toggleNavMenu">Toggle Nav Menu</button>
                <div class="nav-menu-button-background"></div>
            </div>
        </header>
    </transition>
</template>

<style lang="scss" rel="stylesheet/scss">
    $letter-spacing: 10px;
    $menu-line-duration: 0.2s;
    $menu-link-duration: 0.5s;
    $ease-in-back: cubic-bezier(0.600, -0.280, 0.735, 0.045);
    $ease-out-back: cubic-bezier(0.175, 0.885, 0.320, 1.275);

    .nav-menu-container {
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: center;
        left: 0;
        width: 100%;
        height: 100px;
        z-index: 9;
    }

    .nav-menu {
        position: absolute;
        margin-top: 2px;
        top: 50px - 40px;
        left: calc(50% - 150px);
    }

    .nav-menu-ul {
        padding: 0;
        margin: 0;
        list-style: none;
    }

    .nav-menu-link {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 300px;
        height: 80px;

        &.nuxt-link-exact-active a:before {
            background-color: rgba(255, 255, 255, 0.1);
        }

        &:not(.nuxt-link-exact-active) a {

            &:hover, &:focus {

                &:before {
                    transform: translateY(-1px) scale(0.8, 30);
                    background-color: rgba(0, 0, 0, 0.2);
                    transition: 0.3s;
                }
            }
        }

        a {
            position: relative;
            display: inline-block;
            font-size: 30px;
            color: rgba(255, 255, 255, 0.8);
            letter-spacing: $letter-spacing;
            text-indent: $letter-spacing;
            text-transform: uppercase;
            will-change: transform, opacity;

            &:before {
                position: absolute;
                content: '';
                left: calc(50% - 150px);
                top: calc(50% - 2px);
                width: 300px;
                height: 1px;
                z-index: -1;
                background-color: transparent;
                will-change: transform, background-color;
                transition: 1.5s;
            }

            span {
                position: relative;

                &:before {
                    position: absolute;
                    content: '';
                    left: calc(50% - 25px - #{$letter-spacing / 2});
                    top: calc(50% - 25px - 2px);
                    width: 50px;
                    height: 50px;
                    background-color: rgba(0, 0, 0, 0.2);
                    border-radius: 100%;
                    z-index: -1;
                }
            }
        }
    }

    .nav-menu-open {

        .nav-menu-link {

            &.nuxt-link-exact-active a:before {
                transform: translateY(-1px) scale(0.8, 30);
                transition: 0.8s;
            }
        }
    }

    .logo {
        position: relative;
        display: inline-block;
        font-size: 30px;
        margin-left: 50px;
        color: rgba(255, 255, 255, 0.9);
        letter-spacing: 3px;
        text-indent: 3px;

        &:before {
            position: absolute;
            content: '';
            left: 3px;
            bottom: 0;
            width: 25px;
            height: 2px;
            background-color: rgba(255, 255, 255, 0.8);
            transition: 0.3s transform;
        }

        &:hover, &:focus {
            &:before {
                transform: translateX(10px);
            }
        }
    }

    .nav-menu-button-container {
        position: relative;
        width: 60px;
        height: 60px;
        padding-left: 15px;
        padding-top: 15px;
        margin-right: 50px;
        margin-left: auto;

        &.hide-overflow {
            overflow: hidden;
        }
    }

    .nav-menu-button {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        text-indent: -9999px;

        &:hover, &:focus {
            & + .nav-menu-button-background {
                opacity: 1;
                transform: scale(1);
            }
        }
    }

    .nav-menu-button-background {
        position: absolute;
        left: 10%;
        top: 10%;
        width: 80%;
        height: 80%;
        border-radius: 100%;
        background-color: rgba(0, 0, 0, 0.2);
        opacity: 0;
        transform: scale(0.8);
        transition: 0.3s;
        z-index: -2;
    }

    .nav-menu-button-svg {
        position: relative;
        left: -1310px + 15px;
        top: -50px + 15px;
        z-index: -1;
    }

    .nav-menu-button-line {
        fill: none;
        stroke: rgba(255, 255, 255, 0.9);

        &.button-line-main {
            stroke-width: 2px;
        }

        &.button-line-shadow {
            opacity: 0.2;
        }
    }

    @media screen and (max-width: 600px) {
        .nav-menu {
            margin-top: 60px;
        }
    }
</style>

<script type="text/babel">
    import {mapState, mapMutations, mapGetters} from 'vuex';
    import anime from 'animejs';
    import Segment from '~/plugins/segment';

    export default {
        data() {
            return {
                links: [
                    {to: '/', label: 'Abou<span>t</span> Me'},
                    {to: '/writing', label: 'W<span>r</span>iting'},
                    {to: '/contact', label: 'Conta<span>c</span>t'}
                ],
                navButtonHideOverflow: true
            }
        },
        computed: {
            ...mapState(['navMenuOpen', 'windowWidth', 'busy']),
            ...mapGetters(['smallScreen']),
            centerLinePosition() {
                return this.windowWidth / 2 - 203;
            },
            pathCenter() {
                const width = 300;
                const height = 80;
                const w = width + 10;
                const h = height;
                const arc = 70;
                let items = 3;
                let rtl = false;
                let d = `M 1325 50`;
                if (this.smallScreen) {
                    d += `m -24 0 l 24 0`;
                    d += `c 50 0 50 58 0 58`;
                }
                d += `l -${this.centerLinePosition + w} 0`;
                while (--items) {
                    rtl = !rtl;
                    d += rtl ? `c -${arc} 0 -${arc} ${h} 0 ${h}` : `c ${arc} 0 ${arc} ${h} 0 ${h}`;
                    d += rtl ? `l ${w} 0` : `l -${w} 0`;
                }
                d += rtl ? `l 150 0` : `l -150 0`;
                return d;
            }
        },
        methods: {
            ...mapMutations(['closeNavMenu', 'toggleNavMenu']),
            isCurrentRoute(link) {
                const to = typeof link === 'string' ? link : link.to;
                return this.$route.path == to || this.$route.path == `${to}/`;
            },
            handleClickNav(to, isLogo) {
                if (!this.busy) {
                    if (!this.isCurrentRoute(to)) {
                        this.$router.push(to);
                    } else if (!isLogo) {
                        this.toggleNavMenu();
                    }
                }
            },
            handleKeyDown(e) {
                if (e.keyCode == 27 && this.navMenuOpen) { // esc
                    this.closeNavMenu();
                }
            },
            windowWidthLazy() {
                this.topLine.reset();
                this.centerLine.reset();
                this.bottomLine.reset();
                this.topLineShadow.reset();
                this.centerLineShadow.reset();
                this.bottomLineShadow.reset();
                if (this.navMenuOpen) {
                    this.topLine.draw('100% - 26', '100%');
                    this.centerLine.draw('100% - 100', '100%');
                    this.bottomLine.draw('100% - 26', '100%');
                    this.topLineShadow.draw('100% - 26', '100%');
                    this.centerLineShadow.draw(this.smallScreen ? 100 : this.centerLinePosition - 50, '100%');
                    this.bottomLineShadow.draw('100% - 26', '100%');
                } else {
                    this.topLine.draw(0, 26);
                    this.centerLine.draw(0, 24);
                    this.bottomLine.draw(0, 26);
                    this.topLineShadow.draw(0, 26);
                    this.centerLineShadow.draw(0, 24);
                    this.bottomLineShadow.draw(0, 26);
                }
            }
        },
        watch: {
            navMenuOpen(open) {
                if (open) {
                    this.navButtonHideOverflow = false;

                    this.topLine.draw('100% - 26', '100%', 1, {easing: anime.easings['easeOutCubic']});
                    this.centerLine.draw('100% - 100', '100%', 1.8, {easing: anime.easings['easeOutCubic']});
                    this.bottomLine.draw('100% - 26', '100%', 1.5, {easing: anime.easings['easeOutCubic']});

                    this.topLineShadow.draw('10%', '50%', 0.3, {easing: anime.easings['easeInCubic'], callback: () => {
                        this.topLineShadow.draw('100% - 26', '100%', 0.8, {easing: anime.easings['easeOutCubic']});
                    }});
                    this.centerLineShadow.draw(this.smallScreen ? 100 : this.centerLinePosition - 50, '100%', 1.8, {easing: anime.easings['easeOutCubic']});
                    this.bottomLineShadow.draw('10%', '50%', 0.3, {easing: anime.easings['easeInCubic'], callback: () => {
                        this.bottomLineShadow.draw('100% - 26', '100%', 1.3, {easing: anime.easings['easeOutCubic']});
                    }});
                } else {
                    this.topLine.draw(0, 26, 1.5, {easing: anime.easings['easeOutCubic']});
                    this.centerLine.draw(0, 24, 1.8, {easing: anime.easings['easeOutCubic']});
                    this.bottomLine.draw(0, 26, 1, {easing: anime.easings['easeOutCubic']});

                    this.topLineShadow.draw('50%', '90%', 0.3, {easing: anime.easings['easeInCubic'], callback: () => {
                        this.topLineShadow.draw(0, 26, 1.3, {easing: anime.easings['easeOutCubic']});
                    }});
                    this.centerLineShadow.draw(0, 24, 1.8, {easing: anime.easings['easeOutCubic'], callback: () => {
                        this.navButtonHideOverflow = true;
                    }});
                    this.bottomLineShadow.draw('50%', '90%', 0.3, {easing: anime.easings['easeInCubic'], callback: () => {
                        this.bottomLineShadow.draw(0, 26, 0.8, {easing: anime.easings['easeOutCubic']});
                    }});
                }
            },
            windowWidth() {
                requestAnimationFrame(this.windowWidthLazy);
            }
        },
        mounted() {
            document.addEventListener('keydown', this.handleKeyDown);

            this.topLine = new Segment(this.$refs.topLine, 0, 26);
            this.centerLine = new Segment(this.$refs.centerLine, 0, 24);
            this.bottomLine = new Segment(this.$refs.bottomLine, 0, 26);

            this.topLineShadow = new Segment(this.$refs.topLineShadow, 0, 26);
            this.centerLineShadow = new Segment(this.$refs.centerLineShadow, 0, 24);
            this.bottomLineShadow = new Segment(this.$refs.bottomLineShadow, 0, 26);
        },
        beforeDestroy() {
            document.removeEventListener('keydown', this.handleKeyDown);
        }
    }
</script>
