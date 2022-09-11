// type: {title: str}

block("card-body")(
    elem("header")(
        elem("header-title")({
            mix: [{block: "i-font", mods: {face: "karla"}}],
            content: (_, ctx) => {ctx.title},
        }),
        elem("header-icon")({
            mix: [{block: "i-font", mods: {face: "feather"}}],
            tag: "span",
        }),
    ),
);
