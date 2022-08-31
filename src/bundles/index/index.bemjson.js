module.exports = {
    block: "page",
    title: "Title of the page",
    head: [
        {elem: "meta", attrs: {name: "viewport", content: "width=device-width, initial-scale=1"}},
        {elem: "css", url: "index.min.css"}
    ],
    scripts: [{elem: "js", url: "index.min.js"}],
};
