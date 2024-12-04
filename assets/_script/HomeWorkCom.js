var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HomeWorkCom = undefined;
var r_CommonFunc = require("CommonFunc");
var r_HomeworkSystem = require("HomeworkSystem");
var r_HomeworkAnswerUI = require("HomeworkAnswerUI");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var p = cc.v2();
var exp_HomeWorkCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.startNodes = [];
    t.targetNodes = [];
    t.graps = [];
    t.words = [];
    t.wordExerc_1 = [];
    t.wordExerc_2 = [];
    t.wordExerc_3 = [];
    t.stars = [];
    t.starResults = [];
    t.scoreNode = null;
    t.scoreList = [];
    t.resultSps = [];
    t.m_selfStar = -1;
    t.m_wordPosList = [];
    t.m_wordAnswers = {
      1: {
        0: null,
        1: null,
        2: null
      },
      2: {
        0: null,
        1: null,
        2: null
      },
      3: {
        0: null,
        1: null
      }
    };
    t.m_lineAnswers = {
      0: null,
      1: null,
      2: null,
      3: null,
      4: null
    };
    t.m_currWord = null;
    t.m_currWordPos = null;
    t.m_currWordId = null;
    t.currGrap = null;
    t.m_startPosList = [];
    t.m_startPos = null;
    t.m_endPosList = [];
    t.m_endPos = null;
    t.m_lineId = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    var e = this;
    this.startNodes.forEach(function (t) {
      e.m_startPosList.push(cc.v2(t.x, t.y - 20));
    });
    this.targetNodes.forEach(function (t) {
      e.m_endPosList.push(cc.v2(t.x, t.y + 20));
    });
    this.words.forEach(function (t) {
      e.m_wordPosList.push(cc.v2(t.x, t.y));
    });
    for (var t = 1; t <= 3; t++) {
      this["wordExerc_" + t].forEach(function (e) {
        e.getChildByName("result").active = false;
      });
    }
    this.startNodes.forEach(function (e) {
      e.getChildByName("result").active = false;
    });
    this.starResults.forEach(function (e) {
      return e.active = false;
    });
    this.scoreNode.active = false;
  };
  _ctor.prototype.onEnable = function () {
    this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
  };
  _ctor.prototype.onDisable = function () {
    this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
  };
  _ctor.prototype.onTouchStart = function (e) {
    var t = e.getLocation();
    this.onWordsTouchStart(t);
    this.onLineTouchStart(t);
  };
  _ctor.prototype.onTouchMove = function (e) {
    var t = e.getLocation();
    this.onWordsTouchMove(e);
    this.onLineTouchMove(t);
  };
  _ctor.prototype.onTouchEnd = function (e) {
    var t = e.getLocation();
    this.onWordsTouchEnd(t);
    this.onLineTouchEnd(t);
    this.onStarTouchEnd(t);
  };
  _ctor.prototype.onWordsTouchStart = function (e) {
    var t = this;
    this.words.forEach(function (o, i) {
      if (r_CommonFunc.checkTouchNode(e, o)) {
        t.m_currWord = o;
        t.m_currWordPos = t.m_wordPosList[i];
        t.m_currWordId = i;
      }
    });
  };
  _ctor.prototype.onWordsTouchMove = function (e) {
    if (this.m_currWord) {
      var t = e.getDelta();
      this.m_currWord.x += t.x;
      this.m_currWord.y += t.y;
    }
  };
  _ctor.prototype.onWordsTouchEnd = function (e) {
    var t = this;
    if (this.m_currWord) {
      var o = this;
      var i = false;
      for (var n = 1; n <= 3; n++) {
        this["wordExerc_" + n].forEach(function (a, r) {
          if (r_CommonFunc.checkTouchNode(e, a)) {
            t.amendment();
            if (null != t.m_wordAnswers[n][r]) {
              return;
            }
            o.m_currWord.x = a.x;
            o.m_currWord.y = a.y;
            o.m_wordAnswers[n][r] = o.m_currWordId;
            o.m_currWord = null;
            o.m_currWordPos = null;
            o.m_currWordId = null;
            i = true;
          }
        });
      }
      if (!i) {
        this.amendment();
        this.m_currWord.x = this.m_currWordPos.x;
        this.m_currWord.y = this.m_currWordPos.y;
        o.m_currWord = null;
        o.m_currWordPos = null;
        o.m_currWordId = null;
      }
    }
  };
  _ctor.prototype.amendment = function () {
    for (var e in this.m_wordAnswers) for (var t in this.m_wordAnswers[e]) this.m_wordAnswers[e][t] == this.m_currWordId && (this.m_wordAnswers[e][t] = null);
  };
  _ctor.prototype.onLineTouchStart = function (e) {
    var t = this;
    this.startNodes.forEach(function (o, i) {
      if (r_CommonFunc.checkTouchNode(e, o)) {
        t.currGrap = t.graps[i];
        t.m_startPos = t.m_startPosList[i];
        t.m_lineId = i;
      }
    });
  };
  _ctor.prototype.onLineTouchMove = function (e) {
    if (this.currGrap) {
      this.currGrap.node.parent.convertToNodeSpaceAR(e, p);
      this.draw(this.m_startPos, p, this.currGrap);
    }
  };
  _ctor.prototype.onLineTouchEnd = function (e) {
    var t = this;
    var o = false;
    if (this.currGrap) {
      this.targetNodes.forEach(function (i, n) {
        if (r_CommonFunc.checkTouchNode(e, i)) {
          if (t.m_lineAnswers[t.m_lineId] == n) {
            ;
          } else if (Object.values(t.m_lineAnswers).includes(n)) {
            return;
          }
          t.m_endPos = t.m_endPosList[n];
          t.draw(t.m_startPos, t.m_endPos, t.currGrap);
          t.currGrap = null;
          t.m_endPos = null;
          t.m_startPos = null;
          t.m_lineAnswers[t.m_lineId] = n;
          o = true;
        }
      });
      if (!o) {
        t.currGrap.clear();
        t.currGrap = null;
        t.m_endPos = null;
        t.m_startPos = null;
        t.m_lineAnswers[t.m_lineId] = null;
      }
    }
  };
  _ctor.prototype.draw = function (e, t, o) {
    o.clear();
    o.moveTo(e.x, e.y);
    o.lineTo(t.x, t.y);
    o.stroke();
    o.fill();
  };
  _ctor.prototype.onStarTouchEnd = function (e) {
    var t = -1;
    this.stars.forEach(function (o, i) {
      r_CommonFunc.checkTouchNode(e, o) && (t = i);
    });
    if (-1 != t) {
      this.stars.forEach(function (e, o) {
        e.opacity = o <= t ? 255 : 0;
      });
      this.m_selfStar = t;
    }
  };
  _ctor.prototype.finish = function () {
    for (var e = 1; e <= 3; e++) {
      this["wordExerc_" + e].forEach(function (e) {
        e.getChildByName("result").active = true;
      });
    }
    this.startNodes.forEach(function (e) {
      e.getChildByName("result").active = true;
    });
    this.starResults.forEach(function (e) {
      return e.active = true;
    });
    var t = r_HomeworkSystem.HomeworkSystem.checkScore1(this.m_wordAnswers, this.wordExerc_1.concat(this.wordExerc_2, this.wordExerc_3), this.resultSps);
    var o = r_HomeworkSystem.HomeworkSystem.checkScore2(this.m_lineAnswers, this.startNodes, this.resultSps);
    var i = r_HomeworkSystem.HomeworkSystem.checkScore3(this.m_selfStar, this.starResults, this.resultSps);
    var n = i + o + t;
    this.scoreList[0].string = t + "";
    this.scoreList[1].string = o + "";
    this.scoreList[2].string = i + "";
    this.scoreList[3].string = n + "";
    this.scoreNode.active = true;
    r_HomeworkAnswerUI.default.showUI({
      index: n >= 90 ? 1 : 0
    });
  };
  __decorate([_property([cc.Node])], _ctor.prototype, "startNodes", undefined);
  __decorate([_property([cc.Node])], _ctor.prototype, "targetNodes", undefined);
  __decorate([_property([cc.Graphics])], _ctor.prototype, "graps", undefined);
  __decorate([_property([cc.Node])], _ctor.prototype, "words", undefined);
  __decorate([_property([cc.Node])], _ctor.prototype, "wordExerc_1", undefined);
  __decorate([_property([cc.Node])], _ctor.prototype, "wordExerc_2", undefined);
  __decorate([_property([cc.Node])], _ctor.prototype, "wordExerc_3", undefined);
  __decorate([_property([cc.Node])], _ctor.prototype, "stars", undefined);
  __decorate([_property([cc.Node])], _ctor.prototype, "starResults", undefined);
  __decorate([_property(cc.Node)], _ctor.prototype, "scoreNode", undefined);
  __decorate([_property([cc.Label])], _ctor.prototype, "scoreList", undefined);
  __decorate([_property([cc.SpriteFrame])], _ctor.prototype, "resultSps", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.HomeWorkCom = exp_HomeWorkCom;