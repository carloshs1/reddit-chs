import { useMutation } from '@apollo/client'
import { LinkIcon, PhotoIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ADD_POST, ADD_SUBREDDIT } from '../graphql/mutations'
import Avatar from './Avatar'
import client from '../apollo-client'
import { GET_ALL_POSTS, GET_SUBREDDIT_BY_TOPIC } from '../graphql/queries'
import toast from 'react-hot-toast'

const PostBox: React.FC = () => {
 const { data: session } = useSession()
 const [addPost] = useMutation(ADD_POST, {
  refetchQueries: [GET_ALL_POSTS, 'getPostList'],
 })
 const [addSubreddit] = useMutation(ADD_SUBREDDIT)
 const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false)
 const {
  register,
  setValue,
  handleSubmit,
  watch,
  formState: { errors },
 } = useForm<{
  title: string
  body: string
  image: string
  subreddit: string
 }>()

 const onSubmit = handleSubmit(async ({ title, body, image, subreddit }) => {
  const notification = toast.loading('Creating new post...')
  try {
   const {
    data: { getSubredditListByTopic },
   } = await client.query({
    query: GET_SUBREDDIT_BY_TOPIC,
    variables: {
     topic: subreddit,
    },
   })

   const imageForPost = image || ''
   const subredditExist = !!getSubredditListByTopic.length

   if (subredditExist) {
    // use existing subreddit...
    const {
     data: { insertPost: newPost },
    } = await addPost({
     variables: {
      body,
      image: imageForPost,
      subreddit_id: getSubredditListByTopic[0].id,
      title,
      username: session?.user?.name,
     },
    })
   } else {
    // Create subreddit...
    const {
     data: { insertSubreddit: newSubreddit },
    } = await addSubreddit({
     variables: {
      topic: subreddit,
     },
    })

    const {
     data: { insertPost: newPost },
    } = await addPost({
     variables: {
      body,
      image: imageForPost,
      subreddit_id: newSubreddit.id,
      title,
      username: session?.user?.name,
     },
    })
   }

   setValue('title', '')
   setValue('body', '')
   setValue('image', '')
   setValue('subreddit', '')
   toast.success('New Post Created!', {
    id: notification,
   })
  } catch (err) {
   // console.warn({ err })
   toast.error('Whoops! Something went wrong :(', {
    id: notification,
   })
  }
 })

 return (
  <form
   onSubmit={onSubmit}
   className="sticky top-16 z-50 rounded-md bg-white border border-gray-300 p-2"
  >
   <div className="flex items-center space-x-3">
    <Avatar />
    <input
     {...register('title', { required: true })}
     type="text"
     disabled={!session}
     className="flex-1 rounded-md bg-gray-50 p-2 pl-5 outline-none"
     placeholder={
      session ? 'Create post by entering a title' : 'Sign in to post'
     }
    />
    <PhotoIcon
     className={`h-6 text-gray-300 cursor-pointer ${
      imageBoxOpen && 'text-blue-300'
     }`}
     onClick={() => setImageBoxOpen(!imageBoxOpen)}
    />
    <LinkIcon className="h-6 text-gray-300" />
   </div>
   {!!watch('title') && (
    <div className="flex flex-col py-2">
     <div className="flex items-center px-2">
      <p className="min-w-[90px]">Body:</p>
      <input
       {...register('body')}
       className="m-2 flex-1 bg-blue-50 p-2 outline-none"
       type="text"
       placeholder="Text (optional)"
      />
     </div>

     <div className="flex items-center px-2">
      <p className="min-w-[90px]">Subreddit:</p>
      <input
       {...register('subreddit', { required: true })}
       className="m-2 flex-1 bg-blue-50 p-2 outline-none"
       type="text"
       placeholder="i.e. reactjs"
      />
     </div>

     {imageBoxOpen && (
      <div className="flex items-center px-2">
       <p className="min-w-[90px]">Image URL:</p>
       <input
        {...register('image')}
        className="m-2 flex-1 bg-blue-50 p-2 outline-none"
        type="text"
        placeholder="Optional..."
       />
      </div>
     )}

     {!!Object.keys(errors).length && (
      <div className="space-y-2 p-2 text-red-500">
       {errors.title?.type === 'required' && <p> A Post Title is required</p>}
       {errors.subreddit?.type === 'required' && (
        <p> A Subreddit is required</p>
       )}
      </div>
     )}

     {!!watch('title') && (
      <button
       type="submit"
       className="w-full rounded-full bg-blue-400 hover:bg-white p-2 text-white hover:text-blue-500 border border-blue-400 hover:border-blue-500"
      >
       Create Post
      </button>
     )}
    </div>
   )}
  </form>
 )
}

export default PostBox
