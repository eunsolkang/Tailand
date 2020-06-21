import react, {useCallback, useEffect, useState} from 'react';
import  {getUserList, removeUser} from '../../lib/api'

export default function useUser(){

    const [userList, setUserList] = useState();
    const [remove, setRemove] = useState(false);
    const [update, setUpdate] = useState(false);

    const [input, setInput] = useState({
        name : '',
        phoneNumber : '',
        position : '',
        i : 0
    })
    const handleUserList = async() =>{
        try{
            const value = await getUserList();
            console.log(value);
            
            setUserList(value.data);
            
            
            
        }catch(e){
            console.log(e);
        }
    }
    const handleRemove = async(id) =>{
        try{
            const isRemove = await removeUser(id);
            console.log(isRemove);
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
            handleUserList();
        }, []
    )
    useEffect(
        ()=>{
            handleUserList();
            setRemove(false);
            setUpdate(false);
        },[remove, update]
    )
    return {
        userList, handleRemove, onChange, input
    }
}