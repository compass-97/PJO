import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Post from './Post';
import timeString from '../api/time';

const SearchBox = styled.div``;
const SearchInputWrap = styled.div``;
const SearchInput = styled.input`
width: 100%;
padding: 5px;
`;
const SearchedTagsWrap = styled.ul``;
const SearchTag = styled.li`
display: inline-block;
`;
const PostListSection = styled.div``;
const PostLi = styled.li`
display: flex;
padding: 10px;
margin-bottom: 1px;
border: 1px solid #dbdbdb;
border-bottom: none;
`;
const PostTitle = styled.div`
margin-right: 40px;
`;
const PostTags = styled.div`
margin-right: 10px;
`;
const PostDate = styled.div``;

function Home() {
  const [postList, setPostList] = useState([]);
  const [toggles, setToggles] = useState({
    postListToggle: true,
    postToggle: null,
  });
  const [loading, setLoading] = useState(true);
  const [searchTagValue, setSearchTagValue] = useState('');
  const [searchTags, setSearchTags] = useState([]);

  const postToggleHandler = (id) => {
    setToggles({
      ...toggles,
      postListToggle: !toggles.postListToggle,
      postToggle: id,
    });
  };

  const loadingHandler = (param) => {
    setLoading(param);
  };
  const concatSearchTag = (e) => {
    if (e.key === 'Enter') {
      setSearchTags(searchTags.concat(searchTagValue));
      setSearchTagValue('');
    }
  };

  const removeSearchTag = (tag) => {
    setSearchTags(searchTags.filter((elem) => elem !== tag));
  };

  useEffect(() => {
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_SERVER_HOST}/p/l`,
      data: { tags: searchTags },
    }).then((res) => {
      setPostList(postList.filter((elem) => elem._id === -1).concat(res.data));
      loadingHandler(false);
    }).catch((error) => {
      console.log(error);
    });
  }, [searchTags]);

  return (
    <>
      {!loading && toggles.postListToggle && !toggles.postToggle
      && (
      <>
        <Header type="postlist" />
        <SearchBox>
          <SearchInputWrap>
            <SearchInput
              type="text"
              value={searchTagValue}
              placeholder="태그를 검색해보세요"
              onChange={(e) => setSearchTagValue(e.target.value)}
              onKeyUp={concatSearchTag}
            />
          </SearchInputWrap>
          <SearchedTagsWrap>
            {searchTags.length > 0
          && searchTags.map((tag) => <SearchTag key={`${tag}k`} onClick={() => removeSearchTag(tag)}>{tag}</SearchTag>)}
          </SearchedTagsWrap>
        </SearchBox>
        <PostListSection>
          <ul>
            {postList.map((elem) => (
              <PostLi key={elem._id} onClick={() => postToggleHandler(elem._id)}>
                <PostTitle>{elem.title}</PostTitle>
                <PostTags>{elem.tags.map((tag) => <span>{tag}</span>)}</PostTags>
                <PostDate>{timeString(elem.createdAt)}</PostDate>
              </PostLi>
            ))}
          </ul>
        </PostListSection>
      </>
      )}
      {toggles.postToggle
      && (
      <>
        <Header
          type="post"
          handler={postToggleHandler}
        />
        <Post
          id={toggles.postToggle}
          loading={loading}
          loadingHandler={loadingHandler}
        />
      </>
      )}
    </>
  );
}

export default Home;
