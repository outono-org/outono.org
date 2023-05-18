import { useState, useEffect } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import Image from 'next/image';
import { getOnlineProfiles } from '../utils/getOnlineProfiles'

export default function SocialIcons({ userId, website }) {
    const supabase = useSupabaseClient()
    const user = useUser()
    const [loading, setLoading] = useState(true)
    const [github, setGitHub] = useState(null)
    const [dribbble, setDribbble] = useState(null)
    const [twitter, setTwitter] = useState(null)
    const [instagram, setInstagram] = useState(null)
    const [linkedin, setLinkedin] = useState(null)
  
    useEffect(() => {
        if(userId){
            getOnlineProfiles(supabase, userId).then((result) => {
                setGitHub(result.github);
                setDribbble(result.dribbble);
                setTwitter(result.twitter);
                setInstagram(result.instagram);
                setLinkedin(result.linkedin);
            });
        }
    }, [userId])
  
    return (
        <div style={{ position: 'absolute', right: '25px'}}>
            <Link href={`${linkedin}`} target="_blank" aria-label="Linkedin Button">
                <Image className="social-button" src="linkedin.svg" alt="linkedin" width={20} height={20} style={{marginRight:'7px'}}/>
            </Link>
            <Link href={`${github}`} target="_blank" aria-label="Github Button">
                <Image className="social-button" src="github.svg" alt="github" width={20} height={20} style={{marginRight:'7px'}}/>
            </Link>
            <Link href={`${dribbble}`} target="_blank" aria-label="Dribbble Button">
                <Image className="social-button" src="dribble.svg" alt="dribble" width={20} height={20} style={{marginRight:'7px'}}/>
            </Link>
            <Link href={`${instagram}`} target="_blank" aria-label="Instagram Button">
                <Image className="social-button" src="instagram.svg" alt="instagram" width={20} height={20} style={{marginRight:'7px'}}/>
            </Link>
            <Link href={`${twitter}`} target="_blank" aria-label="Twitter Button">
                <Image className="social-button" src="twitter.svg" alt="twitter" width={20} height={20} style={{marginRight:'7px'}}/>
            </Link>
            { website.startsWith("https") ? (
              <Link href={`${website}`} target="_blank" aria-label="Personal Website Button">
                <Image className="social-button" src="website.svg" alt="website" width={20} height={20} style={{marginRight:'7px'}}/>
            </Link>
            ) : (
              <Link href={`https://${website}`} target="_blank" aria-label="Personal Website Button">
                <Image className="social-button" src="website.svg" alt="website" width={20} height={20} style={{marginRight:'7px'}}/>
            </Link>
            )}
        </div>
    )      
  }
