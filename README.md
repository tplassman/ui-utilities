# Utility Scripts

JavaScript utilities for implementing common web user interfaces

# Installation

```
npm install --save ui-utilities
```

# Usage

```javascript
import { scroll, text, throttle } from 'ui-utilities';

const anchorLinks = document.querySelectorAll('a[href*="#"]');

const handleResize = throttle(() => {
    // Do something expensive on resize throttled to every 300ms
}, 300); // Only fire this event every 300ms
function handleDOMConentLoaded() {
    // Superscript all registered trademarks from dynamically generated content
    text.superscript();
}
function handleClick(e) {
    // Use smooth scroll instead of default functionality for anchor link
    e.preventDefault();

    const id = e.target.href.split('#')[1];

    scroll.to(id);
}

window.addEventListener('resize', handleResize);
document.addEventListener('DOMContentLoaded', handleDOMConentLoaded);
anchorLinks.forEach(l => {
    l.addEventListener('click', handleClick);
});
```
