var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FarmUI = undefined;
var r_UIDef = require("UIDef");
var r_FarmCfg = require("FarmCfg");
var r_FarmCom = require("FarmCom");
var r_jsbi = require("jsbi");
var r_AnimSystem = require("AnimSystem");
var r_DaySystem = require("DaySystem");
var r_DebugSystem = require("DebugSystem");
var r_FarmSystem = require("FarmSystem");
var r_FguiResSystem = require("FguiResSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_BaseWin = require("BaseWin");
var r_CollectUI = require("CollectUI");
var r_DailyUI = require("DailyUI");
var r_FarmGuideUI = require("FarmGuideUI");
var r_GoldMineUI = require("GoldMineUI");
var r_HarvestUI = require("HarvestUI");
var r_HelpUI = require("HelpUI");
var r_PlantPaperUI = require("PlantPaperUI");
var r_ShopUI = require("ShopUI");
var N = cc.Enum({
  收获: 0,
  清理: 1,
  浇水: 2,
  施肥: 3,
  种植: 4
});
var exp_FarmUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Farm, r_UIDef.UIDef.Res.UI.FarmUI) || this;
    t.nowTool = null;
    t.nowItem = null;
    t.farmCom = null;
    t.isMask = false;
    t.guideNum = 0;
    t.guideInfoList = [{
      pos: cc.v2(105, 1145),
      wh: cc.v2(180, 180),
      isFinal: false,
      lab: "欢迎来到农场，下面就由我来简单介绍一下吧，我们先清理一下土地"
    }, {
      pos: cc.v2(375, 830),
      wh: cc.v2(210, 130),
      isFinal: false,
      lab: ""
    }, {
      pos: cc.v2(287, 1145),
      wh: cc.v2(180, 180),
      isFinal: false,
      lab: "土地太干旱了，我们给土地浇浇水"
    }, {
      pos: cc.v2(375, 830),
      wh: cc.v2(210, 130),
      isFinal: false,
      lab: ""
    }, {
      pos: cc.v2(643, 1145),
      wh: cc.v2(180, 180),
      isFinal: false,
      lab: "这块土地已经恢复正常，我们可以在这块土地上开始种植了"
    }, {
      pos: cc.v2(108, 964),
      wh: cc.v2(134, 134),
      isFinal: false,
      lab: ""
    }, {
      pos: cc.v2(375, 830),
      wh: cc.v2(210, 130),
      isFinal: false,
      lab: ""
    }, {
      pos: cc.v2(465, 1145),
      wh: cc.v2(180, 180),
      isFinal: false,
      lab: "最后我们给作物施肥，这次要多施肥2次哟~"
    }, {
      pos: cc.v2(375, 830),
      wh: cc.v2(210, 130),
      isFinal: false,
      lab: ""
    }, {
      pos: cc.v2(375, 830),
      wh: cc.v2(210, 130),
      isFinal: false,
      lab: ""
    }, {
      pos: cc.v2(475, 970),
      wh: cc.v2(175, 130),
      isFinal: false,
      lab: "我们可以开始收获果实啦~"
    }, {
      pos: cc.v2(375, 750),
      wh: cc.v2(180, 180),
      isFinal: false,
      lab: ""
    }, {
      pos: cc.v2(568, 267),
      wh: cc.v2(300, 300),
      isFinal: true,
      lab: "商店可以获得种子，右下角有种植规则说明哟~"
    }];
    t.digNum = 0;
    t.digBkSetTime = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.FarmUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.FarmUI);
  };
  _ctor.prototype.onInit = function () {
    var o = this;
    e.prototype.onInit.call(this);
    _ctor.Inst = this;
    r_ResSystem.ResSystem.loadBundleRes("game2", "farm/farm", cc.Prefab, function (e, t) {
      return __awaiter(o, undefined, undefined, function () {
        return __generator(this, function () {
          if (t) {
            r_FguiResSystem.FguiResSystem.addAutoReleaseRes(this, t);
            this.prefab && this.prefab.destroy();
            this.prefab = cc.instantiate(t);
            this.contentPane.getChild("center").node.addChild(this.prefab);
            this.farmCom = this.prefab.getComponent("FarmCom");
          }
          return [2];
        });
      });
    });
    this.btnClear.onClick(this.onClickClear, this);
    this.btnWater.onClick(this.onClickWater, this);
    this.btnSM.onClick(this.onClickSM, this);
    this.btnSeed.onClick(this.onClickSeed, this);
    this.btnHarvest.onClick(this.onClickHarvest, this);
    this.btnBack.onClick(function () {
      o.hide();
    }, this);
    this.btnEverDay.onClick(this.onClickEverDay, this);
    this.btnRule.onClick(this.onClickRule, this);
    this.btnShop.onClick(this.onClickShop, this);
    this.btnMark.onClick(this.onClickMark, this);
    this.str.getChild("btnAddStr").onClick(this.onClickAddStr, this);
    this.btnAllHarvest.onClick(this.onClickAllHarvest, this);
    this.list.setVirtual();
    this.list.itemRenderer = this.onListRenderer.bind(this);
  };
  _ctor.prototype.setListLength = function () {
    this.contentPane.getController("c2").selectedIndex = 0;
    if (this.farmCom && r_PlayerData.PlayerData.data.farmSeedList) {
      this.list.numItems = r_PlayerData.PlayerData.data.farmSeedList.length;
      r_PlayerData.PlayerData.data.farmSeedList.length > 0 && (this.contentPane.getController("c2").selectedIndex = 1);
    }
  };
  _ctor.prototype.guide = function () {
    if (r_FarmGuideUI.FarmGuideUI.Inst) {
      this.guideNum++;
      var e = this.guideNum;
      r_FarmGuideUI.FarmGuideUI.Inst.moveMask(this.guideInfoList[e].pos, this.guideInfoList[e].wh, this.guideInfoList[e].isFinal, this.guideInfoList[e].lab);
    }
  };
  _ctor.prototype.onListRenderer = function (e, t) {
    var o = this;
    t.getController("c2").selectedIndex = 1;
    t.getChild("num").text = r_PlayerData.PlayerData.data.farmSeedList[e].num;
    var i = this.getFarmCfg(r_PlayerData.PlayerData.data.farmSeedList[e].id);
    if ("R" == i.lv) {
      t.getController("c1").selectedIndex = 2;
    } else if ("SR" == i.lv) {
      t.getController("c1").selectedIndex = 1;
    } else {
      "SSR" == i.lv && (t.getController("c1").selectedIndex = 0);
    }
    t.info = i;
    r_ResSystem.ResSystem.loadBundleFguiImg(t.getChild("icon"), "game2", "farm/item/item" + r_PlayerData.PlayerData.data.farmSeedList[e].id);
    this.nowItem == t && (t.getController("c2").selectedIndex = 0);
    t.clearClick();
    t.onClick(function () {
      o.guide();
      o.nowItem = t;
      o.setListLength();
    }, this);
  };
  _ctor.prototype.useSeed = function (e) {
    var t = this;
    for (var o = 0; o < r_PlayerData.PlayerData.data.farmSeedList.length; o++) {
      if (r_PlayerData.PlayerData.data.farmSeedList[o].id == e) {
        r_PlayerData.PlayerData.setFarmSeed(e, -1, function () {
          t.nowItem = null;
        });
        this.setListLength();
        break;
      }
    }
  };
  _ctor.prototype.touchEvent = function () {
    var e = this;
    this.touch.on(fgui.Event.TOUCH_BEGIN, function (t) {
      if (!e.isMask) {
        var o = cc.v2(t.pos.x, fgui.GRoot.inst.height - t.pos.y);
        if (e.farmCom) {
          if (e.farmCom.bKNode.getChildByName("洞").active) {
            r_SoundMgr.SoundMgr.playSound("click");
            e.farmCom.bKNode.getChildByName("洞").active = false;
            e.farmCom.bKNode.getChildByName("进入动画").active = false;
            return void r_GoldMineUI.GoldMineUI.showUI();
          }
          for (var i = 0; i < e.farmCom.infoNodeList.length; i++) {
            var n = e.farmCom.infoNodeList[i];
            var a = n.getChildByName("收获");
            if (r_UtilsSystem.UtilsSystem.touchInNode(n, o) || a.active && r_UtilsSystem.UtilsSystem.touchInNode(a, o)) {
              r_SoundMgr.SoundMgr.playSound("click");
              e.setInfoNode(n);
              e.unlockLand(n, i);
              break;
            }
          }
          if (e.farmCom.treeSeed.active && r_UtilsSystem.UtilsSystem.touchInNode(e.farmCom.treeSeed, o) && 0 != r_PlayerData.PlayerData.data.cdTreeSeedId) {
            r_PlayerData.PlayerData.setFarmSeed(r_PlayerData.PlayerData.data.cdTreeSeedId, 5);
            r_UtilsSystem.UtilsSystem.showTip("获得5个" + r_FarmSystem.FarmSystem.getFarmInfo(r_PlayerData.PlayerData.data.cdTreeSeedId).name + "种子");
            e.useStrength();
            r_PlayerData.PlayerData.data.farmTreeSeed = 0;
            e.farmCom.treeSeed.active = false;
            r_PlayerData.PlayerData.data.cdTreeSeedId = 0;
          } else if (r_UtilsSystem.UtilsSystem.touchInNode(e.farmCom.treeTouch, o) && e.nowTool == N.浇水) {
            if (r_PlayerData.PlayerData.data.farmStrengthNum <= 0) {
              r_UtilsSystem.UtilsSystem.showTip("体力不足！");
              e.onClickAddStr();
            } else {
              r_SoundMgr.SoundMgr.playSound("click");
              e.isMask = true;
              e.farmCom.runJiaoShuiAnim(e.farmCom.treeTouch.parent, function () {
                e.farmCom.waterTree(function () {
                  e.isMask = false;
                });
              });
            }
          }
          e.nowTool == N.清理 && e.cD1(o);
        }
      }
    }, this);
  };
  _ctor.prototype.randOneSeed = function () {
    var e = Math.random();
    var t = 0;
    for (var o = 0; o < r_FarmCfg.FarmCfg.length; o++) {
      var i = r_FarmCfg.FarmCfg[o];
      if (e < (t += i.rate / 100)) {
        return i;
      }
    }
  };
  _ctor.prototype.setInfoNode = function (e) {
    if (null != this.nowTool) {
      switch (this.nowTool) {
        case N.收获:
          this.harvest(e);
          this.showSeedInfo(e);
          break;
        case N.施肥:
          this.spreadManure(e);
          break;
        case N.浇水:
          this.water(e);
          break;
        case N.清理:
          this.clear(e);
          break;
        case N.种植:
          this.plant(e);
      }
      this.farmCom.showFarm();
    }
  };
  _ctor.prototype.unlockLand = function (e, t) {
    var o = this;
    if (this.farmCom && this.farmCom.nextKeyLand == e) {
      if (-1 == r_FarmCfg.LandValue[t]) {
        r_PlatformSystem.PlatformSystem.showVideo("农场解锁土地", function () {
          e.info.landType = r_FarmCom.FarmLandType.正常;
          e.info.landTime = r_TimeSystem.TimeSystem.getServerTime();
          o.farmCom.showFarm();
        });
      } else if (0 == r_FarmCfg.LandValue[t]) {
        e.info.landType = r_FarmCom.FarmLandType.正常;
        e.info.landTime = r_TimeSystem.TimeSystem.getServerTime();
        this.farmCom.showFarm();
      } else if (r_PlayerData.PlayerData.isCoinEnough(r_FarmCfg.LandValue[t])) {
        r_PlayerData.PlayerData.useCoin("农场解锁土地", r_FarmCfg.LandValue[t]);
        e.info.landType = r_FarmCom.FarmLandType.正常;
        e.info.landTime = r_TimeSystem.TimeSystem.getServerTime();
        this.farmCom.showFarm();
      } else {
        r_UtilsSystem.UtilsSystem.showTip("钱不够~");
      }
    }
  };
  _ctor.prototype.showSeedInfo = function (e) {
    var t = e.info;
    if (t.landType != r_FarmCom.FarmLandType.未解锁 && t.plantType == r_FarmCom.FarmPlantType.幼苗) {
      var o = e.getChildByName("成熟提示");
      o.active = true;
      cc.Tween.stopAllByTarget(o);
      cc.tween(o).delay(3).call(function () {
        o.active = false;
      }).start();
    }
  };
  _ctor.prototype.showStrength = function () {
    this.str.getChild("text").text = r_PlayerData.PlayerData.data.farmStrengthNum + "/" + r_FarmCfg.farmStrengthMax;
    if (r_PlayerData.PlayerData.data.farmStrengthNum >= r_FarmCfg.farmStrengthMax) {
      this.str.getChild("add1").visible = false;
      this.str.getChild("time").visible = false;
    } else {
      var e = r_TimeSystem.TimeSystem.getServerTime() - r_PlayerData.PlayerData.data.farmStrengthTime;
      if (e > r_FarmCfg.strenghtTime) {
        this.addStrength();
        if (r_PlayerData.PlayerData.data.farmStrengthNum < r_FarmCfg.farmStrengthMax) {
          r_PlayerData.PlayerData.data.farmStrengthTime += r_FarmCfg.strenghtTime;
          this.showStrength();
        }
      }
      this.str.getChild("add1").visible = true;
      this.str.getChild("time").visible = true;
      this.str.getChild("time").text = this.timeFormat(r_FarmCfg.strenghtTime - e) + " 后";
    }
  };
  _ctor.prototype.showAllPlantTime = function () {
    if (this.farmCom) {
      for (var e = 0; e < this.farmCom.infoNodeList.length; e++) {
        var t = this.farmCom.infoNodeList[e];
        this.showSeedTipTime(t);
        this.showLandTime(t);
      }
    }
  };
  _ctor.prototype.showLandTime = function (e) {
    var t = e.info;
    var o = r_TimeSystem.TimeSystem.getServerTime();
    if (t.landType != r_FarmCom.FarmLandType.未解锁 && o - t.landTime > r_FarmCfg.landDroughtTime && t.landType != r_FarmCom.FarmLandType.干涸) {
      t.landType = r_FarmCom.FarmLandType.干涸;
      this.farmCom.showFarm();
    }
  };
  _ctor.prototype.showSeedTipTime = function (e) {
    var t = e.info;
    var o = r_TimeSystem.TimeSystem.getServerTime();
    if (t.plantType == r_FarmCom.FarmPlantType.幼苗 && t.plantTime) {
      var i = o - t.plantTime;
      var n = this.getFarmCfg(t.plantId);
      var a = n.ripeTime - i;
      if (a < 0 && t.plantType != r_FarmCom.FarmPlantType.成熟) {
        t.plantType = r_FarmCom.FarmPlantType.成熟;
        t.plantTime = 0;
        this.farmCom && this.farmCom.showFarm();
      }
      var s = e.getChildByName("成熟提示");
      s.getChildByName("pro").getComponent(cc.ProgressBar).progress = i / n.ripeTime;
      s.getChildByName("timeLab").getComponent(cc.Label).string = this.timeFormat(a) + "后成熟";
    }
  };
  _ctor.prototype.timeFormat = function (e) {
    e < 0 && (e = 0);
    var t = Math.floor(e / 60) < 10 ? "0" + Math.floor(e / 60) : Math.floor(e / 60) + "";
    return (t += ":") + (Math.floor(e % 60) < 10 ? "0" + Math.floor(e % 60) : Math.floor(e % 60) + "");
  };
  _ctor.prototype.addStrength = function (e) {
    undefined === e && (e = 1);
    r_PlayerData.PlayerData.data.farmStrengthNum += e;
  };
  _ctor.prototype.useStrength = function () {
    if (r_PlayerData.PlayerData.data.farmStrengthNum > 0) {
      r_PlayerData.PlayerData.data.farmStrengthNum == r_FarmCfg.farmStrengthMax && (r_PlayerData.PlayerData.data.farmStrengthTime = r_TimeSystem.TimeSystem.getServerTime());
      r_PlayerData.PlayerData.data.farmStrengthNum -= 1;
    }
  };
  _ctor.prototype.harvest = function (e) {
    var t = e.info;
    if (t.landType != r_FarmCom.FarmLandType.未解锁 && t.plantType == r_FarmCom.FarmPlantType.成熟) {
      if (t.landType == r_FarmCom.FarmLandType.干涸) {
        if (r_PlayerData.PlayerData.data.farmStrengthNum <= 0) {
          r_UtilsSystem.UtilsSystem.showTip("体力不足！");
          return void this.onClickAddStr();
        }
        this.harvestFruit(e, .5);
        t.plantTime = 0;
        this.guide();
        t.plantId = -1;
        t.plantType = r_FarmCom.FarmPlantType.枯萎;
        this.useStrength();
      } else {
        if (r_PlayerData.PlayerData.data.farmStrengthNum <= 0) {
          r_UtilsSystem.UtilsSystem.showTip("体力不足！");
          return void this.onClickAddStr();
        }
        this.harvestFruit(e);
        t.plantTime = 0;
        t.plantId = -1;
        this.guide();
        t.plantType = r_FarmCom.FarmPlantType.枯萎;
        t.landType == r_FarmCom.FarmLandType.施肥 && (t.landType = r_FarmCom.FarmLandType.正常);
        this.useStrength();
      }
    }
  };
  _ctor.prototype.plant = function (e) {
    var t = e.info;
    if (t.landType != r_FarmCom.FarmLandType.未解锁) {
      if (t.landType != r_FarmCom.FarmLandType.干涸) {
        if (null != this.nowItem) {
          if (t.plantType == r_FarmCom.FarmPlantType.未种植) {
            if (r_PlayerData.PlayerData.data.farmStrengthNum <= 0) {
              r_UtilsSystem.UtilsSystem.showTip("体力不足！");
              return void this.onClickAddStr();
            }
            this.guide();
            t.plantType = r_FarmCom.FarmPlantType.幼苗;
            t.plantId = this.nowItem.info.id;
            t.plantTime = r_TimeSystem.TimeSystem.getServerTime();
            this.farmCom.runZhongZhiAnim(e, function () {});
            this.useSeed(this.nowItem.info.id);
            this.useStrength();
          } else {
            r_UtilsSystem.UtilsSystem.showTip("土地已有作物,请先铲除！");
          }
        } else {
          r_UtilsSystem.UtilsSystem.showTip("请先选择种子！");
        }
      } else {
        r_UtilsSystem.UtilsSystem.showTip("土地干旱,请先浇水！");
      }
    } else {
      r_UtilsSystem.UtilsSystem.showTip("土地未解锁！");
    }
  };
  _ctor.prototype.clear = function (e) {
    var t = this;
    var o = e.info;
    if (o.landType == r_FarmCom.FarmLandType.未解锁) {
      this.isMask = true;
      return void this.farmCom.runChanTuAnim(e, function () {
        t.isMask = false;
      });
    }
    if (o.plantType != r_FarmCom.FarmPlantType.未种植) {
      if (o.plantType == r_FarmCom.FarmPlantType.幼苗 || o.plantType == r_FarmCom.FarmPlantType.成熟) {
        if (r_PlayerData.PlayerData.data.farmStrengthNum <= 0) {
          r_UtilsSystem.UtilsSystem.showTip("体力不足！");
          return void this.onClickAddStr();
        }
        r_UtilsSystem.UtilsSystem.showAlert("是否铲除未收获的植物？", 0, function () {
          t.isMask = true;
          t.farmCom.runChanTuAnim(e, function () {
            t.isMask = false;
            o.plantType = r_FarmCom.FarmPlantType.未种植;
            t.farmCom.showFarm();
          });
          t.useStrength();
        }, "收获");
      } else {
        if (r_PlayerData.PlayerData.data.farmStrengthNum <= 0) {
          r_UtilsSystem.UtilsSystem.showTip("体力不足！");
          return void this.onClickAddStr();
        }
        this.isMask = true;
        this.farmCom.runChanTuAnim(e, function () {
          t.isMask = false;
          t.guide();
          o.plantType = r_FarmCom.FarmPlantType.未种植;
          t.farmCom.showFarm();
        });
        this.useStrength();
      }
    } else {
      this.isMask = true;
      this.farmCom.runChanTuAnim(e, function () {
        t.isMask = false;
      });
    }
  };
  _ctor.prototype.water = function (e) {
    var t = this;
    var o = e.info;
    if (o.landType == r_FarmCom.FarmLandType.未解锁) {
      this.isMask = true;
      return void this.farmCom.runJiaoShuiAnim(e, function () {
        t.isMask = false;
      });
    }
    e.info.landTime = r_TimeSystem.TimeSystem.getServerTime();
    if (o.landType == r_FarmCom.FarmLandType.干涸) {
      if (r_PlayerData.PlayerData.data.farmStrengthNum <= 0) {
        r_UtilsSystem.UtilsSystem.showTip("体力不足！");
        return void this.onClickAddStr();
      }
      this.isMask = true;
      this.farmCom.runJiaoShuiAnim(e, function () {
        t.guide();
        o.landType = r_FarmCom.FarmLandType.正常;
        t.isMask = false;
        t.farmCom.showFarm();
      });
      this.useStrength();
    } else {
      this.isMask = true;
      this.farmCom.runJiaoShuiAnim(e, function () {
        t.isMask = false;
      });
    }
  };
  _ctor.prototype.spreadManure = function (e) {
    var t = this;
    var o = e.info;
    if (o.landType != r_FarmCom.FarmLandType.未解锁) {
      if (o.landType != r_FarmCom.FarmLandType.干涸) {
        if (o.plantType == r_FarmCom.FarmPlantType.幼苗) {
          if (r_PlayerData.PlayerData.data.farmStrengthNum <= 0) {
            r_UtilsSystem.UtilsSystem.showTip("体力不足！");
            return void this.onClickAddStr();
          }
          this.isMask = true;
          this.farmCom.runShiFeiAnim(e, function () {
            o.landType = r_FarmCom.FarmLandType.施肥;
            t.guide();
            t.isMask = false;
            o.plantTime -= r_FarmCfg.SMTime;
            t.farmCom.showFarm();
          });
          this.useStrength();
        }
        o.plantType == r_FarmCom.FarmPlantType.成熟 && r_UtilsSystem.UtilsSystem.showTip("已成熟！");
        o.plantType == r_FarmCom.FarmPlantType.枯萎 && r_UtilsSystem.UtilsSystem.showTip("已枯萎！");
        o.plantType == r_FarmCom.FarmPlantType.未种植 && r_UtilsSystem.UtilsSystem.showTip("未种植！");
      } else {
        r_UtilsSystem.UtilsSystem.showTip("土地干旱,请先浇水！");
      }
    } else {
      r_UtilsSystem.UtilsSystem.showTip("土地未解锁！");
    }
  };
  _ctor.prototype.getFarmCfg = function (e) {
    for (var t = 0; t < r_FarmCfg.FarmCfg.length; t++) {
      if (r_FarmCfg.FarmCfg[t].id == e) {
        return r_FarmCfg.FarmCfg[t];
      }
    }
  };
  _ctor.prototype.showBtn = function (e) {
    this.btnClear.getController("c1").selectedIndex = 1;
    this.btnWater.getController("c1").selectedIndex = 1;
    this.btnSM.getController("c1").selectedIndex = 1;
    this.btnSeed.getController("c1").selectedIndex = 1;
    this.btnHarvest.getController("c1").selectedIndex = 1;
    this.contentPane.getController("c1").selectedIndex = 0;
    if (e) {
      e == this.btnSeed && (this.contentPane.getController("c1").selectedIndex = 1);
      e.getController("c1").selectedIndex = 0;
    }
  };
  _ctor.prototype.onClickClear = function () {
    this.guide();
    this.showBtn(this.btnClear);
    this.nowTool = N.清理;
  };
  _ctor.prototype.onClickWater = function () {
    this.guide();
    this.showBtn(this.btnWater);
    this.nowTool = N.浇水;
  };
  _ctor.prototype.onClickSM = function () {
    this.guide();
    this.showBtn(this.btnSM);
    this.nowTool = N.施肥;
  };
  _ctor.prototype.onClickSeed = function () {
    this.guide();
    this.setListLength();
    if (this.nowTool == N.种植) {
      this.showBtn(this.btnHarvest);
      this.nowTool = N.收获;
    } else {
      this.showBtn(this.btnSeed);
      this.nowTool = N.种植;
    }
  };
  _ctor.prototype.onClickHarvest = function () {
    this.guide();
    this.showBtn(this.btnHarvest);
    this.nowTool = N.收获;
  };
  _ctor.prototype.onClickEverDay = function () {
    r_DailyUI.DailyUI.showUI();
  };
  _ctor.prototype.onClickRule = function () {
    r_HelpUI.HelpUI.showUI();
  };
  _ctor.prototype.onClickShop = function () {
    r_ShopUI.ShopUI.showUI();
  };
  _ctor.prototype.onClickMark = function () {
    r_CollectUI.CollectUI.showUI();
  };
  _ctor.prototype.onClickAddStr = function () {
    var e = this;
    r_UtilsSystem.UtilsSystem.showAlert("看视频加10点体力", 2, function () {
      e.addStrength(10);
    }, "加体力");
  };
  _ctor.prototype.onClickAllHarvest = function () {
    var e = this;
    if (this.btnAllHarvest.getController("c1").selectedIndex) {
      r_PlatformSystem.PlatformSystem.showVideo("一键收获", function () {
        r_PlayerData.PlayerData.data.farmAllHarvestVideo = 1;
        e.btnAllHarvest.getController("c1").selectedIndex = 0;
      });
    } else if (this.farmCom) {
      if (r_PlayerData.PlayerData.data.farmStrengthNum <= 0) {
        r_UtilsSystem.UtilsSystem.showTip("体力不足！");
        return void this.onClickAddStr();
      }
      var t = false;
      for (var o = 0; o < this.farmCom.infoNodeList.length; o++) {
        if ((n = (i = this.farmCom.infoNodeList[o]).info).landType != r_FarmCom.FarmLandType.未解锁 && n.plantType == r_FarmCom.FarmPlantType.成熟) {
          t = true;
          break;
        }
      }
      if (t) {
        for (o = 0; o < this.farmCom.infoNodeList.length; o++) {
          var i;
          var n;
          if ((n = (i = this.farmCom.infoNodeList[o]).info).landType != r_FarmCom.FarmLandType.未解锁 && n.plantType == r_FarmCom.FarmPlantType.成熟) {
            if (n.landType == r_FarmCom.FarmLandType.干涸) {
              this.harvestFruit(i, .5);
              n.plantTime = 0;
              n.plantId = -1;
              n.plantType = r_FarmCom.FarmPlantType.枯萎;
            } else {
              this.harvestFruit(i);
              n.plantTime = 0;
              n.plantId = -1;
              n.plantType = r_FarmCom.FarmPlantType.枯萎;
              n.landType == r_FarmCom.FarmLandType.施肥 && (n.landType = r_FarmCom.FarmLandType.正常);
            }
          }
        }
        this.useStrength();
        this.farmCom.showFarm();
      } else {
        r_UtilsSystem.UtilsSystem.showTip("没有可以收获的植物！");
      }
    }
  };
  _ctor.prototype.harvestFruit = function (e, t) {
    var o = this;
    undefined === t && (t = 1);
    var i = r_FarmSystem.FarmSystem.getFarmInfo(e.info.plantId);
    r_PlayerData.PlayerData.addCoin("农场收获植物", Math.floor(i.price * t));
    r_AnimSystem.AnimSystem.playCoinAnim(e);
    (Math.random() < i.markRate || r_DebugSystem.DebugSystem.farmType == r_DebugSystem.GMToolTypeFarm.bizhongYJ) && 0 != i.mark && r_HarvestUI.HarvestUI.showUI({
      id: i.mark,
      call: function () {
        r_PlayerData.PlayerData.addFarmMark(i.mark);
        o.showBtnMark();
      }
    });
  };
  _ctor.prototype.showBtnMark = function () {
    this.btnMark.getController("ql").selectedIndex = 1;
    this.btnMark.getController("bh").selectedIndex = 1;
    this.btnMark.getController("zq").selectedIndex = 1;
    this.btnMark.getController("xw").selectedIndex = 1;
    for (var e = 0; e < r_PlayerData.PlayerData.data.farmMarkList.length; e++) {
      var t = r_PlayerData.PlayerData.data.farmMarkList[e].id;
      if (1001 == t && r_PlayerData.PlayerData.isFarmMark(t)) {
        this.btnMark.getController("ql").selectedIndex = 0;
      } else if (1002 == t && r_PlayerData.PlayerData.isFarmMark(t)) {
        this.btnMark.getController("zq").selectedIndex = 0;
      } else if (1003 == t && r_PlayerData.PlayerData.isFarmMark(t)) {
        this.btnMark.getController("bh").selectedIndex = 0;
      } else {
        1004 == t && r_PlayerData.PlayerData.isFarmMark(t) && (this.btnMark.getController("xw").selectedIndex = 0);
      }
    }
  };
  _ctor.prototype.cD1 = function (e) {
    var t = this;
    var o = this.farmCom.bKNode;
    if (r_UtilsSystem.UtilsSystem.touchInNode(o, e) && 0 != r_PlayerData.PlayerData.data.farmCD1TO2) {
      this.isMask = true;
      this.farmCom.runChanTuAnim(o, function () {
        t.isMask = false;
        if (1 == r_PlayerData.PlayerData.data.farmCD1Num) {
          if (r_DaySystem.DaySystem.getHour() >= 0 && r_DaySystem.DaySystem.getHour() < 18) {
            t.digNum++;
            t.digBkSetTime && clearTimeout(t.digBkSetTime);
            t.digBkSetTime = setTimeout(function () {
              t.digNum = 0;
              t.digBkSetTime = null;
            }, 2e3);
            if (2 == t.digNum) {
              t.isMask = true;
              t.runCHAnim(o, "我真服了你个老6,挖我商店");
            } else if (4 == t.digNum) {
              t.isMask = true;
              t.runCHAnim(o, "你再挖,我就扣你50%资产");
            } else {
              5 == t.digNum && r_UtilsSystem.UtilsSystem.showAlert("偷挖策划商店,被扣除50%", 2, function () {
                t.digBkSetTime && clearTimeout(t.digBkSetTime);
                t.digNum = 0;
                t.digBkSetTime = null;
              }, "惩罚", "惩罚", "挽回", "认罚", function () {
                t.digBkSetTime && clearTimeout(t.digBkSetTime);
                t.digNum = 0;
                t.digBkSetTime = null;
                r_PlayerData.PlayerData.useCoin("农场挖商店惩罚", r_jsbi.default.divide(r_PlayerData.PlayerData.bigCoin, r_jsbi.default.BigInt(2)));
              });
            }
          } else {
            o.getChildByName("洞").active = true;
            o.getChildByName("进入动画").active = true;
          }
        } else if (0 == r_PlayerData.PlayerData.data.farmCD1Num && 1 == r_PlayerData.PlayerData.data.farmCD1TO2) {
          r_PlayerData.PlayerData.data.farmCD1TO2 = 0;
          r_UtilsSystem.UtilsSystem.showTip("策划已经把bug修复了！");
        }
      });
    }
  };
  _ctor.prototype.runCHAnim = function (e, t) {
    var o = this;
    this.digBkSetTime && clearTimeout(this.digBkSetTime);
    var i = e.getChildByName("策划动画");
    i.active = true;
    var n = e.getChildByName("初始位置");
    var a = e.getChildByName("终点位置");
    i.x = n.x;
    i.y = n.y;
    i.getComponent(sp.Skeleton).setAnimation(0, "chahua", false);
    cc.Tween.stopAllByTarget(i);
    cc.tween(i).to(.5, {
      x: a.x,
      y: a.y
    }).call(function () {
      i.getChildByName("气泡").active = true;
      i.getChildByName("文字").active = true;
      i.getChildByName("文字").getComponent(cc.Label).string = t;
    }).delay(3.5).to(.5, {
      x: n.x,
      y: n.y
    }).call(function () {
      o.digBkSetTime = setTimeout(function () {
        o.digNum = 0;
        o.digBkSetTime = null;
      }, 2e3);
      i.active = false;
      i.getChildByName("气泡").active = false;
      i.getChildByName("文字").active = false;
      o.isMask = false;
    }).start();
  };
  _ctor.prototype.GMTool = function () {
    if (r_DebugSystem.DebugSystem.farmType == r_DebugSystem.GMToolTypeFarm.jiqiYJ) {
      r_PlayerData.PlayerData.addFarmMark(1001);
      r_PlayerData.PlayerData.addFarmMark(1002);
      r_PlayerData.PlayerData.addFarmMark(1003);
      r_PlayerData.PlayerData.addFarmMark(1004);
      r_DebugSystem.DebugSystem.farmType = r_DebugSystem.GMToolTypeFarm.normal;
    } else if (r_DebugSystem.DebugSystem.farmType == r_DebugSystem.GMToolTypeFarm.CaiDan) {
      r_PlayerData.PlayerData.data.farmCD1Num = 1;
      r_PlayerData.PlayerData.data.farmCD1TO2 = 1;
      r_DebugSystem.DebugSystem.farmType = r_DebugSystem.GMToolTypeFarm.normal;
    }
  };
  _ctor.prototype.onShown = function () {
    var t = this;
    e.prototype.onShown.call(this);
    this.GMTool();
    this.touchEvent();
    this.setListLength();
    this.showBtnMark();
    r_PlayerData.PlayerData.data.farmPaper || r_TimeSystem.TimeSystem.scheduleOnce("FarmUI", .2, function () {
      r_PlantPaperUI.PlantPaperUI.showUI();
    });
    if (0 == r_PlayerData.PlayerData.data.farmAllHarvestVideo) {
      this.btnAllHarvest.getController("c1").selectedIndex = 1;
    } else {
      this.btnAllHarvest.getController("c1").selectedIndex = 0;
    }
    this.isMask = false;
    this.showBtn(this.btnHarvest);
    this.nowTool = N.收获;
    r_TimeSystem.TimeSystem.scheduleClear("farmUpdata");
    r_TimeSystem.TimeSystem.schedule("farmUpdata", .25, function () {
      t.showAllPlantTime();
      t.showStrength();
      if (r_DaySystem.DaySystem.getShowDay() > r_PlayerData.PlayerData.data.farmNowDay) {
        r_PlayerData.PlayerData.data.farmNowDay = r_DaySystem.DaySystem.getShowDay();
        r_PlayerData.PlayerData.data.farmTreeSeedNum = 1;
      }
    });
    this.checkRedTip();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TimeSystem.TimeSystem.scheduleClear("farmUpdata");
    this.touch.off(fgui.Event.TOUCH_BEGIN);
  };
  _ctor.prototype.checkRedTip = function () {
    this.btnEverDay.getChild("redTip").visible = r_DailyUI.DailyUI.canGet();
  };
  _ctor.Inst = null;
  __decorate([r_DecorateFunction1.AutoFind("touch")], _ctor.prototype, "touch", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnClear")], _ctor.prototype, "btnClear", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnWater")], _ctor.prototype, "btnWater", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnSM")], _ctor.prototype, "btnSM", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnSeed")], _ctor.prototype, "btnSeed", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnHarvest")], _ctor.prototype, "btnHarvest", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnEverDay")], _ctor.prototype, "btnEverDay", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnRule")], _ctor.prototype, "btnRule", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnShop")], _ctor.prototype, "btnShop", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnMark")], _ctor.prototype, "btnMark", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnAllHarvest")], _ctor.prototype, "btnAllHarvest", undefined);
  __decorate([r_DecorateFunction1.AutoFind("coinCom")], _ctor.prototype, "coinCom", undefined);
  __decorate([r_DecorateFunction1.AutoFind("str")], _ctor.prototype, "str", undefined);
  __decorate([r_DecorateFunction1.AutoFind("list")], _ctor.prototype, "list", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.FarmUI = exp_FarmUI;