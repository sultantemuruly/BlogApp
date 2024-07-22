'use client'

import { FormData } from '@/types/blog'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from "react"
import ReactTextareaAutosize from "react-textarea-autosize"

const inputClass = 'w-96 py-2 px-3 border border-blue-500 rounded-md focus:outline-none focus:ring text-black'

function FormNewPost() {
  const [formData, setFormData] = useState<FormData>({
    title:'', 
    content: ''
  });

  const { data } = useSession();
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value
    });
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('api/posts', formData); 

      if(response.status === 200) {
        router.push(`/blogs/${response.data.newPost.id}`)
      }
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <form className='p-4 flex flex-col justify-center items-center' onSubmit={handleSubmit}>
            <div className='mb-4'>
                <input 
                    className={inputClass}
                    type="text"
                    placeholder='Enter the title'
                    name = 'title'
                    value={formData.title}
                    onChange={handleChange}
                />
            </div>
            <div className='mb-4'>
                <ReactTextareaAutosize 
                    className={inputClass}
                    minRows={5} 
                    placeholder='Enter the content'
                    name='content'
                    value={formData.content}
                    onChange={handleChange}
                />
            </div>
            <button 
                disabled={!data?.user?.email}
                type="submit" 
                className="
                bg-blue-800 hover:bg-blue-900 font-bold py-2 px-4 
                rounded-md focus:outline-none focus:ring 
                focus:border-blue-500 w-96 disabled:bg-gray-400">
                Submit
            </button>
    </form>
  )
}

export default FormNewPost