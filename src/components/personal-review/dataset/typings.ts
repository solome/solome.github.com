import { RegisteredSeriesOption } from "echarts"

export enum CycleEnum {
  Week = 'Week',
  Month = 'Month',
  BarChart = 'BarChart',
}

export interface DatasetItem {
  cycle?: CycleEnum
  name: string
  unit: string
  items: {
    title: string
    year: number
    data: {
      index: number
      value: number
      extend?: Record<string, string>
    }[]
  }[]
}