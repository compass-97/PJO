import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Title = styled.div`
padding: 10px;
border: 1px solid #dbdbdb;
`;
const Content = styled.div`
min-height: 200px;
padding: 10px;
border: 1px solid #dbdbdb;
`;
const CommentBox = styled.div`
padding: 10px;
border: 1px solid #dbdbdb;
`;

function Post({ id }) {
  const [post, setPost] = useState();
  const [comment, setComment] = useState();
  const [commentList, setCommentList] = useState([]);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_SERVER_HOST}/p/l/p`,
      data: { id },
    }).then((res) => {
      setPost(res.data);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  useEffect(() => {
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_SERVER_HOST}/p/c/g`,
      data: { id },
    }).then((res) => {
      setCommentList(commentList.filter((elem) => elem._id === -1).concat(res.data));
    }).catch((error) => {
      console.log(error);
    });
  }, [reload]);

  const createComment = () => {
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_SERVER_HOST}/p/c/c`,
      data: { comment, id },
    }).then((res) => {
      setComment('');
      setReload((prev) => !prev);
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <>
      {post
      && (
      <>
        <Title>{post.title}</Title>
        <Content>{post.content}</Content>
        <CommentBox>
          <input type="text" value={comment || ''} onChange={(e) => setComment(e.target.value)} />
          <button type="button" onClick={createComment}>댓글작성</button>
          <ul>
            {commentList.map((elem) => (
              <li>{elem.text}</li>
            ))}
          </ul>
        </CommentBox>
      </>
      )}
      {!post
      && <div>loading</div>}
    </>
  );
}

export default Post;
