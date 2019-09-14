export default function (func, wait = 0, immediate) {
    let timeout;

    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            timeout = null;
            if (!immediate) {
                func.apply(this, args);
            }
        }, wait);

        if (immediate && !timeout) {
            func.apply(this, args);
        }
    };
}
