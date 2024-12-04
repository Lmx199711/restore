var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlmanacUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_DrawLineCom = require("DrawLineCom");
var r_PlayerData = require("PlayerData");
var r_UtilsSystem = require("UtilsSystem");
var r_AlmanacResultUI = require("AlmanacResultUI");
var r_TimeSystem = require("TimeSystem");
var r_ResSystem = require("ResSystem");
var exp_AlmanacUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Almanac, r_UIDef.UIDef.Res.UI.AlmanacUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.AlmanacUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.AlmanacUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    this.contentPane.getChild("btnCoin").asButton.onClick(this.onClickCoin, this);
    this.contentPane.getChild("btnOk").asButton.onClick(this.onClickOk, this);
    r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/almanac/almanac", cc.Prefab, function (e, o) {
      t.prefab = cc.instantiate(o);
      t.prefab.active = true;
      t.contentPane.getChild("center").node.addChild(t.prefab);
      t.drawCom = t.prefab.getComponent(r_DrawLineCom.default);
      t.drawCom.drawEndCallBack = t.drawEnd.bind(t);
      t.contentPane.visible = true;
      t.restart();
    });
    this.startLine = this.contentPane.getChild("start");
    this.startLine.startY = this.startLine.node.y;
    this.startLine.visible = false;
    var o = this.contentPane.getChild("end");
    o.visible = false;
    this.startLine.endY = o.node.y;
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.startLine.visible = false;
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.restart = function () {
    if (this.drawCom) {
      this.contentPane.getController("mode").selectedIndex = 0;
      this.drawCom.start();
    }
  };
  _ctor.prototype.drawEnd = function () {
    if (!r_PlayerData.PlayerData.data.almanacMap.drawTime || r_TimeSystem.TimeSystem.isNextDay(r_PlayerData.PlayerData.data.almanacMap.drawTime)) {
      this.contentPane.getController("mode").selectedIndex = 1;
    } else {
      this.contentPane.getController("mode").selectedIndex = 2;
    }
  };
  _ctor.prototype.onClickCoin = function () {
    if (r_PlayerData.PlayerData.isCoinEnough(_ctor.coin)) {
      r_PlayerData.PlayerData.deleteCoin("今日走势", _ctor.coin);
      this.startAnim();
    } else {
      r_UtilsSystem.UtilsSystem.showTip("钱不够~");
    }
  };
  _ctor.prototype.onClickOk = function () {
    this.startAnim();
  };
  _ctor.prototype.startAnim = function () {
    var e = this;
    this.contentPane.getController("mode").selectedIndex = 0;
    this.startLine.visible = true;
    this.startLine.node.y = this.startLine.startY;
    cc.tween(this.startLine.node).to(1, {
      y: this.startLine.endY
    }).call(function () {
      e.hide();
      r_AlmanacResultUI.AlmanacResultUI.showUI({
        restart: true
      });
    }).start();
  };
  _ctor.coin = 1e5;
  return _ctor;
}(r_TYIndex.UIWind);
exports.AlmanacUI = exp_AlmanacUI;