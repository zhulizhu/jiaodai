/**
 * Created by jason on 2017/03/16
 */
(function () {
    'use strict';

    angular
        .module('diagnosisReported.controller',[])
        .controller('diagnosisReportedCtrl',diagnosisReportedCtrl);

    diagnosisReportedCtrl.$inject = ['$scope','$yikeUtils','$state','$ionicLoading'];

    /* 教师列表 */
    function diagnosisReportedCtrl($scope,$yikeUtils,$state,$ionicLoading){
        $scope.Report=Report;
        $scope.Picture=Picture;
        ////页面跳转
        $scope.goBack = function goBack(){
            location.href = "#tab/chats";
        };
        init();
        function init(){
            Report();
            Picture();
        }
        //刷新当前页
        $scope.reloadRoute = function () {
            Report();
            Picture();
        };
        //报告及解决方案
        function Report(){
            $ionicLoading.show();
            yikejd.query('/apicloud/index/LastReport',{openid:TOKEN})
                .then(function(data){
                    $ionicLoading.hide();
                    $scope.evaluates=data.result;
                })
        }
        //五星图
        function Picture(){
            $ionicLoading.show();
            yikejd.query('/apicloud/index/fiveStar',{openid:TOKEN})
                .then(function(data){
                    $ionicLoading.hide();
                    $scope.Pics=data.result;
                })
        }
    }
})();