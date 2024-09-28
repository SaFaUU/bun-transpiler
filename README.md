# bun-transpiler

A Personal Project to Create a transpiler for AB Testing using Bun.

To install Bun:

```
npm install -g bun
```

To install all Dependencies:

```
bun install
```

To Start the Transpiler:

```
bun run start
```

(All Credit goes to the Author for the Script).
Tampermonkey Script to Run the Transpiler out Reload:

```
// ==UserScript==
// @name         Bun Runner
// @description  A/B testing transpiler with HOT update script
// @version      1.0
// @author       Moinul Islam
// @match        *://*/*
// @noframes
// ==/UserScript==

(() => {
    const ID = 'ABtest';
    const fType = {
        js: 'script',
        css: 'style'
    };

    const pushInDom = (link, type) => {
        fetch(link)
            .then((response) => response.text())
            .then((fileData) => {
            const newF = document.createElement(fType[type]);
            const oldF = document.querySelector(`#${ID}-${type}`);

            if (oldF) {
                if (oldF.textContent === fileData) return;

                oldF.remove();
            }

            newF.id = `${ID}-${type}`;
            newF.textContent = fileData;
            document.head.append(newF);
        })
            .catch((err) => {
            console.debug('Please ensure server is running at http://localhost:3000');
        });
    };

    pushInDom('http://localhost:3000/index.js', 'js');
    pushInDom('http://localhost:3000/index.css', 'css');

    (function poll() {
        if (document.readyState === 'complete') {
            fetch('http://localhost:3000')
                .then(() => {
                new EventSource('http://localhost:3000/events').addEventListener('change', (event) => {
                     pushInDom('http://localhost:3030/index.js', 'js');
                     pushInDom('http://localhost:3030/index.css', 'css');
                });
            })
                .catch((err) => {
                console.debug('Failed to establish connection to http://localhost:3030/');
            });
        } else {
            setTimeout(poll, 25);
        }
    }());
})();

```

Tampermonkey Script to Run the Transpiler with Reload:

```
// ==UserScript==
// @name         Bun Runner - Reload
// @description  A/B testing transpiler with HOT update script
// @version      1.0
// @author       Moinul Islam
// @match        *://*/*
// @noframes
// ==/UserScript==

(() => {
    const ID = 'ABtest';
    const fType = {
        js: 'script',
        css: 'style'
    };

    const pushInDom = (link, type) => {
        fetch(link)
            .then((response) => response.text())
            .then((fileData) => {
            const newF = document.createElement(fType[type]);
            const oldF = document.querySelector(`#${ID}-${type}`);

            if (oldF) {
                if (oldF.textContent === fileData) return;

                oldF.remove();
            }

            newF.id = `${ID}-${type}`;
            newF.textContent = fileData;
            document.head.append(newF);
        })
            .catch((err) => {
            console.debug('Please ensure server is running at http://localhost:3000');
        });
    };

    pushInDom('http://localhost:3000/index.js', 'js');
    pushInDom('http://localhost:3000/index.css', 'css');

    (function poll() {
        if (document.readyState === 'complete') {
            fetch('http://localhost:3000')
                .then(() => {
                new EventSource('http://localhost:3000/events').addEventListener('change', (event) => {
                    location.reload();
                });
            })
                .catch((err) => {
                console.debug('Failed to establish connection to http://localhost:3030/');
            });
        } else {
            setTimeout(poll, 25);
        }
    }());
})();

```

## Roadmap

Here is a list of things that are either unfinished, or desireable. Got a feature you fancy? [Create an issue] to possibly see it added to this list or better if you want to contribute go ahead and create a pull request.:

|  Status   |       Name       |                                   Description                                   |
| :-------: | :--------------: | :-----------------------------------------------------------------------------: |
| Completed |       SCSS       |             Adds the ability to compile scss to a single css file.              |
|  Pending  |    Source URL    | Add Source URL to Build Files to make it easier to debug when uploaded to tool. |
|  Pending  | Change Variation |     Add Options to change variation and test from terminal without closing.     |
