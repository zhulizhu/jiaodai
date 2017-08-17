/**
 * Created by jason on 2017/03/16
 */
 (function () {
  'use strict';

  angular
  .module('my.profile.controller',[])
  .controller('myProfileCtrl',myProfileCtrl);

  myProfileCtrl.$inject = ['$scope','$yikeUtils','$ionicLoading','$state'];

  /* 学习诊断tab首页 */
  function myProfileCtrl($scope,$yikeUtils,$ionicLoading,$state){
    $scope.myDetail=myDetail;
    //loading加载页面
    init();
    function init(){
      myDetail();
  }
    // 我的相册
    function myDetail(){
      $ionicLoading.show();
      yikejd.query('/apicloud/teacher/detail',{openid:TOKEN})      
      .then(function(data){
          $ionicLoading.hide();
          $scope.details=data.result;
          $scope.$digest();

      })
  }

}
})();