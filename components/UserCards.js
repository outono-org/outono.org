import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import Avatar from './Avatar'

export default function UserCards() {
    const supabase = useSupabaseClient()
    const [users, setUsers] = useState(null)

    function userCardClick(username) {
        console.log(username)
        window.location.href = `/${username}`
    }

    useEffect(() => {
        getUsers()
      }, [])

    async function getUsers() {
        const { data, error } = await supabase
      .from('profiles')
      .select()
    
      if (data) {
        setUsers(data)
      }
      }

    return (
        <>
        {users && users.map(({ full_name, username, avatar_url }) => {
            return (
                <div className='userCard flex column' key={username} onClick={()=> userCardClick(username)}>
                    <div style={{ fontWeight: '600' }}>
                    {full_name}
                    </div>
                    <div style={{ color: 'gray '}}>
                    {`@${username}`.toLowerCase()}
                    </div>
                </div>
            )
          })}
        </>
    )
}