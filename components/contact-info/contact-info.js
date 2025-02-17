!(function (e, o) {
  "object" == typeof exports && "undefined" != typeof module
    ? o(exports, require("react"), require("react-dom/client"))
    : "function" == typeof define && define.amd
    ? define(["exports", "react", "react-dom/client"], o)
    : o(
        ((e =
          "undefined" != typeof globalThis
            ? globalThis
            : e || self).contactInfo = {}),
        e.React
      );
})(this, function (e, o) {
  "use strict";
  function r(e) {
    return e && "object" == typeof e && "default" in e ? e : { default: e };
  }
  var t = r(o);
  function n(e) {
    var o,
      r,
      t = "";
    if ("string" == typeof e || "number" == typeof e) t += e;
    else if ("object" == typeof e)
      if (Array.isArray(e)) {
        var l = e.length;
        for (o = 0; o < l; o++)
          e[o] && (r = n(e[o])) && (t && (t += " "), (t += r));
      } else for (r in e) e[r] && (t && (t += " "), (t += r));
    return t;
  }
  "function" == typeof SuppressedError && SuppressedError;
  const l = (e) => {
      const o = c(e),
        { conflictingClassGroups: r, conflictingClassGroupModifiers: t } = e;
      return {
        getClassGroupId: (e) => {
          const r = e.split("-");
          return "" === r[0] && 1 !== r.length && r.shift(), a(r, o) || i(e);
        },
        getConflictingClassGroupIds: (e, o) => {
          const n = r[e] || [];
          return o && t[e] ? [...n, ...t[e]] : n;
        },
      };
    },
    a = (e, o) => {
      if (0 === e.length) return o.classGroupId;
      const r = e[0],
        t = o.nextPart.get(r),
        n = t ? a(e.slice(1), t) : void 0;
      if (n) return n;
      if (0 === o.validators.length) return;
      const l = e.join("-");
      return o.validators.find(({ validator: e }) => e(l))?.classGroupId;
    },
    s = /^\[(.+)\]$/,
    i = (e) => {
      if (s.test(e)) {
        const o = s.exec(e)[1],
          r = o?.substring(0, o.indexOf(":"));
        if (r) return "arbitrary.." + r;
      }
    },
    c = (e) => {
      const { theme: o, prefix: r } = e,
        t = { nextPart: new Map(), validators: [] };
      return (
        b(Object.entries(e.classGroups), r).forEach(([e, r]) => {
          d(r, t, e, o);
        }),
        t
      );
    },
    d = (e, o, r, t) => {
      e.forEach((e) => {
        if ("string" != typeof e) {
          if ("function" == typeof e)
            return p(e)
              ? void d(e(t), o, r, t)
              : void o.validators.push({ validator: e, classGroupId: r });
          Object.entries(e).forEach(([e, n]) => {
            d(n, u(o, e), r, t);
          });
        } else {
          ("" === e ? o : u(o, e)).classGroupId = r;
        }
      });
    },
    u = (e, o) => {
      let r = e;
      return (
        o.split("-").forEach((e) => {
          r.nextPart.has(e) ||
            r.nextPart.set(e, { nextPart: new Map(), validators: [] }),
            (r = r.nextPart.get(e));
        }),
        r
      );
    },
    p = (e) => e.isThemeGetter,
    b = (e, o) =>
      o
        ? e.map(([e, r]) => [
            e,
            r.map((e) =>
              "string" == typeof e
                ? o + e
                : "object" == typeof e
                ? Object.fromEntries(
                    Object.entries(e).map(([e, r]) => [o + e, r])
                  )
                : e
            ),
          ])
        : e,
    f = (e) => {
      if (e < 1) return { get: () => {}, set: () => {} };
      let o = 0,
        r = new Map(),
        t = new Map();
      const n = (n, l) => {
        r.set(n, l), o++, o > e && ((o = 0), (t = r), (r = new Map()));
      };
      return {
        get(e) {
          let o = r.get(e);
          return void 0 !== o
            ? o
            : void 0 !== (o = t.get(e))
            ? (n(e, o), o)
            : void 0;
        },
        set(e, o) {
          r.has(e) ? r.set(e, o) : n(e, o);
        },
      };
    },
    m = (e) => {
      const { separator: o, experimentalParseClassName: r } = e,
        t = 1 === o.length,
        n = o[0],
        l = o.length,
        a = (e) => {
          const r = [];
          let a,
            s = 0,
            i = 0;
          for (let c = 0; c < e.length; c++) {
            let d = e[c];
            if (0 === s) {
              if (d === n && (t || e.slice(c, c + l) === o)) {
                r.push(e.slice(i, c)), (i = c + l);
                continue;
              }
              if ("/" === d) {
                a = c;
                continue;
              }
            }
            "[" === d ? s++ : "]" === d && s--;
          }
          const c = 0 === r.length ? e : e.substring(i),
            d = c.startsWith("!");
          return {
            modifiers: r,
            hasImportantModifier: d,
            baseClassName: d ? c.substring(1) : c,
            maybePostfixModifierPosition: a && a > i ? a - i : void 0,
          };
        };
      return r ? (e) => r({ className: e, parseClassName: a }) : a;
    },
    g = (e) => {
      if (e.length <= 1) return e;
      const o = [];
      let r = [];
      return (
        e.forEach((e) => {
          "[" === e[0] ? (o.push(...r.sort(), e), (r = [])) : r.push(e);
        }),
        o.push(...r.sort()),
        o
      );
    },
    h = /\s+/;
  function v() {
    let e,
      o,
      r = 0,
      t = "";
    for (; r < arguments.length; )
      (e = arguments[r++]) && (o = y(e)) && (t && (t += " "), (t += o));
    return t;
  }
  const y = (e) => {
    if ("string" == typeof e) return e;
    let o,
      r = "";
    for (let t = 0; t < e.length; t++)
      e[t] && (o = y(e[t])) && (r && (r += " "), (r += o));
    return r;
  };
  function w(e, ...o) {
    let r,
      t,
      n,
      a = function (i) {
        const c = o.reduce((e, o) => o(e), e());
        return (
          (r = ((e) => ({
            cache: f(e.cacheSize),
            parseClassName: m(e),
            ...l(e),
          }))(c)),
          (t = r.cache.get),
          (n = r.cache.set),
          (a = s),
          s(i)
        );
      };
    function s(e) {
      const o = t(e);
      if (o) return o;
      const l = ((e, o) => {
        const {
            parseClassName: r,
            getClassGroupId: t,
            getConflictingClassGroupIds: n,
          } = o,
          l = [],
          a = e.trim().split(h);
        let s = "";
        for (let e = a.length - 1; e >= 0; e -= 1) {
          const o = a[e],
            {
              modifiers: i,
              hasImportantModifier: c,
              baseClassName: d,
              maybePostfixModifierPosition: u,
            } = r(o);
          let p = Boolean(u),
            b = t(p ? d.substring(0, u) : d);
          if (!b) {
            if (!p) {
              s = o + (s.length > 0 ? " " + s : s);
              continue;
            }
            if (((b = t(d)), !b)) {
              s = o + (s.length > 0 ? " " + s : s);
              continue;
            }
            p = !1;
          }
          const f = g(i).join(":"),
            m = c ? f + "!" : f,
            h = m + b;
          if (l.includes(h)) continue;
          l.push(h);
          const v = n(b, p);
          for (let e = 0; e < v.length; ++e) {
            const o = v[e];
            l.push(m + o);
          }
          s = o + (s.length > 0 ? " " + s : s);
        }
        return s;
      })(e, r);
      return n(e, l), l;
    }
    return function () {
      return a(v.apply(null, arguments));
    };
  }
  const x = (e) => {
      const o = (o) => o[e] || [];
      return (o.isThemeGetter = !0), o;
    },
    k = /^\[(?:([a-z-]+):)?(.+)\]$/i,
    z = /^\d+\/\d+$/,
    C = new Set(["px", "full", "screen"]),
    j = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
    E =
      /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
    N = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,
    S = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
    G =
      /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
    M = (e) => P(e) || C.has(e) || z.test(e),
    _ = (e) => H(e, "length", J),
    P = (e) => Boolean(e) && !Number.isNaN(Number(e)),
    I = (e) => H(e, "number", P),
    R = (e) => Boolean(e) && Number.isInteger(Number(e)),
    O = (e) => e.endsWith("%") && P(e.slice(0, -1)),
    D = (e) => k.test(e),
    $ = (e) => j.test(e),
    q = new Set(["length", "size", "percentage"]),
    A = (e) => H(e, q, K),
    L = (e) => H(e, "position", K),
    T = new Set(["image", "url"]),
    W = (e) => H(e, T, U),
    B = (e) => H(e, "", Q),
    F = () => !0,
    H = (e, o, r) => {
      const t = k.exec(e);
      return (
        !!t &&
        (t[1] ? ("string" == typeof o ? t[1] === o : o.has(t[1])) : r(t[2]))
      );
    },
    J = (e) => E.test(e) && !N.test(e),
    K = () => !1,
    Q = (e) => S.test(e),
    U = (e) => G.test(e),
    V = w(() => {
      const e = x("colors"),
        o = x("spacing"),
        r = x("blur"),
        t = x("brightness"),
        n = x("borderColor"),
        l = x("borderRadius"),
        a = x("borderSpacing"),
        s = x("borderWidth"),
        i = x("contrast"),
        c = x("grayscale"),
        d = x("hueRotate"),
        u = x("invert"),
        p = x("gap"),
        b = x("gradientColorStops"),
        f = x("gradientColorStopPositions"),
        m = x("inset"),
        g = x("margin"),
        h = x("opacity"),
        v = x("padding"),
        y = x("saturate"),
        w = x("scale"),
        k = x("sepia"),
        z = x("skew"),
        C = x("space"),
        j = x("translate"),
        E = () => ["auto", D, o],
        N = () => [D, o],
        S = () => ["", M, _],
        G = () => ["auto", P, D],
        q = () => ["", "0", D],
        T = () => [P, D];
      return {
        cacheSize: 500,
        separator: ":",
        theme: {
          colors: [F],
          spacing: [M, _],
          blur: ["none", "", $, D],
          brightness: T(),
          borderColor: [e],
          borderRadius: ["none", "", "full", $, D],
          borderSpacing: N(),
          borderWidth: S(),
          contrast: T(),
          grayscale: q(),
          hueRotate: T(),
          invert: q(),
          gap: N(),
          gradientColorStops: [e],
          gradientColorStopPositions: [O, _],
          inset: E(),
          margin: E(),
          opacity: T(),
          padding: N(),
          saturate: T(),
          scale: T(),
          sepia: q(),
          skew: T(),
          space: N(),
          translate: N(),
        },
        classGroups: {
          aspect: [{ aspect: ["auto", "square", "video", D] }],
          container: ["container"],
          columns: [{ columns: [$] }],
          "break-after": [
            {
              "break-after": [
                "auto",
                "avoid",
                "all",
                "avoid-page",
                "page",
                "left",
                "right",
                "column",
              ],
            },
          ],
          "break-before": [
            {
              "break-before": [
                "auto",
                "avoid",
                "all",
                "avoid-page",
                "page",
                "left",
                "right",
                "column",
              ],
            },
          ],
          "break-inside": [
            { "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"] },
          ],
          "box-decoration": [{ "box-decoration": ["slice", "clone"] }],
          box: [{ box: ["border", "content"] }],
          display: [
            "block",
            "inline-block",
            "inline",
            "flex",
            "inline-flex",
            "table",
            "inline-table",
            "table-caption",
            "table-cell",
            "table-column",
            "table-column-group",
            "table-footer-group",
            "table-header-group",
            "table-row-group",
            "table-row",
            "flow-root",
            "grid",
            "inline-grid",
            "contents",
            "list-item",
            "hidden",
          ],
          float: [{ float: ["right", "left", "none", "start", "end"] }],
          clear: [{ clear: ["left", "right", "both", "none", "start", "end"] }],
          isolation: ["isolate", "isolation-auto"],
          "object-fit": [
            { object: ["contain", "cover", "fill", "none", "scale-down"] },
          ],
          "object-position": [
            {
              object: [
                "bottom",
                "center",
                "left",
                "left-bottom",
                "left-top",
                "right",
                "right-bottom",
                "right-top",
                "top",
                D,
              ],
            },
          ],
          overflow: [
            { overflow: ["auto", "hidden", "clip", "visible", "scroll"] },
          ],
          "overflow-x": [
            { "overflow-x": ["auto", "hidden", "clip", "visible", "scroll"] },
          ],
          "overflow-y": [
            { "overflow-y": ["auto", "hidden", "clip", "visible", "scroll"] },
          ],
          overscroll: [{ overscroll: ["auto", "contain", "none"] }],
          "overscroll-x": [{ "overscroll-x": ["auto", "contain", "none"] }],
          "overscroll-y": [{ "overscroll-y": ["auto", "contain", "none"] }],
          position: ["static", "fixed", "absolute", "relative", "sticky"],
          inset: [{ inset: [m] }],
          "inset-x": [{ "inset-x": [m] }],
          "inset-y": [{ "inset-y": [m] }],
          start: [{ start: [m] }],
          end: [{ end: [m] }],
          top: [{ top: [m] }],
          right: [{ right: [m] }],
          bottom: [{ bottom: [m] }],
          left: [{ left: [m] }],
          visibility: ["visible", "invisible", "collapse"],
          z: [{ z: ["auto", R, D] }],
          basis: [{ basis: E() }],
          "flex-direction": [
            { flex: ["row", "row-reverse", "col", "col-reverse"] },
          ],
          "flex-wrap": [{ flex: ["wrap", "wrap-reverse", "nowrap"] }],
          flex: [{ flex: ["1", "auto", "initial", "none", D] }],
          grow: [{ grow: q() }],
          shrink: [{ shrink: q() }],
          order: [{ order: ["first", "last", "none", R, D] }],
          "grid-cols": [{ "grid-cols": [F] }],
          "col-start-end": [{ col: ["auto", { span: ["full", R, D] }, D] }],
          "col-start": [{ "col-start": G() }],
          "col-end": [{ "col-end": G() }],
          "grid-rows": [{ "grid-rows": [F] }],
          "row-start-end": [{ row: ["auto", { span: [R, D] }, D] }],
          "row-start": [{ "row-start": G() }],
          "row-end": [{ "row-end": G() }],
          "grid-flow": [
            { "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"] },
          ],
          "auto-cols": [{ "auto-cols": ["auto", "min", "max", "fr", D] }],
          "auto-rows": [{ "auto-rows": ["auto", "min", "max", "fr", D] }],
          gap: [{ gap: [p] }],
          "gap-x": [{ "gap-x": [p] }],
          "gap-y": [{ "gap-y": [p] }],
          "justify-content": [
            {
              justify: [
                "normal",
                "start",
                "end",
                "center",
                "between",
                "around",
                "evenly",
                "stretch",
              ],
            },
          ],
          "justify-items": [
            { "justify-items": ["start", "end", "center", "stretch"] },
          ],
          "justify-self": [
            { "justify-self": ["auto", "start", "end", "center", "stretch"] },
          ],
          "align-content": [
            {
              content: [
                "normal",
                "start",
                "end",
                "center",
                "between",
                "around",
                "evenly",
                "stretch",
                "baseline",
              ],
            },
          ],
          "align-items": [
            { items: ["start", "end", "center", "baseline", "stretch"] },
          ],
          "align-self": [
            { self: ["auto", "start", "end", "center", "stretch", "baseline"] },
          ],
          "place-content": [
            {
              "place-content": [
                "start",
                "end",
                "center",
                "between",
                "around",
                "evenly",
                "stretch",
                "baseline",
              ],
            },
          ],
          "place-items": [
            {
              "place-items": ["start", "end", "center", "baseline", "stretch"],
            },
          ],
          "place-self": [
            { "place-self": ["auto", "start", "end", "center", "stretch"] },
          ],
          p: [{ p: [v] }],
          px: [{ px: [v] }],
          py: [{ py: [v] }],
          ps: [{ ps: [v] }],
          pe: [{ pe: [v] }],
          pt: [{ pt: [v] }],
          pr: [{ pr: [v] }],
          pb: [{ pb: [v] }],
          pl: [{ pl: [v] }],
          m: [{ m: [g] }],
          mx: [{ mx: [g] }],
          my: [{ my: [g] }],
          ms: [{ ms: [g] }],
          me: [{ me: [g] }],
          mt: [{ mt: [g] }],
          mr: [{ mr: [g] }],
          mb: [{ mb: [g] }],
          ml: [{ ml: [g] }],
          "space-x": [{ "space-x": [C] }],
          "space-x-reverse": ["space-x-reverse"],
          "space-y": [{ "space-y": [C] }],
          "space-y-reverse": ["space-y-reverse"],
          w: [{ w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", D, o] }],
          "min-w": [{ "min-w": [D, o, "min", "max", "fit"] }],
          "max-w": [
            {
              "max-w": [
                D,
                o,
                "none",
                "full",
                "min",
                "max",
                "fit",
                "prose",
                { screen: [$] },
                $,
              ],
            },
          ],
          h: [{ h: [D, o, "auto", "min", "max", "fit", "svh", "lvh", "dvh"] }],
          "min-h": [
            { "min-h": [D, o, "min", "max", "fit", "svh", "lvh", "dvh"] },
          ],
          "max-h": [
            { "max-h": [D, o, "min", "max", "fit", "svh", "lvh", "dvh"] },
          ],
          size: [{ size: [D, o, "auto", "min", "max", "fit"] }],
          "font-size": [{ text: ["base", $, _] }],
          "font-smoothing": ["antialiased", "subpixel-antialiased"],
          "font-style": ["italic", "not-italic"],
          "font-weight": [
            {
              font: [
                "thin",
                "extralight",
                "light",
                "normal",
                "medium",
                "semibold",
                "bold",
                "extrabold",
                "black",
                I,
              ],
            },
          ],
          "font-family": [{ font: [F] }],
          "fvn-normal": ["normal-nums"],
          "fvn-ordinal": ["ordinal"],
          "fvn-slashed-zero": ["slashed-zero"],
          "fvn-figure": ["lining-nums", "oldstyle-nums"],
          "fvn-spacing": ["proportional-nums", "tabular-nums"],
          "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
          tracking: [
            {
              tracking: [
                "tighter",
                "tight",
                "normal",
                "wide",
                "wider",
                "widest",
                D,
              ],
            },
          ],
          "line-clamp": [{ "line-clamp": ["none", P, I] }],
          leading: [
            {
              leading: [
                "none",
                "tight",
                "snug",
                "normal",
                "relaxed",
                "loose",
                M,
                D,
              ],
            },
          ],
          "list-image": [{ "list-image": ["none", D] }],
          "list-style-type": [{ list: ["none", "disc", "decimal", D] }],
          "list-style-position": [{ list: ["inside", "outside"] }],
          "placeholder-color": [{ placeholder: [e] }],
          "placeholder-opacity": [{ "placeholder-opacity": [h] }],
          "text-alignment": [
            { text: ["left", "center", "right", "justify", "start", "end"] },
          ],
          "text-color": [{ text: [e] }],
          "text-opacity": [{ "text-opacity": [h] }],
          "text-decoration": [
            "underline",
            "overline",
            "line-through",
            "no-underline",
          ],
          "text-decoration-style": [
            {
              decoration: [
                "solid",
                "dashed",
                "dotted",
                "double",
                "none",
                "wavy",
              ],
            },
          ],
          "text-decoration-thickness": [
            { decoration: ["auto", "from-font", M, _] },
          ],
          "underline-offset": [{ "underline-offset": ["auto", M, D] }],
          "text-decoration-color": [{ decoration: [e] }],
          "text-transform": [
            "uppercase",
            "lowercase",
            "capitalize",
            "normal-case",
          ],
          "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
          "text-wrap": [{ text: ["wrap", "nowrap", "balance", "pretty"] }],
          indent: [{ indent: N() }],
          "vertical-align": [
            {
              align: [
                "baseline",
                "top",
                "middle",
                "bottom",
                "text-top",
                "text-bottom",
                "sub",
                "super",
                D,
              ],
            },
          ],
          whitespace: [
            {
              whitespace: [
                "normal",
                "nowrap",
                "pre",
                "pre-line",
                "pre-wrap",
                "break-spaces",
              ],
            },
          ],
          break: [{ break: ["normal", "words", "all", "keep"] }],
          hyphens: [{ hyphens: ["none", "manual", "auto"] }],
          content: [{ content: ["none", D] }],
          "bg-attachment": [{ bg: ["fixed", "local", "scroll"] }],
          "bg-clip": [{ "bg-clip": ["border", "padding", "content", "text"] }],
          "bg-opacity": [{ "bg-opacity": [h] }],
          "bg-origin": [{ "bg-origin": ["border", "padding", "content"] }],
          "bg-position": [
            {
              bg: [
                "bottom",
                "center",
                "left",
                "left-bottom",
                "left-top",
                "right",
                "right-bottom",
                "right-top",
                "top",
                L,
              ],
            },
          ],
          "bg-repeat": [
            { bg: ["no-repeat", { repeat: ["", "x", "y", "round", "space"] }] },
          ],
          "bg-size": [{ bg: ["auto", "cover", "contain", A] }],
          "bg-image": [
            {
              bg: [
                "none",
                { "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"] },
                W,
              ],
            },
          ],
          "bg-color": [{ bg: [e] }],
          "gradient-from-pos": [{ from: [f] }],
          "gradient-via-pos": [{ via: [f] }],
          "gradient-to-pos": [{ to: [f] }],
          "gradient-from": [{ from: [b] }],
          "gradient-via": [{ via: [b] }],
          "gradient-to": [{ to: [b] }],
          rounded: [{ rounded: [l] }],
          "rounded-s": [{ "rounded-s": [l] }],
          "rounded-e": [{ "rounded-e": [l] }],
          "rounded-t": [{ "rounded-t": [l] }],
          "rounded-r": [{ "rounded-r": [l] }],
          "rounded-b": [{ "rounded-b": [l] }],
          "rounded-l": [{ "rounded-l": [l] }],
          "rounded-ss": [{ "rounded-ss": [l] }],
          "rounded-se": [{ "rounded-se": [l] }],
          "rounded-ee": [{ "rounded-ee": [l] }],
          "rounded-es": [{ "rounded-es": [l] }],
          "rounded-tl": [{ "rounded-tl": [l] }],
          "rounded-tr": [{ "rounded-tr": [l] }],
          "rounded-br": [{ "rounded-br": [l] }],
          "rounded-bl": [{ "rounded-bl": [l] }],
          "border-w": [{ border: [s] }],
          "border-w-x": [{ "border-x": [s] }],
          "border-w-y": [{ "border-y": [s] }],
          "border-w-s": [{ "border-s": [s] }],
          "border-w-e": [{ "border-e": [s] }],
          "border-w-t": [{ "border-t": [s] }],
          "border-w-r": [{ "border-r": [s] }],
          "border-w-b": [{ "border-b": [s] }],
          "border-w-l": [{ "border-l": [s] }],
          "border-opacity": [{ "border-opacity": [h] }],
          "border-style": [
            {
              border: ["solid", "dashed", "dotted", "double", "none", "hidden"],
            },
          ],
          "divide-x": [{ "divide-x": [s] }],
          "divide-x-reverse": ["divide-x-reverse"],
          "divide-y": [{ "divide-y": [s] }],
          "divide-y-reverse": ["divide-y-reverse"],
          "divide-opacity": [{ "divide-opacity": [h] }],
          "divide-style": [
            { divide: ["solid", "dashed", "dotted", "double", "none"] },
          ],
          "border-color": [{ border: [n] }],
          "border-color-x": [{ "border-x": [n] }],
          "border-color-y": [{ "border-y": [n] }],
          "border-color-s": [{ "border-s": [n] }],
          "border-color-e": [{ "border-e": [n] }],
          "border-color-t": [{ "border-t": [n] }],
          "border-color-r": [{ "border-r": [n] }],
          "border-color-b": [{ "border-b": [n] }],
          "border-color-l": [{ "border-l": [n] }],
          "divide-color": [{ divide: [n] }],
          "outline-style": [
            { outline: ["", "solid", "dashed", "dotted", "double", "none"] },
          ],
          "outline-offset": [{ "outline-offset": [M, D] }],
          "outline-w": [{ outline: [M, _] }],
          "outline-color": [{ outline: [e] }],
          "ring-w": [{ ring: S() }],
          "ring-w-inset": ["ring-inset"],
          "ring-color": [{ ring: [e] }],
          "ring-opacity": [{ "ring-opacity": [h] }],
          "ring-offset-w": [{ "ring-offset": [M, _] }],
          "ring-offset-color": [{ "ring-offset": [e] }],
          shadow: [{ shadow: ["", "inner", "none", $, B] }],
          "shadow-color": [{ shadow: [F] }],
          opacity: [{ opacity: [h] }],
          "mix-blend": [
            {
              "mix-blend": [
                "normal",
                "multiply",
                "screen",
                "overlay",
                "darken",
                "lighten",
                "color-dodge",
                "color-burn",
                "hard-light",
                "soft-light",
                "difference",
                "exclusion",
                "hue",
                "saturation",
                "color",
                "luminosity",
                "plus-lighter",
                "plus-darker",
              ],
            },
          ],
          "bg-blend": [
            {
              "bg-blend": [
                "normal",
                "multiply",
                "screen",
                "overlay",
                "darken",
                "lighten",
                "color-dodge",
                "color-burn",
                "hard-light",
                "soft-light",
                "difference",
                "exclusion",
                "hue",
                "saturation",
                "color",
                "luminosity",
              ],
            },
          ],
          filter: [{ filter: ["", "none"] }],
          blur: [{ blur: [r] }],
          brightness: [{ brightness: [t] }],
          contrast: [{ contrast: [i] }],
          "drop-shadow": [{ "drop-shadow": ["", "none", $, D] }],
          grayscale: [{ grayscale: [c] }],
          "hue-rotate": [{ "hue-rotate": [d] }],
          invert: [{ invert: [u] }],
          saturate: [{ saturate: [y] }],
          sepia: [{ sepia: [k] }],
          "backdrop-filter": [{ "backdrop-filter": ["", "none"] }],
          "backdrop-blur": [{ "backdrop-blur": [r] }],
          "backdrop-brightness": [{ "backdrop-brightness": [t] }],
          "backdrop-contrast": [{ "backdrop-contrast": [i] }],
          "backdrop-grayscale": [{ "backdrop-grayscale": [c] }],
          "backdrop-hue-rotate": [{ "backdrop-hue-rotate": [d] }],
          "backdrop-invert": [{ "backdrop-invert": [u] }],
          "backdrop-opacity": [{ "backdrop-opacity": [h] }],
          "backdrop-saturate": [{ "backdrop-saturate": [y] }],
          "backdrop-sepia": [{ "backdrop-sepia": [k] }],
          "border-collapse": [{ border: ["collapse", "separate"] }],
          "border-spacing": [{ "border-spacing": [a] }],
          "border-spacing-x": [{ "border-spacing-x": [a] }],
          "border-spacing-y": [{ "border-spacing-y": [a] }],
          "table-layout": [{ table: ["auto", "fixed"] }],
          caption: [{ caption: ["top", "bottom"] }],
          transition: [
            {
              transition: [
                "none",
                "all",
                "",
                "colors",
                "opacity",
                "shadow",
                "transform",
                D,
              ],
            },
          ],
          duration: [{ duration: T() }],
          ease: [{ ease: ["linear", "in", "out", "in-out", D] }],
          delay: [{ delay: T() }],
          animate: [
            { animate: ["none", "spin", "ping", "pulse", "bounce", D] },
          ],
          transform: [{ transform: ["", "gpu", "none"] }],
          scale: [{ scale: [w] }],
          "scale-x": [{ "scale-x": [w] }],
          "scale-y": [{ "scale-y": [w] }],
          rotate: [{ rotate: [R, D] }],
          "translate-x": [{ "translate-x": [j] }],
          "translate-y": [{ "translate-y": [j] }],
          "skew-x": [{ "skew-x": [z] }],
          "skew-y": [{ "skew-y": [z] }],
          "transform-origin": [
            {
              origin: [
                "center",
                "top",
                "top-right",
                "right",
                "bottom-right",
                "bottom",
                "bottom-left",
                "left",
                "top-left",
                D,
              ],
            },
          ],
          accent: [{ accent: ["auto", e] }],
          appearance: [{ appearance: ["none", "auto"] }],
          cursor: [
            {
              cursor: [
                "auto",
                "default",
                "pointer",
                "wait",
                "text",
                "move",
                "help",
                "not-allowed",
                "none",
                "context-menu",
                "progress",
                "cell",
                "crosshair",
                "vertical-text",
                "alias",
                "copy",
                "no-drop",
                "grab",
                "grabbing",
                "all-scroll",
                "col-resize",
                "row-resize",
                "n-resize",
                "e-resize",
                "s-resize",
                "w-resize",
                "ne-resize",
                "nw-resize",
                "se-resize",
                "sw-resize",
                "ew-resize",
                "ns-resize",
                "nesw-resize",
                "nwse-resize",
                "zoom-in",
                "zoom-out",
                D,
              ],
            },
          ],
          "caret-color": [{ caret: [e] }],
          "pointer-events": [{ "pointer-events": ["none", "auto"] }],
          resize: [{ resize: ["none", "y", "x", ""] }],
          "scroll-behavior": [{ scroll: ["auto", "smooth"] }],
          "scroll-m": [{ "scroll-m": N() }],
          "scroll-mx": [{ "scroll-mx": N() }],
          "scroll-my": [{ "scroll-my": N() }],
          "scroll-ms": [{ "scroll-ms": N() }],
          "scroll-me": [{ "scroll-me": N() }],
          "scroll-mt": [{ "scroll-mt": N() }],
          "scroll-mr": [{ "scroll-mr": N() }],
          "scroll-mb": [{ "scroll-mb": N() }],
          "scroll-ml": [{ "scroll-ml": N() }],
          "scroll-p": [{ "scroll-p": N() }],
          "scroll-px": [{ "scroll-px": N() }],
          "scroll-py": [{ "scroll-py": N() }],
          "scroll-ps": [{ "scroll-ps": N() }],
          "scroll-pe": [{ "scroll-pe": N() }],
          "scroll-pt": [{ "scroll-pt": N() }],
          "scroll-pr": [{ "scroll-pr": N() }],
          "scroll-pb": [{ "scroll-pb": N() }],
          "scroll-pl": [{ "scroll-pl": N() }],
          "snap-align": [{ snap: ["start", "end", "center", "align-none"] }],
          "snap-stop": [{ snap: ["normal", "always"] }],
          "snap-type": [{ snap: ["none", "x", "y", "both"] }],
          "snap-strictness": [{ snap: ["mandatory", "proximity"] }],
          touch: [{ touch: ["auto", "none", "manipulation"] }],
          "touch-x": [{ "touch-pan": ["x", "left", "right"] }],
          "touch-y": [{ "touch-pan": ["y", "up", "down"] }],
          "touch-pz": ["touch-pinch-zoom"],
          select: [{ select: ["none", "text", "all", "auto"] }],
          "will-change": [
            { "will-change": ["auto", "scroll", "contents", "transform", D] },
          ],
          fill: [{ fill: [e, "none"] }],
          "stroke-w": [{ stroke: [M, _, I] }],
          stroke: [{ stroke: [e, "none"] }],
          sr: ["sr-only", "not-sr-only"],
          "forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }],
        },
        conflictingClassGroups: {
          overflow: ["overflow-x", "overflow-y"],
          overscroll: ["overscroll-x", "overscroll-y"],
          inset: [
            "inset-x",
            "inset-y",
            "start",
            "end",
            "top",
            "right",
            "bottom",
            "left",
          ],
          "inset-x": ["right", "left"],
          "inset-y": ["top", "bottom"],
          flex: ["basis", "grow", "shrink"],
          gap: ["gap-x", "gap-y"],
          p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
          px: ["pr", "pl"],
          py: ["pt", "pb"],
          m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
          mx: ["mr", "ml"],
          my: ["mt", "mb"],
          size: ["w", "h"],
          "font-size": ["leading"],
          "fvn-normal": [
            "fvn-ordinal",
            "fvn-slashed-zero",
            "fvn-figure",
            "fvn-spacing",
            "fvn-fraction",
          ],
          "fvn-ordinal": ["fvn-normal"],
          "fvn-slashed-zero": ["fvn-normal"],
          "fvn-figure": ["fvn-normal"],
          "fvn-spacing": ["fvn-normal"],
          "fvn-fraction": ["fvn-normal"],
          "line-clamp": ["display", "overflow"],
          rounded: [
            "rounded-s",
            "rounded-e",
            "rounded-t",
            "rounded-r",
            "rounded-b",
            "rounded-l",
            "rounded-ss",
            "rounded-se",
            "rounded-ee",
            "rounded-es",
            "rounded-tl",
            "rounded-tr",
            "rounded-br",
            "rounded-bl",
          ],
          "rounded-s": ["rounded-ss", "rounded-es"],
          "rounded-e": ["rounded-se", "rounded-ee"],
          "rounded-t": ["rounded-tl", "rounded-tr"],
          "rounded-r": ["rounded-tr", "rounded-br"],
          "rounded-b": ["rounded-br", "rounded-bl"],
          "rounded-l": ["rounded-tl", "rounded-bl"],
          "border-spacing": ["border-spacing-x", "border-spacing-y"],
          "border-w": [
            "border-w-s",
            "border-w-e",
            "border-w-t",
            "border-w-r",
            "border-w-b",
            "border-w-l",
          ],
          "border-w-x": ["border-w-r", "border-w-l"],
          "border-w-y": ["border-w-t", "border-w-b"],
          "border-color": [
            "border-color-s",
            "border-color-e",
            "border-color-t",
            "border-color-r",
            "border-color-b",
            "border-color-l",
          ],
          "border-color-x": ["border-color-r", "border-color-l"],
          "border-color-y": ["border-color-t", "border-color-b"],
          "scroll-m": [
            "scroll-mx",
            "scroll-my",
            "scroll-ms",
            "scroll-me",
            "scroll-mt",
            "scroll-mr",
            "scroll-mb",
            "scroll-ml",
          ],
          "scroll-mx": ["scroll-mr", "scroll-ml"],
          "scroll-my": ["scroll-mt", "scroll-mb"],
          "scroll-p": [
            "scroll-px",
            "scroll-py",
            "scroll-ps",
            "scroll-pe",
            "scroll-pt",
            "scroll-pr",
            "scroll-pb",
            "scroll-pl",
          ],
          "scroll-px": ["scroll-pr", "scroll-pl"],
          "scroll-py": ["scroll-pt", "scroll-pb"],
          touch: ["touch-x", "touch-y", "touch-pz"],
          "touch-x": ["touch"],
          "touch-y": ["touch"],
          "touch-pz": ["touch"],
        },
        conflictingClassGroupModifiers: { "font-size": ["leading"] },
      };
    });
  function X() {
    for (var e = [], o = 0; o < arguments.length; o++) e[o] = arguments[o];
    return V(
      (function () {
        for (var e, o, r = 0, t = "", l = arguments.length; r < l; r++)
          (e = arguments[r]) && (o = n(e)) && (t && (t += " "), (t += o));
        return t;
      })(e)
    );
  }
  function Y(e, o, r) {
    if ("link" === e) {
      if (document.querySelector('link[href="'.concat(o, '"]')))
        return void (null == r || r());
      var t = document.createElement("link");
      (t.rel = "stylesheet"),
        (t.href = o),
        r && (t.onload = r),
        document.head.appendChild(t);
    } else if ("script" === e) {
      if (document.querySelector('script[src="'.concat(o, '"]')))
        return void (null == r || r());
      var n = document.createElement("script");
      (n.src = o),
        (n.async = !0),
        r && (n.onload = r),
        document.body.appendChild(n);
    }
  }
  var Z = function (e) {
    var o = e.componentName,
      r = e.script,
      t = e.setComponent;
    if (!(null == r ? void 0 : r.component))
      return console.error("No script found for ".concat(o));
    Y("script", r.component, function () {
      var e = null === window || void 0 === window ? void 0 : window[o];
      e
        ? t(function () {
            return e;
          })
        : console.error("".concat(o, " is not loaded correctly"));
    }),
      (null == r ? void 0 : r.style) && Y("link", r.style),
      (null == r ? void 0 : r.baseStyle) && Y("link", r.baseStyle);
  };
  function ee(e) {
    var r = e.address,
      n = e.contact,
      l = e.socialMediaLinks,
      a = e.className,
      s = e.manifest,
      i = o.useState(null),
      c = i[0],
      d = i[1],
      u = o.useState(null),
      p = u[0],
      b = u[1];
    return (
      o.useEffect(
        function () {
          s &&
            (function (e, o, r) {
              var t = function (o, r, t) {
                  var n = e.createElement("script");
                  (n.src = o),
                    (n.onload = r),
                    (n.onerror =
                      t ||
                      function () {
                        return console.error(
                          "Failed to load script: ".concat(o)
                        );
                      }),
                    e.body.appendChild(n);
                },
                n = function () {
                  window.ReactDOM
                    ? r()
                    : t(o.reactDom, r, function () {
                        return console.error("Failed to load ReactDOM");
                      });
                };
              window.__REACT_LOADED__
                ? window.React && window.ReactDOM && r()
                : ((window.__REACT_LOADED__ = !0),
                  window.React
                    ? n()
                    : t(o.react, n, function () {
                        return console.error("Failed to load React");
                      }));
            })(document, s.base, function () {
              var e, o, r;
              Z({
                componentName: "NavLink",
                script:
                  null === (e = s.shared) || void 0 === e ? void 0 : e.navLink,
                setComponent: b,
              }),
                Z({
                  componentName: "Navbar",
                  script:
                    null ===
                      (r =
                        null === (o = s.layout) || void 0 === o
                          ? void 0
                          : o.header) || void 0 === r
                      ? void 0
                      : r.navbar,
                  setComponent: d,
                });
            });
        },
        [s]
      ),
      c && p
        ? t.default.createElement(
            "div",
            {
              className: X(
                "flex flex-col w-full gap-1 items-start justify-center sub-footer",
                a
              ),
            },
            t.default.createElement(c, null),
            null == n
              ? void 0
              : n.map(function (e) {
                  return t.default.createElement(
                    p,
                    {
                      key: e.number,
                      link: "tel:".concat(null == e ? void 0 : e.number),
                      label: e.number,
                    },
                    e.icon
                  );
                }),
            null == r
              ? void 0
              : r.map(function (e) {
                  return t.default.createElement(
                    p,
                    { key: e.label, link: "/directions", label: e.label },
                    e.icon
                  );
                }),
            t.default.createElement(
              "span",
              { className: "p-0 m-0 flex gap-0.1" },
              null == l
                ? void 0
                : l.map(function (e) {
                    return t.default.createElement(
                      p,
                      {
                        key: e.platform,
                        href: e.url,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "px-1",
                      },
                      t.default.createElement("i", {
                        className: "".concat(e.icon, " social-icon"),
                      })
                    );
                  })
            )
          )
        : t.default.createElement("p", null, "Loading...")
    );
  }
  "undefined" != typeof window && (window.ContactInformation = ee),
    (e.default = ee),
    Object.defineProperty(e, "__esModule", { value: !0 });
});
