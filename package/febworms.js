var febworms = febworms || {};
/**
 * Constructor for febworm Field types.
 * @param {string} type         Indicates the type of field
 * @param {object} properties   [optional] Initial property values
 * @param {object} renderInfo   [optional] Render information
 */
febworms.Field = function (type, properties, renderInfo) {
  this.name = this.type = type;

  if (properties) {
    angular.extend(this, properties);
  }

  this.displayName = this.displayName || this.type.charAt(0).toUpperCase() + this.type.substring(1);
  febworms.Field[type] = renderInfo || {};
};

angular.module('febworms', ['ngRoute', 'dq', 'templates-febworms']).constant('febwormsConfig', {
  enableDebugInfo: true,
  validation: {
    messages: {
      required: 'Field value is required.',
      minlength: 'Field value does not match the minimum length.',
      maxlength: 'Field value exceeds the maximum length.',
      pattern: 'The value "{{ field.state.$viewValue }}" does not match the required format.',
      email: 'The value "{{ field.state.$viewValue }}" is not a valid email address.',
      unique: 'The value "{{ field.state.$viewValue }}" is already in use.'
    }
  },
  fields: {
    templates: [
      new febworms.Field('text', {
        displayName: 'Textbox'
      }), 
      new febworms.Field('email'), 
      new febworms.Field('password'), 
      new febworms.Field('textarea'), 
      new febworms.Field('checkbox', {}, { hideLabel: true }), 
      new febworms.Field('checkboxlist', {
        displayName: 'Checkbox List',
        options: [
          { value: '1', text: 'Option 1' },
          { value: '2', text: 'Option 2' },
          { value: '3', text: 'Option 3' }
        ],
        value: {
          '1': true, '2': true
        }
      }), new febworms.Field('radiobuttonlist', {
        displayName: 'Radiobutton List',
        options: [
          { value: '1', text: 'Option 1' },
          { value: '2', text: 'Option 2' },
          { value: '3', text: 'Option 3' }
        ],
        value: '1'
      }), new febworms.Field('selectlist', {
        displayName: 'Select List',
        options: [
          { value: '1', text: 'Option 1' },
          { value: '2', text: 'Option 2' },
          { value: '3', text: 'Option 3' }
        ],
        value: '1'
      })
    ],
    categories: {
      'Text input fields': {
        'text': true, 'email': true, 'password': true, 'textarea': true
      },
      'Checkbox fields': { 'checkbox': true, 'checkboxlist': true },
      'Select input fields': { 'radiobuttonlist': true, 'selectlist': true }
    }
  }
});
angular.module('febworms').directive('febwormsBindExpression', function ($interpolate) {

  function buildWatchExpression(interpolateFn) {
    var sb = [];
    var parts = interpolateFn.parts;
    var ii = parts.length;

    while (ii--) {
      var part = parts[ii];

      if (part.exp && !part.exp.match(/^\s*$/)) {
        sb.push(part.exp);
      }
    }

    return '[' + sb.join() + ']';
  }

  return function (scope, element, attr) {

    var interpolateFn, watchHandle, oldWatchExpr;

    function cleanWatchHandle() {
      if (watchHandle) watchHandle();
      watchHandle = undefined;
    }

    function interpolateExpression() {
      element.text(interpolateFn(scope));
    }

    scope.$on('$destroy', function () {
      cleanWatchHandle();
    });

    scope.$watch(attr.febwormsBindExpression, function (value) {
      if (value !== undefined) {
        interpolateFn = $interpolate(value);

        element.addClass('ng-binding').data('$binding', interpolateFn);

        var watchExpr = buildWatchExpression(interpolateFn);

        if (oldWatchExpr !== watchExpr) {

          oldWatchExpr = watchExpr;

          cleanWatchHandle();

          watchHandle = scope.$watchCollection(watchExpr, function () {
            interpolateExpression();
          });
        } else {
          interpolateExpression();
        }
      }
    });
  };
});

angular.module('febworms').factory('febwormsUtils', function ($templateCache, $window, febwormsConfig) {

    var uniqueCounter = (+new Date) % 10000;

    return {
      defaultArea: 'default',
      getRenderInfo: function(field) {
        var renderInfo = febworms.Field[field.type];

        if(!renderInfo) {
          renderInfo = {};
          febworms.Field[field.type] = renderInfo;
        }

        if(!renderInfo.templateUrl) {
          renderInfo.templateUrl = this.getTemplateUrl(field);
        }

        if(!renderInfo.propertiesTemplateUrl) {
          renderInfo.propertiesTemplateUrl = this.getTemplateUrl(field, 'properties');
        }

        return renderInfo;
      },
      formatTemplateUrl: function (type, area) {
        return 'febworms/field-templates/' + (area || this.defaultArea) + '/' + type + '.tmpl.html';
      },
      getTemplateUrl: function (field, area) {

        area = area || this.defaultArea;

        // IE8 fix: Aliases removed
        // var templateType = febwormsConfig.fields.aliases[field.type] || field.type;
        var templateType = field.type;
        var templateUrl = this.formatTemplateUrl(templateType, area);

        var cached = $templateCache.get(templateUrl);

        if (!cached) {

          // Url is not in cache -- fallback to default area.
          // Properties area will never fallback to default area.

          if (area !== 'properties' && area !== this.defaultArea) {
            templateUrl = this.getTemplateUrl(field, this.defaultArea);
          } else {
            return this.formatTemplateUrl('not-in-cache');
          }
        }

        return templateUrl;
      },
      getUnique: function() {
        return ++uniqueCounter;
      },
      copyField: function(field) {
        var copy = angular.copy(field);
        copy.name = 'field' + this.getUnique();
        return copy;
      },
      findElementsByClass: function (root, className, recursive, buffer) {
        buffer = buffer || [];

        if (root.className === className) {
          buffer.push(root);
        }

        if (root.hasChildNodes()) {
          for (var i = 0; i < root.children.length; i++) {
            var child = root.children[i];
            if (child.className === className) {
              buffer.push(child);
            }
            if (recursive) {
              this.findElementsByClass(child, className, recursive, buffer);
            }
          }
        }

        return buffer;
      }
    };
  });
angular.module('febworms').filter('j$on',function () {
  return function (input, displayHidden) {

    if(displayHidden)
      return JSON.stringify(input || {}, null, '  ');

    return angular.toJson(input || {}, true);
  };
}).directive('jsonify', function ($window, $filter) {
    return {
      templateUrl: 'febworms/common/jsonify/jsonify.tmpl.html',
      replace: true,
      scope: {
        jsonify: "=",
        displayHidden: "@jsonifyDisplayHidden"
      },
      link: function($scope, $element, $attrs, ctrls) {
        $scope.expression = $attrs.jsonify;

        $scope.copy = function() {
          $window.prompt ("Copy to clipboard: Ctrl+C, Enter", $filter('j$on')($scope.jsonify, $scope.displayHidden));
        };
      }
    };
  });

angular.module('febworms').controller('febwormsTabsController', function($scope) {
  
  var self = this;
  this.panes = [];
  
  this.addPane = function(pane) {
    self.panes.push(pane);
    
    if(self.panes.length === 1) {
      self.active(pane);
    }
  };
  
  this.active = function(pane) {
    angular.forEach(self.panes, function(pane) {
      pane.active = false;
    });
    
    pane.active = true;
  };
});

angular.module('febworms').directive('febwormsTabs', function() {
  return {
    require: ['febwormsTabs'],
    restrict: 'EA',
    transclude: true,
    controller: 'febwormsTabsController',
    templateUrl: 'febworms/common/tabs/tabs.tmpl.html',
    link: function($scope, $element, $attrs, ctrls) {
      
      // This is done here since angular doesn't allow $ in the 'controller as'
      // syntax.
      
      $scope.$_tabCtrl = ctrls[0];
    }
  };
});




angular.module('febworms').controller('febwormsTabsPaneController', function($scope) {});
angular.module('febworms').directive('febwormsTabsPane', function(febwormsTabsPaneLinkFn) {
  return {
    require: ['febwormsTabsPane', '^febwormsTabs'],
    restrict: 'EA',
    scope: true,
    transclude: true,
    controller: 'febwormsTabsPaneController',
    templateUrl: 'febworms/common/tabs/tabs-pane.tmpl.html',
    link: febwormsTabsPaneLinkFn
  };
}).factory('febwormsTabsPaneLinkFn', function() {
  return function($scope, $element, $attrs, ctrls) {
    
    var paneCtrl = ctrls[0];
    var tabsCtrl = ctrls[1];
    
    // This is done here since angular doesn't allow $ in the 'controller as'
    // syntax.
  
    $scope.$_paneCtrl = paneCtrl;
    
    $attrs.$observe('febwormsTabsPane', function(value) {
      paneCtrl.title = value;  
    });
    
    tabsCtrl.addPane(paneCtrl);
  };
});

