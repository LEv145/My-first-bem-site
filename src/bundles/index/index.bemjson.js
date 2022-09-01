module.exports = {
    block: "page",
    title: "Title of the page",
    favicon: "../../static/favicon.ico",
    head: [
        {elem: "meta", attrs: {name: "viewport", content: "width=device-width, initial-scale=1"}},
        {elem: "css", url: "index.min.css"}
    ],
    scripts: [{elem: "js", url: "index.min.js"}],
    content: [
        {
            block: 'spin',
            mods: {
                theme: 'islands',
                size: 'm',
                visible: true,
            },
        },
    ],
};
