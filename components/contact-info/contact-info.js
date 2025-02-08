!(function (e, o) {
  "object" == typeof exports && "undefined" != typeof module
    ? o(exports, require("react"))
    : "function" == typeof define && define.amd
    ? define(["exports", "react"], o)
    : o(
        ((e =
          "undefined" != typeof globalThis
            ? globalThis
            : e || self).ContactInformation = {}),
        e.React
      );
})(this, function (e, o) {
  "use strict";
  function r(e) {
    return e && "object" == typeof e && "default" in e ? e : { default: e };
  }
  var t = r(o);
  function n(e, o, r, t) {
    return new (r || (r = Promise))(function (n, l) {
      function a(e) {
        try {
          i(t.next(e));
        } catch (e) {
          l(e);
        }
      }
      function s(e) {
        try {
          i(t.throw(e));
        } catch (e) {
          l(e);
        }
      }
      function i(e) {
        var o;
        e.done
          ? n(e.value)
          : ((o = e.value),
            o instanceof r
              ? o
              : new r(function (e) {
                  e(o);
                })).then(a, s);
      }
      i((t = t.apply(e, o || [])).next());
    });
  }
  function l(e, o) {
    var r,
      t,
      n,
      l = {
        label: 0,
        sent: function () {
          if (1 & n[0]) throw n[1];
          return n[1];
        },
        trys: [],
        ops: [],
      },
      a = Object.create(
        ("function" == typeof Iterator ? Iterator : Object).prototype
      );
    return (
      (a.next = s(0)),
      (a.throw = s(1)),
      (a.return = s(2)),
      "function" == typeof Symbol &&
        (a[Symbol.iterator] = function () {
          return this;
        }),
      a
    );
    function s(s) {
      return function (i) {
        return (function (s) {
          if (r) throw new TypeError("Generator is already executing.");
          for (; a && ((a = 0), s[0] && (l = 0)), l; )
            try {
              if (
                ((r = 1),
                t &&
                  (n =
                    2 & s[0]
                      ? t.return
                      : s[0]
                      ? t.throw || ((n = t.return) && n.call(t), 0)
                      : t.next) &&
                  !(n = n.call(t, s[1])).done)
              )
                return n;
              switch (((t = 0), n && (s = [2 & s[0], n.value]), s[0])) {
                case 0:
                case 1:
                  n = s;
                  break;
                case 4:
                  return l.label++, { value: s[1], done: !1 };
                case 5:
                  l.label++, (t = s[1]), (s = [0]);
                  continue;
                case 7:
                  (s = l.ops.pop()), l.trys.pop();
                  continue;
                default:
                  if (
                    !((n = l.trys),
                    (n = n.length > 0 && n[n.length - 1]) ||
                      (6 !== s[0] && 2 !== s[0]))
                  ) {
                    l = 0;
                    continue;
                  }
                  if (3 === s[0] && (!n || (s[1] > n[0] && s[1] < n[3]))) {
                    l.label = s[1];
                    break;
                  }
                  if (6 === s[0] && l.label < n[1]) {
                    (l.label = n[1]), (n = s);
                    break;
                  }
                  if (n && l.label < n[2]) {
                    (l.label = n[2]), l.ops.push(s);
                    break;
                  }
                  n[2] && l.ops.pop(), l.trys.pop();
                  continue;
              }
              s = o.call(e, l);
            } catch (e) {
              (s = [6, e]), (t = 0);
            } finally {
              r = n = 0;
            }
          if (5 & s[0]) throw s[1];
          return { value: s[0] ? s[1] : void 0, done: !0 };
        })([s, i]);
      };
    }
  }
  function a(e) {
    var o,
      r,
      t = "";
    if ("string" == typeof e || "number" == typeof e) t += e;
    else if ("object" == typeof e)
      if (Array.isArray(e)) {
        var n = e.length;
        for (o = 0; o < n; o++)
          e[o] && (r = a(e[o])) && (t && (t += " "), (t += r));
      } else for (r in e) e[r] && (t && (t += " "), (t += r));
    return t;
  }
  "function" == typeof SuppressedError && SuppressedError;
  const s = (e) => {
      const o = u(e),
        { conflictingClassGroups: r, conflictingClassGroupModifiers: t } = e;
      return {
        getClassGroupId: (e) => {
          const r = e.split("-");
          return "" === r[0] && 1 !== r.length && r.shift(), i(r, o) || d(e);
        },
        getConflictingClassGroupIds: (e, o) => {
          const n = r[e] || [];
          return o && t[e] ? [...n, ...t[e]] : n;
        },
      };
    },
    i = (e, o) => {
      if (0 === e.length) return o.classGroupId;
      const r = e[0],
        t = o.nextPart.get(r),
        n = t ? i(e.slice(1), t) : void 0;
      if (n) return n;
      if (0 === o.validators.length) return;
      const l = e.join("-");
      return o.validators.find(({ validator: e }) => e(l))?.classGroupId;
    },
    c = /^\[(.+)\]$/,
    d = (e) => {
      if (c.test(e)) {
        const o = c.exec(e)[1],
          r = o?.substring(0, o.indexOf(":"));
        if (r) return "arbitrary.." + r;
      }
    },
    u = (e) => {
      const { theme: o, prefix: r } = e,
        t = { nextPart: new Map(), validators: [] };
      return (
        m(Object.entries(e.classGroups), r).forEach(([e, r]) => {
          p(r, t, e, o);
        }),
        t
      );
    },
    p = (e, o, r, t) => {
      e.forEach((e) => {
        if ("string" != typeof e) {
          if ("function" == typeof e)
            return b(e)
              ? void p(e(t), o, r, t)
              : void o.validators.push({ validator: e, classGroupId: r });
          Object.entries(e).forEach(([e, n]) => {
            p(n, f(o, e), r, t);
          });
        } else {
          ("" === e ? o : f(o, e)).classGroupId = r;
        }
      });
    },
    f = (e, o) => {
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
    b = (e) => e.isThemeGetter,
    m = (e, o) =>
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
    g = (e) => {
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
    h = (e) => {
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
    v = (e) => {
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
    y = /\s+/;
  function w() {
    let e,
      o,
      r = 0,
      t = "";
    for (; r < arguments.length; )
      (e = arguments[r++]) && (o = x(e)) && (t && (t += " "), (t += o));
    return t;
  }
  const x = (e) => {
    if ("string" == typeof e) return e;
    let o,
      r = "";
    for (let t = 0; t < e.length; t++)
      e[t] && (o = x(e[t])) && (r && (r += " "), (r += o));
    return r;
  };
  function k(e, ...o) {
    let r,
      t,
      n,
      l = function (i) {
        const c = o.reduce((e, o) => o(e), e());
        return (
          (r = ((e) => ({
            cache: g(e.cacheSize),
            parseClassName: h(e),
            ...s(e),
          }))(c)),
          (t = r.cache.get),
          (n = r.cache.set),
          (l = a),
          a(i)
        );
      };
    function a(e) {
      const o = t(e);
      if (o) return o;
      const l = ((e, o) => {
        const {
            parseClassName: r,
            getClassGroupId: t,
            getConflictingClassGroupIds: n,
          } = o,
          l = [],
          a = e.trim().split(y);
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
            f = t(p ? d.substring(0, u) : d);
          if (!f) {
            if (!p) {
              s = o + (s.length > 0 ? " " + s : s);
              continue;
            }
            if (((f = t(d)), !f)) {
              s = o + (s.length > 0 ? " " + s : s);
              continue;
            }
            p = !1;
          }
          const b = v(i).join(":"),
            m = c ? b + "!" : b,
            g = m + f;
          if (l.includes(g)) continue;
          l.push(g);
          const h = n(f, p);
          for (let e = 0; e < h.length; ++e) {
            const o = h[e];
            l.push(m + o);
          }
          s = o + (s.length > 0 ? " " + s : s);
        }
        return s;
      })(e, r);
      return n(e, l), l;
    }
    return function () {
      return l(w.apply(null, arguments));
    };
  }
  const z = (e) => {
      const o = (o) => o[e] || [];
      return (o.isThemeGetter = !0), o;
    },
    j = /^\[(?:([a-z-]+):)?(.+)\]$/i,
    C = /^\d+\/\d+$/,
    N = new Set(["px", "full", "screen"]),
    E = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
    S =
      /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
    G = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,
    M = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
    P =
      /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
    I = (e) => L(e) || N.has(e) || C.test(e),
    R = (e) => J(e, "length", K),
    L = (e) => Boolean(e) && !Number.isNaN(Number(e)),
    O = (e) => J(e, "number", L),
    $ = (e) => Boolean(e) && Number.isInteger(Number(e)),
    q = (e) => e.endsWith("%") && L(e.slice(0, -1)),
    T = (e) => j.test(e),
    _ = (e) => E.test(e),
    B = new Set(["length", "size", "percentage"]),
    U = (e) => J(e, B, Q),
    W = (e) => J(e, "position", Q),
    A = new Set(["image", "url"]),
    D = (e) => J(e, A, X),
    F = (e) => J(e, "", V),
    H = () => !0,
    J = (e, o, r) => {
      const t = j.exec(e);
      return (
        !!t &&
        (t[1] ? ("string" == typeof o ? t[1] === o : o.has(t[1])) : r(t[2]))
      );
    },
    K = (e) => S.test(e) && !G.test(e),
    Q = () => !1,
    V = (e) => M.test(e),
    X = (e) => P.test(e),
    Y = k(() => {
      const e = z("colors"),
        o = z("spacing"),
        r = z("blur"),
        t = z("brightness"),
        n = z("borderColor"),
        l = z("borderRadius"),
        a = z("borderSpacing"),
        s = z("borderWidth"),
        i = z("contrast"),
        c = z("grayscale"),
        d = z("hueRotate"),
        u = z("invert"),
        p = z("gap"),
        f = z("gradientColorStops"),
        b = z("gradientColorStopPositions"),
        m = z("inset"),
        g = z("margin"),
        h = z("opacity"),
        v = z("padding"),
        y = z("saturate"),
        w = z("scale"),
        x = z("sepia"),
        k = z("skew"),
        j = z("space"),
        C = z("translate"),
        N = () => ["auto", T, o],
        E = () => [T, o],
        S = () => ["", I, R],
        G = () => ["auto", L, T],
        M = () => ["", "0", T],
        P = () => [L, T];
      return {
        cacheSize: 500,
        separator: ":",
        theme: {
          colors: [H],
          spacing: [I, R],
          blur: ["none", "", _, T],
          brightness: P(),
          borderColor: [e],
          borderRadius: ["none", "", "full", _, T],
          borderSpacing: E(),
          borderWidth: S(),
          contrast: P(),
          grayscale: M(),
          hueRotate: P(),
          invert: M(),
          gap: E(),
          gradientColorStops: [e],
          gradientColorStopPositions: [q, R],
          inset: N(),
          margin: N(),
          opacity: P(),
          padding: E(),
          saturate: P(),
          scale: P(),
          sepia: M(),
          skew: P(),
          space: E(),
          translate: E(),
        },
        classGroups: {
          aspect: [{ aspect: ["auto", "square", "video", T] }],
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
                T,
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
          z: [{ z: ["auto", $, T] }],
          basis: [{ basis: N() }],
          "flex-direction": [
            { flex: ["row", "row-reverse", "col", "col-reverse"] },
          ],
          "flex-wrap": [{ flex: ["wrap", "wrap-reverse", "nowrap"] }],
          flex: [{ flex: ["1", "auto", "initial", "none", T] }],
          grow: [{ grow: M() }],
          shrink: [{ shrink: M() }],
          order: [{ order: ["first", "last", "none", $, T] }],
          "grid-cols": [{ "grid-cols": [H] }],
          "col-start-end": [{ col: ["auto", { span: ["full", $, T] }, T] }],
          "col-start": [{ "col-start": G() }],
          "col-end": [{ "col-end": G() }],
          "grid-rows": [{ "grid-rows": [H] }],
          "row-start-end": [{ row: ["auto", { span: [$, T] }, T] }],
          "row-start": [{ "row-start": G() }],
          "row-end": [{ "row-end": G() }],
          "grid-flow": [
            { "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"] },
          ],
          "auto-cols": [{ "auto-cols": ["auto", "min", "max", "fr", T] }],
          "auto-rows": [{ "auto-rows": ["auto", "min", "max", "fr", T] }],
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
          "space-x": [{ "space-x": [j] }],
          "space-x-reverse": ["space-x-reverse"],
          "space-y": [{ "space-y": [j] }],
          "space-y-reverse": ["space-y-reverse"],
          w: [{ w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", T, o] }],
          "min-w": [{ "min-w": [T, o, "min", "max", "fit"] }],
          "max-w": [
            {
              "max-w": [
                T,
                o,
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
          h: [{ h: [T, o, "auto", "min", "max", "fit", "svh", "lvh", "dvh"] }],
          "min-h": [
            { "min-h": [T, o, "min", "max", "fit", "svh", "lvh", "dvh"] },
          ],
          "max-h": [
            { "max-h": [T, o, "min", "max", "fit", "svh", "lvh", "dvh"] },
          ],
          size: [{ size: [T, o, "auto", "min", "max", "fit"] }],
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
          "font-family": [{ font: [H] }],
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
                T,
              ],
            },
          ],
          "line-clamp": [{ "line-clamp": ["none", L, O] }],
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
                T,
              ],
            },
          ],
          "list-image": [{ "list-image": ["none", T] }],
          "list-style-type": [{ list: ["none", "disc", "decimal", T] }],
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
          "underline-offset": [{ "underline-offset": ["auto", I, T] }],
          "text-decoration-color": [{ decoration: [e] }],
          "text-transform": [
            "uppercase",
            "lowercase",
            "capitalize",
            "normal-case",
          ],
          "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
          "text-wrap": [{ text: ["wrap", "nowrap", "balance", "pretty"] }],
          indent: [{ indent: E() }],
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
                T,
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
          content: [{ content: ["none", T] }],
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
                W,
              ],
            },
          ],
          "bg-repeat": [
            { bg: ["no-repeat", { repeat: ["", "x", "y", "round", "space"] }] },
          ],
          "bg-size": [{ bg: ["auto", "cover", "contain", U] }],
          "bg-image": [
            {
              bg: [
                "none",
                { "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"] },
                D,
              ],
            },
          ],
          "bg-color": [{ bg: [e] }],
          "gradient-from-pos": [{ from: [b] }],
          "gradient-via-pos": [{ via: [b] }],
          "gradient-to-pos": [{ to: [b] }],
          "gradient-from": [{ from: [f] }],
          "gradient-via": [{ via: [f] }],
          "gradient-to": [{ to: [f] }],
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
          "outline-offset": [{ "outline-offset": [I, T] }],
          "outline-w": [{ outline: [I, R] }],
          "outline-color": [{ outline: [e] }],
          "ring-w": [{ ring: S() }],
          "ring-w-inset": ["ring-inset"],
          "ring-color": [{ ring: [e] }],
          "ring-opacity": [{ "ring-opacity": [h] }],
          "ring-offset-w": [{ "ring-offset": [I, R] }],
          "ring-offset-color": [{ "ring-offset": [e] }],
          shadow: [{ shadow: ["", "inner", "none", _, F] }],
          "shadow-color": [{ shadow: [H] }],
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
          "drop-shadow": [{ "drop-shadow": ["", "none", _, T] }],
          grayscale: [{ grayscale: [c] }],
          "hue-rotate": [{ "hue-rotate": [d] }],
          invert: [{ invert: [u] }],
          saturate: [{ saturate: [y] }],
          sepia: [{ sepia: [x] }],
          "backdrop-filter": [{ "backdrop-filter": ["", "none"] }],
          "backdrop-blur": [{ "backdrop-blur": [r] }],
          "backdrop-brightness": [{ "backdrop-brightness": [t] }],
          "backdrop-contrast": [{ "backdrop-contrast": [i] }],
          "backdrop-grayscale": [{ "backdrop-grayscale": [c] }],
          "backdrop-hue-rotate": [{ "backdrop-hue-rotate": [d] }],
          "backdrop-invert": [{ "backdrop-invert": [u] }],
          "backdrop-opacity": [{ "backdrop-opacity": [h] }],
          "backdrop-saturate": [{ "backdrop-saturate": [y] }],
          "backdrop-sepia": [{ "backdrop-sepia": [x] }],
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
                T,
              ],
            },
          ],
          duration: [{ duration: P() }],
          ease: [{ ease: ["linear", "in", "out", "in-out", T] }],
          delay: [{ delay: P() }],
          animate: [
            { animate: ["none", "spin", "ping", "pulse", "bounce", T] },
          ],
          transform: [{ transform: ["", "gpu", "none"] }],
          scale: [{ scale: [w] }],
          "scale-x": [{ "scale-x": [w] }],
          "scale-y": [{ "scale-y": [w] }],
          rotate: [{ rotate: [$, T] }],
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
                T,
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
                T,
              ],
            },
          ],
          "caret-color": [{ caret: [e] }],
          "pointer-events": [{ "pointer-events": ["none", "auto"] }],
          resize: [{ resize: ["none", "y", "x", ""] }],
          "scroll-behavior": [{ scroll: ["auto", "smooth"] }],
          "scroll-m": [{ "scroll-m": E() }],
          "scroll-mx": [{ "scroll-mx": E() }],
          "scroll-my": [{ "scroll-my": E() }],
          "scroll-ms": [{ "scroll-ms": E() }],
          "scroll-me": [{ "scroll-me": E() }],
          "scroll-mt": [{ "scroll-mt": E() }],
          "scroll-mr": [{ "scroll-mr": E() }],
          "scroll-mb": [{ "scroll-mb": E() }],
          "scroll-ml": [{ "scroll-ml": E() }],
          "scroll-p": [{ "scroll-p": E() }],
          "scroll-px": [{ "scroll-px": E() }],
          "scroll-py": [{ "scroll-py": E() }],
          "scroll-ps": [{ "scroll-ps": E() }],
          "scroll-pe": [{ "scroll-pe": E() }],
          "scroll-pt": [{ "scroll-pt": E() }],
          "scroll-pr": [{ "scroll-pr": E() }],
          "scroll-pb": [{ "scroll-pb": E() }],
          "scroll-pl": [{ "scroll-pl": E() }],
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
            { "will-change": ["auto", "scroll", "contents", "transform", T] },
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
    for (var e = [], o = 0; o < arguments.length; o++) e[o] = arguments[o];
    return Y(
      (function () {
        for (var e, o, r = 0, t = "", n = arguments.length; r < n; r++)
          (e = arguments[r]) && (o = a(e)) && (t && (t += " "), (t += o));
        return t;
      })(e)
    );
  }
  (e.default = function (e) {
    var r = e.address,
      a = e.contact,
      s = e.socialMediaLinks,
      i = e.className,
      c = o.useState(null),
      d = c[0],
      u = c[1],
      p = o.useRef(null),
      f = o.useState(null),
      b = f[0],
      m = f[1],
      g = o.useState(null),
      h = g[0],
      v = g[1];
    if (
      (console.log({ manifest: d }),
      o.useEffect(function () {
        "undefined" != typeof window &&
          (window.React || (window.React = require("react")),
          window.ReactDOM || (window.ReactDOM = require("react-dom"))),
          (function () {
            return n(this, void 0, void 0, function () {
              var e, o;
              return l(this, function (r) {
                switch (r.label) {
                  case 0:
                    return (
                      r.trys.push([0, 3, , 4]),
                      [
                        4,
                        fetch(
                          "https://akbarinejadaida.github.io/cdnfiles/websites/gt-metrix/manifest.json"
                        ),
                      ]
                    );
                  case 1:
                    if (!(e = r.sent()).ok)
                      throw new Error("Network response was not ok");
                    return [4, e.json()];
                  case 2:
                    return [2, r.sent()];
                  case 3:
                    return (
                      (o = r.sent()),
                      console.error("Failed to fetch manifest:", o),
                      [3, 4]
                    );
                  case 4:
                    return [2];
                }
              });
            });
          })().then(function (e) {
            u(e);
          });
      }, []),
      o.useEffect(
        function () {
          var e, o, r, t;
          if (d) {
            var n =
              null ===
                (o =
                  null === (e = null == d ? void 0 : d.layout) || void 0 === e
                    ? void 0
                    : e.navbar) || void 0 === o
                ? void 0
                : o.component;
            if ("string" == typeof n)
              console.log("NavBar component URL:", n),
                ((l = document.createElement("script")).src = n),
                (l.type = "module"),
                (l.onload = function () {
                  m(function () {
                    return window.Navbar;
                  });
                }),
                document.head.appendChild(l);
            else console.error("Navbar component URL is not valid:", n);
            var l,
              a =
                null ===
                  (t =
                    null === (r = null == d ? void 0 : d.layout) || void 0 === r
                      ? void 0
                      : r.navbar) || void 0 === t
                  ? void 0
                  : t.navLink,
              s = null == a ? void 0 : a.component;
            if ("string" == typeof s)
              console.log("NavLink component URL:", s),
                ((l = document.createElement("script")).src = s),
                (l.type = "module"),
                (l.onload = function () {
                  v(function () {
                    return window.NavLink;
                  });
                }),
                document.head.appendChild(l);
            else console.error("NavLink component URL is not valid:", a);
          }
        },
        [d]
      ),
      !b || !h)
    )
      return t.default.createElement("p", null, "Loading...");
    var y = b,
      w = h;
    return t.default.createElement(
      "div",
      {
        className: Z(
          "flex flex-col w-full gap-1 items-start justify-center sub-footer",
          i
        ),
        ref: p,
      },
      t.default.createElement(y, null),
      null == a
        ? void 0
        : a.map(function (e) {
            return t.default.createElement(
              w,
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
              w,
              { key: e.label, link: "/directions", label: e.label },
              e.icon
            );
          }),
      t.default.createElement(
        "span",
        { className: "p-0 m-0 flex gap-0.1" },
        null == s
          ? void 0
          : s.map(function (e) {
              return t.default.createElement(
                w,
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
    );
  }),
    Object.defineProperty(e, "__esModule", { value: !0 });
});
