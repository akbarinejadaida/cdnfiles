!(function (e, r) {
  "object" == typeof exports && "undefined" != typeof module
    ? r(
        exports,
        require("react"),
        require("react-dom/client"),
        require("next/link")
      )
    : "function" == typeof define && define.amd
    ? define(["exports", "react", "react-dom/client", "next/link"], r)
    : r(
        ((e =
          "undefined" != typeof globalThis ? globalThis : e || self).Content =
          {}),
        e.React,
        null,
        e.NextLink
      );
})(this, function (e, r, o, t) {
  "use strict";
  function n(e) {
    return e && "object" == typeof e && "default" in e ? e : { default: e };
  }
  var l = n(t);
  function s(e) {
    var r,
      o,
      t = "";
    if ("string" == typeof e || "number" == typeof e) t += e;
    else if ("object" == typeof e)
      if (Array.isArray(e)) {
        var n = e.length;
        for (r = 0; r < n; r++)
          e[r] && (o = s(e[r])) && (t && (t += " "), (t += o));
      } else for (o in e) e[o] && (t && (t += " "), (t += o));
    return t;
  }
  "function" == typeof SuppressedError && SuppressedError;
  const a = (e) => {
      const r = p(e),
        { conflictingClassGroups: o, conflictingClassGroupModifiers: t } = e;
      return {
        getClassGroupId: (e) => {
          const o = e.split("-");
          return "" === o[0] && 1 !== o.length && o.shift(), i(o, r) || c(e);
        },
        getConflictingClassGroupIds: (e, r) => {
          const n = o[e] || [];
          return r && t[e] ? [...n, ...t[e]] : n;
        },
      };
    },
    i = (e, r) => {
      if (0 === e.length) return r.classGroupId;
      const o = e[0],
        t = r.nextPart.get(o),
        n = t ? i(e.slice(1), t) : void 0;
      if (n) return n;
      if (0 === r.validators.length) return;
      const l = e.join("-");
      return r.validators.find(({ validator: e }) => e(l))?.classGroupId;
    },
    d = /^\[(.+)\]$/,
    c = (e) => {
      if (d.test(e)) {
        const r = d.exec(e)[1],
          o = r?.substring(0, r.indexOf(":"));
        if (o) return "arbitrary.." + o;
      }
    },
    p = (e) => {
      const { theme: r, prefix: o } = e,
        t = { nextPart: new Map(), validators: [] };
      return (
        m(Object.entries(e.classGroups), o).forEach(([e, o]) => {
          u(o, t, e, r);
        }),
        t
      );
    },
    u = (e, r, o, t) => {
      e.forEach((e) => {
        if ("string" != typeof e) {
          if ("function" == typeof e)
            return f(e)
              ? void u(e(t), r, o, t)
              : void r.validators.push({ validator: e, classGroupId: o });
          Object.entries(e).forEach(([e, n]) => {
            u(n, b(r, e), o, t);
          });
        } else {
          ("" === e ? r : b(r, e)).classGroupId = o;
        }
      });
    },
    b = (e, r) => {
      let o = e;
      return (
        r.split("-").forEach((e) => {
          o.nextPart.has(e) ||
            o.nextPart.set(e, { nextPart: new Map(), validators: [] }),
            (o = o.nextPart.get(e));
        }),
        o
      );
    },
    f = (e) => e.isThemeGetter,
    m = (e, r) =>
      r
        ? e.map(([e, o]) => [
            e,
            o.map((e) =>
              "string" == typeof e
                ? r + e
                : "object" == typeof e
                ? Object.fromEntries(
                    Object.entries(e).map(([e, o]) => [r + e, o])
                  )
                : e
            ),
          ])
        : e,
    g = (e) => {
      if (e < 1) return { get: () => {}, set: () => {} };
      let r = 0,
        o = new Map(),
        t = new Map();
      const n = (n, l) => {
        o.set(n, l), r++, r > e && ((r = 0), (t = o), (o = new Map()));
      };
      return {
        get(e) {
          let r = o.get(e);
          return void 0 !== r
            ? r
            : void 0 !== (r = t.get(e))
            ? (n(e, r), r)
            : void 0;
        },
        set(e, r) {
          o.has(e) ? o.set(e, r) : n(e, r);
        },
      };
    },
    h = (e) => {
      const { separator: r, experimentalParseClassName: o } = e,
        t = 1 === r.length,
        n = r[0],
        l = r.length,
        s = (e) => {
          const o = [];
          let s,
            a = 0,
            i = 0;
          for (let d = 0; d < e.length; d++) {
            let c = e[d];
            if (0 === a) {
              if (c === n && (t || e.slice(d, d + l) === r)) {
                o.push(e.slice(i, d)), (i = d + l);
                continue;
              }
              if ("/" === c) {
                s = d;
                continue;
              }
            }
            "[" === c ? a++ : "]" === c && a--;
          }
          const d = 0 === o.length ? e : e.substring(i),
            c = d.startsWith("!");
          return {
            modifiers: o,
            hasImportantModifier: c,
            baseClassName: c ? d.substring(1) : d,
            maybePostfixModifierPosition: s && s > i ? s - i : void 0,
          };
        };
      return o ? (e) => o({ className: e, parseClassName: s }) : s;
    },
    x = (e) => {
      if (e.length <= 1) return e;
      const r = [];
      let o = [];
      return (
        e.forEach((e) => {
          "[" === e[0] ? (r.push(...o.sort(), e), (o = [])) : o.push(e);
        }),
        r.push(...o.sort()),
        r
      );
    },
    y = /\s+/;
  function v() {
    let e,
      r,
      o = 0,
      t = "";
    for (; o < arguments.length; )
      (e = arguments[o++]) && (r = w(e)) && (t && (t += " "), (t += r));
    return t;
  }
  const w = (e) => {
    if ("string" == typeof e) return e;
    let r,
      o = "";
    for (let t = 0; t < e.length; t++)
      e[t] && (r = w(e[t])) && (o && (o += " "), (o += r));
    return o;
  };
  function k(e, ...r) {
    let o,
      t,
      n,
      l = function (i) {
        const d = r.reduce((e, r) => r(e), e());
        return (
          (o = ((e) => ({
            cache: g(e.cacheSize),
            parseClassName: h(e),
            ...a(e),
          }))(d)),
          (t = o.cache.get),
          (n = o.cache.set),
          (l = s),
          s(i)
        );
      };
    function s(e) {
      const r = t(e);
      if (r) return r;
      const l = ((e, r) => {
        const {
            parseClassName: o,
            getClassGroupId: t,
            getConflictingClassGroupIds: n,
          } = r,
          l = [],
          s = e.trim().split(y);
        let a = "";
        for (let e = s.length - 1; e >= 0; e -= 1) {
          const r = s[e],
            {
              modifiers: i,
              hasImportantModifier: d,
              baseClassName: c,
              maybePostfixModifierPosition: p,
            } = o(r);
          let u = Boolean(p),
            b = t(u ? c.substring(0, p) : c);
          if (!b) {
            if (!u) {
              a = r + (a.length > 0 ? " " + a : a);
              continue;
            }
            if (((b = t(c)), !b)) {
              a = r + (a.length > 0 ? " " + a : a);
              continue;
            }
            u = !1;
          }
          const f = x(i).join(":"),
            m = d ? f + "!" : f,
            g = m + b;
          if (l.includes(g)) continue;
          l.push(g);
          const h = n(b, u);
          for (let e = 0; e < h.length; ++e) {
            const r = h[e];
            l.push(m + r);
          }
          a = r + (a.length > 0 ? " " + a : a);
        }
        return a;
      })(e, o);
      return n(e, l), l;
    }
    return function () {
      return l(v.apply(null, arguments));
    };
  }
  const z = (e) => {
      const r = (r) => r[e] || [];
      return (r.isThemeGetter = !0), r;
    },
    j = /^\[(?:([a-z-]+):)?(.+)\]$/i,
    C = /^\d+\/\d+$/,
    N = new Set(["px", "full", "screen"]),
    G = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
    P =
      /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
    S = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,
    M = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
    E =
      /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
    I = (e) => $(e) || N.has(e) || C.test(e),
    R = (e) => K(e, "length", Q),
    $ = (e) => Boolean(e) && !Number.isNaN(Number(e)),
    O = (e) => K(e, "number", $),
    q = (e) => Boolean(e) && Number.isInteger(Number(e)),
    T = (e) => e.endsWith("%") && $(e.slice(0, -1)),
    W = (e) => j.test(e),
    _ = (e) => G.test(e),
    B = new Set(["length", "size", "percentage"]),
    A = (e) => K(e, B, U),
    L = (e) => K(e, "position", U),
    D = new Set(["image", "url"]),
    F = (e) => K(e, D, X),
    H = (e) => K(e, "", V),
    J = () => !0,
    K = (e, r, o) => {
      const t = j.exec(e);
      return (
        !!t &&
        (t[1] ? ("string" == typeof r ? t[1] === r : r.has(t[1])) : o(t[2]))
      );
    },
    Q = (e) => P.test(e) && !S.test(e),
    U = () => !1,
    V = (e) => M.test(e),
    X = (e) => E.test(e),
    Y = k(() => {
      const e = z("colors"),
        r = z("spacing"),
        o = z("blur"),
        t = z("brightness"),
        n = z("borderColor"),
        l = z("borderRadius"),
        s = z("borderSpacing"),
        a = z("borderWidth"),
        i = z("contrast"),
        d = z("grayscale"),
        c = z("hueRotate"),
        p = z("invert"),
        u = z("gap"),
        b = z("gradientColorStops"),
        f = z("gradientColorStopPositions"),
        m = z("inset"),
        g = z("margin"),
        h = z("opacity"),
        x = z("padding"),
        y = z("saturate"),
        v = z("scale"),
        w = z("sepia"),
        k = z("skew"),
        j = z("space"),
        C = z("translate"),
        N = () => ["auto", W, r],
        G = () => [W, r],
        P = () => ["", I, R],
        S = () => ["auto", $, W],
        M = () => ["", "0", W],
        E = () => [$, W];
      return {
        cacheSize: 500,
        separator: ":",
        theme: {
          colors: [J],
          spacing: [I, R],
          blur: ["none", "", _, W],
          brightness: E(),
          borderColor: [e],
          borderRadius: ["none", "", "full", _, W],
          borderSpacing: G(),
          borderWidth: P(),
          contrast: E(),
          grayscale: M(),
          hueRotate: E(),
          invert: M(),
          gap: G(),
          gradientColorStops: [e],
          gradientColorStopPositions: [T, R],
          inset: N(),
          margin: N(),
          opacity: E(),
          padding: G(),
          saturate: E(),
          scale: E(),
          sepia: M(),
          skew: E(),
          space: G(),
          translate: G(),
        },
        classGroups: {
          aspect: [{ aspect: ["auto", "square", "video", W] }],
          container: ["container"],
          columns: [{ columns: [_] }],
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
                W,
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
          z: [{ z: ["auto", q, W] }],
          basis: [{ basis: N() }],
          "flex-direction": [
            { flex: ["row", "row-reverse", "col", "col-reverse"] },
          ],
          "flex-wrap": [{ flex: ["wrap", "wrap-reverse", "nowrap"] }],
          flex: [{ flex: ["1", "auto", "initial", "none", W] }],
          grow: [{ grow: M() }],
          shrink: [{ shrink: M() }],
          order: [{ order: ["first", "last", "none", q, W] }],
          "grid-cols": [{ "grid-cols": [J] }],
          "col-start-end": [{ col: ["auto", { span: ["full", q, W] }, W] }],
          "col-start": [{ "col-start": S() }],
          "col-end": [{ "col-end": S() }],
          "grid-rows": [{ "grid-rows": [J] }],
          "row-start-end": [{ row: ["auto", { span: [q, W] }, W] }],
          "row-start": [{ "row-start": S() }],
          "row-end": [{ "row-end": S() }],
          "grid-flow": [
            { "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"] },
          ],
          "auto-cols": [{ "auto-cols": ["auto", "min", "max", "fr", W] }],
          "auto-rows": [{ "auto-rows": ["auto", "min", "max", "fr", W] }],
          gap: [{ gap: [u] }],
          "gap-x": [{ "gap-x": [u] }],
          "gap-y": [{ "gap-y": [u] }],
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
          p: [{ p: [x] }],
          px: [{ px: [x] }],
          py: [{ py: [x] }],
          ps: [{ ps: [x] }],
          pe: [{ pe: [x] }],
          pt: [{ pt: [x] }],
          pr: [{ pr: [x] }],
          pb: [{ pb: [x] }],
          pl: [{ pl: [x] }],
          m: [{ m: [g] }],
          mx: [{ mx: [g] }],
          my: [{ my: [g] }],
          ms: [{ ms: [g] }],
          me: [{ me: [g] }],
          mt: [{ mt: [g] }],
          mr: [{ mr: [g] }],
          mb: [{ mb: [g] }],
          ml: [{ ml: [g] }],
          "space-x": [{ "space-x": [j] }],
          "space-x-reverse": ["space-x-reverse"],
          "space-y": [{ "space-y": [j] }],
          "space-y-reverse": ["space-y-reverse"],
          w: [{ w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", W, r] }],
          "min-w": [{ "min-w": [W, r, "min", "max", "fit"] }],
          "max-w": [
            {
              "max-w": [
                W,
                r,
                "none",
                "full",
                "min",
                "max",
                "fit",
                "prose",
                { screen: [_] },
                _,
              ],
            },
          ],
          h: [{ h: [W, r, "auto", "min", "max", "fit", "svh", "lvh", "dvh"] }],
          "min-h": [
            { "min-h": [W, r, "min", "max", "fit", "svh", "lvh", "dvh"] },
          ],
          "max-h": [
            { "max-h": [W, r, "min", "max", "fit", "svh", "lvh", "dvh"] },
          ],
          size: [{ size: [W, r, "auto", "min", "max", "fit"] }],
          "font-size": [{ text: ["base", _, R] }],
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
                O,
              ],
            },
          ],
          "font-family": [{ font: [J] }],
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
                W,
              ],
            },
          ],
          "line-clamp": [{ "line-clamp": ["none", $, O] }],
          leading: [
            {
              leading: [
                "none",
                "tight",
                "snug",
                "normal",
                "relaxed",
                "loose",
                I,
                W,
              ],
            },
          ],
          "list-image": [{ "list-image": ["none", W] }],
          "list-style-type": [{ list: ["none", "disc", "decimal", W] }],
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
            { decoration: ["auto", "from-font", I, R] },
          ],
          "underline-offset": [{ "underline-offset": ["auto", I, W] }],
          "text-decoration-color": [{ decoration: [e] }],
          "text-transform": [
            "uppercase",
            "lowercase",
            "capitalize",
            "normal-case",
          ],
          "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
          "text-wrap": [{ text: ["wrap", "nowrap", "balance", "pretty"] }],
          indent: [{ indent: G() }],
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
                W,
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
          content: [{ content: ["none", W] }],
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
                F,
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
          "border-w": [{ border: [a] }],
          "border-w-x": [{ "border-x": [a] }],
          "border-w-y": [{ "border-y": [a] }],
          "border-w-s": [{ "border-s": [a] }],
          "border-w-e": [{ "border-e": [a] }],
          "border-w-t": [{ "border-t": [a] }],
          "border-w-r": [{ "border-r": [a] }],
          "border-w-b": [{ "border-b": [a] }],
          "border-w-l": [{ "border-l": [a] }],
          "border-opacity": [{ "border-opacity": [h] }],
          "border-style": [
            {
              border: ["solid", "dashed", "dotted", "double", "none", "hidden"],
            },
          ],
          "divide-x": [{ "divide-x": [a] }],
          "divide-x-reverse": ["divide-x-reverse"],
          "divide-y": [{ "divide-y": [a] }],
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
          "outline-offset": [{ "outline-offset": [I, W] }],
          "outline-w": [{ outline: [I, R] }],
          "outline-color": [{ outline: [e] }],
          "ring-w": [{ ring: P() }],
          "ring-w-inset": ["ring-inset"],
          "ring-color": [{ ring: [e] }],
          "ring-opacity": [{ "ring-opacity": [h] }],
          "ring-offset-w": [{ "ring-offset": [I, R] }],
          "ring-offset-color": [{ "ring-offset": [e] }],
          shadow: [{ shadow: ["", "inner", "none", _, H] }],
          "shadow-color": [{ shadow: [J] }],
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
          blur: [{ blur: [o] }],
          brightness: [{ brightness: [t] }],
          contrast: [{ contrast: [i] }],
          "drop-shadow": [{ "drop-shadow": ["", "none", _, W] }],
          grayscale: [{ grayscale: [d] }],
          "hue-rotate": [{ "hue-rotate": [c] }],
          invert: [{ invert: [p] }],
          saturate: [{ saturate: [y] }],
          sepia: [{ sepia: [w] }],
          "backdrop-filter": [{ "backdrop-filter": ["", "none"] }],
          "backdrop-blur": [{ "backdrop-blur": [o] }],
          "backdrop-brightness": [{ "backdrop-brightness": [t] }],
          "backdrop-contrast": [{ "backdrop-contrast": [i] }],
          "backdrop-grayscale": [{ "backdrop-grayscale": [d] }],
          "backdrop-hue-rotate": [{ "backdrop-hue-rotate": [c] }],
          "backdrop-invert": [{ "backdrop-invert": [p] }],
          "backdrop-opacity": [{ "backdrop-opacity": [h] }],
          "backdrop-saturate": [{ "backdrop-saturate": [y] }],
          "backdrop-sepia": [{ "backdrop-sepia": [w] }],
          "border-collapse": [{ border: ["collapse", "separate"] }],
          "border-spacing": [{ "border-spacing": [s] }],
          "border-spacing-x": [{ "border-spacing-x": [s] }],
          "border-spacing-y": [{ "border-spacing-y": [s] }],
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
                W,
              ],
            },
          ],
          duration: [{ duration: E() }],
          ease: [{ ease: ["linear", "in", "out", "in-out", W] }],
          delay: [{ delay: E() }],
          animate: [
            { animate: ["none", "spin", "ping", "pulse", "bounce", W] },
          ],
          transform: [{ transform: ["", "gpu", "none"] }],
          scale: [{ scale: [v] }],
          "scale-x": [{ "scale-x": [v] }],
          "scale-y": [{ "scale-y": [v] }],
          rotate: [{ rotate: [q, W] }],
          "translate-x": [{ "translate-x": [C] }],
          "translate-y": [{ "translate-y": [C] }],
          "skew-x": [{ "skew-x": [k] }],
          "skew-y": [{ "skew-y": [k] }],
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
                W,
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
                W,
              ],
            },
          ],
          "caret-color": [{ caret: [e] }],
          "pointer-events": [{ "pointer-events": ["none", "auto"] }],
          resize: [{ resize: ["none", "y", "x", ""] }],
          "scroll-behavior": [{ scroll: ["auto", "smooth"] }],
          "scroll-m": [{ "scroll-m": G() }],
          "scroll-mx": [{ "scroll-mx": G() }],
          "scroll-my": [{ "scroll-my": G() }],
          "scroll-ms": [{ "scroll-ms": G() }],
          "scroll-me": [{ "scroll-me": G() }],
          "scroll-mt": [{ "scroll-mt": G() }],
          "scroll-mr": [{ "scroll-mr": G() }],
          "scroll-mb": [{ "scroll-mb": G() }],
          "scroll-ml": [{ "scroll-ml": G() }],
          "scroll-p": [{ "scroll-p": G() }],
          "scroll-px": [{ "scroll-px": G() }],
          "scroll-py": [{ "scroll-py": G() }],
          "scroll-ps": [{ "scroll-ps": G() }],
          "scroll-pe": [{ "scroll-pe": G() }],
          "scroll-pt": [{ "scroll-pt": G() }],
          "scroll-pr": [{ "scroll-pr": G() }],
          "scroll-pb": [{ "scroll-pb": G() }],
          "scroll-pl": [{ "scroll-pl": G() }],
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
            { "will-change": ["auto", "scroll", "contents", "transform", W] },
          ],
          fill: [{ fill: [e, "none"] }],
          "stroke-w": [{ stroke: [I, R, O] }],
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
  function Z() {
    for (var e = [], r = 0; r < arguments.length; r++) e[r] = arguments[r];
    return Y(
      (function () {
        for (var e, r, o = 0, t = "", n = arguments.length; o < n; o++)
          (e = arguments[o]) && (r = s(e)) && (t && (t += " "), (t += r));
        return t;
      })(e)
    );
  }
  (e.default = function (e) {
    var r = e.text,
      o = e.maxLength,
      t = void 0 === o ? 50 : o,
      n = e.className,
      s = e.link,
      a = void 0 === s ? "" : s,
      i = (function (e) {
        return e.replace(/<script.*?>.*?<\/script>/gi, "");
      })(r),
      d = i.length > t,
      c = d ? i.slice(0, t) + "..." : i;
    return React.createElement(
      "div",
      {
        className: Z(
          "flex flex-col w-full gap-1 items-start justify-center content-footer",
          n
        ),
      },
      React.createElement("p", null, c),
      d &&
        React.createElement(
          l.default,
          { href: { pathname: a }, className: "text-blue-500 underline" },
          "Read more"
        )
    );
  }),
    Object.defineProperty(e, "__esModule", { value: !0 });
});
