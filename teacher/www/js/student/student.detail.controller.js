/**
 * Created by jason on 2017/03/16
 */
 (function () {
  'use strict';

  angular
    .module('student.detail.controller',[])
    .controller('studentDetailCtrl',studentDetailCtrl);

  studentDetailCtrl.$inject = ['$scope','$yikeUtils','$ionicLoading','$state'];

  /* 学习诊断tab首页 */
  function studentDetailCtrl($scope,$yikeUtils,$ionicLoading,$state){
    $scope.studentDtail=studentDtail;
     var sid = $state.params.sid;
    //loading加载页面
    init();
    function init(){
      studentDtail();
    }
    // 学生详情
    function studentDtail(){
        $ionicLoading.show();
      yikejd.query('/apicloud/teacher/myStudentDetail',{openid:TOKEN,sid:sid})      
      .then(function(data){
      $ionicLoading.hide();
      $scope.detail=data.result.student;
      $scope.subject=data.result.subject;
      $scope.$digest();

      })
    }



  }
})();