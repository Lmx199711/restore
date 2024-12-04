var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_PlatformSystem = require("PlatformSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_HouseSystem = require("HouseSystem");
var r_HouseMarketUI = require("HouseMarketUI");
var r_HouseCfg = require("HouseCfg");
var def_HouseLeaseUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.House, r_UIDef.UIDef.Res.UI.HouseLeaseUI) || this;
    t.m_id = null;
    t.m_arr = [2, 3, 4, 5, 6, 7];
    t.m_arr1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    t.m_map = {};
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.HouseLeaseUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.HouseLeaseUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnClose").onClick(this.hide, this);
    this.contentPane.getChild("btnChange").onClick(this.onClickChange, this);
    this.contentPane.getChild("btnOut").onClick(this.onClickOut, this);
    this.imgHead = this.contentPane.getChild("imgHead").asLoader;
    this.labDesc = this.contentPane.getChild("labDesc").asLabel;
    this.labBubble = this.contentPane.getChild("labBubble").asLabel;
    this.random();
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.restart = function () {
    if (this.m_map[this.data.id]) {
      this.m_price = this.m_map[this.data.id].price;
      this.m_id = this.m_map[this.data.id].id;
    } else {
      this.random();
    }
    this.imgHead.url = "ui://House/头像" + this.m_id;
    this.labDesc.text = r_UtilsSystem.UtilsSystem.getShowCoin(this.m_price);
    this.labBubble.text = r_HouseCfg.HouseTenantCfg[this.m_id].desc;
  };
  _ctor.prototype.random = function () {
    var e = Object.values(r_PlayerData.PlayerData.data.houseData.lodgerMap);
    var t = this.m_arr1.filter(function (t) {
      return -1 == e.findIndex(function (e) {
        return t == e.lodgerId;
      });
    });
    this.m_id = r_UtilsSystem.UtilsSystem.randomArrayDiffItem(t, this.m_id || 0);
    this.m_coeff = r_UtilsSystem.UtilsSystem.randomArrayDiffItem(this.m_arr, this.m_coeff || 3);
    this.m_price = Math.ceil(this.data.price * (this.m_coeff / 100));
    this.m_map[this.data.id] = {};
    this.m_map[this.data.id].price = this.m_price;
    this.m_map[this.data.id].id = this.m_id;
  };
  _ctor.prototype.onClickChange = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("更换租客", function () {
      e.random();
      e.restart();
    });
  };
  _ctor.prototype.onClickOut = function () {
    r_HouseSystem.HouseSystem.addLodger(this.data.id, this.m_id, this.m_price);
    r_HouseMarketUI.default.Inst.restart();
    this.hide();
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.default = def_HouseLeaseUI;