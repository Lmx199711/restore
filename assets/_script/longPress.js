var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_SoundMgr = require("SoundMgr");
var r_TriggerActionMgr = require("TriggerActionMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var def_longPress = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.triggerSound = "";
    t.action = "";
    t.timeMax = 0;
    t.tNumber = 1;
    t.time = 0;
    t.isTouch = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    var e = this;
    this.node.on(cc.Node.EventType.TOUCH_START, function () {
      0 != e.tNumber && (e.isTouch = true);
    }, this);
    this.node.on(cc.Node.EventType.TOUCH_END, function () {
      e.isTouch = false;
      e.time = 0;
    }, this);
    this.node.on(cc.Node.EventType.TOUCH_CANCEL, function () {
      e.isTouch = false;
      e.time = 0;
    }, this);
  };
  _ctor.prototype.update = function (e) {
    if (this.isTouch) {
      this.time += e;
      if (this.time >= this.timeMax) {
        r_TriggerActionMgr.TriggerActionMgr.trigger(this.action);
        r_SoundMgr.SoundMgr.playSound(this.triggerSound);
        this.isTouch = false;
        this.time = 0;
        -1 != this.tNumber && this.tNumber--;
      }
    }
  };
  __decorate([_property({
    displayName: "触发后的音效"
  })], _ctor.prototype, "triggerSound", undefined);
  __decorate([_property({
    type: String,
    displayName: "长按触发action"
  })], _ctor.prototype, "action", undefined);
  __decorate([_property({
    type: Number,
    displayName: "按下时间"
  })], _ctor.prototype, "timeMax", undefined);
  __decorate([_property({
    type: cc.Integer,
    displayName: "执行成功次数",
    tooltip: "-1为无限次"
  })], _ctor.prototype, "tNumber", undefined);
  return __decorate([_ccclass, _menu("Action/事件/长按")], _ctor);
}(cc.Component);
exports.default = def_longPress;