var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StoneNewCutUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_PlatformSystem = require("PlatformSystem");
var r_ResSystem = require("ResSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_SoundMgr = require("SoundMgr");
var r_ReportSystem = require("ReportSystem");
var r_StoneNewSystem = require("StoneNewSystem");
var r_StoneNewResultUI = require("StoneNewResultUI");
var r_TaskCfg = require("TaskCfg");
var r_TaskSystem = require("TaskSystem");
var exp_StoneNewCutUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.StoneNew, r_UIDef.UIDef.Res.UI.StoneNewCutUI) || this;
    t.uiType = "fullScreen";
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.StoneNewCutUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.StoneNewCutUI);
  };
  _ctor.prototype.onInit = function () {
    var o = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    this.btnAdd = this.contentPane.getChild("btnAdd").asButton;
    this.btnAdd.onClick(this.onClickAdd, this);
    this.btnOpen = this.contentPane.getChild("btnOpen").asButton;
    this.btnOpen.onClick(this.onClickOpen, this);
    this.btnAdd.visible = false;
    this.btnOpen.visible = false;
    r_ResSystem.ResSystem.loadBundleRes("game3", "stoneNew/stoneNew", cc.Prefab, function (e, i) {
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
    var e = this;
    this.refreshBtn();
    if (this.prefab) {
      this.animEffect.active = false;
      this.prefab.getChildByName("icon").active = true;
      r_ResSystem.ResSystem.loadBundleRes("game3", "stoneNew/icon" + this.data.stoneData.stoneId, cc.Prefab, function (t, o) {
        if (t) {
          console.error("加载失败: ", t);
        } else {
          var i = e.prefab.getChildByName("icon");
          i.destroyAllChildren();
          var n = cc.instantiate(o);
          i.addChild(n);
          n.y = n.height / 2;
          n.active = true;
        }
      });
      this.animRoot.setPosition(this.animRootPos);
      this.prefab.getChildByName("icon").active = true;
      this.prefab.getChildByName("icon_left").active = false;
      this.prefab.getChildByName("icon_right").active = false;
      this.prefab.getChildByName("award").active = false;
    }
  };
  _ctor.prototype.getIdStr = function () {
    return this.data.stoneData.stoneId;
  };
  _ctor.prototype.onClickAdd = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("补充切石次数", function () {
      r_StoneNewSystem.StoneNewSystem.refreshCutNum();
      e.refreshBtn();
    });
  };
  _ctor.prototype.onClickOpen = function () {
    var e = this;
    r_PlayerData.PlayerData.data.rockNum++;
    r_TaskSystem.TaskSystem.addDayTaskValue(r_TaskCfg.TaskDayType.切石头);
    r_StoneNewSystem.StoneNewSystem.buyStoneById(this.data.stoneData.id);
    r_SoundMgr.SoundMgr.playSound("qiege");
    if (r_PlayerData.PlayerData.isCoinEnough(this.data.stoneData.price)) {
      r_PlayerData.PlayerData.deleteCoin("切石头", this.data.stoneData.price, r_ReportSystem.SystemKey.石头);
    } else {
      r_PlayerData.PlayerData.deleteCoin("切石头", r_PlayerData.PlayerData.bigCoin, r_ReportSystem.SystemKey.石头);
    }
    this.btnOpen.visible = false;
    this.animEffect.active = true;
    var t = r_StoneNewSystem.StoneNewSystem.getAwardById(this.data.stoneData.id);
    this.data.stoneData.coin = t.coin;
    this.data.stoneData.awardId = t.awardId;
    cc.tween(this.animRoot).to(2.5, {
      y: -50
    }).call(function () {
      e.prefab.getChildByName("icon").active = false;
      e.prefab.getChildByName("icon_left").getComponent(cc.Sprite).spriteFrame = null;
      r_ResSystem.ResSystem.loadUIImg(e.prefab.getChildByName("icon_left"), "ui/stoneNew/icon" + e.getIdStr() + "_0");
      e.prefab.getChildByName("icon_left").active = true;
      e.prefab.getChildByName("icon_right").getComponent(cc.Sprite).spriteFrame = null;
      r_ResSystem.ResSystem.loadUIImg(e.prefab.getChildByName("icon_right"), "ui/stoneNew/icon" + e.getIdStr() + "_1");
      e.prefab.getChildByName("icon_right").active = true;
    }).to(.5, {
      y: this.animRootPos.y
    }).call(function () {
      e.animEffect.active = false;
      e.prefab.getChildByName("icon").active = false;
      r_StoneNewResultUI.default.showUI(e.data);
    }).start();
  };
  _ctor.prototype.refreshBtn = function () {
    if (!this.prefab) {
      this.btnAdd.visible = false;
      return void (this.btnOpen.visible = false);
    }
    if (r_PlayerData.PlayerData.data.cutStoneNewNum >= _ctor.cutMaxNum) {
      this.btnAdd.visible = true;
      this.btnOpen.visible = false;
    } else {
      this.btnAdd.visible = false;
      this.btnOpen.visible = true;
      this.btnOpen.getChild("num").text = 3 - r_PlayerData.PlayerData.data.cutStoneNewNum + "/3";
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
exports.StoneNewCutUI = exp_StoneNewCutUI;