import React, { useState } from 'react';
import './video.css'
const ButtonWithIframe = () => {
    const [showIframe, setShowIframe] = useState(false);

    const handleButtonClick = () => {
        setShowIframe(true);
    };

    return (
        <div>
            <button onClick={handleButtonClick}>Open Iframe</button>
            {showIframe && (
                <div className="iframe-overlay">
                                    <iframe width="1000" height="700" src="//ok.ru/videoembed/6491287521867" style={{ marginLeft: "17rem", border: "2px solid black" }} frameborder="0" allow="autoplay" allowfullscreen="true"></iframe>

                </div>
            )}
        </div>
    );
};

export default ButtonWithIframe;
