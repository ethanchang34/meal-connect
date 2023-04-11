"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import AddPost from "./components/AddPost";
import Post from "./components/Post";
import { Key } from "react";
import { PostType } from "./types/Posts";

//Fetch all Posts
const allPosts = async () => {
  const response = await axios.get("/api/posts/getPosts");
  return response.data;
};

export default function Home() {
  const { data, error, isLoading } = useQuery<PostType[]>({
    queryFn: allPosts,
    queryKey: ["posts"],
  });
  if (error) return error;
  if (isLoading) return "Loading...";
  console.log(data);

  return (
    <main>
      <AddPost />
      {data?.map(
        (post: {
          comments?: any;
          id: Key | null | undefined;
          user: { name: any; image: any };
          title: any;
        }) => (
          <Post
            key={post.id} // Why can i have this parameters but not have it defined in Post.tsx???
            id={post.id}
            name={post.user.name}
            avatar={post.user.image}
            postTitle={post.title}
            comments={post.comments}
          />
        )
      )}
    </main>
  );
}
