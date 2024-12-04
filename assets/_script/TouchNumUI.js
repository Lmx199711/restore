var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_jsbi = require("jsbi");
var r_SDKMgr1 = require("SDKMgr1");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_RoleSystem = require("RoleSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var def_TouchNumUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Earn, r_UIDef.UIDef.Res.UI.TouchNumUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.TouchNumUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.TouchNumUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btnUp, this.btnVideo);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.btnVideo.getChild("mask").visible = false;
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.restart = function () {
    var e = this;
    this.labLevel.text = "点击能力等级：Lv." + r_PlayerData.PlayerData.data.mainHome.touchLevel;
    var t = r_RoleSystem.RoleSystem.getCurTouchInfo();
    var o = this.contentPane.getController("c1").selectedIndex;
    this.contentPane.getController("c1").selectedIndex = r_jsbi.default.LT(r_PlayerData.PlayerData.bigCoin, t.coin) ? 1 : 0;
    if (0 == o && 1 == this.contentPane.getController("c1").selectedIndex && 1 == r_SDKMgr1.SDKMgr1.dianji) {
      this.btnVideo.getChild("mask").visible = true;
      cc.Tween.stopAllByTarget(this.btnVideo.getChild("mask").node);
      this.btnVideo.getChild("mask").node.opacity = 255;
      cc.tween(this.btnVideo.getChild("mask").node).to(4, {
        opacity: 0
      }).call(function () {
        e.btnVideo.getChild("mask").visible = false;
      }).start();
    }
    this.groupLab.visible = !t.isMax;
    this.labDesc.text = t.num;
    this.btnUp.title = t.text;
    this.btnUp.visible = !t.isMax;
    this.btnVideo.visible = !t.isMax;
    this.labCoin.text = t.isMax ? "" : "观看视频升级,可节省" + t.text;
    this.imgCoin.visible = !t.isMax;
  };
  _ctor.prototype.onClickbtnUp = function () {
    var e = r_RoleSystem.RoleSystem.getCurTouchInfo().coin;
    if (r_PlayerData.PlayerData.isCoinEnough(e)) {
      r_PlayerData.PlayerData.deleteCoin("升级点击次数", e, r_ReportSystem.SystemKey.能力升级);
      r_RoleSystem.RoleSystem.upTouchLevel();
      this.restart();
    } else {
      r_UtilsSystem.UtilsSystem.showTip("钱不够~");
    }
  };
  _ctor.prototype.onClickbtnVideo = function () {
    var e = this;
    if (this.btnVideo.getChild("mask").visible) {
      r_UtilsSystem.UtilsSystem.showTip("稍等一下再点击");
    } else {
      r_PlatformSystem.PlatformSystem.showVideo("升级点击次数", function () {
        r_RoleSystem.RoleSystem.upTouchLevel();
        e.restart();
      });
    }
  };
  __decorate([r_DecorateFunction1.AutoFind("labLevel")], _ctor.prototype, "labLevel", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labDesc")], _ctor.prototype, "labDesc", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnUp")], _ctor.prototype, "btnUp", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labNext")], _ctor.prototype, "labNext", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labCoin")], _ctor.prototype, "labCoin", undefined);
  __decorate([r_DecorateFunction1.AutoFind("imgCoin")], _ctor.prototype, "imgCoin", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnVideo")], _ctor.prototype, "btnVideo", undefined);
  __decorate([r_DecorateFunction1.AutoFind("groupLab")], _ctor.prototype, "groupLab", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_TouchNumUI;