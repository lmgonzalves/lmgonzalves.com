import Vuex from 'vuex';

const createStore = () => {
    return new Vuex.Store({
        state: {
            busy: false,
            resizing: false,
            mainText: null,
            mainTextCanvas: null,
            currentIndex: -1,
            navMenuOpen: false,
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
        },
        mutations: {
            busyOn(state) {
                state.busy = true;
            },
            busyOff(state) {
                state.busy = false;
            },
            resizingOn(state) {
                state.resizing = true;
            },
            resizingOff(state) {
                state.resizing = false;
            },
            setMainText(state, mainText) {
                state.mainText = mainText;
            },
            setMainTextCanvas(state, mainTextCanvas) {
                state.mainTextCanvas = mainTextCanvas;
            },
            setCurrentIndex(state, index) {
                state.currentIndex = index;
            },
            openNavMenu(state) {
                state.navMenuOpen = true;
            },
            closeNavMenu(state) {
                state.navMenuOpen = false;
            },
            toggleNavMenu(state) {
                state.navMenuOpen = !state.navMenuOpen;
            },
            setWindowWidth(state, windowWidth) {
                state.windowWidth = windowWidth;
            },
            setWindowHeight(state, windowHeight) {
                state.windowHeight = windowHeight;
            }
        },
        getters: {
            currentItem(state) {
                return state.mainText ? state.mainText.items[state.currentIndex] : null;
            },
            hoveredItem(state) {
                return state.mainText ? state.mainText.hoverItem : null;
            },
            hoveredItemIndex(state, getters) {
                return getters.hoveredItem ? getters.hoveredItem.index : -1;
            },
            smallScreen(state) {
                return state.windowWidth <= 600;
            },
            mediumScreen(state) {
                return state.windowWidth <= 930;
            }
        }
    });
};

export default createStore;
