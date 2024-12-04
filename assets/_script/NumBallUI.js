Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumBallUI = exports._NumBallUI = undefined;
var r_UtilsSystem = require("UtilsSystem");
var r_PlayerData = require("PlayerData");
var r_DaySystem = require("DaySystem");
var r_TimeSystem = require("TimeSystem");
var r_NumBallResultUI = require("NumBallResultUI");
var r_ReportSystem = require("ReportSystem");
var r_ResSystem = require("ResSystem");
var exp__NumBallUI = function () {
  function _ctor() {
    this.debugNum = [16, 17, 18, 19, 20];
    this.debugVersion = 5;
    this.showAnimFlag = true;
    this.buyNumBallCoin = 20;
    this.selectMap = {};
    this.targetMap = {};
  }
  _ctor.prototype.init = function (e) {
    var t = this;
    this.lotteryUI = e;
    this.root = this.lotteryUI.contentPane.getChild("mode3");
    this.btnBuy = this.root.getChild("btnBuy").asButton;
    this.btnBuy.onClick(this.onClickBuy, this);
    this.btnBuy.getChild("num").text = exports.NumBallUI.buyNumBallCoin + "";
    for (var i = 1; i <= 20; i++) {
      (n = this.root.getChild("ball" + i)).getChild("num1").text = i + "";
      n.getChild("num2").text = i + "";
      this.registBallTap(n, i);
    }
    for (i = 1; i <= 5; i++) {
      var n;
      (n = this.root.getChild("target" + i)).getController("mode").selectedIndex = 0;
    }
    var a = this.lotteryUI.contentPane.getChild("ballRoot");
    r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/lottery/numball", cc.Prefab, function (e, o) {
      t.animNode = cc.instantiate(o);
      t.animNode.active = true;
      a.node.addChild(t.animNode);
      t.refreshAnim();
    });
  };
  _ctor.prototype.onShown = function () {
    var e = this;
    this.refreshBuyBtn();
    r_TimeSystem.TimeSystem.registSecondUpdate("numBallUIUpdate", function () {
      return [e.checkFinish()];
    });
    this.checkFinish();
  };
  _ctor.prototype.onHide = function () {
    r_TimeSystem.TimeSystem.unregistSecondUpdate("numBallUIUpdate");
  };
  _ctor.prototype.refreshAll = function () {
    this.refreshBuyBtn();
    this.refreshAnim();
    this.refreshTarget();
    this.refreshSelectItem();
  };
  _ctor.prototype.refreshSelectItem = function () {
    for (var e = 1; e <= 20; e++) {
      var t = this.root.getChild("ball" + e);
      if (this.isSelect(e)) {
        t.getController("mode").selectedIndex = 1;
      } else {
        t.getController("mode").selectedIndex = 0;
      }
    }
  };
  _ctor.prototype.checkFinish = function () {
    r_NumBallResultUI.NumBallResultUI.Inst || r_PlayerData.PlayerData.data.numBallData.selectList && r_PlayerData.PlayerData.data.numBallData.selectDay != r_DaySystem.DaySystem.getShowDay() && r_NumBallResultUI.NumBallResultUI.showUI();
  };
  _ctor.prototype.refreshBuyBtn = function () {
    if (r_PlayerData.PlayerData.data.numBallData.selectList) {
      this.btnBuy.grayed = true;
    } else {
      this.btnBuy.grayed = false;
    }
  };
  _ctor.prototype.onClickBuy = function () {
    if (r_PlayerData.PlayerData.data.numBallData.selectList) {
      r_UtilsSystem.UtilsSystem.showTip("已经购买过");
    } else if (r_PlayerData.PlayerData.isCoinEnough(exports.NumBallUI.buyNumBallCoin)) {
      r_PlayerData.PlayerData.deleteCoin("购买点球大战", exports.NumBallUI.buyNumBallCoin, r_ReportSystem.SystemKey.彩票);
      for (var e = 1; e <= 5; e++) {
        if (!this.targetMap[e]) {
          return void r_UtilsSystem.UtilsSystem.showTip("请选择5个数字");
        }
      }
      var t = [];
      for (e = 1; e <= 5; e++) {
        t.push(this.targetMap[e]);
      }
      r_PlayerData.PlayerData.data.numBallData.selectList = t;
      r_PlayerData.PlayerData.data.numBallData.selectDay = r_DaySystem.DaySystem.getShowDay();
      this.refreshAll();
    } else {
      r_UtilsSystem.UtilsSystem.showTip("金币不足");
    }
  };
  _ctor.prototype.isSelect = function (e) {
    return !!this.selectMap[e];
  };
  _ctor.prototype.select = function (e, t) {
    var o = false;
    for (var i = 1; i <= 5; i++) {
      if (!this.targetMap[i]) {
        this.targetMap[i] = t;
        o = true;
        break;
      }
    }
    if (o) {
      this.selectMap[t] = true;
      e.getController("mode").selectedIndex = 1;
      this.refreshTarget();
    }
  };
  _ctor.prototype.unselect = function (e, t) {
    this.selectMap[t] = false;
    e.getController("mode").selectedIndex = 0;
    for (var o = 1; o <= 5; o++) {
      this.targetMap[o] == t && (this.targetMap[o] = null);
    }
    this.refreshTarget();
  };
  _ctor.prototype.refreshTarget = function () {
    for (var e = 1; e <= 5; e++) {
      var t = this.root.getChild("target" + e);
      if (this.targetMap[e]) {
        t.getChild("num").text = this.targetMap[e] + "";
        t.getController("mode").selectedIndex = 1;
      } else {
        t.getController("mode").selectedIndex = 0;
      }
    }
  };
  _ctor.prototype.refreshAnim = function () {
    if (this.animNode) {
      if (r_PlayerData.PlayerData.data.numBallData.selectList) {
        this.animNode.getChildByName("run").active = true;
        this.animNode.getChildByName("idle").active = false;
      } else {
        this.animNode.getChildByName("run").active = false;
        this.animNode.getChildByName("idle").active = true;
      }
    }
  };
  _ctor.prototype.registBallTap = function (e, t) {
    var o = this;
    e.onClick(function () {
      if (o.isSelect(t)) {
        o.unselect(e, t);
      } else {
        o.select(e, t);
      }
    }, this);
  };
  return _ctor;
}();
exports._NumBallUI = exp__NumBallUI;
exports.NumBallUI = new exp__NumBallUI();