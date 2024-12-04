var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmgcUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_EmgcSystem = require("EmgcSystem");
var r_ResSystem = require("ResSystem");
var r_PlayerData = require("PlayerData");
var r_ChatSystem = require("ChatSystem");
var r_TimeSystem = require("TimeSystem");
var r_SDKMgr1 = require("SDKMgr1");
var r_EmgcCfg = require("EmgcCfg");
var r_ReportSystem = require("ReportSystem");
var exp_EmgcUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Emgc, r_UIDef.UIDef.Res.UI.EmgcUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.EmgcUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.EmgcUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.btnLeft = this.contentPane.getChild("btnLeft").asButton;
    this.btnLeft.onClick(this.onClickLeft, this);
    this.btnLeft.startX = this.btnLeft.x;
    this.btnRight = this.contentPane.getChild("btnRight").asButton;
    this.btnRight.onClick(this.onClickRight, this);
    this.btnRight.startX = this.btnRight.x;
    this.iconUI = this.contentPane.getChild("icon");
    this.content = this.contentPane.getChild("content");
    this.content.onClick(function () {
      if (t.emgcCfg) {
        r_TimeSystem.TimeSystem.clearTimeMapUpdate("emgcTalk");
        t.content.text = t.emgcCfg.content;
      }
    });
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.refreshInfo();
    r_SDKMgr1.SDKMgr1.showBanner();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_SDKMgr1.SDKMgr1.hideBanner();
  };
  _ctor.prototype.refreshInfo = function () {
    var e = this;
    this.emgcCfg = r_EmgcSystem.EmgcSystem.getEmgcCfgById(this.data.id);
    r_ResSystem.ResSystem.loadFguiImg(this.iconUI, "ui/emgc/icon/" + this.emgcCfg.icon);
    r_ResSystem.ResSystem.loadFguiImg(this.btnLeft.getChild("icon"), "ui/emgc/btn/" + this.emgcCfg.btn1);
    if (this.emgcCfg.btn2) {
      r_ResSystem.ResSystem.loadFguiImg(this.btnRight.getChild("icon"), "ui/emgc/btn/" + this.emgcCfg.btn2);
      this.btnLeft.x = this.btnLeft.startX;
      this.btnRight.x = this.btnRight.startX;
      this.btnLeft.visible = true;
      this.btnRight.visible = true;
    } else {
      this.btnLeft.x = (this.btnLeft.startX + this.btnRight.startX) / 2;
      this.btnLeft.visible = true;
      this.btnRight.visible = false;
    }
    this.btnLeft.getController("video").selectedIndex = this.emgcCfg.btnVideo1;
    this.btnRight.getController("video").selectedIndex = this.emgcCfg.btnVideo2;
    this.content.text = this.emgcCfg.content;
    r_TimeSystem.TimeSystem.timeMapUpdate("emgcTalk", 3, function (t) {
      e.content.text = e.emgcCfg.content.substring(0, Math.ceil(t * e.emgcCfg.content.length));
    });
  };
  _ctor.prototype.triggerResult = function (e, t) {
    var o = this;
    var i = function () {
      var e = parseInt(t);
      if (e > 0) {
        r_PlayerData.PlayerData.addCoin("突发事件", e);
      } else {
        e = -e;
        if (!r_PlayerData.PlayerData.isCoinEnough(e)) {
          return void r_PlayerData.PlayerData.deleteCoin("突发事件", r_PlayerData.PlayerData.bigCoin, r_ReportSystem.SystemKey.None);
        }
        r_PlayerData.PlayerData.deleteCoin("突发事件", e, r_ReportSystem.SystemKey.None);
      }
      o.emgcCfg.callBack && o.emgcCfg.callBack();
      o.hide();
    };
    if ("chat" == e) {
      r_ChatSystem.ChatSystem.triggerTask(t);
      this.hide();
    } else if ("coin" == e) {
      i();
    } else if (e == r_EmgcCfg.EmgcEnum.视频金币) {
      r_PlatformSystem.PlatformSystem.showVideo("突发金币事件", i);
    } else if ("nextEmgc" == e) {
      this.data.id = t;
      this.refreshInfo();
    } else {
      this.hide();
    }
  };
  _ctor.prototype.onClickLeft = function () {
    this.triggerResult(this.emgcCfg.resultType1, this.emgcCfg.resultParam1);
  };
  _ctor.prototype.onClickRight = function () {
    this.triggerResult(this.emgcCfg.resultType2, this.emgcCfg.resultParam2);
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.EmgcUI = exp_EmgcUI;