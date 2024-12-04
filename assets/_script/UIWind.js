var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UIWind = exports.LoadFGUIPack = undefined;
var a = fgui.UIPackage;
var r_LoadFGUIPackTask = require("LoadFGUIPackTask");
var r_UIDef = require("UIDef");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_FguiResSystem = require("FguiResSystem");
var exp_LoadFGUIPack = function () {
  function _ctor(e, t) {
    undefined === t && (t = null);
    this.fileName = e;
    this.loadFGuiTask = new r_LoadFGUIPackTask.LoadFGUIPackTask(e, t);
    console.log("添加要加载的fgui：", e);
  }
  _ctor.prototype.load = function (e, t) {
    var o = this;
    this.loadFGuiTask.setComplete(function () {
      o.loaded = true;
      console.log("加载完成----------------", o.fileName);
      if (null != e) {
        if (null != t) {
          e.call(t);
        } else {
          e();
        }
      }
    }, this).execute();
  };
  return _ctor;
}();
exports.LoadFGUIPack = exp_LoadFGUIPack;
var exp_UIWind = function (e) {
  function _ctor(t, o, i) {
    undefined === i && (i = "fgui");
    var n = e.call(this) || this;
    n.bundle = "fgui";
    n.mCloseBtnName = "BtnClose";
    n.uiType = "notFullScreen";
    n.showAnimFlag = false;
    n.hideAnimFlag = false;
    var a = t.lastIndexOf("/");
    n.packName = -1 != a ? t.substr(a + 1, t.length - (a + 1)) : t;
    n.resName = o;
    n.url = "ui://" + n.packName + "/" + o;
    n.bundle = i;
    n.addUISource(new exp_LoadFGUIPack(t, n.bundle));
    return n;
  }
  __extends(_ctor, e);
  _ctor.changeMainUI = function (e) {
    this.curMainUI = e;
  };
  _ctor.add = function (e) {
    if (null != e) {
      var t = new e();
      this.mWinds.set(t.url, t);
      this.windMap[t.url] = e;
    }
  };
  _ctor.get = function (e) {
    if (this.mWinds.has(e)) {
      return this.mWinds.get(e);
    } else {
      return null;
    }
  };
  _ctor.remove = function (e) {
    if (this.mWinds.has(e)) {
      var t = this.mWinds.get(e);
      this.mWinds.delete(t.url);
      t.dispose();
      t.onRelease();
    }
  };
  _ctor.prototype.onRelease = function () {};
  _ctor.prototype.hide = function () {
    var o = this;
    if (this.hideAnimFlag) {
      this.node.scale = 1;
      cc.tween(this.node).to(.1, {
        scale: .5
      }, {
        easing: null
      }).call(function () {
        _ctor.onHideWind(o);
        e.prototype.hide.call(o);
        o.node.scale = 1;
        _ctor.enterMainUI();
      }).start();
    } else {
      _ctor.onHideWind(this);
      e.prototype.hide.call(this);
      _ctor.enterMainUI();
    }
  };
  _ctor.show = function (e, t, o) {
    console.log("显示url", e);
    this.mWinds.has(e) || this.add(this.windMap[e]);
    if (this.mWinds.has(e)) {
      var i = this.mWinds.get(e);
      i.data = t;
      i.callback = o;
      if (!i.isShowing) {
        i.show();
        this.onShow(i);
      }
    } else {
      cc.error("显示窗口失败没有注册窗口 url:" + e);
    }
  };
  _ctor.onShow = function (e) {
    for (var o = this.curWindList.length - 1; o >= 0; o--) {
      if (this.curWindList[o] == e) {
        return;
      }
    }
    if ("fullScreen" == e.uiType) {
      for (o = this.curWindList.length - 1; o >= 0; o--) {
        this.curWindList[o].hideImmediately();
      }
    }
    this.curWindList.push(e);
    -1 != this.curWindList.findIndex(function (e) {
      return e.resName == r_UIDef.UIDef.Res.UI.MainHomeUI;
    }) && e.resName != r_UIDef.UIDef.Res.UI.MainHomeUI && _ctor.popSystem.hideGameClubButton();
    r_FguiResSystem.FguiResSystem.show(this, e.url);
  };
  _ctor.removeFromShowList = function (e) {
    for (var t = this.curWindList.length - 1; t >= 0; t--) {
      e == this.curWindList[t] && this.curWindList.splice(t, 1);
    }
  };
  _ctor.checkShowTop = function () {
    if (this.curWindList.length > 0) {
      var e = this.curWindList[this.curWindList.length - 1];
      var o = [];
      "fullScreen" != e.uiType && this.mWinds.forEach(function (e) {
        if (!(e.isShowing || e.resName != _ctor.curMainUI)) {
          e.show();
          o.push(e);
        }
      });
      if (!e.isShowing) {
        e.show();
        if ("fullScreen" != e.uiType) {
          o.push(e);
          this.curWindList = o;
        }
      }
    }
  };
  _ctor.enterMainUI = function () {
    var e = this;
    setTimeout(function () {
      if (1 == e.curWindList.length) {
        if (e.curWindList.findIndex(function (e) {
          return e.resName == r_UIDef.UIDef.Res.UI.MainUI;
        }) > -1) {
          _ctor.popSystem.enterMainUI();
        } else if (e.curWindList.findIndex(function (e) {
          return e.resName == r_UIDef.UIDef.Res.UI.MainHomeUI;
        }) > -1) {
          _ctor.popSystem.checkNewGuideMsg();
          _ctor.popSystem.showGameClubButton();
        }
      }
    }, 2);
  };
  _ctor.onHideWind = function (e) {
    this.removeFromShowList(e);
    "fullScreen" == e.uiType && this.checkShowTop();
    r_FguiResSystem.FguiResSystem.hide(this, e.url);
  };
  _ctor.hide = function (e, t) {
    if (this.mWinds.has(e)) {
      var o = this.mWinds.get(e);
      if (o.isShowing) {
        o.hideAnimFlag;
        o.data = t;
        this.onHideWind(o);
        o.hide();
      }
    } else {
      cc.error("隐藏窗口失败没有注册窗口 url:" + e);
    }
  };
  _ctor.hideAll = function (e) {
    var t = this;
    undefined === e && (e = null);
    this.mWinds.forEach(function (o) {
      if (!(!o.isShowing || null != e && -1 != e.findIndex(function (e) {
        return e == o.url;
      }))) {
        o.hide();
        t.removeFromShowList(o);
      }
    });
  };
  _ctor.hideAllNotMain = function () {
    var e = this;
    this.mWinds.forEach(function (o) {
      if (o.isShowing && o.resName != _ctor.curMainUI) {
        o.hideImmediately();
        e.removeFromShowList(o);
      }
    });
    for (var o = this.curWindList.length - 1; o >= 0; o--) {
      this.curWindList[o].resName != _ctor.curMainUI && this.curWindList.splice(o, 1);
    }
    this.checkShowTop();
  };
  _ctor.delAll = function (e) {
    undefined === e && (e = null);
    var t = new Array();
    this.mWinds.forEach(function (o) {
      null != e && -1 != e.findIndex(function (e) {
        return e == o.url;
      }) || t.push(o.url);
    });
    for (var o = 0; o < t.length; o++) {
      this.remove(this.mWinds.get(t[o]));
    }
  };
  _ctor.del = function (e) {
    this.mWinds.has(e) && this.remove(this.mWinds.get(e));
  };
  _ctor.getShowNum = function () {
    var e = 0;
    this.mWinds.forEach(function (t) {
      t.isShowing && (e += 1);
    });
    return e;
  };
  _ctor.prototype.onInit = function () {
    var e = a.createObjectFromURL(this.url);
    if (null != e) {
      this.contentPane = e.asCom;
      this.width = fairygui.GRoot.inst.width;
      this.height = fairygui.GRoot.inst.height;
      this.centerOn(fgui.GRoot.inst, true);
      if (null != this.mCloseBtnName && 0 != this.mCloseBtnName.length) {
        var t = this.contentPane.getChild(this.mCloseBtnName);
        t && (t.asCom || t.asButton) && (this.closeButton = t);
      }
      if (this.needFindCom) {
        for (var o in this.needFindCom) this[o] = r_DecorateFunction1.finFguiComponent(this.contentPane, this.needFindCom[o]);
      }
    } else {
      cc.error("创建窗口失败 url" + this.url);
    }
  };
  _ctor.prototype.doShowAnimation = function () {
    var t = this;
    if (!this.showAnimFlag) {
      e.prototype.doShowAnimation.call(this);
      return void (this.callback && (this.callback(), this.callback = null));
    }
    this.node.anchorX = .5;
    this.node.anchorY = .5;
    this.node.scale = .5;
    if (this.contentPane && this.contentPane.getChild("black")) {
      var o = this.contentPane.getChild("black");
      o.node.anchorX = .5;
      o.node.anchorY = .5;
      o.node.scale = 3;
    }
    e.prototype.doShowAnimation.call(this);
    cc.tween(this.node).to(.2, {
      scale: 1.2
    }, {
      easing: null
    }).to(.05, {
      scale: 1
    }, {
      easing: null
    }).call(function () {
      if (t.callback) {
        t.callback();
        t.callback = null;
      }
    }).start();
  };
  _ctor.popSystem = null;
  _ctor.mWinds = new Map();
  _ctor.curWindList = [];
  _ctor.curMainUI = r_UIDef.UIDef.Res.UI.MainHomeUI;
  _ctor.windMap = {};
  return _ctor;
}(fairygui.Window);
exports.UIWind = exp_UIWind;