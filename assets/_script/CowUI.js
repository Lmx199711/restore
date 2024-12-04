var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CowUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_UtilsSystem = require("UtilsSystem");
var r_EraseCom = require("EraseCom");
var r_DebugSystem = require("DebugSystem");
var r_AnimSystem = require("AnimSystem");
var r_AlmanacResultUI = require("AlmanacResultUI");
var r_LotteryTicketCfg = require("LotteryTicketCfg");
var r_ReportSystem = require("ReportSystem");
var r_ResSystem = require("ResSystem");
var exp_CowUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Lottery, r_UIDef.UIDef.Res.UI.CowUI) || this;
    t.showTipList = [];
    t.successCoin = 0;
    t.hand = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.CowUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.CowUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("block").on(cc.Node.EventType.TOUCH_START, function () {}, this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    this.btnAgain = this.contentPane.getChild("btnAgain").asButton;
    this.btnAgain.onClick(this.onClickAgain, this);
    this.btnAgain.getChild("num").text = r_LotteryTicketCfg.BuyCowCoin + "";
    this.btnAgain.visible = false;
    this.contentPane.visible = false;
    r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/lottery/cow", cc.Prefab, function (e, o) {
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
    if (r_PlayerData.PlayerData.isCoinEnough(r_LotteryTicketCfg.BuyCowCoin)) {
      r_PlayerData.PlayerData.deleteCoin("牛牛门票", r_LotteryTicketCfg.BuyCowCoin, r_ReportSystem.SystemKey.彩票);
      this.btnAgain.visible = false;
      this.restart();
    } else {
      r_UtilsSystem.UtilsSystem.showTip("金币不足");
    }
  };
  _ctor.prototype.cleanSuccess = function (e) {
    var t = this.showTipList[e];
    if (t.hasReward) {
      r_PlayerData.PlayerData.addCoin("牛牛", t.coinNum, r_ReportSystem.SystemKey.彩票);
      t.visible = true;
      t.node.scale = 2;
      r_AnimSystem.AnimSystem.playCoinAnim(t.node);
      cc.tween(t.node).to(.2, {
        scale: 1
      }).start();
    }
  };
  _ctor.prototype.cleanAllSuccess = function () {
    console.log("获得金币:" + this.successCoin);
    this.btnAgain.visible = true;
  };
  _ctor.prototype.restart = function () {
    if (this.prefab) {
      this.eraseCom.startClean();
      this.showTipList = [];
      this.successCoin = 0;
      for (var e = 1; e <= 25; e++) {
        var t = this.contentPane.getChild("item" + e);
        var o = r_UtilsSystem.UtilsSystem.randomPercentFromArray(r_DebugSystem.DebugSystem.getLotteryTicketCfg().cow);
        t.getChild("tip").visible = false;
        var i = r_UtilsSystem.UtilsSystem.getRandomNum(1, 99);
        i < 10 && (i = "0" + i);
        t.getChild("num").text = i + "";
        t.getChild("coin").text = r_UtilsSystem.UtilsSystem.getShowCoin(o.reward) + "";
        this.showTipList.push(t.getChild("tip"));
        t.getChild("tip").hasReward = false;
        var n = 0;
        var a = r_UtilsSystem.UtilsSystem.getRandomNum(1, 100);
        if (a <= o.cow1) {
          n = 1;
        } else if (a <= o.cow1 + o.cow2) {
          n = 2;
        } else {
          a <= o.cow1 + o.cow2 + o.cow3 && (n = 3);
        }
        t.getController("mode").selectedIndex = n;
        if (n) {
          t.getChild("tip").hasReward = true;
          t.getChild("tip").coinNum = parseInt(o.reward) * n;
          this.successCoin = this.successCoin + parseInt(o.reward) * n;
        }
      }
      r_PlayerData.PlayerData.data.almanacMap.rewardType == r_AlmanacResultUI.AlmanacRewardType.刮彩 && (r_PlayerData.PlayerData.data.almanacMap.rewardType = 0);
    }
  };
  _ctor.prototype.onClickHot = function () {
    this.hide();
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.CowUI = exp_CowUI;