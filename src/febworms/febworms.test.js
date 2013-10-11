describe('febwormsUtils', function () {

  beforeEach(module('febworms'));

  var febwormsUtils;

  beforeEach(inject(function (_febwormsUtils_) {
    febwormsUtils = _febwormsUtils_;
  }));

  describe('getTemplateUrl', function () {

    var $templateCache;

    beforeEach(inject(function (_$templateCache_) {
      $templateCache = _$templateCache_;
    }));


    it('should check the template cache for an entry', function () {
      // Arrange

      var field = new febworms.Field('myType');
      var cacheKey = febwormsUtils.formatTemplateUrl(field.type);

      spyOn($templateCache, 'get').andCallFake(function () {
        return true;
      });

      // Act

      febwormsUtils.getTemplateUrl(field);

      // Assert

      expect($templateCache.get).toHaveBeenCalledWith(cacheKey);
    });

    it('should check the template cache for an entry in a specified area', function () {
      // Arrange

      var field = new febworms.Field('myType');
      var area = 'myArea';
      var cacheKey = febwormsUtils.formatTemplateUrl(field.type, area);

      spyOn($templateCache, 'get').andCallFake(function () {
        return true;
      });

      // Act

      febwormsUtils.getTemplateUrl(field, area);

      // Assert

      expect($templateCache.get).toHaveBeenCalledWith(cacheKey);
    });

    it('should fallback to the default area when the specified area does not contain a template', function () {
      // Arrange

      var field = new febworms.Field('myType');
      var area = 'myArea';
      var areaCacheKey = febwormsUtils.formatTemplateUrl(field.type, area);
      var defaultCacheKey = febwormsUtils.formatTemplateUrl(field.type, 'default');

      spyOn($templateCache, 'get').andCallFake(function (key) {
        return key === defaultCacheKey;
      });

      // Act

      febwormsUtils.getTemplateUrl(field, area);

      // Assert

      expect($templateCache.get).toHaveBeenCalledWith(areaCacheKey);
      expect($templateCache.get).toHaveBeenCalledWith(defaultCacheKey);
    });

    it('should return "not-in-cache" template', function () {
      // Arrange

      var field = new febworms.Field('myType');
      var area = 'myArea';
      var expected = febwormsUtils.formatTemplateUrl('not-in-cache');

      // Act

      var result = febwormsUtils.getTemplateUrl(field, area);

      // Assert

      expect(result).toBe(expected);
    });

    it('should use the template type value of the field', function () {
      // Arrange

      var field = new febworms.Field('myType', { templateType: 'myTemplateType' });
      var expected = febwormsUtils.formatTemplateUrl(field.templateType);

      spyOn($templateCache, 'get').andCallFake(function() { return true; });

      // Act

      febwormsUtils.getTemplateUrl(field);

      // Assert

      expect($templateCache.get).toHaveBeenCalledWith(expected);
    });
  });
});
