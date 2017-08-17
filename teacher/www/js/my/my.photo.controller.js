/**
 * Created by jason on 2017/03/16
 */
 (function () {
  'use strict';

  angular
    .module('my.photo.controller',[])
    .controller('myPhotoCtrl',myPhotoCtrl);

  myPhotoCtrl.$inject = ['$scope','$yikeUtils','$ionicLoading','$state','$ionicActionSheet'];
  /* 学习诊断tab首页 */
  function myPhotoCtrl($scope,$yikeUtils,$ionicLoading,$state,$ionicActionSheet){
    $scope.myPhoto=myPhoto;
    $scope.upload = upload;
    var file = document.getElementById("file");
    //loading加载页面
    init();
    function init(){
      myPhoto();
    }
    // 我的相册
    function myPhoto(){
        $ionicLoading.show();
      yikejd.query('/apicloud/teacher/teacherAlbum',{openid:TOKEN})      
      .then(function(data){
      $ionicLoading.hide();
      $scope.photos=data.result;
      $scope.$digest();
      })
    }
    //上传图片
     function upload(){
        $("#file").click();
        file.onchange = function(){
          submit();
        }
      }
    //相册上传
    function submit(){
      var formData = new FormData();
      formData.append("imgsub", file.files[0]);
      formData.append("openid",TOKEN);
      //上传转菊花
      $ionicLoading.show({
            template: '<ion-spinner icon="circles"></ion-spinner>',//页面显示的html内容
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200
      });
      //上传服务器
      $.ajax({
        url:"https://www.teachguide.net/index.php/apicloud/teacher/addAlbum",
        type:"POST",
        data:formData,
        cache:false,
        processData:false,
        contentType: false,
        success:function(data){
          var Data = JSON.parse(data);
          if(Data.status == 1){
            $ionicLoading.hide();
            $yikeUtils.toast(Data.msg);
            myPhoto();
            return false;
          }else if(Data.status == 0){
            $ionicLoading.hide();
            $yikeUtils.toast(Data.msg);
            return false;
          }
        },
        fail:function(data){
          $ionicLoading.hide();
          $yikeUtils.toast("上传失败");
        }
      })
    }
    

  }
})();