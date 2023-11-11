import React from 'react'
import Layout from '@theme/Layout'
import styles from './index.module.css'
import BrowserOnly from '@docusaurus/BrowserOnly'
import { Group } from '../components/personal-review/Group'
import dataset from '../components/personal-review/dataset'

export default function Home(): JSX.Element {
  return (
    <>
      <Layout
        title={`掬一捧清水窥明月`}
        description="每个人都会遇到的一个朋友，他的思想，他的价值观，都会让你很欣赏他，但是因为利益出卖了你..."
        wrapperClassName={styles['main-wrapper']}
      >
        <main className={styles['main'] + ' ' + styles['main-wpr']}>
          <BrowserOnly>{() => <Group dataset={dataset} />}</BrowserOnly>
        </main>
      </Layout>
    </>
  )
}
