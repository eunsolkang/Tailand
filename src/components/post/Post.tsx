import React, { useEffect } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette'
import usePost from '../../hooks/post/usePost';
import Responsive from '../common/Responsive';
import { Form, Image } from 'semantic-ui-react';
import useCategory from '../../hooks/category/useCategory';
import useSubCategory from '../../hooks/category/useSubCategory';
const PostBlock = styled(Responsive)`
    margin-top : 1rem;
    .content{
        margin-top : 1rem;
    }
`;
const stateOptions = [
    {
        key : 'a',
        text : '방콕',
        value : '방콕'
    },
    {
        key : 'b',
        text : '치앙마이',
        value : '치앙마이'
    }
]
const Post = () => {
    const {post, isUpdate, handleRemove, onChangeDrop, input, onChange, handleCreatePost, handleUpdate} = usePost();
    
    
    const {categories} = useCategory();
    const {subCategories, handleSubCategoryList} = useSubCategory();


    console.log(input);
    const imgList = post?.images.map((img)=>{
        return (
            <Image src={`${process.env.REACT_APP_SERVER_URL}/${img}`} />
        )
    });

    const categoryList = categories?.filter(category=>category.division === input.local)?.map((category, i) => {
        const { name, id} = category
        return {
            key : id,
            text : name,
            value : id
        }
    });

    const subCategoryList = subCategories?.map(subCategory => {
        const {title, id} = subCategory
        return {
            key : id,
            text : title,
            value : id
        }
    })

    useEffect(() => {
        if(input.category){
            handleSubCategoryList({parents : input?.category})
        }
    }, [input.category]);


    return (
        <PostBlock>
            <Form>
                <Form.Input value={input?.title} label="제목" onChange={onChange} name="title"/>
                <Form.Dropdown placeholder='지역선택' selection options={stateOptions} label="지역" onChange={onChangeDrop} name="local"  />
                { input.local && <Form.Dropdown placeholder='State' selection options={categoryList} label="메인 카테고리" onChange={onChangeDrop} name="category" />}
                { input.category && (subCategoryList?.length !== 0 ? (<Form.Dropdown placeholder='State' selection options={subCategoryList} label="세부 카테고리" name="subCategory" onChange={onChangeDrop}/> ): "하위 카테고리 없습니다!")  }
                <Form.TextArea 
                    className="content"
                    value={input?.content} 
                    height={300} 
                    style={{ minHeight: 400 }} 
                    placeholder="글 내용을 입력해주세요"
                    label="글 내용"
                    name="content"
                    onChange={onChange}
                />
                <Form.Input type="file" multiple="multiple" label="이미지 첨부" onChange={onChange} name="img" ></Form.Input>
                <Image.Group size="small">
                    {imgList}
                </Image.Group>
                {
                isUpdate ? (
                    <Form.Group inline >
                        <Form.Button color="red" onClick={()=>handleRemove(post?.id)} >삭제</Form.Button>
                        <Form.Button primary onClick={() => handleUpdate(input.title, input.content, input.subCategory, input.img)} >수정</Form.Button>    
                    </Form.Group>
                ) :
                (
                    <Form.Group inline >
                        <Form.Button primary onClick={()=>handleCreatePost(input.title, input.content, input.subCategory, input.img)}>등록</Form.Button>    
                    </Form.Group>
                )
                }
               
                
            </Form>
        </PostBlock>
    )
}

export default Post;