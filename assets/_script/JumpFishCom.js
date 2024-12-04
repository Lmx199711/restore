var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_JumpFishCfg = require("JumpFishCfg");
var r_DragonUI = require("DragonUI");
var r_JumpFishFailUI = require("JumpFishFailUI");
var r_PlatformSystem = require("PlatformSystem");
var r_SoundMgr = require("SoundMgr");
var r_UtilsSystem = require("UtilsSystem");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_JumpFishCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.power = 500;
    t.powerRange = .2;
    t.dis = 200;
    t.jumpDuration = .5;
    t.btnStart = null;
    t.progressBar = null;
    t.fish = null;
    t.blackHole = null;
    t.life = null;
    t.dragonGate = null;
    t.dragonGateAnim = null;
    t.successAnim = null;
    t.mask = null;
    t.lifeCount = 3;
    t.ON_TOUCH = false;
    t.passCount = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    this.dragonGateAnimPos = this.dragonGateAnim.getPosition();
    this.dragonGateAnimScale = this.dragonGateAnim.scale;
    this.fishIndex = this.fish.getSiblingIndex();
    this.btnStart.active = false;
    this.successAnim.active = false;
    this.ON_TOUCH = false;
    this.progressBar.progress = 0;
    this.lifeCount = this.life.childrenCount;
    this.btnStart.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.btnStart.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    r_PlatformSystem.PlatformSystem.getIsWebPlatform() && this.dragonGateAnim.on(cc.Node.EventType.TOUCH_END, this.getAward, this);
    this.dragonGateAnimPlay();
  };
  _ctor.prototype.startGame = function () {
    this.btnStart.active = true;
  };
  _ctor.prototype.onTouchStart = function () {
    this.ON_TOUCH = true;
  };
  _ctor.prototype.onTouchMove = function (e) {
    var t = e.getLocation();
    this.btnStart.getBoundingBoxToWorld().contains(t) || this.jump();
  };
  _ctor.prototype.onTouchEnd = function () {
    this.jump();
  };
  _ctor.prototype.jump = function () {
    var e = this;
    r_SoundMgr.SoundMgr.playSound("jumpFish/跳水");
    this.ON_TOUCH = false;
    this.btnStart.active = false;
    var t = this.progressBar.progress;
    var o = this.fish.getPosition();
    var i = this.jumpDuration * t * this.blackHole.scale;
    i < .5 && (i = .5);
    var n = t * this.power * (Math.random() > .5 ? 1 + Math.random() * this.powerRange : 1 - Math.random() * this.powerRange);
    var a = 1 - t / 2;
    var s = cc.spawn(cc.moveBy(i, cc.v2(this.dis, n)).easing(cc.easeQuadraticActionInOut()), cc.scaleTo(i, a, a));
    var r = cc.spawn(cc.moveBy(i, cc.v2(this.dis, -n)).easing(cc.easeQuadraticActionInOut()), cc.scaleTo(i, 1, 1));
    var l = cc.callFunc(function () {
      if (e.isPass) {
        e.dragonGateAnimPlay();
        e.scheduleOnce(function () {
          cc.tween(e.fish).to(.5, {
            scale: 1
          }).start();
        }, 1);
      } else {
        r_SoundMgr.SoundMgr.playSound("jumpFish/失败");
        r_UtilsSystem.UtilsSystem.showTip("跃龙门失败，损失一点生命值");
        e.lifeCount--;
        if (e.lifeCount <= 0) {
          e.lifeCount = 0;
          e.life.children.forEach(function (e) {
            e.children[0].active = false;
          });
          r_JumpFishFailUI.JumpFishFailUI.showUI();
        } else {
          e.life.children[e.lifeCount].children[0].active = false;
        }
      }
      e.successAnim.active = false;
      e.fish.opacity = 255;
      e.isPass = false;
      e.fish.setPosition(o.x, o.y - 100);
      e.fish.parent = e.node;
      e.fish.scale = 1;
      e.fish.angle = 0;
      e.fish.setSiblingIndex(e.fishIndex);
      cc.tween(e.fish).to(.5, {
        y: o.y
      }).call(function () {
        e.btnStart.active = true;
      }).start();
      cc.tween(e.progressBar).to(.2, {
        progress: 0
      }).start();
    }, this);
    var p = cc.rotateBy(i, 90);
    this.fish.runAction(cc.spawn(cc.sequence(s, r), cc.sequence(p, p, l)));
  };
  _ctor.prototype.update = function (e) {
    this.ON_TOUCH && (this.progressBar.progress += e);
    this.progressBar.progress >= 1 && (this.progressBar.progress = 0);
    this.checkFish();
  };
  _ctor.prototype.checkFish = function () {
    if (!this.isPass) {
      this.fish.getComponent(cc.PolygonCollider);
      var e = this.blackHole.getComponent(cc.PolygonCollider);
      var t = this.fish.convertToWorldSpaceAR(cc.v2(0, 0));
      t = this.blackHole.convertToNodeSpaceAR(t);
      if (cc.Intersection.pointInPolygon(t, e.points)) {
        r_SoundMgr.SoundMgr.playSound("jumpFish/成功");
        r_UtilsSystem.UtilsSystem.showTip("成功跳过" + this.passCount + "重龙门");
        this.successAnim.active = true;
        this.isPass = true;
        this.fish.parent = this.blackHole.getChildByName("mask");
        this.fish.setPosition(t);
        this.fish.scale /= this.blackHole.scale;
        cc.tween(this.fish).to(this.jumpDuration * this.progressBar.progress * .5, {
          scale: 0,
          opacity: 0
        }).start();
      }
    }
  };
  _ctor.prototype.changeLevel = function () {
    var e = this;
    this.dragonGate.children.forEach(function (t, o) {
      t.active = o == e.passCount;
    });
    console.log("this.passCount", this.passCount);
    this.passCount++;
  };
  _ctor.prototype.dragonGateAnimPlay = function () {
    var e;
    var t = this;
    if (this.passCount >= Object.keys(r_JumpFishCfg.blackHole).length) {
      return this.getAward();
    }
    this.dragonGate.active = false;
    var o = this.dragonGateAnim.getComponent(cc.Animation);
    o.play();
    var i = r_JumpFishCfg.blackHole["level_" + (this.passCount + 1)];
    for (var n in i) cc.tween(this.blackHole).to(.5, (e = {}, e[n] = i[n], e)).start();
    var a = 0;
    o.on("finished", function () {
      if (!a) {
        t.dragonGateAnim.setPosition(t.dragonGateAnimPos);
        t.dragonGateAnim.scale = t.dragonGateAnimScale;
        t.dragonGate.active = true;
        t.changeLevel();
        a++;
      }
    }, this);
  };
  _ctor.prototype.getAward = function () {
    r_DragonUI.DragonUI.showUI();
  };
  _ctor.prototype.revive = function () {
    var e = this;
    this.life.children.forEach(function (t, o) {
      e.scheduleOnce(function () {
        t.children[0].active = true;
      }, .1 * o);
    });
    this.lifeCount = 3;
  };
  __decorate([_property({
    displayName: "力度",
    type: cc.Integer
  })], _ctor.prototype, "power", undefined);
  __decorate([_property({
    displayName: "力度区间",
    type: cc.Float
  })], _ctor.prototype, "powerRange", undefined);
  __decorate([_property({
    displayName: "跳跃距离",
    type: cc.Float
  })], _ctor.prototype, "dis", undefined);
  __decorate([_property({
    displayName: "动画持续事件",
    type: cc.Float
  })], _ctor.prototype, "jumpDuration", undefined);
  __decorate([_property({
    displayName: "开始按钮",
    type: cc.Node
  })], _ctor.prototype, "btnStart", undefined);
  __decorate([_property({
    displayName: "进度条",
    type: cc.ProgressBar
  })], _ctor.prototype, "progressBar", undefined);
  __decorate([_property({
    displayName: "鱼",
    type: cc.Node
  })], _ctor.prototype, "fish", undefined);
  __decorate([_property({
    displayName: "黑洞",
    type: cc.Node
  })], _ctor.prototype, "blackHole", undefined);
  __decorate([_property({
    displayName: "生命值",
    type: cc.Node
  })], _ctor.prototype, "life", undefined);
  __decorate([_property({
    displayName: "龙门",
    type: cc.Node
  })], _ctor.prototype, "dragonGate", undefined);
  __decorate([_property({
    displayName: "龙门动画",
    type: cc.Node
  })], _ctor.prototype, "dragonGateAnim", undefined);
  __decorate([_property({
    displayName: "成功动画",
    type: cc.Node
  })], _ctor.prototype, "successAnim", undefined);
  __decorate([_property({
    displayName: "遮罩",
    type: cc.Node
  })], _ctor.prototype, "mask", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_JumpFishCom;