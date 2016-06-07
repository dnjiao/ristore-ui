/**
 * Created by djiao on 5/6/16.
 */

ristoreApp.controller("fmCtrl",
    ['$scope', 'fmFactory', function($scope, fmFactory) {
        $scope.selection = '0';
        $scope.reports = [];
        $scope.fmSearch = function() {
            if ($scope.selection == '0') {
                fmFactory.getAll().success(function(data){
                    $scope.reports=data;
                });
            }
        }
    }]
)