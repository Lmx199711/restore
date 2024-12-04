var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PasswordNode = undefined;
var r_SoundMgr = require("SoundMgr");
var r_TriggerActionMgr = require("TriggerActionMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var exp_PasswordNode = function () {
  function _ctor() {
    this.addPasswordBtn = null;
    this.redPasswordBtn = null;
    this.passwordNode = null;
    this.startNumber = 0;
    this.yesNumber = 0;
    this.passwordNumbers = [];
    this.number = 0;
  }
  __decorate([_property({
    displayName: "加按钮",
    tooltip: "点击按钮数字增加",
    type: cc.Button
  })], _ctor.prototype, "addPasswordBtn", undefined);
  __decorate([_property({
    displayName: "减按钮",
    tooltip: "点击按钮数字减少",
    type: cc.Button
  })], _ctor.prototype, "redPasswordBtn", undefined);
  __decorate([_property({
    displayName: "密码数字图片显示节点",
    type: cc.Sprite
  })], _ctor.prototype, "passwordNode", undefined);
  __decorate([_property({
    type: cc.Integer,
    displayName: "初始密码",
    max: 9,
    min: 0
  })], _ctor.prototype, "startNumber", undefined);
  __decorate([_property({
    type: cc.Integer,
    displayName: "正确密码",
    max: 9,
    min: 0
  })], _ctor.prototype, "yesNumber", undefined);
  __decorate([_property({
    type: [cc.SpriteFrame],
    displayName: "密码数字图片",
    tooltip: "(可以为空，为空显示默认数字图片)数字图片请按顺序放置第一位是0"
  })], _ctor.prototype, "passwordNumbers", undefined);
  return __decorate([_ccclass], _ctor);
}();
exports.PasswordNode = exp_PasswordNode;
var def_CombinationLock = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.actionName = "";
    t.passwords = [];
    t.passwordNumbers = [];
    t.sound = "";
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    var e = this;
    var t = function (t) {
      0 == t.passwordNumbers.length && (t.passwordNumbers = o.passwordNumbers);
      t.passwordNode.spriteFrame = t.passwordNumbers[t.startNumber];
      t.number = t.startNumber;
      t.addPasswordBtn && t.addPasswordBtn.node.on(cc.Node.EventType.TOUCH_END, function () {
        t.number++;
        t.number >= e.passwordNumbers.length && (t.number = 0);
        t.passwordNode.spriteFrame = t.passwordNumbers[t.number];
        e.action();
      }, o);
      t.redPasswordBtn && t.redPasswordBtn.node.on(cc.Node.EventType.TOUCH_END, function () {
        t.number--;
        t.number < 0 && (t.number = e.passwordNumbers.length - 1);
        t.passwordNode.spriteFrame = t.passwordNumbers[t.number];
        e.action();
      }, o);
    };
    var o = this;
    var i = 0;
    for (var n = this.passwords; i < n.length; i++) {
      t(n[i]);
    }
  };
  _ctor.prototype.action = function () {
    r_SoundMgr.SoundMgr.playSound(this.sound);
    var e = 0;
    for (var t = this.passwords; e < t.length; e++) {
      var o = t[e];
      if (o.number != o.yesNumber) {
        return;
      }
    }
    r_TriggerActionMgr.TriggerActionMgr.trigger(this.actionName);
  };
  __decorate([_property({
    tooltip: "触发action名字",
    displayName: "密码正确自动触发action"
  })], _ctor.prototype, "actionName", undefined);
  __decorate([_property({
    type: [exp_PasswordNode],
    displayName: "密码位"
  })], _ctor.prototype, "passwords", undefined);
  __decorate([_property({
    type: [cc.SpriteFrame],
    displayName: "密码数字图片",
    tooltip: "(不能为空)默认数字图片,数字图片请按顺序放置第一位是0"
  })], _ctor.prototype, "passwordNumbers", undefined);
  __decorate([_property({
    displayName: "按键音效"
  })], _ctor.prototype, "sound", undefined);
  return __decorate([_ccclass, _menu("Action/事件/密码锁")], _ctor);
}(cc.Component);
exports.default = def_CombinationLock;