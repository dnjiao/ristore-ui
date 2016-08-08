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
                    $scope.reports = data;
                    $scope.tableParams = new ngTableParams({
                        page: 1,            // show first page
                        count: 10,          // count per page
                    }, {
                        total: $scope.reports.length, // length of data
                        getData: function($defer, params) {
                            $defer.resolve($scope.reports.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                        }
                });
            }
        }
    }]
)