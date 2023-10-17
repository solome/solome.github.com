 export const WEEK_MAP = new Map([
  [1, '星期一'],
  [2, '星期二'],
  [3, '星期三'],
  [4, '星期四'],
  [5, '星期五'],
  [6, '星期六'],
  [0, '星期日'],
])
 
 export function getStartDate(year: number) {
  if (year < 0) {
    throw new Error('illegal year')
  }

  const date = new Date(year, 0, 1, 0, 0, 0 ,0);

  // 首周规则
  const map = new Map([
    [1, 1],
    [2, 0],
    [3, -1],
    [4, -2],
    [5, -3],
    [6, 3],
    [0, 2],
  ])

  const day = date.getDay()
  return new Date(year, 0, map.get(day), 0, 0, 0, 0)
}

export function generateFullWeekList(year: number) {
  const res = []
  const date = getStartDate(year)

  while(date.getFullYear() === year) {
    const startDate = new Date(date);
    date.setDate(date.getDate() + 6)
    const endDate = new Date(date)
    res.push([startDate, endDate])
    date.setDate(date.getDate() + 1)
  }

  return res
}

export function generateFullMonthList(year: number) {
  const res = []
  const date = new Date(year, 0, 1, 0, 0, 0 ,0)

  while(date.getFullYear() === year) {
    const startDate = new Date(date);
    date.setMonth(date.getMonth() + 1)
    const endDate = new Date(date)
    endDate.setDate(endDate.getDate() -1)
    res.push([startDate, endDate])
  }

  return res
}

export function __debug__() {
  // for(let year = 1991; year <= 2028; year++) {
  //   const date = getStartDate(year)
  //   console.log(`${date.getFullYear()} ${date.getMonth() + 1} ${date.getDate()} ${WEEK_MAP.get(date.getDay())}`)
  //   date.setDate(date.getDate() + 6)
  // }

  const res = generateFullWeekList(2023)

  res.forEach((it, index) => {
    console.log(`W${index + 1}: [${it[0].getFullYear()}年${it[0].getMonth() + 1}月${it[0].getDate()}日 ${WEEK_MAP.get(it[0].getDay())}, ${it[1].getFullYear()}年${it[1].getMonth() + 1}月${it[1].getDate()}日 ${WEEK_MAP.get(it[1].getDay())}]`)
  })
}


