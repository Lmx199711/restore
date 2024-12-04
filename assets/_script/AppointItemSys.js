Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppointItemSys = undefined;
var r_DecorateBehavior = require("DecorateBehavior");
var r_TouchMgrLevel = require("TouchMgrLevel");
var r_AppointedItemCom = require("AppointedItemCom");
var exp_AppointItemSys = function () {
  function _ctor() {}
  _ctor.prototype.trigger = function (e) {
    var t = null;
    if (e) {
      this.entity.appointNodes.find(function (o) {
        if (o.name == e && (t = o.node, o.isUseChild)) {
          var i = o.useChildIndex;
          if (o.useChildIndex < 0) {
            i = Math.floor(Math.random() * o.node.childrenCount);
          } else {
            o.useChildIndex >= o.node.childrenCount && (i = o.node.childrenCount - 1);
          }
          t = o.node.children[i];
        }
      });
      t && r_TouchMgrLevel.TouchMgrLevel.SetAppointedItem(t);
    } else {
      r_TouchMgrLevel.TouchMgrLevel.AppointItem();
    }
  };
  _ctor.prototype.onStart = function () {};
  _ctor.prototype.onDestroy = function () {};
  return __decorate([r_DecorateBehavior.bindActionCom(r_AppointedItemCom.AppointItemCom)], _ctor);
}();
exports.AppointItemSys = exp_AppointItemSys;