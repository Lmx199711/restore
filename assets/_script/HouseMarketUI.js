var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_HouseSystem = require("HouseSystem");
var r_HouseCfg = require("HouseCfg");
var r_UtilsSystem = require("UtilsSystem");
var r_SoundMgr = require("SoundMgr");
var r_PlayerData = require("PlayerData");
var r_PlatformSystem = require("PlatformSystem");
var r_HouseOutUI = require("HouseOutUI");
var r_HouseLeaseUI = require("HouseLeaseUI");
var r_EmgcSystem = require("EmgcSystem");
var r_EmgcUI = require("EmgcUI");
var r_ReportSystem = require("ReportSystem");
var r_BaseWin = require("BaseWin");
var r_HouseUI = require("HouseUI");
var def_HouseMarketUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.House, r_UIDef.UIDef.Res.UI.HouseMarketUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.HouseMarketUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.HouseMarketUI);
  };
  _ctor.prototype.onInit = function () {
    var o = this;
    e.prototype.onInit.call(this);
    _ctor.Inst = this;
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    this.labDesc = this.contentPane.getChild("labDesc").asTextField;
    this.list0 = this.contentPane.getChild("list0").asList;
    this.list0.setVirtual();
    this.list0.itemRenderer = this.onListRendererItem.bind(this);
    this.list1 = this.contentPane.getChild("list1").asList;
    this.list1.setVirtual();
    this.list1.itemRenderer = this.onListRendererItem.bind(this);
    this.indCom = this.contentPane.getChild("HouseTap3");
    this.red = this.contentPane.getChild("red");
    this.contentPane.getChild("btnRefresh").onClick(this.onClickRefresh, this);
    var i = function (e) {
      n.contentPane.getChild("btnTap" + e).onClick(function () {
        o.contentPane.getController("c1").setSelectedIndex(e);
      }, n);
    };
    var n = this;
    for (var a = 0; a < 3; a++) {
      i(a);
    }
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.Inst = this;
    this.restart();
    this.indCom.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.Inst = null;
    r_HouseUI.default.instace && r_HouseUI.default.instace.restart();
  };
  _ctor.prototype.restart = function () {
    var e = Object.values(r_HouseCfg.HouseCfg);
    this.list0.numItems = e.length;
    var t = Object.values(r_HouseCfg.HouseStoreCfg);
    this.list1.numItems = t.length;
    var o = cc.color(241, 1, 1);
    var i = cc.color(124, 220, 74);
    var n = Math.ceil(100 * Math.abs(r_PlayerData.PlayerData.data.houseData.randomCeff - 1));
    if (r_PlayerData.PlayerData.data.houseData.randomCeff >= 1) {
      this.labDesc.text = "市场欣欣向荣，房价上涨" + n + "%";
      this.labDesc.color = o;
    } else {
      this.labDesc.text = "市场死气沉沉，房价下降" + n + "%";
      this.labDesc.color = i;
    }
  };
  _ctor.prototype.onUpdate = function () {
    e.prototype.onUpdate.call(this);
    this.red && (this.red.visible = r_HouseSystem.HouseSystem.checkIndustryComplate());
  };
  _ctor.prototype.onListRendererItem = function (e, t) {
    switch (t.parent) {
      case this.list0:
        var o = Object.values(r_HouseCfg.HouseCfg)[e];
        this.setItem0(t, o);
        break;
      case this.list1:
        o = Object.values(r_HouseCfg.HouseStoreCfg)[e];
        this.setItem1(t, o);
    }
  };
  _ctor.prototype.setItem0 = function (e, t) {
    e.getChild("img").asLoader.url = "ui://House/houseIcon" + t.id;
    e.getChild("labName").asLabel.text = t.name;
    var o = t.price * r_PlayerData.PlayerData.data.houseData.randomCeff;
    e.getChild("labPrice").asLabel.text = "价格：" + r_UtilsSystem.UtilsSystem.getShowCoin(o);
    var i = r_HouseSystem.HouseSystem.getHouseData();
    var n = i.hasHouseId < t.id ? 0 : i.houseId == t.id ? 2 : 1;
    0 == n && (n = t.id == i.hasHouseId + 1 ? 0 : 3);
    e.getController("c1").setSelectedIndex(n);
    e.getChild("btnBuy").clearClick();
    e.getChild("btnBuy").onClick(this.itemBuyClickEvent.bind(this, t), this);
    e.getChild("btnSelect").clearClick();
    e.getChild("btnSelect").onClick(this.itemSelectClickEvent.bind(this, t), this);
    e.getChild("btnFenQi").clearClick();
    e.getChild("btnFenQi").onClick(this.itemFenqiClickEvent.bind(this, t), this);
  };
  _ctor.prototype.itemBuyClickEvent = function (e) {
    var t = Math.ceil(e.price * r_PlayerData.PlayerData.data.houseData.randomCeff);
    if (r_PlayerData.PlayerData.isCoinEnough(t)) {
      r_PlayerData.PlayerData.deleteCoin("买住房", t, r_ReportSystem.SystemKey.楼市);
      this.buyLogic(e);
    } else {
      r_UtilsSystem.UtilsSystem.showTip("钱不够~");
    }
  };
  _ctor.prototype.itemFenqiClickEvent = function (e) {
    var t = Math.ceil(e.price * r_PlayerData.PlayerData.data.houseData.randomCeff);
    var o = Math.ceil(.3 * t);
    if (r_PlayerData.PlayerData.isCoinEnough(o)) {
      r_HouseOutUI.default.showUI(e);
    } else {
      r_UtilsSystem.UtilsSystem.showTip("不够首付的钱");
    }
  };
  _ctor.prototype.buyLogic = function (e) {
    r_PlayerData.PlayerData.data.houseData.hasHouseId = e.id;
    this.selectItem(e.id);
  };
  _ctor.prototype.itemSelectClickEvent = function (e) {
    r_SoundMgr.SoundMgr.playSound("click");
    this.selectItem(e.id);
  };
  _ctor.prototype.selectItem = function (e) {
    r_HouseSystem.HouseSystem.setHouseId(e);
    this.restart();
    r_HouseUI.default.instace && r_HouseUI.default.instace.restart();
  };
  _ctor.prototype.onClickRefresh = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("刷新楼市", function () {
      r_HouseSystem.HouseSystem.refreshPrice();
      e.indCom.onRefresh();
    });
  };
  _ctor.prototype.setItem1 = function (e, t) {
    e.getChild("img").asLoader.url = "ui://House/storeIcon" + t.id;
    e.getChild("labName").asLabel.text = t.name;
    var o = t.price * r_PlayerData.PlayerData.data.houseData.randomCeff;
    e.getChild("labPrice").asLabel.text = "价格：" + r_UtilsSystem.UtilsSystem.getShowCoin(o);
    var i = r_HouseSystem.HouseSystem.getStoreType(t.id);
    e.getController("c1").setSelectedIndex(i);
    e.getChild("btnBuy").clearClick();
    e.getChild("btnBuy").onClick(this.itemBuyClickEvent1.bind(this, t), this);
    e.getChild("btnFenQi").clearClick();
    e.getChild("btnFenQi").onClick(this.itemFenqiClickEvent.bind(this, t), this);
    e.getChild("btnOut").clearClick();
    e.getChild("btnOut").onClick(this.onClickLease.bind(this, t), this);
    e.getChild("btnSell").clearClick();
    e.getChild("btnSell").onClick(this.onClickSell.bind(this, t), this);
    e.getChild("btnTuizu").clearClick();
    e.getChild("btnTuizu").onClick(this.onClickTuizu.bind(this, t), this);
    var n = r_HouseSystem.HouseSystem.getLodgerInfo(t.id);
    var a = n ? n.price : 0;
    e.getChild("labDayCoIn").asLabel.text = r_UtilsSystem.UtilsSystem.getShowCoin(a) + "/天";
    e.getChild("iconHead").asLoader.url = n ? "ui://House/头像" + n.lodgerId : "";
    e.getChild("labSell").asLabel.text = "出售价格：" + r_UtilsSystem.UtilsSystem.getShowCoin(o);
    var r = r_HouseSystem.HouseSystem.getStorePrice(t.id);
    e.getChild("labBuy").asLabel.text = "(购买价格：" + r_UtilsSystem.UtilsSystem.getShowCoin(r) + ")";
  };
  _ctor.prototype.itemBuyClickEvent1 = function (e) {
    var t = Math.ceil(e.price * r_PlayerData.PlayerData.data.houseData.randomCeff);
    if (r_PlayerData.PlayerData.isCoinEnough(t)) {
      r_PlayerData.PlayerData.deleteCoin("买住房", t, r_ReportSystem.SystemKey.楼市);
      r_HouseSystem.HouseSystem.addStore(e.id, t);
      this.restart();
    } else {
      r_UtilsSystem.UtilsSystem.showTip("钱不够~");
    }
  };
  _ctor.prototype.onClickLease = function (e) {
    r_HouseLeaseUI.default.showUI(e);
  };
  _ctor.prototype.onClickSell = function (e) {
    var t = this;
    var o = Math.ceil(e.price * r_PlayerData.PlayerData.data.houseData.randomCeff);
    if (r_UtilsSystem.UtilsSystem.getRandomNum(0, 1)) {
      var i = Math.ceil(1.2 * o);
      var n = {};
      n.content = "某大佬很感兴趣，想要加价20%，以" + r_UtilsSystem.UtilsSystem.getShowCoin(i) + "元买下";
      n.resultParam1 = i;
      n.callBack = function () {
        r_HouseSystem.HouseSystem.sellStore(e.id);
        t.restart();
      };
      r_EmgcSystem.EmgcSystem.takeEmgcCfg(11, n);
      return void r_EmgcUI.EmgcUI.showUI({
        id: 11
      });
    }
    r_PlayerData.PlayerData.addCoin("卖房所得", o, r_ReportSystem.SystemKey.楼市);
    r_HouseSystem.HouseSystem.sellStore(e.id);
    this.restart();
  };
  _ctor.prototype.onClickTuizu = function (e) {
    r_HouseSystem.HouseSystem.removeLodger(e.id);
    this.restart();
  };
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_HouseMarketUI;