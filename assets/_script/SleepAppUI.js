var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SleepAppUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_SleepAppData = require("SleepAppData");
var r_SoundMgr = require("SoundMgr");
var r_ViewDreamUI = require("ViewDreamUI");
var r_TimeSystem = require("TimeSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_SleepAppCfg = require("SleepAppCfg");
var r_ResSystem = require("ResSystem");
var r_PlayerData = require("PlayerData");
var r_PhoneUI = require("PhoneUI");
var exp_SleepAppUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.SleepApp, r_UIDef.UIDef.Res.UI.SleepAppUI) || this;
    t.viewTypes = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.SleepAppUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.SleepAppUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").onClick(function () {
      if (1 == t.tabCtrl.selectedIndex) {
        t.tabCtrl.selectedIndex = 0;
        t.stopSound();
      } else {
        t.hide();
      }
    }, this);
    this.tabCtrl = this.contentPane.getController("tabCtrl");
    this.sleepList = this.contentPane.getChild("sleepList").asList;
    this.viewList = this.contentPane.getChild("viewList").asList;
    this.sleepList.itemRenderer = this.sleepListItemRenderer.bind(this);
    this.viewList.itemRenderer = this.viewListItemRenderer.bind(this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    var t = r_SleepAppData.SleepAppData.getSleepRecords();
    this.contentPane.getChild("recordCount").asTextField.setVar("count", t.length.toString()).flushVars();
    this.contentPane.getChild("recordCountMax").asTextField.setVar("count", r_SleepAppCfg.SleepAppCfg.recordCountMax.toString()).flushVars();
    this.sleepList.numItems = t.length;
    this.sleepList.scrollPane.scrollTop();
    r_ResSystem.ResSystem.loadHeadImg(this.contentPane.getChild("headIcon"), r_PlayerData.PlayerData.data.curHead);
    this.contentPane.getChild("noRecord").visible = 0 == this.sleepList.numItems;
    r_SleepAppData.SleepAppData.setData("NewRecoredNum", 0);
    r_PhoneUI.PhoneUI.Inst && r_PhoneUI.PhoneUI.Inst.refreshRedTips();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_SoundMgr.SoundMgr.resumeMusic();
  };
  _ctor.prototype.stopSound = function () {
    r_SoundMgr.SoundMgr.stopAllSound();
    r_TimeSystem.TimeSystem.clearTimeMapUpdate("梦话");
    r_TimeSystem.TimeSystem.clearTimeMapUpdate("呼噜");
    this.viewList._children.forEach(function (e) {
      e.asCom.getChild("playBar").asImage.fillAmount = 0;
    });
  };
  _ctor.prototype.sleepListItemRenderer = function (e, t) {
    var o = this;
    var i = r_SleepAppData.SleepAppData.getSleepRecords()[e];
    t.getChild("title").asTextField.setVar("count", i.sleepDay + "").flushVars();
    t.getChild("btnView").clearClick();
    t.getChild("btnView").onClick(function () {
      o.tabCtrl.selectedIndex = 1;
      o.curRecord = i;
      o.contentPane.getChild("viewTile").asTextField.setVar("count", o.curRecord.sleepDay + "").flushVars();
      o.viewTypes.length = 0;
      o.viewTypes.push(0);
      i.sleepTalkingCount > 0 && o.viewTypes.push(1);
      i.snoreCount > 0 && o.viewTypes.push(2);
      o.viewTypes.push(3);
      o.viewList.numItems = o.viewTypes.length;
      o.viewList.scrollPane.scrollTop();
    }, this);
  };
  _ctor.prototype.viewListItemRenderer = function (e, t) {
    var o = this;
    var i = t.getChild("comboBox").asComboBox;
    i.visible = false;
    if (0 == this.viewTypes[e]) {
      t.getChild("time").asTextField.setVar("time", this.curRecord.sleepTime + "").flushVars();
      t.getChild("apnea").asTextField.setVar("count", this.curRecord.apneaCount + "").flushVars();
      t.getChild("quality").asTextField.text = this.curRecord.quality;
      t.getChild("risk").asTextField.text = this.curRecord.risk;
      t.getChild("score").asTextField.text = this.curRecord.sleepScore.toString();
      t.getController("c1").selectedIndex = 0;
    } else if (3 == this.viewTypes[e]) {
      t.getChild("title").asTextField.text = "回顾梦境";
      t.getController("c1").selectedIndex = 2;
      t.getChild("btnPlay").clearClick();
      t.getChild("btnPlay").onClick(function () {
        o.stopSound();
        r_SoundMgr.SoundMgr.resumeMusic();
        r_PlatformSystem.PlatformSystem.showVideo("回顾梦境", function () {
          var e = r_SleepAppCfg.SleepAppCfg.dreams[o.curRecord.dreamId];
          r_ViewDreamUI.ViewDreamUI.showUI({
            dreamData: e
          });
        });
      }, this);
      if (r_TYIndex.Platform.isDarenPlatform()) {
        i.visible = true;
        i.off(fgui.Event.STATUS_CHANGED);
        i.on(fgui.Event.STATUS_CHANGED, function (e) {
          if (e.value >= 0) {
            o.curRecord.dreamId = e.value;
          } else {
            o.curRecord.dreamId = r_SleepAppData.SleepAppData.randomInt(0, r_SleepAppCfg.SleepAppCfg.dreams.length - 1);
          }
        }, this);
      }
    } else {
      var n = 1 == this.viewTypes[e] ? this.curRecord.sleepTalkingCount : this.curRecord.snoreCount;
      var s = 1 == this.viewTypes[e] ? this.curRecord.sleepTalkingId : this.curRecord.snoreId;
      var d = 1 == this.viewTypes[e] ? "你昨晚说梦话" + n + "次" : "你昨晚打呼噜" + n + "次";
      var y = 1 == this.viewTypes[e] ? "梦话" : "呼噜";
      var f = "sleepApp/" + y + s;
      t.getChild("title").asTextField.text = d;
      t.getController("c1").selectedIndex = 1;
      t.getChild("playBar").asImage.fillAmount = 0;
      t.getChild("btnPlay").clearClick();
      t.getChild("btnPlay").onClick(function () {
        r_PlatformSystem.PlatformSystem.showVideo(y, function () {
          o.stopSound();
          r_SoundMgr.SoundMgr.pauseMusic();
          r_SoundMgr.SoundMgr.playSound(f, false, function (e, o) {
            r_TimeSystem.TimeSystem.timeMapUpdate(y, o.duration, function (e) {
              t.getChild("playBar").asImage.fillAmount = 1 - e;
              e >= 1 && r_SoundMgr.SoundMgr.resumeMusic();
            });
          });
        });
      }, this);
    }
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.SleepAppUI = exp_SleepAppUI;