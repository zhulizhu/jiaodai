(function () {
  'use strict';

  angular
    .module('yike.back', [])
    .directive('yikeBack', YikeBack);

  YikeBack.$inject = ['$ionicHistory','$rootScope','$ionicViewSwitcher'];

  function YikeBack($ionicHistory,$rootScope,$ionicViewSwitcher) {
    var directive = {
      template: ' <button class="button button-clear ion-chevron-left white"></button>',
      link: link,
      replace: true,
      restrict: 'AE'
    };
    return directive;

    function link(scope, element, attrs) {
      element.bind('click', function(e) {
        $rootScope.$ionicGoBack()
      })
    }
  }
})();
