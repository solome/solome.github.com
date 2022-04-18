import React from 'react'
// import clsx from 'clsx'
import Layout from '@theme/Layout'
import Head from '@docusaurus/Head'
// import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
// import styles from './index.module.css'
import { HatsuneMiku } from '../components/HatsuneMiku'
import BrowserOnly from '@docusaurus/BrowserOnly'

export default function Home(): JSX.Element {
  // const { siteConfig } = useDocusaurusContext()
  return (
    <>
      <Head>
        <script src="/three/examples/js/libs/ammo.wasm.js"></script>
      </Head>
      <Layout
        title={`掬一捧清水窥明月`}
        description="每个人都会遇到的一个朋友，他的思想，他的价值观，都会让你很欣赏他，但是因为利益出卖了你..."
      >
        <main>
          <BrowserOnly>{() => <HatsuneMiku />}</BrowserOnly>
        </main>
      </Layout>
    </>
  )
}
