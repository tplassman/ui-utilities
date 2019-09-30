/**
 * Emit event - wrapper around CustomEvent API
 * @param {string} eventHandle
 * @param {object} eventDetails
 * @param {EventTarget} target
 */
export function emit(eventHandle, eventDetails, target = window) {
    const event = new CustomEvent(eventHandle, { detail: eventDetails });

    target.dispatchEvent(event);
}

/**
 * Listen for custom event and execute callback on EventTarget
 * @param {string} eventHandle
 * @param {function} cb
 * @param {EventTarget} target
 */
export function on(eventHandle, cb, target = window) {
    target.addEventListener(eventHandle, cb);
}
