var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DriftBottleTipUI = undefined;
var s;
var r_UIDef = require("UIDef");
var r_UtilsSystem = require("UtilsSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_BaseWin = require("BaseWin");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_PlayerData = require("PlayerData");
var r_BagSystem = require("BagSystem");
var r_ReportSystem = require("ReportSystem");
(function (e) {
  e[e["收起来"] = 0] = "收起来";
  e[e["举报"] = 1] = "举报";
})(s || (s = {}));
var f = [{
  id: 1,
  name: "吐露心扉",
  title: "吐露心扉",
  rewardMoney: 0,
  payMoney: 5e6,
  descSuc: "获得一份吐露心扉的“任务”信件，可交付特殊商人提升收益",
  failDesc: "因为你的检举，导致抓错了人，被罚款500万"
}, {
  id: 2,
  name: "重金求子",
  title: "重金求子",
  rewardMoney: 2e6,
  payMoney: 5e6,
  descSuc: "因你举报有功，特此奖励200万",
  failDesc: "你联系了富婆，富婆要求缴纳500万保证金，被骗取500万"
}, {
  id: 3,
  name: "策划方案",
  title: "策划的农场设计方案",
  rewardMoney: 2e6,
  payMoney: 5e6,
  descSuc: "策划害怕你将策划案大势宣传，苦苦哀求交还策划案，补偿你200万奖励",
  failDesc: "举报信到了策划手里，策划给你穿小鞋，扣除500万"
}, {
  id: 4,
  name: "卖茶女孩",
  title: "卖茶女孩",
  rewardMoney: 2e6,
  payMoney: 5e6,
  descSuc: "因你举报有功，特此奖励200万",
  failDesc: "你买了1万斤卖茶女的茶叶，之后卖茶女消失，损失500万"
}];
var exp_DriftBottleTipUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.GoodsShop, r_UIDef.UIDef.Res.UI.DriftBottleTipUI) || this;
    t.payMoney = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.DriftBottleTipUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.DriftBottleTipUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnPay.onClick(this.onClickPay, this);
    this.btnFreePay.onClick(this.onClickFreePay, this);
    this.btnGet.onClick(this.onClickGet, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.refreshSelectedIndex();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.refreshSelectedIndex = function () {
    var e = true;
    this.contentPane.getController("c1").selectedIndex = this.data.id - 1;
    if (this.data.type == s.收起来) {
      if (1 == this.data.id || 3 == this.data.id) {
        e = true;
      } else {
        2 != this.data.id && 4 != this.data.id || (e = false);
      }
    } else if (1 == this.data.id || 3 == this.data.id) {
      e = false;
    } else {
      2 != this.data.id && 4 != this.data.id || (e = true);
    }
    if (e) {
      this.contentPane.getController("c2").selectedIndex = 0;
      if (1 == this.data.id) {
        r_BagSystem.BagSystem.setPlayerGoodsInfoById(42, 1);
      } else {
        r_PlayerData.PlayerData.addCoin("漂流瓶", f[this.data.id - 1].rewardMoney, r_ReportSystem.SystemKey.超市, false);
        this.payMoney = f[this.data.id - 1].rewardMoney;
      }
      this.lbDesc.text = f[this.data.id - 1].descSuc;
    } else {
      this.contentPane.getController("c2").selectedIndex = 1;
      if (r_PlayerData.PlayerData.isCoinEnough(f[this.data.id - 1].payMoney)) {
        r_PlayerData.PlayerData.deleteCoin("漂流瓶", f[this.data.id - 1].payMoney, r_ReportSystem.SystemKey.超市, true);
        this.payMoney = f[this.data.id - 1].payMoney;
      } else {
        r_PlayerData.PlayerData.deleteCoin("漂流瓶", r_PlayerData.PlayerData.bigCoin, r_ReportSystem.SystemKey.超市, true);
        this.payMoney = r_PlayerData.PlayerData.bigCoin;
      }
      this.lbDesc.text = f[this.data.id - 1].failDesc;
    }
  };
  _ctor.prototype.onClickPay = function () {
    r_UtilsSystem.UtilsSystem.showTip("损失" + r_UtilsSystem.UtilsSystem.getShowCoin(this.payMoney));
    this.hide();
  };
  _ctor.prototype.onClickFreePay = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("漂流瓶免于惩罚", function () {
      r_PlayerData.PlayerData.addCoin("漂流瓶", e.payMoney, r_ReportSystem.SystemKey.超市, false);
      r_UtilsSystem.UtilsSystem.showTip("挽回损失" + r_UtilsSystem.UtilsSystem.getShowCoin(e.payMoney));
      e.hide();
    });
  };
  _ctor.prototype.onClickGet = function () {
    if (1 == this.data.id) {
      r_UtilsSystem.UtilsSystem.showTip("获得信件请前往仓库查看");
    } else {
      r_UtilsSystem.UtilsSystem.showTip("获得金币" + r_UtilsSystem.UtilsSystem.getShowCoin(this.payMoney));
    }
    this.hide();
  };
  __decorate([r_DecorateFunction1.AutoFind("btnPay")], _ctor.prototype, "btnPay", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnFreePay")], _ctor.prototype, "btnFreePay", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnGet")], _ctor.prototype, "btnGet", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbDesc")], _ctor.prototype, "lbDesc", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.DriftBottleTipUI = exp_DriftBottleTipUI;