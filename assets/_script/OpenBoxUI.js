var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenBoxUI = undefined;
var r_Index = require("Index");
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_MagicBoard = require("MagicBoard");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_MagicBoardSystem = require("MagicBoardSystem");
var r_ReportSystem = require("ReportSystem");
var exp_OpenBoxUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Market, r_UIDef.UIDef.Res.UI.OpenBoxUI) || this;
    t.gift = null;
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
    this.show(r_UIDef.UIDef.Urls.UI.OpenBoxUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.OpenBoxUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnBack.onClick(this.onClickBack, this);
    this.controller = this.contentPane.getController("c1");
    this.controller2 = this.contentPane.getController("c2");
    this.superBox = this.contentPane.getChild("superBox").asTextField;
    this.magicBox = this.contentPane.getChild("magicBox").asTextField;
    this.btnOpen = this.contentPane.getChild("btnOpen").asButton;
    this.btnOpen.onClick(this.onClickOpen, this);
    this.btnGet = this.contentPane.getChild("btnGet").asButton;
    this.btnGet.onClick(this.onClickGet, this);
  };
  _ctor.prototype.onShown = function () {
    var t;
    var o;
    var i;
    var n;
    e.prototype.onShown.call(this);
    this.controller.selectedIndex = 0;
    this.superBox.text = "超级礼盒x" + (null === (t = r_PlayerData.PlayerData.data.magicBoard) || undefined === t ? undefined : t.superGiftBox);
    this.magicBox.text = "神秘礼盒x" + (null === (o = r_PlayerData.PlayerData.data.magicBoard) || undefined === o ? undefined : o.giftBox);
    if (0 == (null === (i = r_PlayerData.PlayerData.data.magicBoard) || undefined === i ? undefined : i.superGiftBox) && 0 == (null === (n = r_PlayerData.PlayerData.data.magicBoard) || undefined === n ? undefined : n.giftBox)) {
      r_UtilsSystem.UtilsSystem.showTip("没有礼盒了");
      this.btnOpen.visible = false;
    } else {
      this.btnOpen.visible = true;
    }
    this.data && this.onClickOpen(this.data);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.isShow = false;
    r_MagicBoard.default.pause = false;
    this.btnBack.visible = true;
  };
  _ctor.prototype.onClickBack = function () {
    this.hide();
  };
  _ctor.prototype.onClickOpen = function (e) {
    this.controller.selectedIndex = 1;
    this.btnBack.visible = false;
    this.gift = r_MagicBoardSystem.MagicBoardSystem.openBox(e);
    this.controller2.selectedIndex = this.gift.length - 1;
    for (var t = 1; t <= this.gift.length; t++) {
      var o = this.contentPane.getChild("item" + t).asCom;
      o.getChild("name").asTextField.text = this.gift[t - 1].name + "*" + this.gift[t - 1].count;
      if (1 != this.gift[t - 1].num) {
        o.getController("c1").selectedIndex = 1;
        o.getChild("num").asTextField.text = r_UtilsSystem.UtilsSystem.getShowCoin(this.gift[t - 1].num);
      }
      o.getChild("center").asLoader.url = "ui://Market/" + this.gift[t - 1].name;
    }
  };
  _ctor.prototype.onClickGet = function () {
    var e = function (e) {
      var o = t.gift[e];
      setTimeout(function () {
        if ("金砖" == o.name) {
          r_PlayerData.PlayerData.addCoin("开箱", o.num * o.count, r_ReportSystem.SystemKey.集市, true);
        } else if ("招募卡" == o.name) {
          r_PlayerData.PlayerData.data.magicBoard.recruitCard += o.count;
        } else if ("金币" == o.name) {
          r_PlayerData.PlayerData.addCoin("开箱", o.num * o.count, r_ReportSystem.SystemKey.集市, true);
        } else {
          "琥珀石" == o.name && r_PlayerData.PlayerData.addCoin("开箱", o.num * o.count, r_ReportSystem.SystemKey.集市, true);
        }
      }, 200 * e);
    };
    var t = this;
    for (var o = 0; o < this.gift.length; o++) {
      e(o);
    }
    this.hide();
    this.gift = null;
  };
  _ctor.isShow = false;
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  return _ctor;
}(r_Index.UIWind);
exports.OpenBoxUI = exp_OpenBoxUI;