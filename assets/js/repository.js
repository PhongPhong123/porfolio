import {mainGithubRepos} from './constants.js';

class Repository {
    #repos;

    constructor () { }

    setRepos (repos) {
        this.#repos = repos;
    }

    #findMainRepos (repos) {
        let response = [];
        repos.forEach(repo => {
            for (const id of mainGithubRepos) {
                if (repo.id === id) response.push(repo);
            }
        });
        return response;
    }

    async renderRepos (container) {
        for (const repo of this.#findMainRepos(this.#repos)) {
            const repoDiv = document.createElement('a');
            repoDiv.setAttribute('class', 'repo drop-shadow-md');
            repoDiv.setAttribute('href', repo.html_url);
            const repoInDiv = document.createElement('div');
            repoInDiv.setAttribute('class', 'border rounded bg-white');
            const wrap = document.createElement('div');
            wrap.setAttribute('class', 'p-2');
            const top = document.createElement('div');
            top.setAttribute('class', 'flex items-center justify-between pb-3')
            const icon = document.createElement('i');
            icon.setAttribute('class', 'fa-solid fa-book-bookmark');
            const repoName = document.createElement('p');
            repoName.setAttribute('class', 'w-4/5 primary-font pl-2 font-bold text-xs truncate');
            repoName.textContent = repo.name;
            const bottom = document.createElement('div');
            const languages = document.createElement('ul');
            languages.setAttribute('class', 'flex gap-x-2 flex-wrap text-xs');
            async function fetchLanguages (api) {
                const response = await fetch(api);
                return await response.json();
            }
            for (const language in await fetchLanguages(repo.languages_url)) {
                const li = document.createElement('li');
                li.textContent = language;
                languages.appendChild(li);
            }
            bottom.appendChild(languages);
            top.appendChild(icon);
            top.appendChild(repoName);
            wrap.appendChild(top);
            wrap.appendChild(bottom);
            repoInDiv.appendChild(wrap);
            repoDiv.appendChild(repoInDiv);
            repoDiv.style.animation = 'riseUp 0.5s linear';
            container.appendChild(repoDiv);
        }
    }
}

export default Repository;