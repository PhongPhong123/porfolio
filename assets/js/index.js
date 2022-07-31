import TypeWriter from "./typewriter.js";
import { myBios, biosContainer, barButton, menu, techs, cv, about, greeting } from "./constants.js";

class Program {
    /**
     * @type {TypeWriter}
     * @private
     */
    #typeWriter;

    /**
     * @type {ClickEvent}
     * @private
     */
    #clickEvent;

    /**
     * @param {TypeWriter} typeWriter 
     */
    constructor (typeWriter, clickEvent) {
        this.#typeWriter = typeWriter;
    }

    /**
     * @param {Element} target
     * @param {number} baseSpeed 
     * @param {string} animationName
     */
    #applyAnimation (target, animationName, interation = null, baseSpeed = null) {
        let speed = 0;
        if (baseSpeed === null) {
            speed = Math.floor(Math.random() * baseSpeed + 1);
        }
        target.style.animation = `${animationName} ${speed === 0 && baseSpeed}s ${interation} linear`;
    }

    main () {
        this.#typeWriter.setTexts(myBios);
        this.#typeWriter.setContainer(biosContainer);
        this.#typeWriter.typeText(50);
        techs.forEach((tech) => {
            const baseSpeed = Math.floor(Math.random() * (10 - 7 + 1) + 7);
            this.#applyAnimation(tech, 'fly', 'infinite', baseSpeed);
        });
        cv.addEventListener('click', () => {
            window.open('http://localhost:1808/cv', '_blank');
        });
        window.addEventListener('scroll', () => {
            about.classList.remove('invisible');
            const aboutContent = about.firstElementChild;
            [...aboutContent.children].forEach(child => {
                this.#applyAnimation(child, 'riseUp', 1, 1);
            });
        });
    }
}

const typeWriter = new TypeWriter();
const program = new Program(typeWriter);
program.main();