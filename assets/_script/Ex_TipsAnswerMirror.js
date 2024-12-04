var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ex_TipsAnswerMirror = undefined;
var r_GameTipUI = require("GameTipUI");
var r_ViewTipsUI = require("ViewTipsUI");
var r_ExAB_TipsAnswer = require("ExAB_TipsAnswer");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var f = function () {
  function e() {
    this.bgNode = null;
    this.centerNode = null;
    this.focusMak = null;
    this.isNestMask = false;
    this.biggerScale = 1.2;
    this.oriScale = .5;
    this.oriPos = cc.Vec2.ZERO;
  }
  __decorate([_property({
    displayName: "被移动的背景节点",
    type: cc.Node
  })], e.prototype, "bgNode", undefined);
  __decorate([_property({
    displayName: "视口位置",
    type: cc.Node
  })], e.prototype, "centerNode", undefined);
  __decorate([_property({
    displayName: "遮罩层",
    type: cc.Node
  })], e.prototype, "focusMak", undefined);
  __decorate([_property({
    displayName: "遮罩层也被遮罩"
  })], e.prototype, "isNestMask", undefined);
  __decorate([_property({
    displayName: "放大Scale",
    range: [.5, 3, .1]
  })], e.prototype, "biggerScale", undefined);
  return __decorate([_ccclass("ShootLook")], e);
}();
var exp_Ex_TipsAnswerMirror = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.mirrorInfos = Array();
    t._tempV2 = cc.Vec2.ZERO;
    t.targetLocalPos = cc.v2();
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    e.prototype.onLoad.call(this);
    for (var t = 0; t < this.mirrorInfos.length; t++) {
      var o = this.mirrorInfos[t];
      o.bgNode || cc.warn("node " + this.node.name + "'s script Ex_TipsAnswerMoveBg need specific bgNode");
      o.centerNode || (o.centerNode = o.bgNode.parent);
      o.focusMak || cc.warn("node " + this.node.name + "'s script Ex_TipsAnswerMoveBg need specific focusMak");
    }
  };
  _ctor.prototype.showAnswer = function (e) {
    var t = this.answerInfos[e];
    if (t.tipTxt) {
      r_ViewTipsUI.ViewTipsUI.showAnserTip(t.tipTxt);
      r_GameTipUI.GameTipUI.setTipBtnVisible(true);
    } else if (t.tipNodes && t.tipNodes.length > 0) {
      this.BlockPlayer();
      for (var o = 0; o < this.mirrorInfos.length; o++) {
        this.mirrorInfos[o].centerNode.convertToWorldSpaceAR(cc.Vec2.ZERO, this._tempV2);
        this.node.convertToNodeSpaceAR(this._tempV2, this._tempV2);
        this.mirrorInfos[o].focusMak.position.x = this._tempV2.x;
        this.mirrorInfos[o].focusMak.position.y = this._tempV2.y;
        this.mirrorInfos[o].oriScale = this.mirrorInfos[o].bgNode.scale;
        this.mirrorInfos[o].bgNode.convertToWorldSpaceAR(cc.Vec2.ZERO, this.mirrorInfos[o].oriPos);
        this.mirrorInfos[o].bgNode.parent.convertToNodeSpaceAR(this.mirrorInfos[o].oriPos, this.mirrorInfos[o].oriPos);
        this.mirrorInfos[o].isNestMask && (this.mirrorInfos[o].focusMak.parent.active = true);
        this.mirrorInfos[o].focusMak.active = true;
        this.mirrorInfos[o].bgNode.scale;
        this.mirrorInfos[o].biggerScale;
        cc.tween(this.mirrorInfos[o].bgNode).to(.5, {
          scale: this.mirrorInfos[o].biggerScale
        }).start();
        this.moveAndBigBg(this.mirrorInfos[o], t.tipNodes[o]);
      }
    }
  };
  _ctor.prototype.moveAndBigBg = function (e, t) {
    return __awaiter(this, undefined, undefined, function () {
      var o;
      var i = this;
      return __generator(this, function (n) {
        switch (n.label) {
          case 0:
            if (t) {
              o = e.bgNode.position;
              t.convertToWorldSpaceAR(cc.Vec2.ZERO, this.targetLocalPos);
              e.centerNode.convertToNodeSpaceAR(this.targetLocalPos, this.targetLocalPos);
              return [4, new Promise(function (t) {
                cc.tween(e.focusMak).to(.5, {
                  opacity: 255,
                  width: 200,
                  height: 200
                }).start();
                cc.tween(e.bgNode).to(.5, {
                  x: (o.x - i.targetLocalPos.x) * e.biggerScale / e.oriScale,
                  y: (o.y - i.targetLocalPos.y) * e.biggerScale / e.oriScale
                }).call(function () {
                  setTimeout(function () {
                    t(1.5);
                  }, 1200);
                }).start();
                cc.tween(e.focusMak).delay(1.5).to(.2, {
                  opacity: 0,
                  width: 300,
                  height: 300
                }).start();
              })];
            } else {
              return [2];
            }
          case 1:
            n.sent();
            cc.Tween.stopAllByTarget(e.bgNode);
            cc.tween(e.bgNode).to(.5, {
              x: e.oriPos.x,
              y: e.oriPos.y,
              scale: e.oriScale
            }).call(function () {
              r_GameTipUI.GameTipUI.setTipBtnVisible(true);
              e.isNestMask && (e.focusMak.parent.active = false);
              e.focusMak.active = false;
              i.UnblockPlayer();
            }).start();
            return [2];
        }
      });
    });
  };
  __decorate([_property({
    displayName: "镜子信息",
    type: f
  })], _ctor.prototype, "mirrorInfos", undefined);
  return __decorate([_ccclass, _menu("新系统/02快捷脚本/关卡答案提示/镜像聚焦")], _ctor);
}(r_ExAB_TipsAnswer.default);
exports.Ex_TipsAnswerMirror = exp_Ex_TipsAnswerMirror;