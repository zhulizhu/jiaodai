// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','yike','tab.module','student.module','my.module','Jason'])
.constant('$ionicLoadingConfig',{
      template:'<div><img src="img/tabs/loading.gif" alt="" style="width:48px;height: 48px;"></div>',//loading模板
      animation: 'fade-in',
      duration: 3000, //loading加载时间
      noBacdrop: false, //模态框加载  默认false
      hideOnStateChange: false //loading图片隐藏
})
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
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
  //我的课程
  .state('tab.subject', {
    url: '/subject',
    views: {
      'tab-subject': {
        templateUrl: 'templates/tab-subject.html',
        controller: 'tabSubjectCtrl'
      }
    }
  })
  //教师团队
  .state('tab.teacher', {
      url: '/teacher',
      views: {
        'tab-teacher': {
          templateUrl: 'templates/tab-teacher.html',
          controller: 'tabTeacherCtrl'
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
  //个人中心
  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'tabAccountCtrl'
      }
    }
  })
  //历史课程
  .state('history', {
    url: '/history',
    templateUrl: 'templates/subject/history-subject.html',
    controller: 'historySubjectCtrl'
  })
  //历史课程详情
  .state('history-detail', {
    url: '/history-detail/:id',
    templateUrl: 'templates/subject/history-detail.html',
    controller: 'historyDetailCtrl'
  })
  //我的资料
  .state('my-profile', {
    url: '/my-profile',
    templateUrl: 'templates/account/my-profile.html',
    controller: 'myProfileCtrl'
  })
  //上课时间
  .state('my-classtime', {
    url: '/my-classtime',
    templateUrl: 'templates/account/my-classtime.html',
    controller: 'myClasstimeCtrl'
  })
  //修改资料
  .state('compile', {
    url: '/compile',
    templateUrl: 'templates/account/compile.html',
    controller: 'CompileCtrl'
  })
  //我的收入
  .state('my-income', {
    url: '/my-income',
    templateUrl: 'templates/account/my-income.html',
    controller: 'myIncomeCtrl'
  })
  //我的课程详情
  .state('my-detail', {
    url: '/my-detail/:id',
    templateUrl: 'templates/subject/my-detail.html',
    controller: 'myclassDetailCtrl'
  })
  //我的相册
  .state('my-photo', {
    url: '/my-photo',
    templateUrl: 'templates/account/my-photo.html',
    controller: 'myPhotoCtrl'
  })
  //我的可教年级
  .state('my-grade', {
    url: '/my-grade',
    templateUrl: 'templates/account/my-grade.html',
    controller: 'myGradeCtrl'
  })
   //学生详情
  .state('student-detail', {
    url: '/student-detail/:sid',
    templateUrl: 'templates/subject/student-detail.html',
    controller: 'studentDetailCtrl'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/subject');

});
