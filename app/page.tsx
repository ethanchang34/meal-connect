"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import AddPost from "./components/AddPost";
import Post from "./components/Post";
import { Key, useEffect, useState } from "react";
import { PostType } from "./types/Posts";
import { io } from "socket.io-client";
// import { socket } from "./socket";
let socket;

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

  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log("connected");
    });
  };

  // const [isConnected, setIsConnected] = useState<Boolean>(socket.connected);
  // useEffect(() => {
  //   function onConnect() {
  //     setIsConnected(true);
  //     console.log("connnected :D");
  //   }

  //   function onDisconnect() {
  //     setIsConnected(false);
  //     console.log("disconnected D:");
  //   }

  //   socket.on("connect", onConnect);
  //   socket.on("disconnect", onDisconnect);

  //   return () => {
  //     socket.off("connect", onConnect);
  //     socket.off("disconnect", onDisconnect);
  //   };
  // }, []);

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
      {/* <button onClick={socket.connect}>Connect</button>
      <button onClick={socket.disconnect}>Disconnect</button>
      <p>isConnected: {isConnected.toString()}</p> */}
    </main>
  );
}
