'use client'

import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { ChangeEvent, FC, useState } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'

interface FormCommentProps {
  postId: string,
}

const FormComment: FC<FormCommentProps> = ({ postId }) => {
  const [comment, setComment] = useState<string>('');
  const {data} = useSession();

  const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setComment(value);
  }

  const handleCommentSubmit = async () => {
    if(comment.trim() !== '') {
      try {
        const newComment = await axios.post('/api/comments', {
          postId, 
          text: comment
        });
      } catch(error) {
        console.error(error);
      }
    }
  }

  return (
    <div>
        <div className='mt-4'>
            <div className='flex flex-col justify-center items-center'>
                <label htmlFor="comment" className='block text-sm font-bold py-2 pl-30'>Add Comment</label>
                <ReactTextareaAutosize 
                    value={comment}
                    onChange={handleCommentChange}
                    className='w-1/2 py-2 px-3 border border-blue-500 rounded-md focus:outline-none focus:ring text-black'
                    name='comment'
                />
                <div className='py-10'>
                    <button
                    disabled={!data?.user?.email}
                    onClick={handleCommentSubmit}
                    className="
                    bg-blue-800 hover:bg-blue-900 font-bold py-2 px-4 
                    rounded-md focus:outline-none focus:ring 
                    focus:border-blue-500 w-96 disabled:bg-gray-400"
                    >Submit</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FormComment