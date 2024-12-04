var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.monopolyType = undefined;
var a;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_MonopolyLogic = require("MonopolyLogic");
var r_TimeSystem = require("TimeSystem");
var r_MonopolyCfg = require("MonopolyCfg");
var r_PlayerData = require("PlayerData");
var r_PlatformSystem = require("PlatformSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_MonopolyLuckyUI = require("MonopolyLuckyUI");
var r_MonopolySystem = require("MonopolySystem");
var r_SoundMgr = require("SoundMgr");
var def_MonopolyUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Monopoly, r_UIDef.UIDef.Res.UI.MonopolyUI) || this;
    t.uiType = "fullScreen";
    t.itemMap = {};
    t.m_maxNum = 5;
    t.currType = 0;
    t.videoNum = 0;
    t.m_isTouch = true;
    t.m_clickNum = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.MonopolyUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.MonopolyUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnBack = this.contentPane.getChild("btnBack").asButton;
    this.btnBack.onClick(this.hide, this);
    for (var t = 0; t < 28; t++) {
      var o = this.contentPane.getChild("item" + t);
      this.itemMap[t] = o;
      0 == t && (o.getController("c1").selectedIndex = 1);
      var i = r_MonopolyCfg.MpnppolyGridCfg[t];
      o.getChild("icon").url = "ui://Monopoly/" + i.icon;
      o.getChild("lab").url = "ui://Monopoly/" + i.lab;
    }
    this.btnStart = this.contentPane.getChild("btnStart").asButton;
    this.btnStart.onClick(this.onClickStart, this);
    this.skDice = this.contentPane.getChild("skDice");
    this.skChess = this.contentPane.getChild("skChess");
    this.skChess.loop;
    this.skChess.animationName = "animation";
    this.skChess.playing = true;
    this.labNum = this.contentPane.getChild("labNum");
    this.btnMianyi = this.contentPane.getChild("btnMianyi");
    this.btnDice = this.contentPane.getChild("btnDice");
    this.btnDice.onClick(this.onClickAssDice, this);
    this.skHouse = this.contentPane.getChild("skHouse");
    this.skHouse.onClick(this.onClickHouse, this);
    this.btnAddDice = this.contentPane.getChild("btnAddDice");
    this.btnAddDice.onClick(this.onClickAddDice, this);
    this.skBubble = this.contentPane.getChild("skBubble");
    this.labTime = this.contentPane.getChild("labTime");
    this.skBubble.visible = false;
    r_MonopolyLogic.MonopolyLogic.init(this.itemMap, this.skChess);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
    r_TimeSystem.TimeSystem.registSecondUpdate("monUIUpadte", this.secondUpdate.bind(this));
    r_PlayerData.PlayerData.isGame = true;
    _ctor.instance = this;
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_PlayerData.PlayerData.isGame = false;
    r_TimeSystem.TimeSystem.scheduleClear("randomDice");
    r_TimeSystem.TimeSystem.scheduleClear("step_3");
    r_TimeSystem.TimeSystem.scheduleClear("step_2");
    r_TimeSystem.TimeSystem.unregistSecondUpdate("monUIUpadte");
    r_MonopolyLogic.MonopolyLogic.destruct();
    _ctor.instance = null;
  };
  _ctor.prototype.restart = function () {
    this.skHouse.loop = false;
    this.skHouse.animationName = "step_0";
    this.skHouse.playing = true;
    this.skBubble.visible = false;
    this.propShow();
    this.setStartPos();
    r_MonopolyLogic.MonopolyLogic.restart();
    this.currType = a.等待中;
  };
  _ctor.prototype.setStartPos = function () {
    var e = r_MonopolySystem.MonopolySystem.getCheesPos(this.itemMap[0]);
    this.skChess.x = e.x;
    this.skChess.y = e.y;
  };
  _ctor.prototype.propShow = function () {
    this.btnMianyi.title = "X" + r_PlayerData.PlayerData.data.newMonpolyData.shield;
    this.btnDice.title = "X" + r_PlayerData.PlayerData.data.newMonpolyData.assignDice;
    this.btnDice.getController("c1").selectedIndex = r_PlayerData.PlayerData.data.newMonpolyData.assignDice > 0 ? 0 : 1;
    this.labNum.text = r_PlayerData.PlayerData.data.newMonpolyData.dice + "/" + this.m_maxNum + "个";
  };
  _ctor.prototype.onClickStart = function () {
    if (r_PlayerData.PlayerData.data.newMonpolyData.dice <= 0) {
      r_UtilsSystem.UtilsSystem.showTip("没骰子了，请补充");
    } else if (this.currType != a.移动中) {
      r_PlayerData.PlayerData.data.newMonpolyData.dice--;
      r_PlayerData.PlayerData.saveData();
      this.propShow();
      this.rollDice();
    } else {
      r_UtilsSystem.UtilsSystem.showTip("移动中，不可投掷骰子");
    }
  };
  _ctor.prototype.rollDice = function (e) {
    var t = this;
    r_SoundMgr.SoundMgr.playSound("monopoly/掷色子");
    this.currType = a.移动中;
    var o = null == e ? r_MonopolyLogic.MonopolyLogic.getRandomDice() : e;
    this.contentPane.getController("c1").selectedIndex = 1;
    this.skDice.playing = false;
    this.skDice.loop = false;
    this.skDice.animationName = o + "";
    this.skDice.playing = true;
    r_TimeSystem.TimeSystem.scheduleOnce("randomDice", 2, function () {
      t.contentPane.getController("c1").selectedIndex = 0;
      r_MonopolyLogic.MonopolyLogic.findPath(o);
    });
  };
  _ctor.prototype.onClickAssDice = function () {
    var e = this;
    if (r_PlayerData.PlayerData.data.newMonpolyData.assignDice <= 0) {
      r_PlatformSystem.PlatformSystem.showVideo("添加幸运骰子", function () {
        r_PlayerData.PlayerData.data.newMonpolyData.assignDice++;
        r_PlayerData.PlayerData.saveData();
        e.propShow();
        e.videoNum++;
      });
    } else {
      if (this.currType == a.移动中) {
        return void r_UtilsSystem.UtilsSystem.showTip("移动中，不可投掷骰子");
      }
      r_MonopolyLuckyUI.default.showUI();
    }
  };
  _ctor.prototype.onClickAddDice = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("大富翁加骰子", function () {
      r_PlayerData.PlayerData.data.newMonpolyData.dice += 5;
      r_PlayerData.PlayerData.saveData();
      e.propShow();
      e.videoNum++;
    });
  };
  _ctor.prototype.onClickHouse = function () {
    if (this.m_isTouch) {
      this.skHouse.playing = false;
      this.skHouse.animationName = "step_1";
      this.skHouse.playing = true;
      this.m_clickNum++;
      r_SoundMgr.SoundMgr.playSound("monopoly/敲门");
      if (r_TYIndex.Platform.isDarenPlatform()) {
        this.m_clickNum % 10 == 0 && this.caidan();
      } else {
        r_TYIndex.Platform.isDarenPlatform() || r_PlayerData.PlayerData.data.monopolyCaidan || 10 == this.m_clickNum && this.caidan();
      }
    }
  };
  _ctor.prototype.caidan = function () {
    var e = this;
    this.m_isTouch = false;
    this.skBubble.visible = true;
    r_SoundMgr.SoundMgr.playSound("monopoly/别敲了");
    r_TimeSystem.TimeSystem.scheduleOnce("step_2", 2, function () {
      e.skBubble.visible = false;
    });
    r_TimeSystem.TimeSystem.scheduleOnce("step_4", 3, function () {
      e.skHouse.animationName = "step_2";
    });
    r_TimeSystem.TimeSystem.scheduleOnce("step_3", 5.5, function () {
      e.skHouse.animationName = "step_0";
      r_PlayerData.PlayerData.data.newMonpolyData.dice += 5;
      r_PlayerData.PlayerData.saveData();
      e.propShow();
      e.m_isTouch = true;
    });
  };
  _ctor.prototype.secondUpdate = function () {
    this.labTime.text = r_MonopolySystem.MonopolySystem.getTimeStr();
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.default = def_MonopolyUI;
(function (e) {
  e[e["等待中"] = 0] = "等待中";
  e[e["移动中"] = 1] = "移动中";
})(a = exports.monopolyType || (exports.monopolyType = {}));