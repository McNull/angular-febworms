describe('febwormsUtils', function() {

  var febwormsUtils;
  var $templateCache;
  var febwormsConfigMock;

  beforeEach(function() {
    module('febworms');

    module(function($provide) {
      febwormsConfigMock = {
        fields: {
          templates: [],
          aliases: {}
        }
      };
      $provide.constant('febwormsConfig', febwormsConfigMock);
    });

    inject(function(_febwormsUtils_, _$templateCache_) {
      febwormsUtils = _febwormsUtils_;
      $templateCache = _$templateCache_;
    });
  });

  describe('copyField', function() {

    it('should copy the provided field', function() {

      // Arrange

      var field = new febworms.Field('myType');

      // Act

      var result = febwormsUtils.copyField(field);

      // Assert

      expect(result).toBeDefined();
      expect(result).not.toBe(field);
      expect(result.type).toBe(field.type);
    });
  });

  describe('getTemplateUrl', function() {

    it('should check the template cache for an entry', function() {
      // Arrange

      var field = new febworms.Field('myType');
      var cacheKey = febwormsUtils.formatTemplateUrl(field.type);

      spyOn($templateCache, 'get').andCallFake(function() {
        return true;
      });

      // Act

      febwormsUtils.getTemplateUrl(field);

      // Assert

      expect($templateCache.get).toHaveBeenCalledWith(cacheKey);
    });

    it('should check the template cache for an entry in a specified area', function() {
      // Arrange

      var field = new febworms.Field('myType');
      var area = 'myArea';
      var cacheKey = febwormsUtils.formatTemplateUrl(field.type, area);

      spyOn($templateCache, 'get').andCallFake(function() {
        return true;
      });

      // Act

      febwormsUtils.getTemplateUrl(field, area);

      // Assert

      expect($templateCache.get).toHaveBeenCalledWith(cacheKey);
    });

    it('should fallback to the default area when the specified area does not contain a template', function() {
      // Arrange

      var field = new febworms.Field('myType');
      var area = 'myArea';
      var areaCacheKey = febwormsUtils.formatTemplateUrl(field.type, area);
      var defaultCacheKey = febwormsUtils.formatTemplateUrl(field.type, 'default');

      spyOn($templateCache, 'get').andCallFake(function(key) {
        return key === defaultCacheKey;
      });

      // Act

      febwormsUtils.getTemplateUrl(field, area);

      // Assert

      expect($templateCache.get).toHaveBeenCalledWith(areaCacheKey);
      expect($templateCache.get).toHaveBeenCalledWith(defaultCacheKey);
    });

    it('should NOT fallback to the default area when the specified area is "properties"', function() {
      // Arrange

      var field = new febworms.Field('myType');
      var area = 'properties';
      var areaCacheKey = febwormsUtils.formatTemplateUrl(field.type, area);
      var defaultCacheKey = febwormsUtils.formatTemplateUrl(field.type, 'default');
      var expected = febwormsUtils.formatTemplateUrl('not-in-cache');

      spyOn($templateCache, 'get');

      // Act

      var result = febwormsUtils.getTemplateUrl(field, area);

      // Assert

      expect($templateCache.get).toHaveBeenCalledWith(areaCacheKey);
      expect($templateCache.get).not.toHaveBeenCalledWith(defaultCacheKey);
      expect(result).toBe(expected);
    });

    it('should return "not-in-cache" template', function() {
      // Arrange

      var field = new febworms.Field('myType');
      var area = 'myArea';
      var expected = febwormsUtils.formatTemplateUrl('not-in-cache');

      // Act

      var result = febwormsUtils.getTemplateUrl(field, area);

      // Assert

      expect(result).toBe(expected);
    });

    //    it('should use the template type value of the field', function () {
    //      // Arrange
    //
    //      var templateAlias = 'myAlias';
    //      var field = new febworms.Field('myType');
    //
    //      febwormsConfigMock.fields.aliases['myType'] = templateAlias;
    //      var expected = febwormsUtils.formatTemplateUrl(templateAlias);
    //
    //      spyOn($templateCache, 'get').andCallFake(function () {
    //        return true;
    //      });
    //
    //      // Act
    //
    //      febwormsUtils.getTemplateUrl(field);
    //
    //      // Assert
    //
    //      expect($templateCache.get).toHaveBeenCalledWith(expected);
    //    });
  });
});