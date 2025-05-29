import React from 'react';
import Link from 'next/link';
import styles from './Sidebar.module.css'; // Create a CSS module for styling

const Sidebar = () => {
    return (
        <div className={styles.sidebar}>
            <h2 className={styles.title}>Shoply</h2>
            <nav>
                <ul className={styles.navList}>
                    <li>
                        <Link href="/home">
                            <a className={styles.navLink}>Home</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/products">
                            <a className={styles.navLink}>Products</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/about">
                            <a className={styles.navLink}>About</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact">
                            <a className={styles.navLink}>Contact</a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;