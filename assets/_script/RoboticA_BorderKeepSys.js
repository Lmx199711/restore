var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoboticA_BorderKeepSys = undefined;
var r_TYEventType = require("TYEventType");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_BehaviorMgr = require("BehaviorMgr");
var r_RoboticA_BorderKeep = require("RoboticA_BorderKeep");
var r_DecorateBehavior = require("DecorateBehavior");
var r_RoboticBaseSys = require("RoboticBaseSys");
var exp_RoboticA_BorderKeepSys = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.isNeedCheck = false;
    t.rangeAABB = new cc.Vec4(0, 0, 0, 0);
    t.AABB = new cc.Vec4(0, 0, 0, 0);
    t.tWorldPos1 = new cc.Vec2(0, 0);
    t.tWorldPos2 = new cc.Vec2(0, 0);
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onStart = function () {
    this.refresgWorldScale();
    this.isNeedCheck = !!this.entity.limitN;
  };
  _ctor.prototype.onEnable = function () {
    if (this.entity.isUseLimitWindow) {
      this.initNode(this.entity.node, false);
      r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.addTouchNode(this.entity.limitN);
      this.entity.limitN.on(r_TYEventType.TYEventType.TOUCH_BEGIN, this.onTouchBegin, this);
      this.entity.limitN.on(r_TYEventType.TYEventType.TOUCH_END, this.onTouchEnd, this);
      this.entity.limitN.on(r_TYEventType.TYEventType.DRAG_MOVE, this.onDragMove, this);
    } else {
      this.initNode(this.entity.node);
      this.entity.node.on(r_TYEventType.TYEventType.TOUCH_BEGIN, this.onTouchBegin, this);
      this.entity.node.on(r_TYEventType.TYEventType.TOUCH_END, this.onTouchEnd, this);
      this.entity.node.on(r_TYEventType.TYEventType.DRAG_MOVE, this.onDragMove, this);
    }
  };
  _ctor.prototype.onUpdate = function () {};
  _ctor.prototype.onTouchBegin = function (e) {
    this.startPos = this.entity.node.worldPosition;
    this.refresgWorldScale();
    this.touchBeginPos = e.getLocation();
    if (this.CanHand()) {
      this.isTouchBeginGood = true;
      if (this.isNeedCheck) {
        this.tWorldPos1 = this.entity.limitN.convertToWorldSpaceAR(cc.Vec2.ZERO);
        this.rangeAABB.x = this.tWorldPos1.y + (1 - this.entity.limitN.getAnchorPoint().y) * this.entity.limitN.height;
        this.rangeAABB.y = this.tWorldPos1.y - this.entity.limitN.getAnchorPoint().y * this.entity.limitN.height;
        this.rangeAABB.z = this.tWorldPos1.x - this.entity.limitN.getAnchorPoint().x * this.entity.limitN.width;
        this.rangeAABB.w = this.tWorldPos1.x + (1 - this.entity.limitN.getAnchorPoint().x) * this.entity.limitN.width;
      }
    } else {
      this.isTouchBeginGood = false;
    }
  };
  _ctor.prototype.onDragMove = function (e) {
    var t = [true, true];
    var o = {
      x: 0,
      y: 0
    };
    this.isNeedCheck && (t = this.handleMoveHeft(e));
    if (t[0] && this.CanMoveX()) {
      this.entity.node.x += e.getDeltaX() / this.worldScale.x;
      o.x = e.getDeltaX() / this.worldScale.x;
    }
    if (t[1] && this.CanMoveY()) {
      this.entity.node.y += e.getDeltaY() / this.worldScale.y;
      o.y = e.getDeltaY() / this.worldScale.y;
    }
    this.MoveUpdate(o);
  };
  _ctor.prototype.handleMoveHeft = function (e) {
    var t = [true, true];
    this.tWorldPos2 = this.entity.node.convertToWorldSpaceAR(cc.Vec2.ZERO);
    this.AABB.x = this.tWorldPos2.y + (1 - this.entity.node.getAnchorPoint().y) * this.entity.node.height * this.worldScale.y * this.entity.node.scaleY + e.getDeltaY() / this.worldScale.y;
    this.AABB.y = this.tWorldPos2.y - this.entity.node.getAnchorPoint().y * this.entity.node.height * this.worldScale.y * this.entity.node.scaleY + e.getDeltaY() / this.worldScale.y;
    this.AABB.z = this.tWorldPos2.x - this.entity.node.getAnchorPoint().x * this.entity.node.width * this.worldScale.x * this.entity.node.scaleX + e.getDeltaX() / this.worldScale.x;
    this.AABB.w = this.tWorldPos2.x + (1 - this.entity.node.getAnchorPoint().x) * this.entity.node.width * this.worldScale.x * this.entity.node.scaleX + e.getDeltaX() / this.worldScale.x;
    if (e.getDeltaX() < 0) {
      this.AABB.w <= this.rangeAABB.w && (t[0] = false);
    } else {
      this.AABB.z >= this.rangeAABB.z && (t[0] = false);
    }
    if (e.getDeltaY() < 0) {
      this.AABB.x <= this.rangeAABB.x && (t[1] = false);
    } else {
      this.AABB.y >= this.rangeAABB.y && (t[1] = false);
    }
    return t;
  };
  _ctor.prototype.onTouchEnd = function (e) {
    if (this.isTouchBeginGood) {
      var t = e.getLocation();
      var o = t.sub(this.touchBeginPos).len();
      if (this.entityBase.isClick && this.CanClick() && o < this.entityBase.clickRange) {
        r_BehaviorMgr.BehaviorMgr.KeyToAction(this.entityBase.clickNeedKey, this.entityBase.clickActionId);
        this.TouchEndPos(t);
      }
    }
  };
  _ctor.prototype.onDisable = function () {};
  _ctor.prototype.onDestroy = function () {};
  return __decorate([r_DecorateBehavior.bindEventCom(r_RoboticA_BorderKeep.RoboticA_BorderKeep)], _ctor);
}(r_RoboticBaseSys.default);
exports.RoboticA_BorderKeepSys = exp_RoboticA_BorderKeepSys;