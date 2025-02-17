import { buildWispClient, GetPostsResult, GetPostResult } from "@wisp-cms/client";

// Create the Wisp client
export const wisp = buildWispClient({
  blogId: "cm1xywpk7000097fijb7w99pt", // Your Wisp Blog ID
});

export type { GetPostsResult, GetPostResult };

// Function to get a single post by its slug using Wisp Client
export async function getPost(slug: string) {
  try {
    const result = await wisp.getPost(slug);
    return result;
  } catch (error) {
    console.error("Error fetching post:", error);
    return { post: null };
  }
}

// Function to get all posts (for fallback purposes)
export async function getAllPosts() {
  try {
    const result = await wisp.getPosts();
    return result; // assuming result is of type GetPostsResult
  } catch (error) {
    console.error("Error fetching all posts:", error);
    return { posts: [] }; // Return empty array on error
  }
}

