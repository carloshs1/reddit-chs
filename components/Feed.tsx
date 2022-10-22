import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_ALL_POSTS, GET_ALL_POSTS_BY_TOPIC } from '../graphql/queries'
import Post from './Post'

const Feed: React.FC<{ topic?: string }> = ({ topic }) => {
 const { data, error } = topic
  ? useQuery(GET_ALL_POSTS_BY_TOPIC, { variables: { topic } })
  : useQuery(GET_ALL_POSTS)

 const posts: PostType[] = topic ? data?.getPostListByTopic : data?.getPostList

 return (
  <div className="mt-5 space-y-4">
   {posts?.map((post) => (
    <Post key={post.id} post={post} />
   ))}
  </div>
 )
}

export default Feed
