"use client";

import { ForumWithCreator } from "@/actions/forum";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  Eye,
  Filter,
  MessageSquare,
  MoreHorizontal,
  PenSquare,
  Search,
  ThumbsDown,
  ThumbsUp,
  TrendingUp,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ForumPageProps {
  forumData: ForumWithCreator;
}

const ForumPage = ({ forumData }: ForumPageProps) => {
  // Sample post data
  // const posts = [
  //   {
  //     id: 1,
  //     user: {
  //       name: "John Doe",
  //       username: "johndoe",
  //       avatar: "https://github.com/wildanmukmin.png",
  //     },
  //     content:
  //       "UI design trends for 2025: What we're seeing in modern web applications and how to implement them in your next project.",
  //     image:
  //       "https://images.unsplash.com/photo-1742147550712-9c25dc0832aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8",
  //     stats: {
  //       comments: 28,
  //       likes: 124,
  //       upvotes: 35,
  //       downvotes: 2,
  //     },
  //     time: "2h",
  //     isPinned: true,
  //     tags: ["Design", "UI/UX", "Web Dev"],
  //     views: 523,
  //   },
  //   {
  //     id: 2,
  //     user: {
  //       name: "Emily Chen",
  //       username: "emilychen",
  //       avatar: "https://github.com/wildanmukmin.png",
  //     },
  //     content:
  //       "Just finished working on a new component library. Would love to get your feedback on the accessibility features I've implemented!",
  //     image: null,
  //     stats: {
  //       comments: 14,
  //       likes: 56,
  //       upvotes: 19,
  //       downvotes: 0,
  //     },
  //     time: "5h",
  //     isPinned: false,
  //     tags: ["React", "Accessibility", "Component Library"],
  //     views: 248,
  //   },
  // ];
  const [data, setData] = useState(forumData);

  return (
    <main className="mt-10 max-w-full mx-auto px-4">
      <div className="flex justify-start mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Forum</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b-2 border-blue-800 pb-4 mb-6">
        <h2 className="text-3xl font-bold text-blue-900">Community Forum</h2>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search posts..."
              className="pl-8 w-full sm:w-64 bg-gray-50"
            />
          </div>
          <Link href="/forum/posting-forum">
            <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
              <PenSquare size={16} />
              <span>New Post</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Forum filters and tabs */}
      <div className="mb-8">
        <Tabs defaultValue="trending" className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <TabsList className="bg-gray-100">
              <TabsTrigger value="trending" className="flex items-center gap-1">
                <TrendingUp size={14} />
                <span>Trending</span>
              </TabsTrigger>
              <TabsTrigger value="latest" className="flex items-center gap-1">
                <Clock size={14} />
                <span>Latest</span>
              </TabsTrigger>
              <TabsTrigger value="popular" className="flex items-center gap-1">
                <Eye size={14} />
                <span>Most Viewed</span>
              </TabsTrigger>
            </TabsList>

            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={14} />
              <span>Filter</span>
            </Button>
          </div>

          <TabsContent value="trending" className="space-y-6">
            {data?.length !== 0 ? (
              data &&
              data.map((post) => (
                <Card
                  key={post.id}
                  className="overflow-hidden hover:shadow-md transition-shadow duration-300"
                >
                  <CardContent className="p-0">
                    <div className="border-b border-gray-100">
                      <div className="p-6">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-10 w-10 border-2 border-blue-100">
                            <AvatarImage
                              src="https://github.com/wildanmukmin.png"
                              alt={post.user.name || ""}
                            />
                            <AvatarFallback>
                              <User
                                height={20}
                                width={20}
                                className="text-black"
                              />
                            </AvatarFallback>
                          </Avatar>

                          <div className="w-full">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-blue-900">
                                  {post.user.name}
                                </span>
                                <span className="text-gray-500 text-sm">
                                  @{post.user.email}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-500 text-sm mt-1 sm:mt-0">
                                <Calendar size={14} />
                                <span>
                                  {post.createdAt.toLocaleDateString()} ago
                                </span>
                                <span>•</span>
                                <Eye size={14} />
                                {/* <span>{post.views} views</span> */}
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 rounded-full ml-2"
                                >
                                  <MoreHorizontal size={16} />
                                </Button>
                              </div>
                            </div>

                            {/* <div className="flex flex-wrap gap-2 mb-3">
                              {post.tags.map((tag, idx) => (
                                <Badge
                                  key={idx}
                                  variant="secondary"
                                  className="bg-blue-50 text-blue-700 hover:bg-blue-100"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div> */}

                            <p className="text-gray-800 mb-4">{post.content}</p>

                            {post.image?.gambar && (
                              <div className="mb-4 overflow-hidden rounded-lg">
                                <Image
                                  src={post.image?.gambar}
                                  alt="Post Image"
                                  width={1200}
                                  height={500}
                                  className="rounded-lg hover:scale-105 transition-transform duration-300 w-full"
                                />
                              </div>
                            )}

                            <div className="flex justify-between pt-2 text-gray-500 border-t border-gray-100">
                              <button className="flex items-center gap-2 hover:text-blue-500 transition-colors px-2 py-1 rounded-md hover:bg-blue-50">
                                <MessageSquare size={18} />
                                <span>{post.comment.length}</span>
                              </button>
                              <button className="flex items-center gap-2 hover:text-green-500 transition-colors px-2 py-1 rounded-md hover:bg-green-50">
                                <ThumbsUp size={18} />
                                <span>{post.like.length}</span>
                              </button>
                              <button className="flex items-center gap-2 hover:text-orange-500 transition-colors px-2 py-1 rounded-md hover:bg-orange-50">
                                <ThumbsDown size={18} />
                                <span>{post.dislike.length}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-center text-gray-500 py-4">
                Tampilan post trending akan muncul di sini
              </p>
            )}
          </TabsContent>

          <TabsContent value="latest" className="space-y-6">
            <p className="text-center text-gray-500 py-4">
              Tampilan post terbaru akan muncul di sini
            </p>
          </TabsContent>

          <TabsContent value="popular" className="space-y-6">
            <p className="text-center text-gray-500 py-4">
              Tampilan post terpopuler akan muncul di sini
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default ForumPage;
