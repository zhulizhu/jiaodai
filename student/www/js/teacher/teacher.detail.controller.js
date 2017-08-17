/**
 * Created by jason on 2017/03/16
 */
 (function () {
  'use strict';

  angular
    .module('teacherDetail.controller',[])
    .controller('teacherDetailCtrl',teacherDetailCtrl);

 teacherDetailCtrl.$inject = ['$scope','$yikeUtils','$ionicModal','$ionicLoading','$state'];

  /* 教师详情 */
  function teacherDetailCtrl($scope,$yikeUtils,$ionicModal,$ionicLoading,$state){ 
   var id=$state.params.id;
   $scope.teacherDtail=teacherDtail;
   $scope.Localtime=Localtime;
   $scope.select=select;

    // 初始化一个swiper
    init();
    function init(){
        $ionicLoading.show();
      var swiper = new Swiper('.swiper-container', {
                slidesPerView: 3,
                paginationClickable: true,
                spaceBetween: 10,
                freeMode: true,
                observer: true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents: true//修改swiper的父元素时，自动初始化swiper               
            });

      teacherDtail();
      
    }
    //教师详情页
    function teacherDtail(){
     yikejd.query('/apicloud/parent/teacherDetail',{openid:TOKEN,tid:id})      
      .then(function(data){
      $ionicLoading.hide();
      $scope.details=data.result;
      $scope.createtime=parseInt(data.result.createtime);
      $scope.time=Localtime($scope.createtime*1000); 
      })
    }
    //关注
    function select(id){

        yikejd.query('/apicloud/parent/parentFollow',{openid:TOKEN,tid:id.id})      
        .then(function(data){
            $yikeUtils.toast(data.msg);
            teacherDtail();
            $scope.$digest();
        },function(data){
            $yikeUtils.toast(data.msg);

        })
    }

      //点击图片放大
      $ionicModal.fromTemplateUrl('templates/modal/teacher-detail-modal.html', {
          scope: $scope,
          animation: 'slide-in-left'
      }).then(function(modal) {
          $scope.modal = modal;
      });
      $scope.openModal = function($event) {
          $scope.modal.show();
          var img=$event.srcElement || $event.target;
          $("#bigimage")[0].src=img.src;
          $("#js-imgview")[0].style.display="block";
          $("#js-imgview-mask")[0].style.display="block";

      };
      $scope.closeModal = function() {
          $scope.modal.hide();
          $("#js-imgview")[0].style.display="none";
          $("#js-imgview-mask")[0].style.display="none";

      };
      // Cleanup the modal when we're done with it!
      $scope.$on('$destroy', function() {
          $scope.modal.remove();
      });
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