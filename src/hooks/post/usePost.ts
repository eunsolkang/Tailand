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

    })
    const handleCreatePost = async(title, content, subCategory, img) => {
        try{
            const post = new FormData();
            post.append('title', title);
            post.append('content', content);
            post.append('categoryId', subCategory);
            post.append('userId', "1");
            for(let i=0; i<img.length; i++) {post.append('img', img[i])}

            for (var key of post.keys()) {

                console.log(key);
              
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
            const data = await getPost({id});
            setInput({
                ...data.data,
                subCategory : data.data.categoryid,
                category : data.data.category.parents.id
            });
        }catch(e){
            console.log(e);
        }
    }
    const handleRemove = async(id) =>{
        try{
            const isRemove = window.confirm('정말로 이 글을 삭제하시겠습니까?');
            if (isRemove){
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
    const onChangeDrop = (e, {name, value} : any)  => {
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
                setIsUpdate(false)
            }
        }, []
    )
    useEffect(
        ()=>{
            if ( router.match.params.id ){
                
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