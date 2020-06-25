import react, {useCallback, useEffect, useState} from 'react';
import  {getPostList, removeUser} from '../../lib/api'
import * as Type from '../../types/postType';
export default function usePost(){

    const [postList, setPostList] = useState<Type.PostList>();
    const [remove, setRemove] = useState(false);
    const [update, setUpdate] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const [input, setInput] = useState({
        
    })
    const handlePostList = async({activePage}) =>{
        try{
            const value = await getPostList({page : activePage});
            console.log(value.data);
            
            setPostList(value.data);
        }catch(e){
            console.log(e);
        }
    }
    const handleRemove = async(id) =>{
        try{
            // const isRemove = await removePost(id);
           
            setRemove(true)
            
        }catch(e){
            console.log();
        }
    }


    const onChange = (e) =>{
        const { name, value } = e.target;
        setInput({
            ...input,
            [name] : value
        })
    }
    const handlePaginationChange = (e, {activePage} : any) => {
        setActivePage(activePage)
    }
    useEffect(
        ()=>{
            console.log(activePage);
            
            handlePostList({activePage : activePage - 1});
        }, [activePage]
    )
    useEffect(
        ()=>{
            handlePostList({activePage});
            setRemove(false);
            setUpdate(false);
        },[remove, update]
    )
    return {
        postList, handleRemove, onChange, input, handlePaginationChange, activePage
    }
}