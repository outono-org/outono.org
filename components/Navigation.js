import UserCards from '../components/UserCards';
import Image from 'next/image';
import styles from './Navigation.module.css';

export default function Navigation() {
    return (
    <header role='banner' className={styles.navigation}>
            <div className='navHeader'>
              <Image className='logo' src="/logo.jpg" width="48" height="48" quality="100" alt='Logo of Outono'/>
           
              <h2 style={{ position: 'relative', left: '20px', top: '20px'}}>Directório</h2>
              <p style={{position: 'relative', left: '20px', lineHeight:' 1.4', color: 'gray', marginRight: '20px'}}>Somos programadores e designers cometidos a aprender e a partilhar conhecimento.</p>
            </div>
            <UserCards/>
          </header>
    )};