angular.module('dq', []).factory('dqUtils', function($window, $rootScope) {

  var _dragData = null;

  //noinspection FunctionWithInconsistentReturnsJS
  return {
    getEvent: function (e) {
      return e && e.originalEvent ? e.originalEvent : e || $window.event;
    },
    stopEvent: function (e) {
      // e.cancelBubble is supported by IE8 -
      // this will kill the bubbling process.
      e.cancelBubble = true;
      e.bubbles = false;
      
      // e.stopPropagation works in modern browsers
      if (e.stopPropagation) e.stopPropagation();
      if (e.preventDefault) e.preventDefault();

      return false;
    },
    dragData: function (data) {
      if (data === undefined) {
        return _dragData;
      }
      _dragData = data;
    },
    getParentArea: function ($scope) {
      var area = {};
      $scope.$emit('dqLocateArea', area);
      return area.name;
    },
    isAreaMatch: function ($scope) {
      var parentArea = this.getParentArea($scope);
      var eventArea = _dragData ? _dragData.area : "";

      return parentArea === eventArea;
    }
  };
});
angular.module('dq').directive('dqDragArea', function (dqUtils) {

  function evalBroadcastEvent($scope, args, areaName, expression) {
    if (expression && args && args.area === areaName) {
      $scope.$eval(expression);
    }
  }

  return {
    restrict: 'AEC',
    link: function ($scope, $element, $attrs) {

      var areaName = $attrs.dqDragArea || $attrs.dqDragAreaName || "";

      $scope.$on('dqDragBegin', function ($event, args) {
        evalBroadcastEvent($scope, args, areaName, $attrs.dqDragProgressBegin);
      });

      $scope.$on('dqDragEnd', function ($event, args) {
        evalBroadcastEvent($scope, args, areaName, $attrs.dqDragProgressEnd);
      });

      $scope.$on('dqLocateArea', function($event, args) {
        args.name = areaName;
        $event.stopPropagation();
      });
    }
  }
});

angular.module('dq').directive('dqDragEnter',function (dqDragTrack) {
  return {
    link: dqDragTrack
  };
}).directive('dqDragLeave',function (dqDragTrack) {
    return {
      link: dqDragTrack
    };
  }).directive('dqDragOver',function (dqDragTrack) {
    return {
      link: dqDragTrack
    };
  }).directive('dqDrop',function (dqDragTrack) {
    return {
      link: dqDragTrack
    };
  }).factory('dqDragTrack', function (dqUtils, $document) {

    // Combines both nq-drag-enter & nq-drag-leave & nq-drag-over

    return function ($scope, $element, $attrs) {

      // Tracking already set on the element?

      if ($element.data('dqDragTrack') !== true) {

        var trackingEnabled = false; // Toggled on drag-begin if the area name does not match the target
        var inbound = false; // Toggle to indicate if the dragging is in or outbound element
        var element = $element[0];
        var dropEffect = 'none'; // Drop effect used in the dragover event
        var doingLeaveDoubleCheck = false; // Toggle that indicates the body has a dragover event to do.

        var $body = $document.find('body');

        function dragLeaveDoubleCheck($e) {
          var e = dqUtils.getEvent($e);

          // Check if the drag over element is a child of the this element

          var target = e.target || $e.target;

          if (target !== element) {

            // TODO: we're not really checking if the target element is visually within the $element.

            if (!element.contains(target)) {

              // Drag over element is out of bounds

              dragLeaveForSure(true);
            }
          }

          // We're done with the expensive body call

          $body.off('dragover', dragLeaveDoubleCheck);

          // Notify the local element event callback there's no event listener on the body and the next event
          // can safely be cancelled.

          doingLeaveDoubleCheck = false;

          e.dataTransfer.dropEffect = dropEffect;

          // Always cancel the dragover -- otherwise the dropEffect is not used.

          return dqUtils.stopEvent($e);
        }

        function dragLeaveForSure(apply) {
          inbound = false;
          var expression = $attrs.dqDragLeave;
          if (expression) {
            if (apply) {
              $scope.$apply(function () {
                $scope.$eval(expression);
              });
            } else {
              $scope.$eval(expression);
            }
          }
        }

        $scope.$on('$destroy', function () {
          // Just to be sure
          $body.off('dragover', dragLeaveDoubleCheck);
        });

        $scope.$on('dqDragBegin', function () {
          // Check if we should track drag movements
          trackingEnabled = dqUtils.isAreaMatch($scope);
        });

        $scope.$on('dqDragEnd', function () {
          if (trackingEnabled) {
            // Gief cake
            dragLeaveForSure(false);
          }
        });

        $element.on('dragenter', function (e) {
          if (trackingEnabled && inbound === false) {
            inbound = true;
            var expression = $attrs.dqDragEnter;
            if (expression) {
              $scope.$apply(function () {
                $scope.$eval(expression);
              });
            }
          }
        });

        $element.on('dragleave', function () {
          if (trackingEnabled && inbound === true) {

            // dragleave is a lie -- hovering child elements will cause this event to trigger also.
            // We fake the cake by tracking the drag ourself.

            // Notify the "real" dragover event that he has to play nice with the body and not to
            // cancel the event chain.

            doingLeaveDoubleCheck = true;
            $body.on('dragover', dragLeaveDoubleCheck);
          }
        });

        //noinspection FunctionWithInconsistentReturnsJS
        $element.on('dragover', function ($e) {

          if (trackingEnabled) {

            var e = dqUtils.getEvent($e);

            var expression = $attrs.dqDragOver;
            var result;

            if (expression) {
              $scope.$apply(function () {
                result = $scope.$eval(expression);
              });
            }

            // The evaluated expression can indicate to cancel the drop

            dropEffect = result === false ? 'none' : 'copy';

            if (!doingLeaveDoubleCheck) {

              // There's no dragover queued on the body.
              // The event needs to be terminated here else the dropEffect will
              // not be applied (and dropping is not allowed).

              e.dataTransfer.dropEffect = dropEffect;
              return dqUtils.stopEvent($e);
            }
          }
        });

        //noinspection FunctionWithInconsistentReturnsJS
        $element.on('drop', function($e) {

          var e = dqUtils.getEvent($e);

          if(trackingEnabled) {
            var expression = $attrs.dqDrop;

            if(expression) {
              $scope.$apply(expression);
            }
          }

          return dqUtils.stopEvent($e);
        });

        // Ensure that we only do all this magic stuff on this element for one time only.

        $element.data('dqDragTrack', true);
      }
    };

  });

angular.module('dq').directive('dqDraggable', function (dqUtils, $rootScope) {

  function evalAndBroadcast(eventName, targetArea, $scope, expression, cb) {
    $scope.$apply(function () {
      var data = $scope.$eval(expression);

      var bcData = {
        area: targetArea,
        data: data
      };

      cb(bcData);

      $rootScope.$broadcast(eventName, bcData);
    });
  }

  return {
    restrict: 'AEC',
    link: function ($scope, $element, $attrs) {

      var targetArea = $attrs.dqDraggable || $attrs.dqDragTargetArea || "";
      var disabled = false;

      $scope.$watch($attrs.dqDragDisabled, function(value) {
        disabled = value;
        $element.attr('draggable', disabled ? 'false' : 'true');
      });

      $element.on('selectstart',function (e) {

        // Pure IE evilness

        if (!disabled && this.dragDrop) {
          this.dragDrop();
          e = dqUtils.getEvent(e);
          return dqUtils.stopEvent(e);
        }
      }).on('dragstart',function (e) {

          e = dqUtils.getEvent(e);

          if(disabled) {
            return dqUtils.stopEvent(e);
          }

          var dt = e.dataTransfer;
          dt.effectAllowed = 'all';
          dt.setData('Text', 'The cake is a lie!');

          evalAndBroadcast('dqDragBegin', targetArea, $scope, $attrs.dqDragBegin, function(dragData) {
            dqUtils.dragData(dragData);
          });

        }).on('dragend', function () {

          evalAndBroadcast('dqDragEnd', targetArea, $scope, $attrs.dqDragEnd, function() {
            dqUtils.dragData(null);
          });

        });
    }
  };

});
angular.module('febworms').controller('febwormsEditCanvasController', function ($scope, dqUtils, $timeout, febwormsUtils) {

  $scope.dragPlaceholder = {
    visible: false,
    index: 0
  };

  // - - - 8-< - - - - - - - - - - - - - - - - - - - - -
  // Drag & drop
  // - - - 8-< - - - - - - - - - - - - - - - - - - - - -

  this.dragEnter = function () {
    $scope.dragPlaceholder.visible = true;
    $scope.dragPlaceholder.index = $scope.schema.fields.length;
  };

  this.dragLeave = function () {
    $scope.dragPlaceholder.visible = false;
  };

  this.dragBeginCanvasField = function (index, field) {

    // Delay is set to prevent browser from copying adjusted html as copy image

    $timeout(function () {
      field.$_isDragging = true;
    }, 1);

    return { source: 'canvas', field: field, index: index };
  };

  this.dragEndCanvasField = function (field) {

    // IE Fix: ensure this is fired after the drag begin

    $timeout(function () {
      field.$_isDragging = false;
    }, 10);
  };

  this.drop = function () {

    var dragData = dqUtils.dragData();

    if (dragData && dragData.data) {

      var field = dragData.data.field;
      var source = dragData.data.source;
      var index = dragData.data.index;
      var fields = $scope.schema.fields;

      if (source == 'palette') {
        $scope.schemaCtrl.addField(field, $scope.dragPlaceholder.index);
      } else if (source == 'canvas') {
        $scope.schemaCtrl.moveField(index, $scope.dragPlaceholder.index);
        // fields.splice(index, 1);
        // fields.splice($scope.dragPlaceholder.index, 0, field);
      }

      // IE fix: not calling dragEnd sometimes
      field.$_isDragging = false;
    } else {
      throw Error('Drop without data');
    }
  };

});
angular.module('febworms').directive('febwormsEditCanvas', function() {

  return {
    require: ['^febwormsEdit', '^febwormsSchema'],
    templateUrl: 'febworms/edit/canvas/canvas.tmpl.html',
    controller: 'febwormsEditCanvasController as canvasCtrl',
    link: function($scope, $element, $attrs, ctrls) {
      $scope.editCtrl = ctrls[0];
      $scope.schemaCtrl = ctrls[1];

      // $scope.formModel = {}; // Dummy formModel for WYSIWYG pleasures
    }
  };
});

