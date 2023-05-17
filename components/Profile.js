import { useState, useEffect } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import Avatar from './Avatar';
import Link from 'next/link';
import { getOnlineProfiles } from '../utils/getOnlineProfiles'

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
  const [github, setGitHub] = useState(null)
  const [dribble, setDribble] = useState(null)
  const [twitter, setTwitter] = useState(null)
  const [instagram, setInstagram] = useState(null)
  const [linkedin, setLinkedin] = useState(null)


  useEffect(() => {
    if (username) {
        getProfile(username);
      }
    getSocialLinks(supabase, id).then(r => {
      //fill each link to an variable
      setGitHub(r?.github)
      setDribble(r?.dribbble)
      setInstagram(r?.instagram)
      setLinkedin(r?.linkedin)
      setTwitter(r?.twitter)
    })
  }, [username, github, dribble, linkedin, twitter, instagram])

  async function getSocialLinks(supabase, id) { 
    //fetch the promise that returns the social links from getOnlineProfiles
    return await getOnlineProfiles(supabase,id)
  }

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
    <div style={{marginLeft:'7px', marginTop:'7px'}}>
      <div>
        <h2 style={{margin:'10px 0 0 0'}}>{full_name || username || ''}</h2>
      </div>
      <div>
        <a href={linkedin}><img src="linkedin.svg" alt="linkedin" style={{height:'20px',width:'20px', marginRight:'7px'}}/></a>
        <a href={github}><img src="github.svg" alt="github" style={{height:'20px',width:'20px', marginRight:'7px'}}/></a>
        <a href={dribble}><img src="dribble.svg" alt="dribble" style={{height:'20px',width:'20px', marginRight:'7px'}}/></a>
        <a href={instagram}><img src="instagram.svg" alt="instagram" style={{height:'20px',width:'20px', marginRight:'7px'}}/></a>
        <a href={twitter}><img src="twitter.svg" alt="twitter" style={{height:'20px',width:'20px'}}/></a>
      </div>
    </div>
    
    
    </div>
    
      <div style={{ position: 'relative', right: '25px'}}>
        { website ? (
          <div>
            { website.startsWith("https") ? (
              <Link href={`${website}`} target="_blank"><button className='secondary'style={{ fontFamily: 'inherit', fontWeight: '400', marginBottom: '-5px'}}>Website</button></Link>
            ) : (
              <Link href={`https://${website}`} target="_blank"><button className='secondary'style={{ fontFamily: 'inherit', fontWeight: '400', marginBottom: '-5px'}}>Website</button></Link>
            )}
        </div>
        ) : null }
      
      
    </div>
    </div>

    {/* <div>
        <div style={{ fontWeight: '700', fontSize: '1.1rem'}}>Perfil</div>
        <div style={{ backgroundColor: '#eaeaea', display: 'block', height: '1px', width: '100%', margin: '16px 0px' }} />
    </div> */}
      
      <div>
        <h2>Sobre</h2>
        <div style={{ whiteSpace: 'pre-line' }}>
        {biography || ''}
        </div>
      </div>

    <br/>

      {/* <a href="/">
        <span className="fixed bottom-10 right-10 rounded-full border bg-black border-gray-800 hover:border-white w-12 h-12 flex justify-center items-center transition-all">
            <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" width="24" height="24" stroke="#A39797" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" shapeRendering="geometricPrecision"><path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
        </span>
    </a> */}
    </>
  )
}