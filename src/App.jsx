import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductViewer from './components/ProductViewer';
import gsap from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all';
import Showcase from './components/Showcase';
import Performance from './components/Performance';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
    return (
        <main>
            <Navbar />
            <Hero />
            <ProductViewer />
            <Showcase />
            <Performance />
        </main>
    );
};

export default App;