class TypeWriter {
    /**
     * @type {string[]}
     * @private
     */
    #texts;

    /**
     * @type {Element}
     * @private
     */
    #container;

    constructor () { }

    /**
     * @param {string[]} texts 
     */
    setTexts (texts) {
        this.#texts = texts;
    }

    /**
     * @returns {string[]}
     */
    getTexts () {
        return this.#texts;
    }

    /**
     * @returns {Element}
     */
    getContainer () {
        return this.#container;
    }

    /**
     * @param {Element} container
     */
    setContainer (container) {
        this.#container = container;
    }

    /**
     * @param {number} delay
     * @param {HTMLSpanElement} target 
     * @param {string} text
     */
    #delay (delay, target, letter) {
        return new Promise((resolve) => {
            setTimeout(() => resolve(target.textContent += letter), delay);
        });
    }

    /**
     * @param {string[]} texts
     * @param {number} baseDelay 
     */
    async typeText (baseDelay) {
        for (const text of this.#texts) {
            const liTag = document.createElement('li');
            liTag.setAttribute('class', 'flex items-center justify-center');
            const icon = document.createElement('i');
            icon.setAttribute('class', 'fa-solid fa-angle-right pr-3');
            const contentArea = document.createElement('span');
            contentArea.setAttribute('class', 'primary-font text-xs md:text-lg lg:text-xl');
            const cursor = document.createElement('span');
            cursor.setAttribute('class', 'cursor');
            [icon, contentArea, cursor].forEach(tag => {
                liTag.appendChild(tag);
            });
            this.#container.appendChild(liTag);
            const letters = text.split('');
            for (const [index, letter] of letters.entries()) {
                await this.#delay(baseDelay, contentArea, letter);
                if (index === letters.length - 1) {
                    liTag.removeChild(cursor);
                }
            }
        }
    }
}

export default TypeWriter;