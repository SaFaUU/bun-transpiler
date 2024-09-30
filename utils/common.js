export function qaLog(string) {
    const styles = [
        'color: green',
        'background: yellow',
        'font-size: 12px',
        'border: 1px solid red',
        'padding: 5px',
    ].join(';');

    console.log(`%c[QA-Log]`, styles, string);
}

export function waitFor(element) {
    return new Promise((resolve) => {
        if (element) {
            resolve(element);
        } else {
            setTimeout(() => {
                waitFor(element).then(resolve);
            }, 100);
        }
    });
}

export function querySingle(selector) {
    return document.querySelector(selector);
}

export function queryAll(selector) {
    if (typeof selector === 'string') {
        return document.querySelectorAll(selector);
    }
}

export function insertElement(target, position, element, exists) {
    if (!exists) {
        target.insertAdjacentElement(element, position);
    }
}