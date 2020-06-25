import react, {useCallback, useEffect, useState} from 'react';
import  {getPost, removePost, createPost, updatePost} from '../../lib/api'
import * as Type from '../../types/postType';
import { useRouter } from '../common/useRouter';
export default function usePost(){

    const [post, setPost] = useState<Type.Post>();
    const router = useRouter();
    const [remove, setRemove] = useState(false);
    const [update, setUpdate] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    
    const [input, setInput] = useState({
        local : '',
        title : '',
        content : '',
        category : '',
        subCategory : '',
        img : '',
        advert : false,
        advertPosition : '',
        isSpecial : false,
        images : [],
        id : '',
    })
    const handleCreatePost = async(title, content, subCategory, img, advert, isSpecial, advertPosition, local) => {
        try{
            const post = new FormData();
            post.append('title', title);
            post.append('content', content);
            post.append('categoryId', subCategory);
            post.append('userId', "1");
            if (isSpecial){
                post.append('isSpecial', local);
            }

            if ( advert ){
                post.append('isAdvertising', advertPosition);
            }   

            for(let i=0; i<img.length; i++) {post.append('img', img[i])}

            for (var value of post.values() ) {

                console.log(value);
              
            }
            console.log(title, content, subCategory, img);


            
            const isSuccess = await createPost({post});
            console.log(isSuccess);
            router.history.push('/post/')
            
        }catch(e){
            console.log(e);
        }
    }
    const handleGetPost = async({id}) =>{
        try{
            console.log(id);
            
            
            const data = await getPost({id});
            
            
            if ( data.data.isAdvertising === "none" )
            {
                setInput({
                    ...data.data,
                    subCategory : data.data.category.id,
                    category : data.data.category.parents.id
                })
            }
            else{
                console.log('광고');
                
                setInput({
                    ...data.data,
                    category : null,
                    subCategory : null,
                    advert : data.data.isAdvertising !== "none",
                    advertPosition : (data.data.isAdvertising !== "none") && data.data.isAdvertising, 
                });
            }
        }catch(e){
            console.log(e);
        }
    }
    const handleRemove = async(id) =>{
        try{
            const isRemove = window.confirm('정말로 이 글을 삭제하시겠습니까?');
            if (isRemove){
                console.log(id);
                
                await removePost({id});
                router.history.push('/post/')
            }
            setRemove(true)
        }catch(e){
            console.log(e);
        }
    }
    const handleUpdate = async(title, content, subCategory, img) =>{
        try{
            const isRemove = window.confirm('글을 수정하시겠습니까?');
            if (isRemove){
                // const post = new FormData();
                // post.append('title', title);
                // post.append('content', content);
                // if ( subCategory ){
                //     post.append('categoryId', subCategory);
                // }
                // post.append('userId', "1");
                // if (img){
                //     for(let i=0; i<img.length; i++) {post.append('img', img[i])}
                // }
                const post = {
                    title,
                    content,
                }

                await updatePost({id : router.match.params.id, post});
                router.history.push('/post/')
            }
            setRemove(true)
        }catch(e){
            console.log(e);
        }
    }
    const onChange = (e) =>{
        const { name, value, type, files } = e.target;
        if( type === 'file' ){
            setInput({
                ...input,
                [name] : files
            })
            return;
        }
        setInput({
            ...input,
            [name] : value
        })
    }
    const onChangeDrop = (e, {name, value, checked, type} : any)  => {
        console.log(type);
        
        if ( type === 'checkbox'){
            setInput({
                ...input,
                [name] : checked
            })
            return;
        }
        setInput({
            ...input,
            [name] : value
        })
    }
    useEffect(
        ()=>{
            if ( router.match.params.id ){
                console.log(router.match.params.id);
                
                handleGetPost({id : router.match.params.id });
                setIsUpdate(true);
            }
            else{
                console.log('????');
                setIsUpdate(false)
            }
        }, []
    )
    useEffect(
        ()=>{
            if ( router.match.params.id ){
                console.log(router.match.params.id);
                
                
                handleGetPost({id : router.match.params.id });
                setIsUpdate(true)
            }
            else{
                setIsUpdate(false)
            }
            setRemove(false);
            setUpdate(false);
        },[remove, update]
    )
    return {
        post, handleRemove, onChange, input, isUpdate, onChangeDrop, handleCreatePost, handleUpdate
    }
}