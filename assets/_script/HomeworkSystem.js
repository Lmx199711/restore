Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HomeworkSystem = exports._HomeworkSystem = undefined;
var exp__HomeworkSystem = function () {
  function _ctor() {
    this.wordAnswers = {
      1: {
        0: 0,
        1: 6,
        2: 7
      },
      2: {
        0: 1,
        1: 3,
        2: 5
      },
      3: {
        0: 2,
        1: 4
      }
    };
    this.lineAnswers = {
      0: 0,
      1: 2,
      2: 4,
      3: 1,
      4: 3
    };
    this.star = 4;
  }
  _ctor.prototype.checkScore1 = function (e, t, o) {
    var i = 0;
    var n = 0;
    for (var a in this.wordAnswers) {
      var s = Object.values(this.wordAnswers[a]);
      for (var r in this.wordAnswers[a]) {
        if (s.includes(e[a][r])) {
          t[i].getChildByName("result").getComponent(cc.Sprite).spriteFrame = o[0];
          n += 5;
        } else {
          t[i].getChildByName("result").getComponent(cc.Sprite).spriteFrame = o[1];
        }
        t[i].active = true;
        i++;
      }
    }
    return n;
  };
  _ctor.prototype.checkScore2 = function (e, t, o) {
    var i = 0;
    var n = 0;
    for (var a in this.lineAnswers) {
      if (this.lineAnswers[a] == e[a]) {
        t[i].getChildByName("result").getComponent(cc.Sprite).spriteFrame = o[0];
        n += 10;
      } else {
        t[i].getChildByName("result").getComponent(cc.Sprite).spriteFrame = o[1];
      }
      t[i].active = true;
      i++;
    }
    return n;
  };
  _ctor.prototype.checkScore3 = function (e, t, o) {
    for (var i = 0; i < 5; i++) {
      t[i].getComponent(cc.Sprite).spriteFrame = i <= e ? o[0] : o[1];
      t[i].active = true;
    }
    return 2 * (e + 1);
  };
  return _ctor;
}();
exports._HomeworkSystem = exp__HomeworkSystem;
exports.HomeworkSystem = new exp__HomeworkSystem();