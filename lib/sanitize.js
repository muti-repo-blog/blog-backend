import sanitizeHtml from "sanitize-html";

export function cleanHtml(dirtyHtml) {
  return sanitizeHtml(dirtyHtml, {
    allowedTags: [
      "b", "i", "em", "strong",
      "h1", "h2", "h3", "h4", "h5", "h6",
      "p", "ul", "ol", "li",
      "a", "img",
      "blockquote", "code", "pre",
      "span", "div", "br"
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "title"],
      "*": ["class"]
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowProtocolRelative: false,
    disallowedTagsMode: "discard",
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" })
    }
  });
}
