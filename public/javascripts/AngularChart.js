var app = angular.module('app', []);

app.controller('dataController', function($scope, $http) {
  $http.get("https://isys475-assignment1-logan-hanson.c9users.io/abortion").then(function (response) {
    
      google.charts.load('current', {packages: ['corechart', 'bar']});
      google.charts.setOnLoadCallback(function() {
        formatDataTable(response.data);
      });
  });
});
function formatDataTable(chartdata) {
  var data = [];
  var header = ['Age Group', 'Abortion Count'];
  data.push(header);
  for (var i = 0; i < chartdata.length; i++) {
    var temp = [];
    temp.push(chartdata[i]._id);
    temp.push(chartdata[i].value);
    data.push(temp);
  }
  var g_data = google.visualization.arrayToDataTable(data);
  var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
  chart.draw(g_data, getOptions());
}
function getOptions()
{
     var options = {
        title: 'Abortion Demographics in Illinois from 2009-2012',
        chartArea: {width: '50%'},
        hAxis: {
          title: 'Number of Individuals who Receivced an Abortion',
          minValue: 0
        },
        vAxis: {
          title: 'Age Group'
        }
      };

    return options;
}