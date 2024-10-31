'use client';
import React, {useState, useEffect} from 'react'
import PromptCard from './PromptCard';
import {Post} from '@/app/types-global';

type Props = {
  data: Post[];
  handleTagClick: () => void;
}

const PromptCardList = ({data, handleTagClick}: Props) => {
  const handleEdit = () => {}
  const handleDelete = () => {}

  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id} 
          post={post}
          handleTagClick={handleTagClick} 
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('api/prompt');
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, [])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    if(e.target.value.length > 0) {
      setIsSearchActive(true);
    }
  }

  const handleTagClick = () => {
    console.log('clicked a tag');
  }

  useEffect(() => {
    if(posts){
      const filteredPosts = posts.filter(({prompt, tag}) => prompt.toLowerCase().includes(searchText) || tag.toLowerCase().includes(searchText));
      setFilteredPosts(filteredPosts);
    }
  }, [searchText])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input type="text" placeholder='Search for prompts' value={searchText} onChange={handleSearchChange} required className='search_input peer'/>
      </form>

      <PromptCardList data={isSearchActive ? filteredPosts : posts} handleTagClick={handleTagClick}></PromptCardList>
    </section>
  )
}

export default Feed