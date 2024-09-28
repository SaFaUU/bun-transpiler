// utils/common.js
function qaLog(string) {
  const styles = [
    "color: green",
    "background: yellow",
    "font-size: 12px",
    "border: 1px solid red",
    "padding: 5px"
  ].join(";");
  console.log(`%c[QA-Log]`, styles, string);
}
function waitFor(element) {
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
function querySingle(selector) {
  if (typeof selector === "string") {
    return document.querySelector(selector);
  }
}

// src/tsb/home/v1/index.js
waitFor(querySingle("body")).then((body) => {
  body.classList.add("home_v11");
  qaLog("my name is Safaa");
  qaLog({
    hello: "My Name is Safa"
  });
});