angular.module('febworms').directive('febwormsEditCanvasField', function() {

  return {
    replace: true,
    templateUrl: 'febworms/edit/canvas/field/field.tmpl.html'
  };

});
angular.module('febworms').controller('febwormsPropertyFieldOptionsController', function($scope) {

  var self = this;
  var optionCounter = 1;

  // Monitor for changes in the options array and ensure a
  // watch for every option value.
  // Watchers are deleted when removing options from the array.

  $scope.$watchCollection('field.options', function(options) {
    if (options) {
      angular.forEach(options, function(option) {
        if (!option.$_valueWatchFn) {
          option.$_valueWatchFn = $scope.$watch(function() {
            return option.value;
          }, handleValueChange);
        }
      });
    }
  });

  function handleValueChange(newValue, oldValue) {

    // Called by the watch collection
    // Ensure that when the selected value is changed, this
    // is synced to the field value.

    if (newValue !== oldValue) {
      if ($scope.multiple) {
        $scope.field.value[newValue] = $scope.field.value[oldValue];
        delete $scope.field.value[oldValue];
      } else {
        if (oldValue === $scope.field.value) {
          $scope.field.value = newValue;
        }
      }
    }
  }

  this.addOption = function() {

    if (!$scope.field.options) {
      $scope.field.options = [];
    }

    var option = {
      value: 'Option ' + optionCounter++
    };

    $scope.field.options.push(option);

    var count = $scope.field.options.length;

    if(!$scope.multiple && count === 1) {
      $scope.field.value = option.value;
    }

  };

  this.removeOption = function(index) {
    var options = $scope.field.options.splice(index, 1);

    if (options && options.length) {

      var option = options[0];

      if ($scope.multiple) {

        if($scope.field.value[option.value] !== undefined)
          delete $scope.field.value[option.value];

      } else {

        if (option.value === $scope.field.value && $scope.field.options.length) {
          $scope.field.value = $scope.field.options[0].value;
        }

        option.$_valueWatchFn();
      }
    }
  };

});
angular.module('febworms').directive('febwormsPropertyFieldOptions', function(febwormsPropertyFieldOptionsLinkFn) {
  return {
    scope: true,
    controller: 'febwormsPropertyFieldOptionsController as optionsCtrl',
    templateUrl: 'febworms/edit/canvas/field/properties/options/options.tmpl.html',
    link: febwormsPropertyFieldOptionsLinkFn
  };
}).factory('febwormsPropertyFieldOptionsLinkFn', function() {
  return function($scope, $element, $attrs, ctrls) {

    $scope.multiple = false;

    $attrs.$observe('febwormsPropertyFieldOptions', function(value) {
      if(value === 'multiple') {
        $scope.multiple = true;
      }
    });
  };
});
angular.module('febworms').directive('febwormsEditCanvasFieldProperties', function (febwormsUtils) {
  return {
    templateUrl: 'febworms/edit/canvas/field/properties/properties.tmpl.html',
    replace: true,
    scope: {
      field: '=febwormsEditCanvasFieldProperties'
    },
    link: function ($scope, $element, $attrs, ctrls) {

      $scope.$watch('fieldPropertiesForm.$invalid', function (newValue) {
        $scope.field.$_invalid = newValue;
      });

      $scope.renderInfo = febwormsUtils.getRenderInfo($scope.field);
    }
  };
});

angular.module('febworms').directive('febwormsPropertyFieldCommon', function(febwormsPropertyFieldCommonLinkFn) {
  return {
    restrict: 'AE',
    templateUrl: 'febworms/edit/canvas/field/properties/property-field/common.tmpl.html',
    link: febwormsPropertyFieldCommonLinkFn
  };
}).factory('febwormsPropertyFieldCommonLinkFn', function() {
  return function($scope, $element, $attrs, ctrls) {

    $scope.fields = {
      fieldname: false,
      displayname: false,
      placeholder: false
    };

    $scope.$watch($attrs['febwormsPropertyFieldCommon'], function(value) {
      $scope.fields = angular.extend($scope.fields, value);
    });
  };
});
angular.module('febworms').directive('febwormsPropertyField', function(febwormsPropertyFieldLinkFn) {

  return {
    restrict: 'AE',
    templateUrl: 'febworms/edit/canvas/field/properties/property-field/property-field.tmpl.html',
    transclude: true,
    scope: true,
    link: febwormsPropertyFieldLinkFn
  };

}).factory('febwormsPropertyFieldLinkFn', function() {
  return function($scope, $element, $attrs, ctrls) {
    
    $attrs.$observe('febwormsPropertyField', function(value) {
      $scope.fieldName = value;
    });

    $attrs.$observe('febwormsPropertyFieldLabel', function(value) {
      if(value) {
        $scope.fieldLabel = value;
      }
    });

  };
});
angular.module('febworms').controller('febwormsEditController', function($scope, febwormsUtils, $location) {

  var self = this;

  $scope.preview = $location.search().preview;

  this.setMetaForm = function(metaForm) {
    self.metaForm = metaForm;
  };

  this.togglePreview = function() {
    $scope.preview = !$scope.preview;
  };

  $scope.$watch(function() {

    var schema = $scope.schemaCtrl.model();

    // Seems that this watch is sometimes fired after the scope has been destroyed(?)
    
    if (schema) { 
      schema.$_invalid = self.metaForm ? self.metaForm.$invalid : false;

      if (!schema.$_invalid) {

        var fields = schema.fields;

        if (fields) {

          var i = fields.length;

          while (--i >= 0 && !schema.$_invalid) {
            schema.$_invalid = fields[i].$_invalid;
          };
        }
      }
    }
  });

});
angular.module('febworms').directive('febwormsEdit', function() {
  return {
    priority: 100,
    require: 'febwormsSchema',
    restrict: 'AE',
    scope: {
      // // The schema model to edit
      schema: '=?febwormsSchema',
      // Boolean indicating wether to show the default form action buttons
      actionsEnabled: '=?febwormsActionsEnabled',
      // Callback function when the user presses save -- any argument named 'schema' is set to the schema model.
      onSave: '&febwormsOnSave',
      // Callback function when the user presses cancel -- any argument named 'schema' is set to the schema model.
      onCancel: '&febwormsOnCancel',
      // Boolean indicating wether the edit is in preview mode or not
      preview: '=?febwormsPreview'
    },
    replace: true, 
    controller: 'febwormsEditController as editCtrl',
    templateUrl: 'febworms/edit/edit.tmpl.html',
    link: function($scope, $element, $attrs, schemaCtrl) {
      
      if($scope.schema === undefined) {
        $scope.schema = {};
      }

      if($scope.actionsEnabled === undefined) {
        $scope.actionsEnabled = true;
      }

      if($scope.preview === undefined) {
        $scope.preview = false;
      }

      schemaCtrl.model($scope.schema);
      $scope.schemaCtrl = schemaCtrl;
    }
  }
});
angular.module('febworms').directive('febwormsEditFormActions', function(febwormsConfig) {

  return {
    require: '^febwormsEdit',
    templateUrl: 'febworms/edit/form-actions/form-actions.tmpl.html',
    link: function($scope, $element, $attrs, febwormsEditController) {

      $scope.debugInfoEnabled = febwormsConfig.enableDebugInfo;

      $scope.togglePreview = function() {
        if(!$scope.schema.$_invalid) {
          febwormsEditController.togglePreview();
        }
      };

      $scope.handleSave = function() {
        if(!$scope.schema.$_invalid) {
          $scope.onSave({ schema: $scope.schema });
        }
      };

      $scope.handleCancel = function() {
        $scope.onCancel({ schema: $scope.schema });
      };

    }
  };
});
angular.module('febworms').directive('febwormsEditMeta', function() {
  return {
    // By requiring the schema controller we ensure that the schema is on the scope
    require: ['^febwormsEdit', '^febwormsSchema'],
    restrict: 'AE',
    templateUrl: 'febworms/edit/meta/meta.tmpl.html',
    link: function($scope, $element, $attrs, ctrls) {

      editCtrl = ctrls[0];

      var formController = $element.find('form').controller('form');
      editCtrl.setMetaForm(formController);
      
    }
  };
});

