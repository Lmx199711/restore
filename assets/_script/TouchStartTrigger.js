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
var def_TouchStartTrigger = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.triggerSound = "";
    t.actionsList = [];
    t.curIndex = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onDragStart = function (t) {
    if (!this.checkHasNotClickKey()) {
      e.prototype.onDragStart.call(this, t);
      if (this.actionsList.length > 0) {
        if (!this.actionsList[this.curIndex]) {
          return;
        }
        r_TriggerActionMgr.TriggerActionMgr.trigger(this.actionsList[this.curIndex]);
        "" != this.triggerSound && r_SoundMgr.SoundMgr.playSound(this.triggerSound);
        this.curIndex = this.curIndex + 1;
      } else {
        this.trigger();
        "" != this.triggerSound && r_SoundMgr.SoundMgr.playSound(this.triggerSound);
      }
    }
  };
  __decorate([_property({
    displayName: "触发后的音效"
  })], _ctor.prototype, "triggerSound", undefined);
  __decorate([_property({
    type: String,
    displayName: "点击触发列表"
  })], _ctor.prototype, "actionsList", undefined);
  return __decorate([_ccclass, _menu("Action/事件/点击事件,该事件可以触发失败")], _ctor);
}(r_TouchTriggerBase.default);
exports.default = def_TouchStartTrigger;