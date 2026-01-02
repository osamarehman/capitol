(function(Te, ue) {
    typeof exports == "object" && typeof module < "u" ? module.exports = ue() : typeof define == "function" && define.amd ? define(ue) : (Te = typeof globalThis < "u" ? globalThis : Te || self,
    Te.N8nChatEmbed = ue())
}
)(this, function() {
    "use strict";
    var Wf = Object.defineProperty;
    var Kf = (Te, ue, it) => ue in Te ? Wf(Te, ue, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: it
    }) : Te[ue] = it;
    var Be = (Te, ue, it) => (Kf(Te, typeof ue != "symbol" ? ue + "" : ue, it),
    it);
    var Te = {
        exports: {}
    }
      , ue = {}
      , it = {
        exports: {}
    }
      , O = {};
    /**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
    var wn = Symbol.for("react.element")
      , sc = Symbol.for("react.portal")
      , ac = Symbol.for("react.fragment")
      , cc = Symbol.for("react.strict_mode")
      , dc = Symbol.for("react.profiler")
      , fc = Symbol.for("react.provider")
      , pc = Symbol.for("react.context")
      , hc = Symbol.for("react.forward_ref")
      , mc = Symbol.for("react.suspense")
      , vc = Symbol.for("react.memo")
      , yc = Symbol.for("react.lazy")
      , Vo = Symbol.iterator;
    function gc(e) {
        return e === null || typeof e != "object" ? null : (e = Vo && e[Vo] || e["@@iterator"],
        typeof e == "function" ? e : null)
    }
    var Ao = {
        isMounted: function() {
            return !1
        },
        enqueueForceUpdate: function() {},
        enqueueReplaceState: function() {},
        enqueueSetState: function() {}
    }
      , Ho = Object.assign
      , Bo = {};
    function Ht(e, t, n) {
        this.props = e,
        this.context = t,
        this.refs = Bo,
        this.updater = n || Ao
    }
    Ht.prototype.isReactComponent = {},
    Ht.prototype.setState = function(e, t) {
        if (typeof e != "object" && typeof e != "function" && e != null)
            throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, e, t, "setState")
    }
    ,
    Ht.prototype.forceUpdate = function(e) {
        this.updater.enqueueForceUpdate(this, e, "forceUpdate")
    }
    ;
    function Wo() {}
    Wo.prototype = Ht.prototype;
    function Nl(e, t, n) {
        this.props = e,
        this.context = t,
        this.refs = Bo,
        this.updater = n || Ao
    }
    var Pl = Nl.prototype = new Wo;
    Pl.constructor = Nl,
    Ho(Pl, Ht.prototype),
    Pl.isPureReactComponent = !0;
    var Ko = Array.isArray
      , Qo = Object.prototype.hasOwnProperty
      , zl = {
        current: null
    }
      , Yo = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
    };
    function Xo(e, t, n) {
        var r, l = {}, i = null, o = null;
        if (t != null)
            for (r in t.ref !== void 0 && (o = t.ref),
            t.key !== void 0 && (i = "" + t.key),
            t)
                Qo.call(t, r) && !Yo.hasOwnProperty(r) && (l[r] = t[r]);
        var u = arguments.length - 2;
        if (u === 1)
            l.children = n;
        else if (1 < u) {
            for (var s = Array(u), d = 0; d < u; d++)
                s[d] = arguments[d + 2];
            l.children = s
        }
        if (e && e.defaultProps)
            for (r in u = e.defaultProps,
            u)
                l[r] === void 0 && (l[r] = u[r]);
        return {
            $$typeof: wn,
            type: e,
            key: i,
            ref: o,
            props: l,
            _owner: zl.current
        }
    }
    function wc(e, t) {
        return {
            $$typeof: wn,
            type: e.type,
            key: t,
            ref: e.ref,
            props: e.props,
            _owner: e._owner
        }
    }
    function Tl(e) {
        return typeof e == "object" && e !== null && e.$$typeof === wn
    }
    function Sc(e) {
        var t = {
            "=": "=0",
            ":": "=2"
        };
        return "$" + e.replace(/[=:]/g, function(n) {
            return t[n]
        })
    }
    var Go = /\/+/g;
    function Ll(e, t) {
        return typeof e == "object" && e !== null && e.key != null ? Sc("" + e.key) : t.toString(36)
    }
    function ar(e, t, n, r, l) {
        var i = typeof e;
        (i === "undefined" || i === "boolean") && (e = null);
        var o = !1;
        if (e === null)
            o = !0;
        else
            switch (i) {
            case "string":
            case "number":
                o = !0;
                break;
            case "object":
                switch (e.$$typeof) {
                case wn:
                case sc:
                    o = !0
                }
            }
        if (o)
            return o = e,
            l = l(o),
            e = r === "" ? "." + Ll(o, 0) : r,
            Ko(l) ? (n = "",
            e != null && (n = e.replace(Go, "$&/") + "/"),
            ar(l, t, n, "", function(d) {
                return d
            })) : l != null && (Tl(l) && (l = wc(l, n + (!l.key || o && o.key === l.key ? "" : ("" + l.key).replace(Go, "$&/") + "/") + e)),
            t.push(l)),
            1;
        if (o = 0,
        r = r === "" ? "." : r + ":",
        Ko(e))
            for (var u = 0; u < e.length; u++) {
                i = e[u];
                var s = r + Ll(i, u);
                o += ar(i, t, n, s, l)
            }
        else if (s = gc(e),
        typeof s == "function")
            for (e = s.call(e),
            u = 0; !(i = e.next()).done; )
                i = i.value,
                s = r + Ll(i, u++),
                o += ar(i, t, n, s, l);
        else if (i === "object")
            throw t = String(e),
            Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
        return o
    }
    function cr(e, t, n) {
        if (e == null)
            return e;
        var r = []
          , l = 0;
        return ar(e, r, "", "", function(i) {
            return t.call(n, i, l++)
        }),
        r
    }
    function kc(e) {
        if (e._status === -1) {
            var t = e._result;
            t = t(),
            t.then(function(n) {
                (e._status === 0 || e._status === -1) && (e._status = 1,
                e._result = n)
            }, function(n) {
                (e._status === 0 || e._status === -1) && (e._status = 2,
                e._result = n)
            }),
            e._status === -1 && (e._status = 0,
            e._result = t)
        }
        if (e._status === 1)
            return e._result.default;
        throw e._result
    }
    var pe = {
        current: null
    }
      , dr = {
        transition: null
    }
      , Ec = {
        ReactCurrentDispatcher: pe,
        ReactCurrentBatchConfig: dr,
        ReactCurrentOwner: zl
    };
    function Zo() {
        throw Error("act(...) is not supported in production builds of React.")
    }
    O.Children = {
        map: cr,
        forEach: function(e, t, n) {
            cr(e, function() {
                t.apply(this, arguments)
            }, n)
        },
        count: function(e) {
            var t = 0;
            return cr(e, function() {
                t++
            }),
            t
        },
        toArray: function(e) {
            return cr(e, function(t) {
                return t
            }) || []
        },
        only: function(e) {
            if (!Tl(e))
                throw Error("React.Children.only expected to receive a single React element child.");
            return e
        }
    },
    O.Component = Ht,
    O.Fragment = ac,
    O.Profiler = dc,
    O.PureComponent = Nl,
    O.StrictMode = cc,
    O.Suspense = mc,
    O.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ec,
    O.act = Zo,
    O.cloneElement = function(e, t, n) {
        if (e == null)
            throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
        var r = Ho({}, e.props)
          , l = e.key
          , i = e.ref
          , o = e._owner;
        if (t != null) {
            if (t.ref !== void 0 && (i = t.ref,
            o = zl.current),
            t.key !== void 0 && (l = "" + t.key),
            e.type && e.type.defaultProps)
                var u = e.type.defaultProps;
            for (s in t)
                Qo.call(t, s) && !Yo.hasOwnProperty(s) && (r[s] = t[s] === void 0 && u !== void 0 ? u[s] : t[s])
        }
        var s = arguments.length - 2;
        if (s === 1)
            r.children = n;
        else if (1 < s) {
            u = Array(s);
            for (var d = 0; d < s; d++)
                u[d] = arguments[d + 2];
            r.children = u
        }
        return {
            $$typeof: wn,
            type: e.type,
            key: l,
            ref: i,
            props: r,
            _owner: o
        }
    }
    ,
    O.createContext = function(e) {
        return e = {
            $$typeof: pc,
            _currentValue: e,
            _currentValue2: e,
            _threadCount: 0,
            Provider: null,
            Consumer: null,
            _defaultValue: null,
            _globalName: null
        },
        e.Provider = {
            $$typeof: fc,
            _context: e
        },
        e.Consumer = e
    }
    ,
    O.createElement = Xo,
    O.createFactory = function(e) {
        var t = Xo.bind(null, e);
        return t.type = e,
        t
    }
    ,
    O.createRef = function() {
        return {
            current: null
        }
    }
    ,
    O.forwardRef = function(e) {
        return {
            $$typeof: hc,
            render: e
        }
    }
    ,
    O.isValidElement = Tl,
    O.lazy = function(e) {
        return {
            $$typeof: yc,
            _payload: {
                _status: -1,
                _result: e
            },
            _init: kc
        }
    }
    ,
    O.memo = function(e, t) {
        return {
            $$typeof: vc,
            type: e,
            compare: t === void 0 ? null : t
        }
    }
    ,
    O.startTransition = function(e) {
        var t = dr.transition;
        dr.transition = {};
        try {
            e()
        } finally {
            dr.transition = t
        }
    }
    ,
    O.unstable_act = Zo,
    O.useCallback = function(e, t) {
        return pe.current.useCallback(e, t)
    }
    ,
    O.useContext = function(e) {
        return pe.current.useContext(e)
    }
    ,
    O.useDebugValue = function() {}
    ,
    O.useDeferredValue = function(e) {
        return pe.current.useDeferredValue(e)
    }
    ,
    O.useEffect = function(e, t) {
        return pe.current.useEffect(e, t)
    }
    ,
    O.useId = function() {
        return pe.current.useId()
    }
    ,
    O.useImperativeHandle = function(e, t, n) {
        return pe.current.useImperativeHandle(e, t, n)
    }
    ,
    O.useInsertionEffect = function(e, t) {
        return pe.current.useInsertionEffect(e, t)
    }
    ,
    O.useLayoutEffect = function(e, t) {
        return pe.current.useLayoutEffect(e, t)
    }
    ,
    O.useMemo = function(e, t) {
        return pe.current.useMemo(e, t)
    }
    ,
    O.useReducer = function(e, t, n) {
        return pe.current.useReducer(e, t, n)
    }
    ,
    O.useRef = function(e) {
        return pe.current.useRef(e)
    }
    ,
    O.useState = function(e) {
        return pe.current.useState(e)
    }
    ,
    O.useSyncExternalStore = function(e, t, n) {
        return pe.current.useSyncExternalStore(e, t, n)
    }
    ,
    O.useTransition = function() {
        return pe.current.useTransition()
    }
    ,
    O.version = "18.3.1",
    it.exports = O;
    var V = it.exports;
    /**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
    var Cc = V
      , xc = Symbol.for("react.element")
      , _c = Symbol.for("react.fragment")
      , Nc = Object.prototype.hasOwnProperty
      , Pc = Cc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner
      , zc = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
    };
    function Jo(e, t, n) {
        var r, l = {}, i = null, o = null;
        n !== void 0 && (i = "" + n),
        t.key !== void 0 && (i = "" + t.key),
        t.ref !== void 0 && (o = t.ref);
        for (r in t)
            Nc.call(t, r) && !zc.hasOwnProperty(r) && (l[r] = t[r]);
        if (e && e.defaultProps)
            for (r in t = e.defaultProps,
            t)
                l[r] === void 0 && (l[r] = t[r]);
        return {
            $$typeof: xc,
            type: e,
            key: i,
            ref: o,
            props: l,
            _owner: Pc.current
        }
    }
    ue.Fragment = _c,
    ue.jsx = Jo,
    ue.jsxs = Jo,
    Te.exports = ue;
    var T = Te.exports
      , qo = {
        exports: {}
    }
      , Ce = {}
      , bo = {
        exports: {}
    }
      , eu = {};
    /**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
    (function(e) {
        function t(C, z) {
            var L = C.length;
            C.push(z);
            e: for (; 0 < L; ) {
                var Z = L - 1 >>> 1
                  , _ = C[Z];
                if (0 < l(_, z))
                    C[Z] = z,
                    C[L] = _,
                    L = Z;
                else
                    break e
            }
        }
        function n(C) {
            return C.length === 0 ? null : C[0]
        }
        function r(C) {
            if (C.length === 0)
                return null;
            var z = C[0]
              , L = C.pop();
            if (L !== z) {
                C[0] = L;
                e: for (var Z = 0, _ = C.length, R = _ >>> 1; Z < R; ) {
                    var M = 2 * (Z + 1) - 1
                      , D = C[M]
                      , K = M + 1
                      , ye = C[K];
                    if (0 > l(D, L))
                        K < _ && 0 > l(ye, D) ? (C[Z] = ye,
                        C[K] = L,
                        Z = K) : (C[Z] = D,
                        C[M] = L,
                        Z = M);
                    else if (K < _ && 0 > l(ye, L))
                        C[Z] = ye,
                        C[K] = L,
                        Z = K;
                    else
                        break e
                }
            }
            return z
        }
        function l(C, z) {
            var L = C.sortIndex - z.sortIndex;
            return L !== 0 ? L : C.id - z.id
        }
        if (typeof performance == "object" && typeof performance.now == "function") {
            var i = performance;
            e.unstable_now = function() {
                return i.now()
            }
        } else {
            var o = Date
              , u = o.now();
            e.unstable_now = function() {
                return o.now() - u
            }
        }
        var s = []
          , d = []
          , m = 1
          , h = null
          , p = 3
          , w = !1
          , k = !1
          , g = !1
          , j = typeof setTimeout == "function" ? setTimeout : null
          , c = typeof clearTimeout == "function" ? clearTimeout : null
          , a = typeof setImmediate < "u" ? setImmediate : null;
        typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
        function f(C) {
            for (var z = n(d); z !== null; ) {
                if (z.callback === null)
                    r(d);
                else if (z.startTime <= C)
                    r(d),
                    z.sortIndex = z.expirationTime,
                    t(s, z);
                else
                    break;
                z = n(d)
            }
        }
        function v(C) {
            if (g = !1,
            f(C),
            !k)
                if (n(s) !== null)
                    k = !0,
                    At(S);
                else {
                    var z = n(d);
                    z !== null && sr(v, z.startTime - C)
                }
        }
        function S(C, z) {
            k = !1,
            g && (g = !1,
            c(P),
            P = -1),
            w = !0;
            var L = p;
            try {
                for (f(z),
                h = n(s); h !== null && (!(h.expirationTime > z) || C && !fe()); ) {
                    var Z = h.callback;
                    if (typeof Z == "function") {
                        h.callback = null,
                        p = h.priorityLevel;
                        var _ = Z(h.expirationTime <= z);
                        z = e.unstable_now(),
                        typeof _ == "function" ? h.callback = _ : h === n(s) && r(s),
                        f(z)
                    } else
                        r(s);
                    h = n(s)
                }
                if (h !== null)
                    var R = !0;
                else {
                    var M = n(d);
                    M !== null && sr(v, M.startTime - z),
                    R = !1
                }
                return R
            } finally {
                h = null,
                p = L,
                w = !1
            }
        }
        var E = !1
          , N = null
          , P = -1
          , H = 5
          , I = -1;
        function fe() {
            return !(e.unstable_now() - I < H)
        }
        function gn() {
            if (N !== null) {
                var C = e.unstable_now();
                I = C;
                var z = !0;
                try {
                    z = N(!0, C)
                } finally {
                    z ? $() : (E = !1,
                    N = null)
                }
            } else
                E = !1
        }
        var $;
        if (typeof a == "function")
            $ = function() {
                a(gn)
            }
            ;
        else if (typeof MessageChannel < "u") {
            var _l = new MessageChannel
              , Nt = _l.port2;
            _l.port1.onmessage = gn,
            $ = function() {
                Nt.postMessage(null)
            }
        } else
            $ = function() {
                j(gn, 0)
            }
            ;
        function At(C) {
            N = C,
            E || (E = !0,
            $())
        }
        function sr(C, z) {
            P = j(function() {
                C(e.unstable_now())
            }, z)
        }
        e.unstable_IdlePriority = 5,
        e.unstable_ImmediatePriority = 1,
        e.unstable_LowPriority = 4,
        e.unstable_NormalPriority = 3,
        e.unstable_Profiling = null,
        e.unstable_UserBlockingPriority = 2,
        e.unstable_cancelCallback = function(C) {
            C.callback = null
        }
        ,
        e.unstable_continueExecution = function() {
            k || w || (k = !0,
            At(S))
        }
        ,
        e.unstable_forceFrameRate = function(C) {
            0 > C || 125 < C ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : H = 0 < C ? Math.floor(1e3 / C) : 5
        }
        ,
        e.unstable_getCurrentPriorityLevel = function() {
            return p
        }
        ,
        e.unstable_getFirstCallbackNode = function() {
            return n(s)
        }
        ,
        e.unstable_next = function(C) {
            switch (p) {
            case 1:
            case 2:
            case 3:
                var z = 3;
                break;
            default:
                z = p
            }
            var L = p;
            p = z;
            try {
                return C()
            } finally {
                p = L
            }
        }
        ,
        e.unstable_pauseExecution = function() {}
        ,
        e.unstable_requestPaint = function() {}
        ,
        e.unstable_runWithPriority = function(C, z) {
            switch (C) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            default:
                C = 3
            }
            var L = p;
            p = C;
            try {
                return z()
            } finally {
                p = L
            }
        }
        ,
        e.unstable_scheduleCallback = function(C, z, L) {
            var Z = e.unstable_now();
            switch (typeof L == "object" && L !== null ? (L = L.delay,
            L = typeof L == "number" && 0 < L ? Z + L : Z) : L = Z,
            C) {
            case 1:
                var _ = -1;
                break;
            case 2:
                _ = 250;
                break;
            case 5:
                _ = 1073741823;
                break;
            case 4:
                _ = 1e4;
                break;
            default:
                _ = 5e3
            }
            return _ = L + _,
            C = {
                id: m++,
                callback: z,
                priorityLevel: C,
                startTime: L,
                expirationTime: _,
                sortIndex: -1
            },
            L > Z ? (C.sortIndex = L,
            t(d, C),
            n(s) === null && C === n(d) && (g ? (c(P),
            P = -1) : g = !0,
            sr(v, L - Z))) : (C.sortIndex = _,
            t(s, C),
            k || w || (k = !0,
            At(S))),
            C
        }
        ,
        e.unstable_shouldYield = fe,
        e.unstable_wrapCallback = function(C) {
            var z = p;
            return function() {
                var L = p;
                p = z;
                try {
                    return C.apply(this, arguments)
                } finally {
                    p = L
                }
            }
        }
    }
    )(eu),
    bo.exports = eu;
    var Tc = bo.exports;
    /**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
    var Lc = V
      , xe = Tc;
    function y(e) {
        for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++)
            t += "&args[]=" + encodeURIComponent(arguments[n]);
        return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    }
    var tu = new Set
      , Sn = {};
    function Pt(e, t) {
        Bt(e, t),
        Bt(e + "Capture", t)
    }
    function Bt(e, t) {
        for (Sn[e] = t,
        e = 0; e < t.length; e++)
            tu.add(t[e])
    }
    var Ge = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u")
      , Il = Object.prototype.hasOwnProperty
      , Ic = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/
      , nu = {}
      , ru = {};
    function Oc(e) {
        return Il.call(ru, e) ? !0 : Il.call(nu, e) ? !1 : Ic.test(e) ? ru[e] = !0 : (nu[e] = !0,
        !1)
    }
    function Rc(e, t, n, r) {
        if (n !== null && n.type === 0)
            return !1;
        switch (typeof t) {
        case "function":
        case "symbol":
            return !0;
        case "boolean":
            return r ? !1 : n !== null ? !n.acceptsBooleans : (e = e.toLowerCase().slice(0, 5),
            e !== "data-" && e !== "aria-");
        default:
            return !1
        }
    }
    function Mc(e, t, n, r) {
        if (t === null || typeof t > "u" || Rc(e, t, n, r))
            return !0;
        if (r)
            return !1;
        if (n !== null)
            switch (n.type) {
            case 3:
                return !t;
            case 4:
                return t === !1;
            case 5:
                return isNaN(t);
            case 6:
                return isNaN(t) || 1 > t
            }
        return !1
    }
    function he(e, t, n, r, l, i, o) {
        this.acceptsBooleans = t === 2 || t === 3 || t === 4,
        this.attributeName = r,
        this.attributeNamespace = l,
        this.mustUseProperty = n,
        this.propertyName = e,
        this.type = t,
        this.sanitizeURL = i,
        this.removeEmptyString = o
    }
    var le = {};
    "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
        le[e] = new he(e,0,!1,e,null,!1,!1)
    }),
    [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
        var t = e[0];
        le[t] = new he(t,1,!1,e[1],null,!1,!1)
    }),
    ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
        le[e] = new he(e,2,!1,e.toLowerCase(),null,!1,!1)
    }),
    ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
        le[e] = new he(e,2,!1,e,null,!1,!1)
    }),
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
        le[e] = new he(e,3,!1,e.toLowerCase(),null,!1,!1)
    }),
    ["checked", "multiple", "muted", "selected"].forEach(function(e) {
        le[e] = new he(e,3,!0,e,null,!1,!1)
    }),
    ["capture", "download"].forEach(function(e) {
        le[e] = new he(e,4,!1,e,null,!1,!1)
    }),
    ["cols", "rows", "size", "span"].forEach(function(e) {
        le[e] = new he(e,6,!1,e,null,!1,!1)
    }),
    ["rowSpan", "start"].forEach(function(e) {
        le[e] = new he(e,5,!1,e.toLowerCase(),null,!1,!1)
    });
    var Ol = /[\-:]([a-z])/g;
    function Rl(e) {
        return e[1].toUpperCase()
    }
    "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
        var t = e.replace(Ol, Rl);
        le[t] = new he(t,1,!1,e,null,!1,!1)
    }),
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
        var t = e.replace(Ol, Rl);
        le[t] = new he(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)
    }),
    ["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
        var t = e.replace(Ol, Rl);
        le[t] = new he(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)
    }),
    ["tabIndex", "crossOrigin"].forEach(function(e) {
        le[e] = new he(e,1,!1,e.toLowerCase(),null,!1,!1)
    }),
    le.xlinkHref = new he("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),
    ["src", "href", "action", "formAction"].forEach(function(e) {
        le[e] = new he(e,1,!1,e.toLowerCase(),null,!0,!0)
    });
    function Ml(e, t, n, r) {
        var l = le.hasOwnProperty(t) ? le[t] : null;
        (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (Mc(t, n, l, r) && (n = null),
        r || l === null ? Oc(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName,
        r = l.attributeNamespace,
        n === null ? e.removeAttribute(t) : (l = l.type,
        n = l === 3 || l === 4 && n === !0 ? "" : "" + n,
        r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))))
    }
    var Ze = Lc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
      , fr = Symbol.for("react.element")
      , Wt = Symbol.for("react.portal")
      , Kt = Symbol.for("react.fragment")
      , Dl = Symbol.for("react.strict_mode")
      , Fl = Symbol.for("react.profiler")
      , lu = Symbol.for("react.provider")
      , iu = Symbol.for("react.context")
      , jl = Symbol.for("react.forward_ref")
      , $l = Symbol.for("react.suspense")
      , Ul = Symbol.for("react.suspense_list")
      , Vl = Symbol.for("react.memo")
      , ot = Symbol.for("react.lazy")
      , ou = Symbol.for("react.offscreen")
      , uu = Symbol.iterator;
    function kn(e) {
        return e === null || typeof e != "object" ? null : (e = uu && e[uu] || e["@@iterator"],
        typeof e == "function" ? e : null)
    }
    var Y = Object.assign, Al;
    function En(e) {
        if (Al === void 0)
            try {
                throw Error()
            } catch (n) {
                var t = n.stack.trim().match(/\n( *(at )?)/);
                Al = t && t[1] || ""
            }
        return `
` + Al + e
    }
    var Hl = !1;
    function Bl(e, t) {
        if (!e || Hl)
            return "";
        Hl = !0;
        var n = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        try {
            if (t)
                if (t = function() {
                    throw Error()
                }
                ,
                Object.defineProperty(t.prototype, "props", {
                    set: function() {
                        throw Error()
                    }
                }),
                typeof Reflect == "object" && Reflect.construct) {
                    try {
                        Reflect.construct(t, [])
                    } catch (d) {
                        var r = d
                    }
                    Reflect.construct(e, [], t)
                } else {
                    try {
                        t.call()
                    } catch (d) {
                        r = d
                    }
                    e.call(t.prototype)
                }
            else {
                try {
                    throw Error()
                } catch (d) {
                    r = d
                }
                e()
            }
        } catch (d) {
            if (d && r && typeof d.stack == "string") {
                for (var l = d.stack.split(`
`), i = r.stack.split(`
`), o = l.length - 1, u = i.length - 1; 1 <= o && 0 <= u && l[o] !== i[u]; )
                    u--;
                for (; 1 <= o && 0 <= u; o--,
                u--)
                    if (l[o] !== i[u]) {
                        if (o !== 1 || u !== 1)
                            do
                                if (o--,
                                u--,
                                0 > u || l[o] !== i[u]) {
                                    var s = `
` + l[o].replace(" at new ", " at ");
                                    return e.displayName && s.includes("<anonymous>") && (s = s.replace("<anonymous>", e.displayName)),
                                    s
                                }
                            while (1 <= o && 0 <= u);
                        break
                    }
            }
        } finally {
            Hl = !1,
            Error.prepareStackTrace = n
        }
        return (e = e ? e.displayName || e.name : "") ? En(e) : ""
    }
    function Dc(e) {
        switch (e.tag) {
        case 5:
            return En(e.type);
        case 16:
            return En("Lazy");
        case 13:
            return En("Suspense");
        case 19:
            return En("SuspenseList");
        case 0:
        case 2:
        case 15:
            return e = Bl(e.type, !1),
            e;
        case 11:
            return e = Bl(e.type.render, !1),
            e;
        case 1:
            return e = Bl(e.type, !0),
            e;
        default:
            return ""
        }
    }
    function Wl(e) {
        if (e == null)
            return null;
        if (typeof e == "function")
            return e.displayName || e.name || null;
        if (typeof e == "string")
            return e;
        switch (e) {
        case Kt:
            return "Fragment";
        case Wt:
            return "Portal";
        case Fl:
            return "Profiler";
        case Dl:
            return "StrictMode";
        case $l:
            return "Suspense";
        case Ul:
            return "SuspenseList"
        }
        if (typeof e == "object")
            switch (e.$$typeof) {
            case iu:
                return (e.displayName || "Context") + ".Consumer";
            case lu:
                return (e._context.displayName || "Context") + ".Provider";
            case jl:
                var t = e.render;
                return e = e.displayName,
                e || (e = t.displayName || t.name || "",
                e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"),
                e;
            case Vl:
                return t = e.displayName || null,
                t !== null ? t : Wl(e.type) || "Memo";
            case ot:
                t = e._payload,
                e = e._init;
                try {
                    return Wl(e(t))
                } catch {}
            }
        return null
    }
    function Fc(e) {
        var t = e.type;
        switch (e.tag) {
        case 24:
            return "Cache";
        case 9:
            return (t.displayName || "Context") + ".Consumer";
        case 10:
            return (t._context.displayName || "Context") + ".Provider";
        case 18:
            return "DehydratedFragment";
        case 11:
            return e = t.render,
            e = e.displayName || e.name || "",
            t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
        case 7:
            return "Fragment";
        case 5:
            return t;
        case 4:
            return "Portal";
        case 3:
            return "Root";
        case 6:
            return "Text";
        case 16:
            return Wl(t);
        case 8:
            return t === Dl ? "StrictMode" : "Mode";
        case 22:
            return "Offscreen";
        case 12:
            return "Profiler";
        case 21:
            return "Scope";
        case 13:
            return "Suspense";
        case 19:
            return "SuspenseList";
        case 25:
            return "TracingMarker";
        case 1:
        case 0:
        case 17:
        case 2:
        case 14:
        case 15:
            if (typeof t == "function")
                return t.displayName || t.name || null;
            if (typeof t == "string")
                return t
        }
        return null
    }
    function ut(e) {
        switch (typeof e) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
            return e;
        case "object":
            return e;
        default:
            return ""
        }
    }
    function su(e) {
        var t = e.type;
        return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio")
    }
    function jc(e) {
        var t = su(e) ? "checked" : "value"
          , n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t)
          , r = "" + e[t];
        if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
            var l = n.get
              , i = n.set;
            return Object.defineProperty(e, t, {
                configurable: !0,
                get: function() {
                    return l.call(this)
                },
                set: function(o) {
                    r = "" + o,
                    i.call(this, o)
                }
            }),
            Object.defineProperty(e, t, {
                enumerable: n.enumerable
            }),
            {
                getValue: function() {
                    return r
                },
                setValue: function(o) {
                    r = "" + o
                },
                stopTracking: function() {
                    e._valueTracker = null,
                    delete e[t]
                }
            }
        }
    }
    function pr(e) {
        e._valueTracker || (e._valueTracker = jc(e))
    }
    function au(e) {
        if (!e)
            return !1;
        var t = e._valueTracker;
        if (!t)
            return !0;
        var n = t.getValue()
          , r = "";
        return e && (r = su(e) ? e.checked ? "true" : "false" : e.value),
        e = r,
        e !== n ? (t.setValue(e),
        !0) : !1
    }
    function hr(e) {
        if (e = e || (typeof document < "u" ? document : void 0),
        typeof e > "u")
            return null;
        try {
            return e.activeElement || e.body
        } catch {
            return e.body
        }
    }
    function Kl(e, t) {
        var n = t.checked;
        return Y({}, t, {
            defaultChecked: void 0,
            defaultValue: void 0,
            value: void 0,
            checked: n ?? e._wrapperState.initialChecked
        })
    }
    function cu(e, t) {
        var n = t.defaultValue == null ? "" : t.defaultValue
          , r = t.checked != null ? t.checked : t.defaultChecked;
        n = ut(t.value != null ? t.value : n),
        e._wrapperState = {
            initialChecked: r,
            initialValue: n,
            controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null
        }
    }
    function du(e, t) {
        t = t.checked,
        t != null && Ml(e, "checked", t, !1)
    }
    function Ql(e, t) {
        du(e, t);
        var n = ut(t.value)
          , r = t.type;
        if (n != null)
            r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
        else if (r === "submit" || r === "reset") {
            e.removeAttribute("value");
            return
        }
        t.hasOwnProperty("value") ? Yl(e, t.type, n) : t.hasOwnProperty("defaultValue") && Yl(e, t.type, ut(t.defaultValue)),
        t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked)
    }
    function fu(e, t, n) {
        if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
            var r = t.type;
            if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null))
                return;
            t = "" + e._wrapperState.initialValue,
            n || t === e.value || (e.value = t),
            e.defaultValue = t
        }
        n = e.name,
        n !== "" && (e.name = ""),
        e.defaultChecked = !!e._wrapperState.initialChecked,
        n !== "" && (e.name = n)
    }
    function Yl(e, t, n) {
        (t !== "number" || hr(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n))
    }
    var Cn = Array.isArray;
    function Qt(e, t, n, r) {
        if (e = e.options,
        t) {
            t = {};
            for (var l = 0; l < n.length; l++)
                t["$" + n[l]] = !0;
            for (n = 0; n < e.length; n++)
                l = t.hasOwnProperty("$" + e[n].value),
                e[n].selected !== l && (e[n].selected = l),
                l && r && (e[n].defaultSelected = !0)
        } else {
            for (n = "" + ut(n),
            t = null,
            l = 0; l < e.length; l++) {
                if (e[l].value === n) {
                    e[l].selected = !0,
                    r && (e[l].defaultSelected = !0);
                    return
                }
                t !== null || e[l].disabled || (t = e[l])
            }
            t !== null && (t.selected = !0)
        }
    }
    function Xl(e, t) {
        if (t.dangerouslySetInnerHTML != null)
            throw Error(y(91));
        return Y({}, t, {
            value: void 0,
            defaultValue: void 0,
            children: "" + e._wrapperState.initialValue
        })
    }
    function pu(e, t) {
        var n = t.value;
        if (n == null) {
            if (n = t.children,
            t = t.defaultValue,
            n != null) {
                if (t != null)
                    throw Error(y(92));
                if (Cn(n)) {
                    if (1 < n.length)
                        throw Error(y(93));
                    n = n[0]
                }
                t = n
            }
            t == null && (t = ""),
            n = t
        }
        e._wrapperState = {
            initialValue: ut(n)
        }
    }
    function hu(e, t) {
        var n = ut(t.value)
          , r = ut(t.defaultValue);
        n != null && (n = "" + n,
        n !== e.value && (e.value = n),
        t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
        r != null && (e.defaultValue = "" + r)
    }
    function mu(e) {
        var t = e.textContent;
        t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t)
    }
    function vu(e) {
        switch (e) {
        case "svg":
            return "http://www.w3.org/2000/svg";
        case "math":
            return "http://www.w3.org/1998/Math/MathML";
        default:
            return "http://www.w3.org/1999/xhtml"
        }
    }
    function Gl(e, t) {
        return e == null || e === "http://www.w3.org/1999/xhtml" ? vu(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e
    }
    var mr, yu = function(e) {
        return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
            MSApp.execUnsafeLocalFunction(function() {
                return e(t, n, r, l)
            })
        }
        : e
    }(function(e, t) {
        if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML"in e)
            e.innerHTML = t;
        else {
            for (mr = mr || document.createElement("div"),
            mr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
            t = mr.firstChild; e.firstChild; )
                e.removeChild(e.firstChild);
            for (; t.firstChild; )
                e.appendChild(t.firstChild)
        }
    });
    function xn(e, t) {
        if (t) {
            var n = e.firstChild;
            if (n && n === e.lastChild && n.nodeType === 3) {
                n.nodeValue = t;
                return
            }
        }
        e.textContent = t
    }
    var _n = {
        animationIterationCount: !0,
        aspectRatio: !0,
        borderImageOutset: !0,
        borderImageSlice: !0,
        borderImageWidth: !0,
        boxFlex: !0,
        boxFlexGroup: !0,
        boxOrdinalGroup: !0,
        columnCount: !0,
        columns: !0,
        flex: !0,
        flexGrow: !0,
        flexPositive: !0,
        flexShrink: !0,
        flexNegative: !0,
        flexOrder: !0,
        gridArea: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowSpan: !0,
        gridRowStart: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnSpan: !0,
        gridColumnStart: !0,
        fontWeight: !0,
        lineClamp: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        tabSize: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
        fillOpacity: !0,
        floodOpacity: !0,
        stopOpacity: !0,
        strokeDasharray: !0,
        strokeDashoffset: !0,
        strokeMiterlimit: !0,
        strokeOpacity: !0,
        strokeWidth: !0
    }
      , $c = ["Webkit", "ms", "Moz", "O"];
    Object.keys(_n).forEach(function(e) {
        $c.forEach(function(t) {
            t = t + e.charAt(0).toUpperCase() + e.substring(1),
            _n[t] = _n[e]
        })
    });
    function gu(e, t, n) {
        return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || _n.hasOwnProperty(e) && _n[e] ? ("" + t).trim() : t + "px"
    }
    function wu(e, t) {
        e = e.style;
        for (var n in t)
            if (t.hasOwnProperty(n)) {
                var r = n.indexOf("--") === 0
                  , l = gu(n, t[n], r);
                n === "float" && (n = "cssFloat"),
                r ? e.setProperty(n, l) : e[n] = l
            }
    }
    var Uc = Y({
        menuitem: !0
    }, {
        area: !0,
        base: !0,
        br: !0,
        col: !0,
        embed: !0,
        hr: !0,
        img: !0,
        input: !0,
        keygen: !0,
        link: !0,
        meta: !0,
        param: !0,
        source: !0,
        track: !0,
        wbr: !0
    });
    function Zl(e, t) {
        if (t) {
            if (Uc[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
                throw Error(y(137, e));
            if (t.dangerouslySetInnerHTML != null) {
                if (t.children != null)
                    throw Error(y(60));
                if (typeof t.dangerouslySetInnerHTML != "object" || !("__html"in t.dangerouslySetInnerHTML))
                    throw Error(y(61))
            }
            if (t.style != null && typeof t.style != "object")
                throw Error(y(62))
        }
    }
    function Jl(e, t) {
        if (e.indexOf("-") === -1)
            return typeof t.is == "string";
        switch (e) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
            return !1;
        default:
            return !0
        }
    }
    var ql = null;
    function bl(e) {
        return e = e.target || e.srcElement || window,
        e.correspondingUseElement && (e = e.correspondingUseElement),
        e.nodeType === 3 ? e.parentNode : e
    }
    var ei = null
      , Yt = null
      , Xt = null;
    function Su(e) {
        if (e = Yn(e)) {
            if (typeof ei != "function")
                throw Error(y(280));
            var t = e.stateNode;
            t && (t = $r(t),
            ei(e.stateNode, e.type, t))
        }
    }
    function ku(e) {
        Yt ? Xt ? Xt.push(e) : Xt = [e] : Yt = e
    }
    function Eu() {
        if (Yt) {
            var e = Yt
              , t = Xt;
            if (Xt = Yt = null,
            Su(e),
            t)
                for (e = 0; e < t.length; e++)
                    Su(t[e])
        }
    }
    function Cu(e, t) {
        return e(t)
    }
    function xu() {}
    var ti = !1;
    function _u(e, t, n) {
        if (ti)
            return e(t, n);
        ti = !0;
        try {
            return Cu(e, t, n)
        } finally {
            ti = !1,
            (Yt !== null || Xt !== null) && (xu(),
            Eu())
        }
    }
    function Nn(e, t) {
        var n = e.stateNode;
        if (n === null)
            return null;
        var r = $r(n);
        if (r === null)
            return null;
        n = r[t];
        e: switch (t) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
            (r = !r.disabled) || (e = e.type,
            r = !(e === "button" || e === "input" || e === "select" || e === "textarea")),
            e = !r;
            break e;
        default:
            e = !1
        }
        if (e)
            return null;
        if (n && typeof n != "function")
            throw Error(y(231, t, typeof n));
        return n
    }
    var ni = !1;
    if (Ge)
        try {
            var Pn = {};
            Object.defineProperty(Pn, "passive", {
                get: function() {
                    ni = !0
                }
            }),
            window.addEventListener("test", Pn, Pn),
            window.removeEventListener("test", Pn, Pn)
        } catch {
            ni = !1
        }
    function Vc(e, t, n, r, l, i, o, u, s) {
        var d = Array.prototype.slice.call(arguments, 3);
        try {
            t.apply(n, d)
        } catch (m) {
            this.onError(m)
        }
    }
    var zn = !1
      , vr = null
      , yr = !1
      , ri = null
      , Ac = {
        onError: function(e) {
            zn = !0,
            vr = e
        }
    };
    function Hc(e, t, n, r, l, i, o, u, s) {
        zn = !1,
        vr = null,
        Vc.apply(Ac, arguments)
    }
    function Bc(e, t, n, r, l, i, o, u, s) {
        if (Hc.apply(this, arguments),
        zn) {
            if (zn) {
                var d = vr;
                zn = !1,
                vr = null
            } else
                throw Error(y(198));
            yr || (yr = !0,
            ri = d)
        }
    }
    function zt(e) {
        var t = e
          , n = e;
        if (e.alternate)
            for (; t.return; )
                t = t.return;
        else {
            e = t;
            do
                t = e,
                t.flags & 4098 && (n = t.return),
                e = t.return;
            while (e)
        }
        return t.tag === 3 ? n : null
    }
    function Nu(e) {
        if (e.tag === 13) {
            var t = e.memoizedState;
            if (t === null && (e = e.alternate,
            e !== null && (t = e.memoizedState)),
            t !== null)
                return t.dehydrated
        }
        return null
    }
    function Pu(e) {
        if (zt(e) !== e)
            throw Error(y(188))
    }
    function Wc(e) {
        var t = e.alternate;
        if (!t) {
            if (t = zt(e),
            t === null)
                throw Error(y(188));
            return t !== e ? null : e
        }
        for (var n = e, r = t; ; ) {
            var l = n.return;
            if (l === null)
                break;
            var i = l.alternate;
            if (i === null) {
                if (r = l.return,
                r !== null) {
                    n = r;
                    continue
                }
                break
            }
            if (l.child === i.child) {
                for (i = l.child; i; ) {
                    if (i === n)
                        return Pu(l),
                        e;
                    if (i === r)
                        return Pu(l),
                        t;
                    i = i.sibling
                }
                throw Error(y(188))
            }
            if (n.return !== r.return)
                n = l,
                r = i;
            else {
                for (var o = !1, u = l.child; u; ) {
                    if (u === n) {
                        o = !0,
                        n = l,
                        r = i;
                        break
                    }
                    if (u === r) {
                        o = !0,
                        r = l,
                        n = i;
                        break
                    }
                    u = u.sibling
                }
                if (!o) {
                    for (u = i.child; u; ) {
                        if (u === n) {
                            o = !0,
                            n = i,
                            r = l;
                            break
                        }
                        if (u === r) {
                            o = !0,
                            r = i,
                            n = l;
                            break
                        }
                        u = u.sibling
                    }
                    if (!o)
                        throw Error(y(189))
                }
            }
            if (n.alternate !== r)
                throw Error(y(190))
        }
        if (n.tag !== 3)
            throw Error(y(188));
        return n.stateNode.current === n ? e : t
    }
    function zu(e) {
        return e = Wc(e),
        e !== null ? Tu(e) : null
    }
    function Tu(e) {
        if (e.tag === 5 || e.tag === 6)
            return e;
        for (e = e.child; e !== null; ) {
            var t = Tu(e);
            if (t !== null)
                return t;
            e = e.sibling
        }
        return null
    }
    var Lu = xe.unstable_scheduleCallback
      , Iu = xe.unstable_cancelCallback
      , Kc = xe.unstable_shouldYield
      , Qc = xe.unstable_requestPaint
      , q = xe.unstable_now
      , Yc = xe.unstable_getCurrentPriorityLevel
      , li = xe.unstable_ImmediatePriority
      , Ou = xe.unstable_UserBlockingPriority
      , gr = xe.unstable_NormalPriority
      , Xc = xe.unstable_LowPriority
      , Ru = xe.unstable_IdlePriority
      , wr = null
      , We = null;
    function Gc(e) {
        if (We && typeof We.onCommitFiberRoot == "function")
            try {
                We.onCommitFiberRoot(wr, e, void 0, (e.current.flags & 128) === 128)
            } catch {}
    }
    var Fe = Math.clz32 ? Math.clz32 : qc
      , Zc = Math.log
      , Jc = Math.LN2;
    function qc(e) {
        return e >>>= 0,
        e === 0 ? 32 : 31 - (Zc(e) / Jc | 0) | 0
    }
    var Sr = 64
      , kr = 4194304;
    function Tn(e) {
        switch (e & -e) {
        case 1:
            return 1;
        case 2:
            return 2;
        case 4:
            return 4;
        case 8:
            return 8;
        case 16:
            return 16;
        case 32:
            return 32;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
            return e & 4194240;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
            return e & 130023424;
        case 134217728:
            return 134217728;
        case 268435456:
            return 268435456;
        case 536870912:
            return 536870912;
        case 1073741824:
            return 1073741824;
        default:
            return e
        }
    }
    function Er(e, t) {
        var n = e.pendingLanes;
        if (n === 0)
            return 0;
        var r = 0
          , l = e.suspendedLanes
          , i = e.pingedLanes
          , o = n & 268435455;
        if (o !== 0) {
            var u = o & ~l;
            u !== 0 ? r = Tn(u) : (i &= o,
            i !== 0 && (r = Tn(i)))
        } else
            o = n & ~l,
            o !== 0 ? r = Tn(o) : i !== 0 && (r = Tn(i));
        if (r === 0)
            return 0;
        if (t !== 0 && t !== r && !(t & l) && (l = r & -r,
        i = t & -t,
        l >= i || l === 16 && (i & 4194240) !== 0))
            return t;
        if (r & 4 && (r |= n & 16),
        t = e.entangledLanes,
        t !== 0)
            for (e = e.entanglements,
            t &= r; 0 < t; )
                n = 31 - Fe(t),
                l = 1 << n,
                r |= e[n],
                t &= ~l;
        return r
    }
    function bc(e, t) {
        switch (e) {
        case 1:
        case 2:
        case 4:
            return t + 250;
        case 8:
        case 16:
        case 32:
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
            return t + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
            return -1;
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
            return -1;
        default:
            return -1
        }
    }
    function ed(e, t) {
        for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, i = e.pendingLanes; 0 < i; ) {
            var o = 31 - Fe(i)
              , u = 1 << o
              , s = l[o];
            s === -1 ? (!(u & n) || u & r) && (l[o] = bc(u, t)) : s <= t && (e.expiredLanes |= u),
            i &= ~u
        }
    }
    function ii(e) {
        return e = e.pendingLanes & -1073741825,
        e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
    }
    function Mu() {
        var e = Sr;
        return Sr <<= 1,
        !(Sr & 4194240) && (Sr = 64),
        e
    }
    function oi(e) {
        for (var t = [], n = 0; 31 > n; n++)
            t.push(e);
        return t
    }
    function Ln(e, t, n) {
        e.pendingLanes |= t,
        t !== 536870912 && (e.suspendedLanes = 0,
        e.pingedLanes = 0),
        e = e.eventTimes,
        t = 31 - Fe(t),
        e[t] = n
    }
    function td(e, t) {
        var n = e.pendingLanes & ~t;
        e.pendingLanes = t,
        e.suspendedLanes = 0,
        e.pingedLanes = 0,
        e.expiredLanes &= t,
        e.mutableReadLanes &= t,
        e.entangledLanes &= t,
        t = e.entanglements;
        var r = e.eventTimes;
        for (e = e.expirationTimes; 0 < n; ) {
            var l = 31 - Fe(n)
              , i = 1 << l;
            t[l] = 0,
            r[l] = -1,
            e[l] = -1,
            n &= ~i
        }
    }
    function ui(e, t) {
        var n = e.entangledLanes |= t;
        for (e = e.entanglements; n; ) {
            var r = 31 - Fe(n)
              , l = 1 << r;
            l & t | e[r] & t && (e[r] |= t),
            n &= ~l
        }
    }
    var U = 0;
    function Du(e) {
        return e &= -e,
        1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1
    }
    var Fu, si, ju, $u, Uu, ai = !1, Cr = [], st = null, at = null, ct = null, In = new Map, On = new Map, dt = [], nd = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
    function Vu(e, t) {
        switch (e) {
        case "focusin":
        case "focusout":
            st = null;
            break;
        case "dragenter":
        case "dragleave":
            at = null;
            break;
        case "mouseover":
        case "mouseout":
            ct = null;
            break;
        case "pointerover":
        case "pointerout":
            In.delete(t.pointerId);
            break;
        case "gotpointercapture":
        case "lostpointercapture":
            On.delete(t.pointerId)
        }
    }
    function Rn(e, t, n, r, l, i) {
        return e === null || e.nativeEvent !== i ? (e = {
            blockedOn: t,
            domEventName: n,
            eventSystemFlags: r,
            nativeEvent: i,
            targetContainers: [l]
        },
        t !== null && (t = Yn(t),
        t !== null && si(t)),
        e) : (e.eventSystemFlags |= r,
        t = e.targetContainers,
        l !== null && t.indexOf(l) === -1 && t.push(l),
        e)
    }
    function rd(e, t, n, r, l) {
        switch (t) {
        case "focusin":
            return st = Rn(st, e, t, n, r, l),
            !0;
        case "dragenter":
            return at = Rn(at, e, t, n, r, l),
            !0;
        case "mouseover":
            return ct = Rn(ct, e, t, n, r, l),
            !0;
        case "pointerover":
            var i = l.pointerId;
            return In.set(i, Rn(In.get(i) || null, e, t, n, r, l)),
            !0;
        case "gotpointercapture":
            return i = l.pointerId,
            On.set(i, Rn(On.get(i) || null, e, t, n, r, l)),
            !0
        }
        return !1
    }
    function Au(e) {
        var t = Tt(e.target);
        if (t !== null) {
            var n = zt(t);
            if (n !== null) {
                if (t = n.tag,
                t === 13) {
                    if (t = Nu(n),
                    t !== null) {
                        e.blockedOn = t,
                        Uu(e.priority, function() {
                            ju(n)
                        });
                        return
                    }
                } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
                    e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
                    return
                }
            }
        }
        e.blockedOn = null
    }
    function xr(e) {
        if (e.blockedOn !== null)
            return !1;
        for (var t = e.targetContainers; 0 < t.length; ) {
            var n = di(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
            if (n === null) {
                n = e.nativeEvent;
                var r = new n.constructor(n.type,n);
                ql = r,
                n.target.dispatchEvent(r),
                ql = null
            } else
                return t = Yn(n),
                t !== null && si(t),
                e.blockedOn = n,
                !1;
            t.shift()
        }
        return !0
    }
    function Hu(e, t, n) {
        xr(e) && n.delete(t)
    }
    function ld() {
        ai = !1,
        st !== null && xr(st) && (st = null),
        at !== null && xr(at) && (at = null),
        ct !== null && xr(ct) && (ct = null),
        In.forEach(Hu),
        On.forEach(Hu)
    }
    function Mn(e, t) {
        e.blockedOn === t && (e.blockedOn = null,
        ai || (ai = !0,
        xe.unstable_scheduleCallback(xe.unstable_NormalPriority, ld)))
    }
    function Dn(e) {
        function t(l) {
            return Mn(l, e)
        }
        if (0 < Cr.length) {
            Mn(Cr[0], e);
            for (var n = 1; n < Cr.length; n++) {
                var r = Cr[n];
                r.blockedOn === e && (r.blockedOn = null)
            }
        }
        for (st !== null && Mn(st, e),
        at !== null && Mn(at, e),
        ct !== null && Mn(ct, e),
        In.forEach(t),
        On.forEach(t),
        n = 0; n < dt.length; n++)
            r = dt[n],
            r.blockedOn === e && (r.blockedOn = null);
        for (; 0 < dt.length && (n = dt[0],
        n.blockedOn === null); )
            Au(n),
            n.blockedOn === null && dt.shift()
    }
    var Gt = Ze.ReactCurrentBatchConfig
      , _r = !0;
    function id(e, t, n, r) {
        var l = U
          , i = Gt.transition;
        Gt.transition = null;
        try {
            U = 1,
            ci(e, t, n, r)
        } finally {
            U = l,
            Gt.transition = i
        }
    }
    function od(e, t, n, r) {
        var l = U
          , i = Gt.transition;
        Gt.transition = null;
        try {
            U = 4,
            ci(e, t, n, r)
        } finally {
            U = l,
            Gt.transition = i
        }
    }
    function ci(e, t, n, r) {
        if (_r) {
            var l = di(e, t, n, r);
            if (l === null)
                zi(e, t, r, Nr, n),
                Vu(e, r);
            else if (rd(l, e, t, n, r))
                r.stopPropagation();
            else if (Vu(e, r),
            t & 4 && -1 < nd.indexOf(e)) {
                for (; l !== null; ) {
                    var i = Yn(l);
                    if (i !== null && Fu(i),
                    i = di(e, t, n, r),
                    i === null && zi(e, t, r, Nr, n),
                    i === l)
                        break;
                    l = i
                }
                l !== null && r.stopPropagation()
            } else
                zi(e, t, r, null, n)
        }
    }
    var Nr = null;
    function di(e, t, n, r) {
        if (Nr = null,
        e = bl(r),
        e = Tt(e),
        e !== null)
            if (t = zt(e),
            t === null)
                e = null;
            else if (n = t.tag,
            n === 13) {
                if (e = Nu(t),
                e !== null)
                    return e;
                e = null
            } else if (n === 3) {
                if (t.stateNode.current.memoizedState.isDehydrated)
                    return t.tag === 3 ? t.stateNode.containerInfo : null;
                e = null
            } else
                t !== e && (e = null);
        return Nr = e,
        null
    }
    function Bu(e) {
        switch (e) {
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
            return 1;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "toggle":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
            return 4;
        case "message":
            switch (Yc()) {
            case li:
                return 1;
            case Ou:
                return 4;
            case gr:
            case Xc:
                return 16;
            case Ru:
                return 536870912;
            default:
                return 16
            }
        default:
            return 16
        }
    }
    var ft = null
      , fi = null
      , Pr = null;
    function Wu() {
        if (Pr)
            return Pr;
        var e, t = fi, n = t.length, r, l = "value"in ft ? ft.value : ft.textContent, i = l.length;
        for (e = 0; e < n && t[e] === l[e]; e++)
            ;
        var o = n - e;
        for (r = 1; r <= o && t[n - r] === l[i - r]; r++)
            ;
        return Pr = l.slice(e, 1 < r ? 1 - r : void 0)
    }
    function zr(e) {
        var t = e.keyCode;
        return "charCode"in e ? (e = e.charCode,
        e === 0 && t === 13 && (e = 13)) : e = t,
        e === 10 && (e = 13),
        32 <= e || e === 13 ? e : 0
    }
    function Tr() {
        return !0
    }
    function Ku() {
        return !1
    }
    function _e(e) {
        function t(n, r, l, i, o) {
            this._reactName = n,
            this._targetInst = l,
            this.type = r,
            this.nativeEvent = i,
            this.target = o,
            this.currentTarget = null;
            for (var u in e)
                e.hasOwnProperty(u) && (n = e[u],
                this[u] = n ? n(i) : i[u]);
            return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? Tr : Ku,
            this.isPropagationStopped = Ku,
            this
        }
        return Y(t.prototype, {
            preventDefault: function() {
                this.defaultPrevented = !0;
                var n = this.nativeEvent;
                n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1),
                this.isDefaultPrevented = Tr)
            },
            stopPropagation: function() {
                var n = this.nativeEvent;
                n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
                this.isPropagationStopped = Tr)
            },
            persist: function() {},
            isPersistent: Tr
        }),
        t
    }
    var Zt = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function(e) {
            return e.timeStamp || Date.now()
        },
        defaultPrevented: 0,
        isTrusted: 0
    }, pi = _e(Zt), Fn = Y({}, Zt, {
        view: 0,
        detail: 0
    }), ud = _e(Fn), hi, mi, jn, Lr = Y({}, Fn, {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        getModifierState: yi,
        button: 0,
        buttons: 0,
        relatedTarget: function(e) {
            return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget
        },
        movementX: function(e) {
            return "movementX"in e ? e.movementX : (e !== jn && (jn && e.type === "mousemove" ? (hi = e.screenX - jn.screenX,
            mi = e.screenY - jn.screenY) : mi = hi = 0,
            jn = e),
            hi)
        },
        movementY: function(e) {
            return "movementY"in e ? e.movementY : mi
        }
    }), Qu = _e(Lr), sd = Y({}, Lr, {
        dataTransfer: 0
    }), ad = _e(sd), cd = Y({}, Fn, {
        relatedTarget: 0
    }), vi = _e(cd), dd = Y({}, Zt, {
        animationName: 0,
        elapsedTime: 0,
        pseudoElement: 0
    }), fd = _e(dd), pd = Y({}, Zt, {
        clipboardData: function(e) {
            return "clipboardData"in e ? e.clipboardData : window.clipboardData
        }
    }), hd = _e(pd), md = Y({}, Zt, {
        data: 0
    }), Yu = _e(md), vd = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified"
    }, yd = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta"
    }, gd = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey"
    };
    function wd(e) {
        var t = this.nativeEvent;
        return t.getModifierState ? t.getModifierState(e) : (e = gd[e]) ? !!t[e] : !1
    }
    function yi() {
        return wd
    }
    var Sd = Y({}, Fn, {
        key: function(e) {
            if (e.key) {
                var t = vd[e.key] || e.key;
                if (t !== "Unidentified")
                    return t
            }
            return e.type === "keypress" ? (e = zr(e),
            e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? yd[e.keyCode] || "Unidentified" : ""
        },
        code: 0,
        location: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        repeat: 0,
        locale: 0,
        getModifierState: yi,
        charCode: function(e) {
            return e.type === "keypress" ? zr(e) : 0
        },
        keyCode: function(e) {
            return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
        },
        which: function(e) {
            return e.type === "keypress" ? zr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
        }
    })
      , kd = _e(Sd)
      , Ed = Y({}, Lr, {
        pointerId: 0,
        width: 0,
        height: 0,
        pressure: 0,
        tangentialPressure: 0,
        tiltX: 0,
        tiltY: 0,
        twist: 0,
        pointerType: 0,
        isPrimary: 0
    })
      , Xu = _e(Ed)
      , Cd = Y({}, Fn, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: yi
    })
      , xd = _e(Cd)
      , _d = Y({}, Zt, {
        propertyName: 0,
        elapsedTime: 0,
        pseudoElement: 0
    })
      , Nd = _e(_d)
      , Pd = Y({}, Lr, {
        deltaX: function(e) {
            return "deltaX"in e ? e.deltaX : "wheelDeltaX"in e ? -e.wheelDeltaX : 0
        },
        deltaY: function(e) {
            return "deltaY"in e ? e.deltaY : "wheelDeltaY"in e ? -e.wheelDeltaY : "wheelDelta"in e ? -e.wheelDelta : 0
        },
        deltaZ: 0,
        deltaMode: 0
    })
      , zd = _e(Pd)
      , Td = [9, 13, 27, 32]
      , gi = Ge && "CompositionEvent"in window
      , $n = null;
    Ge && "documentMode"in document && ($n = document.documentMode);
    var Ld = Ge && "TextEvent"in window && !$n
      , Gu = Ge && (!gi || $n && 8 < $n && 11 >= $n)
      , Zu = String.fromCharCode(32)
      , Ju = !1;
    function qu(e, t) {
        switch (e) {
        case "keyup":
            return Td.indexOf(t.keyCode) !== -1;
        case "keydown":
            return t.keyCode !== 229;
        case "keypress":
        case "mousedown":
        case "focusout":
            return !0;
        default:
            return !1
        }
    }
    function bu(e) {
        return e = e.detail,
        typeof e == "object" && "data"in e ? e.data : null
    }
    var Jt = !1;
    function Id(e, t) {
        switch (e) {
        case "compositionend":
            return bu(t);
        case "keypress":
            return t.which !== 32 ? null : (Ju = !0,
            Zu);
        case "textInput":
            return e = t.data,
            e === Zu && Ju ? null : e;
        default:
            return null
        }
    }
    function Od(e, t) {
        if (Jt)
            return e === "compositionend" || !gi && qu(e, t) ? (e = Wu(),
            Pr = fi = ft = null,
            Jt = !1,
            e) : null;
        switch (e) {
        case "paste":
            return null;
        case "keypress":
            if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
                if (t.char && 1 < t.char.length)
                    return t.char;
                if (t.which)
                    return String.fromCharCode(t.which)
            }
            return null;
        case "compositionend":
            return Gu && t.locale !== "ko" ? null : t.data;
        default:
            return null
        }
    }
    var Rd = {
        color: !0,
        date: !0,
        datetime: !0,
        "datetime-local": !0,
        email: !0,
        month: !0,
        number: !0,
        password: !0,
        range: !0,
        search: !0,
        tel: !0,
        text: !0,
        time: !0,
        url: !0,
        week: !0
    };
    function es(e) {
        var t = e && e.nodeName && e.nodeName.toLowerCase();
        return t === "input" ? !!Rd[e.type] : t === "textarea"
    }
    function ts(e, t, n, r) {
        ku(r),
        t = Dr(t, "onChange"),
        0 < t.length && (n = new pi("onChange","change",null,n,r),
        e.push({
            event: n,
            listeners: t
        }))
    }
    var Un = null
      , Vn = null;
    function Md(e) {
        ws(e, 0)
    }
    function Ir(e) {
        var t = nn(e);
        if (au(t))
            return e
    }
    function Dd(e, t) {
        if (e === "change")
            return t
    }
    var ns = !1;
    if (Ge) {
        var wi;
        if (Ge) {
            var Si = "oninput"in document;
            if (!Si) {
                var rs = document.createElement("div");
                rs.setAttribute("oninput", "return;"),
                Si = typeof rs.oninput == "function"
            }
            wi = Si
        } else
            wi = !1;
        ns = wi && (!document.documentMode || 9 < document.documentMode)
    }
    function ls() {
        Un && (Un.detachEvent("onpropertychange", is),
        Vn = Un = null)
    }
    function is(e) {
        if (e.propertyName === "value" && Ir(Vn)) {
            var t = [];
            ts(t, Vn, e, bl(e)),
            _u(Md, t)
        }
    }
    function Fd(e, t, n) {
        e === "focusin" ? (ls(),
        Un = t,
        Vn = n,
        Un.attachEvent("onpropertychange", is)) : e === "focusout" && ls()
    }
    function jd(e) {
        if (e === "selectionchange" || e === "keyup" || e === "keydown")
            return Ir(Vn)
    }
    function $d(e, t) {
        if (e === "click")
            return Ir(t)
    }
    function Ud(e, t) {
        if (e === "input" || e === "change")
            return Ir(t)
    }
    function Vd(e, t) {
        return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t
    }
    var je = typeof Object.is == "function" ? Object.is : Vd;
    function An(e, t) {
        if (je(e, t))
            return !0;
        if (typeof e != "object" || e === null || typeof t != "object" || t === null)
            return !1;
        var n = Object.keys(e)
          , r = Object.keys(t);
        if (n.length !== r.length)
            return !1;
        for (r = 0; r < n.length; r++) {
            var l = n[r];
            if (!Il.call(t, l) || !je(e[l], t[l]))
                return !1
        }
        return !0
    }
    function os(e) {
        for (; e && e.firstChild; )
            e = e.firstChild;
        return e
    }
    function us(e, t) {
        var n = os(e);
        e = 0;
        for (var r; n; ) {
            if (n.nodeType === 3) {
                if (r = e + n.textContent.length,
                e <= t && r >= t)
                    return {
                        node: n,
                        offset: t - e
                    };
                e = r
            }
            e: {
                for (; n; ) {
                    if (n.nextSibling) {
                        n = n.nextSibling;
                        break e
                    }
                    n = n.parentNode
                }
                n = void 0
            }
            n = os(n)
        }
    }
    function ss(e, t) {
        return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? ss(e, t.parentNode) : "contains"in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1
    }
    function as() {
        for (var e = window, t = hr(); t instanceof e.HTMLIFrameElement; ) {
            try {
                var n = typeof t.contentWindow.location.href == "string"
            } catch {
                n = !1
            }
            if (n)
                e = t.contentWindow;
            else
                break;
            t = hr(e.document)
        }
        return t
    }
    function ki(e) {
        var t = e && e.nodeName && e.nodeName.toLowerCase();
        return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true")
    }
    function Ad(e) {
        var t = as()
          , n = e.focusedElem
          , r = e.selectionRange;
        if (t !== n && n && n.ownerDocument && ss(n.ownerDocument.documentElement, n)) {
            if (r !== null && ki(n)) {
                if (t = r.start,
                e = r.end,
                e === void 0 && (e = t),
                "selectionStart"in n)
                    n.selectionStart = t,
                    n.selectionEnd = Math.min(e, n.value.length);
                else if (e = (t = n.ownerDocument || document) && t.defaultView || window,
                e.getSelection) {
                    e = e.getSelection();
                    var l = n.textContent.length
                      , i = Math.min(r.start, l);
                    r = r.end === void 0 ? i : Math.min(r.end, l),
                    !e.extend && i > r && (l = r,
                    r = i,
                    i = l),
                    l = us(n, i);
                    var o = us(n, r);
                    l && o && (e.rangeCount !== 1 || e.anchorNode !== l.node || e.anchorOffset !== l.offset || e.focusNode !== o.node || e.focusOffset !== o.offset) && (t = t.createRange(),
                    t.setStart(l.node, l.offset),
                    e.removeAllRanges(),
                    i > r ? (e.addRange(t),
                    e.extend(o.node, o.offset)) : (t.setEnd(o.node, o.offset),
                    e.addRange(t)))
                }
            }
            for (t = [],
            e = n; e = e.parentNode; )
                e.nodeType === 1 && t.push({
                    element: e,
                    left: e.scrollLeft,
                    top: e.scrollTop
                });
            for (typeof n.focus == "function" && n.focus(),
            n = 0; n < t.length; n++)
                e = t[n],
                e.element.scrollLeft = e.left,
                e.element.scrollTop = e.top
        }
    }
    var Hd = Ge && "documentMode"in document && 11 >= document.documentMode
      , qt = null
      , Ei = null
      , Hn = null
      , Ci = !1;
    function cs(e, t, n) {
        var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
        Ci || qt == null || qt !== hr(r) || (r = qt,
        "selectionStart"in r && ki(r) ? r = {
            start: r.selectionStart,
            end: r.selectionEnd
        } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(),
        r = {
            anchorNode: r.anchorNode,
            anchorOffset: r.anchorOffset,
            focusNode: r.focusNode,
            focusOffset: r.focusOffset
        }),
        Hn && An(Hn, r) || (Hn = r,
        r = Dr(Ei, "onSelect"),
        0 < r.length && (t = new pi("onSelect","select",null,t,n),
        e.push({
            event: t,
            listeners: r
        }),
        t.target = qt)))
    }
    function Or(e, t) {
        var n = {};
        return n[e.toLowerCase()] = t.toLowerCase(),
        n["Webkit" + e] = "webkit" + t,
        n["Moz" + e] = "moz" + t,
        n
    }
    var bt = {
        animationend: Or("Animation", "AnimationEnd"),
        animationiteration: Or("Animation", "AnimationIteration"),
        animationstart: Or("Animation", "AnimationStart"),
        transitionend: Or("Transition", "TransitionEnd")
    }
      , xi = {}
      , ds = {};
    Ge && (ds = document.createElement("div").style,
    "AnimationEvent"in window || (delete bt.animationend.animation,
    delete bt.animationiteration.animation,
    delete bt.animationstart.animation),
    "TransitionEvent"in window || delete bt.transitionend.transition);
    function Rr(e) {
        if (xi[e])
            return xi[e];
        if (!bt[e])
            return e;
        var t = bt[e], n;
        for (n in t)
            if (t.hasOwnProperty(n) && n in ds)
                return xi[e] = t[n];
        return e
    }
    var fs = Rr("animationend")
      , ps = Rr("animationiteration")
      , hs = Rr("animationstart")
      , ms = Rr("transitionend")
      , vs = new Map
      , ys = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
    function pt(e, t) {
        vs.set(e, t),
        Pt(t, [e])
    }
    for (var _i = 0; _i < ys.length; _i++) {
        var Ni = ys[_i]
          , Bd = Ni.toLowerCase()
          , Wd = Ni[0].toUpperCase() + Ni.slice(1);
        pt(Bd, "on" + Wd)
    }
    pt(fs, "onAnimationEnd"),
    pt(ps, "onAnimationIteration"),
    pt(hs, "onAnimationStart"),
    pt("dblclick", "onDoubleClick"),
    pt("focusin", "onFocus"),
    pt("focusout", "onBlur"),
    pt(ms, "onTransitionEnd"),
    Bt("onMouseEnter", ["mouseout", "mouseover"]),
    Bt("onMouseLeave", ["mouseout", "mouseover"]),
    Bt("onPointerEnter", ["pointerout", "pointerover"]),
    Bt("onPointerLeave", ["pointerout", "pointerover"]),
    Pt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")),
    Pt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),
    Pt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    Pt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")),
    Pt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")),
    Pt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
    var Bn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" ")
      , Kd = new Set("cancel close invalid load scroll toggle".split(" ").concat(Bn));
    function gs(e, t, n) {
        var r = e.type || "unknown-event";
        e.currentTarget = n,
        Bc(r, t, void 0, e),
        e.currentTarget = null
    }
    function ws(e, t) {
        t = (t & 4) !== 0;
        for (var n = 0; n < e.length; n++) {
            var r = e[n]
              , l = r.event;
            r = r.listeners;
            e: {
                var i = void 0;
                if (t)
                    for (var o = r.length - 1; 0 <= o; o--) {
                        var u = r[o]
                          , s = u.instance
                          , d = u.currentTarget;
                        if (u = u.listener,
                        s !== i && l.isPropagationStopped())
                            break e;
                        gs(l, u, d),
                        i = s
                    }
                else
                    for (o = 0; o < r.length; o++) {
                        if (u = r[o],
                        s = u.instance,
                        d = u.currentTarget,
                        u = u.listener,
                        s !== i && l.isPropagationStopped())
                            break e;
                        gs(l, u, d),
                        i = s
                    }
            }
        }
        if (yr)
            throw e = ri,
            yr = !1,
            ri = null,
            e
    }
    function B(e, t) {
        var n = t[Mi];
        n === void 0 && (n = t[Mi] = new Set);
        var r = e + "__bubble";
        n.has(r) || (Ss(t, e, 2, !1),
        n.add(r))
    }
    function Pi(e, t, n) {
        var r = 0;
        t && (r |= 4),
        Ss(n, e, r, t)
    }
    var Mr = "_reactListening" + Math.random().toString(36).slice(2);
    function Wn(e) {
        if (!e[Mr]) {
            e[Mr] = !0,
            tu.forEach(function(n) {
                n !== "selectionchange" && (Kd.has(n) || Pi(n, !1, e),
                Pi(n, !0, e))
            });
            var t = e.nodeType === 9 ? e : e.ownerDocument;
            t === null || t[Mr] || (t[Mr] = !0,
            Pi("selectionchange", !1, t))
        }
    }
    function Ss(e, t, n, r) {
        switch (Bu(t)) {
        case 1:
            var l = id;
            break;
        case 4:
            l = od;
            break;
        default:
            l = ci
        }
        n = l.bind(null, t, n, e),
        l = void 0,
        !ni || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0),
        r ? l !== void 0 ? e.addEventListener(t, n, {
            capture: !0,
            passive: l
        }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, {
            passive: l
        }) : e.addEventListener(t, n, !1)
    }
    function zi(e, t, n, r, l) {
        var i = r;
        if (!(t & 1) && !(t & 2) && r !== null)
            e: for (; ; ) {
                if (r === null)
                    return;
                var o = r.tag;
                if (o === 3 || o === 4) {
                    var u = r.stateNode.containerInfo;
                    if (u === l || u.nodeType === 8 && u.parentNode === l)
                        break;
                    if (o === 4)
                        for (o = r.return; o !== null; ) {
                            var s = o.tag;
                            if ((s === 3 || s === 4) && (s = o.stateNode.containerInfo,
                            s === l || s.nodeType === 8 && s.parentNode === l))
                                return;
                            o = o.return
                        }
                    for (; u !== null; ) {
                        if (o = Tt(u),
                        o === null)
                            return;
                        if (s = o.tag,
                        s === 5 || s === 6) {
                            r = i = o;
                            continue e
                        }
                        u = u.parentNode
                    }
                }
                r = r.return
            }
        _u(function() {
            var d = i
              , m = bl(n)
              , h = [];
            e: {
                var p = vs.get(e);
                if (p !== void 0) {
                    var w = pi
                      , k = e;
                    switch (e) {
                    case "keypress":
                        if (zr(n) === 0)
                            break e;
                    case "keydown":
                    case "keyup":
                        w = kd;
                        break;
                    case "focusin":
                        k = "focus",
                        w = vi;
                        break;
                    case "focusout":
                        k = "blur",
                        w = vi;
                        break;
                    case "beforeblur":
                    case "afterblur":
                        w = vi;
                        break;
                    case "click":
                        if (n.button === 2)
                            break e;
                    case "auxclick":
                    case "dblclick":
                    case "mousedown":
                    case "mousemove":
                    case "mouseup":
                    case "mouseout":
                    case "mouseover":
                    case "contextmenu":
                        w = Qu;
                        break;
                    case "drag":
                    case "dragend":
                    case "dragenter":
                    case "dragexit":
                    case "dragleave":
                    case "dragover":
                    case "dragstart":
                    case "drop":
                        w = ad;
                        break;
                    case "touchcancel":
                    case "touchend":
                    case "touchmove":
                    case "touchstart":
                        w = xd;
                        break;
                    case fs:
                    case ps:
                    case hs:
                        w = fd;
                        break;
                    case ms:
                        w = Nd;
                        break;
                    case "scroll":
                        w = ud;
                        break;
                    case "wheel":
                        w = zd;
                        break;
                    case "copy":
                    case "cut":
                    case "paste":
                        w = hd;
                        break;
                    case "gotpointercapture":
                    case "lostpointercapture":
                    case "pointercancel":
                    case "pointerdown":
                    case "pointermove":
                    case "pointerout":
                    case "pointerover":
                    case "pointerup":
                        w = Xu
                    }
                    var g = (t & 4) !== 0
                      , j = !g && e === "scroll"
                      , c = g ? p !== null ? p + "Capture" : null : p;
                    g = [];
                    for (var a = d, f; a !== null; ) {
                        f = a;
                        var v = f.stateNode;
                        if (f.tag === 5 && v !== null && (f = v,
                        c !== null && (v = Nn(a, c),
                        v != null && g.push(Kn(a, v, f)))),
                        j)
                            break;
                        a = a.return
                    }
                    0 < g.length && (p = new w(p,k,null,n,m),
                    h.push({
                        event: p,
                        listeners: g
                    }))
                }
            }
            if (!(t & 7)) {
                e: {
                    if (p = e === "mouseover" || e === "pointerover",
                    w = e === "mouseout" || e === "pointerout",
                    p && n !== ql && (k = n.relatedTarget || n.fromElement) && (Tt(k) || k[Je]))
                        break e;
                    if ((w || p) && (p = m.window === m ? m : (p = m.ownerDocument) ? p.defaultView || p.parentWindow : window,
                    w ? (k = n.relatedTarget || n.toElement,
                    w = d,
                    k = k ? Tt(k) : null,
                    k !== null && (j = zt(k),
                    k !== j || k.tag !== 5 && k.tag !== 6) && (k = null)) : (w = null,
                    k = d),
                    w !== k)) {
                        if (g = Qu,
                        v = "onMouseLeave",
                        c = "onMouseEnter",
                        a = "mouse",
                        (e === "pointerout" || e === "pointerover") && (g = Xu,
                        v = "onPointerLeave",
                        c = "onPointerEnter",
                        a = "pointer"),
                        j = w == null ? p : nn(w),
                        f = k == null ? p : nn(k),
                        p = new g(v,a + "leave",w,n,m),
                        p.target = j,
                        p.relatedTarget = f,
                        v = null,
                        Tt(m) === d && (g = new g(c,a + "enter",k,n,m),
                        g.target = f,
                        g.relatedTarget = j,
                        v = g),
                        j = v,
                        w && k)
                            t: {
                                for (g = w,
                                c = k,
                                a = 0,
                                f = g; f; f = en(f))
                                    a++;
                                for (f = 0,
                                v = c; v; v = en(v))
                                    f++;
                                for (; 0 < a - f; )
                                    g = en(g),
                                    a--;
                                for (; 0 < f - a; )
                                    c = en(c),
                                    f--;
                                for (; a--; ) {
                                    if (g === c || c !== null && g === c.alternate)
                                        break t;
                                    g = en(g),
                                    c = en(c)
                                }
                                g = null
                            }
                        else
                            g = null;
                        w !== null && ks(h, p, w, g, !1),
                        k !== null && j !== null && ks(h, j, k, g, !0)
                    }
                }
                e: {
                    if (p = d ? nn(d) : window,
                    w = p.nodeName && p.nodeName.toLowerCase(),
                    w === "select" || w === "input" && p.type === "file")
                        var S = Dd;
                    else if (es(p))
                        if (ns)
                            S = Ud;
                        else {
                            S = jd;
                            var E = Fd
                        }
                    else
                        (w = p.nodeName) && w.toLowerCase() === "input" && (p.type === "checkbox" || p.type === "radio") && (S = $d);
                    if (S && (S = S(e, d))) {
                        ts(h, S, n, m);
                        break e
                    }
                    E && E(e, p, d),
                    e === "focusout" && (E = p._wrapperState) && E.controlled && p.type === "number" && Yl(p, "number", p.value)
                }
                switch (E = d ? nn(d) : window,
                e) {
                case "focusin":
                    (es(E) || E.contentEditable === "true") && (qt = E,
                    Ei = d,
                    Hn = null);
                    break;
                case "focusout":
                    Hn = Ei = qt = null;
                    break;
                case "mousedown":
                    Ci = !0;
                    break;
                case "contextmenu":
                case "mouseup":
                case "dragend":
                    Ci = !1,
                    cs(h, n, m);
                    break;
                case "selectionchange":
                    if (Hd)
                        break;
                case "keydown":
                case "keyup":
                    cs(h, n, m)
                }
                var N;
                if (gi)
                    e: {
                        switch (e) {
                        case "compositionstart":
                            var P = "onCompositionStart";
                            break e;
                        case "compositionend":
                            P = "onCompositionEnd";
                            break e;
                        case "compositionupdate":
                            P = "onCompositionUpdate";
                            break e
                        }
                        P = void 0
                    }
                else
                    Jt ? qu(e, n) && (P = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (P = "onCompositionStart");
                P && (Gu && n.locale !== "ko" && (Jt || P !== "onCompositionStart" ? P === "onCompositionEnd" && Jt && (N = Wu()) : (ft = m,
                fi = "value"in ft ? ft.value : ft.textContent,
                Jt = !0)),
                E = Dr(d, P),
                0 < E.length && (P = new Yu(P,e,null,n,m),
                h.push({
                    event: P,
                    listeners: E
                }),
                N ? P.data = N : (N = bu(n),
                N !== null && (P.data = N)))),
                (N = Ld ? Id(e, n) : Od(e, n)) && (d = Dr(d, "onBeforeInput"),
                0 < d.length && (m = new Yu("onBeforeInput","beforeinput",null,n,m),
                h.push({
                    event: m,
                    listeners: d
                }),
                m.data = N))
            }
            ws(h, t)
        })
    }
    function Kn(e, t, n) {
        return {
            instance: e,
            listener: t,
            currentTarget: n
        }
    }
    function Dr(e, t) {
        for (var n = t + "Capture", r = []; e !== null; ) {
            var l = e
              , i = l.stateNode;
            l.tag === 5 && i !== null && (l = i,
            i = Nn(e, n),
            i != null && r.unshift(Kn(e, i, l)),
            i = Nn(e, t),
            i != null && r.push(Kn(e, i, l))),
            e = e.return
        }
        return r
    }
    function en(e) {
        if (e === null)
            return null;
        do
            e = e.return;
        while (e && e.tag !== 5);
        return e || null
    }
    function ks(e, t, n, r, l) {
        for (var i = t._reactName, o = []; n !== null && n !== r; ) {
            var u = n
              , s = u.alternate
              , d = u.stateNode;
            if (s !== null && s === r)
                break;
            u.tag === 5 && d !== null && (u = d,
            l ? (s = Nn(n, i),
            s != null && o.unshift(Kn(n, s, u))) : l || (s = Nn(n, i),
            s != null && o.push(Kn(n, s, u)))),
            n = n.return
        }
        o.length !== 0 && e.push({
            event: t,
            listeners: o
        })
    }
    var Qd = /\r\n?/g
      , Yd = /\u0000|\uFFFD/g;
    function Es(e) {
        return (typeof e == "string" ? e : "" + e).replace(Qd, `
`).replace(Yd, "")
    }
    function Fr(e, t, n) {
        if (t = Es(t),
        Es(e) !== t && n)
            throw Error(y(425))
    }
    function jr() {}
    var Ti = null
      , Li = null;
    function Ii(e, t) {
        return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null
    }
    var Oi = typeof setTimeout == "function" ? setTimeout : void 0
      , Xd = typeof clearTimeout == "function" ? clearTimeout : void 0
      , Cs = typeof Promise == "function" ? Promise : void 0
      , Gd = typeof queueMicrotask == "function" ? queueMicrotask : typeof Cs < "u" ? function(e) {
        return Cs.resolve(null).then(e).catch(Zd)
    }
    : Oi;
    function Zd(e) {
        setTimeout(function() {
            throw e
        })
    }
    function Ri(e, t) {
        var n = t
          , r = 0;
        do {
            var l = n.nextSibling;
            if (e.removeChild(n),
            l && l.nodeType === 8)
                if (n = l.data,
                n === "/$") {
                    if (r === 0) {
                        e.removeChild(l),
                        Dn(t);
                        return
                    }
                    r--
                } else
                    n !== "$" && n !== "$?" && n !== "$!" || r++;
            n = l
        } while (n);
        Dn(t)
    }
    function ht(e) {
        for (; e != null; e = e.nextSibling) {
            var t = e.nodeType;
            if (t === 1 || t === 3)
                break;
            if (t === 8) {
                if (t = e.data,
                t === "$" || t === "$!" || t === "$?")
                    break;
                if (t === "/$")
                    return null
            }
        }
        return e
    }
    function xs(e) {
        e = e.previousSibling;
        for (var t = 0; e; ) {
            if (e.nodeType === 8) {
                var n = e.data;
                if (n === "$" || n === "$!" || n === "$?") {
                    if (t === 0)
                        return e;
                    t--
                } else
                    n === "/$" && t++
            }
            e = e.previousSibling
        }
        return null
    }
    var tn = Math.random().toString(36).slice(2)
      , Ke = "__reactFiber$" + tn
      , Qn = "__reactProps$" + tn
      , Je = "__reactContainer$" + tn
      , Mi = "__reactEvents$" + tn
      , Jd = "__reactListeners$" + tn
      , qd = "__reactHandles$" + tn;
    function Tt(e) {
        var t = e[Ke];
        if (t)
            return t;
        for (var n = e.parentNode; n; ) {
            if (t = n[Je] || n[Ke]) {
                if (n = t.alternate,
                t.child !== null || n !== null && n.child !== null)
                    for (e = xs(e); e !== null; ) {
                        if (n = e[Ke])
                            return n;
                        e = xs(e)
                    }
                return t
            }
            e = n,
            n = e.parentNode
        }
        return null
    }
    function Yn(e) {
        return e = e[Ke] || e[Je],
        !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e
    }
    function nn(e) {
        if (e.tag === 5 || e.tag === 6)
            return e.stateNode;
        throw Error(y(33))
    }
    function $r(e) {
        return e[Qn] || null
    }
    var Di = []
      , rn = -1;
    function mt(e) {
        return {
            current: e
        }
    }
    function W(e) {
        0 > rn || (e.current = Di[rn],
        Di[rn] = null,
        rn--)
    }
    function A(e, t) {
        rn++,
        Di[rn] = e.current,
        e.current = t
    }
    var vt = {}
      , se = mt(vt)
      , ge = mt(!1)
      , Lt = vt;
    function ln(e, t) {
        var n = e.type.contextTypes;
        if (!n)
            return vt;
        var r = e.stateNode;
        if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
            return r.__reactInternalMemoizedMaskedChildContext;
        var l = {}, i;
        for (i in n)
            l[i] = t[i];
        return r && (e = e.stateNode,
        e.__reactInternalMemoizedUnmaskedChildContext = t,
        e.__reactInternalMemoizedMaskedChildContext = l),
        l
    }
    function we(e) {
        return e = e.childContextTypes,
        e != null
    }
    function Ur() {
        W(ge),
        W(se)
    }
    function _s(e, t, n) {
        if (se.current !== vt)
            throw Error(y(168));
        A(se, t),
        A(ge, n)
    }
    function Ns(e, t, n) {
        var r = e.stateNode;
        if (t = t.childContextTypes,
        typeof r.getChildContext != "function")
            return n;
        r = r.getChildContext();
        for (var l in r)
            if (!(l in t))
                throw Error(y(108, Fc(e) || "Unknown", l));
        return Y({}, n, r)
    }
    function Vr(e) {
        return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || vt,
        Lt = se.current,
        A(se, e),
        A(ge, ge.current),
        !0
    }
    function Ps(e, t, n) {
        var r = e.stateNode;
        if (!r)
            throw Error(y(169));
        n ? (e = Ns(e, t, Lt),
        r.__reactInternalMemoizedMergedChildContext = e,
        W(ge),
        W(se),
        A(se, e)) : W(ge),
        A(ge, n)
    }
    var qe = null
      , Ar = !1
      , Fi = !1;
    function zs(e) {
        qe === null ? qe = [e] : qe.push(e)
    }
    function bd(e) {
        Ar = !0,
        zs(e)
    }
    function yt() {
        if (!Fi && qe !== null) {
            Fi = !0;
            var e = 0
              , t = U;
            try {
                var n = qe;
                for (U = 1; e < n.length; e++) {
                    var r = n[e];
                    do
                        r = r(!0);
                    while (r !== null)
                }
                qe = null,
                Ar = !1
            } catch (l) {
                throw qe !== null && (qe = qe.slice(e + 1)),
                Lu(li, yt),
                l
            } finally {
                U = t,
                Fi = !1
            }
        }
        return null
    }
    var on = []
      , un = 0
      , Hr = null
      , Br = 0
      , Le = []
      , Ie = 0
      , It = null
      , be = 1
      , et = "";
    function Ot(e, t) {
        on[un++] = Br,
        on[un++] = Hr,
        Hr = e,
        Br = t
    }
    function Ts(e, t, n) {
        Le[Ie++] = be,
        Le[Ie++] = et,
        Le[Ie++] = It,
        It = e;
        var r = be;
        e = et;
        var l = 32 - Fe(r) - 1;
        r &= ~(1 << l),
        n += 1;
        var i = 32 - Fe(t) + l;
        if (30 < i) {
            var o = l - l % 5;
            i = (r & (1 << o) - 1).toString(32),
            r >>= o,
            l -= o,
            be = 1 << 32 - Fe(t) + l | n << l | r,
            et = i + e
        } else
            be = 1 << i | n << l | r,
            et = e
    }
    function ji(e) {
        e.return !== null && (Ot(e, 1),
        Ts(e, 1, 0))
    }
    function $i(e) {
        for (; e === Hr; )
            Hr = on[--un],
            on[un] = null,
            Br = on[--un],
            on[un] = null;
        for (; e === It; )
            It = Le[--Ie],
            Le[Ie] = null,
            et = Le[--Ie],
            Le[Ie] = null,
            be = Le[--Ie],
            Le[Ie] = null
    }
    var Ne = null
      , Pe = null
      , Q = !1
      , $e = null;
    function Ls(e, t) {
        var n = De(5, null, null, 0);
        n.elementType = "DELETED",
        n.stateNode = t,
        n.return = e,
        t = e.deletions,
        t === null ? (e.deletions = [n],
        e.flags |= 16) : t.push(n)
    }
    function Is(e, t) {
        switch (e.tag) {
        case 5:
            var n = e.type;
            return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t,
            t !== null ? (e.stateNode = t,
            Ne = e,
            Pe = ht(t.firstChild),
            !0) : !1;
        case 6:
            return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t,
            t !== null ? (e.stateNode = t,
            Ne = e,
            Pe = null,
            !0) : !1;
        case 13:
            return t = t.nodeType !== 8 ? null : t,
            t !== null ? (n = It !== null ? {
                id: be,
                overflow: et
            } : null,
            e.memoizedState = {
                dehydrated: t,
                treeContext: n,
                retryLane: 1073741824
            },
            n = De(18, null, null, 0),
            n.stateNode = t,
            n.return = e,
            e.child = n,
            Ne = e,
            Pe = null,
            !0) : !1;
        default:
            return !1
        }
    }
    function Ui(e) {
        return (e.mode & 1) !== 0 && (e.flags & 128) === 0
    }
    function Vi(e) {
        if (Q) {
            var t = Pe;
            if (t) {
                var n = t;
                if (!Is(e, t)) {
                    if (Ui(e))
                        throw Error(y(418));
                    t = ht(n.nextSibling);
                    var r = Ne;
                    t && Is(e, t) ? Ls(r, n) : (e.flags = e.flags & -4097 | 2,
                    Q = !1,
                    Ne = e)
                }
            } else {
                if (Ui(e))
                    throw Error(y(418));
                e.flags = e.flags & -4097 | 2,
                Q = !1,
                Ne = e
            }
        }
    }
    function Os(e) {
        for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
            e = e.return;
        Ne = e
    }
    function Wr(e) {
        if (e !== Ne)
            return !1;
        if (!Q)
            return Os(e),
            Q = !0,
            !1;
        var t;
        if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type,
        t = t !== "head" && t !== "body" && !Ii(e.type, e.memoizedProps)),
        t && (t = Pe)) {
            if (Ui(e))
                throw Rs(),
                Error(y(418));
            for (; t; )
                Ls(e, t),
                t = ht(t.nextSibling)
        }
        if (Os(e),
        e.tag === 13) {
            if (e = e.memoizedState,
            e = e !== null ? e.dehydrated : null,
            !e)
                throw Error(y(317));
            e: {
                for (e = e.nextSibling,
                t = 0; e; ) {
                    if (e.nodeType === 8) {
                        var n = e.data;
                        if (n === "/$") {
                            if (t === 0) {
                                Pe = ht(e.nextSibling);
                                break e
                            }
                            t--
                        } else
                            n !== "$" && n !== "$!" && n !== "$?" || t++
                    }
                    e = e.nextSibling
                }
                Pe = null
            }
        } else
            Pe = Ne ? ht(e.stateNode.nextSibling) : null;
        return !0
    }
    function Rs() {
        for (var e = Pe; e; )
            e = ht(e.nextSibling)
    }
    function sn() {
        Pe = Ne = null,
        Q = !1
    }
    function Ai(e) {
        $e === null ? $e = [e] : $e.push(e)
    }
    var ef = Ze.ReactCurrentBatchConfig;
    function Xn(e, t, n) {
        if (e = n.ref,
        e !== null && typeof e != "function" && typeof e != "object") {
            if (n._owner) {
                if (n = n._owner,
                n) {
                    if (n.tag !== 1)
                        throw Error(y(309));
                    var r = n.stateNode
                }
                if (!r)
                    throw Error(y(147, e));
                var l = r
                  , i = "" + e;
                return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === i ? t.ref : (t = function(o) {
                    var u = l.refs;
                    o === null ? delete u[i] : u[i] = o
                }
                ,
                t._stringRef = i,
                t)
            }
            if (typeof e != "string")
                throw Error(y(284));
            if (!n._owner)
                throw Error(y(290, e))
        }
        return e
    }
    function Kr(e, t) {
        throw e = Object.prototype.toString.call(t),
        Error(y(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e))
    }
    function Ms(e) {
        var t = e._init;
        return t(e._payload)
    }
    function Ds(e) {
        function t(c, a) {
            if (e) {
                var f = c.deletions;
                f === null ? (c.deletions = [a],
                c.flags |= 16) : f.push(a)
            }
        }
        function n(c, a) {
            if (!e)
                return null;
            for (; a !== null; )
                t(c, a),
                a = a.sibling;
            return null
        }
        function r(c, a) {
            for (c = new Map; a !== null; )
                a.key !== null ? c.set(a.key, a) : c.set(a.index, a),
                a = a.sibling;
            return c
        }
        function l(c, a) {
            return c = _t(c, a),
            c.index = 0,
            c.sibling = null,
            c
        }
        function i(c, a, f) {
            return c.index = f,
            e ? (f = c.alternate,
            f !== null ? (f = f.index,
            f < a ? (c.flags |= 2,
            a) : f) : (c.flags |= 2,
            a)) : (c.flags |= 1048576,
            a)
        }
        function o(c) {
            return e && c.alternate === null && (c.flags |= 2),
            c
        }
        function u(c, a, f, v) {
            return a === null || a.tag !== 6 ? (a = Ro(f, c.mode, v),
            a.return = c,
            a) : (a = l(a, f),
            a.return = c,
            a)
        }
        function s(c, a, f, v) {
            var S = f.type;
            return S === Kt ? m(c, a, f.props.children, v, f.key) : a !== null && (a.elementType === S || typeof S == "object" && S !== null && S.$$typeof === ot && Ms(S) === a.type) ? (v = l(a, f.props),
            v.ref = Xn(c, a, f),
            v.return = c,
            v) : (v = ml(f.type, f.key, f.props, null, c.mode, v),
            v.ref = Xn(c, a, f),
            v.return = c,
            v)
        }
        function d(c, a, f, v) {
            return a === null || a.tag !== 4 || a.stateNode.containerInfo !== f.containerInfo || a.stateNode.implementation !== f.implementation ? (a = Mo(f, c.mode, v),
            a.return = c,
            a) : (a = l(a, f.children || []),
            a.return = c,
            a)
        }
        function m(c, a, f, v, S) {
            return a === null || a.tag !== 7 ? (a = Vt(f, c.mode, v, S),
            a.return = c,
            a) : (a = l(a, f),
            a.return = c,
            a)
        }
        function h(c, a, f) {
            if (typeof a == "string" && a !== "" || typeof a == "number")
                return a = Ro("" + a, c.mode, f),
                a.return = c,
                a;
            if (typeof a == "object" && a !== null) {
                switch (a.$$typeof) {
                case fr:
                    return f = ml(a.type, a.key, a.props, null, c.mode, f),
                    f.ref = Xn(c, null, a),
                    f.return = c,
                    f;
                case Wt:
                    return a = Mo(a, c.mode, f),
                    a.return = c,
                    a;
                case ot:
                    var v = a._init;
                    return h(c, v(a._payload), f)
                }
                if (Cn(a) || kn(a))
                    return a = Vt(a, c.mode, f, null),
                    a.return = c,
                    a;
                Kr(c, a)
            }
            return null
        }
        function p(c, a, f, v) {
            var S = a !== null ? a.key : null;
            if (typeof f == "string" && f !== "" || typeof f == "number")
                return S !== null ? null : u(c, a, "" + f, v);
            if (typeof f == "object" && f !== null) {
                switch (f.$$typeof) {
                case fr:
                    return f.key === S ? s(c, a, f, v) : null;
                case Wt:
                    return f.key === S ? d(c, a, f, v) : null;
                case ot:
                    return S = f._init,
                    p(c, a, S(f._payload), v)
                }
                if (Cn(f) || kn(f))
                    return S !== null ? null : m(c, a, f, v, null);
                Kr(c, f)
            }
            return null
        }
        function w(c, a, f, v, S) {
            if (typeof v == "string" && v !== "" || typeof v == "number")
                return c = c.get(f) || null,
                u(a, c, "" + v, S);
            if (typeof v == "object" && v !== null) {
                switch (v.$$typeof) {
                case fr:
                    return c = c.get(v.key === null ? f : v.key) || null,
                    s(a, c, v, S);
                case Wt:
                    return c = c.get(v.key === null ? f : v.key) || null,
                    d(a, c, v, S);
                case ot:
                    var E = v._init;
                    return w(c, a, f, E(v._payload), S)
                }
                if (Cn(v) || kn(v))
                    return c = c.get(f) || null,
                    m(a, c, v, S, null);
                Kr(a, v)
            }
            return null
        }
        function k(c, a, f, v) {
            for (var S = null, E = null, N = a, P = a = 0, H = null; N !== null && P < f.length; P++) {
                N.index > P ? (H = N,
                N = null) : H = N.sibling;
                var I = p(c, N, f[P], v);
                if (I === null) {
                    N === null && (N = H);
                    break
                }
                e && N && I.alternate === null && t(c, N),
                a = i(I, a, P),
                E === null ? S = I : E.sibling = I,
                E = I,
                N = H
            }
            if (P === f.length)
                return n(c, N),
                Q && Ot(c, P),
                S;
            if (N === null) {
                for (; P < f.length; P++)
                    N = h(c, f[P], v),
                    N !== null && (a = i(N, a, P),
                    E === null ? S = N : E.sibling = N,
                    E = N);
                return Q && Ot(c, P),
                S
            }
            for (N = r(c, N); P < f.length; P++)
                H = w(N, c, P, f[P], v),
                H !== null && (e && H.alternate !== null && N.delete(H.key === null ? P : H.key),
                a = i(H, a, P),
                E === null ? S = H : E.sibling = H,
                E = H);
            return e && N.forEach(function(fe) {
                return t(c, fe)
            }),
            Q && Ot(c, P),
            S
        }
        function g(c, a, f, v) {
            var S = kn(f);
            if (typeof S != "function")
                throw Error(y(150));
            if (f = S.call(f),
            f == null)
                throw Error(y(151));
            for (var E = S = null, N = a, P = a = 0, H = null, I = f.next(); N !== null && !I.done; P++,
            I = f.next()) {
                N.index > P ? (H = N,
                N = null) : H = N.sibling;
                var fe = p(c, N, I.value, v);
                if (fe === null) {
                    N === null && (N = H);
                    break
                }
                e && N && fe.alternate === null && t(c, N),
                a = i(fe, a, P),
                E === null ? S = fe : E.sibling = fe,
                E = fe,
                N = H
            }
            if (I.done)
                return n(c, N),
                Q && Ot(c, P),
                S;
            if (N === null) {
                for (; !I.done; P++,
                I = f.next())
                    I = h(c, I.value, v),
                    I !== null && (a = i(I, a, P),
                    E === null ? S = I : E.sibling = I,
                    E = I);
                return Q && Ot(c, P),
                S
            }
            for (N = r(c, N); !I.done; P++,
            I = f.next())
                I = w(N, c, P, I.value, v),
                I !== null && (e && I.alternate !== null && N.delete(I.key === null ? P : I.key),
                a = i(I, a, P),
                E === null ? S = I : E.sibling = I,
                E = I);
            return e && N.forEach(function(gn) {
                return t(c, gn)
            }),
            Q && Ot(c, P),
            S
        }
        function j(c, a, f, v) {
            if (typeof f == "object" && f !== null && f.type === Kt && f.key === null && (f = f.props.children),
            typeof f == "object" && f !== null) {
                switch (f.$$typeof) {
                case fr:
                    e: {
                        for (var S = f.key, E = a; E !== null; ) {
                            if (E.key === S) {
                                if (S = f.type,
                                S === Kt) {
                                    if (E.tag === 7) {
                                        n(c, E.sibling),
                                        a = l(E, f.props.children),
                                        a.return = c,
                                        c = a;
                                        break e
                                    }
                                } else if (E.elementType === S || typeof S == "object" && S !== null && S.$$typeof === ot && Ms(S) === E.type) {
                                    n(c, E.sibling),
                                    a = l(E, f.props),
                                    a.ref = Xn(c, E, f),
                                    a.return = c,
                                    c = a;
                                    break e
                                }
                                n(c, E);
                                break
                            } else
                                t(c, E);
                            E = E.sibling
                        }
                        f.type === Kt ? (a = Vt(f.props.children, c.mode, v, f.key),
                        a.return = c,
                        c = a) : (v = ml(f.type, f.key, f.props, null, c.mode, v),
                        v.ref = Xn(c, a, f),
                        v.return = c,
                        c = v)
                    }
                    return o(c);
                case Wt:
                    e: {
                        for (E = f.key; a !== null; ) {
                            if (a.key === E)
                                if (a.tag === 4 && a.stateNode.containerInfo === f.containerInfo && a.stateNode.implementation === f.implementation) {
                                    n(c, a.sibling),
                                    a = l(a, f.children || []),
                                    a.return = c,
                                    c = a;
                                    break e
                                } else {
                                    n(c, a);
                                    break
                                }
                            else
                                t(c, a);
                            a = a.sibling
                        }
                        a = Mo(f, c.mode, v),
                        a.return = c,
                        c = a
                    }
                    return o(c);
                case ot:
                    return E = f._init,
                    j(c, a, E(f._payload), v)
                }
                if (Cn(f))
                    return k(c, a, f, v);
                if (kn(f))
                    return g(c, a, f, v);
                Kr(c, f)
            }
            return typeof f == "string" && f !== "" || typeof f == "number" ? (f = "" + f,
            a !== null && a.tag === 6 ? (n(c, a.sibling),
            a = l(a, f),
            a.return = c,
            c = a) : (n(c, a),
            a = Ro(f, c.mode, v),
            a.return = c,
            c = a),
            o(c)) : n(c, a)
        }
        return j
    }
    var an = Ds(!0)
      , Fs = Ds(!1)
      , Qr = mt(null)
      , Yr = null
      , cn = null
      , Hi = null;
    function Bi() {
        Hi = cn = Yr = null
    }
    function Wi(e) {
        var t = Qr.current;
        W(Qr),
        e._currentValue = t
    }
    function Ki(e, t, n) {
        for (; e !== null; ) {
            var r = e.alternate;
            if ((e.childLanes & t) !== t ? (e.childLanes |= t,
            r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
            e === n)
                break;
            e = e.return
        }
    }
    function dn(e, t) {
        Yr = e,
        Hi = cn = null,
        e = e.dependencies,
        e !== null && e.firstContext !== null && (e.lanes & t && (Se = !0),
        e.firstContext = null)
    }
    function Oe(e) {
        var t = e._currentValue;
        if (Hi !== e)
            if (e = {
                context: e,
                memoizedValue: t,
                next: null
            },
            cn === null) {
                if (Yr === null)
                    throw Error(y(308));
                cn = e,
                Yr.dependencies = {
                    lanes: 0,
                    firstContext: e
                }
            } else
                cn = cn.next = e;
        return t
    }
    var Rt = null;
    function Qi(e) {
        Rt === null ? Rt = [e] : Rt.push(e)
    }
    function js(e, t, n, r) {
        var l = t.interleaved;
        return l === null ? (n.next = n,
        Qi(t)) : (n.next = l.next,
        l.next = n),
        t.interleaved = n,
        tt(e, r)
    }
    function tt(e, t) {
        e.lanes |= t;
        var n = e.alternate;
        for (n !== null && (n.lanes |= t),
        n = e,
        e = e.return; e !== null; )
            e.childLanes |= t,
            n = e.alternate,
            n !== null && (n.childLanes |= t),
            n = e,
            e = e.return;
        return n.tag === 3 ? n.stateNode : null
    }
    var gt = !1;
    function Yi(e) {
        e.updateQueue = {
            baseState: e.memoizedState,
            firstBaseUpdate: null,
            lastBaseUpdate: null,
            shared: {
                pending: null,
                interleaved: null,
                lanes: 0
            },
            effects: null
        }
    }
    function $s(e, t) {
        e = e.updateQueue,
        t.updateQueue === e && (t.updateQueue = {
            baseState: e.baseState,
            firstBaseUpdate: e.firstBaseUpdate,
            lastBaseUpdate: e.lastBaseUpdate,
            shared: e.shared,
            effects: e.effects
        })
    }
    function nt(e, t) {
        return {
            eventTime: e,
            lane: t,
            tag: 0,
            payload: null,
            callback: null,
            next: null
        }
    }
    function wt(e, t, n) {
        var r = e.updateQueue;
        if (r === null)
            return null;
        if (r = r.shared,
        F & 2) {
            var l = r.pending;
            return l === null ? t.next = t : (t.next = l.next,
            l.next = t),
            r.pending = t,
            tt(e, n)
        }
        return l = r.interleaved,
        l === null ? (t.next = t,
        Qi(r)) : (t.next = l.next,
        l.next = t),
        r.interleaved = t,
        tt(e, n)
    }
    function Xr(e, t, n) {
        if (t = t.updateQueue,
        t !== null && (t = t.shared,
        (n & 4194240) !== 0)) {
            var r = t.lanes;
            r &= e.pendingLanes,
            n |= r,
            t.lanes = n,
            ui(e, n)
        }
    }
    function Us(e, t) {
        var n = e.updateQueue
          , r = e.alternate;
        if (r !== null && (r = r.updateQueue,
        n === r)) {
            var l = null
              , i = null;
            if (n = n.firstBaseUpdate,
            n !== null) {
                do {
                    var o = {
                        eventTime: n.eventTime,
                        lane: n.lane,
                        tag: n.tag,
                        payload: n.payload,
                        callback: n.callback,
                        next: null
                    };
                    i === null ? l = i = o : i = i.next = o,
                    n = n.next
                } while (n !== null);
                i === null ? l = i = t : i = i.next = t
            } else
                l = i = t;
            n = {
                baseState: r.baseState,
                firstBaseUpdate: l,
                lastBaseUpdate: i,
                shared: r.shared,
                effects: r.effects
            },
            e.updateQueue = n;
            return
        }
        e = n.lastBaseUpdate,
        e === null ? n.firstBaseUpdate = t : e.next = t,
        n.lastBaseUpdate = t
    }
    function Gr(e, t, n, r) {
        var l = e.updateQueue;
        gt = !1;
        var i = l.firstBaseUpdate
          , o = l.lastBaseUpdate
          , u = l.shared.pending;
        if (u !== null) {
            l.shared.pending = null;
            var s = u
              , d = s.next;
            s.next = null,
            o === null ? i = d : o.next = d,
            o = s;
            var m = e.alternate;
            m !== null && (m = m.updateQueue,
            u = m.lastBaseUpdate,
            u !== o && (u === null ? m.firstBaseUpdate = d : u.next = d,
            m.lastBaseUpdate = s))
        }
        if (i !== null) {
            var h = l.baseState;
            o = 0,
            m = d = s = null,
            u = i;
            do {
                var p = u.lane
                  , w = u.eventTime;
                if ((r & p) === p) {
                    m !== null && (m = m.next = {
                        eventTime: w,
                        lane: 0,
                        tag: u.tag,
                        payload: u.payload,
                        callback: u.callback,
                        next: null
                    });
                    e: {
                        var k = e
                          , g = u;
                        switch (p = t,
                        w = n,
                        g.tag) {
                        case 1:
                            if (k = g.payload,
                            typeof k == "function") {
                                h = k.call(w, h, p);
                                break e
                            }
                            h = k;
                            break e;
                        case 3:
                            k.flags = k.flags & -65537 | 128;
                        case 0:
                            if (k = g.payload,
                            p = typeof k == "function" ? k.call(w, h, p) : k,
                            p == null)
                                break e;
                            h = Y({}, h, p);
                            break e;
                        case 2:
                            gt = !0
                        }
                    }
                    u.callback !== null && u.lane !== 0 && (e.flags |= 64,
                    p = l.effects,
                    p === null ? l.effects = [u] : p.push(u))
                } else
                    w = {
                        eventTime: w,
                        lane: p,
                        tag: u.tag,
                        payload: u.payload,
                        callback: u.callback,
                        next: null
                    },
                    m === null ? (d = m = w,
                    s = h) : m = m.next = w,
                    o |= p;
                if (u = u.next,
                u === null) {
                    if (u = l.shared.pending,
                    u === null)
                        break;
                    p = u,
                    u = p.next,
                    p.next = null,
                    l.lastBaseUpdate = p,
                    l.shared.pending = null
                }
            } while (1);
            if (m === null && (s = h),
            l.baseState = s,
            l.firstBaseUpdate = d,
            l.lastBaseUpdate = m,
            t = l.shared.interleaved,
            t !== null) {
                l = t;
                do
                    o |= l.lane,
                    l = l.next;
                while (l !== t)
            } else
                i === null && (l.shared.lanes = 0);
            Ft |= o,
            e.lanes = o,
            e.memoizedState = h
        }
    }
    function Vs(e, t, n) {
        if (e = t.effects,
        t.effects = null,
        e !== null)
            for (t = 0; t < e.length; t++) {
                var r = e[t]
                  , l = r.callback;
                if (l !== null) {
                    if (r.callback = null,
                    r = n,
                    typeof l != "function")
                        throw Error(y(191, l));
                    l.call(r)
                }
            }
    }
    var Gn = {}
      , Qe = mt(Gn)
      , Zn = mt(Gn)
      , Jn = mt(Gn);
    function Mt(e) {
        if (e === Gn)
            throw Error(y(174));
        return e
    }
    function Xi(e, t) {
        switch (A(Jn, t),
        A(Zn, e),
        A(Qe, Gn),
        e = t.nodeType,
        e) {
        case 9:
        case 11:
            t = (t = t.documentElement) ? t.namespaceURI : Gl(null, "");
            break;
        default:
            e = e === 8 ? t.parentNode : t,
            t = e.namespaceURI || null,
            e = e.tagName,
            t = Gl(t, e)
        }
        W(Qe),
        A(Qe, t)
    }
    function fn() {
        W(Qe),
        W(Zn),
        W(Jn)
    }
    function As(e) {
        Mt(Jn.current);
        var t = Mt(Qe.current)
          , n = Gl(t, e.type);
        t !== n && (A(Zn, e),
        A(Qe, n))
    }
    function Gi(e) {
        Zn.current === e && (W(Qe),
        W(Zn))
    }
    var X = mt(0);
    function Zr(e) {
        for (var t = e; t !== null; ) {
            if (t.tag === 13) {
                var n = t.memoizedState;
                if (n !== null && (n = n.dehydrated,
                n === null || n.data === "$?" || n.data === "$!"))
                    return t
            } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
                if (t.flags & 128)
                    return t
            } else if (t.child !== null) {
                t.child.return = t,
                t = t.child;
                continue
            }
            if (t === e)
                break;
            for (; t.sibling === null; ) {
                if (t.return === null || t.return === e)
                    return null;
                t = t.return
            }
            t.sibling.return = t.return,
            t = t.sibling
        }
        return null
    }
    var Zi = [];
    function Ji() {
        for (var e = 0; e < Zi.length; e++)
            Zi[e]._workInProgressVersionPrimary = null;
        Zi.length = 0
    }
    var Jr = Ze.ReactCurrentDispatcher
      , qi = Ze.ReactCurrentBatchConfig
      , Dt = 0
      , G = null
      , ee = null
      , ne = null
      , qr = !1
      , qn = !1
      , bn = 0
      , tf = 0;
    function ae() {
        throw Error(y(321))
    }
    function bi(e, t) {
        if (t === null)
            return !1;
        for (var n = 0; n < t.length && n < e.length; n++)
            if (!je(e[n], t[n]))
                return !1;
        return !0
    }
    function eo(e, t, n, r, l, i) {
        if (Dt = i,
        G = t,
        t.memoizedState = null,
        t.updateQueue = null,
        t.lanes = 0,
        Jr.current = e === null || e.memoizedState === null ? of : uf,
        e = n(r, l),
        qn) {
            i = 0;
            do {
                if (qn = !1,
                bn = 0,
                25 <= i)
                    throw Error(y(301));
                i += 1,
                ne = ee = null,
                t.updateQueue = null,
                Jr.current = sf,
                e = n(r, l)
            } while (qn)
        }
        if (Jr.current = tl,
        t = ee !== null && ee.next !== null,
        Dt = 0,
        ne = ee = G = null,
        qr = !1,
        t)
            throw Error(y(300));
        return e
    }
    function to() {
        var e = bn !== 0;
        return bn = 0,
        e
    }
    function Ye() {
        var e = {
            memoizedState: null,
            baseState: null,
            baseQueue: null,
            queue: null,
            next: null
        };
        return ne === null ? G.memoizedState = ne = e : ne = ne.next = e,
        ne
    }
    function Re() {
        if (ee === null) {
            var e = G.alternate;
            e = e !== null ? e.memoizedState : null
        } else
            e = ee.next;
        var t = ne === null ? G.memoizedState : ne.next;
        if (t !== null)
            ne = t,
            ee = e;
        else {
            if (e === null)
                throw Error(y(310));
            ee = e,
            e = {
                memoizedState: ee.memoizedState,
                baseState: ee.baseState,
                baseQueue: ee.baseQueue,
                queue: ee.queue,
                next: null
            },
            ne === null ? G.memoizedState = ne = e : ne = ne.next = e
        }
        return ne
    }
    function er(e, t) {
        return typeof t == "function" ? t(e) : t
    }
    function no(e) {
        var t = Re()
          , n = t.queue;
        if (n === null)
            throw Error(y(311));
        n.lastRenderedReducer = e;
        var r = ee
          , l = r.baseQueue
          , i = n.pending;
        if (i !== null) {
            if (l !== null) {
                var o = l.next;
                l.next = i.next,
                i.next = o
            }
            r.baseQueue = l = i,
            n.pending = null
        }
        if (l !== null) {
            i = l.next,
            r = r.baseState;
            var u = o = null
              , s = null
              , d = i;
            do {
                var m = d.lane;
                if ((Dt & m) === m)
                    s !== null && (s = s.next = {
                        lane: 0,
                        action: d.action,
                        hasEagerState: d.hasEagerState,
                        eagerState: d.eagerState,
                        next: null
                    }),
                    r = d.hasEagerState ? d.eagerState : e(r, d.action);
                else {
                    var h = {
                        lane: m,
                        action: d.action,
                        hasEagerState: d.hasEagerState,
                        eagerState: d.eagerState,
                        next: null
                    };
                    s === null ? (u = s = h,
                    o = r) : s = s.next = h,
                    G.lanes |= m,
                    Ft |= m
                }
                d = d.next
            } while (d !== null && d !== i);
            s === null ? o = r : s.next = u,
            je(r, t.memoizedState) || (Se = !0),
            t.memoizedState = r,
            t.baseState = o,
            t.baseQueue = s,
            n.lastRenderedState = r
        }
        if (e = n.interleaved,
        e !== null) {
            l = e;
            do
                i = l.lane,
                G.lanes |= i,
                Ft |= i,
                l = l.next;
            while (l !== e)
        } else
            l === null && (n.lanes = 0);
        return [t.memoizedState, n.dispatch]
    }
    function ro(e) {
        var t = Re()
          , n = t.queue;
        if (n === null)
            throw Error(y(311));
        n.lastRenderedReducer = e;
        var r = n.dispatch
          , l = n.pending
          , i = t.memoizedState;
        if (l !== null) {
            n.pending = null;
            var o = l = l.next;
            do
                i = e(i, o.action),
                o = o.next;
            while (o !== l);
            je(i, t.memoizedState) || (Se = !0),
            t.memoizedState = i,
            t.baseQueue === null && (t.baseState = i),
            n.lastRenderedState = i
        }
        return [i, r]
    }
    function Hs() {}
    function Bs(e, t) {
        var n = G
          , r = Re()
          , l = t()
          , i = !je(r.memoizedState, l);
        if (i && (r.memoizedState = l,
        Se = !0),
        r = r.queue,
        lo(Qs.bind(null, n, r, e), [e]),
        r.getSnapshot !== t || i || ne !== null && ne.memoizedState.tag & 1) {
            if (n.flags |= 2048,
            tr(9, Ks.bind(null, n, r, l, t), void 0, null),
            re === null)
                throw Error(y(349));
            Dt & 30 || Ws(n, t, l)
        }
        return l
    }
    function Ws(e, t, n) {
        e.flags |= 16384,
        e = {
            getSnapshot: t,
            value: n
        },
        t = G.updateQueue,
        t === null ? (t = {
            lastEffect: null,
            stores: null
        },
        G.updateQueue = t,
        t.stores = [e]) : (n = t.stores,
        n === null ? t.stores = [e] : n.push(e))
    }
    function Ks(e, t, n, r) {
        t.value = n,
        t.getSnapshot = r,
        Ys(t) && Xs(e)
    }
    function Qs(e, t, n) {
        return n(function() {
            Ys(t) && Xs(e)
        })
    }
    function Ys(e) {
        var t = e.getSnapshot;
        e = e.value;
        try {
            var n = t();
            return !je(e, n)
        } catch {
            return !0
        }
    }
    function Xs(e) {
        var t = tt(e, 1);
        t !== null && He(t, e, 1, -1)
    }
    function Gs(e) {
        var t = Ye();
        return typeof e == "function" && (e = e()),
        t.memoizedState = t.baseState = e,
        e = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: er,
            lastRenderedState: e
        },
        t.queue = e,
        e = e.dispatch = lf.bind(null, G, e),
        [t.memoizedState, e]
    }
    function tr(e, t, n, r) {
        return e = {
            tag: e,
            create: t,
            destroy: n,
            deps: r,
            next: null
        },
        t = G.updateQueue,
        t === null ? (t = {
            lastEffect: null,
            stores: null
        },
        G.updateQueue = t,
        t.lastEffect = e.next = e) : (n = t.lastEffect,
        n === null ? t.lastEffect = e.next = e : (r = n.next,
        n.next = e,
        e.next = r,
        t.lastEffect = e)),
        e
    }
    function Zs() {
        return Re().memoizedState
    }
    function br(e, t, n, r) {
        var l = Ye();
        G.flags |= e,
        l.memoizedState = tr(1 | t, n, void 0, r === void 0 ? null : r)
    }
    function el(e, t, n, r) {
        var l = Re();
        r = r === void 0 ? null : r;
        var i = void 0;
        if (ee !== null) {
            var o = ee.memoizedState;
            if (i = o.destroy,
            r !== null && bi(r, o.deps)) {
                l.memoizedState = tr(t, n, i, r);
                return
            }
        }
        G.flags |= e,
        l.memoizedState = tr(1 | t, n, i, r)
    }
    function Js(e, t) {
        return br(8390656, 8, e, t)
    }
    function lo(e, t) {
        return el(2048, 8, e, t)
    }
    function qs(e, t) {
        return el(4, 2, e, t)
    }
    function bs(e, t) {
        return el(4, 4, e, t)
    }
    function ea(e, t) {
        if (typeof t == "function")
            return e = e(),
            t(e),
            function() {
                t(null)
            }
            ;
        if (t != null)
            return e = e(),
            t.current = e,
            function() {
                t.current = null
            }
    }
    function ta(e, t, n) {
        return n = n != null ? n.concat([e]) : null,
        el(4, 4, ea.bind(null, t, e), n)
    }
    function io() {}
    function na(e, t) {
        var n = Re();
        t = t === void 0 ? null : t;
        var r = n.memoizedState;
        return r !== null && t !== null && bi(t, r[1]) ? r[0] : (n.memoizedState = [e, t],
        e)
    }
    function ra(e, t) {
        var n = Re();
        t = t === void 0 ? null : t;
        var r = n.memoizedState;
        return r !== null && t !== null && bi(t, r[1]) ? r[0] : (e = e(),
        n.memoizedState = [e, t],
        e)
    }
    function la(e, t, n) {
        return Dt & 21 ? (je(n, t) || (n = Mu(),
        G.lanes |= n,
        Ft |= n,
        e.baseState = !0),
        t) : (e.baseState && (e.baseState = !1,
        Se = !0),
        e.memoizedState = n)
    }
    function nf(e, t) {
        var n = U;
        U = n !== 0 && 4 > n ? n : 4,
        e(!0);
        var r = qi.transition;
        qi.transition = {};
        try {
            e(!1),
            t()
        } finally {
            U = n,
            qi.transition = r
        }
    }
    function ia() {
        return Re().memoizedState
    }
    function rf(e, t, n) {
        var r = Ct(e);
        if (n = {
            lane: r,
            action: n,
            hasEagerState: !1,
            eagerState: null,
            next: null
        },
        oa(e))
            ua(t, n);
        else if (n = js(e, t, n, r),
        n !== null) {
            var l = ve();
            He(n, e, r, l),
            sa(n, t, r)
        }
    }
    function lf(e, t, n) {
        var r = Ct(e)
          , l = {
            lane: r,
            action: n,
            hasEagerState: !1,
            eagerState: null,
            next: null
        };
        if (oa(e))
            ua(t, l);
        else {
            var i = e.alternate;
            if (e.lanes === 0 && (i === null || i.lanes === 0) && (i = t.lastRenderedReducer,
            i !== null))
                try {
                    var o = t.lastRenderedState
                      , u = i(o, n);
                    if (l.hasEagerState = !0,
                    l.eagerState = u,
                    je(u, o)) {
                        var s = t.interleaved;
                        s === null ? (l.next = l,
                        Qi(t)) : (l.next = s.next,
                        s.next = l),
                        t.interleaved = l;
                        return
                    }
                } catch {} finally {}
            n = js(e, t, l, r),
            n !== null && (l = ve(),
            He(n, e, r, l),
            sa(n, t, r))
        }
    }
    function oa(e) {
        var t = e.alternate;
        return e === G || t !== null && t === G
    }
    function ua(e, t) {
        qn = qr = !0;
        var n = e.pending;
        n === null ? t.next = t : (t.next = n.next,
        n.next = t),
        e.pending = t
    }
    function sa(e, t, n) {
        if (n & 4194240) {
            var r = t.lanes;
            r &= e.pendingLanes,
            n |= r,
            t.lanes = n,
            ui(e, n)
        }
    }
    var tl = {
        readContext: Oe,
        useCallback: ae,
        useContext: ae,
        useEffect: ae,
        useImperativeHandle: ae,
        useInsertionEffect: ae,
        useLayoutEffect: ae,
        useMemo: ae,
        useReducer: ae,
        useRef: ae,
        useState: ae,
        useDebugValue: ae,
        useDeferredValue: ae,
        useTransition: ae,
        useMutableSource: ae,
        useSyncExternalStore: ae,
        useId: ae,
        unstable_isNewReconciler: !1
    }
      , of = {
        readContext: Oe,
        useCallback: function(e, t) {
            return Ye().memoizedState = [e, t === void 0 ? null : t],
            e
        },
        useContext: Oe,
        useEffect: Js,
        useImperativeHandle: function(e, t, n) {
            return n = n != null ? n.concat([e]) : null,
            br(4194308, 4, ea.bind(null, t, e), n)
        },
        useLayoutEffect: function(e, t) {
            return br(4194308, 4, e, t)
        },
        useInsertionEffect: function(e, t) {
            return br(4, 2, e, t)
        },
        useMemo: function(e, t) {
            var n = Ye();
            return t = t === void 0 ? null : t,
            e = e(),
            n.memoizedState = [e, t],
            e
        },
        useReducer: function(e, t, n) {
            var r = Ye();
            return t = n !== void 0 ? n(t) : t,
            r.memoizedState = r.baseState = t,
            e = {
                pending: null,
                interleaved: null,
                lanes: 0,
                dispatch: null,
                lastRenderedReducer: e,
                lastRenderedState: t
            },
            r.queue = e,
            e = e.dispatch = rf.bind(null, G, e),
            [r.memoizedState, e]
        },
        useRef: function(e) {
            var t = Ye();
            return e = {
                current: e
            },
            t.memoizedState = e
        },
        useState: Gs,
        useDebugValue: io,
        useDeferredValue: function(e) {
            return Ye().memoizedState = e
        },
        useTransition: function() {
            var e = Gs(!1)
              , t = e[0];
            return e = nf.bind(null, e[1]),
            Ye().memoizedState = e,
            [t, e]
        },
        useMutableSource: function() {},
        useSyncExternalStore: function(e, t, n) {
            var r = G
              , l = Ye();
            if (Q) {
                if (n === void 0)
                    throw Error(y(407));
                n = n()
            } else {
                if (n = t(),
                re === null)
                    throw Error(y(349));
                Dt & 30 || Ws(r, t, n)
            }
            l.memoizedState = n;
            var i = {
                value: n,
                getSnapshot: t
            };
            return l.queue = i,
            Js(Qs.bind(null, r, i, e), [e]),
            r.flags |= 2048,
            tr(9, Ks.bind(null, r, i, n, t), void 0, null),
            n
        },
        useId: function() {
            var e = Ye()
              , t = re.identifierPrefix;
            if (Q) {
                var n = et
                  , r = be;
                n = (r & ~(1 << 32 - Fe(r) - 1)).toString(32) + n,
                t = ":" + t + "R" + n,
                n = bn++,
                0 < n && (t += "H" + n.toString(32)),
                t += ":"
            } else
                n = tf++,
                t = ":" + t + "r" + n.toString(32) + ":";
            return e.memoizedState = t
        },
        unstable_isNewReconciler: !1
    }
      , uf = {
        readContext: Oe,
        useCallback: na,
        useContext: Oe,
        useEffect: lo,
        useImperativeHandle: ta,
        useInsertionEffect: qs,
        useLayoutEffect: bs,
        useMemo: ra,
        useReducer: no,
        useRef: Zs,
        useState: function() {
            return no(er)
        },
        useDebugValue: io,
        useDeferredValue: function(e) {
            var t = Re();
            return la(t, ee.memoizedState, e)
        },
        useTransition: function() {
            var e = no(er)[0]
              , t = Re().memoizedState;
            return [e, t]
        },
        useMutableSource: Hs,
        useSyncExternalStore: Bs,
        useId: ia,
        unstable_isNewReconciler: !1
    }
      , sf = {
        readContext: Oe,
        useCallback: na,
        useContext: Oe,
        useEffect: lo,
        useImperativeHandle: ta,
        useInsertionEffect: qs,
        useLayoutEffect: bs,
        useMemo: ra,
        useReducer: ro,
        useRef: Zs,
        useState: function() {
            return ro(er)
        },
        useDebugValue: io,
        useDeferredValue: function(e) {
            var t = Re();
            return ee === null ? t.memoizedState = e : la(t, ee.memoizedState, e)
        },
        useTransition: function() {
            var e = ro(er)[0]
              , t = Re().memoizedState;
            return [e, t]
        },
        useMutableSource: Hs,
        useSyncExternalStore: Bs,
        useId: ia,
        unstable_isNewReconciler: !1
    };
    function Ue(e, t) {
        if (e && e.defaultProps) {
            t = Y({}, t),
            e = e.defaultProps;
            for (var n in e)
                t[n] === void 0 && (t[n] = e[n]);
            return t
        }
        return t
    }
    function oo(e, t, n, r) {
        t = e.memoizedState,
        n = n(r, t),
        n = n == null ? t : Y({}, t, n),
        e.memoizedState = n,
        e.lanes === 0 && (e.updateQueue.baseState = n)
    }
    var nl = {
        isMounted: function(e) {
            return (e = e._reactInternals) ? zt(e) === e : !1
        },
        enqueueSetState: function(e, t, n) {
            e = e._reactInternals;
            var r = ve()
              , l = Ct(e)
              , i = nt(r, l);
            i.payload = t,
            n != null && (i.callback = n),
            t = wt(e, i, l),
            t !== null && (He(t, e, l, r),
            Xr(t, e, l))
        },
        enqueueReplaceState: function(e, t, n) {
            e = e._reactInternals;
            var r = ve()
              , l = Ct(e)
              , i = nt(r, l);
            i.tag = 1,
            i.payload = t,
            n != null && (i.callback = n),
            t = wt(e, i, l),
            t !== null && (He(t, e, l, r),
            Xr(t, e, l))
        },
        enqueueForceUpdate: function(e, t) {
            e = e._reactInternals;
            var n = ve()
              , r = Ct(e)
              , l = nt(n, r);
            l.tag = 2,
            t != null && (l.callback = t),
            t = wt(e, l, r),
            t !== null && (He(t, e, r, n),
            Xr(t, e, r))
        }
    };
    function aa(e, t, n, r, l, i, o) {
        return e = e.stateNode,
        typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, i, o) : t.prototype && t.prototype.isPureReactComponent ? !An(n, r) || !An(l, i) : !0
    }
    function ca(e, t, n) {
        var r = !1
          , l = vt
          , i = t.contextType;
        return typeof i == "object" && i !== null ? i = Oe(i) : (l = we(t) ? Lt : se.current,
        r = t.contextTypes,
        i = (r = r != null) ? ln(e, l) : vt),
        t = new t(n,i),
        e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null,
        t.updater = nl,
        e.stateNode = t,
        t._reactInternals = e,
        r && (e = e.stateNode,
        e.__reactInternalMemoizedUnmaskedChildContext = l,
        e.__reactInternalMemoizedMaskedChildContext = i),
        t
    }
    function da(e, t, n, r) {
        e = t.state,
        typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r),
        typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r),
        t.state !== e && nl.enqueueReplaceState(t, t.state, null)
    }
    function uo(e, t, n, r) {
        var l = e.stateNode;
        l.props = n,
        l.state = e.memoizedState,
        l.refs = {},
        Yi(e);
        var i = t.contextType;
        typeof i == "object" && i !== null ? l.context = Oe(i) : (i = we(t) ? Lt : se.current,
        l.context = ln(e, i)),
        l.state = e.memoizedState,
        i = t.getDerivedStateFromProps,
        typeof i == "function" && (oo(e, t, i, n),
        l.state = e.memoizedState),
        typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state,
        typeof l.componentWillMount == "function" && l.componentWillMount(),
        typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(),
        t !== l.state && nl.enqueueReplaceState(l, l.state, null),
        Gr(e, n, l, r),
        l.state = e.memoizedState),
        typeof l.componentDidMount == "function" && (e.flags |= 4194308)
    }
    function pn(e, t) {
        try {
            var n = ""
              , r = t;
            do
                n += Dc(r),
                r = r.return;
            while (r);
            var l = n
        } catch (i) {
            l = `
Error generating stack: ` + i.message + `
` + i.stack
        }
        return {
            value: e,
            source: t,
            stack: l,
            digest: null
        }
    }
    function so(e, t, n) {
        return {
            value: e,
            source: null,
            stack: n ?? null,
            digest: t ?? null
        }
    }
    function ao(e, t) {
        try {
            console.error(t.value)
        } catch (n) {
            setTimeout(function() {
                throw n
            })
        }
    }
    var af = typeof WeakMap == "function" ? WeakMap : Map;
    function fa(e, t, n) {
        n = nt(-1, n),
        n.tag = 3,
        n.payload = {
            element: null
        };
        var r = t.value;
        return n.callback = function() {
            al || (al = !0,
            _o = r),
            ao(e, t)
        }
        ,
        n
    }
    function pa(e, t, n) {
        n = nt(-1, n),
        n.tag = 3;
        var r = e.type.getDerivedStateFromError;
        if (typeof r == "function") {
            var l = t.value;
            n.payload = function() {
                return r(l)
            }
            ,
            n.callback = function() {
                ao(e, t)
            }
        }
        var i = e.stateNode;
        return i !== null && typeof i.componentDidCatch == "function" && (n.callback = function() {
            ao(e, t),
            typeof r != "function" && (kt === null ? kt = new Set([this]) : kt.add(this));
            var o = t.stack;
            this.componentDidCatch(t.value, {
                componentStack: o !== null ? o : ""
            })
        }
        ),
        n
    }
    function ha(e, t, n) {
        var r = e.pingCache;
        if (r === null) {
            r = e.pingCache = new af;
            var l = new Set;
            r.set(t, l)
        } else
            l = r.get(t),
            l === void 0 && (l = new Set,
            r.set(t, l));
        l.has(n) || (l.add(n),
        e = Cf.bind(null, e, t, n),
        t.then(e, e))
    }
    function ma(e) {
        do {
            var t;
            if ((t = e.tag === 13) && (t = e.memoizedState,
            t = t !== null ? t.dehydrated !== null : !0),
            t)
                return e;
            e = e.return
        } while (e !== null);
        return null
    }
    function va(e, t, n, r, l) {
        return e.mode & 1 ? (e.flags |= 65536,
        e.lanes = l,
        e) : (e === t ? e.flags |= 65536 : (e.flags |= 128,
        n.flags |= 131072,
        n.flags &= -52805,
        n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = nt(-1, 1),
        t.tag = 2,
        wt(n, t, 1))),
        n.lanes |= 1),
        e)
    }
    var cf = Ze.ReactCurrentOwner
      , Se = !1;
    function me(e, t, n, r) {
        t.child = e === null ? Fs(t, null, n, r) : an(t, e.child, n, r)
    }
    function ya(e, t, n, r, l) {
        n = n.render;
        var i = t.ref;
        return dn(t, l),
        r = eo(e, t, n, r, i, l),
        n = to(),
        e !== null && !Se ? (t.updateQueue = e.updateQueue,
        t.flags &= -2053,
        e.lanes &= ~l,
        rt(e, t, l)) : (Q && n && ji(t),
        t.flags |= 1,
        me(e, t, r, l),
        t.child)
    }
    function ga(e, t, n, r, l) {
        if (e === null) {
            var i = n.type;
            return typeof i == "function" && !Oo(i) && i.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15,
            t.type = i,
            wa(e, t, i, r, l)) : (e = ml(n.type, null, r, t, t.mode, l),
            e.ref = t.ref,
            e.return = t,
            t.child = e)
        }
        if (i = e.child,
        !(e.lanes & l)) {
            var o = i.memoizedProps;
            if (n = n.compare,
            n = n !== null ? n : An,
            n(o, r) && e.ref === t.ref)
                return rt(e, t, l)
        }
        return t.flags |= 1,
        e = _t(i, r),
        e.ref = t.ref,
        e.return = t,
        t.child = e
    }
    function wa(e, t, n, r, l) {
        if (e !== null) {
            var i = e.memoizedProps;
            if (An(i, r) && e.ref === t.ref)
                if (Se = !1,
                t.pendingProps = r = i,
                (e.lanes & l) !== 0)
                    e.flags & 131072 && (Se = !0);
                else
                    return t.lanes = e.lanes,
                    rt(e, t, l)
        }
        return co(e, t, n, r, l)
    }
    function Sa(e, t, n) {
        var r = t.pendingProps
          , l = r.children
          , i = e !== null ? e.memoizedState : null;
        if (r.mode === "hidden")
            if (!(t.mode & 1))
                t.memoizedState = {
                    baseLanes: 0,
                    cachePool: null,
                    transitions: null
                },
                A(mn, ze),
                ze |= n;
            else {
                if (!(n & 1073741824))
                    return e = i !== null ? i.baseLanes | n : n,
                    t.lanes = t.childLanes = 1073741824,
                    t.memoizedState = {
                        baseLanes: e,
                        cachePool: null,
                        transitions: null
                    },
                    t.updateQueue = null,
                    A(mn, ze),
                    ze |= e,
                    null;
                t.memoizedState = {
                    baseLanes: 0,
                    cachePool: null,
                    transitions: null
                },
                r = i !== null ? i.baseLanes : n,
                A(mn, ze),
                ze |= r
            }
        else
            i !== null ? (r = i.baseLanes | n,
            t.memoizedState = null) : r = n,
            A(mn, ze),
            ze |= r;
        return me(e, t, l, n),
        t.child
    }
    function ka(e, t) {
        var n = t.ref;
        (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512,
        t.flags |= 2097152)
    }
    function co(e, t, n, r, l) {
        var i = we(n) ? Lt : se.current;
        return i = ln(t, i),
        dn(t, l),
        n = eo(e, t, n, r, i, l),
        r = to(),
        e !== null && !Se ? (t.updateQueue = e.updateQueue,
        t.flags &= -2053,
        e.lanes &= ~l,
        rt(e, t, l)) : (Q && r && ji(t),
        t.flags |= 1,
        me(e, t, n, l),
        t.child)
    }
    function Ea(e, t, n, r, l) {
        if (we(n)) {
            var i = !0;
            Vr(t)
        } else
            i = !1;
        if (dn(t, l),
        t.stateNode === null)
            ll(e, t),
            ca(t, n, r),
            uo(t, n, r, l),
            r = !0;
        else if (e === null) {
            var o = t.stateNode
              , u = t.memoizedProps;
            o.props = u;
            var s = o.context
              , d = n.contextType;
            typeof d == "object" && d !== null ? d = Oe(d) : (d = we(n) ? Lt : se.current,
            d = ln(t, d));
            var m = n.getDerivedStateFromProps
              , h = typeof m == "function" || typeof o.getSnapshotBeforeUpdate == "function";
            h || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (u !== r || s !== d) && da(t, o, r, d),
            gt = !1;
            var p = t.memoizedState;
            o.state = p,
            Gr(t, r, o, l),
            s = t.memoizedState,
            u !== r || p !== s || ge.current || gt ? (typeof m == "function" && (oo(t, n, m, r),
            s = t.memoizedState),
            (u = gt || aa(t, n, u, r, p, s, d)) ? (h || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(),
            typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()),
            typeof o.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308),
            t.memoizedProps = r,
            t.memoizedState = s),
            o.props = r,
            o.state = s,
            o.context = d,
            r = u) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308),
            r = !1)
        } else {
            o = t.stateNode,
            $s(e, t),
            u = t.memoizedProps,
            d = t.type === t.elementType ? u : Ue(t.type, u),
            o.props = d,
            h = t.pendingProps,
            p = o.context,
            s = n.contextType,
            typeof s == "object" && s !== null ? s = Oe(s) : (s = we(n) ? Lt : se.current,
            s = ln(t, s));
            var w = n.getDerivedStateFromProps;
            (m = typeof w == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (u !== h || p !== s) && da(t, o, r, s),
            gt = !1,
            p = t.memoizedState,
            o.state = p,
            Gr(t, r, o, l);
            var k = t.memoizedState;
            u !== h || p !== k || ge.current || gt ? (typeof w == "function" && (oo(t, n, w, r),
            k = t.memoizedState),
            (d = gt || aa(t, n, d, r, p, k, s) || !1) ? (m || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(r, k, s),
            typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(r, k, s)),
            typeof o.componentDidUpdate == "function" && (t.flags |= 4),
            typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || u === e.memoizedProps && p === e.memoizedState || (t.flags |= 4),
            typeof o.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024),
            t.memoizedProps = r,
            t.memoizedState = k),
            o.props = r,
            o.state = k,
            o.context = s,
            r = d) : (typeof o.componentDidUpdate != "function" || u === e.memoizedProps && p === e.memoizedState || (t.flags |= 4),
            typeof o.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024),
            r = !1)
        }
        return fo(e, t, n, r, i, l)
    }
    function fo(e, t, n, r, l, i) {
        ka(e, t);
        var o = (t.flags & 128) !== 0;
        if (!r && !o)
            return l && Ps(t, n, !1),
            rt(e, t, i);
        r = t.stateNode,
        cf.current = t;
        var u = o && typeof n.getDerivedStateFromError != "function" ? null : r.render();
        return t.flags |= 1,
        e !== null && o ? (t.child = an(t, e.child, null, i),
        t.child = an(t, null, u, i)) : me(e, t, u, i),
        t.memoizedState = r.state,
        l && Ps(t, n, !0),
        t.child
    }
    function Ca(e) {
        var t = e.stateNode;
        t.pendingContext ? _s(e, t.pendingContext, t.pendingContext !== t.context) : t.context && _s(e, t.context, !1),
        Xi(e, t.containerInfo)
    }
    function xa(e, t, n, r, l) {
        return sn(),
        Ai(l),
        t.flags |= 256,
        me(e, t, n, r),
        t.child
    }
    var po = {
        dehydrated: null,
        treeContext: null,
        retryLane: 0
    };
    function ho(e) {
        return {
            baseLanes: e,
            cachePool: null,
            transitions: null
        }
    }
    function _a(e, t, n) {
        var r = t.pendingProps, l = X.current, i = !1, o = (t.flags & 128) !== 0, u;
        if ((u = o) || (u = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0),
        u ? (i = !0,
        t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1),
        A(X, l & 1),
        e === null)
            return Vi(t),
            e = t.memoizedState,
            e !== null && (e = e.dehydrated,
            e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1,
            null) : (o = r.children,
            e = r.fallback,
            i ? (r = t.mode,
            i = t.child,
            o = {
                mode: "hidden",
                children: o
            },
            !(r & 1) && i !== null ? (i.childLanes = 0,
            i.pendingProps = o) : i = vl(o, r, 0, null),
            e = Vt(e, r, n, null),
            i.return = t,
            e.return = t,
            i.sibling = e,
            t.child = i,
            t.child.memoizedState = ho(n),
            t.memoizedState = po,
            e) : mo(t, o));
        if (l = e.memoizedState,
        l !== null && (u = l.dehydrated,
        u !== null))
            return df(e, t, o, r, u, l, n);
        if (i) {
            i = r.fallback,
            o = t.mode,
            l = e.child,
            u = l.sibling;
            var s = {
                mode: "hidden",
                children: r.children
            };
            return !(o & 1) && t.child !== l ? (r = t.child,
            r.childLanes = 0,
            r.pendingProps = s,
            t.deletions = null) : (r = _t(l, s),
            r.subtreeFlags = l.subtreeFlags & 14680064),
            u !== null ? i = _t(u, i) : (i = Vt(i, o, n, null),
            i.flags |= 2),
            i.return = t,
            r.return = t,
            r.sibling = i,
            t.child = r,
            r = i,
            i = t.child,
            o = e.child.memoizedState,
            o = o === null ? ho(n) : {
                baseLanes: o.baseLanes | n,
                cachePool: null,
                transitions: o.transitions
            },
            i.memoizedState = o,
            i.childLanes = e.childLanes & ~n,
            t.memoizedState = po,
            r
        }
        return i = e.child,
        e = i.sibling,
        r = _t(i, {
            mode: "visible",
            children: r.children
        }),
        !(t.mode & 1) && (r.lanes = n),
        r.return = t,
        r.sibling = null,
        e !== null && (n = t.deletions,
        n === null ? (t.deletions = [e],
        t.flags |= 16) : n.push(e)),
        t.child = r,
        t.memoizedState = null,
        r
    }
    function mo(e, t) {
        return t = vl({
            mode: "visible",
            children: t
        }, e.mode, 0, null),
        t.return = e,
        e.child = t
    }
    function rl(e, t, n, r) {
        return r !== null && Ai(r),
        an(t, e.child, null, n),
        e = mo(t, t.pendingProps.children),
        e.flags |= 2,
        t.memoizedState = null,
        e
    }
    function df(e, t, n, r, l, i, o) {
        if (n)
            return t.flags & 256 ? (t.flags &= -257,
            r = so(Error(y(422))),
            rl(e, t, o, r)) : t.memoizedState !== null ? (t.child = e.child,
            t.flags |= 128,
            null) : (i = r.fallback,
            l = t.mode,
            r = vl({
                mode: "visible",
                children: r.children
            }, l, 0, null),
            i = Vt(i, l, o, null),
            i.flags |= 2,
            r.return = t,
            i.return = t,
            r.sibling = i,
            t.child = r,
            t.mode & 1 && an(t, e.child, null, o),
            t.child.memoizedState = ho(o),
            t.memoizedState = po,
            i);
        if (!(t.mode & 1))
            return rl(e, t, o, null);
        if (l.data === "$!") {
            if (r = l.nextSibling && l.nextSibling.dataset,
            r)
                var u = r.dgst;
            return r = u,
            i = Error(y(419)),
            r = so(i, r, void 0),
            rl(e, t, o, r)
        }
        if (u = (o & e.childLanes) !== 0,
        Se || u) {
            if (r = re,
            r !== null) {
                switch (o & -o) {
                case 4:
                    l = 2;
                    break;
                case 16:
                    l = 8;
                    break;
                case 64:
                case 128:
                case 256:
                case 512:
                case 1024:
                case 2048:
                case 4096:
                case 8192:
                case 16384:
                case 32768:
                case 65536:
                case 131072:
                case 262144:
                case 524288:
                case 1048576:
                case 2097152:
                case 4194304:
                case 8388608:
                case 16777216:
                case 33554432:
                case 67108864:
                    l = 32;
                    break;
                case 536870912:
                    l = 268435456;
                    break;
                default:
                    l = 0
                }
                l = l & (r.suspendedLanes | o) ? 0 : l,
                l !== 0 && l !== i.retryLane && (i.retryLane = l,
                tt(e, l),
                He(r, e, l, -1))
            }
            return Io(),
            r = so(Error(y(421))),
            rl(e, t, o, r)
        }
        return l.data === "$?" ? (t.flags |= 128,
        t.child = e.child,
        t = xf.bind(null, e),
        l._reactRetry = t,
        null) : (e = i.treeContext,
        Pe = ht(l.nextSibling),
        Ne = t,
        Q = !0,
        $e = null,
        e !== null && (Le[Ie++] = be,
        Le[Ie++] = et,
        Le[Ie++] = It,
        be = e.id,
        et = e.overflow,
        It = t),
        t = mo(t, r.children),
        t.flags |= 4096,
        t)
    }
    function Na(e, t, n) {
        e.lanes |= t;
        var r = e.alternate;
        r !== null && (r.lanes |= t),
        Ki(e.return, t, n)
    }
    function vo(e, t, n, r, l) {
        var i = e.memoizedState;
        i === null ? e.memoizedState = {
            isBackwards: t,
            rendering: null,
            renderingStartTime: 0,
            last: r,
            tail: n,
            tailMode: l
        } : (i.isBackwards = t,
        i.rendering = null,
        i.renderingStartTime = 0,
        i.last = r,
        i.tail = n,
        i.tailMode = l)
    }
    function Pa(e, t, n) {
        var r = t.pendingProps
          , l = r.revealOrder
          , i = r.tail;
        if (me(e, t, r.children, n),
        r = X.current,
        r & 2)
            r = r & 1 | 2,
            t.flags |= 128;
        else {
            if (e !== null && e.flags & 128)
                e: for (e = t.child; e !== null; ) {
                    if (e.tag === 13)
                        e.memoizedState !== null && Na(e, n, t);
                    else if (e.tag === 19)
                        Na(e, n, t);
                    else if (e.child !== null) {
                        e.child.return = e,
                        e = e.child;
                        continue
                    }
                    if (e === t)
                        break e;
                    for (; e.sibling === null; ) {
                        if (e.return === null || e.return === t)
                            break e;
                        e = e.return
                    }
                    e.sibling.return = e.return,
                    e = e.sibling
                }
            r &= 1
        }
        if (A(X, r),
        !(t.mode & 1))
            t.memoizedState = null;
        else
            switch (l) {
            case "forwards":
                for (n = t.child,
                l = null; n !== null; )
                    e = n.alternate,
                    e !== null && Zr(e) === null && (l = n),
                    n = n.sibling;
                n = l,
                n === null ? (l = t.child,
                t.child = null) : (l = n.sibling,
                n.sibling = null),
                vo(t, !1, l, n, i);
                break;
            case "backwards":
                for (n = null,
                l = t.child,
                t.child = null; l !== null; ) {
                    if (e = l.alternate,
                    e !== null && Zr(e) === null) {
                        t.child = l;
                        break
                    }
                    e = l.sibling,
                    l.sibling = n,
                    n = l,
                    l = e
                }
                vo(t, !0, n, null, i);
                break;
            case "together":
                vo(t, !1, null, null, void 0);
                break;
            default:
                t.memoizedState = null
            }
        return t.child
    }
    function ll(e, t) {
        !(t.mode & 1) && e !== null && (e.alternate = null,
        t.alternate = null,
        t.flags |= 2)
    }
    function rt(e, t, n) {
        if (e !== null && (t.dependencies = e.dependencies),
        Ft |= t.lanes,
        !(n & t.childLanes))
            return null;
        if (e !== null && t.child !== e.child)
            throw Error(y(153));
        if (t.child !== null) {
            for (e = t.child,
            n = _t(e, e.pendingProps),
            t.child = n,
            n.return = t; e.sibling !== null; )
                e = e.sibling,
                n = n.sibling = _t(e, e.pendingProps),
                n.return = t;
            n.sibling = null
        }
        return t.child
    }
    function ff(e, t, n) {
        switch (t.tag) {
        case 3:
            Ca(t),
            sn();
            break;
        case 5:
            As(t);
            break;
        case 1:
            we(t.type) && Vr(t);
            break;
        case 4:
            Xi(t, t.stateNode.containerInfo);
            break;
        case 10:
            var r = t.type._context
              , l = t.memoizedProps.value;
            A(Qr, r._currentValue),
            r._currentValue = l;
            break;
        case 13:
            if (r = t.memoizedState,
            r !== null)
                return r.dehydrated !== null ? (A(X, X.current & 1),
                t.flags |= 128,
                null) : n & t.child.childLanes ? _a(e, t, n) : (A(X, X.current & 1),
                e = rt(e, t, n),
                e !== null ? e.sibling : null);
            A(X, X.current & 1);
            break;
        case 19:
            if (r = (n & t.childLanes) !== 0,
            e.flags & 128) {
                if (r)
                    return Pa(e, t, n);
                t.flags |= 128
            }
            if (l = t.memoizedState,
            l !== null && (l.rendering = null,
            l.tail = null,
            l.lastEffect = null),
            A(X, X.current),
            r)
                break;
            return null;
        case 22:
        case 23:
            return t.lanes = 0,
            Sa(e, t, n)
        }
        return rt(e, t, n)
    }
    var za, yo, Ta, La;
    za = function(e, t) {
        for (var n = t.child; n !== null; ) {
            if (n.tag === 5 || n.tag === 6)
                e.appendChild(n.stateNode);
            else if (n.tag !== 4 && n.child !== null) {
                n.child.return = n,
                n = n.child;
                continue
            }
            if (n === t)
                break;
            for (; n.sibling === null; ) {
                if (n.return === null || n.return === t)
                    return;
                n = n.return
            }
            n.sibling.return = n.return,
            n = n.sibling
        }
    }
    ,
    yo = function() {}
    ,
    Ta = function(e, t, n, r) {
        var l = e.memoizedProps;
        if (l !== r) {
            e = t.stateNode,
            Mt(Qe.current);
            var i = null;
            switch (n) {
            case "input":
                l = Kl(e, l),
                r = Kl(e, r),
                i = [];
                break;
            case "select":
                l = Y({}, l, {
                    value: void 0
                }),
                r = Y({}, r, {
                    value: void 0
                }),
                i = [];
                break;
            case "textarea":
                l = Xl(e, l),
                r = Xl(e, r),
                i = [];
                break;
            default:
                typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = jr)
            }
            Zl(n, r);
            var o;
            n = null;
            for (d in l)
                if (!r.hasOwnProperty(d) && l.hasOwnProperty(d) && l[d] != null)
                    if (d === "style") {
                        var u = l[d];
                        for (o in u)
                            u.hasOwnProperty(o) && (n || (n = {}),
                            n[o] = "")
                    } else
                        d !== "dangerouslySetInnerHTML" && d !== "children" && d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && d !== "autoFocus" && (Sn.hasOwnProperty(d) ? i || (i = []) : (i = i || []).push(d, null));
            for (d in r) {
                var s = r[d];
                if (u = l != null ? l[d] : void 0,
                r.hasOwnProperty(d) && s !== u && (s != null || u != null))
                    if (d === "style")
                        if (u) {
                            for (o in u)
                                !u.hasOwnProperty(o) || s && s.hasOwnProperty(o) || (n || (n = {}),
                                n[o] = "");
                            for (o in s)
                                s.hasOwnProperty(o) && u[o] !== s[o] && (n || (n = {}),
                                n[o] = s[o])
                        } else
                            n || (i || (i = []),
                            i.push(d, n)),
                            n = s;
                    else
                        d === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0,
                        u = u ? u.__html : void 0,
                        s != null && u !== s && (i = i || []).push(d, s)) : d === "children" ? typeof s != "string" && typeof s != "number" || (i = i || []).push(d, "" + s) : d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && (Sn.hasOwnProperty(d) ? (s != null && d === "onScroll" && B("scroll", e),
                        i || u === s || (i = [])) : (i = i || []).push(d, s))
            }
            n && (i = i || []).push("style", n);
            var d = i;
            (t.updateQueue = d) && (t.flags |= 4)
        }
    }
    ,
    La = function(e, t, n, r) {
        n !== r && (t.flags |= 4)
    }
    ;
    function nr(e, t) {
        if (!Q)
            switch (e.tailMode) {
            case "hidden":
                t = e.tail;
                for (var n = null; t !== null; )
                    t.alternate !== null && (n = t),
                    t = t.sibling;
                n === null ? e.tail = null : n.sibling = null;
                break;
            case "collapsed":
                n = e.tail;
                for (var r = null; n !== null; )
                    n.alternate !== null && (r = n),
                    n = n.sibling;
                r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null
            }
    }
    function ce(e) {
        var t = e.alternate !== null && e.alternate.child === e.child
          , n = 0
          , r = 0;
        if (t)
            for (var l = e.child; l !== null; )
                n |= l.lanes | l.childLanes,
                r |= l.subtreeFlags & 14680064,
                r |= l.flags & 14680064,
                l.return = e,
                l = l.sibling;
        else
            for (l = e.child; l !== null; )
                n |= l.lanes | l.childLanes,
                r |= l.subtreeFlags,
                r |= l.flags,
                l.return = e,
                l = l.sibling;
        return e.subtreeFlags |= r,
        e.childLanes = n,
        t
    }
    function pf(e, t, n) {
        var r = t.pendingProps;
        switch ($i(t),
        t.tag) {
        case 2:
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
            return ce(t),
            null;
        case 1:
            return we(t.type) && Ur(),
            ce(t),
            null;
        case 3:
            return r = t.stateNode,
            fn(),
            W(ge),
            W(se),
            Ji(),
            r.pendingContext && (r.context = r.pendingContext,
            r.pendingContext = null),
            (e === null || e.child === null) && (Wr(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024,
            $e !== null && (zo($e),
            $e = null))),
            yo(e, t),
            ce(t),
            null;
        case 5:
            Gi(t);
            var l = Mt(Jn.current);
            if (n = t.type,
            e !== null && t.stateNode != null)
                Ta(e, t, n, r, l),
                e.ref !== t.ref && (t.flags |= 512,
                t.flags |= 2097152);
            else {
                if (!r) {
                    if (t.stateNode === null)
                        throw Error(y(166));
                    return ce(t),
                    null
                }
                if (e = Mt(Qe.current),
                Wr(t)) {
                    r = t.stateNode,
                    n = t.type;
                    var i = t.memoizedProps;
                    switch (r[Ke] = t,
                    r[Qn] = i,
                    e = (t.mode & 1) !== 0,
                    n) {
                    case "dialog":
                        B("cancel", r),
                        B("close", r);
                        break;
                    case "iframe":
                    case "object":
                    case "embed":
                        B("load", r);
                        break;
                    case "video":
                    case "audio":
                        for (l = 0; l < Bn.length; l++)
                            B(Bn[l], r);
                        break;
                    case "source":
                        B("error", r);
                        break;
                    case "img":
                    case "image":
                    case "link":
                        B("error", r),
                        B("load", r);
                        break;
                    case "details":
                        B("toggle", r);
                        break;
                    case "input":
                        cu(r, i),
                        B("invalid", r);
                        break;
                    case "select":
                        r._wrapperState = {
                            wasMultiple: !!i.multiple
                        },
                        B("invalid", r);
                        break;
                    case "textarea":
                        pu(r, i),
                        B("invalid", r)
                    }
                    Zl(n, i),
                    l = null;
                    for (var o in i)
                        if (i.hasOwnProperty(o)) {
                            var u = i[o];
                            o === "children" ? typeof u == "string" ? r.textContent !== u && (i.suppressHydrationWarning !== !0 && Fr(r.textContent, u, e),
                            l = ["children", u]) : typeof u == "number" && r.textContent !== "" + u && (i.suppressHydrationWarning !== !0 && Fr(r.textContent, u, e),
                            l = ["children", "" + u]) : Sn.hasOwnProperty(o) && u != null && o === "onScroll" && B("scroll", r)
                        }
                    switch (n) {
                    case "input":
                        pr(r),
                        fu(r, i, !0);
                        break;
                    case "textarea":
                        pr(r),
                        mu(r);
                        break;
                    case "select":
                    case "option":
                        break;
                    default:
                        typeof i.onClick == "function" && (r.onclick = jr)
                    }
                    r = l,
                    t.updateQueue = r,
                    r !== null && (t.flags |= 4)
                } else {
                    o = l.nodeType === 9 ? l : l.ownerDocument,
                    e === "http://www.w3.org/1999/xhtml" && (e = vu(n)),
                    e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = o.createElement("div"),
                    e.innerHTML = "<script><\/script>",
                    e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = o.createElement(n, {
                        is: r.is
                    }) : (e = o.createElement(n),
                    n === "select" && (o = e,
                    r.multiple ? o.multiple = !0 : r.size && (o.size = r.size))) : e = o.createElementNS(e, n),
                    e[Ke] = t,
                    e[Qn] = r,
                    za(e, t, !1, !1),
                    t.stateNode = e;
                    e: {
                        switch (o = Jl(n, r),
                        n) {
                        case "dialog":
                            B("cancel", e),
                            B("close", e),
                            l = r;
                            break;
                        case "iframe":
                        case "object":
                        case "embed":
                            B("load", e),
                            l = r;
                            break;
                        case "video":
                        case "audio":
                            for (l = 0; l < Bn.length; l++)
                                B(Bn[l], e);
                            l = r;
                            break;
                        case "source":
                            B("error", e),
                            l = r;
                            break;
                        case "img":
                        case "image":
                        case "link":
                            B("error", e),
                            B("load", e),
                            l = r;
                            break;
                        case "details":
                            B("toggle", e),
                            l = r;
                            break;
                        case "input":
                            cu(e, r),
                            l = Kl(e, r),
                            B("invalid", e);
                            break;
                        case "option":
                            l = r;
                            break;
                        case "select":
                            e._wrapperState = {
                                wasMultiple: !!r.multiple
                            },
                            l = Y({}, r, {
                                value: void 0
                            }),
                            B("invalid", e);
                            break;
                        case "textarea":
                            pu(e, r),
                            l = Xl(e, r),
                            B("invalid", e);
                            break;
                        default:
                            l = r
                        }
                        Zl(n, l),
                        u = l;
                        for (i in u)
                            if (u.hasOwnProperty(i)) {
                                var s = u[i];
                                i === "style" ? wu(e, s) : i === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0,
                                s != null && yu(e, s)) : i === "children" ? typeof s == "string" ? (n !== "textarea" || s !== "") && xn(e, s) : typeof s == "number" && xn(e, "" + s) : i !== "suppressContentEditableWarning" && i !== "suppressHydrationWarning" && i !== "autoFocus" && (Sn.hasOwnProperty(i) ? s != null && i === "onScroll" && B("scroll", e) : s != null && Ml(e, i, s, o))
                            }
                        switch (n) {
                        case "input":
                            pr(e),
                            fu(e, r, !1);
                            break;
                        case "textarea":
                            pr(e),
                            mu(e);
                            break;
                        case "option":
                            r.value != null && e.setAttribute("value", "" + ut(r.value));
                            break;
                        case "select":
                            e.multiple = !!r.multiple,
                            i = r.value,
                            i != null ? Qt(e, !!r.multiple, i, !1) : r.defaultValue != null && Qt(e, !!r.multiple, r.defaultValue, !0);
                            break;
                        default:
                            typeof l.onClick == "function" && (e.onclick = jr)
                        }
                        switch (n) {
                        case "button":
                        case "input":
                        case "select":
                        case "textarea":
                            r = !!r.autoFocus;
                            break e;
                        case "img":
                            r = !0;
                            break e;
                        default:
                            r = !1
                        }
                    }
                    r && (t.flags |= 4)
                }
                t.ref !== null && (t.flags |= 512,
                t.flags |= 2097152)
            }
            return ce(t),
            null;
        case 6:
            if (e && t.stateNode != null)
                La(e, t, e.memoizedProps, r);
            else {
                if (typeof r != "string" && t.stateNode === null)
                    throw Error(y(166));
                if (n = Mt(Jn.current),
                Mt(Qe.current),
                Wr(t)) {
                    if (r = t.stateNode,
                    n = t.memoizedProps,
                    r[Ke] = t,
                    (i = r.nodeValue !== n) && (e = Ne,
                    e !== null))
                        switch (e.tag) {
                        case 3:
                            Fr(r.nodeValue, n, (e.mode & 1) !== 0);
                            break;
                        case 5:
                            e.memoizedProps.suppressHydrationWarning !== !0 && Fr(r.nodeValue, n, (e.mode & 1) !== 0)
                        }
                    i && (t.flags |= 4)
                } else
                    r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r),
                    r[Ke] = t,
                    t.stateNode = r
            }
            return ce(t),
            null;
        case 13:
            if (W(X),
            r = t.memoizedState,
            e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
                if (Q && Pe !== null && t.mode & 1 && !(t.flags & 128))
                    Rs(),
                    sn(),
                    t.flags |= 98560,
                    i = !1;
                else if (i = Wr(t),
                r !== null && r.dehydrated !== null) {
                    if (e === null) {
                        if (!i)
                            throw Error(y(318));
                        if (i = t.memoizedState,
                        i = i !== null ? i.dehydrated : null,
                        !i)
                            throw Error(y(317));
                        i[Ke] = t
                    } else
                        sn(),
                        !(t.flags & 128) && (t.memoizedState = null),
                        t.flags |= 4;
                    ce(t),
                    i = !1
                } else
                    $e !== null && (zo($e),
                    $e = null),
                    i = !0;
                if (!i)
                    return t.flags & 65536 ? t : null
            }
            return t.flags & 128 ? (t.lanes = n,
            t) : (r = r !== null,
            r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192,
            t.mode & 1 && (e === null || X.current & 1 ? te === 0 && (te = 3) : Io())),
            t.updateQueue !== null && (t.flags |= 4),
            ce(t),
            null);
        case 4:
            return fn(),
            yo(e, t),
            e === null && Wn(t.stateNode.containerInfo),
            ce(t),
            null;
        case 10:
            return Wi(t.type._context),
            ce(t),
            null;
        case 17:
            return we(t.type) && Ur(),
            ce(t),
            null;
        case 19:
            if (W(X),
            i = t.memoizedState,
            i === null)
                return ce(t),
                null;
            if (r = (t.flags & 128) !== 0,
            o = i.rendering,
            o === null)
                if (r)
                    nr(i, !1);
                else {
                    if (te !== 0 || e !== null && e.flags & 128)
                        for (e = t.child; e !== null; ) {
                            if (o = Zr(e),
                            o !== null) {
                                for (t.flags |= 128,
                                nr(i, !1),
                                r = o.updateQueue,
                                r !== null && (t.updateQueue = r,
                                t.flags |= 4),
                                t.subtreeFlags = 0,
                                r = n,
                                n = t.child; n !== null; )
                                    i = n,
                                    e = r,
                                    i.flags &= 14680066,
                                    o = i.alternate,
                                    o === null ? (i.childLanes = 0,
                                    i.lanes = e,
                                    i.child = null,
                                    i.subtreeFlags = 0,
                                    i.memoizedProps = null,
                                    i.memoizedState = null,
                                    i.updateQueue = null,
                                    i.dependencies = null,
                                    i.stateNode = null) : (i.childLanes = o.childLanes,
                                    i.lanes = o.lanes,
                                    i.child = o.child,
                                    i.subtreeFlags = 0,
                                    i.deletions = null,
                                    i.memoizedProps = o.memoizedProps,
                                    i.memoizedState = o.memoizedState,
                                    i.updateQueue = o.updateQueue,
                                    i.type = o.type,
                                    e = o.dependencies,
                                    i.dependencies = e === null ? null : {
                                        lanes: e.lanes,
                                        firstContext: e.firstContext
                                    }),
                                    n = n.sibling;
                                return A(X, X.current & 1 | 2),
                                t.child
                            }
                            e = e.sibling
                        }
                    i.tail !== null && q() > vn && (t.flags |= 128,
                    r = !0,
                    nr(i, !1),
                    t.lanes = 4194304)
                }
            else {
                if (!r)
                    if (e = Zr(o),
                    e !== null) {
                        if (t.flags |= 128,
                        r = !0,
                        n = e.updateQueue,
                        n !== null && (t.updateQueue = n,
                        t.flags |= 4),
                        nr(i, !0),
                        i.tail === null && i.tailMode === "hidden" && !o.alternate && !Q)
                            return ce(t),
                            null
                    } else
                        2 * q() - i.renderingStartTime > vn && n !== 1073741824 && (t.flags |= 128,
                        r = !0,
                        nr(i, !1),
                        t.lanes = 4194304);
                i.isBackwards ? (o.sibling = t.child,
                t.child = o) : (n = i.last,
                n !== null ? n.sibling = o : t.child = o,
                i.last = o)
            }
            return i.tail !== null ? (t = i.tail,
            i.rendering = t,
            i.tail = t.sibling,
            i.renderingStartTime = q(),
            t.sibling = null,
            n = X.current,
            A(X, r ? n & 1 | 2 : n & 1),
            t) : (ce(t),
            null);
        case 22:
        case 23:
            return Lo(),
            r = t.memoizedState !== null,
            e !== null && e.memoizedState !== null !== r && (t.flags |= 8192),
            r && t.mode & 1 ? ze & 1073741824 && (ce(t),
            t.subtreeFlags & 6 && (t.flags |= 8192)) : ce(t),
            null;
        case 24:
            return null;
        case 25:
            return null
        }
        throw Error(y(156, t.tag))
    }
    function hf(e, t) {
        switch ($i(t),
        t.tag) {
        case 1:
            return we(t.type) && Ur(),
            e = t.flags,
            e & 65536 ? (t.flags = e & -65537 | 128,
            t) : null;
        case 3:
            return fn(),
            W(ge),
            W(se),
            Ji(),
            e = t.flags,
            e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128,
            t) : null;
        case 5:
            return Gi(t),
            null;
        case 13:
            if (W(X),
            e = t.memoizedState,
            e !== null && e.dehydrated !== null) {
                if (t.alternate === null)
                    throw Error(y(340));
                sn()
            }
            return e = t.flags,
            e & 65536 ? (t.flags = e & -65537 | 128,
            t) : null;
        case 19:
            return W(X),
            null;
        case 4:
            return fn(),
            null;
        case 10:
            return Wi(t.type._context),
            null;
        case 22:
        case 23:
            return Lo(),
            null;
        case 24:
            return null;
        default:
            return null
        }
    }
    var il = !1
      , de = !1
      , mf = typeof WeakSet == "function" ? WeakSet : Set
      , x = null;
    function hn(e, t) {
        var n = e.ref;
        if (n !== null)
            if (typeof n == "function")
                try {
                    n(null)
                } catch (r) {
                    J(e, t, r)
                }
            else
                n.current = null
    }
    function go(e, t, n) {
        try {
            n()
        } catch (r) {
            J(e, t, r)
        }
    }
    var Ia = !1;
    function vf(e, t) {
        if (Ti = _r,
        e = as(),
        ki(e)) {
            if ("selectionStart"in e)
                var n = {
                    start: e.selectionStart,
                    end: e.selectionEnd
                };
            else
                e: {
                    n = (n = e.ownerDocument) && n.defaultView || window;
                    var r = n.getSelection && n.getSelection();
                    if (r && r.rangeCount !== 0) {
                        n = r.anchorNode;
                        var l = r.anchorOffset
                          , i = r.focusNode;
                        r = r.focusOffset;
                        try {
                            n.nodeType,
                            i.nodeType
                        } catch {
                            n = null;
                            break e
                        }
                        var o = 0
                          , u = -1
                          , s = -1
                          , d = 0
                          , m = 0
                          , h = e
                          , p = null;
                        t: for (; ; ) {
                            for (var w; h !== n || l !== 0 && h.nodeType !== 3 || (u = o + l),
                            h !== i || r !== 0 && h.nodeType !== 3 || (s = o + r),
                            h.nodeType === 3 && (o += h.nodeValue.length),
                            (w = h.firstChild) !== null; )
                                p = h,
                                h = w;
                            for (; ; ) {
                                if (h === e)
                                    break t;
                                if (p === n && ++d === l && (u = o),
                                p === i && ++m === r && (s = o),
                                (w = h.nextSibling) !== null)
                                    break;
                                h = p,
                                p = h.parentNode
                            }
                            h = w
                        }
                        n = u === -1 || s === -1 ? null : {
                            start: u,
                            end: s
                        }
                    } else
                        n = null
                }
            n = n || {
                start: 0,
                end: 0
            }
        } else
            n = null;
        for (Li = {
            focusedElem: e,
            selectionRange: n
        },
        _r = !1,
        x = t; x !== null; )
            if (t = x,
            e = t.child,
            (t.subtreeFlags & 1028) !== 0 && e !== null)
                e.return = t,
                x = e;
            else
                for (; x !== null; ) {
                    t = x;
                    try {
                        var k = t.alternate;
                        if (t.flags & 1024)
                            switch (t.tag) {
                            case 0:
                            case 11:
                            case 15:
                                break;
                            case 1:
                                if (k !== null) {
                                    var g = k.memoizedProps
                                      , j = k.memoizedState
                                      , c = t.stateNode
                                      , a = c.getSnapshotBeforeUpdate(t.elementType === t.type ? g : Ue(t.type, g), j);
                                    c.__reactInternalSnapshotBeforeUpdate = a
                                }
                                break;
                            case 3:
                                var f = t.stateNode.containerInfo;
                                f.nodeType === 1 ? f.textContent = "" : f.nodeType === 9 && f.documentElement && f.removeChild(f.documentElement);
                                break;
                            case 5:
                            case 6:
                            case 4:
                            case 17:
                                break;
                            default:
                                throw Error(y(163))
                            }
                    } catch (v) {
                        J(t, t.return, v)
                    }
                    if (e = t.sibling,
                    e !== null) {
                        e.return = t.return,
                        x = e;
                        break
                    }
                    x = t.return
                }
        return k = Ia,
        Ia = !1,
        k
    }
    function rr(e, t, n) {
        var r = t.updateQueue;
        if (r = r !== null ? r.lastEffect : null,
        r !== null) {
            var l = r = r.next;
            do {
                if ((l.tag & e) === e) {
                    var i = l.destroy;
                    l.destroy = void 0,
                    i !== void 0 && go(t, n, i)
                }
                l = l.next
            } while (l !== r)
        }
    }
    function ol(e, t) {
        if (t = t.updateQueue,
        t = t !== null ? t.lastEffect : null,
        t !== null) {
            var n = t = t.next;
            do {
                if ((n.tag & e) === e) {
                    var r = n.create;
                    n.destroy = r()
                }
                n = n.next
            } while (n !== t)
        }
    }
    function wo(e) {
        var t = e.ref;
        if (t !== null) {
            var n = e.stateNode;
            switch (e.tag) {
            case 5:
                e = n;
                break;
            default:
                e = n
            }
            typeof t == "function" ? t(e) : t.current = e
        }
    }
    function Oa(e) {
        var t = e.alternate;
        t !== null && (e.alternate = null,
        Oa(t)),
        e.child = null,
        e.deletions = null,
        e.sibling = null,
        e.tag === 5 && (t = e.stateNode,
        t !== null && (delete t[Ke],
        delete t[Qn],
        delete t[Mi],
        delete t[Jd],
        delete t[qd])),
        e.stateNode = null,
        e.return = null,
        e.dependencies = null,
        e.memoizedProps = null,
        e.memoizedState = null,
        e.pendingProps = null,
        e.stateNode = null,
        e.updateQueue = null
    }
    function Ra(e) {
        return e.tag === 5 || e.tag === 3 || e.tag === 4
    }
    function Ma(e) {
        e: for (; ; ) {
            for (; e.sibling === null; ) {
                if (e.return === null || Ra(e.return))
                    return null;
                e = e.return
            }
            for (e.sibling.return = e.return,
            e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
                if (e.flags & 2 || e.child === null || e.tag === 4)
                    continue e;
                e.child.return = e,
                e = e.child
            }
            if (!(e.flags & 2))
                return e.stateNode
        }
    }
    function So(e, t, n) {
        var r = e.tag;
        if (r === 5 || r === 6)
            e = e.stateNode,
            t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode,
            t.insertBefore(e, n)) : (t = n,
            t.appendChild(e)),
            n = n._reactRootContainer,
            n != null || t.onclick !== null || (t.onclick = jr));
        else if (r !== 4 && (e = e.child,
        e !== null))
            for (So(e, t, n),
            e = e.sibling; e !== null; )
                So(e, t, n),
                e = e.sibling
    }
    function ko(e, t, n) {
        var r = e.tag;
        if (r === 5 || r === 6)
            e = e.stateNode,
            t ? n.insertBefore(e, t) : n.appendChild(e);
        else if (r !== 4 && (e = e.child,
        e !== null))
            for (ko(e, t, n),
            e = e.sibling; e !== null; )
                ko(e, t, n),
                e = e.sibling
    }
    var ie = null
      , Ve = !1;
    function St(e, t, n) {
        for (n = n.child; n !== null; )
            Da(e, t, n),
            n = n.sibling
    }
    function Da(e, t, n) {
        if (We && typeof We.onCommitFiberUnmount == "function")
            try {
                We.onCommitFiberUnmount(wr, n)
            } catch {}
        switch (n.tag) {
        case 5:
            de || hn(n, t);
        case 6:
            var r = ie
              , l = Ve;
            ie = null,
            St(e, t, n),
            ie = r,
            Ve = l,
            ie !== null && (Ve ? (e = ie,
            n = n.stateNode,
            e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : ie.removeChild(n.stateNode));
            break;
        case 18:
            ie !== null && (Ve ? (e = ie,
            n = n.stateNode,
            e.nodeType === 8 ? Ri(e.parentNode, n) : e.nodeType === 1 && Ri(e, n),
            Dn(e)) : Ri(ie, n.stateNode));
            break;
        case 4:
            r = ie,
            l = Ve,
            ie = n.stateNode.containerInfo,
            Ve = !0,
            St(e, t, n),
            ie = r,
            Ve = l;
            break;
        case 0:
        case 11:
        case 14:
        case 15:
            if (!de && (r = n.updateQueue,
            r !== null && (r = r.lastEffect,
            r !== null))) {
                l = r = r.next;
                do {
                    var i = l
                      , o = i.destroy;
                    i = i.tag,
                    o !== void 0 && (i & 2 || i & 4) && go(n, t, o),
                    l = l.next
                } while (l !== r)
            }
            St(e, t, n);
            break;
        case 1:
            if (!de && (hn(n, t),
            r = n.stateNode,
            typeof r.componentWillUnmount == "function"))
                try {
                    r.props = n.memoizedProps,
                    r.state = n.memoizedState,
                    r.componentWillUnmount()
                } catch (u) {
                    J(n, t, u)
                }
            St(e, t, n);
            break;
        case 21:
            St(e, t, n);
            break;
        case 22:
            n.mode & 1 ? (de = (r = de) || n.memoizedState !== null,
            St(e, t, n),
            de = r) : St(e, t, n);
            break;
        default:
            St(e, t, n)
        }
    }
    function Fa(e) {
        var t = e.updateQueue;
        if (t !== null) {
            e.updateQueue = null;
            var n = e.stateNode;
            n === null && (n = e.stateNode = new mf),
            t.forEach(function(r) {
                var l = _f.bind(null, e, r);
                n.has(r) || (n.add(r),
                r.then(l, l))
            })
        }
    }
    function Ae(e, t) {
        var n = t.deletions;
        if (n !== null)
            for (var r = 0; r < n.length; r++) {
                var l = n[r];
                try {
                    var i = e
                      , o = t
                      , u = o;
                    e: for (; u !== null; ) {
                        switch (u.tag) {
                        case 5:
                            ie = u.stateNode,
                            Ve = !1;
                            break e;
                        case 3:
                            ie = u.stateNode.containerInfo,
                            Ve = !0;
                            break e;
                        case 4:
                            ie = u.stateNode.containerInfo,
                            Ve = !0;
                            break e
                        }
                        u = u.return
                    }
                    if (ie === null)
                        throw Error(y(160));
                    Da(i, o, l),
                    ie = null,
                    Ve = !1;
                    var s = l.alternate;
                    s !== null && (s.return = null),
                    l.return = null
                } catch (d) {
                    J(l, t, d)
                }
            }
        if (t.subtreeFlags & 12854)
            for (t = t.child; t !== null; )
                ja(t, e),
                t = t.sibling
    }
    function ja(e, t) {
        var n = e.alternate
          , r = e.flags;
        switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
            if (Ae(t, e),
            Xe(e),
            r & 4) {
                try {
                    rr(3, e, e.return),
                    ol(3, e)
                } catch (g) {
                    J(e, e.return, g)
                }
                try {
                    rr(5, e, e.return)
                } catch (g) {
                    J(e, e.return, g)
                }
            }
            break;
        case 1:
            Ae(t, e),
            Xe(e),
            r & 512 && n !== null && hn(n, n.return);
            break;
        case 5:
            if (Ae(t, e),
            Xe(e),
            r & 512 && n !== null && hn(n, n.return),
            e.flags & 32) {
                var l = e.stateNode;
                try {
                    xn(l, "")
                } catch (g) {
                    J(e, e.return, g)
                }
            }
            if (r & 4 && (l = e.stateNode,
            l != null)) {
                var i = e.memoizedProps
                  , o = n !== null ? n.memoizedProps : i
                  , u = e.type
                  , s = e.updateQueue;
                if (e.updateQueue = null,
                s !== null)
                    try {
                        u === "input" && i.type === "radio" && i.name != null && du(l, i),
                        Jl(u, o);
                        var d = Jl(u, i);
                        for (o = 0; o < s.length; o += 2) {
                            var m = s[o]
                              , h = s[o + 1];
                            m === "style" ? wu(l, h) : m === "dangerouslySetInnerHTML" ? yu(l, h) : m === "children" ? xn(l, h) : Ml(l, m, h, d)
                        }
                        switch (u) {
                        case "input":
                            Ql(l, i);
                            break;
                        case "textarea":
                            hu(l, i);
                            break;
                        case "select":
                            var p = l._wrapperState.wasMultiple;
                            l._wrapperState.wasMultiple = !!i.multiple;
                            var w = i.value;
                            w != null ? Qt(l, !!i.multiple, w, !1) : p !== !!i.multiple && (i.defaultValue != null ? Qt(l, !!i.multiple, i.defaultValue, !0) : Qt(l, !!i.multiple, i.multiple ? [] : "", !1))
                        }
                        l[Qn] = i
                    } catch (g) {
                        J(e, e.return, g)
                    }
            }
            break;
        case 6:
            if (Ae(t, e),
            Xe(e),
            r & 4) {
                if (e.stateNode === null)
                    throw Error(y(162));
                l = e.stateNode,
                i = e.memoizedProps;
                try {
                    l.nodeValue = i
                } catch (g) {
                    J(e, e.return, g)
                }
            }
            break;
        case 3:
            if (Ae(t, e),
            Xe(e),
            r & 4 && n !== null && n.memoizedState.isDehydrated)
                try {
                    Dn(t.containerInfo)
                } catch (g) {
                    J(e, e.return, g)
                }
            break;
        case 4:
            Ae(t, e),
            Xe(e);
            break;
        case 13:
            Ae(t, e),
            Xe(e),
            l = e.child,
            l.flags & 8192 && (i = l.memoizedState !== null,
            l.stateNode.isHidden = i,
            !i || l.alternate !== null && l.alternate.memoizedState !== null || (xo = q())),
            r & 4 && Fa(e);
            break;
        case 22:
            if (m = n !== null && n.memoizedState !== null,
            e.mode & 1 ? (de = (d = de) || m,
            Ae(t, e),
            de = d) : Ae(t, e),
            Xe(e),
            r & 8192) {
                if (d = e.memoizedState !== null,
                (e.stateNode.isHidden = d) && !m && e.mode & 1)
                    for (x = e,
                    m = e.child; m !== null; ) {
                        for (h = x = m; x !== null; ) {
                            switch (p = x,
                            w = p.child,
                            p.tag) {
                            case 0:
                            case 11:
                            case 14:
                            case 15:
                                rr(4, p, p.return);
                                break;
                            case 1:
                                hn(p, p.return);
                                var k = p.stateNode;
                                if (typeof k.componentWillUnmount == "function") {
                                    r = p,
                                    n = p.return;
                                    try {
                                        t = r,
                                        k.props = t.memoizedProps,
                                        k.state = t.memoizedState,
                                        k.componentWillUnmount()
                                    } catch (g) {
                                        J(r, n, g)
                                    }
                                }
                                break;
                            case 5:
                                hn(p, p.return);
                                break;
                            case 22:
                                if (p.memoizedState !== null) {
                                    Va(h);
                                    continue
                                }
                            }
                            w !== null ? (w.return = p,
                            x = w) : Va(h)
                        }
                        m = m.sibling
                    }
                e: for (m = null,
                h = e; ; ) {
                    if (h.tag === 5) {
                        if (m === null) {
                            m = h;
                            try {
                                l = h.stateNode,
                                d ? (i = l.style,
                                typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none") : (u = h.stateNode,
                                s = h.memoizedProps.style,
                                o = s != null && s.hasOwnProperty("display") ? s.display : null,
                                u.style.display = gu("display", o))
                            } catch (g) {
                                J(e, e.return, g)
                            }
                        }
                    } else if (h.tag === 6) {
                        if (m === null)
                            try {
                                h.stateNode.nodeValue = d ? "" : h.memoizedProps
                            } catch (g) {
                                J(e, e.return, g)
                            }
                    } else if ((h.tag !== 22 && h.tag !== 23 || h.memoizedState === null || h === e) && h.child !== null) {
                        h.child.return = h,
                        h = h.child;
                        continue
                    }
                    if (h === e)
                        break e;
                    for (; h.sibling === null; ) {
                        if (h.return === null || h.return === e)
                            break e;
                        m === h && (m = null),
                        h = h.return
                    }
                    m === h && (m = null),
                    h.sibling.return = h.return,
                    h = h.sibling
                }
            }
            break;
        case 19:
            Ae(t, e),
            Xe(e),
            r & 4 && Fa(e);
            break;
        case 21:
            break;
        default:
            Ae(t, e),
            Xe(e)
        }
    }
    function Xe(e) {
        var t = e.flags;
        if (t & 2) {
            try {
                e: {
                    for (var n = e.return; n !== null; ) {
                        if (Ra(n)) {
                            var r = n;
                            break e
                        }
                        n = n.return
                    }
                    throw Error(y(160))
                }
                switch (r.tag) {
                case 5:
                    var l = r.stateNode;
                    r.flags & 32 && (xn(l, ""),
                    r.flags &= -33);
                    var i = Ma(e);
                    ko(e, i, l);
                    break;
                case 3:
                case 4:
                    var o = r.stateNode.containerInfo
                      , u = Ma(e);
                    So(e, u, o);
                    break;
                default:
                    throw Error(y(161))
                }
            } catch (s) {
                J(e, e.return, s)
            }
            e.flags &= -3
        }
        t & 4096 && (e.flags &= -4097)
    }
    function yf(e, t, n) {
        x = e,
        $a(e)
    }
    function $a(e, t, n) {
        for (var r = (e.mode & 1) !== 0; x !== null; ) {
            var l = x
              , i = l.child;
            if (l.tag === 22 && r) {
                var o = l.memoizedState !== null || il;
                if (!o) {
                    var u = l.alternate
                      , s = u !== null && u.memoizedState !== null || de;
                    u = il;
                    var d = de;
                    if (il = o,
                    (de = s) && !d)
                        for (x = l; x !== null; )
                            o = x,
                            s = o.child,
                            o.tag === 22 && o.memoizedState !== null ? Aa(l) : s !== null ? (s.return = o,
                            x = s) : Aa(l);
                    for (; i !== null; )
                        x = i,
                        $a(i),
                        i = i.sibling;
                    x = l,
                    il = u,
                    de = d
                }
                Ua(e)
            } else
                l.subtreeFlags & 8772 && i !== null ? (i.return = l,
                x = i) : Ua(e)
        }
    }
    function Ua(e) {
        for (; x !== null; ) {
            var t = x;
            if (t.flags & 8772) {
                var n = t.alternate;
                try {
                    if (t.flags & 8772)
                        switch (t.tag) {
                        case 0:
                        case 11:
                        case 15:
                            de || ol(5, t);
                            break;
                        case 1:
                            var r = t.stateNode;
                            if (t.flags & 4 && !de)
                                if (n === null)
                                    r.componentDidMount();
                                else {
                                    var l = t.elementType === t.type ? n.memoizedProps : Ue(t.type, n.memoizedProps);
                                    r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate)
                                }
                            var i = t.updateQueue;
                            i !== null && Vs(t, i, r);
                            break;
                        case 3:
                            var o = t.updateQueue;
                            if (o !== null) {
                                if (n = null,
                                t.child !== null)
                                    switch (t.child.tag) {
                                    case 5:
                                        n = t.child.stateNode;
                                        break;
                                    case 1:
                                        n = t.child.stateNode
                                    }
                                Vs(t, o, n)
                            }
                            break;
                        case 5:
                            var u = t.stateNode;
                            if (n === null && t.flags & 4) {
                                n = u;
                                var s = t.memoizedProps;
                                switch (t.type) {
                                case "button":
                                case "input":
                                case "select":
                                case "textarea":
                                    s.autoFocus && n.focus();
                                    break;
                                case "img":
                                    s.src && (n.src = s.src)
                                }
                            }
                            break;
                        case 6:
                            break;
                        case 4:
                            break;
                        case 12:
                            break;
                        case 13:
                            if (t.memoizedState === null) {
                                var d = t.alternate;
                                if (d !== null) {
                                    var m = d.memoizedState;
                                    if (m !== null) {
                                        var h = m.dehydrated;
                                        h !== null && Dn(h)
                                    }
                                }
                            }
                            break;
                        case 19:
                        case 17:
                        case 21:
                        case 22:
                        case 23:
                        case 25:
                            break;
                        default:
                            throw Error(y(163))
                        }
                    de || t.flags & 512 && wo(t)
                } catch (p) {
                    J(t, t.return, p)
                }
            }
            if (t === e) {
                x = null;
                break
            }
            if (n = t.sibling,
            n !== null) {
                n.return = t.return,
                x = n;
                break
            }
            x = t.return
        }
    }
    function Va(e) {
        for (; x !== null; ) {
            var t = x;
            if (t === e) {
                x = null;
                break
            }
            var n = t.sibling;
            if (n !== null) {
                n.return = t.return,
                x = n;
                break
            }
            x = t.return
        }
    }
    function Aa(e) {
        for (; x !== null; ) {
            var t = x;
            try {
                switch (t.tag) {
                case 0:
                case 11:
                case 15:
                    var n = t.return;
                    try {
                        ol(4, t)
                    } catch (s) {
                        J(t, n, s)
                    }
                    break;
                case 1:
                    var r = t.stateNode;
                    if (typeof r.componentDidMount == "function") {
                        var l = t.return;
                        try {
                            r.componentDidMount()
                        } catch (s) {
                            J(t, l, s)
                        }
                    }
                    var i = t.return;
                    try {
                        wo(t)
                    } catch (s) {
                        J(t, i, s)
                    }
                    break;
                case 5:
                    var o = t.return;
                    try {
                        wo(t)
                    } catch (s) {
                        J(t, o, s)
                    }
                }
            } catch (s) {
                J(t, t.return, s)
            }
            if (t === e) {
                x = null;
                break
            }
            var u = t.sibling;
            if (u !== null) {
                u.return = t.return,
                x = u;
                break
            }
            x = t.return
        }
    }
    var gf = Math.ceil
      , ul = Ze.ReactCurrentDispatcher
      , Eo = Ze.ReactCurrentOwner
      , Me = Ze.ReactCurrentBatchConfig
      , F = 0
      , re = null
      , b = null
      , oe = 0
      , ze = 0
      , mn = mt(0)
      , te = 0
      , lr = null
      , Ft = 0
      , sl = 0
      , Co = 0
      , ir = null
      , ke = null
      , xo = 0
      , vn = 1 / 0
      , lt = null
      , al = !1
      , _o = null
      , kt = null
      , cl = !1
      , Et = null
      , dl = 0
      , or = 0
      , No = null
      , fl = -1
      , pl = 0;
    function ve() {
        return F & 6 ? q() : fl !== -1 ? fl : fl = q()
    }
    function Ct(e) {
        return e.mode & 1 ? F & 2 && oe !== 0 ? oe & -oe : ef.transition !== null ? (pl === 0 && (pl = Mu()),
        pl) : (e = U,
        e !== 0 || (e = window.event,
        e = e === void 0 ? 16 : Bu(e.type)),
        e) : 1
    }
    function He(e, t, n, r) {
        if (50 < or)
            throw or = 0,
            No = null,
            Error(y(185));
        Ln(e, n, r),
        (!(F & 2) || e !== re) && (e === re && (!(F & 2) && (sl |= n),
        te === 4 && xt(e, oe)),
        Ee(e, r),
        n === 1 && F === 0 && !(t.mode & 1) && (vn = q() + 500,
        Ar && yt()))
    }
    function Ee(e, t) {
        var n = e.callbackNode;
        ed(e, t);
        var r = Er(e, e === re ? oe : 0);
        if (r === 0)
            n !== null && Iu(n),
            e.callbackNode = null,
            e.callbackPriority = 0;
        else if (t = r & -r,
        e.callbackPriority !== t) {
            if (n != null && Iu(n),
            t === 1)
                e.tag === 0 ? bd(Ba.bind(null, e)) : zs(Ba.bind(null, e)),
                Gd(function() {
                    !(F & 6) && yt()
                }),
                n = null;
            else {
                switch (Du(r)) {
                case 1:
                    n = li;
                    break;
                case 4:
                    n = Ou;
                    break;
                case 16:
                    n = gr;
                    break;
                case 536870912:
                    n = Ru;
                    break;
                default:
                    n = gr
                }
                n = Ja(n, Ha.bind(null, e))
            }
            e.callbackPriority = t,
            e.callbackNode = n
        }
    }
    function Ha(e, t) {
        if (fl = -1,
        pl = 0,
        F & 6)
            throw Error(y(327));
        var n = e.callbackNode;
        if (yn() && e.callbackNode !== n)
            return null;
        var r = Er(e, e === re ? oe : 0);
        if (r === 0)
            return null;
        if (r & 30 || r & e.expiredLanes || t)
            t = hl(e, r);
        else {
            t = r;
            var l = F;
            F |= 2;
            var i = Ka();
            (re !== e || oe !== t) && (lt = null,
            vn = q() + 500,
            $t(e, t));
            do
                try {
                    kf();
                    break
                } catch (u) {
                    Wa(e, u)
                }
            while (1);
            Bi(),
            ul.current = i,
            F = l,
            b !== null ? t = 0 : (re = null,
            oe = 0,
            t = te)
        }
        if (t !== 0) {
            if (t === 2 && (l = ii(e),
            l !== 0 && (r = l,
            t = Po(e, l))),
            t === 1)
                throw n = lr,
                $t(e, 0),
                xt(e, r),
                Ee(e, q()),
                n;
            if (t === 6)
                xt(e, r);
            else {
                if (l = e.current.alternate,
                !(r & 30) && !wf(l) && (t = hl(e, r),
                t === 2 && (i = ii(e),
                i !== 0 && (r = i,
                t = Po(e, i))),
                t === 1))
                    throw n = lr,
                    $t(e, 0),
                    xt(e, r),
                    Ee(e, q()),
                    n;
                switch (e.finishedWork = l,
                e.finishedLanes = r,
                t) {
                case 0:
                case 1:
                    throw Error(y(345));
                case 2:
                    Ut(e, ke, lt);
                    break;
                case 3:
                    if (xt(e, r),
                    (r & 130023424) === r && (t = xo + 500 - q(),
                    10 < t)) {
                        if (Er(e, 0) !== 0)
                            break;
                        if (l = e.suspendedLanes,
                        (l & r) !== r) {
                            ve(),
                            e.pingedLanes |= e.suspendedLanes & l;
                            break
                        }
                        e.timeoutHandle = Oi(Ut.bind(null, e, ke, lt), t);
                        break
                    }
                    Ut(e, ke, lt);
                    break;
                case 4:
                    if (xt(e, r),
                    (r & 4194240) === r)
                        break;
                    for (t = e.eventTimes,
                    l = -1; 0 < r; ) {
                        var o = 31 - Fe(r);
                        i = 1 << o,
                        o = t[o],
                        o > l && (l = o),
                        r &= ~i
                    }
                    if (r = l,
                    r = q() - r,
                    r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * gf(r / 1960)) - r,
                    10 < r) {
                        e.timeoutHandle = Oi(Ut.bind(null, e, ke, lt), r);
                        break
                    }
                    Ut(e, ke, lt);
                    break;
                case 5:
                    Ut(e, ke, lt);
                    break;
                default:
                    throw Error(y(329))
                }
            }
        }
        return Ee(e, q()),
        e.callbackNode === n ? Ha.bind(null, e) : null
    }
    function Po(e, t) {
        var n = ir;
        return e.current.memoizedState.isDehydrated && ($t(e, t).flags |= 256),
        e = hl(e, t),
        e !== 2 && (t = ke,
        ke = n,
        t !== null && zo(t)),
        e
    }
    function zo(e) {
        ke === null ? ke = e : ke.push.apply(ke, e)
    }
    function wf(e) {
        for (var t = e; ; ) {
            if (t.flags & 16384) {
                var n = t.updateQueue;
                if (n !== null && (n = n.stores,
                n !== null))
                    for (var r = 0; r < n.length; r++) {
                        var l = n[r]
                          , i = l.getSnapshot;
                        l = l.value;
                        try {
                            if (!je(i(), l))
                                return !1
                        } catch {
                            return !1
                        }
                    }
            }
            if (n = t.child,
            t.subtreeFlags & 16384 && n !== null)
                n.return = t,
                t = n;
            else {
                if (t === e)
                    break;
                for (; t.sibling === null; ) {
                    if (t.return === null || t.return === e)
                        return !0;
                    t = t.return
                }
                t.sibling.return = t.return,
                t = t.sibling
            }
        }
        return !0
    }
    function xt(e, t) {
        for (t &= ~Co,
        t &= ~sl,
        e.suspendedLanes |= t,
        e.pingedLanes &= ~t,
        e = e.expirationTimes; 0 < t; ) {
            var n = 31 - Fe(t)
              , r = 1 << n;
            e[n] = -1,
            t &= ~r
        }
    }
    function Ba(e) {
        if (F & 6)
            throw Error(y(327));
        yn();
        var t = Er(e, 0);
        if (!(t & 1))
            return Ee(e, q()),
            null;
        var n = hl(e, t);
        if (e.tag !== 0 && n === 2) {
            var r = ii(e);
            r !== 0 && (t = r,
            n = Po(e, r))
        }
        if (n === 1)
            throw n = lr,
            $t(e, 0),
            xt(e, t),
            Ee(e, q()),
            n;
        if (n === 6)
            throw Error(y(345));
        return e.finishedWork = e.current.alternate,
        e.finishedLanes = t,
        Ut(e, ke, lt),
        Ee(e, q()),
        null
    }
    function To(e, t) {
        var n = F;
        F |= 1;
        try {
            return e(t)
        } finally {
            F = n,
            F === 0 && (vn = q() + 500,
            Ar && yt())
        }
    }
    function jt(e) {
        Et !== null && Et.tag === 0 && !(F & 6) && yn();
        var t = F;
        F |= 1;
        var n = Me.transition
          , r = U;
        try {
            if (Me.transition = null,
            U = 1,
            e)
                return e()
        } finally {
            U = r,
            Me.transition = n,
            F = t,
            !(F & 6) && yt()
        }
    }
    function Lo() {
        ze = mn.current,
        W(mn)
    }
    function $t(e, t) {
        e.finishedWork = null,
        e.finishedLanes = 0;
        var n = e.timeoutHandle;
        if (n !== -1 && (e.timeoutHandle = -1,
        Xd(n)),
        b !== null)
            for (n = b.return; n !== null; ) {
                var r = n;
                switch ($i(r),
                r.tag) {
                case 1:
                    r = r.type.childContextTypes,
                    r != null && Ur();
                    break;
                case 3:
                    fn(),
                    W(ge),
                    W(se),
                    Ji();
                    break;
                case 5:
                    Gi(r);
                    break;
                case 4:
                    fn();
                    break;
                case 13:
                    W(X);
                    break;
                case 19:
                    W(X);
                    break;
                case 10:
                    Wi(r.type._context);
                    break;
                case 22:
                case 23:
                    Lo()
                }
                n = n.return
            }
        if (re = e,
        b = e = _t(e.current, null),
        oe = ze = t,
        te = 0,
        lr = null,
        Co = sl = Ft = 0,
        ke = ir = null,
        Rt !== null) {
            for (t = 0; t < Rt.length; t++)
                if (n = Rt[t],
                r = n.interleaved,
                r !== null) {
                    n.interleaved = null;
                    var l = r.next
                      , i = n.pending;
                    if (i !== null) {
                        var o = i.next;
                        i.next = l,
                        r.next = o
                    }
                    n.pending = r
                }
            Rt = null
        }
        return e
    }
    function Wa(e, t) {
        do {
            var n = b;
            try {
                if (Bi(),
                Jr.current = tl,
                qr) {
                    for (var r = G.memoizedState; r !== null; ) {
                        var l = r.queue;
                        l !== null && (l.pending = null),
                        r = r.next
                    }
                    qr = !1
                }
                if (Dt = 0,
                ne = ee = G = null,
                qn = !1,
                bn = 0,
                Eo.current = null,
                n === null || n.return === null) {
                    te = 1,
                    lr = t,
                    b = null;
                    break
                }
                e: {
                    var i = e
                      , o = n.return
                      , u = n
                      , s = t;
                    if (t = oe,
                    u.flags |= 32768,
                    s !== null && typeof s == "object" && typeof s.then == "function") {
                        var d = s
                          , m = u
                          , h = m.tag;
                        if (!(m.mode & 1) && (h === 0 || h === 11 || h === 15)) {
                            var p = m.alternate;
                            p ? (m.updateQueue = p.updateQueue,
                            m.memoizedState = p.memoizedState,
                            m.lanes = p.lanes) : (m.updateQueue = null,
                            m.memoizedState = null)
                        }
                        var w = ma(o);
                        if (w !== null) {
                            w.flags &= -257,
                            va(w, o, u, i, t),
                            w.mode & 1 && ha(i, d, t),
                            t = w,
                            s = d;
                            var k = t.updateQueue;
                            if (k === null) {
                                var g = new Set;
                                g.add(s),
                                t.updateQueue = g
                            } else
                                k.add(s);
                            break e
                        } else {
                            if (!(t & 1)) {
                                ha(i, d, t),
                                Io();
                                break e
                            }
                            s = Error(y(426))
                        }
                    } else if (Q && u.mode & 1) {
                        var j = ma(o);
                        if (j !== null) {
                            !(j.flags & 65536) && (j.flags |= 256),
                            va(j, o, u, i, t),
                            Ai(pn(s, u));
                            break e
                        }
                    }
                    i = s = pn(s, u),
                    te !== 4 && (te = 2),
                    ir === null ? ir = [i] : ir.push(i),
                    i = o;
                    do {
                        switch (i.tag) {
                        case 3:
                            i.flags |= 65536,
                            t &= -t,
                            i.lanes |= t;
                            var c = fa(i, s, t);
                            Us(i, c);
                            break e;
                        case 1:
                            u = s;
                            var a = i.type
                              , f = i.stateNode;
                            if (!(i.flags & 128) && (typeof a.getDerivedStateFromError == "function" || f !== null && typeof f.componentDidCatch == "function" && (kt === null || !kt.has(f)))) {
                                i.flags |= 65536,
                                t &= -t,
                                i.lanes |= t;
                                var v = pa(i, u, t);
                                Us(i, v);
                                break e
                            }
                        }
                        i = i.return
                    } while (i !== null)
                }
                Ya(n)
            } catch (S) {
                t = S,
                b === n && n !== null && (b = n = n.return);
                continue
            }
            break
        } while (1)
    }
    function Ka() {
        var e = ul.current;
        return ul.current = tl,
        e === null ? tl : e
    }
    function Io() {
        (te === 0 || te === 3 || te === 2) && (te = 4),
        re === null || !(Ft & 268435455) && !(sl & 268435455) || xt(re, oe)
    }
    function hl(e, t) {
        var n = F;
        F |= 2;
        var r = Ka();
        (re !== e || oe !== t) && (lt = null,
        $t(e, t));
        do
            try {
                Sf();
                break
            } catch (l) {
                Wa(e, l)
            }
        while (1);
        if (Bi(),
        F = n,
        ul.current = r,
        b !== null)
            throw Error(y(261));
        return re = null,
        oe = 0,
        te
    }
    function Sf() {
        for (; b !== null; )
            Qa(b)
    }
    function kf() {
        for (; b !== null && !Kc(); )
            Qa(b)
    }
    function Qa(e) {
        var t = Za(e.alternate, e, ze);
        e.memoizedProps = e.pendingProps,
        t === null ? Ya(e) : b = t,
        Eo.current = null
    }
    function Ya(e) {
        var t = e;
        do {
            var n = t.alternate;
            if (e = t.return,
            t.flags & 32768) {
                if (n = hf(n, t),
                n !== null) {
                    n.flags &= 32767,
                    b = n;
                    return
                }
                if (e !== null)
                    e.flags |= 32768,
                    e.subtreeFlags = 0,
                    e.deletions = null;
                else {
                    te = 6,
                    b = null;
                    return
                }
            } else if (n = pf(n, t, ze),
            n !== null) {
                b = n;
                return
            }
            if (t = t.sibling,
            t !== null) {
                b = t;
                return
            }
            b = t = e
        } while (t !== null);
        te === 0 && (te = 5)
    }
    function Ut(e, t, n) {
        var r = U
          , l = Me.transition;
        try {
            Me.transition = null,
            U = 1,
            Ef(e, t, n, r)
        } finally {
            Me.transition = l,
            U = r
        }
        return null
    }
    function Ef(e, t, n, r) {
        do
            yn();
        while (Et !== null);
        if (F & 6)
            throw Error(y(327));
        n = e.finishedWork;
        var l = e.finishedLanes;
        if (n === null)
            return null;
        if (e.finishedWork = null,
        e.finishedLanes = 0,
        n === e.current)
            throw Error(y(177));
        e.callbackNode = null,
        e.callbackPriority = 0;
        var i = n.lanes | n.childLanes;
        if (td(e, i),
        e === re && (b = re = null,
        oe = 0),
        !(n.subtreeFlags & 2064) && !(n.flags & 2064) || cl || (cl = !0,
        Ja(gr, function() {
            return yn(),
            null
        })),
        i = (n.flags & 15990) !== 0,
        n.subtreeFlags & 15990 || i) {
            i = Me.transition,
            Me.transition = null;
            var o = U;
            U = 1;
            var u = F;
            F |= 4,
            Eo.current = null,
            vf(e, n),
            ja(n, e),
            Ad(Li),
            _r = !!Ti,
            Li = Ti = null,
            e.current = n,
            yf(n),
            Qc(),
            F = u,
            U = o,
            Me.transition = i
        } else
            e.current = n;
        if (cl && (cl = !1,
        Et = e,
        dl = l),
        i = e.pendingLanes,
        i === 0 && (kt = null),
        Gc(n.stateNode),
        Ee(e, q()),
        t !== null)
            for (r = e.onRecoverableError,
            n = 0; n < t.length; n++)
                l = t[n],
                r(l.value, {
                    componentStack: l.stack,
                    digest: l.digest
                });
        if (al)
            throw al = !1,
            e = _o,
            _o = null,
            e;
        return dl & 1 && e.tag !== 0 && yn(),
        i = e.pendingLanes,
        i & 1 ? e === No ? or++ : (or = 0,
        No = e) : or = 0,
        yt(),
        null
    }
    function yn() {
        if (Et !== null) {
            var e = Du(dl)
              , t = Me.transition
              , n = U;
            try {
                if (Me.transition = null,
                U = 16 > e ? 16 : e,
                Et === null)
                    var r = !1;
                else {
                    if (e = Et,
                    Et = null,
                    dl = 0,
                    F & 6)
                        throw Error(y(331));
                    var l = F;
                    for (F |= 4,
                    x = e.current; x !== null; ) {
                        var i = x
                          , o = i.child;
                        if (x.flags & 16) {
                            var u = i.deletions;
                            if (u !== null) {
                                for (var s = 0; s < u.length; s++) {
                                    var d = u[s];
                                    for (x = d; x !== null; ) {
                                        var m = x;
                                        switch (m.tag) {
                                        case 0:
                                        case 11:
                                        case 15:
                                            rr(8, m, i)
                                        }
                                        var h = m.child;
                                        if (h !== null)
                                            h.return = m,
                                            x = h;
                                        else
                                            for (; x !== null; ) {
                                                m = x;
                                                var p = m.sibling
                                                  , w = m.return;
                                                if (Oa(m),
                                                m === d) {
                                                    x = null;
                                                    break
                                                }
                                                if (p !== null) {
                                                    p.return = w,
                                                    x = p;
                                                    break
                                                }
                                                x = w
                                            }
                                    }
                                }
                                var k = i.alternate;
                                if (k !== null) {
                                    var g = k.child;
                                    if (g !== null) {
                                        k.child = null;
                                        do {
                                            var j = g.sibling;
                                            g.sibling = null,
                                            g = j
                                        } while (g !== null)
                                    }
                                }
                                x = i
                            }
                        }
                        if (i.subtreeFlags & 2064 && o !== null)
                            o.return = i,
                            x = o;
                        else
                            e: for (; x !== null; ) {
                                if (i = x,
                                i.flags & 2048)
                                    switch (i.tag) {
                                    case 0:
                                    case 11:
                                    case 15:
                                        rr(9, i, i.return)
                                    }
                                var c = i.sibling;
                                if (c !== null) {
                                    c.return = i.return,
                                    x = c;
                                    break e
                                }
                                x = i.return
                            }
                    }
                    var a = e.current;
                    for (x = a; x !== null; ) {
                        o = x;
                        var f = o.child;
                        if (o.subtreeFlags & 2064 && f !== null)
                            f.return = o,
                            x = f;
                        else
                            e: for (o = a; x !== null; ) {
                                if (u = x,
                                u.flags & 2048)
                                    try {
                                        switch (u.tag) {
                                        case 0:
                                        case 11:
                                        case 15:
                                            ol(9, u)
                                        }
                                    } catch (S) {
                                        J(u, u.return, S)
                                    }
                                if (u === o) {
                                    x = null;
                                    break e
                                }
                                var v = u.sibling;
                                if (v !== null) {
                                    v.return = u.return,
                                    x = v;
                                    break e
                                }
                                x = u.return
                            }
                    }
                    if (F = l,
                    yt(),
                    We && typeof We.onPostCommitFiberRoot == "function")
                        try {
                            We.onPostCommitFiberRoot(wr, e)
                        } catch {}
                    r = !0
                }
                return r
            } finally {
                U = n,
                Me.transition = t
            }
        }
        return !1
    }
    function Xa(e, t, n) {
        t = pn(n, t),
        t = fa(e, t, 1),
        e = wt(e, t, 1),
        t = ve(),
        e !== null && (Ln(e, 1, t),
        Ee(e, t))
    }
    function J(e, t, n) {
        if (e.tag === 3)
            Xa(e, e, n);
        else
            for (; t !== null; ) {
                if (t.tag === 3) {
                    Xa(t, e, n);
                    break
                } else if (t.tag === 1) {
                    var r = t.stateNode;
                    if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (kt === null || !kt.has(r))) {
                        e = pn(n, e),
                        e = pa(t, e, 1),
                        t = wt(t, e, 1),
                        e = ve(),
                        t !== null && (Ln(t, 1, e),
                        Ee(t, e));
                        break
                    }
                }
                t = t.return
            }
    }
    function Cf(e, t, n) {
        var r = e.pingCache;
        r !== null && r.delete(t),
        t = ve(),
        e.pingedLanes |= e.suspendedLanes & n,
        re === e && (oe & n) === n && (te === 4 || te === 3 && (oe & 130023424) === oe && 500 > q() - xo ? $t(e, 0) : Co |= n),
        Ee(e, t)
    }
    function Ga(e, t) {
        t === 0 && (e.mode & 1 ? (t = kr,
        kr <<= 1,
        !(kr & 130023424) && (kr = 4194304)) : t = 1);
        var n = ve();
        e = tt(e, t),
        e !== null && (Ln(e, t, n),
        Ee(e, n))
    }
    function xf(e) {
        var t = e.memoizedState
          , n = 0;
        t !== null && (n = t.retryLane),
        Ga(e, n)
    }
    function _f(e, t) {
        var n = 0;
        switch (e.tag) {
        case 13:
            var r = e.stateNode
              , l = e.memoizedState;
            l !== null && (n = l.retryLane);
            break;
        case 19:
            r = e.stateNode;
            break;
        default:
            throw Error(y(314))
        }
        r !== null && r.delete(t),
        Ga(e, n)
    }
    var Za;
    Za = function(e, t, n) {
        if (e !== null)
            if (e.memoizedProps !== t.pendingProps || ge.current)
                Se = !0;
            else {
                if (!(e.lanes & n) && !(t.flags & 128))
                    return Se = !1,
                    ff(e, t, n);
                Se = !!(e.flags & 131072)
            }
        else
            Se = !1,
            Q && t.flags & 1048576 && Ts(t, Br, t.index);
        switch (t.lanes = 0,
        t.tag) {
        case 2:
            var r = t.type;
            ll(e, t),
            e = t.pendingProps;
            var l = ln(t, se.current);
            dn(t, n),
            l = eo(null, t, r, e, l, n);
            var i = to();
            return t.flags |= 1,
            typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1,
            t.memoizedState = null,
            t.updateQueue = null,
            we(r) ? (i = !0,
            Vr(t)) : i = !1,
            t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null,
            Yi(t),
            l.updater = nl,
            t.stateNode = l,
            l._reactInternals = t,
            uo(t, r, e, n),
            t = fo(null, t, r, !0, i, n)) : (t.tag = 0,
            Q && i && ji(t),
            me(null, t, l, n),
            t = t.child),
            t;
        case 16:
            r = t.elementType;
            e: {
                switch (ll(e, t),
                e = t.pendingProps,
                l = r._init,
                r = l(r._payload),
                t.type = r,
                l = t.tag = Pf(r),
                e = Ue(r, e),
                l) {
                case 0:
                    t = co(null, t, r, e, n);
                    break e;
                case 1:
                    t = Ea(null, t, r, e, n);
                    break e;
                case 11:
                    t = ya(null, t, r, e, n);
                    break e;
                case 14:
                    t = ga(null, t, r, Ue(r.type, e), n);
                    break e
                }
                throw Error(y(306, r, ""))
            }
            return t;
        case 0:
            return r = t.type,
            l = t.pendingProps,
            l = t.elementType === r ? l : Ue(r, l),
            co(e, t, r, l, n);
        case 1:
            return r = t.type,
            l = t.pendingProps,
            l = t.elementType === r ? l : Ue(r, l),
            Ea(e, t, r, l, n);
        case 3:
            e: {
                if (Ca(t),
                e === null)
                    throw Error(y(387));
                r = t.pendingProps,
                i = t.memoizedState,
                l = i.element,
                $s(e, t),
                Gr(t, r, null, n);
                var o = t.memoizedState;
                if (r = o.element,
                i.isDehydrated)
                    if (i = {
                        element: r,
                        isDehydrated: !1,
                        cache: o.cache,
                        pendingSuspenseBoundaries: o.pendingSuspenseBoundaries,
                        transitions: o.transitions
                    },
                    t.updateQueue.baseState = i,
                    t.memoizedState = i,
                    t.flags & 256) {
                        l = pn(Error(y(423)), t),
                        t = xa(e, t, r, n, l);
                        break e
                    } else if (r !== l) {
                        l = pn(Error(y(424)), t),
                        t = xa(e, t, r, n, l);
                        break e
                    } else
                        for (Pe = ht(t.stateNode.containerInfo.firstChild),
                        Ne = t,
                        Q = !0,
                        $e = null,
                        n = Fs(t, null, r, n),
                        t.child = n; n; )
                            n.flags = n.flags & -3 | 4096,
                            n = n.sibling;
                else {
                    if (sn(),
                    r === l) {
                        t = rt(e, t, n);
                        break e
                    }
                    me(e, t, r, n)
                }
                t = t.child
            }
            return t;
        case 5:
            return As(t),
            e === null && Vi(t),
            r = t.type,
            l = t.pendingProps,
            i = e !== null ? e.memoizedProps : null,
            o = l.children,
            Ii(r, l) ? o = null : i !== null && Ii(r, i) && (t.flags |= 32),
            ka(e, t),
            me(e, t, o, n),
            t.child;
        case 6:
            return e === null && Vi(t),
            null;
        case 13:
            return _a(e, t, n);
        case 4:
            return Xi(t, t.stateNode.containerInfo),
            r = t.pendingProps,
            e === null ? t.child = an(t, null, r, n) : me(e, t, r, n),
            t.child;
        case 11:
            return r = t.type,
            l = t.pendingProps,
            l = t.elementType === r ? l : Ue(r, l),
            ya(e, t, r, l, n);
        case 7:
            return me(e, t, t.pendingProps, n),
            t.child;
        case 8:
            return me(e, t, t.pendingProps.children, n),
            t.child;
        case 12:
            return me(e, t, t.pendingProps.children, n),
            t.child;
        case 10:
            e: {
                if (r = t.type._context,
                l = t.pendingProps,
                i = t.memoizedProps,
                o = l.value,
                A(Qr, r._currentValue),
                r._currentValue = o,
                i !== null)
                    if (je(i.value, o)) {
                        if (i.children === l.children && !ge.current) {
                            t = rt(e, t, n);
                            break e
                        }
                    } else
                        for (i = t.child,
                        i !== null && (i.return = t); i !== null; ) {
                            var u = i.dependencies;
                            if (u !== null) {
                                o = i.child;
                                for (var s = u.firstContext; s !== null; ) {
                                    if (s.context === r) {
                                        if (i.tag === 1) {
                                            s = nt(-1, n & -n),
                                            s.tag = 2;
                                            var d = i.updateQueue;
                                            if (d !== null) {
                                                d = d.shared;
                                                var m = d.pending;
                                                m === null ? s.next = s : (s.next = m.next,
                                                m.next = s),
                                                d.pending = s
                                            }
                                        }
                                        i.lanes |= n,
                                        s = i.alternate,
                                        s !== null && (s.lanes |= n),
                                        Ki(i.return, n, t),
                                        u.lanes |= n;
                                        break
                                    }
                                    s = s.next
                                }
                            } else if (i.tag === 10)
                                o = i.type === t.type ? null : i.child;
                            else if (i.tag === 18) {
                                if (o = i.return,
                                o === null)
                                    throw Error(y(341));
                                o.lanes |= n,
                                u = o.alternate,
                                u !== null && (u.lanes |= n),
                                Ki(o, n, t),
                                o = i.sibling
                            } else
                                o = i.child;
                            if (o !== null)
                                o.return = i;
                            else
                                for (o = i; o !== null; ) {
                                    if (o === t) {
                                        o = null;
                                        break
                                    }
                                    if (i = o.sibling,
                                    i !== null) {
                                        i.return = o.return,
                                        o = i;
                                        break
                                    }
                                    o = o.return
                                }
                            i = o
                        }
                me(e, t, l.children, n),
                t = t.child
            }
            return t;
        case 9:
            return l = t.type,
            r = t.pendingProps.children,
            dn(t, n),
            l = Oe(l),
            r = r(l),
            t.flags |= 1,
            me(e, t, r, n),
            t.child;
        case 14:
            return r = t.type,
            l = Ue(r, t.pendingProps),
            l = Ue(r.type, l),
            ga(e, t, r, l, n);
        case 15:
            return wa(e, t, t.type, t.pendingProps, n);
        case 17:
            return r = t.type,
            l = t.pendingProps,
            l = t.elementType === r ? l : Ue(r, l),
            ll(e, t),
            t.tag = 1,
            we(r) ? (e = !0,
            Vr(t)) : e = !1,
            dn(t, n),
            ca(t, r, l),
            uo(t, r, l, n),
            fo(null, t, r, !0, e, n);
        case 19:
            return Pa(e, t, n);
        case 22:
            return Sa(e, t, n)
        }
        throw Error(y(156, t.tag))
    }
    ;
    function Ja(e, t) {
        return Lu(e, t)
    }
    function Nf(e, t, n, r) {
        this.tag = e,
        this.key = n,
        this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null,
        this.index = 0,
        this.ref = null,
        this.pendingProps = t,
        this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null,
        this.mode = r,
        this.subtreeFlags = this.flags = 0,
        this.deletions = null,
        this.childLanes = this.lanes = 0,
        this.alternate = null
    }
    function De(e, t, n, r) {
        return new Nf(e,t,n,r)
    }
    function Oo(e) {
        return e = e.prototype,
        !(!e || !e.isReactComponent)
    }
    function Pf(e) {
        if (typeof e == "function")
            return Oo(e) ? 1 : 0;
        if (e != null) {
            if (e = e.$$typeof,
            e === jl)
                return 11;
            if (e === Vl)
                return 14
        }
        return 2
    }
    function _t(e, t) {
        var n = e.alternate;
        return n === null ? (n = De(e.tag, t, e.key, e.mode),
        n.elementType = e.elementType,
        n.type = e.type,
        n.stateNode = e.stateNode,
        n.alternate = e,
        e.alternate = n) : (n.pendingProps = t,
        n.type = e.type,
        n.flags = 0,
        n.subtreeFlags = 0,
        n.deletions = null),
        n.flags = e.flags & 14680064,
        n.childLanes = e.childLanes,
        n.lanes = e.lanes,
        n.child = e.child,
        n.memoizedProps = e.memoizedProps,
        n.memoizedState = e.memoizedState,
        n.updateQueue = e.updateQueue,
        t = e.dependencies,
        n.dependencies = t === null ? null : {
            lanes: t.lanes,
            firstContext: t.firstContext
        },
        n.sibling = e.sibling,
        n.index = e.index,
        n.ref = e.ref,
        n
    }
    function ml(e, t, n, r, l, i) {
        var o = 2;
        if (r = e,
        typeof e == "function")
            Oo(e) && (o = 1);
        else if (typeof e == "string")
            o = 5;
        else
            e: switch (e) {
            case Kt:
                return Vt(n.children, l, i, t);
            case Dl:
                o = 8,
                l |= 8;
                break;
            case Fl:
                return e = De(12, n, t, l | 2),
                e.elementType = Fl,
                e.lanes = i,
                e;
            case $l:
                return e = De(13, n, t, l),
                e.elementType = $l,
                e.lanes = i,
                e;
            case Ul:
                return e = De(19, n, t, l),
                e.elementType = Ul,
                e.lanes = i,
                e;
            case ou:
                return vl(n, l, i, t);
            default:
                if (typeof e == "object" && e !== null)
                    switch (e.$$typeof) {
                    case lu:
                        o = 10;
                        break e;
                    case iu:
                        o = 9;
                        break e;
                    case jl:
                        o = 11;
                        break e;
                    case Vl:
                        o = 14;
                        break e;
                    case ot:
                        o = 16,
                        r = null;
                        break e
                    }
                throw Error(y(130, e == null ? e : typeof e, ""))
            }
        return t = De(o, n, t, l),
        t.elementType = e,
        t.type = r,
        t.lanes = i,
        t
    }
    function Vt(e, t, n, r) {
        return e = De(7, e, r, t),
        e.lanes = n,
        e
    }
    function vl(e, t, n, r) {
        return e = De(22, e, r, t),
        e.elementType = ou,
        e.lanes = n,
        e.stateNode = {
            isHidden: !1
        },
        e
    }
    function Ro(e, t, n) {
        return e = De(6, e, null, t),
        e.lanes = n,
        e
    }
    function Mo(e, t, n) {
        return t = De(4, e.children !== null ? e.children : [], e.key, t),
        t.lanes = n,
        t.stateNode = {
            containerInfo: e.containerInfo,
            pendingChildren: null,
            implementation: e.implementation
        },
        t
    }
    function zf(e, t, n, r, l) {
        this.tag = t,
        this.containerInfo = e,
        this.finishedWork = this.pingCache = this.current = this.pendingChildren = null,
        this.timeoutHandle = -1,
        this.callbackNode = this.pendingContext = this.context = null,
        this.callbackPriority = 0,
        this.eventTimes = oi(0),
        this.expirationTimes = oi(-1),
        this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0,
        this.entanglements = oi(0),
        this.identifierPrefix = r,
        this.onRecoverableError = l,
        this.mutableSourceEagerHydrationData = null
    }
    function Do(e, t, n, r, l, i, o, u, s) {
        return e = new zf(e,t,n,u,s),
        t === 1 ? (t = 1,
        i === !0 && (t |= 8)) : t = 0,
        i = De(3, null, null, t),
        e.current = i,
        i.stateNode = e,
        i.memoizedState = {
            element: r,
            isDehydrated: n,
            cache: null,
            transitions: null,
            pendingSuspenseBoundaries: null
        },
        Yi(i),
        e
    }
    function Tf(e, t, n) {
        var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
        return {
            $$typeof: Wt,
            key: r == null ? null : "" + r,
            children: e,
            containerInfo: t,
            implementation: n
        }
    }
    function qa(e) {
        if (!e)
            return vt;
        e = e._reactInternals;
        e: {
            if (zt(e) !== e || e.tag !== 1)
                throw Error(y(170));
            var t = e;
            do {
                switch (t.tag) {
                case 3:
                    t = t.stateNode.context;
                    break e;
                case 1:
                    if (we(t.type)) {
                        t = t.stateNode.__reactInternalMemoizedMergedChildContext;
                        break e
                    }
                }
                t = t.return
            } while (t !== null);
            throw Error(y(171))
        }
        if (e.tag === 1) {
            var n = e.type;
            if (we(n))
                return Ns(e, n, t)
        }
        return t
    }
    function ba(e, t, n, r, l, i, o, u, s) {
        return e = Do(n, r, !0, e, l, i, o, u, s),
        e.context = qa(null),
        n = e.current,
        r = ve(),
        l = Ct(n),
        i = nt(r, l),
        i.callback = t ?? null,
        wt(n, i, l),
        e.current.lanes = l,
        Ln(e, l, r),
        Ee(e, r),
        e
    }
    function yl(e, t, n, r) {
        var l = t.current
          , i = ve()
          , o = Ct(l);
        return n = qa(n),
        t.context === null ? t.context = n : t.pendingContext = n,
        t = nt(i, o),
        t.payload = {
            element: e
        },
        r = r === void 0 ? null : r,
        r !== null && (t.callback = r),
        e = wt(l, t, o),
        e !== null && (He(e, l, o, i),
        Xr(e, l, o)),
        o
    }
    function gl(e) {
        if (e = e.current,
        !e.child)
            return null;
        switch (e.child.tag) {
        case 5:
            return e.child.stateNode;
        default:
            return e.child.stateNode
        }
    }
    function ec(e, t) {
        if (e = e.memoizedState,
        e !== null && e.dehydrated !== null) {
            var n = e.retryLane;
            e.retryLane = n !== 0 && n < t ? n : t
        }
    }
    function Fo(e, t) {
        ec(e, t),
        (e = e.alternate) && ec(e, t)
    }
    function Lf() {
        return null
    }
    var tc = typeof reportError == "function" ? reportError : function(e) {
        console.error(e)
    }
    ;
    function jo(e) {
        this._internalRoot = e
    }
    wl.prototype.render = jo.prototype.render = function(e) {
        var t = this._internalRoot;
        if (t === null)
            throw Error(y(409));
        yl(e, t, null, null)
    }
    ,
    wl.prototype.unmount = jo.prototype.unmount = function() {
        var e = this._internalRoot;
        if (e !== null) {
            this._internalRoot = null;
            var t = e.containerInfo;
            jt(function() {
                yl(null, e, null, null)
            }),
            t[Je] = null
        }
    }
    ;
    function wl(e) {
        this._internalRoot = e
    }
    wl.prototype.unstable_scheduleHydration = function(e) {
        if (e) {
            var t = $u();
            e = {
                blockedOn: null,
                target: e,
                priority: t
            };
            for (var n = 0; n < dt.length && t !== 0 && t < dt[n].priority; n++)
                ;
            dt.splice(n, 0, e),
            n === 0 && Au(e)
        }
    }
    ;
    function $o(e) {
        return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
    }
    function Sl(e) {
        return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
    }
    function nc() {}
    function If(e, t, n, r, l) {
        if (l) {
            if (typeof r == "function") {
                var i = r;
                r = function() {
                    var d = gl(o);
                    i.call(d)
                }
            }
            var o = ba(t, r, e, 0, null, !1, !1, "", nc);
            return e._reactRootContainer = o,
            e[Je] = o.current,
            Wn(e.nodeType === 8 ? e.parentNode : e),
            jt(),
            o
        }
        for (; l = e.lastChild; )
            e.removeChild(l);
        if (typeof r == "function") {
            var u = r;
            r = function() {
                var d = gl(s);
                u.call(d)
            }
        }
        var s = Do(e, 0, !1, null, null, !1, !1, "", nc);
        return e._reactRootContainer = s,
        e[Je] = s.current,
        Wn(e.nodeType === 8 ? e.parentNode : e),
        jt(function() {
            yl(t, s, n, r)
        }),
        s
    }
    function kl(e, t, n, r, l) {
        var i = n._reactRootContainer;
        if (i) {
            var o = i;
            if (typeof l == "function") {
                var u = l;
                l = function() {
                    var s = gl(o);
                    u.call(s)
                }
            }
            yl(t, o, e, l)
        } else
            o = If(n, t, e, l, r);
        return gl(o)
    }
    Fu = function(e) {
        switch (e.tag) {
        case 3:
            var t = e.stateNode;
            if (t.current.memoizedState.isDehydrated) {
                var n = Tn(t.pendingLanes);
                n !== 0 && (ui(t, n | 1),
                Ee(t, q()),
                !(F & 6) && (vn = q() + 500,
                yt()))
            }
            break;
        case 13:
            jt(function() {
                var r = tt(e, 1);
                if (r !== null) {
                    var l = ve();
                    He(r, e, 1, l)
                }
            }),
            Fo(e, 1)
        }
    }
    ,
    si = function(e) {
        if (e.tag === 13) {
            var t = tt(e, 134217728);
            if (t !== null) {
                var n = ve();
                He(t, e, 134217728, n)
            }
            Fo(e, 134217728)
        }
    }
    ,
    ju = function(e) {
        if (e.tag === 13) {
            var t = Ct(e)
              , n = tt(e, t);
            if (n !== null) {
                var r = ve();
                He(n, e, t, r)
            }
            Fo(e, t)
        }
    }
    ,
    $u = function() {
        return U
    }
    ,
    Uu = function(e, t) {
        var n = U;
        try {
            return U = e,
            t()
        } finally {
            U = n
        }
    }
    ,
    ei = function(e, t, n) {
        switch (t) {
        case "input":
            if (Ql(e, n),
            t = n.name,
            n.type === "radio" && t != null) {
                for (n = e; n.parentNode; )
                    n = n.parentNode;
                for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'),
                t = 0; t < n.length; t++) {
                    var r = n[t];
                    if (r !== e && r.form === e.form) {
                        var l = $r(r);
                        if (!l)
                            throw Error(y(90));
                        au(r),
                        Ql(r, l)
                    }
                }
            }
            break;
        case "textarea":
            hu(e, n);
            break;
        case "select":
            t = n.value,
            t != null && Qt(e, !!n.multiple, t, !1)
        }
    }
    ,
    Cu = To,
    xu = jt;
    var Of = {
        usingClientEntryPoint: !1,
        Events: [Yn, nn, $r, ku, Eu, To]
    }
      , ur = {
        findFiberByHostInstance: Tt,
        bundleType: 0,
        version: "18.3.1",
        rendererPackageName: "react-dom"
    }
      , Rf = {
        bundleType: ur.bundleType,
        version: ur.version,
        rendererPackageName: ur.rendererPackageName,
        rendererConfig: ur.rendererConfig,
        overrideHookState: null,
        overrideHookStateDeletePath: null,
        overrideHookStateRenamePath: null,
        overrideProps: null,
        overridePropsDeletePath: null,
        overridePropsRenamePath: null,
        setErrorHandler: null,
        setSuspenseHandler: null,
        scheduleUpdate: null,
        currentDispatcherRef: Ze.ReactCurrentDispatcher,
        findHostInstanceByFiber: function(e) {
            return e = zu(e),
            e === null ? null : e.stateNode
        },
        findFiberByHostInstance: ur.findFiberByHostInstance || Lf,
        findHostInstancesForRefresh: null,
        scheduleRefresh: null,
        scheduleRoot: null,
        setRefreshHandler: null,
        getCurrentFiber: null,
        reconcilerVersion: "18.3.1-next-f1338f8080-20240426"
    };
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
        var El = __REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (!El.isDisabled && El.supportsFiber)
            try {
                wr = El.inject(Rf),
                We = El
            } catch {}
    }
    Ce.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Of,
    Ce.createPortal = function(e, t) {
        var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
        if (!$o(t))
            throw Error(y(200));
        return Tf(e, t, null, n)
    }
    ,
    Ce.createRoot = function(e, t) {
        if (!$o(e))
            throw Error(y(299));
        var n = !1
          , r = ""
          , l = tc;
        return t != null && (t.unstable_strictMode === !0 && (n = !0),
        t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
        t.onRecoverableError !== void 0 && (l = t.onRecoverableError)),
        t = Do(e, 1, !1, null, null, n, !1, r, l),
        e[Je] = t.current,
        Wn(e.nodeType === 8 ? e.parentNode : e),
        new jo(t)
    }
    ,
    Ce.findDOMNode = function(e) {
        if (e == null)
            return null;
        if (e.nodeType === 1)
            return e;
        var t = e._reactInternals;
        if (t === void 0)
            throw typeof e.render == "function" ? Error(y(188)) : (e = Object.keys(e).join(","),
            Error(y(268, e)));
        return e = zu(t),
        e = e === null ? null : e.stateNode,
        e
    }
    ,
    Ce.flushSync = function(e) {
        return jt(e)
    }
    ,
    Ce.hydrate = function(e, t, n) {
        if (!Sl(t))
            throw Error(y(200));
        return kl(null, e, t, !0, n)
    }
    ,
    Ce.hydrateRoot = function(e, t, n) {
        if (!$o(e))
            throw Error(y(405));
        var r = n != null && n.hydratedSources || null
          , l = !1
          , i = ""
          , o = tc;
        if (n != null && (n.unstable_strictMode === !0 && (l = !0),
        n.identifierPrefix !== void 0 && (i = n.identifierPrefix),
        n.onRecoverableError !== void 0 && (o = n.onRecoverableError)),
        t = ba(t, null, e, 1, n ?? null, l, !1, i, o),
        e[Je] = t.current,
        Wn(e),
        r)
            for (e = 0; e < r.length; e++)
                n = r[e],
                l = n._getVersion,
                l = l(n._source),
                t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(n, l);
        return new wl(t)
    }
    ,
    Ce.render = function(e, t, n) {
        if (!Sl(t))
            throw Error(y(200));
        return kl(null, e, t, !1, n)
    }
    ,
    Ce.unmountComponentAtNode = function(e) {
        if (!Sl(e))
            throw Error(y(40));
        return e._reactRootContainer ? (jt(function() {
            kl(null, null, e, !1, function() {
                e._reactRootContainer = null,
                e[Je] = null
            })
        }),
        !0) : !1
    }
    ,
    Ce.unstable_batchedUpdates = To,
    Ce.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
        if (!Sl(n))
            throw Error(y(200));
        if (e == null || e._reactInternals === void 0)
            throw Error(y(38));
        return kl(e, t, n, !1, r)
    }
    ,
    Ce.version = "18.3.1-next-f1338f8080-20240426";
    function rc() {
        if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
            try {
                __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(rc)
            } catch (e) {
                console.error(e)
            }
    }
    rc(),
    qo.exports = Ce;
    var Mf = qo.exports, Uo, lc = Mf;
    Uo = lc.createRoot,
    lc.hydrateRoot;
    const ic = ({file: e, onRemove: t, showRemove: n=!1}) => {
        const r = i => {
            if (i === 0)
                return "0 Bytes";
            const o = 1024
              , u = ["Bytes", "KB", "MB", "GB"]
              , s = Math.floor(Math.log(i) / Math.log(o));
            return parseFloat((i / Math.pow(o, s)).toFixed(2)) + " " + u[s]
        }
          , l = i => {
            switch (i) {
            case "image":
                return "🖼️";
            case "video":
                return "🎥";
            case "audio":
                return "🎵";
            case "document":
                return "📄";
            default:
                return "📎"
            }
        }
        ;
        return T.jsxs("div", {
            className: `media-preview media-preview--${e.type}`,
            children: [e.type === "image" && e.preview && T.jsx("img", {
                src: e.preview,
                alt: e.name,
                className: "media-preview__image"
            }), e.type === "video" && e.preview && T.jsx("video", {
                src: e.preview,
                className: "media-preview__video",
                controls: !1,
                muted: !0
            }), (e.type === "audio" || e.type === "document" || e.type === "image" && !e.preview) && T.jsxs("div", {
                className: "media-preview__file",
                children: [T.jsx("span", {
                    className: "media-preview__icon",
                    children: l(e.type)
                }), T.jsxs("div", {
                    className: "media-preview__info",
                    children: [T.jsx("span", {
                        className: "media-preview__name",
                        title: e.name,
                        children: e.name
                    }), T.jsx("span", {
                        className: "media-preview__size",
                        children: r(e.size)
                    })]
                })]
            }), n && t && T.jsx("button", {
                className: "media-preview__remove",
                onClick: t,
                "aria-label": "Remove file",
                children: "×"
            })]
        })
    }
      , Df = ({message: e, showTimestamp: t=!1}) => {
        const n = e.type === "user";
        return T.jsxs("div", {
            className: `message-bubble ${n ? "user" : "bot"}`,
            children: [T.jsxs("div", {
                className: "message-content",
                children: [e.content && T.jsx("p", {
                    children: e.content
                }), e.attachments && e.attachments.length > 0 && T.jsx("div", {
                    className: "message-attachments",
                    children: e.attachments.map(r => T.jsx(ic, {
                        file: r
                    }, r.id))
                })]
            }), t && T.jsx("div", {
                className: "message-timestamp",
                children: e.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                })
            })]
        })
    }
      , Ff = ({visible: e}) => e ? T.jsx("div", {
        className: "typing-indicator",
        children: T.jsxs("div", {
            className: "typing-indicator__content",
            children: [T.jsx("span", {
                className: "typing-indicator__dot"
            }), T.jsx("span", {
                className: "typing-indicator__dot"
            }), T.jsx("span", {
                className: "typing-indicator__dot"
            })]
        })
    }) : null
      , jf = ({onFilesSelected: e, maxFiles: t, maxFileSize: n, allowedTypes: r, disabled: l=!1}) => {
        const i = V.useRef(null)
          , [o,u] = V.useState(!1)
          , s = V.useCallback(c => new Promise(a => {
            const f = {
                id: `${Date.now()}-${Math.random()}`,
                name: c.name,
                type: d(c.type),
                size: c.size,
                file: c
            };
            if (c.type.startsWith("image/")) {
                const v = new FileReader;
                v.onload = S => {
                    var E;
                    f.preview = (E = S.target) == null ? void 0 : E.result,
                    a(f)
                }
                ,
                v.readAsDataURL(c)
            } else if (c.type.startsWith("video/")) {
                const v = document.createElement("video");
                v.preload = "metadata",
                v.onloadedmetadata = () => {
                    v.currentTime = 1
                }
                ,
                v.onseeked = () => {
                    const S = document.createElement("canvas");
                    S.width = v.videoWidth,
                    S.height = v.videoHeight;
                    const E = S.getContext("2d");
                    E == null || E.drawImage(v, 0, 0),
                    f.preview = S.toDataURL(),
                    a(f)
                }
                ,
                v.src = URL.createObjectURL(c)
            } else
                a(f)
        }
        ), [])
          , d = c => c.startsWith("image/") ? "image" : c.startsWith("video/") ? "video" : c.startsWith("audio/") ? "audio" : "document"
          , m = c => c.size > n ? `File "${c.name}" is too large. Maximum size is ${Math.round(n / 1024 / 1024)}MB.` : r.length > 0 && !r.some(a => c.type.includes(a)) ? `File "${c.name}" is not an allowed file type.` : null
          , h = async c => {
            const a = Array.from(c).slice(0, t)
              , f = []
              , v = [];
            for (const S of a) {
                const E = m(S);
                E ? v.push(E) : f.push(S)
            }
            if (v.length > 0 && console.warn("File validation errors:", v),
            f.length > 0) {
                const S = await Promise.all(f.map(s));
                e(S)
            }
        }
          , p = c => {
            c.preventDefault(),
            l || u(!0)
        }
          , w = c => {
            c.preventDefault(),
            u(!1)
        }
          , k = c => {
            c.preventDefault(),
            u(!1),
            !l && c.dataTransfer.files && h(c.dataTransfer.files)
        }
          , g = c => {
            c.target.files && !l && h(c.target.files)
        }
          , j = () => {
            var c;
            l || (c = i.current) == null || c.click()
        }
        ;
        return T.jsxs("div", {
            className: "file-upload",
            children: [T.jsx("input", {
                ref: i,
                type: "file",
                multiple: !0,
                accept: r.join(","),
                onChange: g,
                style: {
                    display: "none"
                },
                disabled: l
            }), T.jsx("button", {
                className: `file-upload__button ${o ? "file-upload__button--drag-over" : ""}`,
                onClick: j,
                onDragOver: p,
                onDragLeave: w,
                onDrop: k,
                disabled: l,
                title: "Upload files",
                children: "📎"
            })]
        })
    }
    ;
    function $f() {
        const e = navigator.userAgent
          , n = "ontouchstart"in window || navigator.maxTouchPoints > 0 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(e)
          , r = /iPad|iPhone|iPod/.test(e) && !window.MSStream
          , l = /Android/.test(e)
          , i = r && /Safari/.test(e) && !/Chrome|CriOS|FxiOS/.test(e)
          , o = /Chrome|CriOS/.test(e)
          , u = "visualViewport"in window
          , s = "virtualKeyboard"in navigator
          , d = CSS.supports("height", "100dvh")
          , m = CSS.supports("padding", "env(safe-area-inset-top)");
        return {
            isMobile: n,
            isIOS: r,
            isAndroid: l,
            isSafari: i,
            isChrome: o,
            hasVisualViewport: u,
            hasVirtualKeyboard: s,
            supportsDynamicViewport: d,
            supportsEnvironmentVariables: m
        }
    }
    function Uf() {
        const e = window.innerWidth
          , t = window.innerHeight;
        let n = e
          , r = t
          , l = 0;
        window.visualViewport && (n = window.visualViewport.width,
        r = window.visualViewport.height,
        l = t - r);
        const i = {
            top: Cl("safe-area-inset-top"),
            right: Cl("safe-area-inset-right"),
            bottom: Cl("safe-area-inset-bottom"),
            left: Cl("safe-area-inset-left")
        };
        return {
            width: e,
            height: t,
            visualWidth: n,
            visualHeight: r,
            keyboardHeight: Math.max(0, l),
            safeAreaInsets: i
        }
    }
    function Cl(e) {
        if (!CSS.supports("padding", `env(${e})`))
            return 0;
        const t = document.createElement("div");
        t.style.padding = `env(${e})`,
        t.style.position = "absolute",
        t.style.visibility = "hidden",
        document.body.appendChild(t);
        const n = window.getComputedStyle(t)
          , r = parseInt(n.paddingTop) || 0;
        return document.body.removeChild(t),
        r
    }
    class Vf {
        constructor() {
            Be(this, "callbacks", []);
            Be(this, "isKeyboardOpen", !1);
            Be(this, "initialLayoutHeight");
            Be(this, "keyboardOffset", 0);
            Be(this, "currentOffset", 0);
            this.initialLayoutHeight = window.innerHeight,
            this.setupListeners()
        }
        setupListeners() {
            window.visualViewport && (window.visualViewport.addEventListener("resize", this.handleViewportChange.bind(this)),
            window.visualViewport.addEventListener("scroll", this.handleViewportChange.bind(this))),
            document.addEventListener("focusin", this.handleInputFocus.bind(this)),
            document.addEventListener("focusout", this.handleInputBlur.bind(this))
        }
        handleViewportChange() {
            if (!window.visualViewport)
                return;
            const t = window.visualViewport
              , n = this.initialLayoutHeight - t.height
              , r = n > 50
              , i = t.offsetTop + (r ? n : 0)
              , o = this.isKeyboardOpen;
            this.isKeyboardOpen = r,
            this.keyboardOffset = r ? n : 0,
            this.currentOffset = i,
            (o !== this.isKeyboardOpen || this.currentOffset !== i) && this.notifyCallbacks()
        }
        handleInputFocus(t) {
            const n = t.target;
            (n.tagName === "INPUT" || n.tagName === "TEXTAREA") && setTimeout( () => {
                this.handleViewportChange()
            }
            , 300)
        }
        handleInputBlur() {
            setTimeout( () => {
                this.handleViewportChange()
            }
            , 300)
        }
        notifyCallbacks() {
            this.callbacks.forEach(t => {
                t(this.isKeyboardOpen, this.currentOffset)
            }
            )
        }
        onKeyboardToggle(t) {
            return this.callbacks.push(t),
            () => {
                this.callbacks = this.callbacks.filter(n => n !== t)
            }
        }
        getKeyboardHeight() {
            return this.keyboardOffset
        }
        getCurrentOffset() {
            return this.currentOffset
        }
        isOpen() {
            return this.isKeyboardOpen
        }
        destroy() {
            window.visualViewport && (window.visualViewport.removeEventListener("resize", this.handleViewportChange.bind(this)),
            window.visualViewport.removeEventListener("scroll", this.handleViewportChange.bind(this))),
            document.removeEventListener("focusin", this.handleInputFocus.bind(this)),
            document.removeEventListener("focusout", this.handleInputBlur.bind(this)),
            this.callbacks = []
        }
    }
    class Af {
        constructor() {
            Be(this, "savedScrollPosition", 0);
            Be(this, "isLocked", !1)
        }
        lockBodyScroll() {
            this.isLocked || (this.savedScrollPosition = window.pageYOffset || document.documentElement.scrollTop,
            document.body.style.position = "fixed",
            document.body.style.top = `-${this.savedScrollPosition}px`,
            document.body.style.width = "100%",
            document.body.style.overflow = "hidden",
            document.body.style.webkitOverflowScrolling = "auto",
            document.documentElement.style.overflow = "hidden",
            this.isLocked = !0)
        }
        unlockBodyScroll() {
            this.isLocked && (document.body.style.position = "",
            document.body.style.top = "",
            document.body.style.width = "",
            document.body.style.overflow = "",
            document.body.style.webkitOverflowScrolling = "",
            document.documentElement.style.overflow = "",
            window.scrollTo(0, this.savedScrollPosition),
            this.isLocked = !1)
        }
        isScrollLocked() {
            return this.isLocked
        }
    }
    class Hf {
        constructor() {
            Be(this, "callbacks", []);
            Be(this, "keyboardSupported", !1);
            Be(this, "currentInsets", {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                width: 0,
                height: 0
            });
            this.keyboardSupported = "virtualKeyboard"in navigator,
            this.keyboardSupported && this.setupVirtualKeyboard()
        }
        setupVirtualKeyboard() {
            if (!this.keyboardSupported || !navigator.virtualKeyboard)
                return;
            const t = navigator.virtualKeyboard;
            t.overlaysContent = !0,
            t.addEventListener("geometrychange", this.handleGeometryChange.bind(this))
        }
        handleGeometryChange() {
            const t = navigator.virtualKeyboard;
            if (!t)
                return;
            const r = t.boundingRect.height > 0;
            this.currentInsets = {
                top: this.getCSSKeyboardInset("keyboard-inset-top"),
                right: this.getCSSKeyboardInset("keyboard-inset-right"),
                bottom: this.getCSSKeyboardInset("keyboard-inset-bottom"),
                left: this.getCSSKeyboardInset("keyboard-inset-left"),
                width: this.getCSSKeyboardInset("keyboard-inset-width"),
                height: this.getCSSKeyboardInset("keyboard-inset-height")
            },
            this.callbacks.forEach(l => {
                l(r, this.currentInsets)
            }
            )
        }
        getCSSKeyboardInset(t) {
            if (!CSS.supports("padding", `env(${t})`))
                return 0;
            const n = document.createElement("div");
            n.style.padding = `env(${t})`,
            n.style.position = "absolute",
            n.style.visibility = "hidden",
            document.body.appendChild(n);
            const r = window.getComputedStyle(n)
              , l = parseInt(r.paddingTop) || 0;
            return document.body.removeChild(n),
            l
        }
        onKeyboardToggle(t) {
            return this.callbacks.push(t),
            () => {
                this.callbacks = this.callbacks.filter(n => n !== t)
            }
        }
        getCurrentInsets() {
            return {
                ...this.currentInsets
            }
        }
        isVirtualKeyboardSupported() {
            return this.keyboardSupported
        }
        destroy() {
            const t = navigator.virtualKeyboard;
            this.keyboardSupported && t && t.removeEventListener("geometrychange", this.handleGeometryChange.bind(this)),
            this.callbacks = []
        }
    }
    const oc = ({config: e, onMessage: t, onError: n, onFileUpload: r}) => {
        const [l,i] = V.useState([])
          , [o,u] = V.useState("")
          , [s,d] = V.useState(!1)
          , [m,h] = V.useState(!1)
          , [p,w] = V.useState([])
          , [k] = V.useState( () => {
            let _ = localStorage.getItem("n8n_session_id");
            return _ || (_ = "session_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9),
            localStorage.setItem("n8n_session_id", _)),
            _
        }
        )
          , [g] = V.useState($f)
          , [j,c] = V.useState(!1)
          , [a,f] = V.useState(0)
          , [v,S] = V.useState(window.innerHeight)
          , E = V.useRef(null)
          , N = V.useRef(null)
          , P = V.useRef(null)
          , H = V.useRef(null)
          , I = V.useRef(null)
          , fe = V.useRef(null)
          , $ = {
            ...{
                title: "Chat",
                subtitle: "How can I help you?",
                placeholder: "Type your message...",
                theme: "light",
                colors: {
                    primary: "#007bff",
                    background: "#ffffff",
                    userBubble: "#007bff",
                    botBubble: "#f1f3f4",
                    text: "#333333"
                },
                maxFileSize: 10 * 1024 * 1024,
                allowedFileTypes: ["image/", "video/", "audio/", "application/pdf", ".doc", ".docx"],
                showTypingIndicator: !0,
                showTimestamps: !1,
                enableFileUpload: !0,
                maxFiles: 5,
                position: "bottom-right",
                width: 350,
                height: 500,
                zIndex: 1e3
            },
            ...e
        }
          , _l = () => {
            var _;
            (_ = E.current) == null || _.scrollIntoView({
                behavior: "smooth"
            })
        }
        ;
        V.useEffect( () => {
            _l()
        }
        , [l]),
        V.useEffect( () => {
            if (g.isMobile) {
                if (g.hasVirtualKeyboard && !g.isIOS) {
                    I.current = new Hf;
                    const _ = I.current.onKeyboardToggle( (R, M) => {
                        c(R),
                        f(R ? M.height : 0),
                        Nt(R, M.height, 0)
                    }
                    );
                    return () => {
                        var R;
                        _(),
                        (R = I.current) == null || R.destroy()
                    }
                } else if (g.isIOS) {
                    H.current = new Vf;
                    const _ = H.current.onKeyboardToggle( (R, M) => {
                        var D;
                        c(R),
                        f(M),
                        Nt(R, ((D = H.current) == null ? void 0 : D.getKeyboardHeight()) || 0, M)
                    }
                    );
                    return () => {
                        var R;
                        _(),
                        (R = H.current) == null || R.destroy()
                    }
                }
            }
        }
        , [g]),
        V.useEffect( () => {
            if (g.isMobile && $.position !== "inline")
                return fe.current = new Af,
                fe.current.lockBodyScroll(),
                () => {
                    var _;
                    (_ = fe.current) == null || _.unlockBodyScroll(),
                    fe.current = null
                }
        }
        , [g, $.position]);
        const Nt = V.useCallback( (_, R, M=0) => {
            if (!P.current)
                return;
            const D = P.current
              , K = Uf()
              , ye = g.isIOS ? -M : 0;
            D.style.setProperty("--chat-keyboard-height", `${R}px`),
            D.style.setProperty("--chat-keyboard-offset", `${ye}px`),
            D.style.setProperty("--chat-viewport-height", `${K.visualHeight || K.height}px`),
            D.style.setProperty("--chat-safe-area-bottom", `${K.safeAreaInsets.bottom}px`),
            D.style.setProperty("--chat-safe-area-left", `${K.safeAreaInsets.left}px`),
            D.style.setProperty("--chat-safe-area-right", `${K.safeAreaInsets.right}px`),
            D.style.setProperty("--chat-safe-area-top", `${K.safeAreaInsets.top}px`),
            D.classList.toggle("chat-embed--keyboard-open", _),
            D.classList.toggle("chat-embed--mobile", g.isMobile),
            D.classList.toggle("chat-embed--ios", g.isIOS),
            D.classList.toggle("chat-embed--android", g.isAndroid)
        }
        , [g]);
        V.useEffect( () => {
            let _ = window.innerHeight;
            const R = () => {
                const M = window.innerHeight
                  , D = _ - M;
                if (g.isMobile && g.isIOS && Math.abs(D) > 50) {
                    const K = M < _
                      , ye = K ? D : 0;
                    c(K),
                    f(ye),
                    Nt(K, ye, ye)
                }
                S(M),
                _ = M,
                g.isMobile && Nt(j, a)
            }
            ;
            return window.addEventListener("resize", R),
            window.addEventListener("orientationchange", R),
            Nt(j, a),
            () => {
                window.removeEventListener("resize", R),
                window.removeEventListener("orientationchange", R)
            }
        }
        , [j, a, g, Nt]);
        const At = () => `${Date.now()}-${Math.random()}`
          , sr = async (_, R=[]) => {
            try {
                const M = {
                    sessionId: k,
                    chatInput: _
                };
                let D;
                if (R.length > 0) {
                    const ye = new FormData;
                    ye.append("sessionId", k),
                    ye.append("chatInput", _),
                    R.forEach( (uc, Bf) => {
                        uc.file && ye.append(`file_${Bf}`, uc.file)
                    }
                    ),
                    D = await fetch(e.n8nWebhookUrl, {
                        method: "POST",
                        body: ye
                    })
                } else
                    D = await fetch(e.n8nWebhookUrl, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(M)
                    });
                if (!D.ok)
                    throw new Error(`HTTP error! status: ${D.status}`);
                const K = await D.json();
                return K.output || K.response || K.message || K.text || "Response received"
            } catch (M) {
                throw console.error("Error sending to n8n:", M),
                M
            }
        }
          , C = V.useCallback(async () => {
            if (!o.trim() && p.length === 0 || m)
                return;
            const _ = {
                id: At(),
                type: "user",
                content: o.trim(),
                timestamp: new Date,
                attachments: p.length > 0 ? [...p] : void 0
            };
            i(R => [...R, _]),
            u(""),
            w([]),
            h(!0),
            e.showTypingIndicator && d(!0),
            t == null || t(_),
            r == null || r(p);
            try {
                const R = await sr(_.content, p)
                  , M = {
                    id: At(),
                    type: "bot",
                    content: R,
                    timestamp: new Date
                };
                i(D => [...D, M]),
                t == null || t(M)
            } catch (R) {
                const M = {
                    id: At(),
                    type: "bot",
                    content: "Sorry, I encountered an error. Please try again.",
                    timestamp: new Date
                };
                i(D => [...D, M]),
                n == null || n(R)
            } finally {
                h(!1),
                d(!1)
            }
        }
        , [o, p, m, e, t, n, r])
          , z = _ => {
            _.key === "Enter" && !_.shiftKey && (_.preventDefault(),
            C())
        }
          , L = _ => {
            const R = p.length + _.length
              , M = e.maxFiles || 5;
            if (R > M) {
                const D = M - p.length;
                w(K => [...K, ..._.slice(0, D)])
            } else
                w(D => [...D, ..._])
        }
          , Z = _ => {
            w(R => R.filter(M => M.id !== _))
        }
        ;
        return T.jsxs("div", {
            ref: P,
            className: `chat-embed chat-embed--${$.theme} chat-embed--${$.position}${g.isMobile ? " chat-embed--mobile" : ""}${g.isIOS ? " chat-embed--ios" : ""}${g.isAndroid ? " chat-embed--android" : ""}${j ? " chat-embed--keyboard-open" : ""}`,
            style: {
                "--chat-primary": $.colors.primary,
                "--chat-background": $.colors.background,
                "--chat-user-bubble": $.colors.userBubble,
                "--chat-bot-bubble": $.colors.botBubble,
                "--chat-text": $.colors.text,
                "--chat-width": `${$.width}px`,
                "--chat-height": `${$.height}px`,
                width: g.isMobile && $.position !== "inline" ? "100vw" : $.width,
                height: g.isMobile && $.position !== "inline" ? "100dvh" : $.height,
                zIndex: $.zIndex
            },
            children: [T.jsxs("div", {
                className: "chat-embed__header",
                children: [T.jsx("h3", {
                    className: "chat-embed__title",
                    children: $.title
                }), $.subtitle && T.jsx("p", {
                    className: "chat-embed__subtitle",
                    children: $.subtitle
                })]
            }), T.jsxs("div", {
                className: "chat-embed__messages",
                children: [l.map(_ => T.jsx(Df, {
                    message: _,
                    showTimestamp: $.showTimestamps
                }, _.id)), T.jsx(Ff, {
                    visible: s
                }), T.jsx("div", {
                    ref: E
                })]
            }), T.jsxs("div", {
                className: "chat-embed__input-area",
                children: [p.length > 0 && T.jsx("div", {
                    className: "chat-embed__selected-files",
                    children: p.map(_ => T.jsx(ic, {
                        file: _,
                        showRemove: !0,
                        onRemove: () => Z(_.id)
                    }, _.id))
                }), T.jsxs("div", {
                    className: "chat-embed__input-row",
                    children: [$.enableFileUpload && T.jsx(jf, {
                        onFilesSelected: L,
                        maxFiles: $.maxFiles,
                        maxFileSize: $.maxFileSize,
                        allowedTypes: $.allowedFileTypes,
                        disabled: m
                    }), T.jsx("textarea", {
                        ref: N,
                        className: "chat-embed__input",
                        value: o,
                        onChange: _ => u(_.target.value),
                        onKeyPress: z,
                        placeholder: $.placeholder,
                        disabled: m,
                        rows: 1,
                        style: {
                            resize: "none"
                        }
                    }), T.jsx("button", {
                        className: "chat-embed__send-button",
                        onClick: C,
                        disabled: m || !o.trim() && p.length === 0,
                        children: m ? "⏳" : "➤"
                    })]
                })]
            })]
        })
    }
      , Qf = ""
      , xl = {
        init: (e, t) => {
            const n = document.getElementById(e);
            if (!n) {
                console.error(`Container with ID "${e}" not found`);
                return
            }
            Uo(n).render(T.jsx(oc, {
                config: t
            }))
        }
        ,
        create: e => {
            const t = document.createElement("div");
            return t.className = "n8n-chat-embed-container",
            Uo(t).render(T.jsx(oc, {
                config: e
            })),
            t
        }
    };
    return document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll('script[src*="n8n-chat-embed"]').forEach(t => {
            const n = t.getAttribute("data-webhook-url")
              , r = t.getAttribute("data-container-id")
              , l = t.getAttribute("data-auto-init");
            if (n && (r || l === "true")) {
                const i = {
                    n8nWebhookUrl: n,
                    title: t.getAttribute("data-title") || void 0,
                    subtitle: t.getAttribute("data-subtitle") || void 0,
                    placeholder: t.getAttribute("data-placeholder") || void 0,
                    theme: t.getAttribute("data-theme") || "light",
                    position: t.getAttribute("data-position") || "bottom-right",
                    width: parseInt(t.getAttribute("data-width") || "350"),
                    height: parseInt(t.getAttribute("data-height") || "500"),
                    enableFileUpload: t.getAttribute("data-enable-file-upload") !== "false",
                    maxFiles: parseInt(t.getAttribute("data-max-files") || "5"),
                    maxFileSize: parseInt(t.getAttribute("data-max-file-size") || "10485760"),
                    showTypingIndicator: t.getAttribute("data-show-typing") !== "false",
                    showTimestamps: t.getAttribute("data-show-timestamps") === "true"
                };
                if (r)
                    xl.init(r, i);
                else if (l === "true") {
                    const o = xl.create(i);
                    document.body.appendChild(o)
                }
            }
        }
        )
    }
    ),
    typeof window < "u" && (window.N8nChatEmbed = xl,
    console.log("N8nChatEmbed loaded and available globally")),
    xl
});
