var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FairyShopPetBkUI = undefined;
var r_UIDef = require("UIDef");
var r_BaseLayer = require("BaseLayer");
var r_ResSystem = require("ResSystem");
var r_WeaponSystem = require("WeaponSystem");
var r_PlayerData = require("PlayerData");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_FguiResSystem = require("FguiResSystem");
var exp_FairyShopPetBkUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.FairyLandShop, r_UIDef.UIDef.Res.UI.WpPetBook) || this;
    t.showAnimFlag = true;
    t.nodes = [];
    t._count = 0;
    t.curIndex = 0;
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
    this.show(r_UIDef.UIDef.Urls.UI.FairyShopPetBkUI, e, t);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.curIndex = 0;
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.FairyShopPetBkUI);
  };
  _ctor.prototype.onHide = function () {
    this.curIndex = 0;
    this.updatePageText();
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.btnClose.onClick(this.hide, this);
    var o = r_WeaponSystem.WeaponSystem.GetWpPetInfo(1);
    this.levelList = o.range;
    this.nameList = o.stageName.split("|");
    this.leftArrow = this.bottomCom.getChild("left");
    this.leftArrow.onClick(function () {
      t.trunPage("left");
    });
    this.rightArrow = this.bottomCom.getChild("right");
    this.rightArrow.onClick(function () {
      t.trunPage("right");
    });
    var i = function (e) {
      r_ResSystem.ResSystem.loadBundleRes("bdWeaponForge", "pet/long_" + e, cc.Prefab, function (o, i) {
        if (!o) {
          r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, i);
          t._count++;
          var n = cc.instantiate(i);
          n.children[0].color = cc.Color.BLACK;
          t.nodes[e - 1] = n;
          n.parent = t["hang" + e].node;
          n.x = 0;
          n.y = 0;
          n.children[0].getComponent(sp.Skeleton).setAnimation(0, "daiji", true);
          5 == t._count && t.updatePageText();
        }
      });
    };
    for (var n = 1; n <= 5; n++) {
      i(n);
    }
  };
  _ctor.prototype.trunPage = function (e) {
    if ("left" == e) {
      if (this.curIndex > 0) {
        this.curIndex--;
        this.updatePageText();
      }
    } else {
      cc.log("向右翻页");
      if (this.curIndex < 4) {
        this.curIndex++;
        this.updatePageText();
      }
    }
  };
  _ctor.prototype.updatePageText = function () {
    this.txtDesc.text = "阶段" + (this.curIndex + 1) + ": " + this.nameList[this.curIndex];
    this.contentPane.getController("state").selectedIndex = this.curIndex;
    this.bottomCom.getChild("txtPage").text = this.curIndex + 1 + "/5";
    if (r_PlayerData.PlayerData.data.weapon.pet[0].lv < this.levelList[this.curIndex]) {
      this.txtTip.text = "[color=#C5484A]" + this.levelList[this.curIndex] + "级[/color]时解锁新形态";
      this.nodes[this.curIndex].children[0].color = cc.Color.BLACK;
      this.txtTip.visible = true;
    } else {
      this.nodes[this.curIndex].children[0].color = cc.Color.WHITE;
      this.txtTip.visible = false;
    }
  };
  _ctor.data = null;
  __decorate([r_DecorateFunction1.AutoFind("bottomCom")], _ctor.prototype, "bottomCom", undefined);
  __decorate([r_DecorateFunction1.AutoFind("hang1")], _ctor.prototype, "hang1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("hang2")], _ctor.prototype, "hang2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("hang3")], _ctor.prototype, "hang3", undefined);
  __decorate([r_DecorateFunction1.AutoFind("hang4")], _ctor.prototype, "hang4", undefined);
  __decorate([r_DecorateFunction1.AutoFind("hang5")], _ctor.prototype, "hang5", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txtDesc")], _ctor.prototype, "txtDesc", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txtTip")], _ctor.prototype, "txtTip", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnClose")], _ctor.prototype, "btnClose", undefined);
  return _ctor;
}(r_BaseLayer.BaseLayer);
exports.FairyShopPetBkUI = exp_FairyShopPetBkUI;