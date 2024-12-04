var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhoneUI = undefined;
var r_UIDef = require("UIDef");
var r_ChatSystem = require("ChatSystem");
var r_PhoneSystem = require("PhoneSystem");
var r_SDKMgr1 = require("SDKMgr1");
var r_SleepAppData = require("SleepAppData");
var r_BaseWin = require("BaseWin");
var r_ResSystem = require("ResSystem");
var r_BlockSystem = require("BlockSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_PhoneCfg = require("PhoneCfg");
var r_Config = require("Config");
var exp_PhoneUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Phone, r_UIDef.UIDef.Res.UI.PhoneUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.PhoneUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.PhoneUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBlack2").asButton.onClick(this.hide, this);
    this.m_listData = this.getListData();
    this.list.itemRenderer = this.itemRenderer.bind(this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.list.numItems = this.m_listData.length;
    this.refreshRedTips();
    r_SDKMgr1.SDKMgr1.showCustomAd22(20, 170);
    _ctor.Inst = this;
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_SDKMgr1.SDKMgr1.hideCustomAd22();
    _ctor.Inst = null;
  };
  _ctor.prototype.getListData = function () {
    return r_PhoneCfg.PhoneCfg.filter(function (e) {
      return !r_BlockSystem.BlockSystem.isBlock(e.id);
    });
  };
  _ctor.prototype.itemRenderer = function (e, t) {
    var o = this.m_listData[e];
    r_ResSystem.ResSystem.loadBundleFguiImg(t.getChild("icon"), "game4", "phone/" + o.icon);
    if (0 == o.imgTxt.length) {
      t.getChild("imgTxt").asLoader.url = "";
    } else {
      r_ResSystem.ResSystem.loadBundleFguiImg(t.getChild("imgTxt"), "game4", "phone/" + o.imgTxt);
    }
    t.getController("c1").selectedIndex = o.isRed;
    switch (o.name) {
      case "信息":
        this.btnChat = t;
        break;
      case "默默":
        this.btnMomo = t;
        break;
      case "睡眠监测":
        this.btnSleepApp = t;
    }
    t.clearClick();
    t.onClick(function () {
      if (o.data) {
        r_Config.default.uiClassMap[o.changed].showUI(o.data);
      } else {
        r_Config.default.uiClassMap[o.changed].showUI();
      }
    }, this);
  };
  _ctor.prototype.refreshRedTips = function () {
    if (this.btnChat) {
      var e = r_ChatSystem.ChatSystem.getMsgNum();
      if (e) {
        this.btnChat.getChild("num").visible = true;
        this.btnChat.getChild("num").getChild("num").text = e;
      } else {
        this.btnChat.getChild("num").visible = false;
      }
    }
    if (this.btnMomo) {
      var t = r_PhoneSystem.PhoneSystem.getMomoMsgNum();
      if (t) {
        this.btnMomo.getChild("num").visible = true;
        this.btnMomo.getChild("num").getChild("num").text = t;
      } else {
        this.btnMomo.getChild("num").visible = false;
      }
    }
    if (this.btnSleepApp) {
      var o = r_SleepAppData.SleepAppData.getNewRecoredNum();
      if (o) {
        this.btnSleepApp.getChild("num").visible = true;
        this.btnSleepApp.getChild("num").getChild("num").text = o;
      } else {
        this.btnSleepApp.getChild("num").visible = false;
      }
    }
  };
  __decorate([r_DecorateFunction1.AutoFind("list")], _ctor.prototype, "list", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.PhoneUI = exp_PhoneUI;