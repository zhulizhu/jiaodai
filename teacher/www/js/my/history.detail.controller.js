/**
 * Created by jason on 2017/03/16
 */
 (function () {
  'use strict';

  angular
  .module('history.detail.controller',[])
  .controller('historyDetailCtrl',historyDetailCtrl);

  historyDetailCtrl.$inject = ['$scope','$yikeUtils','$ionicLoading','$state','$ionicActionSheet','$ionicModal'];

  /* 学习诊断tab首页 */
  function historyDetailCtrl($scope,$yikeUtils,$ionicLoading,$state,$ionicActionSheet,$ionicModal){
    $scope.historyDetail=historyDetail;
    $scope.addZd=addZd;
    $scope.addZy=addZy;
     $scope.delZy=delZy;
    var id=$state.params.id;
    $scope.cont={
      val:''
    };
    $scope.zuoye={
      val:''
    };
    
    //loading加载页面
    init();
    function init(){
        $ionicLoading.show({
            template:'<div><img src="img/tabs/loading.gif" alt="" style="width:48px;height:48px;"></div>',//loading模板
            animation: 'fade-in',
            duration: 3000, //loading加载时间
            noBacdrop: true, //模态框加载  默认false
            hideOnStateChange: false //loading图片隐藏
        });
   
    historyDetail();

}

    // 我的历史课程详情
    function historyDetail(){
      yikejd.query('/apicloud/teacher/myHistoryClassDetail',{openid:TOKEN,classId:id})      
      .then(function(data){
          $ionicLoading.hide();
          $yikeUtils.toast(data.msg);          
          $scope.details=data.result; 
          $scope.zhidao=$scope.details.zhidao;
           $scope.cont.val=$scope.zhidao;
          $scope.$digest();

      })
      .catch(function (data) {
       $yikeUtils.toast(data.msg);
   });
  }
  // 课后指导
    function addZd(cont){
      yikejd.query('/apicloud/teacher/addZhiDao',{openid:TOKEN,classId:id,data:cont.val})      
      .then(function(data){
          $ionicLoading.hide();
          $yikeUtils.toast(data.msg);                           
          $scope.modal.hide();
          historyDetail();
           $scope.$digest();

      })
      .catch(function (data) {
       $yikeUtils.toast(data.msg);
   });
  }
  // 添加课后作业
    function addZy(zuoye){
      yikejd.query('/apicloud/teacher/addZuoYe',{openid:TOKEN,classId:id, content:zuoye.val})      
      .then(function(data){
          $ionicLoading.hide();
          $yikeUtils.toast(data.msg);                          
          $scope.mod.hide();
          historyDetail();
           $scope.$digest();

      })
      .catch(function (data) {
       $yikeUtils.toast(data.msg);
   });
  }
  // 删除课后作业
    function delZy(id){
      yikejd.query('/apicloud/teacher/deleteZuoYe',{openid:TOKEN,zuoyeId:id.id})      
      .then(function(data){
          $ionicLoading.hide();
          $yikeUtils.toast(data.msg);                          
          historyDetail();
           $scope.$digest();

      })
      .catch(function (data) {
       $yikeUtils.toast(data.msg);
   });
  }
    //课后指导
    $ionicModal.fromTemplateUrl('templates/modal/history-detail-modal.html', {
        scope: $scope,
        animation: 'slide-in-left'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $ionicModal.fromTemplateUrl('templates/modal/history-add-modal.html', {
        scope: $scope,
        animation: 'slide-in-left'
    }).then(function(mod) {
        $scope.mod = mod;
    });
    $scope.openMod = function() {
        $scope.mod.show();                     
        };
    $scope.closeMod = function() {
            $scope.mod.hide();
        };

    $scope.openModal = function() {
        $scope.modal.show();                     
        };
    $scope.closeModal = function() {
            $scope.modal.hide();
        };
        // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });

}
})();