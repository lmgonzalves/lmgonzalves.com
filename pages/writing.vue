<template>
    <div class="writing-container" :class="{'writing-container-menu-open': navMenuOpen}">
        <writing-timeline :currentArticle="currentArticle"></writing-timeline>
        <div class="writing-articles" ref="articlesContainer">
            <writing-article v-for="(article, index) in articlesList" :key="index" :article="article" :isCurrentArticle="currentIndex == index" @ready="ready" ref="articleList"></writing-article>
        </div>
        <transition name="fade" appear>
            <div class="articles-arrow-container articles-arrow-up-container" :class="{'articles-arrow-hidden': articles.length == 0 || firstItem}">
                <button class="button articles-arrow-button articles-arrow-up-button" @click="prevArticle">Previous Article</button>
                <svg width="26px" height="50px" viewBox="0 0 26 50" class="articles-arrow-svg articles-arrow-up-svg" ref="arrowUpSVG">
                    <path d="M 13 45 l 0 -40 l -8 8" class="articles-arrow articles-arrow-up" ref="arrowUp" shape-rendering="crispEdges"></path>
                </svg>
            </div>
        </transition>
        <transition name="fade" appear>
            <div class="articles-arrow-container articles-arrow-down-container" :class="{'articles-arrow-hidden': articles.length == 0 || lastItem}">
                <button class="button articles-arrow-button articles-arrow-down-button" @click="nextArticle">Next Article</button>
                <svg width="26px" height="50px" viewBox="0 0 26 50" class="articles-arrow-svg articles-arrow-down-svg" ref="arrowDownSVG">
                    <path d="M 13 5 l 0 40 l 8 -8" class="articles-arrow articles-arrow-down" ref="arrowDown" shape-rendering="crispEdges"></path>
                </svg>
            </div>
        </transition>
    </div>
</template>

