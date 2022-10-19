type CommentsType = {
 created_at: string
 id: number
 post_id: number
 text: string
 username: string
}

type VoteType = {
 created_at: string
 id: number
 post_id: number
 upvote: boolean
 username: string
}

type SubredditType = {
 created_at: string
 id: number
 topic: string
}

type PostType = {
 body: string
 created_at: string
 id: number
 image: string
 subreddit_id: number
 title: string
 username: string
 votes: Vote[]
 comments: Comments[]
 subreddit: Subreddit[]
}
