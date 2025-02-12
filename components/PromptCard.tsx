'use client';
import { useState } from 'react'
import Image from 'next/image';
import { Post } from '@app/types-global';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

type Props = {
  post: Post;
  handleTagClick?: (e: string) => void;
  handleEdit: () => void;
  handleDelete: () => void;
}

const PromptCard = ({post, handleTagClick, handleEdit, handleDelete}:Props) => {
  const {data: session} = useSession();
  // const router = useRouter();
  const pathName = usePathname();
  const [isCopied, setIsCopied] = useState("");

  const handleCopy = () => {
    setIsCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setIsCopied(""), 3000);
  }

  return (
    <div className='prompt_card'>
      <div className="flex justify-between items-start gap-5">
        {post?.creator && (
          <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
            <Image src={post.creator.image ?? ''} alt="user_image" width={40} height={40} className='rounded-full object-contain' />
            <div className="flex flex-col">
              <h3 className="font-satoshi font-semibold text-gray-900">{post.creator.username}</h3>
              <p className="font-inter text-sm text-gray-500">{post.creator.email}</p>
            </div>
          </div>
        )} 
        <div className="copy_btn" onClick={() => {handleCopy()}}>
          <Image src={isCopied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'} width={12} height={12} alt=""/>
        </div> 
      </div>
      <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
      <p className='font-inter text-sm blue_gradient cursor-pointer' onClick={() => handleTagClick && handleTagClick(post.tag)}>#{post.tag}</p>

      {session?.user && post.creator && session.user.id === post.creator._id && pathName === '/profile' && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p className="font-inter text-sm green_gradient cursor-pointer" onClick={handleEdit}>Edit</p>
          <p className="font-inter text-sm orange_gradient cursor-pointer" onClick={handleDelete}>Delete</p>
        </div>
      )}
    </div>
  )
}

export default PromptCard