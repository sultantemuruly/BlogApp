import prisma from '@/lib/db';
import { format } from 'date-fns';
import React, { FC } from 'react'

interface CommentsProps {
  postId: string,
}

const Comments: FC<CommentsProps> = async({ postId }) => {
  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
    include: {
      user: true
    }
  });

  return (
    <div className='pt-8'>
        <h2 className='text-2xl font-bold'>Comments</h2>
        <ul>
          {comments.map((comment) => (
            <li key={comment.id} className='mb-4 bg-green-800 p-2'>
              <div className='flex items-center pb-2'>
                <div className='font-bold pr-2'>{comment.user?.name}</div>
                <div>
                  {format(comment.createAt, 'MMMM d, yyyy')}
                </div>
              </div>
              <p>{comment.text}</p>
            </li>
          ))} 
        </ul>
    </div>
  )
}

export default Comments