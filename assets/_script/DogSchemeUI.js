var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_BaseWin = require("BaseWin");
var r_HouseUI = require("HouseUI");
var def_DogSchemeUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.DogScheme, r_UIDef.UIDef.Res.UI.DogSchemeUI) || this;
    t.showAnimFlag = false;
    t.m_coinList = ["200000000", "500000000", "300000000", "100000000", "400000000"];
    t.m_coin = "2000000000";
    t.m_videoNum = 0;
    return t;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return true;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.DogSchemeUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.DogSchemeUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btnVideo, this.btnGet, this.btnOk1, this.btnOk2);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_HouseUI.default.instace && r_HouseUI.default.instace.restart();
  };
  _ctor.prototype.restart = function () {
    var e = this;
    if (1 == r_PlayerData.PlayerData.data.isHasDogScheme) {
      this.contentPane.getController("c1").selectedIndex = 0;
      this.anim.playing = false;
      this.anim.loop = true;
      this.anim.animationName = "step_1";
      this.anim.playing = true;
    } else if (2 == r_PlayerData.PlayerData.data.isHasDogScheme) {
      this.contentPane.getController("c1").selectedIndex = 1;
      r_SoundMgr.SoundMgr.playSound("catchDog/变身狗策划");
      this.contentPane.getTransition("t0").play();
      this.anim.playing = false;
      this.anim.loop = false;
      this.anim.animationName = "step_2";
      this.anim.playing = true;
      r_TimeSystem.TimeSystem.scheduleOnce("step_3", 5.25, function () {
        e.anim.playing = false;
        e.anim.loop = true;
        e.anim.animationName = "step_3";
        e.anim.playing = true;
      });
      this.m_coin = "2000000000";
      this.labCoin.text = r_UtilsSystem.UtilsSystem.numFormats(parseInt(this.m_coin));
    } else if (3 == r_PlayerData.PlayerData.data.isHasDogScheme) {
      if (r_PlayerData.PlayerData.data.dogSchemeDay == new Date().toLocaleDateString()) {
        this.contentPane.getController("c1").selectedIndex = 2;
      } else {
        this.contentPane.getController("c1").selectedIndex = 3;
        this.m_coin = this.m_coinList[new Date().getDate() % this.m_coinList.length];
        this.labCoin.text = r_UtilsSystem.UtilsSystem.numFormats(parseInt(this.m_coin));
      }
      this.anim.playing = false;
      this.anim.loop = true;
      this.anim.animationName = "step_3";
      this.anim.playing = true;
    }
    this.btnVideo.getChild("num").text = "(" + this.m_videoNum + "/3)";
  };
  _ctor.prototype.onClickbtnVideo = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("解除狗策划诅咒", function () {
      e.m_videoNum++;
      if (e.m_videoNum >= 3) {
        r_PlayerData.PlayerData.data.isHasDogScheme = 2;
        r_PlayerData.PlayerData.saveData();
      }
      e.restart();
    });
  };
  _ctor.prototype.onClickbtnGet = function () {
    r_PlayerData.PlayerData.data.isHasDogScheme = 3;
    r_PlayerData.PlayerData.data.dogSchemeDay = new Date().toLocaleDateString();
    r_PlayerData.PlayerData.addCoin("解除狗策划诅咒", this.m_coin, r_ReportSystem.SystemKey.抓狗);
    this.restart();
  };
  _ctor.prototype.onClickbtnOk1 = function () {
    this.hide();
  };
  _ctor.prototype.onClickbtnOk2 = function () {
    r_PlayerData.PlayerData.data.dogSchemeDay = new Date().toLocaleDateString();
    r_PlayerData.PlayerData.addCoin("领取狗策划奖励", this.m_coin, r_ReportSystem.SystemKey.抓狗);
    this.restart();
  };
  __decorate([r_DecorateFunction1.AutoFind("btnVideo")], _ctor.prototype, "btnVideo", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnGet")], _ctor.prototype, "btnGet", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labCoin")], _ctor.prototype, "labCoin", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnOk1")], _ctor.prototype, "btnOk1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnOk2")], _ctor.prototype, "btnOk2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("anim")], _ctor.prototype, "anim", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_DogSchemeUI;