var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PotatoSelectCom = undefined;
var r_TimeSystem = require("TimeSystem");
var r_SoundMgr = require("SoundMgr");
var r_PotatoUI = require("PotatoUI");
var exp_PotatoSelectCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.selectBubble = {
      0: ["怎么到面北了", "三亚我来啦", "去东北玩雪啦"],
      1: ["68的锅包肉太贵了", "我就喜欢甜豆腐脑", "不摆盘的冻梨不好吃"],
      2: ["人造月亮也好漂亮", "我不是小孩！", "这是教科书上的老爷爷吗"],
      3: ["小狐狸味道好大", "好可爱的小咪咪", "好大的两只凤凰"]
    };
    t.selectSound = {
      0: ["怎么到面北了", "三亚我来啦", "去东北玩雪啦"],
      1: ["68的锅包肉太贵了", "我就喜欢甜豆腐脑", "不摆盘的冻梨不好吃"],
      2: ["人造月亮也好漂亮", "我不是小孩！", "这是教科书上的老爷爷吗"],
      3: ["小狐狸味道好大", "好可爱的小咪咪", "好大的两只凤凰"]
    };
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onConstruct = function () {
    var t = this;
    e.prototype.onConstruct.call(this);
    this.btn2 = this.getChild("btn2");
    this.btn1 = this.getChild("btn1");
    this.btn0 = this.getChild("btn0");
    this.bIcon = this.getChild("bIcon");
    this.btn0.onClick(this.onClickBtn.bind(this, 0), this);
    this.btn1.onClick(this.onClickBtn.bind(this, 1), this);
    this.btn2.onClick(this.onClickBtn.bind(this, 2), this);
    this.btn2.enabled = true;
    this.btn1.enabled = true;
    this.btn0.enabled = true;
    this.getController("c1").onChanged(function () {
      t.btn2.enabled = true;
      t.btn1.enabled = true;
      t.btn0.enabled = true;
    });
  };
  _ctor.prototype.restart = function () {
    this.btn2.enabled = true;
    this.btn1.enabled = true;
    this.btn0.enabled = true;
  };
  _ctor.prototype.onClickBtn = function (e) {
    var t = this;
    this.btn2.enabled = false;
    this.btn1.enabled = false;
    this.btn0.enabled = false;
    var o = this["btn" + e];
    this.bIcon.url = o.icon;
    this.bIcon.x = o.x;
    this.bIcon.y = o.y;
    this.bIcon.visible = true;
    cc.Tween.stopAllByTarget(this.bIcon);
    if (0 == this.getController("c1").selectedIndex) {
      r_TimeSystem.TimeSystem.scheduleOnce("Controller", 4, function () {
        r_SoundMgr.SoundMgr.playSound("potato/" + t.selectSound[t.getController("c1").selectedIndex][e]);
        r_PotatoUI.default.Inst && r_PotatoUI.default.Inst.setBubble("bubble_0", t.selectBubble[t.getController("c1").selectedIndex][e]);
      });
    } else {
      r_SoundMgr.SoundMgr.playSound("potato/" + this.selectSound[this.getController("c1").selectedIndex][e]);
      r_PotatoUI.default.Inst && r_PotatoUI.default.Inst.setBubble("bubble_0", this.selectBubble[this.getController("c1").selectedIndex][e]);
    }
    cc.tween(this.bIcon).to(.3, {
      x: 332,
      y: -418
    }).call(function () {
      t.bIcon.visible = false;
      if (0 == t.getController("c1").selectedIndex) {
        r_TimeSystem.TimeSystem.scheduleOnce("selectOk", 3, function () {
          r_PotatoUI.default.Inst && r_PotatoUI.default.Inst.setFlow(e + 1);
        });
      } else if (1 == t.getController("c1").selectedIndex) {
        switch (e) {
          case 0:
          case 2:
            r_PotatoUI.default.Inst && r_PotatoUI.default.Inst.subPro();
            r_PotatoUI.default.Inst && r_PotatoUI.default.Inst.setAnimRoleAnger(function () {
              r_TimeSystem.TimeSystem.scheduleOnce("selectNo", 3, function () {
                r_PotatoUI.default.Inst.execute(r_PotatoUI.default.Inst.getCurrExecuteData());
              });
            });
            break;
          case 1:
            r_PotatoUI.default.Inst && r_PotatoUI.default.Inst.addPro();
            r_PotatoUI.default.Inst && r_PotatoUI.default.Inst.setAnimRoleHappy(function () {
              r_TimeSystem.TimeSystem.scheduleOnce("selectOk", 3, function () {
                r_PotatoUI.default.Inst.execute(r_PotatoUI.default.Inst.getCurrExecuteData());
              });
            });
        }
      } else if (2 == t.getController("c1").selectedIndex) {
        r_PotatoUI.default.Inst && r_PotatoUI.default.Inst.set3_3btn(e);
      } else {
        3 == t.getController("c1").selectedIndex && r_PotatoUI.default.Inst && r_PotatoUI.default.Inst.set3_4btn(e);
      }
    }).start();
  };
  _ctor.prototype.onDisable = function () {
    cc.Tween.stopAllByTarget(this.bIcon);
    r_TimeSystem.TimeSystem.scheduleClear("selectOk");
    r_TimeSystem.TimeSystem.scheduleClear("selectNo");
    r_TimeSystem.TimeSystem.scheduleClear("Controller");
  };
  return _ctor;
}(fgui.GComponent);
exports.PotatoSelectCom = exp_PotatoSelectCom;