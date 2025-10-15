import React from 'react';
import { footerLinks } from '../constants';

const Footer = () => {
    return (
        <footer>
            <div className='info'>
                <p>More ways to shop: <span>Find and Apple Store</span> or <span>other reailer</span> near you. Or call 000800 040 1966.</p>
                <img src="/logo.svg" alt="apple logo" />
            </div>
            <hr />

            <div className='links'>
                <p>Copyright 2024 Apple Inc. All rights reserved. <br /> This page is not intended to replace, substitute, or deceive anyone; it is created solely for the purpose of learning.</p>

                <ul>
                    {footerLinks.map(({ label, link }) => (
                        <li key={label}>
                            <a href={link}>{label}</a>
                        </li>

                    ))}
                </ul>
            </div>
        </footer>
    );
};

export default Footer;