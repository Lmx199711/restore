var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubwayGameUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_ResSystem = require("ResSystem");
var r_SubwayCom = require("SubwayCom");
var r_UtilsSystem = require("UtilsSystem");
var r_SubwayCfg = require("SubwayCfg");
var r_PlatformSystem = require("PlatformSystem");
var r_SubwayUI = require("SubwayUI");
var r_PlayerData = require("PlayerData");
var r_DaySystem = require("DaySystem");
var r_SoundMgr = require("SoundMgr");
var r_FguiResSystem = require("FguiResSystem");
var exp_SubwayGameUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Subway, r_UIDef.UIDef.Res.UI.SubwayGameUI) || this;
    t.uiType = "fullScreen";
    t.m_index = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.SubwayGameUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.SubwayGameUI);
  };
  _ctor.prototype.onInit = function () {
    var o = this;
    e.prototype.onInit.call(this);
    _ctor.instace = this;
    this.contentPane.visible = false;
    this.contentPane.getChild("btnBack").onClick(this.hide, this);
    this.btnSelect = this.contentPane.getChild("btnSelect").asButton;
    this.btnSelect.onClick(this.onClickSelect, this);
    this.btnVideo = this.contentPane.getChild("btnVideo").asButton;
    this.btnVideo.onClick(this.onClickVideo, this);
    this.btnChange = this.contentPane.getChild("btnChange");
    this.btnChange.onClick(this.onClcikChange, this);
    r_UtilsSystem.UtilsSystem.showLoading(true);
    r_ResSystem.ResSystem.loadBundleRes("game1", "subway/subwayCom", cc.Prefab, function (e, t) {
      if (e) {
        console.error("加载失败: ", e);
      } else {
        r_FguiResSystem.FguiResSystem.addAutoReleaseRes(o, t);
        r_UtilsSystem.UtilsSystem.showLoading(false);
        var i = cc.instantiate(t);
        o.contentPane.getChild("center").node.addChild(i);
        i.active = true;
        o.subwayCom = i.getComponent(r_SubwayCom.SubwayCom);
        o.restart();
      }
    });
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    r_SoundMgr.SoundMgr.playMusic("subway/地铁待机");
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_SoundMgr.SoundMgr.playMusic("bgm");
    r_SubwayUI.SubwayUI.instace.restart();
  };
  _ctor.prototype.restart = function () {
    if (this.subwayCom) {
      this.contentPane.getChild("imgArea").asLoader.url = "ui://Subway/area" + this.data;
      this.contentPane.visible = true;
      if (null != r_PlayerData.PlayerData.data.dayObject.obj) {
        this.selectObj(false);
        this.subwayCom.sk.timeScale = 500;
        this.contentPane.getController("c1").setSelectedIndex(1);
      } else {
        this.subwayCom.restart();
        this.subwayCom.sk.timeScale = 1;
        this.contentPane.getController("c1").setSelectedIndex(0);
      }
      this.btnSelect.visible = true;
      this.btnVideo.visible = this.btnChange.visible = true;
    }
  };
  _ctor.prototype.randomLoad = function () {
    var e = r_UtilsSystem.UtilsSystem.randomPercentFromArray(Object.values(r_SubwayCfg.SubwayCfg));
    this.m_index = parseInt(e.id);
    r_PlayerData.PlayerData.data.dayObject.day = r_DaySystem.DaySystem.getShowDay();
    r_PlayerData.PlayerData.data.dayObject.obj = this.m_index;
    r_PlayerData.PlayerData.data.dayObject.area = this.data;
  };
  _ctor.prototype.onClickSelect = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("地铁相亲新加", function () {
      e.randomLoad();
      e.selectObj();
    });
  };
  _ctor.prototype.onClickVideo = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("地铁相亲", function () {
      e.randomLoad();
      e.selectObj();
    });
  };
  _ctor.prototype.selectObj = function (e) {
    undefined === e && (e = true);
    this.subwayCom.sk.timeScale = 1;
    this.subwayCom.selectObject(r_PlayerData.PlayerData.data.dayObject.obj);
    e && r_SoundMgr.SoundMgr.playSound("subway/area" + this.data);
    this.btnSelect.visible = false;
    this.btnVideo.visible = this.btnChange.visible = false;
  };
  _ctor.prototype.animComplate = function () {
    this.contentPane.getController("c1").setSelectedIndex(1);
    this.btnSelect.visible = true;
    this.btnVideo.visible = this.btnChange.visible = true;
  };
  _ctor.prototype.onClcikChange = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("地铁相亲切换城市", function () {
      r_PlayerData.PlayerData.data.dayObject = {};
      r_PlayerData.PlayerData.saveData();
      e.hide();
    });
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.SubwayGameUI = exp_SubwayGameUI;