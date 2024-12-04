Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PickToolSys = undefined;
var r_PickToolCom = require("PickToolCom");
var r_DecorateBehavior = require("DecorateBehavior");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_TYEventType = require("TYEventType");
var r_CommonFunc = require("CommonFunc");
var exp_PickToolSys = function () {
  function _ctor() {
    this.curPickIndex = -1;
    this.oldPickNodeParent = null;
    this.curPickNode = null;
    this.startPickX = 0;
    this.startPickY = 0;
  }
  _ctor.prototype.onDestroy = function () {};
  _ctor.prototype.onDisable = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.removeTouchNode(this.entity.node);
    this.entity.node.off(r_TYEventType.TYEventType.DRAG_MOVE, this.onToolMove, this);
    this.entity.node.off(r_TYEventType.TYEventType.ToolEvent.TOOl_DRAG_MOVE, this.onCheckPut, this);
    this.entity.node.off(r_TYEventType.TYEventType.TOUCH_END, this.onToolEnd, this);
  };
  _ctor.prototype.onEnable = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.addTouchNode(this.entity.node);
    this.entity.node.on(r_TYEventType.TYEventType.DRAG_MOVE, this.onToolMove, this);
    this.entity.node.on(r_TYEventType.TYEventType.ToolEvent.TOOl_DRAG_MOVE, this.onCheckPut, this);
    this.entity.node.on(r_TYEventType.TYEventType.TOUCH_END, this.onToolEnd, this);
  };
  _ctor.prototype.onStart = function () {
    this.curPickIndex = -1;
    this.curPickNode = null;
    this.oldPickNodeParent = null;
    this.entity.pickInfo.forEach(function (e) {
      e.putTargetShowNode && (e.putTargetShowNode.opacity = 0);
    });
  };
  _ctor.prototype.onCheckPut = function () {
    this.checkPut();
  };
  _ctor.prototype.onToolMove = function () {
    this.checkPick();
  };
  _ctor.prototype.onToolEnd = function () {
    this.resetPick();
    this.checkFinish();
  };
  _ctor.prototype.checkPick = function () {
    if (-1 == this.curPickIndex && !this.entity.isAllFinish) {
      for (var e = 0; e < this.entity.pickInfo.length; e++) {
        var t = this.entity.pickInfo[e];
        if (!t.pickCompleted && r_CommonFunc.checkNodeOverOtherNode(this.entity.pickPoint, t.pickOriginNode)) {
          this.curPickIndex = e;
          this.startPickX = t.pickOriginNode.x;
          this.startPickY = t.pickOriginNode.y;
          this.curPickNode = t.pickOriginNode;
          this.oldPickNodeParent = t.pickOriginNode.parent;
          r_CommonFunc.changNodeParent(t.pickOriginNode, this.entity.pickPoint, false);
          this.entity.pickBehavior && this.entity.pickBehavior.execute();
          break;
        }
      }
    }
  };
  _ctor.prototype.checkPut = function () {
    if (!this.entity.isAllFinish && -1 != this.curPickIndex && (null == this.entity.putArea || r_CommonFunc.checkNodeOverOtherNode(this.entity.pickPoint, this.entity.putArea))) {
      var e = -1;
      if (this.entity.isSort) {
        (null != this.entity.putArea || r_CommonFunc.checkNodeOverOtherNode(this.entity.pickPoint, this.entity.pickInfo[this.curPickIndex].putTargetNode)) && (e = this.curPickIndex);
      } else {
        for (var t = 0; t < this.entity.pickInfo.length; t++) {
          var o = this.entity.pickInfo[t];
          if (!o.putCompleted && r_CommonFunc.checkNodeOverOtherNode(this.entity.pickPoint, o.putTargetNode)) {
            e = t;
            break;
          }
        }
      }
      if (-1 != e) {
        var i = this.entity.pickInfo[e];
        r_CommonFunc.changNodeParent(this.curPickNode, i.putTargetNode, false);
        if (i.putTargetShowNode) {
          i.putTargetShowNode.opacity = 255;
          this.curPickNode.active = false;
        }
        i.putTargetHideNode && (i.putTargetHideNode.active = false);
        this.entity.pickInfo[this.curPickIndex].pickCompleted = true;
        i.putCompleted = true;
        this.resetPick(true);
        this.entity.putBehavior && this.entity.putBehavior.execute();
      }
    }
  };
  _ctor.prototype.checkFinish = function () {
    if (!this.entity.isAllFinish) {
      var e = true;
      this.entity.pickInfo.forEach(function (t) {
        return e && (e = t.putCompleted);
      });
      if (e) {
        this.entity.finishedBehaviors && this.entity.finishedBehaviors.execute();
        this.entity.isAllFinish = true;
      }
    }
  };
  _ctor.prototype.resetPick = function (e) {
    undefined === e && (e = false);
    if (-1 != this.curPickIndex) {
      if (!e) {
        r_CommonFunc.changNodeParent(this.curPickNode, this.oldPickNodeParent, false);
        this.curPickNode.x = this.startPickX;
        this.curPickNode.y = this.startPickY;
      }
      this.oldPickNodeParent = null;
      this.curPickNode = null;
      this.curPickIndex = -1;
      this.startPickX = 0;
      this.startPickY = 0;
    }
  };
  return __decorate([r_DecorateBehavior.bindEventCom(r_PickToolCom.PickToolCom)], _ctor);
}();
exports.PickToolSys = exp_PickToolSys;