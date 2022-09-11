// type: {placeholder: str}

block("search-form")({
    content: (_, ctx) => [
        {elem: "input", tag: "input", attrs: {placeholder: ctx.placeholder}},
        {
            elem: "button",
            tag: "button",
            mix: [{block: "i-font", mods: {face: "feather"}}],
        },
    ],
});
