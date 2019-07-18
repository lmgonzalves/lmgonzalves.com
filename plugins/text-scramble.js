// Utils

function stringContains(str, text) {
    return str.indexOf(text) > -1;
}

const is = {
    arr: a => Array.isArray(a),
    obj: a => stringContains(Object.prototype.toString.call(a), 'Object'),
    fnc: a => typeof a === 'function'
};

function span(text, clas) {
    return `<span class="${clas || ''}">${text || ''}</span>`;
}


// TextScramble
// Adapted version from: https://codepen.io/lollocll/pen/qPmLMr

function TextScramble(el, options) {
    this.el = el;
    this.queue = [];
    this.o = Object.assign({}, this.defaults, options);
}

TextScramble.prototype = {
    defaults: {
        chars: '!<>-_\\/[]{}—=+*^?#________',
        duration: 500,
        delay: () => Math.floor(Math.random() * 500),
        timeOut: 250,
        tempCharsCount: () => Math.random() > 0.25 ? 1 : 2
    },

    cleanQueue() {
        const queue = [];
        for (let i = 0, length = this.queue.length; i < length; i++) {
            if (this.queue[i]) {
                if (this.queue[i].timeId) {
                    clearTimeout(this.queue[i].timeId);
                }
                if (this.queue[i].frameId) {
                    cancelAnimationFrame(this.queue[i].frameId);
                }
                if (this.queue[i].current.char) {
                    queue.push(this.queue[i].current);
                }
            }
        }
        return queue;
    },

    setText(newText, noAnimate) {
        const promise = new Promise((resolve) => this.resolve = resolve);
        const queue = this.cleanQueue();
        const timeOut = queue.length ? this.o.timeOut : 0;
        if (this.timer) {
            clearTimeout(this.timer);
        }
        if (noAnimate) {
            let toHTML = '';
            for (let i = 0; i < newText.length; i++) {
                toHTML += span(newText[i], `text-${i} to-text`);
            }
            this.el.innerHTML = toHTML;
            this.queue = [];
            this.resolve();
        } else {
            this.timer = setTimeout(() => {
                this.queue = [];
                let output = '';
                const oldText = queue.length ? queue : this.el.innerText;
                const length = Math.max(oldText.length, newText.length);
                this.completed = 0;
                this.toHTML = '';
                let lastFromIndex, lastToIndex;
                for (let i = 0; i < length; i++) {
                    const fromIndex = Math.floor(oldText.length / length * i);
                    const toIndex = Math.floor(newText.length / length * i);
                    let from = fromIndex !== lastFromIndex ? oldText[fromIndex] || '' : '';
                    let clas = '';
                    if (is.obj(from)) {
                        clas = from.clas;
                        from = from.char;
                    }
                    const to = toIndex !== lastToIndex ? newText[toIndex] || '' : '';
                    lastFromIndex = fromIndex;
                    lastToIndex = toIndex;
                    const current = {char: from, clas: clas};
                    const delay = is.fnc(this.o.delay) ? this.o.delay() : this.o.delay;
                    output += from ? span(from, `text-${i} from-text ${clas}`) : '';
                    let tempCharsCount = is.fnc(this.o.tempCharsCount) ? this.o.tempCharsCount() : this.o.tempCharsCount;
                    let tempChars = [], tempChar;
                    while (tempCharsCount--) {
                        tempChar = this.randomChar();
                        output += span(tempChar, `text-${i} temp-text lighter-text hidden`);
                        tempChars.push(tempChar);
                    }
                    output += to ? span(to, `text-${i} to-text hidden`) : '';
                    this.queue.push({i, from, to, tempChars, current, delay});
                }
                this.el.innerHTML = output;
                let item;
                for (let i = 0; i < length; i++) {
                    item = this.queue[i];
                    if (item.from) {
                        item.fromEl = this.el.querySelector(`.text-${i}.from-text`);
                        item.fromEl.style.maxWidth = `${item.fromEl.scrollWidth}px`;
                    }
                    if (item.to) {
                        item.toEl = this.el.querySelector(`.text-${i}.to-text`);
                        item.toEl.style.maxWidth = `${item.toEl.scrollWidth}px`;
                        this.toHTML += item.toEl.outerHTML.replace(/ hidden/g, '');
                    }
                    item.tempItems = [].slice.call(this.el.querySelectorAll(`.text-${i}.temp-text`));
                    item.tempItems.forEach(tempEl => {
                        tempEl.style.maxWidth = `${tempEl.scrollWidth}px`;
                    });
                    item.refEl = item.to ? item.toEl : item.fromEl;
                    item.timeId = setTimeout(this.update.bind(this, item, true), item.delay);
                }
            }, timeOut);
        }
        return promise;
    },

    update(item, start) {
        if (start) {
            if (item.from) {
                this.hide(item.fromEl);
            }
            item.frameId = requestAnimationFrame(this.update.bind(this, item, false));
        } else if (item.tempItems.length) {
            item.current = {char: item.tempChars.pop(), clas: 'lighter-text'};
            const tempEl = item.tempItems.pop();
            this.show(tempEl);
            item.timeId = setTimeout(() => {
                this.hide(tempEl);
                item.frameId = requestAnimationFrame(this.update.bind(this, item, false))
            }, is.fnc(this.o.duration) ? this.o.duration() : this.o.duration);
        } else {
            item.current = {char: item.to, clas: ''};
            if (item.to) {
                this.show(item.toEl);
            }
            item.timeId = setTimeout(this.checkResolve.bind(this), is.fnc(this.o.duration) ? this.o.duration() : this.o.duration);
        }
    },

    hide(el) {
        el.classList.add('hidden');
    },

    show(el) {
        el.classList.remove('hidden');
    },

    checkResolve() {
        this.completed++;
        if (this.completed === this.queue.length) {
            this.el.innerHTML = this.toHTML;
            this.queue = [];
            this.resolve();
        }
    },

    randomChar() {
        return this.o.chars[Math.floor(Math.random() * this.o.chars.length)];
    }
};

export default TextScramble;
