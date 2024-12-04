var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StoneCutUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_PlatformSystem = require("PlatformSystem");
var r_StoneSystem = require("StoneSystem");
var r_ResSystem = require("ResSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_StoneResultUI = require("StoneResultUI");
var r_SoundMgr = require("SoundMgr");
var r_DebugSystem = require("DebugSystem");
var r_AlmanacResultUI = require("AlmanacResultUI");
var r_StoneCfg = require("StoneCfg");
var r_ReportSystem = require("ReportSystem");
var exp_StoneCutUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Stone, r_UIDef.UIDef.Res.UI.StoneCutUI) || this;
    t.uiType = "fullScreen";
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.StoneCutUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.StoneCutUI);
  };
  _ctor.prototype.onInit = function () {
    var o = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("block").on(cc.Node.EventType.TOUCH_START, function () {}, this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    this.btnAdd = this.contentPane.getChild("btnAdd").asButton;
    this.btnAdd.onClick(this.onClickAdd, this);
    this.btnOpen = this.contentPane.getChild("btnOpen").asButton;
    this.btnOpen.onClick(this.onClickOpen, this);
    this.btnAdd.visible = false;
    this.btnOpen.visible = false;
    r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/stone/stone", cc.Prefab, function (e, i) {
      o.prefab = cc.instantiate(i);
      o.prefab.active = true;
      o.contentPane.getChild("center").node.addChild(o.prefab);
      o.prefab.y = _ctor.offsetY;
      o.animRoot = o.prefab.getChildByName("dianju");
      o.animRootPos = o.animRoot.getPosition();
      o.animRoot.startY = o.animRoot.y;
      o.animEffect = r_UtilsSystem.UtilsSystem.getDeepChildByName(o.animRoot, "qiegeji");
      o.refreshAll();
    });
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.Inst = this;
    this.refreshAll();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.Inst = null;
  };
  _ctor.prototype.refreshAll = function () {
    this.refreshBtn();
    if (this.prefab) {
      this.animEffect.active = false;
      this.prefab.getChildByName("icon").active = true;
      r_ResSystem.ResSystem.loadUIImg(this.prefab.getChildByName("icon"), "ui/stone/st" + this.getIdStr());
      this.animRoot.setPosition(this.animRootPos);
    }
  };
  _ctor.prototype.getIdStr = function () {
    var e = this.data.stoneCfg.Id;
    var t = e;
    e < 10 && (t = "0" + t);
    return t;
  };
  _ctor.prototype.onClickAdd = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("补充切石次数", function () {
      r_StoneSystem.StoneSystem.refreshCutNum();
      e.refreshBtn();
    });
  };
  _ctor.prototype.onClickOpen = function () {
    var e = this;
    r_PlayerData.PlayerData.data.stoneMap[this.data.key] = null;
    r_PlayerData.PlayerData.data.cutStoneNum = r_PlayerData.PlayerData.data.cutStoneNum + 1;
    r_PlayerData.PlayerData.data.rockNum++;
    r_PlayerData.PlayerData.saveData();
    r_SoundMgr.SoundMgr.playSound("qiege");
    r_PlayerData.PlayerData.deleteCoin("切石头", this.data.stoneCfg.UseGold, r_ReportSystem.SystemKey.石头);
    r_UtilsSystem.UtilsSystem.showTip("消耗金币" + this.data.stoneCfg.UseGold);
    this.btnOpen.visible = false;
    var t = r_UtilsSystem.UtilsSystem.randomPercentFromArray(r_StoneCfg.StoneRareCfg[r_StoneCfg.StoneCfg[this.data.stoneCfg.Id - 1].randomId]).rare;
    if (r_PlayerData.PlayerData.data.almanacMap.rewardType == r_AlmanacResultUI.AlmanacRewardType.切石) {
      t = 4;
    } else if (r_DebugSystem.DebugSystem.stoneType == r_DebugSystem.DebugTypeStone.maxLose) {
      t = 1;
    } else if (r_DebugSystem.DebugSystem.stoneType == r_DebugSystem.DebugTypeStone.minLose) {
      t = 2;
    } else if (r_DebugSystem.DebugSystem.stoneType == r_DebugSystem.DebugTypeStone.minWin) {
      t = 3;
    } else {
      r_DebugSystem.DebugSystem.stoneType == r_DebugSystem.DebugTypeStone.maxWin && (t = 4);
    }
    this.animEffect.active = true;
    cc.tween(this.animRoot).to(2.5, {
      y: -50
    }).call(function () {
      r_ResSystem.ResSystem.loadUIImg(e.prefab.getChildByName("icon"), "ui/stone/st" + e.getIdStr() + "_" + t);
    }).to(.5, {
      y: this.animRootPos.y
    }).call(function () {
      e.animEffect.active = false;
      e.prefab.getChildByName("icon").active = false;
      r_StoneResultUI.StoneResultUI.showUI({
        key: e.data.key,
        stoneCfg: e.data.stoneCfg,
        num: t
      });
    }).start();
  };
  _ctor.prototype.refreshBtn = function () {
    if (!this.prefab) {
      this.btnAdd.visible = false;
      return void (this.btnOpen.visible = false);
    }
    if (r_PlayerData.PlayerData.data.cutStoneNum >= _ctor.cutMaxNum) {
      this.btnAdd.visible = true;
      this.btnOpen.visible = false;
    } else {
      this.btnAdd.visible = false;
      this.btnOpen.visible = true;
      this.btnOpen.getChild("num").text = 3 - r_PlayerData.PlayerData.data.cutStoneNum + "_3";
    }
  };
  _ctor.prototype.onClickHot = function () {
    this.hide();
  };
  _ctor.offsetY = -100;
  _ctor.Inst = null;
  _ctor.cutMaxNum = 3;
  return _ctor;
}(r_TYIndex.UIWind);
exports.StoneCutUI = exp_StoneCutUI;