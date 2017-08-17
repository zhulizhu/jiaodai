/**
 * Created by jason on 2017/03/16
 */
 (function () {
  'use strict';

  angular
  .module('teacherList.controller',[])
  .controller('teacherListCtrl',teacherListCtrl);

  teacherListCtrl.$inject = ['$scope','$yikeUtils','$ionicModal','$ionicLoading','$state','$stateParams'];

  /* 教师列表 */
  function teacherListCtrl($scope,$yikeUtils,$ionicModal,$ionicLoading,$state,$stateParams){
    var gid = $state.params.gid;
    var address = $state.params.address;
    $scope.select=select;
    $scope.techerList=techerList;
    $scope.teacherSearch=teacherSearch;
    $scope.choose=choose;
    $scope.choseSubject=choseSubject;
    $scope.selectChoose=selectChoose;
    $scope.searchGo=searchGo;
    $scope.xid=[];
    $scope.subj=[];
    $scope.selec=3;
    $scope.states={     
    };
    $scope.seleces={

    };
    init();
    function init(){
        $ionicLoading.show();
        techerList();
        teacherSearch();
    }
    //教师列表
    function techerList(){
     yikejd.query('/apicloud/parent/teacherList',{openid:TOKEN,gid:gid,address:address})      
     .then(function(data){
      $ionicLoading.hide();
      $scope.lists=data.result;
      $scope.$digest();
  },function(data){
             $yikeUtils.toast(data.msg);
             $scope.stat=data.status;
         }
     )
 }

    //关注
    function select(id){
        yikejd.query('/apicloud/parent/parentFollow',{openid:TOKEN,tid:id.id})      
        .then(function(data){
            $yikeUtils.toast(data.msg);

            $scope.$digest();
            techerList();
        },function(data){
            $yikeUtils.toast(data.msg);
        })
    }
    //教师搜索列表
    function teacherSearch(){
        $ionicLoading.show();
        yikejd.query('/apicloud/parent/searchSubject',{openid:TOKEN})      
        .then(function(data){
            $ionicLoading.hide();
            $yikeUtils.toast(data.msg);
            $scope.subject=data.result;
            $scope.subj=$scope.subject.subject;
            $scope.selected=$scope.subject.sex[0];
            choose($scope.selected);
             for(var i=0;i<$scope.subject.subject.length;i++){
                 $scope.subject.subject[i].checked=false;
             }
            techerList();  
            $scope.$digest();
        },function(data){
            $yikeUtils.toast(data.msg);
            $scope.stat=data.status;
        })

    }
    //选择性别
    function choose(id){
    $scope.state=id.id;
    $scope.states=id.id;
    }
    //选择科目
    function choseSubject(chose){ //点击添加样式
      if(chose.checked==false){
        chose.checked=true;
        $scope.xid.push(chose.id); 
        if($scope.xid.length==$scope.subj.length){
          
          if($scope.seleces==0){
             $scope.selec=0; 
          }
        }          
      }else if(chose.checked==true){
        chose.checked=false; 
        if($scope.seleces==0){
             $scope.selec=3; 
          }
        for(var i=0;i<$scope.xid.length;i++){ //取消xid添加的chose.id
          if(chose.id ==$scope.xid[i]){
            $scope.xid.splice(i, 1);           
          }

        }     
      }
            
    
    }
    //筛选全部或关注的
    function selectChoose(cid){
      $scope.xid=[];
     $scope.selec=cid.id;
     $scope.seleces=cid.id;
     if(cid.id==0){
      for(var i=0;i<$scope.subj.length;i++){        
         $scope.xid.push($scope.subj[i].id);
         $scope.subj[i].checked=true;
      }
       
      }
      else if(cid.id==1){
        for(var i=0;i<$scope.subj.length;i++){        
         $scope.subj[i].checked=false;
      }
      }
     
    }

    //确定搜索
    function searchGo(mid){
        $scope.closeModal();
        $ionicLoading.show();
      $scope.xtime=mid;
      if(mid==1){
        yikejd.query('/apicloud/parent/search',{openid:TOKEN,follow:$scope.seleces,sub:$scope.xid,sex:$scope.states})      
        .then(function(data){
            $ionicLoading.hide();
            $scope.lists=data.result;
           $scope.modal.hide();
            $scope.$digest();
        },function(data){
            $scope.lists=[];
            $yikeUtils.toast(data.msg);
            $scope.stat=data.status;
        })
      }
      else if(mid==0){
       $scope.selec=3;
       $scope.xid=[];
       for(var i=0;i<$scope.subject.subject.length;i++){
                 $scope.subject.subject[i].checked=false;
        }
      }
       

    }

    //更多选择模态窗口
    $ionicModal.fromTemplateUrl('templates/modal/teacher-list-modal.html', {
        scope: $scope,
        animation: 'slide-in-left'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $scope.openModal = function() {
        $scope.modal.show();
        };
    $scope.closeModal = function() {
            $scope.modal.hide();
        };
    }
})();