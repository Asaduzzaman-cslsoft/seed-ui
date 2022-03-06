import React from 'react';
import IntlMessages from 'util/IntlMessages';

const Home = () => (
    <h1 className="home-container zoomIn animation-delay-0 animated">
        <IntlMessages id="pages.homePage" />
        {/* Home page loaded here */}
    </h1>
);

export default Home;
