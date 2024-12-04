var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_GameKeyMgr = require("GameKeyMgr");
var r_TriggerActionMgr = require("TriggerActionMgr");
var r_BehaviorMgr = require("BehaviorMgr");
var r_DebugSystem = require("DebugSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_SoundMgr = require("SoundMgr");
var r_FerruleGameLogic = require("FerruleGameLogic");
var r_FerruleJianBao = require("FerruleJianBao");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_JianBaoLogic = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.roleQiPao = null;
    t.imageNum = null;
    t.btnGroup1 = null;
    t.btnJianBao = null;
    t.labCount = null;
    t.btnAdd = null;
    t.btnGroup2 = null;
    t.cleanParent = null;
    t.expectParent = null;
    t.labValue = null;
    t.arrawUpNode = null;
    t.arrawDownNode = null;
    t.numSpriteFrame = [];
    t.m_shuaCount = 0;
    t.m_curIndex = 0;
    t.m_itemList = [];
    t.m_win = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    var e = this;
    this.initUI();
    var t = function (t) {
      var o = r_PlayerData.PlayerData.data.ferruleGameMap.jianbaoList[t];
      r_ResSystem.ResSystem.loadBundleRes("game5", "ferruleGame/clearNode" + o, cc.Prefab, function (t, i) {
        var n = cc.instantiate(i);
        e.cleanParent.addChild(n);
        n.x = 1500;
        n.y = 0;
        r_UtilsSystem.UtilsSystem.getDeepChildByName(n, "刷子").active = false;
        e.m_itemList.push({
          node: n,
          id: o
        });
        1 == e.m_itemList.length && e.startJianBao();
      });
    };
    for (var o = 0; o < r_PlayerData.PlayerData.data.ferruleGameMap.jianbaoList.length; o++) {
      t(o);
    }
  };
  _ctor.prototype.initUI = function () {
    this.roleQiPao.active = false;
    this.imageNum.active = false;
    this.imageNum.parent.active = false;
    this.btnGroup1.active = false;
    this.btnGroup2.active = false;
    this.expectParent.active = false;
    this.m_shuaCount = r_PlayerData.PlayerData.data.ferruleGameMap.jianbaoNum;
    if (this.m_shuaCount <= 0) {
      this.btnAdd.active = true;
      this.btnJianBao.active = false;
    } else {
      this.btnAdd.active = false;
      this.btnJianBao.active = true;
    }
  };
  _ctor.prototype.showRemainNum = function () {
    var e = this.m_itemList.length - this.m_curIndex - 1;
    this.imageNum.getComponent(cc.Sprite).spriteFrame = this.numSpriteFrame[e];
    this.imageNum.parent.active = !(e <= 0);
  };
  _ctor.prototype.showGoodsValue = function (e, t) {
    undefined === t && (t = false);
    this.labValue.string = r_UtilsSystem.UtilsSystem.numFormats(e);
    if (t) {
      if (e > this.m_goodsInfo.value[0]) {
        this.arrawUpNode.active = true;
        this.arrawDownNode.active = false;
        this.showUpArrawAnim();
      } else {
        this.arrawUpNode.active = false;
        this.arrawDownNode.active = true;
        this.showDownArrawAnim();
      }
    } else {
      this.arrawUpNode.active = false;
      this.arrawDownNode.active = false;
    }
  };
  _ctor.prototype.showUpArrawAnim = function () {
    cc.tween(this.arrawUpNode).repeatForever(cc.tween().to(.3, {
      y: 20
    }).to(.3, {
      y: 0
    })).start();
  };
  _ctor.prototype.showDownArrawAnim = function () {
    cc.tween(this.arrawDownNode).repeatForever(cc.tween().to(.3, {
      y: -20
    }).to(.3, {
      y: 0
    })).start();
  };
  _ctor.prototype.showJianBaoCount = function () {
    this.labCount.string = "(" + this.m_shuaCount + "/3)";
    if (this.m_shuaCount <= 0) {
      this.btnAdd.active = true;
      this.btnJianBao.active = false;
    } else {
      this.btnAdd.active = false;
      this.btnJianBao.active = true;
    }
  };
  _ctor.prototype.startJianBao = function () {
    var e = this;
    this.initUI();
    this.m_goodsInfo = r_FerruleGameLogic.FerruleGoodsList[this.m_itemList[this.m_curIndex].id - 1];
    cc.tween(this.m_itemList[this.m_curIndex].node).to(.5, {
      x: 0
    }).call(function () {
      e.roleQiPao.active = true;
      e.imageNum.active = true;
      e.imageNum.parent.active = true;
      e.btnGroup1.active = true;
      e.expectParent.active = true;
      e.showRoleQiPao("我从批发市场进的", "我从批发市场进的");
      e.showGoodsValue(e.m_goodsInfo.value[0], false);
      e.showRemainNum();
    }).start();
  };
  _ctor.prototype.showNodeSpineAnim = function (e, t, o, i) {
    undefined === o && (o = true);
    e.active = true;
    var n = e.getComponent(sp.Skeleton);
    n.paused = false;
    n.timeScale = 1;
    console.log("人物动画 ", t);
    var a = n.setAnimation(0, t, o);
    o || n.setTrackCompleteListener(a, function () {
      i && i();
    });
  };
  _ctor.prototype.update = function () {
    if (r_GameKeyMgr.GameKeyMgr.has("套圈刷完成") || r_GameKeyMgr.GameKeyMgr.has("套圈刷完成|播放")) {
      if (r_GameKeyMgr.GameKeyMgr.has("套圈刷完成|播放")) {
        if (this.m_win) {
          if (2 == this.m_itemList[this.m_curIndex].id) {
            var e = r_UtilsSystem.UtilsSystem.getDeepChildByName(this.m_itemList[this.m_curIndex].node, "zhen");
            this.showNodeSpineAnim(e, "step_2", false);
          } else if (9 == this.m_itemList[this.m_curIndex].id) {
            (t = r_UtilsSystem.UtilsSystem.getDeepChildByName(this.m_itemList[this.m_curIndex].node, "zhen_1")).active = false;
            this.showResult(true);
          }
        } else if (2 == this.m_itemList[this.m_curIndex].id) {
          var t = r_UtilsSystem.UtilsSystem.getDeepChildByName(this.m_itemList[this.m_curIndex].node, "jia");
          this.showNodeSpineAnim(t, "step_1", false);
        } else if (9 == this.m_itemList[this.m_curIndex].id) {
          (t = r_UtilsSystem.UtilsSystem.getDeepChildByName(this.m_itemList[this.m_curIndex].node, "zhen_1")).active = false;
          this.showResult(false);
        }
      }
      this.cleanFinish();
    }
  };
  _ctor.prototype.showRoleQiPao = function (e, t, o) {
    var i = this;
    r_SoundMgr.SoundMgr.stopAllSound();
    r_SoundMgr.SoundMgr.playSound("ferruleGame/" + t);
    this.roleQiPao.opacity = 255;
    this.roleQiPao.parent.opacity = 255;
    this.roleQiPao.getChildByName("label").getComponent(cc.Label).string = e;
    cc.Tween.stopAllByTarget(this.roleQiPao);
    cc.tween(this.roleQiPao).delay(2).call(function () {
      o && o();
      i.roleQiPao.opacity = 0;
    }).start();
  };
  _ctor.prototype.cleanFinish = function () {
    this.btnGroup2.active = true;
    if (this.m_win) {
      this.showGoodsValue(this.m_goodsInfo.value[1], true);
      this.showRoleQiPao("这是真的", "这是真的");
    } else {
      this.showGoodsValue(this.m_goodsInfo.value[2], true);
      this.showRoleQiPao("真的太可惜了", "真的太可惜了");
    }
    r_GameKeyMgr.GameKeyMgr.remove("套圈刷完成");
    r_GameKeyMgr.GameKeyMgr.clear();
    r_TriggerActionMgr.TriggerActionMgr.clear();
    r_BehaviorMgr.BehaviorMgr.stopAll();
  };
  _ctor.prototype.checkIsWin = function () {
    var e = Math.random();
    if (r_PlatformSystem.PlatformSystem.getIsWebPlatform()) {
      if (r_DebugSystem.DebugSystem.ferruleType == r_DebugSystem.GMToolTypeFerrule.jiandingzhen) {
        e = 0;
      } else {
        r_DebugSystem.DebugSystem.ferruleType == r_DebugSystem.GMToolTypeFerrule.jiandingjia && (e = 2);
      }
    }
    if (e < this.m_goodsInfo.pr[1]) {
      this.m_win = true;
      9 != this.m_itemList[this.m_curIndex].id && this.showResult(true);
    } else {
      this.m_win = false;
      if (9 != this.m_itemList[this.m_curIndex].id) {
        if (2 == this.m_itemList[this.m_curIndex].id) {
          this.showResult(true);
        } else {
          this.showResult(false);
        }
      }
    }
  };
  _ctor.prototype.showResult = function (e) {
    undefined === e && (e = true);
    var t = r_UtilsSystem.UtilsSystem.getDeepChildByName(this.m_itemList[this.m_curIndex].node, "zhen");
    var o = r_UtilsSystem.UtilsSystem.getDeepChildByName(this.m_itemList[this.m_curIndex].node, "jia");
    if (e) {
      t && (t.active = true);
      o && (o.active = false);
    } else {
      t && (t.active = false);
      o && (o.active = true);
    }
  };
  _ctor.prototype.onClickJianBao = function () {
    r_SoundMgr.SoundMgr.playSound("click");
    r_FerruleJianBao.FerruleJianBao.Inst && (r_FerruleJianBao.FerruleJianBao.Inst.m_GameIng = true);
    this.m_shuaCount -= 1;
    r_PlayerData.PlayerData.data.ferruleGameMap.jianbaoNum = this.m_shuaCount;
    this.showJianBaoCount();
    r_UtilsSystem.UtilsSystem.getDeepChildByName(this.m_itemList[this.m_curIndex].node, "刷子").active = true;
    this.checkIsWin();
    this.btnGroup1.active = false;
    r_PlayerData.PlayerData.data.ferruleGameMap.jianbaoList.splice(0, 1);
    r_PlayerData.PlayerData.saveData();
  };
  _ctor.prototype.onClickAddCount = function () {
    var e = this;
    r_SoundMgr.SoundMgr.playSound("click");
    r_PlatformSystem.PlatformSystem.showVideo("套圈补充次数", function () {
      e.m_shuaCount = 3;
      r_PlayerData.PlayerData.data.ferruleGameMap.jianbaoNum = e.m_shuaCount;
      e.showJianBaoCount();
    });
  };
  _ctor.prototype.onClickSell1 = function () {
    var e = this;
    r_SoundMgr.SoundMgr.playSound("click");
    r_PlayerData.PlayerData.addCoin("套圈鉴宝卖出", this.m_goodsInfo.value[0]);
    this.btnGroup1.active = false;
    if (this.m_itemList.length <= 1) {
      r_FerruleJianBao.FerruleJianBao.Inst.hide();
    } else {
      cc.tween(this.m_itemList[this.m_curIndex].node).to(.5, {
        x: -2500
      }).call(function () {
        e.startJianBao();
      }).start();
      this.m_itemList.splice(0, 1);
      r_PlayerData.PlayerData.data.ferruleGameMap.jianbaoList.splice(0, 1);
      r_PlayerData.PlayerData.saveData();
    }
  };
  _ctor.prototype.onClickSell2 = function () {
    var e = this;
    r_SoundMgr.SoundMgr.playSound("click");
    this.btnGroup2.active = false;
    if (this.m_win) {
      r_PlayerData.PlayerData.addCoin("套圈鉴宝卖出", this.m_goodsInfo.value[1]);
    } else {
      r_PlayerData.PlayerData.addCoin("套圈鉴宝卖出", this.m_goodsInfo.value[2]);
    }
    r_FerruleJianBao.FerruleJianBao.Inst && (r_FerruleJianBao.FerruleJianBao.Inst.m_GameIng = false);
    if (this.m_itemList.length <= 1) {
      r_FerruleJianBao.FerruleJianBao.Inst.hide();
    } else {
      cc.tween(this.m_itemList[this.m_curIndex].node).to(.5, {
        x: -2500
      }).call(function () {
        e.startJianBao();
      }).start();
      this.m_itemList.splice(0, 1);
    }
  };
  _ctor.prototype.onClickSellDouble = function () {
    var e = this;
    r_SoundMgr.SoundMgr.playSound("click");
    this.btnGroup2.active = false;
    r_PlatformSystem.PlatformSystem.showVideo("套圈加倍卖出", function () {
      var t = e.m_goodsInfo.value[1];
      var o = r_UtilsSystem.UtilsSystem.getRandomNum(2, 5);
      t = e.m_win ? e.m_goodsInfo.value[1] * o : e.m_goodsInfo.value[2] * o;
      r_PlayerData.PlayerData.addCoin("套圈鉴宝卖出", t);
      r_FerruleJianBao.FerruleJianBao.Inst && (r_FerruleJianBao.FerruleJianBao.Inst.m_GameIng = false);
      if (e.m_itemList.length <= 1) {
        r_FerruleJianBao.FerruleJianBao.Inst.hide();
      } else {
        cc.tween(e.m_itemList[e.m_curIndex].node).to(.5, {
          x: -2500
        }).call(function () {
          e.startJianBao();
        }).start();
        e.m_itemList.splice(0, 1);
      }
    });
  };
  __decorate([_property({
    type: cc.Node,
    displayName: "人物气泡"
  })], _ctor.prototype, "roleQiPao", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "剩余鉴宝数量"
  })], _ctor.prototype, "imageNum", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "按钮组1"
  })], _ctor.prototype, "btnGroup1", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "鉴宝按钮"
  })], _ctor.prototype, "btnJianBao", undefined);
  __decorate([_property({
    type: cc.Label,
    displayName: "鉴宝按钮的次数"
  })], _ctor.prototype, "labCount", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "补充鉴宝次数按钮"
  })], _ctor.prototype, "btnAdd", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "按钮组2"
  })], _ctor.prototype, "btnGroup2", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "擦除父节点"
  })], _ctor.prototype, "cleanParent", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "预估收益面板"
  })], _ctor.prototype, "expectParent", undefined);
  __decorate([_property({
    type: cc.Label,
    displayName: "预估收益"
  })], _ctor.prototype, "labValue", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "箭头Up（绿）"
  })], _ctor.prototype, "arrawUpNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "箭头down（红）"
  })], _ctor.prototype, "arrawDownNode", undefined);
  __decorate([_property({
    type: cc.SpriteFrame,
    displayName: "数字精灵帧"
  })], _ctor.prototype, "numSpriteFrame", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_JianBaoLogic;