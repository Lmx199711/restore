var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StoneResultUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_StoneCutUI = require("StoneCutUI");
var r_StoneUI = require("StoneUI");
var r_ResSystem = require("ResSystem");
var r_SoundMgr = require("SoundMgr");
var r_UtilsSystem = require("UtilsSystem");
var r_ReportSystem = require("ReportSystem");
var exp_StoneResultUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Stone, r_UIDef.UIDef.Res.UI.StoneResultUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.StoneResultUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.StoneResultUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("block").on(cc.Node.EventType.TOUCH_START, function () {}, this);
    this.btnSell = this.contentPane.getChild("btnSell").asButton;
    this.btnSell.onClick(this.onClickSell, this);
    this.iconUI = this.contentPane.getChild("icon");
    this.iconUI.node.y = this.iconUI.node.y + r_StoneCutUI.StoneCutUI.offsetY;
    this.iconUI.node.startY = this.iconUI.node.y;
  };
  _ctor.prototype.onShown = function () {
    var t = this;
    e.prototype.onShown.call(this);
    var o = this.data.stoneCfg.Cost.split(",");
    this.sellNum = parseInt(o[this.data.num - 1]);
    this.contentPane.getController("mode").selectedIndex = 0;
    this.contentPane.getChild("win").visible = false;
    this.contentPane.getChild("lose").visible = false;
    this.contentPane.getChild("name").text = this.data.stoneCfg["tip" + this.data.num];
    this.contentPane.getChild("content").text = this.data.stoneCfg["Text" + this.data.num];
    this.btnSell.getChild("num").text = r_UtilsSystem.UtilsSystem.getShowCoin(this.sellNum) + "";
    this.iconUI.node.y = this.iconUI.node.startY;
    r_ResSystem.ResSystem.loadFguiImg(this.iconUI, "ui/stone/st" + this.getIdStr() + "_" + this.data.num);
    cc.tween(this.iconUI.node).by(1, {
      y: 300 - r_StoneCutUI.StoneCutUI.offsetY
    }).call(function () {
      t.contentPane.getController("mode").selectedIndex = 1;
      if (t.data.stoneCfg.UseGold < t.sellNum) {
        r_SoundMgr.SoundMgr.playSound("win");
        t.contentPane.getChild("win").visible = true;
        t.contentPane.getChild("win").node.scale = 1;
        cc.tween(t.contentPane.getChild("win").node).to(1, {
          scale: .5
        }).start();
      } else {
        r_SoundMgr.SoundMgr.playSound("fail");
        t.contentPane.getChild("lose").visible = true;
        t.contentPane.getChild("lose").node.scale = 1;
        cc.tween(t.contentPane.getChild("lose").node).to(1, {
          scale: .5
        }).start();
      }
    }).start();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.getIdStr = function () {
    var e = this.data.stoneCfg.Id;
    var t = e;
    e < 10 && (t = "0" + t);
    return t;
  };
  _ctor.prototype.onClickSell = function () {
    r_PlayerData.PlayerData.addCoin("卖出石头", this.sellNum, r_ReportSystem.SystemKey.石头);
    r_StoneUI.StoneUI.Inst && r_StoneUI.StoneUI.Inst.refreshStone();
    this.hide();
    r_StoneCutUI.StoneCutUI.Inst && r_StoneCutUI.StoneCutUI.Inst.hide();
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.StoneResultUI = exp_StoneResultUI;