angular.module('starter.controllers', [])
.controller('QuestionCtrl',function($scope,$ionicActionSheet,$timeout,Settings){
  $scope.editMode=false;
  $scope.flag={showDelete:false,showReorder:false};
  $scope.items=[];
  $scope.delete_item=function(item){
    var idx = $scope.items.indexOf(item);
    $scope.items.splice(idx,1);
  };
  $scope.move_item = function(item, fromIndex, toIndex) {
    $scope.items.splice(fromIndex, 1);
    $scope.items.splice(toIndex, 0, item);
  };

  $scope.cal=function(item){
    //alert(item.indexOf('='));
    var idx = $scope.items.indexOf(item);
    if(item.indexOf('=')>-1)
    {
      $scope.items[idx]=item.substring(0,item.indexOf('='));
    }else
    {
      var result=eval(item);
      if (result.toString().indexOf('.')>=0) {
        result=result.toFixed($scope.Parameter.numberOfDecimal);
      };
    $scope.items[idx]=item+"="+result;
    }
  };
 
  //$scope.Parameter={count:10,numbers:2,operators:[{label:"+",selected:true},{label:"-",selected:false},{label:"*",selected:false},{label:"/",selected:false}]
 // ,numberFormate:[{label:1,selected:true},{label:10,selected:false},{label:100,selected:false}],numberOfDecimal:2};
$scope.Parameter=Settings.Params();
 
  Array.prototype.contains = function(obj) { 
var i = this.length; 
while (i--) { 
if (this[i].toString() == obj.toString()) { 
return true; 
} 
} 
return false; 
} ;

  $scope.GenerateQuestion=function(){
   var count=$scope.Parameter.count;
   var num= $scope.Parameter.numbers;
   var numberFormate=$scope.Parameter.numberFormate.filter(function(item) {
    return item.selected;
  }).map(function (item) {
    return item.label;
  });
   var lengthNumber=numberFormate.length;
   var operators=$scope.Parameter.operators.filter(function(item) {
    return item.selected;
  }).map(function (item) {
    return item.label;
  });
   var operatorLength=operators.length;
   var formulars=[];
   var calTimes=0
   while(formulars.length<count && calTimes<count*2)
   {
     var formular="";
     for (var i = 0; i <num; i++) {
      var j=Math.floor(Math.random()*lengthNumber);
      var number_i=Math.floor(Math.random()*(numberFormate[j]*10-numberFormate[j]))+numberFormate[j];
        var operator="";
        if (i>0) {
        var k=Math.floor(Math.random()*operatorLength);
         operator=operators[k];
      }
        formular+=(operator+number_i);
     };
     
     if(!formulars.contains(formular)){
      formulars.push(formular);
     }
     // formulars.push(formular);
     calTimes++;
   }
   $scope.items=formulars;
  };
  $scope.GenerateQuestion();
  // Triggered on a button click, or some other target
  $scope.show = function() {

    // Show the action sheet
    var hideSheet = $ionicActionSheet.show({
      titleText: "选项",
      buttons: [
        { text: "删除/排序" },
        { text: "重新生成" },
        { text: "分享到..." }
      ],
      buttonClicked: function(index) {
        if (index==0) {
          $scope.editMode=!$scope.editMode;
          $scope.flag.showDelete=$scope.editMode;
          $scope.flag.showReorder=$scope.editMode;
        }else if (index==1) {
          $scope.GenerateQuestion();
        };
        return true;
      },
      cancelText: "取消",
      cancel: function() {
        // add cancel code..
      }
    });

    // For example's sake, hide the sheet after two seconds
    $timeout(function() {
    //  hideSheet();
    }, 2000);

  };
})
.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope,Settings) {
  $scope.Parameter =Settings.Params();
})
.controller('SettingCtrl', function($scope,Settings) {
  $scope.Parameter =Settings.Params();
});
