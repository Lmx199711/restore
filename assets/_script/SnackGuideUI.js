var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SnackGuideUI = undefined;
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_ResSystem = require("ResSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseLayer = require("BaseLayer");
var r_SnackMakeSelectUI = require("SnackMakeSelectUI");
var r_SnackRoomFullUI = require("SnackRoomFullUI");
var exp_SnackGuideUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.SnackRoomFull, r_UIDef.UIDef.Res.UI.SnackGuideUI) || this;
    t.curIndex = 1;
    t.curStep = 0;
    t.ohterCfg = {
      1: [{
        content: "",
        cubeSay: "老板，咱们新店开业，需要抓紧置办一些礼盒"
      }, {
        content: "",
        cubeSay: "合理的摆放能提升销量，现在来制作礼盒吧~",
        finger: [150, -80, 1]
      }, {
        content: "",
        cubeSay: "",
        finger: [150, -80, 1]
      }]
    };
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.SnackGuideUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.SnackGuideUI);
  };
  _ctor.prototype.finishStep = function (e) {
    if (_ctor.Inst && e == this.curStep) {
      this.curStep += 1;
      if (this.curStep >= this.ohterCfg[this.curIndex].length) {
        r_PlayerData.PlayerData.data.snackRoomFull.isGuide = 1;
        r_PlayerData.PlayerData.setComeInSysCount(r_ReportSystem.SystemKey.零食满屋);
        r_PlayerData.PlayerData.saveData();
        _ctor.hide();
      } else {
        _ctor.Inst.startGuide();
      }
    }
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.sortingOrder = 10;
    this.clickLayer.onClick(this.onClickConitue, this);
    r_ResSystem.ResSystem.loadBundleRes("games", "snackRoomFull/employeeAnim", cc.Prefab, function (e, o) {
      var i = cc.instantiate(o);
      t.role.node.addChild(i);
      t.role.node.getChildByName("anim").getComponent(sp.Skeleton).setAnimation(0, "animation", true);
    });
  };
  _ctor.prototype.onShown = function () {
    var o = this;
    e.prototype.onShown.call(this);
    _ctor.Inst = this;
    this.curIndex = 1;
    this.curStep = 0;
    this.data && (this.curIndex = this.data);
    this.clickLayer.visible = true;
    this.tips.visible = true;
    r_ResSystem.ResSystem.loadBundleRes("games", "snackRoomFull/employeeAnim", cc.Prefab, function (e, t) {
      var i = cc.instantiate(t);
      o.role.node.addChild(i);
      o.role.node.getChildByName("anim").getComponent(sp.Skeleton).setAnimation(0, "animation", true);
    });
    this.startGuide();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.Inst = null;
  };
  _ctor.prototype.onClickConitue = function () {
    this.finishStep(0);
    this.clickLayer.visible = false;
    this.tips.visible = false;
  };
  _ctor.prototype.startGuide = function () {
    var e = this.ohterCfg[this.curIndex][this.curStep];
    if (e.cubeSay && "" != e.cubeSay) {
      this.contentPane.getController("c1").selectedIndex = 1;
      this.content.text = e.cubeSay;
    } else {
      this.contentPane.getController("c1").selectedIndex = 0;
    }
    this.guideCircle.visible = false;
    this.guideRect.visible = false;
    this.finger.visible = false;
    if (1 == this.curStep) {
      this.finger.visible = true;
      var t = r_SnackRoomFullUI.SnackRoomFullUI.Inst.btnMakeGift;
      this.startRect(t.localToGlobal(), t.width, t.height + 20, e);
    } else if (2 == this.curStep) {
      this.finger.visible = true;
      t = r_SnackMakeSelectUI.SnackMakeSelectUI.Inst.btnStartMake;
      this.startRect(t.localToGlobal(), t.width, t.height, e);
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
    var a = this.contentPane.globalToLocal(e.x + i.finger[0], e.y - i.finger[1]);
    this.finger.x = a.x;
    this.finger.y = a.y;
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
    this.guideCircle.getChild("circle").width = t;
    this.guideCircle.getChild("circle").height = o;
    var a = this.contentPane.globalToLocal(e.x + i.finger[0], e.y - i.finger[1]);
    this.finger.x = a.x;
    this.finger.y = a.y;
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
  _ctor.Inst = null;
  __decorate([r_DecorateFunction1.AutoFind("guideCircle")], _ctor.prototype, "guideCircle", undefined);
  __decorate([r_DecorateFunction1.AutoFind("guideRect")], _ctor.prototype, "guideRect", undefined);
  __decorate([r_DecorateFunction1.AutoFind("finger")], _ctor.prototype, "finger", undefined);
  __decorate([r_DecorateFunction1.AutoFind("bubble/content")], _ctor.prototype, "content", undefined);
  __decorate([r_DecorateFunction1.AutoFind("tips")], _ctor.prototype, "tips", undefined);
  __decorate([r_DecorateFunction1.AutoFind("clickLayer")], _ctor.prototype, "clickLayer", undefined);
  __decorate([r_DecorateFunction1.AutoFind("role")], _ctor.prototype, "role", undefined);
  return _ctor;
}(r_BaseLayer.BaseLayer);
exports.SnackGuideUI = exp_SnackGuideUI;