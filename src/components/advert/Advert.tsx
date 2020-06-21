import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette'
import Responsive from '../common/Responsive';
import useAdvert from '../../hooks/advert/useAdvert';
const AdvertBlock = styled(Responsive)`
    margin-top : 1rem;
`;

const Advert = () => {
    const {adverts} = useAdvert();
    console.log(adverts);
    
    return (
        <AdvertBlock>
            광고관리 페이지
        </AdvertBlock>
    )
}

export default Advert;