// type: {title: str}

block("header")({
    content: (_, ctx) => [
        {
            elem: "title",
            mix: [{block: "i-font", mods: {face: "karla"}}],
            tag: "a",
            href: "#",
            content: ctx.title,
        },
        ctx.content,
    ],
});
