var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.State = undefined;
var r_StateBase = require("StateBase");
var exp_State = function (e) {
  function _ctor(t, o, i, n, a) {
    undefined === t && (t = null);
    undefined === o && (o = null);
    undefined === i && (i = null);
    undefined === n && (n = null);
    undefined === a && (a = false);
    var s = e.call(this) || this;
    s.needExitTime = a;
    s.onEnterFunc = t;
    s.onUpdateFunc = o;
    s.onExitFunc = i;
    s.canExitFunc = n;
    return s;
  }
  __extends(_ctor, e);
  _ctor.prototype.onEnter = function (t, o) {
    e.prototype.onEnter.call(this, t, o);
    this.onEnterFunc && this.onEnterFunc(this, t, o);
  };
  _ctor.prototype.onExit = function (t, o) {
    e.prototype.onExit.call(this, t, o);
    this.onExitFunc && this.onExitFunc(this, t, o);
  };
  _ctor.prototype.onUpdate = function (t) {
    e.prototype.onUpdate.call(this, t);
    this.onUpdateFunc && this.onUpdateFunc(this, t);
  };
  _ctor.prototype.requestExit = function () {
    (!this.needExitTime || this.canExitFunc && this.canExitFunc(this)) && this.fsm.stateCanExit();
  };
  return _ctor;
}(r_StateBase.StateBase);
exports.State = exp_State;