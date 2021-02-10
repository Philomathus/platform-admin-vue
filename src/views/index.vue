<template>
  <div id="page">
    <div id="home_page" style="height: 10.3rem;overflow: hidden">
      <div class="head">
        <h1 v-text="titleName">平台数据总览</h1>
        <div class="weather"><!--<img src="../../images/home/weather.png"><span>多云转小雨</span>-->
          <span id="showTime" v-text="isHistory?date:nowTime"></span>
          <button class="idx_but" @click="today">今天</button>
          <button class="idx_but" @click="yesterday">昨天</button>
        </div>
      </div>
      <div class="mainbox">
        <ul class="clearfix">
          <li>
            <div class="boxall" style="height: 2.8rem">
              <div class="alltitle">推广注册</div>
              <div class="allnav" id="echarts_1"></div>
              <div class="boxfoot"></div>
            </div>
            <div class="boxall" style="height: 2.8rem">
              <div class="alltitle">注册人数</div>
              <div class="allnav" id="echarts_2"></div>
              <div class="boxfoot"></div>
            </div>
            <div class="boxall" style="height: 2.8rem">
              <!--<div style="height:100%; width: 100%;">
                  <div class="sy" id="fb1"></div>
                  <div class="sy" id="fb2"></div>
                  <div class="sy" id="fb3"></div>
              </div>-->
              <div class="alltitle">平台盈利</div>
              <div class="allnav" id="echarts_3"></div>
              <div class="boxfoot"></div>
            </div>
          </li>
          <li>
            <div class="bar">
              <div class="barbox">
                <ul class="clearfix">
                  <li class="pulll_left counter" v-text='toLocalString(totalRecharge)'>12581189</li>
                  <li class="pulll_left counter" v-text='toLocalString(totalRegister)'>3912410</li>
                </ul>
              </div>
              <div class="barbox2">
                <ul class="clearfix">
                  <li class="pulll_left">单日充值金额</li>
                  <li class="pulll_left">单日平台盈利</li>
                </ul>
              </div>
            </div>
            <div class="map">
              <div class="map1"><img src="../assets/images/home/lbx.png"></div>
              <div class="map2"><img src="../assets/images/home/jt.png"></div>
              <div class="map3"><img src="../assets/images/home/map.png"></div>
              <div class="map4" id="map"></div>
            </div>
          </li>
          <li>
            <div class="boxall" style="height:3.0rem">
              <div class="alltitle">平台在线人数</div>
              <div class="allnav" id="echarts_4"></div>
              <div class="boxfoot"></div>
            </div>
            <div class="boxall" style="height: 2.8rem">
              <div class="alltitle">充值/出款金额</div>
              <div class="allnav" id="echarts_5"></div>
              <div class="boxfoot"></div>
            </div>
            <div class="boxall" style="height: 3rem">
              <div class="alltitle">充值/出款人数</div>
              <div class="allnav" id="echarts_6"></div>
              <div class="boxfoot"></div>
            </div>
          </li>
        </ul>
      </div>
      <div class="back"></div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery';
  import echarts from 'echarts';
  import "../../node_modules/echarts/map/js/china.js"; // 引入中国地图数据
  import request from '@/utils/request'
  import {url} from "@/utils/url";

  export default {
    data() {
      return {
        titleName: '平台数据总览',
        nowTime: '',
        totalRecharge: 0,
        totalRegister: 0,
        totalWithdrawal: 0,
        platformBalance: 0,
        giftsAmount: 0,
        recharges: [],
        registers: [],
        extensions: [],
        profits: [],
        rechargeAmounts: [],
        drawingAmounts: [],
        drawings: [],
        onlines: [],
        mapDate: {},
        isHistory: false,
        date: ''
      }
    },
    created() {
      let that = this
      setInterval(function () {
        that.now()
      }, 500)
      /*      this.area_echarts_init()
            this.js_init()*/
      this.init()
    },
    methods: {
      area_echarts_init() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('map_1'));
        var data = [
          {name: '海门', value: 69},
          {name: '鄂尔多斯', value: 12},
          {name: '招远', value: 12},
          {name: '舟山', value: 12},
          {name: '齐齐哈尔', value: 14},
          {name: '盐城', value: 15},
          {name: '赤峰', value: 16},
          {name: '青岛', value: 18},
          {name: '乳山', value: 18},
          {name: '金昌', value: 19},
          {name: '泉州', value: 21},
          {name: '莱西', value: 21},
          {name: '日照', value: 21},
          {name: '胶南', value: 22},
          {name: '南通', value: 23},
          {name: '拉萨', value: 24},
          {name: '云浮', value: 24},
          {name: '梅州', value: 25},
          {name: '文登', value: 25},
          {name: '上海', value: 25},
          {name: '攀枝花', value: 25},
          {name: '威海', value: 25},
          {name: '承德', value: 25},
          {name: '厦门', value: 26},
          {name: '汕尾', value: 26},
          {name: '潮州', value: 26},
          {name: '丹东', value: 27},
          {name: '太仓', value: 27},
          {name: '曲靖', value: 27},
          {name: '烟台', value: 28},
          {name: '福州', value: 29},
          {name: '瓦房店', value: 30},
          {name: '即墨', value: 30},
          {name: '抚顺', value: 31},
          {name: '玉溪', value: 31},
          {name: '张家口', value: 31},
          {name: '阳泉', value: 31},
          {name: '莱州', value: 32},
          {name: '湖州', value: 32},
          {name: '汕头', value: 32},
          {name: '昆山', value: 33},
          {name: '宁波', value: 33},
          {name: '湛江', value: 33},
          {name: '揭阳', value: 34},
          {name: '荣成', value: 34},
          {name: '连云港', value: 35},
          {name: '葫芦岛', value: 35},
          {name: '常熟', value: 36},
          {name: '东莞', value: 36},
          {name: '河源', value: 36},
          {name: '淮安', value: 36},
          {name: '泰州', value: 36},
          {name: '南宁', value: 37},
          {name: '营口', value: 37},
          {name: '惠州', value: 37},
          {name: '江阴', value: 37},
          {name: '蓬莱', value: 37},
          {name: '韶关', value: 38},
          {name: '嘉峪关', value: 38},
          {name: '广州', value: 38},
          {name: '延安', value: 38},
          {name: '太原', value: 39},
          {name: '清远', value: 39},
          {name: '中山', value: 39},
          {name: '昆明', value: 39},
          {name: '寿光', value: 40},
          {name: '盘锦', value: 40},
          {name: '长治', value: 41},
          {name: '深圳', value: 41},
          {name: '珠海', value: 42},
          {name: '宿迁', value: 43},
          {name: '咸阳', value: 43},
          {name: '铜川', value: 44},
          {name: '平度', value: 44},
          {name: '佛山', value: 44},
          {name: '海口', value: 44},
          {name: '江门', value: 45},
          {name: '章丘', value: 45},
          {name: '肇庆', value: 46},
          {name: '大连', value: 47},
          {name: '临汾', value: 47},
          {name: '吴江', value: 47},
          {name: '石嘴山', value: 49},
          {name: '沈阳', value: 50},
          {name: '苏州', value: 50},
          {name: '茂名', value: 50},
          {name: '嘉兴', value: 51},
          {name: '长春', value: 51},
          {name: '胶州', value: 52},
          {name: '银川', value: 52},
          {name: '张家港', value: 52},
          {name: '三门峡', value: 53},
          {name: '锦州', value: 54},
          {name: '南昌', value: 54},
          {name: '柳州', value: 54},
          {name: '三亚', value: 54},
          {name: '自贡', value: 56},
          {name: '吉林', value: 56},
          {name: '阳江', value: 57},
          {name: '泸州', value: 57},
          {name: '西宁', value: 57},
          {name: '宜宾', value: 58},
          {name: '呼和浩特', value: 58},
          {name: '成都', value: 58},
          {name: '大同', value: 58},
          {name: '镇江', value: 59},
          {name: '桂林', value: 59},
          {name: '张家界', value: 59},
          {name: '宜兴', value: 59},
          {name: '北海', value: 60},
          {name: '西安', value: 61},
          {name: '金坛', value: 62},
          {name: '东营', value: 62},
          {name: '牡丹江', value: 63},
          {name: '遵义', value: 63},
          {name: '绍兴', value: 63},
          {name: '扬州', value: 64},
          {name: '常州', value: 64},
          {name: '潍坊', value: 65},
          {name: '重庆', value: 66},
          {name: '台州', value: 67},
          {name: '南京', value: 67},
          {name: '滨州', value: 70},
          {name: '贵阳', value: 71},
          {name: '无锡', value: 71},
          {name: '本溪', value: 71},
          {name: '克拉玛依', value: 72},
          {name: '渭南', value: 72},
          {name: '马鞍山', value: 72},
          {name: '宝鸡', value: 72},
          {name: '焦作', value: 75},
          {name: '句容', value: 75},
          {name: '北京', value: 79},
          {name: '徐州', value: 79},
          {name: '衡水', value: 80},
          {name: '包头', value: 80},
          {name: '绵阳', value: 80},
          {name: '乌鲁木齐', value: 84},
          {name: '枣庄', value: 84},
          {name: '杭州', value: 84},
          {name: '淄博', value: 85},
          {name: '鞍山', value: 86},
          {name: '溧阳', value: 86},
          {name: '库尔勒', value: 86},
          {name: '安阳', value: 90},
          {name: '开封', value: 90},
          {name: '济南', value: 92},
          {name: '德阳', value: 93},
          {name: '温州', value: 95},
          {name: '九江', value: 96},
          {name: '邯郸', value: 98},
          {name: '临安', value: 99},
          {name: '兰州', value: 99},
          {name: '沧州', value: 100},
          {name: '临沂', value: 103},
          {name: '南充', value: 104},
          {name: '天津', value: 105},
          {name: '富阳', value: 106},
          {name: '泰安', value: 112},
          {name: '诸暨', value: 112},
          {name: '郑州', value: 313},
          {name: '哈尔滨', value: 114},
          {name: '聊城', value: 116},
          {name: '芜湖', value: 117},
          {name: '唐山', value: 119},
          {name: '平顶山', value: 119},
          {name: '邢台', value: 119},
          {name: '德州', value: 120},
          {name: '济宁', value: 120},
          {name: '荆州', value: 127},
          {name: '宜昌', value: 130},
          {name: '义乌', value: 132},
          {name: '丽水', value: 133},
          {name: '洛阳', value: 134},
          {name: '秦皇岛', value: 136},
          {name: '株洲', value: 143},
          {name: '石家庄', value: 147},
          {name: '莱芜', value: 148},
          {name: '常德', value: 152},
          {name: '保定', value: 153},
          {name: '湘潭', value: 154},
          {name: '金华', value: 157},
          {name: '岳阳', value: 169},
          {name: '长沙', value: 175},
          {name: '衢州', value: 177},
          {name: '廊坊', value: 193},
          {name: '菏泽', value: 194},
          {name: '合肥', value: 229},
          {name: '武汉', value: 273},
          {name: '大庆', value: 279}
        ];
        var geoCoordMap = {
          '海门': [121.15, 31.89],
          '鄂尔多斯': [109.781327, 39.608266],
          '招远': [120.38, 37.35],
          '舟山': [122.207216, 29.985295],
          '齐齐哈尔': [123.97, 47.33],
          '盐城': [120.13, 33.38],
          '赤峰': [118.87, 42.28],
          '青岛': [120.33, 36.07],
          '乳山': [121.52, 36.89],
          '金昌': [102.188043, 38.520089],
          '泉州': [118.58, 24.93],
          '莱西': [120.53, 36.86],
          '日照': [119.46, 35.42],
          '胶南': [119.97, 35.88],
          '南通': [121.05, 32.08],
          '拉萨': [91.11, 29.97],
          '云浮': [112.02, 22.93],
          '梅州': [116.1, 24.55],
          '文登': [122.05, 37.2],
          '上海': [121.48, 31.22],
          '攀枝花': [101.718637, 26.582347],
          '威海': [122.1, 37.5],
          '承德': [117.93, 40.97],
          '厦门': [118.1, 24.46],
          '汕尾': [115.375279, 22.786211],
          '潮州': [116.63, 23.68],
          '丹东': [124.37, 40.13],
          '太仓': [121.1, 31.45],
          '曲靖': [103.79, 25.51],
          '烟台': [121.39, 37.52],
          '福州': [119.3, 26.08],
          '瓦房店': [121.979603, 39.627114],
          '即墨': [120.45, 36.38],
          '抚顺': [123.97, 41.97],
          '玉溪': [102.52, 24.35],
          '张家口': [114.87, 40.82],
          '阳泉': [113.57, 37.85],
          '莱州': [119.942327, 37.177017],
          '湖州': [120.1, 30.86],
          '汕头': [116.69, 23.39],
          '昆山': [120.95, 31.39],
          '宁波': [121.56, 29.86],
          '湛江': [110.359377, 21.270708],
          '揭阳': [116.35, 23.55],
          '荣成': [122.41, 37.16],
          '连云港': [119.16, 34.59],
          '葫芦岛': [120.836932, 40.711052],
          '常熟': [120.74, 31.64],
          '东莞': [113.75, 23.04],
          '河源': [114.68, 23.73],
          '淮安': [119.15, 33.5],
          '泰州': [119.9, 32.49],
          '南宁': [108.33, 22.84],
          '营口': [122.18, 40.65],
          '惠州': [114.4, 23.09],
          '江阴': [120.26, 31.91],
          '蓬莱': [120.75, 37.8],
          '韶关': [113.62, 24.84],
          '嘉峪关': [98.289152, 39.77313],
          '广州': [113.23, 23.16],
          '延安': [109.47, 36.6],
          '太原': [112.53, 37.87],
          '清远': [113.01, 23.7],
          '中山': [113.38, 22.52],
          '昆明': [102.73, 25.04],
          '寿光': [118.73, 36.86],
          '盘锦': [122.070714, 41.119997],
          '长治': [113.08, 36.18],
          '深圳': [114.07, 22.62],
          '珠海': [113.52, 22.3],
          '宿迁': [118.3, 33.96],
          '咸阳': [108.72, 34.36],
          '铜川': [109.11, 35.09],
          '平度': [119.97, 36.77],
          '佛山': [113.11, 23.05],
          '海口': [110.35, 20.02],
          '江门': [113.06, 22.61],
          '章丘': [117.53, 36.72],
          '肇庆': [112.44, 23.05],
          '大连': [121.62, 38.92],
          '临汾': [111.5, 36.08],
          '吴江': [120.63, 31.16],
          '石嘴山': [106.39, 39.04],
          '沈阳': [123.38, 41.8],
          '苏州': [120.62, 31.32],
          '茂名': [110.88, 21.68],
          '嘉兴': [120.76, 30.77],
          '长春': [125.35, 43.88],
          '胶州': [120.03336, 36.264622],
          '银川': [106.27, 38.47],
          '张家港': [120.555821, 31.875428],
          '三门峡': [111.19, 34.76],
          '锦州': [121.15, 41.13],
          '南昌': [115.89, 28.68],
          '柳州': [109.4, 24.33],
          '三亚': [109.511909, 18.252847],
          '自贡': [104.778442, 29.33903],
          '吉林': [126.57, 43.87],
          '阳江': [111.95, 21.85],
          '泸州': [105.39, 28.91],
          '西宁': [101.74, 36.56],
          '宜宾': [104.56, 29.77],
          '呼和浩特': [111.65, 40.82],
          '成都': [104.06, 30.67],
          '大同': [113.3, 40.12],
          '镇江': [119.44, 32.2],
          '桂林': [110.28, 25.29],
          '张家界': [110.479191, 29.117096],
          '宜兴': [119.82, 31.36],
          '北海': [109.12, 21.49],
          '西安': [108.95, 34.27],
          '金坛': [119.56, 31.74],
          '东营': [118.49, 37.46],
          '牡丹江': [129.58, 44.6],
          '遵义': [106.9, 27.7],
          '绍兴': [120.58, 30.01],
          '扬州': [119.42, 32.39],
          '常州': [119.95, 31.79],
          '潍坊': [119.1, 36.62],
          '重庆': [106.54, 29.59],
          '台州': [121.420757, 28.656386],
          '南京': [118.78, 32.04],
          '滨州': [118.03, 37.36],
          '贵阳': [106.71, 26.57],
          '无锡': [120.29, 31.59],
          '本溪': [123.73, 41.3],
          '克拉玛依': [84.77, 45.59],
          '渭南': [109.5, 34.52],
          '马鞍山': [118.48, 31.56],
          '宝鸡': [107.15, 34.38],
          '焦作': [113.21, 35.24],
          '句容': [119.16, 31.95],
          '北京': [116.46, 39.92],
          '徐州': [117.2, 34.26],
          '衡水': [115.72, 37.72],
          '包头': [110, 40.58],
          '绵阳': [104.73, 31.48],
          '乌鲁木齐': [87.68, 43.77],
          '枣庄': [117.57, 34.86],
          '杭州': [120.19, 30.26],
          '淄博': [118.05, 36.78],
          '鞍山': [122.85, 41.12],
          '溧阳': [119.48, 31.43],
          '库尔勒': [86.06, 41.68],
          '安阳': [114.35, 36.1],
          '开封': [114.35, 34.79],
          '济南': [117, 36.65],
          '德阳': [104.37, 31.13],
          '温州': [120.65, 28.01],
          '九江': [115.97, 29.71],
          '邯郸': [114.47, 36.6],
          '临安': [119.72, 30.23],
          '兰州': [103.73, 36.03],
          '沧州': [116.83, 38.33],
          '临沂': [118.35, 35.05],
          '南充': [106.110698, 30.837793],
          '天津': [117.2, 39.13],
          '富阳': [119.95, 30.07],
          '泰安': [117.13, 36.18],
          '诸暨': [120.23, 29.71],
          '郑州': [113.65, 34.76],
          '哈尔滨': [126.63, 45.75],
          '聊城': [115.97, 36.45],
          '芜湖': [118.38, 31.33],
          '唐山': [118.02, 39.63],
          '平顶山': [113.29, 33.75],
          '邢台': [114.48, 37.05],
          '德州': [116.29, 37.45],
          '济宁': [116.59, 35.38],
          '荆州': [112.239741, 30.335165],
          '宜昌': [111.3, 30.7],
          '义乌': [120.06, 29.32],
          '丽水': [119.92, 28.45],
          '洛阳': [112.44, 34.7],
          '秦皇岛': [119.57, 39.95],
          '株洲': [113.16, 27.83],
          '石家庄': [114.48, 38.03],
          '莱芜': [117.67, 36.19],
          '常德': [111.69, 29.05],
          '保定': [115.48, 38.85],
          '湘潭': [112.91, 27.87],
          '金华': [119.64, 29.12],
          '岳阳': [113.09, 29.37],
          '长沙': [113, 28.21],
          '衢州': [118.88, 28.97],
          '廊坊': [116.7, 39.53],
          '菏泽': [115.480656, 35.23375],
          '合肥': [117.27, 31.86],
          '武汉': [114.31, 30.52],
          '大庆': [125.03, 46.58]
        };
        var convertData = function (data) {
          var res = [];
          for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
              res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
              });
            }
          }
          return res;
        };

        option = {
          // backgroundColor: '#404a59',
          /***  title: {
        text: '实时行驶车辆',
        subtext: 'data from PM25.in',
        sublink: 'http://www.pm25.in',
        left: 'center',
        textStyle: {
            color: '#fff'
        }
    },**/
          tooltip: {
            trigger: 'item',
            formatter: function (params) {
              if (typeof (params.value)[2] == "undefined") {
                return params.name + ' : ' + params.value;
              } else {
                return params.name + ' : ' + params.value[2];
              }
            }
          },

          geo: {
            map: 'china',
            label: {
              emphasis: {
                show: false
              }
            },
            roam: false,//禁止其放大缩小
            itemStyle: {
              normal: {
                areaColor: '#4c60ff',
                borderColor: '#002097'
              },
              emphasis: {
                areaColor: '#293fff'
              }
            }
          },
          series: [
            {
              name: '消费金额',
              type: 'scatter',
              coordinateSystem: 'geo',
              data: convertData(data),
              symbolSize: function (val) {
                return val[2] / 15;
              },
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'right',
                  show: false
                },
                emphasis: {
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  color: '#ffeb7b'
                }
              }
            }

            /**
             ,
             {
            name: 'Top 5',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(data.sort(function (a, b) {
                return b.value - a.value;
            }).slice(0, 6)),
            symbolSize: function (val) {
                return val[2] / 20;
            },
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: '#ffd800',
                    shadowBlur: 10,
                    shadowColor: 'rgba(0,0,0,.3)'
                }
            },
            zlevel: 1
        }
             **/
          ]
        };

        myChart.setOption(option);
        window.addEventListener("resize", function () {
          myChart.resize();
        });
      },
      js_init() {
        var token = localStorage.getItem("super_token");
        var do_main = localStorage.getItem("platform_domain");
        var dataChart1;
        getData();

        function getData() {
          // $.ajax({
          //     type: "POST",
          //     url: do_main + '/index-data/getChartsOne',
          //     contentType: "application/json",
          //     data: {},
          //     dataType: "json",
          //     headers: {
          //         "token": token
          //     },
          //     success: function (res) {
          //         console.info(res)
          //         //dataChart1=res.data;
          //         dataChart1=[1,2,3,4,5,6,7,8,9,10,11,12]
          //         echarts_1(dataChart1);
          //     },
          //     error: function (XMLHttpRequest, textStatus, errorThrown) {
          //         debugger;
          //         console.log("操作失败");
          //         console.log(XMLHttpRequest);
          //         console.log(textStatus);
          //         console.log(errorThrown);
          //     }
          // });

          dataChart1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
          echarts_1(dataChart1);
        }

        debugger;

        echarts_2();
        echarts_4();
        echarts_31();
        echarts_32();
        echarts_33();
        echarts_5();
        echarts_6();

        function echarts_1(data) {
          // 基于准备好的dom，初始化echarts实例
          var myChart = echarts.init(document.getElementById('echart1'));
          option = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            grid: {
              left: '0%',
              top: '10px',
              right: '0%',
              bottom: '4%',
              containLabel: true
            },
            xAxis: [{
              type: 'category',
              data: ['02', '04', '06', '08', '10', '12', '14', '16', '18', '20', '22', '24'],
              axisLine: {
                show: true,
                lineStyle: {
                  color: "rgba(255,255,255,.1)",
                  width: 1,
                  type: "solid"
                },
              },

              axisTick: {
                show: false,
              },
              axisLabel: {
                interval: 0,
                // rotate:50,
                show: true,
                splitNumber: 15,
                textStyle: {
                  color: "rgba(255,255,255,.6)",
                  fontSize: '12',
                },
              },
            }],
            yAxis: [{
              type: 'value',
              axisLabel: {
                //formatter: '{value} %'
                show: true,
                textStyle: {
                  color: "rgba(255,255,255,.6)",
                  fontSize: '12',
                },
              },
              axisTick: {
                show: false,
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: "rgba(255,255,255,.1	)",
                  width: 1,
                  type: "solid"
                },
              },
              splitLine: {
                lineStyle: {
                  color: "rgba(255,255,255,.1)",
                }
              }
            }],
            series: [
              {
                type: 'bar',
                data: data,
                barWidth: '35%', //柱子宽度
                // barGap: 1, //柱子之间间距
                itemStyle: {
                  normal: {
                    color: '#2f89cf',
                    opacity: 1,
                    barBorderRadius: 5,
                  }
                }
              }

            ]
          };
          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option, data);
          window.addEventListener("resize", function () {
            myChart.resize();
          });
        }

        function echarts_2() {
          // 基于准备好的dom，初始化echarts实例
          var myChart = echarts.init(document.getElementById('echart2'));

          option = {
            //  backgroundColor: '#00265f',
            tooltip: {
              trigger: 'axis',
              axisPointer: {type: 'shadow'}
            },
            grid: {
              left: '0%',
              top: '10px',
              right: '0%',
              bottom: '4%',
              containLabel: true
            },
            xAxis: [{
              type: 'category',
              data: ['浙江', '上海', '江苏', '广东', '北京', '深圳', '安徽'],
              axisLine: {
                show: true,
                lineStyle: {
                  color: "rgba(255,255,255,.1)",
                  width: 1,
                  type: "solid"
                },
              },

              axisTick: {
                show: false,
              },
              axisLabel: {
                interval: 0,
                // rotate:50,
                show: true,
                splitNumber: 15,
                textStyle: {
                  color: "rgba(255,255,255,.6)",
                  fontSize: '12',
                },
              },
            }],
            yAxis: [{
              type: 'value',
              axisLabel: {
                //formatter: '{value} %'
                show: true,
                textStyle: {
                  color: "rgba(255,255,255,.6)",
                  fontSize: '12',
                },
              },
              axisTick: {
                show: false,
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: "rgba(255,255,255,.1	)",
                  width: 1,
                  type: "solid"
                },
              },
              splitLine: {
                lineStyle: {
                  color: "rgba(255,255,255,.1)",
                }
              }
            }],
            series: [
              {

                type: 'bar',
                data: [1500, 1200, 600, 200, 300, 300, 900],
                barWidth: '35%', //柱子宽度
                // barGap: 1, //柱子之间间距
                itemStyle: {
                  normal: {
                    color: '#27d08a',
                    opacity: 1,
                    barBorderRadius: 5,
                  }
                }
              }

            ]
          };

          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
          window.addEventListener("resize", function () {
            myChart.resize();
          });
        }

        function echarts_5() {
          // 基于准备好的dom，初始化echarts实例
          var myChart = echarts.init(document.getElementById('echart5'));

          option = {
            //  backgroundColor: '#00265f',
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },

            grid: {
              left: '0%',
              top: '10px',
              right: '0%',
              bottom: '2%',
              containLabel: true
            },
            xAxis: [{
              type: 'category',
              data: ['浙江', '上海', '江苏', '广东', '北京', '深圳', '安徽', '四川'],
              axisLine: {
                show: true,
                lineStyle: {
                  color: "rgba(255,255,255,.1)",
                  width: 1,
                  type: "solid"
                },
              },

              axisTick: {
                show: false,
              },
              axisLabel: {
                interval: 0,
                // rotate:50,
                show: true,
                splitNumber: 15,
                textStyle: {
                  color: "rgba(255,255,255,.6)",
                  fontSize: '12',
                },
              },
            }],
            yAxis: [{
              type: 'value',
              axisLabel: {
                //formatter: '{value} %'
                show: true,
                textStyle: {
                  color: "rgba(255,255,255,.6)",
                  fontSize: '12',
                },
              },
              axisTick: {
                show: false,
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: "rgba(255,255,255,.1	)",
                  width: 1,
                  type: "solid"
                },
              },
              splitLine: {
                lineStyle: {
                  color: "rgba(255,255,255,.1)",
                }
              }
            }],
            series: [{
              type: 'bar',
              data: [2, 3, 3, 9, 15, 12, 6, 4, 6, 7, 4, 10],
              barWidth: '35%', //柱子宽度
              // barGap: 1, //柱子之间间距
              itemStyle: {
                normal: {
                  color: '#2f89cf',
                  opacity: 1,
                  barBorderRadius: 5,
                }
              }
            }
            ]
          };

          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
          window.addEventListener("resize", function () {
            myChart.resize();
          });
        }

        function echarts_4() {
          // 基于准备好的dom，初始化echarts实例
          var myChart = echarts.init(document.getElementById('echart4'));

          option = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                lineStyle: {
                  color: '#dddc6b'
                }
              }
            },
            legend: {
              top: '0%',
              data: ['安卓', 'IOS'],
              textStyle: {
                color: 'rgba(255,255,255,.5)',
                fontSize: '12',
              }
            },
            grid: {
              left: '10',
              top: '30',
              right: '10',
              bottom: '10',
              containLabel: true
            },

            xAxis: [{
              type: 'category',
              boundaryGap: false,
              axisLabel: {
                textStyle: {
                  color: "rgba(255,255,255,.6)",
                  fontSize: 12,
                },
              },
              axisLine: {
                lineStyle: {
                  color: 'rgba(255,255,255,.2)'
                }

              },

              data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']

            }, {

              axisPointer: {show: false},
              axisLine: {show: false},
              position: 'bottom',
              offset: 20,


            }],

            yAxis: [{
              type: 'value',
              axisTick: {show: false},
              axisLine: {
                lineStyle: {
                  color: 'rgba(255,255,255,.1)'
                }
              },
              axisLabel: {
                textStyle: {
                  color: "rgba(255,255,255,.6)",
                  fontSize: 12,
                },
              },

              splitLine: {
                lineStyle: {
                  color: 'rgba(255,255,255,.1)'
                }
              }
            }],
            series: [
              {
                name: '安卓',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {

                  normal: {
                    color: '#0184d5',
                    width: 2
                  }
                },
                areaStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: 'rgba(1, 132, 213, 0.4)'
                    }, {
                      offset: 0.8,
                      color: 'rgba(1, 132, 213, 0.1)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#0184d5',
                    borderColor: 'rgba(221, 220, 107, .1)',
                    borderWidth: 12
                  }
                },
                data: [3, 4, 3, 4, 3, 4, 3, 6, 2, 4, 2, 4, 3, 4, 3, 4, 3, 4, 3, 6, 2, 4, 2, 4]

              },
              {
                name: 'IOS',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {

                  normal: {
                    color: '#00d887',
                    width: 2
                  }
                },
                areaStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: 'rgba(0, 216, 135, 0.4)'
                    }, {
                      offset: 0.8,
                      color: 'rgba(0, 216, 135, 0.1)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#00d887',
                    borderColor: 'rgba(221, 220, 107, .1)',
                    borderWidth: 12
                  }
                },
                data: [5, 3, 5, 6, 1, 5, 3, 5, 6, 4, 6, 4, 8, 3, 5, 6, 1, 5, 3, 7, 2, 5, 1, 4]

              },

            ]

          };

          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
          window.addEventListener("resize", function () {
            myChart.resize();
          });
        }

        function echarts_6() {
          // 基于准备好的dom，初始化echarts实例
          var myChart = echarts.init(document.getElementById('echart6'));

          var dataStyle = {
            normal: {
              label: {
                show: false
              },
              labelLine: {
                show: false
              },
              //shadowBlur: 40,
              //shadowColor: 'rgba(40, 40, 40, 1)',
            }
          };
          var placeHolderStyle = {
            normal: {
              color: 'rgba(255,255,255,.05)',
              label: {show: false,},
              labelLine: {show: false}
            },
            emphasis: {
              color: 'rgba(0,0,0,0)'
            }
          };
          option = {
            color: ['#0f63d6', '#0f78d6', '#0f8cd6', '#0fa0d6', '#0fb4d6'],
            tooltip: {
              show: true,
              formatter: "{a} : {c} "
            },
            legend: {
              itemWidth: 10,
              itemHeight: 10,
              itemGap: 12,
              bottom: '3%',

              data: ['浙江', '上海', '广东', '北京', '深圳'],
              textStyle: {
                color: 'rgba(255,255,255,.6)',
              }
            },

            series: [
              {
                name: '浙江',
                type: 'pie',
                clockWise: false,
                center: ['50%', '42%'],
                radius: ['59%', '70%'],
                itemStyle: dataStyle,
                hoverAnimation: false,
                data: [{
                  value: 80,
                  name: '01'
                }, {
                  value: 20,
                  name: 'invisible',
                  tooltip: {show: false},
                  itemStyle: placeHolderStyle
                }]
              },
              {
                name: '上海',
                type: 'pie',
                clockWise: false,
                center: ['50%', '42%'],
                radius: ['49%', '60%'],
                itemStyle: dataStyle,
                hoverAnimation: false,
                data: [{
                  value: 70,
                  name: '02'
                }, {
                  value: 30,
                  name: 'invisible',
                  tooltip: {show: false},
                  itemStyle: placeHolderStyle
                }]
              },
              {
                name: '广东',
                type: 'pie',
                clockWise: false,
                hoverAnimation: false,
                center: ['50%', '42%'],
                radius: ['39%', '50%'],
                itemStyle: dataStyle,
                data: [{
                  value: 65,
                  name: '03'
                }, {
                  value: 35,
                  name: 'invisible',
                  tooltip: {show: false},
                  itemStyle: placeHolderStyle
                }]
              },
              {
                name: '北京',
                type: 'pie',
                clockWise: false,
                hoverAnimation: false,
                center: ['50%', '42%'],
                radius: ['29%', '40%'],
                itemStyle: dataStyle,
                data: [{
                  value: 60,
                  name: '04'
                }, {
                  value: 40,
                  name: 'invisible',
                  tooltip: {show: false},
                  itemStyle: placeHolderStyle
                }]
              },
              {
                name: '深圳',
                type: 'pie',
                clockWise: false,
                hoverAnimation: false,
                center: ['50%', '42%'],
                radius: ['20%', '30%'],
                itemStyle: dataStyle,
                data: [{
                  value: 50,
                  name: '05'
                }, {
                  value: 50,
                  name: 'invisible',
                  tooltip: {show: false},
                  itemStyle: placeHolderStyle
                }]
              },]
          };

          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
          window.addEventListener("resize", function () {
            myChart.resize();
          });
        }

        function echarts_31() {
          // 基于准备好的dom，初始化echarts实例
          var myChart = echarts.init(document.getElementById('fb1'));
          option = {

            title: [{
              text: '年龄分布',
              left: 'center',
              textStyle: {
                color: '#fff',
                fontSize: '16'
              }

            }],
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)",
              position: function (p) {   //其中p为当前鼠标的位置
                return [p[0] + 10, p[1] - 10];
              }
            },
            legend: {

              top: '70%',
              itemWidth: 10,
              itemHeight: 10,
              data: ['0岁以下', '20-29岁', '30-39岁', '40-49岁', '50岁以上'],
              textStyle: {
                color: 'rgba(255,255,255,.5)',
                fontSize: '12',
              }
            },
            series: [
              {
                name: '年龄分布',
                type: 'pie',
                center: ['50%', '42%'],
                radius: ['40%', '60%'],
                color: ['#065aab', '#066eab', '#0682ab', '#0696ab', '#06a0ab', '#06b4ab', '#06c8ab', '#06dcab', '#06f0ab'],
                label: {show: false},
                labelLine: {show: false},
                data: [
                  {value: 1, name: '0岁以下'},
                  {value: 4, name: '20-29岁'},
                  {value: 2, name: '30-39岁'},
                  {value: 2, name: '40-49岁'},
                  {value: 1, name: '50岁以上'},
                ]
              }
            ]
          };

          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
          window.addEventListener("resize", function () {
            myChart.resize();
          });
        }

        function echarts_32() {
          // 基于准备好的dom，初始化echarts实例
          var myChart = echarts.init(document.getElementById('fb2'));
          option = {

            title: [{
              text: '职业分布',
              left: 'center',
              textStyle: {
                color: '#fff',
                fontSize: '16'
              }

            }],
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)",
              position: function (p) {   //其中p为当前鼠标的位置
                return [p[0] + 10, p[1] - 10];
              }
            },
            legend: {

              top: '70%',
              itemWidth: 10,
              itemHeight: 10,
              data: ['电子商务', '教育', 'IT/互联网', '金融', '学生', '其他'],
              textStyle: {
                color: 'rgba(255,255,255,.5)',
                fontSize: '12',
              }
            },
            series: [
              {
                name: '年龄分布',
                type: 'pie',
                center: ['50%', '42%'],
                radius: ['40%', '60%'],
                color: ['#065aab', '#066eab', '#0682ab', '#0696ab', '#06a0ab', '#06b4ab', '#06c8ab', '#06dcab', '#06f0ab'],
                label: {show: false},
                labelLine: {show: false},
                data: [
                  {value: 5, name: '电子商务'},
                  {value: 1, name: '教育'},
                  {value: 6, name: 'IT/互联网'},
                  {value: 2, name: '金融'},
                  {value: 1, name: '学生'},
                  {value: 1, name: '其他'},
                ]
              }
            ]
          };

          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
          window.addEventListener("resize", function () {
            myChart.resize();
          });
        }

        function echarts_33() {
          // 基于准备好的dom，初始化echarts实例
          var myChart = echarts.init(document.getElementById('fb3'));
          option = {
            title: [{
              text: '兴趣分布',
              left: 'center',
              textStyle: {
                color: '#fff',
                fontSize: '16'
              }

            }],
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)",
              position: function (p) {   //其中p为当前鼠标的位置
                return [p[0] + 10, p[1] - 10];
              }
            },
            legend: {
              top: '70%',
              itemWidth: 10,
              itemHeight: 10,
              data: ['汽车', '旅游', '财经', '教育', '软件', '其他'],
              textStyle: {
                color: 'rgba(255,255,255,.5)',
                fontSize: '12',
              }
            },
            series: [
              {
                name: '兴趣分布',
                type: 'pie',
                center: ['50%', '42%'],
                radius: ['40%', '60%'],
                color: ['#065aab', '#066eab', '#0682ab', '#0696ab', '#06a0ab', '#06b4ab', '#06c8ab', '#06dcab', '#06f0ab'],
                label: {show: false},
                labelLine: {show: false},
                data: [
                  {value: 2, name: '汽车'},
                  {value: 3, name: '旅游'},
                  {value: 1, name: '财经'},
                  {value: 4, name: '教育'},
                  {value: 8, name: '软件'},
                  {value: 1, name: '其他'},
                ]
              }
            ]
          };

          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
          window.addEventListener("resize", function () {
            myChart.resize();
          });
        }


      },


      today() {
        this.isHistory = false
        this.init()
      },
      yesterday() {
        this.isHistory = true
        let dt = this.getYesDayZoneTime(8);
        var y = dt.getFullYear();
        var mt = dt.getMonth() + 1;
        var day = dt.getDate();
        if (mt < 10) {
          mt = '0' + mt
        }
        if (day < 10) {
          day = '0' + day
        }
        this.date = y + '-' + mt + "-" + day
        this.init()
      },
      now() {
        let dt = this.getZoneTime(8);
        var y = dt.getFullYear();
        var mt = dt.getMonth() + 1;
        var day = dt.getDate();
        var h = dt.getHours();
        var m = dt.getMinutes();
        var s = dt.getSeconds();
        this.nowTime = y + "年" + mt + "月" + day + "-" + h + "时" + m + "分" + s + "秒";
      },
      init() {
        let that = this

        let data = !this.isHistory ? {} : {
          time: this.date
        }
        request({
          url: '/map.json',
          method: 'get',
        }).then((res) => {
          if (res.code === 0) {
            that.mapDate = res.data
            //显示地图
            that.map()
          }
        })

        request({
          method: 'post',
          params: data,
          url: url.platformWeb + '/admin/reportAgentcount/record',
        }).then((res) => {
          if (res.code === 0) {
            let data = res.data

            //初始化单日充值金额
            let tr = data['x109']
            that.totalRecharge = data.totalRecharge | tr[tr.length - 1]['tvalue']

            //初始化单日平台盈利
            tr = data['x110']
            that.totalRegister = data.totalRegister | tr[tr.length - 1]['tvalue']

            //初始化提现总金额
            tr = data['x210']
            that.totalWithdrawal = data.totalWithdrawal | tr[tr.length - 1]['tvalue']

            //初始化平台存余金额
            tr = data['x211']
            that.platformBalance = data.platformBalance | tr[tr.length - 1]['tvalue']

            //初始化会员送礼金额
            tr = data['x212']
            that.giftsAmount = data.giftsAmount | tr[tr.length - 1]['tvalue']


            //初始化推广人数数据
            that.extensions = []
            $(data['x102']).each(function (i, e) {
              that.extensions[i] = e['tvalue']
            })

            //初始化注册人数数据
            that.registers = []
            $(data['x101']).each(function (i, e) {
              that.registers[i] = e['tvalue']
            })

            //初始化平台盈利
            that.profits = []
            $(data['x107']).each(function (i, e) {
              that.profits[i] = e['tvalue']
            })

            //初始化充值人数数据
            that.recharges = []
            $(data['x104']).each(function (i, e) {
              that.recharges[i] = e['tvalue']
            })

            //初始化出款人数数据
            that.drawings = []
            $(data['x106']).each(function (i, e) {
              that.drawings[i] = e['tvalue']
            })

            //初始化出款金额
            that.drawingAmounts = []
            $(data['x105']).each(function (i, e) {
              that.drawingAmounts[i] = e['tvalue']
            })


            //初始化充值金额
            that.rechargeAmounts = []
            $(data['x103']).each(function (i, e) {
              that.rechargeAmounts[i] = e['tvalue']
            })

            //初始化直播在线人数
            that.onlines = []
            $(data['x108']).each(function (i, e) {
              that.onlines[i] = e['tvalue']
            })


            //推广注册显示
            that.echarts_1()
            //注册人数显示
            that.echarts_2()
            //平台盈利
            that.echarts_3()
            //充值/出款人数显示
            that.echarts_4()
            //充值/出款金额显示
            that.echarts_5()
            //直播在线人数显示
            that.echarts_6()
          }
        });

      },
      toLocalString(num) {
        return Number(num).toLocaleString()
      },
      getZoneTime(offset) {
        // 取本地时间
        var localtime = new Date();
        // 取本地毫秒数
        var localmesc = localtime.getTime();
        // 取本地时区与格林尼治所在时区的偏差毫秒数
        var localOffset = localtime.getTimezoneOffset() * 60000;
        // 反推得到格林尼治时间
        var utc = localOffset + localmesc;
        // 得到指定时区时间
        var calctime = utc + (3600000 * offset);
        var nd = new Date(calctime);
        return nd;
      },
      getYesDayZoneTime(offset) {
        // 取本地时间
        var localtime = new Date();
        // 取本地毫秒数
        var localmesc = localtime.getTime();
        // 取本地时区与格林尼治所在时区的偏差毫秒数
        var localOffset = localtime.getTimezoneOffset() * 60000;
        // 反推得到格林尼治时间
        var utc = localOffset + localmesc - 24 * 60 * 60 * 1000;
        // 得到指定时区时间
        var calctime = utc + (3600000 * offset);
        var nd = new Date(calctime);
        return nd;
      },
      dataAxis(args) {
        var dataAxis = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
        if (args || this.isHistory) {
          return dataAxis
        }
        let now = this.getZoneTime(8).getHours();
        return dataAxis.slice(0, now + 1)
      },
      echarts_1() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echarts_1'));
        let dataX = this.dataAxis()
        let data = this.extensions

        option = {
          xAxis: {
            type: 'category',
            axisTick: {show: true},
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            },
            data: dataX
          },
          yAxis: {
            type: 'value',
            splitLine: {
              show: false
            },
            axisTick: {show: false},
            show: true
          },
          grid: {
            x: 10,
            y: 20,
            x2: 10,
            y2: 30
          },
          dataZoom: [
            {
              type: 'inside'
            }
          ],
          series: [{
            data: data,
            type: 'line',
            smooth: true,
            label: {show: true}
          }]
        };

        let zoomSize = 6;

        myChart.on('click', function (params) {
          myChart.dispatchAction({
            type: 'dataZoom',
            startValue: dataX[Math.max(params.dataIndex - zoomSize / 2, 0)],
            endValue: dataX[Math.min(params.dataIndex + zoomSize / 2, dataX.length - 1)]
          });
        });

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function () {
          myChart.resize();
        });

        myChart.dispatchAction({
          type: 'dataZoom',
          startValue: dataX[dataX.length - zoomSize - 1],
          endValue: dataX[dataX.length - 1]
        });
      },
      echarts_2() {
        var myChart = echarts.init(document.getElementById('echarts_2'));

        let dataX = this.dataAxis()
        let data = this.registers

        option = {
          color: ['#188df0'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          xAxis: {
            data: dataX,
            type: 'category',
            axisTick: {show: false},
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            }
          },
          yAxis: [{
            type: 'value',
            splitLine: {
              show: false
            },
            axisTick: {show: false},
            show: true,
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            }
          }],
          grid: {
            x: 50,
            y: 10,
            x2: 10,
            y2: 30
          },
          dataZoom: [
            {
              type: 'inside'
            }
          ],
          series: [
            {
              type: 'bar',
              name: '注册',
              /*label: {
                  show: true
              },*/
              data: data
            }
          ]
        };

        // Enable data zoom when user click bar.
        let zoomSize = 6;

        myChart.on('click', function (params) {
          myChart.dispatchAction({
            type: 'dataZoom',
            startValue: dataX[Math.max(params.dataIndex - zoomSize / 2, 0)],
            endValue: dataX[Math.min(params.dataIndex + zoomSize / 2, dataX.length - 1)]
          });
        });

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function () {
          myChart.resize();
        });


        myChart.dispatchAction({
          type: 'dataZoom',
          startValue: dataX[dataX.length - zoomSize - 1],
          endValue: dataX[dataX.length - 1]
        });

      },
      echarts_3() {

        var myChart = echarts.init(document.getElementById('echarts_3'));

        var labelRight = {
          position: 'right'
        };

        let dataX = this.dataAxis()
        let data = this.profits

        option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            x: 50,
            y: 10,
            x2: 10,
            y2: 10
          },
          xAxis: {
            type: 'category',
            axisLine: {show: false},
            axisLabel: {show: false},
            axisTick: {show: false},
            splitLine: {show: false},
            data: dataX
          },
          yAxis: [{
            type: 'value',
            splitLine: {
              show: false
            },
            axisTick: {show: false},
            show: true,
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            }
          }],
          dataZoom: [
            {
              type: 'inside'
            }
          ],
          series: [
            {
              name: '盈利',
              type: 'bar',
              data: data,
              label: {
                position: 'top',
                show: true,
                formatter: '{b}'
              },
            }
          ]
        };

        let zoomSize = 8;

        myChart.on('click', function (params) {
          myChart.dispatchAction({
            type: 'dataZoom',
            startValue: dataX[Math.max(params.dataIndex - zoomSize / 2, 0)],
            endValue: dataX[Math.min(params.dataIndex + zoomSize / 2, dataX.length - 1)]
          });
        });

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function () {
          myChart.resize();
        });

        myChart.dispatchAction({
          type: 'dataZoom',
          startValue: dataX[dataX.length - zoomSize - 1],
          endValue: dataX[dataX.length - 1]
        });
      },
      echarts_4() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echarts_6'));

        let dataX = this.dataAxis()
        let data = this.recharges

        option = {
          color: ['#4cabce', '#006699'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          xAxis: {
            data: dataX,
            type: 'category',
            axisTick: {show: false},
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            }
          },
          legend: {
            data: ['充值', '出款']
          },
          yAxis: [{
            type: 'value',
            splitLine: {
              show: false
            },
            axisTick: {show: false},
            show: true,
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            }
          }],
          grid: {
            x: 50,
            y: 10,
            x2: 10,
            y2: 30
          },
          dataZoom: [
            {
              type: 'inside'
            }
          ],
          series: [
            {
              type: 'bar',
              name: '充值',
              /*label: {
                  show: true
              },*/
              data: data
            }, {
              type: 'bar',
              name: '出款',
              /*label: {
                  show: true
              },*/
              data: this.drawings
            },
          ]
        };

        // Enable data zoom when user click bar.
        let zoomSize = 6;

        myChart.on('click', function (params) {
          myChart.dispatchAction({
            type: 'dataZoom',
            startValue: dataX[Math.max(params.dataIndex - zoomSize / 2, 0)],
            endValue: dataX[Math.min(params.dataIndex + zoomSize / 2, dataX.length - 1)]
          });
        });

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function () {
          myChart.resize();
        });


        myChart.dispatchAction({
          type: 'dataZoom',
          startValue: dataX[dataX.length - zoomSize - 1],
          endValue: dataX[dataX.length - 1]
        });

      },
      echarts_5() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echarts_5'));

        let dataX = this.dataAxis()
        let data = this.rechargeAmounts

        option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          color: ['#4cab00', '#ff6609'],
          xAxis: {
            data: dataX,
            type: 'category',
            axisTick: {show: false},
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            }
          },
          legend: {
            data: ['充值', '出款']
          },
          yAxis: [{
            type: 'value',
            splitLine: {
              show: false
            },
            axisTick: {show: false},
            show: true,
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            }
          }],
          grid: {
            x: 50,
            y: 10,
            x2: 10,
            y2: 30
          },
          dataZoom: [
            {
              type: 'inside'
            }
          ],
          series: [
            {
              type: 'bar',
              name: '充值',
              data: data
            }, {
              type: 'bar',
              name: '出款',
              data: this.drawingAmounts
            },
          ]
        };

        // Enable data zoom when user click bar.
        let zoomSize = 6;

        myChart.on('click', function (params) {
          myChart.dispatchAction({
            type: 'dataZoom',
            startValue: dataX[Math.max(params.dataIndex - zoomSize / 2, 0)],
            endValue: dataX[Math.min(params.dataIndex + zoomSize / 2, dataX.length - 1)]
          });
        });

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function () {
          myChart.resize();
        });


        myChart.dispatchAction({
          type: 'dataZoom',
          startValue: dataX[dataX.length - zoomSize - 1],
          endValue: dataX[dataX.length - 1]
        });
      },
      echarts_6() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echarts_4'));
        let dataX = this.dataAxis()
        let data = this.onlines

        option = {
          color: ['#0cfbff'],
          xAxis: {
            type: 'category',
            axisTick: {show: true},
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            },
            data: dataX
          },
          yAxis: {
            type: 'value',
            splitLine: {
              show: false
            },
            axisTick: {show: false},
            show: true
          },
          grid: {
            x: 10,
            y: 20,
            x2: 10,
            y2: 30
          },
          dataZoom: [
            {
              type: 'inside'
            }
          ],
          series: [{
            data: data,
            type: 'line',
            smooth: true,
            label: {show: true}
          }]
        };

        let zoomSize = 6;

        myChart.on('click', function (params) {
          myChart.dispatchAction({
            type: 'dataZoom',
            startValue: dataX[Math.max(params.dataIndex - zoomSize / 2, 0)],
            endValue: dataX[Math.min(params.dataIndex + zoomSize / 2, dataX.length - 1)]
          });
        });

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function () {
          myChart.resize();
        });

        myChart.dispatchAction({
          type: 'dataZoom',
          startValue: dataX[dataX.length - zoomSize - 1],
          endValue: dataX[dataX.length - 1]
        });
      },
      map() {
        var myChart = echarts.init(document.getElementById('map'));

        var mapName = 'china'
        var data = []
        var geoCoordMap = {};
        let mapDate = this.mapDate

        myChart.showLoading();
        var mapFeatures = echarts.getMap(mapName).geoJson.features;
        myChart.hideLoading();
        mapFeatures.forEach(function (v) {
          // 地区名称
          var name = v.properties.name;

          // 地区经纬度
          geoCoordMap[name] = v.properties.cp;
          data.push({
            name: name,
            //TODO 重要等级(排名字段)
            // value: Math.round(Math.random() * 100 + 10)
            value: mapDate[name].weight | 0
          })
        });

        var convertData = function (data) {
          var res = [];
          for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
              res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value),
              });
            }
          }
          return res;
        };


        var option = {
          // backgroundColor: '#404a59',
          tooltip: {
            trigger: 'item',
            formatter: function (params) {
              let item = mapDate[params.name]

              return "注册总人数：" + (item.register | 0) + "<br>"
                + "总充值金额：" + (item.recharge | 0) + '<br>'
                + "在线人数:" + (item.online | 0) + '<br>'
            }
          },
          geo: {
            show: true,
            map: mapName,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: '#4c60ff',
                borderColor: '#002097'
              },
              emphasis: {
                areaColor: '#293fff'
              }
            }
          },
          visualMap: {
            show: false,
            //TODO 排序值下限
            min: 0,
            //TODO 排序值上限
            max: 100,
            left: 'left',
            top: 'bottom',
            text: ['高', '低'], // 文本，默认为数值文本
            calculable: true,
            seriesIndex: [0],
            inRange: {
              // TODO 配置程度渐进色
              // color: ['#3B5077', '#031525'] // 蓝黑
              // color: ['#ffc0cb', '#800080'] // 红紫
              // color: ['#3C3B3F', '#605C3C'] // 黑绿
              //  color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
              // color: ['#23074d', '#cc5333'] // 紫红
              //   color: ['#00467F', '#A5CC82'] // 蓝绿
              // color: ['#1488CC', '#2B32B2'] // 浅蓝
              // color: ['#00467F', '#A5CC82','#ffc0cb'] // 蓝绿红
              // color: ['#00467F', '#A5CC82'] // 蓝绿
              // color: ['#00467F', '#A5CC82'] // 蓝绿
              // color: ['#00467F', '#A5CC82'] // 蓝绿
              //color: ['#22e5e8', '#0035f9','#22e5e8'] // 蓝绿
              color: ['#4c60ff', '#293fff']
              // color:['#000','#111','#222','#333','#444','#555','#666','#777','#888'] // 测试
            }
          },
          series: [
            //TODO 地图
            {
              type: 'map',
              map: mapName,
              geoIndex: 0,
              aspectScale: 0.75, //长宽比
              showLegendSymbol: false, // 存在legend时显示
              label: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: false,
                  textStyle: {
                    color: '#fff'
                  }
                }
              },
              roam: true,
              itemStyle: {
                normal: {
                  areaColor: '#031525',
                  borderColor: '#3B5077',
                },
                emphasis: {
                  areaColor: '#2B91B7'
                }
              },
              animation: false,
              data: data
            },
            //TODO 市中心
            {
              name: '散点',
              type: 'scatter',
              coordinateSystem: 'geo',
              data: convertData(data),
              symbolSize: function (val) {
                //TODO 控制圆球大小
                return val[2] / 10;
              },
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'right',
                  show: false
                },
                emphasis: {
                  show: false
                }
              },
              itemStyle: {
                normal: {
                  color: 'rgba(255,255,0,0.8)'
                }
              }
            },
            //TODO 前N地域名
            {
              name: 'Top 5',
              type: 'effectScatter',
              coordinateSystem: 'geo',
              data: convertData(data.sort(function (a, b) {
                return b.value - a.value;
              }).slice(0, 5)),
              symbolSize: function (val) {
                return val[2] / 10;
              },
              showEffectOn: 'render',
              rippleEffect: {
                brushType: 'stroke'
              },
              hoverAnimation: true,
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'right',
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  color: 'rgba(255,255,0,0.8)',
                  shadowBlur: 10,
                  shadowColor: '#05C3F9'
                }
              },
              zlevel: 1
            },
          ]
        };

        myChart.setOption(option);
        window.addEventListener("resize", function () {
          myChart.resize();
        });
      }
    }
  }


</script>

<style scoped>
  @import url(../css/homeChat.css);

  #page {
    background: #000d4a url(../assets/images/home/bg.jpg) center top;
    /*background-size: cover;*/
    color: #666;
    /*font-size: .1rem;*/
  }

  .idx_but {
    background-color: #00a0e2;
    color: #0C0C0C;
    width: 50px;
    height: 30px;
    border: unset 3px;
  }

  .idx_but_active {
    background-color: #0c0f13;
  }

</style>
