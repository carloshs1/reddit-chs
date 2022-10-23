import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_SUBREDDITS_WITH_LIMIT } from '../graphql/queries'
import SubredditRow from './SubredditRow'

const Communities: React.FC = () => {
 const { data } = useQuery(GET_SUBREDDITS_WITH_LIMIT, {
  variables: {
   limit: 10,
  },
 })

 const subreddits: SubredditType[] = data?.getSubredditListWithLimit

 return (
  <div className="sticky top-36 ml-5 mt-5 hidden h-fit min-w-[300px] rounded-md border border-gray-300 bg-white lg:inline">
   <p className="text-md mb-1 p-4 pb-3 font-bold">Top Communities</p>
   <div>
    {subreddits?.map((subreddit, index) => (
     <SubredditRow key={subreddit.id} subreddit={subreddit} index={index} />
    ))}
   </div>
  </div>
 )
}

export default Communities
