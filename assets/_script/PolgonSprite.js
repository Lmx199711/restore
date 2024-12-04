var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_TextureAssembler = require("TextureAssembler");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var l = _decorator.executeInEditMode;
var u = _decorator.mixins;
var _property = _decorator.property;
var def_PolgonSprite = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.temp_vec2 = new cc.Vec2();
    t.temp_mat4 = new cc.Mat4();
    t._assembler = null;
    t._texture = null;
    t._polygon = [];
    t.srcBlendFactor = cc.macro.BlendFactor.SRC_ALPHA;
    t.dstBlendFactor = cc.macro.BlendFactor.ONE_MINUS_SRC_ALPHA;
    return t;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "rootNode", {
    get: function () {
      if (this._rootNode) {
        return this._rootNode;
      } else {
        return this.node;
      }
    },
    set: function (e) {
      this._rootNode = e;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor.prototype, "texture", {
    get: function () {
      return this._texture;
    },
    set: function (e) {
      this._texture = e;
      this.node.width = e.width;
      this.node.height = e.height;
      this._updateMaterial();
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor.prototype, "polygon", {
    get: function () {
      if (0 == this._polygon.length) {
        var e = this.node.width / 2;
        var t = this.node.height / 2;
        this._polygon.push(cc.v2(e, t));
        this._polygon.push(cc.v2(-e, t));
        this._polygon.push(cc.v2(-e, -t));
        this._polygon.push(cc.v2(e, -t));
      }
      return this._polygon;
    },
    set: function (e) {
      this._polygon = e;
      this._updateVerts();
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype._updateVerts = function () {
    this.setVertsDirty();
  };
  _ctor.prototype._updateMaterial = function () {
    var e = this._texture;
    var t = this.getMaterial(0);
    if (t) {
      undefined !== t.getDefine("USE_TEXTURE") && t.define("USE_TEXTURE", true);
      t.setProperty("texture", e);
    }
    this.__proto__._updateBlendFunc.call(this);
    this.setVertsDirty();
  };
  _ctor.prototype._resetAssembler = function () {
    (this._assembler = new r_TextureAssembler.default()).init(this);
    this._updateColor();
    this.setVertsDirty();
  };
  _ctor.prototype._hitTest = function (e) {
    var t = this.node;
    t.getContentSize();
    t._updateWorldMatrix();
    return !!cc.Mat4.invert(this.temp_mat4, t._worldMatrix) && (cc.Vec2.transformMat4(this.temp_vec2, e, this.temp_mat4), cc.Intersection.pointInPolygon(this.temp_vec2, this.polygon));
  };
  __decorate([_property(cc.Texture2D)], _ctor.prototype, "_texture", undefined);
  __decorate([_property(cc.Texture2D)], _ctor.prototype, "texture", null);
  __decorate([_property({
    type: [cc.Vec2],
    serializable: true
  })], _ctor.prototype, "_polygon", undefined);
  __decorate([_property({
    type: [cc.Vec2],
    serializable: true
  })], _ctor.prototype, "polygon", null);
  __decorate([_property({
    type: cc.Enum(cc.macro.BlendFactor),
    override: true
  })], _ctor.prototype, "srcBlendFactor", undefined);
  __decorate([_property({
    type: cc.Enum(cc.macro.BlendFactor),
    override: true
  })], _ctor.prototype, "dstBlendFactor", undefined);
  return __decorate([_ccclass, l, u(cc.BlendFunc)], _ctor);
}(cc.RenderComponent);
exports.default = def_PolgonSprite;