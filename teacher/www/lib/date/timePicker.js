(function () {
    'use strict';
    angular.module('Jason', [])
    /*日期时间选择*/
        .directive('timePicker', [
            '$timeout',
            '$compile', '$ionicScrollDelegate','$ionicBackdrop','$q','$yikeUtils',
            function ($timeout,$compile,$ionicScrollDelegate,$ionicBackdrop,$q,$yikeUtils) {
               return{
        template: '<button class="detail-btn">调整上课时间</button>',
        restrict: 'AE',
        replace: true,
        scope: {
            timePickerResult: '='  //双向绑定
        },
        link: function (scope, elm, attrs) {
            var tem = "<div class='pickerContainer datetimeactive'>" +
                "<div class='main'>" +
                "<div  class='header'>{{title}}</div>"
                +"<div class='row' ng-click='startTimeBegin()'><button style='margin-bottom:10px;background:#F08080;border:none;color:#fff;border-radius:6px'>点击修改开始时间:</button> {{selectDateTime.start}}</div>"
                +"<div class='row' ng-click='endTimeEnd()'><button style='background:#F08080;border:none;color:#fff;border-radius:6px'>点击修改结束时间:</button> {{selectDateTime.end}}</div>"
                + "<div class='body'>"
                + "<ion-scroll on-scroll='dateScrolling($event)' delegate-handle='dateScroll' scrollbar-y='false' class='dateContent'>" + "<ul>" + "<li style='font-size: 18px;position: relative;top:116px;color:#F08080'>{{dayInfo}}</li>" + "</ul>" + "</ion-scroll>" + "<ion-scroll on-scroll='timeScrolling($event)' delegate-handle='timeScroll' scrollbar-y='false' class='timeContent'>" + "<ul>" + "<li ng-style='time.selected ? { color: \"#F08080\",fontWeight: \"bold\", fontSize: \"1.5em\"}:{}' ng-click='selectTime($index)' ng-repeat='time in timeList'>{{time.text}}</li>" + "</ul>" + "</ion-scroll>" + "</div>" + "<div class='footer'><span ng-click='ok()'>确定</span><span ng-click='cancel()'>取消</span></div>" + "</div>" + "</div>";
            var options = {
                title: attrs.title || "时间选择",
                bodyHeight:1, //body高度
                height: 40, // 每个滑动 li 的高度
                dateNum: 1,//可选日期数量
                timeNum: 24,//可选时间数量
                dateStart: new Date(), //开始日期
                timeStart: new Date().getHours(), //开始时间
                timeSpan: attrs.timeSpan || 30, //时间间隔 默认 15分钟一个间隔 
                minuteSkip: 30//当前时间多少分钟后 可选 15 30
            }
            scope.title = options.title;
            scope.dateList = [];
            scope.timeList = [];
            scope.selectDateTime = {
                date: {item: null, index: 0},
                time: {item: null, index: 0},
                show:""
            };
            init(options);
            elm.on("click", function () {
                show();
                scrollToElm(scope.timeScroll, scope.timeList[scope.selectDateTime.time.index-3]);
                scrollToElm(scope.dateScroll, scope.dateList[scope.selectDateTime.date.index -3]);
            });
            //获取学生详情信息
            function studentDetail(){
                 scope.id = localStorage.getItem("classId");
                    yikejd.query('/apicloud/teacher/myDoingClass',{openid:TOKEN,classId:scope.id})      
                    .then(function(data){
                    // console.log(data);
                    scope.deta=data.result.day;
                    scope.dayInfo = data.result.day;
                    var pattern = "年";
                    var pattern1 = "月";
                    var pattern2 = "日";
                    scope.deta= scope.deta.replace(pattern,'/');
                    scope.deta= scope.deta.replace(pattern1,'/');
                    scope.deta= scope.deta.replace(pattern2,'');
                    scope.tmp = scope.deta;
                    scope.$digest();

                })
            }
            scope.timeScrolling = function (event) {
               var posi = scope.timeScroll.getScrollPosition();
                angular.forEach(scope.timeList, function (item, index) {
                    if (posi.top >= item.top && posi.top < scope.timeList[index + 1].top) {
                        setArraySelectedState(scope.timeList);
                        $timeout(function () {

                            scope.timeList[index + 3].selected = true;
                        });
                    }
                });
            };
            scope.ok = function () {
                scope.id = localStorage.getItem("classId");

                            //更改上课时间
                            if(scope.kidStart==undefined||scope.kidEnd==undefined){
                                $yikeUtils.toast("修改失败,请确定开始和结束时间");
                                hide();
                            }else{
                               yikejd.query('/apicloud/teacherClass/changeTime',{openid:TOKEN,startTime:scope.kidStart,endTime:scope.kidEnd,classId:scope.id})      
                                    .then(function(data){
                                        $yikeUtils.toast(data.msg);
                                        if(data.status == 1){
                                            $yikeUtils.toast(data.msg +",请刷新课程信息");
                                            hide();
                                        }else if(data.status == 0){
                                            $yikeUtils.toast(data.msg);
                                            hide();
                                        }
                                        scope.$digest()
                                 })
                                .catch(function (data) {
                                    $yikeUtils.toast(data.msg);
                                });
                            }
            }
            scope.cancel = function () {
               hide();
            }
            //日期点击事件
            scope.selectDate = function (index) {
                if (index >2 && index <= scope.dateList.length - 3) {
                    scrollToElm(scope.dateScroll, scope.dateList[index - 3]);
                }
            }
            //时间点击事件
            scope.selectTime = function (index) {
                if (index >2 && index <= scope.timeList.length - 3) {
                    scrollToElm(scope.timeScroll, scope.timeList[index -3]);
                }
            }
            //初始化选择器
            function init(options) {
                initDate(options);
                initTime(options);
                tem = angular.element(tem);
                $compile(tem)(scope);
                angular.element(document.body).append(tem);
                scope.dateScroll = $ionicScrollDelegate.$getByHandle("dateScroll");
                scope.timeScroll = $ionicScrollDelegate.$getByHandle("timeScroll");              
            }
            //日期初始化
            function initDate(options) {
                //开始时间
                studentDetail();
                var sYear = options.dateStart.getFullYear(), sMonth = options.dateStart.getMonth(),
                 sDate = options.dateStart.getDate(),
                dateTimeNow = new Date(),
                dateNow = dateTimeNow.getDate(),
                w="日一二三四五六".charAt(dIndex);
                prependLi(scope.dateList, 3, "b")
                for (var i = 0; i < options.dateNum; i++) {
                    var nextDate = new Date(sYear, sMonth, sDate + i), m = nextDate.getMonth() + 1, d = nextDate.getDate(), dIndex = nextDate.getDay(), w = "日一二三四五六".charAt(dIndex);
                    m = prependZero(m, 10);
                    d = prependZero(d, 10);
                    if (parseInt(d) == getDateAfterNum(dateTimeNow, 0)) {
                        text = "今天";
                    } else if (parseInt(d) == getDateAfterNum(dateTimeNow, 1)) {
                        text = "明天";
                    } else if (parseInt(d) == getDateAfterNum(dateTimeNow, 2)) {
                        text = "后天";
                    }
                    else {
                        var text = m + "月" + d + "日";
                    }
                    var data = m + "-" + d;
                    var top = options.height + scope.dateList[scope.dateList.length - 1].top;
                   // (options.height + options.height * (i + 1))
                    scope.dateList.push(createDateTimeLi(0,top , data, false, text))
                }
                prependLi(scope.dateList, 3, "e");
                //获取默认选择日期
                var defaultSelectDate = getDefaultSelectDate(options);
                angular.forEach(scope.dateList, function (item, index) {
                    if (item.data == defaultSelectDate) {
                        item.selected = true;
                        scope.selectDateTime.date.item = item;
                        scope.selectDateTime.date.index = index;
                        return;
                    }
                });
            }
            //时间初始化
            function initTime(options) {
                prependLi(scope.timeList, 3, "b");
                for (var i = 0; i < options.timeNum; i++) {
                    var t = options.timeStart + i;
                    if (t >= 24) {
                        t = t - 24;
                        t = prependZero(t, 10);
                    } else if (t < 10) {
                        t = prependZero(t, 10);
                    }
                    //按时间间隔来生产时间li
                    for (var j = 0; j < 60 / (options.timeSpan); j++) {
                        var top = options.height + scope.timeList[scope.timeList.length - 1].top;
                        var data = t + ":" + (j * options.timeSpan == 0 ? "00" : j * options.timeSpan);
                        scope.timeList.push(createDateTimeLi(0, top, data, false, data));
                    }
                }
                prependLi(scope.timeList, 3, "e");
                //获取默认选择时间
                var defaultSelectTime = getDefaultSelectTime(options);
                angular.forEach(scope.timeList, function (item, index) {
                    if (item.data == defaultSelectTime) {
                        item.selected = true;
                        scope.selectDateTime.time.item = item;
                        scope.selectDateTime.time.index = index;
                        return;
                    }
                });

                //getSelectDateTime();
                //setSelectDateTimeShow();
            }
            //计算默认的选择时间
            function getDefaultSelectTime(options) {
                var datetimeNow = new Date();
                var hour = datetimeNow.getHours();
               var  minu = datetimeNow.getMinutes();
                minu = minu + options.minuteSkip;
                var span = minu - 60;
                var spanNum;
                if (span >= 0) {
                    hour += 1;
                    spanNum = Math.round(Math.abs(span) / options.timeSpan);
                }else {
                    spanNum = Math.round(minu / options.timeSpan);
                }
                switch (spanNum) {
                    case 1:
                        minu = options.timeSpan;
                        break;
                    case 2:
                        minu = options.timeSpan * 2;
                        break;
                    case 3:
                        minu = options.timeSpan * 3;
                        break;
                    case 4:
                        hour += 1;
                        minu = 0;
                    default :
                        minu = 0;
                        break;
                }
                return prependZero(hour, 10) + ":" + prependZero(minu, 10);
            }
            //计算默认选择的日期
            function getDefaultSelectDate(options) {
                return scope.dateList[3].data;
            }
            function prependZero(data, num) {
                return data >= num ? data : "0" + data;
            }
            function createDateTimeLi(left, top, data, selected, text) {
                var li = {left: left, top: top, data: data, selected: selected, text: text };
                return li;
            }
            function prependLi(arr, num, loc) {
                loc = loc || "b";
                switch (loc) {
                    case "b":
                        for (var i = 0; i < num; i++) {
                            arr.push(createDateTimeLi(0, options.height * i, "", false, ""));
                        }
                        break;
                    case "e":
                        //最后那个li元素的 top
                        var lastPosiTop = arr[arr.length - 1].top;
                        for (var j = 0; j < num; j++) {
                            arr.push(createDateTimeLi(0, (options.height * (i + 1) + lastPosiTop), "", false, ""));
                        }
                        break;
                }
            }
            function setArraySelectedState(arr, state) {
                state = state || false;
                angular.forEach(arr, function (item, index) {
                    item.selected = state;
                });
            }
            function getDateAfterNum(dateTimeNow,afterNum){
               //return
              dateTimeNow.setDate(dateTimeNow.getDate()+afterNum);
              var date=dateTimeNow.getDate();
                dateTimeNow.setDate(dateTimeNow.getDate()-afterNum);
              return date;
            }
            //滑动到指定元素
            function scrollToElm(scorllHandler, elm) {
                scorllHandler.scrollTo(elm.left, elm.top, true);
            }
            //选中时间展示
            function setSelectDateTimeShow() {
                var dateTxt = scope.selectDateTime.date.item.text;
                var timeTxt = scope.selectDateTime.time.item.text;
                scope.selectDateTime.show = dateTxt + " " + timeTxt;
            }
            // 选中开始时间
            function set() {
                var timeTxt = scope.selectDateTime.time.item.text;
                scope.selectDateTime.start = scope.dayInfo + " " + timeTxt;
                // 转化成毫秒数
                scope.selectDateTime.kidStart = scope.deta + " " + timeTxt;
                scope.kidStart = Math.round(new Date(scope.selectDateTime.kidStart).getTime()/1000);
            }
            // 选中结束时间
            function Select() {
                var timeTxt = scope.selectDateTime.time.item.text;
                scope.selectDateTime.end = scope.dayInfo + " " + timeTxt;
                //转化成毫秒数End
                scope.selectDateTime.kidEnd = scope.deta + " " + timeTxt;
                scope.kidEnd = Math.round(new Date(scope.selectDateTime.kidEnd).getTime()/1000);
            }
            //点击开始时间按钮
            scope.startTimeBegin = function(){
                getSelectDateTime();
                set();
            }
            //点击开始时间按钮
            scope.endTimeEnd = function(){
                getSelectDateTime();
                Select();
            }                   
            //获取选中的日期时间
            function getSelectDateTime() {
                var time = "";
                for (var j = 0; j < scope.timeList.length; j++) {
                    if (scope.timeList[j].selected) {
                        time = scope.timeList[j].data;
                       
                        scope.selectDateTime.time.item = scope.timeList[j];
                        scope.selectDateTime.time.index = j;
                        break;
                    }
                }
                if (!time) {
                    time = scope.selectDateTime.time.item.data;
                }
               var result=new Date().getFullYear()+ " " + time;
                scope.timePickerResult=result;
                return result;
            }
            function show(){
                  $ionicBackdrop.retain();
                 tem.css("display", "block");
            }
            function hide() {
                tem.css("display", "none");
                $ionicBackdrop.release();
            }
            function remove(){
                tem.remove();
            }
            scope.$on("$destroy", function () {
                remove();
            })
        }
    }
            }
        ]);
})(window, document);
