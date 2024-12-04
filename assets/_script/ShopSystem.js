Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShopSystem = exports._ShopSystem = undefined;
var r_ShopCfg = require("ShopCfg");
var r_UtilsSystem = require("UtilsSystem");
var exp__ShopSystem = function () {
  function _ctor() {
    this.props = [];
  }
  _ctor.prototype.initData = function () {
    this.props = [];
    var e = Object.values(r_ShopCfg.ShopPropCfg);
    for (var t = 0; t < e.length; t++) {
      var o = e[t];
      for (var n = 0; n < o.count; n++) {
        this.props.push(o.id);
      }
    }
  };
  _ctor.prototype.clearProp = function (e) {
    var t = this.props.findIndex(function (t) {
      return t == e;
    });
    this.props.splice(t, 1);
  };
  _ctor.prototype.getRandomShowProp = function (e) {
    var t = [];
    for (var o = 0; o < e; o++) {
      var i = this.getUnique(this.props, t);
      var a = r_UtilsSystem.UtilsSystem.getRandomNum(0, i.length - 1);
      var s = null != i[a] ? i[a] : null;
      t.push(s);
    }
    return t;
  };
  _ctor.prototype.getRandomShowPropOnce = function (e) {
    var t = this.getUnique(this.props, e);
    var o = r_UtilsSystem.UtilsSystem.getRandomNum(0, t.length - 1);
    if (null != t[o]) {
      return t[o];
    } else {
      return null;
    }
  };
  _ctor.prototype.getUnique = function (e, t) {
    var o = e.concat();
    var i = function (e) {
      var i = t[e];
      var n = o.findIndex(function (e) {
        return i == e;
      });
      -1 != n && o.splice(n, 1);
    };
    for (var n = 0; n < t.length; n++) {
      i(n);
    }
    return o;
  };
  _ctor.prototype.getChange90to0 = function (e, t, o) {
    var i = cc.v2();
    i.x = e.x + t / 2 - o / 2;
    i.y = e.y + o / 2 - t / 2;
    return i;
  };
  _ctor.prototype.getChange0to90 = function (e, t, o) {
    var i = cc.v2();
    i.x = e.x + o / 2 - t / 2;
    i.y = e.y + t / 2 - o / 2;
    return i;
  };
  return _ctor;
}();
exports._ShopSystem = exp__ShopSystem;
exports.ShopSystem = new exp__ShopSystem();