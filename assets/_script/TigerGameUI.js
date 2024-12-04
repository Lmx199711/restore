var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_ResSystem = require("ResSystem");
var r_TigerSystem = require("TigerSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_TigerCfg = require("TigerCfg");
var r_TYIndex = require("TYIndex");
var r_SoundMgr = require("SoundMgr");
var r_EffectsCom = require("EffectsCom");
var r_TigerCaidanUI = require("TigerCaidanUI");
var r_TigerRuleUI = require("TigerRuleUI");
var def_TigerGameUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Tiger, r_UIDef.UIDef.Res.UI.TigerGameUI) || this;
    t.uiType = "fullScreen";
    t.items = [];
    t.labScores = [];
    t.scores = [];
    t.tempScores = [];
    t.props = [];
    t.m_isRun = false;
    t.m_danwei = 1e4;
    t.webItems = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.TigerGameUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.TigerGameUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.items = [];
    var o = r_TigerCfg.TigerRandomCfg;
    for (var i = 0; i < 20; i++) {
      var n = this.contentPane.getChild("i" + i).asCom;
      this.setItem(n, o[i]);
      this.items.push(n);
      n.onClick(this.onClickWebItem.bind(this, i), this);
    }
    var a = r_TigerCfg.TigerItemCfg;
    for (var i in a) {
      n = a[i];
      var s = this.contentPane.getChild("prop" + i).asButton;
      this.props.push(s);
      s.onClick(this.onClickProp.bind(this, i, false), this);
      s.on(fgui.Event.TOUCH_BEGIN, this.propTouchBegin.bind(this, i), this);
      s.on(fgui.Event.TOUCH_END, this.propTouchEnd.bind(this, i), this);
      this.labScores.push(this.contentPane.getChild("labScore" + i).asTextField);
      this.scores.push(0);
    }
    r_ResSystem.ResSystem.loadBundleRes("game1", "tiger/tigerEffect", cc.Prefab, function (e, o) {
      if (e) {
        console.error("加载失败: ", e);
      } else {
        t.prefab = cc.instantiate(o);
        t.contentPane.getChild("center").node.addChild(t.prefab);
        t.prefab.active = true;
      }
    });
    this.contentPane.getChild("center").visible = false;
    this.imgResult = this.contentPane.getChild("imgResult").asLoader;
    this.labReward = this.contentPane.getChild("labReward").asTextField;
    this.imgSelect = this.contentPane.getChild("imgSelect").asImage;
    this.tigerSystem = new r_TigerSystem.default(this.items);
    this.tigerSystem.init();
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    this.contentPane.getChild("btnStart").asButton.onClick(this.onGameStat, this);
    this.contentPane.getChild("btnRule").asButton.onClick(function () {
      r_TigerRuleUI.default.showUI();
    }, this);
    this.btnDouble = this.contentPane.getChild("btnDouble").asButton;
    this.btnDouble.onClick(this.onClickDouble, this);
    this.groupWeb = this.contentPane.getChild("groupWeb").asGroup;
    this.contentPane.getChild("btnGM").asButton.onClick(this.onClickShowList, this);
    this.webList = this.contentPane.getChild("webList").asList;
    this.webList.setVirtual();
    this.webList.itemRenderer = this.onListRendererItem.bind(this);
    this.contentPane.getChild("btnCloseWeb").asButton.onClick(function () {
      t.groupWeb.visible = false;
    }, this);
    this.contentPane.getChild("btnCaidan").asButton.onClick(function () {
      r_TigerCaidanUI.default.showUI();
    }, this);
  };
  _ctor.prototype.setItem = function (e, t) {
    e.getChild("img").asLoader.url = "ui://Tiger/" + t.img;
    e.getChild("num").asTextField.text = 1 == t.coeff ? "" : "x" + t.coeff;
    e.getChild("select").asImage.alpha = 0;
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    r_SoundMgr.SoundMgr.playMusic("tiger/dianwanbgm");
    r_TimeSystem.TimeSystem.scheduleOnce("TigerRuleUI", .1, function () {
      r_TigerRuleUI.default.showUI();
    });
    this.webItems = [];
    this.webList.numItems = this.webItems.length;
    this.groupWeb.visible = false;
    this.restart();
  };
  _ctor.prototype.restart = function () {
    this.contentPane.getChild("center").visible = false;
    this.contentPane.getController("c1").setSelectedIndex(0);
    this.showDouble();
    this.tigerSystem.init();
    this.m_isRun = false;
    this.tempScores = this.scores.concat();
    for (var e = 0; e < this.scores.length; e++) {
      this.scores[e] = 0;
    }
    this.props.forEach(function (e) {
      e.selected = false;
    });
    this.showScores();
  };
  _ctor.prototype.showDouble = function () {
    this.btnDouble.enabled = r_PlayerData.PlayerData.data.tigerCoeff < 2;
    this.btnDouble.grayed = false;
    this.btnDouble.getController("c1").setSelectedIndex(r_PlayerData.PlayerData.data.tigerCoeff);
  };
  _ctor.prototype.showScores = function () {
    for (var e = 0; e < this.scores.length; e++) {
      this.labScores[e].text = this.scores[e] < 10 ? "0" + this.scores[e] : this.scores[e] + "";
      this.props[e].selected = this.scores[e] > 0;
    }
  };
  _ctor.prototype.onGameStat = function () {
    var e = this;
    if (!this.m_isRun) {
      if (0 != this.scores.filter(function (e) {
        return e > 0;
      }).length) {
        this.tigerSystem.init();
        this.m_isRun = true;
        var t = this.tigerSystem.randomPercentFromArray(r_TigerCfg.TigerRandomCfg);
        if (this.webItems.length > 0) {
          t = r_TigerCfg.TigerRandomCfg.indexOf(this.webItems.shift()) + 80;
          this.webList.numItems = this.webItems.length;
        }
        this.m_tween = cc.tween(this.tigerSystem).to(10, {
          num: t
        }, {
          easing: "quintOut"
        }).start();
        r_TimeSystem.TimeSystem.registSecondUpdate("tigerUpdate", function () {
          if (e.tigerSystem.num >= t) {
            r_TimeSystem.TimeSystem.unregistSecondUpdate("tigerUpdate");
            e.complate();
          }
        }.bind(this));
        r_SoundMgr.SoundMgr.playSound("tiger/choujiang1");
        r_TimeSystem.TimeSystem.scheduleOnce("playSound", 3, function () {
          e.tigerSystem.isplaySound = true;
        });
      } else {
        this.xiazhu();
      }
    }
  };
  _ctor.prototype.xiazhu = function () {
    if (0 != this.tempScores.filter(function (e) {
      return e > 0;
    }).length) {
      var e = 0;
      for (var t = 0; t < this.tempScores.length; t++) {
        e += this.tempScores[t];
      }
      if (r_PlayerData.PlayerData.isCoinEnough(1e4 * e)) {
        this.scores = this.tempScores.concat();
        r_PlayerData.PlayerData.deleteCoin("转转乐下注", 1e4 * e, r_ReportSystem.SystemKey.None);
        this.showScores();
      }
    }
  };
  _ctor.prototype.complate = function () {
    var e;
    var t = this;
    var o = this.tigerSystem.getResult();
    var i = r_TigerCfg.TigerRandomCfg[o];
    var n = 0;
    var a = r_TigerCfg.TigerCoeffCfg[r_PlayerData.PlayerData.data.tigerCoeff];
    this.scores[i.id] > 0 && (n = this.scores[i.id] * r_TigerCfg.TigerItemCfg[i.id].coeff * i.coeff * this.m_danwei * a);
    e = cc.tween(this.items[o].getChild("select")).repeatForever(cc.tween().to(.2, {
      alpha: 0
    }).to(.2, {
      alpha: 1
    })).start();
    this.imgResult.url = "ui://Tiger/" + i.img;
    this.labReward.text = r_UtilsSystem.UtilsSystem.getShowCoin(n);
    this.contentPane.getTransition("t0").play();
    r_TimeSystem.TimeSystem.scheduleOnce("tigerResult", .5, function () {
      t.contentPane.getController("c1").setSelectedIndex(t.scores[i.id] > 0 ? 1 : 2);
      if (t.scores[i.id] > 0) {
        t.contentPane.getChild("center").visible = true;
        r_PlayerData.PlayerData.addCoin("转转乐获奖", n, r_ReportSystem.SystemKey.None);
        r_EffectsCom.default.instace.play(r_EffectsCom.default.PLAY_ADD_COIN);
        r_SoundMgr.SoundMgr.playSound("tiger/laohujijinbi");
      } else {
        t.items[o].getChild("select").alpha = 0;
        r_SoundMgr.SoundMgr.playSound("tiger/dianwanshibai");
      }
      t.props[i.id].selected = false;
    });
    r_TimeSystem.TimeSystem.scheduleOnce("tigerAgin", 4, function () {
      e && e.stop();
      t.restart();
    });
  };
  _ctor.prototype.propTouchBegin = function (e) {
    var t = this;
    r_TimeSystem.TimeSystem.scheduleOnce("tigerUpdate", .8, function () {
      r_TimeSystem.TimeSystem.timeMapUpdate("LongClick", 999, function () {
        if (t.scores[e] > 99) {
          r_TimeSystem.TimeSystem.clearTimeMapUpdate("LongClick");
          return void r_UtilsSystem.UtilsSystem.showTip("已达上限~");
        } else if (r_PlayerData.PlayerData.isCoinEnough(t.m_danwei)) {
          return void t.onClickProp(e, true);
        } else {
          r_UtilsSystem.UtilsSystem.showTip("钱不够~");
          return void r_TimeSystem.TimeSystem.clearTimeMapUpdate("LongClick");
        }
      });
    });
  };
  _ctor.prototype.propTouchEnd = function () {
    r_TimeSystem.TimeSystem.scheduleClear("tigerUpdate");
    r_TimeSystem.TimeSystem.clearTimeMapUpdate("LongClick");
  };
  _ctor.prototype.onClickProp = function (e, t) {
    if (this.m_isRun) {
      this.showScores();
    } else if (this.scores[e] > 99) {
      r_UtilsSystem.UtilsSystem.showTip("已达上限~");
    } else {
      if (r_PlayerData.PlayerData.isCoinEnough(this.m_danwei)) {
        r_PlayerData.PlayerData.deleteCoin("转转乐投币", this.m_danwei, r_ReportSystem.SystemKey.None, t);
        this.scores[e]++;
      } else {
        r_UtilsSystem.UtilsSystem.showTip("钱不够~");
      }
      this.showScores();
    }
  };
  _ctor.prototype.onClickDouble = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("转转乐收益翻倍", function () {
      r_PlayerData.PlayerData.data.tigerCoeff++;
      e.showDouble();
    });
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_SoundMgr.SoundMgr.playMusic("bgm");
    this.m_tween && this.m_tween.stop();
    this.m_tween = null;
    r_TimeSystem.TimeSystem.unregistSecondUpdate("tigerResult");
    r_TimeSystem.TimeSystem.unregistSecondUpdate("tigerAgin");
    r_TimeSystem.TimeSystem.unregistSecondUpdate("playSound");
    r_TimeSystem.TimeSystem.unregistSecondUpdate("tigerUpdate");
    r_TimeSystem.TimeSystem.scheduleClear("tigerUpdate");
    r_TimeSystem.TimeSystem.clearTimeMapUpdate("LongClick");
  };
  _ctor.prototype.test = function () {
    this.contentPane.getChild("center").visible = false;
    this.contentPane.getController("c1").setSelectedIndex(0);
    this.showDouble();
    this.tigerSystem.init();
    this.m_isRun = false;
    var e = 0;
    for (var t = 0; t < this.scores.length; t++) {
      e += this.scores[t];
    }
    r_PlayerData.PlayerData.deleteCoin("", 1e4 * e, r_ReportSystem.SystemKey.None);
    this.showScores();
    this.onGameStat();
  };
  _ctor.prototype.isClickWebGroup = function () {
    return !(cc.sys.platform != cc.sys.DESKTOP_BROWSER && cc.sys.platform != cc.sys.MOBILE_BROWSER || this.m_isRun);
  };
  _ctor.prototype.isSelectItem = function () {
    if (cc.sys.platform == cc.sys.DESKTOP_BROWSER || cc.sys.platform == cc.sys.MOBILE_BROWSER) {
      return !(this.m_isRun || !this.groupWeb.visible);
    }
  };
  _ctor.prototype.onClickWebItem = function (e) {
    if (this.isSelectItem()) {
      this.webItems.push(r_TigerCfg.TigerRandomCfg[e]);
      this.webList.numItems = this.webItems.length;
    }
  };
  _ctor.prototype.onClickShowList = function () {
    this.isClickWebGroup() && (this.groupWeb.visible = true);
  };
  _ctor.prototype.onListRendererItem = function (e, t) {
    var o = this.webItems[e];
    this.setItem(t, o);
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.default = def_TigerGameUI;