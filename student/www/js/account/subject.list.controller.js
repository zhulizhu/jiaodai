 /* Created by jason on 2017/03/16
 */
 (function () {
  'use strict';

  angular
    .module('subject.list.controller',[])
    .controller('subjectListCtrl',subjectListCtrl);

  subjectListCtrl.$inject = ['$scope','$yikeUtils','$ionicLoading','$state'];

  /* 我的 */
  function subjectListCtrl($scope,$yikeUtils,$ionicLoading,$state){
    $scope.myHisSubject=myHisSubject;
    $scope.choseSub=choseSub;
    $scope.subjectList=subjectList;
    $scope.infor=infor;
    init();
    function init(){
      myHisSubject();
      subjectList();
      infor();
      choseSub(7);
    }

    //家长信息
        function infor(){
         $ionicLoading.show();
        yikejd.query('/apicloud/parent/myInfo',{openid:TOKEN})      
        .then(function(data){
            $ionicLoading.hide();
            $scope.infors=data.result; 
            $scope.$digest();
        })
    }

    // 历史课程
    function myHisSubject(){
        $ionicLoading.show();
        yikejd.query('/apicloud/parent/subject',{openid:TOKEN})      
        .then(function(data){
            $ionicLoading.hide();
            $scope.subjects=data.result;
            $scope.$digest();
        },function(data){
                $yikeUtils.toast(data.msg);
                $scope.stat=data.status;
            }
        )
    }

    function subjectList(){
        $ionicLoading.show();
      yikejd.query('/apicloud/parent/historyClass',{openid:TOKEN})
        .then(function(data){
            $ionicLoading.hide();
            $scope.lists=data.result;
            $scope.$digest();

        },function(data){
            $scope.lists=[];
            $yikeUtils.toast(data.msg);
            $scope.stat=data.status;
        })
    }
    function choseSub(id){
        $ionicLoading.show();
        $scope.state=id;
        yikejd.query('/apicloud/parent/historyClass',{openid:TOKEN,search:id})
        .then(function(data){
            $ionicLoading.hide();
            $scope.lists=data.result;
            $scope.$digest();

        },function(data){
            $scope.lists=[];
            $yikeUtils.toast(data.msg);
            $scope.stat=data.status;
        })
    }



  }
})();
