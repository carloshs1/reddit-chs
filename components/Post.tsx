import React from 'react'
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

const Post: React.FC<{ post: PostType }> = ({ post }) => {
 return (
  <div className="flex cursor-pointer rounded-md border border-gray-300 bg-white shadow-sm hover:border-gray-600">
   {/* Votes */}
   <div className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400">
    <ArrowUpIcon className="voteButton hover:text-blue-400" />
    <p className="text-black text-xs font-bold">0</p>
    <ArrowDownIcon className="voteButton hover:text-red-400" />
   </div>

   <div className="p-3 pb-1">
    {/* Header */}
    <div className="flex items-center space-x-2">
     <Avatar seed={post.subreddit[0]?.topic} />
     <p className="text-xs text-gray-400">
      <span className="font-bold text-black hover:text-blue-400 hover:underline">
       r/{post.subreddit[0]?.topic}
      </span>{' '}
      • Posted by u/{post.username} <TimeAgo date={post.created_at} />
     </p>
    </div>

    {/* Body */}
    <div></div>

    {/* Image */}
    <div></div>

    {/* Footer */}
    <div></div>
   </div>
  </div>
 )
}

export default Post
