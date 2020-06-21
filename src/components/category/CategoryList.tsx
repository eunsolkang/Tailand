import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette'
import { Table, Input, Button } from 'semantic-ui-react';
import {Category} from '../../types/CategoryType';
import {Link} from 'react-router-dom';
const CategoryListBlock = styled.div`
`;

type CategoryListType = {
    categories : [Category],
    handleCreateCategory : (name : string, content : string)=>Promise<void>,
    input : any,
    onChange :  (e : any)=>any,
    division : "치앙마이" | "방콕",
    handleDeleteCategory : (id : number) => Promise<void>


}
const CategoryList = ({categories, handleCreateCategory, input, onChange, division, handleDeleteCategory} : CategoryListType) => {
    const categoryList = categories.filter(c => c.division === division ).map(category => {
        const {name, id, content} = category;
        return (
            <Table.Row key={id}>
                <Table.Cell><Link to={`category/${id}`}>{name}</Link></Table.Cell>
                <Table.Cell>{content}</Table.Cell>
                <Table.Cell><Button color="red" onClick={()=>handleDeleteCategory(category.id)}>삭제</Button></Table.Cell>
            </Table.Row>
        )
    });
    return (
        <CategoryListBlock>
            <Table celled selectable>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>카테고리 이름</Table.HeaderCell>
                    <Table.HeaderCell>삭제</Table.HeaderCell>
                </Table.Row>
                </Table.Header>

                <Table.Body >
                    {categoryList}
                </Table.Body>
                <Table.Footer>
                <Table.Row>
                        <Table.HeaderCell><Input placeholder="카테고리 이름 입력..." onChange={onChange} name="name"></Input></Table.HeaderCell> 
                        <Table.HeaderCell><Input placeholder="카테고리 설명 입력..." onChange={onChange} name="content"></Input></Table.HeaderCell> 
                        <Table.HeaderCell><Button primary onClick={()=>handleCreateCategory(input.name, input.content)}>추가하기</Button></Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </CategoryListBlock>
    )
}

export default CategoryList;