import TypeWriter from "./typewriter.js";
import Repository from "./repository.js";
import LocalStorage from "./localStorage.js";
import {about, biosContainer, cv, greeting, myBios, project, techs} from "./constants.js";

class Program {
    /**
     * @type {TypeWriter}
     * @private
     */
    #typeWriter;

    /**
     * @type {Repository}
     * @private
     */
    #repository;

    /**
     * @type {LocalStorage}
     * @private
     * */
    #localStorage

    /**
     * @param {TypeWriter} typeWriter
     * @param {Repository} repository
     */
    constructor (typeWriter, repository, localStorage) {
        this.#typeWriter = typeWriter;
        this.#repository = repository;
        this.#localStorage = localStorage;
    }

    /**
     * @param {Element} target
     * @param interation
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

    /**
     * @param {string} api 
     */
    async #fetchRepos (api) {
        const response = await fetch(api);
        return await response.json();
    }

    #visibleAbout () {
        if (!about.classList.contains('invisible')) { return; }
        if (window.scrollY >= greeting.offsetHeight / 2 && window.scrollY <= greeting.offsetHeight) {
            about.classList.remove('invisible');
            const aboutContent = about.firstElementChild;
            [...aboutContent.children].forEach(child => {
                this.#applyAnimation(child, 'riseUp', 1, 1);
            });
        }
    }

    async #visibleProject () {
        if (!project.classList.contains('invisible')) { return; }
        if (window.scrollY >= (about.offsetHeight + greeting.offsetHeight) / 2 && window.scrollY <= about.offsetHeight + greeting.offsetHeight) {
            project.classList.remove('invisible');
            const reposLocalStorageKey = 'repositories';
            let repos = []
            if (!this.#localStorage.checkLocalStorage(reposLocalStorageKey)) {
                repos = await this.#fetchRepos('http://localhost:1808/github-repos');
                this.#localStorage.setLocalStorage(reposLocalStorageKey, repos);
            }
            if (this.#localStorage.checkLocalStorage(reposLocalStorageKey)) {
                repos = this.#localStorage.getLocalStorage(reposLocalStorageKey);
                this.#repository.setRepos(repos);
            }
            await this.#repository.renderRepos(project.children[0]);
        }
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
        window.addEventListener('scroll', async () => {
            this.#visibleAbout();
            await this.#visibleProject();
        });
    }
}

const typeWriter = new TypeWriter();
const repository = new Repository();
const localStorage = new LocalStorage();
const program = new Program(typeWriter, repository, localStorage);
program.main();