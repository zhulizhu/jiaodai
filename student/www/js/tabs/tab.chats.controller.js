/**
 * Created by jason on 2017/03/16
 */
 (function () {
  'use strict';

  angular
    .module('tab.chats.controller',[])
    .controller('tabChatsCtrl',tabChatsCtrl);

  tabChatsCtrl.$inject = ['$scope','$yikeUtils','$ionicLoading','$state'];

  /* 学习诊断tab首页 */
  function tabChatsCtrl($scope,$yikeUtils,$ionicLoading,$state){
    $scope.gradeList=gradeList;
    $scope.areas=[
    {val:'和平',area:'和平区'},
    {val:'河西',area:'河西区'},
    {val:'河东',area:'河东区'},
    {val:'河南',area:'河南区'},
    {val:'南开',area:'南开区'},
    {val:'红桥',area:'红桥区'}
    ];

    $scope.selectd=$scope.areas[0].val;

    init();
    function init(){
        gradeList();

    }
      //年级列表
      function gradeList(){
          $ionicLoading.show();
          yikejd.query('/apicloud/parent/choice')
              .then(function(data){
                  $ionicLoading.hide();
                  $scope.grades=data.result;
                  $scope.selected=$scope.grades[4].id;
                  $scope.$digest();
              })

      }


  }
})();