const TAGS = 'h1,h2,h3,h4,h5,h6,p,strong,b,em,li,a,span,td';
const CHILD_TAGS = 'br,img,em';

function replace(from, to) {
    document.querySelectorAll(TAGS).forEach(el => {
        const childCheck = el.childNodes.length === 1
            && CHILD_TAGS.includes(el.childNodes[0].nodeName.toLowerCase());

        if (el.childNodes.length === 0 || childCheck) {
            el.innerHTML = el.innerHTML.split(from).join(to);
        }
    });
}

/*
 * Superscript all registered trademarks
 * @return {void}
 */
export function superscript() {
    replace('®', '<sup>&reg;</sup>');
}

/*
 * Remove all newline characters that are not stripped by server
 * https://stackoverflow.com/questions/41555397/strange-symbol-shows-up-on-website-l-sep/45822037
 * @return {void}
 */
export function newlines() {
    replace('&#8232;', ' ');
}
