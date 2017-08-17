/**
 * Created by jason on 2017/03/16
 */
 (function () {
  'use strict';

  angular
  .module('my.grade.controller',[])
  .controller('myGradeCtrl',myGradeCtrl);

  myGradeCtrl.$inject = ['$scope','$yikeUtils','$ionicLoading','$state','$ionicModal'];

  /* 我的收入 */
  function myGradeCtrl($scope,$yikeUtils,$ionicLoading,$state,$ionicModal){
    $scope.classList=classList; 
    $scope.delList=delList; 
    $scope.canAdd=canAdd; 
    $scope.addGrade=addGrade; 
    $scope.gara={
      name:'',
      id:''
    };
    init();
    function init(){
      classList();
      canAdd();

    }

  //我的可教年级列表
  function classList(){
      $ionicLoading.show();
    yikejd.query('/apicloud/Grade/lists',{openid:TOKEN})      
    .then(function(data){
        $ionicLoading.hide();
      $scope.grades=data.result;
      $scope.$digest();
    },function(data){
        $scope.grades=[];
            $yikeUtils.toast(data.msg);
            $scope.stat=data.status;
        }

    )
  }
  //删除可教年级列表
  function delList(grade){

          yikejd.query('/apicloud/Grade/remove',{openid:TOKEN,id:grade.id})
              .then(function(data){
                  $yikeUtils.toast(data.msg);
                  classList();
                  $scope.$digest();
              },function(data){
                  $yikeUtils.toast(data.msg);
              })


  }
  //可添加年级列表
  function canAdd(){
    yikejd.query('/apicloud/Grade/choiceGrade',{openid:TOKEN})
    .then(function(data){
      $scope.chos=data.result;
      $scope.gara.id=$scope.chos[0].id;
      $scope.gara.name=$scope.chos[0].name;
       $scope.$digest();
    })
  }
  //添加年级
  function addGrade(sele){
    if($scope.gara.name=='' || $scope.gara.name==null){
     $yikeUtils.toast('请输入年级');
   }
   else{
     yikejd.query('/apicloud/Grade/addGrade',{openid:TOKEN,grade_name:sele.name.name,cid:sele.name.id})
      .then(function(data){
              $yikeUtils.toast(data.msg);
              $scope.modal.hide();
              classList();
              $scope.$digest();

      },function(data){
          $yikeUtils.toast(data.msg);
      })
   }
 }
    //添加年级模态
    $ionicModal.fromTemplateUrl('templates/modal/add-grade-modal.html', {
      scope: $scope,
      animation: 'slide-in-left'
    }).then(function(modal) {
      $scope.modal = modal;
    });
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