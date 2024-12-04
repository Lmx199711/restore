var i = function (e) {
  function t(e, t) {
    var o = e.__state.conversionName.toString();
    var i = Math.round(e.r);
    var n = Math.round(e.g);
    var a = Math.round(e.b);
    var s = e.a;
    var r = Math.round(e.h);
    var c = e.s.toFixed(1);
    var l = e.v.toFixed(1);
    if (t || "THREE_CHAR_HEX" === o || "SIX_CHAR_HEX" === o) {
      for (var u = e.hex.toString(16); u.length < 6;) {
        u = "0" + u;
      }
      return "#" + u;
    }
    if ("CSS_RGB" === o) {
      return "rgb(" + i + "," + n + "," + a + ")";
    } else if ("CSS_RGBA" === o) {
      return "rgba(" + i + "," + n + "," + a + "," + s + ")";
    } else if ("HEX" === o) {
      return "0x" + e.hex.toString(16);
    } else if ("RGB_ARRAY" === o) {
      return "[" + i + "," + n + "," + a + "]";
    } else if ("RGBA_ARRAY" === o) {
      return "[" + i + "," + n + "," + a + "," + s + "]";
    } else if ("RGB_OBJ" === o) {
      return "{r:" + i + ",g:" + n + ",b:" + a + "}";
    } else if ("RGBA_OBJ" === o) {
      return "{r:" + i + ",g:" + n + ",b:" + a + ",a:" + s + "}";
    } else if ("HSV_OBJ" === o) {
      return "{h:" + r + ",s:" + c + ",v:" + l + "}";
    } else if ("HSVA_OBJ" === o) {
      return "{h:" + r + ",s:" + c + ",v:" + l + ",a:" + s + "}";
    } else {
      return "unknown format";
    }
  }
  var o = Array.prototype.forEach;
  var i = Array.prototype.slice;
  var n = {
    BREAK: {},
    extend: function (e) {
      this.each(i.call(arguments, 1), function (t) {
        (this.isObject(t) ? Object.keys(t) : []).forEach(function (o) {
          this.isUndefined(t[o]) || (e[o] = t[o]);
        }.bind(this));
      }, this);
      return e;
    },
    defaults: function (e) {
      this.each(i.call(arguments, 1), function (t) {
        (this.isObject(t) ? Object.keys(t) : []).forEach(function (o) {
          this.isUndefined(e[o]) && (e[o] = t[o]);
        }.bind(this));
      }, this);
      return e;
    },
    compose: function () {
      var e = i.call(arguments);
      return function () {
        var t = i.call(arguments);
        for (var o = e.length - 1; o >= 0; o--) {
          t = [e[o].apply(this, t)];
        }
        return t[0];
      };
    },
    each: function (e, t, i) {
      if (e) {
        if (o && e.forEach && e.forEach === o) {
          e.forEach(t, i);
        } else if (e.length === e.length + 0) {
          var n;
          var a = undefined;
          a = 0;
          for (n = e.length; a < n; a++) {
            if (a in e && t.call(i, e[a], a) === this.BREAK) {
              return;
            }
          }
        } else {
          for (var s in e) if (t.call(i, e[s], s) === this.BREAK) {
            return;
          }
        }
      }
    },
    defer: function (e) {
      setTimeout(e, 0);
    },
    debounce: function (e, t, o) {
      var i = undefined;
      return function () {
        var n = this;
        var a = arguments;
        function s() {
          i = null;
          o || e.apply(n, a);
        }
        var r = o || !i;
        clearTimeout(i);
        i = setTimeout(s, t);
        r && e.apply(n, a);
      };
    },
    toArray: function (e) {
      if (e.toArray) {
        return e.toArray();
      } else {
        return i.call(e);
      }
    },
    isUndefined: function (e) {
      return undefined === e;
    },
    isNull: function (e) {
      return null === e;
    },
    isNaN: function (e) {
      function t(t) {
        return e.apply(this, arguments);
      }
      t.toString = function () {
        return e.toString();
      };
      return t;
    }(function (e) {
      return isNaN(e);
    }),
    isArray: Array.isArray || function (e) {
      return e.constructor === Array;
    },
    isObject: function (e) {
      return e === Object(e);
    },
    isNumber: function (e) {
      return e === e + 0;
    },
    isString: function (e) {
      return e === e + "";
    },
    isBoolean: function (e) {
      return false === e || true === e;
    },
    isFunction: function (e) {
      return e instanceof Function;
    }
  };
  var a = [{
    litmus: n.isString,
    conversions: {
      THREE_CHAR_HEX: {
        read: function (e) {
          var t = e.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
          return null !== t && {
            space: "HEX",
            hex: parseInt("0x" + t[1].toString() + t[1].toString() + t[2].toString() + t[2].toString() + t[3].toString() + t[3].toString(), 0)
          };
        },
        write: t
      },
      SIX_CHAR_HEX: {
        read: function (e) {
          var t = e.match(/^#([A-F0-9]{6})$/i);
          return null !== t && {
            space: "HEX",
            hex: parseInt("0x" + t[1].toString(), 0)
          };
        },
        write: t
      },
      CSS_RGB: {
        read: function (e) {
          var t = e.match(/^rgb\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/);
          return null !== t && {
            space: "RGB",
            r: parseFloat(t[1]),
            g: parseFloat(t[2]),
            b: parseFloat(t[3])
          };
        },
        write: t
      },
      CSS_RGBA: {
        read: function (e) {
          var t = e.match(/^rgba\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/);
          return null !== t && {
            space: "RGB",
            r: parseFloat(t[1]),
            g: parseFloat(t[2]),
            b: parseFloat(t[3]),
            a: parseFloat(t[4])
          };
        },
        write: t
      }
    }
  }, {
    litmus: n.isNumber,
    conversions: {
      HEX: {
        read: function (e) {
          return {
            space: "HEX",
            hex: e,
            conversionName: "HEX"
          };
        },
        write: function (e) {
          return e.hex;
        }
      }
    }
  }, {
    litmus: n.isArray,
    conversions: {
      RGB_ARRAY: {
        read: function (e) {
          return 3 === e.length && {
            space: "RGB",
            r: e[0],
            g: e[1],
            b: e[2]
          };
        },
        write: function (e) {
          return [e.r, e.g, e.b];
        }
      },
      RGBA_ARRAY: {
        read: function (e) {
          return 4 === e.length && {
            space: "RGB",
            r: e[0],
            g: e[1],
            b: e[2],
            a: e[3]
          };
        },
        write: function (e) {
          return [e.r, e.g, e.b, e.a];
        }
      }
    }
  }, {
    litmus: n.isObject,
    conversions: {
      RGBA_OBJ: {
        read: function (e) {
          return !!(n.isNumber(e.r) && n.isNumber(e.g) && n.isNumber(e.b) && n.isNumber(e.a)) && {
            space: "RGB",
            r: e.r,
            g: e.g,
            b: e.b,
            a: e.a
          };
        },
        write: function (e) {
          return {
            r: e.r,
            g: e.g,
            b: e.b,
            a: e.a
          };
        }
      },
      RGB_OBJ: {
        read: function (e) {
          return !!(n.isNumber(e.r) && n.isNumber(e.g) && n.isNumber(e.b)) && {
            space: "RGB",
            r: e.r,
            g: e.g,
            b: e.b
          };
        },
        write: function (e) {
          return {
            r: e.r,
            g: e.g,
            b: e.b
          };
        }
      },
      HSVA_OBJ: {
        read: function (e) {
          return !!(n.isNumber(e.h) && n.isNumber(e.s) && n.isNumber(e.v) && n.isNumber(e.a)) && {
            space: "HSV",
            h: e.h,
            s: e.s,
            v: e.v,
            a: e.a
          };
        },
        write: function (e) {
          return {
            h: e.h,
            s: e.s,
            v: e.v,
            a: e.a
          };
        }
      },
      HSV_OBJ: {
        read: function (e) {
          return !!(n.isNumber(e.h) && n.isNumber(e.s) && n.isNumber(e.v)) && {
            space: "HSV",
            h: e.h,
            s: e.s,
            v: e.v
          };
        },
        write: function (e) {
          return {
            h: e.h,
            s: e.s,
            v: e.v
          };
        }
      }
    }
  }];
  var s = undefined;
  var r = undefined;
  var c = function () {
    r = false;
    var e = arguments.length > 1 ? n.toArray(arguments) : arguments[0];
    n.each(a, function (t) {
      if (t.litmus(e)) {
        n.each(t.conversions, function (t, o) {
          s = t.read(e);
          if (false === r && false !== s) {
            r = s;
            s.conversionName = o;
            s.conversion = t;
            return n.BREAK;
          }
        });
        return n.BREAK;
      }
    });
    return r;
  };
  var l = undefined;
  var u = {
    hsv_to_rgb: function (e, t, o) {
      var i = Math.floor(e / 60) % 6;
      var n = e / 60 - Math.floor(e / 60);
      var a = o * (1 - t);
      var s = o * (1 - n * t);
      var r = o * (1 - (1 - n) * t);
      var c = [[o, r, a], [s, o, a], [a, o, r], [a, s, o], [r, a, o], [o, a, s]][i];
      return {
        r: 255 * c[0],
        g: 255 * c[1],
        b: 255 * c[2]
      };
    },
    rgb_to_hsv: function (e, t, o) {
      var i = Math.min(e, t, o);
      var n = Math.max(e, t, o);
      var a = n - i;
      var s = undefined;
      if (0 === n) {
        return {
          h: NaN,
          s: 0,
          v: 0
        };
      } else {
        s = e === n ? (t - o) / a : t === n ? 2 + (o - e) / a : 4 + (e - t) / a;
        (s /= 6) < 0 && (s += 1);
        return {
          h: 360 * s,
          s: a / n,
          v: n / 255
        };
      }
    },
    rgb_to_hex: function (e, t, o) {
      var i = this.hex_with_component(0, 2, e);
      i = this.hex_with_component(i, 1, t);
      return this.hex_with_component(i, 0, o);
    },
    component_from_hex: function (e, t) {
      return e >> 8 * t & 255;
    },
    hex_with_component: function (e, t, o) {
      return o << (l = 8 * t) | e & ~(255 << l);
    }
  };
  var h = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  };
  var p = function (e, t) {
    if (!(e instanceof t)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };
  var d = function () {
    function e(e, t) {
      for (var o = 0; o < t.length; o++) {
        var i = t[o];
        i.enumerable = i.enumerable || false;
        i.configurable = true;
        "value" in i && (i.writable = true);
        Object.defineProperty(e, i.key, i);
      }
    }
    return function (t, o, i) {
      o && e(t.prototype, o);
      i && e(t, i);
      return t;
    };
  }();
  var y = function e(t, o, i) {
    null === t && (t = Function.prototype);
    var n = Object.getOwnPropertyDescriptor(t, o);
    if (undefined === n) {
      var a = Object.getPrototypeOf(t);
      if (null === a) {
        return undefined;
      } else {
        return e(a, o, i);
      }
    }
    if ("value" in n) {
      return n.value;
    }
    var s = n.get;
    if (undefined !== s) {
      return s.call(i);
    } else {
      return undefined;
    }
  };
  var f = function (e, t) {
    if ("function" != typeof t && null !== t) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    }
    e.prototype = Object.create(t && t.prototype, {
      constructor: {
        value: e,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (t) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(e, t);
      } else {
        e.__proto__ = t;
      }
    }
  };
  var m = function (e, t) {
    if (!e) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    if (!t || "object" != typeof t && "function" != typeof t) {
      return e;
    } else {
      return t;
    }
  };
  var g = function () {
    function e() {
      p(this, e);
      this.__state = c.apply(this, arguments);
      if (false === this.__state) {
        throw new Error("Failed to interpret color arguments");
      }
      this.__state.a = this.__state.a || 1;
    }
    d(e, [{
      key: "toString",
      value: function () {
        return t(this);
      }
    }, {
      key: "toHexString",
      value: function () {
        return t(this, true);
      }
    }, {
      key: "toOriginal",
      value: function () {
        return this.__state.conversion.write(this);
      }
    }]);
    return e;
  }();
  function v(e, t, o) {
    Object.defineProperty(e, t, {
      get: function () {
        if ("RGB" === this.__state.space) {
          return this.__state[t];
        } else {
          g.recalculateRGB(this, t, o);
          return this.__state[t];
        }
      },
      set: function (e) {
        if ("RGB" !== this.__state.space) {
          g.recalculateRGB(this, t, o);
          this.__state.space = "RGB";
        }
        this.__state[t] = e;
      }
    });
  }
  function C(e, t) {
    Object.defineProperty(e, t, {
      get: function () {
        if ("HSV" === this.__state.space) {
          return this.__state[t];
        } else {
          g.recalculateHSV(this);
          return this.__state[t];
        }
      },
      set: function (e) {
        if ("HSV" !== this.__state.space) {
          g.recalculateHSV(this);
          this.__state.space = "HSV";
        }
        this.__state[t] = e;
      }
    });
  }
  g.recalculateRGB = function (e, t, o) {
    if ("HEX" === e.__state.space) {
      e.__state[t] = u.component_from_hex(e.__state.hex, o);
    } else {
      if ("HSV" !== e.__state.space) {
        throw new Error("Corrupted color state");
      }
      n.extend(e.__state, u.hsv_to_rgb(e.__state.h, e.__state.s, e.__state.v));
    }
  };
  g.recalculateHSV = function (e) {
    var t = u.rgb_to_hsv(e.r, e.g, e.b);
    n.extend(e.__state, {
      s: t.s,
      v: t.v
    });
    if (n.isNaN(t.h)) {
      n.isUndefined(e.__state.h) && (e.__state.h = 0);
    } else {
      e.__state.h = t.h;
    }
  };
  g.COMPONENTS = ["r", "g", "b", "h", "s", "v", "hex", "a"];
  v(g.prototype, "r", 2);
  v(g.prototype, "g", 1);
  v(g.prototype, "b", 0);
  C(g.prototype, "h");
  C(g.prototype, "s");
  C(g.prototype, "v");
  Object.defineProperty(g.prototype, "a", {
    get: function () {
      return this.__state.a;
    },
    set: function (e) {
      this.__state.a = e;
    }
  });
  Object.defineProperty(g.prototype, "hex", {
    get: function () {
      if ("HEX" !== this.__state.space) {
        this.__state.hex = u.rgb_to_hex(this.r, this.g, this.b);
        this.__state.space = "HEX";
      }
      return this.__state.hex;
    },
    set: function (e) {
      this.__state.space = "HEX";
      this.__state.hex = e;
    }
  });
  var S = function () {
    function e(t, o) {
      p(this, e);
      this.initialValue = t[o];
      this.domElement = document.createElement("div");
      this.object = t;
      this.property = o;
      this.__onChange = undefined;
      this.__onFinishChange = undefined;
    }
    d(e, [{
      key: "onChange",
      value: function (e) {
        this.__onChange = e;
        return this;
      }
    }, {
      key: "onFinishChange",
      value: function (e) {
        this.__onFinishChange = e;
        return this;
      }
    }, {
      key: "setValue",
      value: function (e) {
        this.object[this.property] = e;
        this.__onChange && this.__onChange.call(this, e);
        this.updateDisplay();
        return this;
      }
    }, {
      key: "getValue",
      value: function () {
        return this.object[this.property];
      }
    }, {
      key: "updateDisplay",
      value: function () {
        return this;
      }
    }, {
      key: "isModified",
      value: function () {
        return this.initialValue !== this.getValue();
      }
    }]);
    return e;
  }();
  var I = {};
  n.each({
    HTMLEvents: ["change"],
    MouseEvents: ["click", "mousemove", "mousedown", "mouseup", "mouseover"],
    KeyboardEvents: ["keydown"]
  }, function (e, t) {
    n.each(e, function (e) {
      I[e] = t;
    });
  });
  var b = /(\d+(\.\d+)?)px/;
  function x(e) {
    if ("0" === e || n.isUndefined(e)) {
      return 0;
    }
    var t = e.match(b);
    if (n.isNull(t)) {
      return 0;
    } else {
      return parseFloat(t[1]);
    }
  }
  var P = {
    makeSelectable: function (e, t) {
      if (undefined !== e && undefined !== e.style) {
        e.onselectstart = t ? function () {
          return false;
        } : function () {};
        e.style.MozUserSelect = t ? "auto" : "none";
        e.style.KhtmlUserSelect = t ? "auto" : "none";
        e.unselectable = t ? "on" : "off";
      }
    },
    makeFullscreen: function (e, t, o) {
      var i = o;
      var a = t;
      n.isUndefined(a) && (a = true);
      n.isUndefined(i) && (i = true);
      e.style.position = "absolute";
      if (a) {
        e.style.left = 0;
        e.style.right = 0;
      }
      if (i) {
        e.style.top = 0;
        e.style.bottom = 0;
      }
    },
    fakeEvent: function (e, t, o, i) {
      var a = o || {};
      var s = I[t];
      if (!s) {
        throw new Error("Event type " + t + " not supported.");
      }
      var r = document.createEvent(s);
      switch (s) {
        case "MouseEvents":
          var c = a.x || a.clientX || 0;
          var l = a.y || a.clientY || 0;
          r.initMouseEvent(t, a.bubbles || false, a.cancelable || true, window, a.clickCount || 1, 0, 0, c, l, false, false, false, false, 0, null);
          break;
        case "KeyboardEvents":
          var u = r.initKeyboardEvent || r.initKeyEvent;
          n.defaults(a, {
            cancelable: true,
            ctrlKey: false,
            altKey: false,
            shiftKey: false,
            metaKey: false,
            keyCode: undefined,
            charCode: undefined
          });
          u(t, a.bubbles || false, a.cancelable, window, a.ctrlKey, a.altKey, a.shiftKey, a.metaKey, a.keyCode, a.charCode);
          break;
        default:
          r.initEvent(t, a.bubbles || false, a.cancelable || true);
      }
      n.defaults(r, i);
      e.dispatchEvent(r);
    },
    bind: function (e, t, o, i) {
      var n = i || false;
      if (e.addEventListener) {
        e.addEventListener(t, o, n);
      } else {
        e.attachEvent && e.attachEvent("on" + t, o);
      }
      return P;
    },
    unbind: function (e, t, o, i) {
      var n = i || false;
      if (e.removeEventListener) {
        e.removeEventListener(t, o, n);
      } else {
        e.detachEvent && e.detachEvent("on" + t, o);
      }
      return P;
    },
    addClass: function (e, t) {
      if (undefined === e.className) {
        e.className = t;
      } else if (e.className !== t) {
        var o = e.className.split(/ +/);
        if (-1 === o.indexOf(t)) {
          o.push(t);
          e.className = o.join(" ").replace(/^\s+/, "").replace(/\s+$/, "");
        }
      }
      return P;
    },
    removeClass: function (e, t) {
      if (t) {
        if (e.className === t) {
          e.removeAttribute("class");
        } else {
          var o = e.className.split(/ +/);
          var i = o.indexOf(t);
          if (-1 !== i) {
            o.splice(i, 1);
            e.className = o.join(" ");
          }
        }
      } else {
        e.className = undefined;
      }
      return P;
    },
    hasClass: function (e, t) {
      return new RegExp("(?:^|\\s+)" + t + "(?:\\s+|$)").test(e.className) || false;
    },
    getWidth: function (e) {
      var t = getComputedStyle(e);
      return x(t["border-left-width"]) + x(t["border-right-width"]) + x(t["padding-left"]) + x(t["padding-right"]) + x(t.width);
    },
    getHeight: function (e) {
      var t = getComputedStyle(e);
      return x(t["border-top-width"]) + x(t["border-bottom-width"]) + x(t["padding-top"]) + x(t["padding-bottom"]) + x(t.height);
    },
    getOffset: function (e) {
      var t = e;
      var o = {
        left: 0,
        top: 0
      };
      if (t.offsetParent) {
        do {
          o.left += t.offsetLeft;
          o.top += t.offsetTop;
          t = t.offsetParent;
        } while (t);
      }
      return o;
    },
    isActive: function (e) {
      return e === document.activeElement && (e.type || e.href);
    }
  };
  var _ = function () {
    function e(t, o) {
      p(this, e);
      var i = m(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, o));
      var n = i;
      i.__prev = i.getValue();
      i.__checkbox = document.createElement("input");
      i.__checkbox.setAttribute("type", "checkbox");
      P.bind(i.__checkbox, "change", function () {
        n.setValue(!n.__prev);
      }, false);
      i.domElement.appendChild(i.__checkbox);
      i.updateDisplay();
      return i;
    }
    f(e, S);
    d(e, [{
      key: "setValue",
      value: function (t) {
        var o = y(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "setValue", this).call(this, t);
        this.__onFinishChange && this.__onFinishChange.call(this, this.getValue());
        this.__prev = this.getValue();
        return o;
      }
    }, {
      key: "updateDisplay",
      value: function () {
        if (true === this.getValue()) {
          this.__checkbox.setAttribute("checked", "checked");
          this.__checkbox.checked = true;
          this.__prev = true;
        } else {
          this.__checkbox.checked = false;
          this.__prev = false;
        }
        return y(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "updateDisplay", this).call(this);
      }
    }]);
    return e;
  }();
  var T = function () {
    function e(t, o, i) {
      p(this, e);
      var a = m(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, o));
      var s = i;
      var r = a;
      a.__select = document.createElement("select");
      if (n.isArray(s)) {
        var c = {};
        n.each(s, function (e) {
          c[e] = e;
        });
        s = c;
      }
      n.each(s, function (e, t) {
        var o = document.createElement("option");
        o.innerHTML = t;
        o.setAttribute("value", e);
        r.__select.appendChild(o);
      });
      a.updateDisplay();
      P.bind(a.__select, "change", function () {
        var e = this.options[this.selectedIndex].value;
        r.setValue(e);
      });
      a.domElement.appendChild(a.__select);
      return a;
    }
    f(e, S);
    d(e, [{
      key: "setValue",
      value: function (t) {
        var o = y(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "setValue", this).call(this, t);
        this.__onFinishChange && this.__onFinishChange.call(this, this.getValue());
        return o;
      }
    }, {
      key: "updateDisplay",
      value: function () {
        if (P.isActive(this.__select)) {
          return this;
        } else {
          this.__select.value = this.getValue();
          return y(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "updateDisplay", this).call(this);
        }
      }
    }]);
    return e;
  }();
  var U = function () {
    function e(t, o) {
      p(this, e);
      var i = m(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, o));
      var n = i;
      function a() {
        n.setValue(n.__input.value);
      }
      i.__input = document.createElement("input");
      i.__input.setAttribute("type", "text");
      P.bind(i.__input, "keyup", a);
      P.bind(i.__input, "change", a);
      P.bind(i.__input, "blur", function () {
        n.__onFinishChange && n.__onFinishChange.call(n, n.getValue());
      });
      P.bind(i.__input, "keydown", function (e) {
        13 === e.keyCode && this.blur();
      });
      i.updateDisplay();
      i.domElement.appendChild(i.__input);
      return i;
    }
    f(e, S);
    d(e, [{
      key: "updateDisplay",
      value: function () {
        P.isActive(this.__input) || (this.__input.value = this.getValue());
        return y(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "updateDisplay", this).call(this);
      }
    }]);
    return e;
  }();
  function k(e) {
    var t = e.toString();
    if (t.indexOf(".") > -1) {
      return t.length - t.indexOf(".") - 1;
    } else {
      return 0;
    }
  }
  var w = function () {
    function e(t, o, i) {
      p(this, e);
      var a = m(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, o));
      var s = i || {};
      a.__min = s.min;
      a.__max = s.max;
      a.__step = s.step;
      if (n.isUndefined(a.__step)) {
        if (0 === a.initialValue) {
          a.__impliedStep = 1;
        } else {
          a.__impliedStep = Math.pow(10, Math.floor(Math.log(Math.abs(a.initialValue)) / Math.LN10)) / 10;
        }
      } else {
        a.__impliedStep = a.__step;
      }
      a.__precision = k(a.__impliedStep);
      return a;
    }
    f(e, S);
    d(e, [{
      key: "setValue",
      value: function (t) {
        var o = t;
        if (undefined !== this.__min && o < this.__min) {
          o = this.__min;
        } else {
          undefined !== this.__max && o > this.__max && (o = this.__max);
        }
        undefined !== this.__step && o % this.__step != 0 && (o = Math.round(o / this.__step) * this.__step);
        return y(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "setValue", this).call(this, o);
      }
    }, {
      key: "min",
      value: function (e) {
        this.__min = e;
        return this;
      }
    }, {
      key: "max",
      value: function (e) {
        this.__max = e;
        return this;
      }
    }, {
      key: "step",
      value: function (e) {
        this.__step = e;
        this.__impliedStep = e;
        this.__precision = k(e);
        return this;
      }
    }]);
    return e;
  }();
  var D = function () {
    function e(t, o, i) {
      p(this, e);
      var a = m(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, o, i));
      a.__truncationSuspended = false;
      var s = a;
      var r = undefined;
      function c() {
        s.__onFinishChange && s.__onFinishChange.call(s, s.getValue());
      }
      function l(e) {
        var t = r - e.clientY;
        s.setValue(s.getValue() + t * s.__impliedStep);
        r = e.clientY;
      }
      function u() {
        P.unbind(window, "mousemove", l);
        P.unbind(window, "mouseup", u);
        c();
      }
      a.__input = document.createElement("input");
      a.__input.setAttribute("type", "text");
      P.bind(a.__input, "change", function () {
        var e = parseFloat(s.__input.value);
        n.isNaN(e) || s.setValue(e);
      });
      P.bind(a.__input, "blur", function () {
        c();
      });
      P.bind(a.__input, "mousedown", function (e) {
        P.bind(window, "mousemove", l);
        P.bind(window, "mouseup", u);
        r = e.clientY;
      });
      P.bind(a.__input, "keydown", function (e) {
        if (13 === e.keyCode) {
          s.__truncationSuspended = true;
          this.blur();
          s.__truncationSuspended = false;
          c();
        }
      });
      a.updateDisplay();
      a.domElement.appendChild(a.__input);
      return a;
    }
    f(e, w);
    d(e, [{
      key: "updateDisplay",
      value: function () {
        var t;
        var o;
        var i;
        this.__input.value = this.__truncationSuspended ? this.getValue() : (t = this.getValue(), o = this.__precision, i = Math.pow(10, o), Math.round(t * i) / i);
        return y(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "updateDisplay", this).call(this);
      }
    }]);
    return e;
  }();
  function R(e, t, o, i, n) {
    return i + (e - t) / (o - t) * (n - i);
  }
  var M = function () {
    function e(t, o, i, n, a) {
      p(this, e);
      var s = m(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, o, {
        min: i,
        max: n,
        step: a
      }));
      var r = s;
      function c(e) {
        e.preventDefault();
        var t = r.__background.getBoundingClientRect();
        r.setValue(R(e.clientX, t.left, t.right, r.__min, r.__max));
        return false;
      }
      function l() {
        P.unbind(window, "mousemove", c);
        P.unbind(window, "mouseup", l);
        r.__onFinishChange && r.__onFinishChange.call(r, r.getValue());
      }
      function u(e) {
        var t = e.touches[0].clientX;
        var o = r.__background.getBoundingClientRect();
        r.setValue(R(t, o.left, o.right, r.__min, r.__max));
      }
      function h() {
        P.unbind(window, "touchmove", u);
        P.unbind(window, "touchend", h);
        r.__onFinishChange && r.__onFinishChange.call(r, r.getValue());
      }
      s.__background = document.createElement("div");
      s.__foreground = document.createElement("div");
      P.bind(s.__background, "mousedown", function (e) {
        document.activeElement.blur();
        P.bind(window, "mousemove", c);
        P.bind(window, "mouseup", l);
        c(e);
      });
      P.bind(s.__background, "touchstart", function (e) {
        if (1 === e.touches.length) {
          P.bind(window, "touchmove", u);
          P.bind(window, "touchend", h);
          u(e);
        }
      });
      P.addClass(s.__background, "slider");
      P.addClass(s.__foreground, "slider-fg");
      s.updateDisplay();
      s.__background.appendChild(s.__foreground);
      s.domElement.appendChild(s.__background);
      return s;
    }
    f(e, w);
    d(e, [{
      key: "updateDisplay",
      value: function () {
        var t = (this.getValue() - this.__min) / (this.__max - this.__min);
        this.__foreground.style.width = 100 * t + "%";
        return y(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "updateDisplay", this).call(this);
      }
    }]);
    return e;
  }();
  var N = function () {
    function e(t, o, i) {
      p(this, e);
      var n = m(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, o));
      var a = n;
      n.__button = document.createElement("div");
      n.__button.innerHTML = undefined === i ? "Fire" : i;
      P.bind(n.__button, "click", function (e) {
        e.preventDefault();
        a.fire();
        return false;
      });
      P.addClass(n.__button, "button");
      n.domElement.appendChild(n.__button);
      return n;
    }
    f(e, S);
    d(e, [{
      key: "fire",
      value: function () {
        this.__onChange && this.__onChange.call(this);
        this.getValue().call(this.object);
        this.__onFinishChange && this.__onFinishChange.call(this, this.getValue());
      }
    }]);
    return e;
  }();
  var B = function () {
    function e(t, o) {
      p(this, e);
      var i = m(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, o));
      i.__color = new g(i.getValue());
      i.__temp = new g(0);
      var a = i;
      i.domElement = document.createElement("div");
      P.makeSelectable(i.domElement, false);
      i.__selector = document.createElement("div");
      i.__selector.className = "selector";
      i.__saturation_field = document.createElement("div");
      i.__saturation_field.className = "saturation-field";
      i.__field_knob = document.createElement("div");
      i.__field_knob.className = "field-knob";
      i.__field_knob_border = "2px solid ";
      i.__hue_knob = document.createElement("div");
      i.__hue_knob.className = "hue-knob";
      i.__hue_field = document.createElement("div");
      i.__hue_field.className = "hue-field";
      i.__input = document.createElement("input");
      i.__input.type = "text";
      i.__input_textShadow = "0 1px 1px ";
      P.bind(i.__input, "keydown", function (e) {
        13 === e.keyCode && y.call(this);
      });
      P.bind(i.__input, "blur", y);
      P.bind(i.__selector, "mousedown", function () {
        P.addClass(this, "drag").bind(window, "mouseup", function () {
          P.removeClass(a.__selector, "drag");
        });
      });
      P.bind(i.__selector, "touchstart", function () {
        P.addClass(this, "drag").bind(window, "touchend", function () {
          P.removeClass(a.__selector, "drag");
        });
      });
      var s;
      var r = document.createElement("div");
      function l(e) {
        v(e);
        P.bind(window, "mousemove", v);
        P.bind(window, "touchmove", v);
        P.bind(window, "mouseup", h);
        P.bind(window, "touchend", h);
      }
      function u(e) {
        C(e);
        P.bind(window, "mousemove", C);
        P.bind(window, "touchmove", C);
        P.bind(window, "mouseup", d);
        P.bind(window, "touchend", d);
      }
      function h() {
        P.unbind(window, "mousemove", v);
        P.unbind(window, "touchmove", v);
        P.unbind(window, "mouseup", h);
        P.unbind(window, "touchend", h);
        f();
      }
      function d() {
        P.unbind(window, "mousemove", C);
        P.unbind(window, "touchmove", C);
        P.unbind(window, "mouseup", d);
        P.unbind(window, "touchend", d);
        f();
      }
      function y() {
        var e = c(this.value);
        if (false !== e) {
          a.__color.__state = e;
          a.setValue(a.__color.toOriginal());
        } else {
          this.value = a.__color.toString();
        }
      }
      function f() {
        a.__onFinishChange && a.__onFinishChange.call(a, a.__color.toOriginal());
      }
      function v(e) {
        -1 === e.type.indexOf("touch") && e.preventDefault();
        var t = a.__saturation_field.getBoundingClientRect();
        var o = e.touches && e.touches[0] || e;
        var i = o.clientX;
        var n = o.clientY;
        var s = (i - t.left) / (t.right - t.left);
        var r = 1 - (n - t.top) / (t.bottom - t.top);
        if (r > 1) {
          r = 1;
        } else {
          r < 0 && (r = 0);
        }
        if (s > 1) {
          s = 1;
        } else {
          s < 0 && (s = 0);
        }
        a.__color.v = r;
        a.__color.s = s;
        a.setValue(a.__color.toOriginal());
        return false;
      }
      function C(e) {
        -1 === e.type.indexOf("touch") && e.preventDefault();
        var t = a.__hue_field.getBoundingClientRect();
        var o = 1 - ((e.touches && e.touches[0] || e).clientY - t.top) / (t.bottom - t.top);
        if (o > 1) {
          o = 1;
        } else {
          o < 0 && (o = 0);
        }
        a.__color.h = 360 * o;
        a.setValue(a.__color.toOriginal());
        return false;
      }
      n.extend(i.__selector.style, {
        width: "122px",
        height: "102px",
        padding: "3px",
        backgroundColor: "#222",
        boxShadow: "0px 1px 3px rgba(0,0,0,0.3)"
      });
      n.extend(i.__field_knob.style, {
        position: "absolute",
        width: "12px",
        height: "12px",
        border: i.__field_knob_border + (i.__color.v < .5 ? "#fff" : "#000"),
        boxShadow: "0px 1px 3px rgba(0,0,0,0.5)",
        borderRadius: "12px",
        zIndex: 1
      });
      n.extend(i.__hue_knob.style, {
        position: "absolute",
        width: "15px",
        height: "2px",
        borderRight: "4px solid #fff",
        zIndex: 1
      });
      n.extend(i.__saturation_field.style, {
        width: "100px",
        height: "100px",
        border: "1px solid #555",
        marginRight: "3px",
        display: "inline-block",
        cursor: "pointer"
      });
      n.extend(r.style, {
        width: "100%",
        height: "100%",
        background: "none"
      });
      O(r, "top", "rgba(0,0,0,0)", "#000");
      n.extend(i.__hue_field.style, {
        width: "15px",
        height: "100px",
        border: "1px solid #555",
        cursor: "ns-resize",
        position: "absolute",
        top: "3px",
        right: "3px"
      });
      (s = i.__hue_field).style.background = "";
      s.style.cssText += "background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);";
      s.style.cssText += "background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);";
      s.style.cssText += "background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);";
      s.style.cssText += "background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);";
      s.style.cssText += "background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);";
      n.extend(i.__input.style, {
        outline: "none",
        textAlign: "center",
        color: "#fff",
        border: 0,
        fontWeight: "bold",
        textShadow: i.__input_textShadow + "rgba(0,0,0,0.7)"
      });
      P.bind(i.__saturation_field, "mousedown", l);
      P.bind(i.__saturation_field, "touchstart", l);
      P.bind(i.__field_knob, "mousedown", l);
      P.bind(i.__field_knob, "touchstart", l);
      P.bind(i.__hue_field, "mousedown", u);
      P.bind(i.__hue_field, "touchstart", u);
      i.__saturation_field.appendChild(r);
      i.__selector.appendChild(i.__field_knob);
      i.__selector.appendChild(i.__saturation_field);
      i.__selector.appendChild(i.__hue_field);
      i.__hue_field.appendChild(i.__hue_knob);
      i.domElement.appendChild(i.__input);
      i.domElement.appendChild(i.__selector);
      i.updateDisplay();
      return i;
    }
    f(e, S);
    d(e, [{
      key: "updateDisplay",
      value: function () {
        var e = c(this.getValue());
        if (false !== e) {
          var t = false;
          n.each(g.COMPONENTS, function (o) {
            if (!n.isUndefined(e[o]) && !n.isUndefined(this.__color.__state[o]) && e[o] !== this.__color.__state[o]) {
              t = true;
              return {};
            }
          }, this);
          t && n.extend(this.__color.__state, e);
        }
        n.extend(this.__temp.__state, this.__color.__state);
        this.__temp.a = 1;
        var o = this.__color.v < .5 || this.__color.s > .5 ? 255 : 0;
        var i = 255 - o;
        n.extend(this.__field_knob.style, {
          marginLeft: 100 * this.__color.s - 7 + "px",
          marginTop: 100 * (1 - this.__color.v) - 7 + "px",
          backgroundColor: this.__temp.toHexString(),
          border: this.__field_knob_border + "rgb(" + o + "," + o + "," + o + ")"
        });
        this.__hue_knob.style.marginTop = 100 * (1 - this.__color.h / 360) + "px";
        this.__temp.s = 1;
        this.__temp.v = 1;
        O(this.__saturation_field, "left", "#fff", this.__temp.toHexString());
        this.__input.value = this.__color.toString();
        n.extend(this.__input.style, {
          backgroundColor: this.__color.toHexString(),
          color: "rgb(" + o + "," + o + "," + o + ")",
          textShadow: this.__input_textShadow + "rgba(" + i + "," + i + "," + i + ",.7)"
        });
      }
    }]);
    return e;
  }();
  var L = ["-moz-", "-o-", "-webkit-", "-ms-", ""];
  function O(e, t, o, i) {
    e.style.background = "";
    n.each(L, function (n) {
      e.style.cssText += "background: " + n + "linear-gradient(" + t + ", " + o + " 0%, " + i + " 100%); ";
    });
  }
  var A = '<div id="dg-save" class="dg dialogue">\n\n  Here\'s the new load parameter for your <code>GUI</code>\'s constructor:\n\n  <textarea id="dg-new-constructor"></textarea>\n\n  <div id="dg-save-locally">\n\n    <input id="dg-local-storage" type="checkbox"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id="dg-local-explain">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>\'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n\n    </div>\n\n  </div>\n\n</div>';
  var F = function (e, t) {
    var o = e[t];
    if (n.isArray(arguments[2]) || n.isObject(arguments[2])) {
      return new T(e, t, arguments[2]);
    } else if (n.isNumber(o)) {
      if (n.isNumber(arguments[2]) && n.isNumber(arguments[3])) {
        if (n.isNumber(arguments[4])) {
          return new M(e, t, arguments[2], arguments[3], arguments[4]);
        } else {
          return new M(e, t, arguments[2], arguments[3]);
        }
      } else if (n.isNumber(arguments[4])) {
        return new D(e, t, {
          min: arguments[2],
          max: arguments[3],
          step: arguments[4]
        });
      } else {
        return new D(e, t, {
          min: arguments[2],
          max: arguments[3]
        });
      }
    } else if (n.isString(o)) {
      return new U(e, t);
    } else if (n.isFunction(o)) {
      return new N(e, t, "");
    } else if (n.isBoolean(o)) {
      return new _(e, t);
    } else {
      return null;
    }
  };
  var E = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (e) {
    setTimeout(e, 1e3 / 60);
  };
  var G = function () {
    function e() {
      p(this, e);
      this.backgroundElement = document.createElement("div");
      n.extend(this.backgroundElement.style, {
        backgroundColor: "rgba(0,0,0,0.8)",
        top: 0,
        left: 0,
        display: "none",
        zIndex: "1000",
        opacity: 0,
        WebkitTransition: "opacity 0.2s linear",
        transition: "opacity 0.2s linear"
      });
      P.makeFullscreen(this.backgroundElement);
      this.backgroundElement.style.position = "fixed";
      this.domElement = document.createElement("div");
      n.extend(this.domElement.style, {
        position: "fixed",
        display: "none",
        zIndex: "1001",
        opacity: 0,
        WebkitTransition: "-webkit-transform 0.2s ease-out, opacity 0.2s linear",
        transition: "transform 0.2s ease-out, opacity 0.2s linear"
      });
      document.body.appendChild(this.backgroundElement);
      document.body.appendChild(this.domElement);
      var t = this;
      P.bind(this.backgroundElement, "click", function () {
        t.hide();
      });
    }
    d(e, [{
      key: "show",
      value: function () {
        var e = this;
        this.backgroundElement.style.display = "block";
        this.domElement.style.display = "block";
        this.domElement.style.opacity = 0;
        this.domElement.style.webkitTransform = "scale(1.1)";
        this.layout();
        n.defer(function () {
          e.backgroundElement.style.opacity = 1;
          e.domElement.style.opacity = 1;
          e.domElement.style.webkitTransform = "scale(1)";
        });
      }
    }, {
      key: "hide",
      value: function () {
        var e = this;
        var t = function t() {
          e.domElement.style.display = "none";
          e.backgroundElement.style.display = "none";
          P.unbind(e.domElement, "webkitTransitionEnd", t);
          P.unbind(e.domElement, "transitionend", t);
          P.unbind(e.domElement, "oTransitionEnd", t);
        };
        P.bind(this.domElement, "webkitTransitionEnd", t);
        P.bind(this.domElement, "transitionend", t);
        P.bind(this.domElement, "oTransitionEnd", t);
        this.backgroundElement.style.opacity = 0;
        this.domElement.style.opacity = 0;
        this.domElement.style.webkitTransform = "scale(1.1)";
      }
    }, {
      key: "layout",
      value: function () {
        this.domElement.style.left = window.innerWidth / 2 - P.getWidth(this.domElement) / 2 + "px";
        this.domElement.style.top = window.innerHeight / 2 - P.getHeight(this.domElement) / 2 + "px";
      }
    }]);
    return e;
  }();
  (function (e, t) {
    var o = t || document;
    var i = document.createElement("style");
    i.type = "text/css";
    i.innerHTML = e;
    var n = o.getElementsByTagName("head")[0];
    try {
      n.appendChild(i);
    } catch (a) {}
  })(function (e) {
    if ("undefined" != typeof window) {
      var t = document.createElement("style");
      t.setAttribute("type", "text/css");
      t.innerHTML = e;
      document.head.appendChild(t);
      return e;
    }
  }(".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear;border:0;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button.close-top{position:relative}.dg.main .close-button.close-bottom{position:absolute}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-y:visible}.dg.a.has-save>ul.close-top{margin-top:0}.dg.a.has-save>ul.close-bottom{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{top:0;z-index:1002}.dg.a .save-row.close-top{position:relative}.dg.a .save-row.close-bottom{position:fixed}.dg li{-webkit-transition:height .1s ease-out;-o-transition:height .1s ease-out;-moz-transition:height .1s ease-out;transition:height .1s ease-out;-webkit-transition:overflow .1s linear;-o-transition:overflow .1s linear;-moz-transition:overflow .1s linear;transition:overflow .1s linear}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px;overflow:hidden}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .cr.function .property-name{width:100%}.dg .c{float:left;width:60%;position:relative}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:7px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .cr.color{overflow:visible}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2FA1D6}.dg .cr.number input[type=text]{color:#2FA1D6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2FA1D6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}\n"));
  var j = "Default";
  var H = function () {
    try {
      return !!window.localStorage;
    } catch (e) {
      return false;
    }
  }();
  var W = undefined;
  var V = true;
  var Y = undefined;
  var K = false;
  var z = [];
  var q = function e(t) {
    var o = this;
    var i = t || {};
    this.domElement = document.createElement("div");
    this.__ul = document.createElement("ul");
    this.domElement.appendChild(this.__ul);
    P.addClass(this.domElement, "dg");
    this.__folders = {};
    this.__controllers = [];
    this.__rememberedObjects = [];
    this.__rememberedObjectIndecesToControllers = [];
    this.__listening = [];
    i = n.defaults(i, {
      closeOnTop: false,
      autoPlace: true,
      width: e.DEFAULT_WIDTH
    });
    i = n.defaults(i, {
      resizable: i.autoPlace,
      hideable: i.autoPlace
    });
    if (n.isUndefined(i.load)) {
      i.load = {
        preset: j
      };
    } else {
      i.preset && (i.load.preset = i.preset);
    }
    n.isUndefined(i.parent) && i.hideable && z.push(this);
    i.resizable = n.isUndefined(i.parent) && i.resizable;
    i.autoPlace && n.isUndefined(i.scrollable) && (i.scrollable = true);
    var a;
    var s = H && "true" === localStorage.getItem(te(0, "isLocal"));
    var r = undefined;
    var c = undefined;
    Object.defineProperties(this, {
      parent: {
        get: function () {
          return i.parent;
        }
      },
      scrollable: {
        get: function () {
          return i.scrollable;
        }
      },
      autoPlace: {
        get: function () {
          return i.autoPlace;
        }
      },
      closeOnTop: {
        get: function () {
          return i.closeOnTop;
        }
      },
      preset: {
        get: function () {
          if (o.parent) {
            return o.getRoot().preset;
          } else {
            return i.load.preset;
          }
        },
        set: function (e) {
          if (o.parent) {
            o.getRoot().preset = e;
          } else {
            i.load.preset = e;
          }
          ce(this);
          o.revert();
        }
      },
      width: {
        get: function () {
          return i.width;
        },
        set: function (e) {
          i.width = e;
          se(o, e);
        }
      },
      name: {
        get: function () {
          return i.name;
        },
        set: function (e) {
          i.name = e;
          c && (c.innerHTML = i.name);
        }
      },
      closed: {
        get: function () {
          return i.closed;
        },
        set: function (t) {
          i.closed = t;
          if (i.closed) {
            P.addClass(o.__ul, e.CLASS_CLOSED);
          } else {
            P.removeClass(o.__ul, e.CLASS_CLOSED);
          }
          this.onResize();
          o.__closeButton && (o.__closeButton.innerHTML = t ? e.TEXT_OPEN : e.TEXT_CLOSED);
        }
      },
      load: {
        get: function () {
          return i.load;
        }
      },
      useLocalStorage: {
        get: function () {
          return s;
        },
        set: function (e) {
          if (H) {
            s = e;
            if (e) {
              P.bind(window, "unload", r);
            } else {
              P.unbind(window, "unload", r);
            }
            localStorage.setItem(te(0, "isLocal"), e);
          }
        }
      }
    });
    if (n.isUndefined(i.parent)) {
      this.closed = i.closed || false;
      P.addClass(this.domElement, e.CLASS_MAIN);
      P.makeSelectable(this.domElement, false);
      if (H && s) {
        o.useLocalStorage = true;
        var l = localStorage.getItem(te(0, "gui"));
        l && (i.load = JSON.parse(l));
      }
      this.__closeButton = document.createElement("div");
      this.__closeButton.innerHTML = e.TEXT_CLOSED;
      P.addClass(this.__closeButton, e.CLASS_CLOSE_BUTTON);
      if (i.closeOnTop) {
        P.addClass(this.__closeButton, e.CLASS_CLOSE_TOP);
        this.domElement.insertBefore(this.__closeButton, this.domElement.childNodes[0]);
      } else {
        P.addClass(this.__closeButton, e.CLASS_CLOSE_BOTTOM);
        this.domElement.appendChild(this.__closeButton);
      }
      P.bind(this.__closeButton, "click", function () {
        o.closed = !o.closed;
      });
    } else {
      undefined === i.closed && (i.closed = true);
      var u = document.createTextNode(i.name);
      P.addClass(u, "controller-name");
      c = J(o, u);
      P.addClass(this.__ul, e.CLASS_CLOSED);
      P.addClass(c, "title");
      P.bind(c, "click", function (e) {
        e.preventDefault();
        o.closed = !o.closed;
        return false;
      });
      i.closed || (this.closed = false);
    }
    if (i.autoPlace) {
      if (n.isUndefined(i.parent)) {
        if (V) {
          Y = document.createElement("div");
          P.addClass(Y, "dg");
          P.addClass(Y, e.CLASS_AUTO_PLACE_CONTAINER);
          document.body.appendChild(Y);
          V = false;
        }
        Y.appendChild(this.domElement);
        P.addClass(this.domElement, e.CLASS_AUTO_PLACE);
      }
      this.parent || se(o, i.width);
    }
    this.__resizeHandler = function () {
      o.onResizeDebounced();
    };
    P.bind(window, "resize", this.__resizeHandler);
    P.bind(this.__ul, "webkitTransitionEnd", this.__resizeHandler);
    P.bind(this.__ul, "transitionend", this.__resizeHandler);
    P.bind(this.__ul, "oTransitionEnd", this.__resizeHandler);
    this.onResize();
    i.resizable && ae(this);
    r = function () {
      H && "true" === localStorage.getItem(te(0, "isLocal")) && localStorage.setItem(te(0, "gui"), JSON.stringify(o.getSaveObject()));
    };
    this.saveToLocalStorageIfPossible = r;
    if (!i.parent) {
      (a = o.getRoot()).width += 1;
      n.defer(function () {
        a.width -= 1;
      });
    }
  };
  function J(e, t, o) {
    var i = document.createElement("li");
    t && i.appendChild(t);
    if (o) {
      e.__ul.insertBefore(i, o);
    } else {
      e.__ul.appendChild(i);
    }
    e.onResize();
    return i;
  }
  function X(e) {
    P.unbind(window, "resize", e.__resizeHandler);
    e.saveToLocalStorageIfPossible && P.unbind(window, "unload", e.saveToLocalStorageIfPossible);
  }
  function Z(e, t) {
    var o = e.__preset_select[e.__preset_select.selectedIndex];
    o.innerHTML = t ? o.value + "*" : o.value;
  }
  function Q(e, t, o) {
    o.__li = t;
    o.__gui = e;
    n.extend(o, {
      options: function (t) {
        if (arguments.length > 1) {
          var i = o.__li.nextElementSibling;
          o.remove();
          return ee(e, o.object, o.property, {
            before: i,
            factoryArgs: [n.toArray(arguments)]
          });
        }
        if (n.isArray(t) || n.isObject(t)) {
          var a = o.__li.nextElementSibling;
          o.remove();
          return ee(e, o.object, o.property, {
            before: a,
            factoryArgs: [t]
          });
        }
      },
      name: function (e) {
        o.__li.firstElementChild.firstElementChild.innerHTML = e;
        return o;
      },
      listen: function () {
        o.__gui.listen(o);
        return o;
      },
      remove: function () {
        o.__gui.remove(o);
        return o;
      }
    });
    if (o instanceof M) {
      var i = new D(o.object, o.property, {
        min: o.__min,
        max: o.__max,
        step: o.__step
      });
      n.each(["updateDisplay", "onChange", "onFinishChange", "step", "min", "max"], function (e) {
        var t = o[e];
        var n = i[e];
        o[e] = i[e] = function () {
          var e = Array.prototype.slice.call(arguments);
          n.apply(i, e);
          return t.apply(o, e);
        };
      });
      P.addClass(t, "has-slider");
      o.domElement.insertBefore(i.domElement, o.domElement.firstElementChild);
    } else if (o instanceof D) {
      var a = function (t) {
        if (n.isNumber(o.__min) && n.isNumber(o.__max)) {
          var i = o.__li.firstElementChild.firstElementChild.innerHTML;
          var a = o.__gui.__listening.indexOf(o) > -1;
          o.remove();
          var s = ee(e, o.object, o.property, {
            before: o.__li.nextElementSibling,
            factoryArgs: [o.__min, o.__max, o.__step]
          });
          s.name(i);
          a && s.listen();
          return s;
        }
        return t;
      };
      o.min = n.compose(a, o.min);
      o.max = n.compose(a, o.max);
    } else if (o instanceof _) {
      P.bind(t, "click", function () {
        P.fakeEvent(o.__checkbox, "click");
      });
      P.bind(o.__checkbox, "click", function (e) {
        e.stopPropagation();
      });
    } else if (o instanceof N) {
      P.bind(t, "click", function () {
        P.fakeEvent(o.__button, "click");
      });
      P.bind(t, "mouseover", function () {
        P.addClass(o.__button, "hover");
      });
      P.bind(t, "mouseout", function () {
        P.removeClass(o.__button, "hover");
      });
    } else if (o instanceof B) {
      P.addClass(t, "color");
      o.updateDisplay = n.compose(function (e) {
        t.style.borderLeftColor = o.__color.toString();
        return e;
      }, o.updateDisplay);
      o.updateDisplay();
    }
    o.setValue = n.compose(function (t) {
      e.getRoot().__preset_select && o.isModified() && Z(e.getRoot(), true);
      return t;
    }, o.setValue);
  }
  function $(e, t) {
    var o = e.getRoot();
    var i = o.__rememberedObjects.indexOf(t.object);
    if (-1 !== i) {
      var n = o.__rememberedObjectIndecesToControllers[i];
      if (undefined === n) {
        n = {};
        o.__rememberedObjectIndecesToControllers[i] = n;
      }
      n[t.property] = t;
      if (o.load && o.load.remembered) {
        var a = o.load.remembered;
        var s = undefined;
        if (a[e.preset]) {
          s = a[e.preset];
        } else {
          if (!a[j]) {
            return;
          }
          s = a[j];
        }
        if (s[i] && undefined !== s[i][t.property]) {
          var r = s[i][t.property];
          t.initialValue = r;
          t.setValue(r);
        }
      }
    }
  }
  function ee(e, t, o, i) {
    if (undefined === t[o]) {
      throw new Error('Object "' + t + '" has no property "' + o + '"');
    }
    var n = undefined;
    if (i.color) {
      n = new B(t, o);
    } else {
      var a = [t, o].concat(i.factoryArgs);
      n = F.apply(e, a);
    }
    i.before instanceof S && (i.before = i.before.__li);
    $(e, n);
    P.addClass(n.domElement, "c");
    var s = document.createElement("span");
    P.addClass(s, "property-name");
    s.innerHTML = n.property;
    var r = document.createElement("div");
    r.appendChild(s);
    r.appendChild(n.domElement);
    var c = J(e, r, i.before);
    P.addClass(c, q.CLASS_CONTROLLER_ROW);
    if (n instanceof B) {
      P.addClass(c, "color");
    } else {
      P.addClass(c, h(n.getValue()));
    }
    Q(e, c, n);
    e.__controllers.push(n);
    return n;
  }
  function te(e, t) {
    return document.location.href + "." + t;
  }
  function oe(e, t, o) {
    var i = document.createElement("option");
    i.innerHTML = t;
    i.value = t;
    e.__preset_select.appendChild(i);
    o && (e.__preset_select.selectedIndex = e.__preset_select.length - 1);
  }
  function ie(e, t) {
    t.style.display = e.useLocalStorage ? "block" : "none";
  }
  function ne(e) {
    var t = e.__save_row = document.createElement("li");
    P.addClass(e.domElement, "has-save");
    e.__ul.insertBefore(t, e.__ul.firstChild);
    P.addClass(t, "save-row");
    var o = document.createElement("span");
    o.innerHTML = "&nbsp;";
    P.addClass(o, "button gears");
    var i = document.createElement("span");
    i.innerHTML = "Save";
    P.addClass(i, "button");
    P.addClass(i, "save");
    var a = document.createElement("span");
    a.innerHTML = "New";
    P.addClass(a, "button");
    P.addClass(a, "save-as");
    var s = document.createElement("span");
    s.innerHTML = "Revert";
    P.addClass(s, "button");
    P.addClass(s, "revert");
    var r = e.__preset_select = document.createElement("select");
    if (e.load && e.load.remembered) {
      n.each(e.load.remembered, function (t, o) {
        oe(e, o, o === e.preset);
      });
    } else {
      oe(e, j, false);
    }
    P.bind(r, "change", function () {
      for (var t = 0; t < e.__preset_select.length; t++) {
        e.__preset_select[t].innerHTML = e.__preset_select[t].value;
      }
      e.preset = this.value;
    });
    t.appendChild(r);
    t.appendChild(o);
    t.appendChild(i);
    t.appendChild(a);
    t.appendChild(s);
    if (H) {
      var c = document.getElementById("dg-local-explain");
      var l = document.getElementById("dg-local-storage");
      document.getElementById("dg-save-locally").style.display = "block";
      "true" === localStorage.getItem(te(0, "isLocal")) && l.setAttribute("checked", "checked");
      ie(e, c);
      P.bind(l, "change", function () {
        e.useLocalStorage = !e.useLocalStorage;
        ie(e, c);
      });
    }
    var u = document.getElementById("dg-new-constructor");
    P.bind(u, "keydown", function (e) {
      !e.metaKey || 67 !== e.which && 67 !== e.keyCode || W.hide();
    });
    P.bind(o, "click", function () {
      u.innerHTML = JSON.stringify(e.getSaveObject(), undefined, 2);
      W.show();
      u.focus();
      u.select();
    });
    P.bind(i, "click", function () {
      e.save();
    });
    P.bind(a, "click", function () {
      var t = prompt("Enter a new preset name.");
      t && e.saveAs(t);
    });
    P.bind(s, "click", function () {
      e.revert();
    });
  }
  function ae(e) {
    var t = undefined;
    function o(o) {
      o.preventDefault();
      e.width += t - o.clientX;
      e.onResize();
      t = o.clientX;
      return false;
    }
    function i() {
      P.removeClass(e.__closeButton, q.CLASS_DRAG);
      P.unbind(window, "mousemove", o);
      P.unbind(window, "mouseup", i);
    }
    function a(n) {
      n.preventDefault();
      t = n.clientX;
      P.addClass(e.__closeButton, q.CLASS_DRAG);
      P.bind(window, "mousemove", o);
      P.bind(window, "mouseup", i);
      return false;
    }
    e.__resize_handle = document.createElement("div");
    n.extend(e.__resize_handle.style, {
      width: "6px",
      marginLeft: "-3px",
      height: "200px",
      cursor: "ew-resize",
      position: "absolute"
    });
    P.bind(e.__resize_handle, "mousedown", a);
    P.bind(e.__closeButton, "mousedown", a);
    e.domElement.insertBefore(e.__resize_handle, e.domElement.firstElementChild);
  }
  function se(e, t) {
    e.domElement.style.width = t + "px";
    e.__save_row && e.autoPlace && (e.__save_row.style.width = t + "px");
    e.__closeButton && (e.__closeButton.style.width = t + "px");
  }
  function re(e, t) {
    var o = {};
    n.each(e.__rememberedObjects, function (i, a) {
      var s = {};
      var r = e.__rememberedObjectIndecesToControllers[a];
      n.each(r, function (e, o) {
        s[o] = t ? e.initialValue : e.getValue();
      });
      o[a] = s;
    });
    return o;
  }
  function ce(e) {
    for (var t = 0; t < e.__preset_select.length; t++) {
      e.__preset_select[t].value === e.preset && (e.__preset_select.selectedIndex = t);
    }
  }
  function le(e) {
    0 !== e.length && E.call(window, function () {
      le(e);
    });
    n.each(e, function (e) {
      e.updateDisplay();
    });
  }
  q.toggleHide = function () {
    K = !K;
    n.each(z, function (e) {
      e.domElement.style.display = K ? "none" : "";
    });
  };
  q.CLASS_AUTO_PLACE = "a";
  q.CLASS_AUTO_PLACE_CONTAINER = "ac";
  q.CLASS_MAIN = "main";
  q.CLASS_CONTROLLER_ROW = "cr";
  q.CLASS_TOO_TALL = "taller-than-window";
  q.CLASS_CLOSED = "closed";
  q.CLASS_CLOSE_BUTTON = "close-button";
  q.CLASS_CLOSE_TOP = "close-top";
  q.CLASS_CLOSE_BOTTOM = "close-bottom";
  q.CLASS_DRAG = "drag";
  q.DEFAULT_WIDTH = 245;
  q.TEXT_CLOSED = "Close Controls";
  q.TEXT_OPEN = "Open Controls";
  q._keydownHandler = function (e) {
    "text" === document.activeElement.type || 72 !== e.which && 72 !== e.keyCode || q.toggleHide();
  };
  P.bind(window, "keydown", q._keydownHandler, false);
  n.extend(q.prototype, {
    add: function (e, t) {
      return ee(this, e, t, {
        factoryArgs: Array.prototype.slice.call(arguments, 2)
      });
    },
    addColor: function (e, t) {
      return ee(this, e, t, {
        color: true
      });
    },
    remove: function (e) {
      this.__ul.removeChild(e.__li);
      this.__controllers.splice(this.__controllers.indexOf(e), 1);
      var t = this;
      n.defer(function () {
        t.onResize();
      });
    },
    destroy: function () {
      if (this.parent) {
        throw new Error("Only the root GUI should be removed with .destroy(). For subfolders, use gui.removeFolder(folder) instead.");
      }
      this.autoPlace && Y.removeChild(this.domElement);
      var e = this;
      n.each(this.__folders, function (t) {
        e.removeFolder(t);
      });
      P.unbind(window, "keydown", q._keydownHandler, false);
      X(this);
    },
    addFolder: function (e) {
      if (undefined !== this.__folders[e]) {
        throw new Error('You already have a folder in this GUI by the name "' + e + '"');
      }
      var t = {
        name: e,
        parent: this
      };
      t.autoPlace = this.autoPlace;
      if (this.load && this.load.folders && this.load.folders[e]) {
        t.closed = this.load.folders[e].closed;
        t.load = this.load.folders[e];
      }
      var o = new q(t);
      this.__folders[e] = o;
      var i = J(this, o.domElement);
      P.addClass(i, "folder");
      return o;
    },
    removeFolder: function (e) {
      this.__ul.removeChild(e.domElement.parentElement);
      delete this.__folders[e.name];
      this.load && this.load.folders && this.load.folders[e.name] && delete this.load.folders[e.name];
      X(e);
      var t = this;
      n.each(e.__folders, function (t) {
        e.removeFolder(t);
      });
      n.defer(function () {
        t.onResize();
      });
    },
    open: function () {
      this.closed = false;
    },
    close: function () {
      this.closed = true;
    },
    hide: function () {
      this.domElement.style.display = "none";
    },
    show: function () {
      this.domElement.style.display = "";
    },
    onResize: function () {
      var e = this.getRoot();
      if (e.scrollable) {
        var t = P.getOffset(e.__ul).top;
        var o = 0;
        n.each(e.__ul.childNodes, function (t) {
          e.autoPlace && t === e.__save_row || (o += P.getHeight(t));
        });
        if (window.innerHeight - t - 20 < o) {
          P.addClass(e.domElement, q.CLASS_TOO_TALL);
          e.__ul.style.height = window.innerHeight - t - 20 + "px";
        } else {
          P.removeClass(e.domElement, q.CLASS_TOO_TALL);
          e.__ul.style.height = "auto";
        }
      }
      e.__resize_handle && n.defer(function () {
        e.__resize_handle.style.height = e.__ul.offsetHeight + "px";
      });
      e.__closeButton && (e.__closeButton.style.width = e.width + "px");
    },
    onResizeDebounced: n.debounce(function () {
      this.onResize();
    }, 50),
    remember: function () {
      n.isUndefined(W) && ((W = new G()).domElement.innerHTML = A);
      if (this.parent) {
        throw new Error("You can only call remember on a top level GUI.");
      }
      var e = this;
      n.each(Array.prototype.slice.call(arguments), function (t) {
        0 === e.__rememberedObjects.length && ne(e);
        -1 === e.__rememberedObjects.indexOf(t) && e.__rememberedObjects.push(t);
      });
      this.autoPlace && se(this, this.width);
    },
    getRoot: function () {
      for (var e = this; e.parent;) {
        e = e.parent;
      }
      return e;
    },
    getSaveObject: function () {
      var e = this.load;
      e.closed = this.closed;
      if (this.__rememberedObjects.length > 0) {
        e.preset = this.preset;
        e.remembered || (e.remembered = {});
        e.remembered[this.preset] = re(this);
      }
      e.folders = {};
      n.each(this.__folders, function (t, o) {
        e.folders[o] = t.getSaveObject();
      });
      return e;
    },
    save: function () {
      this.load.remembered || (this.load.remembered = {});
      this.load.remembered[this.preset] = re(this);
      Z(this, false);
      this.saveToLocalStorageIfPossible();
    },
    saveAs: function (e) {
      if (!this.load.remembered) {
        this.load.remembered = {};
        this.load.remembered[j] = re(this, true);
      }
      this.load.remembered[e] = re(this);
      this.preset = e;
      oe(this, e, true);
      this.saveToLocalStorageIfPossible();
    },
    revert: function (e) {
      n.each(this.__controllers, function (t) {
        if (this.getRoot().load.remembered) {
          $(e || this.getRoot(), t);
        } else {
          t.setValue(t.initialValue);
        }
        t.__onFinishChange && t.__onFinishChange.call(t, t.getValue());
      }, this);
      n.each(this.__folders, function (e) {
        e.revert(e);
      });
      e || Z(this.getRoot(), false);
    },
    listen: function (e) {
      var t = 0 === this.__listening.length;
      this.__listening.push(e);
      t && le(this.__listening);
    },
    updateDisplay: function () {
      n.each(this.__controllers, function (e) {
        e.updateDisplay();
      });
      n.each(this.__folders, function (e) {
        e.updateDisplay();
      });
    }
  });
  var ue = {
    Color: g,
    math: u,
    interpret: c
  };
  var he = {
    Controller: S,
    BooleanController: _,
    OptionController: T,
    StringController: U,
    NumberController: w,
    NumberControllerBox: D,
    NumberControllerSlider: M,
    FunctionController: N,
    ColorController: B
  };
  var pe = {
    dom: P
  };
  var de = {
    GUI: q
  };
  var ye = q;
  var fe = {
    color: ue,
    controllers: he,
    dom: pe,
    gui: de,
    GUI: ye
  };
  e.color = ue;
  e.controllers = he;
  e.dom = pe;
  e.gui = de;
  e.GUI = ye;
  e.default = fe;
  Object.defineProperty(e, "__esModule", {
    value: true
  });
};
if ("object" == typeof exports && undefined !== module) {
  i(exports);
} else if ("function" == typeof define && define.amd) {
  define(["exports"], i);
} else {
  i(window.dat = {});
}