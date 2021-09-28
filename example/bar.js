/*
 *
 *bar.js
 *simple bar chart library
 * 9/27/2021 version 1.0
 *url
 *
 *
 */
"use strict";
function BarChart(targetId, width, height, data) {
  //base
  let chart = this;

  //specify config
  chart.configureChart(targetId, width, height, data);
  chart.performPreoperations();
}

BarChart.prototype.configureChart = function (targetId, width, height, data) {
  //base
  let chart = this;
  chart.setCanvasParameters(targetId, width, height, data);
  chart.setChartParameters(targetId, width, height, data);
};

BarChart.prototype.setCanvasParameters = function (
  targetId,
  width,
  height,
  data
) {
  //base
  let chart = this;
  //canvas specs
  chart.targetId = targetId;
  chart.width = width;
  chart.height = height;
  chart.data = data;
};

BarChart.prototype.setChartParameters = function (
  targetId,
  width,
  height,
  data
) {
  let chart = this;
  //chart specs

  //axiss config
  chart.axisRatio = 10; //in percent
  chart.verticalMargin = (chart.height * chart.axisRatio) / 100;
  chart.horizontalMargin = (chart.width * chart.axisRatio) / 100;
  chart.axisColor = "#000";
  chart.axisWidth = 0.75;

  //label config
  chart.fontRatio = 3;
  chart.fontFamily = "times";
  chart.fontStyle = "normal";
  chart.fontWeight = "300";
  chart.fontColor = "#000";
  chart.verticalFontSize = (chart.height * chart.fontRatio) / 100;
  chart.horixontalFontSize = (chart.width * chart.fontRatio) / 100;

  //guideline config
  chart.guidelineColor = "#888888";
  chart.guidelineWidth = 0.5;
};

BarChart.prototype.performPreoperations = function () {
  let chart = this;
  //create canvas
  chart.createCanvas();
  //handle data
  chart.handleData();
  //prepare dtaa
  chart.prepareData();
  //draw axiss
  chart.drawChart();
  //   console.log(chart);
};
BarChart.prototype.createCanvas = function () {
  //   make and append to container
  let chart = this;
  let canvas = document.createElement("canvas");
  canvas.targetId = chart.targetId + "-" + Math.random();
  canvas.width = chart.width;
  canvas.height = chart.height;

  document.getElementById(chart.targetId).innerHTML = "";
  document.getElementById(chart.targetId).appendChild(canvas);

  chart.canvas = canvas;
  chart.context = canvas.getContext("2d");
};

BarChart.prototype.handleData = function () {
  let chart = this;

  //datasets
  chart.labels = [];
  chart.values = [];
  chart.data.forEach(function (item) {
    chart.labels.push(item.label);
    chart.values.push(item.value);
  });
};

BarChart.prototype.prepareData = function () {
  let chart = this;
  //global variables
  chart.itemsNum = chart.data.length;
  chart.maxValue = Math.max.apply(null, chart.values);
  chart.minValue = Math.min.apply(null, chart.values);

  //axis specs
  chart.verticalaxisWidth = chart.height - 2 * chart.verticalMargin;
  chart.horizontalaxisWidth = chart.width - 2 * chart.horizontalMargin;
  //labels specs
  chart.verticalUpperBound = Math.ceil(chart.maxValue / 10) * 10;
  chart.verticalLabelFreq = chart.verticalUpperBound / chart.itemsNum;
  chart.horizontalLabelFreq = chart.horizontalaxisWidth / chart.itemsNum;
};
BarChart.prototype.drawChart = function () {
  let chart = this;

  //vertical axis
  chart.drawVerticalAxis();
  chart.drawVerticalLabels();
  chart.drawVerticalGuides();
  //horizontal
  chart.drawHorizontalAxis();
  chart.drawHorizontalLabels();
  chart.drawHorizontalGuides();

  //draw bars
  chart.drawBars();
};

BarChart.prototype.drawVerticalAxis = function () {
  let chart = this;
  //   console.log(chart.context);
  chart.context.beginPath();
  chart.context.strokeStyle = chart.axisColor;
  chart.context.lineWidth = chart.axisWidth;
  chart.context.moveTo(chart.horizontalMargin, chart.verticalMargin);
  chart.context.lineTo(
    chart.horizontalMargin,
    chart.height - chart.verticalMargin
  );
  chart.context.stroke();
};

