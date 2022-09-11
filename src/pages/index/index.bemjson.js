module.exports = {
    block: "page",
    title: "Title of the page",
    favicon: "static/misc/favicon.ico",
    head: [
        {elem: "meta", attrs: {name: "viewport", content: "width=device-width, initial-scale=1"}},
        {elem: "css", url: "index.min.css"}
    ],
    scripts: [{elem: "js", url: "index.min.js"}],
    content: [{
        block: "page",
        content: [{
            block: "wrapper",
            content: [{
                block: "header",
                title: "Dashboard",
                content: [{
                    block: "horizontal-nav-menu",
                    content: [
                        {
                            block: "search-form",
                            mix: [{block: "horizontal-nav-menu", elem: "item"}],
                            placeholder: "Search...",
                        },
                        {
                            block: "notification-box",
                            mix: [{block: "horizontal-nav-menu", elem: "item"}, {block: "header", elem: "notification-box"}],
                            counter: "9",
                        },
                        {
                            block: "user-box",
                            mix: [{block: "horizontal-nav-menu", elem: "item"}],
                            img_src: "./assets/user-1.jpg",
                            img_alt: "User 1",
                            title: "Nowak",
                        },
                    ]
                }]
            }]
        }]
    }],
};
