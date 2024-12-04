var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var def_jsbi = function (e) {
  function _ctor(o, i) {
    var n = e.call(this, o) || this;
    n.sign = i;
    Object.setPrototypeOf(n, _ctor.prototype);
    if (o > _ctor.__kMaxLength) {
      throw new RangeError("Maximum BigInt size exceeded");
    }
    return n;
  }
  __extends(_ctor, e);
  _ctor.BigInt = function (e) {
    if ("number" == typeof e) {
      if (0 === e) {
        return _ctor.__zero();
      }
      if (_ctor.__isOneDigitInt(e)) {
        if (e < 0) {
          return _ctor.__oneDigit(-e, true);
        } else {
          return _ctor.__oneDigit(e, false);
        }
      }
      if (!Number.isFinite(e) || Math.floor(e) !== e) {
        throw new RangeError("The number " + e + " cannot be converted to BigInt because it is not an integer");
      }
      return _ctor.__fromDouble(e);
    }
    if ("string" == typeof e) {
      var o = _ctor.__fromString(e);
      if (null === o) {
        throw new SyntaxError("Cannot convert " + e + " to a BigInt");
      }
      return o;
    }
    if ("boolean" == typeof e) {
      if (true === e) {
        return _ctor.__oneDigit(1, false);
      } else {
        return _ctor.__zero();
      }
    }
    if ("object" == typeof e) {
      if (e.constructor === _ctor) {
        return e;
      }
      var i = _ctor.__toPrimitive(e);
      return _ctor.BigInt(i);
    }
    throw new TypeError("Cannot convert " + e + " to a BigInt");
  };
  _ctor.prototype.toDebugString = function () {
    var e = ["BigInt["];
    for (var t = 0; t < this.length; t++) {
      var o = this[t];
      e.push((o ? (o >>> 0).toString(16) : o) + ", ");
    }
    e.push("]");
    return e.join("");
  };
  _ctor.prototype.toString = function (e) {
    undefined === e && (e = 10);
    if (e < 2 || e > 36) {
      throw new RangeError("toString() radix argument must be between 2 and 36");
    }
    if (0 === this.length) {
      return "0";
    } else if (0 == (e & e - 1)) {
      return _ctor.__toStringBasePowerOfTwo(this, e);
    } else {
      return _ctor.__toStringGeneric(this, e, false);
    }
  };
  _ctor.prototype.valueOf = function () {
    throw new Error("Convert JSBI instances to native numbers using `toNumber`.");
  };
  _ctor.toNumber = function (e) {
    var o = e.length;
    if (0 === o) {
      return 0;
    }
    if (1 === o) {
      var i = e.__unsignedDigit(0);
      if (e.sign) {
        return -i;
      } else {
        return i;
      }
    }
    var n = e.__digit(o - 1);
    var a = _ctor.__clz30(n);
    var s = 30 * o - a;
    if (s > 1024) {
      if (e.sign) {
        return -1 / 0;
      } else {
        return 1 / 0;
      }
    }
    var r = s - 1;
    var c = n;
    var l = o - 1;
    var u = a + 3;
    var h = 32 === u ? 0 : c << u;
    h >>>= 12;
    var p = u - 12;
    var d = u >= 12 ? 0 : c << 20 + u;
    var y = 20 + u;
    for (p > 0 && l > 0 && (l--, h |= (c = e.__digit(l)) >>> 30 - p, d = c << p + 2, y = p + 2); y > 0 && l > 0;) {
      l--;
      c = e.__digit(l);
      d |= y >= 30 ? c << y - 30 : c >>> 30 - y;
      y -= 30;
    }
    var f = _ctor.__decideRounding(e, y, l, c);
    if ((1 === f || 0 === f && 1 == (1 & d)) && 0 == (d = d + 1 >>> 0) && ++h >>> 20 != 0 && (h = 0, ++r > 1023)) {
      if (e.sign) {
        return -1 / 0;
      } else {
        return 1 / 0;
      }
    }
    var m = e.sign ? 1 << 31 : 0;
    r = r + 1023 << 20;
    _ctor.__kBitConversionInts[1] = m | r | h;
    _ctor.__kBitConversionInts[0] = d;
    return _ctor.__kBitConversionDouble[0];
  };
  _ctor.unaryMinus = function (e) {
    if (0 === e.length) {
      return e;
    }
    var t = e.__copy();
    t.sign = !e.sign;
    return t;
  };
  _ctor.bitwiseNot = function (e) {
    if (e.sign) {
      return _ctor.__absoluteSubOne(e).__trim();
    } else {
      return _ctor.__absoluteAddOne(e, true);
    }
  };
  _ctor.exponentiate = function (e, o) {
    if (o.sign) {
      throw new RangeError("Exponent must be positive");
    }
    if (0 === o.length) {
      return _ctor.__oneDigit(1, false);
    }
    if (0 === e.length) {
      return e;
    }
    if (1 === e.length && 1 === e.__digit(0)) {
      if (e.sign && 0 == (1 & o.__digit(0))) {
        return _ctor.unaryMinus(e);
      } else {
        return e;
      }
    }
    if (o.length > 1) {
      throw new RangeError("BigInt too big");
    }
    var i = o.__unsignedDigit(0);
    if (1 === i) {
      return e;
    }
    if (i >= _ctor.__kMaxLengthBits) {
      throw new RangeError("BigInt too big");
    }
    if (1 === e.length && 2 === e.__digit(0)) {
      var n = 1 + (i / 30 | 0);
      var a = new _ctor(n, e.sign && 0 != (1 & i));
      a.__initializeDigits();
      var s = 1 << i % 30;
      a.__setDigit(n - 1, s);
      return a;
    }
    var r = null;
    var c = e;
    0 != (1 & i) && (r = e);
    for (i >>= 1; 0 !== i; i >>= 1) {
      c = _ctor.multiply(c, c);
      0 != (1 & i) && (r = null === r ? c : _ctor.multiply(r, c));
    }
    return r;
  };
  _ctor.multiply = function (e, o) {
    if (0 === e.length) {
      return e;
    }
    if (0 === o.length) {
      return o;
    }
    var i = e.length + o.length;
    e.__clzmsd() + o.__clzmsd() >= 30 && i--;
    var n = new _ctor(i, e.sign !== o.sign);
    n.__initializeDigits();
    for (var a = 0; a < e.length; a++) {
      _ctor.__multiplyAccumulate(o, e.__digit(a), n, a);
    }
    return n.__trim();
  };
  _ctor.divide = function (e, o) {
    if (0 === o.length) {
      throw new RangeError("Division by zero");
    }
    if (_ctor.__absoluteCompare(e, o) < 0) {
      return _ctor.__zero();
    }
    var i;
    var n = e.sign !== o.sign;
    var a = o.__unsignedDigit(0);
    if (1 === o.length && a <= 32767) {
      if (1 === a) {
        if (n === e.sign) {
          return e;
        } else {
          return _ctor.unaryMinus(e);
        }
      }
      i = _ctor.__absoluteDivSmall(e, a, null);
    } else {
      i = _ctor.__absoluteDivLarge(e, o, true, false);
    }
    i.sign = n;
    return i.__trim();
  };
  _ctor.remainder = function (e, o) {
    if (0 === o.length) {
      throw new RangeError("Division by zero");
    }
    if (_ctor.__absoluteCompare(e, o) < 0) {
      return e;
    }
    var i = o.__unsignedDigit(0);
    if (1 === o.length && i <= 32767) {
      if (1 === i) {
        return _ctor.__zero();
      }
      var n = _ctor.__absoluteModSmall(e, i);
      if (0 === n) {
        return _ctor.__zero();
      } else {
        return _ctor.__oneDigit(n, e.sign);
      }
    }
    var a = _ctor.__absoluteDivLarge(e, o, false, true);
    a.sign = e.sign;
    return a.__trim();
  };
  _ctor.add = function (e, o) {
    var i = e.sign;
    if (i === o.sign) {
      return _ctor.__absoluteAdd(e, o, i);
    } else if (_ctor.__absoluteCompare(e, o) >= 0) {
      return _ctor.__absoluteSub(e, o, i);
    } else {
      return _ctor.__absoluteSub(o, e, !i);
    }
  };
  _ctor.subtract = function (e, o) {
    var i = e.sign;
    if (i !== o.sign) {
      return _ctor.__absoluteAdd(e, o, i);
    } else if (_ctor.__absoluteCompare(e, o) >= 0) {
      return _ctor.__absoluteSub(e, o, i);
    } else {
      return _ctor.__absoluteSub(o, e, !i);
    }
  };
  _ctor.leftShift = function (e, o) {
    if (0 === o.length || 0 === e.length) {
      return e;
    } else if (o.sign) {
      return _ctor.__rightShiftByAbsolute(e, o);
    } else {
      return _ctor.__leftShiftByAbsolute(e, o);
    }
  };
  _ctor.signedRightShift = function (e, o) {
    if (0 === o.length || 0 === e.length) {
      return e;
    } else if (o.sign) {
      return _ctor.__leftShiftByAbsolute(e, o);
    } else {
      return _ctor.__rightShiftByAbsolute(e, o);
    }
  };
  _ctor.unsignedRightShift = function () {
    throw new TypeError("BigInts have no unsigned right shift; use >> instead");
  };
  _ctor.lessThan = function (e, o) {
    return _ctor.__compareToBigInt(e, o) < 0;
  };
  _ctor.lessThanOrEqual = function (e, o) {
    return _ctor.__compareToBigInt(e, o) <= 0;
  };
  _ctor.greaterThan = function (e, o) {
    return _ctor.__compareToBigInt(e, o) > 0;
  };
  _ctor.greaterThanOrEqual = function (e, o) {
    return _ctor.__compareToBigInt(e, o) >= 0;
  };
  _ctor.equal = function (e, t) {
    if (e.sign !== t.sign) {
      return false;
    }
    if (e.length !== t.length) {
      return false;
    }
    for (var o = 0; o < e.length; o++) {
      if (e.__digit(o) !== t.__digit(o)) {
        return false;
      }
    }
    return true;
  };
  _ctor.notEqual = function (e, o) {
    return !_ctor.equal(e, o);
  };
  _ctor.bitwiseAnd = function (e, o) {
    var i;
    if (!e.sign && !o.sign) {
      return _ctor.__absoluteAnd(e, o).__trim();
    }
    if (e.sign && o.sign) {
      var n = Math.max(e.length, o.length) + 1;
      var a = _ctor.__absoluteSubOne(e, n);
      var s = _ctor.__absoluteSubOne(o);
      a = _ctor.__absoluteOr(a, s, a);
      return _ctor.__absoluteAddOne(a, true, a).__trim();
    }
    if (e.sign) {
      e = (i = [o, e])[0];
      o = i[1];
    }
    return _ctor.__absoluteAndNot(e, _ctor.__absoluteSubOne(o)).__trim();
  };
  _ctor.bitwiseXor = function (e, o) {
    var i;
    if (!e.sign && !o.sign) {
      return _ctor.__absoluteXor(e, o).__trim();
    }
    if (e.sign && o.sign) {
      var n = Math.max(e.length, o.length);
      var a = _ctor.__absoluteSubOne(e, n);
      var s = _ctor.__absoluteSubOne(o);
      return _ctor.__absoluteXor(a, s, a).__trim();
    }
    var r = Math.max(e.length, o.length) + 1;
    if (e.sign) {
      e = (i = [o, e])[0];
      o = i[1];
    }
    var c = _ctor.__absoluteSubOne(o, r);
    c = _ctor.__absoluteXor(c, e, c);
    return _ctor.__absoluteAddOne(c, true, c).__trim();
  };
  _ctor.bitwiseOr = function (e, o) {
    var i;
    var n = Math.max(e.length, o.length);
    if (!e.sign && !o.sign) {
      return _ctor.__absoluteOr(e, o).__trim();
    }
    if (e.sign && o.sign) {
      var a = _ctor.__absoluteSubOne(e, n);
      var s = _ctor.__absoluteSubOne(o);
      a = _ctor.__absoluteAnd(a, s, a);
      return _ctor.__absoluteAddOne(a, true, a).__trim();
    }
    if (e.sign) {
      e = (i = [o, e])[0];
      o = i[1];
    }
    var r = _ctor.__absoluteSubOne(o, n);
    r = _ctor.__absoluteAndNot(r, e, r);
    return _ctor.__absoluteAddOne(r, true, r).__trim();
  };
  _ctor.asIntN = function (e, o) {
    if (0 === o.length) {
      return o;
    }
    if ((e = Math.floor(e)) < 0) {
      throw new RangeError("Invalid value: not (convertible to) a safe integer");
    }
    if (0 === e) {
      return _ctor.__zero();
    }
    if (e >= _ctor.__kMaxLengthBits) {
      return o;
    }
    var i = (e + 29) / 30 | 0;
    if (o.length < i) {
      return o;
    }
    var n = o.__unsignedDigit(i - 1);
    var a = 1 << (e - 1) % 30;
    if (o.length === i && n < a) {
      return o;
    }
    if ((n & a) !== a) {
      return _ctor.__truncateToNBits(e, o);
    }
    if (!o.sign) {
      return _ctor.__truncateAndSubFromPowerOfTwo(e, o, true);
    }
    if (0 == (n & a - 1)) {
      for (var s = i - 2; s >= 0; s--) {
        if (0 !== o.__digit(s)) {
          return _ctor.__truncateAndSubFromPowerOfTwo(e, o, false);
        }
      }
      if (o.length === i && n === a) {
        return o;
      } else {
        return _ctor.__truncateToNBits(e, o);
      }
    }
    return _ctor.__truncateAndSubFromPowerOfTwo(e, o, false);
  };
  _ctor.asUintN = function (e, o) {
    if (0 === o.length) {
      return o;
    }
    if ((e = Math.floor(e)) < 0) {
      throw new RangeError("Invalid value: not (convertible to) a safe integer");
    }
    if (0 === e) {
      return _ctor.__zero();
    }
    if (o.sign) {
      if (e > _ctor.__kMaxLengthBits) {
        throw new RangeError("BigInt too big");
      }
      return _ctor.__truncateAndSubFromPowerOfTwo(e, o, false);
    }
    if (e >= _ctor.__kMaxLengthBits) {
      return o;
    }
    var i = (e + 29) / 30 | 0;
    if (o.length < i) {
      return o;
    }
    var n = e % 30;
    if (o.length == i) {
      if (0 === n) {
        return o;
      }
      if (o.__digit(i - 1) >>> n == 0) {
        return o;
      }
    }
    return _ctor.__truncateToNBits(e, o);
  };
  _ctor.ADD = function (e, o) {
    e = _ctor.__toPrimitive(e);
    o = _ctor.__toPrimitive(o);
    if ("string" == typeof e) {
      "string" != typeof o && (o = o.toString());
      return e + o;
    }
    if ("string" == typeof o) {
      return e.toString() + o;
    }
    e = _ctor.__toNumeric(e);
    o = _ctor.__toNumeric(o);
    if (_ctor.__isBigInt(e) && _ctor.__isBigInt(o)) {
      return _ctor.add(e, o);
    }
    if ("number" == typeof e && "number" == typeof o) {
      return e + o;
    }
    throw new TypeError("Cannot mix BigInt and other types, use explicit conversions");
  };
  _ctor.LT = function (e, o) {
    return _ctor.__compare(e, o, 0);
  };
  _ctor.LE = function (e, o) {
    return _ctor.__compare(e, o, 1);
  };
  _ctor.GT = function (e, o) {
    return _ctor.__compare(e, o, 2);
  };
  _ctor.GE = function (e, o) {
    return _ctor.__compare(e, o, 3);
  };
  _ctor.EQ = function (e, o) {
    for (;;) {
      if (_ctor.__isBigInt(e)) {
        if (_ctor.__isBigInt(o)) {
          return _ctor.equal(e, o);
        } else {
          return _ctor.EQ(o, e);
        }
      }
      if ("number" == typeof e) {
        if (_ctor.__isBigInt(o)) {
          return _ctor.__equalToNumber(o, e);
        }
        if ("object" != typeof o) {
          return e == o;
        }
        o = _ctor.__toPrimitive(o);
      } else if ("string" == typeof e) {
        if (_ctor.__isBigInt(o)) {
          return null !== (e = _ctor.__fromString(e)) && _ctor.equal(e, o);
        }
        if ("object" != typeof o) {
          return e == o;
        }
        o = _ctor.__toPrimitive(o);
      } else if ("boolean" == typeof e) {
        if (_ctor.__isBigInt(o)) {
          return _ctor.__equalToNumber(o, +e);
        }
        if ("object" != typeof o) {
          return e == o;
        }
        o = _ctor.__toPrimitive(o);
      } else if ("symbol" == typeof e) {
        if (_ctor.__isBigInt(o)) {
          return false;
        }
        if ("object" != typeof o) {
          return e == o;
        }
        o = _ctor.__toPrimitive(o);
      } else {
        if ("object" != typeof e) {
          return e == o;
        }
        if ("object" == typeof o && o.constructor !== _ctor) {
          return e == o;
        }
        e = _ctor.__toPrimitive(e);
      }
    }
  };
  _ctor.NE = function (e, o) {
    return !_ctor.EQ(e, o);
  };
  _ctor.DataViewGetBigInt64 = function (e, o, i) {
    undefined === i && (i = false);
    return _ctor.asIntN(64, _ctor.DataViewGetBigUint64(e, o, i));
  };
  _ctor.DataViewGetBigUint64 = function (e, o, i) {
    undefined === i && (i = false);
    var n = i ? [4, 0] : [0, 4];
    var a = n[0];
    var s = n[1];
    var r = e.getUint32(o + a, i);
    var c = e.getUint32(o + s, i);
    var l = new _ctor(3, false);
    l.__setDigit(0, 1073741823 & c);
    l.__setDigit(1, (268435455 & r) << 2 | c >>> 30);
    l.__setDigit(2, r >>> 28);
    return l.__trim();
  };
  _ctor.DataViewSetBigInt64 = function (e, o, i, n) {
    undefined === n && (n = false);
    _ctor.DataViewSetBigUint64(e, o, i, n);
  };
  _ctor.DataViewSetBigUint64 = function (e, o, i, n) {
    undefined === n && (n = false);
    var a = 0;
    var s = 0;
    if ((i = _ctor.asUintN(64, i)).length > 0 && (s = i.__digit(0), i.length > 1)) {
      var r = i.__digit(1);
      s |= r << 30;
      a = r >>> 2;
      i.length > 2 && (a |= i.__digit(2) << 28);
    }
    var c = n ? [4, 0] : [0, 4];
    var l = c[0];
    var u = c[1];
    e.setUint32(o + l, a, n);
    e.setUint32(o + u, s, n);
  };
  _ctor.__zero = function () {
    return new _ctor(0, false);
  };
  _ctor.__oneDigit = function (e, o) {
    var i = new _ctor(1, o);
    i.__setDigit(0, e);
    return i;
  };
  _ctor.prototype.__copy = function () {
    var e = new _ctor(this.length, this.sign);
    for (var o = 0; o < this.length; o++) {
      e[o] = this[o];
    }
    return e;
  };
  _ctor.prototype.__trim = function () {
    var e = this.length;
    for (var t = this[e - 1]; 0 === t;) {
      t = this[--e - 1];
      this.pop();
    }
    0 === e && (this.sign = false);
    return this;
  };
  _ctor.prototype.__initializeDigits = function () {
    for (var e = 0; e < this.length; e++) {
      this[e] = 0;
    }
  };
  _ctor.__decideRounding = function (e, t, o, i) {
    if (t > 0) {
      return -1;
    }
    var n;
    if (t < 0) {
      n = -t - 1;
    } else {
      if (0 === o) {
        return -1;
      }
      o--;
      i = e.__digit(o);
      n = 29;
    }
    var a = 1 << n;
    if (0 == (i & a)) {
      return -1;
    }
    if (0 != (i & (a -= 1))) {
      return 1;
    }
    for (; o > 0;) {
      o--;
      if (0 !== e.__digit(o)) {
        return 1;
      }
    }
    return 0;
  };
  _ctor.__fromDouble = function (e) {
    var o = e < 0;
    _ctor.__kBitConversionDouble[0] = e;
    var i;
    var n = (_ctor.__kBitConversionInts[1] >>> 20 & 2047) - 1023;
    var a = 1 + (n / 30 | 0);
    var s = new _ctor(a, o);
    var r = 1048575 & _ctor.__kBitConversionInts[1] | 1048576;
    var c = _ctor.__kBitConversionInts[0];
    var l = n % 30;
    var u = 0;
    if (l < 20) {
      u = 32 + (h = 20 - l);
      i = r >>> h;
      r = r << 32 - h | c >>> h;
      c <<= 32 - h;
    } else if (20 === l) {
      u = 32;
      i = r;
      r = c;
      c = 0;
    } else {
      var h;
      u = 32 - (h = l - 20);
      i = r << h | c >>> 32 - h;
      r = c << h;
      c = 0;
    }
    s.__setDigit(a - 1, i);
    for (var p = a - 2; p >= 0; p--) {
      if (u > 0) {
        u -= 30;
        i = r >>> 2;
        r = r << 30 | c >>> 2;
        c <<= 30;
      } else {
        i = 0;
      }
      s.__setDigit(p, i);
    }
    return s.__trim();
  };
  _ctor.__isWhitespace = function (e) {
    return e <= 13 && e >= 9 || (e <= 159 ? 32 === e : e <= 131071 ? 160 === e || 5760 === e : e <= 196607 ? (e &= 131071) <= 10 || 40 === e || 41 === e || 47 === e || 95 === e || 4096 === e : 65279 === e);
  };
  _ctor.__fromString = function (e, o) {
    undefined === o && (o = 0);
    var i = 0;
    var n = e.length;
    var a = 0;
    if (a === n) {
      return _ctor.__zero();
    }
    for (var s = e.charCodeAt(a); _ctor.__isWhitespace(s);) {
      if (++a === n) {
        return _ctor.__zero();
      }
      s = e.charCodeAt(a);
    }
    if (43 === s) {
      if (++a === n) {
        return null;
      }
      s = e.charCodeAt(a);
      i = 1;
    } else if (45 === s) {
      if (++a === n) {
        return null;
      }
      s = e.charCodeAt(a);
      i = -1;
    }
    if (0 === o) {
      o = 10;
      if (48 === s) {
        if (++a === n) {
          return _ctor.__zero();
        }
        if (88 === (s = e.charCodeAt(a)) || 120 === s) {
          o = 16;
          if (++a === n) {
            return null;
          }
          s = e.charCodeAt(a);
        } else if (79 === s || 111 === s) {
          o = 8;
          if (++a === n) {
            return null;
          }
          s = e.charCodeAt(a);
        } else if (66 === s || 98 === s) {
          o = 2;
          if (++a === n) {
            return null;
          }
          s = e.charCodeAt(a);
        }
      }
    } else if (16 === o && 48 === s) {
      if (++a === n) {
        return _ctor.__zero();
      }
      if (88 === (s = e.charCodeAt(a)) || 120 === s) {
        if (++a === n) {
          return null;
        }
        s = e.charCodeAt(a);
      }
    }
    if (0 !== i && 10 !== o) {
      return null;
    }
    for (; 48 === s;) {
      if (++a === n) {
        return _ctor.__zero();
      }
      s = e.charCodeAt(a);
    }
    var r = n - a;
    var c = _ctor.__kMaxBitsPerChar[o];
    var l = _ctor.__kBitsPerCharTableMultiplier - 1;
    if (r > (1 << 30) / c) {
      return null;
    }
    var u = new _ctor((29 + (c * r + l >>> _ctor.__kBitsPerCharTableShift)) / 30 | 0, false);
    var h = o < 10 ? o : 10;
    var p = o > 10 ? o - 10 : 0;
    if (0 == (o & o - 1)) {
      c >>= _ctor.__kBitsPerCharTableShift;
      var d = [];
      var y = [];
      var f = false;
      do {
        var m = 0;
        for (var g = 0;;) {
          var v = undefined;
          if (s - 48 >>> 0 < h) {
            v = s - 48;
          } else {
            if (!((32 | s) - 97 >>> 0 < p)) {
              f = true;
              break;
            }
            v = (32 | s) - 87;
          }
          g += c;
          m = m << c | v;
          if (++a === n) {
            f = true;
            break;
          }
          s = e.charCodeAt(a);
          if (g + c > 30) {
            break;
          }
        }
        d.push(m);
        y.push(g);
      } while (!f);
      _ctor.__fillFromParts(u, d, y);
    } else {
      u.__initializeDigits();
      f = false;
      var C = 0;
      do {
        m = 0;
        for (var S = 1;;) {
          v = undefined;
          if (s - 48 >>> 0 < h) {
            v = s - 48;
          } else {
            if (!((32 | s) - 97 >>> 0 < p)) {
              f = true;
              break;
            }
            v = (32 | s) - 87;
          }
          var I = S * o;
          if (I > 1073741823) {
            break;
          }
          S = I;
          m = m * o + v;
          C++;
          if (++a === n) {
            f = true;
            break;
          }
          s = e.charCodeAt(a);
        }
        var b = (c * C + (l = 30 * _ctor.__kBitsPerCharTableMultiplier - 1) >>> _ctor.__kBitsPerCharTableShift) / 30 | 0;
        u.__inplaceMultiplyAdd(S, m, b);
      } while (!f);
    }
    if (a !== n) {
      if (!_ctor.__isWhitespace(s)) {
        return null;
      }
      for (a++; a < n; a++) {
        s = e.charCodeAt(a);
        if (!_ctor.__isWhitespace(s)) {
          return null;
        }
      }
    }
    u.sign = -1 === i;
    return u.__trim();
  };
  _ctor.__fillFromParts = function (e, t, o) {
    var i = 0;
    var n = 0;
    var a = 0;
    for (var s = t.length - 1; s >= 0; s--) {
      var r = t[s];
      var c = o[s];
      n |= r << a;
      if (30 === (a += c)) {
        e.__setDigit(i++, n);
        a = 0;
        n = 0;
      } else if (a > 30) {
        e.__setDigit(i++, 1073741823 & n);
        n = r >>> c - (a -= 30);
      }
    }
    if (0 !== n) {
      if (i >= e.length) {
        throw new Error("implementation bug");
      }
      e.__setDigit(i++, n);
    }
    for (; i < e.length; i++) {
      e.__setDigit(i, 0);
    }
  };
  _ctor.__toStringBasePowerOfTwo = function (e, o) {
    var i = e.length;
    var n = o - 1;
    var a = n = ((n = ((n = (n >>> 1 & 85) + (85 & n)) >>> 2 & 51) + (51 & n)) >>> 4 & 15) + (15 & n);
    var s = o - 1;
    var r = e.__digit(i - 1);
    var c = (30 * i - _ctor.__clz30(r) + a - 1) / a | 0;
    e.sign && c++;
    if (c > 1 << 28) {
      throw new Error("string too long");
    }
    var l = new Array(c);
    var u = c - 1;
    var h = 0;
    var p = 0;
    for (var d = 0; d < i - 1; d++) {
      var y = e.__digit(d);
      var f = (h | y << p) & s;
      l[u--] = _ctor.__kConversionChars[f];
      var m = a - p;
      h = y >>> m;
      for (p = 30 - m; p >= a;) {
        l[u--] = _ctor.__kConversionChars[h & s];
        h >>>= a;
        p -= a;
      }
    }
    var g = (h | r << p) & s;
    l[u--] = _ctor.__kConversionChars[g];
    for (h = r >>> a - p; 0 !== h;) {
      l[u--] = _ctor.__kConversionChars[h & s];
      h >>>= a;
    }
    e.sign && (l[u--] = "-");
    if (-1 !== u) {
      throw new Error("implementation bug");
    }
    return l.join("");
  };
  _ctor.__toStringGeneric = function (e, o, i) {
    var n = e.length;
    if (0 === n) {
      return "";
    }
    if (1 === n) {
      var a = e.__unsignedDigit(0).toString(o);
      false === i && e.sign && (a = "-" + a);
      return a;
    }
    var s;
    var r;
    var c = 30 * n - _ctor.__clz30(e.__digit(n - 1));
    var l = _ctor.__kMaxBitsPerChar[o] - 1;
    var u = c * _ctor.__kBitsPerCharTableMultiplier;
    var h = 1 + (u = (u += l - 1) / l | 0) >> 1;
    var p = _ctor.exponentiate(_ctor.__oneDigit(o, false), _ctor.__oneDigit(h, false));
    var d = p.__unsignedDigit(0);
    if (1 === p.length && d <= 32767) {
      (s = new _ctor(e.length, false)).__initializeDigits();
      var y = 0;
      for (var f = 2 * e.length - 1; f >= 0; f--) {
        var m = y << 15 | e.__halfDigit(f);
        s.__setHalfDigit(f, m / d | 0);
        y = m % d | 0;
      }
      r = y.toString(o);
    } else {
      var g = _ctor.__absoluteDivLarge(e, p, true, true);
      s = g.quotient;
      y = g.remainder.__trim();
      r = _ctor.__toStringGeneric(y, o, true);
    }
    s.__trim();
    for (var v = _ctor.__toStringGeneric(s, o, true); r.length < h;) {
      r = "0" + r;
    }
    false === i && e.sign && (v = "-" + v);
    return v + r;
  };
  _ctor.__unequalSign = function (e) {
    if (e) {
      return -1;
    } else {
      return 1;
    }
  };
  _ctor.__absoluteGreater = function (e) {
    if (e) {
      return -1;
    } else {
      return 1;
    }
  };
  _ctor.__absoluteLess = function (e) {
    if (e) {
      return 1;
    } else {
      return -1;
    }
  };
  _ctor.__compareToBigInt = function (e, o) {
    var i = e.sign;
    if (i !== o.sign) {
      return _ctor.__unequalSign(i);
    }
    var n = _ctor.__absoluteCompare(e, o);
    if (n > 0) {
      return _ctor.__absoluteGreater(i);
    } else if (n < 0) {
      return _ctor.__absoluteLess(i);
    } else {
      return 0;
    }
  };
  _ctor.__compareToNumber = function (e, o) {
    if (_ctor.__isOneDigitInt(o)) {
      var i = e.sign;
      var n = o < 0;
      if (i !== n) {
        return _ctor.__unequalSign(i);
      }
      if (0 === e.length) {
        if (n) {
          throw new Error("implementation bug");
        }
        if (0 === o) {
          return 0;
        } else {
          return -1;
        }
      }
      if (e.length > 1) {
        return _ctor.__absoluteGreater(i);
      }
      var a = Math.abs(o);
      var s = e.__unsignedDigit(0);
      if (s > a) {
        return _ctor.__absoluteGreater(i);
      } else if (s < a) {
        return _ctor.__absoluteLess(i);
      } else {
        return 0;
      }
    }
    return _ctor.__compareToDouble(e, o);
  };
  _ctor.__compareToDouble = function (e, o) {
    if (o != o) {
      return o;
    }
    if (o === 1 / 0) {
      return -1;
    }
    if (o === -1 / 0) {
      return 1;
    }
    var i = e.sign;
    if (i !== o < 0) {
      return _ctor.__unequalSign(i);
    }
    if (0 === o) {
      throw new Error("implementation bug: should be handled elsewhere");
    }
    if (0 === e.length) {
      return -1;
    }
    _ctor.__kBitConversionDouble[0] = o;
    var n = _ctor.__kBitConversionInts[1] >>> 20 & 2047;
    if (2047 === n) {
      throw new Error("implementation bug: handled elsewhere");
    }
    var a = n - 1023;
    if (a < 0) {
      return _ctor.__absoluteGreater(i);
    }
    var s = e.length;
    var r = e.__digit(s - 1);
    var c = _ctor.__clz30(r);
    var l = 30 * s - c;
    var u = a + 1;
    if (l < u) {
      return _ctor.__absoluteLess(i);
    }
    if (l > u) {
      return _ctor.__absoluteGreater(i);
    }
    var h;
    var p = 1048575 & _ctor.__kBitConversionInts[1] | 1048576;
    var d = _ctor.__kBitConversionInts[0];
    var y = 29 - c;
    if (y !== ((l - 1) % 30 | 0)) {
      throw new Error("implementation bug");
    }
    var f = 0;
    if (y < 20) {
      f = 32 + (m = 20 - y);
      h = p >>> m;
      p = p << 32 - m | d >>> m;
      d <<= 32 - m;
    } else if (20 === y) {
      f = 32;
      h = p;
      p = d;
      d = 0;
    } else {
      var m;
      f = 32 - (m = y - 20);
      h = p << m | d >>> 32 - m;
      p = d << m;
      d = 0;
    }
    if ((r >>>= 0) > (h >>>= 0)) {
      return _ctor.__absoluteGreater(i);
    }
    if (r < h) {
      return _ctor.__absoluteLess(i);
    }
    for (var g = s - 2; g >= 0; g--) {
      if (f > 0) {
        f -= 30;
        h = p >>> 2;
        p = p << 30 | d >>> 2;
        d <<= 30;
      } else {
        h = 0;
      }
      var v = e.__unsignedDigit(g);
      if (v > h) {
        return _ctor.__absoluteGreater(i);
      }
      if (v < h) {
        return _ctor.__absoluteLess(i);
      }
    }
    if (0 !== p || 0 !== d) {
      if (0 === f) {
        throw new Error("implementation bug");
      }
      return _ctor.__absoluteLess(i);
    }
    return 0;
  };
  _ctor.__equalToNumber = function (e, o) {
    if (_ctor.__isOneDigitInt(o)) {
      if (0 === o) {
        return 0 === e.length;
      } else {
        return 1 === e.length && e.sign === o < 0 && e.__unsignedDigit(0) === Math.abs(o);
      }
    } else {
      return 0 === _ctor.__compareToDouble(e, o);
    }
  };
  _ctor.__comparisonResultToBool = function (e, t) {
    switch (t) {
      case 0:
        return e < 0;
      case 1:
        return e <= 0;
      case 2:
        return e > 0;
      case 3:
        return e >= 0;
    }
  };
  _ctor.__compare = function (e, o, i) {
    e = _ctor.__toPrimitive(e);
    o = _ctor.__toPrimitive(o);
    if ("string" == typeof e && "string" == typeof o) {
      switch (i) {
        case 0:
          return e < o;
        case 1:
          return e <= o;
        case 2:
          return e > o;
        case 3:
          return e >= o;
      }
    }
    if (_ctor.__isBigInt(e) && "string" == typeof o) {
      return null !== (o = _ctor.__fromString(o)) && _ctor.__comparisonResultToBool(_ctor.__compareToBigInt(e, o), i);
    }
    if ("string" == typeof e && _ctor.__isBigInt(o)) {
      return null !== (e = _ctor.__fromString(e)) && _ctor.__comparisonResultToBool(_ctor.__compareToBigInt(e, o), i);
    }
    e = _ctor.__toNumeric(e);
    o = _ctor.__toNumeric(o);
    if (_ctor.__isBigInt(e)) {
      if (_ctor.__isBigInt(o)) {
        return _ctor.__comparisonResultToBool(_ctor.__compareToBigInt(e, o), i);
      }
      if ("number" != typeof o) {
        throw new Error("implementation bug");
      }
      return _ctor.__comparisonResultToBool(_ctor.__compareToNumber(e, o), i);
    }
    if ("number" != typeof e) {
      throw new Error("implementation bug");
    }
    if (_ctor.__isBigInt(o)) {
      return _ctor.__comparisonResultToBool(_ctor.__compareToNumber(o, e), 2 ^ i);
    }
    if ("number" != typeof o) {
      throw new Error("implementation bug");
    }
    switch (i) {
      case 0:
        return e < o;
      case 1:
        return e <= o;
      case 2:
        return e > o;
      case 3:
        return e >= o;
    }
  };
  _ctor.prototype.__clzmsd = function () {
    return _ctor.__clz30(this.__digit(this.length - 1));
  };
  _ctor.__absoluteAdd = function (e, o, i) {
    if (e.length < o.length) {
      return _ctor.__absoluteAdd(o, e, i);
    }
    if (0 === e.length) {
      return e;
    }
    if (0 === o.length) {
      if (e.sign === i) {
        return e;
      } else {
        return _ctor.unaryMinus(e);
      }
    }
    var n = e.length;
    (0 === e.__clzmsd() || o.length === e.length && 0 === o.__clzmsd()) && n++;
    var a = new _ctor(n, i);
    var s = 0;
    for (var r = 0; r < o.length; r++) {
      s = (c = e.__digit(r) + o.__digit(r) + s) >>> 30;
      a.__setDigit(r, 1073741823 & c);
    }
    for (; r < e.length; r++) {
      var c;
      s = (c = e.__digit(r) + s) >>> 30;
      a.__setDigit(r, 1073741823 & c);
    }
    r < a.length && a.__setDigit(r, s);
    return a.__trim();
  };
  _ctor.__absoluteSub = function (e, o, i) {
    if (0 === e.length) {
      return e;
    }
    if (0 === o.length) {
      if (e.sign === i) {
        return e;
      } else {
        return _ctor.unaryMinus(e);
      }
    }
    var n = new _ctor(e.length, i);
    var a = 0;
    for (var s = 0; s < o.length; s++) {
      a = (r = e.__digit(s) - o.__digit(s) - a) >>> 30 & 1;
      n.__setDigit(s, 1073741823 & r);
    }
    for (; s < e.length; s++) {
      var r;
      a = (r = e.__digit(s) - a) >>> 30 & 1;
      n.__setDigit(s, 1073741823 & r);
    }
    return n.__trim();
  };
  _ctor.__absoluteAddOne = function (e, o, i) {
    undefined === i && (i = null);
    var n = e.length;
    if (null === i) {
      i = new _ctor(n, o);
    } else {
      i.sign = o;
    }
    var a = 1;
    for (var s = 0; s < n; s++) {
      var r = e.__digit(s) + a;
      a = r >>> 30;
      i.__setDigit(s, 1073741823 & r);
    }
    0 !== a && i.__setDigitGrow(n, 1);
    return i;
  };
  _ctor.__absoluteSubOne = function (e, o) {
    var i = e.length;
    var n = new _ctor(o = o || i, false);
    var a = 1;
    for (var s = 0; s < i; s++) {
      var r = e.__digit(s) - a;
      a = r >>> 30 & 1;
      n.__setDigit(s, 1073741823 & r);
    }
    if (0 !== a) {
      throw new Error("implementation bug");
    }
    for (s = i; s < o; s++) {
      n.__setDigit(s, 0);
    }
    return n;
  };
  _ctor.__absoluteAnd = function (e, o, i) {
    undefined === i && (i = null);
    var n = e.length;
    var a = o.length;
    var s = a;
    if (n < a) {
      s = n;
      var r = e;
      var c = n;
      e = o;
      n = a;
      o = r;
      a = c;
    }
    var l = s;
    if (null === i) {
      i = new _ctor(l, false);
    } else {
      l = i.length;
    }
    for (var u = 0; u < s; u++) {
      i.__setDigit(u, e.__digit(u) & o.__digit(u));
    }
    for (; u < l; u++) {
      i.__setDigit(u, 0);
    }
    return i;
  };
  _ctor.__absoluteAndNot = function (e, o, i) {
    undefined === i && (i = null);
    var n = e.length;
    var a = o.length;
    var s = a;
    n < a && (s = n);
    var r = n;
    if (null === i) {
      i = new _ctor(r, false);
    } else {
      r = i.length;
    }
    for (var c = 0; c < s; c++) {
      i.__setDigit(c, e.__digit(c) & ~o.__digit(c));
    }
    for (; c < n; c++) {
      i.__setDigit(c, e.__digit(c));
    }
    for (; c < r; c++) {
      i.__setDigit(c, 0);
    }
    return i;
  };
  _ctor.__absoluteOr = function (e, o, i) {
    undefined === i && (i = null);
    var n = e.length;
    var a = o.length;
    var s = a;
    if (n < a) {
      s = n;
      var r = e;
      var c = n;
      e = o;
      n = a;
      o = r;
      a = c;
    }
    var l = n;
    if (null === i) {
      i = new _ctor(l, false);
    } else {
      l = i.length;
    }
    for (var u = 0; u < s; u++) {
      i.__setDigit(u, e.__digit(u) | o.__digit(u));
    }
    for (; u < n; u++) {
      i.__setDigit(u, e.__digit(u));
    }
    for (; u < l; u++) {
      i.__setDigit(u, 0);
    }
    return i;
  };
  _ctor.__absoluteXor = function (e, o, i) {
    undefined === i && (i = null);
    var n = e.length;
    var a = o.length;
    var s = a;
    if (n < a) {
      s = n;
      var r = e;
      var c = n;
      e = o;
      n = a;
      o = r;
      a = c;
    }
    var l = n;
    if (null === i) {
      i = new _ctor(l, false);
    } else {
      l = i.length;
    }
    for (var u = 0; u < s; u++) {
      i.__setDigit(u, e.__digit(u) ^ o.__digit(u));
    }
    for (; u < n; u++) {
      i.__setDigit(u, e.__digit(u));
    }
    for (; u < l; u++) {
      i.__setDigit(u, 0);
    }
    return i;
  };
  _ctor.__absoluteCompare = function (e, t) {
    var o = e.length - t.length;
    if (0 !== o) {
      return o;
    }
    for (var i = e.length - 1; i >= 0 && e.__digit(i) === t.__digit(i);) {
      i--;
    }
    if (i < 0) {
      return 0;
    } else if (e.__unsignedDigit(i) > t.__unsignedDigit(i)) {
      return 1;
    } else {
      return -1;
    }
  };
  _ctor.__multiplyAccumulate = function (e, o, i, n) {
    if (0 !== o) {
      var a = 32767 & o;
      var s = o >>> 15;
      var r = 0;
      var c = 0;
      for (var l = 0; l < e.length; l++, n++) {
        var u = i.__digit(n);
        var h = e.__digit(l);
        var p = 32767 & h;
        var d = h >>> 15;
        var y = _ctor.__imul(p, a);
        var f = _ctor.__imul(p, s);
        var m = _ctor.__imul(d, a);
        r = (u += c + y + r) >>> 30;
        u &= 1073741823;
        r += (u += ((32767 & f) << 15) + ((32767 & m) << 15)) >>> 30;
        c = _ctor.__imul(d, s) + (f >>> 15) + (m >>> 15);
        i.__setDigit(n, 1073741823 & u);
      }
      for (; 0 !== r || 0 !== c; n++) {
        u = i.__digit(n);
        u += r + c;
        c = 0;
        r = u >>> 30;
        i.__setDigit(n, 1073741823 & u);
      }
    }
  };
  _ctor.__internalMultiplyAdd = function (e, o, i, n, a) {
    var s = i;
    var r = 0;
    for (var c = 0; c < n; c++) {
      var l = e.__digit(c);
      var u = _ctor.__imul(32767 & l, o);
      var h = _ctor.__imul(l >>> 15, o);
      var p = u + ((32767 & h) << 15) + r + s;
      s = p >>> 30;
      r = h >>> 15;
      a.__setDigit(c, 1073741823 & p);
    }
    if (a.length > n) {
      for (a.__setDigit(n++, s + r); n < a.length;) {
        a.__setDigit(n++, 0);
      }
    } else if (s + r !== 0) {
      throw new Error("implementation bug");
    }
  };
  _ctor.prototype.__inplaceMultiplyAdd = function (e, o, i) {
    i > this.length && (i = this.length);
    var n = 32767 & e;
    var a = e >>> 15;
    var s = 0;
    var r = o;
    for (var c = 0; c < i; c++) {
      var l = this.__digit(c);
      var u = 32767 & l;
      var h = l >>> 15;
      var p = _ctor.__imul(u, n);
      var d = _ctor.__imul(u, a);
      var y = _ctor.__imul(h, n);
      var f = r + p + s;
      s = f >>> 30;
      f &= 1073741823;
      s += (f += ((32767 & d) << 15) + ((32767 & y) << 15)) >>> 30;
      r = _ctor.__imul(h, a) + (d >>> 15) + (y >>> 15);
      this.__setDigit(c, 1073741823 & f);
    }
    if (0 !== s || 0 !== r) {
      throw new Error("implementation bug");
    }
  };
  _ctor.__absoluteDivSmall = function (e, o, i) {
    undefined === i && (i = null);
    null === i && (i = new _ctor(e.length, false));
    var n = 0;
    for (var a = 2 * e.length - 1; a >= 0; a -= 2) {
      var s = (n << 15 | e.__halfDigit(a)) >>> 0;
      var r = s / o | 0;
      var c = (s = ((n = s % o | 0) << 15 | e.__halfDigit(a - 1)) >>> 0) / o | 0;
      n = s % o | 0;
      i.__setDigit(a >>> 1, r << 15 | c);
    }
    return i;
  };
  _ctor.__absoluteModSmall = function (e, t) {
    var o = 0;
    for (var i = 2 * e.length - 1; i >= 0; i--) {
      o = ((o << 15 | e.__halfDigit(i)) >>> 0) % t | 0;
    }
    return o;
  };
  _ctor.__absoluteDivLarge = function (e, o, i, n) {
    var a = o.__halfDigitLength();
    var s = o.length;
    var r = e.__halfDigitLength() - a;
    var c = null;
    i && (c = new _ctor(r + 2 >>> 1, false)).__initializeDigits();
    var l = new _ctor(a + 2 >>> 1, false);
    l.__initializeDigits();
    var u = _ctor.__clz15(o.__halfDigit(a - 1));
    u > 0 && (o = _ctor.__specialLeftShift(o, u, 0));
    var h = _ctor.__specialLeftShift(e, u, 1);
    var p = o.__halfDigit(a - 1);
    var d = 0;
    for (var y = r; y >= 0; y--) {
      var f = 32767;
      var m = h.__halfDigit(y + a);
      if (m !== p) {
        var g = (m << 15 | h.__halfDigit(y + a - 1)) >>> 0;
        f = g / p | 0;
        var v = g % p | 0;
        var C = o.__halfDigit(a - 2);
        for (var S = h.__halfDigit(y + a - 2); _ctor.__imul(f, C) >>> 0 > (v << 16 | S) >>> 0 && (f--, !((v += p) > 32767));) {
          ;
        }
      }
      _ctor.__internalMultiplyAdd(o, f, 0, s, l);
      var I = h.__inplaceSub(l, y, a + 1);
      if (0 !== I) {
        I = h.__inplaceAdd(o, y, a);
        h.__setHalfDigit(y + a, h.__halfDigit(y + a) + I & 32767);
        f--;
      }
      if (i) {
        if (1 & y) {
          d = f << 15;
        } else {
          c.__setDigit(y >>> 1, d | f);
        }
      }
    }
    if (n) {
      h.__inplaceRightShift(u);
      if (i) {
        return {
          quotient: c,
          remainder: h
        };
      } else {
        return h;
      }
    }
    if (i) {
      return c;
    }
    throw new Error("unreachable");
  };
  _ctor.__clz15 = function (e) {
    return _ctor.__clz30(e) - 15;
  };
  _ctor.prototype.__inplaceAdd = function (e, t, o) {
    var i = 0;
    for (var n = 0; n < o; n++) {
      var a = this.__halfDigit(t + n) + e.__halfDigit(n) + i;
      i = a >>> 15;
      this.__setHalfDigit(t + n, 32767 & a);
    }
    return i;
  };
  _ctor.prototype.__inplaceSub = function (e, t, o) {
    var i = o - 1 >>> 1;
    var n = 0;
    if (1 & t) {
      t >>= 1;
      var a = 32767 & (y = this.__digit(t));
      for (var s = 0; s < i; s++) {
        var r = e.__digit(s);
        var c = (y >>> 15) - (32767 & r) - n;
        n = c >>> 15 & 1;
        this.__setDigit(t + s, (32767 & c) << 15 | 32767 & a);
        n = (a = (32767 & (y = this.__digit(t + s + 1))) - (r >>> 15) - n) >>> 15 & 1;
      }
      n = (m = (y >>> 15) - (32767 & (f = e.__digit(s))) - n) >>> 15 & 1;
      this.__setDigit(t + s, (32767 & m) << 15 | 32767 & a);
      var l = f >>> 15;
      if (t + s + 1 >= this.length) {
        throw new RangeError("out of bounds");
      }
      if (0 == (1 & o)) {
        n = (a = (32767 & (y = this.__digit(t + s + 1))) - l - n) >>> 15 & 1;
        this.__setDigit(t + e.length, 1073709056 & y | 32767 & a);
      }
    } else {
      t >>= 1;
      for (s = 0; s < e.length - 1; s++) {
        var u = this.__digit(t + s);
        var h = e.__digit(s);
        var p = (32767 & u) - (32767 & h) - n;
        var d = (u >>> 15) - (h >>> 15) - (n = p >>> 15 & 1);
        n = d >>> 15 & 1;
        this.__setDigit(t + s, (32767 & d) << 15 | 32767 & p);
      }
      var y;
      var f;
      n = (a = (32767 & (y = this.__digit(t + s))) - (32767 & (f = e.__digit(s))) - n) >>> 15 & 1;
      var m = 0;
      0 == (1 & o) && (n = (m = (y >>> 15) - (f >>> 15) - n) >>> 15 & 1);
      this.__setDigit(t + s, (32767 & m) << 15 | 32767 & a);
    }
    return n;
  };
  _ctor.prototype.__inplaceRightShift = function (e) {
    if (0 !== e) {
      var t = this.__digit(0) >>> e;
      var o = this.length - 1;
      for (var i = 0; i < o; i++) {
        var n = this.__digit(i + 1);
        this.__setDigit(i, n << 30 - e & 1073741823 | t);
        t = n >>> e;
      }
      this.__setDigit(o, t);
    }
  };
  _ctor.__specialLeftShift = function (e, o, i) {
    var n = e.length;
    var a = new _ctor(n + i, false);
    if (0 === o) {
      for (var s = 0; s < n; s++) {
        a.__setDigit(s, e.__digit(s));
      }
      i > 0 && a.__setDigit(n, 0);
      return a;
    }
    var r = 0;
    for (s = 0; s < n; s++) {
      var c = e.__digit(s);
      a.__setDigit(s, c << o & 1073741823 | r);
      r = c >>> 30 - o;
    }
    i > 0 && a.__setDigit(n, r);
    return a;
  };
  _ctor.__leftShiftByAbsolute = function (e, o) {
    var i = _ctor.__toShiftAmount(o);
    if (i < 0) {
      throw new RangeError("BigInt too big");
    }
    var n = i / 30 | 0;
    var a = i % 30;
    var s = e.length;
    var r = 0 !== a && e.__digit(s - 1) >>> 30 - a != 0;
    var c = s + n + (r ? 1 : 0);
    var l = new _ctor(c, e.sign);
    if (0 === a) {
      for (var u = 0; u < n; u++) {
        l.__setDigit(u, 0);
      }
      for (; u < c; u++) {
        l.__setDigit(u, e.__digit(u - n));
      }
    } else {
      var h = 0;
      for (u = 0; u < n; u++) {
        l.__setDigit(u, 0);
      }
      for (u = 0; u < s; u++) {
        var p = e.__digit(u);
        l.__setDigit(u + n, p << a & 1073741823 | h);
        h = p >>> 30 - a;
      }
      if (r) {
        l.__setDigit(s + n, h);
      } else if (0 !== h) {
        throw new Error("implementation bug");
      }
    }
    return l.__trim();
  };
  _ctor.__rightShiftByAbsolute = function (e, o) {
    var i = e.length;
    var n = e.sign;
    var a = _ctor.__toShiftAmount(o);
    if (a < 0) {
      return _ctor.__rightShiftByMaximum(n);
    }
    var s = a / 30 | 0;
    var r = a % 30;
    var c = i - s;
    if (c <= 0) {
      return _ctor.__rightShiftByMaximum(n);
    }
    var l = false;
    if (n) {
      var u = (1 << r) - 1;
      if (0 != (e.__digit(s) & u)) {
        l = true;
      } else {
        for (var h = 0; h < s; h++) {
          if (0 !== e.__digit(h)) {
            l = true;
            break;
          }
        }
      }
    }
    l && 0 === r && 0 == ~e.__digit(i - 1) && c++;
    var p = new _ctor(c, n);
    if (0 === r) {
      p.__setDigit(c - 1, 0);
      for (h = s; h < i; h++) {
        p.__setDigit(h - s, e.__digit(h));
      }
    } else {
      var d = e.__digit(s) >>> r;
      var y = i - s - 1;
      for (h = 0; h < y; h++) {
        var f = e.__digit(h + s + 1);
        p.__setDigit(h, f << 30 - r & 1073741823 | d);
        d = f >>> r;
      }
      p.__setDigit(y, d);
    }
    l && (p = _ctor.__absoluteAddOne(p, true, p));
    return p.__trim();
  };
  _ctor.__rightShiftByMaximum = function (e) {
    if (e) {
      return _ctor.__oneDigit(1, true);
    } else {
      return _ctor.__zero();
    }
  };
  _ctor.__toShiftAmount = function (e) {
    if (e.length > 1) {
      return -1;
    }
    var o = e.__unsignedDigit(0);
    if (o > _ctor.__kMaxLengthBits) {
      return -1;
    } else {
      return o;
    }
  };
  _ctor.__toPrimitive = function (e, o) {
    undefined === o && (o = "default");
    if ("object" != typeof e) {
      return e;
    }
    if (e.constructor === _ctor) {
      return e;
    }
    if ("undefined" != typeof Symbol && "symbol" == typeof Symbol.toPrimitive) {
      var i = e[Symbol.toPrimitive];
      if (i) {
        if ("object" != typeof (a = i(o))) {
          return a;
        }
        throw new TypeError("Cannot convert object to primitive value");
      }
    }
    var n = e.valueOf;
    if (n && "object" != typeof (a = n.call(e))) {
      return a;
    }
    var a;
    var s = e.toString;
    if (s && "object" != typeof (a = s.call(e))) {
      return a;
    }
    throw new TypeError("Cannot convert object to primitive value");
  };
  _ctor.__toNumeric = function (e) {
    if (_ctor.__isBigInt(e)) {
      return e;
    } else {
      return +e;
    }
  };
  _ctor.__isBigInt = function (e) {
    return "object" == typeof e && null !== e && e.constructor === _ctor;
  };
  _ctor.__truncateToNBits = function (e, o) {
    var i = (e + 29) / 30 | 0;
    var n = new _ctor(i, o.sign);
    var a = i - 1;
    for (var s = 0; s < a; s++) {
      n.__setDigit(s, o.__digit(s));
    }
    var r = o.__digit(a);
    if (e % 30 != 0) {
      var c = 32 - e % 30;
      r = r << c >>> c;
    }
    n.__setDigit(a, r);
    return n.__trim();
  };
  _ctor.__truncateAndSubFromPowerOfTwo = function (e, o, i) {
    var n = (e + 29) / 30 | 0;
    var a = new _ctor(n, i);
    var s = 0;
    var r = n - 1;
    var c = 0;
    for (var l = Math.min(r, o.length); s < l; s++) {
      var u = 0 - o.__digit(s) - c;
      c = u >>> 30 & 1;
      a.__setDigit(s, 1073741823 & u);
    }
    for (; s < r; s++) {
      a.__setDigit(s, 1073741823 & -c | 0);
    }
    var h;
    var p = r < o.length ? o.__digit(r) : 0;
    var d = e % 30;
    if (0 === d) {
      h = 0 - p - c;
      h &= 1073741823;
    } else {
      var y = 32 - d;
      var f = 1 << 32 - y;
      h = f - (p = p << y >>> y) - c;
      h &= f - 1;
    }
    a.__setDigit(r, h);
    return a.__trim();
  };
  _ctor.prototype.__digit = function (e) {
    return this[e];
  };
  _ctor.prototype.__unsignedDigit = function (e) {
    return this[e] >>> 0;
  };
  _ctor.prototype.__setDigit = function (e, t) {
    this[e] = 0 | t;
  };
  _ctor.prototype.__setDigitGrow = function (e, t) {
    this[e] = 0 | t;
  };
  _ctor.prototype.__halfDigitLength = function () {
    var e = this.length;
    if (this.__unsignedDigit(e - 1) <= 32767) {
      return 2 * e - 1;
    } else {
      return 2 * e;
    }
  };
  _ctor.prototype.__halfDigit = function (e) {
    return this[e >>> 1] >>> 15 * (1 & e) & 32767;
  };
  _ctor.prototype.__setHalfDigit = function (e, t) {
    var o = e >>> 1;
    var i = this.__digit(o);
    var n = 1 & e ? 32767 & i | t << 15 : 1073709056 & i | 32767 & t;
    this.__setDigit(o, n);
  };
  _ctor.__digitPow = function (e, t) {
    for (var o = 1; t > 0;) {
      1 & t && (o *= e);
      t >>>= 1;
      e *= e;
    }
    return o;
  };
  _ctor.__isOneDigitInt = function (e) {
    return (1073741823 & e) === e;
  };
  _ctor.__kMaxLength = 1 << 25;
  _ctor.__kMaxLengthBits = _ctor.__kMaxLength << 5;
  _ctor.__kMaxBitsPerChar = [0, 0, 32, 51, 64, 75, 83, 90, 96, 102, 107, 111, 115, 119, 122, 126, 128, 131, 134, 136, 139, 141, 143, 145, 147, 149, 151, 153, 154, 156, 158, 159, 160, 162, 163, 165, 166];
  _ctor.__kBitsPerCharTableShift = 5;
  _ctor.__kBitsPerCharTableMultiplier = 1 << _ctor.__kBitsPerCharTableShift;
  _ctor.__kConversionChars = "0123456789abcdefghijklmnopqrstuvwxyz".split("");
  _ctor.__kBitConversionBuffer = new ArrayBuffer(8);
  _ctor.__kBitConversionDouble = new Float64Array(_ctor.__kBitConversionBuffer);
  _ctor.__kBitConversionInts = new Int32Array(_ctor.__kBitConversionBuffer);
  _ctor.__clz30 = Math.clz32 ? function (e) {
    return Math.clz32(e) - 2;
  } : function (e) {
    if (0 === e) {
      return 30;
    } else {
      return 29 - (Math.log(e >>> 0) / Math.LN2 | 0) | 0;
    }
  };
  _ctor.__imul = Math.imul || function (e, t) {
    return e * t | 0;
  };
  return _ctor;
}(Array);
exports.default = def_jsbi;