/**
 * Created by jason on 2017/03/16
 */
 (function () {
  'use strict';

  angular
    .module('tab.subject.controller',[])
    .controller('tabSubjectCtrl',tabSubjectCtrl);

  tabSubjectCtrl.$inject = ['$scope','$yikeUtils','$ionicLoading'];

  /* 学习诊断tab首页 */
  function tabSubjectCtrl($scope,$yikeUtils,$ionicLoading){
    $scope.myClass=myClass;
    //loading加载页面
    init();
    function init(){
      myClass();
      open();
    }
    //获取opeid
    function open(){
      yikejd.query('/apicloud/weiXin/getTeacherOpenid')      
      .then(function(data){
        localStorage.setItem("TOKEN",data.result);
        $scope.$digest()
      })
    }
    // 我的课程
    function myClass(){
      yikejd.query('/apicloud/teacher/myClass',{openid:TOKEN})      
      .then(function(data){
      $scope.class=data.result;
      $scope.$digest()
      },function(data){
          $yikeUtils.toast(data.msg);
          $scope.stat=data.status;
      })
    }

     //转换时间搓为年月日日期
     function add(m) {
            return m < 10 ? '0' + m : m
        }
    function Localtime(scj) {
        var date = new Date(scj);
        var n = date.getFullYear();
        var y = date.getMonth()+1;
        var d = date.getDate();
        var h = date.getHours();
        var m = date.getMinutes();

        var c =  n + '年' + add(y) + '月' +add(d)+'日';
        return c;
    }



  }
})();