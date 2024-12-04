var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomerInfo = exports.DishInfo = exports.FoodInfo = undefined;
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_SoundMgr = require("SoundMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var exp_FoodInfo = function () {
  function _ctor() {
    this.foodId = 1;
  }
  __decorate([_property({
    type: Number,
    displayName: "物品id"
  })], _ctor.prototype, "foodId", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "图片节点"
  })], _ctor.prototype, "picNode", undefined);
  __decorate([_property({
    type: cc.PolygonCollider,
    displayName: "碰撞框"
  })], _ctor.prototype, "collider", undefined);
  return __decorate([_ccclass("FoodInfo")], _ctor);
}();
exports.FoodInfo = exp_FoodInfo;
var exp_DishInfo = function () {
  function _ctor() {
    this.foodId = 1;
    this.foodNum = 1;
    this.content = "";
    this.sound = "";
  }
  __decorate([_property({
    type: Number,
    displayName: "物品id"
  })], _ctor.prototype, "foodId", undefined);
  __decorate([_property({
    type: Number,
    displayName: "物品数量"
  })], _ctor.prototype, "foodNum", undefined);
  __decorate([_property({
    displayName: "内容"
  })], _ctor.prototype, "content", undefined);
  __decorate([_property({
    displayName: "音效"
  })], _ctor.prototype, "sound", undefined);
  return __decorate([_ccclass("DishInfo")], _ctor);
}();
exports.DishInfo = exp_DishInfo;
var exp_CustomerInfo = function () {
  function _ctor() {
    this.dishList = [];
  }
  __decorate([_property({
    type: cc.Node,
    displayName: "顾客根节点"
  })], _ctor.prototype, "rootNode", undefined);
  __decorate([_property({
    type: [exp_DishInfo],
    displayName: "菜单列表"
  })], _ctor.prototype, "dishList", undefined);
  return __decorate([_ccclass("CustomerInfo")], _ctor);
}();
exports.CustomerInfo = exp_CustomerInfo;
var def_ShoppingLevel = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.customerList = [];
    t.foodList = [];
    t.posList = [];
    t.maxDishTime = 30;
    t.greenColor = cc.color(147, 201, 43, 255);
    t.yellowColor = cc.color(255, 232, 36, 255);
    t.redColor = cc.color(224, 40, 56, 255);
    t.curIndex = 0;
    t.buyList = [];
    t.foodMap = {};
    t.finishCustomerNum = 0;
    t.isPauseTime = false;
    t.isWait = false;
    t.customerCreateTime = 0;
    t.isAutoPop = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    this.init();
    this.registTouch();
  };
  _ctor.prototype.onDestroy = function () {
    this.pauseLayer.destroy();
    r_TimeSystem.TimeSystem.scheduleClear("nextCustomer");
  };
  _ctor.prototype.onRevive = function () {};
  _ctor.prototype.init = function () {
    this.foodMap = {};
    for (var e = 0; e < this.foodList.length; e++) {
      this.foodMap[this.foodList[e].foodId] = this.foodList[e];
    }
  };
  _ctor.prototype.enterCustomer = function () {
    var e = this;
    if (!(this.buyList.length >= this.posList.length)) {
      var t = this.customerList[this.curIndex];
      if (t) {
        for (var o = 0; o < this.buyList.length; o++) {
          if (this.buyList[o].customerInfo.rootNode == t.rootNode) {
            return;
          }
        }
        var i = null;
        for (o = 0; o < this.posList.length; o++) {
          if (this.posList[o].childrenCount <= 0) {
            i = this.posList[o];
            break;
          }
        }
        if (i) {
          var n = new cc.Node("BuyRoot");
          i.addChild(n);
          var a = cc.instantiate(t.rootNode);
          n.addChild(a);
          a.active = true;
          a.x = 0;
          a.y = -400;
          var s = cc.instantiate(this.talkNode);
          n.addChild(s);
          s.active = false;
          s.x = -155;
          s.y = 350;
          var r = cc.instantiate(this.dishNode);
          n.addChild(r);
          r.active = false;
          r.x = 165;
          r.y = 200;
          var c = {};
          c.posRoot = i;
          c.curFood = 0;
          c.curFoodNum = 0;
          c.passTime = 0;
          c.customerInfo = t;
          c.customerSpine = a.getChildByName("anim").getComponent(sp.Skeleton);
          c.customerNode = a;
          c.talkNode = s;
          c.dishNode = r;
          c.customerSpine.setAnimation(0, "daiji", true);
          this.buyList.push(c);
          cc.tween(a).to(.5, {
            y: 0
          }).call(function () {
            e.resetBuyContent(c);
            s.active = true;
            r.active = true;
            e.nextEnterCustomer(5);
          }).start();
          this.curIndex = this.curIndex + 1;
        }
      }
    }
  };
  _ctor.prototype.nextEnterCustomer = function (e) {
    if (!this.isWait) {
      this.isWait = true;
      this.customerCreateTime = e;
    }
  };
  _ctor.prototype.resetBuyContent = function (e) {
    this.playAnim(e, "shuohua");
    e.passTime = 0;
    var t = e.customerInfo.dishList[e.curFood];
    e.talkNode.getChildByName("content").getComponent(cc.Label).string = t.content;
    "" != t.sound && r_SoundMgr.SoundMgr.playSound(t.sound);
    e.talkNode.getChildByName("time").getComponent(cc.Label).string = this.maxDishTime;
    e.talkNode.getChildByName("progress").getComponent(cc.Sprite).fillRange = 1;
  };
  _ctor.prototype.refreshTaskTime = function (e) {
    var t = Math.floor(this.maxDishTime - e.passTime);
    t = Math.max(0, t);
    e.talkNode.getChildByName("progress").color = t <= 10 ? this.redColor : t <= 20 ? this.yellowColor : this.greenColor;
    e.talkNode.getChildByName("time").getComponent(cc.Label).string = t;
    e.talkNode.getChildByName("progress").getComponent(cc.Sprite).fillRange = t / this.maxDishTime;
  };
  _ctor.prototype.registTouch = function () {
    var e = this;
    this.touchNode = new cc.Node();
    this.touchNode.width = 1668;
    this.touchNode.height = 1002;
    this.node.addChild(this.touchNode);
    var t = null;
    var o = null;
    var i = null;
    var n = 0;
    var a = 0;
    this.guideLayer = this.node.getChildByName("guideLayer");
    this.guideLayer.parent = cc.director.getScene();
    this.guideLayer.x = 667;
    this.guideLayer.y = 375;
    this.guideLayer.getChildByName("bg").on(cc.Node.EventType.TOUCH_START, function () {
      console.log("引导界面屏蔽");
    });
    r_TimeSystem.TimeSystem.scheduleOnce("nextCustomer", 1, function () {
      e.guideLayer.active = true;
    });
    this.pauseLayer = this.node.getChildByName("pauseLayer");
    this.pauseLayer.parent = cc.director.getScene();
    this.pauseLayer.x = 667;
    this.pauseLayer.y = 375;
    this.pauseLayer.getChildByName("bg").on(cc.Node.EventType.TOUCH_START, function () {
      console.log("暂停界面屏蔽");
    });
    this.touchNode.on(cc.Node.EventType.TOUCH_START, function (s) {
      t = null;
      o = null;
      i = s.getLocation();
      for (var r = 0; r < e.foodList.length; r++) {
        var l = e.foodList[r];
        var u = l.collider.node.convertToNodeSpaceAR(i);
        if (cc.Intersection.pointInPolygon(u, l.collider.points)) {
          var h = l.picNode.parent.convertToNodeSpaceAR(i);
          l.picNode.active = true;
          l.picNode.x = h.x;
          l.picNode.y = h.y;
          t = l.picNode;
          o = l;
          n = h.x;
          a = h.y;
          return void r_SoundMgr.SoundMgr.playSound("getItem");
        }
      }
      for (r = 0; r < e.buyList.length; r++) {
        var p = e.buyList[r];
        u = p.posRoot.convertToNodeSpaceAR(i);
        var d = p.posRoot.getComponent(cc.PolygonCollider);
        if (cc.Intersection.pointInPolygon(u, d.points)) {
          e.playAnim(p, "shuohua");
          var y = p.customerInfo.dishList[p.curFood];
          return void ("" != y.sound && r_SoundMgr.SoundMgr.playSound(y.sound));
        }
      }
    });
    this.touchNode.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
      if (t) {
        var o = e.getLocation();
        t.x = n + o.x - i.x;
        t.y = a + o.y - i.y;
      }
    });
    this.touchNode.on(cc.Node.EventType.TOUCH_END, function (i) {
      if (t) {
        var n = i.getLocation();
        for (var a = 0; a < e.buyList.length; a++) {
          var s = e.buyList[a];
          var r = s.posRoot.convertToNodeSpaceAR(n);
          var l = s.posRoot.getComponent(cc.PolygonCollider);
          if (cc.Intersection.pointInPolygon(r, l.points)) {
            var u = s.customerInfo.dishList[s.curFood];
            if (u.foodId == o.foodId) {
              e.playAnim(s, "gaoxin");
              r_SoundMgr.SoundMgr.playSound("zhengque");
              s.curFoodNum = s.curFoodNum + 1;
              if (s.curFoodNum >= u.foodNum) {
                s.curFood = s.curFood + 1;
                s.curFoodNum = 0;
                if (s.curFood >= s.customerInfo.dishList.length) {
                  e.customerLeave(s);
                } else {
                  e.refreshDishPanel(s);
                  e.resetBuyContent(s);
                }
              } else {
                e.refreshDishPanel(s);
              }
            } else {
              r_SoundMgr.SoundMgr.playSound("error");
              e.playAnim(s, "shengqi");
            }
            break;
          }
        }
        t.active = false;
        t = null;
      }
    });
    this.touchNode._touchListener.setSwallowTouches(false);
  };
  _ctor.prototype.refreshDishPanel = function (e) {
    var t = e.curFood;
    var o = 1;
    for (var i = 1; i <= 3; i++) {
      e.dishNode.getChildByName("icon" + i).active = false;
      e.dishNode.getChildByName("num" + i).active = false;
    }
    if (e.curFoodNum > 0) {
      e.dishNode.getChildByName("icon" + o).active = true;
      e.dishNode.getChildByName("num" + o).active = true;
      var n = e.customerInfo.dishList[t];
      var a = this.foodMap[n.foodId];
      e.dishNode.getChildByName("icon" + o).getComponent(cc.Sprite).spriteFrame = a.picNode.getComponent(cc.Sprite).spriteFrame;
      if (e.dishNode.getChildByName("icon" + o).width > 87) {
        e.dishNode.getChildByName("icon" + o).scale = 87 / e.dishNode.getChildByName("icon" + o).width;
      } else {
        e.dishNode.getChildByName("icon" + o).scale = 1;
      }
      e.dishNode.getChildByName("num" + o).getComponent(cc.Label).string = "x" + e.curFoodNum;
      o += 1;
    }
    for (i = e.curFood - 1; i >= 0 && !(o > 3); i--) {
      e.dishNode.getChildByName("icon" + o).active = true;
      e.dishNode.getChildByName("num" + o).active = true;
      n = e.customerInfo.dishList[i];
      a = this.foodMap[n.foodId];
      e.dishNode.getChildByName("icon" + o).getComponent(cc.Sprite).spriteFrame = a.picNode.getComponent(cc.Sprite).spriteFrame;
      if (e.dishNode.getChildByName("icon" + o).width > 87) {
        e.dishNode.getChildByName("icon" + o).scale = 87 / e.dishNode.getChildByName("icon" + o).width;
      } else {
        e.dishNode.getChildByName("icon" + o).scale = 1;
      }
      e.dishNode.getChildByName("num" + o).getComponent(cc.Label).string = "x" + n.foodNum;
      o += 1;
    }
  };
  _ctor.prototype.customerLeave = function (e) {
    var t = this;
    this.isPauseTime = false;
    this.isAutoPop = false;
    var o = e.posRoot;
    r_UtilsSystem.UtilsSystem.removeFromArray(this.buyList, e);
    e.talkNode.active = false;
    e.dishNode.active = false;
    cc.tween(e.customerNode).to(.5, {
      y: -400
    }).call(function () {
      o.removeAllChildren();
      t.finishCustomerNum = t.finishCustomerNum + 1;
      t.finishCustomerNum >= t.customerList.length || t.nextEnterCustomer(5);
    }).start();
  };
  _ctor.prototype.playAnim = function (e, t) {
    var o = e.customerSpine.setAnimation(0, t, false);
    e.customerSpine.setTrackCompleteListener(o, function () {
      e.customerSpine.setAnimation(0, "daiji", true);
    });
  };
  _ctor.prototype.onClickStop = function () {
    this.pauseLayer.active = true;
  };
  _ctor.prototype.onClickOk = function () {};
  _ctor.prototype.onClickCancel = function () {
    this.pauseLayer.active = false;
  };
  _ctor.prototype.onClickCloseGuide = function () {
    this.guideLayer.active = false;
    this.enterCustomer();
  };
  _ctor.prototype.update = function (e) {
    if (!this.isPauseTime) {
      e > .1 && (e = .016);
      for (var t = 0; t < this.buyList.length; t++) {
        var o = this.buyList[t];
        o.passTime = o.passTime + e;
        if (!this.isAutoPop && this.maxDishTime - o.passTime <= 2) {
          this.isAutoPop = true;
          this.onClickStop();
        }
        if (o.passTime > this.maxDishTime) {
          return void (this.isPauseTime = true);
        }
        this.refreshTaskTime(o);
      }
      if (this.isWait) {
        this.customerCreateTime = this.customerCreateTime - e;
        if (this.customerCreateTime <= 0) {
          this.isWait = false;
          this.enterCustomer();
        }
      }
    }
  };
  __decorate([_property({
    type: cc.Node,
    displayName: "说话节点"
  })], _ctor.prototype, "talkNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "菜单节点"
  })], _ctor.prototype, "dishNode", undefined);
  __decorate([_property({
    type: [exp_CustomerInfo],
    displayName: "顾客列表"
  })], _ctor.prototype, "customerList", undefined);
  __decorate([_property({
    type: [exp_FoodInfo],
    displayName: "食物列表"
  })], _ctor.prototype, "foodList", undefined);
  __decorate([_property({
    type: [cc.Node],
    displayName: "位子列表"
  })], _ctor.prototype, "posList", undefined);
  return __decorate([_ccclass, _menu("买菜/关卡组件")], _ctor);
}(cc.Component);
exports.default = def_ShoppingLevel;