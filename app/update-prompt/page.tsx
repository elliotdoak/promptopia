'use client';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@/components/Form';

export type CreatePost = {
  prompt: string;
  tag: string;
}

const EditPrompt = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState<CreatePost>({
    prompt: '',
    tag: '',
  })
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');  

  useEffect(() => {
    const fetchPrompt = async () => {
        const response = await fetch(`/api/prompt/${promptId}`);
        const data = await response.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag
      })
    };
    fetchPrompt();
  }, [])

//   const { data: session } = useSession();
  const router = useRouter();

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if(!promptId){
        return alert('Prompt ID not found')
    }

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
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

  return (
    <Form type="Edit" post={post} setPost={setPost} isSubmitting={isSubmitting} createPrompt={updatePrompt}/>
  )
}

export default EditPrompt