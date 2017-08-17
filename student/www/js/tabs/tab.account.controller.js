 /* Created by jason on 2017/03/16
 */
 (function () {
  'use strict';

  angular
    .module('tab.account.controller',[])
    .controller('tabAccountCtrl',tabAccountCtrl);

  tabAccountCtrl.$inject = ['$scope','$yikeUtils','$ionicLoading','$state'];

  /* 我的 */
  function tabAccountCtrl($scope,$yikeUtils,$ionicLoading,$state){
    $scope.moreTeacher=moreTeacher;
    $scope.select=select;
    $scope.infor=infor;
    $scope.myClass=myClass;
    init();
    function init(){
        $ionicLoading.show();
      moreTeacher();
      infor();
      myClass();
    }


     //更多关注老师列表
    function moreTeacher(){

     yikejd.query('/apicloud/parent/myFollowTeacher',{openid:TOKEN})      
     .then(function(data){
      $ionicLoading.hide();
      $scope.status=data.status;
      $scope.list=data.result[0];
      $scope.$digest();
  },function(data){
         $scope.status=data.status;
         $yikeUtils.toast(data.msg);
     })
 }
    //关注
    function select(id){
        yikejd.query('/apicloud/parent/parentFollow',{openid:TOKEN,tid:id.id})      
        .then(function(data){
            $yikeUtils.toast(data.msg);
            moreTeacher();  
            $scope.$digest();
        },function(data){
            $yikeUtils.toast(data.msg);
        })
    }

    //家长信息
        function infor(){
         $ionicLoading.show();
        yikejd.query('/apicloud/parent/myInfo',{openid:TOKEN})      
        .then(function(data){
            $ionicLoading.hide();
            $scope.infors=data.result; 
            $scope.$digest();
        })
    }

    //我的课程
    function myClass(){
        $ionicLoading.show();
        yikejd.query('/apicloud/parent/myClass',{openid:TOKEN})      
        .then(function(data){
            $ionicLoading.hide();
            $scope.clas=data.result; 
            $scope.$digest();
        },function(data){
            $yikeUtils.toast(data.msg);
            $scope.stat=data.status;
        })
    }



  }
})();
