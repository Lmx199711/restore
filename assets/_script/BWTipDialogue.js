var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_BehaviorMgr = require("BehaviorMgr");
var r_ResSystem = require("ResSystem");
var r_SoundMgr = require("SoundMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var p = [{
  1: {
    isMy: true,
    content: "咱们什么时候上班来着？",
    soundName: "咱们什么时候上班来着？"
  },
  2: {
    isMy: false,
    content: "你初十才上班，你忘啦？",
    soundName: "你初十才上班，你忘啦？"
  },
  3: {
    isMy: true,
    content: "好，我知道了~",
    soundName: "好，我知道了"
  }
}, {
  1: {
    isMy: true,
    content: "咱们公司是哪栋来着？",
    soundName: "咱们公司在哪栋来着？"
  },
  2: {
    isMy: false,
    content: "米小游、米小游...",
    soundName: "米小游米小游"
  },
  3: {
    isMy: true,
    content: "好好好，我知道了~",
    soundName: "好好好，我知道了"
  }
}, {
  1: {
    isMy: true,
    content: "咱们公司在几楼来着？",
    soundName: "咱们公司在几楼来着？"
  },
  2: {
    isMy: false,
    content: "你放假放傻了？3楼",
    soundName: "你放假放傻啦"
  }
}, {
  1: {
    isMy: true,
    content: "我是干啥的来着？",
    soundName: "你还记得我是干啥的来着？"
  },
  2: {
    isMy: false,
    content: "真服了，你是狗策划",
    soundName: "真服了你个狗策划"
  },
  3: {
    isMy: true,
    content: "你才狗，挂了~",
    soundName: "你才狗策划"
  }
}, {
  1: {
    isMy: true,
    content: "我电脑密码是多少？",
    soundName: "你记得我电脑密码吗？"
  },
  2: {
    isMy: false,
    content: "你的密码我怎么知道",
    soundName: "你的密码我怎么知道"
  },
  3: {
    isMy: true,
    content: "那怎么办~",
    soundName: "那怎么办"
  },
  4: {
    isMy: false,
    content: "不要密码试一下",
    soundName: "不要密码试一下"
  }
}];
var def_BWTipDialogue = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.blockNode = null;
    t.RoleNode = null;
    t.roleQipao = null;
    t.phoneQipao = null;
    t.curIndex = 1;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {};
  _ctor.prototype.start = function () {};
  _ctor.prototype.startDialogue = function (e) {
    r_BehaviorMgr.BehaviorMgr.trigger("隐藏主角");
    this.blockNode.active = true;
    this.RoleNode.getComponent(sp.Skeleton).setAnimation(0, "step_1", true);
    cc.Tween.stopAllByTarget(this.blockNode);
    this.node.opacity = 255;
    this.curData = p[e - 1];
    this.curIndex = 1;
    this.showRoleAnim();
    this.showQiPao();
  };
  _ctor.prototype.showRoleAnim = function () {
    var e = this.RoleNode.getComponent(sp.Skeleton);
    var t = e.setAnimation(0, "step_1_7", false);
    e.paused = false;
    e.timeScale = 1;
    e.setTrackCompleteListener(t, function () {
      e.setAnimation(0, "step_7", true);
    });
  };
  _ctor.prototype.showQiPao = function () {
    var e = this;
    var t = this.roleQipao;
    this.curData[this.curIndex].isMy || (t = this.phoneQipao);
    r_SoundMgr.SoundMgr.stopAllSound();
    this.playSound("bkWork/" + this.curData[this.curIndex].soundName, function () {
      if (e.curIndex >= Object.keys(e.curData).length) {
        var o = e.RoleNode.getComponent(sp.Skeleton);
        var i = o.setAnimation(0, "step_5", false);
        o.setTrackCompleteListener(i, function () {
          e.node.opacity = 0;
          e.phoneQipao.opacity = 0;
          e.roleQipao.opacity = 0;
          e.blockNode.active = false;
          r_BehaviorMgr.BehaviorMgr.trigger("显示主角");
        });
      } else {
        cc.tween(t).to(.1, {
          opacity: 0
        }).delay(.1).call(function () {
          e.curIndex += 1;
          e.showQiPao();
        }).start();
      }
    });
    t.getChildByName("label").getComponent(cc.Label).string = this.curData[this.curIndex].content;
    cc.Tween.stopAllByTarget(t);
    cc.tween(t).to(.1, {
      opacity: 255
    }).start();
  };
  _ctor.prototype.playSound = function (e, t) {
    var o = 0;
    r_ResSystem.ResSystem.loadBundleRes("resources1", "sound/" + e, cc.AudioClip, function (e, i) {
      e && console.warn("音频加载失败:", e);
      o = cc.audioEngine.playEffect(i, false);
      t && cc.audioEngine.setFinishCallback(o, t);
    });
  };
  __decorate([_property({
    type: cc.Node,
    displayName: "蒙版"
  })], _ctor.prototype, "blockNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "人物节点"
  })], _ctor.prototype, "RoleNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "人物气泡"
  })], _ctor.prototype, "roleQipao", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "手机气泡"
  })], _ctor.prototype, "phoneQipao", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_BWTipDialogue;