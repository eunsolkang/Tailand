import React, { useState } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette'
import { Table, Dimmer, Loader, Button, Input, Tab } from 'semantic-ui-react';
import useCategory from '../../hooks/category/useCategory';
import Responsive from '../common/Responsive';
import CategoryList from './CategoryList'

const CategoryBlock = styled(Responsive)`
    margin-top : 1.5rem;
`;

const Category = () => {
    const {onChange, handleCreateCategory, input, categories, handleDeleteCategory, handleTabChange, active} = useCategory();


    

    console.log(categories);
    if (!categories){
        return(
            <Dimmer active inverted>
                <Loader size='massive'>데이터를 불러오는 중...</Loader>
            </Dimmer>
        )
    }
    
    const panes = [
        { menuItem: '방콕', render: () => <Tab.Pane>
            <CategoryList 
                categories={categories} 
                handleCreateCategory={handleCreateCategory}
                handleDeleteCategory={handleDeleteCategory}
                input={input}
                onChange={onChange}
                division="방콕"
                
            />
        </Tab.Pane> },
        { menuItem: '치앙마이', render: () => <Tab.Pane>
            <CategoryList 
                categories={categories} 
                handleCreateCategory={handleCreateCategory}
                handleDeleteCategory={handleDeleteCategory}
                input={input}
                onChange={onChange}
                division="치앙마이"
            />
        </Tab.Pane> },
    ]
    
    
    return (
        <CategoryBlock>
            <h3>메인 카테고리 관리</h3>
            <Tab 
                panes={panes}
                 activeIndex={active}
                 onTabChange={handleTabChange}
             />
            
    </CategoryBlock>
    )
}

export default Category;