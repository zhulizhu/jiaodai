/**
 * Created by jason on 2017/03/16
 */
 (function () {
  'use strict';

  angular
    .module('my.income.controller',[])
    .controller('myIncomeCtrl',myIncomeCtrl);

  myIncomeCtrl.$inject = ['$scope','$yikeUtils','$ionicLoading','$state','$ionicModal'];

  /* 我的收入 */
  function myIncomeCtrl($scope,$yikeUtils,$ionicLoading,$state,$ionicModal){
    var myreg=/^([1-9]{1})(\d{15}|\d{18})$/;
    $scope.bankList=bankList;
    $scope.addBank=addBank;
    $scope.myIncome=myIncome;
    $scope.delBank=delBank;
    $scope.withdrawBank=withdrawBank;
     $scope.withdrawDeposit=withdrawDeposit;
    $scope.num={
        numbe:''
    };
    $scope.mon={
        money:''
    };
    $scope.selected={
        name:'',
        id:''
    };

      init();
    function init(){
        bankList();
        myIncome();
        withdrawBank();

      }
    // 我的收入
    function myIncome(){
        $ionicLoading.show();
      yikejd.query('/apicloud/Income/accountBalance',{openid:TOKEN})      
      .then(function(data){
          $ionicLoading.hide();
          $scope.come=data.result;
          $scope.$digest();
      })
  }
  //提现
  function withdrawDeposit(mon){
      $ionicLoading.show();
    var moneys=Number(mon.cash);
         if($scope.mon.money==''){
              $yikeUtils.toast('请输入提现金额');            
        }
        else if($scope.mon.money>$scope.lis.money){
            $yikeUtils.toast('提现金额超出余额'); 
        }
        else if($scope.selec==''){
           $yikeUtils.toast('请输入银行');
        }else if($scope.selec == undefined){
            $yikeUtils.toast('请添加银行卡')
        }
        else{
          yikejd.query('/apicloud/Income/withdrawals',{openid:TOKEN,card_id:mon.card_id,cash:moneys})      
      .then(function(data){
          $ionicLoading.hide();
          $yikeUtils.toast(data.msg); 
            $scope.tsM=data.result;
           $scope.mod.hide();
           $scope.modals.show();
           myIncome();
           withdrawBank();
          $scope.$digest();
      })
        }
      
  }
  //提现获取银行列表
  function withdrawBank(){
      $ionicLoading.show();
      yikejd.query('/apicloud/Income/lists',{openid:TOKEN})      
      .then(function(data){
          $ionicLoading.hide();
          $scope.lis=data.result;
          $scope.selec=data.result.bank[0].id;
          $scope.choices=data.result.choice;
          $scope.selected.name=data.result.choice[0].name;
          $scope.selected.id=data.result.choice[0].id;
          $scope.$digest();
      },function(data){
          $ionicLoading.hide();
          $scope.selec=[];
      })

  }

  // 添加银行卡
    function addBank(bank){
        var num=bank.number;
        if($scope.selected==''){
           $yikeUtils.toast('请输入银行卡');
        }
        else if($scope.num.numbe==''){
              $yikeUtils.toast('请输入银行卡号');            
        }
        else if(!myreg.test($scope.num.numbe)){
             $yikeUtils.toast('请输入正确的银行卡号');

        }
        else{
         yikejd.query('/apicloud/Income/addBank',{openid:TOKEN,bank:bank.bank.name.id,number:num})
      .then(function(data){
          $ionicLoading.hide();
          if(data.status==0){
              $yikeUtils.toast(data.msg);
              $scope.modal.hide();
          }else{
              $yikeUtils.toast(data.msg);
              $ionicLoading.hide();
              $scope.modal.hide();
              bankList();
              withdrawBank();
          }
          $scope.$digest();

      })
        }
      
  }
    // 银行卡列表
    function bankList(){
      yikejd.query('/apicloud/Income/teacherBank',{openid:TOKEN})      
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
  // 删除银行卡
    function delBank(list){
      yikejd.query('/apicloud/Income/removeBank',{openid:TOKEN,id:list.id})      
      .then(function(data){
          $yikeUtils.toast(data.msg);
          bankList();
          $scope.$digest();

      })
  }
    //添加银行卡模态
    $ionicModal.fromTemplateUrl('templates/modal/add-bank-modal.html', {
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
        // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });
    //提现模态
    $ionicModal.fromTemplateUrl('templates/modal/withdraw-deposit-modal.html', {
        scope: $scope,
        animation: 'slide-in-left'
    }).then(function(mod) {
        $scope.mod = mod;
    });
    $scope.openMod = function() {
        $scope.mod.show();                     
        };
    $scope.closeMod = function() {
            $scope.mod.hide();
        };
        // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
            $scope.mod.remove();
        });
    //提现成功模态
    $ionicModal.fromTemplateUrl('templates/modal/withdraw-success-modal.html', {
        scope: $scope,
        animation: 'slide-in-left'
    }).then(function(modals) {
        $scope.modals = modals;
    });
    $scope.openModals = function() {
        $scope.modals.show();                     
        };
    $scope.closeModals = function() {
            $scope.modals.hide();
        };
        // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
            $scope.modals.remove();
        });
  }
})();