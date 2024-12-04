var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LuckBagOpenUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_PlatformSystem = require("PlatformSystem");
var r_ResSystem = require("ResSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_SoundMgr = require("SoundMgr");
var r_LuckBagSystem = require("LuckBagSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_TimeSystem = require("TimeSystem");
var r_LuckBagUI = require("LuckBagUI");
var r_LuckBagResultUI = require("LuckBagResultUI");
var r_LuckBagGetRewardUI = require("LuckBagGetRewardUI");
var r_LuckBagCollectUI = require("LuckBagCollectUI");
var r_DebugSystem = require("DebugSystem");
var exp_LuckBagOpenUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.LuckBag, r_UIDef.UIDef.Res.UI.LuckBagOpenUI) || this;
    t.uiType = "fullScreen";
    t.isCaidan = false;
    t.isCaidanShow = false;
    t.initGoodsAnimPos = null;
    t.curOpenCount = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.LuckBagOpenUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.LuckBagOpenUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("BtnClose").asButton.onClick(this.hide, this);
    this.collectCom.onClick(this.onClickCollect, this);
    this.btnAdd.onClick(this.onClickAdd, this);
    this.btnOpen.onClick(this.onClickOpen, this);
    this.btnSell.onClick(this.onClickSell, this);
    this.btnAdd.visible = false;
    this.btnOpen.visible = false;
    this.btnSell.visible = false;
    r_TYEventDispatcher.TYEventDispatcher.on("cleanFinishLuckBag", this.cleanFinish, this);
    r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/luckBag/bagAnim", cc.Prefab, function (e, o) {
      var i = cc.instantiate(o);
      t.bagAnim.node.addChild(i);
    });
    this.initGoodsAnimPos = new cc.Vec2(this.goodsAnim.node.x, this.goodsAnim.node.y);
  };
  _ctor.prototype.onShown = function () {
    var o = this;
    e.prototype.onShown.call(this);
    _ctor.Inst = this;
    this.isCaidan = false;
    this.isCaidanShow = false;
    this.bag.visible = true;
    this.bagAnim.visible = false;
    this.goodsAnim.visible = false;
    this.goodsItem1.visible = false;
    this.goodsItem2.visible = false;
    this.imageUP.visible = false;
    this.imageDown.visible = false;
    this.contentPane.getController("c1").selectedIndex = 0;
    this.curOpenCount = 0;
    this.qipaoCom.node.scale = 0;
    this.btnOpen.getController("open").selectedIndex = 0;
    this.lbForeCastMoney.bold = false;
    r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/luckBag/big/luckBagOpen", cc.Prefab, function (e, t) {
      o.prefab && o.prefab.destroy();
      o.prefab = cc.instantiate(t);
      o.prefab.active = true;
      o.bag.node.addChild(o.prefab);
      if (r_PlayerData.PlayerData.data.luckBagMap.caidanList[1]) {
        o.prefab.getChildByName("cleanArea").active = false;
      } else if (r_LuckBagSystem.LuckBagSystem.triggerCaidan.length > 0) {
        o.prefab.getChildByName("cleanArea").active = false;
      } else {
        o.prefab.getChildByName("cleanArea").active = true;
      }
      o.refreshAll();
    });
    this.refreshCollectAnimalSign();
    this.showQiPao();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.Inst = null;
    if (this.prefab) {
      this.prefab.destroy();
      this.prefab = null;
    }
  };
  _ctor.prototype.refreshAll = function () {
    var e = this;
    this.refreshBtn();
    if (this.prefab) {
      r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/luckBag/big/" + this.data.luckBagData.bigPic, cc.SpriteFrame, function (t, o) {
        if (t) {
          console.error("加载失败: ", t);
        } else {
          r_UtilsSystem.UtilsSystem.getDeepChildByName(e.prefab, "bag").getComponent(cc.Sprite).spriteFrame = o;
        }
      });
      this.lbBuyMoney.text = r_UtilsSystem.UtilsSystem.numFormats(this.data.luckBagData.coin);
      this.lbForeCastMoney.text = "???";
    }
  };
  _ctor.prototype.onClickAdd = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("补充切石次数", function () {
      r_LuckBagSystem.LuckBagSystem.refreshCutNum();
      e.refreshBtn();
    });
  };
  _ctor.prototype.onClickCollect = function () {
    var e = this;
    r_LuckBagCollectUI.default.showUI({
      callback: function () {
        e.refreshCollectAnimalSign();
      }
    });
  };
  _ctor.prototype.refreshCollectAnimalSign = function () {
    for (var e = 1; e <= 12; e++) {
      this.collectCom.getChild("item" + e).visible = false;
    }
    for (e = 0; e < r_PlayerData.PlayerData.data.luckBagMap.animalSignList.length; e++) {
      r_PlayerData.PlayerData.data.luckBagMap.animalSignList[e].num > 0 && (this.collectCom.getChild("item" + r_PlayerData.PlayerData.data.luckBagMap.animalSignList[e].id).visible = true);
    }
  };
  _ctor.prototype.cleanFinish = function () {
    r_PlayerData.PlayerData.data.luckBagMap.caidanList[1] = 1;
    this.isCaidan = true;
    this.isCaidanShow = true;
    r_PlayerData.PlayerData.saveData();
  };
  _ctor.prototype.onClickSell = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("福袋提前售出", function () {
      var t = e.data.luckBagData.coin1 + .5 * e.data.luckBagData.coin;
      r_PlayerData.PlayerData.addCoin("福袋", t);
      e.hide();
      r_LuckBagUI.default.showUI();
    });
  };
  _ctor.prototype.onClickOpen = function () {
    this.curOpenCount += 1;
    r_PlayerData.PlayerData.data.luckBagMap.openCount += 1;
    this.contentPane.getController("c1").selectedIndex = this.curOpenCount;
    this.btnOpen.visible = false;
    this.btnSell.visible = false;
    var e = r_LuckBagSystem.LuckBagSystem.getAwardById(this.data.luckBagData.id, this.curOpenCount);
    var t = r_LuckBagSystem.LuckBagSystem.getLuckBagInfoById(this.data.luckBagData.id);
    if (r_LuckBagSystem.LuckBagSystem.triggerCaidan.length > 0 && 1 == this.curOpenCount) {
      if (r_LuckBagSystem.LuckBagSystem.triggerCaidan == t.name) {
        e = r_LuckBagSystem.LuckBagSystem.tiggerCaidan1(this.data.luckBagData.id);
        r_LuckBagSystem.LuckBagSystem.triggerCaidan = "";
        r_PlayerData.PlayerData.data.luckBagMap.caidanList[0] = 1;
        r_PlayerData.PlayerData.saveData();
      }
    } else if (this.isCaidan) {
      e = r_LuckBagSystem.LuckBagSystem.tiggerCaidan2(this.data.luckBagData.id);
    } else if (r_PlatformSystem.PlatformSystem.getIsWebPlatform()) {
      if (r_DebugSystem.DebugSystem.luckBagType == r_DebugSystem.DebugTypeLuckBag.bizhong && 1 == this.curOpenCount) {
        e = r_LuckBagSystem.LuckBagSystem.tiggerCaidan2(this.data.luckBagData.id);
      } else {
        r_DebugSystem.DebugSystem.luckBagType == r_DebugSystem.DebugTypeLuckBag.bizhuan && (e = r_LuckBagSystem.LuckBagSystem.getAwardDebugById(this.data.luckBagData.id, this.curOpenCount));
      }
    }
    this.data.luckBagData["awardId" + this.curOpenCount] = e.awardId;
    this.data.luckBagData["coin" + this.curOpenCount] = e.coin;
    var o = r_LuckBagSystem.LuckBagSystem.getLuckBagRewardInfoById(e.awardId);
    r_ResSystem.ResSystem.loadFguiImg(this.goodsAnim, "ui/luckBag/reward/" + o.name);
    this.showOpenLuckBagAnim(this.data.luckBagData.id);
  };
  _ctor.prototype.showOpenLuckBagAnim = function (e) {
    var t = this;
    var o = r_LuckBagSystem.LuckBagSystem.getLuckBagInfoById(e);
    this.bagAnim.visible = true;
    this.bag.visible = false;
    if (this.bagAnim.node.getChildByName("anim")) {
      var i = this.bagAnim.node.getChildByName("anim").getComponent(sp.Skeleton);
      if (this.isCaidan || this.isCaidanShow) {
        i.setSkin("fd_13");
        this.isCaidanShow = true;
      } else {
        i.setSkin(o.skinName);
      }
      i.setAnimation(0, "fudai", false);
      r_SoundMgr.SoundMgr.playSound("luckBag/挤压福袋音效");
      this.isCaidan = false;
      r_TimeSystem.TimeSystem.scheduleOnce("GoodsAnim", .5, function () {
        t.showGoodsAnim();
      });
    }
  };
  _ctor.prototype.showGoodsAnim = function () {
    var e = this;
    this.goodsAnim.visible = true;
    this.goodsAnim.node.x = this.initGoodsAnimPos.x;
    this.goodsAnim.node.y = this.initGoodsAnimPos.y;
    cc.Tween.stopAllByTarget(this.goodsAnim.node);
    if (1 == this.curOpenCount) {
      cc.tween(this.goodsAnim.node).parallel(cc.tween().to(.5, {
        y: this.goodsAnim.node.y + 300
      }), cc.tween().to(.5, {
        scale: 1.5
      })).parallel(cc.tween().to(.5, {
        x: this.goodsItem1.node.x,
        y: this.goodsItem1.node.y
      }), cc.tween().to(.5, {
        scale: .8
      }).call(function () {
        e.goodsAnim.visible = false;
        e.refreshGoodsItem();
        e.bagAnim.visible = false;
        e.bag.visible = true;
        e.goodsAnim.node.scale = 1;
        e.refreshBtn();
        e.btnSell.visible = true;
        e.btnOpen.getController("open").selectedIndex = 1;
        if (2 == r_LuckBagSystem.LuckBagSystem.getLuckBagRewardInfoById(e.data.luckBagData.awardId1).type) {
          r_LuckBagGetRewardUI.default.showUI({
            awardId: e.data.luckBagData.awardId1,
            callback: function () {
              e.showQiPao();
            }
          });
        } else {
          e.showQiPao();
        }
      })).start();
    } else {
      cc.tween(this.goodsAnim.node).parallel(cc.tween().to(.5, {
        y: this.goodsAnim.node.y + 300
      }), cc.tween().to(.5, {
        scale: 1.5
      })).parallel(cc.tween().to(.5, {
        x: this.goodsItem2.node.x,
        y: this.goodsItem2.node.y
      }), cc.tween().to(.5, {
        scale: .8
      }).call(function () {
        e.goodsAnim.visible = false;
        e.goodsAnim.node.scale = 1;
        e.refreshGoodsItem();
        e.refreshBtn();
        e.btnOpen.visible = false;
        if (2 == r_LuckBagSystem.LuckBagSystem.getLuckBagRewardInfoById(e.data.luckBagData.awardId2).type) {
          r_LuckBagGetRewardUI.default.showUI({
            awardId: e.data.luckBagData.awardId2,
            callback: function () {
              r_TimeSystem.TimeSystem.scheduleOnce("LuckBagResultUI", .5, function () {
                r_LuckBagResultUI.default.showUI({
                  luckBagData: e.data.luckBagData
                });
              });
            }
          });
        } else {
          r_TimeSystem.TimeSystem.scheduleOnce("LuckBagResultUI", .5, function () {
            r_LuckBagResultUI.default.showUI({
              luckBagData: e.data.luckBagData
            });
          });
        }
      })).start();
    }
  };
  _ctor.prototype.refreshGoodsItem = function () {
    var e = r_LuckBagSystem.LuckBagSystem.getLuckBagRewardInfoById(this.data.luckBagData["awardId" + this.curOpenCount]);
    var t = 0;
    if (1 == this.curOpenCount) {
      this.goodsItem1.visible = true;
      r_ResSystem.ResSystem.loadFguiImg(this.goodsItem1.getChild("pic"), "ui/luckBag/reward/" + e.name);
      this.goodsItem1.getChild("lbNum").text = "x1";
      this.goodsItem1.getChild("lbName").text = e.name;
      t = this.data.luckBagData["coin" + this.curOpenCount] + .5 * this.data.luckBagData.coin;
      this.lbForeCastMoney.text = r_UtilsSystem.UtilsSystem.numFormats(t);
      this.lbForeCastMoney.bold = true;
      if (t > this.data.luckBagData.coin) {
        r_SoundMgr.SoundMgr.playSound("luckBag/预估价上涨");
        this.showMoneyUp(true);
      } else {
        r_SoundMgr.SoundMgr.playSound("luckBag/预估价下降");
        this.showMoneyUp(false);
      }
    } else {
      this.goodsItem2.visible = true;
      r_ResSystem.ResSystem.loadFguiImg(this.goodsItem2.getChild("pic"), "ui/luckBag/reward/" + e.name);
      this.goodsItem2.getChild("lbNum").text = "x1";
      this.goodsItem2.getChild("lbName").text = e.name;
      t = this.data.luckBagData.coin1 + this.data.luckBagData.coin2;
      this.lbForeCastMoney.text = r_UtilsSystem.UtilsSystem.numFormats(t);
      if (t > this.data.luckBagData.coin) {
        r_SoundMgr.SoundMgr.playSound("luckBag/预估价上涨");
        this.showMoneyUp(true);
      } else {
        r_SoundMgr.SoundMgr.playSound("luckBag/预估价下降");
        this.showMoneyUp(false);
      }
    }
  };
  _ctor.prototype.refreshBtn = function () {
    if (!this.prefab) {
      this.btnAdd.visible = false;
      this.btnOpen.visible = false;
      return void (this.btnSell.visible = false);
    }
    if (r_PlayerData.PlayerData.data.luckBagMap.openCount >= _ctor.cutMaxNum) {
      this.btnAdd.visible = true;
      this.btnOpen.visible = false;
      this.btnSell.visible = false;
    } else {
      this.btnAdd.visible = false;
      this.btnOpen.visible = true;
      this.btnSell.visible = false;
      this.btnOpen.getChild("lbNum").text = _ctor.cutMaxNum - r_PlayerData.PlayerData.data.luckBagMap.openCount + "/" + _ctor.cutMaxNum + "次";
    }
  };
  _ctor.prototype.showMoneyUp = function (e) {
    undefined === e && (e = true);
    this.imageUP.visible = e;
    this.imageDown.visible = !e;
  };
  _ctor.prototype.showQiPao = function () {
    var e;
    var t = r_UtilsSystem.UtilsSystem.getRandomNum(0, 2);
    var o = e = 0 == this.curOpenCount ? ["福袋能带来好运哟", "不少人开到了生肖勋章呢", "你有听说过生肖勋章吗", ""][t] : ["福袋还有第2层哟", "第2层的东西可能更好哟", "哇~第2层好像看到了什么"][t];
    if ("不少人开到了生肖勋章呢" == e) {
      o = "不少人开到了生肖币呢";
    } else {
      "你有听说过生肖勋章吗" == e && (o = "你有听说过生肖币吗");
    }
    r_SoundMgr.SoundMgr.playSound("luckBag/" + o);
    cc.Tween.stopAllByTarget(this.qipaoCom.node);
    this.qipaoCom.getChild("content").text = e;
    cc.tween(this.qipaoCom.node).to(.3, {
      scale: 1
    }).delay(3).to(.3, {
      scale: 0
    }).start();
  };
  _ctor.Inst = null;
  _ctor.cutMaxNum = 10;
  __decorate([r_DecorateFunction1.AutoFind("collectCom")], _ctor.prototype, "collectCom", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbBuyMoney")], _ctor.prototype, "lbBuyMoney", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbForeCastMoney")], _ctor.prototype, "lbForeCastMoney", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnSell")], _ctor.prototype, "btnSell", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnOpen")], _ctor.prototype, "btnOpen", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnAdd")], _ctor.prototype, "btnAdd", undefined);
  __decorate([r_DecorateFunction1.AutoFind("bag")], _ctor.prototype, "bag", undefined);
  __decorate([r_DecorateFunction1.AutoFind("bagAnim")], _ctor.prototype, "bagAnim", undefined);
  __decorate([r_DecorateFunction1.AutoFind("goodsAnim")], _ctor.prototype, "goodsAnim", undefined);
  __decorate([r_DecorateFunction1.AutoFind("goodsItem1")], _ctor.prototype, "goodsItem1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("goodsItem2")], _ctor.prototype, "goodsItem2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("npc")], _ctor.prototype, "npc", undefined);
  __decorate([r_DecorateFunction1.AutoFind("qipaoCom")], _ctor.prototype, "qipaoCom", undefined);
  __decorate([r_DecorateFunction1.AutoFind("imageUP")], _ctor.prototype, "imageUP", undefined);
  __decorate([r_DecorateFunction1.AutoFind("imageDown")], _ctor.prototype, "imageDown", undefined);
  return _ctor;
}(r_TYIndex.UIWind);
exports.LuckBagOpenUI = exp_LuckBagOpenUI;