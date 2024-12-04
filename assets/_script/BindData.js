Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BindData = undefined;
var r_Container = require("Container");
var exp_BindData = function () {
  function _ctor(e, t, o, i) {
    this.isDestroy = false;
    this.container = e;
    this.concrete = o;
    this.isSingleton = i;
    this.mSerivice = t;
  }
  Object.defineProperty(_ctor.prototype, "serivice", {
    get: function () {
      return this.mSerivice;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.alias = function (e) {
    this.container.alias(e, this.mSerivice);
    return this;
  };
  _ctor.prototype.onResolving = function (e) {
    this.resolving || (this.resolving = []);
    -1 == this.resolving.findIndex(function (t) {
      return t == e;
    }) && this.resolving.push(e);
    return this;
  };
  _ctor.prototype.onAfterResolving = function (e) {
    this.afterResolving || (this.afterResolving = []);
    -1 == this.afterResolving.findIndex(function (t) {
      return t == e;
    }) && this.afterResolving.push(e);
    return this;
  };
  _ctor.prototype.onRelease = function (e) {
    this.releaseListener || (this.releaseListener = []);
    -1 == this.releaseListener.findIndex(function (t) {
      return t == e;
    }) && this.releaseListener.push(e);
    return this;
  };
  _ctor.prototype.triggerResolving = function (e) {
    return r_Container.Container.trigger(this, e, this.resolving);
  };
  _ctor.prototype.triggerAfterResolving = function (e) {
    return r_Container.Container.trigger(this, e, this.afterResolving);
  };
  _ctor.prototype.triggerRelease = function (e) {
    return r_Container.Container.trigger(this, e, this.releaseListener);
  };
  _ctor.prototype.unBind = function () {
    this.isDestroy = true;
    this.releaseBind();
  };
  _ctor.prototype.releaseBind = function () {
    this.container.unbindByData(this);
  };
  return _ctor;
}();
exports.BindData = exp_BindData;