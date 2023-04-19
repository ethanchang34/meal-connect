"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import AddPost from "./components/AddPost";
import Post from "./components/Post";
import { Key, useEffect, useState } from "react";
import { PostType } from "./types/Posts";
import { Socket, io } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
// import { socket } from "./socket";
let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

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
  const [input, setInput] = useState("");

  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("update-input", (msg) => {
      setInput(msg);
      console.log(msg);
    });
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    socket.emit("input-change", e.target.value);
  };

  if (error) return error;
  if (isLoading) return "Loading...";

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
            key={post.id}
            id={post.id}
            name={post.user.name}
            avatar={post.user.image}
            postTitle={post.title}
            comments={post.comments}
          />
        )
      )}
      <input
        placeholder="Type something"
        value={input}
        onChange={onChangeHandler}
      />
    </main>
  );
}
