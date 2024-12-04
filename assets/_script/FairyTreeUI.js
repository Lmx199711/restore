var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FairyTreeUI = undefined;
var r_Index = require("Index");
var r_UIDef = require("UIDef");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseLayer = require("BaseLayer");
var r_ResSystem = require("ResSystem");
var r_PlayerData = require("PlayerData");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_WeaponSystem = require("WeaponSystem");
var r_FairyTreeThingUI = require("FairyTreeThingUI");
var r_FairyTreeCfg = require("FairyTreeCfg");
var r_WpForgeResUI = require("WpForgeResUI");
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_AFairyEvent = require("AFairyEvent");
var r_TowerFightUI = require("TowerFightUI");
var r_SoundMgr = require("SoundMgr");
var r_ReportSystem = require("ReportSystem");
var r_DialogueUI = require("DialogueUI");
var r_PlatformSystem = require("PlatformSystem");
var exp_FairyTreeUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.FairyLandTg, r_UIDef.UIDef.Res.UI.FairyTreeUI) || this;
    t.treeSpine = null;
    t.spineCom = null;
    t.clickAnim = "1_dianji";
    t.coolTime = .5;
    t.canClick = true;
    t.ori_x = 0;
    t.ori_y = 0;
    t.res = null;
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
    this.show(r_UIDef.UIDef.Urls.UI.FairyTreeUI, e, t);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.Inst = this;
    this.spineCom && this.spineCom.setAnimation(0, "1_daiji", true);
    this.contentPane.getController("clear").selectedIndex = 0;
    r_TimeSystem.TimeSystem.registSecondUpdate("treeCool", this.updateSecond.bind(this));
    this.updateTime();
    this.updateTop();
    r_TYEventDispatcher.TYEventDispatcher.on(r_AFairyEvent.AFairyEvent.ClickFairyTree, this.ClickListner, this);
    r_TYEventDispatcher.TYEventDispatcher.on(r_AFairyEvent.AFairyEvent.CheckGetStashWp, this.checkXuanYuan, this);
    r_SoundMgr.SoundMgr.playMusic("fairy/treeBg");
    this.canClick = true;
    this.data && this.data.isFirst && r_DialogueUI.DialogueUI.showUI({
      id: 105
    });
  };
  _ctor.prototype.checkXuanYuan = function () {
    console.log("检查轩辕剑");
    if (null == r_PlayerData.PlayerData.data.weapon.stash[1101] && this.getAllTimes() == r_FairyTreeCfg.FairyTreeSet.treeCount - 1) {
      this.canClick = false;
      r_UtilsSystem.UtilsSystem.showTip("获得轩辕剑");
      this.clickRefreshBar();
      r_TimeSystem.TimeSystem.scheduleOnce("24fs", .5, function () {
        _ctor.hide();
      });
    }
  };
  _ctor.prototype.updateTop = function () {
    this.txtCounter.text = this.getAllTimes() + "/1000";
  };
  _ctor.prototype.updateSecond = function () {
    this.updateTime();
  };
  _ctor.prototype.updateTime = function () {
    if (this.getEng() > 1e4) {
      var e = r_TimeSystem.TimeSystem.getServerTime();
      if (e >= this.getEng()) {
        this.comClick.getController("use").selectedIndex = 1;
        this.setEng(r_FairyTreeCfg.FairyTreeSet.max);
        r_PlayerData.PlayerData.saveData();
        this.refreshBtn();
      } else {
        this.comClick.getController("use").selectedIndex = 0;
        var t = this.getEng() - e;
        this.txtZero.text = "(0/" + r_FairyTreeCfg.FairyTreeSet.max + ")";
        this.txtTime.asTextField.text = "刷新时间:" + r_TimeSystem.TimeSystem.getTimeStr(t);
      }
    } else {
      this.comClick.getController("use").selectedIndex = 1;
      this.refreshBtn();
    }
  };
  _ctor.prototype.refreshBtn = function () {
    this.txtEng.text = (this.getEng() || 0) + "/" + r_FairyTreeCfg.FairyTreeSet.max;
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.FairyTreeUI);
  };
  _ctor.prototype.onHide = function () {
    _ctor.Inst = null;
    r_TimeSystem.TimeSystem.unregistSecondUpdate("treeCool");
    r_TimeSystem.TimeSystem.scheduleClear(r_AFairyEvent.AFairyEvent.TreeWait2Idle);
    r_TYEventDispatcher.TYEventDispatcher.off(r_AFairyEvent.AFairyEvent.ClickFairyTree, this.ClickListner, this);
    r_TYEventDispatcher.TYEventDispatcher.off(r_AFairyEvent.AFairyEvent.CheckGetStashWp, this.checkXuanYuan, this);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.ori_x = this.iconPos.x;
    this.ori_y = this.iconPos.y;
    if (!r_Index.Platform.isMiniPlatform()) {
      this.sliderGm.visible = true;
      this.sliderGm.max = r_FairyTreeCfg.FairyTreeSet.treeCount;
      this.sliderGm.value = Math.floor(this.sliderGm.max / 2);
      this.sliderGm.on(fgui.Event.STATUS_CHANGED, this.onSliderChanged, this);
      this.sliderGm.on(fgui.Event.TOUCH_END, this.onSliderChangOver, this);
    }
    this.btnBack.onClick(this.clickHide, this);
    this.hang.onClick(this.clickOnce, this);
    this.comClick.onClick(this.clickOnce, this);
    r_ResSystem.ResSystem.loadBundleFguiImg(this.bg, "bdWeaponForge", "tower/bg/2");
    r_ResSystem.ResSystem.loadBundleRes("bdWeaponForge", "tower/enemy/guaiwu_999", cc.Prefab, function (e, o) {
      t.treeSpine = cc.instantiate(o);
      t.spineCom = t.treeSpine.getComponent(sp.Skeleton);
      t.spineCom.setAnimation(0, "1_daiji", true);
      t.treeSpine.parent = t.hang.node;
      t.treeSpine.x = 0;
      t.treeSpine.y = 0;
    });
  };
  _ctor.prototype.onSliderChanged = function () {
    r_PlayerData.PlayerData.data.fairy.tree.done = Math.floor(this.sliderGm.value);
    this.updateTop();
  };
  _ctor.prototype.onSliderChangOver = function () {
    r_PlayerData.PlayerData.saveData();
  };
  _ctor.prototype.clickHide = function () {
    this.canClick && this.hide();
  };
  _ctor.prototype.clickTree = function () {};
  _ctor.prototype.clickOnce = function () {
    var e = this;
    if (this.canClick) {
      if (this.getAllTimes() >= r_FairyTreeCfg.FairyTreeSet.treeCount) {
        r_UtilsSystem.UtilsSystem.showTip("树上已经没有东西了");
      } else {
        if (this.getEng() > 1e4) {
          console.log("次数不足，看广告");
          return void r_UtilsSystem.UtilsSystem.showAlert("你今天已经累了，休息休息明天再来吧", 0, function () {
            r_PlatformSystem.PlatformSystem.showVideo("摇钱树补充体力", function () {
              e.setEng(r_FairyTreeCfg.FairyTreeSet.max);
            });
          }, this, "提示", "补充", "退出");
        }
        this.canClick = false;
        var t = this.getAllTimes() + 1;
        r_SoundMgr.SoundMgr.playSound("fairy/click");
        this.setEng(this.getEng() - 1);
        r_TimeSystem.TimeSystem.scheduleClear(r_AFairyEvent.AFairyEvent.TreeWait2Idle);
        this.beginIdle();
        this.spineCom && this.spineCom.setAnimation(0, this.clickAnim, false);
        if (this.getEng() <= 0) {
          this.setEng(r_TimeSystem.TimeSystem.getServerTime() + r_FairyTreeCfg.FairyTreeSet.reSecond);
          console.log("使用完了，rest" + this.getEng());
        }
        if (!this.handleThing(t)) {
          this.clickRefreshBar();
          r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(r_AFairyEvent.AFairyEvent.ClickFairyTree, {
            type: "stone",
            icon: "ui://MainHome/stone"
          });
        }
      }
    } else {
      console.log("冷却中");
    }
  };
  _ctor.prototype.clickRefreshBar = function () {
    this.addClickOnce();
    this.updateTop();
  };
  _ctor.prototype.ClickListner = function (e) {
    var t = this;
    cc.Tween.stopAllByTarget(this.iconDrop);
    var o = this.ori_x + 200 * Math.random() - 100;
    var i = this.ori_y - 700 + 100 * Math.random();
    this.iconDrop.x = o;
    this.iconDrop.y = i;
    if (e.data) {
      this.iconDrop.rotation = 0;
      this.iconDrop.scaleX = 1;
      this.iconDrop.scaleY = 1;
      this.iconDrop.url = e.data.icon;
      switch (e.data.type) {
        case "stone":
          r_PlayerData.PlayerData.addStone("仙界古树", 1, r_ReportSystem.SystemKey.仙界神树, true);
          cc.tween(this.iconDrop).to(.2, {
            alpha: 1,
            y: i - 80,
            rotation: 90
          }).to(.3, {
            y: this.ori_y,
            rotation: 360
          }, {
            easing: "sineIn"
          }).delay(.05).to(.1, {
            alpha: 0
          }).call(function () {
            t.canClick = true;
          }).start();
          break;
        case "rec":
          cc.tween(this.iconDrop).to(.2, {
            alpha: 1,
            y: i - 80,
            rotation: 90
          }).to(.3, {
            y: this.ori_y,
            rotation: 360
          }, {
            easing: "sineIn"
          }).delay(.05).to(.2, {
            alpha: 0
          }).start();
          break;
        case "event":
          this.iconDrop.scaleX = .4;
          this.iconDrop.scaleY = .4;
          cc.tween(this.iconDrop).to(.3, {
            alpha: 1,
            y: i - 80,
            rotation: 90
          }).to(.4, {
            y: this.ori_y,
            rotation: 360
          }, {
            easing: "sineIn"
          }).start();
          break;
        case "weapon":
          this.iconDrop.scaleX = .8;
          this.iconDrop.scaleY = .8;
          r_TimeSystem.TimeSystem.timeMapUpdate("rotateAlways", 3, function (e) {
            t.iconDrop.rotation = 1080 * e;
          });
          r_SoundMgr.SoundMgr.playSound("fairy/tree999");
          cc.tween(this.iconDrop).to(.4, {
            alpha: 1,
            y: i - 80,
            scaleX: 1.2
          }).to(.5, {
            y: this.ori_y - 200,
            scaleY: 1.2
          }, {
            easing: "sineIn"
          }).start();
      }
    }
  };
  _ctor.prototype.checkStage = function (e) {
    var t = false;
    for (var o = 1; o < r_FairyTreeCfg.FairyTreeSet.thingArr.length; o++) {
      if (e == r_FairyTreeCfg.FairyTreeSet.thingArr[o]) {
        console.log("事件！");
        t = true;
        break;
      }
    }
    return t;
  };
  _ctor.prototype.handleThing = function (e) {
    var t = false;
    var o = -1;
    for (var i = 1; i < r_FairyTreeCfg.FairyTreeSet.thingArr.length; i++) {
      if (e == r_FairyTreeCfg.FairyTreeSet.thingArr[i]) {
        console.log("事件！");
        t = true;
        o = i;
        break;
      }
    }
    if (t) {
      switch (o) {
        case 1:
          this.GainRandomRec(1, 1);
          break;
        case 2:
          this.GainRandomRec(2, 1);
          break;
        case 3:
          this.ChooseSome("monkey");
          break;
        case 4:
          this.GainRandomRec(2, 3);
          break;
        case 5:
          this.ChooseSome("hammer");
          break;
        case 6:
          this.GainRandomRec(3, 1);
          break;
        case 7:
          this.ChooseSome("hulu");
          break;
        case 8:
          this.changeTree();
          break;
        case 9:
          this.GainWeapon(1101);
          break;
        default:
          t = false;
      }
    }
    return t;
  };
  _ctor.prototype.changeTree = function () {
    var e = this;
    r_TimeSystem.TimeSystem.scheduleClear(r_AFairyEvent.AFairyEvent.TreeWait2Idle);
    r_SoundMgr.SoundMgr.playSound("fairy/treeChange");
    this.spineCom.setTrackCompleteListener(this.spineCom.setAnimation(0, "1_bianshen", false), function () {
      console.log("变身结束");
      e.spineCom.setAnimation(0, "daiji", true);
      e.contentPane.getController("clear").selectedIndex = 1;
      e.canClick = true;
      r_TimeSystem.TimeSystem.scheduleOnce("24fs", .8, function () {
        r_UtilsSystem.UtilsSystem.showAlert("大树突然显出了原型，要教训你一顿，是否应战", 0, function () {
          console.log("点击应战");
          r_TowerFightUI.TowerFightUI.showUI({
            index: 999,
            noFromTower: true,
            report: "摇钱树击败奖励",
            winCallback: function () {
              e.addClickOnce();
              r_PlayerData.PlayerData.saveData();
            }
          });
          _ctor.hide();
        }, e, "机遇事件", "应战", "逃跑", function () {
          _ctor.hide();
        });
      });
    });
  };
  _ctor.prototype.beginIdle = function () {
    var e = this;
    r_TimeSystem.TimeSystem.scheduleOnce(r_AFairyEvent.AFairyEvent.TreeWait2Idle, 1.5, function () {
      e.spineCom.setAnimation(0, "1_daiji", true);
    });
  };
  _ctor.prototype.getEng = function () {
    return r_PlayerData.PlayerData.data.fairy.tree.rest;
  };
  _ctor.prototype.setEng = function (e) {
    r_PlayerData.PlayerData.data.fairy.tree.rest = e;
  };
  _ctor.prototype.getAllTimes = function () {
    return r_PlayerData.PlayerData.data.fairy.tree.done;
  };
  _ctor.prototype.addClickOnce = function () {
    r_PlayerData.PlayerData.data.fairy.tree.done = r_PlayerData.PlayerData.data.fairy.tree.done + 1;
  };
  _ctor.prototype.GainRandomRec = function (e, t) {
    var o = this;
    var i = r_WeaponSystem.WeaponSystem.getRandomRecipe(e);
    r_WeaponSystem.WeaponSystem.GetRecipe(i.id, t);
    r_ResSystem.ResSystem.loadBundleRes("bdWeaponForge", "mat/big/" + i.name, cc.SpriteFrame, function (e, t) {
      o.res = t;
    });
    r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(r_AFairyEvent.AFairyEvent.ClickFairyTree, {
      type: "rec",
      icon: i.url
    });
    r_TimeSystem.TimeSystem.scheduleOnce("24fs", 1.2, function () {
      r_UtilsSystem.UtilsSystem.showAlert("恭喜获得[color=#945236]" + i.name + "[/color]*" + t);
      o.canClick = true;
    });
    this.clickRefreshBar();
  };
  _ctor.prototype.ChooseSome = function (e) {
    var t = this;
    r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(r_AFairyEvent.AFairyEvent.ClickFairyTree, {
      type: "event",
      icon: "ui://FairyLandTg/drop" + r_FairyTreeCfg.FairyTreeCfg[e].icon
    });
    r_TimeSystem.TimeSystem.scheduleOnce("24fs", 1.2, function () {
      r_FairyTreeThingUI.FairyTreeThingUI.showUI(e);
      t.canClick = true;
      t.iconDrop.alpha = 0;
    });
    this.clickRefreshBar();
  };
  _ctor.prototype.GainWeapon = function (e) {
    var t = this;
    r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(r_AFairyEvent.AFairyEvent.ClickFairyTree, {
      type: "weapon",
      icon: "ui://APng/光"
    });
    r_TimeSystem.TimeSystem.scheduleOnce("24fs", 1.2, function () {
      r_WeaponSystem.WeaponSystem.GainWeapon(e, true);
      r_WpForgeResUI.WpForgeResUI.showUI({
        id: e,
        playSpine: true,
        isStash: true,
        okCallback: function () {
          t.checkXuanYuan();
        }
      });
      t.canClick = true;
      r_TimeSystem.TimeSystem.scheduleClear("rotateAlways");
      t.iconDrop.alpha = 0;
    });
  };
  _ctor.Inst = null;
  _ctor.data = null;
  __decorate([r_DecorateFunction1.AutoFind("comClick")], _ctor.prototype, "comClick", undefined);
  __decorate([r_DecorateFunction1.AutoFind("hang")], _ctor.prototype, "hang", undefined);
  __decorate([r_DecorateFunction1.AutoFind("bg")], _ctor.prototype, "bg", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txtCounter")], _ctor.prototype, "txtCounter", undefined);
  __decorate([r_DecorateFunction1.AutoFind("comClick/txtZero")], _ctor.prototype, "txtZero", undefined);
  __decorate([r_DecorateFunction1.AutoFind("comClick/txtTime")], _ctor.prototype, "txtTime", undefined);
  __decorate([r_DecorateFunction1.AutoFind("comClick/txtEng")], _ctor.prototype, "txtEng", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("iconPos")], _ctor.prototype, "iconPos", undefined);
  __decorate([r_DecorateFunction1.AutoFind("iconDrop")], _ctor.prototype, "iconDrop", undefined);
  __decorate([r_DecorateFunction1.AutoFind("sliderGm")], _ctor.prototype, "sliderGm", undefined);
  return _ctor;
}(r_BaseLayer.BaseLayer);
exports.FairyTreeUI = exp_FairyTreeUI;