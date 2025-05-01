"use strict";
var h = Object.create;
var r = Object.defineProperty;
var u = Object.getOwnPropertyDescriptor;
var y = Object.getOwnPropertyNames;
var S = Object.getPrototypeOf,
    v = Object.prototype.hasOwnProperty;
var g = (e, t) => {
        for (var o in t) r(e, o, { get: t[o], enumerable: !0 });
    },
    s = (e, t, o, i) => {
        if ((t && typeof t == "object") || typeof t == "function")
            for (let a of y(t))
                !v.call(e, a) &&
                    a !== o &&
                    r(e, a, {
                        get: () => t[a],
                        enumerable: !(i = u(t, a)) || i.enumerable,
                    });
        return e;
    };
var w = (e, t, o) => (
        (o = e != null ? h(S(e)) : {}),
        s(
            t || !e || !e.__esModule
                ? r(o, "default", { value: e, enumerable: !0 })
                : o,
            e,
        )
    ),
    x = (e) => s(r({}, "__esModule", { value: !0 }), e);
var T = {};
g(T, { validation: () => O });
module.exports = x(T);
var m = require("fs"),
    c = require("json-schema-to-typescript"),
    p = require("@sinclair/typebox/compiler"),
    l = w(require("esbuild")),
    f = async (e, t) => {
        let o = "";
        for (let i of e)
            o += await (0, c.compile)(i, "", { bannerComment: "" });
        (0, m.writeFileSync)(t, o);
    },
    d = async (e, t) => {
        let o = "";
        for (let a of e) {
            let n = p.TypeCompiler.Code(a);
            (n = o.replace(/return(?= function check\(value\) \{)/, "export")),
                (n = o.replace(
                    /(?<=export function )check(?=\(value\) \{)/,
                    `Is${a.title ?? ""}`,
                )),
                (o += n);
        }
        let i = await l.transform(o, { minify: !0 });
        (0, m.writeFileSync)(t, i.code);
    };
var O = async (e) => {
    await f(e.schemas, e.typesOutFile), await d(e.schemas, e.validationOutFile);
};
0 && (module.exports = { validation });
