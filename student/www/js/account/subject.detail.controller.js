/**
 * Created by jason on 2017/03/16
 */
 (function () {
  'use strict';

  angular
    .module('subject.detail.controller',[])
    .controller('subjectDetailCtrl',subjectDetailCtrl);

 subjectDetailCtrl.$inject = ['$scope','$yikeUtils','$state','$ionicScrollDelegate','$ionicLoading'];

  /* 课程详情*/
  function subjectDetailCtrl($scope,$yikeUtils,$state,$ionicScrollDelegate,$ionicLoading){
    var id = $state.params.id;
    $scope.infor=infor;
    $scope.zyDetail=zyDetail;
    $scope.resolve=resolve;
    $scope.evaluate=evaluate;
    $scope.payload={
         star:5,
         cont:''
        };
    var flag=true;    
    //初始化一个swiper
    init();
    function init(){
        $ionicLoading.show({
            template:'<div><img src="img/tabs/loading.gif" alt="" style="width:48px;height:48px;"></div>',//loading模板
            animation: 'fade-in',
            duration: 3000, //loading加载时间
            noBacdrop: true, //模态框加载  默认false
            hideOnStateChange: false //loading图片隐藏
        });
      
      var swiper = new Swiper('.swiper-container', {
                slidesPerView: 3,
                paginationClickable: true,
                spaceBetween: 10,
                freeMode: true,
                observer: true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents: true//修改swiper的父元素时，自动初始化swiper
               
            });
      infor();
      zyDetail();
    }
    //家长信息
        function zyDetail(){
        yikejd.query('/apicloud/parent/classZuoYeDetail',{openid:TOKEN,id:id})      
        .then(function(data){
            $ionicLoading.hide();
            $yikeUtils.toast(data.msg);
            $scope.detail=data.result; 
            $ionicScrollDelegate.resize();
            $scope.$digest();
        })
        .catch(function (data) {
         $yikeUtils.toast(data.msg);
     });       
    }
    //家长信息
        function infor(){
        yikejd.query('/apicloud/parent/myInfo',{openid:TOKEN})      
        .then(function(data){
            $ionicLoading.hide();
            $yikeUtils.toast(data.msg);
            $scope.infors=data.result;
            $scope.$digest();
        })
        .catch(function (data) {
         $yikeUtils.toast(data.msg);
     });       
    }

    //作业完成状态
    function resolve(stae){
      yikejd.query('/apicloud/parent/editZuoYe',{openid:TOKEN,zuoid:stae.id,id:id})      
        .then(function(data){
            $ionicLoading.hide();
            $yikeUtils.toast(data.msg);
            zyDetail();
            $scope.$digest();
        })
        .catch(function (data) {
         $yikeUtils.toast(data.msg);
     }); 

    }
    // 评价
    function evaluate(){           
            if($scope.payload.cont==''){
                $yikeUtils.toast('请输入评价');
                return false;
            }
            yikejd.query('/apicloud/parent/addClassEva',{openid:TOKEN,classId:id,stars:$scope.payload.star,content:$scope.payload.cont})
                .then(function(data){
                  $ionicLoading.hide();
                  console.log(data);
                   $yikeUtils.toast(data.msg);
                   zyDetail();
                })
                .catch(function(data){
                  $yikeUtils.toast(data.msg);

                });
           
        }

  }
})();