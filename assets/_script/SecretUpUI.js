var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SecretUpUI = undefined;
var r_Index = require("Index");
var r_UIDef = require("UIDef");
var r_TimeSystem = require("TimeSystem");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var r_SecretCfg = require("SecretCfg");
var r_UtilsSystem = require("UtilsSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_SoundMgr = require("SoundMgr");
var r_BaseWin = require("BaseWin");
var r_SecretUpSystem = require("SecretUpSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_ReportSystem = require("ReportSystem");
var r_SecretCodexUI = require("SecretCodexUI");
var r_RoleCfg = require("RoleCfg");
var r_MainHomeUI = require("MainHomeUI");
var r_SecretUpDebugUI = require("SecretUpDebugUI");
var r_SecretUpGetUI = require("SecretUpGetUI");
var r_TaskSystem = require("TaskSystem");
var r_TaskCfg = require("TaskCfg");
var r_DrawUI = require("DrawUI");
var r_DatingUI = require("DatingUI");
var r_BlockSystem = require("BlockSystem");
var exp_SecretUpUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.SecretUp, r_UIDef.UIDef.Res.UI.SecretUpUI) || this;
    t.curMaxIndex = 0;
    t.curIndex = 0;
    t.itemList = [];
    t.itemHeadList = [];
    t.m_gifts = [];
    t.passTime = 0;
    t.lastSound = null;
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
    this.show(r_UIDef.UIDef.Urls.UI.SecretUpUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.SecretUpUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btnDebug);
    this.contentPane.getChild("btnBack").asButton.onClick(this.onClickBack, this);
    this.btnLeft = this.contentPane.getChild("btnLeft").asButton;
    this.btnLeft.onClick(this.onClickLeft, this);
    this.btnRight = this.contentPane.getChild("btnRight").asButton;
    this.btnRight.onClick(this.onClickRight, this);
    this.btnStyle = this.contentPane.getChild("btnStyle");
    this.btnStyle.onClick(this.onClickStyle, this);
    this.btnStyle1 = this.contentPane.getChild("btnStyle1");
    this.btnStyle1.onClick(this.onClickStyle1, this);
    this.btnStyle1.getController("c1").selectedIndex = 1;
    this.btnCodex = this.contentPane.getChild("btnCodex");
    this.btnCodex.onClick(this.onClickCodex, this);
    this.btnUp = this.contentPane.getChild("btnUp");
    this.btnUp.onClick(this.onClickUp, this);
    this.lbCoin = this.btnUp.getChild("num");
    this.lbLevel = this.contentPane.getChild("lbLevel");
    this.btnGradeUp = this.contentPane.getChild("btnGradeUp");
    this.btnGradeUp.onClick(this.onClickGradeUp, this);
    this.lbGradeUpNum = this.btnGradeUp.getChild("num");
    this.btnDate = this.contentPane.getChild("btnDate");
    this.btnDate.onClick(this.onClickDate, this);
    this.btnDate.visible = !r_BlockSystem.BlockSystem.isBlock(r_BlockSystem.BlockTrickType.秘书约会);
    this.lbName = this.contentPane.getChild("lbName");
    this.list = this.contentPane.getChild("list").asList;
    this.list.itemRenderer = this.onListRenderer.bind(this);
    this.list.on(fgui.Event.SCROLL, this.onScroll, this);
    this.list.on(fgui.Event.SCROLL_END, this.onScrollEnd, this);
    this.listHead = this.contentPane.getChild("headlist").asList;
    this.listHead.itemRenderer = this.onHeadListRenderer.bind(this);
    this.listHead.on(fgui.Event.SCROLL, this.onHeadScroll, this);
    this.listHead.on(fgui.Event.SCROLL_END, this.onHeadScrollEnd, this);
    this.lbFeel = this.contentPane.getChild("lbFeel");
    this.feelProgressBar = this.contentPane.getChild("feelProgressBar");
    this.lbAttack = this.contentPane.getChild("lbAttack");
    this.lbMaterial = this.contentPane.getChild("lbMaterial");
    this.infoCom = this.contentPane.getChild("infoCom");
    this.rewardCom = this.infoCom.getChild("rewardCom");
    this.rewardList = this.rewardCom.getChild("list");
    this.rewardList.setVirtual();
    this.rewardList.itemRenderer = this.onListRewardRenderer.bind(this);
    this.rewardList.numItems = r_SecretCfg.SecretRewardCfg.length;
    this.starPro = this.infoCom.getChild("starPro");
  };
  _ctor.prototype.refreshUpBtn = function (e) {
    if (r_SecretUpSystem.SecretUpSystem.hasSecret(e)) {
      var t = r_SecretUpSystem.SecretUpSystem.getSecretById(e);
      var o = r_SecretUpSystem.SecretUpSystem.getLevelByFeel(t.id, t.feel);
      r_SecretUpSystem.SecretUpSystem.getUpCoin(e);
      var i = r_SecretUpSystem.SecretUpSystem.getSecretUpInfo(e);
      if (r_SecretUpSystem.SecretUpSystem.checkMaxLevel(e)) {
        if (t.isBreak) {
          this.contentPane.getController("c1").selectedIndex = 3;
        } else {
          this.contentPane.getController("c1").selectedIndex = 2;
          this.lbGradeUpNum.text = "X" + i.stoneNum;
        }
      } else {
        this.contentPane.getController("c1").selectedIndex = 1;
      }
      this.lbLevel.text = "Lv." + o;
      var n = t.isBreak ? r_RoleCfg.BreakValue[r_SecretUpSystem.SecretUpSystem.getBreakTouchNum(e)] : i.autoTouch;
      this.lbAttack.text = r_UtilsSystem.UtilsSystem.getShowCoin(n);
      this.lbMaterial.text = r_PlayerData.PlayerData.data.stoneStr;
    }
  };
  _ctor.prototype.onClickBack = function () {
    r_SoundMgr.SoundMgr.playMusic("bgm");
    this.hide();
  };
  _ctor.prototype.refreshList = function () {
    var e = r_SecretUpSystem.SecretUpSystem.getSecretList().length;
    this.itemList = [];
    this.itemHeadList = [];
    this.list.numItems = e;
    this.curMaxIndex = e;
  };
  _ctor.prototype.refreshHeadList = function () {
    var e = r_SecretUpSystem.SecretUpSystem.getSecretList().length;
    this.listHead.numItems = e;
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    if (r_SecretUpSystem.SecretUpSystem.getSecretList().length <= 0) {
      this.hide();
      return void r_UtilsSystem.UtilsSystem.showAlert("您暂时没有秘书，是否跳转招募秘书界面", 0, function () {
        r_DrawUI.DrawUI.showUI();
      }, this);
    }
    _ctor.talkMap = {};
    _ctor.Inst = this;
    this.m_gifts = [];
    this.contentPane.getController("c1").selectedIndex = 1;
    this.refreshList();
    this.refreshHeadList();
    this.refreshInfo();
    this.passTime = 0;
    r_TimeSystem.TimeSystem.registUpdate(this, this.updateTime.bind(this));
  };
  _ctor.prototype.restart = function () {
    this.refreshList();
    this.refreshHeadList();
    this.refreshInfo();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.Inst = null;
    r_TimeSystem.TimeSystem.unregistUpdate(this);
    this.lastSound && r_SoundMgr.SoundMgr.stopSound(this.lastSound);
    r_MainHomeUI.default.instance && r_MainHomeUI.default.instance.showSecret();
    this.m_gifts.forEach(function (e) {
      e.destroy();
    });
    this.m_gifts = [];
    r_TimeSystem.TimeSystem.scheduleClear("scrollToView");
    this.rewardList.enabled = true;
  };
  _ctor.prototype.updateTime = function (e) {
    this.passTime = this.passTime + e;
    this.passTime >= 10 && (this.passTime = 0);
  };
  _ctor.prototype.onScroll = function () {};
  _ctor.prototype.onScrollEnd = function () {
    console.log("onScrollEnd");
    this.refreshInfo();
    for (var e = 0; e < this.itemHeadList.length; e++) {
      if (e == this.list.scrollPane.currentPageX) {
        this.itemHeadList[e].getController("c1").selectedIndex = 1;
      } else {
        this.itemHeadList[e].getController("c1").selectedIndex = 0;
      }
    }
  };
  _ctor.prototype.onHeadScroll = function () {
    for (var e = 0; e < this.itemHeadList.length; e++) {
      if (e == this.list.scrollPane.currentPageX) {
        this.itemHeadList[e].getController("c1").selectedIndex = 1;
      } else {
        this.itemHeadList[e].getController("c1").selectedIndex = 0;
      }
    }
  };
  _ctor.prototype.onHeadScrollEnd = function () {
    console.log("onScrollEnd");
    this.refreshInfo();
  };
  _ctor.prototype.onListRenderer = function (e, t) {
    this.itemList[e] = t;
    t.getController("mode").selectedIndex = 0;
    t.getController("c1").selectedIndex = 0;
    if (r_SecretUpSystem.SecretUpSystem.getSecretList().length != e) {
      t.getChild("icon").visible = true;
      var o = r_SecretUpSystem.SecretUpSystem.getSecretList()[e];
      if (t.getChild("icon").anim) {
        t.getChild("icon").anim.destroy();
        t.getChild("icon").anim = null;
      }
      r_ResSystem.ResSystem.loadBundleRes("game1", "secret/anim/nv_" + o.id, cc.Prefab, function (e, i) {
        if (t.getChild("icon").anim) {
          t.getChild("icon").anim.destroy();
          t.getChild("icon").anim = null;
        }
        if (i) {
          t.getChild("icon").anim = cc.instantiate(i);
          t.getChild("icon").node.addChild(t.getChild("icon").anim);
          t.getChild("icon").anim.scale = .9;
          var n = r_SecretUpSystem.SecretUpSystem.getSkinId(o.id);
          t.getChild("icon").anim.getComponent(sp.Skeleton).setAnimation(0, "idel" + n, true);
        }
      });
    } else {
      t.getChild("icon").visible = false;
    }
  };
  _ctor.prototype.onHeadListRenderer = function (e, t) {
    var o = this;
    this.itemHeadList[e] = t;
    t.name = "headItem" + e;
    t.onClick(function () {
      var e = parseInt(t.name.replace("headItem", ""));
      o.gotoPage(e);
    });
    var i = r_SecretUpSystem.SecretUpSystem.getSecretList()[e];
    if (this.list.scrollPane.currentPageX == e) {
      t.getController("c1").selectedIndex = 1;
    } else {
      t.getController("c1").selectedIndex = 0;
    }
    t.getChild("icon").url = "ui://SecretUp/icon" + i.id;
  };
  _ctor.prototype.onClickLeft = function () {
    var e = this;
    var t = this.list.scrollPane.currentPageX + 1;
    if (!(t <= 1)) {
      this.listHead.scrollToView(t - 2, true);
      this.list.scrollToView(t - 2, true);
      this.rewardList.enabled = false;
      r_TimeSystem.TimeSystem.schedule("scrollToView", .5, function () {
        e.rewardList.enabled = true;
      });
      if (1 == r_SecretUpSystem.SecretUpSystem.getSecretList()[this.list.scrollPane.currentPageX].skinId) {
        this.onClickStyle();
      } else {
        this.onClickStyle1();
      }
    }
  };
  _ctor.prototype.onClickRight = function () {
    var e = this;
    var t = this.list.scrollPane.currentPageX + 1;
    if (!(t >= this.curMaxIndex)) {
      this.listHead.scrollToView(t, true);
      this.list.scrollToView(t, true);
      this.rewardList.enabled = false;
      r_TimeSystem.TimeSystem.schedule("scrollToView", .5, function () {
        e.rewardList.enabled = true;
      });
      if (1 == r_SecretUpSystem.SecretUpSystem.getSecretList()[this.list.scrollPane.currentPageX].skinId) {
        this.onClickStyle();
      } else {
        this.onClickStyle1();
      }
    }
  };
  _ctor.prototype.gotoPage = function (e) {
    var t = this;
    this.listHead.scrollPane.currentPageX = e;
    this.listHead.scrollToView(e, true);
    this.list.scrollToView(e, true);
    this.rewardList.enabled = false;
    r_TimeSystem.TimeSystem.schedule("scrollToView", .5, function () {
      t.rewardList.enabled = true;
    });
  };
  _ctor.prototype.onClickStyle = function () {
    this.btnStyle.getController("c1").selectedIndex = 0;
    this.btnStyle1.getController("c1").selectedIndex = 1;
    var e = this.list.scrollPane.currentPageX;
    var t = this.itemList[e];
    t.getController("c1").selectedIndex = 0;
    var o = r_SecretUpSystem.SecretUpSystem.getSecretList()[e];
    if (t.getChild("icon").anim) {
      t.getChild("icon").anim.destroy();
      t.getChild("icon").anim = null;
    }
    r_ResSystem.ResSystem.loadBundleRes("game1", "secret/anim/nv_" + o.id, cc.Prefab, function (e, i) {
      if (t.getChild("icon").anim) {
        t.getChild("icon").anim.destroy();
        t.getChild("icon").anim = null;
      }
      if (i) {
        t.getChild("icon").anim = cc.instantiate(i);
        t.getChild("icon").node.addChild(t.getChild("icon").anim);
        t.getChild("icon").anim.scale = .9;
        var n = o.id >= 19 ? 5 : 4;
        t.getChild("icon").anim.getComponent(sp.Skeleton).setAnimation(0, o.equipNum >= 2 ? "idel" + n : "idel1", true);
        r_SecretUpSystem.SecretUpSystem.changeSkin(o.id, 1);
      }
    });
  };
  _ctor.prototype.onClickStyle1 = function () {
    var e = this.list.scrollPane.currentPageX;
    var t = this.itemList[e];
    t.getController("c1").selectedIndex = 0;
    var o = r_SecretUpSystem.SecretUpSystem.getSecretList()[e];
    if (!o.isBreak) {
      this.btnStyle.getController("c1").selectedIndex = 0;
      this.btnStyle1.getController("c1").selectedIndex = 1;
      return void r_ResSystem.ResSystem.loadBundleRes("game1", "secret/anim/nv_" + o.id, cc.Prefab, function (e, o) {
        if (t.getChild("icon").anim) {
          t.getChild("icon").anim.destroy();
          t.getChild("icon").anim = null;
        }
        if (o) {
          t.getChild("icon").anim = cc.instantiate(o);
          t.getChild("icon").node.addChild(t.getChild("icon").anim);
          t.getChild("icon").anim.scale = .9;
          t.getChild("icon").anim.getComponent(sp.Skeleton).setAnimation(0, "idel3", true);
          t.getController("c1").selectedIndex = 1;
        }
      });
    }
    this.btnStyle.getController("c1").selectedIndex = 1;
    this.btnStyle1.getController("c1").selectedIndex = 0;
    if (t.getChild("icon").anim) {
      t.getChild("icon").anim.destroy();
      t.getChild("icon").anim = null;
    }
    r_ResSystem.ResSystem.loadBundleRes("game1", "secret/anim/nv_" + o.id, cc.Prefab, function (e, i) {
      if (t.getChild("icon").anim) {
        t.getChild("icon").anim.destroy();
        t.getChild("icon").anim = null;
      }
      if (i) {
        t.getChild("icon").anim = cc.instantiate(i);
        t.getChild("icon").node.addChild(t.getChild("icon").anim);
        t.getChild("icon").anim.scale = .9;
        t.getChild("icon").anim.getComponent(sp.Skeleton).setAnimation(0, "idel2", true);
        r_SecretUpSystem.SecretUpSystem.changeSkin(o.id, 2);
      }
    });
  };
  _ctor.prototype.onClickCodex = function () {
    r_SecretCodexUI.default.showUI();
  };
  _ctor.prototype.onClickGiftBack = function () {
    this.contentPane.getController("c1").selectedIndex = 1;
  };
  _ctor.prototype.onClickSend = function () {};
  _ctor.prototype.onClickUp = function () {
    var e = this;
    var t = this.list.scrollPane.currentPageX;
    var o = r_SecretUpSystem.SecretUpSystem.getSecretList()[t].id;
    var i = r_SecretUpSystem.SecretUpSystem.getUpCoin(o);
    if (r_SecretUpSystem.SecretUpSystem.checkMaxLevel(o)) {
      r_UtilsSystem.UtilsSystem.showTip("已经最高等级~");
    } else if (1 == this.btnUp.getController("c1").selectedIndex) {
      r_PlatformSystem.PlatformSystem.showVideo("秘书升级", function () {
        r_SecretUpSystem.SecretUpSystem.getSecretList()[t].level++;
        r_SecretUpSystem.SecretUpSystem.getSecretList()[t].level;
        e.refreshUpBtn(o);
      });
    } else if (r_PlayerData.PlayerData.isCoinEnough(i)) {
      r_SecretUpSystem.SecretUpSystem.getSecretList()[t].level++;
      r_SecretUpSystem.SecretUpSystem.getSecretList()[t].level;
      r_PlayerData.PlayerData.deleteCoin("秘书升级", i, r_ReportSystem.SystemKey.秘书);
      this.refreshUpBtn(o);
    } else {
      r_UtilsSystem.UtilsSystem.showTip("金币不足");
    }
  };
  _ctor.prototype.onClickGradeUp = function () {
    var e = this.list.scrollPane.currentPageX;
    var t = r_SecretUpSystem.SecretUpSystem.getSecretList()[e].id;
    r_SecretUpSystem.SecretUpSystem.getSecretList()[e].level;
    var o = r_SecretUpSystem.SecretUpSystem.getSecretUpInfo(t).stoneNum;
    if (r_PlayerData.PlayerData.isStoneEnough(o)) {
      r_PlayerData.PlayerData.deleteStone("秘书升级", o, r_ReportSystem.SystemKey.秘书);
      r_SecretUpSystem.SecretUpSystem.breakSecret(t);
      this.refreshUpBtn(t);
      this.onClickStyle1();
      r_UtilsSystem.UtilsSystem.showTip("秘书进阶成功！");
    } else {
      r_UtilsSystem.UtilsSystem.showTip("材料不足");
    }
  };
  _ctor.prototype.refreshPersonInfo = function () {
    var e = r_SecretUpSystem.SecretUpSystem.getSecretList()[this.list.scrollPane.currentPageX];
    if (e) {
      var o = r_SecretUpSystem.SecretUpSystem.getSecretCfgById(e.id);
      this.lbName.text = o.name;
      this.btnStyle1.getController("c1").selectedIndex = e.isBreak ? 0 : 1;
      if (!_ctor.talkMap[e.id]) {
        _ctor.talkMap[e.id] = true;
        this.showTalk(o.id, o.talk, "secretUp/秘书" + o.id);
      }
      var i = r_SecretUpSystem.SecretUpSystem.getLevelByFeel(e.id, e.feel);
      var n = i / 50 * 100;
      this.starPro.value = n;
      this.lbLevel.text = "Lv." + i;
      var a = r_SecretUpSystem.SecretUpSystem.getSecretUpInfo(e.id);
      var s = e.isBreak ? r_RoleCfg.BreakValue[r_SecretUpSystem.SecretUpSystem.getBreakTouchNum(e.id)] : a.autoTouch;
      this.lbAttack.text = s + "点击/秒";
      this.lbMaterial.text = r_PlayerData.PlayerData.data.stoneStr;
      this.contentPane.getChild("grade").asLoader.url = "ui://SecretUp/" + ["N", "R", "SR", "SSR", "UR"][r_SecretUpSystem.SecretUpSystem.getSecretCfgById(e.id).quality];
      if (r_SecretUpSystem.SecretUpSystem.checkMaxLevel(e.id) && !e.isBreak) {
        this.contentPane.getController("c1").selectedIndex = 2;
        var r = r_SecretUpSystem.SecretUpSystem.getSecretUpInfo(e.id);
        this.lbGradeUpNum.text = "X" + r.stoneNum;
      }
    }
  };
  _ctor.prototype.showTalk = function (e, t, o) {
    undefined === o && (o = null);
    if (!r_SecretUpGetUI.default.instance) {
      if (o) {
        this.lastSound && r_SoundMgr.SoundMgr.stopSound(this.lastSound);
        this.lastSound = o;
        r_SoundMgr.SoundMgr.playSound(this.lastSound);
      }
      var i = this.itemList[this.list.scrollPane.currentPageX];
      if (i) {
        i.getChild("talk").text = t;
        i.getController("mode").selectedIndex = 1;
        r_TimeSystem.TimeSystem.scheduleOnce("talk" + e, 3, function () {
          i.getController("mode").selectedIndex = 0;
        });
      }
    }
  };
  _ctor.prototype.refreshInfo = function () {
    var e = this.list.scrollPane.currentPageX;
    var t = r_SecretUpSystem.SecretUpSystem.getSecretList()[e].id;
    r_SecretUpSystem.SecretUpSystem.getSecretById(t);
    this.lbMaterial.text = r_PlayerData.PlayerData.data.stoneStr;
    this.refreshPersonInfo();
    this.refreshBtn();
    this.refreshUpBtn(t);
  };
  _ctor.prototype.refreshBtn = function () {
    var e = this.list.scrollPane.currentPageX + 1;
    this.btnLeft.visible = !(e <= 1);
    if (e >= this.curMaxIndex) {
      this.btnRight.visible = false;
    } else {
      this.btnRight.visible = true;
    }
  };
  _ctor.prototype.onClickbtnDebug = function () {
    r_Index.Platform.isDarenPlatform() && r_SecretUpDebugUI.default.showUI();
  };
  _ctor.prototype.onListRewardRenderer = function (e, t) {
    var o = this;
    var i = r_RoleCfg.SecretUpRewardCfg[e];
    t.getChild("name").text = i.name;
    t.getChild("num").text = r_UtilsSystem.UtilsSystem.getShowCoin(i.coin);
    r_ResSystem.ResSystem.loadBundleFguiImg(t.getChild("icon"), "game1", "secret/reward/rewardIcon" + i.id);
    if (i.video) {
      t.getChild("video").visible = true;
      t.getChild("num").text = "免费";
    } else {
      t.getChild("video").visible = false;
    }
    var n = function () {
      r_SoundMgr.SoundMgr.playSound("click");
      r_UtilsSystem.UtilsSystem.showSecretTip("好感度+" + i.feel);
      var e = r_SecretUpSystem.SecretUpSystem.getSecretList()[o.list.scrollPane.currentPageX];
      e.feel = e.feel + i.feel;
      r_TaskSystem.TaskSystem.addDayTaskValue(r_TaskCfg.TaskDayType.秘书升级);
      o.refreshPersonInfo();
      if (i.isAddEquip) {
        r_SecretUpSystem.SecretUpSystem.addEquipNum(e.id);
        e = r_SecretUpSystem.SecretUpSystem.getSecretList()[o.list.scrollPane.currentPageX];
        var n = o.list.scrollPane.currentPageX;
        var a = o.itemList[n];
        var s = r_SecretUpSystem.SecretUpSystem.getSecretById(e.id).skinId;
        r_TimeSystem.TimeSystem.scheduleClear("huanzhuang");
        r_SoundMgr.SoundMgr.playSound("secretUp/这件衣服好看吗");
        if (1 == e.equipNum && 1 == s) {
          var r = e.id >= 19 ? 5 : 4;
          a.getChild("icon").anim.getComponent(sp.Skeleton).setAnimation(0, "idel" + r, true);
          r_TimeSystem.TimeSystem.scheduleOnce("huanzhuang", 3, function () {
            a.getChild("icon").anim.getComponent(sp.Skeleton).setAnimation(0, "idel" + s, true);
            r_UtilsSystem.UtilsSystem.showTipTrash("再赠送一次衣服后永久解锁此皮肤");
          });
        } else if (e.equipNum >= 2) {
          2 == e.equipNum && r_UtilsSystem.UtilsSystem.showTipTrash("已永久解锁此皮肤");
          o.refreshList();
        }
      }
      if (i.anim) {
        r_ResSystem.ResSystem.loadBundleRes("game1", i.anim, cc.Prefab, function (e, t) {
          var n = cc.instantiate(t);
          o.contentPane.getChild("flyDes").node.addChild(n);
          n.x = "aixin" != n.name ? -50 : n.x;
          var a = n.getComponent(sp.Skeleton).setAnimation(0, "animation", false);
          n.getComponent(sp.Skeleton).setTrackCompleteListener(a, function () {
            n.destroy();
          });
          o.showTalk(100, i.isAddEquip ? "老板，我穿这个好看吗？" : "谢谢老板~ 爱你哟~", i.isAddEquip ? null : "secretUp/秘书100");
        });
      } else {
        var l = new cc.Node();
        var h = l.addComponent(cc.Sprite);
        h.type = cc.Sprite.Type.SIMPLE;
        h.sizeMode = cc.Sprite.SizeMode.RAW;
        l.width = 114;
        l.height = 114;
        r_ResSystem.ResSystem.loadBundleUIImg(l, "game1", "secret/reward/rewardIcon" + i.id);
        o.contentPane.getChild("flyDes").node.addChild(l);
        var d = t.getChild("icon").node.convertToWorldSpaceAR(cc.Vec2.ZERO);
        var f = l.parent.convertToNodeSpaceAR(d);
        l.x = f.x;
        l.y = f.y;
        d = o.contentPane.getChild("flyDes").node.convertToWorldSpaceAR(cc.Vec2.ZERO);
        f = l.parent.convertToNodeSpaceAR(d);
        l.scale = .2;
        o.m_gifts.push(l);
        cc.tween(l).to(.2, {
          x: 0,
          y: 0,
          scale: 1
        }).delay(.5).to(.5, {
          x: f.x,
          y: f.y,
          scale: 0
        }).call(function () {
          o.m_gifts.splice(o.m_gifts.indexOf(l), 1);
          l.destroy();
        }).start();
      }
    };
    t.clearClick();
    t.onClick(function () {
      if (i.video) {
        r_PlatformSystem.PlatformSystem.showVideo("秘书刷礼物", function () {
          n();
        });
      } else {
        if (!r_PlayerData.PlayerData.isCoinEnough(i.coin)) {
          return void r_UtilsSystem.UtilsSystem.showTip("金币不足");
        }
        r_PlayerData.PlayerData.deleteCoin("秘书送礼物", i.coin, r_ReportSystem.SystemKey.秘书, true);
        n();
      }
    }, this);
  };
  _ctor.prototype.onClickDate = function () {
    var e = this.list.scrollPane.currentPageX;
    var t = r_SecretUpSystem.SecretUpSystem.getSecretList()[e];
    if (r_SecretUpSystem.SecretUpSystem.getLevelByFeel(t.id, t.feel) < 30) {
      r_UtilsSystem.UtilsSystem.showTip("30级后解锁约会玩法");
    } else {
      r_PlatformSystem.PlatformSystem.showVideo("约会秘书", function () {
        r_DatingUI.default.showUI({
          secretId: t.id
        });
      });
    }
  };
  _ctor.Inst = null;
  _ctor.talkMap = {};
  __decorate([r_DecorateFunction1.AutoFind("btnDebug")], _ctor.prototype, "btnDebug", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.SecretUpUI = exp_SecretUpUI;