var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_SoundMgr = require("SoundMgr");
var r_GameKeyMgr = require("GameKeyMgr");
var r_TriggerActionMgr = require("TriggerActionMgr");
var r_CheckHasKeys = require("CheckHasKeys");
var r_TouchTriggerBase = require("TouchTriggerBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var def_TouchScaleDisppearTrigger = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.scaleTime = .2;
    t.successSaveKey = "";
    t.successSound = "";
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onDragStart = function (t) {
    if (!this.checkHasNotClickKey()) {
      e.prototype.onDragStart.call(this, t);
      this.trigger();
    }
  };
  _ctor.prototype.trigger = function () {
    var e = this;
    if (r_CheckHasKeys.checkHasKeys(this.hasKey)) {
      cc.Tween.stopAllByTarget(this.node);
      cc.tween(this.node).to(this.scaleTime, {
        scale: 0
      }, {
        easing: cc.easing.smooth
      }).call(function () {
        "" != e.successSaveKey && r_GameKeyMgr.GameKeyMgr.add(e.successSaveKey);
        "" != e.successSound && r_SoundMgr.SoundMgr.playSound(e.successSound);
        r_TriggerActionMgr.TriggerActionMgr.trigger(e.successTriggerActionId);
      }).start();
    } else {
      r_TriggerActionMgr.TriggerActionMgr.trigger(this.failTriggerActionId);
    }
  };
  __decorate([_property({
    type: Number,
    displayName: "缩放时间"
  })], _ctor.prototype, "scaleTime", undefined);
  __decorate([_property({
    displayName: "成功后存储的key"
  })], _ctor.prototype, "successSaveKey", undefined);
  __decorate([_property({
    displayName: "成功音效"
  })], _ctor.prototype, "successSound", undefined);
  return __decorate([_ccclass, _menu("Action/事件/点击缩放后消失")], _ctor);
}(r_TouchTriggerBase.default);
exports.default = def_TouchScaleDisppearTrigger;