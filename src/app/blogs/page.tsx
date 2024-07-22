import prisma from '@/lib/db'
import Link from 'next/link'

const BlogsPage = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createAt: 'desc',
    },
    include: {
      user: true
    }
  });

  return (
    <div className='mx-36 my-10'>
        <h1 className='text-3xl font-bold mb-4'>Blogs</h1>
        <div className='flex flex-row justify-between grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {posts.map(post => (
                <Link key={post.id} href={`/blogs/${post.id}`} className='bg-green-800 p-4 rounded-md'>
                    <h2 className='text-xl font-bold'>{post.title}</h2>
                    <p>Written by: {post.user?.name}</p>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default BlogsPage