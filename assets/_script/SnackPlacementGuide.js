var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SnackPlacementGuide = undefined;
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var exp_SnackPlacementGuide = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.SnackRoomFull, r_UIDef.UIDef.Res.UI.SnackPlacementGuide) || this;
    t.curIndex = 1;
    t.ohterCfg = {};
    return t;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.SnackPlacementGuide, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.SnackPlacementGuide);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.sortingOrder = 10;
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ref__ctor.Inst = this;
    this.ohterCfg = {
      1: {
        content: " 点击可调整摆放方向",
        finger: [80, -80, 1],
        label: [0, 100]
      },
      2: {
        content: "不想要的零食可以放到回收区",
        finger: [50, -50, 1],
        label: [50, 100]
      }
    };
    if (this.data) {
      this.curIndex = this.data;
      this.startGuideOther();
    }
    this.clickLayer.node.off(cc.Node.EventType.TOUCH_START, this.touchStart, this);
    this.clickLayer.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    if (2 == this.curIndex) {
      r_PlayerData.PlayerData.data.snackRoomFull.isGameGuide = 1;
      r_PlayerData.PlayerData.saveData();
    }
    _ref__ctor.Inst = null;
  };
  _ctor.prototype.touchStart = function () {
    this.hide();
  };
  _ctor.prototype.startGuideOther = function () {
    var e = this.ohterCfg[this.curIndex];
    if (1 == this.curIndex) {
      var t = this.step1;
      this.startCircle(t.localToGlobal(), t.width, t.height, e);
    } else {
      t = this.step2_3;
      this.startRect(t.localToGlobal(), t.width, t.height, e, false);
      this.playFingerAnim2(e);
    }
  };
  _ctor.prototype.startRect = function (e, t, o, i, n) {
    undefined === n && (n = true);
    this.guideCircle.visible = false;
    this.guideRect.visible = true;
    var a = this.guideRect.globalToLocal(e.x, e.y);
    this.guideRect.getChild("rect").x = a.x;
    this.guideRect.getChild("rect").y = a.y;
    this.guideRect.getChild("rect").width = t;
    this.guideRect.getChild("rect").height = o;
    this.content.text = i.content;
    var s = this.contentPane.globalToLocal(e.x + i.finger[0], e.y - i.finger[1]);
    this.finger.x = s.x;
    this.finger.y = s.y;
    this.finger.scaleX = i.finger[2];
    n && this.playFingerAnim1();
  };
  _ctor.prototype.startCircle = function (e, t, o, i, n) {
    undefined === n && (n = true);
    this.guideCircle.visible = true;
    this.guideRect.visible = false;
    var a = this.guideCircle.globalToLocal(e.x, e.y);
    this.guideCircle.getChild("circle").x = a.x;
    this.guideCircle.getChild("circle").y = a.y;
    this.guideCircle.getChild("circle").width = t + 20;
    this.guideCircle.getChild("circle").height = o + 20;
    this.content.text = i.content;
    var s = this.contentPane.globalToLocal(e.x + i.finger[0], e.y - i.finger[1]);
    this.finger.x = s.x;
    this.finger.y = s.y;
    this.finger.scaleX = i.finger[2];
    if (n) {
      if (-1 == i.finger[2]) {
        this.playFingerAnim(true);
      } else {
        this.playFingerAnim();
      }
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
  _ctor.prototype.playFingerAnim1 = function () {
    var e = cc.tween().by(.5, {
      x: -100,
      y: 0
    }).by(.5, {
      x: 100,
      y: 0
    });
    cc.Tween.stopAllByTarget(this.finger.node);
    cc.tween(this.finger.node).repeatForever(e).start();
  };
  _ctor.prototype.playFingerAnim2 = function (e) {
    this.finger.x = this.step2.x + e.finger[0];
    this.finger.y = this.step2.y - e.finger[1];
    var t = cc.tween().to(1, {
      x: this.step2_2.x + e.finger[0],
      y: this.step2_2.y - e.finger[1]
    }).to(1, {
      x: this.step2.x + e.finger[0],
      y: this.step2.y - e.finger[1]
    });
    cc.Tween.stopAllByTarget(this.finger.node);
    cc.tween(this.finger).repeatForever(t).start();
  };
  _ctor.Inst = null;
  __decorate([r_DecorateFunction1.AutoFind("guideCircle")], _ctor.prototype, "guideCircle", undefined);
  __decorate([r_DecorateFunction1.AutoFind("guideRect")], _ctor.prototype, "guideRect", undefined);
  __decorate([r_DecorateFunction1.AutoFind("t1")], _ctor.prototype, "content", undefined);
  __decorate([r_DecorateFunction1.AutoFind("finger")], _ctor.prototype, "finger", undefined);
  __decorate([r_DecorateFunction1.AutoFind("step1")], _ctor.prototype, "step1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("step2")], _ctor.prototype, "step2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("step2_2")], _ctor.prototype, "step2_2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("clickLayer")], _ctor.prototype, "clickLayer", undefined);
  __decorate([r_DecorateFunction1.AutoFind("step2_3")], _ctor.prototype, "step2_3", undefined);
  return _ref__ctor = __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.SnackPlacementGuide = exp_SnackPlacementGuide;