// import prisma from "../utils/prisma.js";
// import client from "../config/redis.js";

// const PostController = {
//   getAllPosts: async (req, res) => {
//     try {
//       const posts = await prisma.post.findMany();
//       const ids = posts.map((post) => post.id);

//       const redisIds = ids.map((id) => `post:${id}:likes`);

//       const RedisLikes = await client.mGet(redisIds);

//       const updatedPosts = posts.map((post, idx) => ({
//         ...post,
//         likes: RedisLikes[idx] ? RedisLikes[idx] : 0,
//       }));
//       return res
//         .status(200)
//         .json({ success: true, msg: "Liked Post", posts: updatedPosts });
//     } catch (error) {
//       return res
//         .status(500)
//         .json({ success: false, msg: `Internal Server Error :  ${error}` });
//     }
//   },

//   createPost: async (req, res) => {
//     try {
//       const { title, description } = req.body;

//       const post = await prisma.post.create({
//         data: {
//           title,
//           description,
//           likes: 0,
//         },
//       });

//       await client.set(`post:${post.id}:likes`, 0);

//       return res
//         .status(201)
//         .json({ success: true, msg: "Post Created Succesfully!" });
//     } catch (error) {
//       return res
//         .status(500)
//         .json({ success: false, msg: `Internal Server Error :  ${error}` });
//     }
//   },

//   updateLikes: async (req, res) => {
//     try {
//       const { postId } = req.body;
//       const updatedLikes = await client.incr(`post:${postId}:likes`);

//       return res
//         .status(200)
//         .json({ success: true, msg: "Liked Post", updatedLikes });
//     } catch (error) {
//       return res
//         .status(500)
//         .json({ success: false, msg: `Internal Server Error :  ${error}` });
//     }
//   },
// };

// export { PostController };

import prisma from "../utils/prisma.js";
import client from "../config/redis.js";
import * as Sentry from "@sentry/node"

const PostController = {
  getAllPosts: async (req, res) => {
    try {
      const posts = await prisma.post.findMany();
      if (!posts || posts.length === 0) {
        return res.status(200).json({ success: true, posts: [] });
      }

      const postIds = posts.map((p) => p.id);
      const redisKeys = postIds.map((id) => `post:${id}:likes`);
      const redisLikes = await client.mGet(redisKeys);

      const updatedPosts = await Promise.all(
        posts.map(async (post, idx) => {
          const rLikes = redisLikes[idx];

          // If Redis doesn't have the value, initialize it from DB
          if (rLikes === null) {
            await client.set(`post:${post.id}:likes`, post.likes);
            return post;
          }

          const numericRLikes = Number(rLikes);

          // If Redis value differs from DB, sync DB (Redis is source of truth)
          if (numericRLikes !== post.likes) {
            console.log(
              `Syncing DB for post ${post.id}: ${post.likes} -> ${numericRLikes}`,
            );
            return await prisma.post.update({
              where: { id: post.id },
              data: { likes: numericRLikes },
            });
          }

          return { ...post, likes: numericRLikes };
        }),
      );

      return res.status(200).json({
        success: true,
        posts: updatedPosts,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, msg: `Internal Server Error :  ${error}` });
    }
  },

  createPost: async (req, res) => {
    try {
      const { title, description } = req.body;

      if (title) {
        // throw Error("This is Node Custom Error!");
        return res
          .status(400)
          .json({ success: false, msg: "This is Custom Error 2.0!" });
      }

      const post = await prisma.post.create({
        data: {
          title,
          description,
          likes: 0,
        },
      });

      await client.set(`post:${post.id}:likes`, 0);

      return res
        .status(201)
        .json({ success: true, msg: "Post Created Succesfully!" });
    } catch (error) {
      Sentry.captureException(error)
      return res
        .status(500)
        .json({ success: false, msg: `Internal Server Error :  ${error}` });
    }
  },

  updateLikes: async (req, res) => {
    try {
      const { postId } = req.body;
      const updatedLikes = await client.incr(`post:${postId}:likes`);

      return res
        .status(200)
        .json({ success: true, msg: "Liked Post", updatedLikes });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, msg: `Internal Server Error :  ${error}` });
    }
  },
};

export { PostController };
