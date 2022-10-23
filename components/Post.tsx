import React, { useEffect, useState } from 'react'
import {
 ArrowDownIcon,
 ArrowUpIcon,
 BookmarkIcon,
 ChatBubbleOvalLeftEllipsisIcon,
 EllipsisHorizontalIcon,
 GifIcon,
 ShareIcon,
} from '@heroicons/react/24/outline'
import Avatar from './Avatar'
import TimeAgo from 'react-timeago'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { useMutation, useQuery } from '@apollo/client'
import { GET_VOTES_BY_POST_ID } from '../graphql/queries'
import { ADD_VOTE } from '../graphql/mutations'

const Post: React.FC<{ post: PostType }> = ({ post }) => {
 const { data: session } = useSession()
 const [vote, setVote] = useState<boolean>()
 const { data, loading, error } = useQuery(GET_VOTES_BY_POST_ID, {
  variables: {
   post_id: post?.id,
  },
 })
 const [addVote] = useMutation(ADD_VOTE, {
  refetchQueries: [GET_VOTES_BY_POST_ID, 'getVotesByPostId'],
 })
 const upVote = async (isUpVote: boolean) => {
  if (!session) {
   toast('Sign in to Vote!')
   return
  }
  if ((vote && isUpVote) || (vote === false && !isUpVote)) {
   return
  } else {
   try {
    await addVote({
     variables: {
      post_id: post.id,
      username: session.user?.name,
      upvote: isUpVote,
     },
    })
   } catch (error) {
    toast.error('Something went wrong with your vote :(')
   }
  }
 }

 useEffect(() => {
  const votes: VoteType[] = data?.getVotesByPostId
  const upVote = votes?.find(
   (vote) => vote.username === session?.user?.name
  )?.upvote
  setVote(upVote)
 }, [data])

 const displayVotes: (data: { getVotesByPostId: VoteType[] }) => number = (
  data
 ) => {
  const votes = data?.getVotesByPostId
  if (!votes?.length) return 0
  const displayNumber = votes?.reduce(
   (total: number, vote: VoteType) =>
    vote.upvote ? (total += 1) : (total -= 1),
   0
  )
  if (!displayNumber) return votes[0]?.upvote ? 1 : -1
  return displayNumber
 }

 return (
  <Link href={`/post/${post.id}`}>
   <div className="flex cursor-pointer rounded-md border border-gray-300 bg-white shadow-sm hover:border-gray-600">
    {/* Votes */}
    <div className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400">
     <ArrowUpIcon
      className={`voteButton hover:text-blue-400 ${vote && 'text-blue-400'}`}
      onClick={() => upVote(true)}
     />
     <p className="text-black text-xs font-bold">{displayVotes(data)}</p>
     <ArrowDownIcon
      className={`voteButton hover:text-red-400 ${
       vote === false && 'text-red-400'
      }`}
      onClick={() => upVote(false)}
     />
    </div>

    <div className="p-3 pb-1">
     {/* Header */}
     <div className="flex items-center space-x-2">
      <Avatar seed={post.subreddit[0]?.topic} />
      <p className="text-xs text-gray-400">
       <Link href={`/subreddit/${post.subreddit[0]?.topic}`}>
        <span className="font-bold text-black hover:text-blue-400 hover:underline">
         r/{post.subreddit[0]?.topic}
        </span>
       </Link>{' '}
       • Posted by u/{post.username} <TimeAgo date={post.created_at} />
      </p>
     </div>

     {/* Body */}
     <div className="py-4">
      <h2 className="text-xl font-semibold">{post.title}</h2>
      <p className="mt-2 text-sm font-light">{post.body}</p>
     </div>

     {/* Image */}
     <img className="w-full" src={post.image} alt="" />

     {/* Footer */}
     <div className="flex space-x-4 text-gray-400">
      <div className="postButtons">
       <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6" />
       <p>{post.comments.length} Comments</p>
      </div>
      <div className="postButtons">
       <GifIcon className="h-6 w-6" />
       <p className="hidden sm:inline">Award</p>
      </div>
      <div className="postButtons">
       <ShareIcon className="h-6 w-6" />
       <p className="hidden sm:inline">Share</p>
      </div>
      <div className="postButtons">
       <BookmarkIcon className="h-6 w-6" />
       <p className="hidden sm:inline">Save</p>
      </div>
      <div className="postButtons">
       <EllipsisHorizontalIcon className="h-6 w-6" />
      </div>
     </div>
    </div>
   </div>
  </Link>
 )
}

export default Post
