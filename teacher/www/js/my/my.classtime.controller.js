/**
 * Created by jason on 2017/03/16
 */
 (function () {
  'use strict';

  angular
  .module('my.classtime.controller',[])
  .controller('myClasstimeCtrl',myClasstimeCtrl);

  myClasstimeCtrl.$inject = ['$scope','$yikeUtils','$ionicLoading','$state','$timeout','$ionicModal','$ionicScrollDelegate'];
  /* 上课时间 */
  function myClasstimeCtrl($scope,$yikeUtils,$ionicLoading,$state,$timeout,$ionicModal,$ionicScrollDelegate){
    $scope.delTeacher = delTeacher;
    $scope.week=[
    {val:1,id:'周一'},
    {val:2,id:'周二'},
    {val:3,id:'周三'},
    {val:4,id:'周四'},
    {val:5,id:'周五'},
    {val:6,id:'周六'},
    {val:7,id:'周日'}
    ];
    $scope.selected=$scope.week[0].val;
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth()+1;
    var date = d.getDate();
    if(Number(month)<10){
        month = "0"+month;
        $scope.time = year + "/" + month +"/"+date;
    }else if(Number(month)<10&&Number(date)<10){
        month = "0"+month;
        date = "0" +date;
        $scope.time = year + "/" + month +"/"+date;
    }else {
        $scope.time =  year + "/" + month +"/"+date;  
    }
    //设置开始时间数据
    init();
    function init(){
    teacherClassList();
  }
   //教师上课时间列表
   function teacherClassList(){
       $ionicLoading.show();
        yikejd.query('/apicloud/teacherClass/lists',{openid:TOKEN})
            .then(function(data){
                $ionicLoading.hide();
                $scope.ClassList = data.result;
                $scope.$digest();
            },function(data){
                $scope.ClassList=[];
                    $yikeUtils.toast(data.msg);
                    $scope.stat=data.status;
                }
            )
   }
   //删除教师上课时间列表
   function delTeacher(time) {
        yikejd.query('/apicloud/teacherClass/deleteTime',{openid:TOKEN,id:time})
            .then(function(data){
               $yikeUtils.toast(data.msg);
               teacherClassList();
               $scope.$digest();
            },function(data){
                $yikeUtils.toast(data.msg);
                }
            )
   }
   //添加上课时间段模态
    $ionicModal.fromTemplateUrl('templates/modal/my-classtime-modal.html', {
        scope: $scope,
        animation: 'slide-in-left'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    //设置slect默认值
    $scope.openModal = function() {
        $scope.modal.show();
        //获取开始时间戳
        $(".timeStart li").click(function(){
            $(this).addClass('selected');
            $(this).siblings('li').removeClass('selected');
            $scope.start = $scope.time + " " + $(this).html();
            $scope.startTime = Math.round(new Date( $scope.start).getTime()/1000);
        })
        //获取结束时间戳
         $(".timeEnd li").click(function(){
            $(this).addClass('selected');
            $(this).siblings('li').removeClass('selected');
            $scope.End = $scope.time + " " + $(this).html();
            $scope.Endtime = Math.round(new Date( $scope.End).getTime()/1000);
        
        })
    };
    //保存时间信息
    $scope.save = function (week){
        if(week.week == ''){
            $yikeUtils.toast("请选择周数")
        }else if($scope.startTime == undefined){
            $yikeUtils.toast("请选择开始时间")
        }else if($scope.Endtime == undefined){
             $yikeUtils.toast("请选择结束时间")
        }else{
            yikejd.query('/apicloud/teacherClass/addTime',{openid:TOKEN,week:week.week,starttime:$scope.startTime,endtime:$scope.Endtime})
                .then(function(data){
                    $ionicLoading.hide();
                    if(data.status == 1){
                        $yikeUtils.toast(data.msg);
                        teacherClassList();
                        $scope.modal.hide();
                    }else if(data.status == 0){
                        $yikeUtils.toast(data.msg);
                         $scope.modal.hide();
                    }
                    $scope.$digest();
                })
                .catch(function (data) {
                $yikeUtils.toast(data.msg);
            });
            }
    }
    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    $scope.$on('$destroy', function(){
        $scope.modal.remove();
    });
  }

})();