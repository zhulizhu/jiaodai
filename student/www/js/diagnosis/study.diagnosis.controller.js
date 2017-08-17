/**
 * Created by jason on 2017/03/16
 */
 (function () {
  'use strict';

  angular
    .module('diagnosis.controller',[])
    .controller('diagnosisCtrl',diagnosisCtrl);

  diagnosisCtrl.$inject = ['$scope','$yikeUtils','$ionicLoading','$state','$ionicScrollDelegate'];

  /* 学习诊断 */
  function diagnosisCtrl($scope,$yikeUtils,$ionicLoading,$state,$ionicScrollDelegate){
      $scope.selectAnswer=selectAnswer;
      $scope.questionChose=questionChose;
      $scope.questionJc=questionJc;
      $scope.questionDy=questionDy;
      $scope.questionYb=questionYb;
      $scope.checkMore=checkMore;
      $scope.questionZr=questionZr;
      $scope.questionBc=questionBc;
      var time= Math.round(new Date().getTime()/1000-28800);
      var index=0;
      var reg =/^(\d+\/)+(\d)+$/;

      $scope.page=1;
      $scope.subject=[];
      $scope.xid=[];
      $scope.questions=[];
      $scope.ti=$scope.questions[index];
      $scope.answer={
          val:''
      };
      $scope.num={
          number1:'',
          number2:'',
          number3:'',
          number4:'',
          number5:''
      };
      init();
    function init(){
      questionChose();
    }
    //基本情况
    function questionChose(){
        $ionicLoading.show();
        yikejd.query('/apicloud/index/basicQue',{openid:TOKEN})
      .then(function(data){
          $ionicLoading.hide();
          if(data.result.number==0){
              questionJc();
          }else{
              $scope.questions=data.result.question;
              $scope.num.number1=data.result.number;
              $scope.ti=$scope.questions[index];
              $scope.ti.is_checkbox=$scope.questions[index].is_checkbox;
              if($scope.questions[index].option!==null && $scope.questions[index].option!==''){
                  for(var i=0;i<$scope.questions[index].option.length;i++){
                      $scope.questions[index].option[i].checked=false;
                  }
              }

          }
      $scope.$digest();//实时刷新数据
      $ionicScrollDelegate.resize();//告诉滚动视图重新计算它的容器大小
      },function(data){

          $state.go('tab.dash');
          $yikeUtils.toast(data.msg);

      })
    }
    //生活情况
    function questionJc(){
        $ionicLoading.show();
        yikejd.query('/apicloud/index/leftQue',{openid:TOKEN,sub:$scope.subject,group:time})
      .then(function(data){
      $ionicLoading.hide();
       if(data.result.number==0){
              questionDy();
       }
      else{

      $scope.subject=[];
      $scope.questions=data.result.question;
      $scope.num.number2=data.result.number;
      $scope.ti=$scope.questions[index];
           $scope.ti.is_checkbox=$scope.questions[index].is_checkbox;
      if($scope.questions[index].option!==null && $scope.questions[index].option!==''){
               for(var i=0;i<$scope.questions[index].option.length;i++){
                   $scope.questions[index].option[i].checked=false;
               }
           }
       }
      $scope.$digest();
      })
    }
    //标签题
    function questionDy(){
        $ionicLoading.show();
        yikejd.query('/apicloud/index/labelQue',{openid:TOKEN,sub:$scope.subject,group:time})
      .then(function(data){
        $ionicLoading.hide();
       if(data.result.number==0){
           questionYb();
       }else{
           $scope.subject=[];
           $scope.questions=data.result.question;
           $scope.num.number3=data.result.number;
           $scope.ti=$scope.questions[index];
           $scope.ti.is_checkbox=$scope.questions[index].is_checkbox;
           if($scope.questions[index].option!==null && $scope.questions[index].option!==''){
               for(var i=0;i<$scope.questions[index].option.length;i++){
                   $scope.questions[index].option[i].checked=false;
               }
           }
       }
       $scope.$digest();
      
      })
    }
      // 一般题
      function questionYb(){
          $ionicLoading.show();
          yikejd.query('/apicloud/index/commonlyQue',{openid:TOKEN,sub:$scope.subject,group:time})
              .then(function(data){
                  if(data.result.number==0){
                      questionZr();
                  }else{
                  $ionicLoading.hide();
                  $scope.subject=[];
                  $scope.questions=data.result.question;
                  $scope.num.number4=data.result.number;
                  $scope.ti=$scope.questions[index];
                      $scope.ti.is_checkbox=$scope.questions[index].is_checkbox;
                  if($scope.questions[index].option!==null && $scope.questions[index].option!==''){
                          for(var i=0;i<$scope.questions[index].option.length;i++){
                              $scope.questions[index].option[i].checked=false;
                          }
                      }
                  }

              })

      }
      //最弱学科
      function questionZr(){
          $ionicLoading.show();
          yikejd.query('/apicloud/index/weak',{openid:TOKEN,sub:$scope.subject,group:time})
              .then(function(data){
                  $ionicLoading.hide();
                  if(data.result.number==0){
                      $state.go('report');
                  }else{

                      $scope.subject=[];
                      $scope.questions=data.result.question;
                      $scope.num.number5=data.result.number;
                      $scope.ti=$scope.questions[index];
                      $scope.ti.is_checkbox=$scope.questions[index].is_checkbox;
                      if($scope.questions[index].option!==null && $scope.questions[index].option!==''){
                          for(var i=0;i<$scope.questions[index].option.length;i++){
                              $scope.questions[index].option[i].checked=false;
                          }
                      }
                  }

              })
      }


      //保存最弱学科
      function questionBc(){
          $ionicLoading.show();
          yikejd.query('/apicloud/index/addReport',{openid:TOKEN,sub:$scope.subject,group:time})
              .then(function(data){
                  $ionicLoading.hide();
                  $state.go('report');

              })

      }
    //多项选择题目
    function checkMore(chose){ //点击添加样式
      if(chose.checked==false){
        chose.checked=true;
        $scope.xid.push(chose.id);
      }else if(chose.checked==true){
        chose.checked=false;   
        for(var i=0;i<$scope.xid.length;i++){ //取消xid添加的chose.id
          if(chose.id ==$scope.xid[i]){
            $scope.xid.splice(i, 1);           
          }

        }     
      }
    }
      //判断输入年级排名
      function gradeNum(str){
          var strs= new Array(); //定义一数组
          strs=str.split("/"); //字符分割
          if(Number(strs[0])>Number(strs[1])){
             return true
          }
      }
    function selectAnswer(pd){  //点击答案进入下一题
        if($scope.ti.is_checkbox==2){
            if(pd.id=='' ||pd.id==null){
                $yikeUtils.toast('请输入您的答案');
                return false
            }else if(!reg.test(pd.id)){
                $yikeUtils.toast('您输入的格式错误');
                return false
            }
            else if(gradeNum(pd.id)){
                $yikeUtils.toast('您输入的格式错误');
                return false
            }
        }

      $ionicScrollDelegate.resize();
      $scope.state=pd.id;
      $scope.subject.push(pd);
      $scope.xid=[];
      $scope.page++;
      if(pd.cid==1){ //基本情况
        index=index+1;
        if(index==$scope.num.number1 || $scope.num.number1==0){
          index=0;
          $scope.questions=[];
          questionJc();
            $scope.subject=[];
        }else{
            $scope.ti=$scope.questions[index];
            if($scope.questions[index].option!==null && $scope.questions[index].option!==''){
                for(var i=0;i<$scope.questions[index].option.length;i++){
                    $scope.questions[index].option[i].checked=false;
                }
            }

        }
      }else if(pd.cid==2){ //生活情况
        index=index+1;              
         if(index==$scope.num.number2 || $scope.num.number2==0){
          index=0;
          $scope.questions=[];
          questionDy();
          $scope.subject=[];
        } else{
             $scope.ti=$scope.questions[index];
             if($scope.questions[index].option!==null && $scope.questions[index].option!==''){
                 for(var i=0;i<$scope.questions[index].option.length;i++){
                     $scope.questions[index].option[i].checked=false;
                 }
             }
        }    
      }else if(pd.cid==4){ //标签题
          index=index+1;
          if(index==$scope.num.number3 || $scope.num.number3==0){
              index=0;
              $scope.questions=[];
              questionYb();
              $scope.subject=[];
          } else{
              $scope.ti=$scope.questions[index];
              if($scope.questions[index].option!==null && $scope.questions[index].option!==''){
                  for(var i=0;i<$scope.questions[index].option.length;i++){
                      $scope.questions[index].option[i].checked=false;
                  }
              }
          }
      }
      else if(pd.cid==5){ //一般题
          index=index+1;
          if(index==$scope.num.number4 || $scope.num.number4==0){
              index=0;
              $scope.questions=[];
              questionZr();
              $scope.subject=[];
          } else{
              $scope.ti=$scope.questions[index];
              if($scope.questions[index].option!==null && $scope.questions[index].option!==''){
                  for(var i=0;i<$scope.questions[index].option.length;i++){
                      $scope.questions[index].option[i].checked=false;
                  }
              }
          }
      }
      else{ //最弱学科
          index=index+1;
          if(index==$scope.num.number5 || $scope.num.number5==0){
              questionBc();
          }

         else{
              $scope.ti=$scope.questions[index];
          }





            
      }
     
    }


  }
})();