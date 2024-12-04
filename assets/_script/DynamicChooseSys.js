Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DynamicChooseSys = undefined;
var r_DynamicChooseCom = require("DynamicChooseCom");
var r_DecorateBehavior = require("DecorateBehavior");
var r_GameKeyMgr = require("GameKeyMgr");
var r_TYEventType = require("TYEventType");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_CommonFunc = require("CommonFunc");
var r_Index = require("Index");
var exp_DynamicChooseSys = function () {
  function _ctor() {
    this.nextDis = 0;
    this.lastTargetNodeIndex = 0;
    this.curTargetNodeIndex = 0;
    this.pointerMoveDirection = cc.v2();
    this.sumDis = 0;
    this.tempVec2 = cc.v2();
  }
  _ctor.prototype.onStart = function () {
    this.entity.moveTargetNodes.length > 0 && this.entity.pointerNode.setPosition(this.entity.moveTargetNodes[0].position);
    this.sumDis = 0;
    this.lastTargetNodeIndex = 0;
    this.curTargetNodeIndex = 1;
    var e = this.entity.moveTargetNodes[this.curTargetNodeIndex];
    if (e) {
      var t = this.entity.moveTargetNodes[0].convertToWorldSpaceAR(cc.Vec2.ZERO);
      var o = e.convertToWorldSpaceAR(cc.Vec2.ZERO);
      this.nextDis = cc.Vec2.distance(t, o);
      this.pointerMoveDirection = o.subtract(t);
      this.pointerMoveDirection.normalizeSelf();
    }
  };
  _ctor.prototype.onDestroy = function () {};
  _ctor.prototype.onEnable = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.addTouchNode(this.entity.clickNode);
    r_Index.App.inst.on(r_GameKeyMgr.EventType.ChangeKey, this.onChangeKey, this);
    this.entity.clickNode.on(r_TYEventType.TYEventType.CLICK, this.onClick, this);
    this.entity.clickNode.on(r_TYEventType.TYEventType.TOUCH_BEGIN, this.onTouchBegin, this);
    this.entity.clickNode.on(r_TYEventType.TYEventType.TOUCH_END, this.onTouchEnd, this);
  };
  _ctor.prototype.onDisable = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.removeTouchNode(this.entity.clickNode);
    r_Index.App.inst.off(r_GameKeyMgr.EventType.ChangeKey, this.onChangeKey, this);
    this.entity.clickNode.off(r_TYEventType.TYEventType.CLICK, this.onClick, this);
    this.entity.clickNode.off(r_TYEventType.TYEventType.TOUCH_BEGIN, this.onTouchBegin, this);
    this.entity.clickNode.off(r_TYEventType.TYEventType.TOUCH_END, this.onTouchEnd, this);
    cc.Tween.stopAllByTarget(this.entity.clickNode);
  };
  _ctor.prototype.onUpdate = function (e) {
    if (!(e > .5 || this.nextDis <= 0 || !this.entity.canClick || this.entity.dynamicChooseInfosIndex >= this.entity.dynamicChooseInfos.length)) {
      var t = this.entity.pointerMoveSpeed * e;
      this.sumDis += t;
      if (this.sumDis >= this.nextDis) {
        this.changeTargetNode();
      } else {
        this.pointerMoveDirection.mul(t, this.tempVec2);
        this.entity.pointerNode.convertToWorldSpaceAR(cc.Vec2.ZERO).add(this.tempVec2, this.tempVec2);
        this.entity.pointerNode.parent.convertToNodeSpaceAR(this.tempVec2, this.tempVec2);
        this.entity.pointerNode.setPosition(this.tempVec2);
      }
    }
  };
  _ctor.prototype.changeTargetNode = function () {
    this.sumDis = this.sumDis - this.nextDis;
    this.lastTargetNodeIndex = this.curTargetNodeIndex;
    this.curTargetNodeIndex++;
    this.curTargetNodeIndex >= this.entity.moveTargetNodes.length && (this.curTargetNodeIndex = 0);
    var e = this.entity.moveTargetNodes[this.curTargetNodeIndex];
    if (e) {
      var t = this.entity.moveTargetNodes[this.lastTargetNodeIndex].convertToWorldSpaceAR(cc.Vec2.ZERO);
      var o = e.convertToWorldSpaceAR(cc.Vec2.ZERO);
      this.nextDis = cc.Vec2.distance(t, o);
      this.pointerMoveDirection = o.subtract(t);
      this.pointerMoveDirection.normalizeSelf();
    }
    this.pointerMoveDirection.mul(this.sumDis, this.tempVec2);
    this.entity.moveTargetNodes[this.lastTargetNodeIndex].convertToWorldSpaceAR(cc.Vec2.ZERO).add(this.tempVec2, this.tempVec2);
    this.entity.pointerNode.parent.convertToNodeSpaceAR(this.tempVec2, this.tempVec2);
    this.entity.pointerNode.setPosition(this.tempVec2);
  };
  _ctor.prototype.onClick = function () {
    if (this.entity.canClick && this.entity.dynamicChooseInfosIndex < this.entity.dynamicChooseInfos.length) {
      var e = this.entity.dynamicChooseInfos[this.entity.dynamicChooseInfosIndex];
      for (var t = 0; t < e.selectItems.length; t++) {
        var o = e.selectItems[t];
        if (r_CommonFunc.checkNodeOverOtherNode(this.entity.pointerNode, o.collideNode)) {
          console.log("选中了索引值为：", t, "选择信息索引", this.entity.dynamicChooseInfosIndex);
          this.entity.dynamicChooseInfosIndex++;
          this.entity.canClick = false;
          o.selectedBehaviors.execute();
        }
      }
    }
    this.entity.clickBehaviors && this.entity.clickBehaviors.execute();
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
            var n = t[i];
            if (!r_GameKeyMgr.GameKeyMgr.has(n)) {
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
      this.entity.clickNodeorigScaleX = this.entity.clickNode.scaleX;
      this.entity.clickNodeorigScaleY = this.entity.clickNode.scaleY;
      var e = this.entity.clickNode.scaleX * this.entity.scaleRate;
      var t = this.entity.clickNode.scaleY * this.entity.scaleRate;
      cc.tween(this.entity.clickNode).to(this.entity.scaleDuration, {
        scaleX: e,
        scaleY: t
      }).start();
    }
  };
  _ctor.prototype.onTouchEnd = function () {
    this.entity.isScaleTween && this.entity.canClick && cc.tween(this.entity.clickNode).to(this.entity.scaleDuration, {
      scaleX: this.entity.clickNodeorigScaleX,
      scaleY: this.entity.clickNodeorigScaleY
    }).start();
  };
  return __decorate([r_DecorateBehavior.bindEventCom(r_DynamicChooseCom.DynamicChooseCom)], _ctor);
}();
exports.DynamicChooseSys = exp_DynamicChooseSys;