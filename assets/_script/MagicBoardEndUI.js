var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MagicBoardEndUI = undefined;
var r_Index = require("Index");
var r_UIDef = require("UIDef");
var r_UtilsSystem = require("UtilsSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_MagicBoardUI = require("MagicBoardUI");
var r_MagicBoard = require("MagicBoard");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_MagicBoardSystem = require("MagicBoardSystem");
var exp_MagicBoardEndUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Market, r_UIDef.UIDef.Res.UI.MagicBoardEndUI) || this;
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
    this.show(r_UIDef.UIDef.Urls.UI.MagicBoardEndUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.MagicBoardEndUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.controller = this.contentPane.getController("c1");
    this.btnClose.onClick(this.onClickClose, this);
    this.btnClose2.onClick(this.onClickGet, this);
    this.btnDouble.onClick(this.onClickDouble, this);
    this.btnAgain.onClick(this.onClickAgain, this);
    this.btnAgain2.onClick(this.onClickAgain2, this);
    this.superBox = this.contentPane.getChild("superBox").asTextField;
    this.magicBox = this.contentPane.getChild("magicBox").asTextField;
    this.money = this.contentPane.getChild("money").asTextField;
    this.gold = this.contentPane.getChild("gold").asTextField;
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.controller.selectedIndex = this.data.type;
    if (this.data.reward) {
      this.superBox.text = "超级礼盒x" + this.data.reward.superGiftBox;
      this.magicBox.text = "神秘礼盒x" + this.data.reward.giftBox;
      this.money.text = "x" + this.data.reward.money;
      this.gold.text = "价值：" + r_UtilsSystem.UtilsSystem.getShowCoin(this.data.reward.gold);
    }
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_MagicBoardUI.MagicBoardUI.instance.InitGame();
    r_MagicBoard.default.pause = false;
  };
  _ctor.prototype.onClickClose = function () {
    this.hide();
  };
  _ctor.prototype.onClickGet = function () {
    this.hide();
    r_MagicBoardSystem.MagicBoardSystem.getReward(this.data);
  };
  _ctor.prototype.onClickDouble = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("神奇的菜板双倍领取", function () {
      r_MagicBoardSystem.MagicBoardSystem.getReward(e.data, true);
      e.hide();
    });
  };
  _ctor.prototype.onClickAgain = function () {
    this.hide();
    r_MagicBoardUI.MagicBoardUI.instance.onClickPlay();
  };
  _ctor.prototype.onClickAgain2 = function () {
    r_MagicBoardSystem.MagicBoardSystem.getReward(this.data);
    this.hide();
    r_MagicBoardUI.MagicBoardUI.instance.onClickPlay();
  };
  __decorate([r_DecorateFunction1.AutoFind("btnClose")], _ctor.prototype, "btnClose", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnClose2")], _ctor.prototype, "btnClose2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnDouble")], _ctor.prototype, "btnDouble", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnAgain")], _ctor.prototype, "btnAgain", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnAgain2")], _ctor.prototype, "btnAgain2", undefined);
  return _ctor;
}(r_Index.UIWind);
exports.MagicBoardEndUI = exp_MagicBoardEndUI;