Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GamePool = undefined;
var exp_GamePool = function () {
  function _ctor() {}
  _ctor.getPoolBySign = function (t) {
    return _ctor._poolDic[t] || (_ctor._poolDic[t] = []);
  };
  _ctor.clearBySign = function (t) {
    _ctor._poolDic[t] && (_ctor._poolDic[t].length = 0);
  };
  _ctor.recover = function (t, o) {
    if (!o[_ctor.POOLSIGN]) {
      o[_ctor.POOLSIGN] = true;
      _ctor.getPoolBySign(t).push(o);
    }
  };
  _ctor.recoverByClass = function (t) {
    if (t) {
      var o = t.__className || t.constructor._$gid;
      o && _ctor.recover(o, t);
    }
  };
  _ctor._getClassSign = function (t) {
    var o = t.__className || t._$gid;
    if (!o) {
      t._$gid = o = _ctor._CLSID + "";
      _ctor._CLSID++;
    }
    return o;
  };
  _ctor.createByClass = function (t) {
    return _ctor.getItemByClass(_ctor._getClassSign(t), t);
  };
  _ctor.getItemByClass = function (t, o) {
    if (!_ctor._poolDic[t]) {
      return new o();
    }
    var i;
    var n = _ctor.getPoolBySign(t);
    if (n.length) {
      (i = n.pop())[_ctor.POOLSIGN] = false;
    } else {
      i = new o();
    }
    return i;
  };
  _ctor.getItemByCreateFun = function (t, o, i) {
    undefined === i && (i = null);
    var n = _ctor.getPoolBySign(t);
    var a = n.length ? n.pop() : o.call(i);
    a[_ctor.POOLSIGN] = false;
    return a;
  };
  _ctor.getItem = function (t) {
    var o = _ctor.getPoolBySign(t);
    var i = o.length ? o.pop() : null;
    i && (i[_ctor.POOLSIGN] = false);
    return i;
  };
  _ctor._CLSID = 0;
  _ctor.POOLSIGN = "__InPool";
  _ctor._poolDic = {};
  return _ctor;
}();
exports.GamePool = exp_GamePool;