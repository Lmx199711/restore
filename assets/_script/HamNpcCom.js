var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HamNpcCom = undefined;
var r_HamSystem = require("HamSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_SoundMgr = require("SoundMgr");
var exp_HamNpcCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.propList = [];
    t.propNum = 1;
    t.isShow = false;
    t.isStart = false;
    t.lifeTime = 0;
    t.props = [0, 1, 2, 3];
    t.happyNum = 0;
    t.maxCount = 0;
    t.startVect = cc.v2();
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onConstruct = function () {
    this.roleAnim = this.getChild("roleAnim");
    this.labNum = this.getChild("labNum");
    this.item0 = this.getChild("item0");
    this.item1 = this.getChild("item1");
    this.labTime = this.getChild("labTime");
  };
  _ctor.prototype.init = function () {
    this.startVect = cc.v2(this.x, this.y);
  };
  _ctor.prototype.onUpdateTime = function () {
    if (this.isShow && this.isStart) {
      this.lifeTime--;
      if (this.lifeTime < 0) {
        this.isStart = false;
        this.count = 1;
        return void this.bad();
      }
      this.setLabTime();
    }
  };
  _ctor.prototype.setLabTime = function () {
    var e = this.lifeTime > 15 ? "#66ff00" : "#ff0000";
    this.labTime.text = "剩余时间：[color=" + e + "]" + this.lifeTime + "[/color]s";
  };
  _ctor.prototype.create = function (e) {
    this.move(true);
    this.visible = true;
    this.lifeTime = r_UtilsSystem.UtilsSystem.getRandomNum(30, 60);
    this.uid = e;
    this.propList = [];
    this.propNum = r_UtilsSystem.UtilsSystem.getRandomNum(1, 2);
    var t = this.props.concat();
    var o = function () {
      var e = t[r_UtilsSystem.UtilsSystem.getRandomNum(0, t.length - 1)];
      i.propList.push(e);
      t = t.filter(function (t) {
        return t != e;
      });
    };
    var i = this;
    for (var n = 0; n < this.propNum; n++) {
      o();
    }
    this.maxCount = r_UtilsSystem.UtilsSystem.getRandomNum(2, 5);
    this.count = this.maxCount;
    this.happyNum = 0;
    this.roleAnim.url = "ui://Ham/hamJuese_" + this.uid;
    r_SoundMgr.SoundMgr.playSound("ham/role_" + this.uid);
    this.idle();
    this.showBubble();
  };
  _ctor.prototype.move = function (e) {
    var t = this;
    this.isShow = e;
    this.y = e ? this.startVect.y + 800 : this.startVect.y;
    e && (this.labTime.text = "剩余时间：未知");
    cc.Tween.stopAllByTarget(this);
    var o = e ? this.startVect.y : this.startVect.y + 800;
    cc.tween(this).to(1, {
      y: o
    }).call(function () {
      t.isStart = e;
      e || (t.visible = false);
    }).start();
  };
  _ctor.prototype.showBubble = function () {
    var e = this;
    this.getController("c1").selectedIndex = this.propList.length - 1;
    var t = 0;
    this.propList.forEach(function (o) {
      e["item" + t].url = "ui://Ham/prop" + o;
      t++;
    });
    this.labNum.text = "x" + this.count;
  };
  _ctor.prototype.checkLike = function (e) {
    var t = true;
    this.propList.length != e.length && (t = false);
    this.propList.forEach(function (o) {
      e.includes(o) || (t = false);
    });
    if (t) {
      this.happy();
    } else {
      this.bad();
    }
  };
  _ctor.prototype.idle = function () {
    r_UtilsSystem.UtilsSystem.playAnim(this.roleAnim, "step_1", true);
  };
  _ctor.prototype.happy = function () {
    var e = this;
    if (2 == this.uid || 4 == this.uid) {
      r_SoundMgr.SoundMgr.playSound("ham/女收到香肠");
    } else {
      r_SoundMgr.SoundMgr.playSound("ham/男收到香肠");
    }
    r_UtilsSystem.UtilsSystem.playAnim(this.roleAnim, "step_2", true);
    this.happyNum++;
    this.count--;
    this.showBubble();
    r_TimeSystem.TimeSystem.scheduleClear("happy");
    r_TimeSystem.TimeSystem.scheduleOnce("happy", 2, function () {
      if (e.count <= 0) {
        e.removeSelf();
      } else {
        e.idle();
      }
    });
  };
  _ctor.prototype.bad = function () {
    var e = this;
    if (2 == this.uid || 4 == this.uid) {
      r_SoundMgr.SoundMgr.playSound("ham/女的超时和错误");
    } else {
      r_SoundMgr.SoundMgr.playSound("ham/男的超时和错误");
    }
    r_UtilsSystem.UtilsSystem.playAnim(this.roleAnim, "step_3", true);
    this.count--;
    this.showBubble();
    r_TimeSystem.TimeSystem.scheduleClear("bad");
    r_TimeSystem.TimeSystem.scheduleOnce("bad", 2, function () {
      if (e.count <= 0) {
        e.removeSelf();
      } else {
        e.idle();
      }
    });
  };
  _ctor.prototype.removeSelf = function () {
    this.isShow = false;
    if (this.happyNum >= this.maxCount) {
      r_HamSystem.HamSystem.succNum = r_HamSystem.HamSystem.succNum + 1;
    } else {
      r_HamSystem.HamSystem.fialNum = r_HamSystem.HamSystem.fialNum + 1;
    }
    this.hideView();
  };
  _ctor.prototype.hideView = function () {
    this.move(false);
    r_TimeSystem.TimeSystem.scheduleClear("happy");
    r_TimeSystem.TimeSystem.scheduleClear("bad");
  };
  return _ctor;
}(fgui.GComponent);
exports.HamNpcCom = exp_HamNpcCom;