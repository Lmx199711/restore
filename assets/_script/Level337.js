var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Level337 = undefined;
var r_ExecuteBehaviorInfo = require("ExecuteBehaviorInfo");
var r_CommonFunc = require("CommonFunc");
var r_CleanComponent = require("CleanComponent");
var r_SoundMgr = require("SoundMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var f = function () {
  function e() {
    this.rawMaterial = [];
    this.soupSpoonMaterial = [];
    this.pen = [];
    this.cleanCom = [];
  }
  __decorate([_property({
    type: cc.Node,
    displayName: "原材料"
  })], e.prototype, "rawMaterial", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "汤匙中的原材料",
    tooltip: "和原材料一一对应"
  })], e.prototype, "soupSpoonMaterial", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "笔"
  })], e.prototype, "pen", undefined);
  return __decorate([_ccclass("FormulaInfo")], e);
}();
var exp_Level337 = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.bg = null;
    t.rawMaterialTargetPos = null;
    t.soupSpoonTargetPos = null;
    t.dragSound = "getItem";
    t.putSound = "itemDown";
    t.finishedProduct = null;
    t.seal = null;
    t.sealSound = "337gaizhang";
    t.sealAni = null;
    t.rawMaterial = null;
    t.formula = null;
    t.pen = null;
    t.penSound = "tuya";
    t.soupSpoon = null;
    t.meltSound = "337ronghua";
    t.meltingResult = null;
    t.pourOutSound = "337daochu";
    t.finishedBehaviors = new r_ExecuteBehaviorInfo.ExecuteBehaviorInfo();
    t.failBehaviors = new r_ExecuteBehaviorInfo.ExecuteBehaviorInfo();
    t.formulaInfos = [];
    t.curStep = 0;
    t.curFinish = 0;
    t.cleanCompleted = 0;
    t.curTouchPos = new cc.Vec2();
    t.tmpV2 = new cc.Vec2();
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    var e = this;
    if (!this.bg) {
      this.bg = new cc.Node("bg");
      this.bg.width = 1668;
      this.bg.height = 1002;
      this.node.addChild(this.bg);
    }
    this.sealChildren = __spreadArrays(this.seal.children);
    this.finishedProduct.children.forEach(function (e) {
      return e.active = false;
    });
    this.rawMaterial.children.forEach(function (e) {
      return e.children[0].setScale(0, 0);
    });
    this.sealAni.children.forEach(function (e) {
      return e.active = false;
    });
    this.curStep = 0;
    this.curFinish = 0;
    this.cleanCompleted = 0;
    for (var t = 0; t < this.meltingResult.childrenCount; t++) {
      var o = this.meltingResult.children[t].children[1];
      var i = function (i) {
        var a = o.children[i].getComponent(r_CleanComponent.default);
        n.formulaInfos[t].cleanCom.push(a);
        a.initPoints();
        a.setCleanInfo(function () {
          e.cleanCompleted++;
          a.cleanCompeleted();
          e.cleanSuccess();
        }, n.formulaInfos[t].pen[i].children[2]);
      };
      var n = this;
      for (var a = 0; a < o.childrenCount; a++) {
        i(a);
      }
    }
    this.bg.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.bg.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    this.bg.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
  };
  _ctor.prototype.onTouchStart = function (e) {
    this.curTouchPos = e.getLocation();
    this.checkTouchRM();
    this.checkTouchSpoon();
    this.checkTouchSeal();
    this.checkTouchPen();
    this.checkTouchResult();
  };
  _ctor.prototype.onTouchMove = function (e) {
    this.curTouchPos = e.getLocation();
    if (this.curSelectRM) {
      this.curSelectRM.x += e.getDeltaX();
      this.curSelectRM.y += e.getDeltaY();
    }
    if (this.curSelectSpoon) {
      this.curSelectSpoon.x += e.getDeltaX();
      this.curSelectSpoon.y += e.getDeltaY();
    }
    if (this.curSelectSeal) {
      this.curSelectSeal.x += e.getDeltaX();
      this.curSelectSeal.y += e.getDeltaY();
    }
    if (this.curSelectPen) {
      this.curSelectPen.x += e.getDeltaX();
      this.curSelectPen.y += e.getDeltaY();
      this.clean();
    }
    if (this.curSelectResult) {
      this.curSelectResult.x += e.getDeltaX();
      this.curSelectResult.y += e.getDeltaY();
    }
  };
  _ctor.prototype.onTouchEnd = function (e) {
    this.curTouchPos = e.getLocation();
    this.putRM();
    this.resetRM();
    this.putSpoon();
    this.resetSpoon();
    this.putSeal();
    this.resetSeal();
    this.resetPen();
    this.putResult();
    this.resetResult();
  };
  _ctor.prototype.checkTouchRM = function () {
    if (0 == this.curStep) {
      for (var e = 0; e < this.rawMaterial.childrenCount; e++) {
        var t = this.rawMaterial.children[e];
        if (r_CommonFunc.checkTouchNode(this.curTouchPos, t)) {
          this.curSelectRM = t;
          this.tmpV2.x = t.x;
          this.tmpV2.y = t.y;
          this.curSelectRM.zIndex = this.rawMaterial.childrenCount;
          this.scaleNode(this.curSelectRM.children[0], 0, 1);
          this.rawMaterial.zIndex = this.node.childrenCount;
          this.dragSound && r_SoundMgr.SoundMgr.playSound(this.dragSound);
          break;
        }
      }
    }
  };
  _ctor.prototype.putRM = function () {
    if (this.curSelectRM && r_CommonFunc.checkTouchNode(this.curTouchPos, this.rawMaterialTargetPos)) {
      var e = -1;
      for (var t = 0; t < this.formulaInfos[this.curFinish].rawMaterial.length; t++) {
        this.formulaInfos[this.curFinish].rawMaterial[t] != this.curSelectRM || this.formulaInfos[this.curFinish].soupSpoonMaterial[t].active || (e = t);
      }
      if (-1 == e) {
        this.failBehaviors.execute();
      } else {
        this.formulaInfos[this.curFinish].soupSpoonMaterial[e].active = true;
        this.checkPutRMFinish();
        this.putSound && r_SoundMgr.SoundMgr.playSound(this.putSound);
      }
    }
  };
  _ctor.prototype.checkPutRMFinish = function () {
    var e = this;
    var t = true;
    this.formulaInfos[this.curFinish].soupSpoonMaterial.forEach(function (e) {
      return t && (t = e.active);
    });
    if (t) {
      var o = this.soupSpoon.children[this.curFinish];
      o.children[0].children.forEach(function (e) {
        return e.active = false;
      });
      o.children[0].active = false;
      o.children[1].active = true;
      this.curStep = 1;
      this.meltSound && r_SoundMgr.SoundMgr.playSound(this.meltSound);
      this.scheduleOnce(function () {
        e.curStep = 2;
      }, 1.4);
    }
  };
  _ctor.prototype.resetRM = function (e) {
    undefined === e && (e = true);
    if (this.curSelectRM) {
      this.curSelectRM.x = this.tmpV2.x;
      this.curSelectRM.y = this.tmpV2.y;
      this.curSelectRM.zIndex = 0;
      this.curSelectRM.children[0].setScale(0, 0);
      this.curSelectRM = null;
      this.rawMaterial.zIndex = 0;
    }
  };
  _ctor.prototype.checkTouchSpoon = function () {
    if (2 == this.curStep && r_CommonFunc.checkTouchNode(this.curTouchPos, this.soupSpoon)) {
      this.curSelectSpoon = this.soupSpoon;
      this.tmpV2.x = this.soupSpoon.x;
      this.tmpV2.y = this.soupSpoon.y;
      this.soupSpoon.zIndex = this.node.childrenCount;
      this.dragSound && r_SoundMgr.SoundMgr.playSound(this.dragSound);
    }
  };
  _ctor.prototype.putSpoon = function () {
    var e = this;
    if (this.curSelectSpoon && r_CommonFunc.checkTouchNode(this.curTouchPos, this.soupSpoonTargetPos)) {
      this.resetSpoon();
      var t = this.soupSpoon.children[this.curFinish];
      t.children[1].active = false;
      t.children[2].active = true;
      this.curStep = 3;
      this.pourOutSound && r_SoundMgr.SoundMgr.playSound(this.pourOutSound);
      this.scheduleOnce(function () {
        var o = e.soupSpoon.children[e.curFinish + 1];
        if (o) {
          o.children[0].active = true;
          t.active = false;
        } else {
          t.children[0].active = true;
          t.children[2].active = false;
        }
        e.meltingResult.children[e.curFinish].children[0].active = true;
        e.curStep = 4;
      }, 2);
    }
  };
  _ctor.prototype.resetSpoon = function () {
    if (this.curSelectSpoon) {
      this.curSelectSpoon.x = this.tmpV2.x;
      this.curSelectSpoon.y = this.tmpV2.y;
      this.curSelectSpoon = null;
      this.soupSpoon.zIndex = 0;
    }
  };
  _ctor.prototype.checkTouchSeal = function () {
    if (4 == this.curStep) {
      for (var e = 0; e < this.sealChildren.length; e++) {
        if (r_CommonFunc.checkTouchNode(this.curTouchPos, this.sealChildren[e])) {
          this.curSelectSeal = this.sealChildren[e];
          this.tmpV2.x = this.sealChildren[e].x;
          this.tmpV2.y = this.sealChildren[e].y;
          this.curSelectSeal.zIndex = this.sealChildren.length;
          this.curSelectSeal.children[0].active = false;
          this.scaleNode(this.curSelectSeal.children[1], 0, 1);
          this.seal.zIndex = this.node.childrenCount;
          this.dragSound && r_SoundMgr.SoundMgr.playSound(this.dragSound);
          break;
        }
      }
    }
  };
  _ctor.prototype.putSeal = function () {
    var e = this;
    if (r_CommonFunc.checkNodeOverOtherNode(this.curSelectSeal, this.soupSpoonTargetPos)) {
      if (this.sealChildren.findIndex(function (t) {
        return t == e.curSelectSeal;
      }) == this.curFinish) {
        var t = this.curSelectSeal;
        this.curSelectSeal = null;
        t.active = false;
        this.curStep = 5;
        this.sealSound && r_SoundMgr.SoundMgr.playSound(this.sealSound);
        this.sealAni.children[this.curFinish].active = true;
        this.sealAni.zIndex = this.node.childrenCount + 1;
        this.scheduleOnce(function () {
          e.meltingResult.children[e.curFinish].children[0].active = false;
          e.meltingResult.children[e.curFinish].children[1].active = true;
        }, 1);
        this.scheduleOnce(function () {
          e.sealAni.children[e.curFinish].active = false;
          t.active = true;
          e.curSelectSeal = t;
          e.curSelectSeal.children[1].setScale(0, 0);
          e.resetSeal(false);
          if (e.formulaInfos[e.curFinish].pen.length > 0) {
            e.curStep = 6;
            e.cleanCompleted = 0;
          } else {
            e.curStep = 7;
          }
          e.sealAni.zIndex = 0;
        }, 1.5);
      } else {
        this.failBehaviors.execute();
      }
    }
  };
  _ctor.prototype.resetSeal = function (e) {
    undefined === e && (e = true);
    if (this.curSelectSeal) {
      this.curSelectSeal.x = this.tmpV2.x;
      this.curSelectSeal.y = this.tmpV2.y;
      this.curSelectSeal.zIndex = 0;
      this.curSelectSeal.children[0].active = true;
      e && this.scaleNode(this.curSelectSeal.children[1], 1, 0);
      this.curSelectSeal = null;
      this.seal.zIndex = 0;
    }
  };
  _ctor.prototype.checkTouchPen = function () {
    if (6 == this.curStep) {
      for (var e = 0; e < this.pen.childrenCount; e++) {
        if (r_CommonFunc.checkTouchNode(this.curTouchPos, this.pen.children[e])) {
          this.curSelectPen = this.pen.children[e];
          this.tmpV2.x = this.curSelectPen.x;
          this.tmpV2.y = this.curSelectPen.y;
          this.curSelectPen.children[0].active = false;
          this.curSelectPen.children[1].active = true;
          this.curSelectPen.zIndex = this.pen.childrenCount;
          this.pen.zIndex = this.node.childrenCount;
          this.penSound && r_SoundMgr.SoundMgr.playSound(this.penSound, true);
          break;
        }
      }
    }
  };
  _ctor.prototype.clean = function () {
    var e = this;
    var t = this.formulaInfos[this.curFinish].pen.findIndex(function (t) {
      return t == e.curSelectPen;
    });
    -1 != t && this.formulaInfos[this.curFinish].cleanCom[t].checkTouch();
  };
  _ctor.prototype.cleanSuccess = function () {
    this.cleanCompleted >= this.formulaInfos[this.curFinish].cleanCom.length && (this.curStep = 7);
  };
  _ctor.prototype.resetPen = function () {
    if (this.curSelectPen) {
      this.curSelectPen.x = this.tmpV2.x;
      this.curSelectPen.y = this.tmpV2.y;
      this.curSelectPen.children[0].active = true;
      this.curSelectPen.children[1].active = false;
      this.curSelectPen.zIndex = 0;
      this.curSelectPen = null;
      this.pen.zIndex = 0;
      this.penSound && r_SoundMgr.SoundMgr.stopSound(this.penSound);
    }
  };
  _ctor.prototype.checkTouchResult = function () {
    if (7 == this.curStep && r_CommonFunc.checkTouchNode(this.curTouchPos, this.meltingResult.children[this.curFinish])) {
      this.curSelectResult = this.meltingResult.children[this.curFinish];
      this.tmpV2.x = this.curSelectResult.x;
      this.tmpV2.y = this.curSelectResult.y;
      this.meltingResult.zIndex = this.node.childrenCount;
      this.dragSound && r_SoundMgr.SoundMgr.playSound(this.dragSound);
    }
  };
  _ctor.prototype.putResult = function () {
    if (this.curSelectResult && r_CommonFunc.checkTouchNode(this.curTouchPos, this.finishedProduct)) {
      this.finishedProduct.children[this.curFinish].active = true;
      this.curSelectResult.active = false;
      this.curFinish++;
      if (this.curFinish >= this.formulaInfos.length) {
        this.finishedBehaviors.execute();
      } else {
        this.formula.children[this.curFinish - 1].active = false;
        this.formula.children[this.curFinish].active = true;
        this.curStep = 0;
        this.putSound && r_SoundMgr.SoundMgr.playSound(this.putSound);
      }
    }
  };
  _ctor.prototype.resetResult = function () {
    if (this.curSelectResult) {
      this.curSelectResult.x = this.tmpV2.x;
      this.curSelectResult.y = this.tmpV2.y;
      this.curSelectResult = null;
      this.meltingResult.zIndex = 0;
    }
  };
  _ctor.prototype.scaleNode = function (e, t, o, i) {
    undefined === t && (t = 0);
    undefined === o && (o = 1);
    undefined === i && (i = .1);
    e.scaleX = e.scaleY = t;
    cc.tween(e).to(i, {
      scaleX: o,
      scaleY: o
    }).start();
  };
  __decorate([_property({
    type: cc.Node,
    displayName: "背景"
  })], _ctor.prototype, "bg", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "原材料拖动的目标位置"
  })], _ctor.prototype, "rawMaterialTargetPos", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "汤匙拖动到的目标位置"
  })], _ctor.prototype, "soupSpoonTargetPos", undefined);
  __decorate([_property({
    displayName: "拖动物品开始时的音效"
  })], _ctor.prototype, "dragSound", undefined);
  __decorate([_property({
    displayName: "放下物品时的音效"
  })], _ctor.prototype, "putSound", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "成品"
  })], _ctor.prototype, "finishedProduct", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "印章"
  })], _ctor.prototype, "seal", undefined);
  __decorate([_property({
    displayName: "盖章时的音效"
  })], _ctor.prototype, "sealSound", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "印章动画"
  })], _ctor.prototype, "sealAni", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "原材料"
  })], _ctor.prototype, "rawMaterial", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "配方节点"
  })], _ctor.prototype, "formula", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "笔"
  })], _ctor.prototype, "pen", undefined);
  __decorate([_property({
    displayName: "画画时的音效"
  })], _ctor.prototype, "penSound", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "汤匙"
  })], _ctor.prototype, "soupSpoon", undefined);
  __decorate([_property({
    displayName: "融化时的音效"
  })], _ctor.prototype, "meltSound", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "熔炼结果"
  })], _ctor.prototype, "meltingResult", undefined);
  __decorate([_property({
    displayName: "倒出时的音效"
  })], _ctor.prototype, "pourOutSound", undefined);
  __decorate([_property({
    displayName: "完成后执行的行为",
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo
  })], _ctor.prototype, "finishedBehaviors", undefined);
  __decorate([_property({
    displayName: "失败后执行的行为",
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo
  })], _ctor.prototype, "failBehaviors", undefined);
  __decorate([_property({
    type: f,
    displayName: "配方数据"
  })], _ctor.prototype, "formulaInfos", undefined);
  return __decorate([_ccclass, _menu("特殊关卡/选择原材料锻造")], _ctor);
}(cc.Component);
exports.Level337 = exp_Level337;