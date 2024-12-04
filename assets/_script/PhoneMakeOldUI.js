var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhoneMakeOldUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_SoundMgr = require("SoundMgr");
var r_PlayerData = require("PlayerData");
var r_UtilsSystem = require("UtilsSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_TimeSystem = require("TimeSystem");
var r_ResSystem = require("ResSystem");
var exp_PhoneMakeOldUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.PhoneMake, r_UIDef.UIDef.Res.UI.PhoneMakeOldUI) || this;
    t.uiType = "fullScreen";
    t.addCoinNum = 500;
    t.autoMakeTime = 60;
    t.makeOneTime = .3;
    t.moveAnimTime = 1.75;
    t.maxNum = 10;
    t.equipList = [];
    t.equip1List = [];
    t.equip2List = [];
    t.autoLeftTime = 0;
    t.curIndex = 0;
    t.isPlayAnim = false;
    t.isAutoMake = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.PhoneMakeOldUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.PhoneMakeOldUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.onClickBack, this);
    this.btnEquip = this.contentPane.getChild("btnEquip").asButton;
    this.btnEquip.onClick(this.onClickEquip, this);
    this.btnAuto = this.contentPane.getChild("btnAuto").asButton;
    this.btnAuto.onClick(this.onClickAuto, this);
    this.leftTimeCom = this.contentPane.getChild("leftTimeCom");
    r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/phoneMake/phoneMake", cc.Prefab, function (e, o) {
      t.prefab = cc.instantiate(o);
      t.prefab.active = true;
      t.contentPane.getChild("center").node.addChild(t.prefab);
      t.restart();
    });
  };
  _ctor.prototype.onClickBack = function () {
    this.hide();
    if (this.isAutoMake) {
      var e = 0;
      for (var t = 0; t < 1e3 && !(this.curIndex >= 10 && (e += 1, this.autoLeftTime = this.autoLeftTime - this.moveAnimTime, this.autoLeftTime < 0)) && (this.curIndex = this.curIndex + 1, this.autoLeftTime = this.autoLeftTime - this.makeOneTime, !(this.autoLeftTime < 0)); t++) {
        ;
      }
      var o = e * this.addCoinNum;
      r_PlayerData.PlayerData.addCoin("电子厂", o);
      this.isAutoMake = false;
    }
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TimeSystem.TimeSystem.unregistSecondUpdate("PhoneMakeAutoMake");
  };
  _ctor.prototype.secondUpdate = function () {
    if (this.isAutoMake) {
      this.autoLeftTime = this.autoLeftTime - 1;
      this.setAutoTime();
      if (this.autoLeftTime <= 0) {
        r_TimeSystem.TimeSystem.unregistSecondUpdate("PhoneMakeAutoMake");
        this.btnAuto.visible = true;
        this.btnEquip.visible = true;
        this.isAutoMake = false;
        this.leftTimeCom.visible = false;
      }
    }
  };
  _ctor.prototype.setAutoTime = function () {
    this.leftTimeCom.getChild("time").text = "00_" + this.autoLeftTime;
  };
  _ctor.prototype.onClickAuto = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("自动打螺丝", function () {
      e.btnAuto.visible = false;
      e.btnEquip.visible = false;
      e.isAutoMake = true;
      e.autoLeftTime = e.autoMakeTime;
      e.leftTimeCom.visible = true;
      e.setAutoTime();
      r_TimeSystem.TimeSystem.registSecondUpdate("PhoneMakeAutoMake", e.secondUpdate.bind(e));
      e.onClickEquip();
    });
  };
  _ctor.prototype.onClickEquip = function () {
    var e = this;
    if (this.prefab && (console.log("onClickEquip"), !this.isPlayAnim)) {
      r_SoundMgr.SoundMgr.playSound("pinzhuang");
      this.isPlayAnim = true;
      var t = this.equip1List[this.curIndex];
      t.zIndex = 100;
      var o = this.equip2List[this.curIndex];
      o.zIndex = 101;
      var i = this.prefab.getChildByName("target").getChildByName(this.curIndex + 1 + "");
      cc.tween(t).to(.4 * this.makeOneTime, {
        x: this.prefab.getChildByName("equip1").x,
        y: this.prefab.getChildByName("equip1").y,
        angle: 0
      }).to(.6 * this.makeOneTime, {
        x: i.x,
        y: i.y + 2
      }).start();
      cc.tween(o).to(.4 * this.makeOneTime, {
        x: this.prefab.getChildByName("equip2").x,
        y: this.prefab.getChildByName("equip2").y,
        angle: 0
      }).to(.6 * this.makeOneTime, {
        x: i.x,
        y: i.y - 12
      }).call(function () {
        t.active = false;
        o.active = false;
        i.active = true;
        e.curIndex = e.curIndex + 1;
        if (e.curIndex == e.maxNum) {
          e.playMoveAnim();
        } else {
          e.isPlayAnim = false;
          e.isAutoMake && e.onClickEquip();
        }
      }).start();
    }
  };
  _ctor.prototype.playMoveAnim = function () {
    var e = this;
    this.isPlayAnim = true;
    r_PlayerData.PlayerData.addCoin("电子厂", this.addCoinNum);
    this.hideTargetPhone();
    this.prefab.getChildByName("kuang").active = false;
    var t = this.prefab.getChildByName("kuangAnim");
    t.active = true;
    t.getComponent(sp.Skeleton).timeScale = 2;
    var o = t.getComponent(sp.Skeleton).setAnimation(0, "step_2", false);
    t.getComponent(sp.Skeleton).setTrackCompleteListener(o, function () {
      t.active = false;
      e.prefab.getChildByName("kuang").active = true;
    });
    r_SoundMgr.SoundMgr.playSound("liushuixian");
    var i = this.prefab.getChildByName("phoneRoot");
    i.x = 1002;
    this.randomEquip();
    cc.tween(i).to(this.moveAnimTime, {
      x: 0
    }).call(function () {
      e.curIndex = 0;
      e.isPlayAnim = false;
      e.isAutoMake && e.onClickEquip();
    }).start();
  };
  _ctor.prototype.restart = function () {
    if (this.prefab) {
      this.curIndex = 0;
      this.btnAuto.visible = true;
      this.btnEquip.visible = true;
      this.leftTimeCom.visible = false;
      this.isAutoMake = false;
      this.isPlayAnim = false;
      this.hideTargetPhone();
      var e = this.prefab.getChildByName("phoneRoot");
      e.x = 0;
      e.y = 0;
      this.randomEquip();
    }
  };
  _ctor.prototype.hideTargetPhone = function () {
    var e = this.prefab.getChildByName("target");
    for (var t = 1; t <= this.maxNum; t++) {
      e.getChildByName(t + "").active = false;
    }
  };
  _ctor.prototype.randomEquip = function () {
    var e = this.prefab.getChildByName("phoneRoot");
    if (0 == this.equip1List.length) {
      var t = this.prefab.getChildByName("equip1");
      for (var o = 1; o <= this.maxNum; o++) {
        (n = cc.instantiate(t)).active = true;
        e.addChild(n);
        this.equip1List.push(n);
        this.equipList.push(n);
      }
      var i = this.prefab.getChildByName("equip2");
      for (o = 1; o <= this.maxNum; o++) {
        var n;
        (n = cc.instantiate(i)).active = true;
        e.addChild(n);
        this.equip2List.push(n);
        this.equipList.push(n);
      }
    }
    var a = function (e) {
      var t = r_UtilsSystem.UtilsSystem.getRandomNum(s.x - s.width / 2, s.x + s.width / 2);
      var o = r_UtilsSystem.UtilsSystem.getRandomNum(s.y - s.height / 2, s.y + s.height / 2);
      var i = r_UtilsSystem.UtilsSystem.getRandomNum(-60, 60);
      e.x = t;
      e.y = o;
      e.angle = i;
      e.scale = 1;
      e.active = true;
    };
    var s = this.prefab.getChildByName("randomArea");
    for (o = 0; o < this.maxNum; o++) {
      a(this.equip1List[o]);
      a(this.equip2List[o]);
    }
    r_UtilsSystem.UtilsSystem.shuffle(this.equipList);
    for (o = 0; o < this.equipList.length; o++) {
      this.equipList[o].zIndex = o;
    }
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.PhoneMakeOldUI = exp_PhoneMakeOldUI;