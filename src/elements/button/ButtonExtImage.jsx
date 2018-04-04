import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/css/button.css';

const ButtonExtImage = ({ imageSrc }) => (
    <div className='button2'><img src={imageSrc} alt='aperture' />button With External
        Image</div>
);


ButtonExtImage.propTypes = {
    imageSrc: PropTypes.string.isRequired

};

export default ButtonExtImage;
