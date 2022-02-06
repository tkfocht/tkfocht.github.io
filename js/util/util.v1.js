var csvDateParse = d3.timeParse("%m/%d/%Y");
var urlDateParse = d3.timeParse("%m-%d-%Y");
var dateFormat = d3.timeFormat("%m-%d-%Y");

var csvUrlForSeason = function(id) {
    return "https://docs.google.com/spreadsheets/d/19HyOyYXHlYe_GI_b_gjfjTRF5OrXTH8S25btYGyPgdM/gviz/tq?tqx=out:csv&sheet=" + id;
};