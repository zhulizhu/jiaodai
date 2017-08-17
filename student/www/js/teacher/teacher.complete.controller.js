/**
 * Created by jason on 2017/03/16
 */
 (function () {
  'use strict';

  angular
    .module('teacherComplete.controller',[])
    .controller('teacherCompleteCtrl',teacherCompleteCtrl);

  teacherCompleteCtrl.$inject = ['$scope','$yikeUtils'];

  /* 教师列表 */
  function teacherCompleteCtrl($scope,$yikeUtils){
      //返回首页的路由跳转
      $scope.yutian = function (){
        location.href = "#tab/chats";
      }

  }
})();