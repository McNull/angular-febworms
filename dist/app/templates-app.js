angular.module('templates-app', ['app/form/edit.tmpl.html', 'app/form/index.tmpl.html', 'app/jsonify/jsonify.tmpl.html', 'app/main/home.tmpl.html', 'app/navbar/navbar.tmpl.html', 'app/notifications/notifications.tmpl.html']);

angular.module("app/form/edit.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/form/edit.tmpl.html",
    "<h1>{{ title }}</h1>\n" +
    "<div>\n" +
    "\n" +
    "    <form novalidate name=\"myForm\" class=\"form-horizontal\">\n" +
    "        <!-- Application specific form information -->\n" +
    "        <fieldset>\n" +
    "            <legend>General Information</legend>\n" +
    "            <div class=\"control-group control-required\">\n" +
    "                <label class=\"control-label\" for=\"formName\">Name</label>\n" +
    "                <div class=\"controls\">\n" +
    "                    <input type=\"text\"\n" +
    "                           id=\"formName\"\n" +
    "                           name=\"formName\"\n" +
    "                           placeholder=\"The name of the form\"\n" +
    "                           ng-model=\"form.name\"\n" +
    "                           ng-required=\"true\">\n" +
    "                    <span ng-if=\"myForm.formName.$error.required && myForm.formName.$dirty\" class=\"help-inline\">This field is required.</span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </fieldset>\n" +
    "    </form>\n" +
    "\n" +
    "    <div data-feb-edit data-schema=\"form.schema\"></div>\n" +
    "\n" +
    "    <div class=\"form-horizontal\">\n" +
    "        <div class=\"form-actions\">\n" +
    "            <a class=\"btn btn-primary\" ng-disabled=\"myForm.$invalid || !form.schema.isValid\" ng-click=\"save()\">Save changes</a>\n" +
    "            <a class=\"btn\" href=\"#/form\">Cancel</a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div>\n" +
    "        <pre>{{ form | j$on }}</pre>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("app/form/index.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/form/index.tmpl.html",
    "<div>\n" +
    "    <div class=\"alert\" ng-if=\"items.length === 0\">\n" +
    "        <h2 ng-if=\"!items.$resolved\">Loading ...</h2>\n" +
    "        <div ng-if=\"items.$resolved\">\n" +
    "            <h2>No form schemas found.</h2>\n" +
    "            <a href=\"#/form/create\" class=\"btn btn-primary\">Add a fresh new form »</a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"items.length\">\n" +
    "        <div class=\"info\">\n" +
    "            Located {{ items.length }} form schema(s).\n" +
    "        </div>\n" +
    "        <table class=\"table table-hover\">\n" +
    "            <tr>\n" +
    "                <th style=\"width:60px\">\n" +
    "                    <a href=\"#/form/create\" class=\"btn btn-mini\"><i class=\"icon-plus\"></i></a>\n" +
    "                </th>\n" +
    "                <th>Id</th>\n" +
    "                <th>Name</th>\n" +
    "            </tr>\n" +
    "            <tr ng-repeat=\"item in items\">\n" +
    "                <td>\n" +
    "                    <a href=\"#/form/edit/{{ item.id }}\" class=\"btn btn-mini\"><i class=\"icon-edit\"></i></a>\n" +
    "                    <a class=\"btn btn-mini\" ng-click=\"removeItem(item)\"><i class=\"icon-trash\"></i></a>\n" +
    "                </td>\n" +
    "                <td>{{ item.id }}</td>\n" +
    "                <td>{{ item.name }}</td>\n" +
    "            </tr>\n" +
    "        </table>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("app/jsonify/jsonify.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/jsonify/jsonify.tmpl.html",
    "<pre>{{ jsonify | j$on }}</pre>");
}]);

angular.module("app/main/home.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/main/home.tmpl.html",
    "<div class=\"hero-unit\">\n" +
    "    <h1>\n" +
    "        Angular FebWorms\n" +
    "    </h1>\n" +
    "\n" +
    "    <p>\n" +
    "        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquid dignissimos eius eveniet explicabo fugiat molestias nam nemo, odio qui sed tenetur ullam vel! Corporis esse quaerat quas soluta voluptas.\n" +
    "    </p>\n" +
    "\n" +
    "    <p>\n" +
    "        <a class=\"btn btn-primary btn-large\" href=\"#/form\">Doe gek »</a>\n" +
    "    </p>\n" +
    "</div>");
}]);

angular.module("app/navbar/navbar.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/navbar/navbar.tmpl.html",
    "<div class=\"navbar text-select-disable\">\n" +
    "    <div class=\"navbar-inner\">\n" +
    "        <div class=\"container-fluid\">\n" +
    "            <a class=\"btn hidden-desktop hidden-tablet pull-right\"\n" +
    "               ng-click=\"toggleCollapse()\">\n" +
    "                <i class=\"icon-list\"></i>\n" +
    "            </a>\n" +
    "            <a href=\"#\" class=\"brand\">Angular FebWorms</a>\n" +
    "            <div class=\"nav-collapse-phone\" ng-class=\"{ collapsed: navItems.isCollapsed }\">\n" +
    "                <ul class=\"nav\">\n" +
    "                    <li ng-repeat=\"navItem in navItems\" ng-class=\"{ active: navItem.isActive }\">\n" +
    "                        <a ng-href=\"{{ navItem.url }}\" ng-click=\"collapseNavItems()\">{{ navItem.text }}</a>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("app/notifications/notifications.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/notifications/notifications.tmpl.html",
    "<div>\n" +
    "    <ul class=\"unstyled\">\n" +
    "        <li ng-repeat=\"message in notifications.messages\" class=\"alert alert-{{ message.type }}\">\n" +
    "            <a class=\"close\" ng-click=\"notifications.remove(message)\">x</a>\n" +
    "            {{ message.text }}\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "</div>");
}]);
