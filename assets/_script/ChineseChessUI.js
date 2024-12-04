var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChineseChessUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_ResSystem = require("ResSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_PlayerData = require("PlayerData");
var r_PlatformSystem = require("PlatformSystem");
var r_ChessRuleUI = require("ChessRuleUI");
var r_ChessResultUI = require("ChessResultUI");
var r_RoleSystem = require("RoleSystem");
var r_SoundMgr = require("SoundMgr");
var r_FguiResSystem = require("FguiResSystem");
var r_TimeSystem = require("TimeSystem");
var exp_ChineseChessUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.ChineseChess, r_UIDef.UIDef.Res.UI.ChineseChessUI) || this;
    t.uiType = "fullScreen";
    t.costList = [1e6, 1e7, 1e8];
    t.doubleNum = 1;
    t.isMyTurn = false;
    t.isFirst = false;
    t.enemyList = [];
    t.mineList = [];
    t.maxStepTime = 5;
    t.ChessList = ["Boss_R", "S_R", "X_R", "M_R", "C_R", "P_R", "B_R", "Boss_B", "S_B", "X_B", "M_B", "C_B", "P_B", "B_B"];
    t.time = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.ChineseChessUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.ChineseChessUI);
  };
  _ctor.prototype.onInit = function () {
    var o = this;
    e.prototype.onInit.call(this);
    _ctor.instance = this;
    for (var i = 1; i < 8; i++) {
      var n = this.contentPane.getChild("enemy" + i).asCom;
      var a = this.contentPane.getChild("mine" + i).asCom;
      this.enemyList.push({
        node: n,
        num: 0
      });
      this.mineList.push({
        node: a,
        num: 0
      });
    }
    this.level = this.contentPane.getChild("level").asLoader;
    this.btnBack = this.contentPane.getChild("btnBack").asButton;
    this.btnBack.onClick(this.onClickBack, this);
    this.selectController = this.contentPane.getController("select");
    this.difficultyController = this.contentPane.getController("difficulty");
    this.centerLoader = this.contentPane.getChild("center").asLoader;
    this.contentPane.getChild("btnRule").asButton.onClick(function () {
      r_ChessRuleUI.ChessRuleUI.showUI();
    }, this);
    this.btnEasy = this.contentPane.getChild("btnEasy").asButton;
    this.btnEasy.onClick(this.onClickEasy, this);
    this.btnNormal = this.contentPane.getChild("btnNormal").asButton;
    this.btnNormal.onClick(this.onClickNormal, this);
    this.btnSuper = this.contentPane.getChild("btnSuper").asButton;
    this.btnSuper.onClick(this.onClickSuper, this);
    this.btnEasy_s = this.contentPane.getChild("btnEasy_s").asButton;
    this.btnEasy_s.onClick(this.onClickEasy, this);
    this.btnNormal_s = this.contentPane.getChild("btnNormal_s").asButton;
    this.btnNormal_s.onClick(this.onClickNormal, this);
    this.btnSuper_s = this.contentPane.getChild("btnSuper_s").asButton;
    this.btnSuper_s.onClick(this.onClickSuper, this);
    r_ResSystem.ResSystem.loadBundleRes("game1", "ChineseChess/chineseChess", cc.Prefab, function (e, t) {
      if (t) {
        r_FguiResSystem.FguiResSystem.addAutoReleaseRes(o, t);
        o.prefab = cc.instantiate(t);
        o.centerLoader.node.addChild(o.prefab);
        o.chessCom = o.prefab.getComponent("ChineseChessCom");
        o.chessCom.initChess();
        o.level.node.off(cc.Node.EventType.TOUCH_START);
        o.level.node.off(cc.Node.EventType.TOUCH_END);
        o.level.node.on(cc.Node.EventType.TOUCH_START, function () {
          o.initEgg = true;
          o.chessCom.showAllChessBack();
        });
        o.level.node.on(cc.Node.EventType.TOUCH_END, function () {
          o.chessCom.clearAllChessBack();
        });
      }
    });
    this.downTimer = this.contentPane.getChild("downTimer").asCom;
    this.btnMoney = this.contentPane.getChild("btnMoney").asButton;
    this.btnMoney.onClick(this.onClickMoney, this);
    this.btnFree = this.contentPane.getChild("btnFree").asButton;
    this.btnFree.onClick(this.onClickFree, this);
    this.btnNoFirst = this.contentPane.getChild("btnNoFirst").asButton;
    this.btnNoFirst.onClick(this.onClickNoFirst, this);
    this.btnFirst = this.contentPane.getChild("btnFirst").asButton;
    this.btnFirst.onClick(this.onClickFirst, this);
    this.btnNoDouble = this.contentPane.getChild("btnNoDouble").asButton;
    this.btnNoDouble.onClick(this.onClickNoDouble, this);
    this.btnDouble = this.contentPane.getChild("btnDouble").asButton;
    this.btnDouble.onClick(this.onClickDouble, this);
    this.btnSuperDouble = this.contentPane.getChild("btnSuperDouble").asButton;
    this.btnSuperDouble.onClick(this.onClickSuperDouble, this);
    this.doubleNumText = this.contentPane.getChild("doubleNum").asTextField;
    this.mineHead1 = this.contentPane.getChild("mineHead1").asCom;
    this.mineHead2 = this.contentPane.getChild("mineHead2").asCom;
    this.levelPro1 = this.contentPane.getChild("levelPro1").asLoader;
    this.levelPro2 = this.contentPane.getChild("levelPro2").asLoader;
    this.mineIcon1 = this.contentPane.getChild("mineIcon1").asLoader;
    this.mineIcon2 = this.contentPane.getChild("mineIcon2").asLoader;
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.initUI();
    r_ResSystem.ResSystem.loadHeadImg(this.mineHead1.getChild("icon"), r_PlayerData.PlayerData.data.curHead);
    r_ResSystem.ResSystem.loadHeadImg(this.mineHead2.getChild("icon"), Math.floor(8 * Math.random()) + 1);
    var t = r_RoleSystem.RoleSystem.getRoleLevel();
    if (t < 10) {
      r_ResSystem.ResSystem.loadFguiImg(this.levelPro1, "ui/chessLevel/0");
    } else if (t < 30) {
      r_ResSystem.ResSystem.loadFguiImg(this.levelPro1, "ui/chessLevel/1");
    } else {
      r_ResSystem.ResSystem.loadFguiImg(this.levelPro1, "ui/chessLevel/2");
    }
    r_ResSystem.ResSystem.loadFguiImg(this.levelPro2, "ui/chessLevel/" + (Math.floor(2 * Math.random()) + 1) + "_0");
    r_TimeSystem.TimeSystem.registUpdate("chessUpdate", this.onUpdate1.bind(this));
  };
  _ctor.prototype.onHide = function () {
    r_TimeSystem.TimeSystem.unregistUpdate("chessUpdate");
  };
  _ctor.prototype.initUI = function () {
    var e = this;
    this.selectController.selectedIndex = 0;
    this.stepTime = this.maxStepTime;
    this.changeDoubleNum(1);
    this.btnFirst.getController("c1").selectedIndex = 0;
    this.isMyTurn = false;
    this.initBoard();
    if (this.chessCom) {
      this.chessCom.initBoard();
      this.level.node.off(cc.Node.EventType.TOUCH_START);
      this.level.node.off(cc.Node.EventType.TOUCH_END);
      this.level.node.on(cc.Node.EventType.TOUCH_START, function () {
        e.initEgg = true;
        e.chessCom.showAllChessBack();
      });
      this.level.node.on(cc.Node.EventType.TOUCH_END, function () {
        e.chessCom.clearAllChessBack();
      });
    }
  };
  _ctor.prototype.onUpdate1 = function (e) {
    if (!(this.selectController && this.selectController.selectedIndex < 2 || !this.isMyTurn)) {
      this.time += e;
      this.downTimer && (this.downTimer.getChild("icon").asImage.fillAmount -= e / this.maxStepTime);
      if (this.time >= 1) {
        this.time = 0;
        this.stepTime -= 1;
        if (this.stepTime <= 0) {
          if (2 == this.selectController.selectedIndex) {
            this.onClickNoFirst();
          } else {
            3 == this.selectController.selectedIndex && this.onClickNoDouble();
          }
        }
        this.downTimer.getChild("time").asTextField.text = this.stepTime.toString();
      }
    }
  };
  _ctor.prototype.onClickBack = function () {
    this.hide();
  };
  _ctor.prototype.onClickEasy = function () {
    this.changeReady(0);
  };
  _ctor.prototype.onClickNormal = function () {
    this.changeReady(1);
  };
  _ctor.prototype.onClickSuper = function () {
    this.changeReady(2);
  };
  _ctor.prototype.changeReady = function (e) {
    this.selectController.selectedIndex = 1;
    this.difficultyController.selectedIndex = e;
    switch (e) {
      case 0:
        this.btnMoney.getChild("num").asTextField.text = r_UtilsSystem.UtilsSystem.getShowCoin(this.costList[0]);
        break;
      case 1:
        this.btnMoney.getChild("num").asTextField.text = r_UtilsSystem.UtilsSystem.getShowCoin(this.costList[1]);
        break;
      case 2:
        this.btnMoney.getChild("num").asTextField.text = r_UtilsSystem.UtilsSystem.getShowCoin(this.costList[2]);
    }
  };
  _ctor.prototype.onClickMoney = function () {
    if (r_PlayerData.PlayerData.isCoinEnough(this.costList[this.difficultyController.selectedIndex])) {
      r_PlayerData.PlayerData.deleteCoin("象棋翻翻乐", this.costList[this.difficultyController.selectedIndex]);
      this.selectController.selectedIndex = 2;
      this.changeTurn();
      this.chessCom.initBoard();
      this.chessCom.showRandom(this.chessCom.randomNum);
    } else {
      r_UtilsSystem.UtilsSystem.showTip("金币不足");
    }
  };
  _ctor.prototype.onClickFree = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("象棋翻翻乐", function () {
      e.selectController.selectedIndex = 2;
      e.changeTurn();
      e.chessCom.initBoard();
      e.chessCom.showRandom(e.chessCom.randomNum);
    });
  };
  _ctor.prototype.onClickNoFirst = function () {
    var e = this;
    if (this.isMyTurn) {
      r_UtilsSystem.UtilsSystem.showTip("不抢");
      this.changeTurn();
      this.isFirst = false;
      setTimeout(function () {
        if (0 == e.btnFirst.getController("c1").selectedIndex) {
          e.changeDoubleNum(2 * e.doubleNum);
          r_UtilsSystem.UtilsSystem.showTip("对手：我抢(翻倍)");
        }
        e.AIDouble();
        e.changeTurn();
      }, 500);
    }
  };
  _ctor.prototype.onClickFirst = function () {
    if (this.isMyTurn && 0 == this.btnFirst.getController("c1").selectedIndex) {
      this.changeDoubleNum(2 * this.doubleNum);
      r_UtilsSystem.UtilsSystem.showTip("抢先(翻倍)");
      this.changeTurn();
      this.AIDouble();
      this.isFirst = true;
    }
  };
  _ctor.prototype.onClickNoDouble = function () {
    if (this.isMyTurn) {
      r_UtilsSystem.UtilsSystem.showTip("不加倍");
      this.changeTurn();
      this.AIDouble();
    }
  };
  _ctor.prototype.onClickDouble = function () {
    if (this.isMyTurn) {
      r_UtilsSystem.UtilsSystem.showTip("加倍");
      this.changeTurn();
      this.changeDoubleNum(2 * this.doubleNum);
      this.AIDouble();
    }
  };
  _ctor.prototype.onClickSuperDouble = function () {
    var e = this;
    this.isMyTurn && r_PlatformSystem.PlatformSystem.showVideo("象棋翻翻乐超级加倍", function () {
      r_UtilsSystem.UtilsSystem.showTip("超级加倍");
      e.changeTurn();
      e.changeDoubleNum(4 * e.doubleNum);
      e.AIDouble();
    });
  };
  _ctor.prototype.AIDouble = function () {
    var e = this;
    setTimeout(function () {
      e.isStartGame = true;
      e.chessCom.isMyTurn = true;
      e.mineIcon1.url = "ui://ChineseChess/" + e.ChessList[e.isFirst ? 0 : 7];
      e.mineIcon2.url = "ui://ChineseChess/" + e.ChessList[e.isFirst ? 7 : 0];
      if (e.isFirst) {
        e.selectController.selectedIndex = 4;
      } else {
        e.selectController.selectedIndex = 5;
        e.chessCom.changeTurn();
      }
      e.contentPane.getTransition("t0").play();
      e.initBoard();
      e.changeTurn();
    }, 500);
  };
  _ctor.prototype.changeDoubleNum = function (e) {
    this.doubleNum = e;
    this.doubleNumText.text = e.toString();
  };
  _ctor.prototype.changeTurn = function () {
    this.isMyTurn = !this.isMyTurn;
    this.stepTime = this.maxStepTime;
    this.downTimer.getChild("time").asTextField.text = this.stepTime.toString();
    this.downTimer.getChild("icon").asImage.fillAmount = 1;
  };
  _ctor.prototype.initBoard = function () {
    for (var e = 0; e < 7; e++) {
      this.enemyList[e].node.getController("c1").selectedIndex = 0;
      this.mineList[e].node.getController("c1").selectedIndex = 0;
      this.enemyList[e].node.getChild("icon").url = "";
      this.mineList[e].node.getChild("icon").url = "";
      this.enemyList[e].num = 0;
      this.mineList[e].num = 0;
    }
  };
  _ctor.prototype.addKillChess = function (e, t, o) {
    var i = e ? this.mineList : this.enemyList;
    i[t].num++;
    i[t].num > 1 && (i[t].node.getController("c1").selectedIndex = 1);
    i[t].node.getChild("num").asTextField.text = i[t].num.toString();
    i[t].node.getChild("icon").url = "ui://ChineseChess/" + this.ChessList[t + o];
  };
  _ctor.prototype.gameOver = function (e) {
    this.chessCom.isMyTurn = false;
    this.isStartGame = false;
    this.initEgg && (r_PlayerData.PlayerData.data.chessEgg = true);
    if (e) {
      r_SoundMgr.SoundMgr.playSound("chess/win");
      r_UtilsSystem.UtilsSystem.showTip("胜利");
      if (2 == this.difficultyController.selectedIndex) {
        var t = 0;
        var o = [10, 8, 6, 5, 4, 3, 2];
        for (var i = 0; i < 7; i++) {
          t += this.enemyList[i].num * o[i];
        }
        t = 72 - t;
        this.doubleNum += t;
        this.doubleNumText.text = this.doubleNum.toString();
      }
      r_ChessResultUI.ChessResultUI.showUI({
        type: 0,
        num: this.costList[this.difficultyController.selectedIndex] * this.doubleNum
      });
    } else {
      r_SoundMgr.SoundMgr.playSound("chess/fail");
      r_UtilsSystem.UtilsSystem.showTip("失败");
      r_ChessResultUI.ChessResultUI.showUI({
        type: 1,
        num: this.costList[this.difficultyController.selectedIndex] * this.doubleNum
      });
    }
  };
  _ctor.instance = null;
  return _ctor;
}(r_TYIndex.UIWind);
exports.ChineseChessUI = exp_ChineseChessUI;