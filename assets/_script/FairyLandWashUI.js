var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FairyLandWashUI = undefined;
var r_UIDef = require("UIDef");
var r_jsbi = require("jsbi");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var r_TimeSystem = require("TimeSystem");
var r_WeaponSystem = require("WeaponSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseLayer = require("BaseLayer");
var r_StoneVideoUI = require("StoneVideoUI");
var r_UtilsSystem = require("UtilsSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_SoundMgr = require("SoundMgr");
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_WeaponWashSystem = require("WeaponWashSystem");
var r_TYEvent = require("TYEvent");
var r_FguiResSystem = require("FguiResSystem");
var r_CommonFunc = require("CommonFunc");
var r_ReportSystem = require("ReportSystem");
var r_CommonEnterUI = require("CommonEnterUI");
var exp_FairyLandWashUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.FairyLandShop, r_UIDef.UIDef.Res.UI.PanelWash) || this;
    t.bars = [];
    t.spineNode = null;
    t.weaponList = [];
    t.lastSelectIndex = -1;
    t.selectWeaponLv = 0;
    t.lastWeaponValue = [];
    t.canBegin = true;
    t.canBack = true;
    t.selectWpId = -1;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.FairyLandWashUI, e, t);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    r_TYEventDispatcher.TYEventDispatcher.on(r_TYEvent.EventDef.stoneChange, this.washBtnCanShowRedTip, this);
    r_PlayerData.PlayerData.addSystemUIShowCount(r_ReportSystem.SystemKey.武器数值洗炼);
    this.refreshAll(1);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.FairyLandWashUI);
  };
  _ctor.prototype.onHide = function () {
    r_TimeSystem.TimeSystem.scheduleClear("waitToShowRes");
    r_TimeSystem.TimeSystem.scheduleClear("activeBtnStrong");
    this.canBegin = true;
    r_TYEventDispatcher.TYEventDispatcher.off(r_TYEvent.EventDef.stoneChange, this.washBtnCanShowRedTip, this);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.listStrong.itemRenderer = this.onListRenderer.bind(this);
    this.btnBack.onClick(function () {
      t.canBack && t.hide();
    });
    this.btnNormal.onClick(function () {
      return t.beginNormalWash();
    });
    this.btnVideo.onClick(function () {
      t.beginSuperWash();
    });
    r_ResSystem.ResSystem.loadBundleRes("bdWeaponForge", "main/xilian2", cc.Prefab, function (e, o) {
      r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
      t.spineNode = cc.instantiate(o);
      t.spineNode.active = false;
      t.spineNode.parent = t.hang.node;
      t.spineNode.x = 0;
      t.spineNode.y = 0;
    });
    var o = this.contentPane.getChild("barAtk");
    var i = this.contentPane.getChild("barCrit");
    var n = this.contentPane.getChild("barFack");
    this.bars.push(o);
    this.bars.push(i);
    this.bars.push(n);
  };
  _ctor.prototype.refreshAll = function (e) {
    var t = this;
    undefined === e && (e = 0);
    this.weaponList = [];
    for (var o in r_PlayerData.PlayerData.data.weapon.weapons) this.weaponList.push({
      id: Number(o),
      point: r_WeaponSystem.WeaponSystem.GetWeaponPoint(o),
      level: r_PlayerData.PlayerData.data.weapon.weapons[o].sLevel || 0
    });
    this.weaponList.sort(function (e, t) {
      if (t.level == e.level) {
        return t.point - e.point;
      } else {
        return t.level - e.level;
      }
    });
    var i = Number(r_WeaponSystem.WeaponSystem.GetFairySet("washCost")) || 0;
    this.bigCost = r_jsbi.default.BigInt(i);
    this.contentPane.getChild("txtPrice").text = i + "";
    this.listStrong.numItems = this.weaponList.length;
    if (e && this.weaponList.length > 0) {
      this.setLastSelectIndex(-1);
      setTimeout(function () {
        return t.selectItem(0, t.weaponList[0].id);
      }, 100);
    } else {
      this.selectWpId;
    }
  };
  _ctor.prototype.onListRenderer = function (e, t) {
    var o = this.weaponList[e].id;
    var i = r_PlayerData.PlayerData.data.weapon.weapons[o].sLevel || 0;
    var n = Math.floor((i - 1 < 0 ? 0 : i - 1) / 5);
    t.getController("c1").selectedIndex = n > 3 ? 3 : n;
    var a = r_WeaponSystem.WeaponSystem.GetWeaponInfo(o);
    t.text = i ? a.name + "+" + i : a.name;
    r_ResSystem.ResSystem.loadBundleFguiImg(t.getChild("icon"), "bdWeaponForge", "weapon/small/" + a.name);
    t.clearClick();
    t.onClick(this.selectItem.bind(this, e, o));
    var s = Number(r_WeaponSystem.WeaponSystem.GetFairySet("washCost")) || 0;
    var u = r_jsbi.default.BigInt(s);
    if (r_PlayerData.PlayerData.isStoneEnough(u)) {
      t.getChild("redTip").visible = true;
    } else {
      t.getChild("redTip").visible = false;
    }
    1 == (a && r_CommonFunc.GetLR(a.bornAtk)).length && (t.getChild("redTip").visible = false);
  };
  _ctor.prototype.setLastSelectIndex = function (e) {
    this.lastSelectIndex >= 0 && this.lastSelectIndex != e && this.lastSelectIndex < r_WeaponSystem.WeaponSystem.MyWeaponLen() && (this.listStrong.getChildAt(this.lastSelectIndex).asCom.getController("click").selectedIndex = 0);
    this.lastSelectIndex = e;
  };
  _ctor.prototype.selectItem = function (e, t) {
    this.listStrong.getChildAt(e).asCom.getController("click").selectedIndex = 1;
    this.showStrongInfo(t);
    this.setLastSelectIndex(e);
  };
  _ctor.prototype.showStrongInfo = function (e) {
    var t;
    this.selectWeapon = r_PlayerData.PlayerData.data.weapon.weapons[e];
    this.selectWeaponLv = (null === (t = this.selectWeapon) || undefined === t ? undefined : t.sLevel) || 0;
    this.selectWpId = e;
    r_ResSystem.ResSystem.loadBundleFguiImg(this.contentPane.getChild("icon"), "bdWeaponForge", "weapon/big/" + r_WeaponSystem.WeaponSystem.GetWeaponInfo(e).name);
    if (this.selectWeaponLv > 0) {
      this.txtSname.text = r_WeaponSystem.WeaponSystem.GetWeaponInfo(e).name + " +" + this.selectWeaponLv;
    } else {
      this.txtSname.text = r_WeaponSystem.WeaponSystem.GetWeaponInfo(e).name;
    }
    var o = Math.floor((this.selectWeaponLv - 1 < 0 ? 0 : this.selectWeaponLv - 1) / 5);
    this.contentPane.getController("c1").selectedIndex = o > 3 ? 3 : o;
    this.initAllBar();
    this.washBtnCanShowRedTip();
  };
  _ctor.prototype.initAllBar = function () {
    var e = r_WeaponSystem.WeaponSystem.GetWeaponInfo(this.selectWpId);
    var t = r_WeaponSystem.WeaponSystem.GetWeaponStrongInfo(this.selectWeaponLv);
    this.Atks = r_CommonFunc.GetLR(e.bornAtk);
    this.Crits = r_CommonFunc.GetLR(e.bornCrit);
    this.Facks = r_CommonFunc.GetLR(e.bornFack);
    var o = [this.Atks, this.Crits, this.Facks];
    this.lastWeaponValue[0] = r_WeaponSystem.WeaponSystem.GetAtk(this.selectWpId);
    this.lastWeaponValue[1] = Number(this.selectWeapon.nowCrit) || 0;
    this.lastWeaponValue[2] = Number(this.selectWeapon.nowFack) || 0;
    if (1 == o[0].length) {
      this.bars[0].max = this.lastWeaponValue[0];
      this.bars[0].value = this.bars[0].max;
      this.bars[0].getChild("txtShow").text = this.lastWeaponValue[0].toString() + "/" + this.lastWeaponValue[0].toString();
    } else {
      var i = t ? Number(t.sAtk) + 100 : 100;
      this.AtkL = Math.floor(this.Atks[0] * i / 100) + r_WeaponSystem.WeaponSystem.GetAtkBuff();
      this.AtkR = Math.floor(this.Atks[1] * i / 100) + r_WeaponSystem.WeaponSystem.GetAtkBuff();
      var n = this.AtkR - this.AtkL;
      this.bars[0].max = n;
      this.bars[0].value = this.lastWeaponValue[0] - this.AtkL;
      this.bars[0].getChild("txtShow").text = this.lastWeaponValue[0].toString() + "/" + this.AtkR;
    }
    if (1 == o[1].length) {
      this.bars[1].max = this.lastWeaponValue[1];
      this.bars[1].value = this.bars[1].max;
      this.bars[1].getChild("txtShow").text = this.lastWeaponValue[1].toString() + "%/" + this.lastWeaponValue[1].toString() + "%";
    } else {
      var a = t ? Number(t.sCrit) : 0;
      this.CritL = this.Crits[0] + a;
      this.CritR = this.Crits[1] + a;
      var s = this.CritR - this.CritL;
      this.bars[1].max = s;
      this.bars[1].value = this.lastWeaponValue[1] - this.CritL;
      this.bars[1].getChild("txtShow").text = this.lastWeaponValue[1].toString() + "%/" + this.CritR + "%";
    }
    if (1 == o[2].length) {
      this.bars[2].max = this.selectWeapon.nowFack;
      this.bars[2].value = this.bars[2].max;
      this.bars[2].getChild("txtShow").text = this.selectWeapon.nowFack.toString() + "%/" + this.selectWeapon.nowFack.toString() + "%";
    } else {
      var r = t ? Number(t.sFack) : 0;
      this.FackL = o[2][0] + r;
      this.FackR = o[2][1] + r;
      var c = this.FackR - this.FackL;
      this.bars[2].max = c;
      this.bars[2].value = this.selectWeapon.nowFack - this.FackL;
      this.bars[2].getChild("txtShow").text = this.selectWeapon.nowFack.toString() + "%/" + this.FackR + "%";
    }
    this.AtkL;
    this.CritL;
    this.FackL;
    var l = [this.AtkR, this.CritR, this.FackR];
    for (var u = 0; u < 3; u++) {
      if (o[u].length < 2 || this.lastWeaponValue[u] >= l[u]) {
        this.bars[u].getController("full").selectedIndex = 1;
      } else {
        this.bars[u].getController("full").selectedIndex = 0;
      }
    }
  };
  _ctor.prototype.Wash = function () {};
  _ctor.prototype.beginNormalWash = function () {
    var e = this;
    if (this.canBegin) {
      if (1 != this.Atks.length) {
        var t = function () {
          r_PlayerData.PlayerData.deleteStone("武器数值洗炼", e.bigCost, r_ReportSystem.SystemKey.武器数值洗炼);
          var t = "error";
          var o = -1;
          try {
            t = r_WeaponSystem.WeaponSystem.GetWeaponInfo(e.selectWpId).name || "error";
            o = e.selectWeapon.sLevel || "0";
          } catch (i) {
            cc.warn("qianghua_click上报失败");
          }
          r_PlatformSystem.PlatformSystem.report("xilian_click", {
            level: o,
            bingqi: t
          });
          e.canBegin = false;
          e.canBack = false;
          cc.log("开始洗炼");
          r_WeaponWashSystem.WeaponWashSystem.WashWeapon(e.selectWpId, r_WeaponWashSystem.WashType.普通洗炼);
          e.showEffect();
        };
        if (r_PlayerData.PlayerData.isStoneEnough(this.bigCost)) {
          t();
        } else {
          var o = r_jsbi.default.subtract(this.bigCost, r_PlayerData.PlayerData.bigStone);
          if (r_jsbi.default.GE(o, r_StoneVideoUI.StoneVideoUI.GetVideoStoneNum())) {
            cc.log("-一个视频不够啊");
            r_CommonEnterUI.CommonEnterUI.showUI({
              videoCallback: t,
              desc: "黄金门票洗炼武器"
            });
          } else {
            r_StoneVideoUI.StoneVideoUI.showUI();
          }
        }
      } else {
        r_UtilsSystem.UtilsSystem.showTip("此武器无法洗炼");
      }
    }
  };
  _ctor.prototype.beginSuperWash = function () {
    var e = this;
    if (this.canBegin) {
      if (1 != this.Atks.length) {
        r_PlatformSystem.PlatformSystem.showVideo("洗炼武器", function () {
          e.canBegin = false;
          e.canBack = false;
          cc.log("开始特殊洗炼");
          r_WeaponWashSystem.WeaponWashSystem.WashWeapon(e.selectWpId, r_WeaponWashSystem.WashType.特殊洗炼);
          e.showEffect();
        });
      } else {
        r_UtilsSystem.UtilsSystem.showTip("此武器无法洗炼");
      }
    }
  };
  _ctor.prototype.showEffect = function () {
    var e = this;
    this.spineNode.active = true;
    this.spineNode.getComponent(sp.Skeleton).setAnimation(0, "animation", false);
    r_SoundMgr.SoundMgr.playSound("forge/xilian");
    r_TimeSystem.TimeSystem.scheduleOnce("tweenProcess", .3, function () {
      e.tweenProcess();
    });
    r_TimeSystem.TimeSystem.scheduleOnce("activeBtnStrong", 1.1, function () {
      e.refreshAll();
      e.activeBtn();
    });
  };
  _ctor.prototype.tweenProcess = function () {
    var e = this;
    var t = r_PlayerData.PlayerData.data.weapon.weapons[this.selectWpId];
    var o = [r_WeaponSystem.WeaponSystem.GetAtk(this.selectWpId), t.nowCrit, t.nowFack];
    var i = [this.AtkR, this.CritR, this.FackR];
    var n = [this.bars[0].value, this.bars[1].value, this.bars[2].value];
    var a = [Number(o[0] - this.AtkL), Number(t.nowCrit - this.CritL), Number(t.nowFack - this.FackL)];
    var s = ["", "%", "%"];
    var r = function (t) {
      r_TimeSystem.TimeSystem.clearTimeMapUpdate("tweenWord" + t);
      l.bars[t].getController("full").selectedIndex = 0;
      if (a[t] == n[t]) {
        l.bars[t].getController("res").selectedIndex = Number(a[t] > 0);
      } else {
        cc.tween(l.bars[t]).to(.5, {
          value: a[t]
        }).start();
        r_TimeSystem.TimeSystem.timeMapUpdate("tweenWord" + t, .5, function (n) {
          e.bars[t].getChild("txtShow").text = "" + (e.lastWeaponValue[t] + Math.round(n * (Number(o[t]) - e.lastWeaponValue[t]))) + s[t] + "/" + i[t] + s[t];
          1 == n && (e.lastWeaponValue[t] = o[t]);
        });
        l.bars[t].getController("res").selectedIndex = Number(o[t] >= l.lastWeaponValue[t]);
      }
      cc.tween(l.bars[t].getChild("flag")).to(.35, {
        alpha: 1
      }).delay(.3).to(.35, {
        alpha: 0
      }).call(function () {
        cc.log("myWpInfo:" + o[t] + ",R:" + i[t]);
        o[t] == i[t] && (e.bars[t].getController("full").selectedIndex = 1);
      }).start();
    };
    var l = this;
    for (var p = 0; p < 3; p++) {
      r(p);
    }
  };
  _ctor.prototype.activeBtn = function () {
    this.canBegin = true;
    this.canBack = true;
  };
  _ctor.prototype.washBtnCanShowRedTip = function () {
    if (r_UtilsSystem.UtilsSystem.getMapNum(r_PlayerData.PlayerData.data.weapon.weapons) >= 1) {
      var e = r_WeaponSystem.WeaponSystem.GetWeaponInfo(this.selectWpId);
      if (1 == r_CommonFunc.GetLR(e.bornAtk).length) {
        this.btnNormal.getChild("redTip").visible = false;
        return false;
      }
      var t = Number(r_WeaponSystem.WeaponSystem.GetFairySet("washCost")) || 0;
      var o = r_jsbi.default.BigInt(t);
      if (r_PlayerData.PlayerData.isStoneEnough(o)) {
        this.btnNormal.getChild("redTip").visible = true;
        return true;
      }
    }
    this.btnNormal.getChild("redTip").visible = false;
    return false;
  };
  _ctor.data = null;
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnNormal")], _ctor.prototype, "btnNormal", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnVideo")], _ctor.prototype, "btnVideo", undefined);
  __decorate([r_DecorateFunction1.AutoFind("hang")], _ctor.prototype, "hang", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txtSname")], _ctor.prototype, "txtSname", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txtPrice")], _ctor.prototype, "txtPrice", undefined);
  __decorate([r_DecorateFunction1.AutoFind("listStrong")], _ctor.prototype, "listStrong", undefined);
  __decorate([r_DecorateFunction1.AutoFind("barAtk")], _ctor.prototype, "barAtk", undefined);
  __decorate([r_DecorateFunction1.AutoFind("barCrit")], _ctor.prototype, "barCrit", undefined);
  __decorate([r_DecorateFunction1.AutoFind("barFack")], _ctor.prototype, "barFack", undefined);
  return _ctor;
}(r_BaseLayer.BaseLayer);
exports.FairyLandWashUI = exp_FairyLandWashUI;