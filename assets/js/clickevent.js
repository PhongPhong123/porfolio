class ClickEvent {
    /**
     * @type {string}
     * @private
     */
    #event = 'click';

    constructor () { }

    /**
     * @param {HTMLElement} target 
     * @private
     */
    #active (target) {
        target.style.setProperty('display', 'block', 'important');
    }

    /**
     * @param {HTMLElement} target 
     * @private
     */
    #deactive (target) {
        target.style.setProperty('display', 'none', 'important');
    }

    /**
     * @param {Element} emiter 
     * @param {string} target 
     */
    show (emiter, target) {

    }
}

export default ClickEvent;