import { ref, push, get, query, equalTo, orderByChild, update } from 'firebase/database';
import { db } from '../firebase-config';

const fromPostsDocument = snapshot => {
  const postsDocument = snapshot.val();

  return Object.keys(postsDocument).map(key => {
    const post = postsDocument[key];

    return {
      ...post,
      id: key,
      createdOn: new Date(post.createdOn),
      likedBy: post.likedBy ? Object.keys(post.likedBy) : [],
    };
  });
}

export const addPost = async (content: object, handle: string) => {

  return push(
    ref(db, 'posts'),
    {
      content,
      author: handle,
      createdOn: Date.now(),
    },
  )
    .then(result => {

      return getPostById(result.key);
    });
};

export const getPostById = async (id: string | null) => {

  return get(ref(db, `posts/${id}`))
    .then(result => {
      if (!result.exists()) {
        throw new Error(`post with id ${id} does not exist!`);
      }

      const post = result.val();
      post.id = id;
      post.createdOn = new Date(post.createdOn);
      if (!post.likedBy) post.likedBy = [];

      return post;
    });
};

export const getLikedPosts = async (handle: string) => {

  return get(ref(db, `users/${handle}`))
    .then(snapshot => {
      if (!snapshot.val()) {
        throw new Error(`User with handle @${handle} does not exist!`);
      }

      const user = snapshot.val();
      if (!user.likedPosts) return [];

      return Promise.all(Object.keys(user.likedPosts).map(key => {

        return get(ref(db, `posts/${key}`))
          .then(snapshot => {
            const post = snapshot.val();

            return {
              ...post,
              createdOn: new Date(post.createdOn),
              id: key,
              likedBy: post.likedBy ? Object.keys(post.likedBy) : [],
            };
          });
      }));
    });
};

export const getPostsByAuthor = async (handle: string) => {

  return get(query(ref(db, 'posts'), orderByChild('author'), equalTo(handle)))
    .then(snapshot => {
      if (!snapshot.exists()) return [];

      return fromPostsDocument(snapshot);
    });
};

export const getAllPosts = async () => {

  return get(ref(db, 'posts'))
    .then(snapshot => {
      if (!snapshot.exists()) {
        return [];
      }

      return fromPostsDocument(snapshot);
    });
};

export const likePost = (handle: string, postId: string) => {
  const updateLikes = {};
  updateLikes[`/posts/${postId}/likedBy/${handle}`] = true;
  updateLikes[`/users/${handle}/likedPosts/${postId}`] = true;

  return update(ref(db), updateLikes);
};

export const dislikePost = (handle: string, postId: string) => {
  const updateLikes = {};
  updateLikes[`/posts/${postId}/likedBy/${handle}`] = null;
  updateLikes[`/users/${handle}/likedPosts/${postId}`] = null;

  return update(ref(db), updateLikes);
};