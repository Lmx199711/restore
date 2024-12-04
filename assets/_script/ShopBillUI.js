var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_UtilsSystem = require("UtilsSystem");
var r_ShopCfg = require("ShopCfg");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var def_ShopBillUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Shop, r_UIDef.UIDef.Res.UI.ShopBillUI) || this;
    t.showAnimFlag = true;
    return t;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return true;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.ShopBillUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.ShopBillUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.list.itemRenderer = this.onListRendererItem.bind(this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.restart = function () {
    this.arrData = this.getArr();
    this.list.numItems = this.arrData.length;
    var e = this.data.propList;
    var t = 0;
    for (var o = 0; o < e.length; o++) {
      var i = e[o];
      t += r_ShopCfg.ShopPropCfg[i].price;
    }
    this.m_price = t * this.data.earn;
    this.labAll.text = r_UtilsSystem.UtilsSystem.numFormats(t);
    this.labPrice2.text = r_UtilsSystem.UtilsSystem.numFormats(this.m_price);
    this.labText2.visible = this.data.earn < 1;
    this.labPrice2.visible = this.data.earn < 1;
    this.imgHuaLuo.visible = this.data.earn < 1;
  };
  _ctor.prototype.getArr = function () {
    var e = this.data.propList;
    var t = [];
    e.forEach(function (e) {
      var o = t.findIndex(function (t) {
        return t.id == e;
      });
      if (o > -1) {
        t[o].num++;
      } else {
        t.push({
          id: e,
          num: 1
        });
      }
    });
    return t;
  };
  _ctor.prototype.onListRendererItem = function (e, t) {
    var o = this.arrData;
    var i = r_ShopCfg.ShopPropCfg[o[e].id];
    t.getChild("name").text = i.name;
    t.getChild("num").text = o[e].num + "";
    t.getChild("price").text = r_UtilsSystem.UtilsSystem.numFormats(i.price * o[e].num);
  };
  __decorate([r_DecorateFunction1.AutoFind("list")], _ctor.prototype, "list", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labTxt")], _ctor.prototype, "labTxt", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labAll")], _ctor.prototype, "labAll", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labText2")], _ctor.prototype, "labText2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("imgHuaLuo")], _ctor.prototype, "imgHuaLuo", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labPrice2")], _ctor.prototype, "labPrice2", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_ShopBillUI;