angular.module('febworms').controller('febwormsEditPaletteCategoriesController', function($scope, febwormsConfig) {

  $scope.categories = febwormsConfig.fields.categories;

  $scope.setCategory = function(name, category) {
    $scope.categoryName = name;
    $scope.category = category;
  };

  if(!$scope.category) {
    //noinspection LoopStatementThatDoesntLoopJS
    for (var name in $scope.categories) {
      //noinspection JSUnfilteredForInLoop
      $scope.setCategory(name, $scope.categories[name]);
      break;
    }
  }
});
angular.module('febworms').directive('febwormsEditPaletteCategories', function () {
  return {
    templateUrl: 'febworms/edit/palette/categories/categories.tmpl.html',
    require: '^febwormsEditPalette',
    scope: {
      category: "=?"
    },
    controller: 'febwormsEditPaletteCategoriesController'
  };
});
angular.module('febworms').controller('febwormsEditPaletteController', function ($scope, febwormsConfig) {

  $scope.templates = angular.copy(febwormsConfig.fields.templates);

  var count = 0;

  $scope.templateFilter = function (template) {
    return !$scope.selectedCategory || $scope.selectedCategory[template.type];
  };

});
angular.module('febworms').directive('febwormsEditPalette',function () {
  return {
    require: ['^febwormsSchema'],
    templateUrl: 'febworms/edit/palette/palette.tmpl.html',
    controller: 'febwormsEditPaletteController',
    link: function($scope, $element, $attrs, ctrls) {
      $scope.schemaCtrl = ctrls[0];
    }
  };
});
angular.module('febworms').controller('febwormsFieldController', function($scope, febwormsUtils) {

  var self = this;
  var _form, _field;

  this.init = function(febwormsFormCtrl, fieldSchema, editMode) {
    
    self.initForm(febwormsFormCtrl);
    self.initField(fieldSchema);
    self.initDefaultData(fieldSchema, editMode);

    $scope.form = _form;
    $scope.field = _field;
    
  };

  this.initForm = function(febwormsFormCtrl) {
    _form = febwormsFormCtrl ? febwormsFormCtrl.model : {};

    return _form;
  };

  this.initField = function(fieldSchema) {

    _field = {
      $_id: 'id' + febwormsUtils.getUnique(),
      schema: fieldSchema
    };

    $scope.$watch('field.schema.name', function(value, oldValue) {
      self.registerState(value);
    });

    return _field;
  };

  this.initDefaultData = function(fieldSchema, editMode) {

    var fieldName = fieldSchema.name;

    _form.data = _form.data || {};
    
    if (editMode) {
      
      $scope.$watch('field.schema.value', function(value) {
        _form.data[fieldSchema.name] = value;
      });

      $scope.$watch('field.schema.name', function(value, oldValue) {
        if(value !== oldValue) {
          var data = _form.data[oldValue];
          delete _form.data[oldValue];
          _form.data[value] = data;
        }
      });

    } else if (_form.data && _form.data[fieldName] === undefined && fieldSchema.value !== undefined) {
      _form.data[fieldName] = fieldSchema.value;
    }

    return _form.data;
  };

  this.setFieldState = function(state) {
    // Called by the field-input directive
    _field.state = state;
    self.registerState(_field.schema.name);
  };

  this.registerState = function(fieldName) {
    // Re-register the ngModelCtrl with the form controller
    // whenever the name of the field has been modified.

    if (_form.state && _field.state) {
      _form.state.$removeControl(_field.state);
      _field.state.$name = fieldName;
      _form.state.$addControl(_field.state);
    }

    _field.name = fieldName;

  };

  this.field = function() {
    return _field;
  };

  this.form = function() {
    return _form;
  };
});
angular.module('febworms').directive('febwormsField', function(febwormsFieldLinkFn) {

  return {
    require: ['^?febwormsForm', 'febwormsField'],
    replace: true,
    templateUrl: 'febworms/form/field/field.tmpl.html',
    scope: {
      fieldSchema: '=febwormsField', // The schema definition of the field
      tabIndex: '=?febwormsTabIndex', // Optional tab index -- used in overlay mode to disable focus
      editMode: '=?febwormsEditMode', // Indicates edit mode, which will sync the fieldSchema.value 
      // to the form data for WYSIWYG pleasures.
      noValidationSummary: '=febwormsNoValidationSummary' // If true hides the validation summary
    },
    controller: 'febwormsFieldController',
    link: febwormsFieldLinkFn
  };

}).factory('febwormsFieldLinkFn', function(febwormsUtils) {
  return function($scope, $element, $attrs, ctrls) {

    var febwormsFormCtrl = ctrls[0];
    var febwormsFieldCtrl = ctrls[1];

    if ($scope.tabIndex === undefined) {
      $scope.tabIndex = 'auto';
    }

    $scope.renderInfo = febwormsUtils.getRenderInfo($scope.fieldSchema);

    febwormsFieldCtrl.init(febwormsFormCtrl, $scope.fieldSchema, $scope.editMode);
  };
});
angular.module('febworms').directive('febwormsFieldInput', function(febwormsFieldInputLinkFn) {
  return {
    require: ['^febwormsField', 'ngModel'],
    link: febwormsFieldInputLinkFn
  };
}).factory('febwormsFieldInputLinkFn', function() {
  return function($scope, $element, $attrs, ctrls) {

    var febwormsFieldCtrl = ctrls[0];
    var ngModelCtrl = ctrls[1];

    febwormsFieldCtrl.setFieldState(ngModelCtrl);
  };
});
angular.module('febworms').controller('febwormsFormController', function($scope, $parse) {

  this.model = {};
  var self = this;

  this.init = function(dataExpression, schema, state) {
    // Called by the directive
    
    var dataGetter = $parse(dataExpression);
    var dataSetter = dataGetter.assign;

    $scope.$watch(dataGetter, function(value) {
      if(value === undefined) {
        value = {};

        if(dataSetter) {
          dataSetter($scope, value);
        }
      }

      self.model.data = value;
    });

    $scope.$watch(function() {
      return schema.model();
    }, function(value) {
      if(value === undefined) {
        schema.model({});
      } else {
        self.model.schema = value;
      }
    });

    self.model.state = state;

    
    return self.model;
  };
  
});

angular.module('febworms').directive('febwormsForm', function(febwormsFormCompileFn) {
  return {
    restrict: 'AE',
    require: ['^?form', 'febwormsForm', '^febwormsSchema'],
    controller: 'febwormsFormController',
    scope: true,
    compile: febwormsFormCompileFn
  };
}).factory('febwormsFormLinkFn', function() {
    return function link($scope, $element, $attrs, ctrls) {

      var ngFormCtrl = ctrls[0];
      var formCtrl = ctrls[1];
      var schemaCtrl = ctrls[2];

      formCtrl.init($attrs.febwormsFormData, schemaCtrl, ngFormCtrl);
      
    };
}).factory('febwormsFormCompileFn', function(febwormsFormLinkFn) {
  return function($element, $attrs) {

    var noRender = $attrs.febwormsNoRender;
    
    if (noRender !== 'true') {
      var renderTemplate = '<div febworms-form-fields></div>';
      $element.append(renderTemplate);
    }
    
    return febwormsFormLinkFn;
  };
});


