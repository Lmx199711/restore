Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pool = undefined;
var exp_Pool = function () {
  function _ctor(e, t, o, i, n, a) {
    undefined === o && (o = 3);
    undefined === i && (i = null);
    undefined === n && (n = null);
    undefined === a && (a = null);
    this.objs = [];
    this.poolFlag = e;
    this.initPool(e, t, o, i, n, a);
  }
  _ctor.prototype.getObject = function () {
    var e;
    var t = [];
    for (var o = 0; o < arguments.length; o++) {
      t[o] = arguments[o];
    }
    if (this.objs.length > 0) {
      e = this.objs.pop();
    } else if (null == (e = this.createFunc.apply(this, t))) {
      throw new Error("对象池的创建函数返回的对象为null 对象池标记[" + this.poolFlag + "]");
    }
    this.initFunc && (e = this.initFunc(e, t));
    e["__InPool" + this.poolFlag] = true;
    return e;
  };
  _ctor.prototype.createObject = function () {
    var e = [];
    for (var t = 0; t < arguments.length; t++) {
      e[t] = arguments[t];
    }
    var o = this.createFunc.apply(this, e);
    this.initFunc && (o = this.initFunc(o, e));
    o["__InPool" + this.poolFlag] = true;
    return o;
  };
  _ctor.prototype.revert = function (e, t) {
    if (e) {
      this.onRevertFunc && (e = this.onRevertFunc(e));
      if (!e["__InPool" + this.poolFlag]) {
        throw new Error("无法回收不属于本对象池生成的对象:" + t);
      }
      e["__InPool" + this.poolFlag] = false;
      this.objs.push(e);
    }
  };
  _ctor.prototype.clear = function () {
    var e = this;
    this.objs.forEach(function (t) {
      t && (t["__InPool" + e.poolFlag] = false);
      e.onDestroyFunc && e.onDestroyFunc(t);
    });
    this.objs.length = 0;
  };
  _ctor.prototype.initPool = function (e, t, o, i, n, a) {
    undefined === o && (o = 3);
    undefined === i && (i = null);
    undefined === n && (n = null);
    undefined === a && (a = null);
    this.poolFlag = e;
    this.createFunc = t;
    this.initFunc = i;
    this.onRevertFunc = n;
    this.onDestroyFunc = a;
    for (var s = 0; s < o; s++) {
      var r = this.createObject();
      this.revert(r, e);
    }
  };
  return _ctor;
}();
exports.Pool = exp_Pool;