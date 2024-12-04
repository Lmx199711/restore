var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SliderDirection = undefined;
var s;
var r_GameKeyMgr = require("GameKeyMgr");
var r_BehaviorMgr = require("BehaviorMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
(function (e) {
  e[e.None = 0] = "None";
  e[e.Up = 1] = "Up";
  e[e.Right = 2] = "Right";
  e[e.Down = 3] = "Down";
  e[e.Left = 4] = "Left";
})(s = exports.SliderDirection || (exports.SliderDirection = {}));
var def_CheckSliderDirection = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.default1 = "滑动检测是否朝某个方向";
    t.checkKey = "";
    t.sliderDis = 30;
    t.currCheckDire = s.Up;
    t.sliderActionId = "";
    t.touchStartPos = cc.v2(0, 0);
    t.touchEndPos = cc.v2(0, 0);
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onEnable = function () {
    var e = this;
    this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchBegin, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    this.node.on(cc.Node.EventType.TOUCH_CANCEL, function (t) {
      cc.log("@@@@@@cancel");
      e.onTouchEnd(t);
    });
  };
  _ctor.prototype.onTouchBegin = function (e) {
    this.touchStartPos = e.getLocation();
  };
  _ctor.prototype.onTouchEnd = function (e) {
    this.touchEndPos = e.getLocation();
    this.check();
  };
  _ctor.prototype.check = function () {
    s.None;
    if ((r_GameKeyMgr.GameKeyMgr.has(this.checkKey) || "" == this.checkKey) && this.currCheckDire != s.None && Math.abs(this.touchStartPos.sub(this.touchEndPos).mag()) >= this.sliderDis) {
      var e = this.touchEndPos.x - this.touchStartPos.x;
      var t = this.touchEndPos.y - this.touchStartPos.y;
      (Math.abs(e) >= Math.abs(t) ? e >= 0 ? s.Right : s.Left : t >= 0 ? s.Up : s.Down) == this.currCheckDire && r_BehaviorMgr.BehaviorMgr.trigger(this.sliderActionId);
    }
  };
  __decorate([_property({
    displayName: "检测滑动方向",
    readonly: true
  })], _ctor.prototype, "default1", undefined);
  __decorate([_property({
    displayName: "前提key"
  })], _ctor.prototype, "checkKey", undefined);
  __decorate([_property({
    displayName: "滑动最小距离"
  })], _ctor.prototype, "sliderDis", undefined);
  __decorate([_property({
    displayName: "检测移动方向",
    type: cc.Enum(s)
  })], _ctor.prototype, "currCheckDire", undefined);
  __decorate([_property({
    displayName: "检测成功执行id"
  })], _ctor.prototype, "sliderActionId", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_CheckSliderDirection;