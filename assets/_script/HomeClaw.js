var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClawMoveState = undefined;
var s;
var r_CommonFunc = require("CommonFunc");
var r_SoundMgr = require("SoundMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_HomeClaw = function (e) {
  function _ctor() {
    var t = e.call(this) || this;
    t.rope = null;
    t.claw = null;
    t.m_moveSpeed = 150;
    t.m_maxLen = 350;
    t.m_len = 0;
    t.m_ruleX = 210;
    t.m_isStart = false;
    t.m_isZhuajing = false;
    t.m_tempItem = null;
    return t;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  Object.defineProperty(_ctor.prototype, "isZhuajing", {
    get: function () {
      return this.m_isZhuajing;
    },
    set: function (e) {
      this.m_isZhuajing = e;
      if (this.m_isZhuajing) {
        this.m_sk.setAnimation(0, "1_zhua", false);
        this.m_sk.timeScale = 1;
        r_SoundMgr.SoundMgr.playSound("home/夹住");
      } else {
        this.m_sk.setAnimation(0, "2_fang", false);
        this.m_sk.timeScale = 1;
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor.prototype, "len", {
    get: function () {
      return this.m_len;
    },
    set: function (e) {
      this.m_len = e;
      this.rope.height = this.m_len;
      this.claw.y = this.rope.y - this.rope.height;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.init = function () {
    this.len = 0;
    this.node.x = 0;
    this.m_tempItem = null;
    this.m_sk = this.claw.getComponent(sp.Skeleton);
    this.m_isZhuajing = false;
    this.initAnim();
    this.m_isStart = true;
    this.m_moveState = s.stop;
  };
  _ctor.prototype.initAnim = function () {
    this.m_sk.setAnimation(0, "yaohuan", false);
    this.m_sk.timeScale = 0;
  };
  _ctor.prototype.playYaohuan = function () {
    this.m_sk.setAnimation(0, "yaohuan", false);
    this.m_sk.timeScale = 1;
  };
  _ctor.prototype.control = function (e) {
    this.m_moveState != s.left && this.m_moveState != s.right || e != s.stop || this.playYaohuan();
    this.m_moveState = e;
  };
  _ctor.prototype.setYaohuang = function () {
    this.m_tween = cc.tween(this.claw).to(100, {
      angle: 20
    }).to(100, {
      angle: -15
    }).to(100, {
      angle: 10
    }).to(150, {
      angle: -5
    }).to(120, {
      angle: 0
    }).start();
  };
  _ctor.prototype.update = function (e) {
    var t = this;
    if (this.m_isStart && (e > .1 && (e = .017), this.clawItem(), this.m_moveState != s.stop)) {
      if (this.m_tween) {
        this.m_tween.stop();
        this.m_tween = null;
        this.claw.angle = 0;
      }
      if (this.m_moveState == s.up) {
        if (this.len <= 0) {
          this.m_moveState = s.stop;
          this.len = 0;
          this.node.emit(_ref__ctor.SHOUZHUA);
        } else {
          this.len = this.m_len - this.m_moveSpeed * e;
        }
      } else if (this.m_moveState == s.down) {
        for (var i = 0; i < this.tmepItems.length; i++) {
          var n = this.tmepItems[i];
          var a = this.claw.convertToWorldSpaceAR(cc.v2(0, -70));
          if (r_CommonFunc.checkTouchNode(a, n.node)) {
            this.m_moveState = s.stop;
            return void this.node.emit(_ref__ctor.ZHUAQU);
          }
        }
        if (this.len >= this.m_maxLen) {
          this.m_moveState = s.stop;
          this.len = this.m_maxLen;
          this.node.emit(_ref__ctor.ZHUAQU);
        } else {
          this.len = this.m_len + this.m_moveSpeed * e;
        }
      } else if (this.m_moveState == s.left) {
        if (this.node.x - this.m_moveSpeed * e <= -this.m_ruleX) {
          this.m_moveState = s.stop;
          r_SoundMgr.SoundMgr.stopSound("home/移动");
          if (this.isZhuajing) {
            this.isZhuajing = false;
            this.m_tempItem.node.zIndex = -1;
            this.m_tempItem.active = false;
            cc.tween(this.m_tempItem.node).to(2, {
              y: -500
            }).start();
            cc.tween(this.m_tempItem.node).by(1, {
              angle: 360
            }).by(1, {
              angle: 360
            }).call(function () {
              t.node.emit(_ref__ctor.CLAW_END);
            }).start();
          }
        } else {
          this.node.x -= this.m_moveSpeed * e;
        }
      } else if (this.m_moveState == s.right) {
        if (this.node.x + this.m_moveSpeed * e >= this.m_ruleX) {
          this.m_moveState = s.stop;
        } else {
          this.node.x += this.m_moveSpeed * e;
        }
      }
    }
  };
  Object.defineProperty(_ctor.prototype, "tempItem", {
    get: function () {
      return this.m_tempItem;
    },
    set: function (e) {
      this.m_tempItem = e;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.clawItem = function () {
    if (this.m_tempItem && this.isZhuajing) {
      this.m_tempItem.node.y = this.claw.y + this.node.y - this.m_tempItem.node.height / 2 - 70;
      this.m_tempItem.node.x = this.node.x;
    }
  };
  _ctor.prototype.playComplete = function () {
    this.isZhuajing && this.control(s.left);
  };
  _ctor.prototype.onDisable = function () {
    this.m_isStart = false;
    this.m_moveState = s.stop;
  };
  _ctor.ZHUAQU = "ZHUAQU";
  _ctor.SHOUZHUA = "SHOUZHUA";
  _ctor.CLAW_END = "CLAW_END";
  __decorate([_property(cc.Node)], _ctor.prototype, "rope", undefined);
  __decorate([_property(cc.Node)], _ctor.prototype, "claw", undefined);
  return _ref__ctor = __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_HomeClaw;
(function (e) {
  e[e.stop = 0] = "stop";
  e[e.up = 1] = "up";
  e[e.down = 2] = "down";
  e[e.left = 3] = "left";
  e[e.right = 4] = "right";
})(s = exports.ClawMoveState || (exports.ClawMoveState = {}));