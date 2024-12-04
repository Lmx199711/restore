var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BTNodeInfo = undefined;
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_RelaxSystem = require("RelaxSystem");
var r_Index = require("Index");
var r_SoundMgr = require("SoundMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var exp_BTNodeInfo = function () {
  function _ctor() {
    this.node = null;
    this.icon = null;
    this.name = "";
    this.sceneIndex = 1;
    this.isFinish = false;
  }
  __decorate([_property({
    displayName: "提示点",
    type: cc.Node
  })], _ctor.prototype, "node", undefined);
  __decorate([_property({
    displayName: "道具icon",
    type: cc.SpriteFrame
  })], _ctor.prototype, "icon", undefined);
  __decorate([_property()], _ctor.prototype, "name", undefined);
  __decorate([_property()], _ctor.prototype, "sceneIndex", undefined);
  return __decorate([_ccclass("BTNodeInfo")], _ctor);
}();
exports.BTNodeInfo = exp_BTNodeInfo;
var def_BusTrickLogic = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.touchNode = null;
    t.touchNodeScale = new cc.Vec2(1, 2);
    t.itemList = null;
    t.ItemPrefab = null;
    t.clickNodeList = [];
    t.beginDistance = 0;
    t.beginScale = 0;
    t.bgNode = null;
    t.rectNode = null;
    t.clampfPos = new cc.Vec4(0, 0, 0, 0);
    t.curIndex = 0;
    t.curSceneIndex = 0;
    t.dx = 0;
    t.dy = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.loadPreload = function () {
    return __awaiter(this, undefined, Promise, function () {
      return __generator(this, function () {
        return [2, Promise.resolve(1)];
      });
    });
  };
  _ctor.prototype.onLoad = function () {
    this.init();
  };
  _ctor.prototype.onEnable = function () {};
  _ctor.prototype.init = function () {
    this.rectNode = this.touchNode.parent;
  };
  _ctor.prototype.start = function () {};
  _ctor.prototype.update = function () {};
  _ctor.prototype.onBgTouchStart = function (e) {
    this.beginDistance = 0;
    this.beginScale = this.touchNode.scale;
    this.dx = 0;
    this.dy = 0;
    e.getLocation();
  };
  _ctor.prototype.onBgTouchMove = function (e) {
    var t = e.getTouches();
    if (1 == t.length) {
      this.checkMapPosition(e.getDeltaX(), e.getDeltaY());
    } else if (2 == t.length) {
      var o = t[0].getLocation();
      var i = t[1].getLocation();
      var n = o.sub(i).len();
      this.beginDistance <= 0 && (this.beginDistance = n);
      var a = n / this.beginDistance * this.beginScale;
      var s = cc.misc.clampf(a, this.touchNodeScale.x, this.touchNodeScale.y);
      this.checkFourLimit(s);
      this.checkMapPosition();
      this.touchNode.scale = s;
    }
  };
  _ctor.prototype.onBgTouchEnd = function (e) {
    if (!(this.dx * this.dx + this.dy * this.dy >= 16)) {
      e.getLocation();
      this.checkFourLimit();
    }
  };
  _ctor.prototype.triggerChangeScene = function (e, t, o) {
    this.curSceneIndex = parseInt(o);
    this.curIndex = 0;
    this.itemList.removeAllChildren();
    for (var i = this.clickNodeList.length - 1; i >= 0; i--) {
      if (this.clickNodeList[i].sceneIndex == this.curSceneIndex) {
        var n = cc.instantiate(this.ItemPrefab);
        n.active = true;
        n.parent = this.itemList;
      }
    }
  };
  _ctor.prototype.triggerFindItem = function (e, t, o) {
    for (var i = this.clickNodeList.length - 1; i >= 0; i--) {
      var n = this.clickNodeList[i];
      if (n.name == o) {
        this.findItem(n);
        break;
      }
    }
  };
  _ctor.prototype.findItem = function (e) {
    r_SoundMgr.SoundMgr.playSound("回答正确");
    e.node.active = true;
    e.node.color = cc.Color.RED;
    var t = e.node.getComponent(cc.Sprite);
    t.type = cc.Sprite.Type.FILLED;
    t.fillType = cc.Sprite.FillType.RADIAL;
    t.fillCenter.x = .5;
    t.fillCenter.y = .5;
    t.fillRange = 0;
    cc.tween(t).to(.5, {
      fillRange: 1
    }).call(function () {}).start();
    var o = this.itemList.children[this.curIndex];
    var i = o.getChildByName("icon");
    var n = cc.instantiate(i);
    n.parent = this.node;
    n.spriteCom.spriteFrame = e.icon;
    n.worldPosition = e.node.worldPosition.clone();
    this.curIndex++;
    cc.tween(n).to(.5, {
      worldPosition: i.worldPosition,
      scale: 1
    }).call(function () {
      n.destroy();
      i.spriteCom.spriteFrame = e.icon;
      o.getChildByName("label").labelCom.string = e.name;
    }).start();
  };
  _ctor.prototype.onDisable = function () {
    r_Index.Platform.isMiniPlatform || fgui.GRoot.inst.off(cc.Node.EventType.MOUSE_WHEEL, this.mouseWheel, this);
  };
  _ctor.prototype.mouseWheel = function (e) {
    var t = e.getScrollY() / 1200;
    var o = this.touchNode.scale += t;
    var i = cc.misc.clampf(o, this.touchNodeScale.x, this.touchNodeScale.y);
    this.checkFourLimit(i);
    this.checkMapPosition();
    this.touchNode.scale = i;
  };
  _ctor.prototype.checkMapPosition = function (e, t) {
    undefined === e && (e = 0);
    undefined === t && (t = 0);
    var o = this.touchNode;
    o.x = cc.misc.clampf(o.x + e, this.clampfPos.w, this.clampfPos.z);
    o.y = cc.misc.clampf(o.y + t, this.clampfPos.y, this.clampfPos.x);
    this.dx += e;
    this.dy += t;
  };
  _ctor.prototype.checkFourLimit = function (e) {
    e || (e = this.touchNode.scale);
    var t = this.rectNode.width;
    var o = this.rectNode.height;
    var i = this.bgNode.width * this.bgNode.scaleX * e;
    var n = this.bgNode.height * this.bgNode.scaleY * e;
    this.clampfPos.x = (n - o) / 2;
    this.clampfPos.y = -this.clampfPos.x;
    this.clampfPos.z = (i - t) / 2;
    this.clampfPos.w = -this.clampfPos.z;
  };
  _ctor.prototype.failLevel = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.clearLevel();
    r_RelaxSystem.RelaxSystem.lose();
  };
  _ctor.prototype.passLevel = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.clearLevel();
    r_RelaxSystem.RelaxSystem.win();
  };
  __decorate([_property({
    displayName: "缩放节点",
    type: cc.Node
  })], _ctor.prototype, "touchNode", undefined);
  __decorate([_property({
    displayName: "缩放范围"
  })], _ctor.prototype, "touchNodeScale", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "道具列表"
  })], _ctor.prototype, "itemList", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "道具预设"
  })], _ctor.prototype, "ItemPrefab", undefined);
  __decorate([_property({
    displayName: "提示列表",
    type: exp_BTNodeInfo
  })], _ctor.prototype, "clickNodeList", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_BusTrickLogic;