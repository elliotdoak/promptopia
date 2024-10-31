import React from 'react'
import {Post} from '@app/create-prompt/page';
import Link from 'next/link';

type Props = {
  type: string;
  post: Post;
  setPost: (e: Post) => void;
  isSubmitting: boolean;
  createPrompt: (e: any) => void;
}

const Form = ({type, post, setPost, isSubmitting, createPrompt}: Props) => {
  return (
    <section className='w-full max-w-full flex-center flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} Post</span>
      </h1>

      <p className='desc text-left'>{type} and share amazing prompts with the world, let your imagination run wild with any AI-powered platform</p>

      <form onSubmit={createPrompt} className='mt-10 w-full max-w-2xl flex-col justify-center'>
        <label>
          <span className='font-satoshi font-semibold text-base'>Your AI Prompt</span>
          <textarea value={post.prompt} onChange={(e) => setPost({...post, prompt: e.target.value})} placeholder='Write your prompt here...' className='form_textarea' required />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base'>Tag <span className='font-normal'>(#product, #webdevelopment, #idea)</span></span>
          <input value={post.tag} 
          onChange={(e) => setPost({...post, tag: e.target.value})} 
          placeholder='#tag'
          className='form_input'
          required />
        </label>

        <div className='flex-end mx-3 my-5 gap-4'>
          <Link href="/" className='text-gray-500 text-sm'>Cancel</Link>
          <button type="submit" disabled={isSubmitting} className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'>{isSubmitting ? `${type}...` : type}</button>
        </div>
      </form>
    </section>
  )
}

export default Form