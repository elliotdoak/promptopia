'use client';
import React from 'react'
import { useState } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Form from '@/components/Form';

export type CreatePost = {
  prompt: string;
  tag: string;
}

const CreatePrompt = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState<CreatePost>({
    prompt: '',
    tag: '',
  })

  const { data: session } = useSession();
  const router = useRouter();

  const createPrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if(session?.user){ 
      try {
        const response = await fetch('/api/prompt/new', {
          method: 'POST',
          body: JSON.stringify({
            prompt: post.prompt,
            userId: session?.user.id,
            tag: post.tag
          })
        })

        if (response.ok) {  
          router.push('/');
        } 
      } catch (error) {
        console.log(error);
      } finally {
        setIsSubmitting(false);
      }
    }
    else{
      alert('Please sign in to create a prompt');
    }
  } 

  return (
    <Form type="Create Post" post={post} setPost={setPost} isSubmitting={isSubmitting} createPrompt={createPrompt}/>
  )
}

export default CreatePrompt