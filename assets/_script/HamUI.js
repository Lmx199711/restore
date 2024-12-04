var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HamState = exports.StoveState = undefined;
var s;
var r;
var r_UIDef = require("UIDef");
var r_HamSystem = require("HamSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_BaseWin = require("BaseWin");
var def_HamUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Ham, r_UIDef.UIDef.Res.UI.HamUI) || this;
    t.showAnimFlag = false;
    t.uiType = "fullScreen";
    t.props = [];
    t.stoves = [];
    t.ham = null;
    t.curIndex = null;
    t.m_isTouchStove = true;
    t.isOiling = false;
    t.isDiscard = true;
    t.isClcickRole = true;
    return t;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return false;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.HamUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.HamUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    for (var t = 0; t < 8; t++) {
      var o = this.contentPane.getChild("store" + t);
      this.stoves.push(o);
      o.uid = t;
      o.restart();
      o.onClick(this.onClickStove.bind(this, t));
    }
    for (t = 0; t < 4; t++) {
      o = this.contentPane.getChild("prop" + t);
      this.props.push(o);
      o.onClick(this.onClickCondiment.bind(this, t), this);
    }
    this.roleAnim0.onClick(this.onClickRole.bind(this, 0), this);
    this.roleAnim1.onClick(this.onClickRole.bind(this, 1), this);
    this.hamShowPos = cc.v2(this.hamShow.x, this.hamShow.y);
    this.bindBtnCallback(this.imgOil, this.panzi, this.btnOk);
    this.roleAnim0.init();
    this.roleAnim1.init();
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ref__ctor.Inst = this;
    r_SoundMgr.SoundMgr.playMusic("ham/香肠bgm");
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ref__ctor.Inst = null;
    r_SoundMgr.SoundMgr.playMusic("bgm");
    r_TimeSystem.TimeSystem.scheduleClear("gamestartHam");
    r_TimeSystem.TimeSystem.scheduleClear("onClickimgOil");
    this.stoves.forEach(function (e) {
      var t = e.hamCom;
      cc.Tween.stopAllByTarget(t);
      t.x = t.y = 0;
      t.alpha = 1;
      cc.Tween.stopAllByTarget(t);
      t.rotation = 0;
      e.state = s.空盘;
    });
    this.gameOver();
  };
  _ctor.prototype.restart = function () {
    this.stoves.forEach(function (e) {
      var t = e.hamCom;
      cc.Tween.stopAllByTarget(t);
      t.x = t.y = 0;
      t.alpha = 1;
      cc.Tween.stopAllByTarget(t);
      t.rotation = 0;
      e.state = s.空盘;
    });
    this.contentPane.getTransition("init").play();
    this.stoves.forEach(function (e) {
      return e.restart();
    });
    this.m_isTouchStove = true;
    this.isClcickRole = true;
    this.isOiling = false;
    this.contentPane.getController("c1").selectedIndex = 0;
    this.isDiscard = true;
    this.labNum.text = "0/6";
  };
  _ctor.prototype.showNum = function (e) {
    this.labNum.text = e;
  };
  _ctor.prototype.gameStart = function () {
    var e = this;
    r_TimeSystem.TimeSystem.scheduleOnce("gamestartHam", 3, function () {
      r_HamSystem.HamSystem.init([e.roleAnim0, e.roleAnim1]);
    });
  };
  _ctor.prototype.onClickbtnOk = function () {
    this.contentPane.getController("c1").selectedIndex = 1;
    this.gameStart();
  };
  _ctor.prototype.onClickStove = function (e) {
    switch (this.getStoveState(e)) {
      case s.烧烤:
        this.checkHamState(e);
    }
  };
  _ctor.prototype.onClickimgOil = function () {
    var e = this;
    if (!this.checkHams() && !this.isOiling) {
      this.isOiling = true;
      for (var t = 0; t < this.stoves.length; t++) {
        var o = this.stoves[t];
        if (o.state == s.空盘) {
          o.pourOil();
          break;
        }
      }
      r_TimeSystem.TimeSystem.scheduleOnce("onClickimgOil", .2, function () {
        e.isOiling = false;
      });
    }
  };
  _ctor.prototype.getStoveState = function (e) {
    return this.stoves[e].state;
  };
  _ctor.prototype.getHamState = function (e) {
    return this.stoves[e].hamCom.state;
  };
  _ctor.prototype.onClickpanzi = function () {
    if (!this.checkHams()) {
      for (var e = 0; e < this.stoves.length; e++) {
        if (this.stoves[e].state == s.涂油) {
          this.pushHam(e);
          break;
        }
      }
    }
  };
  _ctor.prototype.pushHam = function (e) {
    var t = this;
    if (this.m_isTouchStove) {
      this.m_isTouchStove = false;
      this.imgMove.visible = true;
      this.imgMove.x = this.panzi.x;
      this.imgMove.y = this.panzi.y;
      cc.Tween.stopAllByTarget(this.imgMove);
      this.imgMove.rotation = -30;
      this.imgMove.scaleX = this.imgMove.scaleY = .8;
      cc.tween(this.imgMove).repeatForever(cc.tween().by(.2, {
        rotation: 360
      })).start();
      cc.tween(this.imgMove).to(.5, {
        x: this.stoves[e].x,
        y: this.stoves[e].y,
        scaleX: 1,
        scaleY: 1
      }).call(function () {
        cc.Tween.stopAllByTarget(t.imgMove);
        t.imgMove.visible = false;
        t.m_isTouchStove = true;
        t.stoves[e].state = s.烧烤;
      }).start();
    }
  };
  _ctor.prototype.checkHamState = function (e) {
    switch (this.getHamState(e)) {
      case r.生:
        return void r_UtilsSystem.UtilsSystem.showTip("还没熟呢");
      case r.熟:
        this.moveHam(e);
        break;
      case r.焦:
        this.discard(e);
    }
  };
  _ctor.prototype.discard = function (e) {
    var t = this;
    if (0 != this.isDiscard) {
      this.isDiscard = false;
      var o = this.stoves[e].hamCom;
      if ((o.state == r.焦 || this.stoves[e].state == s.空盘) && !this.checkHams()) {
        var i = o.x;
        var n = o.y;
        cc.tween(o).repeatForever(cc.tween().by(.2, {
          rotation: 360
        })).start();
        cc.tween(o).to(.5, {
          x: i + 300,
          y: n + 300,
          alpha: 0
        }).call(function () {
          o.x = o.y = 0;
          o.alpha = 1;
          cc.Tween.stopAllByTarget(o);
          t.stoves[e].state = s.空盘;
          o.rotation = 0;
          t.isDiscard = true;
        }).start();
      }
    }
  };
  _ctor.prototype.moveHam = function (e) {
    var t = this;
    if (!this.checkHams() && this.m_isTouchStove) {
      this.m_isTouchStove = false;
      this.curIndex = e;
      var o = this.stoves[e].hamCom;
      cc.Tween.stopAllByTarget(o);
      var i = cc.v2();
      this.contentPane.localToGlobal(this.hamShow.x, this.hamShow.y, i);
      this.stoves[e].hamCom.globalToLocal(i.x, i.y, i);
      cc.tween(o).to(.3, {
        x: i.x,
        y: i.y
      }).call(function () {
        t.hamShow.visible = true;
        o.state = r.放入佐料;
        t.stoves[e].state = s.空盘;
        o.x = o.y = 0;
        t.setShowHam();
      }).start();
    }
  };
  _ctor.prototype.checkHams = function () {
    return -1 != this.stoves.findIndex(function (e) {
      return e.hamCom.state == r.放入佐料;
    });
  };
  _ctor.prototype.setShowHam = function () {
    this.hamShow.init();
    this.hamShow.state = r.放入佐料;
  };
  _ctor.prototype.onClickCondiment = function (e) {
    if (this.checkHasCondiment()) {
      this.props.forEach(function (e) {
        return e.visible = true;
      });
      this.addCondiment(e);
    }
  };
  _ctor.prototype.addCondiment = function (e) {
    this.hamShow.addCondiment(e);
  };
  _ctor.prototype.checkHasCondiment = function () {
    return null != this.curIndex && this.stoves[this.curIndex].hamCom.state == r.放入佐料;
  };
  _ctor.prototype.onClickRole = function (e) {
    var t = this;
    if (this.checkHams()) {
      if (!this.isClcickRole) {
        return;
      }
      this.props.forEach(function (e) {
        return e.visible = true;
      });
      this.isClcickRole = false;
      var o = this["roleAnim" + e];
      cc.Tween.stopAllByTarget(this.hamShow);
      cc.tween(this.hamShow).to(.5, {
        x: o.x,
        y: o.y
      }).call(function () {
        t.hamShow.visible = false;
        t.hamShow.x = t.hamShowPos.x;
        t.hamShow.y = t.hamShowPos.y;
        o.checkLike(t.hamShow.myPropList);
        t.hamShow.init();
        t.stoves[t.curIndex].restart();
        t.curIndex = null;
        t.m_isTouchStove = true;
        t.isClcickRole = true;
      }).start();
    }
  };
  _ctor.prototype.gameOver = function () {
    r_HamSystem.HamSystem.isGame = false;
    this.roleAnim0.isShow && this.roleAnim0.hideView();
    this.roleAnim1.isShow && this.roleAnim1.hideView();
    this.hamShow.visible = false;
    this.hamShow.init();
  };
  __decorate([r_DecorateFunction1.AutoFind("animOil")], _ctor.prototype, "animOil", undefined);
  __decorate([r_DecorateFunction1.AutoFind("imgMove")], _ctor.prototype, "imgMove", undefined);
  __decorate([r_DecorateFunction1.AutoFind("panzi")], _ctor.prototype, "panzi", undefined);
  __decorate([r_DecorateFunction1.AutoFind("prop0")], _ctor.prototype, "prop0", undefined);
  __decorate([r_DecorateFunction1.AutoFind("prop1")], _ctor.prototype, "prop1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("prop2")], _ctor.prototype, "prop2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("prop3")], _ctor.prototype, "prop3", undefined);
  __decorate([r_DecorateFunction1.AutoFind("imgOil")], _ctor.prototype, "imgOil", undefined);
  __decorate([r_DecorateFunction1.AutoFind("hamShow")], _ctor.prototype, "hamShow", undefined);
  __decorate([r_DecorateFunction1.AutoFind("roleAnim0")], _ctor.prototype, "roleAnim0", undefined);
  __decorate([r_DecorateFunction1.AutoFind("roleAnim1")], _ctor.prototype, "roleAnim1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnOk")], _ctor.prototype, "btnOk", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labNum")], _ctor.prototype, "labNum", undefined);
  return _ref__ctor = __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.default = def_HamUI;
(function (e) {
  e[e["空盘"] = 0] = "空盘";
  e[e["涂油"] = 1] = "涂油";
  e[e["烧烤"] = 2] = "烧烤";
})(s = exports.StoveState || (exports.StoveState = {}));
(function (e) {
  e[e["生"] = 0] = "生";
  e[e["熟"] = 1] = "熟";
  e[e["焦"] = 2] = "焦";
  e[e["放入佐料"] = 3] = "放入佐料";
})(r = exports.HamState || (exports.HamState = {}));