angular.module('febworms').directive('febwormsFormFields', function() {

  return {
    require: ['^febwormsForm'],
    restrict: 'AE',
    templateUrl: 'febworms/form/form-fields/form-fields.tmpl.html',
    scope: {},
    link: function($scope, $element, $attrs, ctrls) {

      var febwormsForm = ctrls[0];

      $scope.$watch(function() {
        return febwormsForm.model;
      }, function(value) {
        $scope.form = value;
      });
    }
  };

});
angular.module('febworms').controller('febwormsSchemaController', function($scope, febwormsUtils) {

  var _model, self = this;

  this.model = function(value) {
    if(value !== undefined) {
      _model = value;

      if(!angular.isArray(value.fields)) {
        value.fields = [];
      }
    }
    
    return _model;
  };

  this.addField = function(field, index) {

    var copy = febwormsUtils.copyField(field);

    index = index === undefined ? _model.fields.length : index;
    _model.fields.splice(index, 0, copy);

  };

  this.removeField = function(index) {
    _model.fields.splice(index, 1);
  };

  this.swapFields = function(idx1, idx2) {
    if (idx1 <= -1 || idx2 <= -1 || idx1 >= _model.fields.length || idx2 >= _model.fields.length) {
      return;
    }

    _model.fields[idx1] = _model.fields.splice(idx2, 1, _model.fields[idx1])[0];
  };

  this.moveField = function(fromIdx, toIdx) {
    if (fromIdx >= 0 && toIdx <= _model.fields.length && fromIdx !== toIdx) {
      var field = _model.fields.splice(fromIdx, 1)[0];
      if (toIdx > fromIdx)--toIdx;
      _model.fields.splice(toIdx, 0, field);
    }
  };

});
angular.module('febworms').directive('febwormsSchema', function(febwormsSchemaLinkFn) {

  return {
    require: ['febwormsSchema'],
    controller: 'febwormsSchemaController',
    link: febwormsSchemaLinkFn
  };

}).factory('febwormsSchemaLinkFn' , function($parse) {
  return function($scope, $element, $attrs, ctrls) {
    var schemaCtrl = ctrls[0];

    var getModel = $parse($attrs.febwormsSchema);
    var setModel = getModel.assign;

    var model = getModel($scope);

    schemaCtrl.model(model);

    $scope.$watch(function() {
      return schemaCtrl.model();
    }, function(value) {
      setModel($scope, value);
    });
  };
});


angular.module('febworms').directive('febwormsValidationSummary', function(febwormsValidationSummaryLinkFn) {

  return {
    require: ['^?febwormsField', '^?form'],
    templateUrl: 'febworms/validation/summary.tmpl.html',
    scope: {
      fieldName: '@?febwormsValidationSummary',
      validationMessages: '=?febwormsValidationMessages'
    },
    link: febwormsValidationSummaryLinkFn
  };
}).factory('febwormsValidationSummaryLinkFn', function(febwormsConfig) {

  return function($scope, $element, $attrs, ctrls) {

    var febwormsFieldCtrl = ctrls[0];
    var ngFormController = ctrls[1];

    if (febwormsFieldCtrl) {
      // Grab the whole field state from the field controller
      $scope.field = febwormsFieldCtrl.field();
    } else if (ngFormController) {
      
      $scope.$watch('fieldName', function(value) {
        $scope.field = {
          name: value,
          state: ngFormController[value]
        };
      });

    }

    $scope.messages = angular.extend({}, febwormsConfig.validation.messages, $scope.validationMessages)
  };

});
angular.module('febworms').directive('febwormsUniqueFieldName', function () {

  var changeTick = 0;

  function validate(ngModelCtrl, schemaCtrl, field) {
    
    var schema = schemaCtrl.model();
    var valid = true;
    var schemaField;

    if(schema) {

      var fields = schema.fields;

      for (var i = 0; i < fields.length; i++) {
        schemaField = fields[i];
        if (schemaField !== field && field.name === schemaField.name) {
          valid = false;
          break;
        }
      }
    }

    ngModelCtrl.$setValidity('unique', valid);
  }

  return {
    priority: 100,
    require: ['ngModel', '^febwormsSchema'],
    link: function ($scope, $element, $attrs, ctrls) {

      var ngModelCtrl = ctrls[0];
      var schemaCtrl = ctrls[1];
      
      var field = $scope.field;

      if(!field) {
        throw Error('No field property on scope');
      }

      $scope.$watch(function() { return ngModelCtrl.$modelValue; }, function () {
        
        // Every instance of this directive will increment changeTick
        // whenever the name of the associated field is modified.

        ++changeTick;
      });

      $scope.$watch(function() { return changeTick; }, function() {

        // Every instance of this directive will fire off the validation
        // whenever the changeTick has been modifed.

        validate(ngModelCtrl, schemaCtrl, field);
      });
    }
  };
});

angular.module('templates-febworms', ['febworms/common/jsonify/jsonify.tmpl.html', 'febworms/common/tabs/tabs-pane.tmpl.html', 'febworms/common/tabs/tabs.tmpl.html', 'febworms/edit/canvas/canvas.tmpl.html', 'febworms/edit/canvas/field/field.tmpl.html', 'febworms/edit/canvas/field/properties/options/options.tmpl.html', 'febworms/edit/canvas/field/properties/properties.tmpl.html', 'febworms/edit/canvas/field/properties/property-field/common.tmpl.html', 'febworms/edit/canvas/field/properties/property-field/property-field.tmpl.html', 'febworms/edit/edit.tmpl.html', 'febworms/edit/form-actions/form-actions.tmpl.html', 'febworms/edit/meta/meta.tmpl.html', 'febworms/edit/palette/categories/categories.tmpl.html', 'febworms/edit/palette/palette.tmpl.html', 'febworms/field-templates/default/checkbox.tmpl.html', 'febworms/field-templates/default/checkboxlist.tmpl.html', 'febworms/field-templates/default/email.tmpl.html', 'febworms/field-templates/default/not-in-cache.tmpl.html', 'febworms/field-templates/default/password.tmpl.html', 'febworms/field-templates/default/radiobuttonlist.tmpl.html', 'febworms/field-templates/default/selectlist.tmpl.html', 'febworms/field-templates/default/text.tmpl.html', 'febworms/field-templates/default/textarea.tmpl.html', 'febworms/field-templates/properties/checkbox.tmpl.html', 'febworms/field-templates/properties/checkboxlist.tmpl.html', 'febworms/field-templates/properties/email.tmpl.html', 'febworms/field-templates/properties/password.tmpl.html', 'febworms/field-templates/properties/radiobuttonlist.tmpl.html', 'febworms/field-templates/properties/selectlist.tmpl.html', 'febworms/field-templates/properties/text.tmpl.html', 'febworms/field-templates/properties/textarea.tmpl.html', 'febworms/form/field/field.tmpl.html', 'febworms/form/form-fields/form-fields.tmpl.html', 'febworms/validation/summary.tmpl.html']);

angular.module("febworms/common/jsonify/jsonify.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("febworms/common/jsonify/jsonify.tmpl.html",
    "<div class=\"jsonify\">\n" +
    "    <div class=\"jsonify-label\">\n" +
    "    	{{ expression }}:\n" +
    "    	<i class=\"jsonify-button icon-share\" ng-click=\"copy()\"></i>\n" +
    "    	<i class=\"jsonify-button {{ displayHidden && 'icon-eye-open' || 'icon-eye-close' }}\" ng-click=\"displayHidden = !displayHidden\"></i>\n" +
    "	</div>\n" +
    "    <pre>{{ jsonify | j$on:displayHidden }}</pre>\n" +
    "</div>");
}]);

angular.module("febworms/common/tabs/tabs-pane.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("febworms/common/tabs/tabs-pane.tmpl.html",
    "<div class=\"febworms-tabs-pane\" ng-show=\"$_paneCtrl.active\" ng-transclude>\n" +
    "</div>");
}]);

angular.module("febworms/common/tabs/tabs.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("febworms/common/tabs/tabs.tmpl.html",
    "<div class=\"febworms-tabs tabbable\">\n" +
    "  <ul class=\"nav nav-tabs\">\n" +
    "    <li ng-repeat=\"pane in $_tabCtrl.panes\" ng-class=\"{ active: pane.active }\">\n" +
    "      <a href=\"\" ng-click=\"$_tabCtrl.active(pane)\"> {{ pane.title }}</a>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "  <div class=\"tab-content\" ng-transclude></div>\n" +
    "</div>");
}]);

