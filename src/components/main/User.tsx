import React, { useState } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette'
import useUser from '../../hooks/user/useUser'
import { List, Button, Pagination, Input, Loader, Dimmer } from 'semantic-ui-react'
import useInput from '../../hooks/common/useInput';
import { useRouter } from '../../hooks/common/useRouter';
import Responsive from '../common/Responsive';
const UserBlock = styled(Responsive)`
    padding : 2rem;
    .page-bar{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .top{
        display : flex;
        justify-content : space-between;
    }
`;

const User = () => {
    const {userList, handleRemove, onChange, input} = useUser();
    const router = useRouter();
    const [activePage, setActivePage] = useState(router.query.page ? router.query.page : 1 );

    const search = useInput("search")
    if (!userList){
        return (
            <UserBlock>
                <Dimmer active inverted>
                    <Loader size='massive'>Loading</Loader>
                </Dimmer>
            </UserBlock>
        )
    }
    console.log(userList);

    const onRemove = (id) =>{
        const accept = window.confirm("정말 삭제하시겠습니까?");
        if(!accept){
            return;
        }
        handleRemove(id)
    }
    const onChangePage = (e : any, { activePage } : any)=>{
        setActivePage(activePage)
        router.history.push(`?page=${activePage}`)
    }

    
    const filterUser = userList?.filter(user => user?.username?.indexOf(search.value.trim()) !== -1);
    const users = filterUser?.map((user, i)=>{
        const {username, profile } = user;
        
        if(((activePage - 1) * 13 <= i && i<= ((activePage - 1) * 13) + 13)){
            return(
                <List.Item key={i}>
                    <List.Content>
                        {/* <img src={`${process.env.REACT_APP_SERVER_URL}/${profile}`}/> */}
                    </List.Content>
                    {username}
                    <List.Content floated='right'>
                        <Button onClick={()=>onRemove(user[0])}>삭제</Button>
                    </List.Content>
                </List.Item>
            )
        }
        
    })
    
    return (
        <UserBlock>
            <p className="top">총 회원수 : {users.length}명 </p>
            <Input icon='search' fluid placeholder='Search...' {...search}/>
            <List divided verticalAlign='middle'>
               {users} 
            </List>
            <div className="page-bar">
                <Pagination
                    totalPages={Math.floor(users?.length / 13) }
                    activePage={activePage}
                    onPageChange={onChangePage}
                />
            </div>
           
        </UserBlock>
    )
}

export default User;