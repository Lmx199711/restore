var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ex_TipsAnswerMoveNode = undefined;
var r_GameKeyMgr = require("GameKeyMgr");
var r_GameTipUI = require("GameTipUI");
var r_ViewTipsUI = require("ViewTipsUI");
var r_ExAB_TipsAnswer = require("ExAB_TipsAnswer");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var m = function (e) {
  function t() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.key = "";
    t.tipTxt = "";
    t.tipNodes = Array();
    t.tipPic = "";
    return t;
  }
  __extends(t, e);
  __decorate([_property({
    displayName: "答案key",
    tooltip: "保存这个key，表示本答案已经完成(仅一个key)"
  })], t.prototype, "key", undefined);
  __decorate([_property({
    displayName: "出现提示文本",
    tooltip: "出现提示的文字，直到key被保存"
  })], t.prototype, "tipTxt", undefined);
  __decorate([_property({
    displayName: "特写N个节点",
    type: cc.Node,
    tooltip: "依次展示这些节点，直到key被保存",
    visible: function () {
      return "" == this.tipTxt;
    }
  })], t.prototype, "tipNodes", undefined);
  __decorate([_property({
    displayName: "出现提示图片",
    tooltip: "出现提示的图片，直到key被保存",
    visible: function () {
      return !("" == this.tipTxt);
    }
  })], t.prototype, "tipPic", undefined);
  return __decorate([_ccclass("myTipAnswerInfo")], t);
}(r_ExAB_TipsAnswer.TipAnswerInfo);
var exp_Ex_TipsAnswerMoveNode = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.answerInfos = [];
    t.tipNodesKey = ["诡异痕迹:显示场景1,"];
    t.bgNode = null;
    t.centerNode = null;
    t.mark = null;
    t.focus = null;
    t.camera = null;
    t.focusMak = null;
    t.biggerScale = 1.2;
    t.oriScale = .5;
    t.oriPos = cc.Vec2.ZERO;
    t.Keys = [];
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
        if ((o = this.node.children[t]).getComponent(cc.Mask)) {
          this.focusMak = o;
          break;
        }
      }
      for (t = 0; t < this.node.children.length; t++) {
        var o;
        if ("提示动画" == (o = this.node.children[t]).name) {
          this.mark = o;
          break;
        }
      }
    }
    this.initCondition();
  };
  _ctor.prototype.showAnswer = function (e) {
    var t = this.answerInfos[e];
    if ("" != t.tipTxt) {
      if ("" != t.tipPic) {
        r_ViewTipsUI.ViewTipsUI.showAnserTip(t.tipTxt, t.tipPic);
      } else {
        r_ViewTipsUI.ViewTipsUI.showAnserTip(t.tipTxt);
      }
      r_GameTipUI.GameTipUI.setTipBtnVisible(true);
    } else if (t.tipNodes && t.tipNodes.length > 0) {
      this.BlockPlayer();
      this.centerNode.convertToWorldSpaceAR(cc.Vec2.ZERO, this._tempV2);
      this.node.convertToNodeSpaceAR(this._tempV2, this._tempV2);
      this.focusMak.position.x = this._tempV2.x;
      this.focusMak.position.y = this._tempV2.y;
      this.focus && this.focus.setPosition(this.focus.parent.convertToNodeSpaceAR(this.focusMak.convertToWorldSpaceAR(cc.Vec2.ZERO)));
      this.camera && this.camera.setPosition(this.camera.parent.convertToNodeSpaceAR(this.focusMak.convertToWorldSpaceAR(cc.Vec2.ZERO)));
      this.oriScale = this.bgNode.scale;
      this.bgNode.convertToWorldSpaceAR(cc.Vec2.ZERO, this.oriPos);
      this.bgNode.parent.convertToNodeSpaceAR(this.oriPos, this.oriPos);
      this.moveAndBigBg(t.tipNodes, t.key);
    }
  };
  _ctor.prototype.moveAndBigBg = function (e, t) {
    return __awaiter(this, undefined, undefined, function () {
      var o;
      var i;
      var n;
      var a = this;
      return __generator(this, function (s) {
        switch (s.label) {
          case 0:
            this.focusMak.active = true;
            o = function (o) {
              var n;
              var s;
              var c;
              var l;
              var u;
              var h;
              var p;
              return __generator(this, function (r) {
                switch (r.label) {
                  case 0:
                    if (n = e[o]) {
                      if (i.checkCondition(t, o)) {
                        return [2, "continue"];
                      } else {
                        cc.tween(i.bgNode).to(.5, {
                          scale: i.biggerScale
                        }).start();
                        s = n.convertToWorldSpaceAR(cc.Vec2.ZERO);
                        c = i.bgNode.convertToWorldSpaceAR(cc.Vec2.ZERO);
                        l = s.sub(c).multiplyScalar(i.biggerScale / i.bgNode.scale);
                        u = c.add(l);
                        h = i.node.convertToWorldSpaceAR(cc.Vec2.ZERO).sub(u);
                        p = i.bgNode.getPosition().add(h);
                        cc.tween(i.bgNode).to(.5, {
                          scale: i.biggerScale
                        }).start();
                        return [4, new Promise(function (e) {
                          cc.tween(a.focusMak).to(.5, {
                            opacity: 255,
                            width: 200,
                            height: 200
                          }).start();
                          cc.tween(a.mark).to(.5, {
                            opacity: 255
                          }).start();
                          cc.tween(a.bgNode).to(.5, {
                            x: p.x,
                            y: p.y
                          }).call(function () {
                            setTimeout(function () {
                              e(1);
                            }, 1200);
                          }).start();
                          cc.tween(a.mark).delay(1).to(.5, {
                            opacity: 0,
                            width: 300,
                            height: 300
                          }).start();
                          cc.tween(a.focusMak).delay(1).to(.5, {
                            opacity: 0,
                            width: 300,
                            height: 300
                          }).start();
                        })];
                      }
                    } else {
                      return [2, "continue"];
                    }
                  case 1:
                    r.sent();
                    return [2];
                }
              });
            };
            i = this;
            n = 0;
            s.label = 1;
          case 1:
            if (n < e.length) {
              return [5, o(n)];
            } else {
              return [3, 4];
            }
          case 2:
            s.sent();
            s.label = 3;
          case 3:
            n++;
            return [3, 1];
          case 4:
            cc.Tween.stopAllByTarget(this.bgNode);
            cc.tween(this.bgNode).to(.5, {
              x: this.oriPos.x,
              y: this.oriPos.y,
              scale: this.oriScale
            }).call(function () {
              r_GameTipUI.GameTipUI.setTipBtnVisible(true);
              a.focusMak.active = false;
              a.UnblockPlayer();
            }).start();
            return [2];
        }
      });
    });
  };
  _ctor.prototype.initCondition = function () {
    var e = this;
    this.tipNodesKey.forEach(function (t) {
      e.Keys[t.slice(0, t.indexOf(":"))] = t.slice(t.indexOf(":") + 1, t.length);
      console.log(e.Keys);
    });
  };
  _ctor.prototype.checkCondition = function (e, t) {
    if (!this.Keys[e]) {
      return false;
    }
    var o = this.Keys[e].split(",");
    return r_GameKeyMgr.GameKeyMgr.has(o[t]);
  };
  __decorate([_property({
    displayName: "答案信息",
    type: [m]
  })], _ctor.prototype, "answerInfos", undefined);
  __decorate([_property({
    displayName: "多提示节点时各节点需要满足的key",
    type: [cc.String]
  })], _ctor.prototype, "tipNodesKey", undefined);
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
    displayName: "提示动画",
    type: cc.Node
  })], _ctor.prototype, "mark", undefined);
  __decorate([_property({
    displayName: "聚焦点",
    type: cc.Node
  })], _ctor.prototype, "focus", undefined);
  __decorate([_property({
    displayName: "相机",
    type: cc.Node
  })], _ctor.prototype, "camera", undefined);
  __decorate([_property({
    displayName: "放大Scale",
    range: [.5, 3, .1]
  })], _ctor.prototype, "biggerScale", undefined);
  return __decorate([_ccclass, _menu("新系统/02快捷脚本/关卡答案提示/移动移动目标")], _ctor);
}(r_ExAB_TipsAnswer.default);
exports.Ex_TipsAnswerMoveNode = exp_Ex_TipsAnswerMoveNode;