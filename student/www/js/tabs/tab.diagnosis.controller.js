/**
 * Created by jason on 2017/03/16
 */
 (function () {
  'use strict';

  angular
    .module('tab.diagnosis.controller',[])
    .controller('tabDiagnosisCtrl',tabDiagnosisCtrl);

  tabDiagnosisCtrl.$inject = ['$scope','$yikeUtils','$ionicLoading','$state'];

  /* 学习诊断tab首页 */
  function tabDiagnosisCtrl($scope,$yikeUtils,$ionicLoading,$state){
      //var TOKEN=localStorageService.get('TOKEN');
      //console.log(TOKEN);
    //loading加载页面
    $scope.learn=learn;
    $scope.getOpenid=getOpenid;
    init();
    function init(){
      getOpenid();
      learn();

    }
    // 学习诊断
    function learn(){
      yikejd.query('/apicloud/index/index',{openid:TOKEN})
      .then(function(data){
      $ionicLoading.hide();
      $scope.slogan=data.result.slogan;
      $scope.content=data.result.content;
      $scope.last=data.result.last;
      $('.content').html($scope.content);

      })
    }
      // 获取openid
      function getOpenid(){
          yikejd.query('/apicloud/weiXin/getStudentOpenid')
              .then(function(data){
                  $scope.openid=data.result;
                  localStorage.setItem('TOKEN', $scope.openid);

              })
      }




  }
})();