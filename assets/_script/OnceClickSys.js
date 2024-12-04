Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OnceClickSys = undefined;
var r_GameKeyMgr = require("GameKeyMgr");
var r_TYEventType = require("TYEventType");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_Index = require("Index");
var r_OnceClickCom = require("OnceClickCom");
var r_DecorateBehavior = require("DecorateBehavior");
var r_CommonFunc = require("CommonFunc");
var exp_OnceClickSys = function () {
  function _ctor() {}
  _ctor.prototype.onStart = function () {};
  _ctor.prototype.onDestroy = function () {};
  _ctor.prototype.onEnable = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.addTouchNode(this.entity.node);
    r_Index.App.inst.on(r_GameKeyMgr.EventType.ChangeKey, this.onChangeKey, this);
    this.entity.node.on(r_TYEventType.TYEventType.CLICK, this.onClick, this);
    this.entity.node.on(r_TYEventType.TYEventType.TOUCH_BEGIN, this.onTouchBegin, this);
    this.entity.node.on(r_TYEventType.TYEventType.TOUCH_END, this.onTouchEnd, this);
  };
  _ctor.prototype.onDisable = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.removeTouchNode(this.entity.node);
    r_Index.App.inst.off(r_GameKeyMgr.EventType.ChangeKey, this.onChangeKey, this);
    this.entity.node.off(r_TYEventType.TYEventType.CLICK, this.onClick, this);
    this.entity.node.off(r_TYEventType.TYEventType.TOUCH_BEGIN, this.onTouchBegin, this);
    this.entity.node.off(r_TYEventType.TYEventType.TOUCH_END, this.onTouchEnd, this);
    cc.Tween.stopAllByTarget(this.entity.node);
  };
  _ctor.prototype.onClick = function () {
    if (this.entity.canClick) {
      this.entity.canClick = false;
      this.entity.canTouchInfo.trigger("触发单次点击事件");
    }
  };
  _ctor.prototype.onChangeKey = function (e) {
    if (!this.entity.canClick) {
      var t = r_CommonFunc.stringKeyToArr(this.entity.resetNeedKeys);
      if (t && -1 != t.findIndex(function (t) {
        return t == e.data.key;
      })) {
        if (this.entity.isNeedAll) {
          var o = true;
          for (var i = 0; i < t.length; i++) {
            var a = t[i];
            if (!r_GameKeyMgr.GameKeyMgr.has(a)) {
              o = false;
              break;
            }
          }
          o && (this.entity.canClick = true);
        } else {
          this.entity.canClick = true;
        }
      }
    }
  };
  _ctor.prototype.onTouchBegin = function () {
    if (this.entity.isScaleTween && this.entity.canClick) {
      this.origScaleX = this.entity.node.scaleX;
      this.origScaleY = this.entity.node.scaleY;
      var e = this.entity.node.scaleX * this.entity.scaleRate;
      var t = this.entity.node.scaleY * this.entity.scaleRate;
      cc.tween(this.entity.node).to(this.entity.scaleDuration, {
        scaleX: e,
        scaleY: t
      }).start();
    }
  };
  _ctor.prototype.onTouchEnd = function () {
    this.entity.isScaleTween && this.entity.canClick && cc.tween(this.entity.node).to(this.entity.scaleDuration, {
      scaleX: this.origScaleX,
      scaleY: this.origScaleY
    }).start();
  };
  return __decorate([r_DecorateBehavior.bindEventCom(r_OnceClickCom.OnceClickCom)], _ctor);
}();
exports.OnceClickSys = exp_OnceClickSys;