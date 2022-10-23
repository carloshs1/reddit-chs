import type { NextPage } from 'next'
import Head from 'next/head'
import Communities from '../components/Communities'
import Feed from '../components/Feed'
import PostBox from '../components/PostBox'

const Home: NextPage = () => {
 return (
  <div className="max-w-5xl my-7 mx-auto">
   <Head>
    <title>Reddit-CHS</title>
    <link rel="icon" href="/favicon.ico" />
   </Head>

   <PostBox />

   <div className="flex">
    <Feed />
    <Communities />
   </div>
  </div>
 )
}

export default Home
