# bar-js
Light configurable bar chart generator using JS (canvas)

## Decription
bar.js is a Canvas based simple JavaScript Bar Chart Library to provide a configurable, lightweight and dependency-free experience.
![](https://github.com/rahulu15/bar-js/blob/1babaa5bcc3480cfe909cd20f9ee2629f2534716/SS.png)

## Installation
Download the bar.min.jsand include it in your project.

<script src="bar.min.js"></scrip>


## Usage
To create the bar chart, you need a block level container like a div or p.

<div id="chart">This will be bar chart!</div>

Then you can create the BarChart object in your JavaScript file.

var barChart = new BarChart(chartId, chartWidth, chartHeight, data);

### Parameters
- 'chartId - containerId [String]' 
Defines the id of container like "chart"
