var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_BaseWin = require("BaseWin");
var r_ChatUI = require("ChatUI");
var r_MainUI = require("MainUI");
var r_HomeworkGameUI = require("HomeworkGameUI");
var r_HomeworkResultUI = require("HomeworkResultUI");
var def_HomeworkUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Homework, r_UIDef.UIDef.Res.UI.HomeworkUI) || this;
    t.showAnimFlag = false;
    t.uiType = "fullScreen";
    t.m_touchNum = 0;
    return t;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return false;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.HomeworkUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.HomeworkUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btnFind, this.btnSubmit, this.btnDowork, this.anim, this.btnCoin);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    r_SoundMgr.SoundMgr.playMusic("homework/找寒假作业BGM");
    r_TimeSystem.TimeSystem.scheduleOnce("homeworshown", 1, function () {
      r_SoundMgr.SoundMgr.playSound("homework/你能帮帮我吗");
    });
    _ref__ctor.Inst = this;
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_SoundMgr.SoundMgr.playMusic("bgm");
    r_TimeSystem.TimeSystem.scheduleClear("homeworshown");
    r_TimeSystem.TimeSystem.scheduleClear("onClickanim");
    r_TimeSystem.TimeSystem.scheduleClear("onClickanim1");
    _ref__ctor.Inst = null;
  };
  _ctor.prototype.onClickbtnFind = function () {
    if (1 == this.contentPane.getController("c1").selectedIndex) {
      r_ChatUI.ChatUI.showUI({
        task: "homework"
      });
    } else {
      r_UtilsSystem.UtilsSystem.showTip("需要先完成作业");
    }
  };
  _ctor.prototype.onClickbtnSubmit = function () {
    r_HomeworkResultUI.default.showUI({
      index: 0
    });
    this.btnCoin.visible && r_PlayerData.PlayerData.addCoin("领取寒假作业彩蛋", 1e8, r_ReportSystem.SystemKey.寒假作业);
  };
  _ctor.prototype.onClickbtnDowork = function () {
    if (0 != this.contentPane.getController("c1").selectedIndex) {
      r_UtilsSystem.UtilsSystem.showTip("把作业交还给失主");
    } else {
      r_HomeworkGameUI.default.showUI();
    }
  };
  _ctor.prototype.onClickbtnCoin = function () {
    r_PlayerData.PlayerData.addCoin("领取寒假作业彩蛋", 1e8, r_ReportSystem.SystemKey.寒假作业);
    this.btnCoin.visible = false;
    this.labCoin.visible = false;
  };
  _ctor.prototype.onClickanim = function () {
    var e = this;
    if (2 == this.contentPane.getController("c1").selectedIndex) {
      if (5 == this.m_touchNum) {
        r_UtilsSystem.UtilsSystem.playAnim(this.anim, "animation3", false);
        r_TimeSystem.TimeSystem.scheduleOnce("onClickanim", .3, function () {
          r_SoundMgr.SoundMgr.playSound("homework/谢谢你破除了我的封印");
          e.contentPane.getTransition("t1").play();
          r_UtilsSystem.UtilsSystem.playAnim(e.caidanAnim, "animation", true);
          r_PlayerData.PlayerData.data.homeworkCaidan = 1;
          r_PlayerData.PlayerData.saveData();
          r_MainUI.MainUI.instace && r_MainUI.MainUI.instace.refreshBtn();
        });
      } else if (this.m_touchNum < 5) {
        r_UtilsSystem.UtilsSystem.playAnim(this.anim, "animation2", false);
        var t = this;
        r_TimeSystem.TimeSystem.scheduleOnce("onClickanim1", .2, function () {
          r_UtilsSystem.UtilsSystem.playAnim(t.anim, "animation", true);
        });
        this.m_touchNum++;
      }
    }
  };
  _ctor.prototype.restart = function () {
    if (0 == r_PlayerData.PlayerData.data.homeworkCaidan) {
      this.bubble1.visible = true;
      this.bubble3.visible = false;
      this.anim.visible = true;
      r_UtilsSystem.UtilsSystem.playAnim(this.anim, "animation", true);
      this.caidanAnim.visible = false;
    } else {
      this.bubble1.visible = false;
      this.bubble3.visible = true;
      this.anim.visible = false;
      this.caidanAnim.visible = true;
    }
    this.contentPane.getController("c1").selectedIndex = 0;
    this.m_touchNum = 0;
    this.contentPane.getTransition("init").play();
  };
  _ctor.prototype.changedMode = function (e) {
    this.contentPane.getController("c1").selectedIndex = e;
  };
  __decorate([r_DecorateFunction1.AutoFind("btnDowork")], _ctor.prototype, "btnDowork", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnFind")], _ctor.prototype, "btnFind", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnSubmit")], _ctor.prototype, "btnSubmit", undefined);
  __decorate([r_DecorateFunction1.AutoFind("anim")], _ctor.prototype, "anim", undefined);
  __decorate([r_DecorateFunction1.AutoFind("caidanAnim")], _ctor.prototype, "caidanAnim", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnCoin")], _ctor.prototype, "btnCoin", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labCoin")], _ctor.prototype, "labCoin", undefined);
  __decorate([r_DecorateFunction1.AutoFind("bubble1")], _ctor.prototype, "bubble1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("bubble3")], _ctor.prototype, "bubble3", undefined);
  return _ref__ctor = __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.default = def_HomeworkUI;