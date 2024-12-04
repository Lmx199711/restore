Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameSystem = exports.DEF_EQUIP_ROUND_Y = exports.DEF_EQUIP_ROUND_X = exports.MOUSE_SENSITIVE = exports.GameMode = undefined;
var a;
var r_HangComponent = require("HangComponent");
var r_ItemComponent = require("ItemComponent");
var r_EquipRound = require("EquipRound");
var r_ShowOnPut = require("ShowOnPut");
var r_TouchEnable = require("TouchEnable");
var r_TouchEnbleMultipleTargets = require("TouchEnbleMultipleTargets");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_PlayerData = require("PlayerData");
var r_PlatformSystem = require("PlatformSystem");
var r_GamingUI = require("GamingUI");
var r_TimeSystem = require("TimeSystem");
var r_SoundMgr = require("SoundMgr");
var r_WinShowComponent = require("WinShowComponent");
var r_UtilsSystem = require("UtilsSystem");
var r_CollectCreateCom = require("CollectCreateCom");
var r_ClickTriggerComponent = require("ClickTriggerComponent");
var r_ResSystem = require("ResSystem");
var r_CheckHasKeys = require("CheckHasKeys");
var r_CollectTouchCom = require("CollectTouchCom");
var r_RelaxSystem = require("RelaxSystem");
var r_ScanCodeShopping = require("ScanCodeShopping");
var r_City85UI = require("City85UI");
var r_SKUtilsSystem = require("SKUtilsSystem");
(function (e) {
  e[e.Normal = 1] = "Normal";
  e[e.Star = 2] = "Star";
  e[e.Word = 3] = "Word";
  e[e.Sheep = 4] = "Sheep";
})(a = exports.GameMode || (exports.GameMode = {}));
exports.MOUSE_SENSITIVE = 2;
exports.DEF_EQUIP_ROUND_X = 15;
exports.DEF_EQUIP_ROUND_Y = 15;
var w = function () {
  function e() {
    this.levelTimeList = {
      539: 200,
      621: 240,
      594: 180,
      563: 160,
      414: 220,
      546: 180,
      526: 250,
      541: 260,
      475: 220,
      557: 180,
      559: 75,
      543: 190,
      454: 250,
      514: 270,
      495: 210,
      490: 200,
      473: 120,
      463: 90,
      498: 180,
      474: 120,
      430: 200,
      417: 300,
      424: 300,
      443: 900,
      354: 240,
      307: 240,
      303: 300,
      249: 300,
      247: 210,
      244: 210,
      242: 270,
      205: 420,
      208: 400,
      197: 300,
      202: 280,
      198: 220,
      179: 240,
      126: 210,
      96: 180,
      85: 150,
      86: 150,
      87: 180,
      89: 150,
      98: 180,
      64: 300,
      47: 240,
      48: 360,
      39: 500,
      38: 480,
      40: 480,
      42: 480,
      36: 180,
      31: 180,
      7: 180,
      " 8": 240,
      6: 240,
      11: 240,
      13: 180,
      15: 180,
      16: 180,
      17: 180,
      167: 180,
      20: 180,
      22: 180,
      14: 180,
      21: 180,
      10: 180,
      24: 180,
      23: 180,
      26: 180,
      28: 180,
      19: 150,
      25: 150,
      43: 360,
      18: 180,
      51: 320,
      120: 270,
      132: 45,
      131: 60,
      149: 60,
      156: 60,
      150: 240,
      135: 240,
      134: 240,
      189: 230,
      191: 240,
      203: 240,
      218: 240,
      206: 240,
      220: 240,
      243: 240,
      254: 260,
      257: 260,
      255: 255,
      277: 245,
      284: 240,
      299: 720,
      302: 720,
      293: 260,
      305: 720,
      294: 260,
      309: 240,
      315: 240,
      324: 240,
      404: 180,
      441: 240,
      533: 90
    };
    this.defaultDelay = 2e3;
    this.levelWinDelay = {
      514: 2,
      479: 4,
      252: 3,
      242: 3,
      54: 8,
      " 61": 7,
      3: 3,
      4: 3,
      5: 3,
      6: 2,
      11: 2,
      44: 3,
      67: 3,
      441: 4,
      557: 1.5
    };
    this.levelRemindCount = {
      621: 2,
      380: 1,
      587: 3,
      586: 2,
      414: 1,
      567: 1,
      475: 1,
      557: 3,
      518: 1,
      536: 2,
      517: 1,
      522: 2,
      454: 2,
      514: 1,
      521: 2,
      495: 1,
      479: 1,
      502: 2,
      476: 2,
      493: 1,
      497: 1,
      455: 1,
      404: 1,
      413: 1,
      377: 1,
      349: 1,
      341: 1,
      336: 2,
      242: 1,
      197: 1,
      141: 1,
      108: 1,
      159: 3,
      167: 1,
      10: 2,
      25: 1,
      52: 3,
      74: 1,
      44: 1,
      78: 1,
      88: 1,
      104: 1,
      102: 1,
      139: 3,
      166: 1,
      182: 3,
      204: 1,
      203: 2,
      217: 1,
      218: 1,
      225: 1,
      293: 1,
      339: 1,
      333: 1,
      324: 1,
      332: 1
    };
    this.remindCount = 0;
    this.levelLogicMap = {};
    this.levelWinDelayMap = {
      621: 4,
      406: 4,
      404: 2,
      374: 5,
      121: 7,
      192: 5,
      324: 7,
      488: 2,
      482: 3,
      487: 5,
      536: 2,
      533: 3,
      414: 5,
      539: 4
    };
    this.levelZj = [1006, 1007, 1008, 1009, 1010];
    this.levelBgm = {
      414: "414bgm",
      526: "wulinwaizhuan",
      541: "541bgm",
      559: "559bgm",
      454: "454bgm",
      514: "514bgm",
      515: "514bgm",
      524: "bgm524",
      500: "bgm500",
      417: "raining",
      404: "ifwebroke",
      370: "ifwebroke",
      40: "qinghuaci",
      70: "bgm0",
      167: "nideyangzi",
      53: "campbgm",
      67: "BGM-Rain",
      74: "201bgm",
      104: "zhenhuanzhuan",
      109: "109bgm",
      118: "118bgm",
      139: "shengdanbgm",
      121: "shengdanbgm",
      108: "shengdanbgm",
      120: "gufengbgm",
      140: "140bgm",
      147: "shengdanbgm",
      157: "157bgm",
      151: "151bgm",
      168: "109bgm",
      123: "109bgm",
      203: "203bgm",
      224: "224bgm",
      210: "203bgm",
      237: "237bgm",
      252: "80years",
      254: "203bgm",
      257: "203bgm",
      251: "251bgm",
      339: "321BGM",
      321: "321BGM",
      325: "325bgm",
      348: "348bgm",
      354: "203bgm",
      467: "467bgm",
      521: "level521/521bgm",
      522: "203bgm",
      512: "512bgm1",
      525: "wulinwaizhuan",
      543: "wulinwaizhuan",
      538: "538bgm",
      540: "tutubgm",
      594: "538bgm",
      539: "538bgm"
    };
    this.noAssistGengLevel = [559, 541, 546, 621];
    this.findGengLevel = [93];
    this.findGengFont = null;
    this.btnTimeOffsetMap = {
      241: -300
    };
    this.ipadBtnTimeOffsetMap = {
      241: -300
    };
    this.btnHomeOffsetMap = {
      241: -300
    };
    this.ipadBtnHomeOffsetMap = {
      241: -300
    };
    this.btnNextOffsetMap = {
      242: -1e3
    };
    this.ipadBtnNextOffsetMap = {
      242: -1e3
    };
    this.conditionMap = {};
    this.randomZorderLevel = [100497];
    this.noTimeLimitLevels = [142, 133];
    this.levelStartScale = {
      12: .7
    };
    this.logicCptList = [];
    this.itemList = [];
    this.hangList = [];
    this.touchComList = [];
    this.levelObj = null;
    this.itemParent = null;
    this.maxZIndex = -1;
    this.lastLevelId = null;
    this.catTail = null;
    this.levelStartTime = 0;
    this.isFinishGame = true;
    this.isShowEverTimeUI = false;
    this.levelPassTime = 0;
    this.curLevelTime = 0;
    this.isPause = false;
    this.curGameMode = a.Normal;
    this.curScoreStar = 0;
    this.isLoseCountDown = false;
    this.levelLogicFinish = false;
    this.zjLevelAnswer = "";
    this.isShowedLoseTip = false;
    this.isShowedAddTimeUI = false;
    this.sheepLevelList = [138, 141];
    this.collectCreateCom = null;
    this.maxScale = 1.3;
    this.minScale = .7;
    this.windowDesignWidth = 1334;
    this.windowDesignHeight = 750;
    this.canDragBg = false;
    this.hasItemParent = false;
    this.isShowAddTime = true;
    this.moveMax = 5;
    this.bundleLevelDelta = 5;
    this.manyHangList = [];
    this.manyItemList = [];
    this.mouseIsMove = false;
    this.selectInitPosX = 0;
    this.selectInitPosY = 0;
  }
  e.prototype.init = function () {
    this.initUI();
    r_TimeSystem.TimeSystem.registUpdate("GameSystemUpdate", this.update.bind(this));
  };
  e.prototype.update = function (e) {
    if (!(exports.GameSystem.isFinishGame || exports.GameSystem.isPause)) {
      e > .1 && (e = .016);
      exports.GameSystem.levelPassTime = exports.GameSystem.levelPassTime + e;
      if (-1 == exports.GameSystem.noTimeLimitLevels.indexOf(exports.GameSystem.lastLevelId) && !exports.GameSystem.isSheepLevel(exports.GameSystem.lastLevelId) && exports.GameSystem.curGameMode != a.Word && exports.GameSystem.curLevelTime && exports.GameSystem.levelPassTime >= exports.GameSystem.curLevelTime - 5) {
        this.showPreLoseTip();
        exports.GameSystem.levelPassTime >= exports.GameSystem.curLevelTime - 3.5 && this.showAddTimeUI();
        if (exports.GameSystem.levelPassTime >= exports.GameSystem.curLevelTime) {
          if (exports.GameSystem.curLevelLogic && exports.GameSystem.curLevelLogic.loseAnim) {
            exports.GameSystem.curLevelLogic.loseAnim();
          } else {
            exports.GameSystem.loseAnim();
          }
        }
      }
      this.curLevelLogic && this.curLevelLogic.update && this.curLevelLogic.update(e);
    }
  };
  e.prototype.isSheepLevel = function (e) {
    return -1 != exports.GameSystem.sheepLevelList.indexOf(e);
  };
  e.prototype.setGameMode = function (e) {
    this.curGameMode = e;
  };
  e.prototype.startCountLose = function (e) {
    this.loseAnimList = e;
  };
  e.prototype.initUI = function () {
    this.uiHideRoot = new fgui.GComponent();
    fgui.GRoot.inst.addChild(this.uiHideRoot);
    this.uiHideRoot.active = false;
    this.uiHideRoot.visible = false;
    this.uiTopRoot = new fgui.GComponent();
    this.uiTopRoot.node.zIndex = this.uiTopRoot.sortingOrder = 99;
    fgui.GRoot.inst.addChild(this.uiTopRoot);
    var e = cc.director.getScene();
    this.blockTouchBg = e.getChildByName("blockTouchBg");
    this.blockTouchBg.active = false;
    this.blockTouchBg.zIndex = 9999;
    this.blockTouchBg.on(cc.Node.EventType.TOUCH_START, function () {
      console.log("屏蔽所有点击事件");
    });
  };
  e.prototype.blockAllTouch = function (e) {
    this.blockTouchBg.active = e;
  };
  e.prototype.loadCatTail = function () {
    var e = this;
    r_ResSystem.ResSystem.loadBundleRes("resources1", "catTail", cc.Prefab, function (t, o) {
      e.catTail = cc.instantiate(o);
      cc.director.getScene().addChild(e.catTail);
      e.catTail.x = cc.winSize.width / 2;
      e.catTail.y = cc.winSize.height + 90;
      e.catTail.active = false;
    });
  };
  e.prototype.restartLevel = function (e) {
    this.startLevel(this.lastLevelId, e);
  };
  e.prototype.restartWordLevel = function (e) {
    exports.GameSystem.clearLevel(true);
    this.startLevel(this.lastLevelId, e);
  };
  e.prototype.getLevelBundleName = function () {
    return "storage1";
  };
  e.prototype.preloadLevel = function (e, t) {
    if (e) {
      cc.log("预加载关卡资源levelId=", e);
      r_ResSystem.ResSystem.loadBundleRes(this.getLevelBundleName(), "level" + e, cc.Prefab, function (e) {
        t && t(e);
      });
    } else {
      t && t();
    }
  };
  e.prototype.startLevel = function (e, t) {
    var i = this;
    console.log("当前关卡:", e);
    this.curGameMode = a.Normal;
    r_PlayerData.PlayerData.data.addTimeCount = 0;
    this.collectCreateCom = null;
    this.levelLogicFinish = true;
    this.lastLevelId = e;
    this.remindCount = this.levelRemindCount[this.lastLevelId];
    null == this.remindCount && (this.remindCount = 0);
    var n = this.levelTimeList[this.lastLevelId];
    n = n ? parseInt(n) : 230;
    if (this.findGengLevel.indexOf(e) < 0) {
      var s = this.levelBgm[this.lastLevelId];
      if ("" == s) {
        r_SoundMgr.SoundMgr.stopMusic();
      } else if (s) {
        r_SoundMgr.SoundMgr.playMusic(s);
      } else {
        r_SoundMgr.SoundMgr.playMusic("bgm");
      }
    }
    exports.GameSystem.levelPassTime = 0;
    exports.GameSystem.isFinishGame = false;
    exports.GameSystem.isLoseCountDown = false;
    exports.GameSystem.zjLevelAnswer = "";
    exports.GameSystem.isShowedLoseTip = false;
    exports.GameSystem.isShowedAddTimeUI = false;
    exports.GameSystem.hasItemParent = false;
    cc.log("当前关卡:zjLevelAnswer", exports.GameSystem.zjLevelAnswer);
    this.curLevelTime = n;
    var r = "levels/level" + e;
    var c = this.getLevelBundleName();
    var l = r_ResSystem.ResSystem.bundleMap[c];
    var u = null;
    l && (u = l.get(r, cc.Prefab));
    if (u) {
      this.loadLevelSuccess(u);
      t && t();
    } else {
      r_ResSystem.ResSystem.loadBundleRes(c, "level" + e, cc.Prefab, function (e, o) {
        i.loadLevelSuccess(o);
        t && t();
      });
    }
  };
  e.prototype.loadLevelSuccess = function (e) {
    this.levelObj && this.clearLevel();
    r_UtilsSystem.UtilsSystem.showLoading(false);
    r_City85UI.default.hide();
    this.isFinishGame = false;
    this.prefabRes = e;
    var t = cc.instantiate(e);
    this.levelObj = t;
    this.itemParent = this.levelObj.getChildByName("itemParent");
    var i = cc.director.getScene();
    exports.GameSystem.conditionMap = {};
    i.getChildByName("Canvas").addChild(t);
    t.x = 0;
    t.y = 0;
    this.levelStartTime = r_TimeSystem.TimeSystem.getServerTime();
    this.initItems();
    this.registTouch();
    this.loseAnimList = this.moveList;
    this.playEnterAnim(this.moveList);
    this.curLevelLogic = r_RelaxLevelLogicSystem.RelaxLevelLogicSystem;
    this.curLevelLogic.loadLevelSuccess(t);
  };
  e.prototype.disruptionAllItem = function (e, t) {
    for (var o = 0; o < this.itemList.length; o++) {
      var i = this.itemList[o];
      i.getComponent(r_ItemComponent.default);
      if (i.active) {
        i.curHang = null;
        var n = e.convertToWorldSpaceAR(cc.Vec2.ZERO);
        var a = n.x + Math.random() * e.width - e.width / 2;
        var c = n.y + Math.random() * e.height - e.height / 2;
        var l = new cc.Vec2(a, c);
        var u = i.parent.convertToNodeSpaceAR(l);
        cc.tween(i).to(t, {
          position: u
        }).start();
        for (var h = 0; h < this.hangList.length; h++) {
          var p = this.hangList[h].getComponent(r_HangComponent.default);
          for (var d = 0; d < p.curItemList.length; d++) {
            p.curItemList[d] != i || (p.curItemList = []);
          }
        }
      }
    }
  };
  e.prototype.isHaveMoveItem = function () {
    if (this.isFinishItems() && this.logicCptList.length > 0) {
      for (var e = 0; e < this.logicCptList.length; e++) {
        this.logicCptList[e].getComponent(r_WinShowComponent.default);
      }
      this.logicCptList.length;
    } else {
      for (e = 0; e < this.itemList.length; e++) {
        var t = this.itemList[e];
        var o = t.getComponent(r_ItemComponent.default);
        if (t.active && !t.curHang && -1 == this.manyItemList.indexOf(t) && (0 != o.itemId || 0 != o.equipId)) {
          return;
        }
      }
    }
  };
  e.prototype.initmanyList = function () {
    this.manyHangList = [];
    this.manyItemList = [];
  };
  e.prototype.assistPut = function (e) {
    undefined === e && (e = false);
    console.log("最后的逻辑", this.logicCptList.length);
    if (this.isFinishItems()) {
      console.log(1);
      for (var t = 0; t < this.logicCptList.length; t++) {
        if (!this.logicCptList[t].getComponent(r_WinShowComponent.default) && this.tip) {
          console.log(2);
          var o = cc.instantiate(this.tip);
          o.parent = this.logicCptList[t].node.parent;
          o.position = this.logicCptList[t].node.position;
          o.zIndex = 999999;
          if (this.logicCptList[t].node.width > this.logicCptList[t].node.height) {
            this.logicCptList[t].node.height / o.height > 1 && (o.scale = this.logicCptList[t].node.height / o.height);
          } else {
            this.logicCptList[t].node.width / o.width > 1 && (o.scale = this.logicCptList[t].node.width / o.width);
          }
          console.log("tip", o.position);
          console.log("this.logicCptList[i]", this.logicCptList[t].name);
          r_UtilsSystem.UtilsSystem.showTip("请点击红圈");
        }
      }
    } else {
      var i = this.moveMax;
      var n = [];
      if (this.itemList) {
        for (t = 0; t < this.itemList.length; t++) {
          var a = this.itemList[t];
          if (a.active && !a.curHang && -1 == this.manyItemList.indexOf(a)) {
            var c = a.getComponent(r_ItemComponent.default);
            if (c.equipId && (console.log("equipItem", c.equipItem), c.equipItem)) {
              console.log("equipItem", c.equipItem);
              continue;
            }
            console.log("putList");
            n.push(a);
          }
        }
        n.length > 0 && r_UtilsSystem.UtilsSystem.shuffle(n);
        var l = function (t) {
          if (0 == i) {
            return {
              value: undefined
            };
          }
          var o = n[t];
          var a = o.getComponent(r_ItemComponent.default);
          if (0 == a.itemId && 0 != a.equipId) {
            console.log("执行equipID");
            for (var c = 0; c < u.itemList.length; c++) {
              var l = u.itemList[c];
              var h = u.itemList[c].getComponent(r_ItemComponent.default);
              if (h.equipIdList.length > 0 && -1 != h.equipIdList.indexOf(a.equipId)) {
                console.log("item------->", o.name, "eq-------->", l.name, l.active);
                if (o.position.x != l.position.x && o.position.y != l.position.y && l.active) {
                  cc.tween(o).to(.15, {
                    position: l.position
                  }).call(function () {
                    cc.tween(o).to(.1, {
                      angle: 0,
                      scale: 1.4
                    }).start();
                  }).start();
                  i--;
                  u.manyItemList.push(o);
                }
                break;
              }
            }
          } else {
            console.log("执行ItemID");
            for (var p = 0; p < u.hangList.length; p++) {
              var d = u.hangList[p];
              var y = d.getComponent(r_HangComponent.default).itemIdList;
              if (y.length > 0) {
                if (-1 != y.indexOf(o.getComponent(r_ItemComponent.default).itemId) && -1 == u.manyHangList.indexOf(d)) {
                  console.log("itemId = hangID");
                  if (o.position.x != d.position.x && o.position.y != d.position.y) {
                    console.log("item的位置没有在对应位置，可以移动");
                    if (y.length > 1) {
                      u.manyHangList.push(d);
                      u.manyItemList.push(o);
                      console.log("剔除的个数为：", u.manyHangList.length);
                    }
                    cc.tween(o).to(.15, {
                      position: d.position
                    }).call(function () {
                      cc.tween(o).to(.1, {
                        angle: 0,
                        scale: 1.4
                      }).start();
                    }).start();
                    i--;
                  } else if (e && 1.6 != o.scale) {
                    console.log("放大");
                    cc.tween(o).to(.1, {
                      scale: 1.6
                    }).start();
                    i--;
                  }
                  break;
                }
                -1 != y.indexOf(o.getComponent(r_ItemComponent.default).itemId) && console.log("找到了对应的hang，但是hang点已经被占用，", d.name);
              }
            }
          }
        };
        var u = this;
        for (t = 0; t < n.length; t++) {
          var h = l(t);
          if ("object" == typeof h) {
            return h.value;
          }
        }
        i != this.moveMax || e || this.assistPut(true);
        this.isHaveMoveItem();
      } else {
        console.log(3);
      }
    }
  };
  e.prototype.initItems = function () {
    var e;
    var t = this;
    var o = 1;
    this.levelStartScale[this.lastLevelId] && (o = this.levelStartScale[this.lastLevelId]);
    e = this.hasItemParent ? this.itemParent : this.levelObj;
    this.levelNode = e;
    this.logicCptList = [];
    this.itemList = [];
    this.hangList = [];
    this.touchComList = [];
    this.maxZIndex = -1;
    var i = false;
    var n = null;
    this.moveList = [];
    var a = [];
    var c = function (e) {
      for (var o = 0; o < e.children.length; o++) {
        var i = e.children[o];
        var n = i.getComponent(r_ItemComponent.default);
        n && a.push(n.itemId + 200);
        var s = i.getComponent(r_TouchEnable.default);
        s && s.needCheckFinish && t.logicCptList.push(s);
        var l = i.getComponent(r_TouchEnbleMultipleTargets.TouchEnbleMultipleTargets);
        l && l.isLastStep && t.logicCptList.push(l);
        var p = i.getComponent(r_WinShowComponent.default);
        p && t.logicCptList.push(p);
        var d = i.getComponent(r_CollectTouchCom.default);
        d && t.touchComList.push(d);
        c(i);
      }
    };
    c(e);
    this.randomZorderLevel.indexOf(this.lastLevelId) > -1 && r_SKUtilsSystem.SKUtilsSystem.shuffle(a);
    var l = function (e) {
      if (e.getComponent(r_ItemComponent.default)) {
        t.itemList.push(e);
        e.zIndex = a[p];
        p += 1;
        t.maxZIndex < e.zIndex && (t.maxZIndex = e.zIndex);
        e.scale = o;
        e.startScale = o;
        e.startX = e.x;
        e.startY = e.y;
        e.startParent = e.parent;
        e.startAngle = e.angle;
        e.startZIndex = e.zIndex + 200;
        var i = new cc.Node("colliderChild");
        e.addChild(i);
        e.colliderChild = i;
        i.addComponent(cc.PolygonCollider).points = [new cc.Vec2(-e.anchorX * e.width, -e.anchorY * e.height), new cc.Vec2(-e.anchorX * e.width, (1 - e.anchorY) * e.height), new cc.Vec2((1 - e.anchorX) * e.width, (1 - e.anchorY) * e.height), new cc.Vec2((1 - e.anchorX) * e.width, -e.anchorY * e.height)];
        e.getComponent(cc.PolygonCollider) || console.error("没配置PolygonCollider=", e.name);
      }
      e.getComponent(r_HangComponent.default) && t.hangList.push(e);
      for (var n = 0; n < e.children.length; n++) {
        l(e.children[n]);
      }
    };
    var p = 0;
    var d = function (o) {
      var a = e.children[o];
      -1 == a.name.indexOf("bigBg") && -1 == a.name.indexOf("bg") && y.moveList.push(a);
      l(a);
      var s = a.getComponent(cc.Button);
      if (s && !a.getComponent(r_ClickTriggerComponent.default)) {
        var c = a.getComponent(r_CollectCreateCom.default);
        if (c) {
          y.collectCreateCom = c;
          y.collectCreateCom.init();
        }
        i = true;
        n = a;
        var u = [];
        for (var h = 0; h < y.itemList.length; h++) {
          var p = y.itemList[h];
          var d = p.getComponent(r_ItemComponent.default);
          if (d.createByBtn) {
            if (d && d.isRandomAngle) {
              var f = r_UtilsSystem.UtilsSystem.getRandomNum(1, 2);
              var v = r_UtilsSystem.UtilsSystem.getRandomNum(20, 30);
              p.startAngle = 1 == f ? v : -v;
              p.angle = p.startAngle;
            }
            u.push(p);
          }
        }
        r_SKUtilsSystem.SKUtilsSystem.shuffle(u);
        c || a.on(cc.Node.EventType.TOUCH_START, function () {
          console.log("pc77 TOUCH_START");
          r_SoundMgr.SoundMgr.playSound("click");
          var e = function (e) {
            var o = u[e];
            if (o.active || o.isCreateBtn) {
              return "continue";
            }
            var i = s.node.y;
            var a = o.startY;
            o.active = true;
            o.isCreateBtn = true;
            t.isHaveMoveItem();
            r_TimeSystem.TimeSystem.timeMapUpdate("itemAnim" + o.getComponent(r_ItemComponent.default).itemId, .5, function (e) {
              o.y = i + (a - i) * e;
            });
            e == u.length - 1 && (n.active = false);
            return {
              value: undefined
            };
          };
          for (var o = 0; o < u.length; o++) {
            var i = e(o);
            if ("object" == typeof i) {
              return i.value;
            }
          }
        });
      }
    };
    var y = this;
    for (var f = 0; f < e.children.length; f++) {
      d(f);
    }
    if (i) {
      for (f = 0; f < this.itemList.length; f++) {
        this.itemList[f].getComponent(r_ItemComponent.default).createByBtn && (this.itemList[f].active = false);
      }
    }
  };
  e.prototype.setHangList = function (e, t, o) {
    undefined === o && (o = true);
    for (var i = 0; i < t.children.length; i++) {
      var n = t.children[i];
      n.getComponent(r_HangComponent.default) && e.push(n);
      n.children.length > 0 && this.setHangList(e, n, o);
    }
  };
  e.prototype.playEnterAnim = function (e) {
    var t = function (t) {
      var o = e[t];
      if (!o.active) {
        return "continue";
      }
      o.recStartY = o.y;
      o.y = o.recStartY - 750;
      o.isMove = true;
      cc.tween(o).delay(.5).to(1, {
        position: cc.v2(o.x, o.recStartY)
      }, {
        easing: "backOut"
      }).call(function () {
        o.isMove = false;
      }).start();
    };
    for (var o = 0; o < e.length; o++) {
      t(o);
    }
  };
  e.prototype.showPreLoseTip = function () {
    if (!exports.GameSystem.isShowedLoseTip) {
      exports.GameSystem.isShowedLoseTip = true;
      r_GamingUI.GamingUI.Inst && (r_GamingUI.GamingUI.Inst.miao.visible = true);
      r_SoundMgr.SoundMgr.playSound("wang");
      r_TimeSystem.TimeSystem.scheduleOnce("GameLoseTime1", 1, function () {
        r_GamingUI.GamingUI.Inst && (r_GamingUI.GamingUI.Inst.miao.visible = false);
      });
    }
  };
  e.prototype.showAddTimeUI = function () {
    if (!exports.GameSystem.isShowedAddTimeUI) {
      exports.GameSystem.isShowedAddTimeUI = true;
      exports.GameSystem.isPause = true;
    }
  };
  e.prototype.loseAnim = function (e) {
    var t = this;
    undefined === e && (e = 5);
    exports.GameSystem.isFinishGame = true;
    var a = function () {
      return __awaiter(t, undefined, undefined, function () {
        return __generator(this, function () {
          this.catTail && (this.catTail.active = false);
          this.lose();
          return [2];
        });
      });
    };
    if (this.catTail) {
      var s = this.catTail;
      s.active = true;
      s.getComponent(sp.Skeleton).setAnimation(0, "animation", false);
      var r = s.getComponent(sp.Skeleton).getCurrent(0);
      s.getComponent(sp.Skeleton).setTrackCompleteListener(r, a);
      r_SoundMgr.SoundMgr.playSound("fall");
      var c = this.loseAnimList;
      c && r_TimeSystem.TimeSystem.scheduleOnce("GameLoseTime", .2, function () {
        for (var e = 0; e < c.length; e++) {
          if (!cc.isValid(c[e])) {
            return;
          }
          !c[e].isDrop && c[e].animStartX && (c[e].animStartX = c[e].x);
        }
        r_TimeSystem.TimeSystem.timeMapUpdate("gameLoseAnim", .5, function (e) {
          for (var t = 0; t < c.length; t++) {
            if (!cc.isValid(c[t])) {
              return;
            }
            c[t].isDrop || (c[t].x = c[t].animStartX + cc.winSize.width * e);
          }
        });
      });
    } else {
      a();
    }
  };
  e.prototype.lose = function () {
    exports.GameSystem.curGameMode != a.Word && r_SoundMgr.SoundMgr.playMusic("bgm");
    exports.GameSystem.isFinishGame = true;
    r_RelaxSystem.RelaxSystem.lose();
    exports.GameSystem.curGameMode;
    a.Word;
  };
  e.prototype.unregistTouch = function () {
    var e = cc.director.getScene().getChildByName("Canvas").getChildByName("touchBg");
    e.off(cc.Node.EventType.TOUCH_START);
    e.off(cc.Node.EventType.TOUCH_MOVE);
    e.off(cc.Node.EventType.TOUCH_END);
  };
  e.prototype.pointInPolygon = function (e, t) {
    var o = e.getComponent(cc.PolygonCollider);
    var i = e.convertToNodeSpaceAR(t);
    return o && cc.Intersection.pointInPolygon(i, o.points);
  };
  e.prototype.touchStart = function (e) {
    var t = this;
    this.isHaveMoveItem();
    this.touchBeginPos = e.getLocation();
    var o = [];
    for (var i = 0; i < this.itemList.length; i++) {
      var n = this.itemList[i];
      n.getComponent(r_ItemComponent.default).putCannotTouch && n.curHang || n.active && this.pointInPolygon(n, this.touchBeginPos) && o.push(n);
    }
    o.length > 1 && o.sort(function (e, o) {
      if (e.colliderChild && o.colliderChild) {
        var i = false;
        var n = false;
        var a = e.colliderChild.convertToNodeSpaceAR(t.touchBeginPos);
        var s = e.colliderChild.getComponent(cc.PolygonCollider);
        cc.Intersection.pointInPolygon(a, s.points) && (i = true);
        var r = o.colliderChild.convertToNodeSpaceAR(t.touchBeginPos);
        var c = o.colliderChild.getComponent(cc.PolygonCollider);
        cc.Intersection.pointInPolygon(r, c.points) && (n = true);
        if (i && !n) {
          return -1;
        }
        if (!i && n) {
          return 1;
        }
      }
      return o.zIndex - e.zIndex;
    });
    o.length > 0 && (this.selectItem = o[0]);
    if (this.selectItem) {
      this.selectItem.lastHang = null;
      var a = this.selectItem.getComponent(r_ItemComponent.default);
      a.equipId && a.equipItem && !a.isTool && (this.selectItem = a.equipItem);
      if (this.selectItem.curHang) {
        var c = this.selectItem.curHang.getComponent(r_HangComponent.default);
        for (i = 0; i < c.curItemList.length; i++) {
          if (c.curItemList[i] == this.selectItem) {
            c.curItemList.splice(i, 1);
            break;
          }
        }
        for (i = 0; i < c.curItemList; i++) {
          c.curItemList[i].zIndex = c.zorder + i;
        }
        this.selectItem.lastHang = this.selectItem.curHang;
        this.selectItem.curHang = null;
      }
      this.selectItem.oldParent = this.selectItem.parent;
      r_UtilsSystem.UtilsSystem.changeParent(this.selectItem, this.levelNode);
      this.selectInitPosX = this.selectItem.x;
      this.selectInitPosY = this.selectItem.y;
      cc.tween(this.selectItem).to(.1, {
        angle: 0,
        scale: 1.2
      }).start();
      this.selectItem.zIndex = this.maxZIndex + 1;
      this.maxZIndex = this.selectItem.zIndex;
      this.selectItem.isMove = true;
      r_SoundMgr.SoundMgr.playSound("getItem");
      a.changePic(false);
      a.triggerGetAction();
    }
    for (i = 0; i < this.touchComList.length; i++) {
      this.touchComList[i].touchBegin(e, this.selectItem);
    }
  };
  e.prototype.touchMove = function (e) {
    for (var t = 0; t < this.touchComList.length; t++) {
      this.touchComList[t].touchMove(e, this.selectItem);
    }
    if (this.selectItem) {
      var i = e.getLocation();
      var n = 1;
      this.itemParent && (n = this.itemParent.scale);
      var a = (i.x - this.touchBeginPos.x) / n;
      var s = (i.y - this.touchBeginPos.y) / n;
      if (Math.sqrt(a * a + s * s) > exports.MOUSE_SENSITIVE) {
        if (this.mouseIsMove) {
          this.drag(e, a, s);
        } else {
          this.mouseIsMove = true;
          this.dragStart(e);
        }
      }
      r_ScanCodeShopping.default.Inst && r_ScanCodeShopping.default.Inst.isShowShopping(this.selectItem);
    } else if (this.hasItemParent && this.canDragBg) {
      var r = e.getDelta();
      var c = this.itemParent.x;
      var l = this.itemParent.y;
      c += r.x;
      l += r.y;
      var u = this.itemParent.scale - this.minScale + .2;
      this.scaleUpdatePos(c, l, u);
    }
  };
  e.prototype.touchEnd = function (e) {
    for (var t = 0; t < this.touchComList.length; t++) {
      this.touchComList[t].touchEnd(e, this.selectItem);
    }
    if (this.selectItem) {
      e.getLocation();
      if (!this.mouseIsMove) {
        this.changeToStart(this.selectItem);
        this.clickItem(e);
      }
      this.selectItem.isMove = false;
      var i = this.selectItem.getComponent(r_ItemComponent.default);
      var n = i.itemId;
      var a = function (e) {
        if (i.moveToStart) {
          e.parent = e.startParent;
          e.x = e.startX;
          e.y = e.startY;
        }
        cc.tween(e).to(.1, {
          angle: e.startAngle
        }).start();
        e.scale = e.startScale;
      };
      if (i.preItemList.length > 0) {
        for (t = 0; t < i.preItemList.length; t++) {
          if ((h = (u = i.preItemList[t]).getComponent(r_ItemComponent.default)).equipId && !h.equipItem) {
            a(this.selectItem);
            return void (this.selectItem = null);
          }
          if (!h.equipId && !u.curHang) {
            return void (this.selectItem = null);
          }
        }
      }
      if (i.canPutKey.length > 0 && !r_CheckHasKeys.checkHasKeys(i.canPutKey)) {
        a(this.selectItem);
        return void (this.selectItem = null);
      }
      if (i.equipId) {
        for (t = 0; t < this.itemList.length; t++) {
          var u;
          var h;
          if ((h = (u = this.itemList[t]).getComponent(r_ItemComponent.default)).equipIdList.length > 0) {
            for (var p = 0; p < h.equipIdList.length; p++) {
              if (h.equipIdList[p] == i.equipId) {
                var d = h.equipList[p];
                if (d && (u.equipMap || (u.equipMap = {}), !u.equipMap[p])) {
                  var y = u.x + d.x;
                  var f = u.y + d.y;
                  var m = d.getComponent(r_EquipRound.default);
                  var v = m ? m.roundX : exports.DEF_EQUIP_ROUND_X;
                  var C = m ? m.roundY : exports.DEF_EQUIP_ROUND_Y;
                  if (Math.abs(y - this.selectItem.position.x) <= v && Math.abs(f - this.selectItem.position.y) <= C) {
                    i.equipItem = u;
                    this.collectCreateCom && this.collectCreateCom.putSuccess();
                    u.equipMap[p] = i;
                    j = this.selectItem.getComponent(r_ShowOnPut.default);
                    if (j) {
                      j.trigger();
                    }
                    var S = u.getComponent(r_ShowOnPut.default);
                    S && S.trigger();
                    if (i.isTool) {
                      cc.tween(this.selectItem).to(.1, {
                        angle: this.selectItem.startAngle
                      }).start();
                      this.selectItem.parent = this.selectItem.startParent;
                      this.selectItem.x = this.selectItem.startX;
                      this.selectItem.y = this.selectItem.startY;
                      this.selectItem = null;
                    } else {
                      this.selectItem.parent = d;
                      this.selectItem.x = 0;
                      this.selectItem.y = 0;
                      cc.tween(this.selectItem).to(.1, {
                        angle: 0
                      }).start();
                      this.selectItem.scale = 1;
                    }
                    if (i.putSoundName && "" != i.putSoundName) {
                      r_SoundMgr.SoundMgr.playSound(i.putSoundName);
                    } else {
                      r_SoundMgr.SoundMgr.playSound("itemDown");
                    }
                    i.triggerPutAction();
                    return void this.checkWin();
                  }
                }
              }
            }
          }
        }
        cc.tween(this.selectItem).to(.1, {
          angle: this.selectItem.startAngle
        }).start();
        if (i.moveToStart) {
          this.selectItem.parent = this.selectItem.startParent;
          this.selectItem.x = this.selectItem.startX;
          this.selectItem.y = this.selectItem.startY;
        }
        this.selectItem.scale = this.selectItem.startScale;
      } else {
        var I = false;
        var b = 99999;
        var P = null;
        var _ = null;
        var T = this.selectItem.convertToWorldSpaceAR(cc.Vec3.ZERO);
        if (i.canAdsorption) {
          for (t = 0; t < this.hangList.length; t++) {
            var U = this.hangList[t];
            var k = U.getComponent(r_HangComponent.default);
            if (this.canPutInHang(k, n)) {
              if (k.curItemList.length > 0 && !k.overlay) {
                if (!this.selectItem.lastHang) {
                  continue;
                }
                if (!this.canPutInHang(this.selectItem.lastHang.getComponent(r_HangComponent.default), k.curItemList[0].getComponent(r_ItemComponent.default).itemId)) {
                  continue;
                }
              }
              var w = Math.abs(U.position.x - this.selectItem.position.x);
              var D = Math.abs(U.position.y - this.selectItem.position.y);
              var R = U.getComponent(cc.PolygonCollider);
              if (R) {
                var M = U.convertToNodeSpaceAR(T);
                if (cc.Intersection.pointInPolygon(M, R.points) && (N = w + D) < b) {
                  _ = k;
                  P = U;
                  b = N;
                }
              } else {
                var N;
                if (w <= k.putAreaX && D <= k.putAreaY && (N = w + D) < b) {
                  _ = k;
                  P = U;
                  b = N;
                }
              }
            }
          }
        }
        var B = true;
        if (P && _.effectHangList.length > 0) {
          for (var L = 0; L < _.effectHangList.length; L++) {
            var O = _.effectHangList[L];
            if (O.curItemList && O.curItemList.length > 0) {
              B = false;
              break;
            }
          }
        }
        if (P && B) {
          if (this.selectItem.lastHang && 1 == _.curItemList.length && !_.overlay) {
            I = true;
            var A = this.selectItem.lastHang;
            var F = _.curItemList[0];
            this.selectItem.curHang = P;
            this.collectCreateCom && this.collectCreateCom.putSuccess();
            cc.tween(this.selectItem).to(.1, {
              x: P.x,
              y: P.y,
              scale: P.scale,
              angle: 0
            }).start();
            if (i.putZorder) {
              this.selectItem.zIndex = i.putZorder;
            } else {
              this.selectItem.zIndex = _.zorder + 0;
            }
            _.curItemList[0] = this.selectItem;
            var E = A.getComponent(r_HangComponent.default);
            F.curHang = A;
            F.x = A.x;
            F.y = A.y;
            F.scale = A.scale;
            var G = F.getComponent(r_ItemComponent.default);
            if (G.putZorder) {
              F.zIndex = G.putZorder;
            } else {
              F.zIndex = E.zorder + 0;
            }
            E.curItemList.push(F);
            if (i.putSoundName && "" != i.putSoundName) {
              r_SoundMgr.SoundMgr.playSound(i.putSoundName);
            } else {
              r_SoundMgr.SoundMgr.playSound("itemDown");
            }
            G.triggerGetAction();
            i.triggerPutAction(_);
            G.triggerPutAction(E);
            for (t = 0; t < this.touchComList.length; t++) {
              this.touchComList[t].putSuccess(this.selectItem);
            }
            this.checkWin();
          } else {
            var j = this.selectItem.getComponent(r_ShowOnPut.default);
            if (j) {
              j.trigger();
            }
            this.selectItem.curHang = P;
            this.collectCreateCom && this.collectCreateCom.putSuccess();
            -1 != _.itemIdList.findIndex(function (e) {
              return e == i.itemId;
            }) && i.changePic(true);
            cc.tween(this.selectItem).to(.1, {
              x: P.x,
              y: P.y,
              scale: _.scale,
              angle: 0
            }).start();
            if (i.putZorder) {
              this.selectItem.zIndex = i.putZorder;
            } else {
              this.selectItem.zIndex = _.zorder + _.curItemList.length;
            }
            _.curItemList.push(this.selectItem);
            I = true;
            if (i.putSoundName && "" != i.putSoundName) {
              r_SoundMgr.SoundMgr.playSound(i.putSoundName);
            } else {
              r_SoundMgr.SoundMgr.playSound("itemDown");
            }
            i.triggerPutAction(_);
            this.checkWin();
            for (t = 0; t < this.touchComList.length; t++) {
              this.touchComList[t].putSuccess(this.selectItem);
            }
          }
        } else {
          this.selectItem.scale = this.selectItem.startScale;
        }
        if (!I) {
          this.selectItem.x = Math.max(-cc.winSize.width / 2, this.selectItem.x);
          this.selectItem.x = Math.min(cc.winSize.width / 2, this.selectItem.x);
          this.selectItem.y = Math.max(-cc.winSize.height / 2, this.selectItem.y);
          this.selectItem.y = Math.min(cc.winSize.height / 2, this.selectItem.y);
          cc.tween(this.selectItem).to(.1, {
            angle: this.selectItem.startAngle
          }).start();
          if (i.moveToStart) {
            this.selectItem.parent = this.selectItem.startParent;
            this.selectItem.x = this.selectItem.startX;
            this.selectItem.y = this.selectItem.startY;
          }
        }
      }
      this.selectItem = null;
      this.mouseIsMove = null;
      this.isHaveMoveItem();
    }
  };
  e.prototype.canPutInHang = function (e, t) {
    for (var o = 0; o < e.itemIdList.length; o++) {
      if (t == e.itemIdList[o]) {
        return true;
      }
    }
    for (o = 0; o < e.putIdList.length; o++) {
      if (t == e.putIdList[o]) {
        return true;
      }
    }
    return false;
  };
  e.prototype.dragStart = function () {};
  e.prototype.drag = function (e, t, o) {
    this.selectItem.x = this.selectInitPosX + t;
    this.selectItem.y = this.selectInitPosY + o;
    if (this.selectItem.getComponent(r_ItemComponent.default).needDrop && (this.selectItem.x < 35 - fgui.GRoot.inst.width / 2 || this.selectItem.x > fgui.GRoot.inst.width / 2 - 35 || this.selectItem.y < 35 - fgui.GRoot.inst.height / 2 || this.selectItem.y > fgui.GRoot.inst.height / 2 - 35)) {
      for (var i = 0; i < this.itemList.length; i++) {
        var n = this.itemList[i];
        if (n == this.selectItem) {
          n.isDrop = true;
          n.destroy();
          this.itemList.splice(i, 1);
          this.selectItem = null;
          return void this.checkWin();
        }
      }
    }
  };
  e.prototype.clickItem = function () {
    if (this.selectItem) {
      var e = this.selectItem.getComponent(r_ItemComponent.default);
      e.needShowNodes && e.needShowNodes.forEach(function (e) {
        e.target.active = e.show;
      });
    }
  };
  e.prototype.changeToStart = function (e) {
    e.scale = e.startScale;
    var t = e.getComponent(r_ItemComponent.default);
    this.selectItem.x = Math.max(-cc.winSize.width / 2, this.selectItem.x);
    this.selectItem.x = Math.min(cc.winSize.width / 2, this.selectItem.x);
    this.selectItem.y = Math.max(-cc.winSize.height / 2, this.selectItem.y);
    this.selectItem.y = Math.min(cc.winSize.height / 2, this.selectItem.y);
    cc.tween(this.selectItem).to(.1, {
      angle: this.selectItem.startAngle
    }).start();
    if (t.moveToStart) {
      this.selectItem.parent = this.selectItem.startParent;
      this.selectItem.x = this.selectItem.startX;
      this.selectItem.y = this.selectItem.startY;
    }
  };
  e.prototype.registTouch = function () {
    var e = this;
    this.unregistTouch();
    var t = cc.director.getScene().getChildByName("Canvas").getChildByName("touchBg");
    var o = [];
    t.on(cc.Node.EventType.TOUCH_START, function (t) {
      o.length = 0;
      e.isFinishGame || e.touchStart(t);
    });
    t.on(cc.Node.EventType.TOUCH_MOVE, function (t) {
      e.touchMove(t);
    });
    t.on(cc.Node.EventType.TOUCH_END, function (t) {
      e.touchEnd(t);
    });
  };
  e.prototype.isFinishOtherExpLogic = function (e) {
    if (!this.isFinishItems()) {
      return false;
    }
    for (var t = 0; t < this.logicCptList.length; t++) {
      var o = this.logicCptList[t];
      if (o && o != e && !o.isFinish()) {
        return false;
      }
    }
    return true;
  };
  e.prototype.isFinishItems = function () {
    for (var e = 0; e < this.itemList.length; e++) {
      var t = this.itemList[e];
      var o = t.getComponent(r_ItemComponent.default);
      if (o.equipId) {
        if (o.equipItem) {
          continue;
        }
        return;
      }
      if (!o.ignoreCheck) {
        if (!t.curHang) {
          return void console.log("item", t.name, "没有hang");
        }
        if (o.equipIdList.length > 0) {
          var i = o.node;
          if (!i.equipMap) {
            return;
          }
          for (var n = 0; n < o.equipIdList.length; n++) {
            if (!i.equipMap[n]) {
              return;
            }
          }
        }
        var c = t.getComponent(r_ItemComponent.default).itemId;
        var l = t.curHang.getComponent(r_HangComponent.default);
        if (l.overlay) {
          for (n = 0; n < l.itemIdList.length; n++) {
            if (!(u = l.curItemList[n])) {
              return;
            }
            if (u.getComponent(r_ItemComponent.default).itemId != l.itemIdList[n]) {
              return;
            }
          }
        } else {
          var u;
          if (!(u = l.curItemList[0])) {
            return;
          }
          if (this.curGameMode == a.Normal && -1 == l.itemIdList.indexOf(u.getComponent(r_ItemComponent.default).itemId)) {
            return;
          }
        }
        var h = false;
        for (n = 0; n < l.itemIdList.length; n++) {
          c == l.itemIdList[n] && (h = true);
        }
        if (this.curGameMode == a.Star) {
          for (n = 0; n < l.putIdList.length; n++) {
            c == l.putIdList[n] && (h = true);
          }
        }
        if (!l.noEffectResult && !h) {
          return;
        }
      }
    }
    return true;
  };
  e.prototype.checkWin = function () {
    var e = this;
    if (this.isFinishItems()) {
      for (var t = 0; t < this.logicCptList.length; t++) {
        var i = this.logicCptList[t];
        if (i && i.isFinish && !i.isFinish()) {
          return;
        }
      }
      if (this.levelWinDelay[this.lastLevelId]) {
        if (!this.levelLogicFinish) {
          return void console.log("关卡的逻辑未完成");
        }
        r_SoundMgr.SoundMgr.playSound("Shounawancheng");
        this.isFinishGame = true;
        exports.GameSystem.blockAllTouch(true);
        r_TimeSystem.TimeSystem.scheduleOnce("R", 1e3 * this.levelWinDelay[this.lastLevelId], function () {
          exports.GameSystem.blockAllTouch(false);
          e.win();
        });
      } else {
        r_SoundMgr.SoundMgr.playSound("Shounawancheng");
        exports.GameSystem.blockAllTouch(true);
        r_TimeSystem.TimeSystem.scheduleOnce("G", this.defaultDelay, function () {
          exports.GameSystem.blockAllTouch(false);
          e.win();
        });
      }
    }
  };
  e.prototype.calScore = function () {
    var e = 0;
    var t = 0;
    for (var o = 0; o < this.hangList.length; o++) {
      var i = this.hangList[o];
      var n = i.getComponent(r_HangComponent.default);
      var a = true;
      if (!n.noEffectResult) {
        if (n.overlay) {
          e += n.itemIdList.length;
          for (var c = 0; c < n.itemIdList.length; c++) {
            if (!(l = n.curItemList[c])) {
              a = false;
              break;
            }
            if (l.getComponent(r_ItemComponent.default).itemId != n.itemIdList[c]) {
              a = false;
              break;
            }
          }
          if (a) {
            t += n.itemIdList.length;
          } else {
            console.log("挂点没有分1 hang=", i);
          }
        } else {
          var l;
          e += 1;
          if (!(l = n.curItemList[0])) {
            console.log("挂点没有分2 hang=", i);
            continue;
          }
          if (n.itemIdList.indexOf(l.getComponent(r_ItemComponent.default).itemId) > -1) {
            t += 1;
          } else {
            console.log("挂点没有分3 hang=", i);
          }
        }
      }
    }
    var u = t / e * 100;
    this.curScoreStar = u < 60 ? 1 : u < 100 ? 2 : 3;
  };
  e.prototype.win = function () {
    this.curGameMode == a.Star && this.calScore();
    if (this.levelLogicFinish) {
      exports.GameSystem.curGameMode != a.Word && r_SoundMgr.SoundMgr.playMusic("bgm");
      r_RelaxSystem.RelaxSystem.win();
      r_PlatformSystem.PlatformSystem.stopRecorder();
      this.isFinishGame = true;
      r_GamingUI.GamingUI.hide();
      var e = this.levelWinDelayMap[this.lastLevelId];
      e || (e = 1);
      r_TimeSystem.TimeSystem.scheduleOnce("winAnim", e, function () {});
    } else {
      console.log("关卡的逻辑未完成");
    }
  };
  e.prototype.clearWordLevel = function () {
    if (exports.GameSystem.curGameMode == a.Word && this.curLevelLogic && this.curLevelLogic.curLevelLogic && this.curLevelLogic.curLevelLogic.clear) {
      this.curLevelLogic.clear();
      this.curLevelLogic.curLevelLogic.clear();
    }
  };
  e.prototype.clearLevel = function (e) {
    var t;
    var o;
    undefined === e && (e = false);
    this.clearWordLevel();
    if (this.curLevelLogic && this.curLevelLogic.clearLevel) {
      this.curLevelLogic.clearLevel();
      try {
        null === (o = (t = this.curLevelLogic).onDestroy) || undefined === o || o.call(t);
      } catch (i) {
        console.warn(i);
      }
    }
    this.curLevelLogic = null;
    if (this.levelObj) {
      this.levelObj.destroy();
      this.levelObj = null;
    }
    if (this.prefabRes && !e) {
      cc.assetManager.releaseAsset(this.prefabRes);
      this.prefabRes = null;
    }
    r_GamingUI.GamingUI.Inst && (r_GamingUI.GamingUI.Inst.miao.visible = false);
    this.unregistTouch();
    r_TimeSystem.TimeSystem.scheduleClear("GameLoseTime");
    r_TimeSystem.TimeSystem.scheduleClear("GameLoseTime1");
    r_TimeSystem.TimeSystem.scheduleClear("GameLoseTime2");
    r_TimeSystem.TimeSystem.clearTimeMapUpdate("gameLoseAnim");
  };
  e.prototype.clickPointInNode = function (e, t) {
    if (null == e) {
      console.error("传入的node为null");
      return false;
    }
    var o = e.getComponent(cc.PolygonCollider);
    if (null == o) {
      console.error("没有添加 PolygonCollider 组件");
      return false;
    }
    var i = e.convertToNodeSpaceAR(t);
    return !!cc.Intersection.pointInPolygon(i, o.points);
  };
  e.prototype.nodeOverOtherNode = function (e, t) {
    if (!e || !t) {
      return false;
    }
    var o = t.getComponent(cc.PolygonCollider);
    if (null == o) {
      console.error("没有添加 PolygonCollider 组件");
      return false;
    }
    var i = t.convertToNodeSpaceAR(e.convertToWorldSpaceAR(cc.Vec2.ZERO));
    return !!cc.Intersection.pointInPolygon(i, o.points);
  };
  e.prototype.getChildByPath = function (e, t) {
    if (null == e || null == t) {
      return null;
    }
    var o = null;
    for (var i = e.split("/"); i.length > 0;) {
      var n = i.shift();
      if (null == (o = t.getChildByName(n))) {
        break;
      }
      t = o;
    }
    return o;
  };
  e.prototype.addTime = function (e) {
    exports.GameSystem.isLoseCountDown = false;
    exports.GameSystem.isShowedAddTimeUI = false;
    exports.GameSystem.isShowedLoseTip = false;
    r_TimeSystem.TimeSystem.scheduleClear("GameLoseTime");
    exports.GameSystem.curLevelTime = exports.GameSystem.curLevelTime + e;
  };
  e.prototype.canShowReviveUI = function () {
    return false;
  };
  e.prototype.scaleBig = function () {
    var e = this.itemParent.scale;
    (e += .1) >= this.maxScale && (e = this.maxScale);
    this.itemParent.scale = e;
  };
  e.prototype.scaleSmall = function () {
    var e = this.itemParent.scale;
    (e -= .1) <= this.minScale && (e = this.minScale);
    this.itemParent.scale = e;
    if (this.itemParent.scale > this.minScale) {
      var t = this.itemParent.scale - this.minScale + .2;
      this.scaleUpdatePos(this.itemParent.x, this.itemParent.y, t);
    }
  };
  e.prototype.scaleUpdatePos = function (e, t, o) {
    undefined === o && (o = 1);
    var i = o * this.windowDesignWidth / 2;
    var n = o * this.windowDesignHeight / 2;
    this.itemParent.x = e >= i ? i : e <= -i ? -i : e;
    this.itemParent.y = t >= n ? n : t <= -n ? -n : t;
  };
  return e;
}();
exports.GameSystem = new w();