var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LuckyTenUI = undefined;
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
var exp_LuckyTenUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Lottery, r_UIDef.UIDef.Res.UI.LuckyTenUI) || this;
    t.showTipList = [];
    t.successCoin = 0;
    t.allNumList = [];
    t.numNoTenList = [];
    t.hand = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.LuckyTenUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.LuckyTenUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("block").on(cc.Node.EventType.TOUCH_START, function () {}, this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    this.btnAgain = this.contentPane.getChild("btnAgain").asButton;
    this.btnAgain.onClick(this.onClickAgain, this);
    this.btnAgain.getChild("num").text = r_LotteryTicketCfg.BuyLuckyTenCoin + "";
    this.btnAgain.visible = false;
    this.contentPane.visible = false;
    r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/lottery/luckyTen", cc.Prefab, function (e, o) {
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
    for (var o = 0; o <= 99; o++) {
      this.allNumList.push(o);
      10 != o && this.numNoTenList.push(o);
    }
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
    if (r_PlayerData.PlayerData.isCoinEnough(r_LotteryTicketCfg.BuyLuckyTenCoin)) {
      r_PlayerData.PlayerData.deleteCoin("幸运10倍", r_LotteryTicketCfg.BuyLuckyTenCoin);
      this.btnAgain.visible = false;
      this.restart();
    } else {
      r_UtilsSystem.UtilsSystem.showTip("金币不足");
    }
  };
  _ctor.prototype.cleanSuccess = function (e) {
    console.log("LuckyTenUI cleanSuccess");
    var t = this.showTipList[e];
    if (t.hasReward) {
      r_PlayerData.PlayerData.addCoin("幸运10倍", t.coinNum, r_ReportSystem.SystemKey.彩票);
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
      var e = 6;
      var t = r_UtilsSystem.UtilsSystem.getRandomFromArr(this.numNoTenList);
      this.contentPane.getChild("targetNum").text = t + "";
      for (var o = 1; o <= 6; o++) {
        var i = r_UtilsSystem.UtilsSystem.randomPercentFromArray(r_DebugSystem.DebugSystem.getLotteryTicketCfg().luckyTen);
        this.contentPane.getChild("reward" + o).getChild("num").text = i.reward + "";
        for (var n = 1; n <= e; n++) {
          var a = this.contentPane.getChild("item" + o + "_" + n);
          a.getChild("tip").visible = false;
          var s = r_UtilsSystem.UtilsSystem.isRandomSuccess(i.samepr);
          a.getChild("num").visible = true;
          a.getChild("ten").visible = false;
          this.showTipList.push(a.getChild("tip"));
          a.getChild("tip").hasReward = false;
          if (s) {
            a.getChild("num").text = t + "";
            a.getChild("tip").hasReward = true;
            a.getChild("tip").coinNum = parseInt(i.reward);
            this.successCoin = this.successCoin + parseInt(i.reward);
          } else {
            var l = parseInt(i.reward) > 5e3 ? r_UtilsSystem.UtilsSystem.getRandomFromArrExcept(this.numNoTenList, t) : r_UtilsSystem.UtilsSystem.getRandomFromArrExcept(this.allNumList, t);
            a.getChild("num").text = l + "";
            if (10 == l) {
              a.getChild("num").visible = false;
              a.getChild("ten").visible = true;
              a.getChild("tip").hasReward = true;
              a.getChild("tip").coinNum = parseInt(i.reward);
              this.successCoin = this.successCoin + 10 * parseInt(i.reward);
            }
          }
        }
        e -= 1;
      }
      r_PlayerData.PlayerData.data.almanacMap.rewardType == r_AlmanacResultUI.AlmanacRewardType.刮彩 && (r_PlayerData.PlayerData.data.almanacMap.rewardType = 0);
    }
  };
  _ctor.prototype.onClickHot = function () {
    this.hide();
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.LuckyTenUI = exp_LuckyTenUI;