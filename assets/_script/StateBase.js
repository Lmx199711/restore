Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StateBase = undefined;
var exp_StateBase = function () {
  function _ctor() {
    this.isStateMachine = false;
    this.time = 0;
    this.needExitTime = false;
  }
  Object.defineProperty(_ctor.prototype, "elapsedTime", {
    get: function () {
      return this.time;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.init = function () {};
  _ctor.prototype.onEnter = function () {
    this.time = 0;
  };
  _ctor.prototype.onExit = function () {};
  _ctor.prototype.onUpdate = function (e) {
    this.time += e;
  };
  _ctor.prototype.requestExit = function () {};
  return _ctor;
}();
exports.StateBase = exp_StateBase;