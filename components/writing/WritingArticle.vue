<template>
    <article class="article" :class="[`title-${article.titlePosition}`, {'article-loading': loading, 'current-article': isCurrentArticle}]" ref="articleNode">
        <div class="article-date">
            <span class="article-month">{{article.monthName}}</span>
            <span class="article-day">{{article.day}}</span>
        </div>
        <h3 class="article-title" v-html="article.titleHtml"></h3>
        <div class="article-img-container">
            <canvas class="article-img-canvas" ref="articleCanvas"></canvas>
            <img class="article-img" :src="article.imageSrc" :alt="article.titleText" ref="articleImg"/>
        </div>
        <div class="article-source">
            <div class="article-title"><span class="title-chunk"><span class="title-chunk-text">{{article.source}}</span></span></div>
        </div>
        <a :href="article.sourceLink" target="_blank" class="article-link">{{ article.titleText }}</a>
    </article>
</template>

<style lang="scss" rel="stylesheet/scss">
    .article {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 100px -500px;
        opacity: 1;
        transition: 1s;

        &:first-child {
            margin-top: 50px;
        }

        &:last-child {
            margin-bottom: 150px;
        }

        &.title-left {

            .article-source {
                left: 50%;
                transform: translateX(160px);
            }

            .article-img-container {
                transform: translateX(-50px);
            }
        }

        &.title-right {
            padding-left: 200px;

            .article-source {
                right: 50%;
                transform: translateX(-400px);
            }
        }

        &.title-left, &.title-right .article-source {

            .article-title {
                text-align: right;
            }

            .title-chunk {
                position: relative;
                float: left;
                transform: translateX(-150px) skew(20deg);

                &:nth-child(2n + 1) {
                    left: 150px;
                }
                &:nth-child(2n) {
                    left: 100px;
                }

                &:after {
                    left: auto;
                    right: 100%;
                    transform: translateX(-1%);
                }

                .title-chunk-text {
                    transform: skew(-20deg);
                }
            }

            .article-img-canvas {
                transform: translateX(50px);
            }
        }

        &.title-right, &.title-left .article-source {
            flex-direction: row-reverse;

            .title-chunk {
                position: relative;
                float: right;
                transform: translateX(150px) skew(-20deg);

                &:nth-child(2n + 1) {
                    right: 150px;
                }
                &:nth-child(2n) {
                    right: 100px;
                }

                &:after {
                    left: 100%;
                    right: auto;
                    transform: translateX(1%);
                }

                .title-chunk-text {
                    transform: skew(20deg);
                }
            }

            .article-img-canvas {
                transform: translateX(-50px);
            }
        }

        &.current-article:not(.article-loading) {

            .article-date {

                &:after {
                    transform: scale(8);
                    background-color: #2C323D;
                    transition: 1s 0.5s;
                }

                .article-month, .article-day {
                    opacity: 1;
                    transition: 0.5s 1s;
                }
            }

            .article-img-canvas {
                opacity: 1;
                z-index: -1;
                transition-duration: 1s;
            }

            .title-chunk {
                color: rgba(255, 255, 255, 0.8);
                background-color: #252931;
                transition: 0s 0.8s background, 0s 0.8s color, 1s 0.5s transform;

                &:after {
                    transition-delay: 0.5s;
                }
            }

            .title-chunk:nth-child(2) {
                transition: 0s 1.1s background, 0s 1.1s color, 1s 0.8s transform;
                &:after {
                    transition-delay: 0.8s;
                }
            }
            .title-chunk:nth-child(3) {
                transition: 0s 1s background, 0s 1s color, 1s 0.7s transform;
                &:after {
                    transition-delay: 0.7s;
                }
            }
            .title-chunk:nth-child(4) {
                transition: 0s 1.3s background, 0s 1.3s color, 1s 1s transform;
                &:after {
                    transition-delay: 1s;
                }
            }

            &.title-left, &.title-right .article-source {

                .title-chunk {
                    transform: translateX(0) skew(20deg);

                    &:after {
                        transform: translateX(151%);
                    }
                }

                .article-img-canvas {
                    transform: translateX(-50px);
                }
            }

            &.title-right, &.title-left .article-source {

                .title-chunk {
                    transform: translateX(0) skew(-20deg);

                    &:after {
                        transform: translateX(-151%);
                    }
                }

                .article-img-canvas {
                    transform: translateX(50px);
                }
            }
        }
    }

    .article-date {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        left: 599px;
        top: 0;
        width: 80px;
        height: 80px;
        font-size: 18px;
        letter-spacing: 3px;
        text-indent: 3px;
        z-index: 2;

        &:before, &:after {
            position: absolute;
            content: '';
            top: 50%;
            border-radius: 100%;
            z-index: -1;
        }

        &:before {
            left: calc(50% - 10px);
            top: calc(50% - 10px);
            width: 21px;
            height: 21px;
            background-color: #2C323D;
        }

        &:after {
            left: calc(50% - 5px);
            top: calc(50% - 5px);
            width: 11px;
            height: 11px;
            background-color: #565B64;
            transition: 0.5s;
        }

        .article-month, .article-day {
            opacity: 0;
            transition: 0.2s;
        }

        .article-month {
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.3);
        }

        .article-day {
            margin-top: 3px;
            color: rgba(255, 255, 255, 0.8);
        }
    }

    .article-title {
        position: relative;
        margin: 0;
        z-index: 1;

        .title-chunk {
            position: relative;
            display: inline-block;
            clear: both;
            margin: 4px 0;
            color: transparent;
            background-color: transparent;
            overflow: hidden;
            transition: 0s 0.3s background, 0s 0.3s color, 1s transform;

            &:after {
                position: absolute;
                content: '';
                top: 0;
                width: 200%;
                height: 100%;
                background-color: #1A1D22;
                transition: 1s 0s transform;
            }
        }

        .title-chunk-text {
            display: inline-block;
            font-size: 28px;
            letter-spacing: 5px;
            text-indent: 5px;
            white-space: nowrap;
            padding: 6px 12px;

            span {
                opacity: 0.5;
            }
        }
    }

    .article-img-container {
        position: relative;
    }

    .article-img-canvas {
        position: absolute;
        left: -30%;
        top: -30%;
        width: 160%;
        height: 160%;
        z-index: -2;
        opacity: 0.1;
        transition: 0.5s;
    }

    .article-img {
        position: relative;
        display: block;
        max-width: 600px;
        max-height: 340px;
        opacity: 0;
    }

    .article-source {
        position: absolute;
        bottom: 20px;

        .title-chunk-text {
            font-size: 16px;
            letter-spacing: 3px;
            text-indent: 3px;
            text-transform: uppercase;
        }
    }

    .article-link {
        position: absolute;
        left: calc(50% - 420px);
        top: 0;
        width: 900px;
        height: 100%;
        text-indent: -9999px;
        z-index: 1;
    }

    .article-loading {
        opacity: 0;
    }

    @media screen and (max-width: 1040px) {
        &.title-right {

            .article-title {
                position: absolute;
                top: 0;
                right: calc(50% - 480px);
            }

            .article-source {
                left: calc(50% - 1480px);
                bottom: 30px;
                transform: translate(0, 0) !important;
            }

            .article-img-container {
                transform: translateX(-80px);
            }
        }

        &.title-left {

            .article-title {
                position: absolute;
                top: 0;
                left: calc(50% - 340px);
            }

            .article-source {
                right: calc(50% - 840px);
                bottom: 30px;
                transform: translate(0, 0) !important;
            }

            .article-img-container {
                transform: translateX(120px) !important;
            }
        }

        .article-link {
            left: calc(50% - 280px);
            width: 700px;
        }
    }

    @media screen and (max-width: 840px) {

        .article-date {
            left: 499px;
            font-size: 16px;
        }

        &.title-right {

            .article-title {
                right: calc(50% - 440px);
            }

            .article-img-container {
                transform: translateX(-120px);
            }
        }

        &.title-left {

            .article-title {
                left: calc(50% - 380px);
            }

            .article-img-container {
                transform: translateX(80px) !important;
            }
        }

        .article-link {
            left: calc(50% - 300px);
            width: 660px;
        }
    }

    @media screen and (max-width: 720px) {

        .article {
            padding-bottom: 140px;
        }

        .article-img {
            max-width: 300px;
        }

        .article-title .title-chunk {
            margin: 2px 0;
        }

        .article-title .title-chunk-text {
            font-size: 24px;
            letter-spacing: 3px;
            text-indent: 3px;
            padding: 5px 10px;
        }

        .article-source .article-title .title-chunk-text {
            font-size: 14px;
            letter-spacing: 2px;
            text-indent: 2px;
        }

        &.title-right {

            .article-title {
                right: calc(50% - 320px);
            }

            .article-source {
                right: calc(50% - 500px) !important;
            }

            .article-img-container {
                transform: translate(-120px, 120px);
            }
        }

        &.title-left {

            .article-title {
                left: calc(50% - 240px);
            }

            .article-source {
                right: calc(50% - 340px);
            }

            .article-img-container {
                transform: translate(80px, 120px) !important;
            }
        }

        .article-link {
            left: calc(50% - 200px);
            width: 460px;
        }
    }

    @media screen and (max-width: 500px) {

        .article-date {
            transform: scale(0.5);
        }

        &.title-right {

            .article-title {
                transform: translateX(-50px) scale(0.6);
            }

            .article-source {
                right: calc(50% - 800px) !important;
                bottom: 60px;
            }

            .article-img-container {
                transform: translate(-105px, 100px) scale(0.7);
            }
        }

        &.title-left {

            .article-title {
                transform: translateX(50px) scale(0.6);
            }

            .article-source {
                right: calc(50% - 280px);
                bottom: 60px;
            }

            .article-img-container {
                transform: translate(70px, 90px) scale(0.7) !important;
            }
        }

        .article-link {
            left: calc(50% - 120px);
            width: 300px;
        }
    }
