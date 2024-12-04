var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_TimeSystem = require("TimeSystem");
var r_SoundMgr = require("SoundMgr");
var r_BlowFeatherUI = require("BlowFeatherUI");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
_decorator.property;
var def_BlowFeatherLogic = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.block = null;
    t.feather = null;
    t.role = null;
    t.gameOverNode = null;
    t.downTimeLabel = null;
    t.blockSpeed = 300;
    t.featherSpeed = 500;
    t.blockDistV = 300;
    t.blockRandomV = 193;
    t.isRun = true;
    t.score = 0;
    t.passItem = {};
    t.gravity = -100;
    t.downTime = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    this.block = this.node.getChildByName("block");
    this.feather = this.node.getChildByName("feather");
    this.role = this.node.getChildByName("role");
    this.gameOverNode = this.node.getChildByName("gameOver");
    this.downTimeLabel = this.node.getChildByName("downTimeLabel").getComponent(cc.Label);
    this.init();
  };
  _ctor.prototype.onEnable = function () {
    this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
  };
  _ctor.prototype.onDisable = function () {
    this.node.off(cc.Node.EventType.TOUCH_START, this.touchStart, this);
    this.node.off(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
    r_TimeSystem.TimeSystem.unregistSecondUpdate("BFDownTime");
    r_SoundMgr.SoundMgr.playMusic("bgm");
  };
  _ctor.prototype.init = function () {
    var e = this;
    this.feather.y = 0;
    this.block.x = 0;
    for (var t = 0; t < this.block.children.length; t++) {
      var o = this.block.children[t];
      if (t < 2) {
        this.blockOffset(o);
      } else {
        o.y = this.block.children[t - 2].y - this.blockDistV;
      }
      o.x = t % 2 == 0 ? -270 : 270;
    }
    this.passItem[0] = true;
    this.passItem[1] = false;
    this.score = 0;
    this.node.getChildByName("curScore").getComponent(cc.Label).string = this.score.toString();
    this.gameOverNode.active = false;
    this.featherSpeed = 0;
    this.isRun = false;
    this.downTime = 3;
    this.downTimeLabel.string = this.downTime.toString();
    r_TimeSystem.TimeSystem.registSecondUpdate("BFDownTime", function () {
      e.downTime--;
      e.downTimeLabel.string = e.downTime.toString();
      if (e.downTime <= 0) {
        e.downTimeLabel.string = "";
        e.isRun = true;
        r_TimeSystem.TimeSystem.unregistSecondUpdate("BFDownTime");
      }
    });
    r_SoundMgr.SoundMgr.playSound("blowFeather/开始倒计时_01");
    r_SoundMgr.SoundMgr.playMusic("blowFeather/BGM_01");
  };
  _ctor.prototype.randomRange = function (e, t) {
    return e + Math.random() * (t - e);
  };
  _ctor.prototype.update = function (e) {
    if (this.isRun) {
      this.block.x -= this.blockSpeed * e;
      for (var t = 0; t < this.block.children.length; t++) {
        var o = this.block.children[t];
        if (this.block.x + o.x < -440) {
          o.x += 1080;
          if (t < 2) {
            this.blockOffset(o);
            this.passItem[t] = false;
          } else {
            o.y = this.block.children[t - 2].y - this.blockDistV;
          }
        }
        if (t < 2 && !this.passItem[t] && this.feather.x - (this.block.x + o.x) > (this.feather.width + o.width) / 2) {
          this.score++;
          this.passItem[t] = true;
          this.node.getChildByName("curScore").getComponent(cc.Label).string = this.score.toString();
        }
        if (this.checkHit(this.feather, o)) {
          return void this.gameOver();
        }
      }
      var i = this.featherSpeed * e + .5 * this.gravity * e * e;
      this.featherSpeed += this.gravity * e;
      this.feather.y += 20 * i;
      if (this.feather.y <= -560) {
        this.feather.y = -560;
        this.gameOver();
      }
    }
  };
  _ctor.prototype.blockOffset = function (e) {
    var t;
    var o = Math.random();
    t = o < .2 ? this.randomRange(0, 60) : o > .8 ? this.randomRange(60, 120) : this.randomRange(120, this.blockRandomV);
    e.y = (Math.random() < .5 ? -1 : 1) * t;
  };
  _ctor.prototype.touchStart = function () {
    if (this.isRun) {
      this.role.getChildByName("blow").active = true;
      this.featherSpeed = 40;
      r_SoundMgr.SoundMgr.playSound("blowFeather/吹气_01");
    }
  };
  _ctor.prototype.touchEnd = function () {
    this.isRun && (this.role.getChildByName("blow").active = false);
  };
  _ctor.prototype.checkHit = function (e, t) {
    var o = e.getComponent(cc.PolygonCollider);
    var i = t.getComponent(cc.PolygonCollider);
    var n = [];
    for (var a = 0; a < o.points.length; a++) {
      var s = o.points[a];
      s = e.convertToWorldSpaceAR(s);
      s = t.convertToNodeSpaceAR(s);
      n.push(s);
    }
    if (cc.Intersection.polygonPolygon(n, i.points)) {
      return true;
    }
  };
  _ctor.prototype.againBtn = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("吹羽毛", function () {
      e.gameOverNode.active = false;
      e.init();
    });
  };
  _ctor.prototype.closeBtn = function () {
    r_BlowFeatherUI.BlowFeatherUI.hide();
  };
  _ctor.prototype.gameOver = function () {
    r_SoundMgr.SoundMgr.playSound("blowFeather/游戏结束_01");
    this.isRun = false;
    this.gameOverNode.active = true;
    var e = 79e4 * this.score;
    this.gameOverNode.getChildByName("score").getComponent(cc.Label).string = this.score.toString();
    this.gameOverNode.getChildByName("reward").getComponent(cc.Label).string = e.toString();
    this.gameOverNode.getChildByName("best").active = e >= 79e6;
    r_PlayerData.PlayerData.addCoin("吹羽毛", e, r_ReportSystem.SystemKey.小游戏);
  };
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_BlowFeatherLogic;