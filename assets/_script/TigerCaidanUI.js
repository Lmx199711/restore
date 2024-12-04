var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_DebugSystem = require("DebugSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_TigerSystem = require("TigerSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_TigerCfg = require("TigerCfg");
var r_TYIndex = require("TYIndex");
var r_SoundMgr = require("SoundMgr");
var def_TigerCaidanUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Tiger, r_UIDef.UIDef.Res.UI.TigerCaidanUI) || this;
    t.showAnimFlag = true;
    t.tigerSystem = null;
    t.items = [];
    t.m_index = null;
    t.isTouch = true;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.TigerCaidanUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.TigerCaidanUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    for (var t = 0; t < r_TigerCfg.TigerCaidanCfg.length; t++) {
      var o = this.contentPane.getChild("item" + t).asCom;
      this.items.push(o);
      o.getChild("img").asLoader.url = "ui://Tiger/tigerIcon" + (5 + t);
      o.onClick(this.onClickItem.bind(this, t), this);
      o.getChild("labAward").asLabel.text = "奖金" + r_UtilsSystem.UtilsSystem.numFormats(r_TigerCfg.TigerCaidanCfg[t].award, 0);
    }
    this.tigerSystem = new r_TigerSystem.default(this.items, 20);
    this.tigerSystem.init();
    this.btnOk = this.contentPane.getChild("btnOk").asButton;
    this.btnOk.onClick(this.onClickOk, this);
    this.contentPane.getChild("btnBack").onClick(this.hide, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    this.m_tween && this.m_tween.stop();
    r_TimeSystem.TimeSystem.scheduleClear("TigerCaidan");
  };
  _ctor.prototype.restart = function () {
    this.m_index = null;
    this.isTouch = true;
    this.tigerSystem.init();
    this.btnOk.visible = false;
  };
  _ctor.prototype.onClickOk = function () {
    var e = this;
    if (null != this.m_index) {
      this.isTouch && r_PlatformSystem.PlatformSystem.showVideo("转转乐彩蛋", function () {
        e.isTouch = false;
        e.btnOk.visible = false;
        var t = r_DebugSystem.DebugSystem.getTigerCfg();
        var o = r_UtilsSystem.UtilsSystem.randomPercentFromArray(t).id + 40;
        0 == r_DebugSystem.DebugSystem.tigerType && r_PlayerData.PlayerData.data.isTigerCaiDan && (o = 40 + (0 == e.m_index ? 1 : 0));
        r_PlayerData.PlayerData.data.isTigerCaiDan = false;
        r_PlayerData.PlayerData.saveData();
        cc.log(e.tigerSystem.num);
        e.m_tween = cc.tween(e.tigerSystem).to(5, {
          num: o
        }, {
          easing: "sineOut"
        }).call(function () {
          var t = e.tigerSystem.getResult();
          if (e.m_index == t) {
            var o = r_TigerCfg.TigerCaidanCfg[t].award;
            r_PlayerData.PlayerData.addCoin("转转乐彩蛋", o, r_ReportSystem.SystemKey.None, false);
            r_UtilsSystem.UtilsSystem.showTip("恭喜你中了" + r_UtilsSystem.UtilsSystem.numFormats(o, 0));
            r_SoundMgr.SoundMgr.playSound("win");
          } else {
            r_UtilsSystem.UtilsSystem.showTip("真可惜就差一点点");
            r_SoundMgr.SoundMgr.playSound("tiger/dianwanshibai");
          }
          r_TimeSystem.TimeSystem.scheduleOnce("TigerCaidan", 2, e.restart.bind(e));
        }).start();
      });
    } else {
      r_UtilsSystem.UtilsSystem.showTip("请选择一个小动物");
    }
  };
  _ctor.prototype.onClickItem = function (e) {
    if (this.isTouch) {
      for (var t = 0; t < 2; t++) {
        this.items[t].getChild("select").alpha = 0;
      }
      this.items[e].getChild("select").alpha = 1;
      this.m_index = e;
      this.btnOk.visible = true;
    }
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.default = def_TigerCaidanUI;