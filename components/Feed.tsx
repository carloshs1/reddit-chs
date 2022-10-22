import { useQuery } from '@apollo/client'
import { Jelly } from '@uiball/loaders'
import React from 'react'
import { GET_ALL_POSTS, GET_ALL_POSTS_BY_TOPIC } from '../graphql/queries'
import Post from './Post'

const Feed: React.FC<{ topic?: string }> = ({ topic }) => {
 const { loading, data, error } = topic
  ? useQuery(GET_ALL_POSTS_BY_TOPIC, { variables: { topic } })
  : useQuery(GET_ALL_POSTS)

 const posts: PostType[] = topic ? data?.getPostListByTopic : data?.getPostList

 return (
  <div className="mt-5 space-y-4">
   {loading && (
    <div className="flex w-full p-10 text-xl items-center justify-center">
     <Jelly size={50} speed={0.9} color="#ff4501" />
    </div>
   )}
   {posts?.map((post) => (
    <Post key={post.id} post={post} />
   ))}
   {error && <h1>{error?.message}</h1>}
  </div>
 )
}

export default Feed
