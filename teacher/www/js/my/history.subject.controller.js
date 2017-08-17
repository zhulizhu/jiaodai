/**
 * Created by jason on 2017/03/16
 */
 (function () {
  'use strict';

  angular
  .module('history.subject.controller',[])
  .controller('historySubjectCtrl',historySubjectCtrl);

  historySubjectCtrl.$inject = ['$scope','$yikeUtils','$ionicLoading','$state','$ionicActionSheet'];

  /* 学习诊断tab首页 */
  function historySubjectCtrl($scope,$yikeUtils,$ionicLoading,$state,$ionicActionSheet){
    $scope.historySubject=historySubject;
    $scope.searchSubject=searchSubject;
      $scope.setDay=setDay;
    $scope.serch={
        name:'',
        day:''
    };
    //获取当前时间
    var nowDate = new Date(),
    timeControl = $scope.timeControl = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1,
        day: nowDate.getDate(),
        weeks: []
    };
    //loading加载页面
    init();
    function init(){
    //默认选择当前时间
        var currntDay=Date.parse(new Date())/1000;
        historySubject(currntDay);
      //日期
      var setMonth = function () {
        var year = timeControl.year,
        month = timeControl.month,
        firstDay = new Date(year, month - 1, 1),
        weeks = [],
        weekIndex;

        if (firstDay.getDay()) {
            weekIndex = 0;
        }

        while (firstDay.getMonth() == month - 1) {
            var weekDay = firstDay.getDay();

            if (weekDay == 0) {
                weekIndex = (typeof weekIndex == 'undefined') ? 0 : weekIndex + 1;
            }

            if (!weeks[weekIndex]) {
                weeks[weekIndex] = new Array(7);
            }

            weeks[weekIndex][weekDay] = firstDay.getTime();

            firstDay = new Date(firstDay.getTime() + 24 * 60 * 60 * 1000);
        }

        timeControl.weeks = weeks;
    };
    setMonth();
    $scope.isCheckDay = function (time) {

        time = new Date(time);
        return time.getFullYear() == timeControl.year && (time.getMonth() + 1) == timeControl.month && time.getDate() == timeControl.day;

    };

}

    // 我的历史课程
    function historySubject(items){
        $ionicLoading.show();
      yikejd.query('/apicloud/teacher/myHistoryClass',{openid:TOKEN,search:items})      
      .then(function(data){
          $ionicLoading.hide();
          $scope.subjects=data.result;
            $scope.$digest();
      },function (data){
          $scope.subjects=[];
          $yikeUtils.toast(data.msg);
          $scope.stat=data.status;

          })
  }
    //点击搜索框搜索
    function searchSubject(cont){
        var items=cont.cont;
        historySubject(items);
        $scope.serch.name='';

    }
    //点击日期搜索
    function setDay(time) {
        timeControl.day = (new Date(time)).getDate();
        var tim=time/1000;
        historySubject(tim);
    }
    




}
})();