var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SnackPlacementUI = undefined;
var r_SnackPlacementLogic = require("SnackPlacementLogic");
var r_UIDef = require("UIDef");
var r_FguiResSystem = require("FguiResSystem");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_SnackPlacementGuide = require("SnackPlacementGuide");
var exp_SnackPlacementUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.SnackRoomFull, r_UIDef.UIDef.Res.UI.SnackPlacementUI) || this;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.SnackPlacementUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.SnackPlacementUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnBack.onClick(this.onClose, this);
  };
  _ctor.prototype.onShown = function () {
    var t = this;
    e.prototype.onShown.call(this);
    _ref__ctor.Inst = this;
    r_ResSystem.ResSystem.loadBundleRes("game1", "snackRoomFull/gamePrefab", cc.Prefab, function (e, o) {
      if (o) {
        r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
        t.prefab && t.prefab.destroy();
        t.prefab = cc.instantiate(o);
        t.contentPane.getChild("center").node.addChild(t.prefab);
        t.gameLogic = t.prefab.getComponent(r_SnackPlacementLogic.default);
        t.gameLogic.startGame(t.data);
        !r_PlayerData.PlayerData.data.snackRoomFull.isGameGuide && t.data.snackType.length <= 0 && r_SnackPlacementGuide.SnackPlacementGuide.showUI(1);
      }
    });
    if (1 == this.data.index) {
      this.title.asLoader.url = "ui://SnackRoomFull/gift1";
      this.grade.url = "ui://SnackRoomFull/grade" + r_PlayerData.PlayerData.data.snackRoomFull.giftGrade;
    } else {
      this.title.asLoader.url = "ui://SnackRoomFull/gift1";
      this.grade.url = "ui://SnackRoomFull/grade" + (r_PlayerData.PlayerData.data.snackRoomFull.highGiftGrade + 3);
    }
  };
  _ctor.prototype.reStartGame = function () {
    this.gameLogic && this.gameLogic.startGame(this.data.index);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ref__ctor.Inst = null;
    if (this.prefab) {
      this.prefab.destroy();
      this.prefab = null;
      this.gameLogic = null;
    }
  };
  _ctor.prototype.onClose = function () {
    r_UtilsSystem.UtilsSystem.showAlert("游戏尚未结束", 0, function () {
      _ref__ctor.hide();
    }, this, "提示", "确定", "取消");
  };
  _ctor.Inst = null;
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("grade")], _ctor.prototype, "grade", undefined);
  __decorate([r_DecorateFunction1.AutoFind("title")], _ctor.prototype, "title", undefined);
  return _ref__ctor = __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.SnackPlacementUI = exp_SnackPlacementUI;