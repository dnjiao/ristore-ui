/**
 * Created by djiao on 5/6/16.
 */

ristoreApp.controller("fmCtrl",
    ['$scope', '$filter', 'fmFactory', 'NgTableParams', function($scope, $filter, fmFactory, NgTableParams) {
        var self = this;
        $scope.selection = '0';
        $scope.fmSearch = function () {
            if ($scope.selection == '0') {
                var Ajax = fmFactory.getAll();
                self.tableParams = new NgTableParams({
                    page: 1,            // show first page
                    count: 10,          // count per page
                    sorting: {
                        frReportId: 'asc'
                    }
                }, {
                    getData: function (params) {
                        return Ajax.then(function(response) {
                                var reports = response.data;
                                params.total(reports.length);
                                console.log(params.total());
                                var sorted = params.sorting() ? $filter('orderBy')(reports, params.orderBy()) : reports;
                                return sorted.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        });
                    }
                });
                //self.tableParams.reload();
            }
        }
    }]
)