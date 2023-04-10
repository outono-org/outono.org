import UserCards from '../components/UserCards';
import Image from 'next/image';
import styles from './Navigation.module.css';

export default function Navigation() {
    return (
    <header role='banner' className={styles.navigation}>
            <div className='navHeader'>
              <Image className='logo' src="/logo.jpg" width="48" height="48" quality="100" alt='Logo of Outono'/>
           
              <h2 style={{ position: 'relative', left: '20px', top: '20px'}}>Directório</h2>
              <p style={{position: 'relative', left: '20px', lineHeight:' 1.4', color: 'gray', marginRight: '20px'}}>Somos empreendedores, programadores e designers cometidos a partilhar conhecimento com uma nova geração.</p>
            </div>
            <UserCards/>
          </header>
    )};