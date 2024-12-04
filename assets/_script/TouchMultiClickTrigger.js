var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_SoundMgr = require("SoundMgr");
var r_TriggerActionMgr = require("TriggerActionMgr");
var r_TouchTriggerBase = require("TouchTriggerBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var def_TouchMultiClickTrigger = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.intervalTime = .2;
    t.clickNum = 2;
    t.singleClickActionId = "";
    t.triggerSound = "";
    t.curIndex = 0;
    t.touchTime = 0;
    t.num = 0;
    t.timeoutIndex = -1;
    t.dx = 0;
    t.dy = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onDragStart = function (t) {
    if (!this.checkHasNotClickKey()) {
      e.prototype.onDragStart.call(this, t);
      this.dx = t.getLocationX();
      this.dy = t.getLocationY();
    }
  };
  _ctor.prototype.onDragEnd = function (e) {
    var t = this;
    if (!(this.checkHasNotClickKey() || (this.dx = e.getLocationX() - this.dx, this.dy = e.getLocationY() - this.dy, this.dx * this.dx + this.dy * this.dy >= 16))) {
      var o = (new Date().getTime() - this.touchTime) / 1e3;
      if (0 == this.num || o < this.intervalTime) {
        this.num++;
        this.touchTime = new Date().getTime();
        if (this.num >= this.clickNum) {
          this.trigger();
          "" != this.triggerSound && r_SoundMgr.SoundMgr.playSound(this.triggerSound);
          return void this.finish();
        } else {
          return void (1 == this.num && this.clickNum > 1 && "" != this.singleClickActionId && (this.timeoutIndex = setTimeout(function () {
            r_TriggerActionMgr.TriggerActionMgr.trigger(t.singleClickActionId);
            "" != t.triggerSound && r_SoundMgr.SoundMgr.playSound(t.triggerSound);
            t.finish();
          }, 1e3 * this.intervalTime)));
        }
      }
      this.finish();
    }
  };
  _ctor.prototype.finish = function () {
    this.num = 0;
    -1 != this.timeoutIndex && clearTimeout(this.timeoutIndex);
  };
  __decorate([_property({
    displayName: "间隔时间"
  })], _ctor.prototype, "intervalTime", undefined);
  __decorate([_property({
    displayName: "点击次数"
  })], _ctor.prototype, "clickNum", undefined);
  __decorate([_property({
    displayName: "单击触发事件"
  })], _ctor.prototype, "singleClickActionId", undefined);
  __decorate([_property({
    displayName: "触发后的音效"
  })], _ctor.prototype, "triggerSound", undefined);
  return __decorate([_ccclass, _menu("Action/事件/多次点击事件")], _ctor);
}(r_TouchTriggerBase.default);
exports.default = def_TouchMultiClickTrigger;