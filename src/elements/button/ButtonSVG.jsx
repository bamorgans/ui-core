import React from 'react';
import '../../assets/css/button.css';
import '../../assets/css/button-svg.css';

import aperture from '../../assets/images/aperture.svg';

const ButtonSVG = () => (
    <div>
        <div className='button-svg'><img src={aperture} alt='aperture' />SVG Button</div>
    </div>);
export default ButtonSVG;
