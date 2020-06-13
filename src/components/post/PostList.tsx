import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette'
import Responsive from '../common/Responsive';
import { Dimmer, Loader, Table, Button } from 'semantic-ui-react';
import usePostList from '../../hooks/post/usePostList';
import {Link} from 'react-router-dom';
const PostListBlock = styled(Responsive)`
    margin-top : 1rem;
    .post-btn{
        margin-top : .25rem;
        margin-bottom : .5rem;
    }
`;

const PostList = () => {

    const {postList} = usePostList();
    if (!postList){
        return (
            <PostListBlock>
                <Dimmer active inverted>
                    <Loader size='massive'>Loading</Loader>
                </Dimmer>
            </PostListBlock>
        )
    }
    const posts = postList.map((post, i)=>{
        const {title, author, category, id} = post
        return (
            <Table.Row key={i}>
                <Table.Cell>{author?.username}</Table.Cell>
                <Table.Cell><Link to={`/post/view/${id}`}>{title}</Link></Table.Cell>
                <Table.Cell>{category?.title}</Table.Cell>
            </Table.Row>
        )
    })

    console.log(postList);
    
    
    return (
        <PostListBlock>
            <Link to="post/view/"><Button primary floated="right" className="post-btn">글 작성</Button></Link>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={1}>글쓴이</Table.HeaderCell>
                        <Table.HeaderCell width={3}>제목</Table.HeaderCell>
                        <Table.HeaderCell width={2}>카테고리</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {posts}
                </Table.Body>
            </Table>

        </PostListBlock>
    )
}

export default PostList;