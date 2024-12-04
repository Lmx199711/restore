var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponRankUI = undefined;
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_WeaponRankSystem = require("WeaponRankSystem");
var r_WeaponSystem = require("WeaponSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseLayer = require("BaseLayer");
var exp_WeaponRankUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.WeaponRank, r_UIDef.UIDef.Res.UI.WeaponRankUI) || this;
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
    this.show(r_UIDef.UIDef.Urls.UI.WeaponRankUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.WeaponRankUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    r_PlatformSystem.PlatformSystem.checkGetUserId();
    this.btnClose.onClick(this.hide, this);
    this.list.setVirtual();
    this.list.itemRenderer = this.onListRenderer.bind(this);
  };
  _ctor.prototype.onShown = function () {
    var t = this;
    e.prototype.onShown.call(this);
    r_WeaponRankSystem.WeaponRankSystem.GetWPPList(function () {
      t.list.numItems = r_WeaponRankSystem.WeaponRankSystem.wpRankList.length;
      if (r_WeaponRankSystem.WeaponRankSystem.getMyRank()) {
        t.txtMyRank.text = r_WeaponRankSystem.WeaponRankSystem.getMyRank() + "";
      } else {
        t.txtMyRank.text = "未进榜";
      }
    });
    var o = r_WeaponSystem.WeaponSystem.MyHighestWeapon();
    var i = o.id;
    var n = o.point;
    if (null != i) {
      this.txtMyWp.text = r_WeaponSystem.WeaponSystem.GetWeaponInfo(i).name;
      this.txtMyPoint.text = n + "";
    } else {
      console.log("我没有武器");
      this.txtMyWp.text = "";
      this.txtMyPoint.text = "";
    }
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.onListRenderer = function (e, t) {
    var o = r_WeaponRankSystem.WeaponRankSystem.wpRankList[e];
    if (e <= 2) {
      t.getController("level").selectedIndex = e;
    } else {
      t.getController("level").selectedIndex = 3;
      t.getChild("txtRank").text = e + 1;
    }
    t.getChild("txtName").text = o.nname || "无名";
    t.getChild("icon").url = "ui://Rank/tuceng9";
    if (o.aUrl && "" != o.aUrl) {
      try {
        t.getChild("icon").url = o.aUrl + "?aaa=aa.jpg";
      } catch (r) {
        console.log("--头像异常");
        t.getChild("icon").url = "ui://Rank/tuceng9";
      }
    }
    var i = o.score.toString() + "";
    var n = i.length;
    var a = "0";
    var s = -1;
    try {
      a = i.substring(0, n - 4);
      s = Number(i.substring(n - 4)) || 1;
    } catch (r) {}
    cc.log("string:weaponId:" + s);
    t.getChild("txtWeapon").text = s < 0 ? "?" : r_WeaponSystem.WeaponSystem.GetWeaponInfo(s).name + "";
    t.getChild("txtPoint").text = (Number(a) || 0) + "";
  };
  __decorate([r_DecorateFunction1.AutoFind("btnClose")], _ctor.prototype, "btnClose", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txtMyRank")], _ctor.prototype, "txtMyRank", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txtMyWp")], _ctor.prototype, "txtMyWp", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txtMyPoint")], _ctor.prototype, "txtMyPoint", undefined);
  __decorate([r_DecorateFunction1.AutoFind("list")], _ctor.prototype, "list", undefined);
  return _ctor;
}(r_BaseLayer.BaseLayer);
exports.WeaponRankUI = exp_WeaponRankUI;