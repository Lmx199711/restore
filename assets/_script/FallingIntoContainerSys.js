Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FallingIntoContainerSys = undefined;
var n;
var r_TYEventType = require("TYEventType");
var r_DecorateBehavior = require("DecorateBehavior");
var r_FallingIntoContainerCom = require("FallingIntoContainerCom");
var r_CommonFunc = require("CommonFunc");
(function (e) {
  e[e.More = 0] = "More";
  e[e.Less = 1] = "Less";
  e[e.Equal = 2] = "Equal";
})(n || (n = {}));
var exp_FallingIntoContainerSys = function () {
  function _ctor() {
    this.curFinish = 0;
    this.haveGet = 0;
    this.allTrigger = false;
    this.isOverFlow = n.Equal;
    this.triggerLen = 0;
    this.conLen = 0;
    this.triggerFlag = [];
    this.finish = false;
    this.isEnter = false;
    this.curPos = new cc.Vec2();
    this.oriPos = new cc.Vec2();
  }
  _ctor.prototype.onDestroy = function () {};
  _ctor.prototype.onEnable = function () {
    this.entity.node.on(r_TYEventType.TYEventType.ToolEvent.TOOl_DRAG_MOVE, this.onToolsMove, this);
    this.entity.node.on(r_TYEventType.TYEventType.ToolEvent.TOOL_DRAG_TOUCH_END, this.onTouchEnd, this);
    this.entity.node.on(r_TYEventType.TYEventType.ToolEvent.TOOl_DRAG_TRIGGER_ENTER, this.onToolEnter, this);
    this.entity.node.on(r_TYEventType.TYEventType.ToolEvent.TOOl_DRAG_TRIGGER_EXIT, this.onToolExit, this);
  };
  _ctor.prototype.onDisable = function () {
    this.entity.node.off(r_TYEventType.TYEventType.ToolEvent.TOOl_DRAG_MOVE, this.onToolsMove, this);
    this.entity.node.off(r_TYEventType.TYEventType.ToolEvent.TOOL_DRAG_TOUCH_END, this.onTouchEnd, this);
    this.entity.node.off(r_TYEventType.TYEventType.ToolEvent.TOOl_DRAG_TRIGGER_ENTER, this.onToolEnter, this);
    this.entity.node.off(r_TYEventType.TYEventType.ToolEvent.TOOl_DRAG_TRIGGER_EXIT, this.onToolExit, this);
  };
  _ctor.prototype.onStart = function () {
    this.finish = false;
    this.isEnter = false;
    this.triggerLen = this.entity.triggerNode.length;
    this.conLen = this.entity.containerNode.length;
    var e = this.triggerLen - this.conLen;
    this.isOverFlow = e > 0 ? n.More : e < 0 ? n.Less : n.Equal;
    this.triggerFlag.length = this.triggerLen;
    this.triggerFlag.fill(0);
    console.log(":triggerLen:" + this.triggerLen);
    this.oriPos.x = this.entity.containerRoot.x;
    this.oriPos.y = this.entity.containerRoot.y;
    this.entity.containerNode.forEach(function (e) {
      var t = e.getComponent(cc.Sprite);
      t && (t.enabled = false);
    });
  };
  _ctor.prototype.onUpdate = function (e) {
    for (var t = 0; t < this.triggerFlag.length; t++) {
      var o = this.entity.triggerNode[t];
      if (1 == this.triggerFlag[t]) {
        o.y -= this.entity.fallSpeed * e;
        if (r_CommonFunc.checkNodeOverOtherNode(o, this.entity.checkFallInContainerArea)) {
          this.fallFinish(t);
        } else if (o.convertToWorldSpaceAR(cc.Vec2.ZERO).y < this.entity.fallMinY) {
          if (this.entity.showWhenFallScreen) {
            this.fallFinish(t);
          } else {
            this.triggerFlag[t] = 2;
          }
        }
      }
    }
  };
  _ctor.prototype.onToolsMove = function () {
    for (var e = 0; e < this.triggerFlag.length; e++) {
      if (0 == this.triggerFlag[e] && r_CommonFunc.checkNodeOverOtherNode(this.entity.checkNode, this.entity.triggerNode[e])) {
        this.triggerFlag[e] = 1;
        this.entity.triggerNode[e].zIndex = this.entity.triggerNode[e].parent.childrenCount;
        this.entity.triggerBehavior.execute();
        break;
      }
    }
    this.convertPos();
    this.updatePos();
  };
  _ctor.prototype.onTouchEnd = function () {
    this.resetPos();
    if (!this.finish) {
      this.allTrigger = true;
      for (var e = 0; e < this.triggerFlag.length; e++) {
        this.allTrigger && (this.allTrigger = this.triggerFlag[e] > 0);
      }
      if (this.allTrigger) {
        this.entity.finishedBehaviors.execute();
        this.finish = true;
      }
    }
  };
  _ctor.prototype.onToolEnter = function () {
    this.isEnter = true;
    this.convertPos();
    this.updatePos();
  };
  _ctor.prototype.convertPos = function () {
    if (this.isEnter) {
      this.entity.followToolNode.convertToWorldSpaceAR(cc.Vec2.ZERO, this.curPos);
      this.curPos.y < this.entity.containerMinY && (this.curPos.y = this.entity.containerMinY);
      this.entity.containerRoot.parent.convertToNodeSpaceAR(this.curPos, this.curPos);
    }
  };
  _ctor.prototype.onToolExit = function () {
    this.resetPos();
  };
  _ctor.prototype.fallFinish = function (e) {
    var t;
    this.entity.triggerNode[e].active = false;
    if (this.entity.isOneByOne) {
      switch (this.isOverFlow) {
        case n.Less:
          this.entity.containerNode[e].active = true;
          t = this.entity.containerNode[e].getComponent(cc.Sprite);
          if (t) {
            t.enabled = true;
          }
          if (this.curFinish == this.triggerLen - 1) {
            for (var o = this.curFinish; o < this.conLen; o++) {
              this.entity.containerNode[o].active = true;
              var i = this.entity.containerNode[o].getComponent(cc.Sprite);
              i && (i.enabled = true);
            }
          }
          break;
        case n.Equal:
          this.entity.containerNode[e].active = true;
          t = this.entity.containerNode[e].getComponent(cc.Sprite);
          if (t) {
            t.enabled = true;
          }
          break;
        case n.More:
          if (e < this.conLen) {
            this.entity.containerNode[e].active = true;
            var a = this.entity.containerNode[e].getComponent(cc.Sprite);
            a && (a.enabled = true);
          }
      }
      this.triggerFlag[e] = 2;
      this.entity.showConNodeBehavior.execute();
    } else {
      switch (this.isOverFlow) {
        case n.Less:
          this.entity.containerNode[this.haveGet].active = true;
          t = this.entity.containerNode[this.haveGet].getComponent(cc.Sprite);
          if (t) {
            t.enabled = true;
          }
          this.haveGet++;
          if (this.curFinish == this.triggerLen - 1) {
            console.log(":掉落<容器，掉落到最后一个时，显示剩余的所有容器节点");
            for (o = this.curFinish; o < this.conLen; o++) {
              this.entity.containerNode[o].active = true;
              var s = this.entity.containerNode[o].getComponent(cc.Sprite);
              s && (s.enabled = true);
            }
          }
          break;
        case n.Equal:
          this.entity.containerNode[this.curFinish].active = true;
          t = this.entity.containerNode[this.curFinish].getComponent(cc.Sprite);
          if (t) {
            t.enabled = true;
          }
          break;
        case n.More:
          if (this.triggerLen - this.curFinish <= this.conLen) {
            this.entity.containerNode[this.haveGet].active = true;
            var r = this.entity.containerNode[this.haveGet].getComponent(cc.Sprite);
            r && (r.enabled = true);
            this.haveGet++;
          }
      }
      this.triggerFlag[e] = 2;
      this.entity.showConNodeBehavior.execute();
    }
    this.curFinish++;
  };
  _ctor.prototype.updatePos = function () {
    if (this.isEnter) {
      this.entity.containerRoot.x = this.curPos.x;
      this.entity.containerRoot.y = this.curPos.y;
    }
  };
  _ctor.prototype.resetPos = function () {
    this.curPos.x = this.oriPos.x;
    this.curPos.y = this.oriPos.y;
    this.updatePos();
    this.isEnter = false;
  };
  return __decorate([r_DecorateBehavior.bindEventCom(r_FallingIntoContainerCom.FallingIntoContainerCom)], _ctor);
}();
exports.FallingIntoContainerSys = exp_FallingIntoContainerSys;