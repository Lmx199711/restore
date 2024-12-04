var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LotteryNewUI = undefined;
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_NumBallUI = require("NumBallUI");
var r_BaseWin = require("BaseWin");
var r_TaskSystem = require("TaskSystem");
var r_TaskCfg = require("TaskCfg");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_LotterySystem = require("LotterySystem");
var r_ResSystem = require("ResSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_Config = require("Config");
var r_ReportSystem = require("ReportSystem");
var exp_LotteryNewUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Lottery, r_UIDef.UIDef.Res.UI.LotteryUI) || this;
    t.uiType = "fullScreen";
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.LotteryUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.LotteryUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("block").on(cc.Node.EventType.TOUCH_START, function () {}, this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    for (var t = 1; t <= 3; t++) {
      var o = this.contentPane.getChild("btnTap" + t);
      this.registBtnTap(o, t - 1);
    }
    this.list.itemRenderer = this.itemRenderer.bind(this);
    r_NumBallUI.NumBallUI.init(this);
    this.bindBtnCallback(this.btnLeft, this.btnRIght);
  };
  _ctor.prototype.itemRenderer = function (e, t) {
    var o = this;
    var i = r_LotterySystem.LotterySystem.getListData()[e];
    t.getController("c1").selectedIndex = i.priceType;
    1 == t.getController("c1").selectedIndex && r_LotterySystem.LotterySystem.checkUnlock(i.id) && (t.getController("c1").selectedIndex = 0);
    r_ResSystem.ResSystem.loadBundleFguiImg(t.getChild("icon"), "game4", "lottery/" + i.icon);
    t.getChild("num").text = r_UtilsSystem.UtilsSystem.numFormats(i.tickets);
    t.clearClick();
    t.onClick(function () {
      if (t.getController("c1").selectedIndex > 0) {
        r_PlatformSystem.PlatformSystem.showVideo(i.name + "门票", function () {
          if (1 == i.priceType) {
            t.getController("c1").selectedIndex = 0;
            r_LotterySystem.LotterySystem.unlock(i.id);
          } else if (2 == i.priceType) {
            r_Config.default.uiClassMap[i.changed].showUI();
            o.addLuckyNum();
          }
        });
      } else if (r_PlayerData.PlayerData.isCoinEnough(i.tickets)) {
        r_PlayerData.PlayerData.deleteCoin(i.name + "门票", i.tickets, r_ReportSystem.SystemKey.彩票);
        r_Config.default.uiClassMap[i.changed].showUI();
        o.addLuckyNum();
      } else {
        r_UtilsSystem.UtilsSystem.showTip("钱不够~");
      }
    }, this);
  };
  _ctor.prototype.onClickbtnLeft = function () {
    this.contentPane.getController("index").selectedIndex = 0;
  };
  _ctor.prototype.onClickbtnRIght = function () {
    this.contentPane.getController("index").selectedIndex = 1;
  };
  _ctor.prototype.refreshTap = function () {
    for (var e = 1; e <= 3; e++) {
      var t = this.contentPane.getChild("btnTap" + e);
      if (e - 1 == this.contentPane.getController("mode").selectedIndex) {
        t.getController("mode").selectedIndex = 1;
      } else {
        t.getController("mode").selectedIndex = 0;
      }
    }
  };
  _ctor.prototype.registBtnTap = function (e, t) {
    var o = this;
    e.onClick(function () {
      if (o.contentPane.getController("mode").selectedIndex != t) {
        o.contentPane.getController("mode").selectedIndex = t;
        o.refreshTap();
        if (2 == t) {
          r_NumBallUI.NumBallUI.onShown();
        } else {
          r_NumBallUI.NumBallUI.onHide();
        }
      }
    }, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.contentPane.getController("mode").selectedIndex = 0;
    this.refreshTap();
    this.list.numItems = r_LotterySystem.LotterySystem.getListData().length;
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_NumBallUI.NumBallUI.onHide();
  };
  _ctor.prototype.addLuckyNum = function () {
    r_PlayerData.PlayerData.data.luckyNum++;
    r_TaskSystem.TaskSystem.addDayTaskValue(r_TaskCfg.TaskDayType.刮刮乐);
    r_PlayerData.PlayerData.saveData();
  };
  __decorate([r_DecorateFunction1.AutoFind("list")], _ctor.prototype, "list", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnLeft")], _ctor.prototype, "btnLeft", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnRIght")], _ctor.prototype, "btnRIght", undefined);
  return __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.LotteryNewUI = exp_LotteryNewUI;