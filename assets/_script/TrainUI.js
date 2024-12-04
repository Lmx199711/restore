var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_BlockSystem = require("BlockSystem");
var r_ChangeSystem = require("ChangeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_TrainCfg = require("TrainCfg");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var def_TrainUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Train, r_UIDef.UIDef.Res.UI.TrainUI) || this;
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
    this.show(r_UIDef.UIDef.Urls.UI.TrainUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.TrainUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.list.itemRenderer = this.onItemRenderer.bind(this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.restart = function () {
    this.list.numItems = this.getListData().length;
  };
  _ctor.prototype.getListData = function () {
    return r_TrainCfg.TrainCfg.filter(function (e) {
      return !r_BlockSystem.BlockSystem.isBlock(e.id);
    });
  };
  _ctor.prototype.onItemRenderer = function (e, t) {
    var o = this;
    var i = this.getListData()[e];
    if ("刮刮乐" == i.name && r_BlockSystem.BlockSystem.isBlock(r_BlockSystem.BlockTrickType.彩票)) {
      t.visible = false;
    } else {
      t.getChild("icon").asLoader.url = "ui://Train/icon" + i.id;
      t.getChild("labNum").text = r_UtilsSystem.UtilsSystem.getRandomNum(i.num[0], i.num[1]);
      t.getChild("animHot").visible = i.isHot;
      var n = t.getChild("btnStart").asButton;
      n.clearClick();
      n.onClick(function () {
        o.hide();
        r_ChangeSystem.ChangeSystem.setChangeWin(i.changeUI);
      }, this);
    }
  };
  __decorate([r_DecorateFunction1.AutoFind("list")], _ctor.prototype, "list", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_TrainUI;