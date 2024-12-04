var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var s;
var r_UIDef = require("UIDef");
var r_DebugSystem = require("DebugSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_BaseWin = require("BaseWin");
var r_DrawRewardUI = require("DrawRewardUI");
var r_MysteryShopUI = require("MysteryShopUI");
(function (e) {
  e[e["快速"] = 0] = "快速";
  e[e["中速"] = 1] = "中速";
  e[e["慢速"] = 2] = "慢速";
})(s || (s = {}));
var C = {
  totolVideo: 2,
  payDiamond: 18e4,
  cardDistance: 25,
  cardWith: 236,
  minX: -930,
  moveSpeed: [-60, -55, -50, -45, -40, -35, -30, -25, -20, -15, -10, -5],
  speedTime: [.01, .01, .01, .01, .01, .01, .01, .01, .01, .01, .01, .01],
  stayTime: [2, .1, .1, .1, .1, .1, .1, .1, .1, .1, .1, .1],
  content: ["你干嘛", "你讨厌", "现在还有人呢", "你不要这个样子", "好啦~好啦~，给你免费开一次箱"],
  contentSound: ["你干嘛", "你讨厌", "现在还有人呢", "你不要这个样子", "好啦好啦"]
};
var S = [{
  id: 1,
  name: "100万钻石",
  type: 1,
  count: 1e6,
  goodsId: 0,
  pr: .01,
  bg: "bg_hong",
  di: "di_hong",
  iconName: "钻石卡",
  desc: "100万",
  sortId: 1
}, {
  id: 2,
  name: "12万钻石",
  type: 1,
  count: 12e4,
  goodsId: 0,
  pr: .1,
  bg: "bg_bai",
  di: "di_lan",
  iconName: "钻石卡",
  desc: "12万",
  sortId: 2
}, {
  id: 3,
  name: "5万钻石",
  type: 1,
  count: 5e4,
  goodsId: 0,
  pr: .3,
  bg: "bg_bai",
  di: "di_lan",
  iconName: "钻石卡",
  desc: "5万",
  sortId: 3
}, {
  id: 4,
  name: "1亿金币",
  type: 2,
  count: 1e8,
  goodsId: 0,
  pr: .01,
  bg: "bg_hong",
  di: "di_hong",
  iconName: "金币卡",
  desc: "1个亿",
  sortId: 4
}, {
  id: 5,
  name: "888万金币",
  type: 2,
  count: 888e4,
  goodsId: 0,
  pr: .1,
  bg: "bg_bai",
  di: "di_lan",
  iconName: "金币卡",
  desc: "888万",
  sortId: 5
}, {
  id: 6,
  name: "88万金币",
  type: 2,
  count: 88e4,
  goodsId: 0,
  pr: .3,
  bg: "bg_bai",
  di: "di_lan",
  iconName: "金币卡",
  desc: "88万",
  sortId: 6
}, {
  id: 7,
  name: "兑换卡",
  type: 3,
  count: 1,
  goodsId: 0,
  pr: .01,
  bg: "bg_huang",
  di: "di_huang",
  iconName: "兑换卡",
  desc: "兑换卡",
  sortId: 7
}, {
  id: 8,
  name: "免广卡",
  type: 3,
  count: 1,
  goodsId: 48,
  pr: .01,
  bg: "bg_huang",
  di: "di_huang",
  iconName: "免广卡",
  desc: "免广卡",
  sortId: 8
}, {
  id: 9,
  name: "手信",
  type: 3,
  count: 1,
  goodsId: 42,
  pr: .05,
  bg: "bg_zi",
  di: "di_zi",
  iconName: "手信",
  desc: "手信",
  sortId: 9
}, {
  id: 10,
  name: "营业证",
  type: 3,
  count: 1,
  goodsId: 41,
  pr: .05,
  bg: "bg_zi",
  di: "di_zi",
  iconName: "营业证",
  desc: "营业证",
  sortId: 10
}, {
  id: 11,
  name: "种植证",
  type: 3,
  count: 1,
  goodsId: 47,
  pr: .05,
  bg: "bg_zi",
  di: "di_zi",
  iconName: "种植证",
  desc: "种植证",
  sortId: 11
}, {
  id: 12,
  name: "狩猎证",
  type: 3,
  count: 1,
  goodsId: 49,
  pr: .01,
  bg: "bg_zi",
  di: "di_zi",
  iconName: "狩猎证",
  desc: "狩猎证",
  sortId: 12
}];
var def_MysteryShopDrawCard = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.MysteryShop, r_UIDef.UIDef.Res.UI.MysteryShopDrawCard) || this;
    t.m_itemList = [];
    t.curClick = 0;
    t.curContentIndex = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.MysteryShopDrawCard, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.MysteryShopDrawCard);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.btnBack.onClick(this.onClickBack, this);
    this.clickLayer.onClick(function () {}, this);
    this.btnOpen.onClick(this.onClickOpen, this);
    this.btnVideo.onClick(this.onClickVideo, this);
    this.roleCom.onClick(this.onClickRole, this);
    for (var o = 0; o < S.length; o++) {
      this.m_itemList[o] = this.contentPane.getChild("drawItem" + (o + 1)).asCom;
      this.m_itemList[o].getChild("bg").asLoader.url = "ui://MysteryShop/" + S[o].bg;
      this.m_itemList[o].getChild("di").asLoader.url = "ui://MysteryShop/" + S[o].di;
      r_ResSystem.ResSystem.loadBundleFguiImg(this.m_itemList[o].getChild("icon"), "bundle2", "mysteryShop/drawGoods/" + S[o].iconName);
      this.m_itemList[o].getChild("lbDesc").asTextField.text = S[o].desc;
    }
    r_ResSystem.ResSystem.loadBundleRes("bundle2", "mysteryShop/roleAnim", cc.Prefab, function (e, o) {
      var i = cc.instantiate(o);
      t.roleCom.getChild("roleAnim").node.addChild(i);
      t.roleCom.getChild("roleAnim").node.getChildByName("anim").getComponent(sp.Skeleton).setAnimation(0, "step_1", true);
    });
    r_ResSystem.ResSystem.loadBundleRes("bundle2", "mysteryShop/boxAnim", cc.Prefab, function (e, o) {
      var i = cc.instantiate(o);
      t.boxAnim.node.addChild(i);
    });
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.contentPane.getController("c1").selectedIndex = 0;
    this.resetData();
    this.btnVideo.getChild("lbCount").text = "(" + r_PlayerData.PlayerData.data.mysteryShopMap.videoCount + "/" + C.totolVideo + ")";
    this.lbNum.text = r_UtilsSystem.UtilsSystem.numFormats(C.payDiamond);
    r_TimeSystem.TimeSystem.registUpdate("mysteryShopUpdate", this.update.bind(this));
    this.showQipao("你准备好了吗？");
    r_SoundMgr.SoundMgr.playSound("mysteryShop/你准备好了吗");
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TimeSystem.TimeSystem.unregistUpdate("mysteryShopUpdate");
  };
  _ctor.prototype.refreshItem = function () {
    r_UtilsSystem.UtilsSystem.shuffle(S);
    for (var e = 0; e < S.length; e++) {
      this.m_itemList[e].getChild("bg").asLoader.url = "ui://MysteryShop/" + S[e].bg;
      this.m_itemList[e].getChild("di").asLoader.url = "ui://MysteryShop/" + S[e].di;
      r_ResSystem.ResSystem.loadBundleFguiImg(this.m_itemList[e].getChild("icon"), "bundle2", "mysteryShop/drawGoods/" + S[e].iconName);
      this.m_itemList[e].getChild("lbDesc").asTextField.text = S[e].desc;
    }
  };
  _ctor.prototype.resetData = function () {
    this.m_Runing = false;
    this.m_time = 0;
    this.m_stateTime = 0;
    this.m_state = s.快速;
    this.curClick = 0;
    this.curContentIndex = 0;
  };
  _ctor.prototype.onClickBack = function () {
    if (this.m_Runing) {
      return r_UtilsSystem.UtilsSystem.showTip("开卡中");
    }
    r_MysteryShopUI.default.Inst && r_MysteryShopUI.default.Inst.refreshExchangeNum();
    this.hide();
  };
  _ctor.prototype.onClickOpen = function () {
    if (!this.m_Runing) {
      if (r_PlayerData.PlayerData.isCoinEnough(C.payDiamond)) {
        r_PlayerData.PlayerData.deleteCoin("商店扣钱", C.payDiamond);
        this.draw();
      } else {
        r_UtilsSystem.UtilsSystem.showTip("钱不够~");
      }
    }
  };
  _ctor.prototype.onClickVideo = function () {
    var e = this;
    this.m_Runing || r_PlatformSystem.PlatformSystem.showVideo("神秘商店抽奖", function () {
      r_PlayerData.PlayerData.data.mysteryShopMap.videoCount += 1;
      e.btnVideo.getChild("lbCount").text = "(" + r_PlayerData.PlayerData.data.mysteryShopMap.videoCount + "/" + C.totolVideo + ")";
      if (r_PlayerData.PlayerData.data.mysteryShopMap.videoCount >= 2) {
        r_PlayerData.PlayerData.data.mysteryShopMap.videoCount = 0;
        e.btnVideo.getChild("lbCount").text = "(" + r_PlayerData.PlayerData.data.mysteryShopMap.videoCount + "/" + C.totolVideo + ")";
        e.draw();
      }
      r_PlayerData.PlayerData.saveData();
    });
  };
  _ctor.prototype.randomResult = function () {
    var e = 0;
    var t = Math.random();
    for (var o = 0; o < S.length; o++) {
      if (t < (e += S[o].pr)) {
        this.m_rewardId = S[o].id;
        break;
      }
    }
    if (r_PlatformSystem.PlatformSystem.getIsWebPlatform()) {
      if (r_DebugSystem.DebugSystem.mysteryShopType == r_DebugSystem.GMToolTypeMysteryShop.one) {
        this.m_rewardId = 1;
      } else if (r_DebugSystem.DebugSystem.mysteryShopType == r_DebugSystem.GMToolTypeMysteryShop.two) {
        this.m_rewardId = 4;
      } else {
        r_DebugSystem.DebugSystem.mysteryShopType > r_DebugSystem.GMToolTypeMysteryShop.two && r_DebugSystem.DebugSystem.mysteryShopType <= r_DebugSystem.GMToolTypeMysteryShop.eight && (this.m_rewardId = 4 + r_DebugSystem.DebugSystem.mysteryShopType);
      }
    }
  };
  _ctor.prototype.draw = function () {
    var e = this;
    if (!this.m_Runing) {
      this.m_Runing = true;
      this.showSpineAnim(this.boxAnim.node.getChildByName("anim"), "animation", false);
      r_TimeSystem.TimeSystem.scheduleOnce("draw", .5, function () {
        e.contentPane.getController("c1").selectedIndex = 1;
        e.randomResult();
        e.m_state = s.快速;
        e.boxAnim.node.getChildByName("anim").getComponent(sp.Skeleton).animation = null;
      });
    }
  };
  _ctor.prototype.refreshItemPos = function () {
    var e = this;
    for (var t = 0; t < S.length; t++) {
      this.m_itemList[t].x += C.moveSpeed[this.m_state];
      var o = this.m_itemList[t].x - 375;
    }
    for (t = 0; t < S.length; t++) {
      this.m_itemList[t].x <= C.minX && (this.m_itemList[t].x = 0 == t ? this.m_itemList[S.length - 1].x + C.cardWith + C.cardDistance : this.m_itemList[t - 1].x + C.cardWith + C.cardDistance);
    }
    if (this.m_state >= C.stayTime.length - 1) {
      o = this.m_itemList[this.m_rewardId - 1].x - 375;
      if (Math.abs(o) < 10) {
        this.m_Runing = false;
        r_TimeSystem.TimeSystem.scheduleOnce("drawReward", 1, function () {
          e.contentPane.getController("c1").selectedIndex = 0;
          e.resetData();
          r_DrawRewardUI.default.showUI({
            rewardInfo: S[e.m_rewardId - 1]
          });
        });
      }
    }
  };
  _ctor.prototype.setMoveState = function () {
    if (this.m_state < C.stayTime.length - 1 && this.m_stateTime > C.stayTime[this.m_state]) {
      if (this.m_state == C.stayTime.length - 6) {
        if (this.m_itemList[this.m_rewardId - 1].x > 900 && this.m_itemList[this.m_rewardId - 1].x < 950) {
          this.m_stateTime = 0;
          this.m_state += 1;
        }
      } else {
        this.m_stateTime = 0;
        this.m_state += 1;
      }
    }
  };
  _ctor.prototype.update = function (e) {
    if (this.m_Runing) {
      this.m_time += e;
      this.m_stateTime += e;
      this.setMoveState();
      if (this.m_time > C.speedTime[this.m_state]) {
        this.m_time = 0;
        this.refreshItemPos();
      }
    }
  };
  _ctor.prototype.showSpineAnim = function (e, t, o, i) {
    undefined === o && (o = false);
    e.active = true;
    var n = e.getComponent(sp.Skeleton);
    var a = n.setAnimation(0, t, o);
    o || n.setTrackCompleteListener(a, function () {
      i && i();
    });
  };
  _ctor.prototype.showQipao = function (e) {
    if ("" != e) {
      this.qipao.visible = true;
      cc.Tween.stopAllByTarget(this.qipao.node);
      this.qipao.getChild("content").text = e;
      this.qipao.node.scale = 1;
      cc.tween(this.qipao.node).delay(3).to(.5, {
        scale: 0
      }).start();
    }
  };
  _ctor.prototype.onClickRole = function () {
    var e = this;
    r_PlayerData.PlayerData.data.mysteryShopMap.caidan || this.curContentIndex < C.content.length && (this.curClick += 1, this.curClick >= 3 && (this.curClick = 0, this.showSpineAnim(this.roleCom.getChild("roleAnim").node.getChildByName("anim"), "step_2", false, function () {
      e.showSpineAnim(e.roleCom.getChild("roleAnim").node.getChildByName("anim"), "step_1", true);
    }), this.showQipao(C.content[this.curContentIndex]), r_SoundMgr.SoundMgr.playSound("mysteryShop/" + C.contentSound[this.curContentIndex]), this.curContentIndex += 1, r_PlayerData.PlayerData.data.mysteryShopMap.caidan || this.curContentIndex >= C.content.length && (r_PlatformSystem.PlatformSystem.getIsWebPlatform() || (r_PlayerData.PlayerData.data.mysteryShopMap.caidan = 1, r_PlayerData.PlayerData.saveData()), r_TimeSystem.TimeSystem.scheduleOnce("freeDraw", 1, function () {
      e.draw();
    }))));
  };
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnOpen")], _ctor.prototype, "btnOpen", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnVideo")], _ctor.prototype, "btnVideo", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbNum")], _ctor.prototype, "lbNum", undefined);
  __decorate([r_DecorateFunction1.AutoFind("clickLayer")], _ctor.prototype, "clickLayer", undefined);
  __decorate([r_DecorateFunction1.AutoFind("roleCom")], _ctor.prototype, "roleCom", undefined);
  __decorate([r_DecorateFunction1.AutoFind("boxAnim")], _ctor.prototype, "boxAnim", undefined);
  __decorate([r_DecorateFunction1.AutoFind("qipao")], _ctor.prototype, "qipao", undefined);
  return __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.default = def_MysteryShopDrawCard;