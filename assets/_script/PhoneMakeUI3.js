var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhoneMakeUI3 = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_SoundMgr = require("SoundMgr");
var r_PlayerData = require("PlayerData");
var r_FguiGestureSys = require("FguiGestureSys");
var r_ReportSystem = require("ReportSystem");
var r_ResSystem = require("ResSystem");
var exp_PhoneMakeUI3 = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.PhoneMake, r_UIDef.UIDef.Res.UI.PhoneMakeUI3) || this;
    t.uiType = "fullScreen";
    t.reward = 15e4;
    t.reward2 = 66e4;
    t.curIndex = 0;
    t.isPlayAnim = false;
    t.isAutoMake = false;
    t.role = null;
    t.anims = ["step_0", "step_1", "step_2", "step_3", "step_3_1", "step_4", "step_5", "step_6", "step_7"];
    t.eyeglassPos = cc.v2();
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.PhoneMakeUI3, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.PhoneMakeUI3);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.onClickBack, this);
    this.contentPane.onClick(this.onClickEquip, this);
    var o = this.contentPane.getChild("eyeglass");
    this.eyeglassPos = cc.v2(o.x, o.y);
    var i = this.contentPane.getChild("eyeglassTarget");
    r_FguiGestureSys.FguiGestureSys.bindMoveEvent("eyeglass", o, o, i, this.eyeglassDrop.bind(this));
    r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/phoneMake/phoneMake3", cc.Prefab, function (e, o) {
      t.prefab = cc.instantiate(o);
      t.prefab.active = true;
      t.contentPane.getChild("center").node.addChild(t.prefab);
      t.light = t.prefab.getChildByName("light");
      t.role = t.prefab.getChildByName("daluos").getComponent(sp.Skeleton);
      t.role.setCompleteListener(t.animComplate.bind(t));
      t.restart();
    });
  };
  _ctor.prototype.eyeglassDrop = function () {
    r_PlayerData.PlayerData.data.makeEyeglass = true;
    r_PlayerData.PlayerData.saveData();
    this.setEyeglass();
  };
  _ctor.prototype.setEyeglass = function () {
    var e;
    var t = this.contentPane.getChild("eyeglass");
    t.visible = !r_PlayerData.PlayerData.data.makeEyeglass;
    this.light && (this.light.active = r_PlayerData.PlayerData.data.makeEyeglass);
    this.isAutoMake = r_PlayerData.PlayerData.data.makeEyeglass;
    null === (e = this.role) || undefined === e || e.setSkin(this.isAutoMake ? "hong" : "lan");
    if (this.isAutoMake) {
      this.stepWorlk();
      r_SoundMgr.SoundMgr.playMusic("佛山电焊");
    } else {
      r_SoundMgr.SoundMgr.playMusic("luosibgm");
      t.x = this.eyeglassPos.x;
      t.y = this.eyeglassPos.y;
    }
  };
  _ctor.prototype.onClickBack = function () {
    this.hide();
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_SoundMgr.SoundMgr.playMusic("bgm");
  };
  _ctor.prototype.onClickEquip = function () {
    if (!(!this.role || this.isAutoMake || this.isPlayAnim)) {
      r_SoundMgr.SoundMgr.playSound("pinzhuang");
      this.stepWorlk();
    }
  };
  _ctor.prototype.restart = function () {
    this.curIndex = 1;
    this.isAutoMake = false;
    this.isPlayAnim = false;
    this.idle();
    this.setEyeglass();
  };
  _ctor.prototype.idle = function () {
    var e;
    null === (e = this.role) || undefined === e || e.setAnimation(0, this.anims[0], true);
  };
  _ctor.prototype.stepWorlk = function () {
    if (!this.isPlayAnim && this.role) {
      this.curIndex >= this.anims.length && (this.curIndex = 1);
      this.role.setAnimation(0, this.anims[this.curIndex], false);
      this.curIndex++;
      this.isPlayAnim = true;
      this.curIndex >= this.anims.length && r_PlayerData.PlayerData.addCoin("升级电翰", this.isAutoMake ? this.reward2 : this.reward, r_ReportSystem.SystemKey.电子厂);
    }
  };
  _ctor.prototype.animComplate = function () {
    if ("step_0" != this.role.animation) {
      this.isPlayAnim = false;
      if (this.isAutoMake) {
        this.stepWorlk();
      } else {
        this.curIndex >= this.anims.length && this.idle();
      }
    }
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.PhoneMakeUI3 = exp_PhoneMakeUI3;