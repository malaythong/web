<!-- ForumCard.vue -->
<template>
    <div class="forum-card">
      <h2 class="post-title">{{ post.title }}</h2>
      <p class="post-author">By: {{ post.author }}</p>
      <p class="post-date">{{ post.date }}</p>
      <p class="post-content">{{ post.content }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      post: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  
  <style>
  .forum-card {
    border: 1px solid #ccc;
    padding: 12px;
    margin-bottom: 12px;
    border-radius: 4px;
  }
  
  .post-title {
    font-size: 20px;
    margin-bottom: 8px;
  }
  
  .post-author {
    font-size: 14px;
    color: #777;
    margin-bottom: 4px;
  }
  
  .post-date {
    font-size: 12px;
    color: #999;
    margin-bottom: 4px;
  }
  
  .post-content {
    font-size: 16px;
  }
  </style>
  