var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CatchUI = undefined;
var r_UIDef = require("UIDef");
var r_ResSystem = require("ResSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_CatchFish = require("CatchFish");
var r_PlatformSystem = require("PlatformSystem");
var r_jsbi = require("jsbi");
var r_FishBoatCfg = require("FishBoatCfg");
var r_WeaponSystem = require("WeaponSystem");
var r_RoleSystem = require("RoleSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_BaseWin = require("BaseWin");
var r_TimeSystem = require("TimeSystem");
var r_LuckBagSystem = require("LuckBagSystem");
var r_SoundMgr = require("SoundMgr");
var r_DrawCardCfg = require("DrawCardCfg");
var r_DrawCardUI = require("DrawCardUI");
var exp_CatchUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.CatchFish, r_UIDef.UIDef.Res.UI.CatchUI) || this;
    t.btnName = ["我要一亿", "进阶材料", "更多秘书", "我要开挂", "1万钻石", "招募龙王"];
    t.btnName2 = ["我要大红包", "我要三个愿望", "我要1万钻石", "我要虎勋章", "身份升级", "其他彩蛋", "我要免广卡", "要十个女友", "要十个神灯"];
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
    this.show(r_UIDef.UIDef.Urls.UI.CatchUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.CatchUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.btnBack.onClick(this.onClickBack, this);
    this.nameLoader = this.contentPane.getChild("name").asLoader;
    this.centerLoader = this.contentPane.getChild("center").asLoader;
    this.controller = this.contentPane.getController("c1");
    this.btnSale = this.contentPane.getChild("btnSale").asButton;
    this.btnDouble = this.contentPane.getChild("btnDouble").asButton;
    this.btnPay = this.contentPane.getChild("btnPay").asButton;
    this.btnPay2 = this.contentPane.getChild("btnPay2").asButton;
    this.btnVideo = this.contentPane.getChild("btnVideo").asButton;
    this.btnVideo2 = this.contentPane.getChild("btnVideo2").asButton;
    this.btnGet = this.contentPane.getChild("btnGet").asButton;
    this.btnPass = this.contentPane.getChild("btnPass").asButton;
    this.btnNoSell = this.contentPane.getChild("btnNoSell").asButton;
    this.btnSale.onClick(this.onClickSale, this);
    this.btnDouble.onClick(this.onClickDouble, this);
    this.btnPay.onClick(this.onClickPay, this);
    this.btnPay2.onClick(this.onClickPay, this);
    this.btnVideo.onClick(this.onClickVideo, this);
    this.btnVideo2.onClick(this.onClickVideo, this);
    this.btnGet.onClick(this.onClickGet, this);
    this.btnPass.onClick(this.onClickPass, this);
    this.btnNoSell.onClick(this.onClickNoSell, this);
    this.des = this.contentPane.getChild("des").asTextField;
    this.cost = this.contentPane.getChild("cost").asTextField;
    this.cost1 = this.contentPane.getChild("cost1").asTextField;
    this.payDes = this.contentPane.getChild("payDes").asRichTextField;
    this.egg1 = this.contentPane.getChild("egg1").asGroup;
    this.longmen = this.contentPane.getChild("n16").asLoader;
    this.btnFlash = this.contentPane.getChild("btnFlash").asButton;
    this.btnFlash.onClick(function () {
      r_PlatformSystem.PlatformSystem.showVideo("捕鱼达人刷新奖励", function () {
        t.changeBtn();
      });
    }, this);
    this.btnFlash_1 = this.contentPane.getChild("btnFlash_1").asButton;
    this.btnFlash_1.onClick(function () {
      r_PlatformSystem.PlatformSystem.showVideo("捕鱼达人刷新奖励", function () {
        t.changeBtn2();
      });
    }, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.payDes.visible = true;
    this.data && this.initUI();
    this.egg1.visible = "鲤鱼" == this.data.name;
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.initUI = function () {
    var e = this;
    this.nameLoader.url = "";
    var t = this.data.name;
    var o = !this.data.pay;
    var i = this.data.cost;
    this.controller.selectedIndex = o ? 0 : 1;
    this.btnNoSell.visible = false;
    this.data.noSell && (this.btnNoSell.visible = true);
    this.nameLoader.visible = true;
    if (o) {
      this.nameLoader.url = "ui://CatchFish/" + t;
      this.nameLoader.node.removeAllChildren();
      if ("阿拉丁神灯" == this.data.name) {
        this.nameLoader.url = "";
        this.nameLoader.visible = false;
        this.nameLoader.node.removeAllChildren();
        this.data.cost = 1e6;
        i = this.data.cost;
      }
    } else {
      r_ResSystem.ResSystem.loadBundleRes("game1", "fishBoat/" + t, cc.Prefab, function (t, o) {
        if (o) {
          e.nameLoader.node.removeAllChildren();
          var i = cc.instantiate(o);
          i.active = true;
          e.nameLoader.node.addChild(i);
          var n = i.getChildByName("鱼");
          e.btnEgg1 = n;
          var a = i.getChildByName("人");
          e.btnEgg2 = a;
          n.on(cc.Node.EventType.TOUCH_START, function (t) {
            e.onTouchBegin(t, n);
          });
          n.on(cc.Node.EventType.TOUCH_MOVE, function (t) {
            e.onTouchMove(t);
          });
          n.on(cc.Node.EventType.TOUCH_END, function (t) {
            e.onTouchEnd(t);
          });
          a.on(cc.Node.EventType.TOUCH_START, function (t) {
            e.onTouchBegin(t, a);
          });
          a.on(cc.Node.EventType.TOUCH_MOVE, function (t) {
            e.onTouchMove(t);
          });
          a.on(cc.Node.EventType.TOUCH_END, function (t) {
            e.onTouchEnd(t);
          });
        }
      });
    }
    this.cost.text = r_UtilsSystem.UtilsSystem.getShowCoin(i);
    this.des.text = this.data.des;
    var n = 100 * this.data.cost;
    var a = r_jsbi.default.multiply(r_jsbi.default.BigInt(r_PlayerData.PlayerData.bigCoin), r_jsbi.default.BigInt(n));
    a = r_jsbi.default.divide(a, r_jsbi.default.BigInt(100));
    this.payDes.text = "打...打劫，我是鱼人奔波霸，交出" + (this.data.cost > 1 ? r_UtilsSystem.UtilsSystem.getShowCoin(this.data.cost) : r_UtilsSystem.UtilsSystem.getShowCoin(a)) + "否则小命不保。";
    this.prefab && this.prefab.destroy();
    r_ResSystem.ResSystem.loadBundleRes("game1", "fishBoat/fish/" + t, cc.Prefab, function (o, i) {
      if (i) {
        e.prefab = cc.instantiate(i);
        e.prefab.active = true;
        e.centerLoader.node.addChild(e.prefab);
        if ("鲤鱼" == t) {
          e.prefab.on(cc.Node.EventType.TOUCH_START, function (t) {
            e.onTouchBegin(t, e.prefab);
          });
          e.prefab.on(cc.Node.EventType.TOUCH_MOVE, function (t) {
            e.onTouchMove(t);
          });
          e.prefab.on(cc.Node.EventType.TOUCH_END, function (t) {
            e.onTouchEnd(t);
          });
        } else {
          "阿拉丁神灯" == t && e.showEgg3();
        }
      }
    });
    "鲤鱼" == this.data.name && r_ResSystem.ResSystem.loadBundleRes("game1", "fishBoat/龙门", cc.Prefab, function (t, o) {
      if (o) {
        e.longmen.node.removeAllChildren();
        e.cleanList = [];
        e.cleanAll = false;
        var i = cc.instantiate(o);
        i.active = true;
        e.longmen.node.addChild(i);
        e.cleanNode = i.getChildByName("清理点");
        e.cloudMask = i.getChildByName("mask");
        e.cloudMask.getChildByName("云").children.forEach(function (t) {
          e.cleanList.push(t);
        });
        e.cleanNode.on(cc.Node.EventType.TOUCH_START, function (t) {
          e.onTouchBegin(t, e.cleanNode);
        });
        e.cleanNode.on(cc.Node.EventType.TOUCH_MOVE, function (t) {
          e.onTouchMove(t);
        });
        e.cleanNode.on(cc.Node.EventType.TOUCH_END, function (t) {
          e.onTouchEnd(t);
        });
      }
    });
  };
  _ctor.prototype.onClickBack = function () {
    if (1 == this.controller.selectedIndex) {
      return r_UtilsSystem.UtilsSystem.showTip("被鱼人抓住了");
    } else if (5 == this.controller.selectedIndex) {
      return r_UtilsSystem.UtilsSystem.showTip("被巫神抓住了");
    } else {
      return void this.myHide();
    }
  };
  _ctor.prototype.onClickSale = function () {
    r_PlayerData.PlayerData.addCoin("捕鱼收获", this.data.cost, r_ReportSystem.SystemKey.渔船);
    this.myHide();
  };
  _ctor.prototype.onClickDouble = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("捕鱼达人双倍收益", function () {
      r_PlayerData.PlayerData.addCoin("捕鱼收获", 2 * e.data.cost, r_ReportSystem.SystemKey.渔船);
      e.myHide();
    });
  };
  _ctor.prototype.onClickNoSell = function () {
    if ("机炎之刃" == this.data.name) {
      r_UtilsSystem.UtilsSystem.showTip("获得机炎之刃，前往荒古遗迹查看");
      r_WeaponSystem.WeaponSystem.GainWeapon(1002);
    }
    r_PlayerData.PlayerData.saveData();
    this.myHide();
  };
  _ctor.prototype.onClickPay = function () {
    if (this.data.cost > 1) {
      if (r_PlayerData.PlayerData.isCoinEnough(this.data.cost)) {
        r_PlayerData.PlayerData.deleteCoin("被打劫", this.data.cost, r_ReportSystem.SystemKey.渔船, true);
      } else {
        r_PlayerData.PlayerData.deleteCoin("被打劫", r_PlayerData.PlayerData.bigCoin, r_ReportSystem.SystemKey.渔船, true);
      }
    } else {
      var e = 100 * this.data.cost;
      var t = r_jsbi.default.multiply(r_jsbi.default.BigInt(r_PlayerData.PlayerData.bigCoin), r_jsbi.default.BigInt(e));
      t = r_jsbi.default.divide(t, r_jsbi.default.BigInt(100));
      r_PlayerData.PlayerData.deleteCoin("被打劫", t, r_ReportSystem.SystemKey.渔船);
    }
    this.myHide();
  };
  _ctor.prototype.onClickVideo = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("捕鱼达人免除惩罚", function () {
      e.myHide();
    });
  };
  _ctor.prototype.onClickGet = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("捕鱼达人彩蛋奖励", function () {
      r_PlayerData.PlayerData.addCoin("彩蛋奖励", r_FishBoatCfg.FishEggs.人鱼.cost, r_ReportSystem.SystemKey.渔船);
      e.myHide();
    });
  };
  _ctor.prototype.onClickPass = function () {
    this.myHide();
  };
  _ctor.prototype.onTouchBegin = function (e, t) {
    if (!(1 != this.controller.selectedIndex && "鲤鱼" != this.data.name || cc.sys.platform != cc.sys.DESKTOP_BROWSER && cc.sys.platform != cc.sys.MOBILE_BROWSER && (r_PlayerData.PlayerData.data.catchFishMap.fishEgg && "鲤鱼" != this.data.name || r_PlayerData.PlayerData.data.catchFishMap.dragonEgg && "鲤鱼" == this.data.name))) {
      this.selectNode = t;
      this.startPos = e.getLocation();
      this.initItemPos = t.getPosition();
      t.setPosition(t.parent.convertToNodeSpaceAR(this.startPos));
      this.itemPos = t.getPosition();
    }
  };
  _ctor.prototype.onTouchMove = function (e) {
    var t = this;
    if (!(1 != this.controller.selectedIndex && "鲤鱼" != this.data.name || cc.sys.platform != cc.sys.DESKTOP_BROWSER && cc.sys.platform != cc.sys.MOBILE_BROWSER && (r_PlayerData.PlayerData.data.catchFishMap.fishEgg && "鲤鱼" != this.data.name || r_PlayerData.PlayerData.data.catchFishMap.dragonEgg && "鲤鱼" == this.data.name))) {
      var o = e.getLocation();
      var i = o.subtract(this.startPos);
      o = this.itemPos.add(i);
      this.selectNode.setPosition(o);
      if ("鲤鱼" == this.data.name && this.selectNode.name == this.cleanNode.name && this.cloudMask.getComponent(cc.Mask)) {
        var n = this.cloudMask.getComponent(cc.Mask)._graphics;
        n.lineWidth = 1;
        n.strokeColor = cc.color(255, 0, 0);
        n.fillColor = cc.color(0, 255, 0);
        var a;
        var s = this.cleanNode.convertToWorldSpaceAR(cc.v2(0, 0));
        a = this.cloudMask.convertToNodeSpaceAR(s);
        n.circle(a.x, a.y, 30);
        n.stroke();
        n.fill();
        this.cleanList.forEach(function (e, o) {
          var i = e.convertToWorldSpaceAR(cc.v2(0, 0));
          if (s.sub(i).len() < 30 && e.active) {
            e.active = false;
            t.cleanList.splice(o, 1);
          }
        });
        0 == this.cleanList.length && (this.cleanAll = true);
      }
    }
  };
  _ctor.prototype.onTouchEnd = function (e) {
    var t = this;
    if (1 == this.controller.selectedIndex || "鲤鱼" == this.data.name) {
      var o = e.getLocation();
      var i = o.subtract(this.startPos);
      o = this.itemPos.add(i);
      this.selectNode.setPosition(o);
      if ("鲤鱼" != this.data.name) {
        if (cc.sys.platform != cc.sys.DESKTOP_BROWSER && cc.sys.platform != cc.sys.MOBILE_BROWSER && r_PlayerData.PlayerData.data.catchFishMap.fishEgg) {
          return;
        }
        var n = this.selectNode.name == this.btnEgg1.name ? this.btnEgg2 : this.btnEgg1;
        if (r_UtilsSystem.UtilsSystem.touchInNode(n, this.selectNode.convertToWorldSpaceAR(cc.v2(0, 0)))) {
          this.selectNode.setPosition(n.getPosition());
          n.setPosition(this.initItemPos);
          var a = this.btnEgg2.name + this.btnEgg1.name;
          r_ResSystem.ResSystem.loadBundleRes("game1", "fishBoat/fish/" + a, cc.Prefab, function (e, o) {
            if (o) {
              t.prefab && t.prefab.destroy();
              t.prefab = cc.instantiate(o);
              t.prefab.active = true;
              t.centerLoader.node.addChild(t.prefab);
              t.payDes.text = r_FishBoatCfg.FishEggs[a].des + "<blod><color=#2E8B57>" + r_UtilsSystem.UtilsSystem.getShowCoin(r_FishBoatCfg.FishEggs[a].cost) + "</c></blod>";
              t.data.cost = r_FishBoatCfg.FishEggs[a].cost;
              t.controller.selectedIndex = 2;
              r_PlayerData.PlayerData.data.catchFishMap.fishEgg = true;
            }
          });
        } else {
          this.selectNode.setPosition(this.initItemPos);
        }
      } else if ("鲤鱼" == this.selectNode.name && this.cleanAll && r_UtilsSystem.UtilsSystem.checkTouchNode(this.longmen.node, this.selectNode.convertToWorldSpaceAR(cc.v2(0, 0)))) {
        if (cc.sys.platform != cc.sys.DESKTOP_BROWSER && cc.sys.platform != cc.sys.MOBILE_BROWSER && r_PlayerData.PlayerData.data.catchFishMap.dragonEgg) {
          return this.selectNode.setPosition(this.initItemPos);
        }
        console.log("鲤鱼跃龙门");
        r_ResSystem.ResSystem.loadBundleRes("game1", "fishBoat/fish/鲤鱼龙门", cc.Prefab, function (e, o) {
          if (o) {
            t.prefab && t.prefab.destroy();
            t.controller.selectedIndex = 3;
            t.contentPane.getChild("n41").visible = false;
            t.prefab = cc.instantiate(o);
            t.prefab.active = true;
            t.centerLoader.node.addChild(t.prefab);
            t.longmen.node.removeAllChildren();
            t.prefab.getComponent(sp.Skeleton).setAnimation(0, "chuchang", false);
            t.prefab.getComponent(sp.Skeleton).setCompleteListener(function () {
              t.contentPane.getChild("n41").visible = true;
              t.prefab.getComponent(sp.Skeleton).setAnimation(0, "daiji", true);
            });
            t.contentPane.getChild("longDes").asTextField.text = r_FishBoatCfg.FishEggs.龙.des;
          }
        });
        this.changeBtn();
      } else {
        this.selectNode.setPosition(this.initItemPos);
      }
      this.itemPos = null;
      this.startPos = null;
    }
  };
  _ctor.prototype.myHide = function () {
    r_CatchFish.default.initGame();
    this.hide();
  };
  _ctor.prototype.changeBtn = function () {
    var e = this;
    var t = this.btnName;
    var o = t.length;
    for (var i = 0; i < o; i++) {
      var n = o - 1 - i;
      var a = Math.floor(Math.random() * (n + 1));
      var s = t[n];
      t[n] = t[a];
      t[a] = s;
    }
    var r = function (o) {
      c.contentPane.getChild("btn" + o).asButton.icon = "ui://CatchFish/" + t[o - 1];
      c.contentPane.getChild("btn" + o).asButton.clearClick();
      c.contentPane.getChild("btn" + o).asButton.onClick(function () {
        r_PlatformSystem.PlatformSystem.showVideo("捕鱼达人彩蛋奖励", function () {
          e.onClickBtn(t[o - 1]);
        });
      });
    };
    var c = this;
    for (i = 1; i <= 4; i++) {
      r(i);
    }
  };
  _ctor.prototype.onClickBtn = function (e) {
    var t = this;
    var o = this.prefab.getChildByName("电");
    switch (e) {
      case "我要一亿":
        r_SoundMgr.SoundMgr.playSound("huodejinbi");
        r_PlayerData.PlayerData.addCoin("捕鱼收获", 1e8, r_ReportSystem.SystemKey.渔船);
        this.myHide();
        break;
      case "进阶材料":
        r_PlayerData.PlayerData.addStone(10);
        r_UtilsSystem.UtilsSystem.showTip("获得10个进阶材料");
        this.myHide();
        break;
      case "更多秘书":
        var i = r_DrawCardCfg.DrawFreeFireCfg;
        r_PlayerData.PlayerData.data.secretFireDraw = 1;
        r_DrawCardUI.DrawCardUI.showUI({
          num: 5,
          data: i
        });
        this.myHide();
        break;
      case "我要开挂":
        o.active = true;
        var n = 0;
        o.getComponent(sp.Skeleton).setAnimation(0, "shandian", false);
        o.getComponent(sp.Skeleton).setCompleteListener(function () {
          if (4 == ++n) {
            t.contentPane.getChild("longDes").asTextField.text = "你这么可耻的人不配接受我的赐福";
            setTimeout(function () {
              r_UtilsSystem.UtilsSystem.showTip("龙王非常气愤，再也不会见你了");
              t.myHide();
            }, 2e3);
          } else {
            o.getComponent(sp.Skeleton).setAnimation(0, "shandian", false);
          }
        });
        break;
      case "1万钻石":
        r_SoundMgr.SoundMgr.playSound("huodejinbi");
        r_PlayerData.PlayerData.addCoin(r_RoleSystem.ExpType.小游戏, 1e4);
        this.myHide();
        break;
      case "招募龙王":
        o.active = true;
        var a = 0;
        o.getComponent(sp.Skeleton).setAnimation(0, "shandian", false);
        o.getComponent(sp.Skeleton).setCompleteListener(function () {
          if (4 == ++a) {
            t.contentPane.getChild("longDes").asTextField.text = "龙王岂是你等人类之下属，下次别让我看到你";
            setTimeout(function () {
              r_UtilsSystem.UtilsSystem.showTip("龙王非常气愤，再也不会见你了");
              t.myHide();
            }, 2e3);
          } else {
            o.getComponent(sp.Skeleton).setAnimation(0, "shandian", false);
          }
        });
    }
    r_PlayerData.PlayerData.data.catchFishMap.dragonEgg = true;
  };
  _ctor.prototype.changeBtn2 = function () {
    var e = this;
    var t = this.btnName2;
    var o = t.length;
    for (var i = 0; i < o; i++) {
      var n = o - 1 - i;
      var a = Math.floor(Math.random() * (n + 1));
      var s = t[n];
      t[n] = t[a];
      t[a] = s;
    }
    var r = function () {
      for (var t = 1; t <= 4; t++) {
        e.contentPane.getChild("btn" + t + "_1").asButton.visible = false;
      }
      e.btnFlash_1.visible = false;
    };
    this.btnFlash_1.visible = true;
    var c = function (o) {
      l.contentPane.getChild("btn" + o + "_1").asButton.visible = true;
      l.contentPane.getChild("btn" + o + "_1").asButton.icon = "ui://CatchFish/" + t[o - 1];
      l.contentPane.getChild("btn" + o + "_1").asButton.clearClick();
      l.contentPane.getChild("btn" + o + "_1").asButton.onClick(function () {
        r_PlatformSystem.PlatformSystem.showVideo("捕鱼达人彩蛋奖励", function () {
          r();
          e.prefab.getChildByName("name").active = false;
          e.onClickBtn1(t[o - 1]);
        });
      });
    };
    var l = this;
    for (i = 1; i <= 4; i++) {
      c(i);
    }
  };
  _ctor.prototype.onClickBtn1 = function (e) {
    var t = this;
    switch (e) {
      case "我要大红包":
        r_PlayerData.PlayerData.addCoin("捕鱼收获", 1e8, r_ReportSystem.SystemKey.渔船);
        this.myHide();
        break;
      case "我要三个愿望":
        this.showEgg3Anim();
        r_SoundMgr.SoundMgr.playSound("catchFish/一巴掌");
        this.showQipao(this.prefab, "你搁这卡BUG呢，这么贪", true, 2, function () {
          t.myHide();
        });
        break;
      case "我要1万块钱":
        r_SoundMgr.SoundMgr.playSound("huodejinbi");
        r_PlayerData.PlayerData.addCoin(r_RoleSystem.ExpType.小游戏, 1e4);
        this.myHide();
        break;
      case "我要虎勋章":
        r_LuckBagSystem.LuckBagSystem.addAnimalSign(10);
        r_UtilsSystem.UtilsSystem.showTip("恭喜获得虎勋章一枚");
        this.myHide();
        break;
      case "身份升级":
        var o = r_RoleSystem.RoleSystem.getRoleLevel();
        if (o + 3 >= 14) {
          r_RoleSystem.RoleSystem.setLevel(14);
        } else {
          r_RoleSystem.RoleSystem.setLevel(o + 3);
        }
        r_UtilsSystem.UtilsSystem.showTip("恭喜获得身份获得提升");
        this.myHide();
        break;
      case "我要招募卡":
        this.myHide();
        break;
      case "其他彩蛋":
        this.showQipao(this.prefab, "当捕鱼人时不要慌，长按人渔跟字前后顺序调换顺序可触发彩蛋", true, 5, function () {
          t.myHide();
        });
        break;
      case "我要免广卡":
        r_UtilsSystem.UtilsSystem.showTip("恭喜获得一张免广卡");
        r_SoundMgr.SoundMgr.playSound("monopoly/获得道具");
        r_PlayerData.PlayerData.data.newMonpolyData.freeCard++;
        r_PlayerData.PlayerData.saveData();
        this.myHide();
        break;
      case "要十个女友":
      case "要十个神灯":
        r_SoundMgr.SoundMgr.playSound("catchFish/一巴掌");
        this.showEgg3Anim();
        this.showQipao(this.prefab, "这么贪", true, 2, function () {
          t.myHide();
        });
    }
  };
  _ctor.prototype.showEgg3 = function () {
    var e = this;
    this.prefab.getChildByName("name").active = true;
    this.btnFlash_1.visible = true;
    if (cc.sys.platform == cc.sys.DESKTOP_BROWSER || cc.sys.platform == cc.sys.MOBILE_BROWSER || !r_PlayerData.PlayerData.data.catchFishMap.lightGodEgg) {
      var t = null;
      var o = 0;
      var i = null;
      var n = null;
      var a = null;
      var s = false;
      var r = false;
      var l = this.prefab.getChildByName("金色灯");
      l.on(cc.Node.EventType.TOUCH_START, function (e) {
        var o = e.getLocation();
        t = o;
      }, this);
      l.on(cc.Node.EventType.TOUCH_MOVE, function (i) {
        if (i.getLocation().subtract(t).mag() > 100) {
          t = i.getLocation();
          o += 1;
        }
        if (o >= 5 && !r) {
          S();
          r = true;
          r_PlayerData.PlayerData.data.catchFishMap.lightGodEgg = true;
          if (s) {
            e.prefab.getChildByName("正确").active = true;
            r_TimeSystem.TimeSystem.scheduleOnce("egg3", 2, function () {
              e.showQipao(e.prefab, "谢谢你救了我，我能满足你一个愿望", true, 2, function () {});
              e.controller.selectedIndex = 4;
              e.changeBtn2();
            });
          } else {
            e.prefab.getChildByName("错误").active = true;
            r_TimeSystem.TimeSystem.scheduleOnce("egg3", 2, function () {
              e.showQipao(e.prefab, "今年没有年终奖，你给我一个亿吧", false, 2, function () {});
              e.controller.selectedIndex = 5;
              e.data.cost = 1e8;
              e.cost1.text = r_UtilsSystem.UtilsSystem.numFormats(e.data.cost);
            });
          }
        }
      }, this);
      l.on(cc.Node.EventType.TOUCH_END, function () {
        o = 0;
      }, this);
      var u = this.prefab.getChildByName("name").getChildByName("灯");
      var h = u;
      var p = this.prefab.getChildByName("name").getChildByName("丁");
      var d = p;
      u.on(cc.Node.EventType.TOUCH_START, function (e) {
        f(e, u);
      });
      u.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
        g(e);
      });
      u.on(cc.Node.EventType.TOUCH_END, function (e) {
        v(e);
      });
      p.on(cc.Node.EventType.TOUCH_START, function (e) {
        f(e, p);
      });
      p.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
        g(e);
      });
      p.on(cc.Node.EventType.TOUCH_END, function (e) {
        v(e);
      });
      var y = null;
      var f = function (e, t) {
        i = t;
        y = e.getLocation();
        n = t.getPosition();
        t.setPosition(t.parent.convertToNodeSpaceAR(y));
        a = t.getPosition();
      };
      var g = function (e) {
        var t = e.getLocation();
        var o = t.subtract(y);
        t = a.add(o);
        i.setPosition(t);
      };
      var v = function (e) {
        var t = e.getLocation();
        var o = t.subtract(y);
        t = a.add(o);
        i.setPosition(t);
        var r = i.name == h.name ? d : h;
        if (!s && r_UtilsSystem.UtilsSystem.touchInNode(r, i.convertToWorldSpaceAR(cc.v2(0, 0)))) {
          i.setPosition(r.getPosition());
          r.setPosition(n);
          s = true;
        } else {
          i.setPosition(n);
        }
      };
      var S = function () {
        u.off(cc.Node.EventType.TOUCH_START);
        u.off(cc.Node.EventType.TOUCH_MOVE);
        u.off(cc.Node.EventType.TOUCH_END);
        p.off(cc.Node.EventType.TOUCH_START);
        p.off(cc.Node.EventType.TOUCH_MOVE);
        p.off(cc.Node.EventType.TOUCH_END);
      };
    }
  };
  _ctor.prototype.showEgg3Anim = function () {
    this.prefab.getChildByName("正确").getComponent(sp.Skeleton).setAnimation(0, "daren", false);
  };
  _ctor.prototype.showQipao = function (e, t, o, i, n) {
    undefined === o && (o = true);
    undefined === i && (i = 2);
    var a = false;
    this.prefab.getChildByName("正确") && this.prefab.getChildByName("正确").active && (a = true);
    var s = e.getChildByName("气泡");
    s.active = true;
    s.opacity = 255;
    s.y = a ? 311 : 484;
    s.getChildByName("label").getComponent(cc.Label).string = t;
    if (o) {
      cc.tween(s).delay(i).to(.5, {
        opacity: 0
      }).call(function () {
        n && n();
      }).start();
    } else {
      cc.tween(s).delay(i).call(function () {
        n && n();
      }).start();
    }
  };
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.CatchUI = exp_CatchUI;