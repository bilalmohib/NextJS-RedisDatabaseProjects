import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <div>
      <Head>
        <title>TodoAppNextJSRedis</title>
      </Head>
      <div className={`container`}>
        <div className={`row`}>
          <div className={`col-12`}>
            <h1>This is a todo app built with next js and redis in progress</h1>
          </div>
        </div>
      </div>
    </div>
  )
}
