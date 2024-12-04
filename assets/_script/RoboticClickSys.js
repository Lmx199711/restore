var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoboticClickSys = undefined;
var r_TYEventType = require("TYEventType");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_BehaviorMgr = require("BehaviorMgr");
var r_RoboticClick = require("RoboticClick");
var r_DecorateBehavior = require("DecorateBehavior");
var r_RoboticBaseSys = require("RoboticBaseSys");
var exp_RoboticClickSys = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.isCoolDown = true;
    t._coolTimer = 0;
    t.isOnceClick = false;
    t.clickCount = 0;
    t.clickTime = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onStart = function () {
    this.isOnceClick = this.entity.coolTime < 0;
  };
  _ctor.prototype.onUpdate = function (e) {
    if (this.UpdateFlag) {
      this._coolTimer += e;
      this.isOnceClick || this.entity && this._coolTimer > this.entity.coolTime / 1e3 && (this.UpdateFlag = false, this.isCoolDown = true, this._coolTimer = 0);
    }
  };
  _ctor.prototype.onEnable = function () {
    this.initNode(this.entity.node);
    this.entity.node.on(r_TYEventType.TYEventType.TOUCH_END, this.onTouchEnd, this);
  };
  _ctor.prototype.onTouchEnd = function () {
    if (this.isCoolDown) {
      if (this.entity.isMultiClick) {
        Date.now() - this.clickTime > 500 && (this.clickCount = 0);
        this.clickTime = Date.now();
        this.clickCount++;
        if (this.clickCount < this.entity.clickNum) {
          return;
        }
        this.clickCount = 0;
        this.clickTime = 0;
      }
      if (this.isCoolDown && this.entityBase.isClick && this.CanClick()) {
        this.isCoolDown = false;
        if (r_BehaviorMgr.BehaviorMgr.KeyToAction(this.entityBase.clickNeedKey, this.entityBase.clickActionId)) {
          this.entity.isAutoHide && r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.removeTouchNode(this.entity.node);
          this.entity.isHideNode && (this.entity.node.active = false);
        }
        this.UpdateFlag = true;
      }
    }
  };
  _ctor.prototype.onDisable = function () {};
  _ctor.prototype.onDestroy = function () {
    this.entity.node.off(r_TYEventType.TYEventType.TOUCH_END, this.onTouchEnd, this);
  };
  return __decorate([r_DecorateBehavior.bindEventCom(r_RoboticClick.RoboticClick)], _ctor);
}(r_RoboticBaseSys.default);
exports.RoboticClickSys = exp_RoboticClickSys;