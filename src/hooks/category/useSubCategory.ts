import react, {useState, useEffect} from 'react';
import {createSubCategory, getSubCategoryList, deleteSubCategory } from '../../lib/api'
import moment from 'moment';
import {SubCategory} from '../../types/CategoryType';
import { useRouter } from '../common/useRouter';

export default function useSubCategory() {    
    const [input, setInput] = useState({
        name : '',
        icon : '',
        isOnlyAdmin : false
    });
    const [subCategories, setSubCategories] = useState<[SubCategory]>();
    const [update, setUpdate] = useState(false);
    const router = useRouter();
    


    const onChange = (e) => {
        const {name, value, type, files} = e.target;
    
        if ( type === 'file'){
            setInput({
                ...input,
                [name] : files[0]
            });
            return;
        }
        setInput({
            ...input,
            [name] : value
        });
        
    }
    const onChangeDrop = (e, {name, checked} : any)  =>{
        setInput({
            ...input,
            [name] : checked
        })
    }
    const handleCreateSubCategory = async(title, icon, isOnlyAdmin) => {
        try{
            const category = new FormData();
            category.append('icon', icon);
            category.append('title', title);
            category.append('parents', router.match.params.id);
            category.append('isOnlyAdmin', isOnlyAdmin);
            
            const isSuccess = await createSubCategory({category});
            console.log(isSuccess);
            
            setUpdate(true)
        }catch(e){
            console.log(e);
        }
    }
    const handleDeleteSubCategory = async(id) => {
        try{
            const isDelete = window.confirm('정말로 카테고리를 삭제하시겠습니까?');
            if ( isDelete ){
                await deleteSubCategory({id});
                setUpdate(true)
            }
        }catch(e){
            console.log(e);
        }
    }
    const handleSubCategoryList = async({parents}) => {
        try{
            console.log(parents);
            
            const data = await getSubCategoryList({parents});
            console.log(data);
            
            setSubCategories(data.data);
        }catch(e){
            console.log(e);
        }
    }
    useEffect(()=>{
        
        if ( router.match.params.id && router.pathname.split('/')[1] !== 'post') {
            handleSubCategoryList({parents : router.match.params.id});
        } 
        setUpdate(false);
    },[update])


    return {
        onChange, handleCreateSubCategory, input, subCategories, handleDeleteSubCategory, onChangeDrop, handleSubCategoryList
    }
}