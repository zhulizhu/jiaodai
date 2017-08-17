/**
 * Created by jason on 2017/03/16
 */
 (function () {
  'use strict';

  angular
    .module('contect.teacher.controller',[])
    .controller('contectTeacherCtrl',contectTeacherCtrl);

 contectTeacherCtrl.$inject = ['$scope','$yikeUtils','$ionicLoading'];

  /* 课程详情*/
  function contectTeacherCtrl($scope,$yikeUtils,$ionicLoading){
    //初始化一个swiper
    $scope.moreTeacher=moreTeacher;
    $scope.searchTeacher=searchTeacher;
    $scope.user={
      name:''
    };
    init();
    function init(){
      moreTeacher();
    }
    //更多关注老师列表
    function moreTeacher(){
     $ionicLoading.show();
     yikejd.query('/apicloud/parent/myFollowTeacher',{openid:TOKEN})      
     .then(function(data){
      $ionicLoading.hide();
      $scope.lists=data.result;
      $scope.$digest();
  },function(data){

         $yikeUtils.toast(data.msg);
         $scope.stat=data.status;
     })
 }

 function searchTeacher(search){
     $ionicLoading.show();
  yikejd.query('/apicloud/parent/myFollowTeacher',{openid:TOKEN,search:search.name})      
     .then(function(data){
      $ionicLoading.hide();
      $scope.lists=data.result;
      $scope.$digest();
  },function(data){
         $scope.lists=[];
         $yikeUtils.toast(data.msg);
         $scope.stat=data.status;
     })
 }
  }
})();