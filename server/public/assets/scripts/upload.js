var myApp = angular.module("myApp", []);

myApp.controller("image-controller", ["$scope", "$http", function($scope, $http){

  $scope.images = [];

}])
.directive('fileread', ['$http',function($http){
  return {
      restrict: 'A',
      link: function($scope,elem, attrs){
        elem.bind("change",function(changeEvent){
          var reader = new FileReader();

          reader.onloadend = function(loadEvent){
            var fileread = loadEvent.target.result;
            var tempArray = elem[0].value.split('\\');
            var fileName = tempArray[tempArray.length - 1];


            var imageExtension = fileread.split(';')[0].split('/');
            imageExtension = imageExtension[imageExtension.length - 1];

            var newImage = {
              imageName: fileName,
              imageBody: fileread,
              imageExtension: imageExtension
            };
            console.log(newImage);

            $http.post('upload-image',newImage).then(function(result){
              // If the image saved successfully to aws, store id in db
              console.log(result);
              $scope.images.unshift({url: result.data});
            })
            .catch(function(err){
              console.log(err);
            });
          };
          reader.readAsDataURL(changeEvent.target.files[0]);
        });
      }
  }
}]);
