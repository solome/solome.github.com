import * as React from 'react'
import { CycleEnum, DatasetItem } from '../dataset/typings'

import './index.css'
import { renderWPRLine } from '../WPRLine'
import { generateFullMonthList, generateFullWeekList } from '../../../shared-utils/date-utils'

export interface GroupProps {
  dataset: DatasetItem[]
}

export function Group(props: GroupProps) {
  const dataset = props.dataset
  const canvasRef = React.useRef<HTMLDivElement>(null)
  const [current, setCurrent] = React.useState(0)
  const myChart = React.useRef<echarts.ECharts | null>(null)

  React.useEffect(() => {
    if (!canvasRef.current) {
      return
    }

    myChart.current?.dispose()
    const data = dataset[current]
    myChart.current = renderWPRLine(canvasRef.current!, {
      cycle: data.cycle,
      legend: {
        data: data.cycle === CycleEnum.BarChart ? undefined : data.items.map((item) => item.title),
      },
      xAxisData: data.cycle !== CycleEnum.BarChart ? undefined : data.items.map((item) => item.title),
      series: (() => {
        if (data.cycle === CycleEnum.BarChart) {
          return [{
            // name: data.name,
            type: 'bar',
            data: data.items.map((item2) => ({
              value: item2.data[0].value,
              itemStyle: {
                color: item2.data[0].extend.color,
              }
            })),
            barMaxWidth: 80,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }]
        }
        return data.items.map((item) => {
          const xAxisData: (number | string)[] = (() => {
            if (data.cycle === CycleEnum.Month) {
              return generateFullMonthList(item.year).map(() => '-')
            }

            return generateFullWeekList(item.year).map(() => '-')
          })()

          item.data.map((item2) => xAxisData[item2.index - 1] = item2.value)

          return {
            name: item.title,
            type: 'line',
            data: xAxisData,
          }
        })
      })()
    })

    const resize = () => {
      myChart.current?.resize()
    }

    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      myChart.current?.dispose()
    }

  }, [current])

  return <div className="group">
    <div className="group-nav">
      {props.dataset.map((item, index) => {
        return (
          <div
            key={item.name}
            onClick={() => setCurrent(index)}
            className={`group-item${current === index ? ' group-item--selected' : ''}`}>
            <div className="group-item-title">{item.name}</div>
          </div>
        )
      })}
    </div>
    <div className="group-panel" ref={canvasRef}></div>
  </div>
}