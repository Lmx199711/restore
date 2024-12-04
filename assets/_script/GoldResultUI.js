var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GoldResultUI = undefined;
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var r_RoleSystem = require("RoleSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var exp_GoldResultUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Farm, r_UIDef.UIDef.Res.UI.GoldResultUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.GoldResultUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.GoldResultUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.list.setVirtual();
    this.list.itemRenderer = this.onListRenderer.bind(this);
    this.btnSale.onClick(this.onClickSale, this);
    this.btnSaleAD.onClick(this.onClickSaleAD, this);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.list.numItems = this.data.itemList.length;
  };
  _ctor.prototype.onListRenderer = function (e, t) {
    var o = this.data.itemList[e];
    if ("qian" != o.id && "zhuans" != o.id) {
      r_ResSystem.ResSystem.loadBundleFguiImg(t.getChild("icon"), "game2", "farm/item/item" + o.id);
    } else {
      r_ResSystem.ResSystem.loadBundleFguiImg(t.getChild("icon"), "game2", "farm/item/" + o.id);
    }
    t.getChild("name").text = o.name;
    t.getChild("num").text = o.num + "次";
    t.getChild("value").text = r_UtilsSystem.UtilsSystem.numFormats(o.value);
  };
  _ctor.prototype.onClickSale = function () {
    this.settlement();
  };
  _ctor.prototype.onClickSaleAD = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("农场宝库双倍领取", function () {
      e.settlement(2);
    });
  };
  _ctor.prototype.settlement = function (e) {
    undefined === e && (e = 1);
    var t = false;
    var o = function (o) {
      var n = i.data.itemList[o];
      if ("qian" == n.id) {
        r_PlayerData.PlayerData.addCoin("农场宝库获得", n.value * e);
      } else if ("zhuans" == n.id) {
        r_PlayerData.PlayerData.addCoin(r_RoleSystem.ExpType.其它, n.value * e);
        setTimeout(function () {
          r_UtilsSystem.UtilsSystem.showTip("获得" + r_UtilsSystem.UtilsSystem.numFormats(n.value * e) + "钻石");
        }, 400);
      } else {
        r_PlayerData.PlayerData.setFarmSeed(n.id, n.value * e);
        t = true;
      }
    };
    var i = this;
    for (var n = 0; n < this.data.itemList.length; n++) {
      o(n);
    }
    t && setTimeout(function () {
      r_UtilsSystem.UtilsSystem.showTip("种子已存入农场，待种植");
    }, 800);
    this.hide();
  };
  __decorate([r_DecorateFunction1.AutoFind("btnSale")], _ctor.prototype, "btnSale", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnSaleAD")], _ctor.prototype, "btnSaleAD", undefined);
  __decorate([r_DecorateFunction1.AutoFind("list")], _ctor.prototype, "list", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.GoldResultUI = exp_GoldResultUI;