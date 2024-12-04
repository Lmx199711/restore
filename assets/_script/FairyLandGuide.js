var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FairyLandGuide = undefined;
var r_UIDef = require("UIDef");
var r_GroupSystem = require("GroupSystem");
var r_LimitSystem = require("LimitSystem");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var r_TimeSystem = require("TimeSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseLayer = require("BaseLayer");
var r_GetItemComUI = require("GetItemComUI");
var r_MainHomeUI = require("MainHomeUI");
var r_DialogueUI = require("DialogueUI");
var r_OfflineUI = require("OfflineUI");
var r_FairyLandShopUI = require("FairyLandShopUI");
var r_FairyLandUI = require("FairyLandUI");
var exp_FairyLandGuide = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.FairyLand, r_UIDef.UIDef.Res.UI.FairyLandGuide) || this;
    t.cfg = {
      1: {
        content: "",
        finger: [100, -100, 1],
        label: [0, 100]
      },
      2: {
        content: "",
        finger: [100, -100, 1],
        label: [0, 100]
      },
      3: {
        content: "你选择材料",
        contentBg: true,
        finger: [100, -100, 1],
        label: [0, 0]
      },
      4: {
        content: "",
        finger: [-100, -100, -1],
        label: [100, 200]
      }
    };
    return t;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return false;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.FairyLandGuide, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.FairyLandGuide);
  };
  _ctor.finishStep = function (e) {
    if (_ctor.curGuideStep == e && _ctor.Inst) {
      _ctor.curGuideStep = _ctor.curGuideStep + 1;
      if (2 == _ctor.curGuideStep || 5 == _ctor.curGuideStep) {
        _ctor.hide();
      } else {
        _ctor.Inst.startGuide();
      }
    }
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.sortingOrder = 10;
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.Inst = this;
    this.startGuide();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.Inst = null;
  };
  _ctor.prototype.startGuide = function () {
    var e = this.cfg[_ctor.curGuideStep];
    this.content.text = e.content;
    this.finger.node.opacity = 255;
    this.content.asTextField.color = cc.Color.WHITE;
    this.content.asTextField.fontSize = 30;
    this.contentBg.visible = !!e.contentBg;
    cc.Tween.stopAllByTarget(this.content.node);
    if (1 == _ctor.curGuideStep) {
      var o = r_FairyLandUI.FairyLandUI.Inst.btnWeapon;
      this.startCircle(o.localToGlobal(), o.width, o.height, e);
    } else if (2 == _ctor.curGuideStep) {
      o = r_FairyLandShopUI.FairyLandShopUI.Inst.btnForge;
      this.startCircle(o.localToGlobal(), o.width, o.height, e);
    } else if (3 == _ctor.curGuideStep) {
      this.finger.node.opacity = 0;
      o = r_FairyLandShopUI.FairyLandShopUI.Inst.guideArea;
      this.content.asTextField.color = cc.Color.BLACK.fromHEX("#fee69c");
      this.content.asTextField.fontSize = 35;
      cc.tween(this.content.node).repeat(3, cc.tween().to(.2, {
        scale: 1.2
      }).to(.2, {
        scale: 1
      })).start();
      this.startRect(o.localToGlobal(), o.width, o.height, e);
    } else if (4 == _ctor.curGuideStep) {
      o = r_FairyLandShopUI.FairyLandShopUI.Inst.btnRecBegin;
      this.startRect(o.localToGlobal(), o.width, o.height, e);
    }
  };
  _ctor.prototype.startRect = function (e, t, o, i) {
    this.guideCircle.visible = false;
    this.guideRect.visible = true;
    var n = this.guideRect.globalToLocal(e.x, e.y);
    this.guideRect.getChild("rect").x = n.x;
    this.guideRect.getChild("rect").y = n.y;
    this.guideRect.getChild("rect").width = t;
    this.guideRect.getChild("rect").height = o;
    var a = this.contentPane.globalToLocal(e.x + i.label[0], e.y - i.label[1]);
    this.content.x = a.x;
    this.content.y = a.y;
    this.contentBg.x = a.x;
    this.contentBg.y = a.y;
    var s = this.contentPane.globalToLocal(e.x + i.finger[0], e.y - i.finger[1]);
    this.finger.x = s.x;
    this.finger.y = s.y;
    this.finger.scaleX = i.finger[2];
    if (-1 == i.finger[2]) {
      this.playFingerAnim(true);
    } else {
      this.playFingerAnim();
    }
  };
  _ctor.prototype.startCircle = function (e, t, o, i) {
    this.guideCircle.visible = true;
    this.guideRect.visible = false;
    var n = this.guideCircle.globalToLocal(e.x, e.y);
    this.guideCircle.getChild("circle").x = n.x;
    this.guideCircle.getChild("circle").y = n.y;
    this.guideCircle.getChild("circle").width = t + 20;
    this.guideCircle.getChild("circle").height = o + 20;
    var a = this.contentPane.globalToLocal(e.x + i.label[0], e.y - i.label[1]);
    this.content.x = a.x;
    this.content.y = a.y;
    this.contentBg.x = a.x;
    this.contentBg.y = a.y;
    var s = this.contentPane.globalToLocal(e.x + i.finger[0], e.y - i.finger[1]);
    this.finger.x = s.x;
    this.finger.y = s.y;
    this.finger.scaleX = i.finger[2];
    if (-1 == i.finger[2]) {
      this.playFingerAnim(true);
    } else {
      this.playFingerAnim();
    }
  };
  _ctor.prototype.playFingerAnim = function (e) {
    undefined === e && (e = false);
    var t = cc.tween().by(.5, {
      x: -50,
      y: 50
    }).by(.5, {
      x: 50,
      y: -50
    });
    e && (t = cc.tween().by(.5, {
      x: 50,
      y: 50
    }).by(.5, {
      x: -50,
      y: -50
    }));
    cc.Tween.stopAllByTarget(this.finger.node);
    cc.tween(this.finger.node).repeatForever(t).start();
  };
  _ctor.needGuide = function () {
    return !r_OfflineUI.default.Inst && !(!r_LimitSystem.LimitSystem.getCheckLevelLimit(r_GroupSystem.GroupSystem.getLimitLevel().荒古遗迹) || 0 != r_PlayerData.PlayerData.data.isGuideFairyLand);
  };
  _ctor.canShowFairyLand = function () {
    return !!r_PlayerData.PlayerData.data.isGuideFairyLand;
  };
  _ctor.guideFairyLand = function () {
    this.isPlaying = true;
    r_PlayerData.PlayerData.data.isGuideFairyLand = 1;
    r_DialogueUI.DialogueUI.showUI({
      id: 1003,
      closeback: function () {
        _ctor.showHuanjing(r_MainHomeUI.default.Inst.huanJing);
      }
    });
  };
  _ctor.showHuanjing = function (e) {
    var t = this;
    e.visible = true;
    r_ResSystem.ResSystem.loadBundleRes("bundle2", "sill/huanjing", cc.Prefab, function (o, i) {
      var n = cc.instantiate(i);
      e.node.addChild(n);
      n.active = true;
      var a = n.getChildByName("anim").getComponent(sp.Skeleton);
      a.setAnimation(0, "step_1", false);
      r_TimeSystem.TimeSystem.scheduleOnce("huangjing", 1, function () {
        var o = a.setAnimation(0, "step_3", false);
        a.setTrackCompleteListener(o, function () {
          n.getChildByName("anim").active = false;
          n.getChildByName("bg").active = false;
          r_TimeSystem.TimeSystem.scheduleOnce("DialogueUI", .3, function () {
            r_DialogueUI.DialogueUI.showUI({
              id: 1004,
              closeback: function () {
                e.visible = false;
                r_GetItemComUI.GetItemComUI.showUI({
                  hideTitle: true,
                  titleTip: true,
                  iconUrl: "ui://" + r_UIDef.UIDef.Pack.Pop + "/荒古遗迹",
                  getDesc: "荒古遗迹已解锁",
                  closeCallback: function () {
                    t.isPlaying = false;
                  }
                });
              }
            });
          });
        });
      });
    });
  };
  _ctor.Inst = null;
  _ctor.curGuideStep = 1;
  _ctor.isPlaying = false;
  __decorate([r_DecorateFunction1.AutoFind("guideCircle")], _ctor.prototype, "guideCircle", undefined);
  __decorate([r_DecorateFunction1.AutoFind("guideRect")], _ctor.prototype, "guideRect", undefined);
  __decorate([r_DecorateFunction1.AutoFind("finger")], _ctor.prototype, "finger", undefined);
  __decorate([r_DecorateFunction1.AutoFind("content")], _ctor.prototype, "content", undefined);
  __decorate([r_DecorateFunction1.AutoFind("contentBg")], _ctor.prototype, "contentBg", undefined);
  return _ctor;
}(r_BaseLayer.BaseLayer);
exports.FairyLandGuide = exp_FairyLandGuide;