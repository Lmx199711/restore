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
    this.anwerNode = null;
    this.lbTitle = null;
    this.isTrue = false;
  }
  __decorate([_property({
    type: cc.Node,
    displayName: "答案节点"
  })], e.prototype, "anwerNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "标题"
  })], e.prototype, "lbTitle", undefined);
  __decorate([_property({
    displayName: "是否是正确答案"
  })], e.prototype, "isTrue", undefined);
  return __decorate([_ccclass("WordSelectInfo")], e);
}();
var def_WordSelect = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.infoList = [];
    t.trueAction = "";
    t.errorAction = "";
    t.gouNode = null;
    t.chaNode = null;
    t.trueSpriteFrame = null;
    t.falseSpriteFrame = null;
    t.trueSound = "";
    t.errorSound = "";
    t.touchNode = null;
    t.curGraphic = null;
    t.finishNum = 0;
    t.canTouch = true;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    for (var e = 0; e < this.infoList.length; e++) {
      var t = this.infoList[e];
      t.anwerNode.startColor = t.anwerNode.color;
      t.anwerNode.startFrame = t.anwerNode.getComponent(cc.Sprite).spriteFrame;
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
    this.touchNode.on(cc.Node.EventType.TOUCH_START, function (o) {
      if (e.canTouch) {
        t = o.getLocation();
        var i = function (o) {
          var i = e.infoList[o];
          if (r_UtilsSystem.UtilsSystem.touchInNode(i.anwerNode, t)) {
            var n = i.anwerNode.convertToWorldSpaceAR(cc.Vec2.ZERO);
            if (i.isTrue) {
              var a = e.gouNode.parent.convertToNodeSpaceAR(n);
              e.gouNode.x = a.x + i.anwerNode.width / 2 - 35;
              e.gouNode.y = a.y - i.anwerNode.height / 2 + 35;
              e.gouNode.active = true;
              i.anwerNode.color = cc.Color.WHITE;
              e.trueSound && r_SoundMgr.SoundMgr.playSound(e.trueSound);
              e.canTouch = false;
              i.anwerNode.getComponent(cc.Sprite).spriteFrame = e.trueSpriteFrame;
              r_TimeSystem.TimeSystem.scheduleOnce("WordSelectTrue", 1, function () {
                i.anwerNode.getComponent(cc.Sprite).spriteFrame = i.anwerNode.startFrame;
                e.canTouch = true;
                e.gouNode.active = false;
                i.anwerNode.color = i.anwerNode.startColor;
                r_TriggerActionMgr.TriggerActionMgr.trigger(e.trueAction);
              });
            } else {
              var u = e.chaNode.parent.convertToNodeSpaceAR(n);
              e.chaNode.x = u.x + i.anwerNode.width / 2 - 35;
              e.chaNode.y = u.y - i.anwerNode.height / 2 + 35;
              e.chaNode.active = true;
              e.canTouch = false;
              i.anwerNode.color = cc.Color.WHITE;
              e.errorSound && r_SoundMgr.SoundMgr.playSound(e.errorSound);
              r_TriggerActionMgr.TriggerActionMgr.trigger(e.errorAction);
              i.anwerNode.getComponent(cc.Sprite).spriteFrame = e.falseSpriteFrame;
              r_TimeSystem.TimeSystem.scheduleOnce("WordSelectFail", 1, function () {
                i.anwerNode.getComponent(cc.Sprite).spriteFrame = i.anwerNode.startFrame;
                e.canTouch = true;
                e.chaNode.active = false;
                i.anwerNode.color = i.anwerNode.startColor;
              });
            }
          }
        };
        for (var n = 0; n < e.infoList.length; n++) {
          i(n);
        }
      }
    });
    this.touchNode.on(cc.Node.EventType.TOUCH_MOVE, function () {});
    this.touchNode.on(cc.Node.EventType.TOUCH_END, function () {});
    setTimeout(function () {
      e.touchNode._touchListener.setSwallowTouches(false);
    }, 2);
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
    displayName: "选对的action"
  })], _ctor.prototype, "trueAction", undefined);
  __decorate([_property({
    displayName: "选错的action"
  })], _ctor.prototype, "errorAction", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "勾节点"
  })], _ctor.prototype, "gouNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "叉节点"
  })], _ctor.prototype, "chaNode", undefined);
  __decorate([_property({
    type: cc.SpriteFrame,
    displayName: "选对的背景"
  })], _ctor.prototype, "trueSpriteFrame", undefined);
  __decorate([_property({
    type: cc.SpriteFrame,
    displayName: "选错的背景"
  })], _ctor.prototype, "falseSpriteFrame", undefined);
  __decorate([_property({
    displayName: "选对音效"
  })], _ctor.prototype, "trueSound", undefined);
  __decorate([_property({
    displayName: "错误音效"
  })], _ctor.prototype, "errorSound", undefined);
  return __decorate([_ccclass, _menu("文字游戏/选择")], _ctor);
}(cc.Component);
exports.default = def_WordSelect;