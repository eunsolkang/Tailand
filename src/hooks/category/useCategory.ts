import react, {useState, useEffect} from 'react';
import {createCategory, getCategoryList, deleteCategory } from '../../lib/api'
import moment from 'moment';
import {Category} from '../../types/CategoryType';
import { useRouter } from '../common/useRouter';

export default function useCategory() {    
    const [input, setInput] = useState({
        name : '',
        content : ''
    });
    const [categories, setCategories] = useState<[Category]>();
    const [update, setUpdate] = useState(false);
    const [active, setActive] = useState<number>(0);
    const router = useRouter();

    
    useEffect(() => {
        
    }, []);

    const onChange = (e) => {
        const {name, value} = e.target;
        console.log(name, value);
        
        setInput({
            ...input,
            [name] : value
        })
    }
    const handleCreateCategory = async(name, content) => {
        try{
            console.log(router.query.active );
            
            const category = {
                division : router.query.active === "0" ? "방콕" : "치앙마이",
                name : name,
                content : content
            }
            await createCategory({
                category
            })
            setUpdate(true)
        }catch(e){
            console.log(e);
        }
    }
    const handleDeleteCategory = async(id) => {
        try{
            const isDelete = window.confirm('정말로 카테고리를 삭제하시겠습니까?');
            if ( isDelete ){
                await deleteCategory({id});
                setUpdate(true)
            }
        }catch(e){
            console.log(e);
        }
    }
    const handleCategoryList = async() => {
        try{
            const data = await getCategoryList();
            setCategories(data.data);
        }catch(e){
            console.log(e);
        }
    }
    

    const handleTabChange = (e, { activeIndex } : any) : void => {
        setActive(activeIndex);
        console.log('?');
        router.history.push(`?active=${activeIndex}`)
    }
    useEffect(()=>{
        handleCategoryList();
        setUpdate(false);
        
        if(router.pathname.split('/')[1] !== 'post'){
            router.history.push(`?active=${active}`)
        }
        
    },[update])


    return {
        onChange, handleCreateCategory, input, handleCategoryList, categories, handleDeleteCategory,
        handleTabChange, active
    }
}