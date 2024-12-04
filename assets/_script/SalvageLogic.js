var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_ResSystem = require("ResSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_SoundMgr = require("SoundMgr");
var r_SalvageResultUI = require("SalvageResultUI");
var r_SalvageTreasure = require("SalvageTreasure");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_SalvageLogic = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.innerCamera = null;
    t.innerShowSprite = null;
    t.mirrorNode = null;
    t.treasure = null;
    t.labPrice = null;
    t.chats = [];
    t.btnDeal = null;
    t.initTextture = false;
    t.touchStartPos = null;
    t.mirrorOriginPos = null;
    t.lastBubble = null;
    t.newBubble = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.setData = function (e) {
    this.m_data = e;
    this.loadTreasure();
  };
  _ctor.prototype.onLoad = function () {
    this.innerCamera = this.node.getChildByName("innerCamera").getComponent(cc.Camera);
    this.mirrorNode = this.node.getChildByName("mirrorNode");
    this.innerShowSprite = this.mirrorNode.children[0].children[0].getComponent(cc.Sprite);
    var e = new cc.RenderTexture();
    var t = this.innerShowSprite.node.width;
    var o = this.innerShowSprite.node.height;
    e.initWithSize(t, o);
    var i = new cc.SpriteFrame();
    i.setTexture(e);
    this.innerCamera.targetTexture = e;
    this.innerShowSprite.spriteFrame = i;
    this.btnDeal.active = false;
    this.node.width = cc.view.getVisibleSize().width;
    this.node.height = cc.view.getVisibleSize().height;
  };
  _ctor.prototype.start = function () {
    this.chats.forEach(function (e) {
      e.active = false;
    });
  };
  _ctor.prototype.loadTreasure = function () {
    var e = this;
    r_ResSystem.ResSystem.loadBundleRes("game1", "salvage/treasure" + this.m_data.id, cc.Prefab, function (t, o) {
      var i = cc.instantiate(o);
      i.active = true;
      i.name = "treasure";
      e.group.addChild(i);
      e.treasure = i.getComponent(r_SalvageTreasure.default);
      e.mirrorNode.on(cc.Node.EventType.TOUCH_START, e.onTouchStart, e);
      e.mirrorNode.on(cc.Node.EventType.TOUCH_MOVE, e.onTouchMove, e);
      e.mirrorNode.on(cc.Node.EventType.TOUCH_END, e.onTouchEnd, e);
      e.treasure.flaws.forEach(function (e) {
        e.node.active = false;
      });
      e.showFlaw();
      e.labPrice.string = r_UtilsSystem.UtilsSystem.getShowCoin(e.m_data.initPrice);
      e.treasure.setData(e.m_data);
    });
  };
  _ctor.prototype.onTouchStart = function (e) {
    this.touchStartPos = e.getLocation();
    this.mirrorOriginPos = this.mirrorNode.getPosition();
  };
  _ctor.prototype.onTouchMove = function (e) {
    var t = e.getLocation();
    var o = this.mirrorOriginPos.add(t.subtract(this.touchStartPos));
    this.innerCamera.node.setPosition(o);
    this.mirrorNode.setPosition(o);
    var i = function (e) {
      var t = n.treasure.flaws[e];
      if (!t.node.active) {
        return "continue";
      }
      if (t.getIsActive(n.mirrorNode.children[0])) {
        var o = n.treasure.flaws.findIndex(function (e) {
          return e == t;
        });
        if (-1 == o) {
          return "continue";
        } else {
          n.treasure.flaws.splice(o, 1);
          n.treasure.findSucc(t);
          n.showBubble(t);
          r_SoundMgr.SoundMgr.playSound("salvage/zhengque");
          return "break";
        }
      }
    };
    var n = this;
    for (var a = this.treasure.flaws.length - 1; a >= 0 && "break" !== i(a); a--) {
      ;
    }
  };
  _ctor.prototype.showBubble = function (e) {
    var t = this;
    this.btnDeal.active = false;
    this.chats.forEach(function (e) {
      e.active = false;
    });
    this.getRandomBubble();
    this.newBubble.active = true;
    this.newBubble.children[0].getComponent(cc.Label).string = e.bubble;
    this.scheduleOnce(function () {
      r_SoundMgr.SoundMgr.playSound("huifuxiaoxi");
    }, .5);
    cc.tween(this.newBubble).delay(2).to(.3, {
      opacity: 0
    }).call(function () {
      t.newBubble.children[0].getComponent(cc.Label).string = "我出" + r_UtilsSystem.UtilsSystem.getShowCoin(t.treasure.price);
      t.labPrice.string = r_UtilsSystem.UtilsSystem.getShowCoin(Math.abs(t.treasure.price));
      t.scheduleOnce(function () {
        r_SoundMgr.SoundMgr.playSound("huifuxiaoxi");
      }, .2);
    }).to(.2, {
      opacity: 255
    }).delay(1.5).call(this.showBubbleEnd, this).start();
  };
  _ctor.prototype.getRandomBubble = function () {
    var e = this;
    if (this.lastBubble) {
      var t = this.chats.filter(function (t) {
        return t != e.lastBubble;
      });
      this.newBubble = t[r_UtilsSystem.UtilsSystem.getRandomNum(0, 1)];
    } else {
      this.newBubble = this.chats[r_UtilsSystem.UtilsSystem.getRandomNum(0, 2)];
    }
    this.lastBubble = this.newBubble;
  };
  _ctor.prototype.showBubbleEnd = function () {
    this.showFlaw();
    this.chats.forEach(function (e) {
      e.active = false;
    });
    this.btnDeal.active = true;
  };
  _ctor.prototype.showFlaw = function () {
    this.treasure.showFlaw();
  };
  _ctor.prototype.onDeal = function () {
    r_SoundMgr.SoundMgr.playSound("click");
    var e = JSON.parse(JSON.stringify(this.m_data));
    e.resultPrice = this.treasure.price;
    r_SalvageResultUI.SalvageResultUI.showUI(e);
  };
  _ctor.prototype.onTouchEnd = function (e) {
    var t = e.getLocation();
    var o = this.mirrorOriginPos.add(t.subtract(this.touchStartPos));
    this.mirrorNode.setPosition(o);
    this.innerCamera.node.setPosition(o);
  };
  __decorate([_property(cc.Label)], _ctor.prototype, "labPrice", undefined);
  __decorate([_property([cc.Node])], _ctor.prototype, "chats", undefined);
  __decorate([_property(cc.Node)], _ctor.prototype, "btnDeal", undefined);
  __decorate([_property(cc.Node)], _ctor.prototype, "group", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_SalvageLogic;