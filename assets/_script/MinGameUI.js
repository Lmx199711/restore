var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MinGameUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_ResSystem = require("ResSystem");
var r_PlayerData = require("PlayerData");
var r_PlatformSystem = require("PlatformSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_Config = require("Config");
var r_VideoGameSystem = require("VideoGameSystem");
var exp_MinGameUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Lamp, r_UIDef.UIDef.Res.UI.MinGameUI) || this;
    t.VideoGameList = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.MinGameUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.MinGameUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnBack = this.contentPane.getChild("btnBack");
    this.btnBack.onClick(this.hide, this);
    this.list = this.contentPane.getChild("list").asList;
    this.list.setVirtual();
    this.list.itemRenderer = this.onListRenderer.bind(this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.VideoGameList = r_VideoGameSystem.VideoGameSystem.getVideoGameList();
    this.VideoGameList.sort(function (e, t) {
      return e.sortId - t.sortId;
    });
    this.list.numItems = this.VideoGameList.length;
    r_PlayerData.PlayerData.isGame = true;
  };
  _ctor.prototype.onHide = function () {
    e.prototype.hide.call(this);
    r_PlayerData.PlayerData.isGame = false;
  };
  _ctor.prototype.onListRenderer = function (e, t) {
    var o = this.VideoGameList[e];
    var i = o.name + "_video";
    var n = r_PlayerData.PlayerData.data.miniGame[i + "freeCount"] || 0;
    var a = t.getChild("startBtn");
    a.clearClick();
    a.onClick(function () {
      if (o.checkVideo && (r_PlayerData.PlayerData.data.miniGame[i] || n >= o.freeCount)) {
        r_PlatformSystem.PlatformSystem.showVideo(o.name, function () {
          r_Config.default.uiClassMap[o.ui].showUI(o.data);
        });
      } else {
        r_Config.default.uiClassMap[o.ui].showUI(o.data);
        if (o.checkVideo) {
          n++;
          r_PlayerData.PlayerData.data.miniGame[i + "freeCount"] = n;
          if (n >= o.freeCount) {
            r_PlayerData.PlayerData.data.miniGame[i] = true;
            a.asCom.getController("video").selectedIndex = 0;
          }
        }
      }
    }, this);
    t.getChild("labName").text = o.name;
    t.getChild("reward").text = r_UtilsSystem.UtilsSystem.getShowCoin(o.reward);
    r_ResSystem.ResSystem.loadBundleFguiImg(t.getChild("icon"), "game2", "gameIcon/" + o.icon);
    a.asCom.getController("video").selectedIndex = o.checkVideo && (r_PlayerData.PlayerData.data.miniGame[i] || n >= o.freeCount) ? 0 : 1;
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.MinGameUI = exp_MinGameUI;