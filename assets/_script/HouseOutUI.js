var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_UtilsSystem = require("UtilsSystem");
var r_BillSystem = require("BillSystem");
var r_HouseCfg = require("HouseCfg");
var r_HouseMarketUI = require("HouseMarketUI");
var r_HouseSystem = require("HouseSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_HouseIndustryCom = require("HouseIndustryCom");
var r_ReportSystem = require("ReportSystem");
var def_HouseOutUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.House, r_UIDef.UIDef.Res.UI.HouseOutUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.HouseOutUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.HouseOutUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnClose").onClick(this.hide, this);
    this.contentPane.getChild("btnVideo").onClick(this.onClickVideo, this);
    this.labDesc = this.contentPane.getChild("labDesc").asLabel;
    this.labFirst = this.contentPane.getChild("labFirst").asLabel;
    this.labOut = this.contentPane.getChild("labOut").asLabel;
    this.labDay = this.contentPane.getChild("labDay").asLabel;
    this.labDayPrice = this.contentPane.getChild("labDayPrice").asLabel;
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.restart = function () {
    var e = this.data;
    var t = Math.ceil(e.price * r_PlayerData.PlayerData.data.houseData.randomCeff);
    var o = Math.ceil(.3 * t);
    var i = Math.ceil(1.2 * (t - o));
    this.labDesc.text = e.name;
    this.labFirst.text = "首付：" + r_UtilsSystem.UtilsSystem.getShowCoin(o);
    this.labOut.text = "贷款：" + r_UtilsSystem.UtilsSystem.getShowCoin(i);
    this.labDayPrice.text = "每日还款：" + r_UtilsSystem.UtilsSystem.getShowCoin(Math.ceil(i / 20));
  };
  _ctor.prototype.onClickVideo = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("分期付款", function () {
      var t = e.data;
      var o = Math.ceil(t.price * r_PlayerData.PlayerData.data.houseData.randomCeff);
      var i = Math.ceil(.3 * o);
      var n = Math.ceil(1.2 * (o - i));
      if (r_PlayerData.PlayerData.isCoinEnough(i)) {
        r_PlayerData.PlayerData.deleteCoin("买房首付", i, r_ReportSystem.SystemKey.楼市);
      } else {
        r_PlayerData.PlayerData.deleteCoin("买房首付", r_PlayerData.PlayerData.bigCoin, r_ReportSystem.SystemKey.楼市);
      }
      var a = new r_BillSystem.DiyBill({
        id: 3,
        billCoin: n,
        rate: 20,
        day: 20,
        dayCoin: Math.ceil(n / 20),
        name: "房贷"
      });
      r_BillSystem.BillSystem.addDiyBill(a);
      if (r_HouseCfg.HouseCfg[t.id].name == t.name) {
        r_HouseMarketUI.default.Inst && r_HouseMarketUI.default.Inst.buyLogic(t);
      } else if (r_HouseCfg.HouseStoreCfg[t.id].name == t.name) {
        r_HouseSystem.HouseSystem.addStore(t.id, o);
      } else if (r_HouseCfg.HouseIndustryCfg[t.id].name = t.name) {
        r_HouseSystem.HouseSystem.addIndustrys(t.id);
        r_HouseIndustryCom.default.instace && r_HouseIndustryCom.default.instace.onRefresh();
      }
      r_HouseMarketUI.default.Inst && r_HouseMarketUI.default.Inst.restart();
      e.hide();
    });
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.default = def_HouseOutUI;