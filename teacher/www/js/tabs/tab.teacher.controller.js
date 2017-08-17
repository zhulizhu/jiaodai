/**
 * Created by jason on 2017/03/16
 */
 (function () {
  'use strict';

  angular
    .module('tab.teacher.controller',[])
    .controller('tabTeacherCtrl',tabTeacherCtrl);

  tabTeacherCtrl.$inject = ['$scope','$yikeUtils','$ionicLoading','$ionicScrollDelegate'];

  /* 学习诊断tab首页 */
  function tabTeacherCtrl($scope,$yikeUtils,$ionicLoading,$ionicScrollDelegate){
    $scope.studentList=studentList;
    $scope.searchStudent=searchStudent;
    $scope.student={
      cont:''
    };
    //loading加载页面
    init();
    function init(id){
      studentList();
    }
    // 我的学生列表
    function studentList(){
        $ionicLoading.show();
      yikejd.query('/apicloud/teacher/myStudent',{openid:TOKEN})      
      .then(function(data){
      $ionicLoading.hide();
      $scope.lists=data.result;

      $scope.$digest();

      $ionicScrollDelegate.resize();

      },function(data){
              $yikeUtils.toast(data.msg);
              $scope.stat=data.status;
          }
      )
    }
    // 搜索学生列表
    function searchStudent(content){
        $ionicLoading.show();
      yikejd.query('/apicloud/teacher/myStudent',{openid:TOKEN,search:content.search})      
      .then(function(data){
      $ionicLoading.hide();
      $scope.lists=data.result;
          $scope.student.cont='';
      $scope.$digest();
      },function(data){
          $scope.lists=[];
          $yikeUtils.toast(data.msg);
          $scope.stat=data.status;
          $scope.student.cont='';
      })
    }



  }
})();