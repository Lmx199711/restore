var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RankDonateUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_UtilsSystem = require("UtilsSystem");
var r_RankSystem = require("RankSystem");
var r_ReportSystem = require("ReportSystem");
var exp_RankDonateUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Rank, r_UIDef.UIDef.Res.UI.RankDonateUI) || this;
    t.coinList = [5e5, 1e7, 1e8, 5e9];
    t.nameList = ["50w", "1000w", "1亿", "50亿"];
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.RankDonateUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.RankDonateUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    for (var t = 1; t <= 4; t++) {
      var o = this.contentPane.getChild("btnDonate" + t);
      o.getChild("num").text = this.nameList[t - 1];
      this.registBtn(o, t);
    }
    this.provinceCom = this.contentPane.getChild("provinceCom");
    this.provinceCom.getChild("btnProvince").onClick(this.onClickProvince, this);
    this.list = this.provinceCom.getChild("list").asList;
    this.list.setVirtual();
    this.list.itemRenderer = this.onListRenderer.bind(this);
    this.list.numItems = r_RankSystem.RankSystem.showNameList.length;
  };
  _ctor.prototype.onListRenderer = function (e, t) {
    var o = this;
    var i = r_RankSystem.RankSystem.showNameList[e];
    t.getChild("province").text = i;
    t.getChild("touch").clearClick();
    t.getChild("touch").onClick(function () {
      o.selectAreamId = e + 1;
      o.refreshName();
      o.onClickProvince();
    }, this);
  };
  _ctor.prototype.onClickProvince = function () {
    if (this.provinceCom.getController("mode").selectedIndex) {
      this.provinceCom.getController("mode").selectedIndex = 0;
    } else {
      this.provinceCom.getController("mode").selectedIndex = 1;
    }
  };
  _ctor.prototype.registBtn = function (e, t) {
    var o = this;
    e.onClick(function () {
      if (r_PlayerData.PlayerData.isCoinEnough(o.coinList[t - 1])) {
        r_PlayerData.PlayerData.deleteCoin("排行榜捐赠", o.coinList[t - 1], r_ReportSystem.SystemKey.None);
        r_PlayerData.PlayerData.addDonateCoin(o.coinList[t - 1]);
      } else {
        r_UtilsSystem.UtilsSystem.showTip("金币不足");
      }
    }.bind(this), this);
  };
  _ctor.prototype.addDonate = function () {
    var e = this;
    r_PlayerData.PlayerData.checkDonateCoin() && r_RankSystem.RankSystem.addDonate(this.selectAreamId, parseInt(r_PlayerData.PlayerData.data.donateCoinStr), function () {
      r_PlayerData.PlayerData.initDonateCoin();
      r_RankSystem.RankSystem.getDonate(function () {
        e.refreshInfo();
      });
    });
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.selectAreamId = r_RankSystem.RankSystem.areamId;
    this.provinceCom.getController("mode").selectedIndex = 0;
    this.refreshInfo();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    this.addDonate();
  };
  _ctor.prototype.refreshInfo = function () {
    var e = 0;
    var t = 0;
    if (r_RankSystem.RankSystem.myAreaInfo) {
      e = r_RankSystem.RankSystem.myAreaInfo.score;
      t = r_RankSystem.RankSystem.myAreaInfo.rankNum;
    } else {
      var o = r_RankSystem.RankSystem.getInfoFromRank();
      if (o) {
        e = o.source;
        t = o.rankNum;
      }
    }
    this.contentPane.getChild("coin").text = "+" + r_UtilsSystem.UtilsSystem.getShowCoin(e);
    this.contentPane.getChild("rank").text = "当前排名：第" + t + "名";
    this.refreshName();
  };
  _ctor.prototype.refreshName = function () {
    this.provinceCom.getChild("province").text = r_RankSystem.RankSystem.showNameList[this.selectAreamId - 1];
  };
  _ctor.prototype.onClickHot = function () {
    this.hide();
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.RankDonateUI = exp_RankDonateUI;