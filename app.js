﻿﻿'use strict';

var dnsApp = angular.module('dnsApp',
    []
);

dnsApp.controller('json', ['$scope', '$http', function ($scope, $http) {
    require.config({ paths: { 'vs': 'node_modules/monaco-editor/min/vs' } });
    
    var url = 'https://www.whoisxmlapi.com/whoisserver/DNSService?apiKey=' + $scope.key +
                '&domainName='+ $scope.domain+
                '&type='+ $scope.type +
                '&outputFormat=json'
    $http.get('https://www.whoisxmlapi.com/whoisserver/DNSService').success(function (data)
                    {
                        $scope.data = data;

                        require(['vs/editor/editor.main'], function () {
                            $scope.editor = monaco.editor.create(document.getElementById('container'), {
                                value: JSON.stringify(data, null, 2),
                                language: 'json',
                                readOnly: true
                            });
                        });
                    });

    $scope.change = function () {
        $scope.editor.setValue(JSON.stringify($scope.data, null, 2));
    };
}]);