/**
 * Created by djiao on 5/6/16.
 */

ristoreApp.controller("fmCtrl",
    ['$scope', '$filter', '$window', '$sce', 'fmFactory', 'NgTableParams', function($scope, $filter, $window, $sce, fmFactory, NgTableParams) {
        var self = this;
        $scope.showTable = false;
        $scope.fmSearch = function () {
            
            var ajax;
            switch ($scope.selection) {
                case "all":
                    ajax = fmFactory.getAll();
                    break;
                case "mrn":
                    ajax = fmFactory.getByMrn($scope.keyword);
                    break;
                case "reportid":
                    ajax = fmFactory.getByReportId($scope.keyword);
                    break;
            }
            self.tableParams = new NgTableParams({
                page: 1,            // show first page
                count: 10,          // count per page
                sorting: {
                    frReportId: 'asc'
                }
            }, {
                getData: function (params) {
                    return ajax.then(function(response) {
                        var reports = response.data;
                        params.total(reports.length);
                        $scope.length = reports.length;
                        var sorted = params.sorting() ? $filter('orderBy')(reports, params.orderBy()) : reports;
                        $scope.showTable = true;
                        return sorted.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    });
                }
            });
                //self.tableParams.reload();
        }
        $scope.downloadXML = function(filename) {
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            fmFactory.getXMLFile(filename).then(function (response) {
                var file = new Blob([response.data], {type: 'application/xml'});
                var fileURL = window.URL.createObjectURL(file);
                a.href = fileURL;
                a.download = filename;
                a.click();
            });
        }

        $scope.viewXML = function(filename) {
            fmFactory.getXMLFile(filename).then(function (response) {
                var file = new Blob([response.data], {type: 'application/xml'});
                var fileURL = window.URL.createObjectURL(file);
                $window.open(fileURL, '_blank', 'width=700, height=800');

            });
        }
    }]
)