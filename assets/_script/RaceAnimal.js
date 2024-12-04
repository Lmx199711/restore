var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimalState = undefined;
var s;
var r_UtilsSystem = require("UtilsSystem");
var r_RaceUI = require("RaceUI");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
_decorator.property;
(function (e) {
  e[e.idle = 0] = "idle";
  e[e.run = 1] = "run";
  e[e.fast = 2] = "fast";
  e[e.slow = 3] = "slow";
  e[e.sleep = 4] = "sleep";
  e[e.fall = 5] = "fall";
  e[e.comeOn = 6] = "comeOn";
})(s = exports.AnimalState || (exports.AnimalState = {}));
var def_RaceAnimal = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.curState = s.idle;
    t.curSpeed = 0;
    t.stateTime = 0;
    t.runSpeed = 0;
    t.raceUI = null;
    return t;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  _ctor.prototype.start = function () {};
  _ctor.prototype.setSpeed = function (e) {
    this.curSpeed = e;
    this.runSpeed = e;
  };
  _ctor.prototype.run = function () {
    this.node.getChildByName("sleep").active = false;
    this.raceUI.prefab.getChildByName("sudu").active = false;
    this.node.getChildByName("huo").active = false;
    this.curState = s.run;
    this.getComponent(sp.Skeleton).setAnimation(0, "step_2", true);
  };
  _ctor.prototype.comeOn = function () {
    this.stateTime = 3;
    this.curState = s.comeOn;
    this.curSpeed = r_RaceUI.RaceUI.fastSpeed;
    this.node.getChildByName("huo").active = true;
    this.node.getChildByName("sleep").active = false;
    this.getComponent(sp.Skeleton).setAnimation(0, "step_3", true);
  };
  _ctor.prototype.changeState = function () {
    if (this.curState != s.comeOn) {
      var e = r_UtilsSystem.UtilsSystem.randomPercentFromArray(_ref__ctor.stateRandomList);
      this.curState = e.s;
      this.stateTime = 5;
      this.node.getChildByName("huo").active = false;
      this.node.getChildByName("sleep").active = false;
      if (this.curState == s.fast) {
        this.curSpeed = r_RaceUI.RaceUI.fastSpeed;
        this.getComponent(sp.Skeleton).setAnimation(0, "step_3", true);
        this.node.getChildByName("huo").active = true;
      } else if (this.curState == s.slow) {
        this.curSpeed = r_RaceUI.RaceUI.speedList[0];
        this.getComponent(sp.Skeleton).setAnimation(0, "step_4", true);
      } else if (this.curState == s.sleep) {
        this.curSpeed = 0;
        this.getComponent(sp.Skeleton).setAnimation(0, "step_5", false);
        this.node.getChildByName("sleep").active = true;
      } else if (this.curState == s.fall) {
        this.curSpeed = 0;
        this.getComponent(sp.Skeleton).setAnimation(0, "step_6", false);
      }
    }
  };
  _ctor.prototype.changeSpeed = function (e) {
    if (this.curState != s.comeOn) {
      this.curSpeed = e;
      this.runSpeed = e;
      this.run();
    }
  };
  _ctor.prototype.runUpdate = function (e) {
    if (this.curState != s.run && this.stateTime > 0) {
      this.stateTime = this.stateTime - e;
      if (this.stateTime <= 0) {
        this.stateTime = 0;
        this.curSpeed = this.runSpeed;
        this.run();
      }
    }
  };
  _ctor.stateRandomList = [{
    s: s.run,
    pr: "50"
  }, {
    s: s.fast,
    pr: "15"
  }, {
    s: s.slow,
    pr: "15"
  }, {
    s: s.sleep,
    pr: "10"
  }, {
    s: s.fall,
    pr: "10"
  }];
  return _ref__ctor = __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_RaceAnimal;