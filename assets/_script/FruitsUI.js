var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FruitsUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_FruitsCfg = require("FruitsCfg");
var r_FruitsGameUI = require("FruitsGameUI");
var r_ResSystem = require("ResSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_PlayerData = require("PlayerData");
var r_SoundMgr = require("SoundMgr");
var r_ReportSystem = require("ReportSystem");
var r_FruitsSystem = require("FruitsSystem");
var r_FguiResSystem = require("FguiResSystem");
var exp_FruitsUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Fruits, r_UIDef.UIDef.Res.UI.FruitsUI) || this;
    t.uiType = "fullScreen";
    t.items = [];
    t.m_isTouch = true;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.FruitsUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.FruitsUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.items = [];
    for (var o = 0; o < 6; o++) {
      var i = this.contentPane.getChild("item" + o).asCom;
      this.items.push(i);
      i.getChild("img").asLoader.url = "ui://Fruits/fruits" + o;
      i.onClick(this.onClickItem.bind(this, o), this);
      i.getChild("lab") && (i.getChild("lab").text = r_UtilsSystem.UtilsSystem.getShowCoin(r_FruitsCfg.FruitsItemCfg[o].price));
    }
    this.imgShow = this.contentPane.getChild("imgShow").asLoader;
    r_ResSystem.ResSystem.loadBundleRes("game1", "fruits/fruitsRole", cc.Prefab, function (e, o) {
      if (e) {
        console.error("加载失败: ", e);
      } else {
        r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
        var i = cc.instantiate(o);
        t.contentPane.getChild("center").node.addChild(i);
        i.active = true;
        t.role = i.getComponent(sp.Skeleton);
      }
    });
    this.contentPane.getChild("btnFree").asButton.onClick(this.onClickItem.bind(this, 5), this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    this.btnVideo = this.contentPane.getChild("btnVideo").asButton;
    this.btnVideo.onClick(this.onClickVideo, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.instace = this;
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.instace = null;
    this.m_tween && this.m_tween.stop();
  };
  _ctor.prototype.restart = function () {
    var e = r_PlayerData.PlayerData.data.fruitsList;
    this.items.forEach(function (t) {
      t.visible = e.includes(parseInt(t.name.replace(/[^0-9]/gi, "")));
    });
    this.imgShow.visible = false;
    this.imgShow.scaleX = 1;
    this.imgShow.scaleY = 1;
    this.m_isTouch = true;
  };
  _ctor.prototype.onClickItem = function (e) {
    var t = this;
    if (this.m_isTouch) {
      r_SoundMgr.SoundMgr.playSound("click");
      var o = function () {
        t.imgShow.visible = true;
        t.m_isTouch = false;
        t.imgShow.x = t.items[e].x;
        t.imgShow.y = t.items[e].y;
        t.imgShow.url = "ui://Fruits/fruits" + e;
        t.items[e].visible = false;
        var o = t.contentPane.width / 2;
        var i = t.contentPane.height / 2 - 100;
        t.m_tween = cc.tween(t.imgShow).to(.5, {
          scaleX: 1.2,
          scaleY: 1.2,
          x: o,
          y: i
        }).delay(.5).call(function () {
          var t = JSON.parse(JSON.stringify(r_FruitsCfg.FruitsItemCfg[e]));
          r_FruitsGameUI.FruitsGameUI.showUI(t);
        }).start();
      };
      var i = r_PlayerData.PlayerData.data.fruitsList.findIndex(function (t) {
        return e == t;
      });
      if (5 != e) {
        if (-1 != i) {
          if (!r_PlayerData.PlayerData.isCoinEnough(r_FruitsCfg.FruitsItemCfg[e].price)) {
            return void r_UtilsSystem.UtilsSystem.showTip("钱不够~");
          }
          r_PlayerData.PlayerData.data.fruitsNum++;
          r_PlayerData.PlayerData.deleteCoin("挑榴莲", r_FruitsCfg.FruitsItemCfg[e].price, r_ReportSystem.SystemKey.榴莲);
          r_PlayerData.PlayerData.data.fruitsList.splice(i, 1);
          r_PlayerData.PlayerData.saveData();
          this.restart();
          o();
        }
      } else {
        r_PlatformSystem.PlatformSystem.showVideo("选择彩色榴莲", function () {
          r_PlayerData.PlayerData.data.fruitsList.splice(i, 1);
          r_PlayerData.PlayerData.saveData();
          t.restart();
          o();
        });
      }
    }
  };
  _ctor.prototype.onClickVideo = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("榴莲进货", function () {
      r_FruitsSystem.FruitsSystem.stock();
      e.restart();
    });
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.FruitsUI = exp_FruitsUI;