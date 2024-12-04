var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_PhoneSystem = require("PhoneSystem");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_MomoTipUI = require("MomoTipUI");
var r_MomoUI = require("MomoUI");
var r_MomoVipUI = require("MomoVipUI");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
_decorator.property;
var def_MomoCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.selectDistance = 100;
    t.posList = [];
    t.imageList = [];
    t.isPlayAnim = false;
    t.hateHistory = [];
    return t;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  _ctor.prototype.onLoad = function () {
    for (var e = 1; e <= 3; e++) {
      var t = this.node.getChildByName("showArea").getChildByName("image" + e);
      this.posList.push(t.y);
      this.imageList.push(t);
    }
    this.btnHate = this.node.getChildByName("btnHate");
    this.btnLove = this.node.getChildByName("btnLove");
    this.restart();
    _ref__ctor.Inst = this;
  };
  _ctor.prototype.refreshPerson = function (e) {
    undefined === e && (e = 0);
    for (var t = e; t < 3; t++) {
      var o = this.imageList[t];
      var i = r_PlayerData.PlayerData.data.momoData.curList[t];
      var n = r_PhoneSystem.PhoneSystem.getPersonCfg(i);
      o.getChildByName("name").getComponent(cc.Label).string = n.name;
      o.getChildByName("year").getComponent(cc.Label).string = n.age;
      o.getChildByName("area").getComponent(cc.Label).string = n.area;
      r_ResSystem.ResSystem.loadUIImg(o.getChildByName("pic"), "ui/momo/image/" + n.bg);
    }
  };
  _ctor.prototype.restart = function () {
    var e = this;
    this.registBtn(this.btnHate, function () {
      e.canSelect() && e.selectHate();
    });
    this.registBtn(this.btnLove, function () {
      e.canSelect() && e.selectLove();
    });
    this.registTouch();
  };
  _ctor.prototype.onEnable = function () {
    this.restart();
  };
  _ctor.prototype.selectBtn = function (e, t) {
    e.getChildByName("2") && (e.getChildByName("2").active = t);
  };
  _ctor.prototype.registBtn = function (e, t) {
    var o = this;
    e.off(cc.Node.EventType.TOUCH_START);
    e.off(cc.Node.EventType.TOUCH_MOVE);
    e.off(cc.Node.EventType.TOUCH_END);
    e.off(cc.Node.EventType.TOUCH_CANCEL);
    var i = null;
    var n = false;
    e.on(cc.Node.EventType.TOUCH_START, function (t) {
      n = false;
      i = t.getLocation();
      o.selectBtn(e, true);
    }, this);
    e.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
      var t = e.touch.getLocation();
      (Math.abs(t.x - i.x) > 50 || Math.abs(t.y - i.y) > 50) && (n = true);
    }, this);
    e.on(cc.Node.EventType.TOUCH_END, function () {
      n || t();
      o.selectBtn(e, false);
    }, this);
    e.on(cc.Node.EventType.TOUCH_CANCEL, function () {
      o.selectBtn(e, false);
    }, this);
  };
  _ctor.prototype.moveToBottom = function (e) {
    var t = this;
    undefined === e && (e = false);
    e || (r_PlayerData.PlayerData.data.momoData.selectNum = r_PlayerData.PlayerData.data.momoData.selectNum + 1);
    r_MomoUI.MomoUI.Inst && r_MomoUI.MomoUI.Inst.refreshSelectNum();
    this.isPlayAnim = true;
    this.imageList[0].zIndex = 1;
    this.imageList[1].zIndex = 3;
    this.imageList[2].zIndex = 2;
    cc.tween(this.imageList[1]).to(.2, {
      y: this.posList[0]
    }).start();
    cc.tween(this.imageList[2]).to(.2, {
      y: this.posList[1]
    }).start();
    cc.tween(this.imageList[0]).to(.2, {
      y: this.posList[2],
      x: 0,
      angle: 0
    }).call(function () {
      t.isPlayAnim = false;
    }).start();
    var o = this.imageList[0];
    this.imageList.splice(0, 1);
    this.imageList.push(o);
    this.refreshPerson(2);
  };
  _ctor.prototype.canSelect = function () {
    return !!r_PhoneSystem.PhoneSystem.canSelect() || (this.resetPos(), r_PlayerData.PlayerData.data.momoData.vipLevel < 2 ? (r_MomoVipUI.MomoVipUI.showUI(), false) : (r_UtilsSystem.UtilsSystem.showTip("今日划动次数已用完，请明日再试"), false));
  };
  _ctor.prototype.resetPos = function () {
    this.imageList[0].x = 0;
    this.imageList[0].y = 0;
    this.imageList[0].angle = 0;
  };
  _ctor.prototype.quickLove = function () {
    this.hateHistory = [];
    r_PhoneSystem.PhoneSystem.addToLove();
    this.moveToBottom(true);
  };
  _ctor.prototype.selectLove = function () {
    this.hateHistory = [];
    r_PhoneSystem.PhoneSystem.addToLove();
    this.moveToBottom();
  };
  _ctor.prototype.selectHate = function () {
    this.hateHistory.push(r_PlayerData.PlayerData.data.momoData.curList[0]);
    r_PhoneSystem.PhoneSystem.addToHate();
    this.moveToBottom();
  };
  _ctor.prototype.onTouchEnd = function () {
    this.selectBtn(this.btnLove, false);
    this.selectBtn(this.btnHate, false);
    if (this.imageList[0].x > this.selectDistance) {
      this.canSelect() && this.selectLove();
    } else if (this.imageList[0].x < -this.selectDistance) {
      this.canSelect() && this.selectHate();
    } else {
      this.resetPos();
    }
  };
  _ctor.prototype.registTouch = function () {
    var e = this;
    this.touchNode = this.node.getChildByName("touchArea");
    this.touchNode.off(cc.Node.EventType.TOUCH_START);
    this.touchNode.off(cc.Node.EventType.TOUCH_MOVE);
    this.touchNode.off(cc.Node.EventType.TOUCH_END);
    this.touchNode.off(cc.Node.EventType.TOUCH_CANCEL);
    var t = null;
    this.touchNode.on(cc.Node.EventType.TOUCH_START, function (o) {
      e.isPlayAnim || (t = o.getLocation());
    }, this);
    this.touchNode.on(cc.Node.EventType.TOUCH_MOVE, function (o) {
      if (!e.isPlayAnim) {
        var i = o.touch.getLocation();
        e.imageList[0].x = i.x - t.x;
        e.imageList[0].y = i.y - t.y;
        e.imageList[0].angle = e.getAnger();
        if (e.imageList[0].x > e.selectDistance) {
          e.selectBtn(e.btnLove, true);
        } else {
          e.selectBtn(e.btnLove, false);
        }
        if (e.imageList[0].x < -e.selectDistance) {
          e.selectBtn(e.btnHate, true);
        } else {
          e.selectBtn(e.btnHate, false);
        }
      }
    }, this);
    this.touchNode.on(cc.Node.EventType.TOUCH_END, function () {
      e.isPlayAnim || e.onTouchEnd();
    }, this);
    this.touchNode.on(cc.Node.EventType.TOUCH_CANCEL, function () {
      e.isPlayAnim || e.onTouchEnd();
    }, this);
  };
  _ctor.prototype.getAnger = function () {
    var e = this.imageList[0].y + 1e3;
    var t = this.imageList[0].x;
    return cc.v2(e, t).signAngle(cc.v2(1, 0)) / Math.PI * 180;
  };
  _ctor.prototype.onClickBack = function () {
    var e = this;
    console.log("点击Back");
    if (!(this.isPlayAnim || this.hateHistory.length <= 0)) {
      this.hateHistory.pop();
      this.isPlayAnim = true;
      this.imageList[0].zIndex = 2;
      this.imageList[1].zIndex = 1;
      this.imageList[2].zIndex = 3;
      this.imageList[2].x = -400;
      this.imageList[2].y = -80;
      this.imageList[2].angle = 25;
      cc.tween(this.imageList[0]).to(.2, {
        y: this.posList[1]
      }).start();
      cc.tween(this.imageList[1]).to(.2, {
        y: this.posList[2]
      }).start();
      cc.tween(this.imageList[2]).to(.2, {
        y: this.posList[0],
        x: 0,
        angle: 0
      }).call(function () {
        e.isPlayAnim = false;
      }).start();
      var t = this.imageList.pop();
      this.imageList.unshift(t);
      t = r_PlayerData.PlayerData.data.momoData.curList.pop();
      r_PlayerData.PlayerData.data.momoData.curList.unshift(t);
      this.refreshPerson();
      r_PlayerData.PlayerData.saveData();
    }
  };
  _ctor.prototype.onClickChat = function () {
    console.log("点击Chat");
    r_MomoTipUI.MomoTipUI.showUI({
      mode: 0,
      id: r_PlayerData.PlayerData.data.momoData.curList[0]
    });
  };
  _ctor.Inst = null;
  return _ref__ctor = __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_MomoCom;