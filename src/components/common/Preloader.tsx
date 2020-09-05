import React from 'react';
import loading from '../../assets/images/loading.gif'

const Preloader = () => {
    return <div>
        <img src={loading} style={{width:'20px'}} alt="preloader" />
    </div>
}

export default Preloader;