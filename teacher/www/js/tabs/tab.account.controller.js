/**
 * Created by jason on 2017/03/16
 */
 (function () {
  'use strict';

  angular
    .module('tab.account.controller',[])
    .controller('tabAccountCtrl',tabAccountCtrl);

  tabAccountCtrl.$inject = ['$scope','$yikeUtils','$ionicLoading'];

  /* 学习诊断tab首页 */
  function tabAccountCtrl($scope,$yikeUtils,$ionicLoading){
    $scope.myInfo=myInfo;
    //loading加载页面
    init();
    function init(id){
      myInfo();
    }
    // 我的课程
    function myInfo(){
      $ionicLoading.show();
      yikejd.query('/apicloud/teacher/info',{openid:TOKEN})      
      .then(function(data){
      $ionicLoading.hide();
      $scope.infor=data.result;
      $scope.$digest();
      })
    }

  }
})();