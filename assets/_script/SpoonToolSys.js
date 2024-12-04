Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpoonToolSys = undefined;
var r_TYEventType = require("TYEventType");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_SpoonToolCom = require("SpoonToolCom");
var r_DecorateBehavior = require("DecorateBehavior");
var r_CommonFunc = require("CommonFunc");
var exp_SpoonToolSys = function () {
  function _ctor() {}
  _ctor.prototype.onStart = function () {};
  _ctor.prototype.onDestroy = function () {};
  _ctor.prototype.onEnable = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.addTouchNode(this.entity.node);
    this.entity.node.on(r_TYEventType.TYEventType.ToolEvent.TOOl_DRAG_MOVE, this.onToolsMove, this);
    this.entity.node.on(r_TYEventType.TYEventType.ToolEvent.TOOL_DRAG_TOUCH_END, this.onTouchEnd, this);
  };
  _ctor.prototype.onDisable = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.removeTouchNode(this.entity.node);
    this.entity.node.off(r_TYEventType.TYEventType.ToolEvent.TOOl_DRAG_MOVE, this.onToolsMove, this);
    this.entity.node.off(r_TYEventType.TYEventType.ToolEvent.TOOL_DRAG_TOUCH_END, this.onTouchEnd, this);
  };
  _ctor.prototype.onUpdate = function () {};
  _ctor.prototype.onToolsMove = function () {
    var e;
    var t;
    var o;
    var i;
    var n;
    var a;
    var s;
    var r;
    if (!(this.entity.curIndex >= this.entity.scoopInfos.length)) {
      if (this.entity.isScooping) {
        if (this.entity.checkNode) {
          if (r_CommonFunc.checkNodeOverOtherNode(this.entity.checkNode, this.entity.scoopInfos[this.entity.curIndex].endScoopNode)) {
            console.log("碰撞到勺放下节点");
            null === (e = this.entity.scoopInfos[this.entity.curIndex].endScoopBehaviors) || undefined === e || e.execute();
            null === (t = this.entity.endScoopBehaviors) || undefined === t || t.execute();
            this.entity.curIndex++;
            this.entity.isScooping = false;
          }
        } else if (r_CommonFunc.checkNodeOverOtherNode(this.entity.node, this.entity.scoopInfos[this.entity.curIndex].endScoopNode)) {
          console.log("碰撞到勺放下节点");
          null === (o = this.entity.scoopInfos[this.entity.curIndex].endScoopBehaviors) || undefined === o || o.execute();
          null === (i = this.entity.endScoopBehaviors) || undefined === i || i.execute();
          this.entity.curIndex++;
          this.entity.isScooping = false;
        }
      } else if (this.entity.checkNode) {
        if (r_CommonFunc.checkNodeOverOtherNode(this.entity.checkNode, this.entity.scoopInfos[this.entity.curIndex].startScoopNode)) {
          console.log("碰撞到勺起节点");
          null === (n = this.entity.scoopInfos[this.entity.curIndex].startScoopBehaviors) || undefined === n || n.execute();
          this.entity.isScooping = true;
          null === (a = this.entity.startScoopBehaviors) || undefined === a || a.execute();
        }
      } else if (r_CommonFunc.checkNodeOverOtherNode(this.entity.node, this.entity.scoopInfos[this.entity.curIndex].startScoopNode)) {
        console.log("碰撞到勺起节点");
        null === (s = this.entity.scoopInfos[this.entity.curIndex].startScoopBehaviors) || undefined === s || s.execute();
        this.entity.isScooping = true;
        null === (r = this.entity.startScoopBehaviors) || undefined === r || r.execute();
      }
    }
  };
  _ctor.prototype.onTouchEnd = function () {
    var e;
    if (this.entity.curIndex >= this.entity.scoopInfos.length) {
      this.entity.finishBehaviors.execute();
    } else if (this.entity.isScooping) {
      this.entity.isScooping = false;
      null === (e = this.entity.scoopInfos[this.entity.curIndex].revertBehaviors) || undefined === e || e.execute();
    }
  };
  return __decorate([r_DecorateBehavior.bindEventCom(r_SpoonToolCom.SpoonToolCom)], _ctor);
}();
exports.SpoonToolSys = exp_SpoonToolSys;