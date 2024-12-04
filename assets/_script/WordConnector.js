var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_TriggerActionMgr = require("TriggerActionMgr");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_SoundMgr = require("SoundMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var y = function () {
  function e() {
    this.leftNode = null;
    this.leftSpriteFrame = null;
    this.rightNode = null;
    this.rightSpriteFrame = null;
    this.lineColor = cc.Color.BLACK;
    this.selectSound = "";
    this.trueSound = "";
    this.selectAction = "";
    this.trueAction = "";
    this.errorAction = "";
  }
  __decorate([_property({
    type: cc.Node,
    displayName: "左侧节点"
  })], e.prototype, "leftNode", undefined);
  __decorate([_property({
    type: cc.SpriteFrame,
    displayName: "左侧选中后显示图片"
  })], e.prototype, "leftSpriteFrame", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "右侧节点"
  })], e.prototype, "rightNode", undefined);
  __decorate([_property({
    type: cc.SpriteFrame,
    displayName: "右侧选中后显示图片"
  })], e.prototype, "rightSpriteFrame", undefined);
  __decorate([_property({
    type: cc.Color,
    displayName: "线的颜色"
  })], e.prototype, "lineColor", undefined);
  __decorate([_property({
    displayName: "选中音效"
  })], e.prototype, "selectSound", undefined);
  __decorate([_property({
    displayName: "选对音效"
  })], e.prototype, "trueSound", undefined);
  __decorate([_property({
    displayName: "选中的action"
  })], e.prototype, "selectAction", undefined);
  __decorate([_property({
    displayName: "选对的action"
  })], e.prototype, "trueAction", undefined);
  __decorate([_property({
    displayName: "选错的action"
  })], e.prototype, "errorAction", undefined);
  return __decorate([_ccclass("WordConnectInfo")], e);
}();
var def_WordConnector = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.infoList = [];
    t.errorSound = "";
    t.winDelayTime = 0;
    t.touchNode = null;
    t.curGraphic = null;
    t.finishNum = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    for (var e = 0; e < this.infoList.length; e++) {
      var t = this.infoList[e];
      t.leftNode.startFrame = t.leftNode.getComponent(cc.Sprite).spriteFrame;
      t.rightNode.startFrame = t.rightNode.getComponent(cc.Sprite).spriteFrame;
    }
    this.registTouch();
  };
  _ctor.prototype.registTouch = function () {
    var e = this;
    this.touchNode = new cc.Node();
    this.touchNode.width = 1668;
    this.touchNode.height = 1002;
    this.node.addChild(this.touchNode);
    var t = null;
    var o = null;
    var i = null;
    var n = null;
    var a = 0;
    var u = 0;
    this.touchNode.on(cc.Node.EventType.TOUCH_START, function (o) {
      t = o.getLocation();
      n = null;
      for (var i = 0; i < e.infoList.length; i++) {
        var r = e.infoList[i];
        if (!r.leftNode.isFinish && r_UtilsSystem.UtilsSystem.touchInNode(r.leftNode, t)) {
          n = r;
          r_TriggerActionMgr.TriggerActionMgr.trigger(n.selectAction);
          "" != n.selectSound && r_SoundMgr.SoundMgr.playSound(n.selectSound);
          if (!e.curGraphic) {
            var h = new cc.Node();
            e.node.addChild(h);
            e.curGraphic = h.addComponent(cc.Graphics);
            e.curGraphic.lineWidth = 5;
          }
          e.curGraphic.strokeColor = r.lineColor;
          a = r.leftNode.x + r.leftNode.width / 2 - 5;
          u = r.leftNode.y;
          r.leftNode.getComponent(cc.Sprite).spriteFrame = r.leftSpriteFrame;
        }
      }
    });
    this.touchNode.on(cc.Node.EventType.TOUCH_MOVE, function (i) {
      if (t && (o = i.getLocation(), n)) {
        var s = e.node.convertToNodeSpaceAR(o);
        e.curGraphic.clear();
        e.curGraphic.moveTo(a, u);
        e.curGraphic.lineTo(s.x, s.y);
        e.curGraphic.stroke();
      }
    });
    var h = function () {
      n && (n.leftNode.getComponent(cc.Sprite).spriteFrame = n.leftNode.startFrame);
      e.curGraphic.clear();
    };
    this.touchNode.on(cc.Node.EventType.TOUCH_END, function (o) {
      if (t) {
        i = o.getLocation();
        for (var p = 0; p < e.infoList.length; p++) {
          var d = e.infoList[p];
          if (!d.rightNode.isFinish && r_UtilsSystem.UtilsSystem.touchInNode(d.rightNode, i)) {
            if (d.rightNode != n.rightNode) {
              h();
              "" != e.errorSound && r_SoundMgr.SoundMgr.playSound(e.errorSound);
              return void r_TriggerActionMgr.TriggerActionMgr.trigger(n.errorAction);
            } else {
              n.leftNode.isFinish = true;
              d.rightNode.isFinish = true;
              e.curGraphic.clear();
              e.curGraphic.moveTo(a, u);
              e.curGraphic.lineTo(d.rightNode.x - d.rightNode.width / 2, d.rightNode.y);
              e.curGraphic.stroke();
              e.curGraphic = null;
              d.rightNode.getComponent(cc.Sprite).spriteFrame = d.rightSpriteFrame;
              e.breathAnim(n.leftNode);
              e.breathAnim(d.rightNode);
              e.finishNum = e.finishNum + 1;
              "" != n.trueSound && r_SoundMgr.SoundMgr.playSound(n.trueSound);
              r_TriggerActionMgr.TriggerActionMgr.trigger(n.trueAction);
              return void (e.finishNum >= e.infoList.length && r_TimeSystem.TimeSystem.scheduleOnce("winTime", e.winDelayTime, function () {}));
            }
          }
        }
        h();
      }
    });
  };
  _ctor.prototype.onDisable = function () {
    r_TimeSystem.TimeSystem.scheduleClear("winTime");
  };
  _ctor.prototype.breathAnim = function (e) {
    cc.tween(e).to(.2, {
      scale: 1.2
    }).to(.2, {
      scale: 1
    }).to(.2, {
      scale: 1.2
    }).to(.2, {
      scale: 1
    }).call(function () {}).start();
  };
  __decorate([_property({
    type: [y],
    tooltip: "节点信息列表"
  })], _ctor.prototype, "infoList", undefined);
  __decorate([_property({
    displayName: "错误音效"
  })], _ctor.prototype, "errorSound", undefined);
  __decorate([_property({
    type: Number,
    displayName: "胜利延迟时间"
  })], _ctor.prototype, "winDelayTime", undefined);
  return __decorate([_ccclass, _menu("文字游戏/连线")], _ctor);
}(cc.Component);
exports.default = def_WordConnector;