Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NipperToolSys = undefined;
var n;
var r_DecorateBehavior = require("DecorateBehavior");
var r_NipperToolCom = require("NipperToolCom");
var r_BehaviorDef = require("BehaviorDef");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_TYEventType = require("TYEventType");
var r_CommonFunc = require("CommonFunc");
var r_BehaviorMgr = require("BehaviorMgr");
function p(e, t) {
  var o = [];
  t.forEach(function (e) {
    o.push(e);
  });
  o.sort(function (e, t) {
    return r_CommonFunc.defSortNodes(e.placeNode, t.placeNode);
  });
  for (var i = 0; i < o.length; i++) {
    var n = o[i].placeNode;
    if (r_CommonFunc.checkTouchNode(e, n)) {
      return i;
    }
  }
  return -1;
}
function d(e, t, o) {
  var i;
  if ("in" == o) {
    e.scaleX *= t.transformIn.x;
    e.scaleY *= t.transformIn.y;
    e.angle = t.transformIn.z;
    e.x = t.quantumIn.x;
    e.y = t.quantumIn.y;
    (i = e.opacity + t.quantumIn.z) < 0 && (i = 0);
    i > 255 && (i = 255);
    e.opacity = i;
  } else {
    e.scaleX *= t.transformOut.x;
    e.scaleY *= t.transformOut.y;
    e.angle = t.transformOut.z;
    e.x = t.quantumOut.x;
    e.y = t.quantumOut.y;
    (i = e.opacity + t.quantumOut.z) < 0 && (i = 0);
    i > 255 && (i = 255);
    e.opacity = i;
  }
}
(function (e) {
  e[e["可附着"] = 1] = "可附着";
  e[e["寻找终点"] = 2] = "寻找终点";
  e[e["完成"] = 3] = "完成";
})(n || (n = {}));
var exp_NipperToolSys = function () {
  function _ctor() {
    this.state = n.可附着;
    this.nodeArray = [];
    this.nodeArrayCopy = [];
    this.nippingLimit = 1;
    this.overHome = null;
    this.isBrokenDest = false;
    this.isOnlyPickInfo = false;
    this.onlyPickInfo = null;
    this.nippingCount = 0;
  }
  _ctor.prototype.onStart = function () {
    var e = this;
    if (this.entity.isSingleNode == r_BehaviorDef.TargetAmountMode.单个) {
      this.nodeArray = [this.entity.target];
      this.nippingLimit = 1;
    } else {
      this.nodeArray = this.entity.targetArray;
      switch (this.entity.pickLimitMode) {
        case r_NipperToolCom.PICKCOUNT.单个:
          this.nippingLimit = 1;
          break;
        case r_NipperToolCom.PICKCOUNT.两个:
          this.nippingLimit = 2;
          break;
        case r_NipperToolCom.PICKCOUNT.无上限:
          this.nippingLimit = this.nodeArray.length;
          break;
        case r_NipperToolCom.PICKCOUNT.指定数量:
          try {
            this.nippingLimit = this.entity.pickCountLimit > 1 ? Math.ceil(this.entity.pickCountLimit) : 1;
          } catch (o) {
            this.nippingLimit = 1;
          }
      }
    }
    switch (this.entity.whereToGo) {
      case r_NipperToolCom.WhereToGO.原位置:
        break;
      case r_NipperToolCom.WhereToGO.目标处:
        this.overHome = this.entity.destination;
        break;
      case r_NipperToolCom.WhereToGO.指定地点:
        this.overHome = this.entity.overPlace;
    }
    this.nodeArray.some(function (t) {
      if (t.isExpand && t.isApplyToArray) {
        e.onlyPickInfo = t;
        e.isOnlyPickInfo = true;
        return true;
      }
    });
    if (null == this.entity.destination) {
      for (var t = 0; t < this.nodeArray.length; t++) {
        null == this.nodeArray[t].placeNode && console.warn("夹子工具使用错误：场景中的节点【" + this.entity.name + "】，若没有设置夹子终点，则需要每个目标独立设置附着点:[" + (t + 1) + "]");
      }
      this.isBrokenDest = true;
      for (t = 0; t < this.nodeArray.length; t++) {
        this.nodeArrayCopy.push(this.nodeArray[t]);
      }
    }
  };
  _ctor.prototype.onEnable = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.addTouchNode(this.entity.node);
    this.entity.node.on(r_TYEventType.TYEventType.ToolEvent.TOOL_DRAG_TOUCH_START, this.onDragBegin, this);
    this.entity.node.on(r_TYEventType.TYEventType.ToolEvent.TOOl_DRAG_MOVE, this.onCheck, this);
    switch (this.entity.judgeMode) {
      case r_BehaviorDef.DragJudgeMode.抬起时检测:
        this.entity.node.on(r_TYEventType.TYEventType.ToolEvent.TOOL_DRAG_TOUCH_END, this.onDragEnd, this);
        break;
      case r_BehaviorDef.DragJudgeMode.移到位置时检测:
    }
  };
  _ctor.prototype.onDestroy = function () {};
  _ctor.prototype.onDisable = function () {};
  _ctor.prototype.onDragBegin = function () {
    this.startX = this.entity.node.x;
    this.startY = this.entity.node.y;
  };
  _ctor.prototype.onDragEnd = function (e) {
    if (this.nippingCount > 0) {
      var t = new cc.Vec2(this.lastX, this.lastY);
      if (this.isBrokenDest) {
        var o = p(t, this.nodeArrayCopy);
        if (o > -1) {
          this.entity.resetWhenFailDrag && this.resetNipperToHome();
          this.doTriggerRandom(e, o);
        } else {
          this.entity.resetWhenFailDrag && this.resetNipperToHome();
        }
      } else if (r_CommonFunc.checkTouchNode(t, this.entity.destination)) {
        this.entity.resetWhenFailDrag && this.resetNipperToHome();
        this.doTrigger(e);
      } else {
        this.entity.resetWhenFailDrag && this.resetNipperToHome();
      }
    }
  };
  _ctor.prototype.onCheck = function (e) {
    var t;
    if (e) {
      if (this.state == n.可附着) {
        var o = r_CommonFunc.findPlaceTargetIndex(e, this.nodeArray);
        if (o > -1) {
          this.nodeArray[o].targetArea.parent = this.entity.stickPos;
          if (this.nodeArray[o].isExpand) {
            if (this.nodeArray[o].nippingBehaviors && this.nodeArray[o].nippingBehaviors.executeBehaviorInfo.length > 0) {
              r_BehaviorMgr.BehaviorMgr.executeBehavior(this.nodeArray[o].nippingBehaviors);
            } else {
              this.isOnlyPickInfo && this.onlyPickInfo.nippingBehaviors && r_BehaviorMgr.BehaviorMgr.executeBehavior(this.onlyPickInfo.nippingBehaviors);
            }
            d(this.nodeArray[o].targetArea, this.nodeArray[o], "in");
          } else if (this.isOnlyPickInfo && this.onlyPickInfo.nippingBehaviors) {
            d(this.nodeArray[o].targetArea, this.onlyPickInfo, "in");
            r_BehaviorMgr.BehaviorMgr.executeBehavior(this.onlyPickInfo.nippingBehaviors);
          }
          if (this.isBrokenDest) {
            this.nodeArray.splice(o, 1);
            this.nodeArray.forEach(function () {});
          } else {
            (t = this.nodeArrayCopy).push.apply(t, this.nodeArray.splice(o, 1));
          }
          this.nippingCount++;
          this.nippingCount == this.nippingLimit && (this.state = n.寻找终点);
          0 == this.nodeArray.length && (this.state = n.完成);
        }
      }
      if (this.entity.judgeMode == r_BehaviorDef.DragJudgeMode.移到位置时检测) {
        if (this.nippingCount > 0) {
          if (this.isBrokenDest) {
            var i = p(e, this.nodeArrayCopy);
            i > -1 && this.doTriggerRandom(e, i);
          } else {
            r_CommonFunc.checkTouchNode(e, this.entity.destination) && this.doTrigger(e);
          }
        }
      } else {
        this.lastX = e.x;
        this.lastY = e.y;
      }
    }
  };
  _ctor.prototype.resetNipperToHome = function (e) {
    if (e) {
      this.entity.node.x = e.x;
      this.entity.node.y = e.y;
    } else {
      this.entity.node.x = this.startX;
      this.entity.node.y = this.startY;
    }
  };
  _ctor.prototype.doTrigger = function () {
    var e = [];
    this.entity.stickPos.children.forEach(function (t) {
      e.push(t);
    });
    for (var t = 0; t < e.length; t++) {
      if (null != this.nodeArrayCopy[t].placeNode) {
        e[t].parent = this.nodeArrayCopy[t].placeNode;
      } else {
        e[t].parent = this.entity.destination;
      }
      if (this.nodeArrayCopy[t].isExpand) {
        d(e[t], this.nodeArrayCopy[t], "out");
      } else {
        this.isOnlyPickInfo && d(e[t], this.onlyPickInfo, "out");
      }
    }
    if (this.state == n.完成) {
      r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.stopDrag();
      if (this.entity.whereToGo == r_NipperToolCom.WhereToGO.原位置) {
        this.resetNipperToHome();
      } else {
        this.resetNipperToHome(this.overHome);
      }
    } else if (this.entity.isResetEachTime) {
      this.resetNipperToHome();
      r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.stopDrag();
    }
    this.nippingCount = 0;
    this.state = n.可附着;
    this.nodeArrayCopy.forEach(function (e) {
      e.successBehaviors && r_BehaviorMgr.BehaviorMgr.executeBehavior(e.successBehaviors);
    });
    this.nodeArrayCopy.length = 0;
  };
  _ctor.prototype.doTriggerRandom = function (e, t) {
    var o = this.entity.stickPos.children[0];
    if (null != this.nodeArrayCopy[t].placeNode) {
      o.parent = this.nodeArrayCopy[t].placeNode;
    } else {
      o.parent = this.entity.destination;
    }
    if (this.nodeArrayCopy[t].isExpand) {
      d(o, this.nodeArrayCopy[t], "out");
    } else {
      this.isOnlyPickInfo && d(o, this.onlyPickInfo, "out");
    }
    if (this.state == n.完成 && 1 == this.nippingCount) {
      if (this.entity.whereToGo == r_NipperToolCom.WhereToGO.原位置) {
        this.resetNipperToHome();
      } else {
        this.resetNipperToHome(this.overHome);
      }
      r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.stopDrag();
    } else if (this.entity.isResetEachTime) {
      this.resetNipperToHome();
      r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.stopDrag();
    }
    this.nippingCount--;
    this.nippingCount < 0 && (this.nippingCount = 0);
    this.nodeArray.length > 0 && (this.state = n.可附着);
    this.nodeArrayCopy[t].successBehaviors && r_BehaviorMgr.BehaviorMgr.executeBehavior(this.nodeArrayCopy[t].successBehaviors);
    this.nodeArrayCopy.splice(t, 1);
  };
  return __decorate([r_DecorateBehavior.bindEventCom(r_NipperToolCom.NipperToolCom)], _ctor);
}();
exports.NipperToolSys = exp_NipperToolSys;