var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_FguiResSystem = require("FguiResSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var r_StoneNewSystem = require("StoneNewSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_StoneNewDogzUI = require("StoneNewDogzUI");
var r_StoneNewTipUI = require("StoneNewTipUI");
var def_StoneNewUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.StoneNew, r_UIDef.UIDef.Res.UI.StoneNewUI) || this;
    t.uiType = "fullScreen";
    t.items = [];
    t.typeToScale = {
      1: .36,
      2: .48,
      3: .57
    };
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.StoneNewUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.StoneNewUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btnBuy, this.btnDogz);
    r_StoneNewSystem.StoneNewSystem.init();
    for (var t = 1; t <= r_StoneNewSystem.StoneNewSystem.posList.length; t++) {
      var o = this.contentPane.getChild("item" + t);
      this.items.push(o);
    }
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.instance = this;
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.instance = null;
  };
  _ctor.prototype.restart = function () {
    r_StoneNewSystem.StoneNewSystem.checkRefresh();
    this.showItems();
    this.refreshDogz();
  };
  _ctor.prototype.refreshDogz = function () {
    var e = r_PlayerData.PlayerData.data.stoneNewCaidan;
    for (var t in e) this["dogz" + t].visible = e[t] > 0;
  };
  _ctor.prototype.showItems = function () {
    var e = this;
    r_StoneNewSystem.StoneNewSystem.itemsList.forEach(function (t, o) {
      var i = e.items[o];
      if (null != t) {
        var n = e.typeToScale[r_StoneNewSystem.StoneNewSystem.posList[o].type];
        i.visible = true;
        i.getChild("icon").scaleX = i.getChild("icon").scaleY = e.typeToScale[r_StoneNewSystem.StoneNewSystem.posList[o].type];
        i.getChild("icon").y = n / .57 * -102;
        i.getChild("labPrice").text = r_UtilsSystem.UtilsSystem.numFormats(t.price);
        r_ResSystem.ResSystem.loadBundleRes("game3", "stoneNew/icon" + t.stoneId, cc.Prefab, function (o, n) {
          if (o) {
            console.error("加载失败: ", o);
          } else {
            r_FguiResSystem.FguiResSystem.addAutoReleaseRes(e, n);
            i.getChild("icon").node.destroyAllChildren();
            var a = cc.instantiate(n);
            i.getChild("icon").node.addChild(a);
            a.active = true;
            var s = function () {
              if (r_PlayerData.PlayerData.isCoinEnough(t.price)) {
                r_StoneNewTipUI.StoneNewTipUI.showUI({
                  stoneData: t
                });
              } else {
                r_UtilsSystem.UtilsSystem.showTip("钱不够~");
              }
            };
            i.offClick(s, e);
            i.onClick(s, e);
          }
        });
      } else {
        i.visible = false;
      }
    });
  };
  _ctor.prototype.onClickbtnBuy = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("新切石进货", function () {
      r_StoneNewSystem.StoneNewSystem.refreshItemsList();
      e.showItems();
    });
  };
  _ctor.prototype.onClickbtnDogz = function () {
    r_StoneNewDogzUI.default.showUI();
  };
  __decorate([r_DecorateFunction1.AutoFind("btnBuy")], _ctor.prototype, "btnBuy", undefined);
  __decorate([r_DecorateFunction1.AutoFind("dogz22")], _ctor.prototype, "dogz22", undefined);
  __decorate([r_DecorateFunction1.AutoFind("dogz23")], _ctor.prototype, "dogz23", undefined);
  __decorate([r_DecorateFunction1.AutoFind("dogz24")], _ctor.prototype, "dogz24", undefined);
  __decorate([r_DecorateFunction1.AutoFind("dogz25")], _ctor.prototype, "dogz25", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnDogz")], _ctor.prototype, "btnDogz", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_StoneNewUI;