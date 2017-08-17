/**
 * Created by jason on 2017/03/16
 */
 (function () {
  'use strict';

  angular
  .module('teacheryue.controller',[])
  .controller('teacheryueCtrl',teacheryueCtrl);

  teacheryueCtrl.$inject = ['$scope','$yikeUtils','$ionicModal','$ionicLoading','$state'];

  /* 教师列表 */
  function teacheryueCtrl($scope,$yikeUtils,$ionicModal,$ionicLoading,$state){
    $scope.TOKEN=TOKEN;
    $scope.id=$state.params.id;
    var flag=true;
    var countdown;
    $scope.select = select;
    $scope.orderList = orderList;
    $scope.choseClass = choseClass;
    $scope.choseNum = choseNum;
    $scope.choseWeek =choseWeek;
    $scope.choseTimea =choseTimea;
    $scope.sendMsg=sendMsg;
    $scope.complateYu=complateYu;
    $scope.gradeList=gradeList;
    //$scope.payMony=payMony;
    $scope.choseData=[];
    $scope.userId={
        orid:''
      };
    $scope.user={
      subjec:'',//科目 name
      subjec_id:'', //科目 id
      class_num_id:'', //课程 id
      time:'',//课程时间 周
      class_id:'', //时刻 id
      city:'',
      detailAddress:'',
      studentName:'',
      sex:'',
      grade:'',
      school:'',
      jzName:'',
      phone:'',
      code:'',
      code2:''
    };
    $scope.areas=[
    {val:'和平',area:'和平区'},
    {val:'河西',area:'河西区'},
    {val:'河东',area:'河东区'},
    {val:'河南',area:'河南区'},
    {val:'南开',area:'南开区'},
    {val:'红桥',area:'红桥区'},
    ];
    $scope.user.city=$scope.areas[0].val;
    var ShopPublic={
    myReg:'',
    formData:''
};

      //更多选择模态窗口
      //$ionicModal.fromTemplateUrl('templates/modal/teacher-yue-pay-model.html', {
      //    scope: $scope,
      //    animation: 'slide-in-left'
      //}).then(function(modal) {
      //    $scope.modal = modal;
      //});
      //$scope.openModal = function() {
      //    $scope.modal.show();
      //    payMony();
      //};
      //$scope.closeModal = function() {
      //    $scope.modal.hide();
      //};

//判断学生信息
ShopPublic.myReg=/^(((1[0-9][0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;


ShopPublic.formData=function formData(class_id,detailAddress,studentName,sex,grade,school,jzName,phone,code,code2){
    if (class_id == '' || class_id == null) {
        $yikeUtils.toast('请选择具体约定时间');
        return false;
    }
    else if (detailAddress == '' || detailAddress == null) {
              $yikeUtils.toast('请先输入详细地址');
              return false;
   } else if (studentName == '' || studentName == null) {
              $yikeUtils.toast('请先输入学生姓名');
              return false;
   } else if (sex == '' || sex == null) {
              $yikeUtils.toast('请选择性别');
              return false;
   }else if (grade == '' || grade == null) {
              $yikeUtils.toast('请选择年级');
              return false;
   }
    else if (school == '' || school == null) {
              $yikeUtils.toast('请输入学生所在学校名称');
              return false;
   }else if (jzName == '' || jzName == null) {
              $yikeUtils.toast('请输入家长姓名');
              return false;
   }else if(phone == '' ||phone == null){
              $yikeUtils.toast('请先输入电话号码');
              return false;
   } else if(!ShopPublic.myReg.test(phone)||phone.length<11){
              $yikeUtils.toast('请输入正确手机号');
              return false;
   }
  else if (code == '' || code == null) {
              $yikeUtils.toast('请先输入验证码');
              return false;
   }else if(code2!=code){
              $yikeUtils.toast('请输入正确验证码');
              return false;
   }
  return true;
};


    var inp;
    // 获取input焦点的监听   处理input默认手机键盘弹出
    var input = document.getElementsByTagName('input');
    for (var i=0,j=input.length;i<j;i++){
      input[i].addEventListener('focus',function(){
        inp = this;
      },false)
    }
    //手机默认键盘弹出事件
    window.onresize = function (){
      var inpPos = inp.getBoundingClientRect();
      if (inpPos.bottom > innerHeight) {
        inp.scrollIntoView();
      }
    };
    init();
    function init(){
      orderList();
        gradeList();
    }
      //年级列表
      function gradeList(){
          $ionicLoading.show();
          yikejd.query('/apicloud/parent/choice')
              .then(function(data){
                  $ionicLoading.hide();
                  $scope.grades=data.result;
                  $scope.user.grade=$scope.grades[0].id;
                  $scope.$digest();
              })

      }
    function select(i){
      $scope.user.sex = i;
    }
    //预约教师列表
    function orderList(){
        $ionicLoading.show();
      yikejd.query('/apicloud/order/orderList',{openid:$scope.TOKEN,tid:$scope.id})
      .then(function(data){
          $ionicLoading.hide();
        $scope.orders=data.result;
        $scope.orders.gradeClass=data.result.gradeClass;
        choseClass($scope.orders.subjects[0]);
        choseNum($scope.orders.classNum[0]);
        choseWeek($scope.orders.week[0]);
        $scope.time=Localtime($scope.orders.createtime*1000);            
        $scope.$digest();

      })
    }
  //选择课程数量
  function choseNum(ord){
    $scope.user.class_num_id=ord.id;
    $scope.deposit=ord.deposit; 
    $scope.describe = ord.describe;        
  }
  //选择科目
  function choseClass(sub){
    $scope.user.subjec_id=sub.id;
    $scope.user.subjec=sub.name;
  }
  //选择星期
  function choseWeek(day){
    $scope.xqWek=day.week;
    $scope.user.time=day.time;
    yikejd.query('/apicloud/order/orderTime',{openid:$scope.TOKEN,tid:$scope.id,cTime:day.time,week:day.week})
    .then(function(data){
      $scope.weeks=data.result;          
      $scope.$digest();

    })

  }
  //选择时刻
  function choseTimea(time){
    $scope.user.class_id=time.id;
  }
  //发送短信验证码
  function sendMsg() {
      if($scope.user.phone == '' ||$scope.user.phone == null){
          $yikeUtils.toast('请先输入电话号码');
          return false;
      } else if(!ShopPublic.myReg.test($scope.user.phone)||$scope.user.phone.length<11){
          $yikeUtils.toast('请输入正确手机号');
          return false;
      }
    else if(flag==true) {
      flag=false;
      var sendMsg = document.body.querySelector('.send-msg');
      countdown = 60;
      yikejd.query('/apicloud/order/sendCode', {phone: $scope.user.phone})
      .then(function (data) {
        $yikeUtils.toast(data.msg);
        $scope.user.code2 = data.result.code;
        settime(sendMsg);
        flag=true;
      },function(data){
          $yikeUtils.toast(data.msg);
          flag=true;
      })
    }
      return false;
  }
  //倒计时
  function settime(obj) {
    if (countdown == 0) {
      obj.removeAttribute("disabled");
      obj.innerHTML = "获取验证码";
      countdown = 60;
      return;
    } else {
      obj.setAttribute("disabled", true);
      obj.innerHTML = "重新发送(" + countdown + ")";
      countdown--;
    }
    setTimeout(function () {
      settime(obj)
    }, 1000)
  }

  //添加预约
  function complateYu(){

      if(!ShopPublic.formData($scope.user.class_id,$scope.user.detailAddress,$scope.user.studentName,$scope.user.sex,$scope.user.grade,$scope.user.school,$scope.user.jzName,$scope.user.phone,$scope.user.code,$scope.user.code2)){

          return false;
      }
      document.getElementById('myform').submit();

 }


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