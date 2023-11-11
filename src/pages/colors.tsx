import React, { useState } from 'react'
import Layout from '@theme/Layout'
import Head from '@docusaurus/Head'
import styles from './index.module.css'
import BrowserOnly from '@docusaurus/BrowserOnly'
import { ColorItemProps, ColorItem } from '../components/colors/ColorItem'

const colorSet: ColorItemProps[] = [
  { name: '鬱金', color: '#EFBB24' },
  { name: '千草', color: '#3A8FB7', deep: true },
  { name: '撫子', color: '#DC9FB4' },
  { name: '桜鼠', color: '#B19693' },
  { name: '生壁', color: '#7D6C46', deep: true },
  { name: '千歳茶', color: '#4D5139', deep: true },
  { name: '松葉', color: '#42602D', deep: true },
  { name: '桔梗', color: '#6A4C9C', deep: true },
  { name: '紺桔梗', color: '#211E55', deep: true },
  { name: '紫鳶', color: '#60373E', deep: true },
  { name: '真朱', color: '#AB3B3A', deep: true },
  { name: '深支子', color: '#FB9966' },
  { name: '掬一捧清水窥月落', color: '#085f82', deep: true },

]

export default function Home(): JSX.Element {

  // 藍鼠
  const [bgColor, setBgColor] = useState('#566C73')
  const [deep, setDeep] = useState(true)

  return (
    <>
      <Head>
        <script src="/three/examples/js/libs/ammo.wasm.js"></script>
      </Head>
      <Layout
        title={`掬一捧清水窥明月`}
        description="每个人都会遇到的一个朋友，他的思想，他的价值观，都会让你很欣赏他，但是因为利益出卖了你..."
        wrapperClassName={styles['main-wrapper']}
      >
        <main className={styles['main'] + ' ' + styles['main-wpr']}>
          <BrowserOnly>{() => <>
            <div className="color-wrapper">
              <div className={"color-sushi" + (deep ? ' color-sushi--deep' : '')} style={{ backgroundColor: bgColor }}>
                <p>莫听穿林打叶声，何妨吟啸且徐行。竹杖芒鞋轻胜马，谁怕？</p>
                <p>一蓑烟雨任平生。料峭春风吹酒醒，微冷，山头斜照却相迎。回首向来萧瑟处，归去，也无风雨也无晴。</p>
              </div>
              <div className="colors">
                {colorSet.map((item) => <ColorItem
                  key={item.color}
                  name={item.name}
                  color={item.color}
                  deep={item.deep}
                  onClick={(color, deep) => {
                    setBgColor(color)
                    setDeep(deep)
                  }} />)}
              </div>
              {/* <ColorItem key={'#085f82'} name={'掬一捧清水窥月落'} color={'#085f82'} deep={true} /> */}
            </div></>}</BrowserOnly>
        </main>
      </Layout>
    </>
  )
}
