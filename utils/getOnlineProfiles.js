export async function getOnlineProfiles(supabase, userId) {
  try {
    let { data, error, status } = await supabase
      .from('user_online_profiles')
      .select(`platform, url`)
      .eq('profile_id', userId)

    if (error && status !== 406) {
      throw error
    }

    if (data) {
      const onlineProfiles = {
        github: '',
        dribbble: '',
        twitter: '',
        instagram: '',
        linkedin: ''
      };

      data.forEach(item => {
        switch(item.platform) {
          case 'github':
            onlineProfiles.github = item.url;
            break;
          case 'dribbble':
            onlineProfiles.dribbble = item.url;
            break;
          case 'twitter':
            onlineProfiles.twitter = item.url;
            break;
          case 'instagram':
            onlineProfiles.instagram = item.url;
            break;
          case 'linkedin':
            onlineProfiles.linkedin = item.url;
            break;
        }
      })
      return onlineProfiles;
    }
    
  } catch (error) {
    console.log('Error loading social media data!')
    console.log(error)
  }
}
