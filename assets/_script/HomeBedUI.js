var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_HouseSystem = require("HouseSystem");
var r_HouseCfg = require("HouseCfg");
var r_UtilsSystem = require("UtilsSystem");
var r_SoundMgr = require("SoundMgr");
var r_PlayerData = require("PlayerData");
var r_HouseUI = require("HouseUI");
var r_PlatformSystem = require("PlatformSystem");
var r_ReportSystem = require("ReportSystem");
var def_HomeBedUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Home, r_UIDef.UIDef.Res.UI.HomeBedUI) || this;
    t.m_videoNum = {};
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.HomeBedUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.HomeBedUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    this.list = this.contentPane.getChild("list").asList;
    this.list.setVirtual();
    this.list.itemRenderer = this.onListRendererItem.bind(this);
    this.m_videoNum = {};
    Object.values(r_HouseCfg.HouseBedCfg).forEach(function (e) {
      e.isVideoBuy && (t.m_videoNum[e.id] = 0);
    });
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.instace = this;
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.instace = null;
  };
  _ctor.prototype.restart = function () {
    var e = Object.values(r_HouseCfg.HouseBedCfg);
    this.list.numItems = e.length;
  };
  _ctor.prototype.onListRendererItem = function (e, t) {
    var o = Object.values(r_HouseCfg.HouseBedCfg)[e];
    this.setItem(t, o);
  };
  _ctor.prototype.setItem = function (e, t) {
    e.getChild("img").asLoader.url = "ui://Home/bedIcon" + t.id;
    e.getChild("btnBuy").asButton.title = r_UtilsSystem.UtilsSystem.numFormats(t.price, 0);
    e.getChild("labName").asLabel.text = t.name;
    e.getChild("labEar").asLabel.text = r_UtilsSystem.UtilsSystem.numFormats(t.ear, 0);
    var o = r_HouseSystem.HouseSystem.getHouseData();
    var i = o.hasBeds.includes(t.id) ? o.bedId == t.id ? 2 : 1 : 0;
    e.getController("c1").setSelectedIndex(i);
    e.getChild("btnBuy").visible = !t.isVideoBuy;
    e.getChild("btnFree").visible = t.isVideoBuy;
    if (t.videoNum > 1) {
      e.getChild("btnFree").asButton.getController("c1").selectedIndex = 1;
      e.getChild("btnFree").asButton.title = "(" + this.m_videoNum[t.id] + "/" + t.videoNum + ")";
    } else {
      e.getChild("btnFree").asButton.getController("c1").selectedIndex = 0;
    }
    e.getChild("btnBuy").clearClick();
    e.getChild("btnBuy").onClick(this.itemBuyClickEvent.bind(this, t), this);
    e.getChild("btnFree").clearClick();
    e.getChild("btnFree").onClick(this.itemVideoClickEvent.bind(this, t), this);
    e.getChild("btnSelect").clearClick();
    e.getChild("btnSelect").onClick(this.itemSelectClickEvent.bind(this, t), this);
  };
  _ctor.prototype.itemBuyClickEvent = function (e) {
    if (r_PlayerData.PlayerData.isCoinEnough(e.price)) {
      r_PlayerData.PlayerData.deleteCoin("买床费用", e.price, r_ReportSystem.SystemKey.床);
      this.buyLogic(e);
    } else {
      r_UtilsSystem.UtilsSystem.showTip("钱不够~");
    }
  };
  _ctor.prototype.itemVideoClickEvent = function (e) {
    var t = this;
    r_SoundMgr.SoundMgr.playSound("click");
    r_PlatformSystem.PlatformSystem.showVideo("购买床", function () {
      t.m_videoNum[e.id]++;
      if (t.m_videoNum[e.id] < e.videoNum) {
        t.restart();
      } else {
        t.buyLogic(e);
      }
    });
  };
  _ctor.prototype.buyLogic = function (e) {
    r_PlayerData.PlayerData.data.houseData.bedId = e.id;
    !r_PlayerData.PlayerData.data.houseData.hasBeds.includes(e.id) && r_PlayerData.PlayerData.data.houseData.hasBeds.push(e.id);
    r_PlayerData.PlayerData.saveData();
    this.restart();
    r_HouseUI.default.instace && r_HouseUI.default.instace.restart();
  };
  _ctor.prototype.itemSelectClickEvent = function (e) {
    r_SoundMgr.SoundMgr.playSound("click");
    r_PlayerData.PlayerData.data.houseData.bedId = e.id;
    r_PlayerData.PlayerData.saveData();
    this.restart();
    r_HouseUI.default.instace && r_HouseUI.default.instace.restart();
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.default = def_HomeBedUI;