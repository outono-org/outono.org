import { useState, useEffect } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import Avatar from './Avatar';
import Link from 'next/link';

export default function Profile({ session, username }) {
  const supabase = useSupabaseClient()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  //const [username, setUsername] = useState(null)
  const [id, setId] = useState(null)
  const [full_name, setFullName] = useState(null)
  const [website, setWebsite] = useState(null)
  const [biography, setBiography] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)

  useEffect(() => {
    if (username) {
        getProfile(username);
      }
  }, [username])

  async function getProfile(username) {
    try {
      setLoading(true)

      // We can fetch a user by id or by username since every username
      // is supposed to be unique.

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`id, username, full_name, website, biography, avatar_url`)
        .eq('username', username)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        //setUsername(data.username)
        setId(data.id)
        setFullName(data.full_name)
        setWebsite(data.website)
        setBiography(data.biography)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
    <div style={{ height: '16rem', borderRadius: '0.5em', backgroundColor: 'rgb(185 175 249)'}}></div>
    <div style={{ position: 'relative', top: '-60px', left: '25px', alignItems: 'flex-end', justifyContent: 'space-between' }} className='flex'>
      <div className={'flex'} style={{ alignItems: 'end' }}>
        <Avatar
      url={avatar_url}
      size={120}
    />
    <h2 style={{ marginLeft: '7px' }}>{full_name || username || ''}</h2>
    </div>
    
      <div style={{ position: 'relative', right: '25px'}}>
      <div>
      { user.id == id ? (
        <p>Recomendado por <Link href="/malikpiara"><span style={{ fontWeight: '600' }}>Malik</span></Link> e outros</p>
      ) : (
        <button className='secondary'>Recomendar</button>
      ) }
      </div>
      
    </div>
    </div>

    <div>
        <div style={{ fontWeight: '700', fontSize: '1.1rem'}}>Perfil</div>
        <div style={{ backgroundColor: '#eaeaea', display: 'block', height: '1px', width: '100%', margin: '16px 0px' }} />
    </div>
      
      <div>
        <h2>Sobre</h2>
        <div style={{ whiteSpace: 'pre-line' }}>
        {biography || ''}
        </div>
      </div>

    <br/>

      <a href="/">
        <span className="fixed bottom-10 right-10 rounded-full border bg-black border-gray-800 hover:border-white w-12 h-12 flex justify-center items-center transition-all">
            <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" width="24" height="24" stroke="#A39797" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" shapeRendering="geometricPrecision"><path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
        </span>
    </a>
    </>
  )
}