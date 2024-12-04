Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Base64Helper = exports._Base64Helper = undefined;
var exp__Base64Helper = function () {
  function _ctor() {
    this._keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  }
  _ctor.prototype.encode = function (e) {
    var t;
    var o;
    var i;
    var n;
    var a;
    var s;
    var r;
    var c = "";
    var l = 0;
    for (e = this._utf8_encode(e); l < e.length;) {
      n = (t = e.charCodeAt(l++)) >> 2;
      a = (3 & t) << 4 | (o = e.charCodeAt(l++)) >> 4;
      s = (15 & o) << 2 | (i = e.charCodeAt(l++)) >> 6;
      r = 63 & i;
      if (isNaN(o)) {
        s = r = 64;
      } else {
        isNaN(i) && (r = 64);
      }
      c = c + this._keyStr.charAt(n) + this._keyStr.charAt(a) + this._keyStr.charAt(s) + this._keyStr.charAt(r);
    }
    return c;
  };
  _ctor.prototype.decode = function (e) {
    var t;
    var o;
    var i;
    var n;
    var a;
    var s;
    var r = "";
    var c = 0;
    for (e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); c < e.length;) {
      t = this._keyStr.indexOf(e.charAt(c++)) << 2 | (n = this._keyStr.indexOf(e.charAt(c++))) >> 4;
      o = (15 & n) << 4 | (a = this._keyStr.indexOf(e.charAt(c++))) >> 2;
      i = (3 & a) << 6 | (s = this._keyStr.indexOf(e.charAt(c++)));
      r += String.fromCharCode(t);
      64 != a && (r += String.fromCharCode(o));
      64 != s && (r += String.fromCharCode(i));
    }
    return this._utf8_decode(r);
  };
  _ctor.prototype._utf8_encode = function (e) {
    e = e.replace(/\r\n/g, "\n");
    var t = "";
    for (var o = 0; o < e.length; o++) {
      var i = e.charCodeAt(o);
      if (i < 128) {
        t += String.fromCharCode(i);
      } else if (i > 127 && i < 2048) {
        t += String.fromCharCode(i >> 6 | 192);
        t += String.fromCharCode(63 & i | 128);
      } else {
        t += String.fromCharCode(i >> 12 | 224);
        t += String.fromCharCode(i >> 6 & 63 | 128);
        t += String.fromCharCode(63 & i | 128);
      }
    }
    return t;
  };
  _ctor.prototype._utf8_decode = function (e) {
    var t;
    var o = "";
    var i = 0;
    var n = 0;
    for (var a = 0; i < e.length;) {
      if ((n = e.charCodeAt(i)) < 128) {
        o += String.fromCharCode(n);
        i++;
      } else if (n > 191 && n < 224) {
        a = e.charCodeAt(i + 1);
        o += String.fromCharCode((31 & n) << 6 | 63 & a);
        i += 2;
      } else {
        a = e.charCodeAt(i + 1);
        t = e.charCodeAt(i + 2);
        o += String.fromCharCode((15 & n) << 12 | (63 & a) << 6 | 63 & t);
        i += 3;
      }
    }
    return o;
  };
  return _ctor;
}();
exports._Base64Helper = exp__Base64Helper;
exports.Base64Helper = new exp__Base64Helper();