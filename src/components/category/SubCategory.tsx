import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette'
import useSubCategory from '../../hooks/category/useSubCategory';
import { Table, Button, Input, Checkbox, Image } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import Responsive from '../common/Responsive';
const SubCategoryBlock = styled(Responsive)`
    margin-top : 2rem;
`;

const SubCategory = () => {
    const {subCategories, handleDeleteSubCategory, handleCreateSubCategory, input, onChange, onChangeDrop} = useSubCategory();
    
    console.log(input);
    
    const categoryList = subCategories?.map(category => {
        const {title, id, isOnlyAdmin, icon} = category;
        return (
            <Table.Row key={id}>
                <Table.Cell>{title}</Table.Cell>
                <Table.Cell>{isOnlyAdmin ? "어드민" : "일반"}</Table.Cell>
                <Table.Cell><Image size="mini" src={`${process.env.REACT_APP_SERVER_URL}/${icon}`}></Image></Table.Cell>
                <Table.Cell><Button color="red" onClick={()=>handleDeleteSubCategory(category.id)}>삭제</Button></Table.Cell>
            </Table.Row>
        )
    });
    
    return (
        <SubCategoryBlock>
             <h3>서브 카테고리 관리</h3>
             <Table celled selectable>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell width="2">카테고리 이름</Table.HeaderCell>
                    <Table.HeaderCell width="1">어드민</Table.HeaderCell>
                    <Table.HeaderCell width="1">아이콘</Table.HeaderCell>
                    <Table.HeaderCell width="1">삭제</Table.HeaderCell>
                </Table.Row>
                </Table.Header>

                <Table.Body >
                    {categoryList}
                </Table.Body>
                <Table.Footer>
                <Table.Row>
                        <Table.HeaderCell><Input placeholder="카테고리 이름 입력..." onChange={onChange} name="name"></Input></Table.HeaderCell> 
                        <Table.HeaderCell><Checkbox onChange={onChangeDrop} name="isOnlyAdmin"></Checkbox></Table.HeaderCell>
                        <Table.HeaderCell><Input type="file"  name="icon"  onChange={onChange}></Input></Table.HeaderCell>
                        <Table.HeaderCell><Button primary onClick={()=>handleCreateSubCategory(input.name, input.icon, input.isOnlyAdmin)}>추가하기</Button></Table.HeaderCell>
                        
                    </Table.Row>
                </Table.Footer>
            </Table>
        </SubCategoryBlock>
    )
}

export default SubCategory;