var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_DebugSystem = require("DebugSystem");
var r_LuckBagSystem = require("LuckBagSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_ResSystem = require("ResSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_LuckBagCfg = require("LuckBagCfg");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_BaseWin = require("BaseWin");
var r_LuckBagCollectUI = require("LuckBagCollectUI");
var r_LuckBagOpenUI = require("LuckBagOpenUI");
var def_LuckBagUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.LuckBag, r_UIDef.UIDef.Res.UI.LuckBagUI) || this;
    t.uiType = "fullScreen";
    t.items = [];
    t.clickCount = 0;
    t.clickTime = null;
    t.isShowQiPao = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.LuckBagUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.LuckBagUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btnBuy);
    this.collectCom.onClick(this.onClickCollect, this);
    this.npc.onClick(this.onClickNpc, this);
    r_LuckBagSystem.LuckBagSystem.init();
    for (var t = 1; t <= 8; t++) {
      var o = this.contentPane.getChild("ItemCom" + t);
      this.items.push(o);
    }
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.instance = this;
    if (r_PlatformSystem.PlatformSystem.getIsWebPlatform()) {
      if (r_DebugSystem.DebugSystem.luckBagType == r_DebugSystem.DebugTypeLuckBag.chongzhi) {
        r_LuckBagSystem.LuckBagSystem.resetCaidan();
        r_DebugSystem.DebugSystem.luckBagType = r_DebugSystem.DebugTypeLuckBag.normal;
      } else if (r_DebugSystem.DebugSystem.luckBagType == r_DebugSystem.DebugTypeLuckBag.jiqi) {
        r_LuckBagSystem.LuckBagSystem.addASuitOfAnimalSign();
        r_DebugSystem.DebugSystem.luckBagType = r_DebugSystem.DebugTypeLuckBag.normal;
      }
    }
    this.restart();
    this.qipaoCom.node.scale = 0;
    this.isShowQiPao = false;
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.instance = null;
  };
  _ctor.prototype.restart = function () {
    this.clickCount = 0;
    this.clickTime = null;
    r_LuckBagSystem.LuckBagSystem.checkRefresh();
    this.showItems();
  };
  _ctor.prototype.showItems = function () {
    var e = this;
    r_LuckBagSystem.LuckBagSystem.itemsList.forEach(function (t, o) {
      var i = e.items[o];
      if (null != t) {
        i.visible = true;
        var n = r_LuckBagSystem.LuckBagSystem.getLuckBagInfoById(t.id);
        i.getController("grade").selectedIndex = n.type - 1;
        r_ResSystem.ResSystem.loadFguiImg(i.getChild("namePic"), "ui/luckBag/animalSignName/" + n.name);
        i.getChild("labPrice").text = r_UtilsSystem.UtilsSystem.numFormats(n.coin);
        r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/luckBag/small/" + n.small, cc.Prefab, function (t, o) {
          if (t) {
            console.error("加载失败: ", t);
          } else {
            i.getChild("bagPic").node.destroyAllChildren();
            var a = cc.instantiate(o);
            i.getChild("bagPic").node.addChild(a);
            a.active = true;
            r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/luckBag/small/" + n.smallPic, cc.SpriteFrame, function (e, t) {
              a.getComponent(cc.Sprite).spriteFrame = t;
            });
            i.clearClick();
            i.onClick(function () {
              r_SoundMgr.SoundMgr.playSound("click");
              r_PlayerData.PlayerData.data.luckBagMap.refreshTime = r_TimeSystem.TimeSystem.getServerTime();
              if (r_PlayerData.PlayerData.isCoinEnough(n.coin)) {
                r_LuckBagSystem.LuckBagSystem.buyStoneById(n.id);
                if (r_PlayerData.PlayerData.isCoinEnough(n.coin)) {
                  r_PlayerData.PlayerData.deleteCoin("开福袋", n.coin, r_ReportSystem.SystemKey.福袋);
                } else {
                  r_PlayerData.PlayerData.deleteCoin("开福袋", r_PlayerData.PlayerData.bigCoin, r_ReportSystem.SystemKey.福袋);
                }
                r_LuckBagOpenUI.LuckBagOpenUI.showUI({
                  luckBagData: n
                });
              } else {
                r_UtilsSystem.UtilsSystem.showTip("钱不够~");
              }
            }, e);
          }
        });
      } else {
        i.visible = false;
      }
    });
    this.refreshCollectAnimalSign();
  };
  _ctor.prototype.onClickbtnBuy = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("福袋进货", function () {
      r_LuckBagSystem.LuckBagSystem.refreshItemsList();
      e.showItems();
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
  _ctor.prototype.onClickNpc = function () {
    if (!this.isShowQiPao) {
      this.clickCount++;
      var e = new Date().getTime();
      if (this.clickTime) {
        if (e - this.clickTime > 2e3) {
          if (this.clickCount < 5) {
            this.clickCount = 0;
            this.clickTime = e;
          }
        } else if (this.clickCount >= 5) {
          this.clickCount = 0;
          this.clickTime = e;
          if (r_PlayerData.PlayerData.data.luckBagMap.caidanList[0]) {
            this.showQiPao(["再动手动脚，我可就不客气咯~", "建议刷新一下福袋呢", "姐姐可是属龙的", "你自己猜嘛~老是问我"][r_UtilsSystem.UtilsSystem.getRandomNum(0, 3)]);
          } else {
            var t = r_UtilsSystem.UtilsSystem.getRandomNum(0, r_LuckBagCfg.LuckBagCaidan1Cfg.length - 1);
            r_LuckBagSystem.LuckBagSystem.triggerCaidan = r_LuckBagCfg.LuckBagCaidan1Cfg[t];
            this.showQiPao("建议买：" + r_LuckBagSystem.LuckBagSystem.triggerCaidan + "福袋，有惊喜哟~");
          }
        }
      } else {
        this.clickTime = e;
      }
    }
  };
  _ctor.prototype.showQiPao = function (e) {
    var t = this;
    this.isShowQiPao = true;
    cc.Tween.stopAllByTarget(this.qipaoCom.node);
    this.qipaoCom.getChild("content").text = e;
    cc.tween(this.qipaoCom.node).to(.3, {
      scale: 1
    }).delay(3).to(.3, {
      scale: 0
    }).call(function () {
      t.isShowQiPao = false;
    }).start();
  };
  _ctor.prototype.onClickCollect = function () {
    var e = this;
    r_LuckBagCollectUI.default.showUI({
      callback: function () {
        e.refreshCollectAnimalSign();
      }
    });
  };
  __decorate([r_DecorateFunction1.AutoFind("btnBuy")], _ctor.prototype, "btnBuy", undefined);
  __decorate([r_DecorateFunction1.AutoFind("collectCom")], _ctor.prototype, "collectCom", undefined);
  __decorate([r_DecorateFunction1.AutoFind("npc")], _ctor.prototype, "npc", undefined);
  __decorate([r_DecorateFunction1.AutoFind("qipaoCom")], _ctor.prototype, "qipaoCom", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_LuckBagUI;