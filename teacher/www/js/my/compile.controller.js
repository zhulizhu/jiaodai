/**
 * Created by jason on 2017/03/16
 */
 (function () {
  'use strict';

  angular
  .module('compile.controller',[])
  .controller('CompileCtrl',CompileCtrl);

  CompileCtrl.$inject = ['$scope','$yikeUtils','$ionicLoading','$state'];

  /* 学习诊断tab首页 */
  function CompileCtrl($scope,$yikeUtils,$ionicLoading,$state){
    var myreg = /^1[34578]\d{9}$/;
    $scope.myDetail=myDetail;
    $scope.changZl=changZl;
    $scope.profile={
    };
    $scope.sexs=[
    {val:'男',id:2},
    {val:'女',id:1}
    ];

    //loading加载页面
    init();
    function init(){
      myDetail();
      costTime();
  }
      //课时费
      function costTime(){
          yikejd.query('/apicloud/teacher/cost',{openid:TOKEN})
              .then(function(data){
                  $ionicLoading.hide();
                  $scope.costs=data.result;
                  $scope.$digest();
              })
              .catch(function (data) {
                  $yikeUtils.toast(data.msg);
              });

      }
    // 我的资料
    function myDetail(){
        $ionicLoading.show();
      yikejd.query('/apicloud/teacher/detail',{openid:TOKEN})      
      .then(function(data){
          $ionicLoading.hide();
          $scope.details=data.result;
          if($scope.details.cost_id==null || $scope.details.cost_id== ''){
              $scope.profile.cost=$scope.costs[0].id;
          }else{

              $scope.profile.cost=$scope.details.cost_id;
          }
          //$scope.profile.name=$scope.details.name;
          $scope.profile.address=$scope.details.address;
          $scope.profile.school=$scope.details.school;
          $scope.profile.autograph=$scope.details.autograph;
          $scope.profile.phone=Number($scope.details.phone);
          if($scope.details.sex_id==null || $scope.details.sex_id== ''){
              $scope.profile.sex=$scope.sexs[0].id;
          }else{
              $scope.profile.sex=$scope.details.sex_id;
          }
          $scope.$digest();

      })
  }
    // 提交修改资料
    function changZl(){
        if($scope.profile.phone == '') {
        $yikeUtils.toast('请输入电话');
        }
        else if (!myreg.test($scope.profile.phone)) {

            $yikeUtils.toast('请输入有效的手机号码!');

        }
        else if($scope.profile.address == '') {

        $yikeUtils.toast('请输入您的地址');

        }
        else if($scope.profile.school == '') {

        $yikeUtils.toast('请输入您的学校');

        } 
        else if($scope.profile.autograph == '') {

        $yikeUtils.toast('请输入您的个性签名');

        }     
        else {
            yikejd.query('/apicloud/teacher/edit',{openid:TOKEN,data:$scope.profile})      
            .then(function(data){
              $yikeUtils.toast(data.msg);
              myDetail();
              $state.go('my-profile');
              $scope.$digest();

          })
        }

    }







}
})();