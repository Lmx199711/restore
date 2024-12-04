var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_RussiaSystem = require("RussiaSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_BaseWin = require("BaseWin");
var r_RussiaGameUI = require("RussiaGameUI");
var def_RussiaTriggerUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Russia, r_UIDef.UIDef.Res.UI.RussiaTriggerUI) || this;
    t.showAnimFlag = false;
    t.bullets0 = [];
    t.bullets1 = [];
    t.bullets2 = [];
    t.bullets = [];
    t.m_num = 0;
    t.m_count = 2;
    t.m_maxNum = [6, 8, 10];
    return t;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return false;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.RussiaTriggerUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.RussiaTriggerUI);
    r_RussiaGameUI.default.Inst && r_RussiaGameUI.default.Inst.countDown();
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.sortingOrder = 100;
    for (var t = 1; t <= 6; t++) {
      var o = this.contentPane.getChild("n" + t);
      this.bullets.push(o);
    }
    for (t = 0; t < 6; t++) {
      (o = this.contentPane.getChild("bullet0_" + t)).onClick(this.onClickBubblet0.bind(this, t), this);
      this.bullets0.push(o);
    }
    for (t = 0; t < 8; t++) {
      (o = this.contentPane.getChild("bullet1_" + t)).onClick(this.onClickBubblet1.bind(this, t), this);
      this.bullets1.push(o);
    }
    for (t = 0; t < 10; t++) {
      (o = this.contentPane.getChild("bullet2_" + t)).onClick(this.onClickBubblet2.bind(this, t), this);
      this.bullets2.push(o);
    }
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ref__ctor.Inst = this;
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ref__ctor.Inst = null;
    r_RussiaGameUI.default.Inst && r_RussiaGameUI.default.Inst.laodBullet();
  };
  _ctor.prototype.restart = function () {
    this.BtnClose.visible = false;
    this.contentPane.getTransition("init").play();
    this.contentPane.getController("count").selectedIndex = this.data.round;
    this.contentPane.getController("level").selectedIndex = r_RussiaSystem.RussiaSystem.gameData.buffLevels[3];
    this.m_num = r_RussiaSystem.RussiaSystem.getBulletHoleNum(this.data.round);
  };
  _ctor.prototype.onClickBubblet0 = function (e) {
    var t = this;
    if (!(1 == this.bullets0[e].alpha || this.m_num <= 0)) {
      this.m_num--;
      this.bullets0[e].alpha = 1;
      this.bullets.forEach(function (e, o) {
        e.visible = o < t.m_num;
      });
      this.checkNumNull();
      r_SoundMgr.SoundMgr.playSound("russia/装弹");
    }
  };
  _ctor.prototype.onClickBubblet1 = function (e) {
    var t = this;
    if (!(1 == this.bullets1[e].alpha || this.m_num <= 0)) {
      this.m_num--;
      this.bullets1[e].alpha = 1;
      this.bullets.forEach(function (e, o) {
        e.visible = o < t.m_num;
      });
      this.checkNumNull();
      r_SoundMgr.SoundMgr.playSound("russia/装弹");
    }
  };
  _ctor.prototype.onClickBubblet2 = function (e) {
    var t = this;
    if (!(1 == this.bullets2[e].alpha || this.m_num <= 0)) {
      this.m_num--;
      this.bullets2[e].alpha = 1;
      this.bullets.forEach(function (e, o) {
        e.visible = o < t.m_num;
      });
      this.checkNumNull();
      r_SoundMgr.SoundMgr.playSound("russia/装弹");
    }
  };
  _ctor.prototype.checkNumNull = function () {
    0 == this.m_num && (this.BtnClose.visible = true);
  };
  __decorate([r_DecorateFunction1.AutoFind("BtnClose")], _ctor.prototype, "BtnClose", undefined);
  return _ref__ctor = __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.default = def_RussiaTriggerUI;