BarChart.prototype.drawVerticalLabels = function () {
  let chart = this;
  //text specs
  let labelFont =
    chart.fontStyle +
    " " +
    chart.fontWeight +
    " " +
    chart.verticalFontSize +
    "px" +
    chart.fontFamily;

  chart.context.font = labelFont;
  chart.context.textAlign = "right";
  chart.context.fillStyle = chart.fontColor;

  //sclae values
  let scaledVerticalLabelFreq =
    (chart.verticalaxisWidth / chart.verticalUpperBound) *
    chart.verticalLabelFreq;

  //draw labels
  for (let i = 0; i <= chart.itemsNum; i++) {
    let labelText = chart.verticalUpperBound - i * chart.verticalLabelFreq;
    let verticalLabelX =
      chart.horizontalMargin - chart.horizontalMargin / chart.axisRatio;
    let verticalLabelY = chart.verticalMargin + i * scaledVerticalLabelFreq;
    chart.context.fillText(labelText, verticalLabelX, verticalLabelY);
  }
};
BarChart.prototype.drawHorizontalAxis = function () {
  let chart = this;
  //   console.log(chart.context);
  chart.context.beginPath();
  chart.context.strokeStyle = chart.axisColor;
  chart.context.lineWidth = chart.axisWidth;
  chart.context.moveTo(
    chart.horizontalMargin,
    chart.height - chart.verticalMargin
  );
  chart.context.lineTo(
    chart.width - chart.horizontalMargin,
    chart.height - chart.verticalMargin
  );
  chart.context.stroke();
};

BarChart.prototype.drawHorizontalLabels = function () {
  let chart = this;
  //text specs
  let labelFont =
    chart.fontStyle +
    " " +
    chart.fontWeight +
    " " +
    chart.verticalFontSize +
    "px" +
    chart.fontFamily;

  chart.context.textAlign = "center";
  chart.context.textBaseline = "top";
  chart.context.font = labelFont;

  chart.context.fillStyle = chart.fontColor;
  for (let i = 0; i < chart.itemsNum; i++) {
    let horizontalLabelX =
      chart.horizontalMargin +
      i * chart.horizontalLabelFreq +
      chart.horizontalLabelFreq / 2;
    let horizontalLabelY =
      chart.height -
      chart.verticalMargin +
      chart.verticalMargin / chart.axisRatio;

    chart.context.fillText(chart.labels[i], horizontalLabelX, horizontalLabelY);
  }
};

BarChart.prototype.drawHorizontalGuides = function () {
  let chart = this;

  //specs
  chart.context.strokeStyle = chart.guidelineColor;
  chart.context.lineWidth = chart.guidelineWidth;

  //sclae values
  let scaledVerticalLabelFreq =
    (chart.verticalaxisWidth / chart.verticalUpperBound) *
    chart.verticalLabelFreq;

  for (let i = 0; i <= chart.itemsNum; i++) {
    let horizontalGuideStartX = chart.horizontalMargin;
    let horizontalGuideStartY =
      chart.verticalMargin + i * scaledVerticalLabelFreq;
    let horizontalGuideEndX =
      chart.horizontalMargin + chart.horizontalaxisWidth;
    let horizontalGuideEndY =
      chart.verticalMargin + i * scaledVerticalLabelFreq;

    chart.context.beginPath();
    chart.context.moveTo(horizontalGuideStartX, horizontalGuideStartY);
    chart.context.lineTo(horizontalGuideEndX, horizontalGuideEndY);
    chart.context.stroke();
  }
};

BarChart.prototype.drawVerticalGuides = function () {
  let chart = this;
  chart.context.strokeStyle = chart.guidelineColor;
  chart.context.lineWidth = chart.guidelineWidth;

  for (let i = 0; i <= chart.itemsNum; i++) {
    let verticalGuideStartX =
      chart.horizontalMargin + i * chart.horizontalLabelFreq;
    let verticalGuideStartY = chart.height - chart.verticalMargin;

    let verticalGuideEndX = verticalGuideStartX;
    let verticalGuideEndY = chart.verticalMargin;

    chart.context.beginPath();
    chart.context.moveTo(verticalGuideStartX, verticalGuideStartY);
    chart.context.lineTo(verticalGuideEndX, verticalGuideEndY);
    chart.context.stroke();
  }
};

BarChart.prototype.drawBars = function () {
  let chart = this;

  for (let i = 0; i < chart.itemsNum; i++) {
    let color = chart.createRandomRGB();
    let fillOpacity = "0.8";
    let fillColor = `rgba(${color.r},${color.g},${color.b},${fillOpacity})`;
    let borderColor = `rgb(${color.r},${color.g},${color.b})`;
    chart.context.beginPath();
    let barX =
      chart.horizontalMargin +
      i * chart.horizontalLabelFreq +
      chart.horizontalLabelFreq / chart.axisRatio;
    let barY = chart.height - chart.verticalMargin;
    let barWidth =
      chart.horizontalLabelFreq -
      (2 * chart.horizontalLabelFreq) / chart.axisRatio;
    let barHeight =
      (-1 * chart.verticalaxisWidth * chart.values[i]) / chart.maxValue;

    chart.context.fillStyle = fillColor;
    chart.context.strokeStyle = borderColor;
    chart.context.rect(barX, barY, barWidth, barHeight);
    chart.context.stroke();
    chart.context.fill();
  }
};

BarChart.prototype.createRandomRGB = function () {
  let red = getRandomInt(0, 255);
  let green = getRandomInt(0, 255);
  let blue = getRandomInt(0, 255);
  return { r: red, g: green, b: blue };
};
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