</style>

<script type="text/babel">
    import {mapState} from 'vuex';
    import anime from 'animejs';
    import Pieces from '~/plugins/pieces';

    export default {
        props: {
            article: {
                type: Object,
                default: null
            },
            isCurrentArticle: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                loading: true,
                articleImage: null,
                imageTimer: null
            }
        },
        computed: {
            ...mapState(['windowWidth'])
        },
        methods: {
            hideImage() {
                clearTimeout(this.imageTimer);
                anime.remove(this.articleImage.pieces);
                this.articleImage.hidePieces({duration: 500, easing: 'easeOutCubic'});
            },
            showImage() {
                this.imageTimer = setTimeout(() => {
                    this.articleImage.showPieces({singly: true, complete: (anim) => {
                        const piece = anim.animatables[0].target;
                        anime({
                            targets: piece,
                            ty: piece.h_ty < 200
                                    ? [{value: 210, duration: 1000}, {value: 190, duration: 2000}, {value: 200, duration: 1000}]
                                    : [{value: 190, duration: 1000}, {value: 210, duration: 2000}, {value: 200, duration: 1000}],
                            duration: 2000,
                            easing: 'linear',
                            loop: true
                        });
                    }});
                }, 500);
            },
            initImage() {
                const articleImg = new Image();
                articleImg.onload = () => {
                    this.articleImage = new Pieces({
                        canvas: this.$refs.articleCanvas,
                        image: this.$refs.articleImg,
                        x: 'center',
                        y: 'center',
                        w: () => Pieces.random(30, 100),
                        h: () => Pieces.random(100, 300),
                        ty: () => Pieces.random(-200, 200),
                        piecesWidth: () => Pieces.random(50, 200),
                        piecesSpacing: [1],
                        extraSpacing: {extraX: 100, extraY: 200},
                        angle: Pieces.random(-70, 70),
                        animation: {
                            duration: () => Pieces.random(500, 1500),
                            easing: 'easeInOutQuint'
                        },
                        ready: () => {
                            this.loading = false;
                            if (this.isCurrentArticle) {
                                this.showImage();
                            }
                            setTimeout(() => {
                                this.$emit('ready', this.article.index);
                            }, 1000);
                        }
                    });
                };
                articleImg.src = this.article.imageSrc;
            }
        },
        watch: {
            windowWidth() {
                this.articleImage.stop();
                requestAnimationFrame(this.initImage);
            }
        },
        mounted() {
            this.initImage();
        },
        beforeDestroy() {
            this.articleImage.stop();
        }
    }
</script>
