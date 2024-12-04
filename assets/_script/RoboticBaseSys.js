Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_RoboticCom = require("RoboticCom");
var r_Ex_LockAxis = require("Ex_LockAxis");
var r_ExAB_Update = require("ExAB_Update");
var r_CommonFunc = require("CommonFunc");
var r_ExAB_CheckDist = require("ExAB_CheckDist");
var r_ExAB_EndPos = require("ExAB_EndPos");
var r_BehaviorMgr = require("BehaviorMgr");
var def_RoboticBaseSys = function () {
  function _ctor() {
    this.worldScale = new cc.Vec2(0, 0);
    this._updateFlag = false;
    this.beginPos = new cc.Vec2(0, 0);
    this.isTouchBeginGood = true;
    this.entityBase = null;
    this.isUpLayer = false;
    this.checkDistResult = false;
    this._startLayerIndex = 0;
  }
  Object.defineProperty(_ctor.prototype, "UpdateFlag", {
    get: function () {
      return this._updateFlag;
    },
    set: function (e) {
      this._updateFlag = e;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.initNode = function (e, t) {
    var o;
    var r;
    undefined === t && (t = true);
    this.entityNode = e;
    t && r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.addTouchNode(this.entityNode);
    this.Ex_LockAxis = this.entityNode.getComponent(r_Ex_LockAxis.default);
    this.Ex_CheckDist = this.entityNode.getComponent(r_ExAB_CheckDist.ExAB_CheckDist);
    this.Ex_LockUpdate = this.entityNode.getComponent(r_ExAB_Update.ExAB_Update);
    null === (o = this.Ex_LockUpdate) || undefined === o || o.initCom();
    this.Ex_EndPos = this.entityNode.getComponent(r_ExAB_EndPos.ExAB_EndPos);
    null === (r = this.Ex_EndPos) || undefined === r || r.initCom();
    this.entityBase = this.entityNode.getComponent(r_RoboticCom.RoboticCom);
    this.handType = this.entityBase.handType;
    this.isUpLayer = this.entityBase.isUpLayer;
  };
  _ctor.prototype.TouchIn = function () {
    this.beginPos.x = this.entityNode.x;
    this.beginPos.y = this.entityNode.y;
    if (this.IsMoveType() && this.isUpLayer) {
      this._startLayerIndex = this.entityNode.getSiblingIndex();
      this.entityNode.setSiblingIndex(999);
    }
    r_BehaviorMgr.BehaviorMgr.triggerActions(this.entityBase.startTouchActionId);
  };
  _ctor.prototype.refresgWorldScale = function () {
    this.entityNode.getWorldScale(this.worldScale);
    this.worldScale.x /= this.entityNode.scaleX;
    this.worldScale.y /= this.entityNode.scaleY;
  };
  _ctor.prototype.IsMoveType = function () {
    return this.handType == r_RoboticCom.ROBOTIC_HAND_TYPE.拖动;
  };
  _ctor.prototype.IsWipeType = function () {
    return this.handType == r_RoboticCom.ROBOTIC_HAND_TYPE.滑动;
  };
  _ctor.prototype.CanClick = function () {
    return r_CommonFunc.chekHasStringKeys(this.entityBase.clickNeedKey);
  };
  _ctor.prototype.CanHand = function () {
    return r_CommonFunc.chekHasStringKeys(this.entityBase.handNeedKey);
  };
  _ctor.prototype.CanMoveX = function () {
    return !(!this.CanHand() || this.Ex_LockAxis && this.Ex_LockAxis.moveDir != r_Ex_LockAxis.AXIS_TYPE.x轴);
  };
  _ctor.prototype.CanMoveY = function () {
    return !(!this.CanHand() || this.Ex_LockAxis && this.Ex_LockAxis.moveDir != r_Ex_LockAxis.AXIS_TYPE.y轴);
  };
  _ctor.prototype.MoveUpdate = function (e) {
    this.Ex_LockUpdate && this.Ex_LockUpdate.moveUpdate(e);
  };
  _ctor.prototype.CheckDist = function (e, t, o) {
    return !this.CanHand() || !this.Ex_CheckDist || this.Ex_CheckDist.checkDist(this.beginPos, e, t, o);
  };
  _ctor.prototype.TouchOut = function () {
    this.IsMoveType() && this.isUpLayer && this.entityNode.setSiblingIndex(this._startLayerIndex);
    r_BehaviorMgr.BehaviorMgr.triggerActions(this.entityBase.endTouchActionId);
  };
  _ctor.prototype.TouchEndPos = function (e) {
    this.Ex_EndPos && this.Ex_EndPos.checkEndPos(e);
  };
  return _ctor;
}();
exports.default = def_RoboticBaseSys;