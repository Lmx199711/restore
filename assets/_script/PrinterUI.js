var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrinterUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PrinterCfg = require("PrinterCfg");
var r_PlatformSystem = require("PlatformSystem");
var r_PrintCardUI = require("PrintCardUI");
var r_PrinterCommon = require("PrinterCommon");
var r_PrintHelpUI = require("PrintHelpUI");
var r_NewCardUI = require("NewCardUI");
var r_ResSystem = require("ResSystem");
var r_SoundMgr = require("SoundMgr");
var r_PlayerData = require("PlayerData");
var r_SellCardGroupUI = require("SellCardGroupUI");
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_UtilsSystem = require("UtilsSystem");
var r_FguiResSystem = require("FguiResSystem");
var exp_PrinterUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Printer, r_UIDef.UIDef.Res.UI.PrinterUI) || this;
    t.curCarTab = 0;
    t.cardItem = {
      type: 0,
      quality: 0,
      id: 0
    };
    t.finishGroupList = [];
    t.startPos = cc.v2();
    t.dragCount = 0;
    t.dragDir = 1;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.PrinterUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.PrinterUI);
  };
  _ctor.prototype.onInit = function () {
    var o = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").onClick(this.onClickBack, this);
    this.TapCard = this.contentPane.getChild("TapCard").asCom;
    this.TapPrinter = this.contentPane.getChild("TapPrinter").asCom;
    this.printCount = this.TapPrinter.getChild("printCount").asTextField;
    this.printerList = this.TapPrinter.getChild("printerList").asList;
    this.printerList.itemRenderer = this.onPrinterItemRenderer.bind(this);
    this.printerList.handleControllerChanged = this.onPrinterPageChanged.bind(this);
    this.printerList.numItems = 3;
    this.TapPrinter.getChild("btnLeft").onClick(function () {
      var e = o.printerList.scrollPane.currentPageX - 1;
      e >= 0 && o.printerList.scrollToView(e, true);
    }, this);
    this.TapPrinter.getChild("btnRight").onClick(function () {
      var e = o.printerList.scrollPane.currentPageX + 1;
      e < o.printerList.numItems && o.printerList.scrollToView(e, true);
    }, this);
    this.TapPrinter.getChild("btnPrint1").onClick(function () {
      o.printCard(o.printerList.scrollPane.currentPageX, 1);
    }, this);
    this.TapPrinter.getChild("btnPrint5").onClick(function () {
      o.printCard(o.printerList.scrollPane.currentPageX, 5);
    }, this);
    this.TapPrinter.getChild("btnPrint5Video").onClick(function () {
      o.printCard(o.printerList.scrollPane.currentPageX, 5, true);
    }, this);
    this.TapPrinter.getChild("btnUnlock").onClick(function () {
      var e = o.printerList.scrollPane.currentPageX;
      if (2 == e) {
        r_PlatformSystem.PlatformSystem.showVideo("解锁激光打印机", function () {
          var t = r_PrinterCommon.PrinterCommon.getPinterUnlockVideo();
          t++;
          r_PrinterCommon.PrinterCommon.setPinterUnlockVideo(t);
          o.setUnlockVideo();
          if (t >= r_PrinterCfg.PrinterInfo[e].unlockCost) {
            r_PrinterCommon.PrinterCommon.setData("pinterUnlock" + e, true);
            o.showCurPageUI();
          }
        });
      } else {
        if (!r_PlayerData.PlayerData.isDiamondEnough(r_PrinterCfg.PrinterInfo[e].unlockCost)) {
          return void r_UtilsSystem.UtilsSystem.showTip("钻石不足~");
        }
        r_PlayerData.PlayerData.deleteDiamond(r_PrinterCfg.PrinterInfo[e].unlockCost);
        r_PrinterCommon.PrinterCommon.setData("pinterUnlock" + e, true);
        o.showCurPageUI();
        o.caidanShow();
      }
    }, this);
    this.groupList = this.TapCard.getChild("groupList").asList;
    this.groupList.itemRenderer = this.onGroupItemRenderer.bind(this);
    this.contentPane.getController("tab").onChanged(function (e) {
      if (1 == e.selectedIndex) {
        o.groupList.numItems = 0 == o.curCarTab ? 3 : 1;
        o.TapCard.getChild("levelName").asTextField.text = r_PrinterCfg.CollectInfo[r_PrinterCommon.PrinterCommon.collectLevel].name;
        o.TapCard.getChild("levelIcon").asLoader.url = "ui://" + r_UIDef.UIDef.Pack.Printer + "/收藏等级" + (r_PrinterCommon.PrinterCommon.collectLevel + 1);
        o.checkSellCardGroup();
      }
    });
    this.TapCard.getChild("btnHelp").onClick(function () {
      r_PrintHelpUI.PrintHelpUI.showUI();
    }, this);
    this.TapCard.getController("tab").onChanged(function (e) {
      o.curCarTab = e.selectedIndex;
      o.groupList.numItems = 0 == o.curCarTab ? 3 : 1;
    });
    this.caidanInit();
    var i = this.TapPrinter.getChild("comboBox").asComboBox;
    if (r_TYIndex.Platform.isDarenPlatform()) {
      i.visible = true;
      i.on(fgui.Event.STATUS_CHANGED, function (e) {
        _ctor.comboBoxVal = e.value;
      }, this);
    } else {
      i.visible = false;
    }
  };
  _ctor.prototype.printCard = function (e, t, o) {
    undefined === o && (o = false);
    if (o) {
      r_PlatformSystem.PlatformSystem.showVideo("打印机五连抽", function () {
        r_SoundMgr.SoundMgr.playSound("printer/出卡动画音效" + t);
        r_PrintCardUI.PrintCardUI.showUI({
          printerType: e,
          count: t
        });
      });
    } else {
      var i = r_PrinterCfg.PrinterInfo[e].cost * t;
      if (r_PlayerData.PlayerData.isDiamondEnough(i)) {
        r_PlayerData.PlayerData.deleteDiamond(i);
        r_SoundMgr.SoundMgr.playSound("printer/出卡动画音效" + t);
        r_PrintCardUI.PrintCardUI.showUI({
          printerType: e,
          count: t
        });
      } else {
        r_UtilsSystem.UtilsSystem.showTip("钻石不足~");
      }
    }
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    if (r_PrinterCommon.PrinterCommon.init()) {
      this.printerList.numItems = 3;
      this.printerList.scrollToView(0);
    }
    this.contentPane.getController("tab").selectedIndex = 0;
    this.TapCard.getController("tab").selectedIndex = 0;
    this.showCurPageUI();
    this.setUnlockVideo();
    this.redPoint();
    this.caidanInit();
    this.caidanShow();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.showCurPageUI = function () {
    var e = this.printerList.scrollPane.currentPageX;
    var t = 0 == e || r_PrinterCommon.PrinterCommon.getData("pinterUnlock" + e);
    var o = this.printerList.getChildAt(e).asCom;
    this.TapPrinter.getChild("btnLeft").visible = e > 0;
    this.TapPrinter.getChild("btnRight").visible = e < this.printerList.numItems - 1;
    this.TapPrinter.getChild("printerName").asLoader.url = "ui://" + r_UIDef.UIDef.Pack.Printer + "/printerName" + e;
    this.TapPrinter.getController("unlock").selectedIndex = t ? 0 : 1;
    this.TapPrinter.getController("video").selectedIndex = 0 == e ? 0 : 1;
    o.getController("unlock").selectedIndex = t ? 0 : 1;
    this.TapPrinter.getChild("btnUnlock").asCom.getController("video").selectedIndex = 2 == e ? 1 : 0;
    this.TapPrinter.getChild("printCost1").asCom.getChild("cost").asTextField.text = "x" + r_PrinterCfg.PrinterInfo[e].cost;
    this.TapPrinter.getChild("printCost5").asCom.getChild("cost").asTextField.text = "x" + 5 * r_PrinterCfg.PrinterInfo[e].cost;
    this.TapPrinter.getChild("unlockCost").asCom.getChild("cost").asTextField.text = "x" + r_PrinterCfg.PrinterInfo[e].unlockCost;
    this.setPrintCount();
  };
  _ctor.prototype.setPrintCount = function () {
    var e = this.printerList.scrollPane.currentPageX;
    var t = r_PrinterCfg.LeastQuality[e].count[r_PrinterCfg.LeastQuality[e].count.length - 1];
    var o = r_PrinterCommon.PrinterCommon.getPrintCardCount(e, t);
    this.printCount.setVar("count", "(" + o + "/" + t + ")").flushVars();
  };
  _ctor.prototype.setPrinterIcon = function (e, t) {
    undefined === t && (t = "");
    this.printerList.getChildAt(e).asCom.getChild("icon").asLoader.url = "ui://" + r_UIDef.UIDef.Pack.Printer + "/printer" + e + t;
  };
  _ctor.prototype.redPoint = function () {
    var e = this.contentPane.getChild("btnTabCard").asCom.getChild("red");
    for (var t = 0; t < 3; t++) {
      if (r_PrinterCommon.PrinterCommon.checkCardGroup(t)) {
        return void (e.visible = true);
      }
    }
    e.visible = false;
  };
  _ctor.prototype.onPrinterPageChanged = function () {
    this.showCurPageUI();
  };
  _ctor.prototype.onPrinterItemRenderer = function (e, t) {
    t.getChild("icon").asLoader.url = "ui://" + r_UIDef.UIDef.Pack.Printer + "/printer" + e;
    if (0 == e) {
      !r_PrinterCommon.PrinterCommon.getData("caidan0_finish") && r_PrinterCommon.PrinterCommon.getData("caidan0_clean") && r_PrinterCommon.PrinterCommon.getData("caidan0_screw") && (t.getChild("icon").asLoader.url = "ui://" + r_UIDef.UIDef.Pack.Printer + "/printer0_1");
    } else if (1 == e) {
      if (2 == r_PrinterCommon.PrinterCommon.getData("caidan1")) {
        t.getChild("icon").asLoader.url = "ui://" + r_UIDef.UIDef.Pack.Printer + "/printer1_1";
      } else {
        t.on(fgui.Event.DROP, this.onInkDrop, this);
      }
    }
  };
  _ctor.prototype.setUnlockVideo = function () {
    var e = r_PrinterCommon.PrinterCommon.getPinterUnlockVideo();
    this.TapPrinter.getChild("btnUnlock").asButton.title = "(" + e + " / " + r_PrinterCfg.PrinterInfo[2].unlockCost + ")";
  };
  _ctor.prototype.onGroupItemRenderer = function (e, t) {
    var o = t.getChild("cardList").asList;
    o.itemRenderer = this.onCardItemRenderer.bind(this);
    this.cardItem.quality = 2;
    this.cardItem.id = 0;
    if (0 == this.curCarTab) {
      this.cardItem.type = e;
    } else {
      this.cardItem.type = this.curCarTab - 1;
    }
    t.getChild("name").asTextInput.text = r_PrinterCfg.CardType[this.cardItem.type];
    o.numItems = 11;
  };
  _ctor.prototype.onCardItemRenderer = function (e, t) {
    var o = this;
    t.scaleX = .7;
    t.scaleY = .7;
    t.clearClick();
    if (r_PrinterCommon.PrinterCommon.curCardList.some(function (e) {
      return e.type == o.cardItem.type && e.quality == o.cardItem.quality && e.id == o.cardItem.id;
    })) {
      t.getController("c1").selectedIndex = 1;
      t.getChild("qualityIcon").asLoader.url = r_PrinterCommon.PrinterCommon.getQualityIcon(this.cardItem);
      t.getChild("qualityBG").asLoader.url = r_PrinterCommon.PrinterCommon.getQualityBG(this.cardItem);
      r_ResSystem.ResSystem.loadBundleFguiImg(t.getChild("icon"), "game3", "printer/girl/" + r_PrinterCommon.PrinterCommon.getSmallIcon(this.cardItem));
      var i = {
        type: this.cardItem.type,
        quality: this.cardItem.quality,
        id: this.cardItem.id
      };
      t.onClick(function () {
        r_NewCardUI.NewCardUI.showUI({
          card: i,
          score: 0
        });
      }, this);
    } else {
      t.getController("c1").selectedIndex = 3;
    }
    this.cardItem.id++;
    if (this.cardItem.id >= r_PrinterCfg.CardInfo[this.cardItem.quality].count) {
      this.cardItem.quality++;
      this.cardItem.id = 0;
    }
  };
  _ctor.prototype.checkSellCardGroup = function () {
    var e = r_PrinterCommon.PrinterCommon.getShowSellCardGroupTime();
    if (!(Date.now() - e < 864e5)) {
      this.finishGroupList.length = 0;
      for (var t = 0; t < 3; t++) {
        r_PrinterCommon.PrinterCommon.checkCardGroup(t) && this.finishGroupList.push(t);
      }
      this.finishGroupList.length > 0 && this.showSellCardGroup();
    }
  };
  _ctor.prototype.showSellCardGroup = function () {
    var e = this;
    if (0 != this.finishGroupList.length) {
      var t = this.finishGroupList.pop();
      r_SellCardGroupUI.SellCardGroupUI.showUI({
        type: t,
        closeCallback: function () {
          setTimeout(function () {
            e.showSellCardGroup();
          }, 20);
        }
      });
    } else {
      this.groupList.numItems = 0 == this.curCarTab ? 3 : 1;
    }
  };
  _ctor.prototype.caidanInit = function () {
    var e = this;
    var t = this.TapPrinter.getChild("ink1");
    t.draggable = true;
    t.off(fgui.Event.DRAG_START);
    t.on(fgui.Event.DRAG_START, this.onDragStart.bind(this, t), this);
    var o = this.TapPrinter.getChild("screw1");
    o.draggable = true;
    o.off(fgui.Event.DRAG_START);
    o.on(fgui.Event.DRAG_START, this.onDragStart.bind(this, o), this);
    r_PrinterCommon.PrinterCommon.getData("caidan0_screw") || this.printerList.getChildAt(0).asCom.getChild("screw").on(fgui.Event.DROP, this.onScrewDrop, this);
    if (!r_PrinterCommon.PrinterCommon.getData("caidan0_clean")) {
      r_ResSystem.ResSystem.loadBundleRes("game3", "printer/prefab/oldPrinter0", cc.Prefab, function (t, o) {
        r_FguiResSystem.FguiResSystem.addAutoReleaseRes(e, o);
        e.oldPrinter0 && e.oldPrinter0.destroy();
        e.oldPrinter0 = cc.instantiate(o);
        e.printerList.getChildAt(0).asCom.getChild("center").node.addChild(e.oldPrinter0);
        if (r_PrinterCommon.PrinterCommon.getData("caidan0_screw")) {
          e.oldPrinter0.getChildByName("mask2").getChildByName("screw").active = true;
          e.oldPrinter0.getChildByName("cleanArea").active = true;
        } else {
          e.oldPrinter0.getChildByName("cleanArea").active = false;
        }
      });
      r_TYEventDispatcher.TYEventDispatcher.on("cleanFinish", this.cleanFinish, this);
    }
  };
  _ctor.prototype.caidanShow = function () {
    var e = this.TapPrinter.getChild("ink1");
    for (var t = 0; t < 3; t++) {
      var o = this.TapPrinter.getChild("ink" + t);
      if (r_PrinterCommon.PrinterCommon.getData("caidan1") > 1 || !r_PrinterCommon.PrinterCommon.getData("pinterUnlock1")) {
        o.visible = false;
      } else {
        o.visible = true;
        if (1 == t) {
          if (1 == r_PrinterCommon.PrinterCommon.getData("caidan1")) {
            e.asLoader.url = "ui://" + r_UIDef.UIDef.Pack.Printer + "/ink1_1";
          } else {
            e.asLoader.url = "ui://" + r_UIDef.UIDef.Pack.Printer + "/ink1";
          }
        }
      }
    }
    for (t = 0; t < 2; t++) {
      o = this.TapPrinter.getChild("screw" + t);
      if (r_PrinterCommon.PrinterCommon.getData("caidan0_clean") || 1 == t && r_PrinterCommon.PrinterCommon.getData("caidan0_screw")) {
        o.visible = false;
      } else {
        o.visible = true;
      }
    }
    if (this.oldPrinter0 && r_PrinterCommon.PrinterCommon.getData("caidan0_screw")) {
      this.oldPrinter0.getChildByName("mask2").getChildByName("screw").active = true;
      this.oldPrinter0.getChildByName("cleanArea").active || (this.oldPrinter0.getChildByName("cleanArea").active = true);
    }
  };
  _ctor.prototype.onDragStart = function (e) {
    this.startPos.x = e.x;
    this.startPos.y = e.y;
    e.stopDrag();
    e.visible = false;
    this.dragDir = 0;
    this.dragCount = 0;
    fgui.DragDropManager.inst.startDrag(null, e.asLoader.url, e);
    fgui.DragDropManager.inst.dragAgent.once(fgui.Event.DRAG_END, this.onDragEnd.bind(this, e), this);
    fgui.DragDropManager.inst.dragAgent.off(fgui.Event.DRAG_MOVE, null, this);
    "ink1" != e.name || r_PrinterCommon.PrinterCommon.getData("caidan1") || fgui.DragDropManager.inst.dragAgent.on(fgui.Event.DRAG_MOVE, this.onDragMove.bind(this, e), this);
  };
  _ctor.prototype.onDragMove = function (e) {
    var t = fgui.DragDropManager.inst.dragAgent;
    if (Math.abs(t.y - this.startPos.y) > 50 && (0 == this.dragDir || (t.y - this.startPos.y) * this.dragDir < 0)) {
      this.dragCount++;
      this.dragDir = t.y - this.startPos.y > 0 ? 1 : -1;
      this.startPos.y = t.y;
      if (this.dragCount >= 6) {
        r_PrinterCommon.PrinterCommon.setData("caidan1", 1);
        t.asLoader.url = "ui://" + r_UIDef.UIDef.Pack.Printer + "/ink1_1";
        e.asLoader.url = "ui://" + r_UIDef.UIDef.Pack.Printer + "/ink1_1";
      }
    }
  };
  _ctor.prototype.onDragEnd = function (e) {
    if (e.name.startsWith("ink")) {
      "ink1" == e.name && r_PrinterCommon.PrinterCommon.getData("caidan1") && 1 != r_PrinterCommon.PrinterCommon.getData("caidan1") || (e.visible = true);
    } else {
      "screw1" == e.name && r_PrinterCommon.PrinterCommon.getData("caidan0_screw") || (e.visible = true);
    }
  };
  _ctor.prototype.onInkDrop = function (e, t) {
    if (r_PrinterCommon.PrinterCommon.getData("pinterUnlock1") && "ink1" == t.name && 1 == r_PrinterCommon.PrinterCommon.getData("caidan1")) {
      r_PrinterCommon.PrinterCommon.setData("caidan1", 2);
      e.asCom.getChild("icon").asLoader.url = "ui://" + r_UIDef.UIDef.Pack.Printer + "/printer1_1";
      this.caidanShow();
    }
  };
  _ctor.prototype.onScrewDrop = function (e, t) {
    if ("screw1" == t.name) {
      r_PrinterCommon.PrinterCommon.setData("caidan0_screw", true);
      if (this.oldPrinter0) {
        this.oldPrinter0.getChildByName("mask2").getChildByName("screw").active = true;
        this.oldPrinter0.getChildByName("cleanArea").active = true;
      }
      r_PrinterCommon.PrinterCommon.getData("caidan0_clean") && this.setPrinterIcon(0, "_1");
    }
  };
  _ctor.prototype.cleanFinish = function () {
    r_PrinterCommon.PrinterCommon.setData("caidan0_clean", true);
    r_PrinterCommon.PrinterCommon.getData("caidan0_screw") && this.setPrinterIcon(0, "_1");
    this.caidanShow();
  };
  _ctor.prototype.onClickBack = function () {
    if (1 != this.contentPane.getController("tab").selectedIndex) {
      this.hide();
    } else {
      this.contentPane.getController("tab").selectedIndex = 0;
    }
  };
  _ctor.comboBoxVal = -1;
  return _ctor;
}(r_TYIndex.UIWind);
exports.PrinterUI = exp_PrinterUI;