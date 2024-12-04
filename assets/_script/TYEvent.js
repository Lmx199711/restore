Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventDef = exports.TYEvent = undefined;
var exp_TYEvent = function () {
  function _ctor(e, t) {
    this.type = e;
    this.data = t;
  }
  _ctor.prototype.stopImmediatePropagation = function () {
    this.isPropagationImmediateStopped = true;
  };
  _ctor.prototype.clean = function () {
    this.data = this.target = null;
    this.isPropagationImmediateStopped = false;
  };
  _ctor.create = function (e, t) {
    var o;
    e.hasOwnProperty("eventPool") && (o = e.eventPool);
    o || (o = e.eventPool = []);
    if (o.length) {
      var i = o.pop();
      i.type = t;
      return i;
    }
    return new e(t);
  };
  _ctor.dispatchEvent = function (t, o, i) {
    var n = _ctor.create(_ctor, o);
    n.data = i;
    t.dispatchEvent(n);
    _ctor.release(n);
  };
  _ctor.release = function (e) {
    e.clean();
    Object.getPrototypeOf(e).constructor.eventPool.push(e);
  };
  return _ctor;
}();
exports.TYEvent = exp_TYEvent;
var exp_EventDef = function () {
  function _ctor() {}
  _ctor.energyChange = "energyChange";
  _ctor.coinChange = "coinChange";
  _ctor.DiamondChange = "DiamondChange";
  _ctor.StoneChange = "StoneChange";
  _ctor.expChange = "expChange";
  _ctor.onlineCoinChange = "onlineCoinChange";
  _ctor.pieceChange = "pieceChange";
  _ctor.drinkChange = "drinkChange";
  _ctor.matChange = "matChange";
  _ctor.seasonChange = "seasonChange";
  _ctor.revive = "revive";
  _ctor.bitPropHit = "bitPropHit";
  _ctor.bitFighting = "bitFighting";
  _ctor.bitGameOver = "bitGameOver";
  _ctor.bitPause = "bitPause";
  _ctor.bitAgain = "bitAgain";
  _ctor.bitChangeHead = "bitChangeHead";
  _ctor.inkChange = "inkChange";
  _ctor.newWeapon = "newWeapon";
  _ctor.stoneChange = "stoneChange";
  _ctor.finishCarThing = "finishCarThing";
  _ctor.freshBook = "freshBook";
  _ctor.clickWpInfo = "clickWpInfo";
  _ctor.vitalityChange = "vitalityChange";
  _ctor.execute = "execute";
  _ctor.DialogueFinishEvent = "DialogueFinishEvent";
  _ctor.checkDragonBall = "checkDragonBall";
  _ctor.upgrade = "upgrade";
  _ctor.touchEarn = "touchEarn";
  _ctor.inextTip = "inextTip";
  _ctor.carThingFlash = "carThingFlash";
  return _ctor;
}();
exports.EventDef = exp_EventDef;