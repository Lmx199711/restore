var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettingUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_SoundMgr = require("SoundMgr");
var r_PlayerData = require("PlayerData");
var r_PlatformSystem = require("PlatformSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_MainUI = require("MainUI");
var r_ResSystem = require("ResSystem");
var r_DebugUI = require("DebugUI");
var r_SDKMgr1 = require("SDKMgr1");
var r_MainHomeUI = require("MainHomeUI");
var r_RoleSystem = require("RoleSystem");
var r_MainAuditUI = require("MainAuditUI");
var r_CoinSystem = require("CoinSystem");
var exp_SettingUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Setting, r_UIDef.UIDef.Res.UI.SettingUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.SettingUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.SettingUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("labVersion").text = "version:" + r_SDKMgr1.SDKMgr1.gameVersion || "0.0.0";
    this.contentPane.getChild("touchArea").asButton.onClick(this.hide, this);
    this.btnMusic = this.contentPane.getChild("btnMusic");
    this.btnMusic.onClick(this.onClickMusic, this);
    this.btnSound = this.contentPane.getChild("btnSound");
    this.btnSound.onClick(this.onClickSound, this);
    this.btnShake = this.contentPane.getChild("btnShake");
    this.btnShake.onClick(this.onClickShake, this);
    this.btnDebug = this.contentPane.getChild("btnDebug");
    this.btnDebug.onClick(this.onClickDebug, this);
    this.list = this.contentPane.getChild("list").asList;
    this.list.itemRenderer = this.onListRenderer.bind(this);
    this.labOpenId = this.contentPane.getChild("labOpenId").asTextInput;
    this.btnRestart = this.contentPane.getChild("btnRestart").asButton;
    this.btnRestart.onClick(this.onClickRestart, this);
  };
  _ctor.prototype.onListRenderer = function (e, t) {
    var o = this;
    var i = e + 1;
    if (i == r_PlayerData.PlayerData.data.curHead) {
      t.getController("mode").selectedIndex = 2;
    } else if (r_PlayerData.PlayerData.data.headList.indexOf(i) > -1) {
      t.getController("mode").selectedIndex = 1;
    } else {
      t.getController("mode").selectedIndex = 0;
    }
    t.getChild("icon").visible = true;
    r_ResSystem.ResSystem.loadHeadImg(t.getChild("icon"), i);
    t.getChild("icon").clearClick();
    t.getChild("icon").onClick(function () {
      r_SoundMgr.SoundMgr.playSound("click");
      if (!(i == r_PlayerData.PlayerData.data.curHead)) {
        if (r_PlayerData.PlayerData.data.headList.indexOf(i) > -1) {
          r_PlayerData.PlayerData.data.curHead = i;
          r_PlayerData.PlayerData.saveData();
          o.refreshHead();
          r_MainHomeUI.default.instance && r_MainHomeUI.default.instance.refreshHead();
          r_MainUI.MainUI.Inst && r_MainUI.MainUI.Inst.refreshHead();
          r_MainAuditUI.default.Inst && r_MainAuditUI.default.Inst.refreshHead();
        } else {
          r_PlatformSystem.PlatformSystem.showVideo("解锁头像", function () {
            r_PlayerData.PlayerData.addHead(i);
            o.refreshHead();
          });
        }
      }
    }, this);
  };
  _ctor.prototype.onClickDebug = function () {
    r_DebugUI.DebugUI.showUI();
  };
  _ctor.prototype.onClickId = function () {
    r_PlatformSystem.PlatformSystem.copyUserId();
  };
  _ctor.prototype.onClickRestart = function () {
    if (null == r_MainUI.MainUI.Inst) {
      r_UtilsSystem.UtilsSystem.showAlert("重新开始会\n[清空当前存档]\n是否继续？", 0, function () {
        r_PlayerData.PlayerData.restart();
        r_MainHomeUI.default.instance.restart();
      }, this, "重新开始", "是的");
    } else {
      r_UtilsSystem.UtilsSystem.showTip("请回家重启人生");
    }
  };
  _ctor.prototype.onClickMusic = function () {
    if (r_PlayerData.PlayerData.data.isCloseMusic) {
      r_PlayerData.PlayerData.data.isCloseMusic = 0;
      if (r_SoundMgr.SoundMgr.curMusicName) {
        r_SoundMgr.SoundMgr.resumeMusic();
      } else {
        r_SoundMgr.SoundMgr.playMusic("bgm");
      }
    } else {
      r_PlayerData.PlayerData.data.isCloseMusic = 1;
      r_SoundMgr.SoundMgr.pauseMusic();
    }
    r_PlayerData.PlayerData.saveData();
    this.refreshBtn();
  };
  _ctor.prototype.onClickSound = function () {
    if (r_PlayerData.PlayerData.data.isCloseSound) {
      r_PlayerData.PlayerData.data.isCloseSound = 0;
      r_SoundMgr.SoundMgr.soundVolume = 1;
    } else {
      r_PlayerData.PlayerData.data.isCloseSound = 1;
      r_SoundMgr.SoundMgr.soundVolume = 0;
    }
    r_PlayerData.PlayerData.saveData();
    this.refreshBtn();
  };
  _ctor.prototype.onClickShake = function () {
    if (r_PlayerData.PlayerData.data.isCloseShake) {
      r_PlayerData.PlayerData.data.isCloseShake = 0;
    } else {
      r_PlayerData.PlayerData.data.isCloseShake = 1;
    }
    r_PlayerData.PlayerData.saveData();
    this.refreshBtn();
  };
  _ctor.prototype.onClickBack = function () {
    this.hide();
  };
  _ctor.prototype.onChangedMusic = function () {
    r_SoundMgr.SoundMgr.musicVolume = this.musicSlider.value / 100;
  };
  _ctor.prototype.onChangedShake = function () {
    r_SoundMgr.SoundMgr.soundVolume = this.soundSlider.value / 100;
  };
  _ctor.prototype.refreshHead = function () {
    this.list.numItems = 8;
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    r_RoleSystem.RoleSystem.isPause = true;
    r_CoinSystem.CoinSystem.isPause = true;
    this.btnRestart.visible = "1" == r_PlatformSystem.PlatformSystem.shenhe;
    this.refreshBtn();
    this.checkShowId();
    this.refreshHead();
    if (cc.sys.platform == cc.sys.DESKTOP_BROWSER || cc.sys.platform == cc.sys.MOBILE_BROWSER) {
      this.btnDebug.visible = true;
    } else {
      this.btnDebug.visible = false;
    }
    this.labOpenId.text = "";
    console.log("PlayerData.data.openId: ", r_PlayerData.PlayerData.data.openId);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_PlayerData.PlayerData.data.musicVolume = r_SoundMgr.SoundMgr.musicVolume;
    r_PlayerData.PlayerData.data.soundVolume = r_SoundMgr.SoundMgr.soundVolume;
    r_PlayerData.PlayerData.saveData();
    r_RoleSystem.RoleSystem.isPause = false;
    r_CoinSystem.CoinSystem.isPause = false;
  };
  _ctor.prototype.checkShowId = function () {};
  _ctor.prototype.refreshBtn = function () {
    if (r_PlayerData.PlayerData.data.isCloseMusic) {
      this.btnMusic.getController("state").selectedIndex = 0;
    } else {
      this.btnMusic.getController("state").selectedIndex = 1;
    }
    if (r_PlayerData.PlayerData.data.isCloseSound) {
      this.btnSound.getController("state").selectedIndex = 0;
    } else {
      this.btnSound.getController("state").selectedIndex = 1;
    }
    if (r_PlayerData.PlayerData.data.isCloseShake) {
      this.btnShake.getController("state").selectedIndex = 0;
    } else {
      this.btnShake.getController("state").selectedIndex = 1;
    }
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.SettingUI = exp_SettingUI;