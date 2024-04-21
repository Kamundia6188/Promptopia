'use client'
import Form from '@/components/Form';
import { useSession } from 'next-auth/react';
import { useRouter , useSearchParams } from 'next/navigation';
import {useState, useEffect} from 'react'

const Update = ({params}) => {
    const router = useRouter();
    const {data: session} = useSession();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    console.log(promptId)
  
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
      prompt: '',
      tag: ''
    })
    
    const updatePrompt = async (e) => {
      e.preventDefault();
      setSubmitting(true);
        if(!promptId) return alert('Prompt ID not found')

      try {
        const response = await fetch(`/api/prompt/${promptId}`,
          {
            method: 'PATCH',
            body: JSON.stringify({
              prompt: post.prompt,
              
              tag: post.tag
            })
          })
  
          if(response.ok){
            router.push('/');
          }
        } 
      catch (error) {
        console.log(error)
        } 
      finally {
        setSubmitting(false)
      }
    }

    useEffect(()=>{
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`)
            const data = await response.json();

            setPost({
                prompt: data.prompt,
                tag: data.tag,
            })
        }
        if(promptId) getPromptDetails()
    }, [promptId])
  
    return (
      <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
      />
    )
  }

export default Update