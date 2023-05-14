import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import AvatarUpload from './AvatarUpload'
import { getOnlineProfiles } from '../utils/getOnlineProfiles'

export default function Account({ session }) {
  const supabase = useSupabaseClient()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [biography, setBiography] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const [github, setGitHub] = useState(null)
  const [dribbble, setDribbble] = useState(null)
  const [twitter, setTwitter] = useState(null)
  const [instagram, setInstagram] = useState(null)
  const [linkedin, setLinkedin] = useState(null)

  useEffect(() => {
    getProfile()
    const fetchOnlineProfiles = async () => {
      const onlineProfiles = await getOnlineProfiles(supabase, user.id);
      setGitHub(onlineProfiles.github);
      setDribbble(onlineProfiles.dribbble);
      setTwitter(onlineProfiles.twitter);
      setInstagram(onlineProfiles.instagram);
      setLinkedin(onlineProfiles.linkedin);
    }
    fetchOnlineProfiles();
  }, [session])


  async function getProfile() {
    if (!user) return; // ensures that the getProfile function does not execute if the user object is null.
    try {
      setLoading(true)

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, biography, avatar_url`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
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

  async function updateProfile({ username, website, biography, avatar_url, online_profiles }) {
    try {
      setLoading(true)

      const updates = {
        id: user.id,
        username,
        website,
        biography,
        avatar_url,
        updated_at: new Date().toISOString(),
      }

      let { error } = await supabase.from('profiles').upsert(updates)
      if (error) throw error

      for(let item of online_profiles) {
        if (item.url) {
          const socialLinksUpdates = {
            profile_id: user.id,
            platform: item.platform,
            url: item.url
          }
    
          let { error } = await supabase.from('user_online_profiles').upsert(socialLinksUpdates)
          
          if (error) throw error
        }
      }

      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-widget">
        <AvatarUpload
      uid={user.id}
      url={avatar_url}
      size={120}
      onUpload={(url) => {
        setAvatarUrl(url)
        updateProfile({ username, website, avatar_url: url })
      }}
    />
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          placeholder='This will affect the url of your profile.'
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      
      <div>
        <label htmlFor="biography">Biografia</label>
        <textarea
          id="biography"
          placeholder='O que é que fazes profissionalmente? Quais são alguns projetos dos quais te orgulhas? O que é que gostas de criar no teu tempo livre? Por favor utiliza a primeira pessoa.'
          value={biography || ''}
          onChange={(e) => setBiography(e.target.value)}
        />
      </div>

      <h2>Na Web</h2>
      <div>
        <label htmlFor="website">Website Pessoal</label>
        <input
          id="website"
          type="website"
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="website">GitHub</label>
        <input
          id="github"
          type="github"
          value={github || ''}
          onChange={(e) => setGitHub(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="website">Dribbble</label>
        <input
          id="dribbble"
          type="website"
          value={dribbble || ''}
          onChange={(e) => setDribbble(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="website">Twitter</label>
        <input
          id="twitter"
          type="website"
          value={twitter || ''}
          onChange={(e) => setTwitter(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="website">Instagram</label>
        <input
          id="instagram"
          type="website"
          value={instagram || ''}
          onChange={(e) => setInstagram(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="website">LinkedIn</label>
        <input
          id="linkedin"
          type="website"
          value={linkedin || ''}
          onChange={(e) => setLinkedin(e.target.value)}
        />
      </div>

      <div>
        <button
          className="button primary block"
          onClick={() => updateProfile({ 
            username,
            website,
            biography,
            avatar_url,
            online_profiles: [
              {platform: 'github', url: github},
              {platform: 'dribbble', url: dribbble},
              {platform: 'twitter', url: twitter},
              {platform: 'instagram', url: instagram},
              {platform: 'linkedin', url: linkedin},
            ]
          })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <button className="button block" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </div>
    </div>
  )
}