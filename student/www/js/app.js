// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','yike','diagnosis.module','tab.module','teacher.module','account.module'])
.constant('$ionicLoadingConfig',{
  template:'<div><img src="img/tabs/loading.gif" alt="" style="width:48px;height:48px;"></div>',//loading模板
  animation: 'fade-in',
  duration: 3000, //loading加载时间
  noBacdrop: false, //模态框加载  默认false
  hideOnStateChange: false //loading图片隐藏
})

.run(function($ionicPlatform,$rootScope,$state) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if($state.params.token){
      localStorageService.set('TOKEN',$state.params.token);
    }
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
     $ionicConfigProvider.tabs.position('bottom');
     $ionicConfigProvider.tabs.style('standard');
     $ionicConfigProvider.navBar.alignTitle('center');
     $ionicConfigProvider.navBar.positionPrimaryButtons('left');
     $ionicConfigProvider.backButton.icon('ion-ios-arrow-left');
     $ionicConfigProvider.views.swipeBackEnabled(false);
     $ionicConfigProvider.views.maxCache(0);
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  //诊断
  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-diagnosis.html',
        controller: 'tabDiagnosisCtrl'
      }
    }
  })
  //教师
  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-teacher.html',
         controller: 'tabChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          //controller: 'ChatDetailCtrl'
        }
      }
    })
  //我的个人信息
  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'tabAccountCtrl'
      }
    }
  })
  //学习诊断
  .state('study-diagnosis', {
    url: '/study-diagnosis',
    templateUrl:'templates/diagnosis/study-diagnosis.html',
    controller: 'diagnosisCtrl'
  })
  //报告及解决方案
  .state('report', {
    url: '/report',
    templateUrl:'templates/diagnosis/report.html',
    controller: 'diagnosisReportCtrl'
  })
  //查看上一次诊断
      .state('last-report', {
          url: '/last-report',
          templateUrl:'templates/diagnosis/last-report.html',
          controller: 'diagnosisReportedCtrl'
      })
  //教师列表
  .state('teacher-list', {
    url: '/teacher-list/:gid/:address',
    templateUrl:'templates/teacher/teacher-list.html',
    controller: 'teacherListCtrl'
  })
  //教师详情
  .state('teacher-detail', {
    url: '/teacher-detail/:id',
    templateUrl:'templates/teacher/teacher-detail.html',
    controller: 'teacherDetailCtrl'
  })
  //预约教师
  .state('teacher-yue', {
    url: '/teacher-yue/:id',
    templateUrl:'templates/teacher/teacher-yue.html',
    controller: 'teacheryueCtrl'
  })
  //预约教师1
      .state('teacher-yue1', {
        url: '/teacher-yue1/:id',
        templateUrl:'templates/teacher/teacher-yue1.html',
        controller: 'teacheryueCtrl'
      })
  //预约完成
  .state('teacher-complete', {
    url: '/teacher-complete',
    templateUrl:'templates/teacher/teacher-complete.html',
    controller: 'teacherCompleteCtrl'
  })
  ////登录
  //.state('login', {
  //  url: '/login',
  //  templateUrl:'templates/login/login.html',
  //  //controller: 'teacherDetailCtrl'
  //})
  ////登录界面
  //.state('login-page', {
  //  url: '/login-page',
  //  templateUrl:'templates/login/login-page.html',
  //  //controller: 'teacherDetailCtrl'
  //})
  ////注册
  //.state('register', {
  //  url: '/register',
  //  templateUrl:'templates/register/register.html',
  //  //controller: 'teacherDetailCtrl'
  //})
  ////手机验证登录
  //.state('phone-login', {
  //  url: '/phone-login',
  //  templateUrl:'templates/login/phone-login.html',
  //  //controller: 'teacherDetailCtrl'
  //})
  //课程列表
  .state('subject-list', {
    url: '/subject-list',
    templateUrl:'templates/account/subject-list.html',
    controller: 'subjectListCtrl'
  })
  //课程详情
  .state('subject-detail', {
    url: '/subject-detail/:id',
    templateUrl:'templates/account/subject-detail.html',
    controller: 'subjectDetailCtrl'
  })
  //我关注的老师
  .state('contact-teacher', {
    url: '/contact-teacher',
    templateUrl:'templates/account/contact-teacher.html',
    controller: 'contectTeacherCtrl'
  })
  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
