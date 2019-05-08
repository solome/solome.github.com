import * as React from 'react'
import { Link } from 'react-router-dom'

export default class L3Navi extends React.Component {

  render () {

    return (

      <div className="l3-nav">
        <h1>《Three.js開發指南》・整理筆記</h1>
        <ul>
          <li><Link to="/">第一章：使用Three.js 創建你的第一個三維場景</Link></li>
          <li><Link to="/cube">第二章：使用構建Three.js 場景的基本組件</Link></li>
          <li><Link to="/cube">第三章：使用Three.js 里的各種光源</Link></li>
          <li><Link to="/cube">第四章：使用Three.js 材質</Link></li>
          <li><Link to="/cube">第五章：學習和使用幾何體</Link></li>
          <li><Link to="/cube">第六章：使用高級幾何體和二元操作</Link></li>
          <li><Link to="/cube">第七章：粒子和粒子系統</Link></li>
          <li><Link to="/cube">第八章：創建、加載高級網格和幾何體</Link></li>
          <li><Link to="/cube">第九章：創建動畫和移動相機</Link></li>
          <li><Link to="/cube">第十章：加載和使用紋理</Link></li>
          <li><Link to="/cube">第十一章：定製着色器和渲染後期處理</Link></li>
          <li><Link to="/cube">第十二章：用Physijs在場景中添加物理效果</Link></li>
        </ul>
      </div>
    )
  }
}