<style lang="scss" rel="stylesheet/scss">
    .writing-container {
        display: flex;
        margin-top: 100px;
    }

    .writing-articles {
        flex: 1;
    }

    .articles-arrow-container {
        position: absolute;
        left: 126px;
        z-index: 10;
        transition: 0.5s 0.5s opacity;
    }

    .writing-container-menu-open .articles-arrow-container {
        opacity: 0;
        pointer-events: none;
        z-index: 2;
        transition: 0.5s opacity;
    }

    .articles-arrow-hidden {
        opacity: 0;
        pointer-events: none;
    }

    .articles-arrow-up-container {
        top: 100px;
    }

    .articles-arrow-down-container {
        top: 228px;
    }

    .articles-arrow {
        fill: none;
        stroke: rgba(255, 255, 255, 0.5);
        stroke-width: 1px;
    }

    .articles-arrow-button {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
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

    .articles-arrow-up-button {
        &:hover, &:focus {
            & + .articles-arrow-svg {
                transform: translateY(-10px);
            }
        }
    }

    .articles-arrow-down-button {
        &:hover, &:focus {
            & + .articles-arrow-svg {
                transform: translateY(10px);
            }
        }
    }

    .articles-arrow-svg {
        transition: 0.3s transform;
    }

    @media screen and (max-width: 840px) {

        .articles-arrow-container {
            left: 26px;
        }
    }
</style>

<script type="text/babel">
    import {mapState} from 'vuex';
    import anime from 'animejs';
    import throttle from 'lodash/throttle';
    import WritingArticle from '~/components/writing/WritingArticle.vue';
    import WritingTimeline from '~/components/writing/WritingTimeline.vue';

    export default {
        components: {
            WritingArticle,
            WritingTimeline
        },
        data() {
            return {
                articlesContent: [
                    {
                        date: '2019-05-24',
                        title: ['Implementing <span>a</span>', 'Scroll Based Animation', '<span>with</span> JavaScript'],
                        titlePosition: 'left',
                        image: 'ScrollAnimation.png',
                        source: 'Scotch.io',
                        sourceLink: 'https://scotch.io/tutorials/implementing-a-scroll-based-animation-with-javascript'
                    },
                    {
                        date: '2018-09-05',
                        title: ['Building <span>the</span>', '<span>new</span> Scotch.io', 'Animated SVG Logo'],
                        titlePosition: 'right',
                        image: 'ScotchLogo.png',
                        source: 'Scotch.io',
                        sourceLink: 'https://scotch.io/tutorials/building-the-new-scotchio-animated-svg-logo'
                    },
                    {
                        date: '2018-08-16',
                        title: ['Building <span>a</span>', 'Portfolio Carousel', '<span>with</span> Synchronized Sliders'],
                        titlePosition: 'left',
                        image: 'PortfolioCarousel.png',
                        source: 'Scotch.io',
                        sourceLink: 'https://scotch.io/tutorials/building-a-portfolio-carousel-with-synchronized-sliders'
                    },
                    {
                        date: '2018-04-25',
                        title: ['Particle Effects', '<span>for</span> Buttons'],
                        titlePosition: 'left',
                        image: 'ParticleEffects.jpg',
                        source: 'Codrops',
                        sourceLink: 'https://tympanus.net/codrops/2018/04/25/particle-effects-for-buttons/'
                    },
                    {
                        date: '2018-03-19',
                        title: ['Animating <span>More Elements</span>', 'Along SVG Paths', '<span>with</span> JavaScript'],
                        titlePosition: 'right',
                        image: 'PathSlider2.png',
                        source: 'Scotch.io',
                        sourceLink: 'https://scotch.io/tutorials/animating-more-elements-along-svg-paths-with-javascript-part-2909'
                    },
                    {
                        date: '2018-03-12',
                        title: ['Animating <span>Elements</span>', 'Along SVG Paths', '<span>with</span> JavaScript'],
                        titlePosition: 'right',
                        image: 'PathSlider.png',
                        source: 'Scotch.io',
                        sourceLink: 'https://scotch.io/tutorials/animating-elements-along-svg-paths-introducing-pathslider'
                    },
                    {
                        date: '2018-03-05',
                        title: ['Developing <span>a</span>', 'Creative Upload Interaction', '<span>with</span> JavaScript <span>and</span> Canvas'],
                        titlePosition: 'left',
                        image: 'CreativeUpload.jpg',
                        source: 'Scotch.io',
                        sourceLink: 'https://scotch.io/tutorials/developing-a-creative-upload-interaction-with-javascript-and-canvas'
                    },
                    {
                        date: '2018-02-22',
                        title: ['Build <span>an</span>', 'Elastic Range Input', '<span>with</span> SVG <span>and</span> anime.js'],
                        titlePosition: 'left',
                        image: 'ElasticRangeInput.png',
                        source: 'Scotch.io',
                        sourceLink: 'https://scotch.io/tutorials/build-an-elastic-range-input-with-svg-and-animejs'
                    },
                    {
                        date: '2018-02-21',
                        title: ['Animated', 'Fragment Slideshow', '<span>with</span> Pieces'],
                        titlePosition: 'right',
                        image: 'AnimatedFragmentSlideshow.jpg',
                        source: 'Codrops',
                        sourceLink: 'https://tympanus.net/codrops/2018/02/21/animated-fragment-slideshow/'
                    },
                    {
                        date: '2018-02-01',
                        title: ['Build <span>a</span>', 'Download Button', '<span>full of</span> Micro Interactions'],
                        titlePosition: 'left',
                        image: 'BuildDownloadButtonFullMicroInteractions.png',
                        source: 'Scotch.io',
                        sourceLink: 'https://scotch.io/tutorials/build-a-download-button-full-of-micro-interactions'
                    },
                    {
                        date: '2017-05-17',
                        title: ['Creative', 'Splash Transition', '<span>with</span> CSS <span>and</span> SVG'],
                        titlePosition: 'right',
                        image: 'CreativeSplashTransitionCssSVG.jpg',
                        source: 'Scotch.io',
                        sourceLink: 'https://scotch.io/tutorials/creative-splash-transition-with-css-and-svg'
                    },
                    {
                        date: '2017-05-01',
                        title: ['Drawing', 'Creative Brushstrokes', '<span>with</span> JavaScript'],
                        titlePosition: 'left',
                        image: 'DrawingCreativeBrushstrokesJavaScript.jpg',
                        source: 'Scotch.io',
                        sourceLink: 'https://scotch.io/tutorials/drawing-creative-brushstrokes-with-javascript'
                    },
                    {
                        date: '2017-02-27',
                        title: ['Drawing <span>and</span> Animating', 'Jelly Shapes', '<span>with</span> Canvas', '<span>Part 2</span>'],
                        titlePosition: 'right',
                        image: 'DrawingAnimatingJellyShapesCanvasPart2.jpg',
                        source: 'Scotch.io',
                        sourceLink: 'https://scotch.io/tutorials/drawing-and-animating-jelly-shapes-with-canvas-part-2'
                    },
                    {
                        date: '2017-02-21',
                        title: ['Creative', 'Dissection Puzzles', '<span>with</span> CSS <span>and</span> SVG'],
                        titlePosition: 'left',
                        image: 'CreativeDissectionPuzzlesCssSVG.png',
                        source: 'eWebDesign',
                        sourceLink: 'https://ewebdesign.com/creative-dissection-puzzles-css-svg/'
                    },
                    {
                        date: '2017-02-20',
                        title: ['Drawing <span>and</span> Animating', 'Jelly Shapes', '<span>with</span> Canvas'],
                        titlePosition: 'left',
                        image: 'DrawingAnimatingJellyShapesCanvas.png',
                        source: 'Scotch.io',
                        sourceLink: 'https://scotch.io/tutorials/drawing-and-animating-jelly-shapes-with-canvas'
                    },
                    {
                        date: '2017-01-24',
                        title: ['Building <span>a</span> Morphing', 'Hamburger Menu', '<span>with</span> CSS'],
                        titlePosition: 'left',
                        image: 'BuildingMorphingHamburgerMenuCSS.png',
                        source: 'Scotch.io',
                        sourceLink: 'https://scotch.io/tutorials/building-a-morphing-hamburger-menu-with-css'
                    },
                    {
                        date: '2017-01-19',
                        title: ['How <span>to</span> Customize', 'Embedded Demos', '<span>with</span> Cody.js'],
                        titlePosition: 'right',
                        image: 'CustomizeEmbeddedDemosCodyJS.png',
                        source: 'Scotch.io',
                        sourceLink: 'https://scotch.io/tutorials/how-to-customize-embedded-demos-with-cody-js'
                    },
                    {
                        date: '2016-12-07',
                        title: ['Build <span>a</span> Custom', 'JavaScript', 'Scrollspy Navigation'],
                        titlePosition: 'left',
                        image: 'CustomScrollspyNavigation.png',
                        source: 'Scotch.io',
                        sourceLink: 'https://scotch.io/tutorials/build-a-custom-javascript-scrollspy-navigation'
                    },
                    {
                        date: '2016-06-29',
                        title: ['Making', '<span>an</span> Elastic Slider', '<span>from</span> Scratch'],
                        titlePosition: 'right',
                        image: 'MakingElasticSliderScratch.jpg',
                        source: 'X-Team',
                        sourceLink: 'https://x-team.com/blog/making-elastic-slider-scratch/'
                    },
                    {
                        date: '2016-03-02',
                        title: ['Creative', 'SVG Letter Animations', '<span>with</span> Segment'],
                        titlePosition: 'left',
                        image: 'CreativeSVGLetterAnimations.png',
                        source: 'Codrops',
                        sourceLink: 'https://tympanus.net/codrops/2016/03/02/creative-svg-letter-animations/'
                    },
                    {
                        date: '2016-01-25',
                        title: ['Creating', 'Loading Buttons', '<span>with</span> SVG <span>and</span> Segment'],
                        titlePosition: 'left',
                        image: 'CreatingLoadingButtonsSVGSegment.png',
                        source: 'X-Team',
                        sourceLink: 'https://x-team.com/blog/creating-loading-buttons-svg-segment/'
                    },
                    {
                        date: '2015-11-12',
                        title: ['Animating', '<span>an</span> SVG Menu Icon', '<span>with</span> Segment'],
                        titlePosition: 'right',
                        image: 'AnimatingSVGMenuIcon.png',
                        source: 'Codrops',
                        sourceLink: 'https://tympanus.net/codrops/2015/11/12/animating-svg-menu-icon-segment/'
                    }
                ],
                articlesList: [],
                currentIndex: 0,
                translateY: 0,
                monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            }
        },
        computed: {
            ...mapState(['navMenuOpen', 'windowWidth', 'windowHeight']),
            articlesData() {
                const articles = [];
                this.articlesContent.forEach((article, index) => {
                    const [year, month, day] = article.date.split('-');
                    const monthName = this.monthNames[parseInt(month) - 1];
                    const imageSrc = `/img/${article.image}`;
                    const titleText = Array.join(article.title, ' ').replace(/<span>|<\/span>/g,'');
                    let titleHtml = '';
                    article.title.forEach((titleChunk) => {
                        titleHtml += `<span class="title-chunk"><span class="title-chunk-text">${titleChunk}</span></span>`;
                    });
                    const isReady = false;
                    articles.push({index, year, month, day, monthName, imageSrc, titleText, titleHtml, isReady, ...article});
                });
                return articles;
            },
            articles() {
                return this.articlesList.filter(a => a.isReady);
            },
            currentArticle() {
                return this.articles[this.currentIndex];
            },
            firstItem() {
                return this.currentIndex === 0;
            },
            lastItem() {
                return this.currentIndex === this.articles.length - 1;
            }
        },
        methods: {
            waitForImage(article) {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.onload = () => {
                        this.articlesList.push(article);
                        resolve();
                    };
                    img.src = article.imageSrc;
                });
            },
            async waitForImages() {
                for (let article of this.articlesData) {
                    await this.waitForImage(article);
                }
            },
            ready(index) {
                this.articlesList[index].isReady = true;
            },
            nextArticle() {
                if (this.articles.length && !this.lastItem) {
                    this.currentIndex++;
                }
            },
            prevArticle() {
                if (this.articles.length && !this.firstItem) {
                    this.currentIndex--;
                }
            },
            handleScroll(e) {
                e.preventDefault();
                window.scrollTo(0, 0);
            },
            handleKeyDown(e) {
                if (this.articles.length) {
                    const k = e.keyCode;
                    if (k == 37) { // left
                    } else if (k == 39) { // right
                    } else if (k == 38 || k == 33) { // up | page-up
                        this.prevArticle();
                    } else if (k == 40 || k == 34) { // down | page-down
                        this.nextArticle();
                    } else if (k == 36) { // home
                        this.currentIndex = 0;
                    } else if (k == 35) { // end
                        this.currentIndex = this.articles.length - 1;
                    }
                }
            },
            handleWheel(e) {
                const deltaX = e.wheelDeltaX || e.deltaX * -1;
                const deltaY = e.wheelDeltaY || e.deltaY * -1;
                if (deltaY < 0) {
                    this.nextArticle();
                } else {
                    this.prevArticle();
                }
            },
            translateArticles(noAnimate) {
                const {articlesContainer} = this.$refs;
                anime.remove(articlesContainer);
                anime({
                    targets: articlesContainer,
                    translateY: this.translateY,
                    duration: noAnimate ? 0 : 1000,
                    easing: 'easeOutCubic'
                });
            },
            adjustScroll() {
                setTimeout(() => {
                    const {articleList} = this.$refs;
                    const firstArticle = articleList[0];
                    const currentArticle = articleList[this.currentIndex];
                    this.translateY = firstArticle.$el.getBoundingClientRect().top - currentArticle.$el.getBoundingClientRect().top;
                    this.translateArticles(true);
                }, 500);
            }
        },
        watch: {
            currentIndex(newIndex, oldIndex) {
                const {articleList} = this.$refs;
                if (articleList) {
                    const newArticle = articleList[newIndex];
                    const oldArticle = articleList[oldIndex];
                    const firstArticle = articleList[0];
                    this.translateY = firstArticle.$el.getBoundingClientRect().top - newArticle.$el.getBoundingClientRect().top;
                    this.translateArticles();
                    oldArticle.hideImage();
                    newArticle.showImage();
                }
            },
            windowWidth() {
                this.adjustScroll();
            },
            windowHeight() {
                this.adjustScroll();
            }
        },
        mounted() {
            this.waitForImages();
            this.throttledWheel = throttle(this.handleWheel, 200);
            document.addEventListener('scroll', this.handleScroll);
            document.addEventListener('keydown', this.handleKeyDown);
            document.addEventListener('wheel', this.throttledWheel);
        },
        beforeDestroy() {
            anime.remove(this.$refs.articlesContainer);
            document.removeEventListener('scroll', this.handleScroll);
            document.removeEventListener('keydown', this.handleKeyDown);
            document.removeEventListener('wheel', this.throttledWheel);
        }
    }
</script>
