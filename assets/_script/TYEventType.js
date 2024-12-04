Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TYEventType = undefined;
var exp_TYEventType = function () {
  function _ctor() {}
  _ctor.CLICK = "TY_CLICK";
  _ctor.TOUCH_BEGIN = "TY_TOUCH_BEGINE";
  _ctor.TOUCH_END = "TY_TOUCH_END";
  _ctor.TOUCH_MOVE = "TY_TOUCH_MOVE";
  _ctor.DRAG_BEGIN = "TY_DRAG_BEGIN";
  _ctor.DRAG_MOVE = "TY_DRAG_MOVE";
  _ctor.DRAG_END = "TY_DRAG_END";
  _ctor.PLACE_ITEM_END = "TY_PLACE_ITEM_END";
  _ctor.ToolEvent = {
    TOOl_DRAG_MOVE: "TY_Tool_DRAG_MOVE",
    TOOl_DRAG_TRIGGER_ENTER: "TY_Tool_DRAG_TRIGGER_ENTER",
    TOOl_DRAG_TRIGGER_EXIT: "TY_Tool_DRAG_TRIGGER_Exit",
    TOOL_DRAG_TOUCH_END: "TY_TOOL_DRAG_TOUCH_END",
    TOOL_DRAG_TOUCH_START: "TY_TOOL_DRAG_TOUCH_START"
  };
  _ctor.RoboticMoment = {
    ROBOTIC_TOUCH_END: "Robotic_Touch_End"
  };
  return _ctor;
}();
exports.TYEventType = exp_TYEventType;