import React from 'react';
import Link from 'next/link';

const NavBar = () => {
    return (
        <nav style={styles.nav}>
            <div style={styles.logo}>Shoply</div>
            <ul style={styles.navLinks}>
                <li style={styles.navItem}>
                    <Link href="/">Home</Link>
                </li>
                <li style={styles.navItem}>
                    <Link href="/about">About</Link>
                </li>
                <li style={styles.navItem}>
                    <Link href="/shop">Shop</Link>
                </li>
                <li style={styles.navItem}>
                    <Link href="/contact">Contact</Link>
                </li>
            </ul>
        </nav>
    );
};

const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#333',
        color: '#fff',
    },
    logo: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
    },
    navLinks: {
        listStyle: 'none',
        display: 'flex',
        margin: 0,
        padding: 0,
    },
    navItem: {
        marginLeft: '20px',
    },
};

export default NavBar;