var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_RoleSystem = require("RoleSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_RoleCfg = require("RoleCfg");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_MainHomeUI = require("MainHomeUI");
var def_BridePriceTipUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.BridePrice, r_UIDef.UIDef.Res.UI.BridePriceTipUI) || this;
    t.showAnimFlag = true;
    t.priceList = ["30000000000", "27000000000", "24000000000", "21000000000", "18000000000", "15000000000", "12000000000", "9000000000", "6000000000", "3000000000", "0"];
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
    this.show(r_UIDef.UIDef.Urls.UI.BridePriceTipUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.BridePriceTipUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btnBride, this.btnVideo, this.btnOk, this.btnDelayTime);
    r_TimeSystem.TimeSystem.schedule("updateGuideTime", 1, function () {
      t.labTime.text = "倒计时 " + r_RoleSystem.RoleSystem.getNewGuideTime2();
    });
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    this.data.isGuide && r_MainHomeUI.default.instance && r_MainHomeUI.default.instance.contentPane.getTransition("bride").play();
  };
  _ctor.prototype.onClickbtnBride = function () {
    var e = r_PlayerData.PlayerData.data.brideVideoCount > this.priceList.length - 1 ? this.priceList.length - 1 : r_PlayerData.PlayerData.data.brideVideoCount;
    if (r_PlayerData.PlayerData.isCoinEnough(this.priceList[e])) {
      r_PlayerData.PlayerData.deleteCoin("剧情彩礼", this.priceList[e], r_ReportSystem.SystemKey.None);
      r_PlayerData.PlayerData.data.newGuideStep = 3;
      r_PlayerData.PlayerData.data.newGuideType = 2;
      r_PlayerData.PlayerData.data.newGuideTime2 = -1;
      r_PlayerData.PlayerData.saveData();
      this.contentPane.getController("c1").selectedIndex = 1;
    } else {
      r_UtilsSystem.UtilsSystem.showTip("钱不够~");
    }
  };
  _ctor.prototype.onClickbtnVideo = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("彩礼减少", function () {
      r_PlayerData.PlayerData.data.brideVideoCount++;
      e.restart();
    });
  };
  _ctor.prototype.onClickbtnOk = function () {
    this.hide();
  };
  _ctor.prototype.onClickbtnDelayTime = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("延长彩礼时间", function () {
      r_PlayerData.PlayerData.data.newGuideTime2 = r_RoleCfg.BirdeAddTime;
      r_PlayerData.PlayerData.saveData();
      e.hide();
    });
  };
  _ctor.prototype.restart = function () {
    if (null == this.data.index) {
      this.data.index = 0;
      this.data.isGuide = false;
    }
    this.labTime.text = "倒计时 " + r_RoleSystem.RoleSystem.getNewGuideTime2();
    this.contentPane.getController("c1").selectedIndex = this.data.index;
    var e = r_PlayerData.PlayerData.data.brideVideoCount > this.priceList.length - 1 ? this.priceList.length - 1 : r_PlayerData.PlayerData.data.brideVideoCount;
    var t = "任务：一小时内攒齐[color=#ff0000]" + r_UtilsSystem.UtilsSystem.numFormats(parseInt(this.priceList[e])) + "[/color]彩礼";
    this.labBride.text = t;
  };
  __decorate([r_DecorateFunction1.AutoFind("btnBride")], _ctor.prototype, "btnBride", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnVideo")], _ctor.prototype, "btnVideo", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnOk")], _ctor.prototype, "btnOk", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnDelayTime")], _ctor.prototype, "btnDelayTime", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labTime")], _ctor.prototype, "labTime", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labBride")], _ctor.prototype, "labBride", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_BridePriceTipUI;