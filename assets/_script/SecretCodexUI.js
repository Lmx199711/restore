var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_ResSystem = require("ResSystem");
var r_SecretUpSystem = require("SecretUpSystem");
var r_RoleCfg = require("RoleCfg");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_SecretUpGetUI = require("SecretUpGetUI");
var def_SecretCodexUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.SecretUp, r_UIDef.UIDef.Res.UI.SecretCodexUI) || this;
    t.showAnimFlag = true;
    t.expTouch = [10, 20, 50, 200];
    t.secretLenth = 21;
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
    this.show(r_UIDef.UIDef.Urls.UI.SecretCodexUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.SecretCodexUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.listData = Object.values(r_RoleCfg.SecretQualityCfg);
    this.bindBtnCallback(this.btnCall);
    this.list.itemRenderer = this.onItemRenderer.bind(this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
    _ctor.instance = this;
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.instance = null;
  };
  _ctor.prototype.restart = function () {
    this.refreshList();
  };
  _ctor.prototype.onClickbtnCall = function () {
    if (r_SecretUpSystem.SecretUpSystem.checkHasSpSecret()) {
      r_PlatformSystem.PlatformSystem.showVideo("重新招呼特殊秘书", function () {
        r_SecretUpGetUI.default.showUI();
      });
    } else {
      r_SecretUpGetUI.default.showUI();
    }
  };
  _ctor.prototype.refreshList = function () {
    this.listData.sort(function (e, t) {
      return r_SecretUpSystem.SecretUpSystem.getSecretCfgById(e.id).quality - r_SecretUpSystem.SecretUpSystem.getSecretCfgById(t.id).quality;
    });
    this.listData.sort(function (e) {
      if (-1 != r_SecretUpSystem.SecretUpSystem.getSecretList().findIndex(function (t) {
        return t.id == e.id;
      })) {
        return -1;
      } else {
        return 1;
      }
    });
    this.list.numItems = this.listData.length;
    this.labNum.text = r_SecretUpSystem.SecretUpSystem.getSecretList().length + "/" + this.secretLenth;
  };
  _ctor.prototype.onItemRenderer = function (e, t) {
    var o = this.listData[e];
    if (r_SecretUpSystem.SecretUpSystem.hasSecret(o.id)) {
      var i = o.quality || 5;
      r_ResSystem.ResSystem.loadBundleFguiImg(t.getChild("icon"), "game3", "secretUp/codex/codex" + o.id);
      t.getController("c1").selectedIndex = i;
      t.getChild("labName").text = o.name;
      t.getChild("labNum").text = "每秒加成  [color=#33ff00]" + r_RoleCfg.QualityLevel[o.quality][0].autoTouch + "[/color]";
    } else {
      r_ResSystem.ResSystem.loadBundleFguiImg(t.getChild("icon"), "game3", "secretUp/codex/codexBg" + o.id);
      t.getController("c1").selectedIndex = 0;
      t.getChild("labName").text = "???";
      t.getChild("labNum").text = "暂未获取";
    }
  };
  __decorate([r_DecorateFunction1.AutoFind("list")], _ctor.prototype, "list", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labNum")], _ctor.prototype, "labNum", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnCall")], _ctor.prototype, "btnCall", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_SecretCodexUI;