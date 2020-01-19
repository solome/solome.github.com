import run from './index'
require('./d.scss')

import(/* webpackChunkName: "snow.mallaborema"*//* webpackMode: "lazy" */'@three/special-effects/snow')
  .then((m) => m.default)
  .then((fun) => fun())

run()
