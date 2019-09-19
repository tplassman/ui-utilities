# Utility Scripts

JavaScript utilities for implementing common web user interfaces

## Installation

```
npm install --save ui-utilities
```

## Usage

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

## Functions

### Balance

This function will balance lines of text such that lines stacked on top of each other will be of similar length. This prevents widow words on new lines inside of a responsive design where content is dynamic and subject to change. A default step size tolerance of 10px can be overridden by supplying a data attribute to the element to be balanced.

```javascript
import { balance } from 'ui-utilities';

balance(document, '.heading-class');
```

### Events - Emit

This is a wrapper method around a CustomEvent to send a named event with an optional payload

```javascript
import { events } from 'ui-utilities';

events.emit('event-name', { data: [] });
```

### Forms - Sync Dates

```javascript
import { forms } from 'ui-utilities';

const dates = document.querySelectorAll('[type="date"]');

// Sync paired dates together as start and end
if (dates.length === 2) {
    syncDates(...dates);
}
```

### Router - Get, Post

Wrapper methods for XHR get and post request with options history state and FormData passing

```javascript
import { router } from 'ui-utilities';

const link = document.querySelector('a');
const form = document.querySelector('form');

function handleClick(e) {
    // Intercept get request with JS and update history state
    e.preventDefault();

    const url = e.target.href;
    const query { query_key: "query_value" };
    const state = { url, query };

    function cb(res) {
        // Do something with response from server
    }

    router.get({ url, query, state, cb }) {
}
function handleSubmit(e) {
    // Intercept form post with JS and pass formData
    e.preventDefault();

    const url = '/form-handler';
    const formData = new FormData(form);

    function cb(res) {
        // Do something with response from back end handler
    }

    router.post({ url, formData, cb });
}

link.addEventListener('click', handleClick);
form.addEventListener('submit', handleSubmit);
```

### Scroll - To, Top, Bottom

Smooth scrolling functionality for navigating to anchor links, and the top and bottom of elements.

```javascript
import { scroll } from 'ui-utilities';

const hero = document.querySelector('.hero');
const button = hero.querySelector('button');

function handleClick() {
    // Scroll to the bottom of the hero element and offset by 100px to compensate for the fixed header
    scroll.bottom(hero, 100);
}

heroButton.addEventListener('click', handleClick);
```

### Spy - Anchors, Images, Nav, Sections

TODO

### Text - Newlines, Superscript

TODO

### Throttle

This function throttles the execution of a given function to only fire at a given interval

```javascript
import { throttle } from 'ui-utilities';

const handleResize = throttle(() => {
    // Expensive function to only fire every 300ms during resize events firing
}, 300);

window.addEventListener('resize', handleResize);
```
