var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_ChangeSystem = require("ChangeSystem");
var r_GameGuideSystem = require("GameGuideSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_TimeSystem = require("TimeSystem");
var r_TowerSystem = require("TowerSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_MainHomeUI = require("MainHomeUI");
var r_FairyLandUI = require("FairyLandUI");
var r_TowerUI = require("TowerUI");
var def_GameGuideTipUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.GameGuide, r_UIDef.UIDef.Res.UI.GameGuideTipUI) || this;
    t.showAnimFlag = false;
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
    this.show(r_UIDef.UIDef.Urls.UI.GameGuideTipUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.GameGuideTipUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btnBattle, this.btnVideo, this.btnOpen, this.btnAddTime);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TimeSystem.TimeSystem.scheduleClear("updateGuideTime");
  };
  _ctor.prototype.restart = function () {
    this.contentPane.getController("c1").selectedIndex = 0;
    var e = r_GameGuideSystem.GameGuideSystem.tip[r_PlayerData.PlayerData.data.storyMap.id];
    this.imgIcon.url = "ui://GameGuide/" + e.icon;
    this.labTitle.text = e.title;
    this.labTask.text = e.task;
    this.btnBattle.title = e.leftBtnTxt;
    this.btnVideo.title = e.rightBtnTxt;
    this.labResult.text = e.result;
    this.contentPane.getController("type").selectedIndex = e.type;
    e.type == r_GameGuideSystem.StoryType.荒古遗迹 && r_TowerSystem.TowerSystem.getCurTower() > e.price && (this.btnBattle.title = e.leftBtnFinishTxt);
    this.updateGuideTime();
    r_TimeSystem.TimeSystem.schedule("updateGuideTime", 1, this.updateGuideTime.bind(this));
  };
  _ctor.prototype.onClickbtnVideo = function () {
    var e = r_GameGuideSystem.GameGuideSystem.tip[r_PlayerData.PlayerData.data.storyMap.id];
    r_PlatformSystem.PlatformSystem.showVideo(e.title, function () {
      r_PlayerData.PlayerData.addCoin(e.title, r_GameGuideSystem.GameGuideSystem.tip[r_PlayerData.PlayerData.data.storyMap.id].addCoin, r_ReportSystem.SystemKey.任务系统);
    });
  };
  _ctor.prototype.onClickbtnBattle = function () {
    var e = r_GameGuideSystem.GameGuideSystem.tip[r_PlayerData.PlayerData.data.storyMap.id];
    if (e.type == r_GameGuideSystem.StoryType.荒古遗迹) {
      if (r_TowerSystem.TowerSystem.getCurTower() > e.price) {
        this.contentPane.getController("c1").selectedIndex = 2;
        this.imgIcon.url = "ui://GameGuide/" + e.resultIcon;
        r_PlatformSystem.PlatformSystem.report("EndTask1", {
          result: r_PlayerData.PlayerData.data.storyMap.id
        });
        r_GameGuideSystem.GameGuideSystem.addStory();
      } else {
        r_ChangeSystem.ChangeSystem.setChangeWin([r_MainHomeUI.default, r_FairyLandUI.FairyLandUI, r_TowerUI.TowerUI]);
      }
    } else if (e.type == r_GameGuideSystem.StoryType.金币) {
      if (!r_PlayerData.PlayerData.isCoinEnough(r_GameGuideSystem.GameGuideSystem.tip[r_PlayerData.PlayerData.data.storyMap.id].price)) {
        return void r_UtilsSystem.UtilsSystem.showTip("钱不够~");
      }
      r_PlayerData.PlayerData.deleteCoin("子涵交学费", r_GameGuideSystem.GameGuideSystem.tip[r_PlayerData.PlayerData.data.storyMap.id].price);
      this.contentPane.getController("c1").selectedIndex = 2;
      this.imgIcon.url = "ui://GameGuide/" + e.resultIcon;
      r_PlatformSystem.PlatformSystem.report("EndTask1", {
        result: r_PlayerData.PlayerData.data.storyMap.id
      });
      r_GameGuideSystem.GameGuideSystem.addStory();
    }
  };
  _ctor.prototype.onClickbtnOpen = function () {
    this.hide();
  };
  _ctor.prototype.onClickbtnAddTime = function () {
    var e = this;
    var t = r_GameGuideSystem.GameGuideSystem.tip[r_PlayerData.PlayerData.data.storyMap.id];
    r_PlatformSystem.PlatformSystem.showVideo(t.title + "加时间", function () {
      r_PlayerData.PlayerData.data.gameGuideCountDown[r_PlayerData.PlayerData.data.storyMap.id] = r_TimeSystem.TimeSystem.getServerTime() + 600;
      r_TimeSystem.TimeSystem.scheduleClear("updateGuideTime");
      r_TimeSystem.TimeSystem.schedule("updateGuideTime", 1, e.updateGuideTime.bind(e));
      e.contentPane.getController("c1").selectedIndex = 0;
    });
  };
  _ctor.prototype.updateGuideTime = function () {
    var e = r_PlayerData.PlayerData.data.gameGuideCountDown[r_PlayerData.PlayerData.data.storyMap.id] - r_TimeSystem.TimeSystem.getServerTime();
    this.labTime.text = "倒计时  " + r_TimeSystem.TimeSystem.getTimeStr2(e);
    if (e < 0) {
      r_TimeSystem.TimeSystem.scheduleClear("updateGuideTime");
      this.contentPane.getController("c1").selectedIndex = 1;
    }
  };
  __decorate([r_DecorateFunction1.AutoFind("labTime")], _ctor.prototype, "labTime", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnBattle")], _ctor.prototype, "btnBattle", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnVideo")], _ctor.prototype, "btnVideo", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnOpen")], _ctor.prototype, "btnOpen", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labTask")], _ctor.prototype, "labTask", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnAddTime")], _ctor.prototype, "btnAddTime", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labResult")], _ctor.prototype, "labResult", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labTitle")], _ctor.prototype, "labTitle", undefined);
  __decorate([r_DecorateFunction1.AutoFind("icon")], _ctor.prototype, "imgIcon", undefined);
  __decorate([r_DecorateFunction1.AutoFind("anim")], _ctor.prototype, "anim", undefined);
  return __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.default = def_GameGuideTipUI;