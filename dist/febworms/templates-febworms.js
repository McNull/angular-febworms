angular.module('templates-febworms', ['febworms/edit/feb-edit.tmpl.html']);

angular.module("febworms/edit/feb-edit.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("febworms/edit/feb-edit.tmpl.html",
    "<div>\n" +
    "    <div class=\"control-group\" ng-form=\"field\">\n" +
    "        <div class=\"control-required\">\n" +
    "            <label for=\"schemaName\" class=\"control-label\">Name</label>\n" +
    "\n" +
    "            <div class=\"controls\">\n" +
    "                <input id=\"schemaName\"\n" +
    "                       name=\"schemaName\"\n" +
    "                       type=\"text\"\n" +
    "                       ng-model=\"schema.name\"\n" +
    "                       ng-required=\"true\"/>\n" +
    "\n" +
    "                <ul class=\"help-inline\" ng-show=\"field.$invalid\">\n" +
    "                    <li ng-show=\"field.$error.required\">Required</li>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);
