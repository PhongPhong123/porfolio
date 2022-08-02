class LocalStorage {
    /**
     * @param {string} key
     * @param {any} value
     * */
    setLocalStorage(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    /**
     * @param {string} key
     * */
    getLocalStorage(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    /**
     * @param {string} key
     * */
    checkLocalStorage(key) {
        return !!localStorage.getItem(key);
    }
}

export default LocalStorage;