angular.module("febworms/edit/canvas/canvas.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("febworms/edit/canvas/canvas.tmpl.html",
    "<div class=\"febworms-edit-canvas\">\n" +
    "    <div class=\"form-horizontal\">\n" +
    "        <fieldset>\n" +
    "            <legend>Canvas</legend>\n" +
    "            <div class=\"febworms-edit-canvas-area\"\n" +
    "                 dq-drag-area=\"febworms-edit-canvas\"\n" +
    "                 dq-drag-enter=\"canvasCtrl.dragEnter()\"\n" +
    "                 dq-drag-leave=\"canvasCtrl.dragLeave()\"\n" +
    "                 dq-drop=\"canvasCtrl.drop()\">\n" +
    "                <div ng-if=\"!(schema.fields.length)\">\n" +
    "                    <div ng-if=\"!dragPlaceholder.visible\" class=\"febworms-edit-canvas-area-empty alert alert-info text-center\">\n" +
    "                        <p class=\"febworms-edit-canvas-area-empty-x\">X</p>\n" +
    "                        <p class=\"lead hidden-phone\"><strong>Drag</strong> one of the available <strong>templates</strong> from the\n" +
    "                            <strong>palette</strong> onto this <strong>canvas</strong>.</p>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div ng-repeat=\"field in schema.fields\">\n" +
    "                    <div ng-if=\"dragPlaceholder.visible && dragPlaceholder.index === $index\"\n" +
    "                         class=\"febworms-drag-placeholder\"></div>\n" +
    "                    <div febworms-edit-canvas-field></div>\n" +
    "                </div>\n" +
    "                <div ng-if=\"dragPlaceholder.visible && dragPlaceholder.index == schema.fields.length\" class=\"febworms-drag-placeholder\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </fieldset>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("febworms/edit/canvas/field/field.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("febworms/edit/canvas/field/field.tmpl.html",
    "<div class=\"febworms-field febworms-field-{{ field.type }} febworms-edit-canvas-field\"\n" +
    "     ng-class=\"{ 'error': field.$_invalid, 'dragging': field.$_isDragging }\"\n" +
    "     dq-draggable=\"febworms-edit-canvas\"\n" +
    "     dq-drag-disabled=\"dragEnabled === false\"\n" +
    "     dq-drag-begin=\"canvasCtrl.dragBeginCanvasField($index, field)\"\n" +
    "     dq-drag-end=\"canvasCtrl.dragEndCanvasField(field)\">\n" +
    "    <div class=\"control-group\">\n" +
    "        <div class=\"febworms-field-overlay\" \n" +
    "             ng-mouseenter=\"dragEnabled = true\"  \n" +
    "             ng-mouseleave=\"dragEnabled = false\">\n" +
    "            <div class=\"febworms-field-overlay-drag-top\" dq-drag-enter=\"dragPlaceholder.index = $index\"></div>\n" +
    "            <div class=\"febworms-field-overlay-drag-bottom\" dq-drag-enter=\"dragPlaceholder.index = ($index + 1)\"></div>\n" +
    "            <div class=\"btn-toolbar btn-toolbar-left\">\n" +
    "                <button class=\"btn btn-mini\" type=\"button\"\n" +
    "                        ng-click=\"field.$_displayProperties = !field.$_displayProperties\">Properties\n" +
    "                </button>\n" +
    "            </div>\n" +
    "            <div class=\"btn-toolbar btn-toolbar-right\">\n" +
    "                <button class=\"btn btn-mini\" type=\"button\"\n" +
    "                        ng-click=\"schemaCtrl.swapFields($index - 1, $index)\"\n" +
    "                        ng-disabled=\"$index === 0\">\n" +
    "                    Up\n" +
    "                </button>\n" +
    "                <button class=\"btn btn-mini\" type=\"button\"\n" +
    "                        ng-click=\"schemaCtrl.swapFields($index, $index + 1)\"\n" +
    "                        ng-disabled=\"$index === schema.fields.length - 1\">\n" +
    "                    Down\n" +
    "                </button>\n" +
    "                <button class=\"btn btn-mini\" type=\"button\" ng-click=\"schemaCtrl.removeField($index)\">\n" +
    "                    Remove\n" +
    "                </button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div febworms-field=\"field\"\n" +
    "             febworms-tab-index=\"-1\" \n" +
    "             febworms-edit-mode=\"true\"\n" +
    "             febworms-no-validation-summary=\"true\"></div>\n" +
    "    </div>\n" +
    "    <div febworms-edit-canvas-field-properties=\"field\"\n" +
    "         ng-show=\"field.$_displayProperties\"></div>\n" +
    "</div>");
}]);

angular.module("febworms/edit/canvas/field/properties/options/options.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("febworms/edit/canvas/field/properties/options/options.tmpl.html",
    "<div ng-if=\"!field.options || field.options.length === 0\" ng-click=\"optionsCtrl.addOption()\" class=\"alert alert-info\">\n" +
    "    <h2>No options defined</h2>\n" +
    "    <p class=\"lead\">Click here to add a new option definition to this field.</p>\n" +
    "</div>\n" +
    "\n" +
    "<table ng-if=\"field.options.length > 0\" class=\"table table-field-options\">\n" +
    "    <thead>\n" +
    "        <tr>\n" +
    "            <th></th>\n" +
    "            <th>Value</th>\n" +
    "            <th>Text</th>\n" +
    "            <th>\n" +
    "                <a href=\"\" class=\"btn btn-mini\" ng-click=\"optionsCtrl.addOption()\" title=\"Add a new option to the list\"><i class=\"icon-plus\"></i></a>\n" +
    "            </th>\n" +
    "            <th class=\"table-field-options-padding\"></th>\n" +
    "        </tr>\n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "        <tr ng-form=\"fieldOptionForm\" ng-repeat=\"option in field.options\" ng-class=\"{ 'error': fieldOptionForm.$invalid }\">\n" +
    "            <td ng-if=\"multiple === false\">\n" +
    "                <input type=\"radio\" name=\"{{ field.name }}selection[]\" value=\"{{ option.value }}\" ng-model=\"field.value\" />\n" +
    "            </td>\n" +
    "            <td ng-if=\"multiple === true\">\n" +
    "                <input type=\"checkbox\" name=\"{{ field.name }}selection[]\" value=\"{{ option.value }}\" ng-model=\"field.value[option.value]\" />\n" +
    "            </td>\n" +
    "            <td>\n" +
    "                <input type=\"text\" name=\"optionValue\" ng-model=\"option.value\" ng-required=\"true\" />\n" +
    "            </td>\n" +
    "            <td>\n" +
    "                <input type=\"text\" ng-model=\"option.text\" />\n" +
    "            </td>\n" +
    "            <td>\n" +
    "                <a href=\"\" class=\"btn btn-mini\" ng-click=\"optionsCtrl.removeOption($index)\" title=\"Remove this option from the list\"><i class=\"icon-trash\"></i></a>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "    </tbody>\n" +
    "</table>\n" +
    "");
}]);

angular.module("febworms/edit/canvas/field/properties/properties.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("febworms/edit/canvas/field/properties/properties.tmpl.html",
    "<div class=\"febworms-field-properties\">\n" +
    "    <form novalidate class=\"form-horizontal\" name=\"fieldPropertiesForm\">\n" +
    "\n" +
    "        <div ng-include=\"renderInfo.propertiesTemplateUrl\"></div>\n" +
    "\n" +
    "        <div class=\"control-group\">\n" +
    "            <div class=\"controls\">\n" +
    "                <label class=\"checkbox\">\n" +
    "                    <input type=\"checkbox\" ng-model=\"field.$_debug\"> Display field debug information\n" +
    "                </label>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div ng-if=\"field.$_debug\" data-jsonify=\"field\"></div>\n" +
    "\n" +
    "    </form>\n" +
    "</div>");
}]);

