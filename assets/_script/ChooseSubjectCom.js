var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChooseSubjectCom = exports.SubjectAnswerInfo = undefined;
var r_ExecuteBehaviorInfo = require("ExecuteBehaviorInfo");
var r_CommonFunc = require("CommonFunc");
var r_SoundMgr = require("SoundMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var exp_SubjectAnswerInfo = function () {
  function _ctor() {
    this.subjectDesc = "";
    this.answersDesc = [];
    this.rightAnswer = "";
  }
  __decorate([_property({
    displayName: "题目"
  })], _ctor.prototype, "subjectDesc", undefined);
  __decorate([_property({
    type: cc.String,
    displayName: "答案选项"
  })], _ctor.prototype, "answersDesc", undefined);
  __decorate([_property({
    displayName: "正确答案"
  })], _ctor.prototype, "rightAnswer", undefined);
  return __decorate([_ccclass("SubjectAnswerInfo")], _ctor);
}();
exports.SubjectAnswerInfo = exp_SubjectAnswerInfo;
var exp_ChooseSubjectCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.roleRoot = null;
    t.lifeRoot = null;
    t.subjectRoot = null;
    t.subjectLabel = null;
    t.answerRoot = null;
    t.clickSound = "click";
    t.subjectInfo = [];
    t.failBehavior = new r_ExecuteBehaviorInfo.ExecuteBehaviorInfo();
    t.rightBehavior = new r_ExecuteBehaviorInfo.ExecuteBehaviorInfo();
    t.successBehavior = new r_ExecuteBehaviorInfo.ExecuteBehaviorInfo();
    t.touchBg = null;
    t.curSubjectIndex = -1;
    t.curClickAnswerIndex = -1;
    t.canClick = true;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    this.touchBg = new cc.Node("touchBg");
    this.touchBg.width = 1668;
    this.touchBg.height = 1002;
    this.node.addChild(this.touchBg);
    this.roles = this.roleRoot.children;
    this.roles.forEach(function (e) {
      return e.active = false;
    });
    this.answersBtn = this.answerRoot.children;
    this.answersBtn.forEach(function (e) {
      return e.children[1].active = e.children[2].active = false;
    });
    this.curSubjectIndex = -1;
    this.subjectRoot.active = false;
    this.answerRoot.active = false;
    this.roleRoot.y = -1e3;
    this.roles[0].active = true;
    this.subjectLabel.string = this.subjectInfo[0].subjectDesc;
    this.subjectEnter(null);
    this.touchBg.on(cc.Node.EventType.TOUCH_END, this.onClickEnd, this);
    this.touchBg.on(cc.Node.EventType.TOUCH_START, this.onClickStart, this);
  };
  _ctor.prototype.onDestroy = function () {
    cc.Tween.stopAllByTarget(this.subjectRoot);
  };
  _ctor.prototype.onClickStart = function (e) {
    this.clickSound && r_SoundMgr.SoundMgr.playSound(this.clickSound);
    if (this.canClick) {
      var t = e.getLocation();
      for (var o = 0; o < this.answersBtn.length; o++) {
        var i = this.answersBtn[o];
        if (r_CommonFunc.checkTouchNode(t, i)) {
          this.curClickAnswerIndex = o;
          i.setScale(.9, .9);
          break;
        }
      }
    }
  };
  _ctor.prototype.onClickEnd = function (e) {
    var t = e.getLocation();
    if (-1 != this.curClickAnswerIndex) {
      this.answersBtn[this.curClickAnswerIndex].setScale(1, 1);
      if (r_CommonFunc.checkTouchNode(t, this.answersBtn[this.curClickAnswerIndex])) {
        this.canClick = false;
        this.checkAnswer();
        this.curClickAnswerIndex = -1;
      }
    }
  };
  _ctor.prototype.checkAnswer = function () {
    var e = this;
    var t = this.answersBtn[this.curClickAnswerIndex].children[0].getComponent(cc.Label).string == this.subjectInfo[this.curSubjectIndex].rightAnswer;
    this.answersBtn[this.curClickAnswerIndex].children[t ? 1 : 2].active = true;
    if (!t) {
      var o = function (t) {
        if (i.lifeRoot.children[t].active) {
          cc.tween(i.lifeRoot.children[t]).to(.2, {
            opacity: 0
          }).call(function () {
            e.lifeRoot.children[t].active = false;
            e.failBehavior.execute();
          }).start();
          return "break";
        }
      };
      var i = this;
      for (var n = 0; n < this.lifeRoot.childrenCount && "break" !== o(n); n++) {
        ;
      }
    }
    this.scheduleOnce(function () {
      e.subjectRoot.active = false;
      e.answerRoot.active = false;
      e.answersBtn.forEach(function (e) {
        return e.children[1].active = e.children[2].active = false;
      });
      if (e.curSubjectIndex < e.subjectInfo.length - 1) {
        e.showNextSubject();
        t && e.rightBehavior.execute();
      } else {
        e.successBehavior.execute();
      }
    }, 1);
  };
  _ctor.prototype.showNextSubject = function () {
    var e = this;
    this.subjectLeave(function () {
      e.roles[e.curSubjectIndex].active = false;
      var t = e.subjectInfo[e.curSubjectIndex + 1];
      e.roles[e.curSubjectIndex + 1].active = true;
      e.subjectLabel.string = t.subjectDesc;
      for (var o = 0; o < t.answersDesc.length; o++) {
        e.answersBtn[o].children[0].getComponent(cc.Label).string = t.answersDesc[o];
      }
      e.subjectEnter(null);
    });
  };
  _ctor.prototype.subjectLeave = function (e) {
    cc.tween(this.roleRoot).to(1, {
      y: -1e3
    }).call(function () {
      e && e();
    }).start();
  };
  _ctor.prototype.subjectEnter = function (e) {
    var t = this;
    cc.tween(this.roleRoot).to(1, {
      y: 0
    }).call(function () {
      t.subjectRoot.active = true;
      t.scheduleOnce(function () {
        t.answerRoot.active = true;
        t.canClick = true;
        t.curSubjectIndex++;
        for (var e = 0; e < t.answersBtn.length; e++) {
          t.answersBtn[e].children[0].getComponent(cc.Label).string = t.subjectInfo[t.curSubjectIndex].answersDesc[e];
        }
      }, 1);
      e && e();
    }).start();
  };
  __decorate([_property({
    type: cc.Node,
    displayName: "角色根节点"
  })], _ctor.prototype, "roleRoot", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "生命根节点"
  })], _ctor.prototype, "lifeRoot", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "题目的根节点"
  })], _ctor.prototype, "subjectRoot", undefined);
  __decorate([_property({
    type: cc.Label,
    displayName: "题目显示的Label节点"
  })], _ctor.prototype, "subjectLabel", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "答案的根节点"
  })], _ctor.prototype, "answerRoot", undefined);
  __decorate([_property({
    displayName: "点击音效"
  })], _ctor.prototype, "clickSound", undefined);
  __decorate([_property({
    type: [exp_SubjectAnswerInfo],
    displayName: "题目信息"
  })], _ctor.prototype, "subjectInfo", undefined);
  __decorate([_property({
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo,
    displayName: "选择错误执行的行为"
  })], _ctor.prototype, "failBehavior", undefined);
  __decorate([_property({
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo,
    displayName: "选择正确执行的行为"
  })], _ctor.prototype, "rightBehavior", undefined);
  __decorate([_property({
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo,
    displayName: "成功之后的行为"
  })], _ctor.prototype, "successBehavior", undefined);
  return __decorate([_ccclass, _menu("选择题/ABCD")], _ctor);
}(cc.Component);
exports.ChooseSubjectCom = exp_ChooseSubjectCom;