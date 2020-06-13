import react, {useCallback, useEffect, useState} from 'react';
import  {getPostList, removeUser} from '../../lib/api'
import * as Type from '../../types/postType';
export default function usePost(){

    const [postList, setPostList] = useState<[Type.Post]>();
    const [remove, setRemove] = useState(false);
    const [update, setUpdate] = useState(false);

    const [input, setInput] = useState({
        
    })
    const handlePostList = async() =>{
        try{
            const value = await getPostList();
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

    useEffect(
        ()=>{
            handlePostList();
        }, []
    )
    useEffect(
        ()=>{
            handlePostList();
            setRemove(false);
            setUpdate(false);
        },[remove, update]
    )
    return {
        postList, handleRemove, onChange, input
    }
}