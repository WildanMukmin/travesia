"use client";

import {
  deleteForum,
  dislikeForum,
  ForumWithCreator,
  likeForum,
} from "@/actions/forum";
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
  PenSquare,
  Search,
  ThumbsDown,
  ThumbsUp,
  TrendingUp,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { startTransition, useState } from "react";
import ToolDropdownForum from "../utils/tool-dropdown-forum";

interface ForumPageProps {
  forumData: ForumWithCreator;
  userId: string;
}

const ForumPage = ({ forumData, userId }: ForumPageProps) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [data, setData] = useState(forumData);
  const handleDelete = (forumId: string) => {
    startTransition(() => {
      deleteForum(forumId).then((res) => {
        if (res?.error) {
          setErrorMessage(res?.error);
        }
        if (res?.success) {
          setSuccessMessage(res?.success);
          setData(
            (prevData) => prevData?.filter((item) => item.id !== forumId) ?? [],
          );
        }
      });
    });
  };

  const handleComment = (forumId: string, userId: string) => {
    startTransition(() => {
      console.log("comment : ", forumId);
    });
  };
  const handleLike = (forumId: string, userId: string) => {
    startTransition(() => {
      likeForum(forumId, userId).then((res) => {
        if (res?.success) {
          setData(
            (prevData) =>
              prevData?.map((item) =>
                item.id === forumId
                  ? {
                      ...item,
                      like: res.likeData
                        ? [...item.like, res.likeData] // Jika menambah like
                        : item.like.filter((like) => like.userId !== userId), // Jika unlike
                      dislike: item.dislike.filter(
                        (dislike) => dislike.userId !== userId,
                      ), // Hapus dislike jika ada
                    }
                  : item,
              ) ?? [],
          );
        }
      });
    });
  };

  const handleDislike = (forumId: string, userId: string) => {
    startTransition(() => {
      dislikeForum(forumId, userId).then((res) => {
        if (res?.success) {
          setData(
            (prevData) =>
              prevData?.map((item) =>
                item.id === forumId
                  ? {
                      ...item,
                      dislike: res.dislikeData
                        ? [...item.dislike, res.dislikeData] // Jika menambah dislike
                        : item.dislike.filter(
                            (dislike) => dislike.userId !== userId,
                          ), // Jika undislike
                      like: item.like.filter((like) => like.userId !== userId), // Hapus like jika ada
                    }
                  : item,
              ) ?? [],
          );
        }
      });
    });
  };

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

      {successMessage && (
        <div className="bg-green-100 rounded-lg py-5 px-6 text-base text-green-700 mb-3">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-100 rounded-lg py-5 px-6 text-base text-red-700 mb-3">
          {errorMessage}
        </div>
      )}

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
                                {userId === post.user.id && (
                                  <ToolDropdownForum
                                    forumId={post.id}
                                    onDelete={() => handleDelete(post.id)}
                                  />
                                )}
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
                              <Button
                                variant="ghost"
                                onClick={() => handleComment(post.id, userId)}
                                className="flex items-center gap-2 hover:text-blue-500 transition-colors px-2 py-1 rounded-md hover:bg-blue-50"
                              >
                                <MessageSquare size={18} />
                                <span>{post.comment.length}</span>
                              </Button>
                              <Button
                                variant="ghost"
                                onClick={() => handleLike(post.id, userId)}
                                className="flex items-center gap-2 hover:text-green-500 transition-colors px-2 py-1 rounded-md hover:bg-green-50"
                              >
                                <ThumbsUp size={18} />
                                <span>{post.like.length}</span>
                              </Button>
                              <Button
                                variant="ghost"
                                onClick={() => handleDislike(post.id, userId)}
                                className="flex items-center gap-2 hover:text-orange-500 transition-colors px-2 py-1 rounded-md hover:bg-orange-50"
                              >
                                <ThumbsDown size={18} />
                                <span>{post.dislike.length}</span>
                              </Button>
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
