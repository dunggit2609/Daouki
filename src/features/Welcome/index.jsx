import React from 'react';
import { _LIST_LINK } from 'constant/config';
import './styles.scss'
Welcome.propTypes = {

};

function Welcome(props) {

    return (
        <div className='welcome-container'>
            <section className="welcome__info">
                <div className="welcome__desc">
                    Welcome to DAOUKIWOOM
                </div>
               
            </section>
           
        </div>
    );
}

export default Welcome;