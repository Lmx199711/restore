var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FairyShopPetUI = undefined;
var r_Index = require("Index");
var r_UIDef = require("UIDef");
var r_FairyShopPetBkUI = require("FairyShopPetBkUI");
var r_PlayerData = require("PlayerData");
var r_WeaponSystem = require("WeaponSystem");
var r_ResSystem = require("ResSystem");
var r_TimeSystem = require("TimeSystem");
var r_PoolSystem = require("PoolSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_SoundMgr = require("SoundMgr");
var r_AFairyEvent = require("AFairyEvent");
var r_FirstVideoSystem = require("FirstVideoSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PopFruitUI = require("PopFruitUI");
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_ReportSystem = require("ReportSystem");
var r_BaseLayer = require("BaseLayer");
var r_FguiResSystem = require("FguiResSystem");
var _ = "none";
var exp_FairyShopPetUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.FairyLandShop, r_UIDef.UIDef.Res.UI.WpPet) || this;
    t.uiType = "fullScreen";
    t.systemType = r_ReportSystem.SystemKey.器武魂;
    t.ori_x = 0;
    t.ori_y = 0;
    t.tar_x = 0;
    t.tar_y = 0;
    t.poolKey = "FeedPetNumKey";
    t.MaxPetLv = 1;
    t.upNode = null;
    t.lvBeforeFruit = 0;
    t.expBeforeFruit = 0;
    t.WpPet = null;
    t.WpPetExpObj = null;
    t.WpPetAtkObj = null;
    t.WpPetRatObj = null;
    t.petId = 1;
    t.petMaxEx = 0;
    t.spineNode = null;
    t.changeSpeed = 1;
    t.aPart = [];
    t.stageIndex = -1;
    t.offset_X = 0;
    t.offset_Y = 0;
    return t;
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
    this.show(r_UIDef.UIDef.Urls.UI.FairyShopPetUI, e, t);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.process1.value = 0;
    this.initData();
    r_TYEventDispatcher.TYEventDispatcher.on(r_AFairyEvent.AFairyEvent.PetFruitMsg, this.refreshPet, this);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.FairyShopPetUI);
  };
  _ctor.prototype.onHide = function () {
    r_TYEventDispatcher.TYEventDispatcher.off(r_AFairyEvent.AFairyEvent.PetFruitMsg, this.refreshPet, this);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.txt1 = this.comNumPet.getChild("txt1").asTextField;
    this.txt2 = this.comNumPet.getChild("txt2").asTextField;
    this.txt3 = this.comNumPet.getChild("txt3").asTextField;
    this.txt4 = this.comNumPet.getChild("txt4").asTextField;
    this.txt5 = this.comNumPet.getChild("txt5").asTextField;
    this.txt6 = this.comNumPet.getChild("txt6").asTextField;
    this.txtRate = this.comNumPet.getChild("txtRate").asTextField;
    this.txtAtk = this.comNumPet.getChild("txtAtk").asTextField;
    this.MaxPetLv = r_WeaponSystem.WeaponSystem.MaxPetLv();
    this.btnBook.onClick(this.clickBook, this);
    this.btnFruit.onClick(this.clickFruit, this);
    this.btnBack.onClick(this.clickHide, this);
    if (r_Index.Platform.isMiniPlatform()) {
      this.btnGm.clearClick();
    } else {
      this.btnGm.onClick(this.jumpLevel, this);
    }
    this.list.setVirtual();
    this.list.itemRenderer = this.onListRenderer.bind(this);
    this.ori_x = this.iconFly.x;
    this.ori_y = this.iconFly.y;
    this.tar_x = this.iconGoto.x;
    this.tar_y = this.iconGoto.y;
    r_PoolSystem.PoolSystem.createUIObjPool(this.poolKey, "ui://MainHome/expNum", 1, this.numRoot2);
    r_ResSystem.ResSystem.loadBundleRes("bdWeaponForge", "pet/guang", cc.Prefab, function (e, o) {
      r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
      t.upNode = cc.instantiate(o);
      t.upNode.active = false;
      t.upNode.parent = t.hang2.node;
      t.upNode.x = 0;
      t.upNode.y = 0;
    });
  };
  _ctor.prototype.jumpLevel = function () {
    if ("choose" == _) {
      var e = this.GetLv();
      if (e >= this.MaxPetLv) {
        r_UtilsSystem.UtilsSystem.showTip("已达满级");
      } else {
        _ = "anim";
        var t = e + 10 > this.MaxPetLv ? 1 : 10;
        this.AddLv(t);
        r_PlayerData.PlayerData.saveData();
        this.showUpEffect();
      }
    }
  };
  _ctor.prototype.clickHide = function () {
    "choose" == _ && this.hide();
  };
  _ctor.prototype.clickFruit = function () {
    this.GetLv() >= this.MaxPetLv && r_UtilsSystem.UtilsSystem.showTip("等级过高无法食用果实");
    r_PopFruitUI.PopFruitUI.showUI({
      desc: "食用后大概率[color=#52a529]提升一定等级[/color]，小概率[color=#d14e2b]降低一定等级[/color]",
      word1: "含泪放弃",
      word2: "食用"
    });
    this.lvBeforeFruit = this.GetLv();
    this.expBeforeFruit = this.GetExp();
  };
  _ctor.prototype.refreshPet = function (e) {
    var t = this;
    _ = "anim";
    var o = null;
    if (e.data) {
      var i = e.data;
      if (i.isDown) {
        r_PlayerData.PlayerData.data.weapon.pet[0].lv = this.lvBeforeFruit;
        r_PlayerData.PlayerData.data.weapon.pet[0].exp = this.expBeforeFruit;
        r_PlayerData.PlayerData.saveData();
      }
      o = function () {
        setTimeout(function () {
          t.feedRec(0, 0, i.getExp, false);
        }, 500);
      };
    }
    if (this.GetLv() > this.lvBeforeFruit) {
      cc.tween(this.process1).to(.3, {
        value: this.petMaxEx
      }).start();
      r_TimeSystem.TimeSystem.timeMapUpdate("tweenExBar11", .3, function (e) {
        t.process1.getChild("txtShow").text = t.expBeforeFruit + Math.round(e * (t.petMaxEx - t.expBeforeFruit)) + "/" + t.petMaxEx;
        if (1 == e) {
          t.initAfterFruit("up");
          o && setTimeout(function () {
            o();
          }, 800);
        }
      });
    } else if (this.GetLv() < this.lvBeforeFruit) {
      r_SoundMgr.SoundMgr.playSound("失败");
      cc.tween(this.process1).to(.3, {
        value: 0
      }).start();
      r_TimeSystem.TimeSystem.timeMapUpdate("tweenExBar11", .3, function (e) {
        t.process1.getChild("txtShow").text = t.expBeforeFruit - Math.round(e * t.expBeforeFruit) + "/" + t.petMaxEx;
        1 == e && t.initAfterFruit("down");
      });
    } else {
      o && o();
    }
  };
  _ctor.prototype.clickBook = function () {
    var e = this;
    if (r_FirstVideoSystem.FirstVideoSystem.hasFirstEnter(r_FirstVideoSystem.FirstVideoUIEnum.剑灵龙神形态)) {
      this.btnBook.getController("ad").selectedIndex = 0;
    } else {
      this.btnBook.getController("ad").selectedIndex = 1;
    }
    r_PlatformSystem.PlatformSystem.showVideo("武魂形态查看", function () {
      r_FairyShopPetBkUI.FairyShopPetBkUI.showUI();
      r_FirstVideoSystem.FirstVideoSystem.setFirstEnter(r_FirstVideoSystem.FirstVideoUIEnum.剑灵龙神形态);
      e.refreshBookFlag();
    });
  };
  _ctor.prototype.refreshBookFlag = function () {
    if (r_FirstVideoSystem.FirstVideoSystem.hasFirstEnter(r_FirstVideoSystem.FirstVideoUIEnum.剑灵龙神形态)) {
      this.btnBook.getController("ad").selectedIndex = 0;
    } else {
      this.btnBook.getController("ad").selectedIndex = 1;
    }
  };
  _ctor.prototype.initAfterFruit = function (e) {
    this.petMaxEx = this.WpPetExpObj.num[this.GetLv() + 1] || 999999;
    "down" == e && (this.process1.max = this.petMaxEx);
    this.changeBar(e);
  };
  _ctor.prototype.changeBar = function (e) {
    var t = this;
    r_TimeSystem.TimeSystem.scheduleClear("tweenExBar");
    if ("up" == e) {
      this.process1.value = 0;
      this.showUpEffect();
    } else {
      this.process1.value = this.process1.max;
      cc.tween(this.process1).to(.3, {
        value: this.GetExp()
      }).start();
      var o = this.petMaxEx - this.GetExp();
      r_TimeSystem.TimeSystem.timeMapUpdate("tweenExBar", .3, function (e) {
        t.process1.getChild("txtShow").text = t.petMaxEx - Math.round(e * o) + "/" + t.petMaxEx;
        if (1 == e) {
          t.refreshPanel();
          t.loadPet();
          _ = "choose";
        }
      });
    }
  };
  _ctor.prototype.initData = function (e) {
    undefined === e && (e = "choose");
    this.petId = Number(r_PlayerData.PlayerData.data.weapon.pet[0].id);
    this.WpPet = r_WeaponSystem.WeaponSystem.GetWpPetInfo(this.petId);
    this.nameList = this.WpPet.stageName.split("|");
    this.WpPetExpObj = r_WeaponSystem.WeaponSystem.GetWpPetLvInfo(this.WpPet.expInfo);
    this.WpPetAtkObj = r_WeaponSystem.WeaponSystem.GetWpPetLvInfo(this.WpPet.atkBuffInfo);
    this.WpPetRatObj = r_WeaponSystem.WeaponSystem.GetWpPetLvInfo(this.WpPet.strongInfo);
    this.petMaxEx = this.WpPetExpObj.num[this.GetLv() + 1] || 999999;
    this.copyedRecipes = JSON.parse(JSON.stringify(r_PlayerData.PlayerData.data.weapon.recipes));
    this.soreRec();
    this.loadPet();
    this.refreshPanel();
    _ = e;
    this.initBar();
    this.refreshBookFlag();
  };
  _ctor.prototype.refreshWhenUp = function () {
    this.petMaxEx = this.WpPetExpObj.num[this.GetLv() + 1] || 999999;
    this.refreshPanel();
    this.initBar();
  };
  _ctor.prototype.soreRec = function () {
    this.aPart = [];
    if (this.copyedRecipes) {
      for (var e in this.copyedRecipes) if (this.copyedRecipes[e] > 0) {
        var t = r_WeaponSystem.WeaponSystem.GetRecipeInfo(e);
        var o = t.name;
        var i = t.type;
        var n = t.url;
        var a = r_WeaponSystem.WeaponSystem.getWpRecipeT(i).feedExp;
        var s = {
          rid: Number(e),
          name: o,
          type: i,
          exp: a,
          url: n
        };
        this.aPart.push(s);
      }
      this.aPart.sort(function (e, t) {
        if (t.type == e.type) {
          return t.rid - e.rid;
        } else {
          return t.type - e.type;
        }
      });
    }
    this.list.numItems = this.aPart.length;
    this.contentPane.getController("empty").selectedIndex = 0 == this.aPart.length ? 1 : 0;
  };
  _ctor.prototype.loadPet = function () {
    var e = this;
    var t = 0;
    for (var o = this.WpPet.range.length - 1; o >= 0; o--) {
      if (this.GetLv() >= this.WpPet.range[o]) {
        t = o;
        break;
      }
    }
    if (this.stageIndex != t) {
      this.stageIndex = t;
      var i = this.WpPet.path + (this.stageIndex + 1);
      r_ResSystem.ResSystem.loadBundleRes("bdWeaponForge", i, cc.Prefab, function (t, o) {
        var n;
        var a = cc.instantiate(o);
        r_WeaponSystem.WeaponSystem.nodeMap[i] = a;
        null === (n = e.spineNode) || undefined === n || n.destroy();
        e.spineNode = a;
        e.spineNode.parent = e.hang.node;
        e.spineNode.x = 0;
        e.spineNode.y = 0;
        var s = new cc.Vec2(0, 0);
        e.spineNode.children[1].convertToWorldSpaceAR(cc.Vec2.ZERO, s);
        var r = Math.round(fgui.GRoot.inst.width);
        var c = Math.round(fgui.GRoot.inst.height);
        e.offset_X = (r - 750) / 2 + s.x;
        e.offset_Y = c - ((c - 1334) / 2 + s.y);
        e.animSpine();
      });
    }
  };
  _ctor.prototype.animSpine = function () {
    this.spineNode.active = true;
    this.spineNode.children[0].getComponent(sp.Skeleton).setAnimation(0, "daiji", true);
  };
  _ctor.prototype.initBar = function () {
    var e = this;
    this.process1.max = this.petMaxEx;
    cc.tween(this.process1).to(.5, {
      value: this.GetExp()
    }).start();
    r_TimeSystem.TimeSystem.scheduleClear("tweenExBar");
    r_TimeSystem.TimeSystem.timeMapUpdate("tweenExBar", .5, function (t) {
      e.process1.getChild("txtShow").text = Math.round(t * e.GetExp()) + "/" + e.petMaxEx;
    });
  };
  _ctor.prototype.refreshPanel = function () {
    this.txtName.text = "[color=#FE9D2B]Lv." + this.GetLv() + "[/color] " + this.nameList[this.stageIndex];
    this.txt1.text = this.GetLv() + "";
    this.txt3.text = this.WpPetAtkObj.num[this.GetLv()].toString() || "0";
    this.txt5.text = (this.WpPetRatObj.num[this.GetLv()] || "0") + "%";
    if (this.GetLv() >= this.MaxPetLv) {
      this.contentPane.getController("full").selectedIndex = 1;
      this.comNumPet.getController("full").selectedIndex = 1;
      this.txt2.text = this.txt1.text;
      this.txt4.text = this.txt3.text;
      this.txt6.text = this.txt5.text;
    } else {
      this.contentPane.getController("full").selectedIndex = 0;
      this.comNumPet.getController("full").selectedIndex = 0;
      this.txt4.text = this.WpPetAtkObj.num[this.GetLv() + 1] + "";
      this.txt2.text = this.GetLv() + 1 + "";
      this.txt6.text = this.WpPetRatObj.num[this.GetLv() + 1] + "%";
    }
    var e = this.txt3.width > this.txt5.width ? this.txt3.width - 53 : this.txt5.width - 53;
    this.txtAtk.x = this.txt3.x - 245 - e;
    this.txtRate.x = this.txt3.x - 245 - e;
  };
  _ctor.prototype.onListRenderer = function (e, t) {
    var o;
    t.clearClick();
    var i = this.aPart[e];
    o = i.rid;
    t.onClick(this.clickFeedRec.bind(this, e, i.rid, i.exp));
    var n = this.copyedRecipes[o];
    t.getChild("txtNum").text = n;
    t.getChild("title").text = "" + i.name;
    t.getController("type").selectedIndex = i.type - 1;
    t.icon = i.url;
  };
  _ctor.prototype.clickFeedRec = function (e, t, o) {
    if ("choose" == _) {
      if (this.GetLv() >= this.MaxPetLv) {
        r_UtilsSystem.UtilsSystem.showTip("暂时无法继续成长了哦");
      } else if (!r_WeaponSystem.WeaponSystem.firstFeedGold && r_WeaponSystem.WeaponSystem.GetRecipeInfo(t).type >= 4) {
        this.showAskWindow(e, t, o);
        r_WeaponSystem.WeaponSystem.firstFeedGold = true;
      } else {
        this.feedRec(e, t, o);
      }
    }
  };
  _ctor.prototype.feedRec = function (e, t, o, i) {
    var n = this;
    undefined === i && (i = true);
    _ = "anim";
    var a = this.feed2Lv(o);
    var s = a.upLv;
    var r = a.remainExp;
    if (i) {
      this.copyedRecipes[t] = this.copyedRecipes[t] - 1;
      this.soreRec();
      r_WeaponSystem.WeaponSystem.LoseRecipe([t]);
      this.iconFly.url = r_WeaponSystem.WeaponSystem.GetRecipeInfo(t).url;
    } else {
      this.iconFly.url = "";
    }
    this.iconFly.x = this.ori_x;
    this.iconFly.y = this.ori_y;
    cc.tween(this.iconFly).to(.15, {
      scaleX: 1,
      scaleY: 1,
      alpha: 255,
      x: this.offset_X,
      y: this.offset_Y
    }).to(.1, {
      scaleX: 1.5,
      scaleY: 1.5
    }).call(function () {
      n.playPetAnim("chi");
    }).delay(.1).to(.05, {
      scaleX: .6,
      scaleY: .6,
      alpha: 0
    }).call(function () {
      n.showExpNum(o);
      var e = n.GetExp();
      if (s > 0) {
        var t = r;
        n.AddLv(s);
        n.SetExp(t);
        cc.tween(n.process1).to(.35, {
          value: n.petMaxEx
        }).start();
        r_TimeSystem.TimeSystem.timeMapUpdate("tweenExBar11", .35, function (t) {
          n.process1.getChild("txtShow").text = e + Math.round(t * (n.petMaxEx - e)) + "/" + n.petMaxEx;
        });
        n.showUpEffect();
      } else {
        cc.tween(n.process1).to(.35, {
          value: r
        }).start();
        n.SetExp(n.GetExp() + o);
        r_TimeSystem.TimeSystem.timeMapUpdate("tweenExBar11", .35, function (t) {
          n.process1.getChild("txtShow").text = e + Math.round(t * o) + "/" + n.petMaxEx;
          1 == t && (_ = "choose");
        });
      }
    }).start();
  };
  _ctor.prototype.showUpEffect = function () {
    var e = this;
    this.upNode.active = true;
    var t = this.upNode.getComponent(sp.Skeleton).setAnimation(0, "animation", false);
    this.upNode.getComponent(sp.Skeleton).setTrackCompleteListener(t, function () {
      e.upNode.active = false;
    });
    r_SoundMgr.SoundMgr.playSound("forge/petLvUp");
    r_TimeSystem.TimeSystem.scheduleOnce(r_AFairyEvent.AFairyEvent.PetLoad, .3, function () {
      e.loadPet();
    });
    r_TimeSystem.TimeSystem.scheduleOnce(r_AFairyEvent.AFairyEvent.PetUpRefresh, 1, function () {
      e.process1.getChild("txtShow").text = "0";
      e.process1.value = 0;
      e.refreshWhenUp();
      _ = "choose";
    });
  };
  _ctor.prototype.showAskWindow = function (e, t, o) {
    var i = this;
    r_UtilsSystem.UtilsSystem.showAlert("确定投喂[color=#9A4127]SSR材料[/color]？", 0, function () {
      i.feedRec(e, t, o);
    });
  };
  _ctor.prototype.playPetAnim = function (e) {
    var t = this;
    if (this.spineNode) {
      var o = this.spineNode.children[0];
      if ("chi" == e) {
        r_SoundMgr.SoundMgr.playSound("forge/petEat");
        var i = o.getComponent(sp.Skeleton).setAnimation(0, e, false);
        o.getComponent(sp.Skeleton).setTrackCompleteListener(i, function () {
          t.spineNode.children[0].getComponent(sp.Skeleton).setAnimation(0, "daiji", true);
        });
      }
    }
  };
  _ctor.prototype.showExpNum = function (e) {
    var t = this;
    var o = r_PoolSystem.PoolSystem.createObj(this.poolKey);
    o.alpha = 0;
    o.getChild("content").text = "+" + e;
    o.x = 0;
    o.y = 0;
    r_TimeSystem.TimeSystem.timeUpdate(.8, function (e) {
      o.y = -200 * e;
      e > .5 && (o.alpha = 1 - e);
      if (1 == e) {
        o.alpha = 0;
        r_PoolSystem.PoolSystem.revert(t.poolKey, o);
      }
    });
    o.alpha = 255;
  };
  _ctor.prototype.GetExp = function () {
    return r_PlayerData.PlayerData.data.weapon.pet[0].exp || 0;
  };
  _ctor.prototype.SetExp = function (e) {
    r_PlayerData.PlayerData.data.weapon.pet[0].exp = e;
    r_PlayerData.PlayerData.saveData();
  };
  _ctor.prototype.GetLv = function () {
    var e = r_PlayerData.PlayerData.data.weapon.pet[0].lv || 0;
    e > this.MaxPetLv && (e = this.MaxPetLv);
    return e;
  };
  _ctor.prototype.AddLv = function (e) {
    undefined === e && (e = 1);
    var t = r_PlayerData.PlayerData.data.weapon.pet[0].lv + e;
    t > this.MaxPetLv && (t = this.MaxPetLv);
    r_PlayerData.PlayerData.data.weapon.pet[0].lv = t;
    r_PlatformSystem.PlatformSystem.report("qiwuhun", {
      level: r_PlayerData.PlayerData.data.weapon.pet[0].lv
    });
    r_PlayerData.PlayerData.saveData();
  };
  _ctor.prototype.feed2Lv = function (e) {
    var t = this.GetLv();
    var o = this.GetExp() + e;
    var i = t + 1;
    var n = 0;
    for (var a = this.WpPetExpObj.num[i] || 9999999; o >= a && i < this.WpPetExpObj.num.length; i++, n++) {
      o -= a;
      a = this.WpPetExpObj.num[i];
    }
    return {
      upLv: n,
      remainExp: o
    };
  };
  _ctor.data = null;
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("comFlash")], _ctor.prototype, "comFlash", undefined);
  __decorate([r_DecorateFunction1.AutoFind("hang")], _ctor.prototype, "hang", undefined);
  __decorate([r_DecorateFunction1.AutoFind("iconFly")], _ctor.prototype, "iconFly", undefined);
  __decorate([r_DecorateFunction1.AutoFind("iconGoto")], _ctor.prototype, "iconGoto", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnGm")], _ctor.prototype, "btnGm", undefined);
  __decorate([r_DecorateFunction1.AutoFind("hang2")], _ctor.prototype, "hang2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txtName")], _ctor.prototype, "txtName", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnBook")], _ctor.prototype, "btnBook", undefined);
  __decorate([r_DecorateFunction1.AutoFind("comNumPet")], _ctor.prototype, "comNumPet", undefined);
  __decorate([r_DecorateFunction1.AutoFind("process1")], _ctor.prototype, "process1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("list")], _ctor.prototype, "list", undefined);
  __decorate([r_DecorateFunction1.AutoFind("numRoot2")], _ctor.prototype, "numRoot2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnFruit")], _ctor.prototype, "btnFruit", undefined);
  return _ctor;
}(r_BaseLayer.BaseLayer);
exports.FairyShopPetUI = exp_FairyShopPetUI;