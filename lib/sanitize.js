import sanitizeHtml from "sanitize-html";

export function cleanHtml(dirtyHtml) {
  return sanitizeHtml(dirtyHtml, {
    allowedTags: [
      "b", "i", "em", "strong", "u", "s",
      "h1", "h2", "h3", "h4", "h5", "h6",
      "p", "ul", "ol", "li",
      "a", "img",
      "blockquote", "code", "pre",
      "span", "div", "br",
      "table", "thead", "tbody", "tfoot",
      "tr", "td", "th"
    ],

    allowedAttributes: {
      a: ["href", "target", "rel", "title", "style"],
      img: ["src", "alt", "title", "width", "height", "style"],
      td: ["colspan", "rowspan", "style"],
      th: ["colspan", "rowspan", "style"],
      "*": ["class", "style"]
    },

    allowedStyles: {
      "*": {
        color: [
          /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,
          /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/,
          /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*(0|1|0?\.\d+)\s*\)$/,
          /^[a-zA-Z]+$/
        ],
        "background-color": [
          /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,
          /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/,
          /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*(0|1|0?\.\d+)\s*\)$/,
          /^[a-zA-Z]+$/
        ]
      }
    }
    ,

    allowedSchemes: ["http", "https", "mailto"],
    allowProtocolRelative: false,
    disallowedTagsMode: "discard",

    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" })
    }
  });
}
