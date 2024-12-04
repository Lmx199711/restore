var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhoneMakeUI2 = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_SoundMgr = require("SoundMgr");
var r_PlayerData = require("PlayerData");
var r_PlatformSystem = require("PlatformSystem");
var r_TimeSystem = require("TimeSystem");
var r_ReportSystem = require("ReportSystem");
var r_ResSystem = require("ResSystem");
var exp_PhoneMakeUI2 = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.PhoneMake, r_UIDef.UIDef.Res.UI.PhoneMakeUI) || this;
    t.uiType = "fullScreen";
    t.addCoinNum = 5e6;
    t.autoMakeTime = 300;
    t.makeOneTime = .3;
    t.moveAnimTime = 1.75;
    t.autoLeftTime = 0;
    t.curIndex = 0;
    t.isPlayAnim = false;
    t.isAutoMake = false;
    t.meimei0 = null;
    t.meimei1 = null;
    t.role = null;
    t.anims = ["daluos_kais", "daluos_d_1", "daluos_d_2", "daluos_d_3", "daluos_d_4", "daluos_jiesu"];
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.PhoneMakeUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.PhoneMakeUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.onClickBack, this);
    this.btnEquip = this.contentPane.getChild("btnEquip").asButton;
    this.btnEquip.onClick(this.onClickEquip, this);
    this.btnAuto = this.contentPane.getChild("btnAuto").asButton;
    this.btnAuto.onClick(this.onClickAuto, this);
    this.btnCoin = this.contentPane.getChild("btnCoin").asButton;
    this.btnCoin.onClick(this.onClickCoin, this);
    this.contentPane.getChild("btnUpgrade").asButton.onClick(function () {}, this);
    this.leftTimeCom = this.contentPane.getChild("leftTimeCom");
    r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/phoneMake/phoneMake2", cc.Prefab, function (e, o) {
      t.prefab = cc.instantiate(o);
      t.prefab.active = true;
      t.contentPane.getChild("center").node.addChild(t.prefab);
      t.meimei0 = t.prefab.getChildByName("meimei0").getComponent(sp.Skeleton);
      t.meimei1 = t.prefab.getChildByName("meimei1").getComponent(sp.Skeleton);
      t.role = t.prefab.getChildByName("daluos").getComponent(sp.Skeleton);
      t.role.setCompleteListener(t.animComplate.bind(t));
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
      var o = e * this.addCoinNum * r_PlayerData.PlayerData.data.makeCoeff;
      r_PlayerData.PlayerData.addCoin("自动打螺丝", o, r_ReportSystem.SystemKey.电子厂);
      this.isAutoMake = false;
    }
  };
  _ctor.prototype.setBtnCoin = function () {
    this.btnCoin.getChild("label").asLabel.text = "收益X" + (r_PlayerData.PlayerData.data.makeCoeff < 32 ? 2 * r_PlayerData.PlayerData.data.makeCoeff : 32);
    this.btnCoin.getController("c1").setSelectedIndex(r_PlayerData.PlayerData.data.makeCoeff >= 32 ? 1 : 0);
    this.btnCoin.enabled = r_PlayerData.PlayerData.data.makeCoeff < 32;
    this.btnCoin.grayed = false;
    this.contentPane.getChild("btnUpgrade").visible = false;
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    r_SoundMgr.SoundMgr.playMusic("luosibgm");
    this.role && (this.role.timeScale = 1);
    this.setBtnCoin();
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TimeSystem.TimeSystem.unregistSecondUpdate("PhoneMakeAutoMake");
    r_TimeSystem.TimeSystem.scheduleClear("Restart");
    r_SoundMgr.SoundMgr.playMusic("bgm");
  };
  _ctor.prototype.setAutoTime = function () {
    this.leftTimeCom.getChild("time").text = this.getTimeForm(this.autoLeftTime);
  };
  _ctor.prototype.getTimeForm = function (e) {
    var t = Math.floor(e / 60);
    var o = e % 60;
    return (t > 10 ? "" + t : "0" + t) + "_" + (o > 10 ? "" + o : "0" + o);
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
        this.role.timeScale = 1;
      }
    }
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
      e.role.timeScale = 1.2;
      r_TimeSystem.TimeSystem.registSecondUpdate("PhoneMakeAutoMake", e.secondUpdate.bind(e));
      e.onClickEquip();
    });
  };
  _ctor.prototype.onClickEquip = function () {
    if (this.prefab) {
      console.log("onClickEquip");
      if (!this.isPlayAnim) {
        r_SoundMgr.SoundMgr.playSound("pinzhuang");
        this.stepWorlk();
      }
    }
  };
  _ctor.prototype.onClickCoin = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("打螺丝收益翻倍", function () {
      r_PlayerData.PlayerData.data.makeCoeff < 32 && (r_PlayerData.PlayerData.data.makeCoeff *= 2);
      e.setBtnCoin();
    });
  };
  _ctor.prototype.restart = function () {
    this.curIndex = 1;
    this.btnAuto.visible = true;
    this.btnEquip.visible = true;
    this.leftTimeCom.visible = false;
    this.isAutoMake = false;
    this.isPlayAnim = false;
    this.meieMeiAnim(false);
  };
  _ctor.prototype.meieMeiAnim = function (e) {
    var t = this;
    if (e) {
      if (this.meimei0) {
        this.meimei0.setAnimation(0, "daluos_3", false);
        this.meimei0.setCompleteListener(function () {
          t.meimei0.setAnimation(0, "daluos_2", true);
        });
      }
      if (this.meimei1) {
        this.meimei1.setAnimation(0, "daluos_4", false);
        this.meimei1.setCompleteListener(function () {
          t.meimei1.setAnimation(0, "daluos_2", true);
        });
      }
    } else {
      this.role && this.role.setAnimation(0, "dakes", true);
      this.meimei0 && this.meimei0.setAnimation(0, "daluos_2", true);
      this.meimei1 && this.meimei1.setAnimation(0, "daluos_2", true);
    }
  };
  _ctor.prototype.stepWorlk = function () {
    r_TimeSystem.TimeSystem.scheduleClear("Restart");
    if (!this.isPlayAnim) {
      this.curIndex >= this.anims.length && (this.curIndex = 0);
      this.role.setAnimation(0, this.anims[this.curIndex], false);
      this.isPlayAnim = true;
      if (this.curIndex == this.anims.length - 1) {
        var e = this.addCoinNum * r_PlayerData.PlayerData.data.makeCoeff;
        this.meieMeiAnim(true);
        r_PlayerData.PlayerData.data.makeNum++;
        r_PlayerData.PlayerData.addCoin("单次打螺丝", e, r_ReportSystem.SystemKey.电子厂);
      }
      r_TimeSystem.TimeSystem.scheduleOnce("Restart", 4, this.restart.bind(this));
      this.curIndex++;
    }
  };
  _ctor.prototype.animComplate = function () {
    if ("dakes" != this.role.animation) {
      this.isPlayAnim = false;
      this.isAutoMake && this.stepWorlk();
    }
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.PhoneMakeUI2 = exp_PhoneMakeUI2;