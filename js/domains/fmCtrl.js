/**
 * Created by djiao on 5/6/16.
 */

ristoreApp.controller("fmCtrl",
    ['$scope', 'fmFactory', 'NgTableParams', function($scope, fmFactory, NgTableParams) {
        var self = this;
        $scope.selection = '0';
        $scope.fmSearch = function () {
            if ($scope.selection == '0') {
                self.tableParams = new NgTableParams({
                    page: 1,            // show first page
                    count: 10,          // count per page
                    sorting: {
                        frReportId: 'asc'
                    }
                }, {
                    getData: function (params) {
                        // var sorting = params.sorting();
                        // var orderBy;
                        // var direction;
                        // $.each(sorting, function(k, v) {
                        //     orderBy = k;
                        //     direction = v;
                        // });
                        
//                        return fmFactory.getAll(params.page(), params.count(), orderBy, direction)
                        return fmFactory.getAll()
                            .then(function(response) {
                                var reports = response.data;
                                params.total(reports.length);
                                console.log(params.total());
                                return reports.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        });
                    }
                });
                self.tableParams.reload();
            }
        }
    }]
)