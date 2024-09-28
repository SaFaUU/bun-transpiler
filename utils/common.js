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
    if (typeof selector === 'string') {
        return document.querySelector(selector);
    }
}