import { __debug__, generateFullMonthList, generateFullWeekList } from '../../shared-utils/date-utils'
import * as echarts from 'echarts'

import { CycleEnum } from './dataset/typings'

type EChartsOption = echarts.EChartsOption

export interface WPRLineConfig {
  cycle?: CycleEnum
  legend: echarts.LegendComponentOption | echarts.LegendComponentOption[] | undefined
  xAxisData?: string[]
  series: echarts.SeriesOption | echarts.SeriesOption[] | undefined
}

export function renderWPRLine(node: HTMLElement, config: WPRLineConfig) {
  const myChart = echarts.init(node)
  const xAxisData = (()=> {
    if (config.cycle === CycleEnum.BarChart) {
      return config.xAxisData
    }
    if (config.cycle === CycleEnum.Month) {
      return generateFullMonthList(2023).map((it, index) => `M${index + 1}`)
    }

    return generateFullWeekList(2023).map((it, index) => `W${index + 1}`)
  })()

  const option: EChartsOption = {
    title: {
      text: 'WPR'
    },
    tooltip: [{
      trigger: 'axis',
    }, {
      trigger: 'item',
    }],
    legend: config.legend,
    grid: {
      left: '2%',
      right: '3%',
      bottom: '3%',
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      axisLabel: {
        // interval: 0,
        rotate: 0,
        inside: false,
      },
      boundaryGap: true,
      data: xAxisData,
      axisTick: {
        alignWithLabel: true
      },
    },
    yAxis: {
      type: 'value',
   
    },
    series: config.series,
    plotOptions: { series: { connectNulls: true } }
  }

  myChart.setOption(option);
  myChart.resize()

  return myChart
}