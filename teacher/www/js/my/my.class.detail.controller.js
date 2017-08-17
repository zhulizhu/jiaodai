/**
 * Created by jason on 2017/03/16
 */
 (function () {
  'use strict';

  angular
  .module('my.class.detail.controller',[])
  .controller('myclassDetailCtrl',myclassDetailCtrl);

  myclassDetailCtrl.$inject = ['$scope','$yikeUtils','$ionicLoading','$state','$ionicModal','$timeout'];

  /* 学习诊断tab首页 */
  function myclassDetailCtrl($scope,$yikeUtils,$ionicLoading,$state,$ionicModal,$timeout){
    var id=$state.params.id;
    localStorage.setItem("classId",$state.params.id);
    $scope.myDetail=myDetail;
    //loading加载页面
    init();
    function init(){
      myDetail();
  }
    //我的课程详情
    function myDetail(){
        $ionicLoading.show();
      yikejd.query('/apicloud/teacher/myDoingClass',{openid:TOKEN,classId:id})      
      .then(function(data){
          $ionicLoading.hide();
          $scope.deta=data.result;
          $scope.$digest();

      })
  }
  //下拉刷新
  $scope.refresh =  function(){
       myDetail();
       $timeout(function(){
            $scope.$broadcast('scroll.refreshComplete');
       },500)
  }
  //添加上课时间段模态
    $ionicModal.fromTemplateUrl('templates/modal/my-detail-modal.html', {
        scope: $scope,
        animation: 'slide-in-left'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    //设置slect默认值
    $scope.openModal = function() {
        $scope.modal.show(); 
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    $scope.$on('$destroy', function(){
        $scope.modal.remove();
    });
  }

})();