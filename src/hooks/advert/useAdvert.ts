import react, {useState, useEffect} from 'react';
import { createAdvert, getAdvertList, deleteAdvert } from '../../lib/api'
import moment from 'moment';
import { useRouter } from '../common/useRouter';

export default function useAdvert() {    
    const [input, setInput] = useState({
        img : ''
    });
    const [adverts, setAdverts] = useState();
    const [update, setUpdate] = useState(false);
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
    const handleCreateAdvert = async(img) => {
        try{
            const advert = {
                img : img
            }
            await createAdvert({
                advert
            })
            setUpdate(true)
        }catch(e){
            console.log(e);
        }
    }
    const handleDeleteCategory = async(id) => {
        try{
            const isDelete = window.confirm('정말로 해당 광고를 삭제하시겠습니까?');
            if ( isDelete ){
                await deleteAdvert({id});
                setUpdate(true)
            }
        }catch(e){
            console.log(e);
        }
    }
    const handleAdvertList = async() => {
        try{
            const data = await getAdvertList();
            setAdverts(data.data);
        }catch(e){
            console.log(e);
        }
    }
    
    useEffect(()=>{
        handleAdvertList();
        setUpdate(false);
        
    },[update])


    return {
        onChange, input, handleCreateAdvert, handleDeleteCategory, adverts
    }
}