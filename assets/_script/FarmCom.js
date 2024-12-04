var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FarmPlantType = exports.FarmLandType = undefined;
var r_FarmSystem = require("FarmSystem");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_FarmCfg = require("FarmCfg");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
exports.FarmLandType = cc.Enum({
  未解锁: 1,
  正常: 2,
  施肥: 3,
  干涸: 4
});
exports.FarmPlantType = cc.Enum({
  未种植: 3,
  幼苗: 0,
  成熟: 1,
  枯萎: 2
});
var def_FarmCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.spriteMap = null;
    t.landNode = null;
    t.touchNode = null;
    t.treeTouch = null;
    t.treeSeed = null;
    t.bKNode = null;
    t.nextKeyLand = null;
    t.infoList = [];
    t.initList = [{
      id: 0,
      landType: exports.FarmLandType.干涸,
      landTime: r_TimeSystem.TimeSystem.getServerTime(),
      plantType: exports.FarmPlantType.枯萎,
      plantId: 1,
      plantTime: 0
    }, {
      id: 1,
      landType: exports.FarmLandType.正常,
      landTime: r_TimeSystem.TimeSystem.getServerTime(),
      plantType: exports.FarmPlantType.未种植,
      plantId: 1,
      plantTime: 0
    }, {
      id: 2,
      landType: exports.FarmLandType.正常,
      landTime: r_TimeSystem.TimeSystem.getServerTime(),
      plantType: exports.FarmPlantType.未种植,
      plantId: 1,
      plantTime: 0
    }, {
      id: 3,
      landType: exports.FarmLandType.正常,
      landTime: r_TimeSystem.TimeSystem.getServerTime(),
      plantType: exports.FarmPlantType.未种植,
      plantId: 1,
      plantTime: 0
    }, {
      id: 6,
      landType: exports.FarmLandType.未解锁,
      landTime: 0,
      plantType: exports.FarmPlantType.未种植,
      plantId: 1,
      plantTime: 0
    }, {
      id: 6,
      landType: exports.FarmLandType.未解锁,
      landTime: 0,
      plantType: exports.FarmPlantType.未种植,
      plantId: 1,
      plantTime: 0
    }, {
      id: 6,
      landType: exports.FarmLandType.未解锁,
      landTime: 0,
      plantType: exports.FarmPlantType.未种植,
      plantId: 1,
      plantTime: 0
    }, {
      id: 7,
      landType: exports.FarmLandType.未解锁,
      landTime: 0,
      plantType: exports.FarmPlantType.未种植,
      plantId: 1,
      plantTime: 0
    }, {
      id: 8,
      landType: exports.FarmLandType.未解锁,
      landTime: 0,
      plantType: exports.FarmPlantType.未种植,
      plantId: 1,
      plantTime: 0
    }, {
      id: 9,
      landType: exports.FarmLandType.未解锁,
      landTime: 0,
      plantType: exports.FarmPlantType.未种植,
      plantId: 1,
      plantTime: 0
    }, {
      id: 10,
      landType: exports.FarmLandType.未解锁,
      landTime: 0,
      plantType: exports.FarmPlantType.未种植,
      plantId: 1,
      plantTime: 0
    }, {
      id: 11,
      landType: exports.FarmLandType.未解锁,
      landTime: 0,
      plantType: exports.FarmPlantType.未种植,
      plantId: 1,
      plantTime: 0
    }, {
      id: 12,
      landType: exports.FarmLandType.未解锁,
      landTime: 0,
      plantType: exports.FarmPlantType.未种植,
      plantId: 1,
      plantTime: 0
    }, {
      id: 12,
      landType: exports.FarmLandType.未解锁,
      landTime: 0,
      plantType: exports.FarmPlantType.未种植,
      plantId: 1,
      plantTime: 0
    }];
    t.infoNodeList = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    this.landNode = this.node.getChildByName("土地");
    this.touchNode = this.node.getChildByName("touch");
    this.treeTouch = this.node.getChildByName("树彩蛋").getChildByName("touch");
    this.treeSeed = this.node.getChildByName("树彩蛋").getChildByName("种子");
    this.bKNode = this.node.getChildByName("宝库彩蛋");
    if (r_PlayerData.PlayerData.data) {
      0 == r_PlayerData.PlayerData.data.farmInfoList.length && (r_PlayerData.PlayerData.data.farmInfoList = this.initList);
      this.infoList = r_PlayerData.PlayerData.data.farmInfoList;
    }
  };
  _ctor.prototype.start = function () {
    this.initFarm();
    this.initTree();
  };
  _ctor.prototype.severData = function () {
    var e = [];
    for (var t = 0; t < this.infoNodeList.length; t++) {
      var o = this.infoNodeList[t].info;
      e.push(o);
    }
    r_PlayerData.PlayerData.data.farmInfoList = e;
  };
  _ctor.prototype.initFarm = function () {
    var e = this.infoList;
    for (var t = 0; t < this.landNode.children.length; t++) {
      var i = this.landNode.children[t];
      i.info = {
        id: this.landNode.children.length - 1 - t,
        landType: exports.FarmLandType.未解锁,
        landTime: 0,
        plantType: exports.FarmPlantType.未种植,
        plantId: -1,
        plantTime: 0
      };
      cc.tween(i.getChildByName("收获").getChildByName("xx")).to(1, {
        y: -20
      }).to(1, {
        y: 0
      }).union().repeatForever().start();
      this.infoNodeList.unshift(i);
    }
    for (t = 0; t < e.length; t++) {
      for (var n = 0; n < this.infoNodeList.length; n++) {
        this.infoNodeList[n].info.id == e[t].id && (this.infoNodeList[n].info = e[t]);
      }
    }
    this.showFarm();
  };
  _ctor.prototype.showFarm = function () {
    var e = null;
    var t = null;
    for (var i = 0; i < this.infoNodeList.length; i++) {
      var n = this.infoNodeList[i].info;
      var a = this.infoNodeList[i];
      var s = a.getChildByName("地皮").getChildByName("image").getComponent(cc.Sprite);
      var r = a.getChildByName("植被").getChildByName("image").getComponent(cc.Sprite);
      var l = a.getChildByName("植被").getChildByName("anim");
      r.node.active = true;
      var p = a.getChildByName("收获");
      p.active = false;
      s.spriteFrame = this.spriteMap.getSpriteFrame("land" + n.landType);
      r.spriteFrame = null;
      if (n.plantType != exports.FarmPlantType.未种植) {
        if (n.plantType == exports.FarmPlantType.幼苗) {
          if (!l.active) {
            l.active = true;
            l.getComponent(sp.Skeleton).setAnimation(0, "xiaomiao", true);
          }
          "zhangchuxiaomiao" != l.getComponent(sp.Skeleton).animation && "xiaomiao" != l.getComponent(sp.Skeleton).animation && l.getComponent(sp.Skeleton).setAnimation(0, "xiaomiao", true);
          r.node.active = false;
          r_ResSystem.ResSystem.loadBundleUIImg(a.getChildByName("成熟提示").getChildByName("item"), "game2", "farm/item/item" + n.plantId);
        } else {
          l.active = false;
          if (n.plantType == exports.FarmPlantType.成熟) {
            a.getChildByName("成熟提示").active = false;
            p.active = true;
            var d = this.getFarmCfg(n.plantId);
            r_ResSystem.ResSystem.loadBundleUIImg(p.getChildByName("气泡").getChildByName("气泡"), "game2", "farm/item/" + d.lv);
            r_ResSystem.ResSystem.loadBundleUIImg(p.getChildByName("气泡").getChildByName("物品"), "game2", "farm/item/item" + d.id);
            r.spriteFrame = this.spriteMap.getSpriteFrame("plant" + n.plantType + "_2");
          } else {
            n.plantType == exports.FarmPlantType.枯萎 && (r.spriteFrame = this.spriteMap.getSpriteFrame("plant" + n.plantType));
          }
        }
      } else {
        l.active = false;
      }
      a.getChildByName("tipBg1").active = false;
      a.getChildByName("tipBg2").active = false;
      a.getChildByName("tipBg3").active = false;
      if (n.landType == exports.FarmLandType.未解锁 && e && null == t) {
        a.getChildByName("tipBg3").active = true;
        t = a;
      }
      if (n.landType == exports.FarmLandType.未解锁 && null == e) {
        e = a;
        if (0 == r_FarmCfg.LandValue[i]) {
          a.getChildByName("tipBg1").active = true;
          a.getChildByName("tipBg1").getChildByName("lab").getComponent(cc.Label).string = "免费解锁";
        } else if (-1 == r_FarmCfg.LandValue[i]) {
          a.getChildByName("tipBg2").active = true;
        } else {
          a.getChildByName("tipBg1").active = true;
          a.getChildByName("tipBg1").getChildByName("lab").getComponent(cc.Label).string = r_UtilsSystem.UtilsSystem.numFormats(r_FarmCfg.LandValue[i]) + "解锁";
        }
        e.value = r_FarmCfg.LandValue[i];
      }
    }
    this.nextKeyLand = e;
    this.severData();
  };
  _ctor.prototype.getFarmCfg = function (e) {
    for (var t = 0; t < r_FarmCfg.FarmCfg.length; t++) {
      if (r_FarmCfg.FarmCfg[t].id == e) {
        return r_FarmCfg.FarmCfg[t];
      }
    }
  };
  _ctor.prototype.runChanTuAnim = function (e, t) {
    var o = cc.instantiate(this.node.getChildByName("铲土动画"));
    o.active = true;
    o.parent = e;
    o.x = 0;
    o.y = 0;
    var i = o.getChildByName("铲土动画").getComponent(sp.Skeleton);
    i.setTrackCompleteListener(i.setAnimation(0, "chantu", false), function () {
      o.destroy();
      t && t();
    });
  };
  _ctor.prototype.runJiaoShuiAnim = function (e, t) {
    var o = cc.instantiate(this.node.getChildByName("浇水动画"));
    o.active = true;
    o.parent = e;
    o.x = 0;
    o.y = 0;
    var i = o.getChildByName("浇水动画").getComponent(sp.Skeleton);
    i.setTrackCompleteListener(i.setAnimation(0, "jiaoshui", false), function () {
      o.destroy();
      t && t();
    });
  };
  _ctor.prototype.runShiFeiAnim = function (e, t) {
    var o = cc.instantiate(this.node.getChildByName("施肥动画"));
    o.active = true;
    o.parent = e;
    o.x = 0;
    o.y = 0;
    var i = o.getChildByName("施肥动画").getComponent(sp.Skeleton);
    i.setTrackCompleteListener(i.setAnimation(0, "shifei", false), function () {
      o.destroy();
      t && t();
    });
  };
  _ctor.prototype.runZhongZhiAnim = function (e, t) {
    var o = e.getChildByName("植被").getChildByName("anim");
    o.active = true;
    var i = o.getComponent(sp.Skeleton);
    i.setTrackCompleteListener(i.setAnimation(0, "zhangchuxiaomiao", false), function () {
      i.setAnimation(0, "xiaomiao", true);
      t && t();
    });
  };
  _ctor.prototype.initTree = function () {
    var e = this.node.getChildByName("树彩蛋");
    if (1 == r_PlayerData.PlayerData.data.farmTreeType) {
      e.getChildByName("小苗").active = true;
    } else if (2 == r_PlayerData.PlayerData.data.farmTreeType) {
      e.getChildByName("树苗").active = true;
    } else if (3 == r_PlayerData.PlayerData.data.farmTreeType) {
      e.getChildByName("大树").active = true;
      e.getChildByName("土堆").active = false;
    }
    if (1 == r_PlayerData.PlayerData.data.farmTreeSeed) {
      e.getChildByName("种子").active = true;
      r_ResSystem.ResSystem.loadBundleUIImg(e.getChildByName("种子").getChildByName("种子"), "game2", "farm/item/item" + r_PlayerData.PlayerData.data.cdTreeSeedId);
    }
  };
  _ctor.prototype.waterTree = function (e) {
    var t = this.node.getChildByName("树彩蛋");
    if (0 == r_PlayerData.PlayerData.data.farmTreeType) {
      var o = t.getChildByName("动画");
      o.active = true;
      (n = o.getComponent(sp.Skeleton)).setTrackCompleteListener(n.setAnimation(0, "shu_1", false), function () {
        r_PlayerData.PlayerData.data.farmTreeType = 1;
        o.active = false;
        t.getChildByName("小苗").active = true;
        e && e();
      });
    } else if (1 == r_PlayerData.PlayerData.data.farmTreeType) {
      var i = t.getChildByName("动画");
      t.getChildByName("小苗").active = false;
      i.active = true;
      (n = i.getComponent(sp.Skeleton)).setTrackCompleteListener(n.setAnimation(0, "shu_2", false), function () {
        r_PlayerData.PlayerData.data.farmTreeType = 2;
        i.active = false;
        t.getChildByName("树苗").active = true;
        e && e();
      });
    } else if (2 == r_PlayerData.PlayerData.data.farmTreeType) {
      var n;
      var a = t.getChildByName("大树动画");
      t.getChildByName("树苗").active = false;
      a.active = true;
      (n = a.getComponent(sp.Skeleton)).setTrackCompleteListener(n.setAnimation(0, "shu_3", false), function () {
        r_PlayerData.PlayerData.data.farmTreeType = 3;
        a.active = false;
        t.getChildByName("大树").active = true;
        if (r_PlayerData.PlayerData.data.farmTreeSeedNum > 0) {
          t.getChildByName("种子").active = true;
          r_PlayerData.PlayerData.data.cdTreeSeedId = r_FarmSystem.FarmSystem.randOneSeed().id;
          r_ResSystem.ResSystem.loadBundleUIImg(t.getChildByName("种子").getChildByName("种子"), "game2", "farm/item/item" + r_PlayerData.PlayerData.data.cdTreeSeedId);
          r_PlayerData.PlayerData.data.farmTreeSeed = 1;
          r_PlayerData.PlayerData.data.farmTreeSeedNum -= 1;
        }
        e && e();
      });
    } else if (3 == r_PlayerData.PlayerData.data.farmTreeType) {
      e && e();
      if (r_PlayerData.PlayerData.data.farmTreeSeedNum > 0) {
        t.getChildByName("种子").active = true;
        r_PlayerData.PlayerData.data.cdTreeSeedId = r_FarmSystem.FarmSystem.randOneSeed().id;
        r_ResSystem.ResSystem.loadBundleUIImg(t.getChildByName("种子").getChildByName("种子"), "game2", "farm/item/item" + r_PlayerData.PlayerData.data.cdTreeSeedId);
        r_PlayerData.PlayerData.data.farmTreeSeed = 1;
        r_PlayerData.PlayerData.data.farmTreeSeedNum -= 1;
      }
    }
  };
  __decorate([_property({
    type: cc.SpriteAtlas,
    displayName: "图集"
  })], _ctor.prototype, "spriteMap", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_FarmCom;