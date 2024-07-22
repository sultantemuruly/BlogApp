import Comments from '@/components/Comments'
import FormComment from '@/components/FormComments'
import prisma from '@/lib/db';
import React, { FC } from 'react'

interface BlogDetailPageProps {
  params: {
    id: string
  }
}
const BlogDetailPage: FC<BlogDetailPageProps> = async ({ params }) => {
  const post = await prisma.post.findFirst({
    where: {
      id: params.id,
    },
    include: {
      user: true
    }
  });

  return (
    <div className='mx-36 my-10'>
        <h1 className='text-3xl font-bold'>
          {post?.title}
        </h1>
        <p>Written by: {post?.user?.name}</p>
        <div className='pt-4'>
          {post?.content}
        </div>

        <Comments postId={params.id}/>
        <FormComment postId={params.id}/>
    </div>
  )
}

export default BlogDetailPage