var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_TriggerActionMgr = require("TriggerActionMgr");
var r_UtilsSystem = require("UtilsSystem");
var r_LevelPreload = require("LevelPreload");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var m = function () {
  function e() {
    this.tip = "";
    this.action = "";
    this.isFinish = false;
  }
  __decorate([_property({
    displayName: "提示"
  })], e.prototype, "tip", undefined);
  __decorate([_property({
    tooltip: "下一步的action"
  })], e.prototype, "action", undefined);
  return __decorate([_ccclass("DrawGuessInfo")], e);
}();
var def_WordDrawGuess = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.itemGrid = null;
    t.ItemPrefab = null;
    t.numLabel = null;
    t.tipLabel = null;
    t.btnFinish = null;
    t.btnBack = null;
    t.graphic = null;
    t.drawArea = null;
    t.answerIndex = 1;
    t.itemList = [];
    t.answerList = [];
    t.curIndex = 0;
    t.gridList = [];
    t.drawPosMap = {};
    t.isFinish = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.loadPreload = function () {
    return __awaiter(this, undefined, Promise, function () {
      return __generator(this, function (e) {
        switch (e.label) {
          case 0:
            return [4, this.init()];
          case 1:
            e.sent();
            return [2, null];
        }
      });
    });
  };
  _ctor.prototype.passLevel = function () {
    if (!this.isFinish) {
      this.isFinish = true;
      r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.clearLevel();
      cc.tween(this.node).delay(1).call(function () {}).start();
    }
  };
  _ctor.prototype.failLevel = function () {
    if (!this.isFinish) {
      r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.clearLevel();
      this.isFinish = true;
    }
  };
  _ctor.prototype.init = function () {
    this.isFinish = false;
    for (var e = 0; e < this.answerList.length; e++) {
      var t = cc.instantiate(this.ItemPrefab);
      t.active = true;
      t.parent = this.itemGrid;
      t.getChildByName("label").getComponent(cc.Label).string = this.answerList[e];
      this.gridList.push(t);
      var o = t.getComponent(cc.Button);
      var i = new cc.Component.EventHandler();
      i.target = this.node;
      i.component = "WordDrawGuess";
      i.handler = "clickAnswer";
      i.customEventData = e + 1 + "";
      o.clickEvents.push(i);
    }
    this.itemGrid.active = false;
    this.registTouch();
    this.drawPosMap[this.curIndex] = [];
    this.curIndex = 0;
    this.initStep();
  };
  _ctor.prototype.clickAnswer = function (e, t) {
    if (t == this.answerIndex) {
      this.passLevel();
    } else {
      this.failLevel();
    }
  };
  _ctor.prototype.registTouch = function () {
    var e = this;
    this.drawArea.off(cc.Node.EventType.TOUCH_START);
    this.drawArea.off(cc.Node.EventType.TOUCH_MOVE);
    this.drawArea.off(cc.Node.EventType.TOUCH_END);
    this.drawArea.off(cc.Node.EventType.TOUCH_CANCEL);
    var t = null;
    var o = null;
    var i = null;
    var n = function () {
      i = null;
      if (!e.btnFinish.active) {
        if (e.drawPosMap[e.curIndex].length <= 1) {
          e.drawPosMap[e.curIndex] = [];
        } else {
          r_TriggerActionMgr.TriggerActionMgr.trigger(e.itemList[e.curIndex].action);
          e.curIndex = e.curIndex + 1;
          e.initStep();
        }
      }
    };
    this.drawArea.on(cc.Node.EventType.TOUCH_START, function (o) {
      if (!e.btnFinish.active) {
        t = o.getLocation();
        if (r_UtilsSystem.UtilsSystem.touchInNode(e.drawArea, t)) {
          t = e.graphic.node.convertToNodeSpaceAR(t);
          e.graphic.moveTo(t.x, t.y);
          i = t;
          e.drawPosMap[e.curIndex].push({
            x: i.x,
            y: i.y
          });
        }
      }
    });
    this.drawArea.on(cc.Node.EventType.TOUCH_MOVE, function (t) {
      if (!e.btnFinish.active) {
        o = t.getLocation();
        if (i && cc.Vec2.distance(o, i) > 30 && r_UtilsSystem.UtilsSystem.touchInNode(e.drawArea, o)) {
          o = e.graphic.node.convertToNodeSpaceAR(o);
          e.graphic.lineTo(o.x, o.y);
          e.graphic.stroke();
          i = o;
          e.drawPosMap[e.curIndex].push({
            x: i.x,
            y: i.y
          });
        } else {
          n();
        }
      }
    });
    this.drawArea.on(cc.Node.EventType.TOUCH_END, function () {
      n();
    });
    this.drawArea.on(cc.Node.EventType.TOUCH_CANCEL, function () {
      n();
    });
    setTimeout(function () {
      e.drawArea._touchListener.setSwallowTouches(false);
    }, 2);
  };
  _ctor.prototype.onClickBack = function () {
    if (!(this.curIndex <= 0)) {
      this.drawPosMap[this.curIndex] = [];
      this.curIndex = this.curIndex - 1;
      this.graphic.clear();
      for (var e = 0; e < this.curIndex; e++) {
        var t = this.drawPosMap[e];
        if (!(t.length < 2)) {
          this.graphic.moveTo(t[0].x, t[0].y);
          for (var o = 1; o < t.length; o++) {
            this.graphic.lineTo(t[o].x, t[o].y);
            this.graphic.stroke();
          }
        }
      }
      this.initStep();
    }
  };
  _ctor.prototype.onClickNext = function () {};
  _ctor.prototype.initStep = function () {
    this.drawPosMap[this.curIndex] = [];
    var e = this.itemList[this.curIndex];
    if (e) {
      this.tipLabel.string = e.tip;
      this.numLabel.string = this.curIndex + 1 + "/" + this.itemList.length;
    }
    if (this.curIndex == this.itemList.length) {
      this.btnFinish.active = true;
      this.btnBack.x = -150;
    } else {
      this.btnFinish.active = false;
      this.btnBack.x = 0;
    }
  };
  _ctor.prototype.onClickFinish = function () {
    this.btnFinish.active = false;
    this.btnBack.active = false;
    this.itemGrid.active = true;
  };
  __decorate([_property({
    type: cc.Node,
    displayName: "答案列表"
  })], _ctor.prototype, "itemGrid", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "单个答案"
  })], _ctor.prototype, "ItemPrefab", undefined);
  __decorate([_property({
    type: cc.Label,
    displayName: "第几步文字"
  })], _ctor.prototype, "numLabel", undefined);
  __decorate([_property({
    type: cc.Label,
    displayName: "提示文字"
  })], _ctor.prototype, "tipLabel", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "完成按钮"
  })], _ctor.prototype, "btnFinish", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "返回按钮"
  })], _ctor.prototype, "btnBack", undefined);
  __decorate([_property({
    type: cc.Graphics,
    displayName: "画画节点"
  })], _ctor.prototype, "graphic", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "画画范围"
  })], _ctor.prototype, "drawArea", undefined);
  __decorate([_property({
    type: Number,
    displayName: "正确答案"
  })], _ctor.prototype, "answerIndex", undefined);
  __decorate([_property({
    type: [m],
    tooltip: "每一步信息"
  })], _ctor.prototype, "itemList", undefined);
  __decorate([_property({
    type: [String],
    tooltip: "答案列表"
  })], _ctor.prototype, "answerList", undefined);
  return __decorate([_ccclass, _menu("文字游戏/你画我猜")], _ctor);
}(r_LevelPreload.default);
exports.default = def_WordDrawGuess;