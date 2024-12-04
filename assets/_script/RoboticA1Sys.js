var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoboticA1Sys = undefined;
var r_TYEventType = require("TYEventType");
var r_BehaviorMgr = require("BehaviorMgr");
var r_RoboticA1 = require("RoboticA1");
var r_DecorateBehavior = require("DecorateBehavior");
var r_RoboticBaseSys = require("RoboticBaseSys");
var exp_RoboticA1Sys = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.worldScale = new cc.Vec2(0, 0);
    t.isNeedCheck = false;
    t.rangeAABB = new cc.Vec4(0, 0, 0, 0);
    t.AABB = new cc.Vec4(0, 0, 0, 0);
    t.nodeAABB = new cc.Vec4(0, 0, 0, 0);
    t.oldzIndex = 0;
    t.oldSiblingIndex = 0;
    t.tWorldPos1 = new cc.Vec2(0, 0);
    t.tWorldPos2 = new cc.Vec2(0, 0);
    return t;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  _ctor.prototype.onStart = function () {
    this.refresgWorldScale();
    this.isNeedCheck = !!this.entity.limitN;
  };
  _ctor.prototype.onEnable = function () {
    this.initNode(this.entity.node);
    this.entity.node.on(r_TYEventType.TYEventType.TOUCH_BEGIN, this.onTouchBegin, this);
    this.entity.node.on(r_TYEventType.TYEventType.TOUCH_END, this.onTouchEnd, this);
    this.entity.node.on(r_TYEventType.TYEventType.DRAG_MOVE, this.onDragMove, this);
  };
  _ctor.prototype.onUpdate = function (e) {
    if (e > 1) {
      console.log("出现超长帧,屏蔽掉");
    } else {
      this.UpdateFlag && this.MoveUpdate();
    }
  };
  _ctor.prototype.onTouchBegin = function (t) {
    this.startPos = this.entity.node.worldPosition;
    this.refresgWorldScale();
    this.touchBeginPos = t.getLocation();
    if (this.CanHand()) {
      this.isTouchBeginGood = true;
      this.isNeedCheck && this.computeAABB();
      e.prototype.TouchIn.call(this);
    } else {
      this.isTouchBeginGood = false;
    }
  };
  _ctor.prototype.computeAABB = function () {
    this.tWorldPos1 = this.entity.limitN.convertToWorldSpaceAR(cc.Vec2.ZERO);
    switch (this.entity.limitCheckType) {
      case r_RoboticA1.CHECK_LIMIT_TYPE.图形边缘:
        this.rangeAABB.x = this.tWorldPos1.y + (1 - this.entity.limitN.getAnchorPoint().y) * this.entity.limitN.height - (1 - this.entity.node.getAnchorPoint().y) * this.entity.node.height;
        this.rangeAABB.y = this.tWorldPos1.y - this.entity.limitN.getAnchorPoint().y * this.entity.limitN.height + this.entity.node.getAnchorPoint().y * this.entity.node.height;
        this.rangeAABB.z = this.tWorldPos1.x - this.entity.limitN.getAnchorPoint().x * this.entity.limitN.width + this.entity.node.getAnchorPoint().x * this.entity.node.width;
        this.rangeAABB.w = this.tWorldPos1.x + (1 - this.entity.limitN.getAnchorPoint().x) * this.entity.limitN.width - (1 - this.entity.node.getAnchorPoint().x) * this.entity.node.width;
    }
  };
  _ctor.prototype.onDragMove = function (e) {
    if (this.isTouchBeginGood && this.IsMoveType()) {
      var t = [true, true];
      var o = {
        x: 0,
        y: 0
      };
      this.isNeedCheck && (t = this.handleMoveHeft(e));
      if (t[0] && this.CanMoveX()) {
        this.entity.node.x += e.getDeltaX() / this.worldScale.x;
        o.x = e.getDeltaX();
      }
      if (t[1] && this.CanMoveY()) {
        this.entity.node.y += e.getDeltaY() / this.worldScale.y;
        o.y = e.getDeltaY();
      }
      this.MoveUpdate(o);
    }
  };
  _ctor.prototype.onTouchEnd = function (t) {
    var i = this;
    var n = t.getLocation();
    var a = n.sub(this.touchBeginPos).len();
    if (this.entityBase.isClick && this.CanClick() && a < this.entityBase.clickRange) {
      this.entity.node.x = this.beginPos.x;
      this.entity.node.y = this.beginPos.y;
      r_BehaviorMgr.BehaviorMgr.KeyToAction(this.entityBase.clickNeedKey, this.entityBase.clickActionId);
      this.TouchEndPos(n);
    } else {
      if (!this.isTouchBeginGood) {
        return;
      }
      if (!this.CanHand()) {
        return;
      }
      var c = _ref__ctor.specialVec;
      if (this.CheckDist(n, c, this.entityBase.handActionId)) {
        if (this.IsWipeType()) {
          this.entity.node.parent.convertToNodeSpaceAR(c, c);
          this.UpdateFlag = true;
          var l = this.tweenObj(c);
          cc.tween(this.entity.node).to(.2, l).call(function () {
            i.UpdateFlag = false;
          }).start();
        } else {
          this.IsMoveType() && (c.equals(_ref__ctor.specialVec) || (this.entity.node.parent.convertToNodeSpaceAR(c, c), this.entity.node.x = c.x, this.entity.node.y = c.y));
        }
      } else if (this.IsMoveType()) {
        this.entity.node.x = this.beginPos.x;
        this.entity.node.y = this.beginPos.y;
      }
    }
    e.prototype.TouchOut.call(this);
    this.entity.node.emit(r_TYEventType.TYEventType.RoboticMoment.ROBOTIC_TOUCH_END);
  };
  _ctor.prototype.onDisable = function () {};
  _ctor.prototype.onDestroy = function () {
    this.entity.node.off(r_TYEventType.TYEventType.TOUCH_BEGIN, this.onTouchBegin, this);
    this.entity.node.off(r_TYEventType.TYEventType.TOUCH_END, this.onTouchEnd, this);
    this.entity.node.off(r_TYEventType.TYEventType.DRAG_MOVE, this.onDragMove, this);
  };
  _ctor.prototype.tweenObj = function (e) {
    var t = {};
    this.CanMoveX() && (t.x = this.clampV2(e.x));
    this.CanMoveY() && (t.y = this.clampV2(e.y));
    return t;
  };
  _ctor.prototype.clampV2 = function (e) {
    switch (this.entity.limitCheckType) {
      case r_RoboticA1.CHECK_LIMIT_TYPE.图形边缘:
    }
    return e;
  };
  _ctor.prototype.handleMoveHeft = function (e) {
    var t = [true, true];
    this.tWorldPos2 = this.entity.node.convertToWorldSpaceAR(cc.Vec2.ZERO);
    this.AABB.x = this.tWorldPos2.y + e.getDeltaY() / this.worldScale.y;
    this.AABB.y = this.tWorldPos2.y + e.getDeltaY() / this.worldScale.y;
    this.AABB.z = this.tWorldPos2.x + e.getDeltaX() / this.worldScale.x;
    this.AABB.w = this.tWorldPos2.x + e.getDeltaX() / this.worldScale.x;
    switch (this.entity.limitCheckType) {
      case r_RoboticA1.CHECK_LIMIT_TYPE.图形边缘:
        if (e.getDeltaX() < 0) {
          this.AABB.z <= this.rangeAABB.z && (t[0] = false);
        } else {
          this.AABB.w >= this.rangeAABB.w && (t[0] = false);
        }
        if (e.getDeltaY() > 0) {
          this.AABB.x >= this.rangeAABB.x && (t[1] = false);
        } else {
          this.AABB.y <= this.rangeAABB.y && (t[1] = false);
        }
        break;
      case r_RoboticA1.CHECK_LIMIT_TYPE.轴心:
      case r_RoboticA1.CHECK_LIMIT_TYPE.鼠标指针:
    }
    return t;
  };
  _ctor.specialVec = new cc.Vec2(-.1, 1.9);
  return _ref__ctor = __decorate([r_DecorateBehavior.bindEventCom(r_RoboticA1.RoboticA1)], _ctor);
}(r_RoboticBaseSys.default);
exports.RoboticA1Sys = exp_RoboticA1Sys;