Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Container = undefined;
var r_BindData = require("BindData");
var exp_Container = function () {
  function _ctor() {
    this.bindings = new Map();
    this.instances = new Map();
    this.aliases = new Map();
    this.aliasesReverse = new Map();
    this.resolving = new Array();
    this.afterResloving = new Array();
    this.resolved = new Array();
    this.buildStack = [];
    this.releaseListeners = new Array();
    this.instancesReverse = new Map();
  }
  _ctor.prototype.bindByConcrete = function (e, t, o) {
    e = this.formatService(e);
    if (this.bindings.has(e)) {
      throw new Error("绑定 [" + e + "] 已经存在");
    }
    if (this.instances.has(e)) {
      throw new Error("实例 [" + e + "] 已经存在");
    }
    if (this.aliases.has(e)) {
      throw new Error("别名 [" + e + "] 已经存在");
    }
    var i = new r_BindData.BindData(this, e, t, o);
    this.bindings.set(e, i);
    if (this.isResolved(e)) {
      this.make(e);
      return i;
    } else {
      return i;
    }
  };
  _ctor.prototype.bind = function (e, t, o) {
    undefined === o && (o = false);
    return this.bindByConcrete(e, function () {
      if (t) {
        return new t();
      } else {
        return null;
      }
    }, o);
  };
  _ctor.prototype.onResolving = function (e) {
    this.resolving.push(e);
    return this;
  };
  _ctor.prototype.onAfterResolving = function (e) {
    this.afterResloving.push(e);
    return this;
  };
  _ctor.prototype.aliasToService = function (e) {
    e = this.formatService(e);
    if (this.aliases.has(e)) {
      return this.aliases.get(e);
    } else {
      return e;
    }
  };
  _ctor.prototype.build = function (e) {
    var t = [];
    for (var o = 1; o < arguments.length; o++) {
      t[o - 1] = arguments[o];
    }
    if (e.concrete) {
      var n = e.concrete.apply(e, __spreadArrays([this], t));
      return this.inject(n);
    }
    throw new Error("构建服务" + e + "失败因为没有创建函数");
  };
  _ctor.prototype.inject = function (e) {
    var t = e.needServices;
    var o = e.onServiceSet;
    if (t && o) {
      var i = [];
      for (var n = 0; n < t.length; n++) {
        var a = t[n];
        if (this.canMake(a)) {
          var s = this.make(a);
          i.push(s);
        } else {
          i.push(null);
        }
      }
      o.apply(e, i);
    }
    return e;
  };
  _ctor.prototype.formatService = function (e) {
    return e.trim();
  };
  _ctor.prototype.triggerOnResolving = function (e, t) {
    t = e.triggerResolving(t);
    return e.triggerAfterResolving(t);
  };
  _ctor.prototype.triggerOnRelease = function (t, o) {
    _ctor.trigger(t, o, this.releaseListeners);
  };
  _ctor.prototype.unbindByData = function (e) {
    var t = this;
    this.release(e.serivice);
    if (this.aliasesReverse.has(e.serivice)) {
      this.aliasesReverse.get(e.serivice).forEach(function (e) {
        t.aliases.delete(e);
      });
      this.aliasesReverse.delete(e.serivice);
    }
    this.bindings.delete(e.serivice);
  };
  _ctor.prototype.getBind = function (e) {
    if (e) {
      e = this.aliasToService(e);
      if (this.bindings.has(e)) {
        return this.bindings.get(e);
      } else {
        return null;
      }
    } else {
      return null;
    }
  };
  _ctor.prototype.hasBind = function (e) {
    return null != this.getBind(e);
  };
  _ctor.prototype.hasInstance = function (e) {
    e = this.aliasToService(e);
    return this.instances.has(e);
  };
  _ctor.prototype.isResolved = function (e) {
    e = this.aliasToService(e);
    return -1 != this.resolved.indexOf(e) || this.instances.has(e);
  };
  _ctor.prototype.canMake = function (e) {
    return this.hasBind(e) || this.hasInstance(e);
  };
  _ctor.prototype.isSingleton = function (e) {
    var t = this.getBind(e);
    return null != t && t.isSingleton;
  };
  _ctor.prototype.isAlias = function (e) {
    e = this.formatService(e);
    return this.aliases.has(e);
  };
  _ctor.prototype.unBind = function (e) {
    e = this.aliasToService(e);
    var t = this.getBind(e);
    t && t.unBind();
  };
  _ctor.prototype.instance = function (e, t, o) {
    undefined === o && (o = false);
    e = this.aliasToService(e);
    var i = this.getBind(e);
    if (null != i) {
      if (!i.isSingleton) {
        throw new Error("服务 [" + i.serivice + "] 不是单例服务无法注册实例为服务对象");
      }
    } else {
      i = new r_BindData.BindData(this, e, null, true);
    }
    this.instances.set(e, t);
    o && (t = this.inject(t));
    t = this.triggerOnResolving(i, t);
    this.release(e);
    this.instances.set(e, t);
    null != t && this.instancesReverse.set(t, e);
    return t;
  };
  _ctor.prototype.make = function (e) {
    var t = [];
    for (var o = 1; o < arguments.length; o++) {
      t[o - 1] = arguments[o];
    }
    e = this.aliasToService(e);
    if (this.instances.has(e)) {
      return this.instances.get(e);
    }
    if (-1 != this.buildStack.indexOf(e)) {
      throw new Error("递归创建服务实例");
    }
    this.buildStack.push(e);
    try {
      var i = this.getBind(e);
      if (null == i) {
        throw new Error("服务没有注册[" + e + "]");
      }
      var n = this.build(i, t);
      if (i.isSingleton) {
        this.instance(e, n);
      } else {
        this.triggerOnResolving(i, n);
      }
      this.resolved.push(i.serivice);
      return n;
    } finally {
      this.buildStack.shift();
    }
  };
  _ctor.prototype.release = function (e) {
    if (!e) {
      return false;
    }
    var t;
    var o = null;
    if ("string" == typeof e) {
      t = this.aliasToService(e);
      if (this.instances.has(t)) {
        o = this.instances.get(t);
      } else {
        t = this.instancesReverse.has(e) ? this.instancesReverse.get(e) : null;
      }
    } else {
      t = this.instancesReverse.has(e) ? this.instancesReverse.get(e) : null;
    }
    null == o && t && this.instances.has(t) && (o = this.instances.get(t));
    if (null == o || !t) {
      return false;
    }
    var i = this.getBind(t);
    i || new r_BindData.BindData(this, t, null, true);
    this.triggerOnRelease(i, o);
    this.instancesReverse.delete(o);
    this.instances.delete(t);
    o = null;
    return true;
  };
  _ctor.prototype.alias = function (e, t) {
    if (e == t) {
      throw new Error("别名和服务名称不能一样 service:" + e);
    }
    e = this.formatService(e);
    t = this.aliasToService(t);
    null != this.instances.get(e) && console.warn("试图设置一个别名 和已经存在的服务名称一致 可能会导致获取服务时得到不是是预想的服务");
    if (this.aliases.has(e)) {
      throw new Error("别名已经存在不能重复 alias:" + e);
    }
    if (this.bindings.has(e)) {
      throw new Error("别名已经被绑定为服务 alias:" + e);
    }
    this.aliases.set(e, t);
    var o = this.aliasesReverse.has(t) ? this.aliasesReverse.get(t) : null;
    if (!o) {
      o = [];
      this.aliasesReverse.set(t, o);
    }
    o.push(e);
    return this;
  };
  _ctor.prototype.onRelease = function (e) {
    this.releaseListeners.push(e);
    return this;
  };
  _ctor.prototype.flush = function () {
    var e = this;
    try {
      this.instances.forEach(function (t) {
        e.release(t);
      });
      this.instances.clear();
      this.releaseListeners.length = 0;
      this.aliases.clear();
      this.aliasesReverse.clear();
      this.bindings.clear();
      this.resolving.length = 0;
      this.releaseListeners.length = 0;
      this.buildStack.length = 0;
    } catch (t) {}
  };
  _ctor.trigger = function (e, t, o) {
    o && o.forEach(function (o) {
      o(e, t);
    });
    return t;
  };
  return _ctor;
}();
exports.Container = exp_Container;