/**
 * Emit event - wrapper around CustomEvent API
 * @param {string} eventHandle
 * @param {object} eventDetails
 */
/* eslint-disable import/prefer-default-export */
export function emit(eventHandle, eventDetails) {
    const event = new CustomEvent(eventHandle, { detail: eventDetails });

    window.dispatchEvent(event);
}
/* eslint-enable import/prefer-default-export */
