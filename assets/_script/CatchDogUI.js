var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_AnimSystem = require("AnimSystem");
var r_FguiResSystem = require("FguiResSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_ResSystem = require("ResSystem");
var r_ShareSystem = require("ShareSystem");
var r_TaskSystem = require("TaskSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_CatchDogCfg = require("CatchDogCfg");
var r_TaskCfg = require("TaskCfg");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_CatchDogCom = require("CatchDogCom");
var r_CatchDogLogic = require("CatchDogLogic");
var r_CatchDogResultUI = require("CatchDogResultUI");
var def_CatchDogUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.CatchDog, r_UIDef.UIDef.Res.UI.CatchDogUI) || this;
    t.uiType = "fullScreen";
    t.labItems = [];
    t.m_entryPrice = 1e8;
    t.m_isTouch = false;
    t.m_catchNum = 3;
    t.roundNum = 0;
    t.isGame = false;
    t.countDownTime = 15;
    return t;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "isTouch", {
    set: function (e) {
      this.m_isTouch = e;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.CatchDogUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.CatchDogUI);
  };
  Object.defineProperty(_ctor.prototype, "catachNum", {
    get: function () {
      return this.m_catchNum;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.deleteCatchNum = function () {
    this.m_catchNum--;
    this.countDownTime = 15;
    this.labNum.text = "X" + this.m_catchNum;
  };
  _ctor.prototype.addCatchNum = function () {
    this.m_catchNum = 3;
    this.labNum.text = "X" + this.m_catchNum;
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.m_entryPrice = r_CatchDogCfg.DogentryPrice;
    this.contentPane.visible = false;
    r_ResSystem.ResSystem.loadBundleRes("game3", "cathDog/catchDogCom", cc.Prefab, function (e, o) {
      if (e) {
        console.error("加载失败: ", e);
      } else {
        r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
        var i = cc.instantiate(o);
        t.center.node.addChild(i);
        t.catchDogCom = i.getComponent(r_CatchDogCom.default);
        i.active = true;
        t.contentPane.visible = true;
        t.restart();
      }
    });
    this.bindBtnCallback(this.btnStart, this.btnVideo, this.btnCatch);
    this.btnStart.title = r_UtilsSystem.UtilsSystem.numFormats(this.m_entryPrice);
    for (var o = 1; o <= 5; o++) {
      var i = this.contentPane.getChild("labItem" + o);
      i.text = r_UtilsSystem.UtilsSystem.numFormats(r_CatchDogCfg.DogLevelCfg[o].award);
      this.labItems.push(i);
    }
  };
  _ctor.prototype.countDown = function () {
    if (r_CatchDogCom.default.instance.isMove && !r_CatchDogCom.default.instance.isPause && 0 != this.m_catchNum) {
      this.labTime.text = "" + this.countDownTime;
      if (this.countDownTime <= 0) {
        this.deleteCatchNum();
        return void r_CatchDogResultUI.default.showUI(0);
      }
      this.countDownTime--;
    }
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.instance = this;
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_ShareSystem.ShareSystem.stopRecord(false);
    this.clearScene();
    _ctor.instance = null;
  };
  _ctor.prototype.clearScene = function () {
    r_TimeSystem.TimeSystem.scheduleClear("countDown");
    r_TimeSystem.TimeSystem.scheduleClear("waitStart");
    this.m_isTouch = false;
    this.isGame = false;
    this.catchDogCom.clearScene();
    r_CatchDogLogic.CatchDogLogic.clearScene();
  };
  _ctor.prototype.restart = function () {
    if (this.catchDogCom) {
      this.clearScene();
      this.isGame = false;
      this.contentPane.getController("c1").selectedIndex = 0;
      this.catchDogCom.restart();
    }
  };
  _ctor.prototype.onClickbtnStart = function () {
    if (r_PlayerData.PlayerData.isCoinEnough(this.m_entryPrice)) {
      r_PlayerData.PlayerData.data.catchDogNum++;
      r_TaskSystem.TaskSystem.addDayTaskValue(r_TaskCfg.TaskDayType.抓狗);
      r_PlayerData.PlayerData.deleteCoin("抓狗门票", this.m_entryPrice, r_ReportSystem.SystemKey.抓狗);
      this.startGame();
    } else {
      r_UtilsSystem.UtilsSystem.showTip("钱不够~");
    }
  };
  _ctor.prototype.onClickbtnVideo = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("抓狗门票", function () {
      r_PlayerData.PlayerData.data.catchDogNum++;
      r_TaskSystem.TaskSystem.addDayTaskValue(r_TaskCfg.TaskDayType.抓狗);
      e.startGame();
    });
  };
  _ctor.prototype.startGame = function () {
    this.crazeTouch(false);
    this.m_catchNum = 3;
    this.labNum.text = "X" + this.m_catchNum;
    this.contentPane.getController("c1").selectedIndex = 1;
    this.roundNum = 0;
    this.countDownTime = 15;
    this.next();
    r_TimeSystem.TimeSystem.schedule("countDown", 1, this.countDown.bind(this));
    r_ShareSystem.ShareSystem.startRecord();
  };
  _ctor.prototype.next = function () {
    var e = this;
    this.countDownTime = 15;
    this.contentPane.getController("round").selectedIndex = this.roundNum;
    r_TimeSystem.TimeSystem.scheduleOnce("waitStart", 1, function () {
      e.contentPane.getTransition("round").play(function () {
        e.catchDogCom.gameStart();
        e.m_isTouch = true;
        e.isGame = true;
      });
    });
  };
  _ctor.prototype.onClickbtnCatch = function () {
    this.m_isTouch && (this.m_catchNum <= 0 || this.isGame && (this.m_isTouch = false, this.catchDogCom.catch()));
  };
  _ctor.prototype.crazeTouch = function (e) {
    this.btnCatch.visible = !e;
    this.btnLa.visible = e;
  };
  _ctor.prototype.getAward = function () {
    r_AnimSystem.AnimSystem.playCoinAnim(this.labItems[this.roundNum].node);
  };
  _ctor.tauntId = 0;
  __decorate([r_DecorateFunction1.AutoFind("center")], _ctor.prototype, "center", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnStart")], _ctor.prototype, "btnStart", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnVideo")], _ctor.prototype, "btnVideo", undefined);
  __decorate([r_DecorateFunction1.AutoFind("groRound")], _ctor.prototype, "groRound", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnCatch")], _ctor.prototype, "btnCatch", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnLa")], _ctor.prototype, "btnLa", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labTime")], _ctor.prototype, "labTime", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labNum")], _ctor.prototype, "labNum", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_CatchDogUI;