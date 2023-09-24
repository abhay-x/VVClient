import React from 'react';

const Post = ({ title, author, views, likes, comments, thumbnailUrl }) => (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      {/* Thumbnail */}
      <img src={thumbnailUrl} alt="Post Thumbnail" className="w-full h-auto mb-2" />
  
      {/* Title */}
      <h2 className="text-xl font-semibold">{title}</h2>
  
      {/* Author, Views, Likes, Comments */}
      <div className="text-gray-600 text-sm mt-2">
        <p>Author: {author}</p>
        <p>Views: {views}</p>
        <p>Likes: {likes}</p>
        <p>Comments: {comments}</p>
      </div>
    </div>
  );

export default Post;
