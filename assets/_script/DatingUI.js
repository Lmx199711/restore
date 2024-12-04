var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_ResSystem = require("ResSystem");
var r_SecretUpSystem = require("SecretUpSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_BaseStepUI = require("BaseStepUI");
var r_DatingResultUI = require("DatingResultUI");
var def_DatingUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Dating, r_UIDef.UIDef.Res.UI.DatingUI) || this;
    t.uiType = "fullScreen";
    return t;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  _ctor.prototype.initProp = function () {
    this.selectPanel.restart();
    this.pro.value = 0;
  };
  _ctor.prototype.onExecute = function (e) {
    this.bubble1.alpha = 0;
    var t = this.flowCfg[e.currId];
    t.bubbleText[e.currStep] && 0 == e.execIndex && this.setBubble(t.bubbleText[e.currStep]);
  };
  _ctor.prototype.setBubble = function (e) {
    this.bubble1.text = e;
    cc.Tween.stopAllByTarget(this.bubble1);
    r_SoundMgr.SoundMgr.playSound("dating/" + e);
    cc.tween(this.bubble1).to(.5, {
      alpha: 1
    }).delay(2).to(.5, {
      alpha: 0
    }).start();
  };
  _ctor.prototype.addPro = function () {
    this.pro.tweenValue(this.pro.value + 100 / 3, 1);
  };
  _ctor.prototype.subPro = function () {
    this.pro.tweenValue(this.pro.value - 100 / 3, 1);
  };
  _ctor.prototype.reusltLogic = function () {
    var e = {
      secretId: this.data.secretId
    };
    e.index = this.pro.value >= 100 ? 0 : 1;
    r_DatingResultUI.default.showUI(e);
  };
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.DatingUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.DatingUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
  };
  _ctor.prototype.onShown = function () {
    this.flowCfg = f;
    _ref__ctor.Inst = this;
    e.prototype.onShown.call(this);
  };
  _ctor.prototype.onHide = function () {
    _ref__ctor.Inst = null;
    cc.Tween.stopAllByTarget(this.bubble1);
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.restart = function () {
    var t = this;
    e.prototype.restart.call(this);
    var o = this.data.secretId;
    this.animSecret.node.destroyAllChildren();
    r_ResSystem.ResSystem.loadBundleRes("game1", "secret/anim/nv_" + o, cc.Prefab, function (e, i) {
      if (!e) {
        var n = cc.instantiate(i);
        t.animSecret.node.addChild(n);
        var a = r_SecretUpSystem.SecretUpSystem.getSkinId(o);
        n.getComponent(sp.Skeleton).setAnimation(0, "idel" + a, true);
      }
    });
  };
  _ctor.prototype.playMovie = function (e) {
    r_UtilsSystem.UtilsSystem.playAnim(this.movie, "dianying", false);
    e && e();
  };
  _ctor.Inst = null;
  __decorate([r_DecorateFunction1.AutoFind("selectPanel")], _ctor.prototype, "selectPanel", undefined);
  __decorate([r_DecorateFunction1.AutoFind("animSecret")], _ctor.prototype, "animSecret", undefined);
  __decorate([r_DecorateFunction1.AutoFind("bubble1")], _ctor.prototype, "bubble1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("pro")], _ctor.prototype, "pro", undefined);
  __decorate([r_DecorateFunction1.AutoFind("movie")], _ctor.prototype, "movie", undefined);
  return _ref__ctor = __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseStepUI.default);
exports.default = def_DatingUI;
var f = {
  0: {
    name: "选择场景1",
    selectIndex: 0,
    steps: [{
      modeIndex: 0,
      exec: [{
        type: "stop",
        name: null
      }]
    }],
    bubbleNodes: ["bubble1"],
    bubbleText: ["今天我们去哪玩呀？"]
  },
  1: {
    name: "网吧",
    selectIndex: 1,
    steps: [{
      modeIndex: 1,
      exec: [{
        type: "anim",
        name: "wait_3"
      }, {
        type: "next",
        name: ""
      }]
    }, {
      modeIndex: 4,
      exec: [{
        type: "stop",
        name: null
      }]
    }],
    bubbleNodes: ["bubble1"],
    bubbleText: ["发危达轰", "有点饿了，我们去吃点东西吧"]
  },
  2: {
    name: "电影院",
    selectIndex: 2,
    steps: [{
      modeIndex: 2,
      exec: [{
        type: "fun",
        name: "playMovie"
      }, {
        type: "anim",
        name: "wait_3"
      }, {
        type: "next",
        name: ""
      }]
    }, {
      modeIndex: 4,
      exec: [{
        type: "stop",
        name: null
      }]
    }],
    bubbleNodes: ["bubble1"],
    bubbleText: ["啊，我好怕怕呀", "有点饿了，我们去吃点东西吧"]
  },
  3: {
    name: "动物园",
    selectIndex: 3,
    steps: [{
      modeIndex: 3,
      exec: [{
        type: "anim",
        name: "wait_3"
      }, {
        type: "next",
        name: ""
      }]
    }, {
      modeIndex: 4,
      exec: [{
        type: "stop",
        name: null
      }]
    }],
    bubbleNodes: ["bubble1"],
    bubbleText: ["好可爱的小动物呀", "有点饿了，我们去吃点东西吧"]
  },
  4: {
    name: "KFC",
    selectIndex: 5,
    steps: [{
      modeIndex: 5,
      exec: [{
        type: "anim",
        name: "wait_3"
      }, {
        type: "next",
        name: ""
      }]
    }, {
      modeIndex: 8,
      exec: [{
        type: "stop",
        name: null
      }]
    }],
    bubbleNodes: ["bubble1"],
    bubbleText: ["排三个小时应该就能吃到了", "天黑了，我们该去干点什么"]
  },
  5: {
    name: "西餐厅",
    selectIndex: 6,
    steps: [{
      modeIndex: 6,
      exec: [{
        type: "anim",
        name: "wait_3"
      }, {
        type: "next",
        name: ""
      }]
    }, {
      modeIndex: 8,
      exec: [{
        type: "stop",
        name: null
      }]
    }],
    bubbleNodes: ["bubble1"],
    bubbleText: ["哇,你好浪漫呀", "天黑了，我们该去干点什么"]
  },
  6: {
    name: "街边小吃",
    selectIndex: 7,
    steps: [{
      modeIndex: 7,
      exec: [{
        type: "anim",
        name: "wait_3"
      }, {
        type: "next",
        name: ""
      }]
    }, {
      modeIndex: 8,
      exec: [{
        type: "stop",
        name: null
      }]
    }],
    bubbleNodes: ["bubble1"],
    bubbleText: ["不干不净，吃了没病", "天黑了，我们该去干点什么"]
  },
  7: {
    name: "回家",
    selectIndex: 9,
    steps: [{
      modeIndex: 9,
      exec: [{
        type: "anim",
        name: "3_1"
      }, {
        type: "next",
        name: ""
      }]
    }],
    bubbleNodes: ["bubble1"],
    bubbleText: ["你这笨直男,拜拜"]
  },
  8: {
    name: "酒店",
    selectIndex: 10,
    steps: [{
      modeIndex: 10,
      exec: [{
        type: "anim",
        name: "wait_3"
      }, {
        type: "next",
        name: ""
      }]
    }],
    bubbleNodes: ["bubble1"],
    bubbleText: ["不是说好只抱一下的吗"]
  },
  9: {
    name: "酒吧",
    selectIndex: 11,
    steps: [{
      modeIndex: 11,
      exec: [{
        type: "anim",
        name: "wait_3"
      }, {
        type: "next",
        name: ""
      }]
    }],
    bubbleNodes: ["bubble"],
    bubbleText: ["艾瑞巴蒂嗨起来！"]
  }
};