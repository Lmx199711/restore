var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubwayCom = undefined;
var r_UtilsSystem = require("UtilsSystem");
var r_SubwayCfg = require("SubwayCfg");
var r_SoundMgr = require("SoundMgr");
var r_SubwayGameUI = require("SubwayGameUI");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var exp_SubwayCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.sk = null;
    t.skDataList = [];
    t.role = null;
    t.desc = null;
    t.labName = null;
    t.labGet = null;
    t.labBubble = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {};
  _ctor.prototype.start = function () {};
  _ctor.prototype.restart = function () {
    this.sk.setAnimation(0, "xunhuan", true);
    this.role.node.active = false;
    this.desc.active = false;
  };
  _ctor.prototype.selectObject = function (e) {
    var t = this;
    this.restart();
    this.sk.setAnimation(0, "zhenti", false);
    this.sk.setSkin("skin_" + (e + 1));
    this.sk.setCompleteListener(function () {
      if ("zhenti" == t.sk.animation) {
        t.role.skeletonData = t.skDataList[e];
        t.role.node.active = true;
        var o = t.node.getChildByName("point" + (e + 1)).getPosition();
        t.role.node.setPosition(o);
        t.role.setAnimation(0, "animation", true);
        t.showContent(e);
        r_SubwayGameUI.SubwayGameUI.instace.animComplate();
        r_SoundMgr.SoundMgr.playSound("subway/" + r_SubwayCfg.SubwayCfg[e].sound);
      }
    });
  };
  _ctor.prototype.showContent = function (e) {
    this.desc.active = true;
    var t = r_SubwayCfg.SubwayCfg[e];
    this.labName.string = t.name;
    this.labGet.string = r_UtilsSystem.UtilsSystem.numFormats(t.coin, 0);
    this.labBubble.string = t.bubble;
  };
  __decorate([_property(sp.Skeleton)], _ctor.prototype, "sk", undefined);
  __decorate([_property([sp.SkeletonData])], _ctor.prototype, "skDataList", undefined);
  __decorate([_property(sp.Skeleton)], _ctor.prototype, "role", undefined);
  __decorate([_property(cc.Node)], _ctor.prototype, "desc", undefined);
  __decorate([_property(cc.Label)], _ctor.prototype, "labName", undefined);
  __decorate([_property(cc.Label)], _ctor.prototype, "labGet", undefined);
  __decorate([_property(cc.Label)], _ctor.prototype, "labBubble", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.SubwayCom = exp_SubwayCom;