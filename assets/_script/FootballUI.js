var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FootballUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_UtilsSystem = require("UtilsSystem");
var r_EraseCom = require("EraseCom");
var r_DebugSystem = require("DebugSystem");
var r_AnimSystem = require("AnimSystem");
var r_AlmanacResultUI = require("AlmanacResultUI");
var r_PenaltyUI = require("PenaltyUI");
var r_PlatformSystem = require("PlatformSystem");
var r_ReportSystem = require("ReportSystem");
var r_CaidanSystem = require("CaidanSystem");
var r_ResSystem = require("ResSystem");
var exp_FootballUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Lottery, r_UIDef.UIDef.Res.UI.FootballUI) || this;
    t.showTipList = [];
    t.successCoin = 0;
    t.hand = null;
    t.timeoutIndex = -1;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.FootballUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.FootballUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("block").on(cc.Node.EventType.TOUCH_START, function () {}, this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    this.btnAgain = this.contentPane.getChild("btnAgain").asButton;
    this.btnAgain.onClick(this.onClickAgain, this);
    this.btnAgain.visible = false;
    this.btnTip = this.contentPane.getChild("btnTip").asButton;
    r_CaidanSystem.CaidanSystem.bindBtn("zuqiu", this.btnTip, "footballCaidanVideo");
    var o = this.contentPane.getChild("btnPenalty").asCom;
    o.on(fgui.Event.TOUCH_BEGIN, function () {
      if (!r_PlayerData.PlayerData.data.penalty) {
        t.timeoutIndex = setTimeout(function () {
          if (!r_PlayerData.PlayerData.data.penalty) {
            console.log("点球大战彩蛋");
            r_PenaltyUI.PenaltyUI.showUI();
            r_PlayerData.PlayerData.data.penalty = true;
            r_PlayerData.PlayerData.saveData();
          }
        }, 1500);
        o.on(fgui.Event.TOUCH_END, function () {
          -1 != t.timeoutIndex && clearTimeout(t.timeoutIndex);
          o.off(fgui.Event.TOUCH_END);
        }, t);
      }
    }, this);
    this.contentPane.visible = false;
    r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/lottery/football", cc.Prefab, function (e, o) {
      t.prefab = cc.instantiate(o);
      t.prefab.active = true;
      t.contentPane.getChild("center").node.addChild(t.prefab);
      t.eraseCom = t.prefab.getComponent(r_EraseCom.default);
      t.eraseCom.cleanSuccessCallBack = t.cleanSuccess.bind(t);
      t.eraseCom.cleanAllSuccessCallBack = t.cleanAllSuccess.bind(t);
      t.eraseCom.touchMove = t.touchMove.bind(t);
      t.eraseCom.touchEnd = t.touchEnd.bind(t);
      t.contentPane.visible = true;
      t.hand = t.prefab.getChildByName("hand");
      t.hand.active = false;
      t.restart();
    });
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.touchMove = function (e) {
    this.hand.active = true;
    var t = e.touch.getLocation();
    var o = this.hand.parent.convertToNodeSpaceAR(t);
    this.hand.x = o.x + 100;
    this.hand.y = o.y - 100;
  };
  _ctor.prototype.touchEnd = function () {
    this.hand.active = false;
  };
  _ctor.prototype.onClickAgain = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("足球门票", function () {
      e.btnAgain.visible = false;
      e.restart();
    });
  };
  _ctor.prototype.cleanSuccess = function (e) {
    console.log("FootballUI cleanSuccess");
    var t = this.showTipList[e];
    if (t.hasReward) {
      r_PlayerData.PlayerData.addCoin("点球大战", t.coinNum, r_ReportSystem.SystemKey.彩票);
      t.visible = true;
      t.node.scale = 2;
      r_AnimSystem.AnimSystem.playCoinAnim(t.node);
      cc.tween(t.node).to(.2, {
        scale: t.animScale
      }).start();
    }
  };
  _ctor.prototype.cleanAllSuccess = function () {
    console.log("获得金币:" + this.successCoin);
    this.btnAgain.visible = true;
    this.btnTip.visible = false;
  };
  _ctor.prototype.restart = function () {
    if (this.prefab) {
      r_CaidanSystem.CaidanSystem.setIsVisibleAndState(this.btnTip, [r_PlayerData.PlayerData.data.penalty ? 1 : 0], r_PlayerData.PlayerData.data.footballCaidanVideo);
      this.showTipList = [];
      this.successCoin = 0;
      this.eraseCom.startClean();
      var e = r_UtilsSystem.UtilsSystem.randomPercentFromArray(r_DebugSystem.DebugSystem.getLotteryTicketCfg().rewardMap);
      this.contentPane.getChild("targetCoin").text = r_UtilsSystem.UtilsSystem.numFormats(e.reward);
      this.contentPane.getChild("rewardTip").visible = false;
      var t = r_UtilsSystem.UtilsSystem.isRandomSuccess(e.samepr);
      var o = r_UtilsSystem.UtilsSystem.getRandomFromArr(r_UtilsSystem.UtilsSystem.numList);
      this.contentPane.getChild("myNum").text = o + "";
      var i = this.contentPane.getChild("rewardTip");
      i.visible = false;
      i.animScale = 1;
      i.hasReward = false;
      this.showTipList.push(i);
      if (t) {
        i.hasReward = true;
        i.coinNum = parseInt(e.reward);
        this.successCoin = this.successCoin + parseInt(e.reward);
        this.contentPane.getChild("targetNum").text = o + "";
      } else {
        var n = r_UtilsSystem.UtilsSystem.getRandomFromArrExcept(r_UtilsSystem.UtilsSystem.numList, o);
        this.contentPane.getChild("targetNum").text = n + "";
      }
      for (var a = 1; a <= 4; a++) {
        var s = this.contentPane.getChild("item" + a);
        s.getChild("tip").visible = false;
        s.getChild("tip").animScale = .8;
        s.getChild("tip").hasReward = false;
        var l = r_UtilsSystem.UtilsSystem.randomPercentFromArray(r_DebugSystem.DebugSystem.getLotteryTicketCfg().myGoalMap);
        s.getChild("num").text = l.goal + "";
        var h = r_UtilsSystem.UtilsSystem.randomPercentFromArray(r_DebugSystem.DebugSystem.getLotteryTicketCfg().enemyGoalMap);
        var d = r_UtilsSystem.UtilsSystem.randomPercentFromArray(r_DebugSystem.DebugSystem.getLotteryTicketCfg().goalRewardMap);
        s.getChild("coin").text = r_UtilsSystem.UtilsSystem.numFormats(d.reward);
        this.contentPane.getChild("target" + a).text = h.goal + "";
        this.showTipList.push(s.getChild("tip"));
        if (parseInt(l.goal) > parseInt(h.goal)) {
          s.getChild("tip").hasReward = true;
          s.getChild("tip").coinNum = parseInt(d.reward);
          this.successCoin = this.successCoin + parseInt(d.reward);
        }
      }
      r_PlayerData.PlayerData.data.almanacMap.rewardType == r_AlmanacResultUI.AlmanacRewardType.刮彩 && (r_PlayerData.PlayerData.data.almanacMap.rewardType = 0);
    }
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.FootballUI = exp_FootballUI;