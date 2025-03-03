window.fgui = {}, window.fairygui = window.fgui, window.__extends = void 0 && (void 0).__extends || function () {
  var _t = function t(e, i) {
    return (_t = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (t, e) {
      t.__proto__ = e;
    } || function (t, e) {
      for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
    })(e, i);
  };
  return function (e, i) {
    function o() {
      this.constructor = e;
    }
    _t(e, i), e.prototype = null === i ? Object.create(i) : (o.prototype = i.prototype, new o());
  };
}(), function (t) {
  var e = function () {
    function e() {}
    return e.prototype.createObject = function (e, i) {
      if (this._node) throw "Already running";
      var o = t.UIPackage.getByName(e);
      if (!o) throw new Error("package not found: " + e);
      var n = o.getItemByName(i);
      if (!n) throw new Error("resource not found: " + i);
      this.internalCreateObject(n);
    }, e.prototype.createObjectFromURL = function (e) {
      if (this._node) throw "Already running";
      var i = t.UIPackage.getItemByURL(e);
      if (!i) throw new Error("resource not found: " + e);
      this.internalCreateObject(i);
    }, e.prototype.cancel = function () {
      this._node && (this._node.destroy(), this._node = null);
    }, e.prototype.internalCreateObject = function (t) {
      this._node = new cc.Node("[AsyncCreating:" + t.name + "]"), this._node.parent = cc.director.getScene(), this._node.on("#", this.completed, this), this._node.addComponent(i).init(t);
    }, e.prototype.completed = function (t) {
      this.cancel(), this.callback && this.callback(t);
    }, e;
  }();
  t.AsyncOperation = e;
  var i = function (e) {
    function i() {
      var t = e.call(this) || this;
      return t._itemList = new Array(), t._objectPool = new Array(), t;
    }
    return __extends(i, e), i.prototype.init = function (t) {
      this._itemList.length = 0, this._objectPool.length = 0;
      var e = {
        pi: t,
        type: t.objectType
      };
      e.childCount = this.collectComponentChildren(t), this._itemList.push(e), this._index = 0;
    }, i.prototype.onDestroy = function () {
      this._itemList.length = 0;
      var t = this._objectPool.length;
      if (t > 0) {
        for (var e = 0; e < t; e++) this._objectPool[e].dispose();
        this._objectPool.length = 0;
      }
    }, i.prototype.collectComponentChildren = function (e) {
      var i,
        o,
        n,
        r,
        s,
        h,
        a = e.rawData;
      a.seek(0, 2);
      var l = a.readShort();
      for (n = 0; n < l; n++) {
        r = a.readShort(), s = a.position, a.seek(s, 0);
        var c = a.readByte(),
          u = a.readS(),
          _ = a.readS();
        a.position = s, null != u ? (i = {
          pi: o = null != (h = null != _ ? t.UIPackage.getById(_) : e.owner) ? h.getItemById(u) : null,
          type: c
        }, o && o.type == t.PackageItemType.Component && (i.childCount = this.collectComponentChildren(o))) : (i = {
          type: c
        }, c == t.ObjectType.List && (i.listItemCount = this.collectListChildren(a))), this._itemList.push(i), a.position = s + r;
      }
      return l;
    }, i.prototype.collectListChildren = function (e) {
      e.seek(e.position, 8);
      var i,
        o,
        n,
        r,
        s,
        h = 0,
        a = e.readS(),
        l = e.readShort();
      for (i = 0; i < l; i++) o = e.readShort(), o += e.position, null == (n = e.readS()) && (n = a), n && (r = t.UIPackage.getItemByURL(n)) && (s = {
        pi: r,
        type: r.objectType
      }, r.type == t.PackageItemType.Component && (s.childCount = this.collectComponentChildren(r)), this._itemList.push(s), h++), e.position = o;
      return h;
    }, i.prototype.update = function () {
      for (var e, i, o, n, r = t.ToolSet.getTime(), s = t.UIConfig.frameTimeForAsyncUIConstruction, h = this._itemList.length; this._index < h;) {
        if ((i = this._itemList[this._index]).pi) e = t.UIObjectFactory.newObject(i.pi), this._objectPool.push(e), t.UIPackage._constructing++, i.pi.type == t.PackageItemType.Component ? (o = this._objectPool.length - i.childCount - 1, e.constructFromResource2(this._objectPool, o), this._objectPool.splice(o, i.childCount)) : e.constructFromResource(), t.UIPackage._constructing--;else if (e = t.UIObjectFactory.newObject(i.type), this._objectPool.push(e), i.type == t.ObjectType.List && i.listItemCount > 0) {
          for (o = this._objectPool.length - i.listItemCount - 1, n = 0; n < i.listItemCount; n++) e.itemPool.returnObject(this._objectPool[n + o]);
          this._objectPool.splice(o, i.listItemCount);
        }
        if (this._index++, this._index % 5 == 0 && t.ToolSet.getTime() - r >= s) return;
      }
      var a = this._objectPool[0];
      this._itemList.length = 0, this._objectPool.length = 0, this.node.emit("#", a);
    }, i;
  }(cc.Component);
}(fgui || (fgui = {})), function (t) {
  var e = 0,
    i = function (i) {
      function o() {
        var t = i.call(this) || this;
        return t._pageIds = [], t._pageNames = [], t._selectedIndex = -1, t._previousIndex = -1, t;
      }
      return __extends(o, i), o.prototype.dispose = function () {}, Object.defineProperty(o.prototype, "selectedIndex", {
        get: function get() {
          return this._selectedIndex;
        },
        set: function set(e) {
          if (this._selectedIndex != e) {
            if (e > this._pageIds.length - 1) throw "index out of bounds: " + e;
            this.changing = !0, this._previousIndex = this._selectedIndex, this._selectedIndex = e, this.parent.applyController(this), this.emit(t.Event.STATUS_CHANGED, this), this.changing = !1;
          }
        },
        enumerable: !1,
        configurable: !0
      }), o.prototype.onChanged = function (e, i) {
        this.on(t.Event.STATUS_CHANGED, e, i);
      }, o.prototype.offChanged = function (e, i) {
        this.off(t.Event.STATUS_CHANGED, e, i);
      }, o.prototype.setSelectedIndex = function (t) {
        if (this._selectedIndex != t) {
          if (t > this._pageIds.length - 1) throw "index out of bounds: " + t;
          this.changing = !0, this._previousIndex = this._selectedIndex, this._selectedIndex = t, this.parent.applyController(this), this.changing = !1;
        }
      }, Object.defineProperty(o.prototype, "previsousIndex", {
        get: function get() {
          return this._previousIndex;
        },
        enumerable: !1,
        configurable: !0
      }), Object.defineProperty(o.prototype, "selectedPage", {
        get: function get() {
          return -1 == this._selectedIndex ? null : this._pageNames[this._selectedIndex];
        },
        set: function set(t) {
          var e = this._pageNames.indexOf(t);
          -1 == e && (e = 0), this.selectedIndex = e;
        },
        enumerable: !1,
        configurable: !0
      }), o.prototype.setSelectedPage = function (t) {
        var e = this._pageNames.indexOf(t);
        -1 == e && (e = 0), this.setSelectedIndex(e);
      }, Object.defineProperty(o.prototype, "previousPage", {
        get: function get() {
          return -1 == this._previousIndex ? null : this._pageNames[this._previousIndex];
        },
        enumerable: !1,
        configurable: !0
      }), Object.defineProperty(o.prototype, "pageCount", {
        get: function get() {
          return this._pageIds.length;
        },
        enumerable: !1,
        configurable: !0
      }), o.prototype.getPageName = function (t) {
        return this._pageNames[t];
      }, o.prototype.addPage = function (t) {
        void 0 === t && (t = ""), this.addPageAt(t, this._pageIds.length);
      }, o.prototype.addPageAt = function (t, i) {
        var o = "" + e++;
        i == this._pageIds.length ? (this._pageIds.push(o), this._pageNames.push(t)) : (this._pageIds.splice(i, 0, o), this._pageNames.splice(i, 0, t));
      }, o.prototype.removePage = function (t) {
        var e = this._pageNames.indexOf(t);
        -1 != e && (this._pageIds.splice(e, 1), this._pageNames.splice(e, 1), this._selectedIndex >= this._pageIds.length ? this.selectedIndex = this._selectedIndex - 1 : this.parent.applyController(this));
      }, o.prototype.removePageAt = function (t) {
        this._pageIds.splice(t, 1), this._pageNames.splice(t, 1), this._selectedIndex >= this._pageIds.length ? this.selectedIndex = this._selectedIndex - 1 : this.parent.applyController(this);
      }, o.prototype.clearPages = function () {
        this._pageIds.length = 0, this._pageNames.length = 0, -1 != this._selectedIndex ? this.selectedIndex = -1 : this.parent.applyController(this);
      }, o.prototype.hasPage = function (t) {
        return -1 != this._pageNames.indexOf(t);
      }, o.prototype.getPageIndexById = function (t) {
        return this._pageIds.indexOf(t);
      }, o.prototype.getPageIdByName = function (t) {
        var e = this._pageNames.indexOf(t);
        return -1 != e ? this._pageIds[e] : null;
      }, o.prototype.getPageNameById = function (t) {
        var e = this._pageIds.indexOf(t);
        return -1 != e ? this._pageNames[e] : null;
      }, o.prototype.getPageId = function (t) {
        return this._pageIds[t];
      }, Object.defineProperty(o.prototype, "selectedPageId", {
        get: function get() {
          return -1 == this._selectedIndex ? null : this._pageIds[this._selectedIndex];
        },
        set: function set(t) {
          var e = this._pageIds.indexOf(t);
          this.selectedIndex = e;
        },
        enumerable: !1,
        configurable: !0
      }), Object.defineProperty(o.prototype, "oppositePageId", {
        set: function set(t) {
          this._pageIds.indexOf(t) > 0 ? this.selectedIndex = 0 : this._pageIds.length > 1 && (this.selectedIndex = 1);
        },
        enumerable: !1,
        configurable: !0
      }), Object.defineProperty(o.prototype, "previousPageId", {
        get: function get() {
          return -1 == this._previousIndex ? null : this._pageIds[this._previousIndex];
        },
        enumerable: !1,
        configurable: !0
      }), o.prototype.runActions = function () {
        if (this._actions) for (var t = this._actions.length, e = 0; e < t; e++) this._actions[e].run(this, this.previousPageId, this.selectedPageId);
      }, o.prototype.setup = function (e) {
        var i,
          o,
          n = e.position;
        e.seek(n, 0), this.name = e.readS(), e.readBool() && (this.autoRadioGroupDepth = !0), e.seek(n, 1);
        var r = e.readShort();
        for (i = 0; i < r; i++) this._pageIds.push(e.readS()), this._pageNames.push(e.readS());
        var s = 0;
        if (e.version >= 2) switch (e.readByte()) {
          case 1:
            s = e.readShort();
            break;
          case 2:
            -1 == (s = this._pageNames.indexOf(t.UIPackage.branch)) && (s = 0);
            break;
          case 3:
            -1 == (s = this._pageNames.indexOf(t.UIPackage.getVar(e.readS()))) && (s = 0);
        }
        if (e.seek(n, 2), (r = e.readShort()) > 0) for (this._actions || (this._actions = new Array()), i = 0; i < r; i++) {
          o = e.readShort(), o += e.position;
          var h = t.ControllerAction.createAction(e.readByte());
          h.setup(e), this._actions.push(h), e.position = o;
        }
        this.parent && this._pageIds.length > 0 ? this._selectedIndex = s : this._selectedIndex = -1;
      }, o;
    }(cc.EventTarget);
  t.Controller = i;
}(fgui || (fgui = {})), function (t) {
  var e = function () {
    function e() {
      this._agent = new t.GLoader(), this._agent.draggable = !0, this._agent.touchable = !1, this._agent.setSize(100, 100), this._agent.setPivot(.5, .5, !0), this._agent.align = t.AlignType.Center, this._agent.verticalAlign = t.VertAlignType.Middle, this._agent.sortingOrder = 1e6, this._agent.on(t.Event.DRAG_END, this.onDragEnd, this);
    }
    return Object.defineProperty(e, "inst", {
      get: function get() {
        return e._inst || (e._inst = new e()), e._inst;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "dragAgent", {
      get: function get() {
        return this._agent;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "dragging", {
      get: function get() {
        return null != this._agent.parent;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.startDrag = function (e, i, o, n) {
      if (!this._agent.parent) {
        this._sourceData = o, this._agent.url = i, t.GRoot.inst.addChild(this._agent);
        var r = t.GRoot.inst.getTouchPosition(n);
        r = t.GRoot.inst.globalToLocal(r.x, r.y), this._agent.setPosition(r.x, r.y), this._agent.startDrag(n);
      }
    }, e.prototype.cancel = function () {
      this._agent.parent && (this._agent.stopDrag(), t.GRoot.inst.removeChild(this._agent), this._sourceData = null);
    }, e.prototype.onDragEnd = function () {
      if (this._agent.parent) {
        t.GRoot.inst.removeChild(this._agent);
        var e = this._sourceData;
        this._sourceData = null;
        for (var i = t.GRoot.inst.touchTarget; i;) {
          if (i.node.hasEventListener(t.Event.DROP)) return i.requestFocus(), void i.node.emit(t.Event.DROP, i, e);
          i = i.parent;
        }
      }
    }, e;
  }();
  t.DragDropManager = e;
}(fgui || (fgui = {})), function (t) {
  (function (t) {
    t[t.Common = 0] = "Common", t[t.Check = 1] = "Check", t[t.Radio = 2] = "Radio";
  })(t.ButtonMode || (t.ButtonMode = {})), function (t) {
    t[t.None = 0] = "None", t[t.Both = 1] = "Both", t[t.Height = 2] = "Height", t[t.Shrink = 3] = "Shrink";
  }(t.AutoSizeType || (t.AutoSizeType = {})), function (t) {
    t[t.Left = 0] = "Left", t[t.Center = 1] = "Center", t[t.Right = 2] = "Right";
  }(t.AlignType || (t.AlignType = {})), function (t) {
    t[t.Top = 0] = "Top", t[t.Middle = 1] = "Middle", t[t.Bottom = 2] = "Bottom";
  }(t.VertAlignType || (t.VertAlignType = {})), function (t) {
    t[t.None = 0] = "None", t[t.Scale = 1] = "Scale", t[t.ScaleMatchHeight = 2] = "ScaleMatchHeight", t[t.ScaleMatchWidth = 3] = "ScaleMatchWidth", t[t.ScaleFree = 4] = "ScaleFree", t[t.ScaleNoBorder = 5] = "ScaleNoBorder";
  }(t.LoaderFillType || (t.LoaderFillType = {})), function (t) {
    t[t.SingleColumn = 0] = "SingleColumn", t[t.SingleRow = 1] = "SingleRow", t[t.FlowHorizontal = 2] = "FlowHorizontal", t[t.FlowVertical = 3] = "FlowVertical", t[t.Pagination = 4] = "Pagination";
  }(t.ListLayoutType || (t.ListLayoutType = {})), function (t) {
    t[t.Single = 0] = "Single", t[t.Multiple = 1] = "Multiple", t[t.Multiple_SingleClick = 2] = "Multiple_SingleClick", t[t.None = 3] = "None";
  }(t.ListSelectionMode || (t.ListSelectionMode = {})), function (t) {
    t[t.Visible = 0] = "Visible", t[t.Hidden = 1] = "Hidden", t[t.Scroll = 2] = "Scroll";
  }(t.OverflowType || (t.OverflowType = {})), function (t) {
    t[t.Image = 0] = "Image", t[t.MovieClip = 1] = "MovieClip", t[t.Sound = 2] = "Sound", t[t.Component = 3] = "Component", t[t.Atlas = 4] = "Atlas", t[t.Font = 5] = "Font", t[t.Swf = 6] = "Swf", t[t.Misc = 7] = "Misc", t[t.Unknown = 8] = "Unknown", t[t.Spine = 9] = "Spine", t[t.DragonBones = 10] = "DragonBones";
  }(t.PackageItemType || (t.PackageItemType = {})), function (t) {
    t[t.Image = 0] = "Image", t[t.MovieClip = 1] = "MovieClip", t[t.Swf = 2] = "Swf", t[t.Graph = 3] = "Graph", t[t.Loader = 4] = "Loader", t[t.Group = 5] = "Group", t[t.Text = 6] = "Text", t[t.RichText = 7] = "RichText", t[t.InputText = 8] = "InputText", t[t.Component = 9] = "Component", t[t.List = 10] = "List", t[t.Label = 11] = "Label", t[t.Button = 12] = "Button", t[t.ComboBox = 13] = "ComboBox", t[t.ProgressBar = 14] = "ProgressBar", t[t.Slider = 15] = "Slider", t[t.ScrollBar = 16] = "ScrollBar", t[t.Tree = 17] = "Tree", t[t.Loader3D = 18] = "Loader3D";
  }(t.ObjectType || (t.ObjectType = {})), function (t) {
    t[t.Percent = 0] = "Percent", t[t.ValueAndMax = 1] = "ValueAndMax", t[t.Value = 2] = "Value", t[t.Max = 3] = "Max";
  }(t.ProgressTitleType || (t.ProgressTitleType = {})), function (t) {
    t[t.Default = 0] = "Default", t[t.Visible = 1] = "Visible", t[t.Auto = 2] = "Auto", t[t.Hidden = 3] = "Hidden";
  }(t.ScrollBarDisplayType || (t.ScrollBarDisplayType = {})), function (t) {
    t[t.Horizontal = 0] = "Horizontal", t[t.Vertical = 1] = "Vertical", t[t.Both = 2] = "Both";
  }(t.ScrollType || (t.ScrollType = {})), function (t) {
    t[t.None = 0] = "None", t[t.Horizontal = 1] = "Horizontal", t[t.Vertical = 2] = "Vertical", t[t.Both = 3] = "Both";
  }(t.FlipType || (t.FlipType = {})), function (t) {
    t[t.Ascent = 0] = "Ascent", t[t.Descent = 1] = "Descent", t[t.Arch = 2] = "Arch";
  }(t.ChildrenRenderOrder || (t.ChildrenRenderOrder = {})), function (t) {
    t[t.None = 0] = "None", t[t.Horizontal = 1] = "Horizontal", t[t.Vertical = 2] = "Vertical";
  }(t.GroupLayoutType || (t.GroupLayoutType = {})), function (t) {
    t[t.Auto = 0] = "Auto", t[t.Up = 1] = "Up", t[t.Down = 2] = "Down";
  }(t.PopupDirection || (t.PopupDirection = {})), function (t) {
    t[t.Left_Left = 0] = "Left_Left", t[t.Left_Center = 1] = "Left_Center", t[t.Left_Right = 2] = "Left_Right", t[t.Center_Center = 3] = "Center_Center", t[t.Right_Left = 4] = "Right_Left", t[t.Right_Center = 5] = "Right_Center", t[t.Right_Right = 6] = "Right_Right", t[t.Top_Top = 7] = "Top_Top", t[t.Top_Middle = 8] = "Top_Middle", t[t.Top_Bottom = 9] = "Top_Bottom", t[t.Middle_Middle = 10] = "Middle_Middle", t[t.Bottom_Top = 11] = "Bottom_Top", t[t.Bottom_Middle = 12] = "Bottom_Middle", t[t.Bottom_Bottom = 13] = "Bottom_Bottom", t[t.Width = 14] = "Width", t[t.Height = 15] = "Height", t[t.LeftExt_Left = 16] = "LeftExt_Left", t[t.LeftExt_Right = 17] = "LeftExt_Right", t[t.RightExt_Left = 18] = "RightExt_Left", t[t.RightExt_Right = 19] = "RightExt_Right", t[t.TopExt_Top = 20] = "TopExt_Top", t[t.TopExt_Bottom = 21] = "TopExt_Bottom", t[t.BottomExt_Top = 22] = "BottomExt_Top", t[t.BottomExt_Bottom = 23] = "BottomExt_Bottom", t[t.Size = 24] = "Size";
  }(t.RelationType || (t.RelationType = {})), function (t) {
    t[t.None = 0] = "None", t[t.Horizontal = 1] = "Horizontal", t[t.Vertical = 2] = "Vertical", t[t.Radial90 = 3] = "Radial90", t[t.Radial180 = 4] = "Radial180", t[t.Radial360 = 5] = "Radial360";
  }(t.FillMethod || (t.FillMethod = {})), function (t) {
    t[t.Top = 0] = "Top", t[t.Bottom = 1] = "Bottom", t[t.Left = 2] = "Left", t[t.Right = 3] = "Right";
  }(t.FillOrigin || (t.FillOrigin = {})), function (t) {
    t[t.Text = 0] = "Text", t[t.Icon = 1] = "Icon", t[t.Color = 2] = "Color", t[t.OutlineColor = 3] = "OutlineColor", t[t.Playing = 4] = "Playing", t[t.Frame = 5] = "Frame", t[t.DeltaTime = 6] = "DeltaTime", t[t.TimeScale = 7] = "TimeScale", t[t.FontSize = 8] = "FontSize", t[t.Selected = 9] = "Selected";
  }(t.ObjectPropID || (t.ObjectPropID = {}));
}(fgui || (fgui = {})), function (t) {
  var e = function () {
    function e() {
      if (this._x = 0, this._y = 0, this._alpha = 1, this._visible = !0, this._touchable = !0, this._skewX = 0, this._skewY = 0, this._sortingOrder = 0, this._internalVisible = !0, this.sourceWidth = 0, this.sourceHeight = 0, this.initWidth = 0, this.initHeight = 0, this.minWidth = 0, this.minHeight = 0, this.maxWidth = 0, this.maxHeight = 0, this._width = 0, this._height = 0, this._rawWidth = 0, this._rawHeight = 0, this._sizePercentInGroup = 0, this._node = new cc.Node(), -1 == e._defaultGroupIndex) {
        e._defaultGroupIndex = 0;
        for (var i = cc.game.groupList, o = i.length, n = 0; n < o; n++) if (i[n].toLowerCase() == t.UIConfig.defaultUIGroup.toLowerCase()) {
          e._defaultGroupIndex = n;
          break;
        }
      }
      this._node.$gobj = this, this._node.groupIndex = e._defaultGroupIndex, this._node.setAnchorPoint(0, 1), this._node.on(cc.Node.EventType.ANCHOR_CHANGED, this.handleAnchorChanged, this), this._id = this._node.uuid, this._name = "", this._relations = new t.Relations(this), this._gears = new Array(10), this._blendMode = t.BlendMode.Normal, this._partner = this._node.addComponent(a);
    }
    return Object.defineProperty(e.prototype, "id", {
      get: function get() {
        return this._id;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "name", {
      get: function get() {
        return this._name;
      },
      set: function set(t) {
        this._name = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "x", {
      get: function get() {
        return this._x;
      },
      set: function set(t) {
        this.setPosition(t, this._y);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "y", {
      get: function get() {
        return this._y;
      },
      set: function set(t) {
        this.setPosition(this._x, t);
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.setPosition = function (o, r) {
      if (this._x != o || this._y != r) {
        var s = o - this._x,
          h = r - this._y;
        this._x = o, this._y = r, this.handlePositionChanged(), this instanceof t.GGroup && this.moveChildren(s, h), this.updateGear(1), !this._parent || this._parent instanceof t.GList || (this._parent.setBoundsChangedFlag(), this._group && this._group.setBoundsChangedFlag(!0), this._node.emit(t.Event.XY_CHANGED, this)), e.draggingObject != this || i || this.localToGlobalRect(0, 0, this._width, this._height, n);
      }
    }, Object.defineProperty(e.prototype, "xMin", {
      get: function get() {
        return this._pivotAsAnchor ? this._x - this._width * this.node.anchorX : this._x;
      },
      set: function set(t) {
        this._pivotAsAnchor ? this.setPosition(t + this._width * this.node.anchorX, this._y) : this.setPosition(t, this._y);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "yMin", {
      get: function get() {
        return this._pivotAsAnchor ? this._y - this._height * (1 - this.node.anchorY) : this._y;
      },
      set: function set(t) {
        this._pivotAsAnchor ? this.setPosition(this._x, t + this._height * (1 - this.node.anchorY)) : this.setPosition(this._x, t);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "pixelSnapping", {
      get: function get() {
        return this._pixelSnapping;
      },
      set: function set(t) {
        this._pixelSnapping != t && (this._pixelSnapping = t, this.handlePositionChanged());
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.center = function (e) {
      var i;
      i = this._parent ? this.parent : this.root, this.setPosition((i.width - this._width) / 2, (i.height - this._height) / 2), e && (this.addRelation(i, t.RelationType.Center_Center), this.addRelation(i, t.RelationType.Middle_Middle));
    }, Object.defineProperty(e.prototype, "width", {
      get: function get() {
        return this.ensureSizeCorrect(), this._relations.sizeDirty && this._relations.ensureRelationsSizeCorrect(), this._width;
      },
      set: function set(t) {
        this.setSize(t, this._rawHeight);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "height", {
      get: function get() {
        return this.ensureSizeCorrect(), this._relations.sizeDirty && this._relations.ensureRelationsSizeCorrect(), this._height;
      },
      set: function set(t) {
        this.setSize(this._rawWidth, t);
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.setSize = function (e, i, o) {
      if (this._rawWidth != e || this._rawHeight != i) {
        this._rawWidth = e, this._rawHeight = i, e < this.minWidth && (e = this.minWidth), i < this.minHeight && (i = this.minHeight), this.maxWidth > 0 && e > this.maxWidth && (e = this.maxWidth), this.maxHeight > 0 && i > this.maxHeight && (i = this.maxHeight);
        var n = e - this._width,
          r = i - this._height;
        this._width = e, this._height = i, this.handleSizeChanged(), 0 == this.node.anchorX && 1 == this.node.anchorY || this._pivotAsAnchor || o ? this.handlePositionChanged() : this.setPosition(this.x - this.node.anchorX * n, this.y - (1 - this.node.anchorY) * r), this instanceof t.GGroup && this.resizeChildren(n, r), this.updateGear(2), this._parent && (this._relations.onOwnerSizeChanged(n, r, this._pivotAsAnchor || !o), this._parent.setBoundsChangedFlag(), this._group && this._group.setBoundsChangedFlag()), this._node.emit(t.Event.SIZE_CHANGED, this);
      }
    }, e.prototype.makeFullScreen = function () {
      this.setSize(t.GRoot.inst.width, t.GRoot.inst.height);
    }, e.prototype.ensureSizeCorrect = function () {}, Object.defineProperty(e.prototype, "actualWidth", {
      get: function get() {
        return this.width * Math.abs(this._node.scaleX);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "actualHeight", {
      get: function get() {
        return this.height * Math.abs(this._node.scaleY);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "scaleX", {
      get: function get() {
        return this._node.scaleX;
      },
      set: function set(t) {
        this.setScale(t, this._node.scaleY);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "scaleY", {
      get: function get() {
        return this._node.scaleY;
      },
      set: function set(t) {
        this.setScale(this._node.scaleX, t);
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.setScale = function (t, e) {
      this._node.scaleX == t && this._node.scaleY == e || (this._node.setScale(t, e), this.updateGear(2));
    }, Object.defineProperty(e.prototype, "skewX", {
      get: function get() {
        return this._skewX;
      },
      set: function set(t) {
        this.setSkew(t, this._skewY);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "skewY", {
      get: function get() {
        return this._skewY;
      },
      set: function set(t) {
        this.setSkew(this._skewX, t);
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.setSkew = function (t, e) {
      this._skewX == t && this._skewY == e || (this._skewX = t, this._skewY = e, this._node.skewX = t, this._node.skewY = e);
    }, Object.defineProperty(e.prototype, "pivotX", {
      get: function get() {
        return this.node.anchorX;
      },
      set: function set(t) {
        this.node.anchorX = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "pivotY", {
      get: function get() {
        return 1 - this.node.anchorY;
      },
      set: function set(t) {
        this.node.anchorY = 1 - t;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.setPivot = function (t, e, i) {
      this.node.anchorX != t || this.node.anchorY != 1 - e ? (this._pivotAsAnchor = i, this.node.setAnchorPoint(t, 1 - e)) : this._pivotAsAnchor != i && (this._pivotAsAnchor = i, this.handlePositionChanged());
    }, Object.defineProperty(e.prototype, "pivotAsAnchor", {
      get: function get() {
        return this._pivotAsAnchor;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "touchable", {
      get: function get() {
        return this._touchable;
      },
      set: function set(t) {
        this._touchable != t && (this._touchable = t, this.updateGear(3));
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "grayed", {
      get: function get() {
        return this._grayed;
      },
      set: function set(t) {
        this._grayed != t && (this._grayed = t, this.handleGrayedChanged(), this.updateGear(3));
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "enabled", {
      get: function get() {
        return !this._grayed && this._touchable;
      },
      set: function set(t) {
        this.grayed = !t, this.touchable = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "rotation", {
      get: function get() {
        return -this._node.angle;
      },
      set: function set(t) {
        t = -t, this._node.angle != t && (this._node.angle = t, this.updateGear(3));
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "alpha", {
      get: function get() {
        return this._alpha;
      },
      set: function set(e) {
        this._alpha != e && (this._alpha = e, this._node.opacity = 255 * this._alpha, this instanceof t.GGroup && this.handleAlphaChanged(), this.updateGear(3));
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "visible", {
      get: function get() {
        return this._visible;
      },
      set: function set(t) {
        this._visible != t && (this._visible = t, this.handleVisibleChanged(), this._group && this._group.excludeInvisibles && this._group.setBoundsChangedFlag());
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "_finalVisible", {
      get: function get() {
        return this._visible && this._internalVisible && (!this._group || this._group._finalVisible);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "internalVisible3", {
      get: function get() {
        return this._visible && this._internalVisible;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "sortingOrder", {
      get: function get() {
        return this._sortingOrder;
      },
      set: function set(t) {
        if (t < 0 && (t = 0), this._sortingOrder != t) {
          var e = this._sortingOrder;
          this._sortingOrder = t, this._parent && this._parent.childSortingOrderChanged(this, e, this._sortingOrder);
        }
        this._node.zIndex = t;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.requestFocus = function () {}, Object.defineProperty(e.prototype, "tooltips", {
      get: function get() {
        return this._tooltips;
      },
      set: function set(e) {
        this._tooltips && (this._node.off(t.Event.ROLL_OVER, this.onRollOver, this), this._node.off(t.Event.ROLL_OUT, this.onRollOut, this)), this._tooltips = e, this._tooltips && (this._node.on(t.Event.ROLL_OVER, this.onRollOver, this), this._node.on(t.Event.ROLL_OUT, this.onRollOut, this));
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "blendMode", {
      get: function get() {
        return this._blendMode;
      },
      set: function set(e) {
        this._blendMode != e && (this._blendMode = e, t.BlendModeUtils.apply(this._node, e));
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "onStage", {
      get: function get() {
        return this._node && this._node.activeInHierarchy;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "resourceURL", {
      get: function get() {
        return this.packageItem ? "ui://" + this.packageItem.owner.id + this.packageItem.id : null;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "group", {
      get: function get() {
        return this._group;
      },
      set: function set(t) {
        this._group != t && (this._group && this._group.setBoundsChangedFlag(), this._group = t, this._group && this._group.setBoundsChangedFlag());
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.getGear = function (e) {
      var i = this._gears[e];
      return i || (this._gears[e] = i = t.GearBase.create(this, e)), i;
    }, e.prototype.updateGear = function (t) {
      if (!this._underConstruct && !this._gearLocked) {
        var e = this._gears[t];
        e && e.controller && e.updateState();
      }
    }, e.prototype.checkGearController = function (t, e) {
      return this._gears[t] && this._gears[t].controller == e;
    }, e.prototype.updateGearFromRelations = function (t, e, i) {
      this._gears[t] && this._gears[t].updateFromRelations(e, i);
    }, e.prototype.addDisplayLock = function () {
      var t = this._gears[0];
      if (t && t.controller) {
        var e = t.addLock();
        return this.checkGearDisplay(), e;
      }
      return 0;
    }, e.prototype.releaseDisplayLock = function (t) {
      var e = this._gears[0];
      e && e.controller && (e.releaseLock(t), this.checkGearDisplay());
    }, e.prototype.checkGearDisplay = function () {
      if (!this._handlingController) {
        var t = null == this._gears[0] || this._gears[0].connected;
        this._gears[8] && (t = this._gears[8].evaluate(t)), t != this._internalVisible && (this._internalVisible = t, this.handleVisibleChanged(), this._group && this._group.excludeInvisibles && this._group.setBoundsChangedFlag());
      }
    }, Object.defineProperty(e.prototype, "gearXY", {
      get: function get() {
        return this.getGear(1);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "gearSize", {
      get: function get() {
        return this.getGear(2);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "gearLook", {
      get: function get() {
        return this.getGear(3);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "relations", {
      get: function get() {
        return this._relations;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.addRelation = function (t, e, i) {
      this._relations.add(t, e, i);
    }, e.prototype.removeRelation = function (t, e) {
      this._relations.remove(t, e);
    }, Object.defineProperty(e.prototype, "node", {
      get: function get() {
        return this._node;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "parent", {
      get: function get() {
        return this._parent;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.removeFromParent = function () {
      this._parent && this._parent.removeChild(this);
    }, e.prototype.findParent = function () {
      if (this._parent) return this._parent;
      for (var t = this._node.parent; t;) {
        var e = t.$gobj;
        if (e) return e;
        t = t.parent;
      }
      return null;
    }, Object.defineProperty(e.prototype, "root", {
      get: function get() {
        if (this instanceof t.GRoot) return this;
        for (var e = this._parent; e;) {
          if (e instanceof t.GRoot) return e;
          e = e.parent;
        }
        return t.GRoot.inst;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "asCom", {
      get: function get() {
        return this;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "asButton", {
      get: function get() {
        return this;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "asLabel", {
      get: function get() {
        return this;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "asProgress", {
      get: function get() {
        return this;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "asTextField", {
      get: function get() {
        return this;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "asRichTextField", {
      get: function get() {
        return this;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "asTextInput", {
      get: function get() {
        return this;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "asLoader", {
      get: function get() {
        return this;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "asList", {
      get: function get() {
        return this;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "asTree", {
      get: function get() {
        return this;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "asGraph", {
      get: function get() {
        return this;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "asGroup", {
      get: function get() {
        return this;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "asSlider", {
      get: function get() {
        return this;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "asComboBox", {
      get: function get() {
        return this;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "asImage", {
      get: function get() {
        return this;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "asMovieClip", {
      get: function get() {
        return this;
      },
      enumerable: !1,
      configurable: !0
    }), e.cast = function (t) {
      return t.$gobj;
    }, Object.defineProperty(e.prototype, "text", {
      get: function get() {
        return null;
      },
      set: function set() {},
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "icon", {
      get: function get() {
        return null;
      },
      set: function set() {},
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "treeNode", {
      get: function get() {
        return this._treeNode;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.dispose = function () {
      var t = this._node;
      if (t) {
        this.removeFromParent(), this._relations.dispose(), this._node = null, t.destroy();
        for (var e = 0; e < 10; e++) {
          var i = this._gears[e];
          i && i.dispose();
        }
      }
    }, e.prototype.onEnable = function () {}, e.prototype.onDisable = function () {}, e.prototype.onUpdate = function () {}, e.prototype.onDestroy = function () {}, e.prototype.onClick = function (e, i) {
      this._node.on(t.Event.CLICK, e, i);
    }, e.prototype.onceClick = function (e, i) {
      this._node.once(t.Event.CLICK, e, i);
    }, e.prototype.offClick = function (e, i) {
      this._node.off(t.Event.CLICK, e, i);
    }, e.prototype.clearClick = function () {
      this._node.off(t.Event.CLICK);
    }, e.prototype.hasClickListener = function () {
      return this._node.hasEventListener(t.Event.CLICK);
    }, e.prototype.on = function (e, i, o) {
      e != t.Event.DISPLAY && e != t.Event.UNDISPLAY || (this._partner._emitDisplayEvents = !0), this._node.on(e, i, o);
    }, e.prototype.once = function (e, i, o) {
      e != t.Event.DISPLAY && e != t.Event.UNDISPLAY || (this._partner._emitDisplayEvents = !0), this._node.once(e, i, o);
    }, e.prototype.off = function (t, e, i) {
      this._node.off(t, e, i);
    }, Object.defineProperty(e.prototype, "draggable", {
      get: function get() {
        return this._draggable;
      },
      set: function set(t) {
        this._draggable != t && (this._draggable = t, this.initDrag());
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "dragBounds", {
      get: function get() {
        return this._dragBounds;
      },
      set: function set(t) {
        this._dragBounds = t;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.startDrag = function (t) {
      this._node.activeInHierarchy && this.dragBegin(t);
    }, e.prototype.stopDrag = function () {
      this.dragEnd();
    }, Object.defineProperty(e.prototype, "dragging", {
      get: function get() {
        return e.draggingObject == this;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.localToGlobal = function (e, i, o) {
      return e = e || 0, i = i || 0, (o = o || new cc.Vec2()).x = e, o.y = i, o.y = -o.y, this._pivotAsAnchor || (o.x -= this.node.anchorX * this._width, o.y += (1 - this.node.anchorY) * this._height), this._node.convertToWorldSpaceAR(o, o), o.y = t.GRoot.inst.height - o.y, o;
    }, e.prototype.globalToLocal = function (e, i, o) {
      return e = e || 0, i = i || 0, (o = o || new cc.Vec2()).x = e, o.y = t.GRoot.inst.height - i, this._node.convertToNodeSpaceAR(o, o), this._pivotAsAnchor || (o.x += this._node.anchorX * this._width, o.y -= (1 - this._node.anchorY) * this._height), o.y = -o.y, o;
    }, e.prototype.localToGlobalRect = function (t, e, i, o, n) {
      t = t || 0, e = e || 0, i = i || 0, o = o || 0, n = n || new cc.Rect();
      var r = this.localToGlobal(t, e);
      return n.x = r.x, n.y = r.y, r = this.localToGlobal(t + i, e + o, r), n.xMax = r.x, n.yMax = r.y, n;
    }, e.prototype.globalToLocalRect = function (t, e, i, o, n) {
      t = t || 0, e = e || 0, i = i || 0, o = o || 0, n = n || new cc.Rect();
      var r = this.globalToLocal(t, e);
      return n.x = r.x, n.y = r.y, r = this.globalToLocal(t + i, e + o, r), n.xMax = r.x, n.yMax = r.y, n;
    }, e.prototype.handleControllerChanged = function (t) {
      this._handlingController = !0;
      for (var e = 0; e < 10; e++) {
        var i = this._gears[e];
        i && i.controller == t && i.apply();
      }
      this._handlingController = !1, this.checkGearDisplay();
    }, e.prototype.handleAnchorChanged = function () {
      this.handlePositionChanged();
    }, e.prototype.handlePositionChanged = function () {
      var t = this._x,
        e = -this._y;
      this._pivotAsAnchor || (t += this.node.anchorX * this._width, e -= (1 - this.node.anchorY) * this._height), this._pixelSnapping && (t = Math.round(t), e = Math.round(e)), this._node.setPosition(t, e);
    }, e.prototype.handleSizeChanged = function () {
      this._node.setContentSize(this._width, this._height);
    }, e.prototype.handleGrayedChanged = function () {}, e.prototype.handleVisibleChanged = function () {
      this._node.active = this._finalVisible, this instanceof t.GGroup && this.handleVisibleChanged(), this._parent && this._parent.setBoundsChangedFlag();
    }, e.prototype.hitTest = function (t, e) {
      return null == e && (e = !0), !e || !this._touchDisabled && this._touchable && this._node.activeInHierarchy ? (this._hitTestPt || (this._hitTestPt = new cc.Vec2()), this.globalToLocal(t.x, t.y, this._hitTestPt), this._pivotAsAnchor && (this._hitTestPt.x += this.node.anchorX * this._width, this._hitTestPt.y += (1 - this.node.anchorY) * this._height), this._hitTest(this._hitTestPt, t)) : null;
    }, e.prototype._hitTest = function (t) {
      return t.x >= 0 && t.y >= 0 && t.x < this._width && t.y < this._height ? this : null;
    }, e.prototype.getProp = function (e) {
      switch (e) {
        case t.ObjectPropID.Text:
          return this.text;
        case t.ObjectPropID.Icon:
          return this.icon;
        case t.ObjectPropID.Color:
        case t.ObjectPropID.OutlineColor:
          return null;
        case t.ObjectPropID.Playing:
          return !1;
        case t.ObjectPropID.Frame:
        case t.ObjectPropID.DeltaTime:
          return 0;
        case t.ObjectPropID.TimeScale:
          return 1;
        case t.ObjectPropID.FontSize:
          return 0;
        case t.ObjectPropID.Selected:
          return !1;
        default:
          return;
      }
    }, e.prototype.setProp = function (e, i) {
      switch (e) {
        case t.ObjectPropID.Text:
          this.text = i;
          break;
        case t.ObjectPropID.Icon:
          this.icon = i;
      }
    }, e.prototype.constructFromResource = function () {}, e.prototype.setup_beforeAdd = function (t, e) {
      var i, o;
      t.seek(e, 0), t.skip(5), this._id = t.readS(), this._name = t.readS(), i = t.readInt(), o = t.readInt(), this.setPosition(i, o), t.readBool() && (this.initWidth = t.readInt(), this.initHeight = t.readInt(), this.setSize(this.initWidth, this.initHeight, !0)), t.readBool() && (this.minWidth = t.readInt(), this.maxWidth = t.readInt(), this.minHeight = t.readInt(), this.maxHeight = t.readInt()), t.readBool() && (i = t.readFloat(), o = t.readFloat(), this.setScale(i, o)), t.readBool() && (i = t.readFloat(), o = t.readFloat(), this.setSkew(i, o)), t.readBool() && (i = t.readFloat(), o = t.readFloat(), this.setPivot(i, o, t.readBool())), 1 != (i = t.readFloat()) && (this.alpha = i), 0 != (i = t.readFloat()) && (this.rotation = i), t.readBool() || (this.visible = !1), t.readBool() || (this.touchable = !1), t.readBool() && (this.grayed = !0), this.blendMode = t.readByte(), t.readByte();
      var n = t.readS();
      null != n && (this.data = n);
    }, e.prototype.setup_afterAdd = function (t, e) {
      t.seek(e, 1);
      var i = t.readS();
      null != i && (this.tooltips = i);
      var o = t.readShort();
      o >= 0 && (this.group = this.parent.getChildAt(o)), t.seek(e, 2);
      for (var n = t.readShort(), r = 0; r < n; r++) {
        var s = t.readShort();
        s += t.position, this.getGear(t.readByte()).setup(t), t.position = s;
      }
    }, e.prototype.onRollOver = function () {
      this.root.showTooltips(this.tooltips);
    }, e.prototype.onRollOut = function () {
      this.root.hideTooltips();
    }, e.prototype.initDrag = function () {
      this._draggable ? (this.on(t.Event.TOUCH_BEGIN, this.onTouchBegin_0, this), this.on(t.Event.TOUCH_MOVE, this.onTouchMove_0, this), this.on(t.Event.TOUCH_END, this.onTouchEnd_0, this)) : (this.off(t.Event.TOUCH_BEGIN, this.onTouchBegin_0, this), this.off(t.Event.TOUCH_MOVE, this.onTouchMove_0, this), this.off(t.Event.TOUCH_END, this.onTouchEnd_0, this));
    }, e.prototype.dragBegin = function (i) {
      if (e.draggingObject) {
        var r = e.draggingObject;
        r.stopDrag(), e.draggingObject = null, r._node.emit(t.Event.DRAG_END);
      }
      null == i && (i = t.GRoot.inst.inputProcessor.getAllTouches()[0]), o.set(t.GRoot.inst.getTouchPosition(i)), this.localToGlobalRect(0, 0, this._width, this._height, n), e.draggingObject = this, this._dragTesting = !0, t.GRoot.inst.inputProcessor.addTouchMonitor(i, this), this.on(t.Event.TOUCH_MOVE, this.onTouchMove_0, this), this.on(t.Event.TOUCH_END, this.onTouchEnd_0, this);
    }, e.prototype.dragEnd = function () {
      e.draggingObject == this && (this._dragTesting = !1, e.draggingObject = null), h = !1;
    }, e.prototype.onTouchBegin_0 = function (t) {
      null == this._dragStartPos && (this._dragStartPos = new cc.Vec2()), this._dragStartPos.set(t.pos), this._dragTesting = !0, t.captureTouch();
    }, e.prototype.onTouchMove_0 = function (a) {
      if (e.draggingObject != this && this._draggable && this._dragTesting) {
        var l = t.UIConfig.touchDragSensitivity;
        if (this._dragStartPos && Math.abs(this._dragStartPos.x - a.pos.x) < l && Math.abs(this._dragStartPos.y - a.pos.y) < l) return;
        this._dragTesting = !1, h = !0, this._node.emit(t.Event.DRAG_START, a), h && this.dragBegin(a.touchId);
      }
      if (e.draggingObject == this) {
        var c = a.pos.x - o.x + n.x,
          u = a.pos.y - o.y + n.y;
        if (this._dragBounds) {
          var _ = t.GRoot.inst.localToGlobalRect(this._dragBounds.x, this._dragBounds.y, this._dragBounds.width, this._dragBounds.height, s);
          c < _.x ? c = _.x : c + n.width > _.xMax && (c = _.xMax - n.width) < _.x && (c = _.x), u < _.y ? u = _.y : u + n.height > _.yMax && (u = _.yMax - n.height) < _.y && (u = _.y);
        }
        i = !0;
        var p = this.parent.globalToLocal(c, u, r);
        this.setPosition(Math.round(p.x), Math.round(p.y)), i = !1, this._node.emit(t.Event.DRAG_MOVE, a);
      }
    }, e.prototype.onTouchEnd_0 = function (i) {
      e.draggingObject == this && (e.draggingObject = null, this._node.emit(t.Event.DRAG_END, i));
    }, e._defaultGroupIndex = -1, e;
  }();
  t.GObject = e;
  var i,
    o = new cc.Vec2(),
    n = new cc.Rect(),
    r = new cc.Vec2(),
    s = new cc.Rect(),
    h = !1,
    a = function (e) {
      function i() {
        var t = null !== e && e.apply(this, arguments) || this;
        return t._emitDisplayEvents = !1, t;
      }
      return __extends(i, e), i.prototype.callLater = function (t, e) {
        cc.director.getScheduler().isScheduled(t, this) || this.scheduleOnce(t, e);
      }, i.prototype.onClickLink = function (e, i) {
        this.node.emit(t.Event.LINK, i, e);
      }, i.prototype.onEnable = function () {
        this.node.$gobj.onEnable(), this._emitDisplayEvents && this.node.emit(t.Event.DISPLAY);
      }, i.prototype.onDisable = function () {
        this.node.$gobj.onDisable(), this._emitDisplayEvents && this.node.emit(t.Event.UNDISPLAY);
      }, i.prototype.update = function (t) {
        this.node.$gobj.onUpdate(t);
      }, i.prototype.onDestroy = function () {
        this.node.$gobj.onDestroy();
      }, i;
    }(cc.Component);
  t.GObjectPartner = a;
}(fgui || (fgui = {})), function (t) {
  var e = function (e) {
    function o() {
      var i = e.call(this) || this;
      return i._sortingChildCount = 0, i._childrenRenderOrder = t.ChildrenRenderOrder.Ascent, i._apexIndex = 0, i._node.name = "GComponent", i._children = new Array(), i._controllers = new Array(), i._transitions = new Array(), i._margin = new t.Margin(), i._alignOffset = new cc.Vec2(), i._container = new cc.Node("Container"), i._container.setAnchorPoint(0, 1), i._node.addChild(i._container), i;
    }
    return __extends(o, e), o.prototype.dispose = function () {
      var t, i;
      for (i = this._transitions.length, t = 0; t < i; ++t) this._transitions[t].dispose();
      for (i = this._controllers.length, t = 0; t < i; ++t) this._controllers[t].dispose();
      for (this._scrollPane && this._scrollPane.destroy(), t = (i = this._children.length) - 1; t >= 0; --t) {
        var o = this._children[t];
        o._parent = null, o.dispose();
      }
      this._boundsChanged = !1, e.prototype.dispose.call(this);
    }, Object.defineProperty(o.prototype, "displayListContainer", {
      get: function get() {
        return this._container;
      },
      enumerable: !1,
      configurable: !0
    }), o.prototype.addChild = function (t) {
      return this.addChildAt(t, this._children.length), t;
    }, o.prototype.addChildAt = function (t, e) {
      if (!t) throw "child is null";
      var i = this._children.length;
      if (e >= 0 && e <= i) {
        if (t.parent == this) this.setChildIndex(t, e);else {
          t.removeFromParent(), t._parent = this;
          var o = this._children.length;
          0 != t.sortingOrder ? (this._sortingChildCount++, e = this.getInsertPosForSortingChild(t)) : this._sortingChildCount > 0 && e > o - this._sortingChildCount && (e = o - this._sortingChildCount), e == o ? this._children.push(t) : this._children.splice(e, 0, t), this.onChildAdd(t, e), this.setBoundsChangedFlag();
        }
        return t;
      }
      throw "Invalid child index";
    }, o.prototype.getInsertPosForSortingChild = function (t) {
      var e = this._children.length,
        i = 0;
      for (i = 0; i < e; i++) {
        var o = this._children[i];
        if (o != t && t.sortingOrder < o.sortingOrder) break;
      }
      return i;
    }, o.prototype.removeChild = function (t, e) {
      var i = this._children.indexOf(t);
      return -1 != i && this.removeChildAt(i, e), t;
    }, o.prototype.removeChildAt = function (e, i) {
      if (e >= 0 && e < this.numChildren) {
        var o = this._children[e];
        return o._parent = null, 0 != o.sortingOrder && this._sortingChildCount--, this._children.splice(e, 1), o.group = null, this._container.removeChild(o.node), this._childrenRenderOrder == t.ChildrenRenderOrder.Arch && this._partner.callLater(this.buildNativeDisplayList), i ? o.dispose() : o.node.parent = null, this.setBoundsChangedFlag(), o;
      }
      throw "Invalid child index";
    }, o.prototype.removeChildren = function (t, e, i) {
      null == t && (t = 0), null == e && (e = -1), (e < 0 || e >= this.numChildren) && (e = this.numChildren - 1);
      for (var o = t; o <= e; ++o) this.removeChildAt(t, i);
    }, o.prototype.getChildAt = function (t) {
      if (t >= 0 && t < this.numChildren) return this._children[t];
      throw "Invalid child index";
    }, o.prototype.getChild = function (t) {
      for (var e = this._children.length, i = 0; i < e; ++i) if (this._children[i].name == t) return this._children[i];
      return null;
    }, o.prototype.getChildByPath = function (t) {
      for (var e, i = t.split("."), n = i.length, r = this, s = 0; s < n && (e = r.getChild(i[s])); ++s) if (s != n - 1) {
        if (!(e instanceof o)) {
          e = null;
          break;
        }
        r = e;
      }
      return e;
    }, o.prototype.getVisibleChild = function (t) {
      for (var e = this._children.length, i = 0; i < e; ++i) {
        var o = this._children[i];
        if (o._finalVisible && o.name == t) return o;
      }
      return null;
    }, o.prototype.getChildInGroup = function (t, e) {
      for (var i = this._children.length, o = 0; o < i; ++o) {
        var n = this._children[o];
        if (n.group == e && n.name == t) return n;
      }
      return null;
    }, o.prototype.getChildById = function (t) {
      for (var e = this._children.length, i = 0; i < e; ++i) if (this._children[i]._id == t) return this._children[i];
      return null;
    }, o.prototype.getChildIndex = function (t) {
      return this._children.indexOf(t);
    }, o.prototype.setChildIndex = function (t, e) {
      var i = this._children.indexOf(t);
      if (-1 == i) throw "Not a child of this container";
      if (0 == t.sortingOrder) {
        var o = this._children.length;
        this._sortingChildCount > 0 && e > o - this._sortingChildCount - 1 && (e = o - this._sortingChildCount - 1), this._setChildIndex(t, i, e);
      }
    }, o.prototype.setChildIndexBefore = function (t, e) {
      var i = this._children.indexOf(t);
      if (-1 == i) throw "Not a child of this container";
      if (0 != t.sortingOrder) return i;
      var o = this._children.length;
      return this._sortingChildCount > 0 && e > o - this._sortingChildCount - 1 && (e = o - this._sortingChildCount - 1), i < e ? this._setChildIndex(t, i, e - 1) : this._setChildIndex(t, i, e);
    }, o.prototype._setChildIndex = function (e, i, o) {
      var n = this._children.length;
      return o > n && (o = n), i == o ? i : (this._children.splice(i, 1), this._children.splice(o, 0, e), this._childrenRenderOrder == t.ChildrenRenderOrder.Ascent ? e.node.setSiblingIndex(o) : this._childrenRenderOrder == t.ChildrenRenderOrder.Descent ? e.node.setSiblingIndex(n - o) : this._partner.callLater(this.buildNativeDisplayList), this.setBoundsChangedFlag(), o);
    }, o.prototype.swapChildren = function (t, e) {
      var i = this._children.indexOf(t),
        o = this._children.indexOf(e);
      if (-1 == i || -1 == o) throw "Not a child of this container";
      this.swapChildrenAt(i, o);
    }, o.prototype.swapChildrenAt = function (t, e) {
      var i = this._children[t],
        o = this._children[e];
      this.setChildIndex(i, e), this.setChildIndex(o, t);
    }, Object.defineProperty(o.prototype, "numChildren", {
      get: function get() {
        return this._children.length;
      },
      enumerable: !1,
      configurable: !0
    }), o.prototype.isAncestorOf = function (t) {
      if (null == t) return !1;
      for (var e = t.parent; e;) {
        if (e == this) return !0;
        e = e.parent;
      }
      return !1;
    }, o.prototype.addController = function (t) {
      this._controllers.push(t), t.parent = this, this.applyController(t);
    }, o.prototype.getControllerAt = function (t) {
      return this._controllers[t];
    }, o.prototype.getController = function (t) {
      for (var e = this._controllers.length, i = 0; i < e; ++i) {
        var o = this._controllers[i];
        if (o.name == t) return o;
      }
      return null;
    }, o.prototype.removeController = function (t) {
      var e = this._controllers.indexOf(t);
      if (-1 == e) throw "controller not exists";
      t.parent = null, this._controllers.splice(e, 1);
      for (var i = this._children.length, o = 0; o < i; o++) this._children[o].handleControllerChanged(t);
    }, Object.defineProperty(o.prototype, "controllers", {
      get: function get() {
        return this._controllers;
      },
      enumerable: !1,
      configurable: !0
    }), o.prototype.onChildAdd = function (e, i) {
      if (e.node.parent = this._container, e.node.active = e._finalVisible, !this._buildingDisplayList) {
        var o = this._children.length;
        this._childrenRenderOrder == t.ChildrenRenderOrder.Ascent ? e.node.setSiblingIndex(i) : this._childrenRenderOrder == t.ChildrenRenderOrder.Descent ? e.node.setSiblingIndex(o - i) : this._partner.callLater(this.buildNativeDisplayList);
      }
    }, o.prototype.buildNativeDisplayList = function (e) {
      if (isNaN(e)) {
        var i = this._children.length;
        if (0 != i) switch (this._childrenRenderOrder) {
          case t.ChildrenRenderOrder.Ascent:
            for (var o = 0, n = 0; n < i; n++) this._children[n].node.setSiblingIndex(o++);
            break;
          case t.ChildrenRenderOrder.Descent:
            for (o = 0, n = i - 1; n >= 0; n--) this._children[n].node.setSiblingIndex(o++);
            break;
          case t.ChildrenRenderOrder.Arch:
            for (o = 0, n = 0; n < this._apexIndex; n++) this._children[n].node.setSiblingIndex(o++);
            for (n = i - 1; n >= this._apexIndex; n--) this._children[n].node.setSiblingIndex(o++);
        }
      } else this.node.$gobj.buildNativeDisplayList();
    }, o.prototype.applyController = function (t) {
      this._applyingController = t;
      for (var e = this._children.length, i = 0; i < e; i++) this._children[i].handleControllerChanged(t);
      this._applyingController = null, t.runActions();
    }, o.prototype.applyAllControllers = function () {
      for (var t = this._controllers.length, e = 0; e < t; ++e) this.applyController(this._controllers[e]);
    }, o.prototype.adjustRadioGroupDepth = function (e, i) {
      var o,
        n,
        r = this._children.length,
        s = -1,
        h = -1;
      for (o = 0; o < r; o++) (n = this._children[o]) == e ? s = o : n instanceof t.GButton && n.relatedController == i && o > h && (h = o);
      s < h && (this._applyingController && this._children[h].handleControllerChanged(this._applyingController), this.swapChildrenAt(s, h));
    }, o.prototype.getTransitionAt = function (t) {
      return this._transitions[t];
    }, o.prototype.getTransition = function (t) {
      for (var e = this._transitions.length, i = 0; i < e; ++i) {
        var o = this._transitions[i];
        if (o.name == t) return o;
      }
      return null;
    }, o.prototype.isChildInView = function (t) {
      return this._rectMask ? t.x + t.width >= 0 && t.x <= this.width && t.y + t.height >= 0 && t.y <= this.height : !this._scrollPane || this._scrollPane.isChildInView(t);
    }, o.prototype.getFirstChildInView = function () {
      for (var t = this._children.length, e = 0; e < t; ++e) {
        var i = this._children[e];
        if (this.isChildInView(i)) return e;
      }
      return -1;
    }, Object.defineProperty(o.prototype, "scrollPane", {
      get: function get() {
        return this._scrollPane;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(o.prototype, "opaque", {
      get: function get() {
        return this._opaque;
      },
      set: function set(t) {
        this._opaque = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(o.prototype, "margin", {
      get: function get() {
        return this._margin;
      },
      set: function set(t) {
        this._margin.copy(t), this.handleSizeChanged();
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(o.prototype, "childrenRenderOrder", {
      get: function get() {
        return this._childrenRenderOrder;
      },
      set: function set(t) {
        this._childrenRenderOrder != t && (this._childrenRenderOrder = t, this.buildNativeDisplayList());
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(o.prototype, "apexIndex", {
      get: function get() {
        return this._apexIndex;
      },
      set: function set(e) {
        this._apexIndex != e && (this._apexIndex = e, this._childrenRenderOrder == t.ChildrenRenderOrder.Arch && this.buildNativeDisplayList());
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(o.prototype, "mask", {
      get: function get() {
        return this._maskContent;
      },
      set: function set(t) {
        this.setMask(t, !1);
      },
      enumerable: !1,
      configurable: !0
    }), o.prototype.setMask = function (e, i) {
      if (this._maskContent && (this._maskContent.node.off(cc.Node.EventType.POSITION_CHANGED, this.onMaskContentChanged, this), this._maskContent.node.off(cc.Node.EventType.SIZE_CHANGED, this.onMaskContentChanged, this), this._maskContent.node.off(cc.Node.EventType.SCALE_CHANGED, this.onMaskContentChanged, this), this._maskContent.node.off(cc.Node.EventType.ANCHOR_CHANGED, this.onMaskContentChanged, this), this._maskContent.visible = !0), this._maskContent = e, this._maskContent) {
        if (!(e instanceof t.GImage || e instanceof t.GGraph)) return;
        if (!this._customMask) {
          var o = new cc.Node("Mask");
          o.parent = this._node, this._scrollPane ? this._container.parent.parent = o : this._container.parent = o, this._customMask = o.addComponent(cc.Mask);
        }
        e.visible = !1, e.node.on(cc.Node.EventType.POSITION_CHANGED, this.onMaskContentChanged, this), e.node.on(cc.Node.EventType.SIZE_CHANGED, this.onMaskContentChanged, this), e.node.on(cc.Node.EventType.SCALE_CHANGED, this.onMaskContentChanged, this), e.node.on(cc.Node.EventType.ANCHOR_CHANGED, this.onMaskContentChanged, this), this._customMask.inverted = i, this._node.activeInHierarchy ? this.onMaskReady() : this.on(t.Event.DISPLAY, this.onMaskReady, this), this.onMaskContentChanged(), this._scrollPane ? this._scrollPane.adjustMaskContainer() : this._container.setPosition(0, 0);
      } else this._customMask && (this._scrollPane ? this._container.parent.parent = this._node : this._container.parent = this._node, this._customMask.node.destroy(), this._customMask = null, this._scrollPane ? this._scrollPane.adjustMaskContainer() : this._container.setPosition(this._pivotCorrectX, this._pivotCorrectY));
    }, o.prototype.onMaskReady = function () {
      this.off(t.Event.DISPLAY, this.onMaskReady, this), this._maskContent instanceof t.GImage ? (this._customMask.type = cc.Mask.Type.IMAGE_STENCIL, this._customMask.alphaThreshold = 1e-4, this._customMask.spriteFrame = this._maskContent._content.spriteFrame) : this._maskContent instanceof t.GGraph && (2 == this._maskContent.type ? this._customMask.type = cc.Mask.Type.ELLIPSE : this._customMask.type = cc.Mask.Type.RECT);
    }, o.prototype.onMaskContentChanged = function () {
      var t = this._customMask.node,
        e = this._maskContent.node,
        i = e.width * e.scaleX,
        o = e.height * e.scaleY;
      t.setContentSize(i, o);
      var n = e.x - e.anchorX * i,
        r = e.y - e.anchorY * o;
      t.setAnchorPoint(-n / t.width, -r / t.height), t.setPosition(this._pivotCorrectX, this._pivotCorrectY);
    }, Object.defineProperty(o.prototype, "_pivotCorrectX", {
      get: function get() {
        return -this.pivotX * this._width + this._margin.left;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(o.prototype, "_pivotCorrectY", {
      get: function get() {
        return this.pivotY * this._height - this._margin.top;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(o.prototype, "baseUserData", {
      get: function get() {
        var t = this.packageItem.rawData;
        return t.seek(0, 4), t.readS();
      },
      enumerable: !1,
      configurable: !0
    }), o.prototype.setupScroll = function (e) {
      this._scrollPane = this._node.addComponent(t.ScrollPane), this._scrollPane.setup(e);
    }, o.prototype.setupOverflow = function (e) {
      e == t.OverflowType.Hidden && (this._rectMask = this._container.addComponent(cc.Mask)), this._margin.isNone || this.handleSizeChanged();
    }, o.prototype.handleAnchorChanged = function () {
      e.prototype.handleAnchorChanged.call(this), this._customMask ? this._customMask.node.setPosition(this._pivotCorrectX, this._pivotCorrectY) : this._scrollPane ? this._scrollPane.adjustMaskContainer() : this._container.setPosition(this._pivotCorrectX + this._alignOffset.x, this._pivotCorrectY - this._alignOffset.y);
    }, o.prototype.handleSizeChanged = function () {
      e.prototype.handleSizeChanged.call(this), this._customMask ? this._customMask.node.setPosition(this._pivotCorrectX, this._pivotCorrectY) : this._scrollPane || this._container.setPosition(this._pivotCorrectX, this._pivotCorrectY), this._scrollPane ? this._scrollPane.onOwnerSizeChanged() : this._container.setContentSize(this.viewWidth, this.viewHeight);
    }, o.prototype.handleGrayedChanged = function () {
      var t = this.getController("grayed");
      if (t) t.selectedIndex = this.grayed ? 1 : 0;else for (var e = this.grayed, i = this._children.length, o = 0; o < i; ++o) this._children[o].grayed = e;
    }, o.prototype.handleControllerChanged = function (t) {
      e.prototype.handleControllerChanged.call(this, t), this._scrollPane && this._scrollPane.handleControllerChanged(t);
    }, o.prototype._hitTest = function (e, o) {
      if (this._customMask && (i.set(o), i.y = t.GRoot.inst.height - o.y, !this._customMask._hitTest(i))) return null;
      if (this.hitArea) {
        if (!this.hitArea.hitTest(e, o)) return null;
      } else if (this._rectMask) {
        i.set(e), i.x += this._container.x, i.y += this._container.y;
        var n = this._container.getContentSize();
        if (i.x < 0 || i.y < 0 || i.x >= n.width || i.y >= n.height) return null;
      }
      if (this._scrollPane) {
        var r = this._scrollPane.hitTest(e, o);
        if (!r) return null;
        if (r != this) return r;
      }
      for (var s = null, h = this._children.length - 1; h >= 0; h--) {
        var a = this._children[h];
        if (this._maskContent != a && !a._touchDisabled && (s = a.hitTest(o))) break;
      }
      return !s && this._opaque && (this.hitArea || e.x >= 0 && e.y >= 0 && e.x < this._width && e.y < this._height) && (s = this), s;
    }, o.prototype.setBoundsChangedFlag = function () {
      (this._scrollPane || this._trackBounds) && (this._boundsChanged || (this._boundsChanged = !0, this._partner.callLater(this.refresh)));
    }, o.prototype.refresh = function (t) {
      if (isNaN(t)) {
        if (this._boundsChanged) {
          var e = this._children.length;
          if (e > 0) for (var i = 0; i < e; i++) this._children[i].ensureSizeCorrect();
          this.updateBounds();
        }
      } else this.node.$gobj.refresh();
    }, o.prototype.ensureBoundsCorrect = function () {
      var t = this._children.length;
      if (t > 0) for (var e = 0; e < t; e++) this._children[e].ensureSizeCorrect();
      this._boundsChanged && this.updateBounds();
    }, o.prototype.updateBounds = function () {
      var t = 0,
        e = 0,
        i = 0,
        o = 0,
        n = this._children.length;
      if (n > 0) {
        t = Number.POSITIVE_INFINITY, e = Number.POSITIVE_INFINITY;
        var r = Number.NEGATIVE_INFINITY,
          s = Number.NEGATIVE_INFINITY,
          h = 0,
          a = 0;
        for (a = 0; a < n; a++) {
          var l = this._children[a];
          (h = l.x) < t && (t = h), (h = l.y) < e && (e = h), (h = l.x + l.actualWidth) > r && (r = h), (h = l.y + l.actualHeight) > s && (s = h);
        }
        i = r - t, o = s - e;
      }
      this.setBounds(t, e, i, o);
    }, o.prototype.setBounds = function (t, e, i, o) {
      void 0 === o && (o = 0), this._boundsChanged = !1, this._scrollPane && this._scrollPane.setContentSize(Math.round(t + i), Math.round(e + o));
    }, Object.defineProperty(o.prototype, "viewWidth", {
      get: function get() {
        return this._scrollPane ? this._scrollPane.viewWidth : this.width - this._margin.left - this._margin.right;
      },
      set: function set(t) {
        this._scrollPane ? this._scrollPane.viewWidth = t : this.width = t + this._margin.left + this._margin.right;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(o.prototype, "viewHeight", {
      get: function get() {
        return this._scrollPane ? this._scrollPane.viewHeight : this.height - this._margin.top - this._margin.bottom;
      },
      set: function set(t) {
        this._scrollPane ? this._scrollPane.viewHeight = t : this.height = t + this._margin.top + this._margin.bottom;
      },
      enumerable: !1,
      configurable: !0
    }), o.prototype.getSnappingPosition = function (t, e, i) {
      i || (i = new cc.Vec2());
      var o = this._children.length;
      if (0 == o) return i.x = 0, i.y = 0, i;
      this.ensureBoundsCorrect();
      var n = null,
        r = null,
        s = 0;
      if (0 != e) {
        for (; s < o; s++) if (e < (n = this._children[s]).y) {
          if (0 == s) {
            e = 0;
            break;
          }
          e = e < (r = this._children[s - 1]).y + r.actualHeight / 2 ? r.y : n.y;
          break;
        }
        s == o && (e = n.y);
      }
      if (0 != t) {
        for (s > 0 && s--; s < o; s++) if (t < (n = this._children[s]).x) {
          if (0 == s) {
            t = 0;
            break;
          }
          t = t < (r = this._children[s - 1]).x + r.actualWidth / 2 ? r.x : n.x;
          break;
        }
        s == o && (t = n.x);
      }
      return i.x = t, i.y = e, i;
    }, o.prototype.childSortingOrderChanged = function (t, e, i) {
      if (void 0 === i && (i = 0), 0 == i) this._sortingChildCount--, this.setChildIndex(t, this._children.length);else {
        0 == e && this._sortingChildCount++;
        var o = this._children.indexOf(t),
          n = this.getInsertPosForSortingChild(t);
        o < n ? this._setChildIndex(t, o, n - 1) : this._setChildIndex(t, o, n);
      }
    }, o.prototype.constructFromResource = function () {
      this.constructFromResource2(null, 0);
    }, o.prototype.constructFromResource2 = function (e, i) {
      var o,
        n,
        r,
        s,
        h,
        a,
        l,
        c,
        u = this.packageItem.getBranch();
      u.decoded || (u.decoded = !0, t.TranslationHelper.translateComponent(u));
      var _ = u.rawData;
      _.seek(0, 0), this._underConstruct = !0, this.sourceWidth = _.readInt(), this.sourceHeight = _.readInt(), this.initWidth = this.sourceWidth, this.initHeight = this.sourceHeight, this.setSize(this.sourceWidth, this.sourceHeight), _.readBool() && (this.minWidth = _.readInt(), this.maxWidth = _.readInt(), this.minHeight = _.readInt(), this.maxHeight = _.readInt()), _.readBool() && (h = _.readFloat(), a = _.readFloat(), this.setPivot(h, a, _.readBool())), _.readBool() && (this._margin.top = _.readInt(), this._margin.bottom = _.readInt(), this._margin.left = _.readInt(), this._margin.right = _.readInt());
      var p = _.readByte();
      if (p == t.OverflowType.Scroll) {
        var d = _.position;
        _.seek(0, 7), this.setupScroll(_), _.position = d;
      } else this.setupOverflow(p);
      _.readBool() && _.skip(8), this._buildingDisplayList = !0, _.seek(0, 1);
      var f,
        g = _.readShort();
      for (o = 0; o < g; o++) {
        s = _.readShort(), s += _.position;
        var y = new t.Controller();
        this._controllers.push(y), y.parent = this, y.setup(_), _.position = s;
      }
      _.seek(0, 2);
      var m = _.readShort();
      for (o = 0; o < m; o++) {
        if (n = _.readShort(), r = _.position, e) f = e[i + o];else {
          _.seek(r, 0);
          var b,
            v = _.readByte(),
            C = _.readS(),
            w = _.readS(),
            S = null;
          null != C && (S = (b = null != w ? t.UIPackage.getById(w) : u.owner) ? b.getItemById(C) : null), S ? (f = t.UIObjectFactory.newObject(S)).constructFromResource() : f = t.UIObjectFactory.newObject(v);
        }
        f._underConstruct = !0, f.setup_beforeAdd(_, r), f._parent = this, f.node.parent = this._container, this._children.push(f), _.position = r + n;
      }
      for (_.seek(0, 3), this.relations.setup(_, !0), _.seek(0, 2), _.skip(2), o = 0; o < m; o++) s = _.readShort(), s += _.position, _.seek(_.position, 3), this._children[o].relations.setup(_, !1), _.position = s;
      for (_.seek(0, 2), _.skip(2), o = 0; o < m; o++) s = _.readShort(), s += _.position, (f = this._children[o]).setup_afterAdd(_, _.position), f._underConstruct = !1, _.position = s;
      _.seek(0, 4), _.skip(2), this.opaque = _.readBool();
      var x = _.readShort();
      -1 != x && this.setMask(this.getChildAt(x), _.readBool());
      var P = _.readS();
      l = _.readInt(), c = _.readInt(), null != P ? (S = u.owner.getItemById(P)) && S.hitTestData && (this.hitArea = new t.PixelHitTest(S.hitTestData, l, c)) : 0 != l && -1 != c && (this.hitArea = new t.ChildHitArea(this.getChildAt(c))), _.seek(0, 5);
      var I = _.readShort();
      for (o = 0; o < I; o++) {
        s = _.readShort(), s += _.position;
        var T = new t.Transition(this);
        T.setup(_), this._transitions.push(T), _.position = s;
      }
      this.applyAllControllers(), this._buildingDisplayList = !1, this._underConstruct = !1, this.buildNativeDisplayList(), this.setBoundsChangedFlag(), u.objectType != t.ObjectType.Component && this.constructExtension(_), this.onConstruct();
    }, o.prototype.constructExtension = function () {}, o.prototype.onConstruct = function () {}, o.prototype.setup_afterAdd = function (t, i) {
      e.prototype.setup_afterAdd.call(this, t, i), t.seek(i, 4);
      var o = t.readShort();
      -1 != o && this._scrollPane && (this._scrollPane.pageController = this._parent.getControllerAt(o));
      for (var n = t.readShort(), r = 0; r < n; r++) {
        var s = this.getController(t.readS()),
          h = t.readS();
        s && (s.selectedPageId = h);
      }
      if (t.version >= 2) for (n = t.readShort(), r = 0; r < n; r++) {
        var a = t.readS(),
          l = t.readShort(),
          c = t.readS(),
          u = this.getChildByPath(a);
        u && u.setProp(l, c);
      }
    }, o.prototype.onEnable = function () {
      for (var t = this._transitions.length, e = 0; e < t; ++e) this._transitions[e].onEnable();
    }, o.prototype.onDisable = function () {
      for (var t = this._transitions.length, e = 0; e < t; ++e) this._transitions[e].onDisable();
    }, o;
  }(t.GObject);
  t.GComponent = e;
  var i = new cc.Vec2();
}(fgui || (fgui = {})), function (t) {
  var e = function (e) {
    function i() {
      var i = e.call(this) || this;
      return i._node.name = "GButton", i._mode = t.ButtonMode.Common, i._title = "", i._icon = "", i._sound = t.UIConfig.buttonSound, i._soundVolumeScale = t.UIConfig.buttonSoundVolumeScale, i._changeStateOnClick = !0, i._downEffect = 0, i._downEffectValue = .8, i;
    }
    return __extends(i, e), Object.defineProperty(i.prototype, "icon", {
      get: function get() {
        return this._icon;
      },
      set: function set(t) {
        this._icon = t, t = this._selected && this._selectedIcon ? this._selectedIcon : this._icon, this._iconObject && (this._iconObject.icon = t), this.updateGear(7);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "selectedIcon", {
      get: function get() {
        return this._selectedIcon;
      },
      set: function set(t) {
        this._selectedIcon = t, t = this._selected && this._selectedIcon ? this._selectedIcon : this._icon, this._iconObject && (this._iconObject.icon = t);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "title", {
      get: function get() {
        return this._title;
      },
      set: function set(t) {
        this._title = t, this._titleObject && (this._titleObject.text = this._selected && this._selectedTitle ? this._selectedTitle : this._title), this.updateGear(6);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "text", {
      get: function get() {
        return this.title;
      },
      set: function set(t) {
        this.title = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "selectedTitle", {
      get: function get() {
        return this._selectedTitle;
      },
      set: function set(t) {
        this._selectedTitle = t, this._titleObject && (this._titleObject.text = this._selected && this._selectedTitle ? this._selectedTitle : this._title);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "titleColor", {
      get: function get() {
        var t = this.getTextField();
        return t ? t.color : cc.Color.BLACK;
      },
      set: function set(t) {
        var e = this.getTextField();
        e && (e.color = t);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "titleFontSize", {
      get: function get() {
        var t = this.getTextField();
        return t ? t.fontSize : 0;
      },
      set: function set(t) {
        var e = this.getTextField();
        e && (e.fontSize = t);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "sound", {
      get: function get() {
        return this._sound;
      },
      set: function set(t) {
        this._sound = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "soundVolumeScale", {
      get: function get() {
        return this._soundVolumeScale;
      },
      set: function set(t) {
        this._soundVolumeScale = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "selected", {
      get: function get() {
        return this._selected;
      },
      set: function set(e) {
        if (this._mode != t.ButtonMode.Common && this._selected != e) {
          if (this._selected = e, this.setCurrentState(), this._selectedTitle && this._titleObject && (this._titleObject.text = this._selected ? this._selectedTitle : this._title), this._selectedIcon) {
            var i = this._selected ? this._selectedIcon : this._icon;
            this._iconObject && (this._iconObject.icon = i);
          }
          this._relatedController && this._parent && !this._parent._buildingDisplayList && (this._selected ? (this._relatedController.selectedPageId = this._relatedPageId, this._relatedController.autoRadioGroupDepth && this._parent.adjustRadioGroupDepth(this, this._relatedController)) : this._mode == t.ButtonMode.Check && this._relatedController.selectedPageId == this._relatedPageId && (this._relatedController.oppositePageId = this._relatedPageId));
        }
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "mode", {
      get: function get() {
        return this._mode;
      },
      set: function set(e) {
        this._mode != e && (e == t.ButtonMode.Common && (this.selected = !1), this._mode = e);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "relatedController", {
      get: function get() {
        return this._relatedController;
      },
      set: function set(t) {
        this._relatedController = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "relatedPageId", {
      get: function get() {
        return this._relatedPageId;
      },
      set: function set(t) {
        this._relatedPageId = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "changeStateOnClick", {
      get: function get() {
        return this._changeStateOnClick;
      },
      set: function set(t) {
        this._changeStateOnClick = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "linkedPopup", {
      get: function get() {
        return this._linkedPopup;
      },
      set: function set(t) {
        this._linkedPopup = t;
      },
      enumerable: !1,
      configurable: !0
    }), i.prototype.getTextField = function () {
      return this._titleObject instanceof t.GTextField ? this._titleObject : this._titleObject instanceof t.GLabel || this._titleObject instanceof i ? this._titleObject.getTextField() : null;
    }, i.prototype.fireClick = function () {
      t.GRoot.inst.inputProcessor.simulateClick(this);
    }, i.prototype.setState = function (e) {
      if (this._buttonController && (this._buttonController.selectedPage = e), 1 == this._downEffect) {
        var o = this.numChildren;
        if (e == i.DOWN || e == i.SELECTED_OVER || e == i.SELECTED_DISABLED) {
          this._downColor || (this._downColor = new cc.Color());
          var n = 255 * this._downEffectValue;
          this._downColor.r = this._downColor.g = this._downColor.b = n;
          for (var r = 0; r < o; r++) null == (s = this.getChildAt(r)).color || s instanceof t.GTextField || (s.color = this._downColor);
        } else for (r = 0; r < o; r++) {
          var s;
          null == (s = this.getChildAt(r)).color || s instanceof t.GTextField || (s.color = cc.Color.WHITE);
        }
      } else 2 == this._downEffect && (e == i.DOWN || e == i.SELECTED_OVER || e == i.SELECTED_DISABLED ? this._downScaled || (this._downScaled = !0, this.setScale(this.scaleX * this._downEffectValue, this.scaleY * this._downEffectValue)) : this._downScaled && (this._downScaled = !1, this.setScale(this.scaleX / this._downEffectValue, this.scaleY / this._downEffectValue)));
    }, i.prototype.setCurrentState = function () {
      this.grayed && this._buttonController && this._buttonController.hasPage(i.DISABLED) ? this._selected ? this.setState(i.SELECTED_DISABLED) : this.setState(i.DISABLED) : this._selected ? this.setState(this._over ? i.SELECTED_OVER : i.DOWN) : this.setState(this._over ? i.OVER : i.UP);
    }, i.prototype.handleControllerChanged = function (t) {
      e.prototype.handleControllerChanged.call(this, t), this._relatedController == t && (this.selected = this._relatedPageId == t.selectedPageId);
    }, i.prototype.handleGrayedChanged = function () {
      this._buttonController && this._buttonController.hasPage(i.DISABLED) ? this.grayed ? this._selected && this._buttonController.hasPage(i.SELECTED_DISABLED) ? this.setState(i.SELECTED_DISABLED) : this.setState(i.DISABLED) : this._selected ? this.setState(i.DOWN) : this.setState(i.UP) : e.prototype.handleGrayedChanged.call(this);
    }, i.prototype.getProp = function (i) {
      switch (i) {
        case t.ObjectPropID.Color:
          return this.titleColor;
        case t.ObjectPropID.OutlineColor:
          var o = this.getTextField();
          return o ? o.strokeColor : 0;
        case t.ObjectPropID.FontSize:
          return this.titleFontSize;
        case t.ObjectPropID.Selected:
          return this.selected;
        default:
          return e.prototype.getProp.call(this, i);
      }
    }, i.prototype.setProp = function (i, o) {
      switch (i) {
        case t.ObjectPropID.Color:
          this.titleColor = o;
          break;
        case t.ObjectPropID.OutlineColor:
          var n = this.getTextField();
          n && (n.strokeColor = o);
          break;
        case t.ObjectPropID.FontSize:
          this.titleFontSize = o;
          break;
        case t.ObjectPropID.Selected:
          this.selected = o;
          break;
        default:
          e.prototype.setProp.call(this, i, o);
      }
    }, i.prototype.constructExtension = function (e) {
      e.seek(0, 6), this._mode = e.readByte();
      var o = e.readS();
      o && (this._sound = o), this._soundVolumeScale = e.readFloat(), this._downEffect = e.readByte(), this._downEffectValue = e.readFloat(), 2 == this._downEffect && this.setPivot(.5, .5, this.pivotAsAnchor), this._buttonController = this.getController("button"), this._titleObject = this.getChild("title"), this._iconObject = this.getChild("icon"), this._titleObject && (this._title = this._titleObject.text), this._iconObject && (this._icon = this._iconObject.icon), this._mode == t.ButtonMode.Common && this.setState(i.UP), this._node.on(t.Event.TOUCH_BEGIN, this.onTouchBegin_1, this), this._node.on(t.Event.TOUCH_END, this.onTouchEnd_1, this), this._node.on(t.Event.ROLL_OVER, this.onRollOver_1, this), this._node.on(t.Event.ROLL_OUT, this.onRollOut_1, this), this._node.on(t.Event.CLICK, this.onClick_1, this);
    }, i.prototype.setup_afterAdd = function (t, i) {
      var o, n;
      e.prototype.setup_afterAdd.call(this, t, i), t.seek(i, 6) && t.readByte() == this.packageItem.objectType && (null != (o = t.readS()) && (this.title = o), null != (o = t.readS()) && (this.selectedTitle = o), null != (o = t.readS()) && (this.icon = o), null != (o = t.readS()) && (this.selectedIcon = o), t.readBool() && (this.titleColor = t.readColor()), 0 != (n = t.readInt()) && (this.titleFontSize = n), (n = t.readShort()) >= 0 && (this._relatedController = this.parent.getControllerAt(n)), this._relatedPageId = t.readS(), null != (o = t.readS()) && (this._sound = o), t.readBool() && (this._soundVolumeScale = t.readFloat()), this.selected = t.readBool());
    }, i.prototype.onRollOver_1 = function () {
      this._buttonController && this._buttonController.hasPage(i.OVER) && (this._over = !0, this._down || this.grayed && this._buttonController.hasPage(i.DISABLED) || this.setState(this._selected ? i.SELECTED_OVER : i.OVER));
    }, i.prototype.onRollOut_1 = function () {
      this._buttonController && this._buttonController.hasPage(i.OVER) && (this._over = !1, this._down || this.grayed && this._buttonController.hasPage(i.DISABLED) || this.setState(this._selected ? i.DOWN : i.UP));
    }, i.prototype.onTouchBegin_1 = function (e) {
      e.button == cc.Event.EventMouse.BUTTON_LEFT && (this._down = !0, e.captureTouch(), this._mode == t.ButtonMode.Common && (this.grayed && this._buttonController && this._buttonController.hasPage(i.DISABLED) ? this.setState(i.SELECTED_DISABLED) : this.setState(i.DOWN)), this._linkedPopup && (this._linkedPopup instanceof t.Window ? this._linkedPopup.toggleStatus() : this.root.togglePopup(this._linkedPopup, this)));
    }, i.prototype.onTouchEnd_1 = function (e) {
      if (e.button == cc.Event.EventMouse.BUTTON_LEFT && this._down) {
        if (this._down = !1, null == this._node) return;
        this._mode == t.ButtonMode.Common ? this.grayed && this._buttonController && this._buttonController.hasPage(i.DISABLED) ? this.setState(i.DISABLED) : this._over ? this.setState(i.OVER) : this.setState(i.UP) : this._over || null == this._buttonController || this._buttonController.selectedPage != i.OVER && this._buttonController.selectedPage != i.SELECTED_OVER || this.setCurrentState();
      }
    }, i.prototype.onClick_1 = function () {
      if (this._sound) {
        var e = t.UIPackage.getItemByURL(this._sound);
        if (e) {
          var i = e.owner.getItemAsset(e);
          i && t.GRoot.inst.playOneShotSound(i, t.UIConfig.buttonSoundVolumeScale);
        }
      }
      this._mode == t.ButtonMode.Check ? this._changeStateOnClick && (this.selected = !this._selected, this._node.emit(t.Event.STATUS_CHANGED, this)) : this._mode == t.ButtonMode.Radio ? this._changeStateOnClick && !this._selected && (this.selected = !0, this._node.emit(t.Event.STATUS_CHANGED, this)) : this._relatedController && (this._relatedController.selectedPageId = this._relatedPageId);
    }, i.UP = "up", i.DOWN = "down", i.OVER = "over", i.SELECTED_OVER = "selectedOver", i.DISABLED = "disabled", i.SELECTED_DISABLED = "selectedDisabled", i;
  }(t.GComponent);
  t.GButton = e;
}(fgui || (fgui = {})), function (t) {
  var e = function (e) {
    function i() {
      var i = e.call(this) || this;
      return i._visibleItemCount = 0, i._selectedIndex = 0, i._popupDirection = t.PopupDirection.Auto, i._node.name = "GComboBox", i._visibleItemCount = t.UIConfig.defaultComboBoxVisibleItemCount, i._itemsUpdated = !0, i._selectedIndex = -1, i._items = [], i._values = [], i;
    }
    return __extends(i, e), Object.defineProperty(i.prototype, "text", {
      get: function get() {
        return this._titleObject ? this._titleObject.text : null;
      },
      set: function set(t) {
        this._titleObject && (this._titleObject.text = t), this.updateGear(6);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "icon", {
      get: function get() {
        return this._iconObject ? this._iconObject.icon : null;
      },
      set: function set(t) {
        this._iconObject && (this._iconObject.icon = t), this.updateGear(7);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "titleColor", {
      get: function get() {
        var t = this.getTextField();
        return t ? t.color : cc.Color.BLACK;
      },
      set: function set(t) {
        var e = this.getTextField();
        e && (e.color = t);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "titleFontSize", {
      get: function get() {
        var t = this.getTextField();
        return t ? t.fontSize : 0;
      },
      set: function set(t) {
        var e = this.getTextField();
        e && (e.fontSize = t);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "visibleItemCount", {
      get: function get() {
        return this._visibleItemCount;
      },
      set: function set(t) {
        this._visibleItemCount = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "popupDirection", {
      get: function get() {
        return this._popupDirection;
      },
      set: function set(t) {
        this._popupDirection = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "items", {
      get: function get() {
        return this._items;
      },
      set: function set(t) {
        t ? this._items = t.concat() : this._items.length = 0, this._items.length > 0 ? (this._selectedIndex >= this._items.length ? this._selectedIndex = this._items.length - 1 : -1 == this._selectedIndex && (this._selectedIndex = 0), this.text = this._items[this._selectedIndex], this._icons && this._selectedIndex < this._icons.length && (this.icon = this._icons[this._selectedIndex])) : (this.text = "", this._icons && (this.icon = null), this._selectedIndex = -1), this._itemsUpdated = !0;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "icons", {
      get: function get() {
        return this._icons;
      },
      set: function set(t) {
        this._icons = t, this._icons && -1 != this._selectedIndex && this._selectedIndex < this._icons.length && (this.icon = this._icons[this._selectedIndex]);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "values", {
      get: function get() {
        return this._values;
      },
      set: function set(t) {
        t ? this._values = t.concat() : this._values.length = 0;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "selectedIndex", {
      get: function get() {
        return this._selectedIndex;
      },
      set: function set(t) {
        this._selectedIndex != t && (this._selectedIndex = t, this._selectedIndex >= 0 && this._selectedIndex < this._items.length ? (this.text = this._items[this._selectedIndex], this._icons && this._selectedIndex < this._icons.length && (this.icon = this._icons[this._selectedIndex])) : (this.text = "", this._icons && (this.icon = null)), this.updateSelectionController());
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "value", {
      get: function get() {
        return this._values[this._selectedIndex];
      },
      set: function set(t) {
        var e = this._values.indexOf(t);
        -1 == e && null == t && (e = this._values.indexOf("")), this.selectedIndex = e;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "selectionController", {
      get: function get() {
        return this._selectionController;
      },
      set: function set(t) {
        this._selectionController = t;
      },
      enumerable: !1,
      configurable: !0
    }), i.prototype.getTextField = function () {
      return this._titleObject instanceof t.GTextField ? this._titleObject : this._titleObject instanceof t.GLabel || this._titleObject instanceof t.GButton ? this._titleObject.getTextField() : null;
    }, i.prototype.setState = function (t) {
      this._buttonController && (this._buttonController.selectedPage = t);
    }, i.prototype.getProp = function (i) {
      switch (i) {
        case t.ObjectPropID.Color:
          return this.titleColor;
        case t.ObjectPropID.OutlineColor:
          var o = this.getTextField();
          return o ? o.strokeColor : 0;
        case t.ObjectPropID.FontSize:
          return (o = this.getTextField()) ? o.fontSize : 0;
        default:
          return e.prototype.getProp.call(this, i);
      }
    }, i.prototype.setProp = function (i, o) {
      switch (i) {
        case t.ObjectPropID.Color:
          this.titleColor = o;
          break;
        case t.ObjectPropID.OutlineColor:
          var n = this.getTextField();
          n && (n.strokeColor = o);
          break;
        case t.ObjectPropID.FontSize:
          (n = this.getTextField()) && (n.fontSize = o);
          break;
        default:
          e.prototype.setProp.call(this, i, o);
      }
    }, i.prototype.constructExtension = function (e) {
      var i;
      if (this._buttonController = this.getController("button"), this._titleObject = this.getChild("title"), this._iconObject = this.getChild("icon"), i = e.readS()) {
        var o = t.UIPackage.createObjectFromURL(i);
        if (!(o instanceof t.GComponent)) return void console.error("下拉框必须为元件");
        if (this.dropdown = o, this.dropdown.name = "this.dropdown", this._list = this.dropdown.getChild("list"), null == this._list) return void console.error(this.resourceURL + ": 下拉框的弹出元件里必须包含名为list的列表");
        this._list.on(t.Event.CLICK_ITEM, this.onClickItem, this), this._list.addRelation(this.dropdown, t.RelationType.Width), this._list.removeRelation(this.dropdown, t.RelationType.Height), this.dropdown.addRelation(this._list, t.RelationType.Height), this.dropdown.removeRelation(this._list, t.RelationType.Width), this.dropdown.on(t.Event.UNDISPLAY, this.onPopupClosed, this);
      }
      this._node.on(t.Event.TOUCH_BEGIN, this.onTouchBegin_1, this), this._node.on(t.Event.TOUCH_END, this.onTouchEnd_1, this), this._node.on(t.Event.ROLL_OVER, this.onRollOver_1, this), this._node.on(t.Event.ROLL_OUT, this.onRollOut_1, this);
    }, i.prototype.handleControllerChanged = function (t) {
      e.prototype.handleControllerChanged.call(this, t), this._selectionController == t && (this.selectedIndex = t.selectedIndex);
    }, i.prototype.updateSelectionController = function () {
      if (this._selectionController && !this._selectionController.changing && this._selectedIndex < this._selectionController.pageCount) {
        var t = this._selectionController;
        this._selectionController = null, t.selectedIndex = this._selectedIndex, this._selectionController = t;
      }
    }, i.prototype.dispose = function () {
      this.dropdown && (this.dropdown.dispose(), this.dropdown = null), e.prototype.dispose.call(this);
    }, i.prototype.setup_afterAdd = function (t, i) {
      if (e.prototype.setup_afterAdd.call(this, t, i), t.seek(i, 6) && t.readByte() == this.packageItem.objectType) {
        var o,
          n,
          r,
          s,
          h = t.readShort();
        for (o = 0; o < h; o++) r = t.readShort(), r += t.position, this._items[o] = t.readS(), this._values[o] = t.readS(), null != (s = t.readS()) && (null == this._icons && (this._icons = new Array()), this._icons[o] = s), t.position = r;
        null != (s = t.readS()) ? (this.text = s, this._selectedIndex = this._items.indexOf(s)) : this._items.length > 0 ? (this._selectedIndex = 0, this.text = this._items[0]) : this._selectedIndex = -1, null != (s = t.readS()) && (this.icon = s), t.readBool() && (this.titleColor = t.readColor()), (n = t.readInt()) > 0 && (this._visibleItemCount = n), this._popupDirection = t.readByte(), (n = t.readShort()) >= 0 && (this._selectionController = this.parent.getControllerAt(n));
      }
    }, i.prototype.showDropdown = function () {
      if (this._itemsUpdated) {
        this._itemsUpdated = !1, this._list.removeChildrenToPool();
        for (var e = this._items.length, i = 0; i < e; i++) {
          var o = this._list.addItemFromPool();
          o.name = i < this._values.length ? this._values[i] : "", o.text = this._items[i], o.icon = this._icons && i < this._icons.length ? this._icons[i] : null;
        }
        this._list.resizeToFit(this._visibleItemCount);
      }
      this._list.selectedIndex = -1, this.dropdown.width = this.width, this._list.ensureBoundsCorrect(), this.root.togglePopup(this.dropdown, this, this._popupDirection), this.dropdown.parent && this.setState(t.GButton.DOWN);
    }, i.prototype.onPopupClosed = function () {
      this._over ? this.setState(t.GButton.OVER) : this.setState(t.GButton.UP);
    }, i.prototype.onClickItem = function (t) {
      var e = this,
        i = this._list.getChildIndex(t);
      this._partner.callLater(function () {
        e.onClickItem2(i);
      }, .1);
    }, i.prototype.onClickItem2 = function (e) {
      this.dropdown.parent instanceof t.GRoot && this.dropdown.parent.hidePopup(), this._selectedIndex = -1, this.selectedIndex = e, this._node.emit(t.Event.STATUS_CHANGED, this);
    }, i.prototype.onRollOver_1 = function () {
      this._over = !0, this._down || this.dropdown && this.dropdown.parent || this.setState(t.GButton.OVER);
    }, i.prototype.onRollOut_1 = function () {
      this._over = !1, this._down || this.dropdown && this.dropdown.parent || this.setState(t.GButton.UP);
    }, i.prototype.onTouchBegin_1 = function (e) {
      e.button == cc.Event.EventMouse.BUTTON_LEFT && (e.initiator instanceof t.GTextInput && e.initiator.editable || (this._down = !0, e.captureTouch(), this.dropdown && this.showDropdown()));
    }, i.prototype.onTouchEnd_1 = function (e) {
      e.button == cc.Event.EventMouse.BUTTON_LEFT && this._down && (this._down = !1, this.dropdown && !this.dropdown.parent && (this._over ? this.setState(t.GButton.OVER) : this.setState(t.GButton.UP)));
    }, i;
  }(t.GComponent);
  t.GComboBox = e;
}(fgui || (fgui = {})), function (t) {
  var e = function (e) {
    function i() {
      var t = e.call(this) || this;
      return t._type = 0, t._lineSize = 0, t._node.name = "GGraph", t._lineSize = 1, t._lineColor = new cc.Color(), t._fillColor = new cc.Color(255, 255, 255, 255), t._content = t._node.addComponent(cc.Graphics), t;
    }
    return __extends(i, e), i.prototype.drawRect = function (t, e, i, o) {
      this._type = 1, this._lineSize = t, this._lineColor.set(e), this._fillColor.set(i), this._cornerRadius = o, this.updateGraph();
    }, i.prototype.drawEllipse = function (t, e, i) {
      this._type = 2, this._lineSize = t, this._lineColor.set(e), this._fillColor.set(i), this.updateGraph();
    }, i.prototype.drawRegularPolygon = function (t, e, i, o, n, r) {
      this._type = 4, this._lineSize = t, this._lineColor.set(e), this._fillColor.set(i), this._sides = o, this._startAngle = n || 0, this._distances = r, this.updateGraph();
    }, i.prototype.drawPolygon = function (t, e, i, o) {
      this._type = 3, this._lineSize = t, this._lineColor.set(e), this._fillColor.set(i), this._polygonPoints = o, this.updateGraph();
    }, Object.defineProperty(i.prototype, "distances", {
      get: function get() {
        return this._distances;
      },
      set: function set(t) {
        this._distances = t, 3 == this._type && this.updateGraph();
      },
      enumerable: !1,
      configurable: !0
    }), i.prototype.clearGraphics = function () {
      this._type = 0, this._hasContent && (this._content.clear(), this._hasContent = !1);
    }, Object.defineProperty(i.prototype, "type", {
      get: function get() {
        return this._type;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "color", {
      get: function get() {
        return this._fillColor;
      },
      set: function set(t) {
        this._fillColor.set(t), 0 != this._type && this.updateGraph();
      },
      enumerable: !1,
      configurable: !0
    }), i.prototype.updateGraph = function () {
      var t = this._content;
      this._hasContent && (this._hasContent = !1, t.clear());
      var e = this._width,
        i = this._height;
      if (0 != e && 0 != i) {
        var o = -this.pivotX * this._width,
          n = this.pivotY * this._height,
          r = this._lineSize / 2;
        if (t.lineWidth = this._lineSize, t.strokeColor = this._lineColor, t.fillColor = this._fillColor, 1 == this._type) this._cornerRadius ? t.roundRect(o + r, -i + n + r, e - this._lineSize, i - this._lineSize, this._cornerRadius[0]) : t.rect(o + r, -i + n + r, e - this._lineSize, i - this._lineSize);else if (2 == this._type) t.ellipse(e / 2 + o, -i / 2 + n, e / 2 - r, i / 2 - r);else if (3 == this._type) this.drawPath(t, this._polygonPoints, o, n);else if (4 == this._type) {
          this._polygonPoints || (this._polygonPoints = []);
          var s = Math.min(e, i) / 2 - r;
          this._polygonPoints.length = 0;
          for (var h, a = cc.misc.degreesToRadians(this._startAngle), l = 2 * Math.PI / this._sides, c = 0; c < this._sides; c++) {
            this._distances ? (h = this._distances[c], isNaN(h) && (h = 1)) : h = 1;
            var u = s + s * h * Math.cos(a),
              _ = s + s * h * Math.sin(a);
            this._polygonPoints.push(u, _), a += l;
          }
          this.drawPath(t, this._polygonPoints, o, n);
        }
        0 != r && t.stroke(), 0 != this._fillColor.a && t.fill(), this._hasContent = !0;
      }
    }, i.prototype.drawPath = function (t, e, i, o) {
      var n = e.length;
      t.moveTo(e[0] + i, -e[1] + o);
      for (var r = 2; r < n; r += 2) t.lineTo(e[r] + i, -e[r + 1] + o);
      t.lineTo(e[0] + i, -e[1] + o);
    }, i.prototype.handleSizeChanged = function () {
      e.prototype.handleSizeChanged.call(this), 0 != this._type && this.updateGraph();
    }, i.prototype.handleAnchorChanged = function () {
      e.prototype.handleAnchorChanged.call(this), 0 != this._type && this.updateGraph();
    }, i.prototype.getProp = function (i) {
      return i == t.ObjectPropID.Color ? this.color : e.prototype.getProp.call(this, i);
    }, i.prototype.setProp = function (i, o) {
      i == t.ObjectPropID.Color ? this.color = o : e.prototype.setProp.call(this, i, o);
    }, i.prototype._hitTest = function (t) {
      if (t.x >= 0 && t.y >= 0 && t.x < this._width && t.y < this._height) {
        if (3 == this._type) {
          var e = this._polygonPoints,
            i = e.length / 2,
            o = void 0,
            n = i - 1,
            r = !1;
          for (this._width, this._height, o = 0; o < i; ++o) {
            var s = e[2 * o],
              h = e[2 * o + 1],
              a = e[2 * n],
              l = e[2 * n + 1];
            (h < t.y && l >= t.y || l < t.y && h >= t.y) && (s <= t.x || a <= t.x) && s + (t.y - h) / (l - h) * (a - s) < t.x && (r = !r), n = o;
          }
          return r ? this : null;
        }
        return this;
      }
      return null;
    }, i.prototype.setup_beforeAdd = function (t, i) {
      if (e.prototype.setup_beforeAdd.call(this, t, i), t.seek(i, 5), this._type = t.readByte(), 0 != this._type) {
        var o, n;
        if (this._lineSize = t.readInt(), this._lineColor.set(t.readColor(!0)), this._fillColor.set(t.readColor(!0)), t.readBool()) for (this._cornerRadius = new Array(4), o = 0; o < 4; o++) this._cornerRadius[o] = t.readFloat();
        if (3 == this._type) for (n = t.readShort(), this._polygonPoints = [], this._polygonPoints.length = n, o = 0; o < n; o++) this._polygonPoints[o] = t.readFloat();else if (4 == this._type && (this._sides = t.readShort(), this._startAngle = t.readFloat(), (n = t.readShort()) > 0)) for (this._distances = [], o = 0; o < n; o++) this._distances[o] = t.readFloat();
        this.updateGraph();
      }
    }, i;
  }(t.GObject);
  t.GGraph = e;
}(fgui || (fgui = {})), function (t) {
  var e = function (e) {
    function i() {
      var t = e.call(this) || this;
      return t._layout = 0, t._lineGap = 0, t._columnGap = 0, t._mainGridIndex = -1, t._mainGridMinSize = 50, t._mainChildIndex = -1, t._totalSize = 0, t._numChildren = 0, t._updating = 0, t._node.name = "GGroup", t._touchDisabled = !0, t;
    }
    return __extends(i, e), i.prototype.dispose = function () {
      this._boundsChanged = !1, e.prototype.dispose.call(this);
    }, Object.defineProperty(i.prototype, "layout", {
      get: function get() {
        return this._layout;
      },
      set: function set(t) {
        this._layout != t && (this._layout = t, this.setBoundsChangedFlag());
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "lineGap", {
      get: function get() {
        return this._lineGap;
      },
      set: function set(t) {
        this._lineGap != t && (this._lineGap = t, this.setBoundsChangedFlag(!0));
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "columnGap", {
      get: function get() {
        return this._columnGap;
      },
      set: function set(t) {
        this._columnGap != t && (this._columnGap = t, this.setBoundsChangedFlag(!0));
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "excludeInvisibles", {
      get: function get() {
        return this._excludeInvisibles;
      },
      set: function set(t) {
        this._excludeInvisibles != t && (this._excludeInvisibles = t, this.setBoundsChangedFlag());
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "autoSizeDisabled", {
      get: function get() {
        return this._autoSizeDisabled;
      },
      set: function set(t) {
        this._autoSizeDisabled = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "mainGridMinSize", {
      get: function get() {
        return this._mainGridMinSize;
      },
      set: function set(t) {
        this._mainGridMinSize != t && (this._mainGridMinSize = t, this.setBoundsChangedFlag());
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "mainGridIndex", {
      get: function get() {
        return this._mainGridIndex;
      },
      set: function set(t) {
        this._mainGridIndex != t && (this._mainGridIndex = t, this.setBoundsChangedFlag());
      },
      enumerable: !1,
      configurable: !0
    }), i.prototype.setBoundsChangedFlag = function (e) {
      void 0 === e && (e = !1), 0 == this._updating && this._parent && (e || (this._percentReady = !1), this._boundsChanged || (this._boundsChanged = !0, this._layout != t.GroupLayoutType.None && this._partner.callLater(this._ensureBoundsCorrect)));
    }, i.prototype._ensureBoundsCorrect = function () {
      this.node.$gobj.ensureBoundsCorrect();
    }, i.prototype.ensureSizeCorrect = function () {
      null != this._parent && this._boundsChanged && 0 != this._layout && (this._boundsChanged = !1, this._autoSizeDisabled ? this.resizeChildren(0, 0) : (this.handleLayout(), this.updateBounds()));
    }, i.prototype.ensureBoundsCorrect = function () {
      null != this._parent && this._boundsChanged && (this._boundsChanged = !1, 0 == this._layout ? this.updateBounds() : this._autoSizeDisabled ? this.resizeChildren(0, 0) : (this.handleLayout(), this.updateBounds()));
    }, i.prototype.updateBounds = function () {
      this._partner.unschedule(this._ensureBoundsCorrect);
      var t,
        e,
        i,
        o = this._parent.numChildren,
        n = Number.POSITIVE_INFINITY,
        r = Number.POSITIVE_INFINITY,
        s = Number.NEGATIVE_INFINITY,
        h = Number.NEGATIVE_INFINITY,
        a = !0;
      for (t = 0; t < o; t++) (e = this._parent.getChildAt(t)).group != this || this._excludeInvisibles && !e.internalVisible3 || ((i = e.xMin) < n && (n = i), (i = e.yMin) < r && (r = i), (i = e.xMin + e.width) > s && (s = i), (i = e.yMin + e.height) > h && (h = i), a = !1);
      var l = 0,
        c = 0;
      a || (this._updating |= 1, this.setPosition(n, r), this._updating &= 2, l = s - n, c = h - r), 0 == (2 & this._updating) ? (this._updating |= 2, this.setSize(l, c), this._updating &= 1) : (this._updating &= 1, this.resizeChildren(this._width - l, this._height - c));
    }, i.prototype.handleLayout = function () {
      var e, i, o;
      if (this._updating |= 1, this._layout == t.GroupLayoutType.Horizontal) {
        var n = this.x;
        for (o = this._parent.numChildren, i = 0; i < o; i++) (e = this._parent.getChildAt(i)).group == this && (this._excludeInvisibles && !e.internalVisible3 || (e.xMin = n, 0 != e.width && (n += e.width + this._columnGap)));
      } else if (this._layout == t.GroupLayoutType.Vertical) {
        var r = this.y;
        for (o = this._parent.numChildren, i = 0; i < o; i++) (e = this._parent.getChildAt(i)).group == this && (this._excludeInvisibles && !e.internalVisible3 || (e.yMin = r, 0 != e.height && (r += e.height + this._lineGap)));
      }
      this._updating &= 2;
    }, i.prototype.moveChildren = function (t, e) {
      if (0 == (1 & this._updating) && null != this._parent) {
        this._updating |= 1;
        var i,
          o,
          n = this._parent.numChildren;
        for (i = 0; i < n; i++) (o = this._parent.getChildAt(i)).group == this && o.setPosition(o.x + t, o.y + e);
        this._updating &= 2;
      }
    }, i.prototype.resizeChildren = function (e, i) {
      if (this._layout != t.GroupLayoutType.None && 0 == (2 & this._updating) && null != this._parent) if (this._updating |= 2, !this._boundsChanged || (this._boundsChanged = !1, this._autoSizeDisabled)) {
        var o,
          n,
          r = this._parent.numChildren;
        if (!this._percentReady) {
          this._percentReady = !0, this._numChildren = 0, this._totalSize = 0, this._mainChildIndex = -1;
          var s = 0;
          for (o = 0; o < r; o++) (n = this._parent.getChildAt(o)).group == this && (this._excludeInvisibles && !n.internalVisible3 || (s == this._mainGridIndex && (this._mainChildIndex = o), this._numChildren++, 1 == this._layout ? this._totalSize += n.width : this._totalSize += n.height), s++);
          for (-1 != this._mainChildIndex && (1 == this._layout ? (n = this._parent.getChildAt(this._mainChildIndex), this._totalSize += this._mainGridMinSize - n.width, n._sizePercentInGroup = this._mainGridMinSize / this._totalSize) : (n = this._parent.getChildAt(this._mainChildIndex), this._totalSize += this._mainGridMinSize - n.height, n._sizePercentInGroup = this._mainGridMinSize / this._totalSize)), o = 0; o < r; o++) (n = this._parent.getChildAt(o)).group == this && o != this._mainChildIndex && (this._totalSize > 0 ? n._sizePercentInGroup = (1 == this._layout ? n.width : n.height) / this._totalSize : n._sizePercentInGroup = 0);
        }
        var h = 0,
          a = 1,
          l = !1;
        if (1 == this._layout) {
          h = this.width - (this._numChildren - 1) * this._columnGap, -1 != this._mainChildIndex && h >= this._totalSize && ((n = this._parent.getChildAt(this._mainChildIndex)).setSize(h - (this._totalSize - this._mainGridMinSize), n._rawHeight + i, !0), h -= n.width, a -= n._sizePercentInGroup, l = !0);
          var c = this.x;
          for (o = 0; o < r; o++) (n = this._parent.getChildAt(o)).group == this && (!this._excludeInvisibles || n.internalVisible3 ? (l && o == this._mainChildIndex || (n.setSize(Math.round(n._sizePercentInGroup / a * h), n._rawHeight + i, !0), a -= n._sizePercentInGroup, h -= n.width), n.xMin = c, 0 != n.width && (c += n.width + this._columnGap)) : n.setSize(n._rawWidth, n._rawHeight + i, !0));
        } else {
          h = this.height - (this._numChildren - 1) * this._lineGap, -1 != this._mainChildIndex && h >= this._totalSize && ((n = this._parent.getChildAt(this._mainChildIndex)).setSize(n._rawWidth + e, h - (this._totalSize - this._mainGridMinSize), !0), h -= n.height, a -= n._sizePercentInGroup, l = !0);
          var u = this.y;
          for (o = 0; o < r; o++) (n = this._parent.getChildAt(o)).group == this && (!this._excludeInvisibles || n.internalVisible3 ? (l && o == this._mainChildIndex || (n.setSize(n._rawWidth + e, Math.round(n._sizePercentInGroup / a * h), !0), a -= n._sizePercentInGroup, h -= n.height), n.yMin = u, 0 != n.height && (u += n.height + this._lineGap)) : n.setSize(n._rawWidth + e, n._rawHeight, !0));
        }
        this._updating &= 1;
      } else this.updateBounds();
    }, i.prototype.handleAlphaChanged = function () {
      if (!this._underConstruct) for (var t = this._parent.numChildren, e = 0; e < t; e++) {
        var i = this._parent.getChildAt(e);
        i.group == this && (i.alpha = this.alpha);
      }
    }, i.prototype.handleVisibleChanged = function () {
      if (this._parent) for (var t = this._parent.numChildren, e = 0; e < t; e++) {
        var i = this._parent.getChildAt(e);
        i.group == this && i.handleVisibleChanged();
      }
    }, i.prototype.setup_beforeAdd = function (t, i) {
      e.prototype.setup_beforeAdd.call(this, t, i), t.seek(i, 5), this._layout = t.readByte(), this._lineGap = t.readInt(), this._columnGap = t.readInt(), t.version >= 2 && (this._excludeInvisibles = t.readBool(), this._autoSizeDisabled = t.readBool(), this._mainGridIndex = t.readShort());
    }, i.prototype.setup_afterAdd = function (t, i) {
      e.prototype.setup_afterAdd.call(this, t, i), this.visible || this.handleVisibleChanged();
    }, i;
  }(t.GObject);
  t.GGroup = e;
}(fgui || (fgui = {})), function (t) {
  var e = function (e) {
    function i() {
      var i = e.call(this) || this;
      return i._node.name = "GImage", i._touchDisabled = !0, i._content = i._node.addComponent(t.Image), i._content.sizeMode = cc.Sprite.SizeMode.CUSTOM, i._content.trim = !1, i;
    }
    return __extends(i, e), Object.defineProperty(i.prototype, "color", {
      get: function get() {
        return this._node.color;
      },
      set: function set(t) {
        this._node.color = t, this.updateGear(4);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "flip", {
      get: function get() {
        return this._content.flip;
      },
      set: function set(t) {
        this._content.flip = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "fillMethod", {
      get: function get() {
        return this._content.fillMethod;
      },
      set: function set(t) {
        this._content.fillMethod = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "fillOrigin", {
      get: function get() {
        return this._content.fillOrigin;
      },
      set: function set(t) {
        this._content.fillOrigin = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "fillClockwise", {
      get: function get() {
        return this._content.fillClockwise;
      },
      set: function set(t) {
        this._content.fillClockwise = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "fillAmount", {
      get: function get() {
        return this._content.fillAmount;
      },
      set: function set(t) {
        this._content.fillAmount = t;
      },
      enumerable: !1,
      configurable: !0
    }), i.prototype.constructFromResource = function () {
      var t = this.packageItem.getBranch();
      this.sourceWidth = t.width, this.sourceHeight = t.height, this.initWidth = this.sourceWidth, this.initHeight = this.sourceHeight, this.setSize(this.sourceWidth, this.sourceHeight), (t = t.getHighResolution()).load(), t.scale9Grid ? this._content.type = cc.Sprite.Type.SLICED : t.scaleByTile && (this._content.type = cc.Sprite.Type.TILED), this._content.spriteFrame = t.asset;
    }, i.prototype.handleGrayedChanged = function () {
      this._content.grayed = this._grayed;
    }, i.prototype.getProp = function (i) {
      return i == t.ObjectPropID.Color ? this.color : e.prototype.getProp.call(this, i);
    }, i.prototype.setProp = function (i, o) {
      i == t.ObjectPropID.Color ? this.color = o : e.prototype.setProp.call(this, i, o);
    }, i.prototype.setup_beforeAdd = function (t, i) {
      e.prototype.setup_beforeAdd.call(this, t, i), t.seek(i, 5), t.readBool() && (this.color = t.readColor()), this._content.flip = t.readByte(), this._content.fillMethod = t.readByte(), 0 != this._content.fillMethod && (this._content.fillOrigin = t.readByte(), this._content.fillClockwise = t.readBool(), this._content.fillAmount = t.readFloat());
    }, i;
  }(t.GObject);
  t.GImage = e;
}(fgui || (fgui = {})), function (t) {
  var e = function (e) {
    function i() {
      var t = e.call(this) || this;
      return t._node.name = "GLabel", t;
    }
    return __extends(i, e), Object.defineProperty(i.prototype, "icon", {
      get: function get() {
        if (this._iconObject) return this._iconObject.icon;
      },
      set: function set(t) {
        this._iconObject && (this._iconObject.icon = t), this.updateGear(7);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "title", {
      get: function get() {
        return this._titleObject ? this._titleObject.text : null;
      },
      set: function set(t) {
        this._titleObject && (this._titleObject.text = t), this.updateGear(6);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "text", {
      get: function get() {
        return this.title;
      },
      set: function set(t) {
        this.title = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "titleColor", {
      get: function get() {
        var t = this.getTextField();
        return t ? t.color : cc.Color.WHITE;
      },
      set: function set(t) {
        var e = this.getTextField();
        e && (e.color = t), this.updateGear(4);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "titleFontSize", {
      get: function get() {
        var t = this.getTextField();
        return t ? t.fontSize : 0;
      },
      set: function set(t) {
        var e = this.getTextField();
        e && (e.fontSize = t);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "editable", {
      get: function get() {
        return !!(this._titleObject && this._titleObject instanceof t.GTextInput) && this._titleObject.editable;
      },
      set: function set(e) {
        this._titleObject && this._titleObject instanceof t.GTextInput && (this._titleObject.editable = e);
      },
      enumerable: !1,
      configurable: !0
    }), i.prototype.getTextField = function () {
      return this._titleObject instanceof t.GTextField ? this._titleObject : this._titleObject instanceof i || this._titleObject instanceof t.GButton ? this._titleObject.getTextField() : null;
    }, i.prototype.getProp = function (i) {
      switch (i) {
        case t.ObjectPropID.Color:
          return this.titleColor;
        case t.ObjectPropID.OutlineColor:
          var o = this.getTextField();
          return o ? o.strokeColor : 0;
        case t.ObjectPropID.FontSize:
          return this.titleFontSize;
        default:
          return e.prototype.getProp.call(this, i);
      }
    }, i.prototype.setProp = function (i, o) {
      switch (i) {
        case t.ObjectPropID.Color:
          this.titleColor = o;
          break;
        case t.ObjectPropID.OutlineColor:
          var n = this.getTextField();
          n && (n.strokeColor = o);
          break;
        case t.ObjectPropID.FontSize:
          this.titleFontSize = o;
          break;
        default:
          e.prototype.setProp.call(this, i, o);
      }
    }, i.prototype.constructExtension = function () {
      this._titleObject = this.getChild("title"), this._iconObject = this.getChild("icon");
    }, i.prototype.setup_afterAdd = function (i, o) {
      if (e.prototype.setup_afterAdd.call(this, i, o), i.seek(o, 6) && i.readByte() == this.packageItem.objectType) {
        var n;
        null != (n = i.readS()) && (this.title = n), null != (n = i.readS()) && (this.icon = n), i.readBool() && (this.titleColor = i.readColor());
        var r = i.readInt();
        if (0 != r && (this.titleFontSize = r), i.readBool()) {
          var s = this.getTextField();
          s instanceof t.GTextInput ? (null != (n = i.readS()) && (s.promptText = n), null != (n = i.readS()) && (s.restrict = n), 0 != (r = i.readInt()) && (s.maxLength = r), r = i.readInt(), i.readBool() && (s.password = !0)) : i.skip(13);
        }
      }
    }, i;
  }(t.GComponent);
  t.GLabel = e;
}(fgui || (fgui = {})), function (t) {
  var e = function (e) {
    function o() {
      var i = e.call(this) || this;
      return i.scrollItemToViewOnClick = !0, i.foldInvisibleItems = !1, i._lineCount = 0, i._columnCount = 0, i._lineGap = 0, i._columnGap = 0, i._lastSelectedIndex = 0, i._numItems = 0, i._realNumItems = 0, i._firstIndex = 0, i._curLineItemCount = 0, i._curLineItemCount2 = 0, i._virtualListChanged = 0, i.itemInfoVer = 0, i._node.name = "GList", i._trackBounds = !0, i._pool = new t.GObjectPool(), i._layout = t.ListLayoutType.SingleColumn, i._autoResizeItem = !0, i._lastSelectedIndex = -1, i._selectionMode = t.ListSelectionMode.Single, i.opaque = !0, i._align = t.AlignType.Left, i._verticalAlign = t.VertAlignType.Top, i;
    }
    return __extends(o, e), o.prototype.dispose = function () {
      this._partner.unschedule(this._refreshVirtualList), this._pool.clear(), e.prototype.dispose.call(this);
    }, Object.defineProperty(o.prototype, "layout", {
      get: function get() {
        return this._layout;
      },
      set: function set(t) {
        this._layout != t && (this._layout = t, this.setBoundsChangedFlag(), this._virtual && this.setVirtualListChangedFlag(!0));
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(o.prototype, "lineCount", {
      get: function get() {
        return this._lineCount;
      },
      set: function set(t) {
        this._lineCount != t && (this._lineCount = t, this.setBoundsChangedFlag(), this._virtual && this.setVirtualListChangedFlag(!0));
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(o.prototype, "columnCount", {
      get: function get() {
        return this._columnCount;
      },
      set: function set(t) {
        this._columnCount != t && (this._columnCount = t, this.setBoundsChangedFlag(), this._virtual && this.setVirtualListChangedFlag(!0));
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(o.prototype, "lineGap", {
      get: function get() {
        return this._lineGap;
      },
      set: function set(t) {
        this._lineGap != t && (this._lineGap = t, this.setBoundsChangedFlag(), this._virtual && this.setVirtualListChangedFlag(!0));
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(o.prototype, "columnGap", {
      get: function get() {
        return this._columnGap;
      },
      set: function set(t) {
        this._columnGap != t && (this._columnGap = t, this.setBoundsChangedFlag(), this._virtual && this.setVirtualListChangedFlag(!0));
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(o.prototype, "align", {
      get: function get() {
        return this._align;
      },
      set: function set(t) {
        this._align != t && (this._align = t, this.setBoundsChangedFlag(), this._virtual && this.setVirtualListChangedFlag(!0));
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(o.prototype, "verticalAlign", {
      get: function get() {
        return this._verticalAlign;
      },
      set: function set(t) {
        this._verticalAlign != t && (this._verticalAlign = t, this.setBoundsChangedFlag(), this._virtual && this.setVirtualListChangedFlag(!0));
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(o.prototype, "virtualItemSize", {
      get: function get() {
        return this._itemSize;
      },
      set: function set(t) {
        this._virtual && (null == this._itemSize && (this._itemSize = new cc.Size(0, 0)), this._itemSize.width = t.width, this._itemSize.height = t.height, this.setVirtualListChangedFlag(!0));
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(o.prototype, "defaultItem", {
      get: function get() {
        return this._defaultItem;
      },
      set: function set(e) {
        this._defaultItem = t.UIPackage.normalizeURL(e);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(o.prototype, "autoResizeItem", {
      get: function get() {
        return this._autoResizeItem;
      },
      set: function set(t) {
        this._autoResizeItem != t && (this._autoResizeItem = t, this.setBoundsChangedFlag(), this._virtual && this.setVirtualListChangedFlag(!0));
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(o.prototype, "selectionMode", {
      get: function get() {
        return this._selectionMode;
      },
      set: function set(t) {
        this._selectionMode = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(o.prototype, "selectionController", {
      get: function get() {
        return this._selectionController;
      },
      set: function set(t) {
        this._selectionController = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(o.prototype, "itemPool", {
      get: function get() {
        return this._pool;
      },
      enumerable: !1,
      configurable: !0
    }), o.prototype.getFromPool = function (t) {
      t || (t = this._defaultItem);
      var e = this._pool.getObject(t);
      return e && (e.visible = !0), e;
    }, o.prototype.returnToPool = function (t) {
      this._pool.returnObject(t);
    }, o.prototype.addChildAt = function (i, o) {
      return e.prototype.addChildAt.call(this, i, o), i instanceof t.GButton && (i.selected = !1, i.changeStateOnClick = !1), i.on(t.Event.CLICK, this.onClickItem, this), i;
    }, o.prototype.addItem = function (e) {
      return e || (e = this._defaultItem), this.addChild(t.UIPackage.createObjectFromURL(e));
    }, o.prototype.addItemFromPool = function (t) {
      return this.addChild(this.getFromPool(t));
    }, o.prototype.removeChildAt = function (i, o) {
      var n = e.prototype.removeChildAt.call(this, i, o);
      return o || n.off(t.Event.CLICK, this.onClickItem, this), n;
    }, o.prototype.removeChildToPoolAt = function (t) {
      var i = e.prototype.removeChildAt.call(this, t);
      this.returnToPool(i);
    }, o.prototype.removeChildToPool = function (t) {
      e.prototype.removeChild.call(this, t), this.returnToPool(t);
    }, o.prototype.removeChildrenToPool = function (t, e) {
      null == t && (t = 0), null == e && (e = -1), (e < 0 || e >= this._children.length) && (e = this._children.length - 1);
      for (var i = t; i <= e; ++i) this.removeChildToPoolAt(t);
    }, Object.defineProperty(o.prototype, "selectedIndex", {
      get: function get() {
        var e;
        if (this._virtual) for (e = 0; e < this._realNumItems; e++) {
          var i = this._virtualItems[e];
          if (i.obj instanceof t.GButton && i.obj.selected || !i.obj && i.selected) return this._loop ? e % this._numItems : e;
        } else {
          var o = this._children.length;
          for (e = 0; e < o; e++) {
            var n = this._children[e];
            if (n instanceof t.GButton && n.selected) return e;
          }
        }
        return -1;
      },
      set: function set(e) {
        e >= 0 && e < this.numItems ? (this._selectionMode != t.ListSelectionMode.Single && this.clearSelection(), this.addSelection(e)) : this.clearSelection();
      },
      enumerable: !1,
      configurable: !0
    }), o.prototype.getSelection = function (e) {
      var i;
      if (e || (e = new Array()), this._virtual) for (i = 0; i < this._realNumItems; i++) {
        var o = this._virtualItems[i];
        if (o.obj instanceof t.GButton && o.obj.selected || !o.obj && o.selected) {
          var n = i;
          if (this._loop && (n = i % this._numItems, -1 != e.indexOf(n))) continue;
          e.push(n);
        }
      } else {
        var r = this._children.length;
        for (i = 0; i < r; i++) {
          var s = this._children[i];
          s instanceof t.GButton && s.selected && e.push(i);
        }
      }
      return e;
    }, o.prototype.addSelection = function (e, i) {
      if (this._selectionMode != t.ListSelectionMode.None) {
        var o;
        if (this.checkVirtualList(), this._selectionMode == t.ListSelectionMode.Single && this.clearSelection(), i && this.scrollToView(e), this._lastSelectedIndex = e, this._virtual) {
          var n = this._virtualItems[e];
          n.obj && (o = n.obj), n.selected = !0;
        } else o = this.getChildAt(e);
        o instanceof t.GButton && !o.selected && (o.selected = !0, this.updateSelectionController(e));
      }
    }, o.prototype.removeSelection = function (e) {
      if (this._selectionMode != t.ListSelectionMode.None) {
        var i;
        if (this._virtual) {
          var o = this._virtualItems[e];
          o.obj && (i = o.obj), o.selected = !1;
        } else i = this.getChildAt(e);
        i instanceof t.GButton && (i.selected = !1);
      }
    }, o.prototype.clearSelection = function () {
      var e;
      if (this._virtual) for (e = 0; e < this._realNumItems; e++) {
        var i = this._virtualItems[e];
        i.obj instanceof t.GButton && (i.obj.selected = !1), i.selected = !1;
      } else {
        var o = this._children.length;
        for (e = 0; e < o; e++) {
          var n = this._children[e];
          n instanceof t.GButton && (n.selected = !1);
        }
      }
    }, o.prototype.clearSelectionExcept = function (e) {
      var i;
      if (this._virtual) for (i = 0; i < this._realNumItems; i++) {
        var o = this._virtualItems[i];
        o.obj != e && (o.obj instanceof t.GButton && (o.obj.selected = !1), o.selected = !1);
      } else {
        var n = this._children.length;
        for (i = 0; i < n; i++) {
          var r = this._children[i];
          r instanceof t.GButton && r != e && (r.selected = !1);
        }
      }
    }, o.prototype.selectAll = function () {
      this.checkVirtualList();
      var e,
        i = -1;
      if (this._virtual) for (e = 0; e < this._realNumItems; e++) {
        var o = this._virtualItems[e];
        o.obj instanceof t.GButton && !o.obj.selected && (o.obj.selected = !0, i = e), o.selected = !0;
      } else {
        var n = this._children.length;
        for (e = 0; e < n; e++) {
          var r = this._children[e];
          r instanceof t.GButton && !r.selected && (r.selected = !0, i = e);
        }
      }
      -1 != i && this.updateSelectionController(i);
    }, o.prototype.selectNone = function () {
      this.clearSelection();
    }, o.prototype.selectReverse = function () {
      this.checkVirtualList();
      var e,
        i = -1;
      if (this._virtual) for (e = 0; e < this._realNumItems; e++) {
        var o = this._virtualItems[e];
        o.obj instanceof t.GButton && (o.obj.selected = !o.obj.selected, o.obj.selected && (i = e)), o.selected = !o.selected;
      } else {
        var n = this._children.length;
        for (e = 0; e < n; e++) {
          var r = this._children[e];
          r instanceof t.GButton && (r.selected = !r.selected, r.selected && (i = e));
        }
      }
      -1 != i && this.updateSelectionController(i);
    }, o.prototype.handleArrowKey = function (e) {
      var i = this.selectedIndex;
      if (-1 != i) switch (e) {
        case 1:
          if (this._layout == t.ListLayoutType.SingleColumn || this._layout == t.ListLayoutType.FlowVertical) --i >= 0 && (this.clearSelection(), this.addSelection(i, !0));else if (this._layout == t.ListLayoutType.FlowHorizontal || this._layout == t.ListLayoutType.Pagination) {
            for (var o = this._children[i], n = 0, r = i - 1; r >= 0; r--) {
              var s = this._children[r];
              if (s.y != o.y) {
                o = s;
                break;
              }
              n++;
            }
            for (; r >= 0; r--) if ((s = this._children[r]).y != o.y) {
              this.clearSelection(), this.addSelection(r + n + 1, !0);
              break;
            }
          }
          break;
        case 3:
          if (this._layout == t.ListLayoutType.SingleRow || this._layout == t.ListLayoutType.FlowHorizontal || this._layout == t.ListLayoutType.Pagination) ++i < this._children.length && (this.clearSelection(), this.addSelection(i, !0));else if (this._layout == t.ListLayoutType.FlowVertical) {
            o = this._children[i], n = 0;
            var h = this._children.length;
            for (r = i + 1; r < h; r++) {
              if ((s = this._children[r]).x != o.x) {
                o = s;
                break;
              }
              n++;
            }
            for (; r < h; r++) if ((s = this._children[r]).x != o.x) {
              this.clearSelection(), this.addSelection(r - n - 1, !0);
              break;
            }
          }
          break;
        case 5:
          if (this._layout == t.ListLayoutType.SingleColumn || this._layout == t.ListLayoutType.FlowVertical) ++i < this._children.length && (this.clearSelection(), this.addSelection(i, !0));else if (this._layout == t.ListLayoutType.FlowHorizontal || this._layout == t.ListLayoutType.Pagination) {
            for (o = this._children[i], n = 0, h = this._children.length, r = i + 1; r < h; r++) {
              if ((s = this._children[r]).y != o.y) {
                o = s;
                break;
              }
              n++;
            }
            for (; r < h; r++) if ((s = this._children[r]).y != o.y) {
              this.clearSelection(), this.addSelection(r - n - 1, !0);
              break;
            }
          }
          break;
        case 7:
          if (this._layout == t.ListLayoutType.SingleRow || this._layout == t.ListLayoutType.FlowHorizontal || this._layout == t.ListLayoutType.Pagination) --i >= 0 && (this.clearSelection(), this.addSelection(i, !0));else if (this._layout == t.ListLayoutType.FlowVertical) {
            for (o = this._children[i], n = 0, r = i - 1; r >= 0; r--) {
              if ((s = this._children[r]).x != o.x) {
                o = s;
                break;
              }
              n++;
            }
            for (; r >= 0; r--) if ((s = this._children[r]).x != o.x) {
              this.clearSelection(), this.addSelection(r + n + 1, !0);
              break;
            }
          }
      }
    }, o.prototype.onClickItem = function (e) {
      if (!this._scrollPane || !this._scrollPane.isDragged) {
        var i = t.GObject.cast(e.currentTarget);
        this.setSelectionOnEvent(i, e), this._scrollPane && this.scrollItemToViewOnClick && this._scrollPane.scrollToView(i, !0), this.dispatchItemEvent(i, e);
      }
    }, o.prototype.dispatchItemEvent = function (e, i) {
      this._node.emit(t.Event.CLICK_ITEM, e, i);
    }, o.prototype.setSelectionOnEvent = function (e, i) {
      if (e instanceof t.GButton && this._selectionMode != t.ListSelectionMode.None) {
        var o = !1,
          n = this.childIndexToItemIndex(this.getChildIndex(e));
        if (this._selectionMode == t.ListSelectionMode.Single) e.selected || (this.clearSelectionExcept(e), e.selected = !0);else if (i.isShiftDown) {
          if (!e.selected) if (-1 != this._lastSelectedIndex) {
            var r,
              s = Math.min(this._lastSelectedIndex, n),
              h = Math.max(this._lastSelectedIndex, n);
            if (h = Math.min(h, this.numItems - 1), this._virtual) for (r = s; r <= h; r++) {
              var a = this._virtualItems[r];
              a.obj instanceof t.GButton && (a.obj.selected = !0), a.selected = !0;
            } else for (r = s; r <= h; r++) {
              var l = this.getChildAt(r);
              l instanceof t.GButton && (l.selected = !0);
            }
            o = !0;
          } else e.selected = !0;
        } else i.isCtrlDown || this._selectionMode == t.ListSelectionMode.Multiple_SingleClick ? e.selected = !e.selected : e.selected ? this.clearSelectionExcept(e) : (this.clearSelectionExcept(e), e.selected = !0);
        o || (this._lastSelectedIndex = n), e.selected && this.updateSelectionController(n);
      }
    }, o.prototype.resizeToFit = function (e, i) {
      void 0 === e && (e = Number.POSITIVE_INFINITY), void 0 === i && (i = 0), this.ensureBoundsCorrect();
      var o = this.numItems;
      if (e > o && (e = o), this._virtual) {
        var n = Math.ceil(e / this._curLineItemCount);
        this._layout == t.ListLayoutType.SingleColumn || this._layout == t.ListLayoutType.FlowHorizontal ? this.viewHeight = n * this._itemSize.height + Math.max(0, n - 1) * this._lineGap : this.viewWidth = n * this._itemSize.width + Math.max(0, n - 1) * this._columnGap;
      } else if (0 == e) this._layout == t.ListLayoutType.SingleColumn || this._layout == t.ListLayoutType.FlowHorizontal ? this.viewHeight = i : this.viewWidth = i;else {
        for (var r = e - 1, s = null; r >= 0 && (s = this.getChildAt(r), this.foldInvisibleItems && !s.visible);) r--;
        if (r < 0) this._layout == t.ListLayoutType.SingleColumn || this._layout == t.ListLayoutType.FlowHorizontal ? this.viewHeight = i : this.viewWidth = i;else {
          var h = 0;
          this._layout == t.ListLayoutType.SingleColumn || this._layout == t.ListLayoutType.FlowHorizontal ? ((h = s.y + s.height) < i && (h = i), this.viewHeight = h) : ((h = s.x + s.width) < i && (h = i), this.viewWidth = h);
        }
      }
    }, o.prototype.getMaxItemWidth = function () {
      for (var t = this._children.length, e = 0, i = 0; i < t; i++) {
        var o = this.getChildAt(i);
        o.width > e && (e = o.width);
      }
      return e;
    }, o.prototype.handleSizeChanged = function () {
      e.prototype.handleSizeChanged.call(this), this.setBoundsChangedFlag(), this._virtual && this.setVirtualListChangedFlag(!0);
    }, o.prototype.handleControllerChanged = function (t) {
      e.prototype.handleControllerChanged.call(this, t), this._selectionController == t && (this.selectedIndex = t.selectedIndex);
    }, o.prototype.updateSelectionController = function (t) {
      if (this._selectionController && !this._selectionController.changing && t < this._selectionController.pageCount) {
        var e = this._selectionController;
        this._selectionController = null, e.selectedIndex = t, this._selectionController = e;
      }
    }, o.prototype.getSnappingPosition = function (o, n, r) {
      var s, h;
      return this._virtual ? (r = r || new cc.Vec2(), this._layout == t.ListLayoutType.SingleColumn || this._layout == t.ListLayoutType.FlowHorizontal ? (s = n, i = n, h = this.getIndexOnPos1(!1), n = i, h < this._virtualItems.length && s - n > this._virtualItems[h].height / 2 && h < this._realNumItems && (n += this._virtualItems[h].height + this._lineGap)) : this._layout == t.ListLayoutType.SingleRow || this._layout == t.ListLayoutType.FlowVertical ? (s = o, i = o, h = this.getIndexOnPos2(!1), o = i, h < this._virtualItems.length && s - o > this._virtualItems[h].width / 2 && h < this._realNumItems && (o += this._virtualItems[h].width + this._columnGap)) : (s = o, i = o, h = this.getIndexOnPos3(!1), o = i, h < this._virtualItems.length && s - o > this._virtualItems[h].width / 2 && h < this._realNumItems && (o += this._virtualItems[h].width + this._columnGap)), r.x = o, r.y = n, r) : e.prototype.getSnappingPosition.call(this, o, n, r);
    }, o.prototype.scrollToView = function (e, i, o) {
      if (this._virtual) {
        if (0 == this._numItems) return;
        if (this.checkVirtualList(), e >= this._virtualItems.length) throw "Invalid child index: " + e + ">" + this._virtualItems.length;
        var n;
        this._loop && (e = Math.floor(this._firstIndex / this._numItems) * this._numItems + e);
        var r,
          s = this._virtualItems[e],
          h = 0;
        if (this._layout == t.ListLayoutType.SingleColumn || this._layout == t.ListLayoutType.FlowHorizontal) {
          for (r = this._curLineItemCount - 1; r < e; r += this._curLineItemCount) h += this._virtualItems[r].height + this._lineGap;
          n = new cc.Rect(0, h, this._itemSize.width, s.height);
        } else if (this._layout == t.ListLayoutType.SingleRow || this._layout == t.ListLayoutType.FlowVertical) {
          for (r = this._curLineItemCount - 1; r < e; r += this._curLineItemCount) h += this._virtualItems[r].width + this._columnGap;
          n = new cc.Rect(h, 0, s.width, this._itemSize.height);
        } else {
          var a = e / (this._curLineItemCount * this._curLineItemCount2);
          n = new cc.Rect(a * this.viewWidth + e % this._curLineItemCount * (s.width + this._columnGap), e / this._curLineItemCount % this._curLineItemCount2 * (s.height + this._lineGap), s.width, s.height);
        }
        this._scrollPane && this._scrollPane.scrollToView(n, i, o);
      } else {
        var l = this.getChildAt(e);
        l && (this._scrollPane ? this._scrollPane.scrollToView(l, i, o) : this.parent && this.parent.scrollPane && this.parent.scrollPane.scrollToView(l, i, o));
      }
    }, o.prototype.getFirstChildInView = function () {
      return this.childIndexToItemIndex(e.prototype.getFirstChildInView.call(this));
    }, o.prototype.childIndexToItemIndex = function (e) {
      if (!this._virtual) return e;
      if (this._layout == t.ListLayoutType.Pagination) {
        for (var i = this._firstIndex; i < this._realNumItems; i++) if (this._virtualItems[i].obj && --e < 0) return i;
        return e;
      }
      return e += this._firstIndex, this._loop && this._numItems > 0 && (e %= this._numItems), e;
    }, o.prototype.itemIndexToChildIndex = function (e) {
      if (!this._virtual) return e;
      if (this._layout == t.ListLayoutType.Pagination) return this.getChildIndex(this._virtualItems[e].obj);
      if (this._loop && this._numItems > 0) {
        var i = this._firstIndex % this._numItems;
        e >= i ? e -= i : e = this._numItems - i + e;
      } else e -= this._firstIndex;
      return e;
    }, o.prototype.setVirtual = function () {
      this._setVirtual(!1);
    }, o.prototype.setVirtualAndLoop = function () {
      this._setVirtual(!0);
    }, o.prototype._setVirtual = function (e) {
      if (!this._virtual) {
        if (!this._scrollPane) throw "Virtual list must be scrollable!";
        if (e) {
          if (this._layout == t.ListLayoutType.FlowHorizontal || this._layout == t.ListLayoutType.FlowVertical) throw "Loop list is not supported for FlowHorizontal or FlowVertical layout!";
          this._scrollPane.bouncebackEffect = !1;
        }
        if (this._virtual = !0, this._loop = e, this._virtualItems = new Array(), this.removeChildrenToPool(), null == this._itemSize) {
          this._itemSize = new cc.Size(0, 0);
          var i = this.getFromPool(null);
          if (!i) throw "Virtual List must have a default list item resource.";
          this._itemSize.width = i.width, this._itemSize.height = i.height, this.returnToPool(i);
        }
        this._layout == t.ListLayoutType.SingleColumn || this._layout == t.ListLayoutType.FlowHorizontal ? (this._scrollPane.scrollStep = this._itemSize.height, this._loop && (this._scrollPane._loop = 2)) : (this._scrollPane.scrollStep = this._itemSize.width, this._loop && (this._scrollPane._loop = 1)), this._node.on(t.Event.SCROLL, this.__scrolled, this), this.setVirtualListChangedFlag(!0);
      }
    }, Object.defineProperty(o.prototype, "numItems", {
      get: function get() {
        return this._virtual ? this._numItems : this._children.length;
      },
      set: function set(t) {
        if (this._virtual) {
          if (null == this.itemRenderer) throw "Set itemRenderer first!";
          this._numItems = t, this._loop ? this._realNumItems = 6 * this._numItems : this._realNumItems = this._numItems;
          var e = this._virtualItems.length;
          if (this._realNumItems > e) for (n = e; n < this._realNumItems; n++) {
            var i = {
              width: this._itemSize.width,
              height: this._itemSize.height,
              updateFlag: 0
            };
            this._virtualItems.push(i);
          } else for (n = this._realNumItems; n < e; n++) this._virtualItems[n].selected = !1;
          0 != this._virtualListChanged && this._partner.unschedule(this._refreshVirtualList), this._refreshVirtualList();
        } else {
          var o = this._children.length;
          if (t > o) for (var n = o; n < t; n++) null == this.itemProvider ? this.addItemFromPool() : this.addItemFromPool(this.itemProvider(n));else this.removeChildrenToPool(t, o);
          if (null != this.itemRenderer) for (n = 0; n < t; n++) this.itemRenderer(n, this.getChildAt(n));
        }
      },
      enumerable: !1,
      configurable: !0
    }), o.prototype.refreshVirtualList = function () {
      this.setVirtualListChangedFlag(!1);
    }, o.prototype.checkVirtualList = function () {
      0 != this._virtualListChanged && (this._refreshVirtualList(), this._partner.unschedule(this._refreshVirtualList));
    }, o.prototype.setVirtualListChangedFlag = function (t) {
      t ? this._virtualListChanged = 2 : 0 == this._virtualListChanged && (this._virtualListChanged = 1), this._partner.callLater(this._refreshVirtualList);
    }, o.prototype._refreshVirtualList = function (e) {
      if (isNaN(e)) {
        var i = 2 == this._virtualListChanged;
        this._virtualListChanged = 0, this._eventLocked = !0, i && (this._layout == t.ListLayoutType.SingleColumn || this._layout == t.ListLayoutType.SingleRow ? this._curLineItemCount = 1 : this._layout == t.ListLayoutType.FlowHorizontal ? this._columnCount > 0 ? this._curLineItemCount = this._columnCount : (this._curLineItemCount = Math.floor((this._scrollPane.viewWidth + this._columnGap) / (this._itemSize.width + this._columnGap)), this._curLineItemCount <= 0 && (this._curLineItemCount = 1)) : this._layout == t.ListLayoutType.FlowVertical ? this._lineCount > 0 ? this._curLineItemCount = this._lineCount : (this._curLineItemCount = Math.floor((this._scrollPane.viewHeight + this._lineGap) / (this._itemSize.height + this._lineGap)), this._curLineItemCount <= 0 && (this._curLineItemCount = 1)) : (this._columnCount > 0 ? this._curLineItemCount = this._columnCount : (this._curLineItemCount = Math.floor((this._scrollPane.viewWidth + this._columnGap) / (this._itemSize.width + this._columnGap)), this._curLineItemCount <= 0 && (this._curLineItemCount = 1)), this._lineCount > 0 ? this._curLineItemCount2 = this._lineCount : (this._curLineItemCount2 = Math.floor((this._scrollPane.viewHeight + this._lineGap) / (this._itemSize.height + this._lineGap)), this._curLineItemCount2 <= 0 && (this._curLineItemCount2 = 1))));
        var o = 0,
          n = 0;
        if (this._realNumItems > 0) {
          var r,
            s = Math.ceil(this._realNumItems / this._curLineItemCount) * this._curLineItemCount,
            h = Math.min(this._curLineItemCount, this._realNumItems);
          if (this._layout == t.ListLayoutType.SingleColumn || this._layout == t.ListLayoutType.FlowHorizontal) {
            for (r = 0; r < s; r += this._curLineItemCount) o += this._virtualItems[r].height + this._lineGap;
            if (o > 0 && (o -= this._lineGap), this._autoResizeItem) n = this._scrollPane.viewWidth;else {
              for (r = 0; r < h; r++) n += this._virtualItems[r].width + this._columnGap;
              n > 0 && (n -= this._columnGap);
            }
          } else if (this._layout == t.ListLayoutType.SingleRow || this._layout == t.ListLayoutType.FlowVertical) {
            for (r = 0; r < s; r += this._curLineItemCount) n += this._virtualItems[r].width + this._columnGap;
            if (n > 0 && (n -= this._columnGap), this._autoResizeItem) o = this._scrollPane.viewHeight;else {
              for (r = 0; r < h; r++) o += this._virtualItems[r].height + this._lineGap;
              o > 0 && (o -= this._lineGap);
            }
          } else n = Math.ceil(s / (this._curLineItemCount * this._curLineItemCount2)) * this.viewWidth, o = this.viewHeight;
        }
        this.handleAlign(n, o), this._scrollPane.setContentSize(n, o), this._eventLocked = !1, this.handleScroll(!0);
      } else this.node.$gobj._refreshVirtualList();
    }, o.prototype.__scrolled = function () {
      this.handleScroll(!1);
    }, o.prototype.getIndexOnPos1 = function (t) {
      if (this._realNumItems < this._curLineItemCount) return i = 0, 0;
      var e, o, n;
      if (this.numChildren > 0 && !t) {
        if ((o = this.getChildAt(0).y) > i) {
          for (e = this._firstIndex - this._curLineItemCount; e >= 0; e -= this._curLineItemCount) if ((o -= this._virtualItems[e].height + this._lineGap) <= i) return i = o, e;
          return i = 0, 0;
        }
        for (e = this._firstIndex; e < this._realNumItems; e += this._curLineItemCount) {
          if ((n = o + this._virtualItems[e].height + this._lineGap) > i) return i = o, e;
          o = n;
        }
        return i = o, this._realNumItems - this._curLineItemCount;
      }
      for (o = 0, e = 0; e < this._realNumItems; e += this._curLineItemCount) {
        if ((n = o + this._virtualItems[e].height + this._lineGap) > i) return i = o, e;
        o = n;
      }
      return i = o, this._realNumItems - this._curLineItemCount;
    }, o.prototype.getIndexOnPos2 = function (t) {
      if (this._realNumItems < this._curLineItemCount) return i = 0, 0;
      var e, o, n;
      if (this.numChildren > 0 && !t) {
        if ((o = this.getChildAt(0).x) > i) {
          for (e = this._firstIndex - this._curLineItemCount; e >= 0; e -= this._curLineItemCount) if ((o -= this._virtualItems[e].width + this._columnGap) <= i) return i = o, e;
          return i = 0, 0;
        }
        for (e = this._firstIndex; e < this._realNumItems; e += this._curLineItemCount) {
          if ((n = o + this._virtualItems[e].width + this._columnGap) > i) return i = o, e;
          o = n;
        }
        return i = o, this._realNumItems - this._curLineItemCount;
      }
      for (o = 0, e = 0; e < this._realNumItems; e += this._curLineItemCount) {
        if ((n = o + this._virtualItems[e].width + this._columnGap) > i) return i = o, e;
        o = n;
      }
      return i = o, this._realNumItems - this._curLineItemCount;
    }, o.prototype.getIndexOnPos3 = function () {
      if (this._realNumItems < this._curLineItemCount) return i = 0, 0;
      var t,
        e,
        o = this.viewWidth,
        n = Math.floor(i / o),
        r = n * this._curLineItemCount * this._curLineItemCount2,
        s = n * o;
      for (t = 0; t < this._curLineItemCount; t++) {
        if ((e = s + this._virtualItems[r + t].width + this._columnGap) > i) return i = s, r + t;
        s = e;
      }
      return i = s, r + this._curLineItemCount - 1;
    }, o.prototype.handleScroll = function (e) {
      if (!this._eventLocked) {
        if (this._layout == t.ListLayoutType.SingleColumn || this._layout == t.ListLayoutType.FlowHorizontal) {
          for (var i = 0; this.handleScroll1(e);) if (e = !1, ++i > 20) {
            console.log("FairyGUI: list will never be filled as the item renderer function always returns a different size.");
            break;
          }
          this.handleArchOrder1();
        } else if (this._layout == t.ListLayoutType.SingleRow || this._layout == t.ListLayoutType.FlowVertical) {
          for (i = 0; this.handleScroll2(e);) if (e = !1, ++i > 20) {
            console.log("FairyGUI: list will never be filled as the item renderer function always returns a different size.");
            break;
          }
          this.handleArchOrder2();
        } else this.handleScroll3(e);
        this._boundsChanged = !1;
      }
    }, o.prototype.handleScroll1 = function (e) {
      var o = this._scrollPane.scrollingPosY,
        n = o + this._scrollPane.viewHeight,
        r = n == this._scrollPane.contentHeight;
      i = o;
      var s = this.getIndexOnPos1(e);
      if (o = i, s == this._firstIndex && !e) return !1;
      var h = this._firstIndex;
      this._firstIndex = s;
      var a,
        l,
        c,
        u,
        _,
        p = s,
        d = h > s,
        f = this.numChildren,
        g = h + f - 1,
        y = d ? g : h,
        m = 0,
        b = o,
        v = 0,
        C = 0,
        w = this._defaultItem,
        S = (this._scrollPane.viewWidth - this._columnGap * (this._curLineItemCount - 1)) / this._curLineItemCount;
      for (this.itemInfoVer++; p < this._realNumItems && (r || b < n);) {
        if ((l = this._virtualItems[p]).obj && !e || (null != this.itemProvider && (null == (w = this.itemProvider(p % this._numItems)) && (w = this._defaultItem), w = t.UIPackage.normalizeURL(w)), l.obj && l.obj.resourceURL != w && (l.obj instanceof t.GButton && (l.selected = l.obj.selected), this.removeChildToPool(l.obj), l.obj = null)), l.obj) a = e;else {
          if (d) {
            for (_ = y; _ >= h; _--) if ((c = this._virtualItems[_]).obj && c.updateFlag != this.itemInfoVer && c.obj.resourceURL == w) {
              c.obj instanceof t.GButton && (c.selected = c.obj.selected), l.obj = c.obj, c.obj = null, _ == y && y--;
              break;
            }
          } else for (_ = y; _ <= g; _++) if ((c = this._virtualItems[_]).obj && c.updateFlag != this.itemInfoVer && c.obj.resourceURL == w) {
            c.obj instanceof t.GButton && (c.selected = c.obj.selected), l.obj = c.obj, c.obj = null, _ == y && y++;
            break;
          }
          l.obj ? this.setChildIndex(l.obj, d ? p - s : this.numChildren) : (l.obj = this._pool.getObject(w), d ? this.addChildAt(l.obj, p - s) : this.addChild(l.obj)), l.obj instanceof t.GButton && (l.obj.selected = l.selected), a = !0;
        }
        a && (this._autoResizeItem && (this._layout == t.ListLayoutType.SingleColumn || this._columnCount > 0) && l.obj.setSize(S, l.obj.height, !0), this.itemRenderer(p % this._numItems, l.obj), p % this._curLineItemCount == 0 && (v += Math.ceil(l.obj.height) - l.height, p == s && h > s && (C = Math.ceil(l.obj.height) - l.height)), l.width = Math.ceil(l.obj.width), l.height = Math.ceil(l.obj.height)), l.updateFlag = this.itemInfoVer, l.obj.setPosition(m, b), p == s && (n += l.height), m += l.width + this._columnGap, p % this._curLineItemCount == this._curLineItemCount - 1 && (m = 0, b += l.height + this._lineGap), p++;
      }
      for (u = 0; u < f; u++) (l = this._virtualItems[h + u]).updateFlag != this.itemInfoVer && l.obj && (l.obj instanceof t.GButton && (l.selected = l.obj.selected), this.removeChildToPool(l.obj), l.obj = null);
      for (f = this._children.length, u = 0; u < f; u++) {
        var x = this._virtualItems[s + u].obj;
        this._children[u] != x && this.setChildIndex(x, u);
      }
      return 0 == v && 0 == C || this._scrollPane.changeContentSizeOnScrolling(0, v, 0, C), p > 0 && this.numChildren > 0 && this._container.y <= 0 && this.getChildAt(0).y > -this._container.y;
    }, o.prototype.handleScroll2 = function (e) {
      var o = this._scrollPane.scrollingPosX,
        n = o + this._scrollPane.viewWidth,
        r = o == this._scrollPane.contentWidth;
      i = o;
      var s = this.getIndexOnPos2(e);
      if (o = i, s == this._firstIndex && !e) return !1;
      var h = this._firstIndex;
      this._firstIndex = s;
      var a,
        l,
        c,
        u,
        _,
        p = s,
        d = h > s,
        f = this.numChildren,
        g = h + f - 1,
        y = d ? g : h,
        m = o,
        b = 0,
        v = 0,
        C = 0,
        w = this._defaultItem,
        S = (this._scrollPane.viewHeight - this._lineGap * (this._curLineItemCount - 1)) / this._curLineItemCount;
      for (this.itemInfoVer++; p < this._realNumItems && (r || m < n);) {
        if ((l = this._virtualItems[p]).obj && !e || (null != this.itemProvider && (null == (w = this.itemProvider(p % this._numItems)) && (w = this._defaultItem), w = t.UIPackage.normalizeURL(w)), l.obj && l.obj.resourceURL != w && (l.obj instanceof t.GButton && (l.selected = l.obj.selected), this.removeChildToPool(l.obj), l.obj = null)), l.obj) a = e;else {
          if (d) {
            for (_ = y; _ >= h; _--) if ((c = this._virtualItems[_]).obj && c.updateFlag != this.itemInfoVer && c.obj.resourceURL == w) {
              c.obj instanceof t.GButton && (c.selected = c.obj.selected), l.obj = c.obj, c.obj = null, _ == y && y--;
              break;
            }
          } else for (_ = y; _ <= g; _++) if ((c = this._virtualItems[_]).obj && c.updateFlag != this.itemInfoVer && c.obj.resourceURL == w) {
            c.obj instanceof t.GButton && (c.selected = c.obj.selected), l.obj = c.obj, c.obj = null, _ == y && y++;
            break;
          }
          l.obj ? this.setChildIndex(l.obj, d ? p - s : this.numChildren) : (l.obj = this._pool.getObject(w), d ? this.addChildAt(l.obj, p - s) : this.addChild(l.obj)), l.obj instanceof t.GButton && (l.obj.selected = l.selected), a = !0;
        }
        a && (this._autoResizeItem && (this._layout == t.ListLayoutType.SingleRow || this._lineCount > 0) && l.obj.setSize(l.obj.width, S, !0), this.itemRenderer(p % this._numItems, l.obj), p % this._curLineItemCount == 0 && (v += Math.ceil(l.obj.width) - l.width, p == s && h > s && (C = Math.ceil(l.obj.width) - l.width)), l.width = Math.ceil(l.obj.width), l.height = Math.ceil(l.obj.height)), l.updateFlag = this.itemInfoVer, l.obj.setPosition(m, b), p == s && (n += l.width), b += l.height + this._lineGap, p % this._curLineItemCount == this._curLineItemCount - 1 && (b = 0, m += l.width + this._columnGap), p++;
      }
      for (u = 0; u < f; u++) (l = this._virtualItems[h + u]).updateFlag != this.itemInfoVer && l.obj && (l.obj instanceof t.GButton && (l.selected = l.obj.selected), this.removeChildToPool(l.obj), l.obj = null);
      for (f = this._children.length, u = 0; u < f; u++) {
        var x = this._virtualItems[s + u].obj;
        this._children[u] != x && this.setChildIndex(x, u);
      }
      return 0 == v && 0 == C || this._scrollPane.changeContentSizeOnScrolling(v, 0, C, 0), p > 0 && this.numChildren > 0 && this._container.x <= 0 && this.getChildAt(0).x > -this._container.x;
    }, o.prototype.handleScroll3 = function (e) {
      var o = this._scrollPane.scrollingPosX;
      i = o;
      var n = this.getIndexOnPos3(e);
      if (o = i, n != this._firstIndex || e) {
        var r = this._firstIndex;
        this._firstIndex = n;
        var s,
          h,
          a,
          l,
          c,
          u = r,
          _ = this._virtualItems.length,
          p = this._curLineItemCount * this._curLineItemCount2,
          d = n % this._curLineItemCount,
          f = this.viewWidth,
          g = Math.floor(n / p) * p,
          y = g + 2 * p,
          m = this._defaultItem,
          b = (this._scrollPane.viewWidth - this._columnGap * (this._curLineItemCount - 1)) / this._curLineItemCount,
          v = (this._scrollPane.viewHeight - this._lineGap * (this._curLineItemCount2 - 1)) / this._curLineItemCount2;
        for (this.itemInfoVer++, h = g; h < y; h++) if (!(h >= this._realNumItems)) {
          if (c = h % this._curLineItemCount, h - g < p) {
            if (c < d) continue;
          } else if (c > d) continue;
          (a = this._virtualItems[h]).updateFlag = this.itemInfoVer;
        }
        var C = null,
          w = 0;
        for (h = g; h < y; h++) if (!(h >= this._realNumItems) && (a = this._virtualItems[h]).updateFlag == this.itemInfoVer) {
          if (a.obj) s = e, w = -1, C = a.obj;else {
            for (; u < _;) {
              if ((l = this._virtualItems[u]).obj && l.updateFlag != this.itemInfoVer) {
                l.obj instanceof t.GButton && (l.selected = l.obj.selected), a.obj = l.obj, l.obj = null;
                break;
              }
              u++;
            }
            -1 == w && (w = this.getChildIndex(C) + 1), a.obj ? w = this.setChildIndexBefore(a.obj, w) : (null != this.itemProvider && (null == (m = this.itemProvider(h % this._numItems)) && (m = this._defaultItem), m = t.UIPackage.normalizeURL(m)), a.obj = this._pool.getObject(m), this.addChildAt(a.obj, w)), w++, a.obj instanceof t.GButton && (a.obj.selected = a.selected), s = !0;
          }
          s && (this._autoResizeItem && (this._curLineItemCount == this._columnCount && this._curLineItemCount2 == this._lineCount ? a.obj.setSize(b, v, !0) : this._curLineItemCount == this._columnCount ? a.obj.setSize(b, a.obj.height, !0) : this._curLineItemCount2 == this._lineCount && a.obj.setSize(a.obj.width, v, !0)), this.itemRenderer(h % this._numItems, a.obj), a.width = Math.ceil(a.obj.width), a.height = Math.ceil(a.obj.height));
        }
        var S = g / p * f,
          x = S,
          P = 0,
          I = 0;
        for (h = g; h < y; h++) h >= this._realNumItems || ((a = this._virtualItems[h]).updateFlag == this.itemInfoVer && a.obj.setPosition(x, P), a.height > I && (I = a.height), h % this._curLineItemCount == this._curLineItemCount - 1 ? (x = S, P += I + this._lineGap, I = 0, h == g + p - 1 && (x = S += f, P = 0)) : x += a.width + this._columnGap);
        for (h = u; h < _; h++) (a = this._virtualItems[h]).updateFlag != this.itemInfoVer && a.obj && (a.obj instanceof t.GButton && (a.selected = a.obj.selected), this.removeChildToPool(a.obj), a.obj = null);
      }
    }, o.prototype.handleArchOrder1 = function () {
      if (this._childrenRenderOrder == t.ChildrenRenderOrder.Arch) {
        for (var e = this._scrollPane.posY + this.viewHeight / 2, i = Number.POSITIVE_INFINITY, o = 0, n = 0, r = this.numChildren, s = 0; s < r; s++) {
          var h = this.getChildAt(s);
          this.foldInvisibleItems && !h.visible || (o = Math.abs(e - h.y - h.height / 2)) < i && (i = o, n = s);
        }
        this.apexIndex = n;
      }
    }, o.prototype.handleArchOrder2 = function () {
      if (this._childrenRenderOrder == t.ChildrenRenderOrder.Arch) {
        for (var e = this._scrollPane.posX + this.viewWidth / 2, i = Number.POSITIVE_INFINITY, o = 0, n = 0, r = this.numChildren, s = 0; s < r; s++) {
          var h = this.getChildAt(s);
          this.foldInvisibleItems && !h.visible || (o = Math.abs(e - h.x - h.width / 2)) < i && (i = o, n = s);
        }
        this.apexIndex = n;
      }
    }, o.prototype.handleAlign = function (e, i) {
      var o = 0,
        n = 0;
      i < this.viewHeight && (this._verticalAlign == t.VertAlignType.Middle ? n = Math.floor((this.viewHeight - i) / 2) : this._verticalAlign == t.VertAlignType.Bottom && (n = this.viewHeight - i)), e < this.viewWidth && (this._align == t.AlignType.Center ? o = Math.floor((this.viewWidth - e) / 2) : this._align == t.AlignType.Right && (o = this.viewWidth - e)), o == this._alignOffset.x && n == this._alignOffset.y || (this._alignOffset.x = o, this._alignOffset.y = n, this._scrollPane ? this._scrollPane.adjustMaskContainer() : this._container.setPosition(this._pivotCorrectX + this._alignOffset.x, this._pivotCorrectY - this._alignOffset.y));
    }, o.prototype.updateBounds = function () {
      if (!this._virtual) {
        var e,
          i,
          o = 0,
          n = 0,
          r = 0,
          s = 0,
          h = 0,
          a = 0,
          l = 0,
          c = 0,
          u = 0,
          _ = this._children.length,
          p = this.viewWidth,
          d = this.viewHeight,
          f = 0,
          g = 0,
          y = 0;
        if (this._layout == t.ListLayoutType.SingleColumn) {
          for (e = 0; e < _; e++) i = this.getChildAt(e), this.foldInvisibleItems && !i.visible || (0 != n && (n += this._lineGap), i.y = n, this._autoResizeItem && i.setSize(p, i.height, !0), n += Math.ceil(i.height), i.width > r && (r = i.width));
          if ((a = n) <= d && this._autoResizeItem && this._scrollPane && this._scrollPane._displayInDemand && this._scrollPane.vtScrollBar) for (p += this._scrollPane.vtScrollBar.width, e = 0; e < _; e++) i = this.getChildAt(e), this.foldInvisibleItems && !i.visible || (i.setSize(p, i.height, !0), i.width > r && (r = i.width));
          h = Math.ceil(r);
        } else if (this._layout == t.ListLayoutType.SingleRow) {
          for (e = 0; e < _; e++) i = this.getChildAt(e), this.foldInvisibleItems && !i.visible || (0 != o && (o += this._columnGap), i.x = o, this._autoResizeItem && i.setSize(i.width, d, !0), o += Math.ceil(i.width), i.height > s && (s = i.height));
          if ((h = o) <= p && this._autoResizeItem && this._scrollPane && this._scrollPane._displayInDemand && this._scrollPane.hzScrollBar) for (d += this._scrollPane.hzScrollBar.height, e = 0; e < _; e++) i = this.getChildAt(e), this.foldInvisibleItems && !i.visible || (i.setSize(i.width, d, !0), i.height > s && (s = i.height));
          a = Math.ceil(s);
        } else if (this._layout == t.ListLayoutType.FlowHorizontal) {
          if (this._autoResizeItem && this._columnCount > 0) {
            for (e = 0; e < _; e++) if (i = this.getChildAt(e), (!this.foldInvisibleItems || i.visible) && (f += i.sourceWidth, ++l == this._columnCount || e == _ - 1)) {
              for (y = (p - f - (l - 1) * this._columnGap) / f, o = 0, l = g; l <= e; l++) i = this.getChildAt(l), this.foldInvisibleItems && !i.visible || (i.setPosition(o, n), l < e ? (i.setSize(i.sourceWidth + Math.round(i.sourceWidth * y), i.height, !0), o += Math.ceil(i.width) + this._columnGap) : i.setSize(p - o, i.height, !0), i.height > s && (s = i.height));
              n += Math.ceil(s) + this._lineGap, s = 0, l = 0, g = e + 1, f = 0;
            }
            a = n + Math.ceil(s), h = p;
          } else {
            for (e = 0; e < _; e++) i = this.getChildAt(e), this.foldInvisibleItems && !i.visible || (0 != o && (o += this._columnGap), (0 != this._columnCount && l >= this._columnCount || 0 == this._columnCount && o + i.width > p && 0 != s) && (o = 0, n += Math.ceil(s) + this._lineGap, s = 0, l = 0), i.setPosition(o, n), (o += Math.ceil(i.width)) > r && (r = o), i.height > s && (s = i.height), l++);
            a = n + Math.ceil(s), h = Math.ceil(r);
          }
        } else if (this._layout == t.ListLayoutType.FlowVertical) {
          if (this._autoResizeItem && this._lineCount > 0) {
            for (e = 0; e < _; e++) if (i = this.getChildAt(e), (!this.foldInvisibleItems || i.visible) && (f += i.sourceHeight, ++l == this._lineCount || e == _ - 1)) {
              for (y = (d - f - (l - 1) * this._lineGap) / f, n = 0, l = g; l <= e; l++) i = this.getChildAt(l), this.foldInvisibleItems && !i.visible || (i.setPosition(o, n), l < e ? (i.setSize(i.width, i.sourceHeight + Math.round(i.sourceHeight * y), !0), n += Math.ceil(i.height) + this._lineGap) : i.setSize(i.width, d - n, !0), i.width > r && (r = i.width));
              o += Math.ceil(r) + this._columnGap, r = 0, l = 0, g = e + 1, f = 0;
            }
            h = o + Math.ceil(r), a = d;
          } else {
            for (e = 0; e < _; e++) i = this.getChildAt(e), this.foldInvisibleItems && !i.visible || (0 != n && (n += this._lineGap), (0 != this._lineCount && l >= this._lineCount || 0 == this._lineCount && n + i.height > d && 0 != r) && (n = 0, o += Math.ceil(r) + this._columnGap, r = 0, l = 0), i.setPosition(o, n), (n += Math.ceil(i.height)) > s && (s = n), i.width > r && (r = i.width), l++);
            h = o + Math.ceil(r), a = Math.ceil(s);
          }
        } else {
          var m;
          if (this._autoResizeItem && this._lineCount > 0 && (m = Math.floor((d - (this._lineCount - 1) * this._lineGap) / this._lineCount)), this._autoResizeItem && this._columnCount > 0) {
            for (e = 0; e < _; e++) if (i = this.getChildAt(e), (!this.foldInvisibleItems || i.visible) && (0 == l && (0 != this._lineCount && u >= this._lineCount || 0 == this._lineCount && n + (this._lineCount > 0 ? m : i.height) > d) && (c++, n = 0, u = 0), f += i.sourceWidth, ++l == this._columnCount || e == _ - 1)) {
              for (y = (p - f - (l - 1) * this._columnGap) / f, o = 0, l = g; l <= e; l++) i = this.getChildAt(l), this.foldInvisibleItems && !i.visible || (i.setPosition(c * p + o, n), l < e ? (i.setSize(i.sourceWidth + Math.round(i.sourceWidth * y), this._lineCount > 0 ? m : i.height, !0), o += Math.ceil(i.width) + this._columnGap) : i.setSize(p - o, this._lineCount > 0 ? m : i.height, !0), i.height > s && (s = i.height));
              n += Math.ceil(s) + this._lineGap, s = 0, l = 0, g = e + 1, f = 0, u++;
            }
          } else for (e = 0; e < _; e++) i = this.getChildAt(e), this.foldInvisibleItems && !i.visible || (0 != o && (o += this._columnGap), this._autoResizeItem && this._lineCount > 0 && i.setSize(i.width, m, !0), (0 != this._columnCount && l >= this._columnCount || 0 == this._columnCount && o + i.width > p && 0 != s) && (o = 0, n += Math.ceil(s) + this._lineGap, s = 0, l = 0, u++, (0 != this._lineCount && u >= this._lineCount || 0 == this._lineCount && n + i.height > d && 0 != r) && (c++, n = 0, u = 0)), i.setPosition(c * p + o, n), (o += Math.ceil(i.width)) > r && (r = o), i.height > s && (s = i.height), l++);
          a = c > 0 ? d : n + Math.ceil(s), h = (c + 1) * p;
        }
        this.handleAlign(h, a), this.setBounds(0, 0, h, a);
      }
    }, o.prototype.setup_beforeAdd = function (i, o) {
      e.prototype.setup_beforeAdd.call(this, i, o), i.seek(o, 5), this._layout = i.readByte(), this._selectionMode = i.readByte(), this._align = i.readByte(), this._verticalAlign = i.readByte(), this._lineGap = i.readShort(), this._columnGap = i.readShort(), this._lineCount = i.readShort(), this._columnCount = i.readShort(), this._autoResizeItem = i.readBool(), this._childrenRenderOrder = i.readByte(), this._apexIndex = i.readShort(), i.readBool() && (this._margin.top = i.readInt(), this._margin.bottom = i.readInt(), this._margin.left = i.readInt(), this._margin.right = i.readInt());
      var n = i.readByte();
      if (n == t.OverflowType.Scroll) {
        var r = i.position;
        i.seek(o, 7), this.setupScroll(i), i.position = r;
      } else this.setupOverflow(n);
      i.readBool() && i.skip(8), i.version >= 2 && (this.scrollItemToViewOnClick = i.readBool(), this.foldInvisibleItems = i.readBool()), i.seek(o, 8), this._defaultItem = i.readS(), this.readItems(i);
    }, o.prototype.readItems = function (t) {
      var e, i, o, n;
      for (e = t.readShort(), i = 0; i < e; i++) if (o = t.readShort(), o += t.position, null != (n = t.readS()) || (n = this._defaultItem)) {
        var r = this.getFromPool(n);
        r && (this.addChild(r), this.setupItem(t, r)), t.position = o;
      } else t.position = o;
    }, o.prototype.setupItem = function (e, i) {
      var o, n, r;
      if (null != (o = e.readS()) && (i.text = o), null != (o = e.readS()) && i instanceof t.GButton && (i.selectedTitle = o), null != (o = e.readS()) && (i.icon = o), null != (o = e.readS()) && i instanceof t.GButton && (i.selectedIcon = o), null != (o = e.readS()) && (i.name = o), i instanceof t.GComponent) {
        for (n = e.readShort(), r = 0; r < n; r++) {
          var s = i.getController(e.readS());
          o = e.readS(), s && (s.selectedPageId = o);
        }
        if (e.version >= 2) for (n = e.readShort(), r = 0; r < n; r++) {
          var h = e.readS(),
            a = e.readShort(),
            l = e.readS(),
            c = i.getChildByPath(h);
          c && c.setProp(a, l);
        }
      }
    }, o.prototype.setup_afterAdd = function (t, i) {
      e.prototype.setup_afterAdd.call(this, t, i), t.seek(i, 6);
      var o = t.readShort();
      -1 != o && (this._selectionController = this.parent.getControllerAt(o));
    }, o;
  }(t.GComponent);
  t.GList = e;
  var i = 0;
}(fgui || (fgui = {})), function (t) {
  var e = function () {
    function e() {
      this._count = 0, this._pool = {};
    }
    return e.prototype.clear = function () {
      for (var t in this._pool) for (var e = this._pool[t], i = e.length, o = 0; o < i; o++) e[o].dispose();
      this._pool = {}, this._count = 0;
    }, Object.defineProperty(e.prototype, "count", {
      get: function get() {
        return this._count;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.getObject = function (e) {
      if (null == (e = t.UIPackage.normalizeURL(e))) return null;
      var i = this._pool[e];
      return i && i.length ? (this._count--, i.shift()) : t.UIPackage.createObjectFromURL(e);
    }, e.prototype.returnObject = function (t) {
      var e = t.resourceURL;
      if (e) {
        var i = this._pool[e];
        null == i && (i = new Array(), this._pool[e] = i), this._count++, i.push(t);
      }
    }, e;
  }();
  t.GObjectPool = e;
}(fgui || (fgui = {})), function (t) {
  var e = function (e) {
    function i() {
      var i = e.call(this) || this;
      return i._frame = 0, i._node.name = "GLoader", i._playing = !0, i._url = "", i._fill = t.LoaderFillType.None, i._align = t.AlignType.Left, i._verticalAlign = t.VertAlignType.Top, i._showErrorSign = !0, i._color = new cc.Color(255, 255, 255, 255), i._container = new cc.Node("Image"), i._container.setAnchorPoint(0, 1), i._node.addChild(i._container), i._content = i._container.addComponent(t.MovieClip), i._content.sizeMode = cc.Sprite.SizeMode.CUSTOM, i._content.trim = !1, i._content.setPlaySettings(), i;
    }
    return __extends(i, e), i.prototype.dispose = function () {
      null == this._contentItem && this._content.spriteFrame && this.freeExternal(this._content.spriteFrame), this._content2 && this._content2.dispose(), e.prototype.dispose.call(this);
    }, Object.defineProperty(i.prototype, "url", {
      get: function get() {
        return this._url;
      },
      set: function set(t) {
        this._url != t && (this._url = t, this.loadContent(), this.updateGear(7));
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "icon", {
      get: function get() {
        return this._url;
      },
      set: function set(t) {
        this.url = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "align", {
      get: function get() {
        return this._align;
      },
      set: function set(t) {
        this._align != t && (this._align = t, this.updateLayout());
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "verticalAlign", {
      get: function get() {
        return this._verticalAlign;
      },
      set: function set(t) {
        this._verticalAlign != t && (this._verticalAlign = t, this.updateLayout());
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "fill", {
      get: function get() {
        return this._fill;
      },
      set: function set(t) {
        this._fill != t && (this._fill = t, this.updateLayout());
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "shrinkOnly", {
      get: function get() {
        return this._shrinkOnly;
      },
      set: function set(t) {
        this._shrinkOnly != t && (this._shrinkOnly = t, this.updateLayout());
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "autoSize", {
      get: function get() {
        return this._autoSize;
      },
      set: function set(t) {
        this._autoSize != t && (this._autoSize = t, this.updateLayout());
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "playing", {
      get: function get() {
        return this._playing;
      },
      set: function set(e) {
        this._playing != e && (this._playing = e, this._content instanceof t.MovieClip && (this._content.playing = e), this.updateGear(5));
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "frame", {
      get: function get() {
        return this._frame;
      },
      set: function set(e) {
        this._frame != e && (this._frame = e, this._content instanceof t.MovieClip && (this._content.frame = e), this.updateGear(5));
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "color", {
      get: function get() {
        return this._color;
      },
      set: function set(t) {
        this._color.set(t), this.updateGear(4), this._container.color = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "fillMethod", {
      get: function get() {
        return this._content.fillMethod;
      },
      set: function set(t) {
        this._content.fillMethod = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "fillOrigin", {
      get: function get() {
        return this._content.fillOrigin;
      },
      set: function set(t) {
        this._content.fillOrigin = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "fillClockwise", {
      get: function get() {
        return this._content.fillClockwise;
      },
      set: function set(t) {
        this._content.fillClockwise = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "fillAmount", {
      get: function get() {
        return this._content.fillAmount;
      },
      set: function set(t) {
        this._content.fillAmount = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "showErrorSign", {
      get: function get() {
        return this._showErrorSign;
      },
      set: function set(t) {
        this._showErrorSign = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "component", {
      get: function get() {
        return this._content2;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "texture", {
      get: function get() {
        return this._content.spriteFrame;
      },
      set: function set(t) {
        this.url = null, this._content.spriteFrame = t, this._content.type = cc.Sprite.Type.SIMPLE, null != t ? (this.sourceWidth = t.getRect().width, this.sourceHeight = t.getRect().height) : this.sourceWidth = this.sourceHeight = 0, this.updateLayout();
      },
      enumerable: !1,
      configurable: !0
    }), i.prototype.loadContent = function () {
      this.clearContent(), this._url && (t.ToolSet.startsWith(this._url, "ui://") ? this.loadFromPackage(this._url) : this.loadExternal());
    }, i.prototype.loadFromPackage = function (e) {
      if (this._contentItem = t.UIPackage.getItemByURL(e), this._contentItem) {
        if (this._contentItem = this._contentItem.getBranch(), this.sourceWidth = this._contentItem.width, this.sourceHeight = this._contentItem.height, this._contentItem = this._contentItem.getHighResolution(), this._contentItem.load(), this._autoSize && this.setSize(this.sourceWidth, this.sourceHeight), this._contentItem.type == t.PackageItemType.Image) this._contentItem.asset ? (this._content.spriteFrame = this._contentItem.asset, 0 == this._content.fillMethod && (this._contentItem.scale9Grid ? this._content.type = cc.Sprite.Type.SLICED : this._contentItem.scaleByTile ? this._content.type = cc.Sprite.Type.TILED : this._content.type = cc.Sprite.Type.SIMPLE), this.updateLayout()) : this.setErrorState();else if (this._contentItem.type == t.PackageItemType.MovieClip) this._content.interval = this._contentItem.interval, this._content.swing = this._contentItem.swing, this._content.repeatDelay = this._contentItem.repeatDelay, this._content.frames = this._contentItem.frames, this.updateLayout();else if (this._contentItem.type == t.PackageItemType.Component) {
          var i = t.UIPackage.createObjectFromURL(e);
          i ? i instanceof t.GComponent ? (this._content2 = i, this._container.addChild(this._content2.node), this.updateLayout()) : (i.dispose(), this.setErrorState()) : this.setErrorState();
        } else this.setErrorState();
      } else this.setErrorState();
    }, i.prototype.loadExternal = function () {
      var _this = this;
      var e = this,
        i = this.url,
        o = function o(t, _o) {
          e._url == i && cc.isValid(e._node) && (t && console.warn(t), _o instanceof cc.SpriteFrame ? e.onExternalLoadSuccess(_o) : _o instanceof cc.Texture2D && e.onExternalLoadSuccess(new cc.SpriteFrame(_o)));
        };
      t.ToolSet.startsWith(this._url, "http://") || t.ToolSet.startsWith(this._url, "https://") || t.ToolSet.startsWith(this._url, "/") ? cc.assetManager.loadRemote(this._url, o) : cc.assetManager.loadBundle("resources1", {}, function (t, e) {
        t || e.load(_this.url, cc.Asset, o);
      });
    }, i.prototype.freeExternal = function () {}, i.prototype.onExternalLoadSuccess = function (t) {
      this._content.spriteFrame = t, this._content.type = cc.Sprite.Type.SIMPLE, this.sourceWidth = t.getRect().width, this.sourceHeight = t.getRect().height, this._autoSize && this.setSize(this.sourceWidth, this.sourceHeight), this.updateLayout();
    }, i.prototype.onExternalLoadFailed = function () {
      this.setErrorState();
    }, i.prototype.setErrorState = function () {
      this._showErrorSign && (null == this._errorSign && null != t.UIConfig.loaderErrorSign && (this._errorSign = i._errorSignPool.getObject(t.UIConfig.loaderErrorSign)), this._errorSign && (this._errorSign.setSize(this.width, this.height), this._container.addChild(this._errorSign.node)));
    }, i.prototype.clearErrorState = function () {
      this._errorSign && (this._container.removeChild(this._errorSign.node), i._errorSignPool.returnObject(this._errorSign), this._errorSign = null);
    }, i.prototype.updateLayout = function () {
      if (null != this._content2 || null != this._content) {
        var e = this.sourceWidth,
          i = this.sourceHeight,
          o = -this.pivotX * this._width,
          n = this.pivotY * this._height;
        if (!this._autoSize || (this._updatingLayout = !0, 0 == e && (e = 50), 0 == i && (i = 30), this.setSize(e, i), this._updatingLayout = !1, this._container.setContentSize(this._width, this._height), this._container.setPosition(o, n), this._content2 && (this._content2.setPosition(o + this._width * this.pivotX, n - this._height * this.pivotY), this._content2.setScale(1, 1)), e != this._width || i != this._height)) {
          var r,
            s,
            h = 1,
            a = 1;
          this._fill != t.LoaderFillType.None && (h = this.width / this.sourceWidth, a = this.height / this.sourceHeight, 1 == h && 1 == a || (this._fill == t.LoaderFillType.ScaleMatchHeight ? h = a : this._fill == t.LoaderFillType.ScaleMatchWidth ? a = h : this._fill == t.LoaderFillType.Scale ? h > a ? h = a : a = h : this._fill == t.LoaderFillType.ScaleNoBorder && (h > a ? a = h : h = a), this._shrinkOnly && (h > 1 && (h = 1), a > 1 && (a = 1)), e = this.sourceWidth * h, i = this.sourceHeight * a)), this._container.setContentSize(e, i), this._content2 && (this._content2.setPosition(o + this._width * this.pivotX, n - this._height * this.pivotY), this._content2.setScale(h, a)), r = this._align == t.AlignType.Left ? 0 : this._align == t.AlignType.Center ? Math.floor((this._width - e) / 2) : this._width - e, s = -(s = this._verticalAlign == t.VertAlignType.Top ? 0 : this._verticalAlign == t.VertAlignType.Middle ? Math.floor((this._height - i) / 2) : this._height - i), this._container.setPosition(o + r, n + s);
        }
      } else this._autoSize && (this._updatingLayout = !0, this.setSize(50, 30), this._updatingLayout = !1);
    }, i.prototype.clearContent = function () {
      if (this.clearErrorState(), !this._contentItem) {
        var t = this._content.spriteFrame;
        t && this.freeExternal(t);
      }
      this._content2 && (this._container.removeChild(this._content2.node), this._content2.dispose(), this._content2 = null), this._content.frames = null, this._content.spriteFrame = null, this._contentItem = null;
    }, i.prototype.handleSizeChanged = function () {
      e.prototype.handleSizeChanged.call(this), this._updatingLayout || this.updateLayout();
    }, i.prototype.handleAnchorChanged = function () {
      e.prototype.handleAnchorChanged.call(this), this._updatingLayout || this.updateLayout();
    }, i.prototype.handleGrayedChanged = function () {
      this._content.grayed = this._grayed;
    }, i.prototype._hitTest = function (t, e) {
      if (this._content2) {
        var i = this._content2.hitTest(e);
        if (i) return i;
      }
      return t.x >= 0 && t.y >= 0 && t.x < this._width && t.y < this._height ? this : null;
    }, i.prototype.getProp = function (i) {
      switch (i) {
        case t.ObjectPropID.Color:
          return this.color;
        case t.ObjectPropID.Playing:
          return this.playing;
        case t.ObjectPropID.Frame:
          return this.frame;
        case t.ObjectPropID.TimeScale:
          return this._content.timeScale;
        default:
          return e.prototype.getProp.call(this, i);
      }
    }, i.prototype.setProp = function (i, o) {
      switch (i) {
        case t.ObjectPropID.Color:
          this.color = o;
          break;
        case t.ObjectPropID.Playing:
          this.playing = o;
          break;
        case t.ObjectPropID.Frame:
          this.frame = o;
          break;
        case t.ObjectPropID.TimeScale:
          this._content.timeScale = o;
          break;
        case t.ObjectPropID.DeltaTime:
          this._content.advance(o);
          break;
        default:
          e.prototype.setProp.call(this, i, o);
      }
    }, i.prototype.setup_beforeAdd = function (t, i) {
      e.prototype.setup_beforeAdd.call(this, t, i), t.seek(i, 5), this._url = t.readS(), this._align = t.readByte(), this._verticalAlign = t.readByte(), this._fill = t.readByte(), this._shrinkOnly = t.readBool(), this._autoSize = t.readBool(), this._showErrorSign = t.readBool(), this._playing = t.readBool(), this._frame = t.readInt(), t.readBool() && (this.color = t.readColor()), this._content.fillMethod = t.readByte(), 0 != this._content.fillMethod && (this._content.fillOrigin = t.readByte(), this._content.fillClockwise = t.readBool(), this._content.fillAmount = t.readFloat()), this._url && this.loadContent();
    }, i._errorSignPool = new t.GObjectPool(), i;
  }(t.GObject);
  t.GLoader = e;
}(fgui || (fgui = {})), function (t) {
  var e = function (e) {
    function i() {
      var i = e.call(this) || this;
      return i._frame = 0, i._node.name = "GLoader3D", i._playing = !0, i._url = "", i._fill = t.LoaderFillType.None, i._align = t.AlignType.Left, i._verticalAlign = t.VertAlignType.Top, i._color = new cc.Color(255, 255, 255, 255), i._container = new cc.Node("Wrapper"), i._container.setAnchorPoint(0, 1), i._node.addChild(i._container), i;
    }
    return __extends(i, e), i.prototype.dispose = function () {
      e.prototype.dispose.call(this);
    }, Object.defineProperty(i.prototype, "url", {
      get: function get() {
        return this._url;
      },
      set: function set(t) {
        this._url != t && (this._url = t, this.loadContent(), this.updateGear(7));
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "icon", {
      get: function get() {
        return this._url;
      },
      set: function set(t) {
        this.url = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "align", {
      get: function get() {
        return this._align;
      },
      set: function set(t) {
        this._align != t && (this._align = t, this.updateLayout());
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "verticalAlign", {
      get: function get() {
        return this._verticalAlign;
      },
      set: function set(t) {
        this._verticalAlign != t && (this._verticalAlign = t, this.updateLayout());
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "fill", {
      get: function get() {
        return this._fill;
      },
      set: function set(t) {
        this._fill != t && (this._fill = t, this.updateLayout());
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "shrinkOnly", {
      get: function get() {
        return this._shrinkOnly;
      },
      set: function set(t) {
        this._shrinkOnly != t && (this._shrinkOnly = t, this.updateLayout());
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "autoSize", {
      get: function get() {
        return this._autoSize;
      },
      set: function set(t) {
        this._autoSize != t && (this._autoSize = t, this.updateLayout());
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "playing", {
      get: function get() {
        return this._playing;
      },
      set: function set(t) {
        this._playing != t && (this._playing = t, this.updateGear(5), this.onChange());
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "frame", {
      get: function get() {
        return this._frame;
      },
      set: function set(t) {
        this._frame != t && (this._frame = t, this.updateGear(5), this.onChange());
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "animationName", {
      get: function get() {
        return this._animationName;
      },
      set: function set(t) {
        this._animationName != t && (this._animationName = t, this.onChange());
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "skinName", {
      get: function get() {
        return this._skinName;
      },
      set: function set(t) {
        this._skinName != t && (this._skinName = t, this.onChange());
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "loop", {
      get: function get() {
        return this._loop;
      },
      set: function set(t) {
        this._loop != t && (this._loop = t, this.onChange());
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "color", {
      get: function get() {
        return this._color;
      },
      set: function set(t) {
        this._color.set(t), this.updateGear(4), this._content && (this._content.node.color = t);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "content", {
      get: function get() {
        return this._content;
      },
      enumerable: !1,
      configurable: !0
    }), i.prototype.loadContent = function () {
      this.clearContent(), this._url && (t.ToolSet.startsWith(this._url, "ui://") ? this.loadFromPackage(this._url) : this.loadExternal());
    }, i.prototype.loadFromPackage = function (e) {
      this._contentItem = t.UIPackage.getItemByURL(e), this._contentItem && (this._contentItem = this._contentItem.getBranch(), this.sourceWidth = this._contentItem.width, this.sourceHeight = this._contentItem.height, this._contentItem = this._contentItem.getHighResolution(), this._autoSize && this.setSize(this.sourceWidth, this.sourceHeight), this._contentItem.type != t.PackageItemType.Spine && this._contentItem.type != t.PackageItemType.DragonBones || this._contentItem.owner.getItemAssetAsync(this._contentItem, this.onLoaded.bind(this)));
    }, i.prototype.onLoaded = function (e, i) {
      this._contentItem == i && (e && console.warn(e), this._contentItem.asset && (this._contentItem.type == t.PackageItemType.Spine ? this.setSpine(this._contentItem.asset, this._contentItem.skeletonAnchor) : this._contentItem.type == t.PackageItemType.DragonBones && this.setDragonBones(this._contentItem.asset, this._contentItem.atlasAsset, this._contentItem.skeletonAnchor)));
    }, i.prototype.setSpine = function (t, e, i) {
      this.url = null, this.clearContent();
      var o = new cc.Node();
      o.color = this._color, this._container.addChild(o), o.setPosition(e.x, -e.y), this._content = o.addComponent(sp.Skeleton), this._content.premultipliedAlpha = i, this._content.skeletonData = t, this.onChangeSpine(), this.updateLayout();
    }, i.prototype.setDragonBones = function (t, e, i, o) {
      this.url = null, this.clearContent();
      var n = new cc.Node();
      n.color = this._color, this._container.addChild(n), n.setPosition(i.x, -i.y), this._content = n.addComponent(dragonBones.ArmatureDisplay), this._content.premultipliedAlpha = o, this._content.dragonAsset = t, this._content.dragonAtlasAsset = e;
      var r = t.init(dragonBones.CCFactory.getInstance(), e._uuid),
        s = this._content._factory.getDragonBonesData(r);
      this._content.armatureName = s.armatureNames[0], this.onChangeDragonBones(), this.updateLayout();
    }, i.prototype.onChange = function () {
      this.onChangeSpine(), this.onChangeDragonBones();
    }, i.prototype.onChangeSpine = function () {
      if (this._content instanceof sp.Skeleton) {
        if (this._animationName) {
          var e = this._content.getCurrent(0);
          (!e || e.animation.name != this._animationName || e.isComplete() && !e.loop) && (this._content.defaultAnimation = this._animationName, e = this._content.setAnimation(0, this._animationName, this._loop)), this._playing ? this._content.paused = !1 : (this._content.paused = !0, e.trackTime = t.ToolSet.lerp(0, e.animationEnd - e.animationStart, this._frame / 100));
        } else this._content.clearTrack(0);
        var i = this._skinName || this._content.skeletonData.getRuntimeData().skins[0].name;
        this._content._skeleton.skin != i && this._content.setSkin(i);
      }
    }, i.prototype.onChangeDragonBones = function () {
      this._content instanceof dragonBones.ArmatureDisplay && (this._animationName ? this._playing ? this._content.playAnimation(this._animationName, this._loop ? 0 : 1) : this._content.armature().animation.gotoAndStopByFrame(this._animationName, this._frame) : this._content.armature().animation.reset());
    }, i.prototype.loadExternal = function () {
      var _this2 = this;
      t.ToolSet.startsWith(this._url, "http://") || t.ToolSet.startsWith(this._url, "https://") || t.ToolSet.startsWith(this._url, "/") ? cc.assetManager.loadRemote(this._url, sp.SkeletonData, this.onLoaded2.bind(this)) : cc.assetManager.loadBundle("resources1", {}, function (t, e) {
        t || e.load(_this2.url, sp.SkeletonData, _this2.onLoaded2.bind(_this2));
      });
    }, i.prototype.onLoaded2 = function (t) {
      this._url && cc.isValid(this._node) && t && console.warn(t);
    }, i.prototype.updateLayout = function () {
      var e = this.sourceWidth,
        i = this.sourceHeight,
        o = -this.pivotX * this._width,
        n = this.pivotY * this._height;
      if (this._autoSize && (this._updatingLayout = !0, 0 == e && (e = 50), 0 == i && (i = 30), this.setSize(e, i), this._updatingLayout = !1, e == this._width && i == this._height)) return this._container.setScale(1, 1), void this._container.setPosition(o, n);
      var r,
        s,
        h = 1,
        a = 1;
      this._fill != t.LoaderFillType.None && (h = this.width / this.sourceWidth, a = this.height / this.sourceHeight, 1 == h && 1 == a || (this._fill == t.LoaderFillType.ScaleMatchHeight ? h = a : this._fill == t.LoaderFillType.ScaleMatchWidth ? a = h : this._fill == t.LoaderFillType.Scale ? h > a ? h = a : a = h : this._fill == t.LoaderFillType.ScaleNoBorder && (h > a ? a = h : h = a), this._shrinkOnly && (h > 1 && (h = 1), a > 1 && (a = 1)), e = this.sourceWidth * h, i = this.sourceHeight * a)), this._container.setScale(h, a), r = this._align == t.AlignType.Left ? 0 : this._align == t.AlignType.Center ? Math.floor((this._width - e) / 2) : this._width - e, s = -(s = this._verticalAlign == t.VertAlignType.Top ? 0 : this._verticalAlign == t.VertAlignType.Middle ? Math.floor((this._height - i) / 2) : this._height - i), this._container.setPosition(o + r, n + s);
    }, i.prototype.clearContent = function () {
      this._contentItem = null, this._content && (this._content.node.destroy(), this._content = null);
    }, i.prototype.handleSizeChanged = function () {
      e.prototype.handleSizeChanged.call(this), this._updatingLayout || this.updateLayout();
    }, i.prototype.handleAnchorChanged = function () {
      e.prototype.handleAnchorChanged.call(this), this._updatingLayout || this.updateLayout();
    }, i.prototype.handleGrayedChanged = function () {}, i.prototype.getProp = function (i) {
      switch (i) {
        case t.ObjectPropID.Color:
          return this.color;
        case t.ObjectPropID.Playing:
          return this.playing;
        case t.ObjectPropID.Frame:
          return this.frame;
        case t.ObjectPropID.TimeScale:
          return 1;
        default:
          return e.prototype.getProp.call(this, i);
      }
    }, i.prototype.setProp = function (i, o) {
      switch (i) {
        case t.ObjectPropID.Color:
          this.color = o;
          break;
        case t.ObjectPropID.Playing:
          this.playing = o;
          break;
        case t.ObjectPropID.Frame:
          this.frame = o;
          break;
        case t.ObjectPropID.TimeScale:
        case t.ObjectPropID.DeltaTime:
          break;
        default:
          e.prototype.setProp.call(this, i, o);
      }
    }, i.prototype.setup_beforeAdd = function (t, i) {
      e.prototype.setup_beforeAdd.call(this, t, i), t.seek(i, 5), this._url = t.readS(), this._align = t.readByte(), this._verticalAlign = t.readByte(), this._fill = t.readByte(), this._shrinkOnly = t.readBool(), this._autoSize = t.readBool(), this._animationName = t.readS(), this._skinName = t.readS(), this._playing = t.readBool(), this._frame = t.readInt(), this._loop = t.readBool(), t.readBool() && (this.color = t.readColor()), this._url && this.loadContent();
    }, i;
  }(t.GObject);
  t.GLoader3D = e;
}(fgui || (fgui = {})), function (t) {
  var e = function (e) {
    function i() {
      var i = e.call(this) || this;
      return i._node.name = "GMovieClip", i._touchDisabled = !0, i._content = i._node.addComponent(t.MovieClip), i._content.sizeMode = cc.Sprite.SizeMode.CUSTOM, i._content.trim = !1, i._content.setPlaySettings(), i;
    }
    return __extends(i, e), Object.defineProperty(i.prototype, "color", {
      get: function get() {
        return this._node.color;
      },
      set: function set(t) {
        this._node.color = t, this.updateGear(4);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "playing", {
      get: function get() {
        return this._content.playing;
      },
      set: function set(t) {
        this._content.playing != t && (this._content.playing = t, this.updateGear(5));
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "frame", {
      get: function get() {
        return this._content.frame;
      },
      set: function set(t) {
        this._content.frame != t && (this._content.frame = t, this.updateGear(5));
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "timeScale", {
      get: function get() {
        return this._content.timeScale;
      },
      set: function set(t) {
        this._content.timeScale = t;
      },
      enumerable: !1,
      configurable: !0
    }), i.prototype.rewind = function () {
      this._content.rewind();
    }, i.prototype.syncStatus = function (t) {
      this._content.syncStatus(t._content);
    }, i.prototype.advance = function (t) {
      this._content.advance(t);
    }, i.prototype.setPlaySettings = function (t, e, i, o, n, r) {
      this._content.setPlaySettings(t, e, i, o, n, r);
    }, i.prototype.handleGrayedChanged = function () {
      this._content.grayed = this._grayed;
    }, i.prototype.handleSizeChanged = function () {
      e.prototype.handleSizeChanged.call(this), this._content.sizeMode = cc.Sprite.SizeMode.CUSTOM;
    }, i.prototype.getProp = function (i) {
      switch (i) {
        case t.ObjectPropID.Color:
          return this.color;
        case t.ObjectPropID.Playing:
          return this.playing;
        case t.ObjectPropID.Frame:
          return this.frame;
        case t.ObjectPropID.TimeScale:
          return this.timeScale;
        default:
          return e.prototype.getProp.call(this, i);
      }
    }, i.prototype.setProp = function (i, o) {
      switch (i) {
        case t.ObjectPropID.Color:
          this.color = o;
          break;
        case t.ObjectPropID.Playing:
          this.playing = o;
          break;
        case t.ObjectPropID.Frame:
          this.frame = o;
          break;
        case t.ObjectPropID.TimeScale:
          this.timeScale = o;
          break;
        case t.ObjectPropID.DeltaTime:
          this.advance(o);
          break;
        default:
          e.prototype.setProp.call(this, i, o);
      }
    }, i.prototype.constructFromResource = function () {
      var t = this.packageItem.getBranch();
      this.sourceWidth = t.width, this.sourceHeight = t.height, this.initWidth = this.sourceWidth, this.initHeight = this.sourceHeight, this.setSize(this.sourceWidth, this.sourceHeight), (t = t.getHighResolution()).load(), this._content.interval = t.interval, this._content.swing = t.swing, this._content.repeatDelay = t.repeatDelay, this._content.frames = t.frames, this._content.smoothing = t.smoothing;
    }, i.prototype.setup_beforeAdd = function (t, i) {
      e.prototype.setup_beforeAdd.call(this, t, i), t.seek(i, 5), t.readBool() && (this.color = t.readColor()), t.readByte(), this._content.frame = t.readInt(), this._content.playing = t.readBool();
    }, i;
  }(t.GObject);
  t.GMovieClip = e;
}(fgui || (fgui = {})), function (t) {
  var e = function (e) {
    function i() {
      var i = e.call(this) || this;
      return i._min = 0, i._max = 0, i._value = 0, i._barMaxWidth = 0, i._barMaxHeight = 0, i._barMaxWidthDelta = 0, i._barMaxHeightDelta = 0, i._barStartX = 0, i._barStartY = 0, i._node.name = "GProgressBar", i._titleType = t.ProgressTitleType.Percent, i._value = 50, i._max = 100, i;
    }
    return __extends(i, e), Object.defineProperty(i.prototype, "titleType", {
      get: function get() {
        return this._titleType;
      },
      set: function set(t) {
        this._titleType != t && (this._titleType = t, this.update(this._value));
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "min", {
      get: function get() {
        return this._min;
      },
      set: function set(t) {
        this._min != t && (this._min = t, this.update(this._value));
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "max", {
      get: function get() {
        return this._max;
      },
      set: function set(t) {
        this._max != t && (this._max = t, this.update(this._value));
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "value", {
      get: function get() {
        return this._value;
      },
      set: function set(e) {
        this._value != e && (t.GTween.kill(this, !1, this.update), this._value = e, this.update(e));
      },
      enumerable: !1,
      configurable: !0
    }), i.prototype.tweenValue = function (e, i) {
      var o,
        n = t.GTween.getTween(this, this.update);
      return n ? (o = n.value.x, n.kill()) : o = this._value, this._value = e, t.GTween.to(o, this._value, i).setTarget(this, this.update).setEase(t.EaseType.Linear);
    }, i.prototype.update = function (e) {
      var i = t.ToolSet.clamp01((e - this._min) / (this._max - this._min));
      if (this._titleObject) switch (this._titleType) {
        case t.ProgressTitleType.Percent:
          this._titleObject.text = Math.floor(100 * i) + "%";
          break;
        case t.ProgressTitleType.ValueAndMax:
          this._titleObject.text = Math.floor(e) + "/" + Math.floor(this._max);
          break;
        case t.ProgressTitleType.Value:
          this._titleObject.text = "" + Math.floor(e);
          break;
        case t.ProgressTitleType.Max:
          this._titleObject.text = "" + Math.floor(this._max);
      }
      var o = this.width - this._barMaxWidthDelta,
        n = this.height - this._barMaxHeightDelta;
      this._reverse ? (this._barObjectH && (this.setFillAmount(this._barObjectH, 1 - i) || (this._barObjectH.width = Math.round(o * i), this._barObjectH.x = this._barStartX + (o - this._barObjectH.width))), this._barObjectV && (this.setFillAmount(this._barObjectV, 1 - i) || (this._barObjectV.height = Math.round(n * i), this._barObjectV.y = this._barStartY + (n - this._barObjectV.height)))) : (this._barObjectH && (this.setFillAmount(this._barObjectH, i) || (this._barObjectH.width = Math.round(o * i))), this._barObjectV && (this.setFillAmount(this._barObjectV, i) || (this._barObjectV.height = Math.round(n * i)))), this._aniObject && this._aniObject.setProp(t.ObjectPropID.Frame, Math.floor(100 * i));
    }, i.prototype.setFillAmount = function (e, i) {
      return (e instanceof t.GImage || e instanceof t.GLoader) && e.fillMethod != t.FillMethod.None && (e.fillAmount = i, !0);
    }, i.prototype.constructExtension = function (t) {
      t.seek(0, 6), this._titleType = t.readByte(), this._reverse = t.readBool(), this._titleObject = this.getChild("title"), this._barObjectH = this.getChild("bar"), this._barObjectV = this.getChild("bar_v"), this._aniObject = this.getChild("ani"), this._barObjectH && (this._barMaxWidth = this._barObjectH.width, this._barMaxWidthDelta = this.width - this._barMaxWidth, this._barStartX = this._barObjectH.x), this._barObjectV && (this._barMaxHeight = this._barObjectV.height, this._barMaxHeightDelta = this.height - this._barMaxHeight, this._barStartY = this._barObjectV.y);
    }, i.prototype.handleSizeChanged = function () {
      e.prototype.handleSizeChanged.call(this), this._barObjectH && (this._barMaxWidth = this.width - this._barMaxWidthDelta), this._barObjectV && (this._barMaxHeight = this.height - this._barMaxHeightDelta), this._underConstruct || this.update(this._value);
    }, i.prototype.setup_afterAdd = function (t, i) {
      e.prototype.setup_afterAdd.call(this, t, i), t.seek(i, 6) && t.readByte() == this.packageItem.objectType ? (this._value = t.readInt(), this._max = t.readInt(), t.version >= 2 && (this._min = t.readInt()), this.update(this._value)) : this.update(this._value);
    }, i;
  }(t.GComponent);
  t.GProgressBar = e;
}(fgui || (fgui = {})), function (t) {
  var e = function (e) {
    function i() {
      var t = e.call(this) || this;
      return t._fontSize = 0, t._leading = 0, t._node.name = "GTextField", t._touchDisabled = !0, t._text = "", t._color = new cc.Color(255, 255, 255, 255), t.createRenderer(), t.fontSize = 12, t.leading = 3, t.singleLine = !1, t._sizeDirty = !1, t._node.on(cc.Node.EventType.SIZE_CHANGED, t.onLabelSizeChanged, t), t;
    }
    return __extends(i, e), i.prototype.createRenderer = function () {
      this._label = this._node.addComponent(cc.Label), this.autoSize = t.AutoSizeType.Both;
    }, Object.defineProperty(i.prototype, "text", {
      get: function get() {
        return this._text;
      },
      set: function set(t) {
        this._text = t, null == this._text && (this._text = ""), this.updateGear(6), this.markSizeChanged(), this.updateText();
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "font", {
      get: function get() {
        return this._font;
      },
      set: function set(e) {
        if (this._font != e || !e) {
          this._font = e, this.markSizeChanged();
          var i = e || t.UIConfig.defaultFont;
          if (t.ToolSet.startsWith(i, "ui://")) {
            var o = t.UIPackage.getItemByURL(i);
            i = o ? o.owner.getItemAsset(o) : t.UIConfig.defaultFont;
          }
          this._realFont = i, this.updateFont();
        }
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "fontSize", {
      get: function get() {
        return this._fontSize;
      },
      set: function set(t) {
        t < 0 || this._fontSize != t && (this._fontSize = t, this.markSizeChanged(), this.updateFontSize());
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "color", {
      get: function get() {
        return this._color;
      },
      set: function set(t) {
        this._color.set(t), this.updateGear(4), this.updateFontColor();
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "align", {
      get: function get() {
        return this._label ? this._label.horizontalAlign : 0;
      },
      set: function set(t) {
        this._label && (this._label.horizontalAlign = t);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "verticalAlign", {
      get: function get() {
        return this._label ? this._label.verticalAlign : 0;
      },
      set: function set(t) {
        this._label && (this._label.verticalAlign = t);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "leading", {
      get: function get() {
        return this._leading;
      },
      set: function set(t) {
        this._leading != t && (this._leading = t, this.markSizeChanged(), this.updateFontSize());
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "letterSpacing", {
      get: function get() {
        return this._label ? this._label.spacingX : 0;
      },
      set: function set(t) {
        this._label && this._label.spacingX != t && (this.markSizeChanged(), this._label.spacingX = t);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "underline", {
      get: function get() {
        return !!this._label && this._label.enableUnderline;
      },
      set: function set(t) {
        this._label && (this._label.enableUnderline = t);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "bold", {
      get: function get() {
        return !!this._label && this._label.enableBold;
      },
      set: function set(t) {
        this._label && (this._label.enableBold = t);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "italic", {
      get: function get() {
        return !!this._label && this._label.enableItalic;
      },
      set: function set(t) {
        this._label && (this._label.enableItalic = t);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "singleLine", {
      get: function get() {
        return !!this._label && !this._label.enableWrapText;
      },
      set: function set(t) {
        this._label && (this._label.enableWrapText = !t);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "stroke", {
      get: function get() {
        return this._outline && this._outline.enabled ? this._outline.width : 0;
      },
      set: function set(t) {
        0 == t ? this._outline && (this._outline.enabled = !1) : (this._outline ? this._outline.enabled = !0 : (this._outline = this._node.addComponent(cc.LabelOutline), this.updateStrokeColor()), this._outline.width = t);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "strokeColor", {
      get: function get() {
        return this._strokeColor;
      },
      set: function set(t) {
        this._strokeColor || (this._strokeColor = new cc.Color()), this._strokeColor.set(t), this.updateGear(4), this.updateStrokeColor();
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "shadowOffset", {
      get: function get() {
        return this._shadowOffset;
      },
      set: function set(t) {
        this._shadowOffset || (this._shadowOffset = new cc.Vec2()), this._shadowOffset.set(t), 0 != this._shadowOffset.x || 0 != this._shadowOffset.y ? (this._shadow ? this._shadow.enabled = !0 : (this._shadow = this._node.addComponent(cc.LabelShadow), this.updateShadowColor()), this._shadow.offset.x = t.x, this._shadow.offset.y = -t.y) : this._shadow && (this._shadow.enabled = !1);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "shadowColor", {
      get: function get() {
        return this._shadowColor;
      },
      set: function set(t) {
        this._shadowColor || (this._shadowColor = new cc.Color()), this._shadowColor.set(t), this.updateShadowColor();
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "ubbEnabled", {
      get: function get() {
        return this._ubbEnabled;
      },
      set: function set(t) {
        this._ubbEnabled != t && (this._ubbEnabled = t, this.markSizeChanged(), this.updateText());
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "autoSize", {
      get: function get() {
        return this._autoSize;
      },
      set: function set(t) {
        this._autoSize != t && (this._autoSize = t, this.markSizeChanged(), this.updateOverflow());
      },
      enumerable: !1,
      configurable: !0
    }), i.prototype.parseTemplate = function (t) {
      for (var e, i, o, n, r = 0, s = ""; -1 != (e = t.indexOf("{", r));) if (e > 0 && 92 == t.charCodeAt(e - 1)) s += t.substring(r, e - 1), s += "{", r = e + 1;else {
        if (s += t.substring(r, e), r = e, -1 == (e = t.indexOf("}", r))) break;
        e != r + 1 ? (-1 != (i = (o = t.substring(r + 1, e)).indexOf("=")) ? s += null == (n = this._templateVars[o.substring(0, i)]) ? o.substring(i + 1) : n : null != (n = this._templateVars[o]) && (s += n), r = e + 1) : (s += t.substr(r, 2), r = e + 1);
      }
      return r < t.length && (s += t.substr(r)), s;
    }, Object.defineProperty(i.prototype, "templateVars", {
      get: function get() {
        return this._templateVars;
      },
      set: function set(t) {
        null == this._templateVars && null == t || (this._templateVars = t, this.flushVars());
      },
      enumerable: !1,
      configurable: !0
    }), i.prototype.setVar = function (t, e) {
      return this._templateVars || (this._templateVars = {}), this._templateVars[t] = e, this;
    }, i.prototype.flushVars = function () {
      this.markSizeChanged(), this.updateText();
    }, Object.defineProperty(i.prototype, "textWidth", {
      get: function get() {
        return this.ensureSizeCorrect(), this._node.width;
      },
      enumerable: !1,
      configurable: !0
    }), i.prototype.ensureSizeCorrect = function () {
      this._sizeDirty && (this._label._forceUpdateRenderData ? this._label._forceUpdateRenderData() : this._label._updateRenderData(!0), this._sizeDirty = !1);
    }, i.prototype.updateText = function () {
      var e = this._text;
      this._templateVars && (e = this.parseTemplate(e)), this._ubbEnabled && (e = t.UBBParser.inst.parse(e, !0)), this._label.string = e;
    }, i.prototype.assignFont = function (e, i) {
      if (i instanceof cc.Font) e.font = i;else {
        var o = t.getFontByName(i);
        o ? e.font = o : (e.fontFamily = i, e.useSystemFont = !0);
      }
    }, i.prototype.assignFontColor = function (e, i) {
      var o = e.font;
      o instanceof cc.BitmapFont && !o._fntConfig.canTint && (i = cc.Color.WHITE), this._grayed && (i = t.ToolSet.toGrayed(i)), e.node.color = i;
    }, i.prototype.updateFont = function () {
      this.assignFont(this._label, this._realFont);
    }, i.prototype.updateFontColor = function () {
      this.assignFontColor(this._label, this._color);
    }, i.prototype.updateStrokeColor = function () {
      this._outline && (this._strokeColor || (this._strokeColor = new cc.Color()), this._grayed ? this._outline.color = t.ToolSet.toGrayed(this._strokeColor) : this._outline.color = this._strokeColor);
    }, i.prototype.updateShadowColor = function () {
      this._shadow && (this._shadowColor || (this._shadowColor = new cc.Color()), this._grayed ? this._shadow.color = t.ToolSet.toGrayed(this._shadowColor) : this._shadow.color = this._shadowColor);
    }, i.prototype.updateFontSize = function () {
      var t = this._label.font;
      if (t instanceof cc.BitmapFont) {
        var e = t._fntConfig;
        e.resizable ? this._label.fontSize = this._fontSize : this._label.fontSize = e.fontSize, this._label.lineHeight = e.fontSize + (this._leading + 4) * e.fontSize / this._label.fontSize;
      } else this._label.fontSize = this._fontSize, this._label.lineHeight = this._fontSize + this._leading;
    }, i.prototype.updateOverflow = function () {
      this._autoSize == t.AutoSizeType.Both ? this._label.overflow = cc.Label.Overflow.NONE : this._autoSize == t.AutoSizeType.Height ? (this._label.overflow = cc.Label.Overflow.RESIZE_HEIGHT, this._node.width = this._width) : this._autoSize == t.AutoSizeType.Shrink ? (this._label.overflow = cc.Label.Overflow.SHRINK, this._node.setContentSize(this._width, this._height)) : (this._label.overflow = cc.Label.Overflow.CLAMP, this._node.setContentSize(this._width, this._height));
    }, i.prototype.markSizeChanged = function () {
      this._underConstruct || this._autoSize != t.AutoSizeType.Both && this._autoSize != t.AutoSizeType.Height || this._sizeDirty || (this._node.emit(t.Event.SIZE_DELAY_CHANGE, this), this._sizeDirty = !0);
    }, i.prototype.onLabelSizeChanged = function () {
      this._sizeDirty = !1, this._underConstruct || this._autoSize != t.AutoSizeType.Both && this._autoSize != t.AutoSizeType.Height || (this._updatingSize = !0, this.setSize(this._node.width, this._node.height), this._updatingSize = !1);
    }, i.prototype.handleSizeChanged = function () {
      this._updatingSize || (this._autoSize == t.AutoSizeType.None || this._autoSize == t.AutoSizeType.Shrink ? this._node.setContentSize(this._width, this._height) : this._autoSize == t.AutoSizeType.Height && (this._node.width = this._width));
    }, i.prototype.handleGrayedChanged = function () {
      this.updateFontColor(), this.updateStrokeColor();
    }, i.prototype.getProp = function (i) {
      switch (i) {
        case t.ObjectPropID.Color:
          return this.color;
        case t.ObjectPropID.OutlineColor:
          return this.strokeColor;
        case t.ObjectPropID.FontSize:
          return this.fontSize;
        default:
          return e.prototype.getProp.call(this, i);
      }
    }, i.prototype.setProp = function (i, o) {
      switch (i) {
        case t.ObjectPropID.Color:
          this.color = o;
          break;
        case t.ObjectPropID.OutlineColor:
          this.strokeColor = o;
          break;
        case t.ObjectPropID.FontSize:
          this.fontSize = o;
          break;
        default:
          e.prototype.setProp.call(this, i, o);
      }
    }, i.prototype.setup_beforeAdd = function (t, i) {
      if (e.prototype.setup_beforeAdd.call(this, t, i), t.seek(i, 5), this.font = t.readS(), this.fontSize = t.readShort(), this.color = t.readColor(), this.align = t.readByte(), this.verticalAlign = t.readByte(), this.leading = t.readShort(), this.letterSpacing = t.readShort(), this._ubbEnabled = t.readBool(), this.autoSize = t.readByte(), this.underline = t.readBool(), this.italic = t.readBool(), this.bold = t.readBool(), this.singleLine = t.readBool(), t.readBool() && (this.strokeColor = t.readColor(), this.stroke = t.readFloat()), t.readBool()) {
        this.shadowColor = t.readColor();
        var o = t.readFloat(),
          n = t.readFloat();
        this.shadowOffset = new cc.Vec2(o, n);
      }
      t.readBool() && (this._templateVars = {});
    }, i.prototype.setup_afterAdd = function (t, i) {
      e.prototype.setup_afterAdd.call(this, t, i), t.seek(i, 6);
      var o = t.readS();
      null != o && (this.text = o);
    }, i;
  }(t.GObject);
  t.GTextField = e;
}(fgui || (fgui = {})), function (t) {
  var e = function (e) {
    function i() {
      return null !== e && e.apply(this, arguments) || this;
    }
    return __extends(i, e), i.prototype.getSpriteFrame = function (i) {
      var o = t.UIPackage.getItemByURL(i);
      if (o) {
        if (o.load(), o.type == t.PackageItemType.Image) return o.asset;
        if (o.type == t.PackageItemType.MovieClip) return o.frames[0].texture;
      }
      return e.prototype.getSpriteFrame.call(this, i);
    }, i;
  }(cc.SpriteAtlas);
  t.RichTextImageAtlas = e;
  var i = new e(),
    o = function (e) {
      function o() {
        var i = e.call(this) || this;
        return i._node.name = "GRichTextField", i._touchDisabled = !1, i.linkUnderline = t.UIConfig.linkUnderline, i;
      }
      return __extends(o, e), o.prototype.createRenderer = function () {
        this._richText = this._node.addComponent(cc.RichText), this._richText.handleTouchEvent = !1, this.autoSize = t.AutoSizeType.None, this._richText.imageAtlas = i;
      }, Object.defineProperty(o.prototype, "align", {
        get: function get() {
          return this._richText.horizontalAlign;
        },
        set: function set(t) {
          this._richText.horizontalAlign = t;
        },
        enumerable: !1,
        configurable: !0
      }), Object.defineProperty(o.prototype, "underline", {
        get: function get() {
          return this._underline;
        },
        set: function set(t) {
          this._underline != t && (this._underline = t, this.updateText());
        },
        enumerable: !1,
        configurable: !0
      }), Object.defineProperty(o.prototype, "bold", {
        get: function get() {
          return this._bold;
        },
        set: function set(t) {
          this._bold != t && (this._bold = t, this.updateText());
        },
        enumerable: !1,
        configurable: !0
      }), Object.defineProperty(o.prototype, "italic", {
        get: function get() {
          return this._italics;
        },
        set: function set(t) {
          this._italics != t && (this._italics = t, this.updateText());
        },
        enumerable: !1,
        configurable: !0
      }), o.prototype.markSizeChanged = function () {}, o.prototype.updateText = function () {
        var e = this._text;
        this._templateVars && (e = this.parseTemplate(e)), this._ubbEnabled && (t.UBBParser.inst.linkUnderline = this.linkUnderline, t.UBBParser.inst.linkColor = this.linkColor, e = t.UBBParser.inst.parse(e)), this._bold && (e = "<b>" + e + "</b>"), this._italics && (e = "<i>" + e + "</i>"), this._underline && (e = "<u>" + e + "</u>");
        var i = this._color;
        this._grayed && (i = t.ToolSet.toGrayed(i)), e = "<color=" + i.toHEX("#rrggbb") + ">" + e + "</color>", this._autoSize == t.AutoSizeType.Both ? (0 != this._richText.maxWidth && (this._richText.maxWidth = 0), this._richText.string = e, 0 != this.maxWidth && this._node.width > this.maxWidth && (this._richText.maxWidth = this.maxWidth)) : this._richText.string = e;
      }, o.prototype.updateFont = function () {
        this.assignFont(this._richText, this._realFont);
      }, o.prototype.updateFontColor = function () {
        this.assignFontColor(this._richText, this._color);
      }, o.prototype.updateFontSize = function () {
        var t = this._fontSize,
          e = this._richText.font;
        e instanceof cc.BitmapFont && (e._fntConfig.resizable || (t = e._fntConfig.fontSize)), this._richText.fontSize = t, this._richText.lineHeight = t + 2 * this._leading;
      }, o.prototype.updateOverflow = function () {
        this._autoSize == t.AutoSizeType.Both ? this._richText.maxWidth = 0 : this._richText.maxWidth = this._width;
      }, o.prototype.handleSizeChanged = function () {
        this._updatingSize || this._autoSize != t.AutoSizeType.Both && (this._richText.maxWidth = this._width);
      }, o;
    }(t.GTextField);
  t.GRichTextField = o;
}(fgui || (fgui = {})), function (t) {
  var e = function (e) {
    function i() {
      var i = e.call(this) || this;
      return i._node.name = "GRoot", i.opaque = !1, i._volumeScale = 1, i._popupStack = new Array(), i._justClosedPopups = new Array(), i._modalLayer = new t.GGraph(), i._modalLayer.setSize(i.width, i.height), i._modalLayer.drawRect(0, cc.Color.TRANSPARENT, t.UIConfig.modalLayerColor), i._modalLayer.addRelation(i, t.RelationType.Size), i._thisOnResized = i.onWinResize.bind(i), i._inputProcessor = i.node.addComponent(t.InputProcessor), i._inputProcessor._captureCallback = i.onTouchBegin_1, cc.view.on("canvas-resize", i._thisOnResized), i.onWinResize(), i;
    }
    return __extends(i, e), Object.defineProperty(i, "inst", {
      get: function get() {
        if (!i._inst) throw "Call GRoot.create first!";
        return i._inst;
      },
      enumerable: !1,
      configurable: !0
    }), i.create = function () {
      return i._inst = new i(), i._inst.node.parent = cc.director.getScene(), i._inst;
    }, i.prototype.onDestroy = function () {
      cc.view.off("canvas-resize", this._thisOnResized), this == i._inst && (i._inst = null);
    }, i.prototype.getTouchPosition = function (t) {
      return this._inputProcessor.getTouchPosition(t);
    }, Object.defineProperty(i.prototype, "touchTarget", {
      get: function get() {
        return this._inputProcessor.getTouchTarget();
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "inputProcessor", {
      get: function get() {
        return this._inputProcessor;
      },
      enumerable: !1,
      configurable: !0
    }), i.prototype.showWindow = function (t) {
      this.addChild(t), t.requestFocus(), t.x > this.width ? t.x = this.width - t.width : t.x + t.width < 0 && (t.x = 0), t.y > this.height ? t.y = this.height - t.height : t.y + t.height < 0 && (t.y = 0), this.adjustModalLayer();
    }, i.prototype.hideWindow = function (t) {
      t.hide();
    }, i.prototype.hideWindowImmediately = function (t) {
      t.parent == this && this.removeChild(t), this.adjustModalLayer();
    }, i.prototype.bringToFront = function (e) {
      var i,
        o = this.numChildren;
      for (i = this._modalLayer.parent && !e.modal ? this.getChildIndex(this._modalLayer) - 1 : o - 1; i >= 0; i--) {
        var n = this.getChildAt(i);
        if (n == e) return;
        if (n instanceof t.Window) break;
      }
      i >= 0 && this.setChildIndex(e, i);
    }, i.prototype.showModalWait = function (e) {
      null != t.UIConfig.globalModalWaiting && (null == this._modalWaitPane && (this._modalWaitPane = t.UIPackage.createObjectFromURL(t.UIConfig.globalModalWaiting)), this._modalWaitPane.setSize(this.width, this.height), this._modalWaitPane.addRelation(this, t.RelationType.Size), this.addChild(this._modalWaitPane), this._modalWaitPane.text = e);
    }, i.prototype.closeModalWait = function () {
      this._modalWaitPane && this._modalWaitPane.parent && this.removeChild(this._modalWaitPane);
    }, i.prototype.closeAllExceptModals = function () {
      for (var e = this._children.slice(), i = e.length, o = 0; o < i; o++) {
        var n = e[o];
        n instanceof t.Window && !n.modal && n.hide();
      }
    }, i.prototype.closeAllWindows = function () {
      for (var e = this._children.slice(), i = e.length, o = 0; o < i; o++) {
        var n = e[o];
        n instanceof t.Window && n.hide();
      }
    }, i.prototype.getTopWindow = function () {
      for (var e = this.numChildren - 1; e >= 0; e--) {
        var i = this.getChildAt(e);
        if (i instanceof t.Window) return i;
      }
      return null;
    }, Object.defineProperty(i.prototype, "modalLayer", {
      get: function get() {
        return this._modalLayer;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "hasModalWindow", {
      get: function get() {
        return null != this._modalLayer.parent;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "modalWaiting", {
      get: function get() {
        return this._modalWaitPane && this._modalWaitPane.node.activeInHierarchy;
      },
      enumerable: !1,
      configurable: !0
    }), i.prototype.getPopupPosition = function (e, i, o, n) {
      var r = n || new cc.Vec2(),
        s = 0,
        h = 0;
      if (i) {
        r = i.localToGlobal();
        var a = i.localToGlobal(i.width, i.height);
        s = a.x - r.x, h = a.y - r.y;
      } else r = this.getTouchPosition(), r = this.globalToLocal(r.x, r.y);
      return r.x + e.width > this.width && (r.x = r.x + s - e.width), r.y += h, ((void 0 === o || o === t.PopupDirection.Auto) && r.y + e.height > this.height || !1 === o || o === t.PopupDirection.Up) && (r.y = r.y - h - e.height - 1, r.y < 0 && (r.y = 0, r.x += s / 2)), r;
    }, i.prototype.showPopup = function (t, e, i) {
      if (this._popupStack.length > 0) {
        var o = this._popupStack.indexOf(t);
        if (-1 != o) for (var n = this._popupStack.length - 1; n >= o; n--) this.removeChild(this._popupStack.pop());
      }
      if (this._popupStack.push(t), e) for (var r = e; r;) {
        if (r.parent == this) {
          t.sortingOrder < r.sortingOrder && (t.sortingOrder = r.sortingOrder);
          break;
        }
        r = r.parent;
      }
      this.addChild(t), this.adjustModalLayer();
      var s = this.getPopupPosition(t, e, i);
      t.setPosition(s.x, s.y);
    }, i.prototype.togglePopup = function (t, e, i) {
      -1 == this._justClosedPopups.indexOf(t) && this.showPopup(t, e, i);
    }, i.prototype.hidePopup = function (t) {
      if (t) {
        var e = this._popupStack.indexOf(t);
        if (-1 != e) for (var i = this._popupStack.length - 1; i >= e; i--) this.closePopup(this._popupStack.pop());
      } else {
        for (i = this._popupStack.length - 1; i >= 0; i--) this.closePopup(this._popupStack[i]);
        this._popupStack.length = 0;
      }
    }, Object.defineProperty(i.prototype, "hasAnyPopup", {
      get: function get() {
        return 0 != this._popupStack.length;
      },
      enumerable: !1,
      configurable: !0
    }), i.prototype.closePopup = function (e) {
      e.parent && (e instanceof t.Window ? e.hide() : this.removeChild(e));
    }, i.prototype.showTooltips = function (e) {
      if (null == this._defaultTooltipWin) {
        var i = t.UIConfig.tooltipsWin;
        if (!i) return void console.error("UIConfig.tooltipsWin not defined");
        this._defaultTooltipWin = t.UIPackage.createObjectFromURL(i);
      }
      this._defaultTooltipWin.text = e, this.showTooltipsWin(this._defaultTooltipWin);
    }, i.prototype.showTooltipsWin = function (t) {
      this.hideTooltips(), this._tooltipWin = t;
      var e = this.getTouchPosition();
      e.x += 10, e.y += 20, this.globalToLocal(e.x, e.y, e), e.x + this._tooltipWin.width > this.width && (e.x = e.x - this._tooltipWin.width - 1, e.x < 0 && (e.x = 10)), e.y + this._tooltipWin.height > this.height && (e.y = e.y - this._tooltipWin.height - 1, e.y < 0 && (e.y = 10)), this._tooltipWin.setPosition(e.x, e.y), this.addChild(this._tooltipWin);
    }, i.prototype.hideTooltips = function () {
      this._tooltipWin && (this._tooltipWin.parent && this.removeChild(this._tooltipWin), this._tooltipWin = null);
    }, Object.defineProperty(i.prototype, "volumeScale", {
      get: function get() {
        return this._volumeScale;
      },
      set: function set(t) {
        this._volumeScale = t;
      },
      enumerable: !1,
      configurable: !0
    }), i.prototype.playOneShotSound = function (t, e) {
      void 0 === e && (e = 1), cc.audioEngine.play(t, !1, this._volumeScale * e);
    }, i.prototype.adjustModalLayer = function () {
      var e = this.numChildren;
      this._modalWaitPane && this._modalWaitPane.parent && this.setChildIndex(this._modalWaitPane, e - 1);
      for (var i = e - 1; i >= 0; i--) {
        var o = this.getChildAt(i);
        if (o instanceof t.Window && o.modal) return void (null == this._modalLayer.parent ? this.addChildAt(this._modalLayer, i) : this.setChildIndexBefore(this._modalLayer, i));
      }
      this._modalLayer.parent && this.removeChild(this._modalLayer);
    }, i.prototype.onTouchBegin_1 = function (t) {
      if (this._tooltipWin && this.hideTooltips(), this._justClosedPopups.length = 0, this._popupStack.length > 0) {
        for (var e = t.initiator; e && e != this;) {
          var i = this._popupStack.indexOf(e);
          if (-1 != i) {
            for (var o = this._popupStack.length - 1; o > i; o--) {
              var n = this._popupStack.pop();
              this.closePopup(n), this._justClosedPopups.push(n);
            }
            return;
          }
          e = e.findParent();
        }
        for (o = this._popupStack.length - 1; o >= 0; o--) n = this._popupStack[o], this.closePopup(n), this._justClosedPopups.push(n);
        this._popupStack.length = 0;
      }
    }, i.prototype.onWinResize = function () {
      var t = cc.view.getCanvasSize();
      t.width /= cc.view.getScaleX(), t.height /= cc.view.getScaleY();
      var e = cc.view.getViewportRect().origin;
      e.x = e.x / cc.view.getScaleX(), e.y = e.y / cc.view.getScaleY(), this.setSize(t.width, t.height), this._node.setPosition(-e.x, this._height - e.y), this.updateContentScaleLevel();
    }, i.prototype.handlePositionChanged = function () {}, i.prototype.updateContentScaleLevel = function () {
      var t = Math.max(cc.view.getScaleX(), cc.view.getScaleY());
      i.contentScaleLevel = t >= 3.5 ? 3 : t >= 2.5 ? 2 : t >= 1.5 ? 1 : 0;
    }, i.contentScaleLevel = 0, i;
  }(t.GComponent);
  t.GRoot = e;
}(fgui || (fgui = {})), function (t) {
  var e = function (e) {
    function o() {
      var t = e.call(this) || this;
      return t._node.name = "GScrollBar", t._dragOffset = new cc.Vec2(), t._scrollPerc = 0, t;
    }
    return __extends(o, e), o.prototype.setScrollPane = function (t, e) {
      this._target = t, this._vertical = e;
    }, o.prototype.setDisplayPerc = function (t) {
      this._vertical ? (this._fixedGripSize || (this._grip.height = Math.floor(t * this._bar.height)), this._grip.y = this._bar.y + (this._bar.height - this._grip.height) * this._scrollPerc) : (this._fixedGripSize || (this._grip.width = Math.floor(t * this._bar.width)), this._grip.x = this._bar.x + (this._bar.width - this._grip.width) * this._scrollPerc), this._grip.visible = 0 != t && 1 != t;
    }, o.prototype.setScrollPerc = function (t) {
      this._scrollPerc = t, this._vertical ? this._grip.y = this._bar.y + (this._bar.height - this._grip.height) * this._scrollPerc : this._grip.x = this._bar.x + (this._bar.width - this._grip.width) * this._scrollPerc;
    }, Object.defineProperty(o.prototype, "minSize", {
      get: function get() {
        return this._vertical ? (this._arrowButton1 ? this._arrowButton1.height : 0) + (this._arrowButton2 ? this._arrowButton2.height : 0) : (this._arrowButton1 ? this._arrowButton1.width : 0) + (this._arrowButton2 ? this._arrowButton2.width : 0);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(o.prototype, "gripDragging", {
      get: function get() {
        return this._gripDragging;
      },
      enumerable: !1,
      configurable: !0
    }), o.prototype.constructExtension = function (e) {
      e.seek(0, 6), this._fixedGripSize = e.readBool(), this._grip = this.getChild("grip"), this._grip ? (this._bar = this.getChild("bar"), this._bar ? (this._arrowButton1 = this.getChild("arrow1"), this._arrowButton2 = this.getChild("arrow2"), this._grip.on(t.Event.TOUCH_BEGIN, this.onGripTouchDown, this), this._grip.on(t.Event.TOUCH_MOVE, this.onGripTouchMove, this), this._grip.on(t.Event.TOUCH_END, this.onGripTouchEnd, this), this._arrowButton1 && this._arrowButton1.on(t.Event.TOUCH_BEGIN, this.onClickArrow1, this), this._arrowButton2 && this._arrowButton2.on(t.Event.TOUCH_BEGIN, this.onClickArrow2, this), this.on(t.Event.TOUCH_BEGIN, this.onBarTouchBegin, this)) : console.error("需要定义bar")) : console.error("需要定义grip");
    }, o.prototype.onGripTouchDown = function (t) {
      t.stopPropagation(), t.captureTouch(), this._gripDragging = !0, this._target.updateScrollBarVisible(), this.globalToLocal(t.pos.x, t.pos.y, this._dragOffset), this._dragOffset.x -= this._grip.x, this._dragOffset.y -= this._grip.y;
    }, o.prototype.onGripTouchMove = function (t) {
      if (this.onStage) {
        var e = this.globalToLocal(t.pos.x, t.pos.y, i);
        if (this._vertical) {
          var o = e.y - this._dragOffset.y;
          this._target.setPercY((o - this._bar.y) / (this._bar.height - this._grip.height), !1);
        } else {
          var n = e.x - this._dragOffset.x;
          this._target.setPercX((n - this._bar.x) / (this._bar.width - this._grip.width), !1);
        }
      }
    }, o.prototype.onGripTouchEnd = function () {
      this.onStage && (this._gripDragging = !1, this._target.updateScrollBarVisible());
    }, o.prototype.onClickArrow1 = function (t) {
      t.stopPropagation(), this._vertical ? this._target.scrollUp() : this._target.scrollLeft();
    }, o.prototype.onClickArrow2 = function (t) {
      t.stopPropagation(), this._vertical ? this._target.scrollDown() : this._target.scrollRight();
    }, o.prototype.onBarTouchBegin = function (t) {
      var e = this._grip.globalToLocal(t.pos.x, t.pos.y, i);
      this._vertical ? e.y < 0 ? this._target.scrollUp(4) : this._target.scrollDown(4) : e.x < 0 ? this._target.scrollLeft(4) : this._target.scrollRight(4);
    }, o;
  }(t.GComponent);
  t.GScrollBar = e;
  var i = new cc.Vec2();
}(fgui || (fgui = {})), function (t) {
  var e = function (e) {
    function o() {
      var i = e.call(this) || this;
      return i._min = 0, i._max = 0, i._value = 0, i._barMaxWidth = 0, i._barMaxHeight = 0, i._barMaxWidthDelta = 0, i._barMaxHeightDelta = 0, i._clickPercent = 0, i._barStartX = 0, i._barStartY = 0, i.changeOnClick = !0, i.canDrag = !0, i._node.name = "GSlider", i._titleType = t.ProgressTitleType.Percent, i._value = 50, i._max = 100, i._clickPos = new cc.Vec2(), i;
    }
    return __extends(o, e), Object.defineProperty(o.prototype, "titleType", {
      get: function get() {
        return this._titleType;
      },
      set: function set(t) {
        this._titleType = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(o.prototype, "wholeNumbers", {
      get: function get() {
        return this._wholeNumbers;
      },
      set: function set(t) {
        this._wholeNumbers != t && (this._wholeNumbers = t, this.update());
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(o.prototype, "min", {
      get: function get() {
        return this._min;
      },
      set: function set(t) {
        this._min != t && (this._min = t, this.update());
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(o.prototype, "max", {
      get: function get() {
        return this._max;
      },
      set: function set(t) {
        this._max != t && (this._max = t, this.update());
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(o.prototype, "value", {
      get: function get() {
        return this._value;
      },
      set: function set(t) {
        this._value != t && (this._value = t, this.update());
      },
      enumerable: !1,
      configurable: !0
    }), o.prototype.update = function () {
      this.updateWithPercent((this._value - this._min) / (this._max - this._min));
    }, o.prototype.updateWithPercent = function (e, i) {
      if (e = t.ToolSet.clamp01(e), i) {
        var o = t.ToolSet.clamp(this._min + (this._max - this._min) * e, this._min, this._max);
        this._wholeNumbers && (o = Math.round(o), e = t.ToolSet.clamp01((o - this._min) / (this._max - this._min))), o != this._value && (this._value = o, this._node.emit(t.Event.STATUS_CHANGED, this));
      }
      if (this._titleObject) switch (this._titleType) {
        case t.ProgressTitleType.Percent:
          this._titleObject.text = Math.floor(100 * e) + "%";
          break;
        case t.ProgressTitleType.ValueAndMax:
          this._titleObject.text = this._value + "/" + this._max;
          break;
        case t.ProgressTitleType.Value:
          this._titleObject.text = "" + this._value;
          break;
        case t.ProgressTitleType.Max:
          this._titleObject.text = "" + this._max;
      }
      var n = this.width - this._barMaxWidthDelta,
        r = this.height - this._barMaxHeightDelta;
      this._reverse ? (this._barObjectH && (this._barObjectH.width = Math.round(n * e), this._barObjectH.x = this._barStartX + (n - this._barObjectH.width)), this._barObjectV && (this._barObjectV.height = Math.round(r * e), this._barObjectV.y = this._barStartY + (r - this._barObjectV.height))) : (this._barObjectH && (this._barObjectH.width = Math.round(n * e)), this._barObjectV && (this._barObjectV.height = Math.round(r * e)));
    }, o.prototype.constructExtension = function (e) {
      e.seek(0, 6), this._titleType = e.readByte(), this._reverse = e.readBool(), e.version >= 2 && (this._wholeNumbers = e.readBool(), this.changeOnClick = e.readBool()), this._titleObject = this.getChild("title"), this._barObjectH = this.getChild("bar"), this._barObjectV = this.getChild("bar_v"), this._gripObject = this.getChild("grip"), this._barObjectH && (this._barMaxWidth = this._barObjectH.width, this._barMaxWidthDelta = this.width - this._barMaxWidth, this._barStartX = this._barObjectH.x), this._barObjectV && (this._barMaxHeight = this._barObjectV.height, this._barMaxHeightDelta = this.height - this._barMaxHeight, this._barStartY = this._barObjectV.y), this._gripObject && (this._gripObject.on(t.Event.TOUCH_BEGIN, this.onGripTouchBegin, this), this._gripObject.on(t.Event.TOUCH_MOVE, this.onGripTouchMove, this)), this._node.on(t.Event.TOUCH_BEGIN, this.onBarTouchBegin, this);
    }, o.prototype.handleSizeChanged = function () {
      e.prototype.handleSizeChanged.call(this), this._barObjectH && (this._barMaxWidth = this.width - this._barMaxWidthDelta), this._barObjectV && (this._barMaxHeight = this.height - this._barMaxHeightDelta), this._underConstruct || this.update();
    }, o.prototype.setup_afterAdd = function (t, i) {
      e.prototype.setup_afterAdd.call(this, t, i), t.seek(i, 6) && t.readByte() == this.packageItem.objectType ? (this._value = t.readInt(), this._max = t.readInt(), t.version >= 2 && (this._min = t.readInt()), this.update()) : this.update();
    }, o.prototype.onGripTouchBegin = function (e) {
      this.canDrag = !0, e.stopPropagation(), e.captureTouch(), this._clickPos = this.globalToLocal(e.pos.x, e.pos.y), this._clickPercent = t.ToolSet.clamp01((this._value - this._min) / (this._max - this._min));
    }, o.prototype.onGripTouchMove = function (t) {
      if (this.canDrag) {
        var e,
          o = this.globalToLocal(t.pos.x, t.pos.y, i),
          n = o.x - this._clickPos.x,
          r = o.y - this._clickPos.y;
        this._reverse && (n = -n, r = -r), e = this._barObjectH ? this._clickPercent + n / this._barMaxWidth : this._clickPercent + r / this._barMaxHeight, this.updateWithPercent(e, !0);
      }
    }, o.prototype.onBarTouchBegin = function (e) {
      if (this.changeOnClick) {
        var o = this._gripObject.globalToLocal(e.pos.x, e.pos.y, i),
          n = t.ToolSet.clamp01((this._value - this._min) / (this._max - this._min)),
          r = 0;
        null != this._barObjectH && (r = (o.x - this._gripObject.width / 2) / this._barMaxWidth), null != this._barObjectV && (r = (o.y - this._gripObject.height / 2) / this._barMaxHeight), this._reverse ? n -= r : n += r, this.updateWithPercent(n, !0);
      }
    }, o;
  }(t.GComponent);
  t.GSlider = e;
  var i = new cc.Vec2();
}(fgui || (fgui = {})), function (t) {
  var e = function (e) {
    function o() {
      var t = e.call(this) || this;
      return t._node.name = "GTextInput", t._touchDisabled = !1, t;
    }
    return __extends(o, e), o.prototype.createRenderer = function () {
      this._editBox = this._node.addComponent(i), this._editBox.maxLength = -1, this._editBox._updateTextLabel(), this._node.on("text-changed", this.onTextChanged, this), this.on(t.Event.TOUCH_END, this.onTouchEnd1, this), this.autoSize = t.AutoSizeType.None;
    }, Object.defineProperty(o.prototype, "editable", {
      get: function get() {
        return this._editBox.enabled;
      },
      set: function set(t) {
        this._editBox.enabled = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(o.prototype, "maxLength", {
      get: function get() {
        return this._editBox.maxLength;
      },
      set: function set(t) {
        0 == t && (t = -1), this._editBox.maxLength = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(o.prototype, "promptText", {
      get: function get() {
        return this._promptText;
      },
      set: function set(e) {
        this._promptText = e;
        var i = !this._editBox.placeholderLabel;
        if (this._editBox._updatePlaceholderLabel(), i && this.assignFont(this._editBox.placeholderLabel, this._realFont), this._editBox.placeholderLabel.string = t.UBBParser.inst.parse(this._promptText, !0), t.UBBParser.inst.lastColor) {
          var o = this._editBox.placeholderLabel.node.color;
          o || (o = new cc.Color()), o.fromHEX(t.UBBParser.inst.lastColor), this.assignFontColor(this._editBox.placeholderLabel, o);
        } else this.assignFontColor(this._editBox.placeholderLabel, this._color);
        t.UBBParser.inst.lastSize ? this._editBox.placeholderLabel.fontSize = parseInt(t.UBBParser.inst.lastSize) : this._editBox.placeholderLabel.fontSize = this._fontSize;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(o.prototype, "restrict", {
      get: function get() {
        return "";
      },
      set: function set() {},
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(o.prototype, "password", {
      get: function get() {
        return this._editBox.inputFlag == cc.EditBox.InputFlag.PASSWORD;
      },
      set: function set(t) {
        this._editBox.inputFlag = t ? cc.EditBox.InputFlag.PASSWORD : cc.EditBox.InputFlag.DEFAULT;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(o.prototype, "align", {
      get: function get() {
        return this._editBox.textLabel.horizontalAlign;
      },
      set: function set(t) {
        this._editBox.textLabel.horizontalAlign = t, this._editBox.placeholderLabel && (this._editBox.placeholderLabel.horizontalAlign = t);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(o.prototype, "verticalAlign", {
      get: function get() {
        return this._editBox.textLabel.verticalAlign;
      },
      set: function set(t) {
        this._editBox.textLabel.verticalAlign = t, this._editBox.placeholderLabel && (this._editBox.placeholderLabel.verticalAlign = t);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(o.prototype, "singleLine", {
      get: function get() {
        return this._editBox.inputMode != cc.EditBox.InputMode.ANY;
      },
      set: function set(t) {
        this._editBox.inputMode = t ? cc.EditBox.InputMode.SINGLE_LINE : cc.EditBox.InputMode.ANY;
      },
      enumerable: !1,
      configurable: !0
    }), o.prototype.requestFocus = function () {
      this._editBox.focus();
    }, o.prototype.markSizeChanged = function () {}, o.prototype.updateText = function () {
      var e = this._text;
      this._templateVars && (e = this.parseTemplate(e)), this._ubbEnabled && (e = t.UBBParser.inst.parse(t.ToolSet.encodeHTML(e), !0)), this._editBox.string = e;
    }, o.prototype.updateFont = function () {
      this.assignFont(this._editBox.textLabel, this._realFont), this._editBox.placeholderLabel && this.assignFont(this._editBox.placeholderLabel, this._realFont);
    }, o.prototype.updateFontColor = function () {
      this.assignFontColor(this._editBox.textLabel, this._color);
    }, o.prototype.updateFontSize = function () {
      this._editBox.textLabel.fontSize = this._fontSize, this._editBox.textLabel.lineHeight = this._fontSize + this._leading, this._editBox.placeholderLabel && (this._editBox.placeholderLabel.fontSize = this._editBox.textLabel.fontSize);
    }, o.prototype.updateOverflow = function () {}, o.prototype.onTextChanged = function () {
      this._text = this._editBox.string;
    }, o.prototype.onTouchEnd1 = function (t) {
      this._editBox.openKeyboard(t.touch);
    }, o.prototype.setup_beforeAdd = function (t, i) {
      e.prototype.setup_beforeAdd.call(this, t, i), t.seek(i, 4);
      var o = t.readS();
      null != o && (this.promptText = o), null != (o = t.readS()) && (this.restrict = o);
      var n = t.readInt();
      if (0 != n && (this.maxLength = n), n = t.readInt(), t.readBool() && (this.password = !0), this._editBox.placeholderLabel) {
        var r = this._editBox.textLabel.horizontalAlign;
        this._editBox.placeholderLabel.horizontalAlign = r;
        var s = this._editBox.textLabel.verticalAlign;
        this._editBox.placeholderLabel.verticalAlign = s;
      }
    }, o;
  }(t.GTextField);
  t.GTextInput = e;
  var i = function (t) {
    function e() {
      return null !== t && t.apply(this, arguments) || this;
    }
    return __extends(e, t), e.prototype._registerEvent = function () {}, e.prototype._syncSize = function () {
      var t = this.node.getContentSize();
      this._impl.setSize(t.width, t.height), this.textLabel && this.textLabel.node.setContentSize(t.width, t.height), this.placeholderLabel && this.placeholderLabel.node.setContentSize(t.width, t.height);
    }, e.prototype.openKeyboard = function () {
      var t = this._impl;
      t && t.beginEditing();
    }, e;
  }(cc.EditBox);
}(fgui || (fgui = {})), function (t) {
  var e = function (e) {
    function o() {
      var i = e.call(this) || this;
      return i._indent = 15, i._rootNode = new t.GTreeNode(!0), i._rootNode._setTree(i), i._rootNode.expanded = !0, i;
    }
    return __extends(o, e), Object.defineProperty(o.prototype, "rootNode", {
      get: function get() {
        return this._rootNode;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(o.prototype, "indent", {
      get: function get() {
        return this._indent;
      },
      set: function set(t) {
        this._indent = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(o.prototype, "clickToExpand", {
      get: function get() {
        return this._clickToExpand;
      },
      set: function set(t) {
        this._clickToExpand = t;
      },
      enumerable: !1,
      configurable: !0
    }), o.prototype.getSelectedNode = function () {
      return -1 != this.selectedIndex ? this.getChildAt(this.selectedIndex)._treeNode : null;
    }, o.prototype.getSelectedNodes = function (t) {
      t || (t = new Array()), i.length = 0, e.prototype.getSelection.call(this, i);
      for (var o = i.length, n = new Array(), r = 0; r < o; r++) {
        var s = this.getChildAt(i[r])._treeNode;
        n.push(s);
      }
      return n;
    }, o.prototype.selectNode = function (t, e) {
      for (var i = t.parent; i && i != this._rootNode;) i.expanded = !0, i = i.parent;
      t._cell && this.addSelection(this.getChildIndex(t._cell), e);
    }, o.prototype.unselectNode = function (t) {
      t._cell && this.removeSelection(this.getChildIndex(t._cell));
    }, o.prototype.expandAll = function (t) {
      t || (t = this._rootNode), t.expanded = !0;
      for (var e = t.numChildren, i = 0; i < e; i++) {
        var o = t.getChildAt(i);
        o.isFolder && this.expandAll(o);
      }
    }, o.prototype.collapseAll = function (t) {
      t || (t = this._rootNode), t != this._rootNode && (t.expanded = !1);
      for (var e = t.numChildren, i = 0; i < e; i++) {
        var o = t.getChildAt(i);
        o.isFolder && this.collapseAll(o);
      }
    }, o.prototype.createCell = function (e) {
      var i = this.getFromPool(e._resURL);
      if (!(i instanceof t.GComponent)) throw new Error("cannot create tree node object.");
      i._treeNode = e, e._cell = i;
      var o,
        n = i.getChild("indent");
      n && (n.width = (e.level - 1) * this._indent), (o = i.getController("expanded")) && (o.on(t.Event.STATUS_CHANGED, this.__expandedStateChanged, this), o.selectedIndex = e.expanded ? 1 : 0), (o = i.getController("leaf")) && (o.selectedIndex = e.isFolder ? 0 : 1), e.isFolder && e._cell.on(t.Event.TOUCH_BEGIN, this.__cellMouseDown, this), this.treeNodeRender && this.treeNodeRender(e, i);
    }, o.prototype._afterInserted = function (t) {
      t._cell || this.createCell(t);
      var e = this.getInsertIndexForNode(t);
      this.addChildAt(t._cell, e), this.treeNodeRender && this.treeNodeRender(t, t._cell), t.isFolder && t.expanded && this.checkChildren(t, e);
    }, o.prototype.getInsertIndexForNode = function (t) {
      var e = t.getPrevSibling();
      null == e && (e = t.parent);
      for (var i = this.getChildIndex(e._cell) + 1, o = t.level, n = this.numChildren, r = i; r < n && !(this.getChildAt(r)._treeNode.level <= o); r++) i++;
      return i;
    }, o.prototype._afterRemoved = function (t) {
      this.removeNode(t);
    }, o.prototype._afterExpanded = function (t) {
      if (t != this._rootNode) {
        if (null != this.treeNodeWillExpand && this.treeNodeWillExpand(t, !0), null != t._cell) {
          this.treeNodeRender && this.treeNodeRender(t, t._cell);
          var e = t._cell.getController("expanded");
          e && (e.selectedIndex = 1), t._cell.parent && this.checkChildren(t, this.getChildIndex(t._cell));
        }
      } else this.checkChildren(this._rootNode, 0);
    }, o.prototype._afterCollapsed = function (t) {
      if (t != this._rootNode) {
        if (this.treeNodeWillExpand && this.treeNodeWillExpand(t, !1), null != t._cell) {
          this.treeNodeRender && this.treeNodeRender(t, t._cell);
          var e = t._cell.getController("expanded");
          e && (e.selectedIndex = 0), t._cell.parent && this.hideFolderNode(t);
        }
      } else this.checkChildren(this._rootNode, 0);
    }, o.prototype._afterMoved = function (t) {
      var e,
        i = this.getChildIndex(t._cell);
      e = t.isFolder ? this.getFolderEndIndex(i, t.level) : i + 1;
      var o,
        n,
        r = this.getInsertIndexForNode(t),
        s = e - i;
      if (r < i) for (o = 0; o < s; o++) n = this.getChildAt(i + o), this.setChildIndex(n, r + o);else for (o = 0; o < s; o++) n = this.getChildAt(i), this.setChildIndex(n, r);
    }, o.prototype.getFolderEndIndex = function (t, e) {
      for (var i = this.numChildren, o = t + 1; o < i; o++) if (this.getChildAt(o)._treeNode.level <= e) return o;
      return i;
    }, o.prototype.checkChildren = function (t, e) {
      for (var i = t.numChildren, o = 0; o < i; o++) {
        e++;
        var n = t.getChildAt(o);
        null == n._cell && this.createCell(n), n._cell.parent || this.addChildAt(n._cell, e), n.isFolder && n.expanded && (e = this.checkChildren(n, e));
      }
      return e;
    }, o.prototype.hideFolderNode = function (t) {
      for (var e = t.numChildren, i = 0; i < e; i++) {
        var o = t.getChildAt(i);
        o._cell && this.removeChild(o._cell), o.isFolder && o.expanded && this.hideFolderNode(o);
      }
    }, o.prototype.removeNode = function (t) {
      if (t._cell && (t._cell.parent && this.removeChild(t._cell), this.returnToPool(t._cell), t._cell._treeNode = null, t._cell = null), t.isFolder) for (var e = t.numChildren, i = 0; i < e; i++) {
        var o = t.getChildAt(i);
        this.removeNode(o);
      }
    }, o.prototype.__cellMouseDown = function (e) {
      var i = t.GObject.cast(e.currentTarget)._treeNode;
      this._expandedStatusInEvt = i.expanded;
    }, o.prototype.__expandedStateChanged = function (t) {
      t.parent._treeNode.expanded = 1 == t.selectedIndex;
    }, o.prototype.dispatchItemEvent = function (t, i) {
      if (0 != this._clickToExpand) {
        var o = t._treeNode;
        o && this._expandedStatusInEvt == o.expanded && (2 == this._clickToExpand || (o.expanded = !o.expanded));
      }
      e.prototype.dispatchItemEvent.call(this, t, i);
    }, o.prototype.setup_beforeAdd = function (t, i) {
      e.prototype.setup_beforeAdd.call(this, t, i), t.seek(i, 9), this._indent = t.readInt(), this._clickToExpand = t.readByte();
    }, o.prototype.readItems = function (e) {
      var i,
        o,
        n,
        r,
        s,
        h,
        a,
        l = 0;
      for (i = e.readShort(), o = 0; o < i; o++) if (n = e.readShort(), n += e.position, null != (r = e.readS()) || (r = this.defaultItem)) {
        s = e.readBool(), a = e.readByte();
        var c = new t.GTreeNode(s, r);
        if (c.expanded = !0, 0 == o) this._rootNode.addChild(c);else if (a > l) h.addChild(c);else if (a < l) {
          for (var u = a; u <= l; u++) h = h.parent;
          h.addChild(c);
        } else h.parent.addChild(c);
        h = c, l = a, this.setupItem(e, c.cell), e.position = n;
      } else e.position = n;
    }, o;
  }(t.GList);
  t.GTree = e;
  var i = new Array();
}(fgui || (fgui = {})), function (t) {
  var e = function () {
    function t(t, e) {
      this._level = 0, this._resURL = e, t && (this._children = new Array());
    }
    return Object.defineProperty(t.prototype, "expanded", {
      get: function get() {
        return this._expanded;
      },
      set: function set(t) {
        null != this._children && this._expanded != t && (this._expanded = t, this._tree && (this._expanded ? this._tree._afterExpanded(this) : this._tree._afterCollapsed(this)));
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "isFolder", {
      get: function get() {
        return null != this._children;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "parent", {
      get: function get() {
        return this._parent;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "text", {
      get: function get() {
        return this._cell ? this._cell.text : null;
      },
      set: function set(t) {
        this._cell && (this._cell.text = t);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "icon", {
      get: function get() {
        return this._cell ? this._cell.icon : null;
      },
      set: function set(t) {
        this._cell && (this._cell.icon = t);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "cell", {
      get: function get() {
        return this._cell;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "level", {
      get: function get() {
        return this._level;
      },
      enumerable: !1,
      configurable: !0
    }), t.prototype._setLevel = function (t) {
      this._level = t;
    }, t.prototype.addChild = function (t) {
      return this.addChildAt(t, this._children.length), t;
    }, t.prototype.addChildAt = function (t, e) {
      if (!t) throw new Error("child is null");
      var i = this._children.length;
      if (e >= 0 && e <= i) return t._parent == this ? this.setChildIndex(t, e) : (t._parent && t._parent.removeChild(t), e == this._children.length ? this._children.push(t) : this._children.splice(e, 0, t), t._parent = this, t._level = this._level + 1, t._setTree(this._tree), (this._tree && this == this._tree.rootNode || this._cell && this._cell.parent && this._expanded) && this._tree._afterInserted(t)), t;
      throw new RangeError("Invalid child index");
    }, t.prototype.removeChild = function (t) {
      var e = this._children.indexOf(t);
      return -1 != e && this.removeChildAt(e), t;
    }, t.prototype.removeChildAt = function (t) {
      if (t >= 0 && t < this.numChildren) {
        var e = this._children[t];
        return this._children.splice(t, 1), e._parent = null, this._tree && (e._setTree(null), this._tree._afterRemoved(e)), e;
      }
      throw "Invalid child index";
    }, t.prototype.removeChildren = function (t, e) {
      t = t || 0, null == e && (e = -1), (e < 0 || e >= this.numChildren) && (e = this.numChildren - 1);
      for (var i = t; i <= e; ++i) this.removeChildAt(t);
    }, t.prototype.getChildAt = function (t) {
      if (t >= 0 && t < this.numChildren) return this._children[t];
      throw "Invalid child index";
    }, t.prototype.getChildIndex = function (t) {
      return this._children.indexOf(t);
    }, t.prototype.getPrevSibling = function () {
      if (null == this._parent) return null;
      var t = this._parent._children.indexOf(this);
      return t <= 0 ? null : this._parent._children[t - 1];
    }, t.prototype.getNextSibling = function () {
      if (null == this._parent) return null;
      var t = this._parent._children.indexOf(this);
      return t < 0 || t >= this._parent._children.length - 1 ? null : this._parent._children[t + 1];
    }, t.prototype.setChildIndex = function (t, e) {
      var i = this._children.indexOf(t);
      if (-1 == i) throw "Not a child of this container";
      var o = this._children.length;
      e < 0 ? e = 0 : e > o && (e = o), i != e && (this._children.splice(i, 1), this._children.splice(e, 0, t), (this._tree && this == this._tree.rootNode || this._cell && this._cell.parent && this._expanded) && this._tree._afterMoved(t));
    }, t.prototype.swapChildren = function (t, e) {
      var i = this._children.indexOf(t),
        o = this._children.indexOf(e);
      if (-1 == i || -1 == o) throw "Not a child of this container";
      this.swapChildrenAt(i, o);
    }, t.prototype.swapChildrenAt = function (t, e) {
      var i = this._children[t],
        o = this._children[e];
      this.setChildIndex(i, e), this.setChildIndex(o, t);
    }, Object.defineProperty(t.prototype, "numChildren", {
      get: function get() {
        return this._children.length;
      },
      enumerable: !1,
      configurable: !0
    }), t.prototype.expandToRoot = function () {
      for (var t = this; t;) t.expanded = !0, t = t.parent;
    }, Object.defineProperty(t.prototype, "tree", {
      get: function get() {
        return this._tree;
      },
      enumerable: !1,
      configurable: !0
    }), t.prototype._setTree = function (t) {
      if (this._tree = t, this._tree && this._tree.treeNodeWillExpand && this._expanded && this._tree.treeNodeWillExpand(this, !0), this._children) for (var e = this._children.length, i = 0; i < e; i++) {
        var o = this._children[i];
        o._level = this._level + 1, o._setTree(t);
      }
    }, t;
  }();
  t.GTreeNode = e;
}(fgui || (fgui = {})), function (t) {
  var e = function () {
    function t() {
      this.left = 0, this.right = 0, this.top = 0, this.bottom = 0;
    }
    return t.prototype.copy = function (t) {
      this.top = t.top, this.bottom = t.bottom, this.left = t.left, this.right = t.right;
    }, t.prototype.isNone = function () {
      return 0 == this.left && 0 == this.right && 0 == this.top && 0 == this.bottom;
    }, t;
  }();
  t.Margin = e;
}(fgui || (fgui = {})), function (t) {
  var e = function () {
    function e() {
      this.width = 0, this.height = 0;
    }
    return e.prototype.load = function () {
      return this.owner.getItemAsset(this);
    }, e.prototype.getBranch = function () {
      if (this.branches && -1 != this.owner._branchIndex) {
        var t = this.branches[this.owner._branchIndex];
        if (t) return this.owner.getItemById(t);
      }
      return this;
    }, e.prototype.getHighResolution = function () {
      if (this.highResolution && t.GRoot.contentScaleLevel > 0) {
        var e = this.highResolution[t.GRoot.contentScaleLevel - 1];
        if (e) return this.owner.getItemById(e);
      }
      return this;
    }, e.prototype.toString = function () {
      return this.name;
    }, e;
  }();
  t.PackageItem = e;
}(fgui || (fgui = {})), function (t) {
  var e = function () {
    function e(e) {
      if (!e && !(e = t.UIConfig.popupMenu)) throw "UIConfig.popupMenu not defined";
      this._contentPane = t.UIPackage.createObjectFromURL(e), this._contentPane.on(t.Event.DISPLAY, this.onDisplay, this), this._list = this._contentPane.getChild("list"), this._list.removeChildrenToPool(), this._list.addRelation(this._contentPane, t.RelationType.Width), this._list.removeRelation(this._contentPane, t.RelationType.Height), this._contentPane.addRelation(this._list, t.RelationType.Height), this._list.on(t.Event.CLICK_ITEM, this.onClickItem, this);
    }
    return e.prototype.dispose = function () {
      this._contentPane.dispose();
    }, e.prototype.addItem = function (t, e) {
      var i = this._list.addItemFromPool();
      i.title = t, i.data = e, i.grayed = !1;
      var o = i.getController("checked");
      return o && (o.selectedIndex = 0), i;
    }, e.prototype.addItemAt = function (t, e, i) {
      var o = this._list.getFromPool();
      this._list.addChildAt(o, e), o.title = t, o.data = i, o.grayed = !1;
      var n = o.getController("checked");
      return n && (n.selectedIndex = 0), o;
    }, e.prototype.addSeperator = function () {
      if (null == t.UIConfig.popupMenu_seperator) throw "UIConfig.popupMenu_seperator not defined";
      this.list.addItemFromPool(t.UIConfig.popupMenu_seperator);
    }, e.prototype.getItemName = function (t) {
      return this._list.getChildAt(t).name;
    }, e.prototype.setItemText = function (t, e) {
      this._list.getChild(t).title = e;
    }, e.prototype.setItemVisible = function (t, e) {
      var i = this._list.getChild(t);
      i.visible != e && (i.visible = e, this._list.setBoundsChangedFlag());
    }, e.prototype.setItemGrayed = function (t, e) {
      this._list.getChild(t).grayed = e;
    }, e.prototype.setItemCheckable = function (t, e) {
      var i = this._list.getChild(t).getController("checked");
      i && (e ? 0 == i.selectedIndex && (i.selectedIndex = 1) : i.selectedIndex = 0);
    }, e.prototype.setItemChecked = function (t, e) {
      var i = this._list.getChild(t).getController("checked");
      i && (i.selectedIndex = e ? 2 : 1);
    }, e.prototype.isItemChecked = function (t) {
      var e = this._list.getChild(t).getController("checked");
      return !!e && 2 == e.selectedIndex;
    }, e.prototype.removeItem = function (t) {
      var e = this._list.getChild(t);
      if (e) {
        var i = this._list.getChildIndex(e);
        return this._list.removeChildToPoolAt(i), !0;
      }
      return !1;
    }, e.prototype.clearItems = function () {
      this._list.removeChildrenToPool();
    }, Object.defineProperty(e.prototype, "itemCount", {
      get: function get() {
        return this._list.numChildren;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "contentPane", {
      get: function get() {
        return this._contentPane;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "list", {
      get: function get() {
        return this._list;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.show = function (e, i) {
      void 0 === e && (e = null), (null != e ? e.root : t.GRoot.inst).showPopup(this.contentPane, e instanceof t.GRoot ? null : e, i);
    }, e.prototype.onClickItem = function (t, e) {
      var i = this;
      this._list._partner.callLater(function () {
        i.onClickItem2(t, e);
      }, .1);
    }, e.prototype.onClickItem2 = function (e, i) {
      if (e instanceof t.GButton) if (e.grayed) this._list.selectedIndex = -1;else {
        var o = e.getController("checked");
        o && 0 != o.selectedIndex && (1 == o.selectedIndex ? o.selectedIndex = 2 : o.selectedIndex = 1), this._contentPane.parent.hidePopup(this.contentPane), e.data instanceof Function && e.data(e, i);
      }
    }, e.prototype.onDisplay = function () {
      this._list.selectedIndex = -1, this._list.resizeToFit(1e5, 10);
    }, e;
  }();
  t.PopupMenu = e;
}(fgui || (fgui = {})), function (t) {
  var e = function () {
    function e(t) {
      this._owner = t, this._defs = new Array();
    }
    return Object.defineProperty(e.prototype, "owner", {
      get: function get() {
        return this._owner;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "target", {
      get: function get() {
        return this._target;
      },
      set: function set(t) {
        this._target != t && (this._target && this.releaseRefTarget(this._target), this._target = t, this._target && this.addRefTarget(this._target));
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.add = function (e, i) {
      if (e == t.RelationType.Size) return this.add(t.RelationType.Width, i), void this.add(t.RelationType.Height, i);
      for (var o = this._defs.length, n = 0; n < o; n++) if (this._defs[n].type == e) return;
      this.internalAdd(e, i);
    }, e.prototype.internalAdd = function (e, o) {
      if (e == t.RelationType.Size) return this.internalAdd(t.RelationType.Width, o), void this.internalAdd(t.RelationType.Height, o);
      var n = new i();
      n.percent = o, n.type = e, n.axis = e <= t.RelationType.Right_Right || e == t.RelationType.Width || e >= t.RelationType.LeftExt_Left && e <= t.RelationType.RightExt_Right ? 0 : 1, this._defs.push(n);
    }, e.prototype.remove = function (e) {
      if (e == t.RelationType.Size) return this.remove(t.RelationType.Width), void this.remove(t.RelationType.Height);
      for (var i = this._defs.length, o = 0; o < i; o++) if (this._defs[o].type == e) {
        this._defs.splice(o, 1);
        break;
      }
    }, e.prototype.copyFrom = function (t) {
      this.target = t.target, this._defs.length = 0;
      for (var e = t._defs.length, o = 0; o < e; o++) {
        var n = t._defs[o],
          r = new i();
        r.copyFrom(n), this._defs.push(r);
      }
    }, e.prototype.dispose = function () {
      this._target && (this.releaseRefTarget(this._target), this._target = null);
    }, Object.defineProperty(e.prototype, "isEmpty", {
      get: function get() {
        return 0 == this._defs.length;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.applyOnSelfResized = function (e, i, o) {
      for (var n = this._owner.x, r = this._owner.y, s = this._defs.length, h = 0; h < s; h++) switch (this._defs[h].type) {
        case t.RelationType.Center_Center:
          this._owner.x -= (.5 - (o ? this._owner.pivotX : 0)) * e;
          break;
        case t.RelationType.Right_Center:
        case t.RelationType.Right_Left:
        case t.RelationType.Right_Right:
          this._owner.x -= (1 - (o ? this._owner.pivotX : 0)) * e;
          break;
        case t.RelationType.Middle_Middle:
          this._owner.y -= (.5 - (o ? this._owner.pivotY : 0)) * i;
          break;
        case t.RelationType.Bottom_Middle:
        case t.RelationType.Bottom_Top:
        case t.RelationType.Bottom_Bottom:
          this._owner.y -= (1 - (o ? this._owner.pivotY : 0)) * i;
      }
      if ((n != this._owner.x || r != this._owner.y) && (n = this._owner.x - n, r = this._owner.y - r, this._owner.updateGearFromRelations(1, n, r), this._owner.parent)) {
        var a = this._owner.parent._transitions.length;
        if (a > 0) for (h = 0; h < a; ++h) this._owner.parent._transitions[h].updateFromRelations(this._owner.id, n, r);
      }
    }, e.prototype.applyOnXYChanged = function (e, i, o) {
      var n;
      switch (e.type) {
        case t.RelationType.Left_Left:
        case t.RelationType.Left_Center:
        case t.RelationType.Left_Right:
        case t.RelationType.Center_Center:
        case t.RelationType.Right_Left:
        case t.RelationType.Right_Center:
        case t.RelationType.Right_Right:
          this._owner.x += i;
          break;
        case t.RelationType.Top_Top:
        case t.RelationType.Top_Middle:
        case t.RelationType.Top_Bottom:
        case t.RelationType.Middle_Middle:
        case t.RelationType.Bottom_Top:
        case t.RelationType.Bottom_Middle:
        case t.RelationType.Bottom_Bottom:
          this._owner.y += o;
          break;
        case t.RelationType.Width:
        case t.RelationType.Height:
          break;
        case t.RelationType.LeftExt_Left:
        case t.RelationType.LeftExt_Right:
          this._owner != this._target.parent ? (n = this._owner.xMin, this._owner.width = this._owner._rawWidth - i, this._owner.xMin = n + i) : this._owner.width = this._owner._rawWidth - i;
          break;
        case t.RelationType.RightExt_Left:
        case t.RelationType.RightExt_Right:
          this._owner != this._target.parent ? (n = this._owner.xMin, this._owner.width = this._owner._rawWidth + i, this._owner.xMin = n) : this._owner.width = this._owner._rawWidth + i;
          break;
        case t.RelationType.TopExt_Top:
        case t.RelationType.TopExt_Bottom:
          this._owner != this._target.parent ? (n = this._owner.yMin, this._owner.height = this._owner._rawHeight - o, this._owner.yMin = n + o) : this._owner.height = this._owner._rawHeight - o;
          break;
        case t.RelationType.BottomExt_Top:
        case t.RelationType.BottomExt_Bottom:
          this._owner != this._target.parent ? (n = this._owner.yMin, this._owner.height = this._owner._rawHeight + o, this._owner.yMin = n) : this._owner.height = this._owner._rawHeight + o;
      }
    }, e.prototype.applyOnSizeChanged = function (e) {
      var i,
        o,
        n = 0,
        r = 0,
        s = 0;
      switch (0 == e.axis ? (this._target != this._owner.parent && (n = this._target.x, this._target.pivotAsAnchor && (r = this._target.pivotX)), e.percent ? 0 != this._targetWidth && (s = this._target._width / this._targetWidth) : s = this._target._width - this._targetWidth) : (this._target != this._owner.parent && (n = this._target.y, this._target.pivotAsAnchor && (r = this._target.pivotY)), e.percent ? 0 != this._targetHeight && (s = this._target._height / this._targetHeight) : s = this._target._height - this._targetHeight), e.type) {
        case t.RelationType.Left_Left:
          e.percent ? this._owner.xMin = n + (this._owner.xMin - n) * s : 0 != r && (this._owner.x += s * -r);
          break;
        case t.RelationType.Left_Center:
          e.percent ? this._owner.xMin = n + (this._owner.xMin - n) * s : this._owner.x += s * (.5 - r);
          break;
        case t.RelationType.Left_Right:
          e.percent ? this._owner.xMin = n + (this._owner.xMin - n) * s : this._owner.x += s * (1 - r);
          break;
        case t.RelationType.Center_Center:
          e.percent ? this._owner.xMin = n + (this._owner.xMin + .5 * this._owner._rawWidth - n) * s - .5 * this._owner._rawWidth : this._owner.x += s * (.5 - r);
          break;
        case t.RelationType.Right_Left:
          e.percent ? this._owner.xMin = n + (this._owner.xMin + this._owner._rawWidth - n) * s - this._owner._rawWidth : 0 != r && (this._owner.x += s * -r);
          break;
        case t.RelationType.Right_Center:
          e.percent ? this._owner.xMin = n + (this._owner.xMin + this._owner._rawWidth - n) * s - this._owner._rawWidth : this._owner.x += s * (.5 - r);
          break;
        case t.RelationType.Right_Right:
          e.percent ? this._owner.xMin = n + (this._owner.xMin + this._owner._rawWidth - n) * s - this._owner._rawWidth : this._owner.x += s * (1 - r);
          break;
        case t.RelationType.Top_Top:
          e.percent ? this._owner.yMin = n + (this._owner.yMin - n) * s : 0 != r && (this._owner.y += s * -r);
          break;
        case t.RelationType.Top_Middle:
          e.percent ? this._owner.yMin = n + (this._owner.yMin - n) * s : this._owner.y += s * (.5 - r);
          break;
        case t.RelationType.Top_Bottom:
          e.percent ? this._owner.yMin = n + (this._owner.yMin - n) * s : this._owner.y += s * (1 - r);
          break;
        case t.RelationType.Middle_Middle:
          e.percent ? this._owner.yMin = n + (this._owner.yMin + .5 * this._owner._rawHeight - n) * s - .5 * this._owner._rawHeight : this._owner.y += s * (.5 - r);
          break;
        case t.RelationType.Bottom_Top:
          e.percent ? this._owner.yMin = n + (this._owner.yMin + this._owner._rawHeight - n) * s - this._owner._rawHeight : 0 != r && (this._owner.y += s * -r);
          break;
        case t.RelationType.Bottom_Middle:
          e.percent ? this._owner.yMin = n + (this._owner.yMin + this._owner._rawHeight - n) * s - this._owner._rawHeight : this._owner.y += s * (.5 - r);
          break;
        case t.RelationType.Bottom_Bottom:
          e.percent ? this._owner.yMin = n + (this._owner.yMin + this._owner._rawHeight - n) * s - this._owner._rawHeight : this._owner.y += s * (1 - r);
          break;
        case t.RelationType.Width:
          i = this._owner._underConstruct && this._owner == this._target.parent ? this._owner.sourceWidth - this._target.initWidth : this._owner._rawWidth - this._targetWidth, e.percent && (i *= s), this._target == this._owner.parent ? this._owner.pivotAsAnchor ? (o = this._owner.xMin, this._owner.setSize(this._target._width + i, this._owner._rawHeight, !0), this._owner.xMin = o) : this._owner.setSize(this._target._width + i, this._owner._rawHeight, !0) : this._owner.width = this._target._width + i;
          break;
        case t.RelationType.Height:
          i = this._owner._underConstruct && this._owner == this._target.parent ? this._owner.sourceHeight - this._target.initHeight : this._owner._rawHeight - this._targetHeight, e.percent && (i *= s), this._target == this._owner.parent ? this._owner.pivotAsAnchor ? (o = this._owner.yMin, this._owner.setSize(this._owner._rawWidth, this._target._height + i, !0), this._owner.yMin = o) : this._owner.setSize(this._owner._rawWidth, this._target._height + i, !0) : this._owner.height = this._target._height + i;
          break;
        case t.RelationType.LeftExt_Left:
          o = this._owner.xMin, i = e.percent ? n + (o - n) * s - o : s * -r, this._owner.width = this._owner._rawWidth - i, this._owner.xMin = o + i;
          break;
        case t.RelationType.LeftExt_Right:
          o = this._owner.xMin, i = e.percent ? n + (o - n) * s - o : s * (1 - r), this._owner.width = this._owner._rawWidth - i, this._owner.xMin = o + i;
          break;
        case t.RelationType.RightExt_Left:
          o = this._owner.xMin, i = e.percent ? n + (o + this._owner._rawWidth - n) * s - (o + this._owner._rawWidth) : s * -r, this._owner.width = this._owner._rawWidth + i, this._owner.xMin = o;
          break;
        case t.RelationType.RightExt_Right:
          o = this._owner.xMin, e.percent ? this._owner == this._target.parent ? this._owner._underConstruct ? this._owner.width = n + this._target._width - this._target._width * r + (this._owner.sourceWidth - n - this._target.initWidth + this._target.initWidth * r) * s : this._owner.width = n + (this._owner._rawWidth - n) * s : (i = n + (o + this._owner._rawWidth - n) * s - (o + this._owner._rawWidth), this._owner.width = this._owner._rawWidth + i, this._owner.xMin = o) : this._owner == this._target.parent ? this._owner._underConstruct ? this._owner.width = this._owner.sourceWidth + (this._target._width - this._target.initWidth) * (1 - r) : this._owner.width = this._owner._rawWidth + s * (1 - r) : (i = s * (1 - r), this._owner.width = this._owner._rawWidth + i, this._owner.xMin = o);
          break;
        case t.RelationType.TopExt_Top:
          o = this._owner.yMin, i = e.percent ? n + (o - n) * s - o : s * -r, this._owner.height = this._owner._rawHeight - i, this._owner.yMin = o + i;
          break;
        case t.RelationType.TopExt_Bottom:
          o = this._owner.yMin, i = e.percent ? n + (o - n) * s - o : s * (1 - r), this._owner.height = this._owner._rawHeight - i, this._owner.yMin = o + i;
          break;
        case t.RelationType.BottomExt_Top:
          o = this._owner.yMin, i = e.percent ? n + (o + this._owner._rawHeight - n) * s - (o + this._owner._rawHeight) : s * -r, this._owner.height = this._owner._rawHeight + i, this._owner.yMin = o;
          break;
        case t.RelationType.BottomExt_Bottom:
          o = this._owner.yMin, e.percent ? this._owner == this._target.parent ? this._owner._underConstruct ? this._owner.height = n + this._target._height - this._target._height * r + (this._owner.sourceHeight - n - this._target.initHeight + this._target.initHeight * r) * s : this._owner.height = n + (this._owner._rawHeight - n) * s : (i = n + (o + this._owner._rawHeight - n) * s - (o + this._owner._rawHeight), this._owner.height = this._owner._rawHeight + i, this._owner.yMin = o) : this._owner == this._target.parent ? this._owner._underConstruct ? this._owner.height = this._owner.sourceHeight + (this._target._height - this._target.initHeight) * (1 - r) : this._owner.height = this._owner._rawHeight + s * (1 - r) : (i = s * (1 - r), this._owner.height = this._owner._rawHeight + i, this._owner.yMin = o);
      }
    }, e.prototype.addRefTarget = function (e) {
      e != this._owner.parent && e.on(t.Event.XY_CHANGED, this.__targetXYChanged, this), e.on(t.Event.SIZE_CHANGED, this.__targetSizeChanged, this), e.on(t.Event.SIZE_DELAY_CHANGE, this.__targetSizeWillChange, this), this._targetX = this._target.x, this._targetY = this._target.y, this._targetWidth = this._target._width, this._targetHeight = this._target._height;
    }, e.prototype.releaseRefTarget = function (e) {
      e.node && (e.off(t.Event.XY_CHANGED, this.__targetXYChanged, this), e.off(t.Event.SIZE_CHANGED, this.__targetSizeChanged, this), e.off(t.Event.SIZE_DELAY_CHANGE, this.__targetSizeWillChange, this));
    }, e.prototype.__targetXYChanged = function () {
      if (null != this._owner.relations.handling || null != this._owner.group && this._owner.group._updating) return this._targetX = this._target.x, void (this._targetY = this._target.y);
      this._owner.relations.handling = this._target;
      for (var t = this._owner.x, e = this._owner.y, i = this._target.x - this._targetX, o = this._target.y - this._targetY, n = this._defs.length, r = 0; r < n; r++) {
        var s = this._defs[r];
        this.applyOnXYChanged(s, i, o);
      }
      if (this._targetX = this._target.x, this._targetY = this._target.y, (t != this._owner.x || e != this._owner.y) && (t = this._owner.x - t, e = this._owner.y - e, this._owner.updateGearFromRelations(1, t, e), this._owner.parent)) {
        var h = this._owner.parent._transitions.length;
        if (h > 0) for (r = 0; r < h; ++r) this._owner.parent._transitions[r].updateFromRelations(this._owner.id, t, e);
      }
      this._owner.relations.handling = null;
    }, e.prototype.__targetSizeChanged = function () {
      if (null == this._owner.relations.handling) {
        this._owner.relations.handling = this._target;
        for (var t = this._owner.x, e = this._owner.y, i = this._owner._rawWidth, o = this._owner._rawHeight, n = this._defs.length, r = 0; r < n; r++) {
          var s = this._defs[r];
          this.applyOnSizeChanged(s);
        }
        if (this._targetWidth = this._target._width, this._targetHeight = this._target._height, (t != this._owner.x || e != this._owner.y) && (t = this._owner.x - t, e = this._owner.y - e, this._owner.updateGearFromRelations(1, t, e), this._owner.parent)) {
          var h = this._owner.parent._transitions.length;
          if (h > 0) for (r = 0; r < h; ++r) this._owner.parent._transitions[r].updateFromRelations(this._owner.id, t, e);
        }
        i == this._owner._rawWidth && o == this._owner._rawHeight || (i = this._owner._rawWidth - i, o = this._owner._rawHeight - o, this._owner.updateGearFromRelations(2, i, o)), this._owner.relations.handling = null;
      }
    }, e.prototype.__targetSizeWillChange = function () {
      this._owner.relations.sizeDirty = !0;
    }, e;
  }();
  t.RelationItem = e;
  var i = function () {
    function t() {}
    return t.prototype.copyFrom = function (t) {
      this.percent = t.percent, this.type = t.type, this.axis = t.axis;
    }, t;
  }();
  t.RelationDef = i;
}(fgui || (fgui = {})), function (t) {
  var e = function () {
    function e(t) {
      this._owner = t, this._items = new Array();
    }
    return e.prototype.add = function (e, i, o) {
      for (var n = this._items.length, r = 0; r < n; r++) {
        var s = this._items[r];
        if (s.target == e) return void s.add(i, o);
      }
      var h = new t.RelationItem(this._owner);
      h.target = e, h.add(i, o), this._items.push(h);
    }, e.prototype.remove = function (t, e) {
      e = e || 0;
      for (var i = this._items.length, o = 0; o < i;) {
        var n = this._items[o];
        n.target == t ? (n.remove(e), n.isEmpty ? (n.dispose(), this._items.splice(o, 1), i--) : o++) : o++;
      }
    }, e.prototype.contains = function (t) {
      for (var e = this._items.length, i = 0; i < e; i++) if (this._items[i].target == t) return !0;
      return !1;
    }, e.prototype.clearFor = function (t) {
      for (var e = this._items.length, i = 0; i < e;) {
        var o = this._items[i];
        o.target == t ? (o.dispose(), this._items.splice(i, 1), e--) : i++;
      }
    }, e.prototype.clearAll = function () {
      for (var t = this._items.length, e = 0; e < t; e++) this._items[e].dispose();
      this._items.length = 0;
    }, e.prototype.copyFrom = function (e) {
      this.clearAll();
      for (var i = e._items, o = i.length, n = 0; n < o; n++) {
        var r = i[n],
          s = new t.RelationItem(this._owner);
        s.copyFrom(r), this._items.push(s);
      }
    }, e.prototype.dispose = function () {
      this.clearAll();
    }, e.prototype.onOwnerSizeChanged = function (t, e, i) {
      if (0 != this._items.length) for (var o = this._items.length, n = 0; n < o; n++) this._items[n].applyOnSelfResized(t, e, i);
    }, e.prototype.ensureRelationsSizeCorrect = function () {
      if (0 != this._items.length) {
        this.sizeDirty = !1;
        for (var t = this._items.length, e = 0; e < t; e++) this._items[e].target.ensureSizeCorrect();
      }
    }, Object.defineProperty(e.prototype, "empty", {
      get: function get() {
        return 0 == this._items.length;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.setup = function (e, i) {
      for (var o, n = e.readByte(), r = 0; r < n; r++) {
        var s = e.readShort();
        o = -1 == s ? this._owner.parent : i ? this._owner.getChildAt(s) : this._owner.parent.getChildAt(s);
        var h = new t.RelationItem(this._owner);
        h.target = o, this._items.push(h);
        for (var a = e.readByte(), l = 0; l < a; l++) {
          var c = e.readByte(),
            u = e.readBool();
          h.internalAdd(c, u);
        }
      }
    }, e;
  }();
  t.Relations = e;
}(fgui || (fgui = {})), function (t) {
  var e = function (e) {
    function c() {
      var t = null !== e && e.apply(this, arguments) || this;
      return t._aniFlag = 0, t;
    }
    return __extends(c, e), c.prototype.setup = function (e) {
      var i = this._owner = this.node.$gobj;
      this._maskContainer = new cc.Node("ScrollPane"), this._maskContainer.setAnchorPoint(0, 1), this._maskContainer.parent = i.node, this._container = i._container, this._container.parent = this._maskContainer, this._scrollBarMargin = new t.Margin(), this._mouseWheelEnabled = !0, this._xPos = 0, this._yPos = 0, this._aniFlag = 0, this._tweening = 0, this._footerLockedSize = 0, this._headerLockedSize = 0, this._viewSize = new cc.Vec2(), this._contentSize = new cc.Vec2(), this._pageSize = new cc.Vec2(1, 1), this._overlapSize = new cc.Vec2(), this._tweenTime = new cc.Vec2(), this._tweenStart = new cc.Vec2(), this._tweenDuration = new cc.Vec2(), this._tweenChange = new cc.Vec2(), this._velocity = new cc.Vec2(), this._containerPos = new cc.Vec2(), this._beginTouchPos = new cc.Vec2(), this._lastTouchPos = new cc.Vec2(), this._lastTouchGlobalPos = new cc.Vec2(), this._scrollStep = t.UIConfig.defaultScrollStep, this._mouseWheelStep = 2 * this._scrollStep, this._decelerationRate = t.UIConfig.defaultScrollDecelerationRate, this._snappingPolicy = 0, i.on(t.Event.TOUCH_BEGIN, this.onTouchBegin, this), i.on(t.Event.TOUCH_MOVE, this.onTouchMove, this), i.on(t.Event.TOUCH_END, this.onTouchEnd, this), i.on(t.Event.MOUSE_WHEEL, this.onMouseWheel, this), this._scrollType = e.readByte();
      var o = e.readByte(),
        n = e.readInt();
      e.readBool() && (this._scrollBarMargin.top = e.readInt(), this._scrollBarMargin.bottom = e.readInt(), this._scrollBarMargin.left = e.readInt(), this._scrollBarMargin.right = e.readInt());
      var r = e.readS(),
        s = e.readS(),
        h = e.readS(),
        a = e.readS();
      if (0 != (1 & n) && (this._displayOnLeft = !0), 0 != (2 & n) && (this._snapToItem = !0), 0 != (4 & n) && (this._displayInDemand = !0), 0 != (8 & n) && (this._pageMode = !0), this._touchEffect = !!(16 & n) || !(32 & n) && t.UIConfig.defaultScrollTouchEffect, this._bouncebackEffect = !!(64 & n) || !(128 & n) && t.UIConfig.defaultScrollBounceEffect, 0 != (256 & n) && (this._inertiaDisabled = !0), 0 == (512 & n) && this._maskContainer.addComponent(cc.Mask), 0 != (1024 & n) && (this._floating = !0), 0 != (2048 & n) && (this._dontClipMargin = !0), o == t.ScrollBarDisplayType.Default && (o = t.UIConfig.defaultScrollBarDisplay), o != t.ScrollBarDisplayType.Hidden) {
        var l;
        if ((this._scrollType == t.ScrollType.Both || this._scrollType == t.ScrollType.Vertical) && (l = r || t.UIConfig.verticalScrollBar)) {
          if (this._vtScrollBar = t.UIPackage.createObjectFromURL(l), !this._vtScrollBar) throw "cannot create scrollbar from " + l;
          this._vtScrollBar.setScrollPane(this, !0), this._vtScrollBar.node.parent = i.node;
        }
        if ((this._scrollType == t.ScrollType.Both || this._scrollType == t.ScrollType.Horizontal) && (l = s || t.UIConfig.horizontalScrollBar)) {
          if (this._hzScrollBar = t.UIPackage.createObjectFromURL(l), !this._hzScrollBar) throw "cannot create scrollbar from " + l;
          this._hzScrollBar.setScrollPane(this, !1), this._hzScrollBar.node.parent = i.node;
        }
        o == t.ScrollBarDisplayType.Auto && (this._scrollBarDisplayAuto = !0), this._scrollBarDisplayAuto && (this._vtScrollBar && (this._vtScrollBar.node.active = !1), this._hzScrollBar && (this._hzScrollBar.node.active = !1), i.on(t.Event.ROLL_OVER, this.onRollOver, this), i.on(t.Event.ROLL_OUT, this.onRollOut, this));
      }
      if (h) {
        if (this._header = t.UIPackage.createObjectFromURL(h), null == this._header) throw "cannot create scrollPane header from " + h;
        this._maskContainer.insertChild(this._header.node, 0);
      }
      if (a) {
        if (this._footer = t.UIPackage.createObjectFromURL(a), null == this._footer) throw "cannot create scrollPane footer from " + a;
        this._maskContainer.insertChild(this._footer.node, 0);
      }
      this._refreshBarAxis = this._scrollType == t.ScrollType.Both || this._scrollType == t.ScrollType.Vertical ? "y" : "x", this.setSize(i.width, i.height);
    }, c.prototype.onDestroy = function () {
      delete this._pageController, this._hzScrollBar && this._hzScrollBar.dispose(), this._vtScrollBar && this._vtScrollBar.dispose(), this._header && this._header.dispose(), this._footer && this._footer.dispose();
    }, c.prototype.hitTest = function (t, e) {
      var i;
      return this._vtScrollBar && (i = this._vtScrollBar.hitTest(e)) ? i : this._hzScrollBar && (i = this._hzScrollBar.hitTest(e)) ? i : this._header && this._header.node.activeInHierarchy && (i = this._header.hitTest(e)) ? i : this._footer && this._footer.node.activeInHierarchy && (i = this._footer.hitTest(e)) ? i : t.x >= this._owner.margin.left && t.y >= this._owner.margin.top && t.x < this._owner.margin.left + this._viewSize.x && t.y < this._owner.margin.top + this._viewSize.y ? this._owner : null;
    }, Object.defineProperty(c.prototype, "owner", {
      get: function get() {
        return this._owner;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(c.prototype, "hzScrollBar", {
      get: function get() {
        return this._hzScrollBar;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(c.prototype, "vtScrollBar", {
      get: function get() {
        return this._vtScrollBar;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(c.prototype, "header", {
      get: function get() {
        return this._header;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(c.prototype, "footer", {
      get: function get() {
        return this._footer;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(c.prototype, "bouncebackEffect", {
      get: function get() {
        return this._bouncebackEffect;
      },
      set: function set(t) {
        this._bouncebackEffect = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(c.prototype, "touchEffect", {
      get: function get() {
        return this._touchEffect;
      },
      set: function set(t) {
        this._touchEffect = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(c.prototype, "scrollStep", {
      get: function get() {
        return this._scrollStep;
      },
      set: function set(e) {
        this._scrollStep = e, 0 == this._scrollStep && (this._scrollStep = t.UIConfig.defaultScrollStep), this._mouseWheelStep = 2 * this._scrollStep;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(c.prototype, "decelerationRate", {
      get: function get() {
        return this._decelerationRate;
      },
      set: function set(t) {
        this._decelerationRate = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(c.prototype, "snapToItem", {
      get: function get() {
        return this._snapToItem;
      },
      set: function set(t) {
        this._snapToItem = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(c.prototype, "snappingPolicy", {
      get: function get() {
        return this._snappingPolicy;
      },
      set: function set(t) {
        this._snappingPolicy = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(c.prototype, "mouseWheelEnabled", {
      get: function get() {
        return this._mouseWheelEnabled;
      },
      set: function set(t) {
        this._mouseWheelEnabled = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(c.prototype, "isDragged", {
      get: function get() {
        return this._dragged;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(c.prototype, "percX", {
      get: function get() {
        return 0 == this._overlapSize.x ? 0 : this._xPos / this._overlapSize.x;
      },
      set: function set(t) {
        this.setPercX(t, !1);
      },
      enumerable: !1,
      configurable: !0
    }), c.prototype.setPercX = function (e, i) {
      this._owner.ensureBoundsCorrect(), this.setPosX(this._overlapSize.x * t.ToolSet.clamp01(e), i);
    }, Object.defineProperty(c.prototype, "percY", {
      get: function get() {
        return 0 == this._overlapSize.y ? 0 : this._yPos / this._overlapSize.y;
      },
      set: function set(t) {
        this.setPercY(t, !1);
      },
      enumerable: !1,
      configurable: !0
    }), c.prototype.setPercY = function (e, i) {
      this._owner.ensureBoundsCorrect(), this.setPosY(this._overlapSize.y * t.ToolSet.clamp01(e), i);
    }, Object.defineProperty(c.prototype, "posX", {
      get: function get() {
        return this._xPos;
      },
      set: function set(t) {
        this.setPosX(t, !1);
      },
      enumerable: !1,
      configurable: !0
    }), c.prototype.setPosX = function (e, i) {
      this._owner.ensureBoundsCorrect(), 1 == this._loop && (e = this.loopCheckingNewPos(e, "x")), (e = t.ToolSet.clamp(e, 0, this._overlapSize.x)) != this._xPos && (this._xPos = e, this.posChanged(i));
    }, Object.defineProperty(c.prototype, "posY", {
      get: function get() {
        return this._yPos;
      },
      set: function set(t) {
        this.setPosY(t, !1);
      },
      enumerable: !1,
      configurable: !0
    }), c.prototype.setPosY = function (e, i) {
      this._owner.ensureBoundsCorrect(), 1 == this._loop && (e = this.loopCheckingNewPos(e, "y")), (e = t.ToolSet.clamp(e, 0, this._overlapSize.y)) != this._yPos && (this._yPos = e, this.posChanged(i));
    }, Object.defineProperty(c.prototype, "contentWidth", {
      get: function get() {
        return this._contentSize.x;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(c.prototype, "contentHeight", {
      get: function get() {
        return this._contentSize.y;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(c.prototype, "viewWidth", {
      get: function get() {
        return this._viewSize.x;
      },
      set: function set(t) {
        t = t + this._owner.margin.left + this._owner.margin.right, this._vtScrollBar && !this._floating && (t += this._vtScrollBar.width), this._owner.width = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(c.prototype, "viewHeight", {
      get: function get() {
        return this._viewSize.y;
      },
      set: function set(t) {
        t = t + this._owner.margin.top + this._owner.margin.bottom, this._hzScrollBar && !this._floating && (t += this._hzScrollBar.height), this._owner.height = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(c.prototype, "currentPageX", {
      get: function get() {
        if (!this._pageMode) return 0;
        var t = Math.floor(this._xPos / this._pageSize.x);
        return this._xPos - t * this._pageSize.x > .5 * this._pageSize.x && t++, t;
      },
      set: function set(t) {
        this.setCurrentPageX(t, !1);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(c.prototype, "currentPageY", {
      get: function get() {
        if (!this._pageMode) return 0;
        var t = Math.floor(this._yPos / this._pageSize.y);
        return this._yPos - t * this._pageSize.y > .5 * this._pageSize.y && t++, t;
      },
      set: function set(t) {
        this.setCurrentPageY(t, !1);
      },
      enumerable: !1,
      configurable: !0
    }), c.prototype.setCurrentPageX = function (t, e) {
      this._pageMode && (this._owner.ensureBoundsCorrect(), this._overlapSize.x > 0 && this.setPosX(t * this._pageSize.x, e));
    }, c.prototype.setCurrentPageY = function (t, e) {
      this._pageMode && (this._owner.ensureBoundsCorrect(), this._overlapSize.y > 0 && this.setPosY(t * this._pageSize.y, e));
    }, Object.defineProperty(c.prototype, "isBottomMost", {
      get: function get() {
        return this._yPos == this._overlapSize.y || 0 == this._overlapSize.y;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(c.prototype, "isRightMost", {
      get: function get() {
        return this._xPos == this._overlapSize.x || 0 == this._overlapSize.x;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(c.prototype, "pageController", {
      get: function get() {
        return this._pageController;
      },
      set: function set(t) {
        this._pageController = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(c.prototype, "scrollingPosX", {
      get: function get() {
        return t.ToolSet.clamp(-this._container.x, 0, this._overlapSize.x);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(c.prototype, "scrollingPosY", {
      get: function get() {
        return t.ToolSet.clamp(- -this._container.y, 0, this._overlapSize.y);
      },
      enumerable: !1,
      configurable: !0
    }), c.prototype.scrollTop = function (t) {
      this.setPercY(0, t);
    }, c.prototype.scrollBottom = function (t) {
      this.setPercY(1, t);
    }, c.prototype.scrollUp = function (t, e) {
      null == t && (t = 1), this._pageMode ? this.setPosY(this._yPos - this._pageSize.y * t, e) : this.setPosY(this._yPos - this._scrollStep * t, e);
    }, c.prototype.scrollDown = function (t, e) {
      null == t && (t = 1), this._pageMode ? this.setPosY(this._yPos + this._pageSize.y * t, e) : this.setPosY(this._yPos + this._scrollStep * t, e);
    }, c.prototype.scrollLeft = function (t, e) {
      null == t && (t = 1), this._pageMode ? this.setPosX(this._xPos - this._pageSize.x * t, e) : this.setPosX(this._xPos - this._scrollStep * t, e);
    }, c.prototype.scrollRight = function (t, e) {
      null == t && (t = 1), this._pageMode ? this.setPosX(this._xPos + this._pageSize.x * t, e) : this.setPosX(this._xPos + this._scrollStep * t, e);
    }, c.prototype.scrollToView = function (e, i, o) {
      var n;
      if (this._owner.ensureBoundsCorrect(), this._needRefresh && this.refresh(), e instanceof t.GObject ? e.parent != this._owner ? (e.parent.localToGlobalRect(e.x, e.y, e.width, e.height, h), n = this._owner.globalToLocalRect(h.x, h.y, h.width, h.height, h)) : ((n = h).x = e.x, n.y = e.y, n.width = e.width, n.height = e.height) : n = e, this._overlapSize.y > 0) {
        var r = this._yPos + this._viewSize.y;
        o || n.y <= this._yPos || n.height >= this._viewSize.y ? this._pageMode ? this.setPosY(Math.floor(n.y / this._pageSize.y) * this._pageSize.y, i) : this.setPosY(n.y, i) : n.y + n.height > r && (this._pageMode ? this.setPosY(Math.floor(n.y / this._pageSize.y) * this._pageSize.y, i) : n.height <= this._viewSize.y / 2 ? this.setPosY(n.y + 2 * n.height - this._viewSize.y, i) : this.setPosY(n.y + n.height - this._viewSize.y, i));
      }
      if (this._overlapSize.x > 0) {
        var s = this._xPos + this._viewSize.x;
        o || n.x <= this._xPos || n.width >= this._viewSize.x ? this._pageMode ? this.setPosX(Math.floor(n.x / this._pageSize.x) * this._pageSize.x, i) : this.setPosX(n.x, i) : n.x + n.width > s && (this._pageMode ? this.setPosX(Math.floor(n.x / this._pageSize.x) * this._pageSize.x, i) : n.width <= this._viewSize.x / 2 ? this.setPosX(n.x + 2 * n.width - this._viewSize.x, i) : this.setPosX(n.x + n.width - this._viewSize.x, i));
      }
      !i && this._needRefresh && this.refresh();
    }, c.prototype.isChildInView = function (t) {
      if (this._overlapSize.y > 0) {
        var e = t.y + -this._container.y;
        if (e < -t.height || e > this._viewSize.y) return !1;
      }
      return !(this._overlapSize.x > 0 && ((e = t.x + this._container.x) < -t.width || e > this._viewSize.x));
    }, c.prototype.cancelDragging = function () {
      c.draggingPane == this && (c.draggingPane = null), i = 0, this._dragged = !1;
    }, c.prototype.lockHeader = function (t) {
      if (this._headerLockedSize != t) {
        var e = this._container.x,
          i = -this._container.y,
          o = "x" == this._refreshBarAxis ? e : i;
        this._headerLockedSize = t, !this._refreshEventDispatching && o >= 0 && (this._tweenStart.x = e, this._tweenStart.y = i, this._tweenChange.set(cc.Vec2.ZERO), this._tweenChange[this._refreshBarAxis] = this._headerLockedSize - this._tweenStart[this._refreshBarAxis], this._tweenDuration.x = this._tweenDuration.y = n, this.startTween(2));
      }
    }, c.prototype.lockFooter = function (t) {
      if (this._footerLockedSize != t) {
        var e = this._container.x,
          i = -this._container.y,
          o = "x" == this._refreshBarAxis ? e : i;
        if (this._footerLockedSize = t, !this._refreshEventDispatching && o <= -this._overlapSize[this._refreshBarAxis]) {
          this._tweenStart.x = e, this._tweenStart.y = i, this._tweenChange.set(cc.Vec2.ZERO);
          var r = this._overlapSize[this._refreshBarAxis];
          0 == r ? r = Math.max(this._contentSize[this._refreshBarAxis] + this._footerLockedSize - this._viewSize[this._refreshBarAxis], 0) : r += this._footerLockedSize, this._tweenChange[this._refreshBarAxis] = -r - this._tweenStart[this._refreshBarAxis], this._tweenDuration.x = this._tweenDuration.y = n, this.startTween(2);
        }
      }
    }, c.prototype.onOwnerSizeChanged = function () {
      this.setSize(this._owner.width, this._owner.height), this.posChanged(!1);
    }, c.prototype.handleControllerChanged = function (e) {
      this._pageController == e && (this._scrollType == t.ScrollType.Horizontal ? this.setCurrentPageX(e.selectedIndex, !0) : this.setCurrentPageY(e.selectedIndex, !0));
    }, c.prototype.updatePageController = function () {
      var e;
      if (this._pageController && !this._pageController.changing && (e = this._scrollType == t.ScrollType.Horizontal ? this.currentPageX : this.currentPageY) < this._pageController.pageCount) {
        var i = this._pageController;
        this._pageController = null, i.selectedIndex = e, this._pageController = i;
      }
    }, c.prototype.adjustMaskContainer = function () {
      var t = 0;
      this._displayOnLeft && this._vtScrollBar && !this._floating && (t = this._vtScrollBar.width);
      var e = this._owner;
      this._dontClipMargin ? this._maskContainer.setAnchorPoint((e.margin.left + e._alignOffset.x) / e.width, 1 - (e.margin.top + e._alignOffset.y) / e.height) : this._maskContainer.setAnchorPoint(e._alignOffset.x / this._viewSize.x, 1 - e._alignOffset.y / this._viewSize.y), e._customMask ? this._maskContainer.setPosition(t + e._alignOffset.x, -e._alignOffset.y) : this._maskContainer.setPosition(e._pivotCorrectX + t + e._alignOffset.x, e._pivotCorrectY - e._alignOffset.y);
    }, c.prototype.setSize = function (t, e) {
      this._hzScrollBar && (this._hzScrollBar.y = e - this._hzScrollBar.height, this._vtScrollBar ? (this._hzScrollBar.width = t - this._vtScrollBar.width - this._scrollBarMargin.left - this._scrollBarMargin.right, this._displayOnLeft ? this._hzScrollBar.x = this._scrollBarMargin.left + this._vtScrollBar.width : this._hzScrollBar.x = this._scrollBarMargin.left) : (this._hzScrollBar.width = t - this._scrollBarMargin.left - this._scrollBarMargin.right, this._hzScrollBar.x = this._scrollBarMargin.left)), this._vtScrollBar && (this._displayOnLeft || (this._vtScrollBar.x = t - this._vtScrollBar.width), this._hzScrollBar ? this._vtScrollBar.height = e - this._hzScrollBar.height - this._scrollBarMargin.top - this._scrollBarMargin.bottom : this._vtScrollBar.height = e - this._scrollBarMargin.top - this._scrollBarMargin.bottom, this._vtScrollBar.y = this._scrollBarMargin.top), this._viewSize.x = t, this._viewSize.y = e, this._hzScrollBar && !this._floating && (this._viewSize.y -= this._hzScrollBar.height), this._vtScrollBar && !this._floating && (this._viewSize.x -= this._vtScrollBar.width), this._viewSize.x -= this._owner.margin.left + this._owner.margin.right, this._viewSize.y -= this._owner.margin.top + this._owner.margin.bottom, this._viewSize.x = Math.max(1, this._viewSize.x), this._viewSize.y = Math.max(1, this._viewSize.y), this._pageSize.x = this._viewSize.x, this._pageSize.y = this._viewSize.y, this.adjustMaskContainer(), this.handleSizeChanged();
    }, c.prototype.setContentSize = function (t, e) {
      this._contentSize.x == t && this._contentSize.y == e || (this._contentSize.x = t, this._contentSize.y = e, this.handleSizeChanged(), this._snapToItem && 0 != this._snappingPolicy && 0 == this._xPos && 0 == this._yPos && this.posChanged(!1));
    }, c.prototype.changeContentSizeOnScrolling = function (t, e, i, o) {
      var n = this._xPos == this._overlapSize.x,
        r = this._yPos == this._overlapSize.y;
      this._contentSize.x += t, this._contentSize.y += e, this.handleSizeChanged(), 1 == this._tweening ? (0 != t && n && this._tweenChange.x < 0 && (this._xPos = this._overlapSize.x, this._tweenChange.x = -this._xPos - this._tweenStart.x), 0 != e && r && this._tweenChange.y < 0 && (this._yPos = this._overlapSize.y, this._tweenChange.y = -this._yPos - this._tweenStart.y)) : 2 == this._tweening ? (0 != i && (this._container.x -= i, this._tweenStart.x -= i, this._xPos = -this._container.x), 0 != o && (this._container.y += o, this._tweenStart.y -= o, this._yPos = - -this._container.y)) : this._dragged ? (0 != i && (this._container.x -= i, this._containerPos.x -= i, this._xPos = -this._container.x), 0 != o && (this._container.y += o, this._containerPos.y -= o, this._yPos = - -this._container.y)) : (0 != t && n && (this._xPos = this._overlapSize.x, this._container.x = -this._xPos), 0 != e && r && (this._yPos = this._overlapSize.y, this._container.y = this._yPos)), this._pageMode && this.updatePageController();
    }, c.prototype.handleSizeChanged = function () {
      this._displayInDemand && (this._vScrollNone = this._contentSize.y <= this._viewSize.y, this._hScrollNone = this._contentSize.x <= this._viewSize.x), this._vtScrollBar && (0 == this._contentSize.y ? this._vtScrollBar.setDisplayPerc(0) : this._vtScrollBar.setDisplayPerc(Math.min(1, this._viewSize.y / this._contentSize.y))), this._hzScrollBar && (0 == this._contentSize.x ? this._hzScrollBar.setDisplayPerc(0) : this._hzScrollBar.setDisplayPerc(Math.min(1, this._viewSize.x / this._contentSize.x))), this.updateScrollBarVisible();
      var e = this._viewSize.x,
        i = this._viewSize.y;
      this._vScrollNone && this._vtScrollBar && (e += this._vtScrollBar.width), this._hScrollNone && this._hzScrollBar && (i += this._hzScrollBar.height), this._dontClipMargin && (e += this._owner.margin.left + this._owner.margin.right, i += this._owner.margin.top + this._owner.margin.bottom), this._maskContainer.setContentSize(e, i), this._vtScrollBar && this._vtScrollBar.handlePositionChanged(), this._hzScrollBar && this._hzScrollBar.handlePositionChanged(), this._header && this._header.handlePositionChanged(), this._footer && this._footer.handlePositionChanged(), this._scrollType == t.ScrollType.Horizontal || this._scrollType == t.ScrollType.Both ? this._overlapSize.x = Math.ceil(Math.max(0, this._contentSize.x - this._viewSize.x)) : this._overlapSize.x = 0, this._scrollType == t.ScrollType.Vertical || this._scrollType == t.ScrollType.Both ? this._overlapSize.y = Math.ceil(Math.max(0, this._contentSize.y - this._viewSize.y)) : this._overlapSize.y = 0, this._xPos = t.ToolSet.clamp(this._xPos, 0, this._overlapSize.x), this._yPos = t.ToolSet.clamp(this._yPos, 0, this._overlapSize.y);
      var o = this._overlapSize[this._refreshBarAxis];
      0 == o ? o = Math.max(this._contentSize[this._refreshBarAxis] + this._footerLockedSize - this._viewSize[this._refreshBarAxis], 0) : o += this._footerLockedSize, "x" == this._refreshBarAxis ? this._container.setPosition(t.ToolSet.clamp(this._container.x, -o, this._headerLockedSize), -t.ToolSet.clamp(-this._container.y, -this._overlapSize.y, 0)) : this._container.setPosition(t.ToolSet.clamp(this._container.x, -this._overlapSize.x, 0), -t.ToolSet.clamp(-this._container.y, -o, this._headerLockedSize)), this._header && ("x" == this._refreshBarAxis ? this._header.height = this._viewSize.y : this._header.width = this._viewSize.x), this._footer && ("y" == this._refreshBarAxis ? this._footer.height = this._viewSize.y : this._footer.width = this._viewSize.x), this.updateScrollBarPos(), this._pageMode && this.updatePageController();
    }, c.prototype.posChanged = function (t) {
      0 == this._aniFlag ? this._aniFlag = t ? 1 : -1 : 1 != this._aniFlag || t || (this._aniFlag = -1), this._needRefresh = !0, cc.director.getScheduler().isScheduled(this.refresh, this) || this.scheduleOnce(this.refresh);
    }, c.prototype.refresh = function () {
      this._needRefresh = !1, this.unschedule(this.refresh), (this._pageMode || this._snapToItem) && (a.x = -this._xPos, a.y = -this._yPos, this.alignPosition(a, !1), this._xPos = -a.x, this._yPos = -a.y), this.refresh2(), this._owner.node.emit(t.Event.SCROLL, this._owner), this._needRefresh && (this._needRefresh = !1, this.unschedule(this.refresh), this.refresh2()), this.updateScrollBarPos(), this._aniFlag = 0;
    }, c.prototype.refresh2 = function () {
      var t, e;
      1 != this._aniFlag || this._dragged ? (0 != this._tweening && this.killTween(), this._container.setPosition(Math.floor(-this._xPos), -Math.floor(-this._yPos)), this.loopCheckingCurrent()) : (this._overlapSize.x > 0 ? t = -Math.floor(this._xPos) : (0 != this._container.x && (this._container.x = 0), t = 0), this._overlapSize.y > 0 ? e = -Math.floor(this._yPos) : (0 != this._container.y && (this._container.y = 0), e = 0), t != this._container.x || e != -this._container.y ? (this._tweenDuration.x = this._tweenDuration.y = o, this._tweenStart.x = this._container.x, this._tweenStart.y = -this._container.y, this._tweenChange.x = t - this._tweenStart.x, this._tweenChange.y = e - this._tweenStart.y, this.startTween(1)) : 0 != this._tweening && this.killTween()), this._pageMode && this.updatePageController();
    }, c.prototype.onTouchBegin = function (e) {
      if (this._touchEffect) {
        e.captureTouch(), 0 != this._tweening ? (this.killTween(), t.GRoot.inst.inputProcessor.cancelClick(e.touchId), this._dragged = !0) : this._dragged = !1;
        var i = this._owner.globalToLocal(e.pos.x, e.pos.y, s);
        this._containerPos.x = this._container.x, this._containerPos.y = -this._container.y, this._beginTouchPos.set(i), this._lastTouchPos.set(i), this._lastTouchGlobalPos.set(e.pos), this._isHoldAreaDone = !1, this._velocity.set(cc.Vec2.ZERO), this._velocityScale = 1, this._lastMoveTime = t.ToolSet.getTime();
      }
    }, c.prototype.onTouchMove = function (e) {
      if (cc.isValid(this._owner.node) && this._touchEffect && !(t.GObject.draggingObject && t.GObject.draggingObject.onStage || c.draggingPane && c.draggingPane != this && c.draggingPane._owner.onStage)) {
        var o,
          n,
          h,
          a = this._owner.globalToLocal(e.pos.x, e.pos.y, s),
          l = t.UIConfig.touchScrollSensitivity;
        if (this._scrollType == t.ScrollType.Vertical) {
          if (!this._isHoldAreaDone) {
            if (i |= 1, (o = Math.abs(this._beginTouchPos.y - a.y)) < l) return;
            if (0 != (2 & i) && o < Math.abs(this._beginTouchPos.x - a.x)) return;
          }
          n = !0;
        } else if (this._scrollType == t.ScrollType.Horizontal) {
          if (!this._isHoldAreaDone) {
            if (i |= 2, (o = Math.abs(this._beginTouchPos.x - a.x)) < l) return;
            if (0 != (1 & i) && o < Math.abs(this._beginTouchPos.y - a.y)) return;
          }
          h = !0;
        } else {
          if (i = 3, !this._isHoldAreaDone && (o = Math.abs(this._beginTouchPos.y - a.y)) < l && (o = Math.abs(this._beginTouchPos.x - a.x)) < l) return;
          n = h = !0;
        }
        var u = Math.floor(this._containerPos.x + a.x - this._beginTouchPos.x),
          _ = Math.floor(this._containerPos.y + a.y - this._beginTouchPos.y);
        n && (_ > 0 ? this._bouncebackEffect ? this._header && 0 != this._header.maxHeight ? this._container.y = -Math.floor(Math.min(.5 * _, this._header.maxHeight)) : this._container.y = -Math.floor(Math.min(.5 * _, this._viewSize.y * r)) : this._container.y = 0 : _ < -this._overlapSize.y ? this._bouncebackEffect ? this._footer && this._footer.maxHeight > 0 ? this._container.y = -Math.floor(Math.max(.5 * (_ + this._overlapSize.y), -this._footer.maxHeight) - this._overlapSize.y) : this._container.y = -Math.floor(Math.max(.5 * (_ + this._overlapSize.y), -this._viewSize.y * r) - this._overlapSize.y) : this._container.y = this._overlapSize.y : this._container.y = -_), h && (u > 0 ? this._bouncebackEffect ? this._header && 0 != this._header.maxWidth ? this._container.x = Math.floor(Math.min(.5 * u, this._header.maxWidth)) : this._container.x = Math.floor(Math.min(.5 * u, this._viewSize.x * r)) : this._container.x = 0 : u < 0 - this._overlapSize.x ? this._bouncebackEffect ? this._footer && this._footer.maxWidth > 0 ? this._container.x = Math.floor(Math.max(.5 * (u + this._overlapSize.x), -this._footer.maxWidth) - this._overlapSize.x) : this._container.x = Math.floor(Math.max(.5 * (u + this._overlapSize.x), -this._viewSize.x * r) - this._overlapSize.x) : this._container.x = -this._overlapSize.x : this._container.x = u);
        var p = t.ToolSet.getTime(),
          d = Math.max(p - this._lastMoveTime, 1 / 60),
          f = a.x - this._lastTouchPos.x,
          g = a.y - this._lastTouchPos.y;
        if (h || (f = 0), n || (g = 0), 0 != d) {
          var y = 60 * d - 1;
          if (y > 1) {
            var m = Math.pow(.833, y);
            this._velocity.x = this._velocity.x * m, this._velocity.y = this._velocity.y * m;
          }
          this._velocity.x = t.ToolSet.lerp(this._velocity.x, 60 * f / 60 / d, 10 * d), this._velocity.y = t.ToolSet.lerp(this._velocity.y, 60 * g / 60 / d, 10 * d);
        }
        var b = this._lastTouchGlobalPos.x - e.pos.x,
          v = this._lastTouchGlobalPos.y - e.pos.y;
        0 != f ? this._velocityScale = Math.abs(b / f) : 0 != g && (this._velocityScale = Math.abs(v / g)), this._lastTouchPos.set(a), this._lastTouchGlobalPos.x = e.pos.x, this._lastTouchGlobalPos.y = e.pos.y, this._lastMoveTime = p, this._overlapSize.x > 0 && (this._xPos = t.ToolSet.clamp(-this._container.x, 0, this._overlapSize.x)), this._overlapSize.y > 0 && (this._yPos = t.ToolSet.clamp(- -this._container.y, 0, this._overlapSize.y)), 0 != this._loop && (u = this._container.x, _ = -this._container.y, this.loopCheckingCurrent() && (this._containerPos.x += this._container.x - u, this._containerPos.y += -this._container.y - _)), c.draggingPane = this, this._isHoldAreaDone = !0, this._dragged = !0, this.updateScrollBarPos(), this.updateScrollBarVisible(), this._pageMode && this.updatePageController(), this._owner.node.emit(t.Event.SCROLL), this._owner;
      }
    }, c.prototype.onTouchEnd = function () {
      if (c.draggingPane == this && (c.draggingPane = null), i = 0, this._dragged && this._touchEffect && this._owner.node.activeInHierarchy) {
        this._dragged = !1, this._tweenStart.x = this._container.x, this._tweenStart.y = -this._container.y, a.set(this._tweenStart);
        var e = !1;
        if (this._container.x > 0 ? (a.x = 0, e = !0) : this._container.x < -this._overlapSize.x && (a.x = -this._overlapSize.x, e = !0), -this._container.y > 0 ? (a.y = 0, e = !0) : -this._container.y < -this._overlapSize.y && (a.y = -this._overlapSize.y, e = !0), e) {
          if (this._tweenChange.x = a.x - this._tweenStart.x, this._tweenChange.y = a.y - this._tweenStart.y, this._tweenChange.x < -t.UIConfig.touchDragSensitivity || this._tweenChange.y < -t.UIConfig.touchDragSensitivity ? (this._refreshEventDispatching = !0, this._owner.node.emit(t.Event.PULL_DOWN_RELEASE), this._owner, this._refreshEventDispatching = !1) : (this._tweenChange.x > t.UIConfig.touchDragSensitivity || this._tweenChange.y > t.UIConfig.touchDragSensitivity) && (this._refreshEventDispatching = !0, this._owner.node.emit(t.Event.PULL_UP_RELEASE, this._owner), this._refreshEventDispatching = !1), this._headerLockedSize > 0 && 0 == a[this._refreshBarAxis]) a[this._refreshBarAxis] = this._headerLockedSize, this._tweenChange.x = a.x - this._tweenStart.x, this._tweenChange.y = a.y - this._tweenStart.y;else if (this._footerLockedSize > 0 && a[this._refreshBarAxis] == -this._overlapSize[this._refreshBarAxis]) {
            var o = this._overlapSize[this._refreshBarAxis];
            0 == o ? o = Math.max(this._contentSize[this._refreshBarAxis] + this._footerLockedSize - this._viewSize[this._refreshBarAxis], 0) : o += this._footerLockedSize, a[this._refreshBarAxis] = -o, this._tweenChange.x = a.x - this._tweenStart.x, this._tweenChange.y = a.y - this._tweenStart.y;
          }
          this._tweenDuration.x = this._tweenDuration.y = n;
        } else {
          if (this._inertiaDisabled) this._tweenDuration.x = this._tweenDuration.y = n;else {
            var r = 60 * (t.ToolSet.getTime() - this._lastMoveTime) - 1;
            if (r > 1) {
              var s = Math.pow(.833, r);
              this._velocity.x = this._velocity.x * s, this._velocity.y = this._velocity.y * s;
            }
            this.updateTargetAndDuration(this._tweenStart, a);
          }
          if (l.x = a.x - this._tweenStart.x, l.y = a.y - this._tweenStart.y, this.loopCheckingTarget(a), (this._pageMode || this._snapToItem) && this.alignPosition(a, !0), this._tweenChange.x = a.x - this._tweenStart.x, this._tweenChange.y = a.y - this._tweenStart.y, 0 == this._tweenChange.x && 0 == this._tweenChange.y) return void this.updateScrollBarVisible();
          (this._pageMode || this._snapToItem) && (this.fixDuration("x", l.x), this.fixDuration("y", l.y));
        }
        this.startTween(2);
      } else this._dragged = !1;
    }, c.prototype.onRollOver = function () {
      this._hover = !0, this.updateScrollBarVisible();
    }, c.prototype.onRollOut = function () {
      this._hover = !1, this.updateScrollBarVisible();
    }, c.prototype.onMouseWheel = function (t) {
      if (this._mouseWheelEnabled) {
        var e = t.mouseWheelDelta > 0 ? -1 : 1;
        this._overlapSize.x > 0 && 0 == this._overlapSize.y ? this._pageMode ? this.setPosX(this._xPos + this._pageSize.x * e, !1) : this.setPosX(this._xPos + this._mouseWheelStep * e, !1) : this._pageMode ? this.setPosY(this._yPos + this._pageSize.y * e, !1) : this.setPosY(this._yPos + this._mouseWheelStep * e, !1);
      }
    }, c.prototype.updateScrollBarPos = function () {
      this._vtScrollBar && this._vtScrollBar.setScrollPerc(0 == this._overlapSize.y ? 0 : t.ToolSet.clamp(this._container.y, 0, this._overlapSize.y) / this._overlapSize.y), this._hzScrollBar && this._hzScrollBar.setScrollPerc(0 == this._overlapSize.x ? 0 : t.ToolSet.clamp(-this._container.x, 0, this._overlapSize.x) / this._overlapSize.x), this.checkRefreshBar();
    }, c.prototype.updateScrollBarVisible = function () {
      this._vtScrollBar && (this._viewSize.y <= this._vtScrollBar.minSize || this._vScrollNone ? this._vtScrollBar.node.active = !1 : this.updateScrollBarVisible2(this._vtScrollBar)), this._hzScrollBar && (this._viewSize.x <= this._hzScrollBar.minSize || this._hScrollNone ? this._hzScrollBar.node.active = !1 : this.updateScrollBarVisible2(this._hzScrollBar));
    }, c.prototype.updateScrollBarVisible2 = function (e) {
      this._scrollBarDisplayAuto && t.GTween.kill(e, !1, "alpha"), !this._scrollBarDisplayAuto || this._hover || 0 != this._tweening || this._dragged || e.gripDragging ? (e.alpha = 1, e.node.active = !0) : e.node.active && t.GTween.to(1, 0, .5).setDelay(.5).onComplete(this.__barTweenComplete, this).setTarget(e, "alpha");
    }, c.prototype.__barTweenComplete = function (t) {
      var e = t.target;
      e.alpha = 1, e.node.active = !1;
    }, c.prototype.getLoopPartSize = function (t, e) {
      return (this._contentSize[e] + ("x" == e ? this._owner.columnGap : this._owner.lineGap)) / t;
    }, c.prototype.loopCheckingCurrent = function () {
      var t = !1;
      return 1 == this._loop && this._overlapSize.x > 0 ? this._xPos < .001 ? (this._xPos += this.getLoopPartSize(2, "x"), t = !0) : this._xPos >= this._overlapSize.x && (this._xPos -= this.getLoopPartSize(2, "x"), t = !0) : 2 == this._loop && this._overlapSize.y > 0 && (this._yPos < .001 ? (this._yPos += this.getLoopPartSize(2, "y"), t = !0) : this._yPos >= this._overlapSize.y && (this._yPos -= this.getLoopPartSize(2, "y"), t = !0)), t && this._container.setPosition(Math.floor(-this._xPos), -Math.floor(-this._yPos)), t;
    }, c.prototype.loopCheckingTarget = function (t) {
      1 == this._loop && this.loopCheckingTarget2(t, "x"), 2 == this._loop && this.loopCheckingTarget2(t, "y");
    }, c.prototype.loopCheckingTarget2 = function (t, e) {
      var i, o;
      t[e] > 0 ? (i = this.getLoopPartSize(2, e), (o = this._tweenStart[e] - i) <= 0 && o >= -this._overlapSize[e] && (t[e] -= i, this._tweenStart[e] = o)) : t[e] < -this._overlapSize[e] && (i = this.getLoopPartSize(2, e), (o = this._tweenStart[e] + i) <= 0 && o >= -this._overlapSize[e] && (t[e] += i, this._tweenStart[e] = o));
    }, c.prototype.loopCheckingNewPos = function (e, i) {
      if (0 == this._overlapSize[i]) return e;
      var o,
        n = "x" == i ? this._xPos : this._yPos,
        r = !1;
      return e < .001 ? (e += this.getLoopPartSize(2, i)) > n && (o = this.getLoopPartSize(6, i), o = Math.ceil((e - n) / o) * o, n = t.ToolSet.clamp(n + o, 0, this._overlapSize[i]), r = !0) : e >= this._overlapSize[i] && (e -= this.getLoopPartSize(2, i)) < n && (o = this.getLoopPartSize(6, i), o = Math.ceil((n - e) / o) * o, n = t.ToolSet.clamp(n - o, 0, this._overlapSize[i]), r = !0), r && ("x" == i ? this._container.x = -Math.floor(n) : this._container.y = Math.floor(n)), e;
    }, c.prototype.alignPosition = function (t, e) {
      var i = 0,
        o = 0;
      if (1 == this._snappingPolicy) {
        if (this._owner.numChildren > 0) {
          var n = this._owner.getChildAt(0);
          i = Math.floor(.5 * this._viewSize.x - .5 * n.width), o = Math.floor(.5 * this._viewSize.y - .5 * n.height);
        }
      } else 2 == this._snappingPolicy && this._owner.numChildren > 0 && (n = this._owner.getChildAt(0), i = Math.floor(this._viewSize.x - n.width), o = Math.floor(this._viewSize.y - n.height));
      if (t.x -= i, t.y -= o, this._pageMode) t.x = this.alignByPage(t.x, "x", e), t.y = this.alignByPage(t.y, "y", e);else if (this._snapToItem) {
        var r = this._owner.getSnappingPosition(-t.x, -t.y, s);
        t.x < 0 && t.x > -this._overlapSize.x && (t.x = -r.x), t.y < 0 && t.y > -this._overlapSize.y && (t.y = -r.y);
      }
      t.x += i, t.y += o;
    }, c.prototype.alignByPage = function (t, e, i) {
      var o;
      if (t > 0) o = 0;else if (t < -this._overlapSize[e]) o = Math.ceil(this._contentSize[e] / this._pageSize[e]) - 1;else {
        o = Math.floor(-t / this._pageSize[e]);
        var n = i ? t - this._containerPos[e] : t - ("x" == e ? this._container.x : -this._container.y),
          r = Math.min(this._pageSize[e], this._contentSize[e] - (o + 1) * this._pageSize[e]),
          s = -t - o * this._pageSize[e];
        Math.abs(n) > this._pageSize[e] ? s > .5 * r && o++ : s > r * (n < 0 ? .3 : .7) && o++, (t = -o * this._pageSize[e]) < -this._overlapSize[e] && (t = -this._overlapSize[e]);
      }
      if (i) {
        var h,
          a = this._tweenStart[e];
        h = a > 0 ? 0 : a < -this._overlapSize[e] ? Math.ceil(this._contentSize[e] / this._pageSize[e]) - 1 : Math.floor(-a / this._pageSize[e]);
        var l = Math.floor(-this._containerPos[e] / this._pageSize[e]);
        Math.abs(o - l) > 1 && Math.abs(h - l) <= 1 && (t = -(o = o > l ? l + 1 : l - 1) * this._pageSize[e]);
      }
      return t;
    }, c.prototype.updateTargetAndDuration = function (t, e) {
      e.x = this.updateTargetAndDuration2(t.x, "x"), e.y = this.updateTargetAndDuration2(t.y, "y");
    }, c.prototype.updateTargetAndDuration2 = function (t, e) {
      var i = this._velocity[e],
        o = 0;
      if (t > 0) t = 0;else if (t < -this._overlapSize[e]) t = -this._overlapSize[e];else {
        var r = cc.sys.isMobile,
          s = Math.abs(i) * this._velocityScale;
        r && (s *= 1136 / Math.max(cc.winSize.width, cc.winSize.height));
        var h = 0;
        this._pageMode || !r ? s > 500 && (h = Math.pow((s - 500) / 500, 2)) : s > 1e3 && (h = Math.pow((s - 1e3) / 1e3, 2)), 0 != h && (h > 1 && (h = 1), s *= h, i *= h, this._velocity[e] = i, o = Math.log(60 / s) / Math.log(this._decelerationRate) / 60, t += Math.floor(i * o * .4));
      }
      return o < n && (o = n), this._tweenDuration[e] = o, t;
    }, c.prototype.fixDuration = function (t, e) {
      if (!(0 == this._tweenChange[t] || Math.abs(this._tweenChange[t]) >= Math.abs(e))) {
        var i = Math.abs(this._tweenChange[t] / e) * this._tweenDuration[t];
        i < n && (i = n), this._tweenDuration[t] = i;
      }
    }, c.prototype.startTween = function (t) {
      this._tweenTime.set(cc.Vec2.ZERO), this._tweening = t, this.updateScrollBarVisible();
    }, c.prototype.killTween = function () {
      1 == this._tweening && (this._container.setPosition(this._tweenStart.x + this._tweenChange.x, -(this._tweenStart.y + this._tweenChange.y)), this._owner.node.emit(t.Event.SCROLL, this._owner)), this._tweening = 0, this.updateScrollBarVisible(), this._owner.node.emit(t.Event.SCROLL_END, this._owner);
    }, c.prototype.checkRefreshBar = function () {
      if (null != this._header || null != this._footer) {
        var t = "x" == this._refreshBarAxis ? this._container.x : -this._container.y;
        if (this._header) if (t > 0) {
          this._header.node.active = !0;
          var e = s;
          e.x = this._header.width, e.y = this._header.height, e[this._refreshBarAxis] = t, this._header.setSize(e.x, e.y);
        } else this._header.node.active = !1;
        if (this._footer) {
          var i = this._overlapSize[this._refreshBarAxis];
          t < -i || 0 == i && this._footerLockedSize > 0 ? (this._footer.node.active = !0, (e = s).x = this._footer.x, e.y = this._footer.y, e[this._refreshBarAxis] = i > 0 ? t + this._contentSize[this._refreshBarAxis] : Math.max(Math.min(t + this._viewSize[this._refreshBarAxis], this._viewSize[this._refreshBarAxis] - this._footerLockedSize), this._viewSize[this._refreshBarAxis] - this._contentSize[this._refreshBarAxis]), this._footer.setPosition(e.x, e.y), e.x = this._footer.width, e.y = this._footer.height, e[this._refreshBarAxis] = i > 0 ? -i - t : this._viewSize[this._refreshBarAxis] - this._footer[this._refreshBarAxis], this._footer.setSize(e.x, e.y)) : this._footer.node.active = !1;
        }
      }
    }, c.prototype.update = function (e) {
      if (0 != this._tweening) {
        var i = this.runTween("x", e),
          o = this.runTween("y", e);
        return this._container.setPosition(i, -o), 2 == this._tweening && (this._overlapSize.x > 0 && (this._xPos = t.ToolSet.clamp(-i, 0, this._overlapSize.x)), this._overlapSize.y > 0 && (this._yPos = t.ToolSet.clamp(-o, 0, this._overlapSize.y)), this._pageMode && this.updatePageController()), 0 == this._tweenChange.x && 0 == this._tweenChange.y ? (this._tweening = 0, this.loopCheckingCurrent(), this.updateScrollBarPos(), this.updateScrollBarVisible(), this._owner.node.emit(t.Event.SCROLL, this._owner), this._owner.node.emit(t.Event.SCROLL_END, this._owner)) : (this.updateScrollBarPos(), this._owner.node.emit(t.Event.SCROLL, this._owner)), !0;
      }
    }, c.prototype.runTween = function (t, e) {
      var i, o;
      if (0 != this._tweenChange[t]) {
        if (this._tweenTime[t] += e, this._tweenTime[t] >= this._tweenDuration[t]) i = this._tweenStart[t] + this._tweenChange[t], this._tweenChange[t] = 0;else {
          var r = (o = (o = this._tweenTime[t]) / this._tweenDuration[t] - 1) * o * o + 1;
          i = this._tweenStart[t] + Math.floor(this._tweenChange[t] * r);
        }
        var s = 0,
          h = -this._overlapSize[t];
        if (this._headerLockedSize > 0 && this._refreshBarAxis == t && (s = this._headerLockedSize), this._footerLockedSize > 0 && this._refreshBarAxis == t) {
          var a = this._overlapSize[this._refreshBarAxis];
          0 == a ? a = Math.max(this._contentSize[this._refreshBarAxis] + this._footerLockedSize - this._viewSize[this._refreshBarAxis], 0) : a += this._footerLockedSize, h = -a;
        }
        2 == this._tweening && this._bouncebackEffect ? i > 20 + s && this._tweenChange[t] > 0 || i > s && 0 == this._tweenChange[t] ? (this._tweenTime[t] = 0, this._tweenDuration[t] = n, this._tweenChange[t] = -i + s, this._tweenStart[t] = i) : (i < h - 20 && this._tweenChange[t] < 0 || i < h && 0 == this._tweenChange[t]) && (this._tweenTime[t] = 0, this._tweenDuration[t] = n, this._tweenChange[t] = h - i, this._tweenStart[t] = i) : i > s ? (i = s, this._tweenChange[t] = 0) : i < h && (i = h, this._tweenChange[t] = 0);
      } else i = "x" == t ? this._container.x : -this._container.y;
      return i;
    }, c;
  }(cc.Component);
  t.ScrollPane = e;
  var i = 0,
    o = .5,
    n = .3,
    r = .5,
    s = new cc.Vec2(),
    h = new cc.Rect(),
    a = new cc.Vec2(),
    l = new cc.Vec2();
}(fgui || (fgui = {})), function (t) {
  var e = function () {
    function e(t) {
      this._ownerBaseX = 0, this._ownerBaseY = 0, this._totalTimes = 0, this._totalTasks = 0, this._options = 0, this._totalDuration = 0, this._autoPlayTimes = 1, this._autoPlayDelay = 0, this._timeScale = 1, this._startTime = 0, this._endTime = 0, this._owner = t, this._items = new Array();
    }
    return e.prototype.play = function (t, e, i, o, n) {
      this._play(t, e, i, o, n, !1);
    }, e.prototype.playReverse = function (t, e, i) {
      this._play(t, e, i, 0, -1, !0);
    }, e.prototype.changePlayTimes = function (t) {
      this._totalTimes = t;
    }, e.prototype.setAutoPlay = function (t, e, i) {
      null == e && (e = -1), null == i && (i = 0), this._autoPlay != t && (this._autoPlay = t, this._autoPlayTimes = e, this._autoPlayDelay = i, this._autoPlay ? this._owner.onStage && this.play(null, this._autoPlayTimes, this._autoPlayDelay) : this._owner.onStage || this.stop(!1, !0));
    }, e.prototype._play = function (e, o, n, r, s, h) {
      null == o && (o = 1), null == n && (n = 0), null == r && (r = 0), null == s && (s = -1), this.stop(!0, !0), this._totalTimes = o, this._reversed = h, this._startTime = r, this._endTime = s, this._playing = !0, this._paused = !1, this._onComplete = e;
      for (var a = this._items.length, l = 0; l < a; l++) {
        var c = this._items[l];
        if (null == c.target ? c.targetId ? c.target = this._owner.getChildById(c.targetId) : c.target = this._owner : c.target != this._owner && c.target.parent != this._owner && (c.target = null), c.target && c.type == i.Transition) {
          var u = c.target.getTransition(c.value.transName);
          if (u == this && (u = null), u) if (0 == c.value.playTimes) {
            var _;
            for (_ = l - 1; _ >= 0; _--) {
              var p = this._items[_];
              if (p.type == i.Transition && p.value.trans == u) {
                p.value.stopTime = c.time - p.time;
                break;
              }
            }
            _ < 0 ? c.value.stopTime = 0 : u = null;
          } else c.value.stopTime = -1;
          c.value.trans = u;
        }
      }
      0 == n ? this.onDelayedPlay() : t.GTween.delayedCall(n).setTarget(this).onComplete(this.onDelayedPlay, this);
    }, e.prototype.stop = function (e, i) {
      if (null == e && (e = !0), this._playing) {
        this._playing = !1, this._totalTasks = 0, this._totalTimes = 0;
        var o = this._onComplete;
        this._onComplete = null, t.GTween.kill(this);
        var n = this._items.length;
        if (this._reversed) for (var r = n - 1; r >= 0; r--) {
          var s = this._items[r];
          null != s.target && this.stopItem(s, e);
        } else for (r = 0; r < n; r++) null != (s = this._items[r]).target && this.stopItem(s, e);
        i && null != o && o();
      }
    }, e.prototype.stopItem = function (t, e) {
      if (0 != t.displayLockToken && (t.target.releaseDisplayLock(t.displayLockToken), t.displayLockToken = 0), t.tweener && (t.tweener.kill(e), t.tweener = null, t.type != i.Shake || e || (t.target._gearLocked = !0, t.target.setPosition(t.target.x - t.value.lastOffsetX, t.target.y - t.value.lastOffsetY), t.target._gearLocked = !1)), t.type == i.Transition) {
        var o = t.value.trans;
        o && o.stop(e, !1);
      }
    }, e.prototype.setPaused = function (e) {
      if (this._playing && this._paused != e) {
        this._paused = e;
        var o = t.GTween.getTween(this);
        o && o.setPaused(e);
        for (var n = this._items.length, r = 0; r < n; r++) {
          var s = this._items[r];
          null != s.target && (s.type == i.Transition ? s.value.trans && s.value.trans.setPaused(e) : s.type == i.Animation && (e ? (s.value.flag = s.target.getProp(t.ObjectPropID.Playing), s.target.setProp(t.ObjectPropID.Playing, !1)) : s.target.setProp(t.ObjectPropID.Playing, s.value.flag)), s.tweener && s.tweener.setPaused(e));
        }
      }
    }, e.prototype.dispose = function () {
      this._playing && t.GTween.kill(this);
      for (var e = this._items.length, i = 0; i < e; i++) {
        var o = this._items[i];
        o.tweener && (o.tweener.kill(), o.tweener = null), o.target = null, o.hook = null, o.tweenConfig && (o.tweenConfig.endHook = null);
      }
      this._items.length = 0, this._playing = !1, this._onComplete = null;
    }, Object.defineProperty(e.prototype, "playing", {
      get: function get() {
        return this._playing;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.setValue = function (t) {
      for (var e = [], o = 1; o < arguments.length; o++) e[o - 1] = arguments[o];
      for (var n, r = this._items.length, s = 0; s < r; s++) {
        var h = this._items[s];
        if (h.label == t) n = h.tweenConfig ? h.tweenConfig.startValue : h.value;else {
          if (!h.tweenConfig || h.tweenConfig.endLabel != t) continue;
          n = h.tweenConfig.endValue;
        }
        switch (h.type) {
          case i.XY:
          case i.Size:
          case i.Pivot:
          case i.Scale:
          case i.Skew:
            n.b1 = !0, n.b2 = !0, n.f1 = parseFloat(e[0]), n.f2 = parseFloat(e[1]);
            break;
          case i.Alpha:
          case i.Rotation:
          case i.Color:
            n.f1 = parseFloat(e[0]);
            break;
          case i.Animation:
            n.frame = parseInt(e[0]), e.length > 1 && (n.playing = e[1]);
            break;
          case i.Visible:
            n.visible = e[0];
            break;
          case i.Sound:
            n.sound = e[0], e.length > 1 && (n.volume = parseFloat(e[1]));
            break;
          case i.Transition:
            n.transName = e[0], e.length > 1 && (n.playTimes = parseInt(e[1]));
            break;
          case i.Shake:
            n.amplitude = parseFloat(e[0]), e.length > 1 && (n.duration = parseFloat(e[1]));
            break;
          case i.ColorFilter:
            n.f1 = parseFloat(e[0]), n.f2 = parseFloat(e[1]), n.f3 = parseFloat(e[2]), n.f4 = parseFloat(e[3]);
            break;
          case i.Text:
          case i.Icon:
            n.text = e[0];
        }
      }
    }, e.prototype.setHook = function (t, e) {
      for (var i = this._items.length, o = 0; o < i; o++) {
        var n = this._items[o];
        if (n.label == t) {
          n.hook = e;
          break;
        }
        if (n.tweenConfig && n.tweenConfig.endLabel == t) {
          n.tweenConfig.endHook = e;
          break;
        }
      }
    }, e.prototype.clearHooks = function () {
      for (var t = this._items.length, e = 0; e < t; e++) {
        var i = this._items[e];
        i.hook = null, i.tweenConfig && (i.tweenConfig.endHook = null);
      }
    }, e.prototype.setTarget = function (t, e) {
      for (var i = this._items.length, o = 0; o < i; o++) {
        var n = this._items[o];
        n.label == t && (n.targetId = e.id, n.target = null);
      }
    }, e.prototype.setDuration = function (t, e) {
      for (var i = this._items.length, o = 0; o < i; o++) {
        var n = this._items[o];
        n.tweenConfig && n.label == t && (n.tweenConfig.duration = e);
      }
    }, e.prototype.getLabelTime = function (t) {
      for (var e = this._items.length, i = 0; i < e; i++) {
        var o = this._items[i];
        if (o.label == t) return o.time;
        if (o.tweenConfig && o.tweenConfig.endLabel == t) return o.time + o.tweenConfig.duration;
      }
      return Number.NaN;
    }, Object.defineProperty(e.prototype, "timeScale", {
      get: function get() {
        return this._timeScale;
      },
      set: function set(e) {
        if (this._timeScale != e && (this._timeScale = e, this._playing)) for (var o = this._items.length, n = 0; n < o; n++) {
          var r = this._items[n];
          r.tweener ? r.tweener.setTimeScale(e) : r.type == i.Transition ? r.value.trans && (r.value.trans.timeScale = e) : r.type == i.Animation && r.target && r.target.setProp(t.ObjectPropID.TimeScale, e);
        }
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.updateFromRelations = function (t, e, o) {
      var n = this._items.length;
      if (0 != n) for (var r = 0; r < n; r++) {
        var s = this._items[r];
        s.type == i.XY && s.targetId == t && (s.tweenConfig ? (s.tweenConfig.startValue.f1 += e, s.tweenConfig.startValue.f2 += o, s.tweenConfig.endValue.f1 += e, s.tweenConfig.endValue.f2 += o) : (s.value.f1 += e, s.value.f2 += o));
      }
    }, e.prototype.onEnable = function () {
      this._autoPlay && !this._playing && this.play(null, this._autoPlayTimes, this._autoPlayDelay);
    }, e.prototype.onDisable = function () {
      0 == (this._options & n) && this.stop(0 != (this._options & r), !1);
    }, e.prototype.onDelayedPlay = function () {
      if (this.internalPlay(), this._playing = this._totalTasks > 0, this._playing) {
        if (0 != (this._options & o)) for (var t = this._items.length, e = 0; e < t; e++) {
          var i = this._items[e];
          i.target && i.target != this._owner && (i.displayLockToken = i.target.addDisplayLock());
        }
      } else if (null != this._onComplete) {
        var n = this._onComplete;
        this._onComplete = null, n();
      }
    }, e.prototype.internalPlay = function () {
      this._ownerBaseX = this._owner.x, this._ownerBaseY = this._owner.y, this._totalTasks = 1;
      var t,
        e,
        o = this._items.length,
        n = !1;
      if (this._reversed) for (e = o - 1; e >= 0; e--) null != (t = this._items[e]).target && this.playItem(t);else for (e = 0; e < o; e++) null != (t = this._items[e]).target && (t.type == i.Animation && 0 != this._startTime && t.time <= this._startTime ? (n = !0, t.value.flag = !1) : this.playItem(t));
      n && this.skipAnimations(), this._totalTasks--;
    }, e.prototype.playItem = function (e) {
      var o;
      if (e.tweenConfig) {
        if (o = this._reversed ? this._totalDuration - e.time - e.tweenConfig.duration : e.time, -1 == this._endTime || o <= this._endTime) {
          var n, r;
          switch (this._reversed ? (n = e.tweenConfig.endValue, r = e.tweenConfig.startValue) : (n = e.tweenConfig.startValue, r = e.tweenConfig.endValue), e.value.b1 = n.b1 || r.b1, e.value.b2 = n.b2 || r.b2, e.type) {
            case i.XY:
            case i.Size:
            case i.Scale:
            case i.Skew:
              e.tweener = t.GTween.to2(n.f1, n.f2, r.f1, r.f2, e.tweenConfig.duration);
              break;
            case i.Alpha:
            case i.Rotation:
              e.tweener = t.GTween.to(n.f1, r.f1, e.tweenConfig.duration);
              break;
            case i.Color:
              e.tweener = t.GTween.toColor(n.f1, r.f1, e.tweenConfig.duration);
              break;
            case i.ColorFilter:
              e.tweener = t.GTween.to4(n.f1, n.f2, n.f3, n.f4, r.f1, r.f2, r.f3, r.f4, e.tweenConfig.duration);
          }
          e.tweener.setDelay(o).setEase(e.tweenConfig.easeType).setRepeat(e.tweenConfig.repeat, e.tweenConfig.yoyo).setTimeScale(this._timeScale).setTarget(e).onStart(this.onTweenStart, this).onUpdate(this.onTweenUpdate, this).onComplete(this.onTweenComplete, this), this._endTime >= 0 && e.tweener.setBreakpoint(this._endTime - o), this._totalTasks++;
        }
      } else e.type == i.Shake ? (o = this._reversed ? this._totalDuration - e.time - e.value.duration : e.time, e.value.offsetX = e.value.offsetY = 0, e.value.lastOffsetX = e.value.lastOffsetY = 0, e.tweener = t.GTween.shake(0, 0, e.value.amplitude, e.value.duration).setDelay(o).setTimeScale(this._timeScale).setTarget(e).onUpdate(this.onTweenUpdate, this).onComplete(this.onTweenComplete, this), this._endTime >= 0 && e.tweener.setBreakpoint(this._endTime - e.time), this._totalTasks++) : (o = this._reversed ? this._totalDuration - e.time : e.time) <= this._startTime ? (this.applyValue(e), this.callHook(e, !1)) : (-1 == this._endTime || o <= this._endTime) && (this._totalTasks++, e.tweener = t.GTween.delayedCall(o).setTimeScale(this._timeScale).setTarget(e).onComplete(this.onDelayedPlayItem, this));
      e.tweener && e.tweener.seek(this._startTime);
    }, e.prototype.skipAnimations = function () {
      for (var e, o, n, r, s, h, a = this._items.length, l = 0; l < a; l++) if (!((h = this._items[l]).type != i.Animation || h.time > this._startTime || (r = h.value).flag)) {
        e = (s = h.target).getProp(t.ObjectPropID.Frame), o = s.getProp(t.ObjectPropID.Playing) ? 0 : -1, n = 0;
        for (var c = l; c < a; c++) (h = this._items[c]).type != i.Animation || h.target != s || h.time > this._startTime || ((r = h.value).flag = !0, -1 != r.frame ? (e = r.frame, o = r.playing ? h.time : -1, n = 0) : r.playing ? o < 0 && (o = h.time) : (o >= 0 && (n += h.time - o), o = -1), this.callHook(h, !1));
        o >= 0 && (n += this._startTime - o), s.setProp(t.ObjectPropID.Playing, o >= 0), s.setProp(t.ObjectPropID.Frame, e), n > 0 && s.setProp(t.ObjectPropID.DeltaTime, n);
      }
    }, e.prototype.onDelayedPlayItem = function (t) {
      var e = t.target;
      e.tweener = null, this._totalTasks--, this.applyValue(e), this.callHook(e, !1), this.checkAllComplete();
    }, e.prototype.onTweenStart = function (t) {
      var e,
        o,
        n = t.target;
      n.type != i.XY && n.type != i.Size || (this._reversed ? (e = n.tweenConfig.endValue, o = n.tweenConfig.startValue) : (e = n.tweenConfig.startValue, o = n.tweenConfig.endValue), n.type == i.XY ? n.target != this._owner ? (e.b1 ? e.b3 && (t.startValue.x = e.f1 * this._owner.width) : t.startValue.x = n.target.x, e.b2 ? e.b3 && (t.startValue.y = e.f2 * this._owner.height) : t.startValue.y = n.target.y, o.b1 ? o.b3 && (t.endValue.x = o.f1 * this._owner.width) : t.endValue.x = t.startValue.x, o.b2 ? o.b3 && (t.endValue.y = o.f2 * this._owner.height) : t.endValue.y = t.startValue.y) : (e.b1 || (t.startValue.x = n.target.x - this._ownerBaseX), e.b2 || (t.startValue.y = n.target.y - this._ownerBaseY), o.b1 || (t.endValue.x = t.startValue.x), o.b2 || (t.endValue.y = t.startValue.y)) : (e.b1 || (t.startValue.x = n.target.width), e.b2 || (t.startValue.y = n.target.height), o.b1 || (t.endValue.x = t.startValue.x), o.b2 || (t.endValue.y = t.startValue.y)), n.tweenConfig.path && (n.value.b1 = n.value.b2 = !0, t.setPath(n.tweenConfig.path))), this.callHook(n, !1);
    }, e.prototype.onTweenUpdate = function (t) {
      var e = t.target;
      switch (e.type) {
        case i.XY:
        case i.Size:
        case i.Scale:
        case i.Skew:
          e.value.f1 = t.value.x, e.value.f2 = t.value.y, e.tweenConfig.path && (e.value.f1 += t.startValue.x, e.value.f2 += t.startValue.y);
          break;
        case i.Alpha:
        case i.Rotation:
          e.value.f1 = t.value.x;
          break;
        case i.Color:
          e.value.f1 = t.value.color;
          break;
        case i.ColorFilter:
          e.value.f1 = t.value.x, e.value.f2 = t.value.y, e.value.f3 = t.value.z, e.value.f4 = t.value.w;
          break;
        case i.Shake:
          e.value.offsetX = t.deltaValue.x, e.value.offsetY = t.deltaValue.y;
      }
      this.applyValue(e);
    }, e.prototype.onTweenComplete = function (t) {
      var e = t.target;
      e.tweener = null, this._totalTasks--, t.allCompleted && this.callHook(e, !0), this.checkAllComplete();
    }, e.prototype.onPlayTransCompleted = function () {
      this._totalTasks--, this.checkAllComplete();
    }, e.prototype.callHook = function (t, e) {
      e ? t.tweenConfig && null != t.tweenConfig.endHook && t.tweenConfig.endHook(t.label) : t.time >= this._startTime && null != t.hook && t.hook(t.label);
    }, e.prototype.checkAllComplete = function () {
      if (this._playing && 0 == this._totalTasks) if (this._totalTimes < 0) this.internalPlay(), 0 == this._totalTasks && t.GTween.delayedCall(0).setTarget(this).onComplete(this.checkAllComplete, this);else if (this._totalTimes--, this._totalTimes > 0) this.internalPlay(), 0 == this._totalTasks && t.GTween.delayedCall(0).setTarget(this).onComplete(this.checkAllComplete, this);else {
        this._playing = !1;
        for (var e = this._items.length, i = 0; i < e; i++) {
          var o = this._items[i];
          o.target && 0 != o.displayLockToken && (o.target.releaseDisplayLock(o.displayLockToken), o.displayLockToken = 0);
        }
        if (null != this._onComplete) {
          var n = this._onComplete;
          this._onComplete = null, n();
        }
      }
    }, e.prototype.applyValue = function (e) {
      e.target._gearLocked = !0;
      var o = e.value;
      switch (e.type) {
        case i.XY:
          e.target == this._owner ? o.b1 && o.b2 ? e.target.setPosition(o.f1 + this._ownerBaseX, o.f2 + this._ownerBaseY) : o.b1 ? e.target.x = o.f1 + this._ownerBaseX : e.target.y = o.f2 + this._ownerBaseY : o.b3 ? o.b1 && o.b2 ? e.target.setPosition(o.f1 * this._owner.width, o.f2 * this._owner.height) : o.b1 ? e.target.x = o.f1 * this._owner.width : o.b2 && (e.target.y = o.f2 * this._owner.height) : o.b1 && o.b2 ? e.target.setPosition(o.f1, o.f2) : o.b1 ? e.target.x = o.f1 : o.b2 && (e.target.y = o.f2);
          break;
        case i.Size:
          o.b1 || (o.f1 = e.target.width), o.b2 || (o.f2 = e.target.height), e.target.setSize(o.f1, o.f2);
          break;
        case i.Pivot:
          e.target.setPivot(o.f1, o.f2, e.target.pivotAsAnchor);
          break;
        case i.Alpha:
          e.target.alpha = o.f1;
          break;
        case i.Rotation:
          e.target.rotation = o.f1;
          break;
        case i.Scale:
          e.target.setScale(o.f1, o.f2);
          break;
        case i.Skew:
          e.target.setSkew(o.f1, o.f2);
          break;
        case i.Color:
          var n = e.target.getProp(t.ObjectPropID.Color);
          if (n instanceof cc.Color) {
            var r = Math.floor(o.f1);
            n.setR(r >> 16 & 255).setG(r >> 8 & 255).setB(255 & r), e.target.setProp(t.ObjectPropID.Color, n);
          }
          break;
        case i.Animation:
          o.frame >= 0 && e.target.setProp(t.ObjectPropID.Frame, o.frame), e.target.setProp(t.ObjectPropID.Playing, o.playing), e.target.setProp(t.ObjectPropID.TimeScale, this._timeScale);
          break;
        case i.Visible:
          e.target.visible = o.visible;
          break;
        case i.Transition:
          if (this._playing) {
            var s = o.trans;
            if (s) {
              this._totalTasks++;
              var h = this._startTime > e.time ? this._startTime - e.time : 0,
                a = this._endTime >= 0 ? this._endTime - e.time : -1;
              o.stopTime >= 0 && (a < 0 || a > o.stopTime) && (a = o.stopTime), s.timeScale = this._timeScale, s._play(function () {
                this.onPlayTransCompleted(e);
              }.bind(this), o.playTimes, 0, h, a, this._reversed);
            }
          }
          break;
        case i.Sound:
          if (this._playing && e.time >= this._startTime) {
            if (null == o.audioClip) {
              var l = t.UIPackage.getItemByURL(o.sound);
              l && (o.audioClip = l.owner.getItemAsset(l));
            }
            o.audioClip && t.GRoot.inst.playOneShotSound(o.audioClip, o.volume);
          }
          break;
        case i.Shake:
          e.target.setPosition(e.target.x - o.lastOffsetX + o.offsetX, e.target.y - o.lastOffsetY + o.offsetY), o.lastOffsetX = o.offsetX, o.lastOffsetY = o.offsetY;
          break;
        case i.ColorFilter:
          break;
        case i.Text:
          e.target.text = o.text;
          break;
        case i.Icon:
          e.target.icon = o.text;
      }
      e.target._gearLocked = !1;
    }, e.prototype.setup = function (e) {
      this.name = e.readS(), this._options = e.readInt(), this._autoPlay = e.readBool(), this._autoPlayTimes = e.readInt(), this._autoPlayDelay = e.readFloat();
      for (var i = e.readShort(), o = 0; o < i; o++) {
        var n = e.readShort(),
          r = e.position;
        e.seek(r, 0);
        var a = new s(e.readByte());
        this._items[o] = a, a.time = e.readFloat();
        var l = e.readShort();
        if (a.targetId = l < 0 ? "" : this._owner.getChildAt(l).id, a.label = e.readS(), e.readBool()) {
          if (e.seek(r, 1), a.tweenConfig = new h(), a.tweenConfig.duration = e.readFloat(), a.time + a.tweenConfig.duration > this._totalDuration && (this._totalDuration = a.time + a.tweenConfig.duration), a.tweenConfig.easeType = e.readByte(), a.tweenConfig.repeat = e.readInt(), a.tweenConfig.yoyo = e.readBool(), a.tweenConfig.endLabel = e.readS(), e.seek(r, 2), this.decodeValue(a, e, a.tweenConfig.startValue), e.seek(r, 3), this.decodeValue(a, e, a.tweenConfig.endValue), e.version >= 2) {
            var c = e.readInt();
            if (c > 0) {
              a.tweenConfig.path = new t.GPath();
              for (var u = new Array(), _ = 0; _ < c; _++) {
                var p = e.readByte();
                switch (p) {
                  case t.CurveType.Bezier:
                    u.push(t.GPathPoint.newBezierPoint(e.readFloat(), e.readFloat(), e.readFloat(), e.readFloat()));
                    break;
                  case t.CurveType.CubicBezier:
                    u.push(t.GPathPoint.newCubicBezierPoint(e.readFloat(), e.readFloat(), e.readFloat(), e.readFloat(), e.readFloat(), e.readFloat()));
                    break;
                  default:
                    u.push(t.GPathPoint.newPoint(e.readFloat(), e.readFloat(), p));
                }
              }
              a.tweenConfig.path.create(u);
            }
          }
        } else a.time > this._totalDuration && (this._totalDuration = a.time), e.seek(r, 2), this.decodeValue(a, e, a.value);
        e.position = r + n;
      }
    }, e.prototype.decodeValue = function (t, e, o) {
      switch (t.type) {
        case i.XY:
        case i.Size:
        case i.Pivot:
        case i.Skew:
          o.b1 = e.readBool(), o.b2 = e.readBool(), o.f1 = e.readFloat(), o.f2 = e.readFloat(), e.version >= 2 && t.type == i.XY && (o.b3 = e.readBool());
          break;
        case i.Alpha:
        case i.Rotation:
          o.f1 = e.readFloat();
          break;
        case i.Scale:
          o.f1 = e.readFloat(), o.f2 = e.readFloat();
          break;
        case i.Color:
          var n = e.readColor();
          o.f1 = (n.getR() << 16) + (n.getG() << 8) + n.getB();
          break;
        case i.Animation:
          o.playing = e.readBool(), o.frame = e.readInt();
          break;
        case i.Visible:
          o.visible = e.readBool();
          break;
        case i.Sound:
          o.sound = e.readS(), o.volume = e.readFloat();
          break;
        case i.Transition:
          o.transName = e.readS(), o.playTimes = e.readInt();
          break;
        case i.Shake:
          o.amplitude = e.readFloat(), o.duration = e.readFloat();
          break;
        case i.ColorFilter:
          o.f1 = e.readFloat(), o.f2 = e.readFloat(), o.f3 = e.readFloat(), o.f4 = e.readFloat();
          break;
        case i.Text:
        case i.Icon:
          o.text = e.readS();
      }
    }, e;
  }();
  t.Transition = e;
  var i,
    o = 1,
    n = 2,
    r = 4;
  (function (t) {
    t[t.XY = 0] = "XY", t[t.Size = 1] = "Size", t[t.Scale = 2] = "Scale", t[t.Pivot = 3] = "Pivot", t[t.Alpha = 4] = "Alpha", t[t.Rotation = 5] = "Rotation", t[t.Color = 6] = "Color", t[t.Animation = 7] = "Animation", t[t.Visible = 8] = "Visible", t[t.Sound = 9] = "Sound", t[t.Transition = 10] = "Transition", t[t.Shake = 11] = "Shake", t[t.ColorFilter = 12] = "ColorFilter", t[t.Skew = 13] = "Skew", t[t.Text = 14] = "Text", t[t.Icon = 15] = "Icon", t[t.Unknown = 16] = "Unknown";
  })(i || (i = {}));
  var s = function s(t) {
      this.type = t, this.value = {}, this.displayLockToken = 0;
    },
    h = function h() {
      this.easeType = t.EaseType.QuadOut, this.startValue = {
        b1: !0,
        b2: !0
      }, this.endValue = {
        b1: !0,
        b2: !0
      };
    };
}(fgui || (fgui = {})), function (t) {
  var e = function () {
    function e() {}
    return e.loadFromXML = function (t) {
      var i = {};
      e.strings = i;
      for (var o = new cc.SAXParser().parse(t).documentElement.childNodes, n = o.length, r = 0; r < n; r++) {
        var s = o[r];
        if ("string" == s.tagName) {
          var h = s.getAttribute("name"),
            a = s.childNodes.length > 0 ? s.firstChild.nodeValue : "",
            l = h.indexOf("-");
          if (-1 == l) continue;
          var c = h.substr(0, l),
            u = h.substr(l + 1),
            _ = i[c];
          _ || (_ = {}, i[c] = _), _[u] = a;
        }
      }
    }, e.translateComponent = function (i) {
      if (null != e.strings) {
        var o = e.strings[i.owner.id + i.id];
        if (null != o) {
          var n,
            r,
            s,
            h,
            a,
            l,
            c,
            u,
            _,
            p = i.rawData;
          p.seek(0, 2);
          var d = p.readShort();
          for (a = 0; a < d; a++) {
            c = p.readShort(), u = p.position, p.seek(u, 0);
            var f = p.readByte(),
              g = f;
            p.skip(4), n = p.readS(), g == t.ObjectType.Component && p.seek(u, 6) && (g = p.readByte()), p.seek(u, 1), null != (r = o[n + "-tips"]) && p.writeS(r), p.seek(u, 2);
            var y = p.readShort();
            for (l = 0; l < y; l++) {
              if (s = p.readShort(), s += p.position, 6 == p.readByte()) {
                for (p.skip(2), _ = p.readShort(), b = 0; b < _; b++) null != p.readS() && (null != (r = o[n + "-texts_" + b]) ? p.writeS(r) : p.skip(2));
                p.readBool() && null != (r = o[n + "-texts_def"]) && p.writeS(r);
              }
              p.position = s;
            }
            if (f == t.ObjectType.Component && p.version >= 2) {
              p.seek(u, 4), p.skip(2), p.skip(4 * p.readShort());
              for (var m = p.readShort(), b = 0; b < m; b++) {
                var v = p.readS();
                0 == p.readShort() && null != (r = o[n + "-cp-" + v]) ? p.writeS(r) : p.skip(2);
              }
            }
            switch (g) {
              case t.ObjectType.Text:
              case t.ObjectType.RichText:
              case t.ObjectType.InputText:
                null != (r = o[n]) && (p.seek(u, 6), p.writeS(r)), null != (r = o[n + "-prompt"]) && (p.seek(u, 4), p.writeS(r));
                break;
              case t.ObjectType.List:
              case t.ObjectType.Tree:
                for (p.seek(u, 8), p.skip(2), h = p.readShort(), l = 0; l < h; l++) {
                  if (s = p.readShort(), s += p.position, p.skip(2), g == t.ObjectType.Tree && p.skip(2), null != (r = o[n + "-" + l]) ? p.writeS(r) : p.skip(2), null != (r = o[n + "-" + l + "-0"]) ? p.writeS(r) : p.skip(2), p.version >= 2) for (p.skip(6), p.skip(4 * p.readUshort()), m = p.readUshort(), b = 0; b < m; b++) v = p.readS(), 0 == p.readUshort() && null != (r = o[n + "-" + l + "-" + v]) ? p.writeS(r) : p.skip(2);
                  p.position = s;
                }
                break;
              case t.ObjectType.Label:
                p.seek(u, 6) && p.readByte() == g && (null != (r = o[n]) ? p.writeS(r) : p.skip(2), p.skip(2), p.readBool() && p.skip(4), p.skip(4), p.readBool() && null != (r = o[n + "-prompt"]) && p.writeS(r));
                break;
              case t.ObjectType.Button:
                p.seek(u, 6) && p.readByte() == g && (null != (r = o[n]) ? p.writeS(r) : p.skip(2), null != (r = o[n + "-0"]) && p.writeS(r));
                break;
              case t.ObjectType.ComboBox:
                if (p.seek(u, 6) && p.readByte() == g) {
                  for (h = p.readShort(), l = 0; l < h; l++) s = p.readShort(), s += p.position, null != (r = o[n + "-" + l]) && p.writeS(r), p.position = s;
                  null != (r = o[n]) && p.writeS(r);
                }
            }
            p.position = u + c;
          }
        }
      }
    }, e;
  }();
  t.TranslationHelper = e;
}(fgui || (fgui = {})), function (t) {
  var e = function () {
    function e() {}
    return e.defaultFont = "Arial", e.modalLayerColor = new cc.Color(51, 51, 51, 51), e.buttonSoundVolumeScale = 1, e.defaultScrollStep = 25, e.defaultScrollDecelerationRate = .967, e.defaultScrollBarDisplay = t.ScrollBarDisplayType.Visible, e.defaultScrollTouchEffect = !0, e.defaultScrollBounceEffect = !0, e.defaultComboBoxVisibleItemCount = 10, e.touchScrollSensitivity = 20, e.touchDragSensitivity = 10, e.clickDragSensitivity = 2, e.bringWindowToFrontOnClick = !0, e.frameTimeForAsyncUIConstruction = .002, e.linkUnderline = !0, e.defaultUIGroup = "UI", e;
  }();
  t.UIConfig = e, t.addLoadHandler = function () {};
  var i = {};
  t.registerFont = function (t, e) {
    e instanceof cc.Font ? i[t] = e : i[t] = cc.loader.getRes(t, cc.Font);
  }, t.getFontByName = function (t) {
    return i[t];
  };
}(fgui || (fgui = {})), function (t) {
  var e = function () {
    function e() {}
    return e.setExtension = function (i, o) {
      if (null == i) throw new Error("Invaild url: " + i);
      var n = t.UIPackage.getItemByURL(i);
      n && (n.extensionType = o), e.extensions[i] = o;
    }, e.setLoaderExtension = function (t) {
      e.loaderType = t;
    }, e.resolveExtension = function (t) {
      var i = e.extensions["ui://" + t.owner.id + t.id];
      i || (i = e.extensions["ui://" + t.owner.name + "/" + t.name]), i && (t.extensionType = i);
    }, e.newObject = function (i, o) {
      var n;
      if (e.counter++, "number" == typeof i) switch (i) {
        case t.ObjectType.Image:
          return new t.GImage();
        case t.ObjectType.MovieClip:
          return new t.GMovieClip();
        case t.ObjectType.Component:
          return new t.GComponent();
        case t.ObjectType.Text:
          return new t.GTextField();
        case t.ObjectType.RichText:
          return new t.GRichTextField();
        case t.ObjectType.InputText:
          return new t.GTextInput();
        case t.ObjectType.Group:
          return new t.GGroup();
        case t.ObjectType.List:
          return new t.GList();
        case t.ObjectType.Graph:
          return new t.GGraph();
        case t.ObjectType.Loader:
          return e.loaderType ? new e.loaderType() : new t.GLoader();
        case t.ObjectType.Button:
          return new t.GButton();
        case t.ObjectType.Label:
          return new t.GLabel();
        case t.ObjectType.ProgressBar:
          return new t.GProgressBar();
        case t.ObjectType.Slider:
          return new t.GSlider();
        case t.ObjectType.ScrollBar:
          return new t.GScrollBar();
        case t.ObjectType.ComboBox:
          return new t.GComboBox();
        case t.ObjectType.Tree:
          return new t.GTree();
        case t.ObjectType.Loader3D:
          return new t.GLoader3D();
        default:
          return null;
      } else (n = i.type == t.PackageItemType.Component ? o ? new o() : i.extensionType ? new i.extensionType() : e.newObject(i.objectType) : e.newObject(i.objectType)) && (n.packageItem = i);
      return n;
    }, e.counter = 0, e.extensions = {}, e;
  }();
  t.UIObjectFactory = e;
}(fgui || (fgui = {})), function (t) {
  var e,
    i = function () {
      function e() {
        this._items = [], this._itemsById = {}, this._itemsByName = {}, this._sprites = {}, this._dependencies = [], this._branches = [], this._branchIndex = -1;
      }
      return Object.defineProperty(e, "branch", {
        get: function get() {
          return e._branch;
        },
        set: function set(t) {
          for (var i in e._branch = t, e._instById) {
            var o = e._instById[i];
            o._branches && (o._branchIndex = o._branches.indexOf(t));
          }
        },
        enumerable: !1,
        configurable: !0
      }), e.getVar = function (t) {
        return e._vars[t];
      }, e.setVar = function (t, i) {
        e._vars[t] = i;
      }, e.getById = function (t) {
        return e._instById[t];
      }, e.getByName = function (t) {
        return e._instByName[t];
      }, e.addPackage = function (i) {
        var o = e._instById[i];
        if (o) return o;
        var n = cc.resources.get(i, cc.BufferAsset);
        if (!n) throw "Resource '" + i + "' not ready";
        if (!n._buffer) throw "Missing asset data.";
        return (o = new e())._bundle = cc.resources, o.loadPackage(new t.ByteBuffer(n._buffer), i), e._instById[o.id] = o, e._instByName[o.name] = o, e._instById[o._path] = o, o;
      }, e.loadPackage = function () {
        for (var i, n, r, s, h = [], a = 0; a < arguments.length; a++) h[a] = arguments[a];
        h[0] instanceof cc.AssetManager.Bundle ? (s = h[0], i = h[1], h.length > 3 ? (n = h[2], r = h[3]) : r = h[2]) : (i = h[0], h.length > 2 ? (n = h[1], r = h[2]) : r = h[1]), (s = s || cc.resources).load(i, cc.BufferAsset, n, function (h, a) {
          if (h) null != r && r(h, null);else {
            var l = new e();
            l._bundle = s, l.loadPackage(new t.ByteBuffer(a._buffer), i);
            for (var c = l._items.length, u = [], _ = [], p = 0; p < c; p++) {
              var d = l._items[p];
              if (d.type == t.PackageItemType.Atlas || d.type == t.PackageItemType.Sound) {
                var f = o[d.type];
                u.push(d.file), _.push(f);
              }
            }
            var g,
              y = u.length,
              m = function m(t) {
                t && (g = t), --y <= 0 && (e._instById[l.id] = l, e._instByName[l.name] = l, l._path && (e._instById[l._path] = l), null != r && r(g, l));
              };
            y > 0 ? u.forEach(function (t, e) {
              s.load(t, _[e], n, m);
            }) : m();
          }
        });
      }, e.removePackage = function (t) {
        var i = e._instById[t];
        if (i || (i = e._instByName[t]), !i) throw "No package found: " + t;
        i.dispose(), delete e._instById[i.id], delete e._instByName[i.name], i._path && delete e._instById[i._path];
      }, e.createObject = function (t, i, o) {
        var n = e.getByName(t);
        return n ? n.createObject(i, o) : null;
      }, e.createObjectFromURL = function (t, i) {
        var o = e.getItemByURL(t);
        return o ? o.owner.internalCreateObject(o, i) : null;
      }, e.getItemURL = function (t, i) {
        var o = e.getByName(t);
        if (!o) return null;
        var n = o._itemsByName[i];
        return n ? "ui://" + o.id + n.id : null;
      }, e.getItemByURL = function (t) {
        var i = t.indexOf("//");
        if (-1 == i) return null;
        var o = t.indexOf("/", i + 2);
        if (-1 == o) {
          if (t.length > 13) {
            var n = t.substr(5, 8),
              r = e.getById(n);
            if (null != r) {
              var s = t.substr(13);
              return r.getItemById(s);
            }
          }
        } else {
          var h = t.substr(i + 2, o - i - 2);
          if (null != (r = e.getByName(h))) {
            var a = t.substr(o + 1);
            return r.getItemByName(a);
          }
        }
        return null;
      }, e.normalizeURL = function (t) {
        if (null == t) return null;
        var i = t.indexOf("//");
        if (-1 == i) return null;
        var o = t.indexOf("/", i + 2);
        if (-1 == o) return t;
        var n = t.substr(i + 2, o - i - 2),
          r = t.substr(o + 1);
        return e.getItemURL(n, r);
      }, e.setStringsSource = function (e) {
        t.TranslationHelper.loadFromXML(e);
      }, e.prototype.loadPackage = function (i, o) {
        if (1179080009 != i.readUint()) throw "FairyGUI: old package format found in '" + o + "'";
        this._path = o, i.version = i.readInt();
        var n = i.version >= 2;
        i.readBool(), this._id = i.readString(), this._name = i.readString(), i.skip(20);
        var r,
          s,
          h,
          a,
          l,
          c = i.position;
        i.seek(c, 4), r = i.readInt();
        var u,
          _ = new Array(r);
        for (i.stringTable = _, s = 0; s < r; s++) _[s] = i.readString();
        if (i.seek(c, 5)) for (r = i.readInt(), s = 0; s < r; s++) {
          var p = i.readUshort(),
            d = i.readInt();
          _[p] = i.readString(d);
        }
        for (i.seek(c, 0), r = i.readShort(), s = 0; s < r; s++) this._dependencies.push({
          id: i.readS(),
          name: i.readS()
        });
        n && ((r = i.readShort()) > 0 && (this._branches = i.readSArray(r), e._branch && (this._branchIndex = this._branches.indexOf(e._branch))), l = r > 0), i.seek(c, 1);
        var f = o.lastIndexOf("/"),
          g = -1 == f ? "" : o.substr(0, f + 1);
        for (o += "_", r = i.readShort(), s = 0; s < r; s++) {
          switch (h = i.readInt(), h += i.position, (u = new t.PackageItem()).owner = this, u.type = i.readByte(), u.id = i.readS(), u.name = i.readS(), i.readS(), u.file = i.readS(), i.readBool(), u.width = i.readInt(), u.height = i.readInt(), u.type) {
            case t.PackageItemType.Image:
              u.objectType = t.ObjectType.Image;
              var y = i.readByte();
              1 == y ? (u.scale9Grid = new cc.Rect(), u.scale9Grid.x = i.readInt(), u.scale9Grid.y = i.readInt(), u.scale9Grid.width = i.readInt(), u.scale9Grid.height = i.readInt(), u.tileGridIndice = i.readInt()) : 2 == y && (u.scaleByTile = !0), u.smoothing = i.readBool();
              break;
            case t.PackageItemType.MovieClip:
              u.smoothing = i.readBool(), u.objectType = t.ObjectType.MovieClip, u.rawData = i.readBuffer();
              break;
            case t.PackageItemType.Font:
              u.rawData = i.readBuffer();
              break;
            case t.PackageItemType.Component:
              var m = i.readByte();
              u.objectType = m > 0 ? m : t.ObjectType.Component, u.rawData = i.readBuffer(), t.UIObjectFactory.resolveExtension(u);
              break;
            case t.PackageItemType.Atlas:
            case t.PackageItemType.Sound:
            case t.PackageItemType.Misc:
              u.file = o + cc.path.mainFileName(u.file);
              break;
            case t.PackageItemType.Spine:
            case t.PackageItemType.DragonBones:
              u.file = g + cc.path.mainFileName(u.file), u.skeletonAnchor = new cc.Vec2(), u.skeletonAnchor.x = i.readFloat(), u.skeletonAnchor.y = i.readFloat();
          }
          if (n) {
            (a = i.readS()) && (u.name = a + "/" + u.name);
            var b = i.readUbyte();
            b > 0 && (l ? u.branches = i.readSArray(b) : this._itemsById[i.readS()] = u);
            var v = i.readUbyte();
            v > 0 && (u.highResolution = i.readSArray(v));
          }
          this._items.push(u), this._itemsById[u.id] = u, null != u.name && (this._itemsByName[u.name] = u), i.position = h;
        }
        for (i.seek(c, 2), r = i.readShort(), s = 0; s < r; s++) {
          h = i.readShort(), h += i.position;
          var C = i.readS();
          u = this._itemsById[i.readS()];
          var w = new cc.Rect();
          w.x = i.readInt(), w.y = i.readInt(), w.width = i.readInt(), w.height = i.readInt();
          var S = {
            atlas: u,
            rect: w,
            offset: new cc.Vec2(),
            originalSize: new cc.Size(0, 0)
          };
          S.rotated = i.readBool(), n && i.readBool() ? (S.offset.x = i.readInt(), S.offset.y = i.readInt(), S.originalSize.width = i.readInt(), S.originalSize.height = i.readInt()) : (S.originalSize.width = S.rect.width, S.originalSize.height = S.rect.height), this._sprites[C] = S, i.position = h;
        }
        if (i.seek(c, 3)) for (r = i.readShort(), s = 0; s < r; s++) h = i.readInt(), h += i.position, (u = this._itemsById[i.readS()]) && u.type == t.PackageItemType.Image && (u.hitTestData = new t.PixelHitTestData(i)), i.position = h;
      }, e.prototype.dispose = function () {
        for (var t = this._items.length, e = 0; e < t; e++) {
          var i = this._items[e];
          i.asset && cc.assetManager.releaseAsset(i.asset);
        }
      }, Object.defineProperty(e.prototype, "id", {
        get: function get() {
          return this._id;
        },
        enumerable: !1,
        configurable: !0
      }), Object.defineProperty(e.prototype, "name", {
        get: function get() {
          return this._name;
        },
        enumerable: !1,
        configurable: !0
      }), Object.defineProperty(e.prototype, "path", {
        get: function get() {
          return this._path;
        },
        enumerable: !1,
        configurable: !0
      }), Object.defineProperty(e.prototype, "dependencies", {
        get: function get() {
          return this._dependencies;
        },
        enumerable: !1,
        configurable: !0
      }), e.prototype.createObject = function (t, e) {
        var i = this._itemsByName[t];
        return i ? this.internalCreateObject(i, e) : null;
      }, e.prototype.internalCreateObject = function (i, o) {
        var n = t.UIObjectFactory.newObject(i, o);
        return null == n ? null : (e._constructing++, n.constructFromResource(), e._constructing--, n);
      }, e.prototype.getItemById = function (t) {
        return this._itemsById[t];
      }, e.prototype.getItemByName = function (t) {
        return this._itemsByName[t];
      }, e.prototype.getItemAssetByName = function (t) {
        var e = this._itemsByName[t];
        if (null == e) throw "Resource not found -" + t;
        return this.getItemAsset(e);
      }, e.prototype.getItemAsset = function (e) {
        switch (e.type) {
          case t.PackageItemType.Image:
            if (!e.decoded) {
              e.decoded = !0;
              var i = this._sprites[e.id];
              if (i) {
                var n = this.getItemAsset(i.atlas);
                if (n) {
                  var r = new cc.SpriteFrame(n, i.rect, i.rotated, new cc.Vec2(i.offset.x - (i.originalSize.width - i.rect.width) / 2, -(i.offset.y - (i.originalSize.height - i.rect.height) / 2)), i.originalSize);
                  e.scale9Grid && (r.insetLeft = e.scale9Grid.x, r.insetTop = e.scale9Grid.y, r.insetRight = e.width - e.scale9Grid.xMax, r.insetBottom = e.height - e.scale9Grid.yMax), e.asset = r;
                }
              }
            }
            break;
          case t.PackageItemType.Atlas:
          case t.PackageItemType.Sound:
            e.decoded || (e.decoded = !0, e.asset = this._bundle.get(e.file, o[e.type]), e.asset || console.log("Resource '" + e.file + "' not found"));
            break;
          case t.PackageItemType.Font:
            e.decoded || (e.decoded = !0, this.loadFont(e));
            break;
          case t.PackageItemType.MovieClip:
            e.decoded || (e.decoded = !0, this.loadMovieClip(e));
        }
        return e.asset;
      }, e.prototype.getItemAssetAsync = function (e, i) {
        if (e.decoded) i(null, e);else if (e.loading) e.loading.push(i);else switch (e.type) {
          case t.PackageItemType.Spine:
            e.loading = [i], this.loadSpine(e);
            break;
          case t.PackageItemType.DragonBones:
            e.loading = [i], this.loadDragonBones(e);
            break;
          default:
            this.getItemAsset(e), i(null, e);
        }
      }, e.prototype.loadAllAssets = function () {
        for (var t = this._items.length, e = 0; e < t; e++) {
          var i = this._items[e];
          this.getItemAsset(i);
        }
      }, e.prototype.loadMovieClip = function (t) {
        var e = t.rawData;
        e.seek(0, 0), t.interval = e.readInt() / 1e3, t.swing = e.readBool(), t.repeatDelay = e.readInt() / 1e3, e.seek(0, 1);
        var i,
          o,
          n = e.readShort();
        t.frames = Array(n);
        for (var r = 0; r < n; r++) {
          var s = e.readShort();
          s += e.position;
          var h = new cc.Rect();
          h.x = e.readInt(), h.y = e.readInt(), h.width = e.readInt(), h.height = e.readInt();
          var a = {
            rect: h,
            addDelay: e.readInt() / 1e3
          };
          if (null != (i = e.readS()) && null != (o = this._sprites[i])) {
            var l = this.getItemAsset(o.atlas);
            l && (t.width, a.rect.width, a.texture = new cc.SpriteFrame(l, o.rect, o.rotated, new cc.Vec2(a.rect.x - (t.width - a.rect.width) / 2, -(a.rect.y - (t.height - a.rect.height) / 2)), new cc.Size(t.width, t.height)));
          }
          t.frames[r] = a, e.position = s;
        }
      }, e.prototype.loadFont = function (t) {
        var e = new cc.LabelAtlas();
        t.asset = e, e._fntConfig = {
          commonHeight: 0,
          fontSize: 0,
          kerningDict: {},
          fontDefDictionary: {}
        };
        var i = e._fntConfig.fontDefDictionary,
          o = t.rawData;
        o.seek(0, 0);
        var n = o.readBool(),
          r = o.readBool(),
          s = o.readBool();
        o.readBool();
        var h,
          a,
          l = o.readInt(),
          c = o.readInt(),
          u = o.readInt(),
          _ = this._sprites[t.id];
        _ && (h = this.getItemAsset(_.atlas)), o.seek(0, 1);
        for (var p = o.readInt(), d = 0; d < p; d++) {
          var f = o.readShort();
          f += o.position, a = {}, i[o.readUshort()] = a;
          var g = new cc.Rect();
          a.rect = g;
          var y = o.readS();
          if (g.x = o.readInt(), g.y = o.readInt(), a.xOffset = o.readInt(), a.yOffset = o.readInt(), g.width = o.readInt(), g.height = o.readInt(), a.xAdvance = o.readInt(), a.channel = o.readByte(), 1 == a.channel ? a.channel = 3 : 2 == a.channel ? a.channel = 2 : 3 == a.channel && (a.channel = 1), n) g.x += _.rect.x, g.y += _.rect.y;else {
            var m = this._sprites[y];
            m && (g.set(m.rect), a.xOffset += m.offset.x, a.yOffset += m.offset.y, 0 == l && (l = m.originalSize.height), h || (m.atlas.load(), h = m.atlas.asset)), 0 == a.xAdvance && (a.xAdvance = 0 == c ? a.xOffset + a.rect.width : c);
          }
          o.position = f;
        }
        e.fontSize = l, e._fntConfig.fontSize = l, e._fntConfig.commonHeight = 0 == u ? l : u, e._fntConfig.resizable = s, e._fntConfig.canTint = r;
        var b = new cc.SpriteFrame();
        b.setTexture(h), e.spriteFrame = b, e.onLoad();
      }, e.prototype.loadSpine = function (t) {
        this._bundle.load(t.file, sp.SkeletonData, function (e, i) {
          t.decoded = !0, t.asset = i;
          var o = t.loading;
          delete t.loading, o.forEach(function (i) {
            return i(e, t);
          });
        });
      }, e.prototype.loadDragonBones = function (t) {
        var e = this;
        this._bundle.load(t.file, dragonBones.DragonBonesAsset, function (i, o) {
          if (i) {
            t.decoded = !0;
            var n = t.loading;
            return delete t.loading, void n.forEach(function (e) {
              return e(i, t);
            });
          }
          t.asset = o;
          var r = t.file.replace("_ske", "_tex"),
            s = r.lastIndexOf(".");
          -1 != s && (r = r.substr(0, s + 1) + "json"), e._bundle.load(r, dragonBones.DragonBonesAtlasAsset, function (e, i) {
            t.decoded = !0, t.atlasAsset = i;
            var o = t.loading;
            delete t.loading, o.forEach(function (i) {
              return i(e, t);
            });
          });
        });
      }, e._constructing = 0, e._instById = {}, e._instByName = {}, e._branch = "", e._vars = {}, e;
    }();
  t.UIPackage = i;
  var o = ((e = {})[t.PackageItemType.Atlas] = cc.Texture2D, e[t.PackageItemType.Sound] = cc.AudioClip, e);
}(fgui || (fgui = {})), function (t) {
  var e = function (e) {
    function i() {
      var i = e.call(this) || this;
      return i._requestingCmd = 0, i._uiSources = new Array(), i.bringToFontOnClick = t.UIConfig.bringWindowToFrontOnClick, i._node.on(t.Event.TOUCH_BEGIN, i.onTouchBegin_1, i, !0), i;
    }
    return __extends(i, e), i.prototype.addUISource = function (t) {
      this._uiSources.push(t);
    }, Object.defineProperty(i.prototype, "contentPane", {
      get: function get() {
        return this._contentPane;
      },
      set: function set(e) {
        this._contentPane != e && (this._contentPane && this.removeChild(this._contentPane), this._contentPane = e, this._contentPane && (this.addChild(this._contentPane), this.setSize(this._contentPane.width, this._contentPane.height), this._contentPane.addRelation(this, t.RelationType.Size), this._frame = this._contentPane.getChild("frame"), this._frame && (this.closeButton = this._frame.getChild("closeButton"), this.dragArea = this._frame.getChild("dragArea"), this.contentArea = this._frame.getChild("contentArea"))));
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "frame", {
      get: function get() {
        return this._frame;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "closeButton", {
      get: function get() {
        return this._closeButton;
      },
      set: function set(t) {
        this._closeButton && this._closeButton.offClick(this.closeEventHandler, this), this._closeButton = t, this._closeButton && this._closeButton.onClick(this.closeEventHandler, this);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "dragArea", {
      get: function get() {
        return this._dragArea;
      },
      set: function set(e) {
        this._dragArea != e && (this._dragArea && (this._dragArea.draggable = !1, this._dragArea.off(t.Event.DRAG_START, this.onDragStart_1, this)), this._dragArea = e, this._dragArea && (this._dragArea.draggable = !0, this._dragArea.on(t.Event.DRAG_START, this.onDragStart_1, this)));
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "contentArea", {
      get: function get() {
        return this._contentArea;
      },
      set: function set(t) {
        this._contentArea = t;
      },
      enumerable: !1,
      configurable: !0
    }), i.prototype.show = function () {
      t.GRoot.inst.showWindow(this);
    }, i.prototype.showOn = function (t) {
      t.showWindow(this);
    }, i.prototype.hide = function () {
      this.isShowing && this.doHideAnimation();
    }, i.prototype.hideImmediately = function () {
      var e = this.parent instanceof t.GRoot ? this.parent : null;
      e || (e = t.GRoot.inst), e.hideWindowImmediately(this);
    }, i.prototype.centerOn = function (e, i) {
      this.setPosition(Math.round((e.width - this.width) / 2), Math.round((e.height - this.height) / 2)), i && (this.addRelation(e, t.RelationType.Center_Center), this.addRelation(e, t.RelationType.Middle_Middle));
    }, i.prototype.toggleStatus = function () {
      this.isTop ? this.hide() : this.show();
    }, Object.defineProperty(i.prototype, "isShowing", {
      get: function get() {
        return null != this.parent;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "isTop", {
      get: function get() {
        return this.parent && this.parent.getChildIndex(this) == this.parent.numChildren - 1;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "modal", {
      get: function get() {
        return this._modal;
      },
      set: function set(t) {
        this._modal = t;
      },
      enumerable: !1,
      configurable: !0
    }), i.prototype.bringToFront = function () {
      this.root.bringToFront(this);
    }, i.prototype.showModalWait = function (e) {
      null != e && (this._requestingCmd = e), t.UIConfig.windowModalWaiting && (this._modalWaitPane || (this._modalWaitPane = t.UIPackage.createObjectFromURL(t.UIConfig.windowModalWaiting)), this.layoutModalWaitPane(), this.addChild(this._modalWaitPane));
    }, i.prototype.layoutModalWaitPane = function () {
      if (this._contentArea) {
        var t = this._frame.localToGlobal();
        t = this.globalToLocal(t.x, t.y, t), this._modalWaitPane.setPosition(t.x + this._contentArea.x, t.y + this._contentArea.y), this._modalWaitPane.setSize(this._contentArea.width, this._contentArea.height);
      } else this._modalWaitPane.setSize(this.width, this.height);
    }, i.prototype.closeModalWait = function (t) {
      return (null == t || this._requestingCmd == t) && (this._requestingCmd = 0, this._modalWaitPane && this._modalWaitPane.parent && this.removeChild(this._modalWaitPane), !0);
    }, Object.defineProperty(i.prototype, "modalWaiting", {
      get: function get() {
        return this._modalWaitPane && null != this._modalWaitPane.parent;
      },
      enumerable: !1,
      configurable: !0
    }), i.prototype.init = function () {
      if (!this._inited && !this._loading) if (this._uiSources.length > 0) {
        this._loading = !1;
        for (var t = this._uiSources.length, e = 0; e < t; e++) {
          var i = this._uiSources[e];
          i.loaded || (i.load(this.__uiLoadComplete, this), this._loading = !0);
        }
        this._loading || this._init();
      } else this._init();
    }, i.prototype.onInit = function () {}, i.prototype.onShown = function () {}, i.prototype.onHide = function () {}, i.prototype.doShowAnimation = function () {
      this.onShown();
    }, i.prototype.doHideAnimation = function () {
      this.hideImmediately();
    }, i.prototype.__uiLoadComplete = function () {
      for (var t = this._uiSources.length, e = 0; e < t; e++) if (!this._uiSources[e].loaded) return;
      this._loading = !1, this._init();
    }, i.prototype._init = function () {
      this._inited = !0, this.onInit(), this.isShowing && this.doShowAnimation();
    }, i.prototype.dispose = function () {
      this.parent && this.hideImmediately(), e.prototype.dispose.call(this);
    }, i.prototype.closeEventHandler = function () {
      this.hide();
    }, i.prototype.onEnable = function () {
      e.prototype.onEnable.call(this), this._inited ? this.doShowAnimation() : this.init();
    }, i.prototype.onDisable = function () {
      e.prototype.onDisable.call(this), this.closeModalWait(), this.onHide();
    }, i.prototype.onTouchBegin_1 = function () {
      this.isShowing && this.bringToFontOnClick && this.bringToFront();
    }, i.prototype.onDragStart_1 = function (e) {
      t.GObject.cast(e.currentTarget).stopDrag(), this.startDrag(e.touchId);
    }, i;
  }(t.GComponent);
  t.Window = e;
}(fgui || (fgui = {})), function (t) {
  var e = function () {
    function e() {}
    return e.createAction = function (e) {
      switch (e) {
        case 0:
          return new t.PlayTransitionAction();
        case 1:
          return new t.ChangePageAction();
      }
      return null;
    }, e.prototype.run = function (t, e, i) {
      null != this.fromPage && 0 != this.fromPage.length && -1 == this.fromPage.indexOf(e) || null != this.toPage && 0 != this.toPage.length && -1 == this.toPage.indexOf(i) ? this.leave(t) : this.enter(t);
    }, e.prototype.enter = function () {}, e.prototype.leave = function () {}, e.prototype.setup = function (t) {
      var e, i;
      for (e = t.readShort(), this.fromPage = [], i = 0; i < e; i++) this.fromPage[i] = t.readS();
      for (e = t.readShort(), this.toPage = [], i = 0; i < e; i++) this.toPage[i] = t.readS();
    }, e;
  }();
  t.ControllerAction = e;
}(fgui || (fgui = {})), function (t) {
  var e = function (e) {
    function i() {
      return e.call(this) || this;
    }
    return __extends(i, e), i.prototype.enter = function (e) {
      if (this.controllerName) {
        var i;
        if (this.objectId) {
          var o = e.parent.getChildById(this.objectId);
          if (!(o instanceof t.GComponent)) return;
          i = o;
        } else i = e.parent;
        if (i) {
          var n = i.getController(this.controllerName);
          n && n != e && !n.changing && ("~1" == this.targetPage ? e.selectedIndex < n.pageCount && (n.selectedIndex = e.selectedIndex) : "~2" == this.targetPage ? n.selectedPage = e.selectedPage : n.selectedPageId = this.targetPage);
        }
      }
    }, i.prototype.setup = function (t) {
      e.prototype.setup.call(this, t), this.objectId = t.readS(), this.controllerName = t.readS(), this.targetPage = t.readS();
    }, i;
  }(t.ControllerAction);
  t.ChangePageAction = e;
}(fgui || (fgui = {})), function (t) {
  var e = function (t) {
    function e() {
      var e = t.call(this) || this;
      return e.playTimes = 1, e.delay = 0, e.stopOnExit = !1, e;
    }
    return __extends(e, t), e.prototype.enter = function (t) {
      var e = t.parent.getTransition(this.transitionName);
      e && (this._currentTransition && this._currentTransition.playing ? e.changePlayTimes(this.playTimes) : e.play(null, this.playTimes, this.delay), this._currentTransition = e);
    }, e.prototype.leave = function () {
      this.stopOnExit && this._currentTransition && (this._currentTransition.stop(), this._currentTransition = null);
    }, e.prototype.setup = function (e) {
      t.prototype.setup.call(this, e), this.transitionName = e.readS(), this.playTimes = e.readInt(), this.delay = e.readFloat(), this.stopOnExit = e.readBool();
    }, e;
  }(t.ControllerAction);
  t.PlayTransitionAction = e;
}(fgui || (fgui = {})), function (t) {
  (function (t) {
    t[t.Normal = 0] = "Normal", t[t.None = 1] = "None", t[t.Add = 2] = "Add", t[t.Multiply = 3] = "Multiply", t[t.Screen = 4] = "Screen", t[t.Erase = 5] = "Erase", t[t.Mask = 6] = "Mask", t[t.Below = 7] = "Below", t[t.Off = 8] = "Off", t[t.Custom1 = 9] = "Custom1", t[t.Custom2 = 10] = "Custom2", t[t.Custom3 = 11] = "Custom3";
  })(t.BlendMode || (t.BlendMode = {}));
  var e = function () {
    function t() {}
    return t.apply = function (t, e) {
      var o = i[e];
      t.getComponentsInChildren(cc.RenderComponent).forEach(function (t) {
        t.srcBlendFactor = o[0], t.dstBlendFactor = o[1];
      });
    }, t.override = function (t, e, o) {
      i[t][0] = e, i[t][1] = o;
    }, t;
  }();
  t.BlendModeUtils = e;
  var i = [[cc.macro.SRC_ALPHA, cc.macro.ONE_MINUS_SRC_ALPHA], [cc.macro.ONE, cc.macro.ONE], [cc.macro.SRC_ALPHA, cc.macro.ONE], [cc.macro.DST_COLOR, cc.macro.ONE_MINUS_SRC_ALPHA], [cc.macro.ONE, cc.macro.ONE_MINUS_SRC_COLOR], [cc.macro.ZERO, cc.macro.ONE_MINUS_SRC_ALPHA], [cc.macro.ZERO, cc.macro.SRC_ALPHA], [cc.macro.ONE_MINUS_DST_ALPHA, cc.macro.DST_ALPHA], [cc.macro.ONE, cc.macro.ZERO], [cc.macro.SRC_ALPHA, cc.macro.ONE_MINUS_SRC_ALPHA], [cc.macro.SRC_ALPHA, cc.macro.ONE_MINUS_SRC_ALPHA], [cc.macro.SRC_ALPHA, cc.macro.ONE_MINUS_SRC_ALPHA]];
}(fgui || (fgui = {})), function (t) {
  var e = function (e) {
    function i() {
      var i = e.call(this) || this;
      return i._flip = t.FlipType.None, i._fillMethod = t.FillMethod.None, i._fillOrigin = t.FillOrigin.Left, i._fillAmount = 0, i;
    }
    return __extends(i, e), Object.defineProperty(i.prototype, "flip", {
      get: function get() {
        return this._flip;
      },
      set: function set(e) {
        if (this._flip != e) {
          this._flip = e;
          var i = 1,
            o = 1;
          this._flip != t.FlipType.Horizontal && this._flip != t.FlipType.Both || (i = -1), this._flip != t.FlipType.Vertical && this._flip != t.FlipType.Both || (o = -1), 1 == i && 1 == o || this.node.setAnchorPoint(.5, .5), this.node.setScale(i, o);
        }
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "fillMethod", {
      get: function get() {
        return this._fillMethod;
      },
      set: function set(t) {
        this._fillMethod != t && (this._fillMethod = t, 0 != this._fillMethod ? (this.type = cc.Sprite.Type.FILLED, this._fillMethod <= 3 ? this.fillType = this._fillMethod - 1 : this.fillType = cc.Sprite.FillType.RADIAL, this.fillCenter = new cc.Vec2(.5, .5), this.setupFill()) : this.type = cc.Sprite.Type.SIMPLE);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "fillOrigin", {
      get: function get() {
        return this._fillOrigin;
      },
      set: function set(t) {
        this._fillOrigin != t && (this._fillOrigin = t, 0 != this._fillMethod && this.setupFill());
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "fillClockwise", {
      get: function get() {
        return this._fillClockwise;
      },
      set: function set(t) {
        this._fillClockwise != t && (this._fillClockwise = t, 0 != this._fillMethod && this.setupFill());
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "fillAmount", {
      get: function get() {
        return this._fillAmount;
      },
      set: function set(t) {
        this._fillAmount != t && (this._fillAmount = t, 0 != this._fillMethod && (this._fillClockwise ? this.fillRange = -this._fillAmount : this.fillRange = this._fillAmount));
      },
      enumerable: !1,
      configurable: !0
    }), i.prototype.setupFill = function () {
      if (this._fillMethod == t.FillMethod.Horizontal) this._fillClockwise = this._fillOrigin == t.FillOrigin.Right || this._fillOrigin == t.FillOrigin.Bottom, this.fillStart = this._fillClockwise ? 1 : 0;else if (this._fillMethod == t.FillMethod.Vertical) this._fillClockwise = this._fillOrigin == t.FillOrigin.Left || this._fillOrigin == t.FillOrigin.Top, this.fillStart = this._fillClockwise ? 1 : 0;else switch (this._fillOrigin) {
        case t.FillOrigin.Right:
          this.fillOrigin = 0;
          break;
        case t.FillOrigin.Top:
          this.fillStart = .25;
          break;
        case t.FillOrigin.Left:
          this.fillStart = .5;
          break;
        case t.FillOrigin.Bottom:
          this.fillStart = .75;
      }
    }, Object.defineProperty(i.prototype, "grayed", {
      get: function get() {
        return this._grayed;
      },
      set: function set(t) {
        var e;
        this._grayed != t && (this._grayed = t, t ? ((e = this._graySpriteMaterial) || (e = cc.Material.getBuiltinMaterial("2d-gray-sprite")), e = this._graySpriteMaterial = cc.MaterialVariant.create(e, this)) : ((e = this._spriteMaterial) || (e = cc.Material.getBuiltinMaterial("2d-sprite", this)), e = this._spriteMaterial = cc.MaterialVariant.create(e, this)), this.setMaterial(0, e));
      },
      enumerable: !1,
      configurable: !0
    }), i;
  }(cc.Sprite);
  t.Image = e;
}(fgui || (fgui = {})), function (t) {
  var e = function (t) {
    function e() {
      var e = t.call(this) || this;
      return e.interval = 0, e.repeatDelay = 0, e.timeScale = 1, e._playing = !0, e._frameCount = 0, e._frame = 0, e._start = 0, e._end = 0, e._times = 0, e._endAt = 0, e._status = 0, e._smoothing = !0, e._frameElapsed = 0, e._reversed = !1, e._repeatedCount = 0, e;
    }
    return __extends(e, t), Object.defineProperty(e.prototype, "frames", {
      get: function get() {
        return this._frames;
      },
      set: function set(t) {
        this._frames = t, this._frames ? (this._frameCount = this._frames.length, (-1 == this._end || this._end > this._frameCount - 1) && (this._end = this._frameCount - 1), (-1 == this._endAt || this._endAt > this._frameCount - 1) && (this._endAt = this._frameCount - 1), (this._frame < 0 || this._frame > this._frameCount - 1) && (this._frame = this._frameCount - 1), this.type = cc.Sprite.Type.SIMPLE, this.drawFrame(), this._frameElapsed = 0, this._repeatedCount = 0, this._reversed = !1) : this._frameCount = 0;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "frameCount", {
      get: function get() {
        return this._frameCount;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "frame", {
      get: function get() {
        return this._frame;
      },
      set: function set(t) {
        this._frame != t && (this._frames && t >= this._frameCount && (t = this._frameCount - 1), this._frame = t, this._frameElapsed = 0, this.drawFrame());
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "playing", {
      get: function get() {
        return this._playing;
      },
      set: function set(t) {
        this._playing != t && (this._playing = t);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "smoothing", {
      get: function get() {
        return this._smoothing;
      },
      set: function set(t) {
        this._smoothing = t;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.rewind = function () {
      this._frame = 0, this._frameElapsed = 0, this._reversed = !1, this._repeatedCount = 0, this.drawFrame();
    }, e.prototype.syncStatus = function (t) {
      this._frame = t._frame, this._frameElapsed = t._frameElapsed, this._reversed = t._reversed, this._repeatedCount = t._repeatedCount, this.drawFrame();
    }, e.prototype.advance = function (t) {
      for (var e = this._frame, i = this._reversed, o = t;;) {
        var n = this.interval + this._frames[this._frame].addDelay;
        if (0 == this._frame && this._repeatedCount > 0 && (n += this.repeatDelay), t < n) {
          this._frameElapsed = 0;
          break;
        }
        if (t -= n, this.swing ? this._reversed ? (this._frame--, this._frame <= 0 && (this._frame = 0, this._repeatedCount++, this._reversed = !this._reversed)) : (this._frame++, this._frame > this._frameCount - 1 && (this._frame = Math.max(0, this._frameCount - 2), this._repeatedCount++, this._reversed = !this._reversed)) : (this._frame++, this._frame > this._frameCount - 1 && (this._frame = 0, this._repeatedCount++)), this._frame == e && this._reversed == i) {
          var r = o - t;
          t -= Math.floor(t / r) * r;
        }
      }
      this.drawFrame();
    }, e.prototype.setPlaySettings = function (t, e, i, o, n, r) {
      null == t && (t = 0), null == e && (e = -1), null == i && (i = 0), null == o && (o = -1), this._start = t, this._end = e, (-1 == this._end || this._end > this._frameCount - 1) && (this._end = this._frameCount - 1), this._times = i, this._endAt = o, -1 == this._endAt && (this._endAt = this._end), this._status = 0, this._callback = n, this._callbackObj = r, this.frame = t;
    }, e.prototype.update = function (t) {
      if (this._playing && 0 != this._frameCount && 3 != this._status) {
        1 != this.timeScale && (t *= this.timeScale), this._frameElapsed += t;
        var e = this.interval + this._frames[this._frame].addDelay;
        if (0 == this._frame && this._repeatedCount > 0 && (e += this.repeatDelay), !(this._frameElapsed < e)) {
          if (this._frameElapsed -= e, this._frameElapsed > this.interval && (this._frameElapsed = this.interval), this.swing ? this._reversed ? (this._frame--, this._frame <= 0 && (this._frame = 0, this._repeatedCount++, this._reversed = !this._reversed)) : (this._frame++, this._frame > this._frameCount - 1 && (this._frame = Math.max(0, this._frameCount - 2), this._repeatedCount++, this._reversed = !this._reversed)) : (this._frame++, this._frame > this._frameCount - 1 && (this._frame = 0, this._repeatedCount++)), 1 == this._status) this._frame = this._start, this._frameElapsed = 0, this._status = 0;else if (2 == this._status) {
            if (this._frame = this._endAt, this._frameElapsed = 0, this._status = 3, null != this._callback) {
              var i = this._callback,
                o = this._callbackObj;
              this._callback = null, this._callbackObj = null, i.call(o);
            }
          } else this._frame == this._end && (this._times > 0 ? (this._times--, 0 == this._times ? this._status = 2 : this._status = 1) : 0 != this._start && (this._status = 1));
          this.drawFrame();
        }
      }
    }, e.prototype.drawFrame = function () {
      if (this._frameCount > 0 && this._frame < this._frames.length) {
        var t = this._frames[this._frame];
        this.spriteFrame = t.texture;
      }
    }, e;
  }(t.Image);
  t.MovieClip = e;
}(fgui || (fgui = {})), function (t) {
  var e = function (e) {
    function o(t, i) {
      var o = e.call(this, t, i) || this;
      return o.pos = new cc.Vec2(), o.touchId = 0, o.clickCount = 0, o.button = 0, o.keyModifiers = 0, o.mouseWheelDelta = 0, o;
    }
    return __extends(o, e), Object.defineProperty(o.prototype, "isShiftDown", {
      get: function get() {
        return !1;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(o.prototype, "isCtrlDown", {
      get: function get() {
        return !1;
      },
      enumerable: !1,
      configurable: !0
    }), o.prototype.captureTouch = function () {
      var e = t.GObject.cast(this.currentTarget);
      e && this._processor.addTouchMonitor(this.touchId, e);
    }, o._borrow = function (t, e) {
      var n;
      return i.length ? ((n = i.pop()).type = t, n.bubbles = e) : n = new o(t, e), n;
    }, o._return = function (t) {
      t.initiator = null, t.touch = null, t.unuse(), i.push(t);
    }, o.TOUCH_BEGIN = "fui_touch_begin", o.TOUCH_MOVE = "fui_touch_move", o.TOUCH_END = "fui_touch_end", o.CLICK = "fui_click", o.ROLL_OVER = "fui_roll_over", o.ROLL_OUT = "fui_roll_out", o.MOUSE_WHEEL = "fui_mouse_wheel", o.DISPLAY = "fui_display", o.UNDISPLAY = "fui_undisplay", o.GEAR_STOP = "fui_gear_stop", o.LINK = "fui_text_link", o.Submit = "editing-return", o.TEXT_CHANGE = "text-changed", o.STATUS_CHANGED = "fui_status_changed", o.XY_CHANGED = "fui_xy_changed", o.SIZE_CHANGED = "fui_size_changed", o.SIZE_DELAY_CHANGE = "fui_size_delay_change", o.DRAG_START = "fui_drag_start", o.DRAG_MOVE = "fui_drag_move", o.DRAG_END = "fui_drag_end", o.DROP = "fui_drop", o.SCROLL = "fui_scroll", o.SCROLL_END = "fui_scroll_end", o.PULL_DOWN_RELEASE = "fui_pull_down_release", o.PULL_UP_RELEASE = "fui_pull_up_release", o.CLICK_ITEM = "fui_click_item", o;
  }(cc.Event);
  t.Event = e;
  var i = new Array();
}(fgui || (fgui = {})), function (t) {
  var e = function () {
    function t(t, e, i) {
      this._data = t, this.offsetX = null == e ? 0 : e, this.offsetY = null == i ? 0 : i, this.scaleX = 1, this.scaleY = 1;
    }
    return t.prototype.hitTest = function (t) {
      var e = Math.floor((t.x / this.scaleX - this.offsetX) * this._data.scale),
        i = Math.floor((t.y / this.scaleY - this.offsetY) * this._data.scale);
      if (e < 0 || i < 0 || e >= this._data.pixelWidth) return !1;
      var o = i * this._data.pixelWidth + e,
        n = Math.floor(o / 8),
        r = o % 8;
      return n >= 0 && n < this._data.pixels.length && 1 == (this._data.pixels[n] >> r & 1);
    }, t;
  }();
  t.PixelHitTest = e;
  t.PixelHitTestData = function (t) {
    t.readInt(), this.pixelWidth = t.readInt(), this.scale = 1 / t.readByte(), this.pixels = t.readBuffer().data;
  };
  var i = function () {
    function t(t) {
      this._child = t;
    }
    return t.prototype.hitTest = function (t, e) {
      return null != this._child.hitTest(e, !1);
    }, t;
  }();
  t.ChildHitArea = i;
}(fgui || (fgui = {})), function (t) {
  var e = function (e) {
    function o() {
      var t = e.call(this) || this;
      return t._touches = new Array(), t._rollOutChain = new Array(), t._rollOverChain = new Array(), t._touchPos = new cc.Vec2(), t;
    }
    return __extends(o, e), o.prototype.onLoad = function () {
      this._owner = this.node.$gobj;
    }, o.prototype.onEnable = function () {
      var t = this.node;
      t.on(cc.Node.EventType.TOUCH_START, this.touchBeginHandler, this), t.on(cc.Node.EventType.TOUCH_MOVE, this.touchMoveHandler, this), t.on(cc.Node.EventType.TOUCH_END, this.touchEndHandler, this), t.on(cc.Node.EventType.TOUCH_CANCEL, this.touchCancelHandler, this), t.on(cc.Node.EventType.MOUSE_DOWN, this.mouseDownHandler, this), t.on(cc.Node.EventType.MOUSE_MOVE, this.mouseMoveHandler, this), t.on(cc.Node.EventType.MOUSE_UP, this.mouseUpHandler, this), t.on(cc.Node.EventType.MOUSE_WHEEL, this.mouseWheelHandler, this), this._touchListener = this.node._touchListener;
    }, o.prototype.onDisable = function () {
      var t = this.node;
      t.off(cc.Node.EventType.TOUCH_START, this.touchBeginHandler, this), t.off(cc.Node.EventType.TOUCH_MOVE, this.touchMoveHandler, this), t.off(cc.Node.EventType.TOUCH_END, this.touchEndHandler, this), t.off(cc.Node.EventType.TOUCH_CANCEL, this.touchCancelHandler, this), t.off(cc.Node.EventType.MOUSE_DOWN, this.mouseDownHandler, this), t.off(cc.Node.EventType.MOUSE_MOVE, this.mouseMoveHandler, this), t.off(cc.Node.EventType.MOUSE_UP, this.mouseUpHandler, this), t.off(cc.Node.EventType.MOUSE_WHEEL, this.mouseWheelHandler, this), this._touchListener = null;
    }, o.prototype.getAllTouches = function (t) {
      t = t || new Array();
      for (var e = this._touches.length, i = 0; i < e; i++) {
        var o = this._touches[i];
        -1 != o.touchId && t.push(o.touchId);
      }
      return t;
    }, o.prototype.getTouchPosition = function (t) {
      void 0 === t && (t = -1);
      for (var e = this._touches.length, i = 0; i < e; i++) {
        var o = this._touches[i];
        if (-1 != o.touchId && (-1 == t || o.touchId == t)) return o.pos;
      }
      return cc.Vec2.ZERO;
    }, o.prototype.getTouchTarget = function () {
      for (var t = this._touches.length, e = 0; e < t; e++) {
        var i = this._touches[e];
        if (-1 != i.touchId) return i.target;
      }
      return null;
    }, o.prototype.addTouchMonitor = function (t, e) {
      var i = this.getInfo(t, !1);
      i && -1 == i.touchMonitors.indexOf(e) && i.touchMonitors.push(e);
    }, o.prototype.removeTouchMonitor = function (t) {
      for (var e = this._touches.length, i = 0; i < e; i++) {
        var o = this._touches[i],
          n = o.touchMonitors.indexOf(t);
        -1 != n && o.touchMonitors.splice(n, 1);
      }
    }, o.prototype.cancelClick = function (t) {
      var e = this.getInfo(t, !1);
      e && (e.clickCancelled = !0);
    }, o.prototype.simulateClick = function (e) {
      var i;
      (i = t.Event._borrow(t.Event.TOUCH_BEGIN, !0)).initiator = e, i.pos.set(e.localToGlobal()), i.touchId = 0, i.clickCount = 1, i.button = 0, i._processor = this, this._captureCallback && this._captureCallback.call(this._owner, i), e.node.dispatchEvent(i), i.unuse(), i.type = t.Event.TOUCH_END, i.bubbles = !0, e.node.dispatchEvent(i), i.unuse(), i.type = t.Event.CLICK, i.bubbles = !0, e.node.dispatchEvent(i), t.Event._return(i);
    }, o.prototype.touchBeginHandler = function (e) {
      var i = this.updateInfo(e.getID(), e.getLocation(), e);
      this._touchListener.setSwallowTouches(i.target != this._owner), this.setBegin(i);
      var o = this.getEvent(i, i.target, t.Event.TOUCH_BEGIN, !0);
      return this._captureCallback && this._captureCallback.call(this._owner, o), i.target.node.dispatchEvent(o), this.handleRollOver(i, i.target), !0;
    }, o.prototype.touchMoveHandler = function (e) {
      var i = this.updateInfo(e.getID(), e.getLocation(), e);
      if (this.handleRollOver(i, i.target), i.began) {
        for (var o = this.getEvent(i, i.target, t.Event.TOUCH_MOVE, !1), n = !1, r = i.touchMonitors.length, s = 0; s < r; s++) {
          var h = i.touchMonitors[s];
          null != h.node && h.node.activeInHierarchy && (o.unuse(), o.type = t.Event.TOUCH_MOVE, h.node.dispatchEvent(o), h == this._owner && (n = !0));
        }
        !n && this.node && (o.unuse(), o.type = t.Event.TOUCH_MOVE, this.node.dispatchEvent(o)), t.Event._return(o);
      }
    }, o.prototype.touchEndHandler = function (e) {
      var i = this.updateInfo(e.getID(), e.getLocation(), e);
      this.setEnd(i);
      for (var o = this.getEvent(i, i.target, t.Event.TOUCH_END, !1), n = i.touchMonitors.length, r = 0; r < n; r++) {
        var s = i.touchMonitors[r];
        s == i.target || null == s.node || !s.node.activeInHierarchy || s instanceof t.GComponent && s.isAncestorOf(i.target) || (o.unuse(), o.type = t.Event.TOUCH_END, s.node.dispatchEvent(o));
      }
      i.touchMonitors.length = 0, i.target && i.target.node && (i.target instanceof t.GRichTextField && i.target.node.getComponent(cc.RichText)._onTouchEnded(o), o.unuse(), o.type = t.Event.TOUCH_END, o.bubbles = !0, i.target.node.dispatchEvent(o)), t.Event._return(o), i.target = this.clickTest(i), i.target && (o = this.getEvent(i, i.target, t.Event.CLICK, !0), i.target.node.dispatchEvent(o), t.Event._return(o)), cc.sys.isMobile ? this.handleRollOver(i, null) : this.handleRollOver(i, i.target), i.target = null, i.touchId = -1, i.button = -1;
    }, o.prototype.touchCancelHandler = function (e) {
      for (var i = this.updateInfo(e.getID(), e.getLocation(), e), o = this.getEvent(i, i.target, t.Event.TOUCH_END, !1), n = i.touchMonitors.length, r = 0; r < n; r++) {
        var s = i.touchMonitors[r];
        s == i.target || null == s.node || !s.node.activeInHierarchy || s instanceof t.GComponent && s.isAncestorOf(i.target) || (o.initiator = s, s.node.dispatchEvent(o));
      }
      i.touchMonitors.length = 0, i.target && i.target.node && (o.bubbles = !0, i.target.node.dispatchEvent(o)), t.Event._return(o), this.handleRollOver(i, null), i.target = null, i.touchId = -1, i.button = -1;
    }, o.prototype.mouseDownHandler = function (t) {
      this.getInfo(0, !0).button = t.getButton();
    }, o.prototype.mouseUpHandler = function (t) {
      this.getInfo(0, !0).button = t.getButton();
    }, o.prototype.mouseMoveHandler = function (e) {
      var i = this.getInfo(0, !1);
      if (!(i && Math.abs(i.pos.x - e.getLocationX()) < 1 && Math.abs(i.pos.y - (t.GRoot.inst.height - e.getLocationY())) < 1) && (i = this.updateInfo(0, e.getLocation()), this.handleRollOver(i, i.target), i.began)) {
        for (var o = this.getEvent(i, i.target, t.Event.TOUCH_MOVE, !1), n = !1, r = i.touchMonitors.length, s = 0; s < r; s++) {
          var h = i.touchMonitors[s];
          null != h.node && h.node.activeInHierarchy && (o.initiator = h, h.node.dispatchEvent(o), h == this._owner && (n = !0));
        }
        !n && this.node && (o.initiator = this._owner, this.node.dispatchEvent(o), t.Event._return(o)), t.Event._return(o);
      }
    }, o.prototype.mouseWheelHandler = function (e) {
      var i = this.updateInfo(0, e.getLocation());
      i.mouseWheelDelta = Math.max(e.getScrollX(), e.getScrollY());
      var o = this.getEvent(i, i.target, t.Event.MOUSE_WHEEL, !0);
      i.target.node.dispatchEvent(o), t.Event._return(o);
    }, o.prototype.updateInfo = function (e, i, o) {
      var n = cc.Camera.findCamera(this.node);
      n ? n.getScreenToWorldPoint(i, this._touchPos) : this._touchPos.set(i), this._touchPos.y = t.GRoot.inst.height - this._touchPos.y;
      var r = this._owner.hitTest(this._touchPos);
      r || (r = this._owner);
      var s = this.getInfo(e);
      return s.target = r, s.pos.set(this._touchPos), s.button = cc.Event.EventMouse.BUTTON_LEFT, s.touch = o, s;
    }, o.prototype.getInfo = function (t, e) {
      void 0 === e && (e = !0);
      for (var o = null, n = this._touches.length, r = 0; r < n; r++) {
        var s = this._touches[r];
        if (s.touchId == t) return s;
        -1 == s.touchId && (o = s);
      }
      if (!o) {
        if (!e) return null;
        o = new i(), this._touches.push(o);
      }
      return o.touchId = t, o;
    }, o.prototype.setBegin = function (t) {
      t.began = !0, t.clickCancelled = !1, t.downPos.set(t.pos), t.downTargets.length = 0;
      for (var e = t.target; e;) t.downTargets.push(e), e = e.findParent();
    }, o.prototype.setEnd = function (e) {
      e.began = !1;
      var i = t.ToolSet.getTime();
      i - e.lastClickTime < .45 ? 2 == e.clickCount ? e.clickCount = 1 : e.clickCount++ : e.clickCount = 1, e.lastClickTime = i;
    }, o.prototype.clickTest = function (t) {
      if (0 == t.downTargets.length || t.clickCancelled || Math.abs(t.pos.x - t.downPos.x) > 50 || Math.abs(t.pos.y - t.downPos.y) > 50) return null;
      var e = t.downTargets[0];
      if (e && e.node && e.node.activeInHierarchy) return e;
      for (e = t.target; e && (-1 == t.downTargets.indexOf(e) || !e.node || !e.node.activeInHierarchy);) e = e.findParent();
      return e;
    }, o.prototype.handleRollOver = function (e, i) {
      if (e.lastRollOver != i) {
        for (var o = e.lastRollOver; o && o.node;) this._rollOutChain.push(o), o = o.findParent();
        for (o = i; o && o.node;) {
          if (-1 != (r = this._rollOutChain.indexOf(o))) {
            this._rollOutChain.length = r;
            break;
          }
          this._rollOverChain.push(o), o = o.findParent();
        }
        e.lastRollOver = i;
        for (var n = this._rollOutChain.length, r = 0; r < n; r++) if ((o = this._rollOutChain[r]).node && o.node.activeInHierarchy) {
          var s = this.getEvent(e, o, t.Event.ROLL_OUT, !1);
          o.node.dispatchEvent(s), t.Event._return(s);
        }
        for (n = this._rollOverChain.length, r = 0; r < n; r++) (o = this._rollOverChain[r]).node && o.node.activeInHierarchy && (s = this.getEvent(e, o, t.Event.ROLL_OVER, !1), o.node.dispatchEvent(s), t.Event._return(s));
        this._rollOutChain.length = 0, this._rollOverChain.length = 0;
      }
    }, o.prototype.getEvent = function (e, i, o, n) {
      var r = t.Event._borrow(o, n);
      return r.initiator = i, r.touch = e.touch, r.pos.set(e.pos), r.touchId = e.touch ? e.touch.getID() : 0, r.clickCount = e.clickCount, r.button = e.button, r.mouseWheelDelta = e.mouseWheelDelta, r._processor = this, r;
    }, o;
  }(cc.Component);
  t.InputProcessor = e;
  var i = function i() {
    this.pos = new cc.Vec2(), this.touchId = 0, this.clickCount = 0, this.mouseWheelDelta = 0, this.button = -1, this.downPos = new cc.Vec2(), this.began = !1, this.clickCancelled = !1, this.lastClickTime = 0, this.downTargets = new Array(), this.touchMonitors = new Array();
  };
}(fgui || (fgui = {})), function (t) {
  var e,
    i = function () {
      function i(t) {
        this._owner = t;
      }
      return i.create = function (i, o) {
        return e || (e = [t.GearDisplay, t.GearXY, t.GearSize, t.GearLook, t.GearColor, t.GearAnimation, t.GearText, t.GearIcon, t.GearDisplay2, t.GearFontSize]), new e[o](i);
      }, i.prototype.dispose = function () {
        this._tweenConfig && this._tweenConfig._tweener && (this._tweenConfig._tweener.kill(), this._tweenConfig._tweener = null);
      }, Object.defineProperty(i.prototype, "controller", {
        get: function get() {
          return this._controller;
        },
        set: function set(t) {
          t != this._controller && (this._controller = t, this._controller && this.init());
        },
        enumerable: !1,
        configurable: !0
      }), Object.defineProperty(i.prototype, "tweenConfig", {
        get: function get() {
          return this._tweenConfig || (this._tweenConfig = new o()), this._tweenConfig;
        },
        enumerable: !1,
        configurable: !0
      }), i.prototype.setup = function (e) {
        var i, n;
        this._controller = this._owner.parent.getControllerAt(e.readShort()), this.init();
        var r = e.readShort();
        if (this instanceof t.GearDisplay) this.pages = e.readSArray(r);else if (this instanceof t.GearDisplay2) this.pages = e.readSArray(r);else {
          for (i = 0; i < r; i++) null != (n = e.readS()) && this.addStatus(n, e);
          e.readBool() && this.addStatus(null, e);
        }
        if (e.readBool() && (this._tweenConfig = new o(), this._tweenConfig.easeType = e.readByte(), this._tweenConfig.duration = e.readFloat(), this._tweenConfig.delay = e.readFloat()), e.version >= 2) if (this instanceof t.GearXY) {
          if (e.readBool()) {
            for (this.positionsInPercent = !0, i = 0; i < r; i++) null != (n = e.readS()) && this.addExtStatus(n, e);
            e.readBool() && this.addExtStatus(null, e);
          }
        } else this instanceof t.GearDisplay2 && (this.condition = e.readByte());
      }, i.prototype.updateFromRelations = function () {}, i.prototype.addStatus = function () {}, i.prototype.init = function () {}, i.prototype.apply = function () {}, i.prototype.updateState = function () {}, i;
    }();
  t.GearBase = i;
  var o = function o() {
    this.tween = !0, this.easeType = t.EaseType.QuadOut, this.duration = .3, this.delay = 0;
  };
  t.GearTweenConfig = o;
}(fgui || (fgui = {})), function (t) {
  var e = function (e) {
    function i(t) {
      return e.call(this, t) || this;
    }
    return __extends(i, e), i.prototype.init = function () {
      this._default = {
        playing: this._owner.getProp(t.ObjectPropID.Playing),
        frame: this._owner.getProp(t.ObjectPropID.Frame)
      }, this._storage = {};
    }, i.prototype.addStatus = function (t, e) {
      var i;
      null == t ? i = this._default : this._storage[t] = i = {}, i.playing = e.readBool(), i.frame = e.readInt();
    }, i.prototype.apply = function () {
      this._owner._gearLocked = !0;
      var e = this._storage[this._controller.selectedPageId];
      e || (e = this._default), this._owner.setProp(t.ObjectPropID.Playing, e.playing), this._owner.setProp(t.ObjectPropID.Frame, e.frame), this._owner._gearLocked = !1;
    }, i.prototype.updateState = function () {
      var e = this._storage[this._controller.selectedPageId];
      e || (this._storage[this._controller.selectedPageId] = e = {}), e.playing = this._owner.getProp(t.ObjectPropID.Playing), e.frame = this._owner.getProp(t.ObjectPropID.Frame);
    }, i;
  }(t.GearBase);
  t.GearAnimation = e;
}(fgui || (fgui = {})), function (t) {
  var e = function (e) {
    function i(t) {
      return e.call(this, t) || this;
    }
    return __extends(i, e), i.prototype.init = function () {
      this._default = {
        color: this._owner.getProp(t.ObjectPropID.Color),
        strokeColor: this._owner.getProp(t.ObjectPropID.OutlineColor)
      }, this._storage = {};
    }, i.prototype.addStatus = function (t, e) {
      var i;
      null == t ? i = this._default : this._storage[t] = i = {}, i.color = e.readColor(), i.strokeColor = e.readColor();
    }, i.prototype.apply = function () {
      this._owner._gearLocked = !0;
      var e = this._storage[this._controller.selectedPageId];
      e || (e = this._default), this._owner.setProp(t.ObjectPropID.Color, e.color), this._owner.setProp(t.ObjectPropID.OutlineColor, e.strokeColor), this._owner._gearLocked = !1;
    }, i.prototype.updateState = function () {
      var e = this._storage[this._controller.selectedPageId];
      e || (this._storage[this._controller.selectedPageId] = e = {}), e.color = this._owner.getProp(t.ObjectPropID.Color), e.strokeColor = this._owner.getProp(t.ObjectPropID.OutlineColor);
    }, i;
  }(t.GearBase);
  t.GearColor = e;
}(fgui || (fgui = {})), function (t) {
  var e = function (t) {
    function e(e) {
      var i = t.call(this, e) || this;
      return i._displayLockToken = 1, i._visible = 0, i;
    }
    return __extends(e, t), e.prototype.init = function () {
      this.pages = null;
    }, e.prototype.apply = function () {
      this._displayLockToken++, 0 == this._displayLockToken && (this._displayLockToken = 1), null == this.pages || 0 == this.pages.length || -1 != this.pages.indexOf(this._controller.selectedPageId) ? this._visible = 1 : this._visible = 0;
    }, e.prototype.addLock = function () {
      return this._visible++, this._displayLockToken;
    }, e.prototype.releaseLock = function (t) {
      t == this._displayLockToken && this._visible--;
    }, Object.defineProperty(e.prototype, "connected", {
      get: function get() {
        return null == this._controller || this._visible > 0;
      },
      enumerable: !1,
      configurable: !0
    }), e;
  }(t.GearBase);
  t.GearDisplay = e;
}(fgui || (fgui = {})), function (t) {
  var e = function (t) {
    function e(e) {
      var i = t.call(this, e) || this;
      return i._visible = 0, i;
    }
    return __extends(e, t), e.prototype.init = function () {
      this.pages = null;
    }, e.prototype.apply = function () {
      null == this.pages || 0 == this.pages.length || -1 != this.pages.indexOf(this._controller.selectedPageId) ? this._visible = 1 : this._visible = 0;
    }, e.prototype.evaluate = function (t) {
      var e = null == this._controller || this._visible > 0;
      return 0 == this.condition ? e && t : e || t;
    }, e;
  }(t.GearBase);
  t.GearDisplay2 = e;
}(fgui || (fgui = {})), function (t) {
  var e = function (e) {
    function i(t) {
      var i = e.call(this, t) || this;
      return i._default = 0, i;
    }
    return __extends(i, e), i.prototype.init = function () {
      this._default = this._owner.getProp(t.ObjectPropID.FontSize), this._storage = {};
    }, i.prototype.addStatus = function (t, e) {
      null == t ? this._default = e.readInt() : this._storage[t] = e.readInt();
    }, i.prototype.apply = function () {
      this._owner._gearLocked = !0;
      var e = this._storage[this._controller.selectedPageId];
      null != e ? this._owner.setProp(t.ObjectPropID.FontSize, e) : this._owner.setProp(t.ObjectPropID.FontSize, this._default), this._owner._gearLocked = !1;
    }, i.prototype.updateState = function () {
      this._storage[this._controller.selectedPageId] = this._owner.getProp(t.ObjectPropID.FontSize);
    }, i;
  }(t.GearBase);
  t.GearFontSize = e;
}(fgui || (fgui = {})), function (t) {
  var e = function (t) {
    function e(e) {
      return t.call(this, e) || this;
    }
    return __extends(e, t), e.prototype.init = function () {
      this._default = this._owner.icon, this._storage = {};
    }, e.prototype.addStatus = function (t, e) {
      null == t ? this._default = e.readS() : this._storage[t] = e.readS();
    }, e.prototype.apply = function () {
      this._owner._gearLocked = !0;
      var t = this._storage[this._controller.selectedPageId];
      this._owner.icon = void 0 !== t ? t : this._default, this._owner._gearLocked = !1;
    }, e.prototype.updateState = function () {
      this._storage[this._controller.selectedPageId] = this._owner.icon;
    }, e;
  }(t.GearBase);
  t.GearIcon = e;
}(fgui || (fgui = {})), function (t) {
  var e = function (e) {
    function i(t) {
      return e.call(this, t) || this;
    }
    return __extends(i, e), i.prototype.init = function () {
      this._default = {
        alpha: this._owner.alpha,
        rotation: this._owner.rotation,
        grayed: this._owner.grayed,
        touchable: this._owner.touchable
      }, this._storage = {};
    }, i.prototype.addStatus = function (t, e) {
      var i;
      null == t ? i = this._default : this._storage[t] = i = {}, i.alpha = e.readFloat(), i.rotation = e.readFloat(), i.grayed = e.readBool(), i.touchable = e.readBool();
    }, i.prototype.apply = function () {
      var e = this._storage[this._controller.selectedPageId];
      if (e || (e = this._default), this._tweenConfig && this._tweenConfig.tween && !t.UIPackage._constructing && !t.GearBase.disableAllTweenEffect) {
        if (this._owner._gearLocked = !0, this._owner.grayed = e.grayed, this._owner.touchable = e.touchable, this._owner._gearLocked = !1, this._tweenConfig._tweener) {
          if (this._tweenConfig._tweener.endValue.x == e.alpha && this._tweenConfig._tweener.endValue.y == e.rotation) return;
          this._tweenConfig._tweener.kill(!0), this._tweenConfig._tweener = null;
        }
        var i = e.alpha != this._owner.alpha,
          o = e.rotation != this._owner.rotation;
        (i || o) && (this._owner.checkGearController(0, this._controller) && (this._tweenConfig._displayLockToken = this._owner.addDisplayLock()), this._tweenConfig._tweener = t.GTween.to2(this._owner.alpha, this._owner.rotation, e.alpha, e.rotation, this._tweenConfig.duration).setDelay(this._tweenConfig.delay).setEase(this._tweenConfig.easeType).setUserData((i ? 1 : 0) + (o ? 2 : 0)).setTarget(this).onUpdate(this.__tweenUpdate, this).onComplete(this.__tweenComplete, this));
      } else this._owner._gearLocked = !0, this._owner.grayed = e.grayed, this._owner.touchable = e.touchable, this._owner.alpha = e.alpha, this._owner.rotation = e.rotation, this._owner._gearLocked = !1;
    }, i.prototype.__tweenUpdate = function (t) {
      var e = t.userData;
      this._owner._gearLocked = !0, 0 != (1 & e) && (this._owner.alpha = t.value.x), 0 != (2 & e) && (this._owner.rotation = t.value.y), this._owner._gearLocked = !1;
    }, i.prototype.__tweenComplete = function () {
      0 != this._tweenConfig._displayLockToken && (this._owner.releaseDisplayLock(this._tweenConfig._displayLockToken), this._tweenConfig._displayLockToken = 0), this._tweenConfig._tweener = null;
    }, i.prototype.updateState = function () {
      var t = this._storage[this._controller.selectedPageId];
      t || (this._storage[this._controller.selectedPageId] = t = {}), t.alpha = this._owner.alpha, t.rotation = this._owner.rotation, t.grayed = this._owner.grayed, t.touchable = this._owner.touchable;
    }, i;
  }(t.GearBase);
  t.GearLook = e;
}(fgui || (fgui = {})), function (t) {
  var e = function (e) {
    function i(t) {
      return e.call(this, t) || this;
    }
    return __extends(i, e), i.prototype.init = function () {
      this._default = {
        width: this._owner.width,
        height: this._owner.height,
        scaleX: this._owner.scaleX,
        scaleY: this._owner.scaleY
      }, this._storage = {};
    }, i.prototype.addStatus = function (t, e) {
      var i;
      null == t ? i = this._default : this._storage[t] = i = {}, i.width = e.readInt(), i.height = e.readInt(), i.scaleX = e.readFloat(), i.scaleY = e.readFloat();
    }, i.prototype.apply = function () {
      var e = this._storage[this._controller.selectedPageId];
      if (e || (e = this._default), this._tweenConfig && this._tweenConfig.tween && !t.UIPackage._constructing && !t.GearBase.disableAllTweenEffect) {
        if (this._tweenConfig._tweener) {
          if (this._tweenConfig._tweener.endValue.x == e.width && this._tweenConfig._tweener.endValue.y == e.height && this._tweenConfig._tweener.endValue.z == e.scaleX && this._tweenConfig._tweener.endValue.w == e.scaleY) return;
          this._tweenConfig._tweener.kill(!0), this._tweenConfig._tweener = null;
        }
        var i = e.width != this._owner.width || e.height != this._owner.height,
          o = e.scaleX != this._owner.scaleX || e.scaleY != this._owner.scaleY;
        (i || o) && (this._owner.checkGearController(0, this._controller) && (this._tweenConfig._displayLockToken = this._owner.addDisplayLock()), this._tweenConfig._tweener = t.GTween.to4(this._owner.width, this._owner.height, this._owner.scaleX, this._owner.scaleY, e.width, e.height, e.scaleX, e.scaleY, this._tweenConfig.duration).setDelay(this._tweenConfig.delay).setEase(this._tweenConfig.easeType).setUserData((i ? 1 : 0) + (o ? 2 : 0)).setTarget(this).onUpdate(this.__tweenUpdate, this).onComplete(this.__tweenComplete, this));
      } else this._owner._gearLocked = !0, this._owner.setSize(e.width, e.height, this._owner.gearXY.controller == this._controller), this._owner.setScale(e.scaleX, e.scaleY), this._owner._gearLocked = !1;
    }, i.prototype.__tweenUpdate = function (t) {
      var e = t.userData;
      this._owner._gearLocked = !0, 0 != (1 & e) && this._owner.setSize(t.value.x, t.value.y, this._owner.checkGearController(1, this._controller)), 0 != (2 & e) && this._owner.setScale(t.value.z, t.value.w), this._owner._gearLocked = !1;
    }, i.prototype.__tweenComplete = function () {
      0 != this._tweenConfig._displayLockToken && (this._owner.releaseDisplayLock(this._tweenConfig._displayLockToken), this._tweenConfig._displayLockToken = 0), this._tweenConfig._tweener = null;
    }, i.prototype.updateState = function () {
      var t = this._storage[this._controller.selectedPageId];
      t || (this._storage[this._controller.selectedPageId] = t = {}), t.width = this._owner.width, t.height = this._owner.height, t.scaleX = this._owner.scaleX, t.scaleY = this._owner.scaleY;
    }, i.prototype.updateFromRelations = function (t, e) {
      if (null != this._controller && null != this._storage) {
        for (var i in this._storage) {
          var o = this._storage[i];
          o.width += t, o.height += e;
        }
        this._default.width += t, this._default.height += e, this.updateState();
      }
    }, i;
  }(t.GearBase);
  t.GearSize = e;
}(fgui || (fgui = {})), function (t) {
  var e = function (t) {
    function e(e) {
      return t.call(this, e) || this;
    }
    return __extends(e, t), e.prototype.init = function () {
      this._default = this._owner.text, this._storage = {};
    }, e.prototype.addStatus = function (t, e) {
      null == t ? this._default = e.readS() : this._storage[t] = e.readS();
    }, e.prototype.apply = function () {
      this._owner._gearLocked = !0;
      var t = this._storage[this._controller.selectedPageId];
      this._owner.text = void 0 !== t ? t : this._default, this._owner._gearLocked = !1;
    }, e.prototype.updateState = function () {
      this._storage[this._controller.selectedPageId] = this._owner.text;
    }, e;
  }(t.GearBase);
  t.GearText = e;
}(fgui || (fgui = {})), function (t) {
  var e = function (e) {
    function i(t) {
      return e.call(this, t) || this;
    }
    return __extends(i, e), i.prototype.init = function () {
      this._default = {
        x: this._owner.x,
        y: this._owner.y,
        px: this._owner.x / this._owner.parent.width,
        py: this._owner.y / this._owner.parent.height
      }, this._storage = {};
    }, i.prototype.addStatus = function (t, e) {
      var i;
      null == t ? i = this._default : this._storage[t] = i = {}, i.x = e.readInt(), i.y = e.readInt();
    }, i.prototype.addExtStatus = function (t, e) {
      var i;
      (i = null == t ? this._default : this._storage[t]).px = e.readFloat(), i.py = e.readFloat();
    }, i.prototype.apply = function () {
      var e,
        i,
        o = this._storage[this._controller.selectedPageId];
      if (o || (o = this._default), this.positionsInPercent && this._owner.parent ? (e = o.px * this._owner.parent.width, i = o.py * this._owner.parent.height) : (e = o.x, i = o.y), this._tweenConfig && this._tweenConfig.tween && !t.UIPackage._constructing && !t.GearBase.disableAllTweenEffect) {
        if (this._tweenConfig._tweener) {
          if (this._tweenConfig._tweener.endValue.x == e && this._tweenConfig._tweener.endValue.y == i) return;
          this._tweenConfig._tweener.kill(!0), this._tweenConfig._tweener = null;
        }
        var n = this._owner.x,
          r = this._owner.y;
        n == e && r == i || (this._owner.checkGearController(0, this._controller) && (this._tweenConfig._displayLockToken = this._owner.addDisplayLock()), this._tweenConfig._tweener = t.GTween.to2(n, r, e, i, this._tweenConfig.duration).setDelay(this._tweenConfig.delay).setEase(this._tweenConfig.easeType).setTarget(this).onUpdate(this.__tweenUpdate, this).onComplete(this.__tweenComplete, this));
      } else this._owner._gearLocked = !0, this._owner.setPosition(e, i), this._owner._gearLocked = !1;
    }, i.prototype.__tweenUpdate = function (t) {
      this._owner._gearLocked = !0, this._owner.setPosition(t.value.x, t.value.y), this._owner._gearLocked = !1;
    }, i.prototype.__tweenComplete = function () {
      0 != this._tweenConfig._displayLockToken && (this._owner.releaseDisplayLock(this._tweenConfig._displayLockToken), this._tweenConfig._displayLockToken = 0), this._tweenConfig._tweener = null;
    }, i.prototype.updateState = function () {
      var t = this._storage[this._controller.selectedPageId];
      t || (this._storage[this._controller.selectedPageId] = t = {}), t.x = this._owner.x, t.y = this._owner.y, t.px = this._owner.x / this._owner.parent.width, t.py = this._owner.y / this._owner.parent.height;
    }, i.prototype.updateFromRelations = function (t, e) {
      if (null != this._controller && null != this._storage && !this.positionsInPercent) {
        for (var i in this._storage) {
          var o = this._storage[i];
          o.x += t, o.y += e;
        }
        this._default.x += t, this._default.y += e, this.updateState();
      }
    }, i;
  }(t.GearBase);
  t.GearXY = e;
}(fgui || (fgui = {})), function (t) {
  var e = .5 * Math.PI,
    i = 2 * Math.PI;
  function o(t, e) {
    return 1 - n(e - t, e);
  }
  function n(t, e) {
    return (t /= e) < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
  }
  function r(t, e) {
    return t < .5 * e ? .5 * o(2 * t, e) : .5 * n(2 * t - e, e) + .5;
  }
  t.evaluateEase = function (s, h, a, l, c) {
    switch (s) {
      case t.EaseType.Linear:
        return h / a;
      case t.EaseType.SineIn:
        return 1 - Math.cos(h / a * e);
      case t.EaseType.SineOut:
        return Math.sin(h / a * e);
      case t.EaseType.SineInOut:
        return -.5 * (Math.cos(Math.PI * h / a) - 1);
      case t.EaseType.QuadIn:
        return (h /= a) * h;
      case t.EaseType.QuadOut:
        return -(h /= a) * (h - 2);
      case t.EaseType.QuadInOut:
        return (h /= .5 * a) < 1 ? .5 * h * h : -.5 * (--h * (h - 2) - 1);
      case t.EaseType.CubicIn:
        return (h /= a) * h * h;
      case t.EaseType.CubicOut:
        return (h = h / a - 1) * h * h + 1;
      case t.EaseType.CubicInOut:
        return (h /= .5 * a) < 1 ? .5 * h * h * h : .5 * ((h -= 2) * h * h + 2);
      case t.EaseType.QuartIn:
        return (h /= a) * h * h * h;
      case t.EaseType.QuartOut:
        return -((h = h / a - 1) * h * h * h - 1);
      case t.EaseType.QuartInOut:
        return (h /= .5 * a) < 1 ? .5 * h * h * h * h : -.5 * ((h -= 2) * h * h * h - 2);
      case t.EaseType.QuintIn:
        return (h /= a) * h * h * h * h;
      case t.EaseType.QuintOut:
        return (h = h / a - 1) * h * h * h * h + 1;
      case t.EaseType.QuintInOut:
        return (h /= .5 * a) < 1 ? .5 * h * h * h * h * h : .5 * ((h -= 2) * h * h * h * h + 2);
      case t.EaseType.ExpoIn:
        return 0 == h ? 0 : Math.pow(2, 10 * (h / a - 1));
      case t.EaseType.ExpoOut:
        return h == a ? 1 : 1 - Math.pow(2, -10 * h / a);
      case t.EaseType.ExpoInOut:
        return 0 == h ? 0 : h == a ? 1 : (h /= .5 * a) < 1 ? .5 * Math.pow(2, 10 * (h - 1)) : .5 * (2 - Math.pow(2, -10 * --h));
      case t.EaseType.CircIn:
        return -(Math.sqrt(1 - (h /= a) * h) - 1);
      case t.EaseType.CircOut:
        return Math.sqrt(1 - (h = h / a - 1) * h);
      case t.EaseType.CircInOut:
        return (h /= .5 * a) < 1 ? -.5 * (Math.sqrt(1 - h * h) - 1) : .5 * (Math.sqrt(1 - (h -= 2) * h) + 1);
      case t.EaseType.ElasticIn:
        var u;
        return 0 == h ? 0 : 1 == (h /= a) ? 1 : (0 == c && (c = .3 * a), l < 1 ? (l = 1, u = c / 4) : u = c / i * Math.asin(1 / l), -l * Math.pow(2, 10 * (h -= 1)) * Math.sin((h * a - u) * i / c));
      case t.EaseType.ElasticOut:
        var _;
        return 0 == h ? 0 : 1 == (h /= a) ? 1 : (0 == c && (c = .3 * a), l < 1 ? (l = 1, _ = c / 4) : _ = c / i * Math.asin(1 / l), l * Math.pow(2, -10 * h) * Math.sin((h * a - _) * i / c) + 1);
      case t.EaseType.ElasticInOut:
        var p;
        return 0 == h ? 0 : 2 == (h /= .5 * a) ? 1 : (0 == c && (c = .3 * 1.5 * a), l < 1 ? (l = 1, p = c / 4) : p = c / i * Math.asin(1 / l), h < 1 ? l * Math.pow(2, 10 * (h -= 1)) * Math.sin((h * a - p) * i / c) * -.5 : l * Math.pow(2, -10 * (h -= 1)) * Math.sin((h * a - p) * i / c) * .5 + 1);
      case t.EaseType.BackIn:
        return (h /= a) * h * ((l + 1) * h - l);
      case t.EaseType.BackOut:
        return (h = h / a - 1) * h * ((l + 1) * h + l) + 1;
      case t.EaseType.BackInOut:
        return (h /= .5 * a) < 1 ? h * h * ((1 + (l *= 1.525)) * h - l) * .5 : .5 * ((h -= 2) * h * ((1 + (l *= 1.525)) * h + l) + 2);
      case t.EaseType.BounceIn:
        return o(h, a);
      case t.EaseType.BounceOut:
        return n(h, a);
      case t.EaseType.BounceInOut:
        return r(h, a);
      default:
        return -(h /= a) * (h - 2);
    }
  };
}(fgui || (fgui = {})), function (t) {
  var e = function () {
    function t() {}
    return t.Linear = 0, t.SineIn = 1, t.SineOut = 2, t.SineInOut = 3, t.QuadIn = 4, t.QuadOut = 5, t.QuadInOut = 6, t.CubicIn = 7, t.CubicOut = 8, t.CubicInOut = 9, t.QuartIn = 10, t.QuartOut = 11, t.QuartInOut = 12, t.QuintIn = 13, t.QuintOut = 14, t.QuintInOut = 15, t.ExpoIn = 16, t.ExpoOut = 17, t.ExpoInOut = 18, t.CircIn = 19, t.CircOut = 20, t.CircInOut = 21, t.ElasticIn = 22, t.ElasticOut = 23, t.ElasticInOut = 24, t.BackIn = 25, t.BackOut = 26, t.BackInOut = 27, t.BounceIn = 28, t.BounceOut = 29, t.BounceInOut = 30, t.Custom = 31, t;
  }();
  t.EaseType = e;
}(fgui || (fgui = {})), function (t) {
  var e = function () {
    function e() {
      this._segments = new Array(), this._points = new Array();
    }
    return Object.defineProperty(e.prototype, "length", {
      get: function get() {
        return this._fullLength;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.create = function (e, o, n, r) {
      var s;
      Array.isArray(e) ? s = e : ((s = new Array()).push(e), s.push(o), n && s.push(n), r && s.push(r)), this._segments.length = 0, this._points.length = 0, this._fullLength = 0;
      var h = s.length;
      if (0 != h) {
        var a = i;
        a.length = 0;
        var l = s[0];
        l.curveType == t.CurveType.CRSpline && a.push(new cc.Vec2(l.x, l.y));
        for (var c = 1; c < h; c++) {
          var u = s[c];
          if (l.curveType != t.CurveType.CRSpline) {
            var _ = {};
            _.type = l.curveType, _.ptStart = this._points.length, l.curveType == t.CurveType.Straight ? (_.ptCount = 2, this._points.push(new cc.Vec2(l.x, l.y)), this._points.push(new cc.Vec2(u.x, u.y))) : l.curveType == t.CurveType.Bezier ? (_.ptCount = 3, this._points.push(new cc.Vec2(l.x, l.y)), this._points.push(new cc.Vec2(u.x, u.y)), this._points.push(new cc.Vec2(l.control1_x, l.control1_y))) : l.curveType == t.CurveType.CubicBezier && (_.ptCount = 4, this._points.push(new cc.Vec2(l.x, l.y)), this._points.push(new cc.Vec2(u.x, u.y)), this._points.push(new cc.Vec2(l.control1_x, l.control1_y)), this._points.push(new cc.Vec2(l.control2_x, l.control2_y))), _.length = t.ToolSet.distance(l.x, l.y, u.x, u.y), this._fullLength += _.length, this._segments.push(_);
          }
          u.curveType != t.CurveType.CRSpline ? a.length > 0 && (a.push(new cc.Vec2(u.x, u.y)), this.createSplineSegment()) : a.push(new cc.Vec2(u.x, u.y)), l = u;
        }
        a.length > 1 && this.createSplineSegment();
      }
    }, e.prototype.createSplineSegment = function () {
      var e = i,
        o = e.length;
      e.splice(0, 0, e[0]), e.push(e[o]), e.push(e[o]), o += 3;
      var n = {};
      n.type = t.CurveType.CRSpline, n.ptStart = this._points.length, n.ptCount = o, this._points = this._points.concat(e), n.length = 0;
      for (var r = 1; r < o; r++) n.length += t.ToolSet.distance(e[r - 1].x, e[r - 1].y, e[r].x, e[r].y);
      this._fullLength += n.length, this._segments.push(n), e.length = 0;
    }, e.prototype.clear = function () {
      this._segments.length = 0, this._points.length = 0;
    }, e.prototype.getPointAt = function (e, i) {
      i ? i.x = i.y = 0 : i = new cc.Vec2(), e = t.ToolSet.clamp01(e);
      var o,
        n = this._segments.length;
      if (0 == n) return i;
      if (1 == e) return (o = this._segments[n - 1]).type == t.CurveType.Straight ? (i.x = t.ToolSet.lerp(this._points[o.ptStart].x, this._points[o.ptStart + 1].x, e), i.y = t.ToolSet.lerp(this._points[o.ptStart].y, this._points[o.ptStart + 1].y, e), i) : o.type == t.CurveType.Bezier || o.type == t.CurveType.CubicBezier ? this.onBezierCurve(o.ptStart, o.ptCount, e, i) : this.onCRSplineCurve(o.ptStart, o.ptCount, e, i);
      for (var r = e * this._fullLength, s = 0; s < n; s++) if ((r -= (o = this._segments[s]).length) < 0) {
        e = 1 + r / o.length, o.type == t.CurveType.Straight ? (i.x = t.ToolSet.lerp(this._points[o.ptStart].x, this._points[o.ptStart + 1].x, e), i.y = t.ToolSet.lerp(this._points[o.ptStart].y, this._points[o.ptStart + 1].y, e)) : i = o.type == t.CurveType.Bezier || o.type == t.CurveType.CubicBezier ? this.onBezierCurve(o.ptStart, o.ptCount, e, i) : this.onCRSplineCurve(o.ptStart, o.ptCount, e, i);
        break;
      }
      return i;
    }, Object.defineProperty(e.prototype, "segmentCount", {
      get: function get() {
        return this._segments.length;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.getAnchorsInSegment = function (t, e) {
      null == e && (e = new Array());
      for (var i = this._segments[t], o = 0; o < i.ptCount; o++) e.push(new cc.Vec2(this._points[i.ptStart + o].x, this._points[i.ptStart + o].y));
      return e;
    }, e.prototype.getPointsInSegment = function (e, i, o, n, r, s) {
      null == n && (n = new Array()), s && !isNaN(s) || (s = .1), r && r.push(i);
      var h = this._segments[e];
      if (h.type == t.CurveType.Straight) n.push(new cc.Vec2(t.ToolSet.lerp(this._points[h.ptStart].x, this._points[h.ptStart + 1].x, i), t.ToolSet.lerp(this._points[h.ptStart].y, this._points[h.ptStart + 1].y, i))), n.push(new cc.Vec2(t.ToolSet.lerp(this._points[h.ptStart].x, this._points[h.ptStart + 1].x, o), t.ToolSet.lerp(this._points[h.ptStart].y, this._points[h.ptStart + 1].y, o)));else {
        var a;
        a = h.type == t.CurveType.Bezier || h.type == t.CurveType.CubicBezier ? this.onBezierCurve : this.onCRSplineCurve, n.push(a.call(this, h.ptStart, h.ptCount, i, new cc.Vec2()));
        for (var l = Math.min(h.length * s, 50), c = 0; c <= l; c++) {
          var u = c / l;
          u > i && u < o && (n.push(a.call(this, h.ptStart, h.ptCount, u, new cc.Vec2())), null != r && r.push(u));
        }
        n.push(a.call(this, h.ptStart, h.ptCount, o, new cc.Vec2()));
      }
      return null != r && r.push(o), n;
    }, e.prototype.getAllPoints = function (t, e, i) {
      null == t && (t = new Array()), i && !isNaN(i) || (i = .1);
      for (var o = this._segments.length, n = 0; n < o; n++) this.getPointsInSegment(n, 0, 1, t, e, i);
      return t;
    }, e.prototype.onCRSplineCurve = function (e, i, o, n) {
      var r = Math.floor(o * (i - 4)) + e,
        s = this._points[r].x,
        h = this._points[r].y,
        a = this._points[r + 1].x,
        l = this._points[r + 1].y,
        c = this._points[r + 2].x,
        u = this._points[r + 2].y,
        _ = this._points[r + 3].x,
        p = this._points[r + 3].y,
        d = 1 == o ? 1 : t.ToolSet.repeat(o * (i - 4), 1),
        f = ((2 - d) * d - 1) * d * .5,
        g = .5 * ((3 * d - 5) * d * d + 2),
        y = ((-3 * d + 4) * d + 1) * d * .5,
        m = (d - 1) * d * d * .5;
      return n.x = s * f + a * g + c * y + _ * m, n.y = h * f + l * g + u * y + p * m, n;
    }, e.prototype.onBezierCurve = function (t, e, i, o) {
      var n = 1 - i,
        r = this._points[t].x,
        s = this._points[t].y,
        h = this._points[t + 1].x,
        a = this._points[t + 1].y,
        l = this._points[t + 2].x,
        c = this._points[t + 2].y;
      if (4 == e) {
        var u = this._points[t + 3].x,
          _ = this._points[t + 3].y;
        o.x = n * n * n * r + 3 * n * n * i * l + 3 * n * i * i * u + i * i * i * h, o.y = n * n * n * s + 3 * n * n * i * c + 3 * n * i * i * _ + i * i * i * a;
      } else o.x = n * n * r + 2 * n * i * l + i * i * h, o.y = n * n * s + 2 * n * i * c + i * i * a;
      return o;
    }, e;
  }();
  t.GPath = e;
  var i = new Array();
}(fgui || (fgui = {})), function (t) {
  var e;
  (function (t) {
    t[t.CRSpline = 0] = "CRSpline", t[t.Bezier = 1] = "Bezier", t[t.CubicBezier = 2] = "CubicBezier", t[t.Straight = 3] = "Straight";
  })(e = t.CurveType || (t.CurveType = {}));
  var i = function () {
    function t() {
      this.x = 0, this.y = 0, this.control1_x = 0, this.control1_y = 0, this.control2_x = 0, this.control2_y = 0, this.curveType = 0;
    }
    return t.newPoint = function (e, i, o) {
      void 0 === e && (e = 0), void 0 === i && (i = 0), void 0 === o && (o = 0);
      var n = new t();
      return n.x = e, n.y = i, n.control1_x = 0, n.control1_y = 0, n.control2_x = 0, n.control2_y = 0, n.curveType = o, n;
    }, t.newBezierPoint = function (i, o, n, r) {
      void 0 === i && (i = 0), void 0 === o && (o = 0), void 0 === n && (n = 0), void 0 === r && (r = 0);
      var s = new t();
      return s.x = i, s.y = o, s.control1_x = n, s.control1_y = r, s.control2_x = 0, s.control2_y = 0, s.curveType = e.Bezier, s;
    }, t.newCubicBezierPoint = function (i, o, n, r, s, h) {
      void 0 === i && (i = 0), void 0 === o && (o = 0), void 0 === n && (n = 0), void 0 === r && (r = 0), void 0 === s && (s = 0), void 0 === h && (h = 0);
      var a = new t();
      return a.x = i, a.y = o, a.control1_x = n, a.control1_y = r, a.control2_x = s, a.control2_y = h, a.curveType = e.CubicBezier, a;
    }, t.prototype.clone = function () {
      var e = new t();
      return e.x = this.x, e.y = this.y, e.control1_x = this.control1_x, e.control1_y = this.control1_y, e.control2_x = this.control2_x, e.control2_y = this.control2_y, e.curveType = this.curveType, e;
    }, t;
  }();
  t.GPathPoint = i;
}(fgui || (fgui = {})), function (t) {
  var e = function () {
    function e() {}
    return e.to = function (e, i, o) {
      return t.TweenManager.createTween()._to(e, i, o);
    }, e.to2 = function (e, i, o, n, r) {
      return t.TweenManager.createTween()._to2(e, i, o, n, r);
    }, e.to3 = function (e, i, o, n, r, s, h) {
      return t.TweenManager.createTween()._to3(e, i, o, n, r, s, h);
    }, e.to4 = function (e, i, o, n, r, s, h, a, l) {
      return t.TweenManager.createTween()._to4(e, i, o, n, r, s, h, a, l);
    }, e.toColor = function (e, i, o) {
      return t.TweenManager.createTween()._toColor(e, i, o);
    }, e.delayedCall = function (e) {
      return t.TweenManager.createTween().setDelay(e);
    }, e.shake = function (e, i, o, n) {
      return t.TweenManager.createTween()._shake(e, i, o, n);
    }, e.isTweening = function (e, i) {
      return t.TweenManager.isTweening(e, i);
    }, e.kill = function (e, i, o) {
      t.TweenManager.killTweens(e, i, o);
    }, e.getTween = function (e, i) {
      return t.TweenManager.getTween(e, i);
    }, e.catchCallbackExceptions = !0, e;
  }();
  t.GTween = e;
}(fgui || (fgui = {})), function (t) {
  var e = function () {
    function e() {
      this._startValue = new t.TweenValue(), this._endValue = new t.TweenValue(), this._value = new t.TweenValue(), this._deltaValue = new t.TweenValue(), this._reset();
    }
    return e.prototype.setDelay = function (t) {
      return this._delay = t, this;
    }, Object.defineProperty(e.prototype, "delay", {
      get: function get() {
        return this._delay;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.setDuration = function (t) {
      return this._duration = t, this;
    }, Object.defineProperty(e.prototype, "duration", {
      get: function get() {
        return this._duration;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.setBreakpoint = function (t) {
      return this._breakpoint = t, this;
    }, e.prototype.setEase = function (t) {
      return this._easeType = t, this;
    }, e.prototype.setEasePeriod = function (t) {
      return this._easePeriod = t, this;
    }, e.prototype.setEaseOvershootOrAmplitude = function (t) {
      return this._easeOvershootOrAmplitude = t, this;
    }, e.prototype.setRepeat = function (t, e) {
      return this._repeat = t, this._yoyo = e, this;
    }, Object.defineProperty(e.prototype, "repeat", {
      get: function get() {
        return this._repeat;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.setTimeScale = function (t) {
      return this._timeScale = t, this;
    }, e.prototype.setSnapping = function (t) {
      return this._snapping = t, this;
    }, e.prototype.setTarget = function (e, i) {
      return this._target = e, this._propType = i, e instanceof t.GObject ? this._node = e.node : e instanceof cc.Node && (this._node = e), this;
    }, Object.defineProperty(e.prototype, "target", {
      get: function get() {
        return this._target;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.setPath = function (t) {
      return this._path = t, this;
    }, e.prototype.setUserData = function (t) {
      return this._userData = t, this;
    }, Object.defineProperty(e.prototype, "userData", {
      get: function get() {
        return this._userData;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.onUpdate = function (t, e) {
      return this._onUpdate = t, this._onUpdateCaller = e, this;
    }, e.prototype.onStart = function (t, e) {
      return this._onStart = t, this._onStartCaller = e, this;
    }, e.prototype.onComplete = function (t, e) {
      return this._onComplete = t, this._onCompleteCaller = e, this;
    }, Object.defineProperty(e.prototype, "startValue", {
      get: function get() {
        return this._startValue;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "endValue", {
      get: function get() {
        return this._endValue;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "value", {
      get: function get() {
        return this._value;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "deltaValue", {
      get: function get() {
        return this._deltaValue;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "normalizedTime", {
      get: function get() {
        return this._normalizedTime;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "completed", {
      get: function get() {
        return 0 != this._ended;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "allCompleted", {
      get: function get() {
        return 1 == this._ended;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.setPaused = function (t) {
      return this._paused = t, this;
    }, e.prototype.seek = function (t) {
      if (!this._killed) {
        if (this._elapsedTime = t, this._elapsedTime < this._delay) {
          if (!this._started) return;
          this._elapsedTime = this._delay;
        }
        this.update();
      }
    }, e.prototype.kill = function (t) {
      this._killed || (t && (0 == this._ended && (this._breakpoint >= 0 ? this._elapsedTime = this._delay + this._breakpoint : this._repeat >= 0 ? this._elapsedTime = this._delay + this._duration * (this._repeat + 1) : this._elapsedTime = this._delay + 2 * this._duration, this.update()), this.callCompleteCallback()), this._killed = !0);
    }, e.prototype._to = function (t, e, i) {
      return this._valueSize = 1, this._startValue.x = t, this._endValue.x = e, this._duration = i, this;
    }, e.prototype._to2 = function (t, e, i, o, n) {
      return this._valueSize = 2, this._startValue.x = t, this._endValue.x = i, this._startValue.y = e, this._endValue.y = o, this._duration = n, this;
    }, e.prototype._to3 = function (t, e, i, o, n, r, s) {
      return this._valueSize = 3, this._startValue.x = t, this._endValue.x = o, this._startValue.y = e, this._endValue.y = n, this._startValue.z = i, this._endValue.z = r, this._duration = s, this;
    }, e.prototype._to4 = function (t, e, i, o, n, r, s, h, a) {
      return this._valueSize = 4, this._startValue.x = t, this._endValue.x = n, this._startValue.y = e, this._endValue.y = r, this._startValue.z = i, this._endValue.z = s, this._startValue.w = o, this._endValue.w = h, this._duration = a, this;
    }, e.prototype._toColor = function (t, e, i) {
      return this._valueSize = 5, this._startValue.color = t, this._endValue.color = e, this._duration = i, this;
    }, e.prototype._shake = function (t, e, i, o) {
      return this._valueSize = 6, this._startValue.x = t, this._startValue.y = e, this._startValue.w = i, this._duration = o, this;
    }, e.prototype._init = function () {
      this._delay = 0, this._duration = 0, this._breakpoint = -1, this._easeType = t.EaseType.QuadOut, this._timeScale = 1, this._easePeriod = 0, this._easeOvershootOrAmplitude = 1.70158, this._snapping = !1, this._repeat = 0, this._yoyo = !1, this._valueSize = 0, this._started = !1, this._paused = !1, this._killed = !1, this._elapsedTime = 0, this._normalizedTime = 0, this._ended = 0;
    }, e.prototype._reset = function () {
      this._target = null, this._propType = null, this._userData = null, this._node = null, this._path = null, this._onStart = this._onUpdate = this._onComplete = null, this._onStartCaller = this._onUpdateCaller = this._onCompleteCaller = null;
    }, e.prototype._update = function (t) {
      if (!this._node || cc.isValid(this._node)) {
        if (1 != this._timeScale && (t *= this._timeScale), 0 != t) {
          if (0 != this._ended) return this.callCompleteCallback(), void (this._killed = !0);
          this._elapsedTime += t, this.update(), 0 != this._ended && (this._killed || (this.callCompleteCallback(), this._killed = !0));
        }
      } else this._killed = !0;
    }, e.prototype.update = function () {
      if (this._ended = 0, 0 != this._valueSize) {
        if (!this._started) {
          if (this._elapsedTime < this._delay) return;
          if (this._started = !0, this.callStartCallback(), this._killed) return;
        }
        var e = !1,
          o = this._elapsedTime - this._delay;
        if (this._breakpoint >= 0 && o >= this._breakpoint && (o = this._breakpoint, this._ended = 2), 0 != this._repeat) {
          var n = Math.floor(o / this._duration);
          o -= this._duration * n, this._yoyo && (e = n % 2 == 1), this._repeat > 0 && this._repeat - n < 0 && (this._yoyo && (e = this._repeat % 2 == 1), o = this._duration, this._ended = 1);
        } else o >= this._duration && (o = this._duration, this._ended = 1);
        if (this._normalizedTime = t.evaluateEase(this._easeType, e ? this._duration - o : o, this._duration, this._easeOvershootOrAmplitude, this._easePeriod), this._value.setZero(), this._deltaValue.setZero(), 6 == this._valueSize) {
          if (0 == this._ended) {
            var r = this._startValue.w * (1 - this._normalizedTime),
              s = r * (Math.random() > .5 ? 1 : -1),
              h = r * (Math.random() > .5 ? 1 : -1);
            this._deltaValue.x = s, this._deltaValue.y = h, this._value.x = this._startValue.x + s, this._value.y = this._startValue.y + h;
          } else this._value.x = this._startValue.x, this._value.y = this._startValue.y;
        } else if (this._path) {
          var a = i;
          this._path.getPointAt(this._normalizedTime, a), this._snapping && (a.x = Math.round(a.x), a.y = Math.round(a.y)), this._deltaValue.x = a.x - this._value.x, this._deltaValue.y = a.y - this._value.y, this._value.x = a.x, this._value.y = a.y;
        } else for (var l = Math.min(this._valueSize, 4), c = 0; c < l; c++) {
          var u = this._startValue.getField(c),
            _ = u + (this._endValue.getField(c) - u) * this._normalizedTime;
          this._snapping && (_ = Math.round(_)), this._deltaValue.setField(c, _ - this._value.getField(c)), this._value.setField(c, _);
        }
        if (null != this._target && null != this._propType) if (this._propType instanceof Function) switch (this._valueSize) {
          case 1:
            this._propType.call(this._target, this._value.x);
            break;
          case 2:
            this._propType.call(this._target, this._value.x, this._value.y);
            break;
          case 3:
            this._propType.call(this._target, this._value.x, this._value.y, this._value.z);
            break;
          case 4:
            this._propType.call(this._target, this._value.x, this._value.y, this._value.z, this._value.w);
            break;
          case 5:
            this._propType.call(this._target, this._value.color);
            break;
          case 6:
            this._propType.call(this._target, this._value.x, this._value.y);
        } else 5 == this._valueSize ? this._target[this._propType] = this._value.color : this._target[this._propType] = this._value.x;
        this.callUpdateCallback();
      } else this._elapsedTime >= this._delay + this._duration && (this._ended = 1);
    }, e.prototype.callStartCallback = function () {
      if (null != this._onStart) try {
        this._onStart.call(this._onStartCaller, this);
      } catch (t) {
        console.log("FairyGUI: error in start callback > " + t);
      }
    }, e.prototype.callUpdateCallback = function () {
      if (null != this._onUpdate) try {
        this._onUpdate.call(this._onUpdateCaller, this);
      } catch (t) {
        console.log("FairyGUI: error in update callback > " + t);
      }
    }, e.prototype.callCompleteCallback = function () {
      if (null != this._onComplete) try {
        this._onComplete.call(this._onCompleteCaller, this);
      } catch (t) {
        console.log("FairyGUI: error in complete callback > " + t);
      }
    }, e;
  }();
  t.GTweener = e;
  var i = new cc.Vec2();
}(fgui || (fgui = {})), function (t) {
  var e,
    i = new Array(30),
    o = new Array(),
    n = 0,
    r = function () {
      function r() {}
      return r.createTween = function () {
        var s;
        return e || (e = new cc.Node("[TweenManager]"), cc.game.addPersistRootNode(e), cc.director.getScheduler().schedule(r.update, e, 0, !1)), (s = o.length > 0 ? o.pop() : new t.GTweener())._init(), i[n++] = s, n == i.length && (i.length = i.length + Math.ceil(.5 * i.length)), s;
      }, r.isTweening = function (t, e) {
        if (null == t) return !1;
        for (var o = null == e || null == e, r = 0; r < n; r++) {
          var s = i[r];
          if (s && s.target == t && !s._killed && (o || s._propType == e)) return !0;
        }
        return !1;
      }, r.killTweens = function (t, e, o) {
        if (null == t) return !1;
        for (var r = !1, s = n, h = null == o || null == o, a = 0; a < s; a++) {
          var l = i[a];
          !l || l.target != t || l._killed || !h && l._propType != o || (l.kill(e), r = !0);
        }
        return r;
      }, r.getTween = function (t, e) {
        if (null == t) return null;
        for (var o = n, r = null == e || null == e, s = 0; s < o; s++) {
          var h = i[s];
          if (h && h.target == t && !h._killed && (r || h._propType == e)) return h;
        }
        return null;
      }, r.update = function (e) {
        for (var r = i, s = n, h = -1, a = 0; a < s; a++) {
          var l = r[a];
          null == l ? -1 == h && (h = a) : l._killed ? (l._reset(), o.push(l), r[a] = null, -1 == h && (h = a)) : (l._target instanceof t.GObject && null == l._target.node ? l._killed = !0 : l._paused || l._update(e), -1 != h && (r[h] = l, r[a] = null, h++));
        }
        if (h >= 0) {
          if (n != s) {
            var c = s;
            for (s = n - s, a = 0; a < s; a++) r[h++] = r[c++];
          }
          n = h;
        }
        return !1;
      }, r;
    }();
  t.TweenManager = r;
}(fgui || (fgui = {})), function (t) {
  var e = function () {
    function t() {
      this.x = this.y = this.z = this.w = 0;
    }
    return Object.defineProperty(t.prototype, "color", {
      get: function get() {
        return (this.w << 24) + (this.x << 16) + (this.y << 8) + this.z;
      },
      set: function set(t) {
        this.x = (16711680 & t) >> 16, this.y = (65280 & t) >> 8, this.z = 255 & t, this.w = (4278190080 & t) >> 24;
      },
      enumerable: !1,
      configurable: !0
    }), t.prototype.getField = function (t) {
      switch (t) {
        case 0:
          return this.x;
        case 1:
          return this.y;
        case 2:
          return this.z;
        case 3:
          return this.w;
        default:
          throw new Error("Index out of bounds: " + t);
      }
    }, t.prototype.setField = function (t, e) {
      switch (t) {
        case 0:
          this.x = e;
          break;
        case 1:
          this.y = e;
          break;
        case 2:
          this.z = e;
          break;
        case 3:
          this.w = e;
          break;
        default:
          throw new Error("Index out of bounds: " + t);
      }
    }, t.prototype.setZero = function () {
      this.x = this.y = this.z = this.w = 0;
    }, t;
  }();
  t.TweenValue = e;
}(fgui || (fgui = {})), function (t) {
  var e = function () {
    function t(t, e, i) {
      void 0 === e && (e = 0), void 0 === i && (i = -1), this.version = 0, -1 == i && (i = t.byteLength - e), this._bytes = new Uint8Array(t, e, i), this._view = new DataView(this._bytes.buffer, e, i), this._pos = 0, this._length = i;
    }
    return Object.defineProperty(t.prototype, "data", {
      get: function get() {
        return this._bytes;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "position", {
      get: function get() {
        return this._pos;
      },
      set: function set(t) {
        if (t > this._length) throw "Out of bounds";
        this._pos = t;
      },
      enumerable: !1,
      configurable: !0
    }), t.prototype.skip = function (t) {
      this._pos += t;
    }, t.prototype.validate = function (t) {
      if (this._pos + t > this._length) throw "Out of bounds";
    }, t.prototype.readByte = function () {
      return this.validate(1), this._view.getInt8(this._pos++);
    }, t.prototype.readUbyte = function () {
      return this._bytes[this._pos++];
    }, t.prototype.readBool = function () {
      return 1 == this.readByte();
    }, t.prototype.readShort = function () {
      this.validate(2);
      var t = this._view.getInt16(this._pos, this.littleEndian);
      return this._pos += 2, t;
    }, t.prototype.readUshort = function () {
      this.validate(2);
      var t = this._view.getUint16(this._pos, this.littleEndian);
      return this._pos += 2, t;
    }, t.prototype.readInt = function () {
      this.validate(4);
      var t = this._view.getInt32(this._pos, this.littleEndian);
      return this._pos += 4, t;
    }, t.prototype.readUint = function () {
      this.validate(4);
      var t = this._view.getUint32(this._pos, this.littleEndian);
      return this._pos += 4, t;
    }, t.prototype.readFloat = function () {
      this.validate(4);
      var t = this._view.getFloat32(this._pos, this.littleEndian);
      return this._pos += 4, t;
    }, t.prototype.readString = function (t) {
      null == t && (t = this.readUshort()), this.validate(t);
      for (var e = "", i = this._pos + t, o = 0, n = String.fromCharCode, r = this._bytes, s = this._pos; s < i;) (o = r[s++]) < 128 ? 0 != o && (e += n(o)) : e += n(o < 224 ? (63 & o) << 6 | 127 & r[s++] : o < 240 ? (31 & o) << 12 | (127 & r[s++]) << 6 | 127 & r[s++] : (15 & o) << 18 | (127 & r[s++]) << 12 | r[s++] << 6 & 127 | 127 & r[s++]);
      return this._pos += t, e;
    }, t.prototype.readS = function () {
      var t = this.readUshort();
      return 65534 == t ? null : 65533 == t ? "" : this.stringTable[t];
    }, t.prototype.readSArray = function (t) {
      for (var e = new Array(t), i = 0; i < t; i++) e[i] = this.readS();
      return e;
    }, t.prototype.writeS = function (t) {
      var e = this.readUshort();
      65534 != e && 65533 != e && (this.stringTable[e] = t);
    }, t.prototype.readColor = function (t) {
      var e = this.readUbyte(),
        i = this.readUbyte(),
        o = this.readUbyte(),
        n = this.readUbyte();
      return new cc.Color(e, i, o, t ? n : 255);
    }, t.prototype.readChar = function () {
      var t = this.readUshort();
      return String.fromCharCode(t);
    }, t.prototype.readBuffer = function () {
      var e = this.readUint();
      this.validate(e);
      var i = new t(this._bytes.buffer, this._bytes.byteOffset + this._pos, e);
      return i.stringTable = this.stringTable, i.version = this.version, this._pos += e, i;
    }, t.prototype.seek = function (t, e) {
      var i,
        o = this._pos;
      return this._pos = t, e < this.readByte() ? (1 == this.readByte() ? (this._pos += 2 * e, i = this.readUshort()) : (this._pos += 4 * e, i = this.readUint()), i > 0 ? (this._pos = t + i, !0) : (this._pos = o, !1)) : (this._pos = o, !1);
    }, t;
  }();
  t.ByteBuffer = e;
}(fgui || (fgui = {})), function (t) {
  var e = function () {
    function t(t, e, i, n) {
      this.matrix = new Array(o), this.reset(), void 0 === t && void 0 === e && void 0 === i && void 0 === n || this.adjustColor(t, e, i, n);
    }
    return t.prototype.reset = function () {
      for (var t = 0; t < o; t++) this.matrix[t] = i[t];
    }, t.prototype.invert = function () {
      this.multiplyMatrix([-1, 0, 0, 0, 255, 0, -1, 0, 0, 255, 0, 0, -1, 0, 255, 0, 0, 0, 1, 0]);
    }, t.prototype.adjustColor = function (t, e, i, o) {
      this.adjustHue(o || 0), this.adjustContrast(e || 0), this.adjustBrightness(t || 0), this.adjustSaturation(i || 0);
    }, t.prototype.adjustBrightness = function (t) {
      t = 255 * this.cleanValue(t, 1), this.multiplyMatrix([1, 0, 0, 0, t, 0, 1, 0, 0, t, 0, 0, 1, 0, t, 0, 0, 0, 1, 0]);
    }, t.prototype.adjustContrast = function (t) {
      var e = (t = this.cleanValue(t, 1)) + 1,
        i = 128 * (1 - e);
      this.multiplyMatrix([e, 0, 0, 0, i, 0, e, 0, 0, i, 0, 0, e, 0, i, 0, 0, 0, 1, 0]);
    }, t.prototype.adjustSaturation = function (t) {
      t = this.cleanValue(t, 1);
      var e = 1 - (t += 1),
        i = e * n,
        o = e * r,
        h = e * s;
      this.multiplyMatrix([i + t, o, h, 0, 0, i, o + t, h, 0, 0, i, o, h + t, 0, 0, 0, 0, 0, 1, 0]);
    }, t.prototype.adjustHue = function (t) {
      t = this.cleanValue(t, 1), t *= Math.PI;
      var e = Math.cos(t),
        i = Math.sin(t);
      this.multiplyMatrix([n + e * (1 - n) + i * -n, r + e * -r + i * -r, s + e * -s + i * (1 - s), 0, 0, n + e * -n + .143 * i, r + e * (1 - r) + .14 * i, s + e * -s + -.283 * i, 0, 0, n + e * -n + i * -(1 - n), r + e * -r + i * r, s + e * (1 - s) + i * s, 0, 0, 0, 0, 0, 1, 0]);
    }, t.prototype.concat = function (t) {
      t.length == o && this.multiplyMatrix(t);
    }, t.prototype.clone = function () {
      var e = new t();
      return e.copyMatrix(this.matrix), e;
    }, t.prototype.copyMatrix = function (t) {
      for (var e = o, i = 0; i < e; i++) this.matrix[i] = t[i];
    }, t.prototype.multiplyMatrix = function (t) {
      for (var e = [], i = 0, o = 0; o < 4; ++o) {
        for (var n = 0; n < 5; ++n) e[i + n] = t[i] * this.matrix[n] + t[i + 1] * this.matrix[n + 5] + t[i + 2] * this.matrix[n + 10] + t[i + 3] * this.matrix[n + 15] + (4 == n ? t[i + 4] : 0);
        i += 5;
      }
      this.copyMatrix(e);
    }, t.prototype.cleanValue = function (t, e) {
      return Math.min(e, Math.max(-e, t));
    }, t;
  }();
  t.ColorMatrix = e;
  var i = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    o = i.length,
    n = .299,
    r = .587,
    s = .114;
}(fgui || (fgui = {})), function (t) {
  var e = function () {
    function t() {
      this._readPos = 0, this._handlers = {}, this._handlers.url = this.onTag_URL, this._handlers.img = this.onTag_IMG, this._handlers.b = this.onTag_Simple, this._handlers.i = this.onTag_Simple, this._handlers.u = this.onTag_Simple, this._handlers.color = this.onTag_COLOR, this._handlers.size = this.onTag_SIZE;
    }
    return t.prototype.onTag_URL = function (t, e, i) {
      if (e) return o = "", this.linkColor && (o += "</color>"), this.linkUnderline && (o += "</u>"), o + "</on>";
      var o = void 0;
      return o = null != i ? '<on click="onClickLink" param="' + i + '">' : '<on click="onClickLink" param="' + this.getTagText() + '">', this.linkUnderline && (o += "<u>"), this.linkColor && (o += "<color=" + this.linkColor + ">"), o;
    }, t.prototype.onTag_IMG = function (t, e) {
      if (e) return null;
      var i = this.getTagText(!0);
      return i ? '<img src="' + i + '"/>' : null;
    }, t.prototype.onTag_Simple = function (t, e) {
      return e ? "</" + t + ">" : "<" + t + ">";
    }, t.prototype.onTag_COLOR = function (t, e, i) {
      return e ? "</color>" : (this.lastColor = i, "<color=" + i + ">");
    }, t.prototype.onTag_FONT = function (t, e, i) {
      return e ? "</font>" : '<font face="' + i + '">';
    }, t.prototype.onTag_SIZE = function (t, e, i) {
      return e ? "</size>" : (this.lastSize = i, "<size=" + i + ">");
    }, t.prototype.getTagText = function (t) {
      for (var e, i = this._readPos, o = ""; -1 != (e = this._text.indexOf("[", i));) {
        if (92 != this._text.charCodeAt(e - 1)) {
          o += this._text.substring(i, e);
          break;
        }
        o += this._text.substring(i, e - 1), o += "[", i = e + 1;
      }
      return -1 == e ? null : (t && (this._readPos = e), o);
    }, t.prototype.parse = function (t, e) {
      this._text = t, this.lastColor = null, this.lastSize = null;
      for (var i, o, n, r, s, h, a, l = 0, c = ""; -1 != (i = this._text.indexOf("[", l));) if (i > 0 && 92 == this._text.charCodeAt(i - 1)) c += this._text.substring(l, i - 1), c += "[", l = i + 1;else {
        if (c += this._text.substring(l, i), l = i, -1 == (i = this._text.indexOf("]", l))) break;
        n = "/" == this._text.charAt(l + 1), r = this._text.substring(n ? l + 2 : l + 1, i), this._readPos = i + 1, s = null, h = null, -1 != (o = r.indexOf("=")) && (s = r.substring(o + 1), r = r.substring(0, o)), r = r.toLowerCase(), null != (a = this._handlers[r]) ? null == (h = a.call(this, r, n, s)) || e || (c += h) : c += this._text.substring(l, this._readPos), l = this._readPos;
      }
      return l < this._text.length && (c += this._text.substr(l)), this._text = null, c;
    }, t.inst = new t(), t;
  }();
  t.UBBParser = e;
}(fgui || (fgui = {})), function (t) {
  var e = function () {
    function t() {}
    return t.startsWith = function (t, e, i) {
      return !(!t || t.length < e.length || (t = t.substring(0, e.length), i ? t.toLowerCase() != e.toLowerCase() : t != e));
    }, t.encodeHTML = function (t) {
      return t ? t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&apos;").replace(/"/g, "&quot;") : "";
    }, t.clamp = function (t, e, i) {
      return t < e ? t = e : t > i && (t = i), t;
    }, t.clamp01 = function (t) {
      return t > 1 ? t = 1 : t < 0 && (t = 0), t;
    }, t.lerp = function (t, e, i) {
      return t + i * (e - t);
    }, t.getTime = function () {
      return new Date().getMilliseconds() / 1e3;
    }, t.toGrayed = function (t) {
      var e = .299 * t.getR() + .587 * t.getG() + .114 * t.getB();
      return new cc.Color(e, e, e, t.getA());
    }, t.repeat = function (t, e) {
      return t - Math.floor(t / e) * e;
    }, t.distance = function (t, e, i, o) {
      return Math.sqrt(Math.pow(t - i, 2) + Math.pow(e - o, 2));
    }, t;
  }();
  t.ToolSet = e;
}(fgui || (fgui = {}));