angular.module("febworms/edit/canvas/field/properties/property-field/common.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("febworms/edit/canvas/field/properties/property-field/common.tmpl.html",
    "<!-- fieldName -->\n" +
    "<div ng-if=\"fields.fieldname\">\n" +
    "  <div febworms-property-field=\"fieldName\" febworms-property-field-label=\"Name\">\n" +
    "    <input type=\"text\"\n" +
    "           name=\"fieldName\"\n" +
    "           ng-model=\"field.name\"\n" +
    "           ng-required=\"true\"\n" +
    "           ng-pattern=\"/^[a-zA-Z]([\\w]+)?$/\"\n" +
    "           febworms-unique-field-name/>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<!-- displayName -->\n" +
    "<div ng-if=\"fields.displayname\">\n" +
    "  <div febworms-property-field=\"displayName\" febworms-property-field-label=\"Display name\">\n" +
    "    <input type=\"text\" name=\"displayName\" ng-model=\"field.displayName\"/>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<!-- placeholder -->\n" +
    "<div ng-if=\"fields.placeholder\">\n" +
    "  <div febworms-property-field=\"fieldPlaceholder\" febworms-property-field-label=\"Placeholder text\">\n" +
    "    <input type=\"text\"\n" +
    "             name=\"fieldPlaceholder\"\n" +
    "             ng-model=\"field.placeholder\"/>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("febworms/edit/canvas/field/properties/property-field/property-field.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("febworms/edit/canvas/field/properties/property-field/property-field.tmpl.html",
    "<div class=\"control-group\" ng-class=\"{ 'error': fieldPropertiesForm[fieldName].$invalid }\">\n" +
    "    <label class=\"control-label\">{{ fieldLabel }}</label>\n" +
    "    <div class=\"controls\">\n" +
    "        <div ng-transclude></div>\n" +
    "        <div febworms-validation-summary=\"{{ fieldName }}\"></div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("febworms/edit/edit.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("febworms/edit/edit.tmpl.html",
    "<div class=\"febworms-edit\">\n" +
    "\n" +
    "    <div ng-if=\"preview\" ng-init=\"previewForm = { data: {} }\">\n" +
    "        <form name=\"previewForm.state\"\n" +
    "              febworms-form \n" +
    "              febworms-form-data=\"previewForm.data\"\n" +
    "              class=\"form-horizontal\"\n" +
    "              novalidate>\n" +
    "        </form>\n" +
    "\n" +
    "        <div febworms-edit-form-actions></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"!preview\">\n" +
    "\n" +
    "        <div febworms-edit-meta>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row-fluid\">\n" +
    "            <div class=\"span8\">\n" +
    "                <div febworms-form\n" +
    "                     febworms-no-render=\"true\"\n" +
    "                     febworms-edit-canvas></div>\n" +
    "            </div>\n" +
    "            <div class=\"span4\">\n" +
    "                <div febworms-edit-palette\n" +
    "                     febworms-form\n" +
    "                     febworms-no-render=\"true\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div febworms-edit-form-actions></div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("febworms/edit/form-actions/form-actions.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("febworms/edit/form-actions/form-actions.tmpl.html",
    "<div ng-if=\"actionsEnabled\" class=\"febworms-edit-form-actions form-horizontal\">\n" +
    "\n" +
    "    <div ng-if=\"!preview\">\n" +
    "        <div ng-if=\"debugInfoEnabled\">\n" +
    "            <div class=\"controls\">\n" +
    "                <label class=\"checkbox\">\n" +
    "                    <input type=\"checkbox\" ng-model=\"debugSchema\"> Display schema information\n" +
    "                </label>\n" +
    "            </div>\n" +
    "\n" +
    "            <div ng-if=\"debugSchema\" data-jsonify=\"schema\"></div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"form-actions\">\n" +
    "            <a class=\"btn btn-primary\" ng-disabled=\"schema.$_invalid\" ng-click=\"handleSave()\">Save\n" +
    "                changes</a>\n" +
    "            <a class=\"btn\" ng-disabled=\"schema.$_invalid\" ng-click=\"togglePreview()\">Preview\n" +
    "                form</a>\n" +
    "            <a class=\"btn\" ng-click=\"handleCancel()\">Cancel</a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"preview\">\n" +
    "\n" +
    "        <div ng-if=\"debugInfoEnabled\">\n" +
    "            <div class=\"control-group\">\n" +
    "                <div class=\"controls\">\n" +
    "                    <label class=\"checkbox\">\n" +
    "                        <input type=\"checkbox\" ng-model=\"debugFormData\"> Display form data information\n" +
    "                    </label>\n" +
    "                </div>    \n" +
    "            </div>\n" +
    "\n" +
    "            <div ng-if=\"debugFormData\" febworms-tabs>\n" +
    "                <div febworms-tabs-pane=\"Form data\">\n" +
    "                    <div jsonify=\"previewForm.data\"></div>\n" +
    "                </div>\n" +
    "                <div febworms-tabs-pane=\"Form status\">\n" +
    "                    <div jsonify=\"previewForm.state\" jsonify-display-hidden=\"true\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"form-actions\">\n" +
    "            <a class=\"btn btn-primary\" ng-click=\"togglePreview()\">Close preview</a>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("febworms/edit/meta/meta.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("febworms/edit/meta/meta.tmpl.html",
    "<form novalidate name=\"metaForm\" class=\"febworms-edit-meta form-horizontal\">\n" +
    "    <fieldset>\n" +
    "        <legend>General Information</legend>\n" +
    "        <div class=\"control-group control-required\" ng-class=\"{ 'error': metaForm.formName.$invalid }\">\n" +
    "            <label class=\"control-label\" for=\"formName\">Name</label>\n" +
    "            <div class=\"controls\">\n" +
    "                <input type=\"text\"\n" +
    "                       id=\"formName\"\n" +
    "                       name=\"formName\"\n" +
    "                       placeholder=\"The name of the form\"\n" +
    "                       ng-model=\"schema.name\"\n" +
    "                       ng-required=\"true\">\n" +
    "                <!-- <span ng-if=\"metaForm.formName.$error.required && metaForm.formName.$dirty\" class=\"help-inline\">This field is required.</span> -->\n" +
    "                <div febworms-validation-summary=\"formName\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </fieldset>\n" +
    "</form>\n" +
    "");
}]);

angular.module("febworms/edit/palette/categories/categories.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("febworms/edit/palette/categories/categories.tmpl.html",
    "<legend ng-click=\"paletteCategoriesMenuOpen = !paletteCategoriesMenuOpen\"\n" +
    "        ng-class=\"{ 'open': paletteCategoriesMenuOpen }\">Palette \n" +
    "    <span class=\"febworms-legend-extra febworms-edit-palette-categories hidden-tablet\">- {{ categoryName || 'All field types' }}</span> <i class=\"caret\"></i>\n" +
    "    <ul class=\"dropdown-menu\">\n" +
    "        <li ng-repeat=\"(name, category) in categories\" ng-class=\"{ 'active': categoryName === name }\">\n" +
    "            <a ng-click=\"setCategory(name, category)\">\n" +
    "                {{ name }}\n" +
    "            </a>\n" +
    "        </li>\n" +
    "        <li class=\"divider\"></li>\n" +
    "        <li ng-class=\"{ 'active': !category }\">\n" +
    "            <a ng-click=\"setCategory(null)\">All field types</a>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "</legend>");
}]);

angular.module("febworms/edit/palette/palette.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("febworms/edit/palette/palette.tmpl.html",
    "<div class=\"febworms-edit-palette\">\n" +
    "    <div class=\"form-horizontal\">\n" +
    "        <fieldset>\n" +
    "            <div febworms-edit-palette-categories data-category=\"selectedCategory\"></div>\n" +
    "            <div ng-repeat=\"template in templates | filter:templateFilter\" class=\"febworms-field\"\n" +
    "                 dq-draggable=\"febworms-edit-canvas\" dq-drag-begin=\"{ source: 'palette', field: template }\">\n" +
    "                <div class=\"febworms-field-overlay\">\n" +
    "                    <div class=\"btn-toolbar btn-toolbar-right\">\n" +
    "                        <button class=\"btn btn-mini\" type=\"button\" ng-click=\"schemaCtrl.addField(template)\">Add</button>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"control-group\">\n" +
    "                    <div febworms-field=\"template\" \n" +
    "                         febworms-tab-index=\"-1\" \n" +
    "                         febworms-no-validation-summary=\"true\"\n" +
    "                         febworms-edit-mode=\"true\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </fieldset>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("febworms/field-templates/default/checkbox.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("febworms/field-templates/default/checkbox.tmpl.html",
    "<label class=\"checkbox\">\n" +
    "    <input type=\"checkbox\" \n" +
    "    	   febworms-field-input\n" +
    "    	   tabindex=\"{{ tabIndex }}\" \n" +
    "    	   ng-model=\"form.data[field.schema.name]\">\n" +
    "    <span>{{ field.schema.displayName }}</span>\n" +
    "</label>\n" +
    "");
}]);

angular.module("febworms/field-templates/default/checkboxlist.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("febworms/field-templates/default/checkboxlist.tmpl.html",
    "<label class=\"checkbox\" ng-repeat=\"option in field.schema.options\">\n" +
    "    <input type=\"checkbox\"\n" +
    "           tabindex=\"{{ tabIndex }}\"\n" +
    "           name=\"{{ field.schema.name }}[]\" value=\"{{ option.value }}\"\n" +
    "           ng-model=\"form.data[field.schema.name][option.value]\">\n" +
    "    <span>{{option.text || option.value}}</span>\n" +
    "</label>\n" +
    "");
}]);

angular.module("febworms/field-templates/default/email.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("febworms/field-templates/default/email.tmpl.html",
    "<input febworms-field-input\n" +
    "       type=\"email\"\n" +
    "       id=\"{{ field.$_id }}\"\n" +
    "       tabindex=\"{{ tabIndex }}\"\n" +
    "       placeholder=\"{{ field.schema.placeholder }}\"\n" +
    "       ng-model=\"form.data[field.schema.name]\"\n" +
    "       ng-required=\"field.schema.validation.required\"\n" +
    "       ng-minlength=\"{{ field.schema.validation.minlength }}\"\n" +
    "       ng-maxlength=\"{{ field.schema.validation.maxlength }}\"\n" +
    "       ng-pattern=\"/{{ field.schema.validation.pattern }}/\"\n" +
    "       ng-disabled=\"isDisabled(field.schema)\">");
}]);

angular.module("febworms/field-templates/default/not-in-cache.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("febworms/field-templates/default/not-in-cache.tmpl.html",
    "<div class=\"febworms-field-not-in-cache alert alert-error\">\n" +
    "    <p>No template registered in cache for field type \"{{ field.type }}\".</p>\n" +
    "</div>");
}]);

angular.module("febworms/field-templates/default/password.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("febworms/field-templates/default/password.tmpl.html",
    "<input type=\"password\"\n" +
    "       id=\"{{ field.$_id }}\"\n" +
    "       tabindex=\"{{ tabIndex }}\"\n" +
    "       placeholder=\"{{ field.schema.placeholder }}\"\n" +
    "       ng-model=\"form.data[field.schema.name]\"\n" +
    "       ng-required=\"field.schema.validation.required\"\n" +
    "       ng-minlength=\"{{ field.schema.validation.minlength }}\"\n" +
    "       ng-maxlength=\"{{ field.schema.validation.maxlength }}\"\n" +
    "       ng-pattern=\"/{{ field.schema.validation.pattern }}/\"\n" +
    "       ng-disabled=\"isDisabled(field.schema)\">");
}]);

