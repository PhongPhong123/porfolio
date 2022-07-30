import TypeWriter from "./typewriter.js";
import ClickEvent from "./clickEvent.js";
import { myBios, biosContainer, barButton, menu, techs } from "./constants.js";

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
        this.#clickEvent = clickEvent;
    }

    /**
     * @param {Element} target
     * @param {number} baseSpeed 
     */
    #applyAnimation (target, baseSpeed) {
        const flySpeed = Math.floor(Math.random() * baseSpeed + 1);
        target.style.animation = ` fly ${flySpeed}s infinite linear`;
    }

    main () {
        this.#typeWriter.setTexts(myBios);
        this.#typeWriter.setContainer(biosContainer);
        this.#typeWriter.typeText(50);
        techs.forEach((tech) => {
            const baseSpeed = Math.floor(Math.random() * (10 - 7 + 1) + 7);
            this.#applyAnimation(tech, baseSpeed);
        });
    }
}

const typeWriter = new TypeWriter();
const clickEvent = new ClickEvent();
const program = new Program(typeWriter, clickEvent);
program.main();