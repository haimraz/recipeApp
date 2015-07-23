var d3App = angular.module("d3App", []);

d3App.directive('pieChartDirective', function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            data: '=',
        },
        link: function (scope, elm, attrs) {

            var width = 960,
                height = 600,
                radius = Math.min(width, height) / 2;

            var color = d3.scale.ordinal()
                .range(["#98abc5", "#8a89a6", "#7b6888"]);

            var arc = d3.svg.arc()
                .outerRadius(radius - 10)
                .innerRadius(0);

            var pie = d3.layout.pie()
                .sort(null)
                .value(function (d) {
                    return d.total;
                });

            scope.onChange = function (newData) {

                var svg = d3.select("#graphWrapper").append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .append("g")
                    .attr("transform", "translate(" + width / 3 + "," + height / 2 + ")")

                newData.forEach(function (d) {
                    d.total = +d.total;
                });

                var g = svg.selectAll(".arc")
                    .data(pie(newData))
                    .enter().append("g")
                    .attr("class", "arc");

                g.append("path")
                    .attr("d", arc)
                    .style("fill", function (d) {
                        return color(d.data._id);
                    });

                g.append("text")
                    .attr("transform", function (d) {
                        return "translate(" + arc.centroid(d) + ")";
                    })
                    .attr("dy", ".35em")
                    .style("text-anchor", "middle")
                    .text(function (d) {
                        return d.data._id;
                    });
            }

            scope.delOld = function () {
                $('svg').remove();
            }

            scope.$watch('data', function (newValue, oldValue) {
                scope.delOld();
                scope.onChange(newValue);
            }, true);
        }
    }
});

d3App.directive('barChartDirective', function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            data: '=',
        },
        link: function (scope, elm, attrs) {

            var margin = {
                    top: 20,
                    right: 20,
                    bottom: 30,
                    left: 40
                },
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            var formatPercent = d3.format(".0%");

            var x = d3.scale.ordinal()
                .rangeRoundBands([0, width], .1, 1);

            var y = d3.scale.linear()
                .range([height, 0]);

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left")
                .tickFormat(formatPercent);

            scope.onChange = function (newData) {

                var svg = d3.select("#graphWrapper").append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                scope.data.forEach(function (d) {
                    d.average = +d.average;
                });

                x.domain(scope.data.map(function (d) {
                    return d._id;
                }));
                y.domain([0, d3.max(scope.data, function (d) {
                    return d.average;
                })]);

                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);

                svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis)
                    .append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 6)
                    .attr("dy", ".71em")
                    .style("text-anchor", "end")
                    .text("Average Rank");

                svg.selectAll(".bar")
                    .data(scope.data)
                    .enter().append("rect")
                    .attr("class", "bar")
                    .attr("x", function (d) {
                        return x(d._id);
                    })
                    .attr("width", x.rangeBand())
                    .attr("y", function (d) {
                        return y(d.average);
                    })
                    .attr("height", function (d) {
                        return height - y(d.average);
                    });

                d3.select("input").on("change", change);

                var sortTimeout = setTimeout(function () {
                    d3.select("input").property("checked", true).each(change);
                }, 2000);

                function change() {
                    clearTimeout(sortTimeout);

                    // Copy-on-write since tweens are evaluated after a delay.
                    var x0 = x.domain(scope.data.sort(this.checked ? function (a, b) {
                                return b.average - a.average;
                            } : function (a, b) {
                                return d3.ascending(a._id, b._id);
                            })
                            .map(function (d) {
                                return d._id;
                            }))
                        .copy();

                    svg.selectAll(".bar")
                        .sort(function (a, b) {
                            return x0(a._id) - x0(b._id);
                        });

                    var transition = svg.transition().duration(750),
                        delay = function (d, i) {
                            return i * 50;
                        };

                    transition.selectAll(".bar")
                        .delay(delay)
                        .attr("x", function (d) {
                            return x0(d._id);
                        });

                    transition.select(".x.axis")
                        .call(xAxis)
                        .selectAll("g")
                        .delay(delay);
                }
            }

            scope.delOld = function () {
                $('svg').remove();
            }

            scope.$watch('data', function (newValue, oldValue) {
                scope.delOld();
                scope.onChange(newValue);
            }, true);
        }
    }
});