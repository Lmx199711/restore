var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ex_TipsAnswerMoveBg = undefined;
var r_GameTipUI = require("GameTipUI");
var r_ViewTipsUI = require("ViewTipsUI");
var r_ExAB_TipsAnswer = require("ExAB_TipsAnswer");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var exp_Ex_TipsAnswerMoveBg = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.bgNode = null;
    t.centerNode = null;
    t.focusMak = null;
    t.biggerScale = 1.2;
    t.oriScale = .5;
    t.oriPos = cc.Vec2.ZERO;
    t._tempV2 = cc.Vec2.ZERO;
    t.targetLocalPos = cc.v2();
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    e.prototype.onLoad.call(this);
    this.bgNode || cc.warn("node " + this.node.name + "'s script Ex_TipsAnswerMoveBg need specific bgNode");
    this.centerNode || (this.centerNode = this.bgNode.parent);
    if (this.node.childrenCount > 0) {
      for (var t = 0; t < this.node.children.length; t++) {
        var o = this.node.children[t];
        if (o.getComponent(cc.Mask)) {
          this.focusMak = o;
          break;
        }
      }
    }
  };
  _ctor.prototype.showAnswer = function (e) {
    this.centerNode.convertToWorldSpaceAR(cc.Vec2.ZERO, this._tempV2);
    this.node.convertToNodeSpaceAR(this._tempV2, this._tempV2);
    this.focusMak.position.x = this._tempV2.x;
    this.focusMak.position.y = this._tempV2.y;
    this.oriScale = this.bgNode.scale;
    this.bgNode.convertToWorldSpaceAR(cc.Vec2.ZERO, this.oriPos);
    this.bgNode.parent.convertToNodeSpaceAR(this.oriPos, this.oriPos);
    var t = this.answerInfos[e];
    if (t.tipTxt) {
      r_GameTipUI.GameTipUI.setTipBtnVisible(true);
      r_ViewTipsUI.ViewTipsUI.showAnserTip(t.tipTxt);
    } else if (t.tipNodes && t.tipNodes.length > 0) {
      this.BlockPlayer();
      this.moveAndBigBg(t.tipNodes);
    }
  };
  _ctor.prototype.moveAndBigBg = function (e) {
    return __awaiter(this, undefined, undefined, function () {
      var t;
      var o;
      var i;
      var n = this;
      return __generator(this, function (a) {
        switch (a.label) {
          case 0:
            this.focusMak.active = true;
            this.bgNode.scale;
            this.biggerScale;
            cc.tween(this.bgNode).to(.5, {
              scale: this.biggerScale
            }).start();
            t = function (t) {
              var i;
              var a;
              return __generator(this, function (s) {
                switch (s.label) {
                  case 0:
                    if (i = e[t]) {
                      a = o.bgNode.position;
                      i.convertToWorldSpaceAR(cc.Vec2.ZERO, o.targetLocalPos);
                      o.centerNode.convertToNodeSpaceAR(o.targetLocalPos, o.targetLocalPos);
                      return [4, new Promise(function (e) {
                        cc.tween(n.focusMak).to(.5, {
                          opacity: 255,
                          width: 200,
                          height: 200
                        }).start();
                        cc.tween(n.bgNode).to(.5, {
                          x: a.x - n.targetLocalPos.x * n.biggerScale,
                          y: a.y - n.targetLocalPos.y * n.biggerScale
                        }).call(function () {
                          setTimeout(function () {
                            e(1);
                          }, 1200);
                        }).start();
                        cc.tween(n.focusMak).delay(1).to(.2, {
                          opacity: 0,
                          width: 300,
                          height: 300
                        }).start();
                      })];
                    } else {
                      return [2, "continue"];
                    }
                  case 1:
                    s.sent();
                    return [2];
                }
              });
            };
            o = this;
            i = 0;
            a.label = 1;
          case 1:
            if (i < e.length) {
              return [5, t(i)];
            } else {
              return [3, 4];
            }
          case 2:
            a.sent();
            a.label = 3;
          case 3:
            i++;
            return [3, 1];
          case 4:
            cc.Tween.stopAllByTarget(this.bgNode);
            cc.tween(this.bgNode).to(.5, {
              x: this.oriPos.x,
              y: this.oriPos.y,
              scale: this.oriScale
            }).call(function () {
              r_GameTipUI.GameTipUI.setTipBtnVisible(true);
              n.focusMak.active = false;
              n.UnblockPlayer();
            }).start();
            return [2];
        }
      });
    });
  };
  __decorate([_property({
    displayName: "被移动的背景节点",
    type: cc.Node
  })], _ctor.prototype, "bgNode", undefined);
  __decorate([_property({
    displayName: "视口位置",
    tooltip: "默认是bg的父节点轴心位置",
    type: cc.Node
  })], _ctor.prototype, "centerNode", undefined);
  __decorate([_property({
    displayName: "放大Scale",
    range: [.5, 3, .1]
  })], _ctor.prototype, "biggerScale", undefined);
  return __decorate([_ccclass, _menu("新系统/02快捷脚本/关卡答案提示/聚焦节点")], _ctor);
}(r_ExAB_TipsAnswer.default);
exports.Ex_TipsAnswerMoveBg = exp_Ex_TipsAnswerMoveBg;