var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FairyEventGiftUI = undefined;
var r_UIDef = require("UIDef");
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_FguiResSystem = require("FguiResSystem");
var r_ResSystem = require("ResSystem");
var r_WeaponSystem = require("WeaponSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_AFairyEvent = require("AFairyEvent");
var r_WpForgeResUI = require("WpForgeResUI");
var exp_FairyEventGiftUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.FairyEvent, r_UIDef.UIDef.Res.UI.FairyEventGiftUI) || this;
    t.spineName = "";
    t.spirteName = "";
    t.info = null;
    t.haveGain = false;
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
    cc.log("---gift!!");
    this.show(r_UIDef.UIDef.Urls.UI.FairyEventGiftUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.FairyEventGiftUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.btnBack.onClick(function () {
      return t.hide();
    });
    this.btnGet.onClick(function () {
      t.gainSupereapon();
    });
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.haveGain = false;
    if (this.data.info) {
      cc.log("info is " + JSON.stringify(this.data.info));
      this.info = this.data.info;
      this.loadSpine(this.info.actPath);
      this.loadSprite();
      this.typeDesc();
    } else {
      cc.log("there is no info!");
    }
  };
  _ctor.prototype.typeDesc = function () {
    this.txtName.text = this.info.name;
    this.txtDesc.text = this.info.desc;
  };
  _ctor.prototype.gainSupereapon = function () {
    if (!this.haveGain) {
      this.haveGain = true;
      var e = -1;
      for (var t = 0; t < this.info.FEInfo.length; t++) {
        this.info.FEInfo[t].wId && (e = this.info.FEInfo[t].wId);
      }
      if (e > 0) {
        this.hide();
        r_WeaponSystem.WeaponSystem.GainWeapon(e);
        r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(r_AFairyEvent.AFairyEvent.FreshStrongUI);
        cc.log("--show");
        setTimeout(function () {
          cc.log("hide!!");
          r_WpForgeResUI.WpForgeResUI.showUI({
            id: e
          });
        }, 100);
      }
    }
  };
  _ctor.prototype.loadSprite = function () {
    this.data.info.bgPath && (this.spirteName && this.spineName == this.data.info.bgPath || (this.spirteName = this.data.info.bgPath, cc.log("加载新图"), r_ResSystem.ResSystem.loadBundleFguiImg(this.iconBg, "bdWeaponForge", this.data.info.bgPath)));
  };
  _ctor.prototype.loadSpine = function (e) {
    var t = this;
    if (this.spineNode && this.spineName != e) {
      cc.log("回收spineNode");
      this.spineNode.removeFromParent(true);
    }
    this.spineName = e;
    if (r_WeaponSystem.WeaponSystem.nodeMap[this.spineName]) {
      cc.log("map存了node");
      this.spineNode = r_WeaponSystem.WeaponSystem.nodeMap[this.spineName];
      this.animSpine();
    } else {
      cc.log("map没有存node:" + e);
      r_ResSystem.ResSystem.loadBundleRes("bdWeaponForge", e, cc.Prefab, function (o, i) {
        r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, i);
        var n = cc.instantiate(i);
        t.spineNode = n;
        cc.log("实例化：" + t.spineName);
        r_WeaponSystem.WeaponSystem.nodeMap[e] = n;
        t.animSpine();
      });
    }
  };
  _ctor.prototype.animSpine = function () {
    if (this.spineNode) {
      cc.log("node s nmae:" + this.spineNode.name);
      this.spineNode.parent = this.hang.node;
      this.spineNode.x = 0;
      this.spineNode.y = 0;
      this.spineNode.getComponent(sp.Skeleton).setAnimation(0, "animation", true);
    } else {
      cc.log("没有spineNode");
    }
  };
  __decorate([r_DecorateFunction1.AutoFind("iconBg")], _ctor.prototype, "iconBg", undefined);
  __decorate([r_DecorateFunction1.AutoFind("hang")], _ctor.prototype, "hang", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txtName")], _ctor.prototype, "txtName", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txtDesc")], _ctor.prototype, "txtDesc", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnGet")], _ctor.prototype, "btnGet", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.FairyEventGiftUI = exp_FairyEventGiftUI;