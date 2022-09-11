// type: {counter: int}

block("notification-box")({
    content: (_, ctx) => [
        {
            elem: "icon",
            tag: "span",
            mix: [{block: "i-font", mods: {face: "feather"}}],
        },
        {
            elem: "counter",
            tag: "span",
            content: ctx.counter,
            mix: [{block: "i-font", mods: {face: "roboto"}}],
        },
    ],
});