angular.module("febworms/field-templates/default/radiobuttonlist.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("febworms/field-templates/default/radiobuttonlist.tmpl.html",
    "<label class=\"radio\" ng-repeat=\"option in field.schema.options\">\n" +
    "    <input type=\"radio\"\n" +
    "           name=\"{{ field.schema.name }}[]\"\n" +
    "           tabindex=\"{{ tabIndex }}\"\n" +
    "           value=\"{{ option.value }}\"\n" +
    "           ng-model=\"form.data[field.schema.name]\">\n" +
    "    <span>{{option.text || option.value}}</span>\n" +
    "</label>");
}]);

angular.module("febworms/field-templates/default/selectlist.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("febworms/field-templates/default/selectlist.tmpl.html",
    "<select id=\"{{ field.$_id }}\"\n" +
    "        ng-model=\"form.data[field.schema.name]\"\n" +
    "        ng-required=\"field.schema.validation.required\"\n" +
    "        tabindex=\"{{ tabIndex }}\">\n" +
    "    <option ng-repeat=\"option in field.schema.options\" value=\"{{ option.value }}\" ng-selected=\"form.data[field.schema.name] === option.value\">{{ option.text || option.value }}</option>\n" +
    "</select>\n" +
    "");
}]);

angular.module("febworms/field-templates/default/text.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("febworms/field-templates/default/text.tmpl.html",
    "<input type=\"text\"\n" +
    "       id=\"{{ field.$_id }}\"\n" +
    "       tabindex=\"{{ tabIndex }}\"\n" +
    "       placeholder=\"{{ field.schema.placeholder }}\"\n" +
    "       ng-model=\"form.data[field.schema.name]\"\n" +
    "       ng-required=\"field.schema.validation.required\"\n" +
    "       ng-minlength=\"{{ field.schema.validation.minlength }}\"\n" +
    "       ng-maxlength=\"{{ field.schema.validation.maxlength }}\"\n" +
    "       ng-pattern=\"/{{ field.schema.validation.pattern }}/\"\n" +
    "       ng-disabled=\"isDisabled(field.schema)\">");
}]);

angular.module("febworms/field-templates/default/textarea.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("febworms/field-templates/default/textarea.tmpl.html",
    "<textarea id=\"{{ field.$_id }}\"1\n" +
    "          tabindex=\"{{ tabIndex }}\"\n" +
    "          placeholder=\"{{ field.schema.placeholder }}\"\n" +
    "          ng-model=\"form.data[field.schema.name]\"\n" +
    "          ng-required=\"field.schema.validation.required\"\n" +
    "          ng-minlength=\"{{ field.schema.validation.minlength }}\"\n" +
    "          ng-maxlength=\"{{ field.schema.validation.maxlength }}\"\n" +
    "          ng-pattern=\"/{{ field.schema.validation.pattern }}/\">\n" +
    "</textarea>");
}]);

angular.module("febworms/field-templates/properties/checkbox.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("febworms/field-templates/properties/checkbox.tmpl.html",
    "<div febworms-tabs>\n" +
    "	<div febworms-tabs-pane=\"Properties\">\n" +
    "		<div febworms-property-field-common=\"{ fieldname: true, displayname: true }\"></div>\n" +
    "		<div febworms-property-field=\"fieldValue\">\n" +
    "			<label class=\"checkbox\">\n" +
    "            	<input type=\"checkbox\" ng-model=\"field.value\">\n" +
    "            	<span>Initial value</span>\n" +
    "        	</label>\n" +
    "		</div>		\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("febworms/field-templates/properties/checkboxlist.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("febworms/field-templates/properties/checkboxlist.tmpl.html",
    "<div febworms-tabs>\n" +
    "    <div febworms-tabs-pane=\"Properties\">\n" +
    "        <div febworms-property-field-common=\"{ fieldname: true, displayname: true }\"></div>\n" +
    "    </div>\n" +
    "    <div febworms-tabs-pane=\"Options\">\n" +
    "        <div febworms-property-field-options=\"multiple\"></div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("febworms/field-templates/properties/email.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("febworms/field-templates/properties/email.tmpl.html",
    "<div febworms-tabs>\n" +
    "	<div febworms-tabs-pane=\"Properties\">\n" +
    "		<div febworms-property-field-common=\"{ fieldname: true, displayname: true, placeholder: true }\"></div>\n" +
    "		<div febworms-property-field=\"fieldValue\" febworms-property-field-label=\"Initial value\">\n" +
    "			<input type=\"email\" name=\"fieldValue\" ng-model=\"field.value\" />\n" +
    "		</div>		\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("febworms/field-templates/properties/password.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("febworms/field-templates/properties/password.tmpl.html",
    "<div febworms-tabs>\n" +
    "	<div febworms-tabs-pane=\"Properties\">\n" +
    "		<div febworms-property-field-common=\"{ fieldname: true, displayname: true, placeholder: true }\"></div>\n" +
    "		<div febworms-property-field=\"fieldValue\" febworms-property-field-label=\"Initial value\">\n" +
    "			<input type=\"password\" name=\"fieldValue\" ng-model=\"field.value\" />\n" +
    "		</div>		\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("febworms/field-templates/properties/radiobuttonlist.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("febworms/field-templates/properties/radiobuttonlist.tmpl.html",
    "<div febworms-tabs>\n" +
    "    <div febworms-tabs-pane=\"Properties\">\n" +
    "        <div febworms-property-field-common=\"{ fieldname: true, displayname: true }\"></div>\n" +
    "    </div>\n" +
    "    <div febworms-tabs-pane=\"Options\">\n" +
    "        <div febworms-property-field-options></div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("febworms/field-templates/properties/selectlist.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("febworms/field-templates/properties/selectlist.tmpl.html",
    "<div febworms-tabs>\n" +
    "    <div febworms-tabs-pane=\"Properties\">\n" +
    "        <div febworms-property-field-common=\"{ fieldname: true, displayname: true }\"></div>\n" +
    "    </div>\n" +
    "    <div febworms-tabs-pane=\"Options\">\n" +
    "        <div febworms-property-field-options></div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("febworms/field-templates/properties/text.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("febworms/field-templates/properties/text.tmpl.html",
    "<div febworms-tabs>\n" +
    "	<div febworms-tabs-pane=\"Properties\">\n" +
    "		<div febworms-property-field-common=\"{ fieldname: true, displayname: true, placeholder: true }\"></div>\n" +
    "		<div febworms-property-field=\"fieldValue\" febworms-property-field-label=\"Initial value\">\n" +
    "			<input type=\"text\" name=\"fieldValue\" ng-model=\"field.value\" />\n" +
    "		</div>		\n" +
    "	</div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("febworms/field-templates/properties/textarea.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("febworms/field-templates/properties/textarea.tmpl.html",
    "<div febworms-tabs>\n" +
    "	<div febworms-tabs-pane=\"Properties\">\n" +
    "		<div febworms-property-field-common=\"{ fieldname: true, displayname: true, placeholder: true }\"></div>\n" +
    "		<div febworms-property-field=\"fieldValue\" febworms-property-field-label=\"Initial value\">\n" +
    "			<textarea name=\"fieldValue\" ng-model=\"field.value\"></textarea>\n" +
    "		</div>		\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("febworms/form/field/field.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("febworms/form/field/field.tmpl.html",
    "<div class=\"febworms-field-inner\">\n" +
    "	<label ng-if=\"!renderInfo.hideLabel\" class=\"control-label\" for=\"{{ field.$_id }}\">{{ fieldSchema.displayName }}</label>\n" +
    "	<div class=\"controls\">\n" +
    "		<div ng-include=\"renderInfo.templateUrl\"></div>\n" +
    "		<div febworms-validation-summary ng-if=\"!noValidationSummary\"></div>\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("febworms/form/form-fields/form-fields.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("febworms/form/form-fields/form-fields.tmpl.html",
    "<div class=\"febworms-form-fields\">\n" +
    "	<fieldset>\n" +
    "      <legend>{{ form.schema.name }}</legend>\n" +
    "\n" +
    "      <div ng-repeat=\"field in form.schema.fields\">\n" +
    "        <div class=\"control-group\" ng-class=\"{ 'error': form.state[field.name].$invalid }\">\n" +
    "			<div febworms-field=\"field\"></div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "	</fieldset>\n" +
    "</div>");
}]);

angular.module("febworms/validation/summary.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("febworms/validation/summary.tmpl.html",
    "<ul class=\"febworms-validation-summary help-block unstyled\" ng-if=\"field.state.$invalid && field.state.$dirty\">\n" +
    "	<li ng-repeat=\"(key, error) in field.state.$error\" ng-if=\"error\" febworms-bind-expression=\"messages[key]\"></li>\n" +
    "</ul>");
}]);
