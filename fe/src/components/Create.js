import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const CreateSection = styled.div``;

const CreateTagBox = styled.div``;
const CreateTag = styled.input`
width: 100%;
padding: 5px 10px;
border: 1px solid #dbdbdb;
`;
const TagList = styled.ul`
display: flex;
`;
const Tag = styled.li`
cursor: pointer;
padding: 5px;
margin: 3px;
border: 1px solid #dbdbdb;
border-radius: 100px;
`;
const CreateTitle = styled.input`
display: block;
width: 100%;
padding: 5px 10px;
border: 1px solid #dbdbdb;
`;
const CreateContent = styled.textarea`
display: block;
resize: none;
width: 100%;
min-height: 200px;
padding: 5px 10px;
border: 1px solid #dbdbdb;
`;

function Create() {
  const navigate = useNavigate();
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    tags: [],
  });
  const [newTag, setNewTag] = useState('');

  const getValue = (e) => {
    const { name, value } = e.target;
    setNewPost({
      ...newPost,
      [name]: value,
    });
  };

  const getTag = (e) => {
    setNewTag(e.target.value);
  };

  const concatTag = (e) => {
    if (e.key === 'Enter') {
      setNewPost({
        ...newPost,
        tags: newPost.tags.concat(newTag),
      });
      setNewTag('');
    }
  };

  const filterTag = (param) => {
    setNewPost({
      ...newPost,
      tags: newPost.tags.filter((tag) => tag !== param),
    });
  };

  const submit = () => {
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_SERVER_HOST}/p/c`,
      data: newPost,
    }).then((res) => {
      if (res.status === 201) {
        navigate('/');
      }
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <>
      <Header type="create" handler={submit} />
      <CreateSection>
        <CreateTagBox>
          <CreateTag type="text" value={newTag || ''} placeholder="태크를 입력해주세요" onChange={getTag} onKeyUp={concatTag} />
          <TagList>
            {newPost.tags.map((tag) => <Tag key={`${tag}k`} onClick={() => filterTag(tag)}>{tag}</Tag>)}
          </TagList>
        </CreateTagBox>
        <CreateTitle type="text" name="title" value={newPost.title} placeholder="제목을 입력해주세요" onChange={getValue} />
        <CreateContent name="content" value={newPost.content} placeholder="본문을 작성해주세요" onChange={getValue} />
      </CreateSection>
    </>
  );
}

export default Create;
