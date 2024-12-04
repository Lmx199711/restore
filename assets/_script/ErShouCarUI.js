var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErShouCarUI = undefined;
var s;
var r_UIDef = require("UIDef");
var r_TYEvent = require("TYEvent");
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_ErShouCarSystem = require("ErShouCarSystem");
var r_FirstVideoSystem = require("FirstVideoSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_ResSystem = require("ResSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseReportLayer = require("BaseReportLayer");
var r_GetItemComUI = require("GetItemComUI");
var r_ErEmptyUI = require("ErEmptyUI");
var r_ErShouCarBookUI = require("ErShouCarBookUI");
var r_ErShouResUI = require("ErShouResUI");
(function (e) {
  e[e.None = 0] = "None";
  e[e.Choosing = 1] = "Choosing";
  e[e.Confirm = 2] = "Confirm";
  e[e.Finding = 3] = "Finding";
  e[e.Option = 4] = "Option";
  e[e.Result = 5] = "Result";
})(s || (s = {}));
var P = s.None;
var exp_ErShouCarUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.ErShouCar, r_UIDef.UIDef.Res.UI.ErShouCarUI) || this;
    t.uiType = "fullScreen";
    t.systemType = r_ReportSystem.SystemKey.二手车;
    t.finderOriPos = null;
    t.glassSon = null;
    t.centerNode = null;
    t.isStart = false;
    t.curNode = null;
    t.oriPos = -375;
    t.MAX_LEN = 0;
    t.curIndex = 0;
    t.thingIndex = 0;
    t.thingOpNum = 0;
    t.listShowIndex = 0;
    t.oriPrice = 0;
    t.totalGet = 0;
    t.tableData = null;
    t.CarConfig = null;
    t.curGirlIndex = -1;
    t.dClickTime = .5;
    t.lookingTimer = .75;
    t.lookingIndex = -1;
    t.offsetVec = cc.Vec2.ZERO;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.ErShouCarUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.ErShouCarUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    r_ErShouCarSystem.ErShouCarSystem.checkInit();
    this.listState = this.contentPane.getController("listState");
    this.btnBack.onClick(this.onClickBack, this);
    this.btnLeft.onClick(this.onClickLeft, this);
    this.btnShow.onClick(this.onClickShow, this);
    this.btnShowAd.onClick(this.onClickShowAd, this);
    this.btnRight.onClick(this.onClickRight, this);
    this.btnBook.onClick(this.onClickBook, this);
    this.btn1.onClick(this.onOption.bind(this, 1));
    this.btn2.onClick(this.onOption.bind(this, 2));
    this.btnGirl.onClick(this.onClickGirl.bind(this));
    this.loadUI();
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.initState();
  };
  _ctor.prototype.initState = function () {
    this.clearMask();
    this.curIndex = 0;
    this.txtName.text = "";
    this.txtPrice.text = "";
    this.btnGirl.visible = true;
    this.lookingIndex = -1;
    this.finder && this.finder.setPosition(this.finderOriPos);
    this.curNode && (this.curNode.getChildByName("center").children[1].opacity = 255);
    this.prefabNode && (this.prefabNode.getChildByName("modelNode").active = true);
    this.refshLR();
    this.layoutNode && (this.layoutNode.x = this.oriPos);
    this.turnTo("before");
    this.finder && (this.finder.active = false);
    this.prefabNode && (this.pngList = this.prefabNode.getChildByName("png"));
    P = s.Choosing;
    r_TYEventDispatcher.TYEventDispatcher.off(r_TYEvent.EventDef.finishCarThing, this.showGetItemUI, this);
  };
  _ctor.prototype.initList = function () {
    for (var e = 0; e < this.listThing.numChildren; e++) {
      var t = this.listThing.getChildAt(e);
      t.getController("state").selectedIndex = 2;
      t.getChild("title").text = "";
      t.getChild("txtPrice").text = "";
      t.getChild("icon").texture = null;
    }
  };
  _ctor.prototype.listRenderer = function () {};
  _ctor.prototype.loadUI = function () {
    var e = this;
    this.listThing.itemRenderer = this.listRenderer.bind(this);
    this.listThing.numItems = 4;
    r_ResSystem.ResSystem.loadBundleRes("resources1", "Json/All/CarConfig", cc.JsonAsset, function (t, o) {
      if (t) {
        console.log("加载cc.JsonAsset出错 = ", t.message);
      } else {
        e.CarConfig = o.json;
        r_ResSystem.ResSystem.loadBundleRes("bundleErShouCar", "ershouCar", cc.Prefab, function (t, o) {
          e.prefabNode = cc.instantiate(o);
          e.hang.node.addChild(e.prefabNode);
          e.prefabNode.x = e.prefabNode.y = 0;
          e.contentPane.visible = true;
          e.finder = e.prefabNode.getChildByName("finder");
          if (e.finder) {
            e.finderOriPos = e.finder.getPosition();
            e.registTouch();
            e.glassSon = e.finder.children[0];
            e.centerNode = e.finder.children[1];
          }
          e.onClickGirl();
          e.MAX_LEN = e.CarConfig.length / 8;
          e.loadCar();
        });
      }
    });
  };
  _ctor.prototype.loadCar = function () {
    var e = this;
    r_ResSystem.ResSystem.loadBundleRes("bundleErShouCar", "car", cc.Prefab, function (t, o) {
      e.layoutNode = e.prefabNode.getChildByName("layoutMask").getChildByName("layoutNode");
      var i = function (t) {
        var i = cc.instantiate(o);
        i.parent = e.layoutNode;
        r_ResSystem.ResSystem.loadBundleRes("bundleErShouCar", "car" + (t + 1) + "/2", cc.SpriteFrame, function (e, t) {
          i.getChildByName("center").children[0].getComponent(cc.Sprite).spriteFrame = t;
        });
        r_ResSystem.ResSystem.loadBundleRes("bundleErShouCar", "car" + (t + 1) + "/3", cc.SpriteFrame, function (e, t) {
          i.getChildByName("center").children[1].getComponent(cc.Sprite).spriteFrame = t;
        });
        r_ResSystem.ResSystem.loadBundleRes("bundleErShouCar", "car" + (t + 1) + "/1", cc.SpriteFrame, function (e, t) {
          i.getChildByName("mask").children[0].getComponent(cc.Sprite).spriteFrame = t;
        });
        i.x = i.y = 0;
      };
      for (var n = 0; n < e.MAX_LEN; n++) {
        i(n);
      }
    });
    this.initState();
    this.refshLR();
  };
  _ctor.prototype.onClickBack = function () {
    if (P != s.Result) {
      if (P < s.Confirm) {
        this.hide();
      } else {
        P = s.Choosing;
        this.initState();
      }
    }
  };
  _ctor.prototype.onClickGirl = function () {
    if (this.prefabNode) {
      var e = this.prefabNode.getChildByName("modelNode");
      this.curGirlIndex++;
      this.curGirlIndex == e.childrenCount && (this.curGirlIndex = 0);
      for (var t = 0; t < e.childrenCount; t++) {
        if (this.curGirlIndex == t) {
          e.children[t].active = true;
          e.children[t].getComponent(sp.Skeleton).setAnimation(0, "animation", true);
        } else {
          e.children[t].active = false;
        }
      }
    }
  };
  _ctor.prototype.onClickBook = function () {
    r_ErShouCarBookUI.ErShouCarBookUI.showUI();
  };
  _ctor.prototype.onOption = function (e) {
    if (P == s.Option) {
      this.lookingIndex = -1;
      r_TYEventDispatcher.TYEventDispatcher.off(r_TYEvent.EventDef.finishCarThing, this.showGetItemUI, this);
      this.thingOpNum = e;
      this.turnTo("showed");
      this.tableData = this.CarConfig[8 * this.curIndex + 2 * (this.thingIndex - 1) + e - 1];
      if (this.tableData.actionPath) {
        r_ErEmptyUI.ErEmptyUI.showUI({
          number: e,
          info: this.tableData
        });
        r_TYEventDispatcher.TYEventDispatcher.on(r_TYEvent.EventDef.finishCarThing, this.showGetItemUI, this);
      } else {
        this.tableData.action && this.showEvent();
      }
      P = s.None;
    }
  };
  _ctor.prototype.freshListItem = function () {
    var e = this.listThing.getChildAt(this.listShowIndex);
    e.getChild("title").text = this.CarConfig[8 * this.curIndex + 2 * (this.thingIndex - 1)].thing;
    e.getChild("icon").texture = this.hang2.texture;
    if (this.tableData.reward) {
      var t = this.tableData.reward.toString();
      this.txtPrice.text = "仅售" + (this.oriPrice + this.totalGet).toString();
      if (-1 != t.indexOf("-")) {
        e.getController("state").selectedIndex = 0;
        e.getChild("txtPrice").text = t || "";
      } else {
        e.getController("state").selectedIndex = 1;
        e.getChild("txtPrice").text = "+" + t;
      }
    }
  };
  _ctor.prototype.showGetItemUI = function () {
    var e = this;
    if (this.tableData.desc) {
      var t = Number(this.tableData.reward);
      this.totalGet += t;
      var o = this.tableData.desc + this.tableData.reward;
      var i = this.hang2.texture;
      this.tableData.pngName2 && (i = this.getIconFromList(this.tableData.pngName2));
      r_GetItemComUI.GetItemComUI.showUI({
        hideTitle: true,
        sprite: i,
        getDesc: o,
        closeCallback: function () {
          e.freshListItem();
          e.listShowIndex++;
          e.checkFinish();
          P = s.Finding;
        }
      });
      this.contentPane.getController("midBg").selectedIndex = 0;
    } else {
      this.freshListItem();
      this.listShowIndex++;
      this.checkFinish();
      P = s.Finding;
    }
  };
  _ctor.prototype.checkFinish = function () {
    var e = this;
    this.contentPane.getController("midBg").selectedIndex = 0;
    if (4 == this.listShowIndex) {
      this.finder && (this.finder.active = false);
      this.clearMask();
      this.listShowIndex = 0;
      P = s.Result;
      r_TimeSystem.TimeSystem.scheduleOnce("ErShouCar2Res", .5, function () {
        r_ErShouResUI.ErShouResUI.showUI({
          info: e.CarConfig[8 * e.curIndex],
          totalGet: e.totalGet
        });
        P = s.None;
      });
    }
  };
  _ctor.prototype.showEvent = function () {
    var e = this;
    var t = this.tableData.action[0];
    var o = 0;
    var i = 0;
    var n = "";
    if (-1 != t.arg2.toString().indexOf("-")) {
      o = Number(t.arg2.toString().substring(1));
      n = t.arg1.replace("#", o.toString());
      i = -1 * o;
    } else {
      i = Number(t.arg2);
      n = t.arg1.replace("#", i.toString());
    }
    this.midBlack.visible = false;
    r_GetItemComUI.GetItemComUI.showUI({
      hideTitle: true,
      sprite: this.hang2.texture,
      getDesc: n,
      closeCallback: function () {
        e.showGetItemUI();
        if (i < 0) {
          r_PlayerData.PlayerData.deleteCoin("二手车事件", o, r_ReportSystem.SystemKey.二手车);
        } else {
          r_PlayerData.PlayerData.addCoin("卖出房产", i, r_ReportSystem.SystemKey.二手车, true, true, true);
        }
      }
    });
  };
  _ctor.prototype.turnTo = function (e) {
    this.listState && this.listState.setSelectedPage(e);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.onClickLeft = function () {
    if (P == s.Choosing) {
      P = s.None;
      if (this.curIndex > 0) {
        this.curIndex--;
        cc.tween(this.layoutNode).by(.2, {
          x: 750
        }).call(function () {
          P = s.Choosing;
        }).start();
      }
      this.refshLR();
    }
  };
  _ctor.prototype.onClickRight = function () {
    if (P == s.Choosing) {
      P = s.None;
      if (this.curIndex < this.MAX_LEN - 1) {
        this.curIndex++;
        cc.tween(this.layoutNode).by(.2, {
          x: -750
        }).call(function () {
          P = s.Choosing;
        }).start();
      }
      this.refshLR();
    }
  };
  _ctor.prototype.refshLR = function () {
    if (this.curIndex > 0) {
      this.btnLeft.enabled = true;
    } else {
      this.btnLeft.enabled = false;
    }
    if (this.curIndex < this.MAX_LEN - 1) {
      this.btnRight.enabled = true;
    } else {
      this.btnRight.enabled = false;
    }
    if (this.CarConfig) {
      if (r_FirstVideoSystem.FirstVideoSystem.hasFirstEnter(r_FirstVideoSystem.FirstVideoUIEnum.二手车开始) && 1 == this.CarConfig[8 * this.curIndex].video) {
        this.btnShowAd.visible = true;
        this.btnShow.visible = false;
      } else {
        this.btnShowAd.visible = false;
        this.btnShow.visible = true;
      }
    }
  };
  _ctor.prototype.onClickShow = function () {
    if (P == s.Choosing) {
      r_FirstVideoSystem.FirstVideoSystem.setFirstEnter(r_FirstVideoSystem.FirstVideoUIEnum.二手车开始);
      var e = 8 * this.curIndex;
      var t = this.CarConfig[e];
      P = s.Confirm;
      this.txtName.text = "名称:  " + t.name;
      this.oriPrice = t.oriPrice;
      this.txtPrice.text = "仅售" + this.oriPrice.toString();
      this.totalGet = 0;
      this.btnGirl.visible = false;
      this.prefabNode.getChildByName("modelNode").active = false;
      this.listShowIndex = 0;
      this.turnTo("tip");
      this.curNode = this.layoutNode.children[this.curIndex];
      cc.tween(this.curNode.getChildByName("center").children[1]).to(.3, {
        opacity: 0
      }).start();
      for (var o = 0; o < 4; o++) {
        var i = this.CarConfig[e + 2 * o];
        var n = i.pngName;
        var a = this.curNode.getChildByName("mask").children[o + 1];
        i.x && (a.x = i.x);
        i.y && (a.y = i.y);
        i.scaleX && (a.scaleX = i.scaleX);
        i.scaleY && (a.scaleY = i.scaleY);
        this.pngList.getChildByName(n) && (a.getComponent(cc.Sprite).spriteFrame = this.pngList.getChildByName(n).getComponent(cc.Sprite).spriteFrame);
      }
      this.finder && (this.finder.active = true);
      this.initList();
    }
  };
  _ctor.prototype.onClickShowAd = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("ad揭示二手车", function () {
      e.onClickShow();
    });
  };
  _ctor.prototype.registTouch = function () {
    this.unregistTouch();
    this.hang.on(fgui.Event.TOUCH_BEGIN, this.finderStart, this);
    this.hang.on(fgui.Event.TOUCH_MOVE, this.finderMove, this);
    this.hang.on(fgui.Event.TOUCH_END, this.finderEnd, this);
  };
  _ctor.prototype.unregistTouch = function () {
    this.hang.off(fgui.Event.TOUCH_BEGIN, this.finderStart, this);
    this.hang.off(fgui.Event.TOUCH_MOVE, this.finderMove, this);
    this.hang.off(fgui.Event.TOUCH_END, this.finderEnd, this);
  };
  _ctor.prototype.finderStart = function (e) {
    if (!(P < s.Confirm)) {
      e.captureTouch();
      if (r_UtilsSystem.UtilsSystem.checkTouchNode(this.finder, e.touch.getLocation())) {
        this.isStart = true;
        this.offsetVec = this.prefabNode.convertToNodeSpaceAR(e.touch.getLocation()).sub(this.finder.getPosition());
      } else {
        this.isStart = false;
      }
    }
  };
  _ctor.prototype.lookingIt = function (e) {
    var t = this;
    if (e != this.lookingIndex) {
      this.lookingIndex = e;
      r_TimeSystem.TimeSystem.scheduleClear("lookingAThing");
      r_TimeSystem.TimeSystem.scheduleOnce("lookingAThing", this.lookingTimer, function () {
        t.layoutNode.children[t.curIndex].getChildByName("mask").children[t.lookingIndex].active = false;
        t.go2Option(t.lookingIndex);
      });
    }
  };
  _ctor.prototype.finderMove = function (e) {
    if (this.isStart) {
      if (P == s.Confirm) {
        this.turnTo("showed");
        P = s.Finding;
      }
      var t = this.prefabNode.convertToNodeSpaceAR(e.touch.getLocation());
      this.finder.setPosition(t.sub(this.offsetVec));
      var o = false;
      for (var i = 1; i < 5; i++) {
        var n = this.layoutNode.children[this.curIndex].getChildByName("mask").children[i];
        if (n.active && this.centerNode && this.centerNode.convertToWorldSpaceAR(cc.v2(0, 0)).sub(n.convertToWorldSpaceAR(cc.v2(0, 0))).len() < 80) {
          o = true;
          this.lookingIt(i);
          break;
        }
      }
      if (!o) {
        r_TimeSystem.TimeSystem.scheduleClear("lookingAThing");
        this.lookingIndex = -1;
      }
      this.moveUpdate();
    }
  };
  _ctor.prototype.finderEnd = function () {
    this.isStart && (this.isStart = false);
  };
  _ctor.prototype.go2Option = function (e) {
    if (P != s.Option) {
      this.contentPane.getController("midBg").selectedIndex = 1;
      this.midBlack.visible = true;
      this.thingIndex = e;
      this.turnTo("option");
      var t = 8 * this.curIndex + 2 * (e - 1);
      var o = this.CarConfig[t].pngName;
      var i = this.CarConfig[t].thing;
      this.txtDesc.text = i;
      this.hang2.texture = this.getIconFromList(o);
      this.btn1.text = this.CarConfig[t].op;
      this.btn2.text = this.CarConfig[t + 1].op;
      this.isStart = false;
      P = s.Option;
    }
  };
  _ctor.prototype.moveUpdate = function () {
    var e = this.glassSon.getComponent(cc.PolygonCollider);
    var t = this.layoutNode.children[this.curIndex];
    for (var o = 0; o < t.childrenCount; o++) {
      var i = t.children[o];
      if (i.getComponent(cc.Mask)) {
        var n = i.getComponent(cc.Mask);
        if (!n) {
          continue;
        }
        var a = n._graphics;
        a.lineWidth = 1;
        a.strokeColor = cc.color(255, 0, 0);
        a.fillColor = cc.color(0, 255, 0);
        a.clear();
        var s = null;
        for (var r = 0; r < e.points.length; r++) {
          var c = e.points[r];
          var l = this.glassSon.convertToWorldSpaceAR(c);
          var u = n.node.convertToNodeSpaceAR(l);
          if (0 != r) {
            a.lineTo(u.x, u.y);
            if (!(r != e.points.length - 1)) {
              a.close();
              a.stroke();
              a.fill();
            }
          } else {
            s = u;
            a.moveTo(s.x, s.y);
          }
        }
      }
    }
  };
  _ctor.prototype.clearMask = function () {
    if (this.layoutNode) {
      var e = this.layoutNode.children[this.curIndex].getChildByName("mask");
      var t = e.getComponent(cc.Mask);
      if (t) {
        (s = t._graphics).lineWidth = 1;
        s.strokeColor = cc.color(255, 0, 0);
        s.fillColor = cc.color(0, 255, 0);
        s.clear();
      }
      for (var o = 1; o < 5; o++) {
        (a = e.children[o]).active = true;
      }
      var i = this.layoutNode.children[this.curIndex];
      for (var n = 0; n < i.childrenCount; n++) {
        var a;
        if ((a = i.children[n]).getComponent(cc.Mask)) {
          var s;
          var r = a.getComponent(cc.Mask);
          if (!r) {
            continue;
          }
          (s = r._graphics).lineWidth = 1;
          s.strokeColor = cc.color(255, 0, 0);
          s.fillColor = cc.color(0, 255, 0);
          s.clear();
        }
      }
    }
  };
  _ctor.prototype.getIconFromList = function (e) {
    if (this.pngList.getChildByName(e)) {
      return this.pngList.getChildByName(e).getComponent(cc.Sprite).spriteFrame;
    }
  };
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnLeft")], _ctor.prototype, "btnLeft", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnRight")], _ctor.prototype, "btnRight", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnShow")], _ctor.prototype, "btnShow", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnShowAd")], _ctor.prototype, "btnShowAd", undefined);
  __decorate([r_DecorateFunction1.AutoFind("hang")], _ctor.prototype, "hang", undefined);
  __decorate([r_DecorateFunction1.AutoFind("listThing")], _ctor.prototype, "listThing", undefined);
  __decorate([r_DecorateFunction1.AutoFind("hang2")], _ctor.prototype, "hang2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btn1")], _ctor.prototype, "btn1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btn2")], _ctor.prototype, "btn2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnGirl")], _ctor.prototype, "btnGirl", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnBook")], _ctor.prototype, "btnBook", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txtDesc")], _ctor.prototype, "txtDesc", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txtName")], _ctor.prototype, "txtName", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txtPrice")], _ctor.prototype, "txtPrice", undefined);
  __decorate([r_DecorateFunction1.AutoFind("midBlack")], _ctor.prototype, "midBlack", undefined);
  return __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseReportLayer.ReportBaseLayer);
exports.ErShouCarUI = exp_ErShouCarUI;