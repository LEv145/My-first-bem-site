// type: {img_src: str, img_alt: Optional[str], title: str}

block("user-box")({
    content: (_, ctx) => [
        {elem: "icon", tag: "img", attrs: {src: ctx.img_src, alt: ctx.img_alt}},
        {
            elem: "title",
            content: [
                {
                    elem: "title-name",
                    mix: [{block: "i-font", mods: {face: "roboto"}}],
                    tag: "span",
                    content: ctx.title,
                },
                {
                    elem: "title-icon",
                    mix: [{block: "i-font", mods: {face: "feather"}}],
                    tag: "span",
                },
            ],
        },
    ],
});
