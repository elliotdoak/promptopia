'use client';
import {useState, useEffect} from 'react';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import Profile from '@/components/Profile';
import { Post } from '@app/types-global';

const MyProfile = () => {
  const router = useRouter();

  const [posts, setPosts] = useState([]);
  const {data: session} = useSession();

  const handleEdit = (e: Post) => {
    router.push(`/update-prompt?id=${e._id}`)
  };
  const handleDelete = async (e: Post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
    if(hasConfirmed){
      try {
        await fetch(`/api/prompt/${e._id.toString()}`, {
          method: 'DELETE'
        })
      } catch (error) {
        console.log(error)
      }

      const filteredPosts = posts.filter((post) => post._id !== e._id);
      setPosts(filteredPosts);
    } 
  };

  useEffect(() => {
      const fetchPosts = async () => {
        const response = await fetch(`api/users/${session?.user?.id}/posts`);
        const data = await response.json();
        setPosts(data);
      };
      fetchPosts();
  }, [])

  return (
    <Profile name="My" desc="Welcome to your profile" data={posts} handleEdit={handleEdit} handleDelete={handleDelete}/>
  )
}

export default MyProfile