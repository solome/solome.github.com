import { CycleEnum } from "./typings";

export default {
  cycle: CycleEnum.BarChart,
  name: "游戏人生",
  unit: 'h',
  items: [
    {
      title: '塞尔达传说・荒野之息',
      year: 2023,
      type: 'bar',
      data: [{
        index: 10,
        value: 360,
        extend: {}
      }]
    },
    {
      title: '塞尔达传说・王国之泪',
      year: 2023,
      type: 'bar',
      data: [{
        index: 10,
        value: 40,
        extend: {}
      }]
    },
  ]
}