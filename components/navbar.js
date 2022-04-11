import styles from '../styles/Home.module.css';
import Link from 'next/link'
import { useContext } from 'react';
import { Context } from '../context/Context';


const Navbar = () => {
const{setQuery}=useContext(Context);
    return (

      <div className={styles.navbar}>
          <div className={styles.navbarContainer}>
              <div className={styles.links}>
                  <Link href={'/characters/characters'}><a href="#">Characters</a></Link>
                  <Link href={'/comics/comics'}><a href="#">Comics</a></Link>
              </div>
              <div className="right">
                  {/* <div className={styles.searchContainer}>
                      <input type="text" placeholder='search a character' onChange={e=>setQuery(e.target.value)} />
                  </div> */}
              </div>
          </div>
      </div>
      );
}
 
export default Navbar;

