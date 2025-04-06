"use client";

import {
  commentForum,
  deleteForum,
  dislikeForum,
  ForumWithCreator,
  likeForum,
  OneForumWithCreator,
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { postingCommentSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Eye,
  Filter,
  InfoIcon,
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
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-succsess";
import { Textarea } from "@/components/ui/textarea";
import ToolDropdownForum from "@/components/utils/tool-dropdown-forum";
import { CurrentUser } from "@/lib/authenticate";
import { Role } from "@prisma/client";

interface ForumPageProps {
  forumsData?: ForumWithCreator;
  forumData?: OneForumWithCreator;
  user: CurrentUser;
  userName: string;
}

const ForumPage = ({
  forumsData,
  forumData,
  user,
  userName,
}: ForumPageProps) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [data, setData] = useState(forumsData);
  const [oneData, setOneData] = useState(forumData);
  const [openComment, setOpenComment] = useState("");
  const [isPending, setIsPending] = useState(false);
  const form = useForm<z.infer<typeof postingCommentSchema>>({
    resolver: zodResolver(postingCommentSchema),
    defaultValues: {
      forumId: "",
      userId: user?.id || "",
      pesan: openComment || "",
    },
  });
  const handleDelete = (forumId: string) => {
    startTransition(() => {
      deleteForum(forumId).then((res) => {
        if (res?.error) {
          setErrorMessage(res?.error);
        }
        if (res?.success) {
          setSuccessMessage(res?.success);
          setData(
            (prevData) => prevData?.filter((item) => item.id !== forumId) ?? []
          );
        }
      });
    });
  };

  const handleCommentClick = (id: string) => {
    setOpenComment(id);
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
                        (dislike) => dislike.userId !== userId
                      ), // Hapus dislike jika ada
                    }
                  : item
              ) ?? []
          );

          setOneData((prevData) =>
            prevData?.id === forumId
              ? {
                  ...prevData,
                  like: res.likeData
                    ? [...prevData.like, res.likeData]
                    : prevData.like.filter((like) => like.userId !== userId),
                  dislike: prevData.dislike.filter(
                    (dislike) => dislike.userId !== userId
                  ),
                }
              : prevData
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
                            (dislike) => dislike.userId !== userId
                          ), // Jika undislike
                      like: item.like.filter((like) => like.userId !== userId), // Hapus like jika ada
                    }
                  : item
              ) ?? []
          );

          setOneData((prevData) =>
            prevData?.id === forumId
              ? {
                  ...prevData,
                  dislike: res.dislikeData
                    ? [...prevData.dislike, res.dislikeData] // Perbaiki dari prevData.like ke prevData.dislike
                    : prevData.dislike.filter(
                        (dislike) => dislike.userId !== userId
                      ),
                  like: prevData.like.filter((like) => like.userId !== userId),
                }
              : prevData
          );
        }
      });
    });
  };

  const handlePostingComment = (
    dataForm: z.infer<typeof postingCommentSchema>
  ) => {
    setErrorMessage("");
    dataForm.forumId = openComment;
    setIsPending(true);
    startTransition(() => {
      commentForum(dataForm).then((res) => {
        if (res?.error) {
          setErrorMessage(res?.error);
        }
        if (res?.success) {
          setData(
            (prevData) =>
              prevData?.map((item) =>
                item.id === dataForm.forumId
                  ? {
                      ...item,
                      comment: res.commentData
                        ? [...item.comment, res.commentData]
                        : item.comment,
                    }
                  : item
              ) ?? []
          );

          setOneData((prevData) =>
            prevData?.id === dataForm.forumId
              ? {
                  ...prevData,
                  comment: res.commentData
                    ? [...prevData.comment, res.commentData]
                    : prevData.comment,
                }
              : prevData
          );
        }
      });
      form.setValue("pesan", "");
      setIsPending(false);
    });
  };

  if (user?.role === Role.ADMIN) {
    return (
      <main className="mt-10 max-w-6xl mx-auto px-4">
        <div>
          <Link
            href="/admin/kelola-forum"
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 underline-offset-1 underline mb-3"
          >
            <ArrowLeft size={16} />
            <span>Kembali ke halaman kelola forum</span>
          </Link>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b-2 border-blue-800 pb-4 mb-6">
          <h2 className="text-3xl font-bold text-blue-900">Community Forum</h2>
          <div className="flex gap-3">
            <Link href={`/admin/kelola-forum/edit/${forumData?.id}`}>
              <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                <PenSquare size={16} />
                <span>Edit Postingan</span>
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
          <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-0">
              <div className="border-b border-gray-100">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10 border-2 border-blue-100">
                      <AvatarImage
                        src={oneData?.user?.image?.gambar}
                        alt={oneData?.user.name || ""}
                      />
                      <AvatarFallback>
                        <User height={20} width={20} className="text-black" />
                      </AvatarFallback>
                    </Avatar>

                    <div className="w-full">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-blue-900">
                            {oneData?.user.name}
                          </span>
                          <span className="text-gray-500 text-sm">
                            @{oneData?.user.email}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 text-sm mt-1 sm:mt-0">
                          <Calendar size={14} />
                          <span>
                            {oneData?.createdAt.toLocaleDateString()} ago
                          </span>
                          <span>•</span>
                          <Eye size={14} />
                          {user?.role === Role.ADMIN && (
                            <ToolDropdownForum
                              admin={true}
                              forumId={oneData?.id || ""}
                              onDelete={() => handleDelete(oneData?.id || "")}
                            />
                          )}
                        </div>
                      </div>

                      <p className="text-gray-800 mb-4">{oneData?.content}</p>

                      {oneData?.image?.gambar && (
                        <div className="mb-4 overflow-hidden rounded-lg">
                          <Image
                            src={oneData?.image?.gambar}
                            alt="Post Image"
                            width={1200}
                            height={500}
                            className="rounded-lg hover:scale-105 transition-transform duration-300 w-full"
                          />
                        </div>
                      )}

                      <div className="flex justify-between pt-2 text-gray-500 border-t border-gray-100">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              onClick={() =>
                                handleCommentClick(oneData?.id || "")
                              }
                              className="flex items-center gap-2 hover:text-blue-500 transition-colors px-2 py-1 rounded-md hover:bg-blue-50"
                            >
                              <MessageSquare size={18} />
                              <span>{oneData?.comment.length}</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="w-full h-96 flex flex-col">
                            <DialogTitle className="sr-only">
                              Postingan Forum dan Komentar
                            </DialogTitle>
                            <div className="flex flex-col gap-4 overflow-auto">
                              <div className="border-b pb-4">
                                <h3 className="text-lg font-semibold mb-4 text-blue-900">
                                  Postingan Forum dan Komentar
                                </h3>
                                <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 border-none shadow-none">
                                  <CardContent className="p-0">
                                    <div className="flex items-start gap-4">
                                      <Avatar className="h-10 w-10 border-2 border-blue-100">
                                        <AvatarImage
                                          src={oneData?.user?.image?.gambar}
                                          alt={oneData?.user.name || ""}
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
                                              {oneData?.user.name}
                                            </span>
                                            <span className="text-gray-500 text-sm">
                                              @{oneData?.user.email}
                                            </span>
                                          </div>
                                          <div className="flex items-center gap-2 text-gray-500 text-sm mt-1 sm:mt-0">
                                            <Calendar size={14} />
                                            <span>
                                              {oneData?.createdAt.toLocaleDateString()}{" "}
                                              ago
                                            </span>
                                          </div>
                                        </div>
                                        <p className="text-gray-800 mb-4">
                                          {oneData?.content}
                                        </p>
                                        {oneData?.image?.gambar && (
                                          <div className="mb-4 overflow-hidden rounded-lg">
                                            <Image
                                              src={oneData?.image?.gambar}
                                              alt="Post Image"
                                              width={1200}
                                              height={500}
                                              className="rounded-lg hover:scale-105 transition-transform duration-300 w-full"
                                            />
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>

                              {/* Comments Section */}
                              <div className="border-b pb-4">
                                <h3 className="text-lg font-semibold mb-4 text-blue-900">
                                  Comments ({oneData?.comment.length})
                                </h3>
                                {oneData?.comment.length === 0 ? (
                                  <div className="text-center text-gray-500 py-8">
                                    <MessageSquare
                                      size={48}
                                      className="mx-auto mb-4 text-gray-300"
                                    />
                                    <p>No comments yet</p>
                                    <p className="text-sm">
                                      Be the first to comment!
                                    </p>
                                  </div>
                                ) : (
                                  oneData?.comment.map((comment) => (
                                    <div
                                      key={comment.id}
                                      className="mb-4 pb-4 border-b last:border-b-0 flex items-start gap-3 mx-4"
                                    >
                                      <Avatar className="h-8 w-8">
                                        <AvatarImage
                                          src={comment.user?.image?.gambar}
                                          alt={comment.user.name || "User"}
                                        />
                                        <AvatarFallback>
                                          <User className="h-5 w-5" />
                                        </AvatarFallback>
                                      </Avatar>
                                      <div className="w-full max-w-4xl">
                                        {" "}
                                        {/* Ubah max-w agar tidak terlalu lebar */}
                                        <div className="flex items-center gap-2 mb-1">
                                          {comment.user.name === userName ? (
                                            <span className="font-semibold text-sm text-blue-600">
                                              Me
                                            </span>
                                          ) : (
                                            <span className="font-semibold text-sm">
                                              {comment.user.name}
                                            </span>
                                          )}
                                          <span className="text-xs text-gray-500">
                                            {comment.createdAt.toLocaleString()}
                                          </span>
                                        </div>
                                        <p className="text-sm text-gray-700 break-words whitespace-pre-wrap">
                                          {comment.pesan}
                                        </p>
                                      </div>
                                    </div>
                                  ))
                                )}
                              </div>

                              {/* Comment Input */}
                              <div className="mt-4 pt-4 border-t">
                                <div className="flex items-start gap-3">
                                  <Avatar className="h-10 w-10">
                                    <AvatarImage
                                      src={user?.image?.gambar}
                                      alt="Your avatar"
                                    />
                                    <AvatarFallback>
                                      <User className="h-6 w-6" />
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-grow w-full max-w-4xl">
                                    <Form {...form}>
                                      <form
                                        onSubmit={form.handleSubmit(
                                          handlePostingComment
                                        )}
                                        className="space-y-6"
                                      >
                                        <FormField
                                          control={form.control}
                                          name="pesan"
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormLabel className="font-medium text-gray-700">
                                                {userName}
                                              </FormLabel>
                                              <FormControl>
                                                <Textarea
                                                  {...field}
                                                  disabled={isPending}
                                                  className="w-full max-w-4xl min-h-[100px] mb-2"
                                                  placeholder="Tulis komentar..."
                                                />
                                              </FormControl>
                                              <FormMessage className="text-sm" />
                                            </FormItem>
                                          )}
                                        />
                                        {errorMessage && (
                                          <FormError message={errorMessage} />
                                        )}
                                        {successMessage && (
                                          <FormSuccess
                                            message={successMessage}
                                          />
                                        )}
                                        <div className="flex justify-end gap-2">
                                          <Button
                                            className="bg-blue-600 hover:bg-blue-700"
                                            type="submit"
                                            disabled={isPending}
                                          >
                                            Posting Komentar
                                          </Button>
                                        </div>
                                      </form>
                                    </Form>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <DialogFooter className="justify-between">
                              <div className="flex items-center gap-2 text-gray-500">
                                <InfoIcon size={16} />
                                <span className="text-sm">
                                  Diskusi Public. Mohon saling menghargai.
                                </span>
                              </div>
                              <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                  Close
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        <Button
                          variant="ghost"
                          onClick={() =>
                            handleLike(oneData?.id || "", user?.id || "")
                          }
                          className={`flex items-center gap-2 ${(oneData?.like?.filter((like) => like.userId === user?.id).length ?? 0) > 0 && "text-green-500 bg-green-50"} hover:text-green-500 hover:bg-green-50 transition-colors px-2 py-1 rounded-md `}
                        >
                          <ThumbsUp
                            size={18}
                            strokeWidth={
                              (oneData?.like?.filter(
                                (like) => like.userId === user?.id
                              ).length ?? 0) > 0
                                ? 3
                                : 1
                            }
                          />
                          <span>{oneData?.like.length}</span>
                        </Button>

                        <Button
                          variant="ghost"
                          onClick={() =>
                            handleDislike(oneData?.id || "", user?.id || "")
                          }
                          className={`flex items-center gap-2 ${(oneData?.dislike?.filter((dislike) => dislike.userId === user?.id).length ?? 0) > 0 && "text-orange-500 bg-orange-50"} hover:text-orange-500 hover:bg-orange-50 transition-colors px-2 py-1 rounded-md `}
                        >
                          <ThumbsDown
                            size={18}
                            strokeWidth={
                              (oneData?.dislike?.filter(
                                (dislike) => dislike.userId === user?.id
                              ).length ?? 0) > 0
                                ? 3
                                : 1
                            }
                          />
                          <span>{oneData?.dislike.length}</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

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
              <span>Posting Forum</span>
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
                              src={post.user.image?.gambar}
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
                                {user?.id === post.user.id &&
                                  user?.role !== Role.ADMIN && (
                                    <ToolDropdownForum
                                      forumId={post.id}
                                      onDelete={() => handleDelete(post.id)}
                                    />
                                  )}
                                {user?.role === Role.ADMIN && (
                                  <ToolDropdownForum
                                    admin={true}
                                    forumId={post.id}
                                    onDelete={() => handleDelete(post.id)}
                                  />
                                )}
                              </div>
                            </div>

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
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    onClick={() => handleCommentClick(post.id)}
                                    className="flex items-center gap-2 hover:text-blue-500 transition-colors px-2 py-1 rounded-md hover:bg-blue-50"
                                  >
                                    <MessageSquare size={18} />
                                    <span>{post.comment.length}</span>
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="w-full h-96 flex flex-col">
                                  <DialogTitle className="sr-only">
                                    Postingan Forum dan Komentar
                                  </DialogTitle>
                                  <div className="flex flex-col gap-4 overflow-auto">
                                    <div className="border-b pb-4">
                                      <h3 className="text-lg font-semibold mb-4 text-blue-900">
                                        Postingan Forum dan Komentar
                                      </h3>
                                      <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 border-none shadow-none">
                                        <CardContent className="p-0">
                                          <div className="flex items-start gap-4">
                                            <Avatar className="h-10 w-10 border-2 border-blue-100">
                                              <AvatarImage
                                                src={post.user.image?.gambar}
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
                                                    {post.createdAt.toLocaleDateString()}{" "}
                                                    ago
                                                  </span>
                                                </div>
                                              </div>
                                              <p className="text-gray-800 mb-4">
                                                {post.content}
                                              </p>
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
                                            </div>
                                          </div>
                                        </CardContent>
                                      </Card>
                                    </div>

                                    {/* Comments Section */}
                                    <div className="border-b pb-4">
                                      <h3 className="text-lg font-semibold mb-4 text-blue-900">
                                        Comments ({post.comment.length})
                                      </h3>
                                      {post.comment.length === 0 ? (
                                        <div className="text-center text-gray-500 py-8">
                                          <MessageSquare
                                            size={48}
                                            className="mx-auto mb-4 text-gray-300"
                                          />
                                          <p>No comments yet</p>
                                          <p className="text-sm">
                                            Be the first to comment!
                                          </p>
                                        </div>
                                      ) : (
                                        post.comment.map((comment) => (
                                          <div
                                            key={comment.id}
                                            className="mb-4 pb-4 border-b last:border-b-0 flex items-start gap-3 mx-4"
                                          >
                                            <Avatar className="h-8 w-8">
                                              <AvatarImage
                                                src={comment.user.image?.gambar}
                                                alt={
                                                  comment.user.name || "User"
                                                }
                                              />
                                              <AvatarFallback>
                                                <User className="h-5 w-5" />
                                              </AvatarFallback>
                                            </Avatar>
                                            <div className="w-full max-w-4xl">
                                              {" "}
                                              {/* Ubah max-w agar tidak terlalu lebar */}
                                              <div className="flex items-center gap-2 mb-1">
                                                {comment.user.name ===
                                                userName ? (
                                                  <span className="font-semibold text-sm text-blue-600">
                                                    Me
                                                  </span>
                                                ) : (
                                                  <span className="font-semibold text-sm">
                                                    {comment.user.name}
                                                  </span>
                                                )}
                                                <span className="text-xs text-gray-500">
                                                  {comment.createdAt.toLocaleString()}
                                                </span>
                                              </div>
                                              <p className="text-sm text-gray-700 break-words whitespace-pre-wrap">
                                                {comment.pesan}
                                              </p>
                                            </div>
                                          </div>
                                        ))
                                      )}
                                    </div>

                                    {/* Comment Input */}
                                    <div className="mt-4 pt-4 border-t">
                                      <div className="flex items-start gap-3">
                                        <Avatar className="h-10 w-10">
                                          <AvatarImage
                                            src={post.user.image?.gambar}
                                            alt="Your avatar"
                                          />
                                          <AvatarFallback>
                                            <User className="h-6 w-6" />
                                          </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-grow w-full max-w-4xl">
                                          <Form {...form}>
                                            <form
                                              onSubmit={form.handleSubmit(
                                                handlePostingComment
                                              )}
                                              className="space-y-6"
                                            >
                                              <FormField
                                                control={form.control}
                                                name="pesan"
                                                render={({ field }) => (
                                                  <FormItem>
                                                    <FormLabel className="font-medium text-gray-700">
                                                      {userName}
                                                    </FormLabel>
                                                    <FormControl>
                                                      <Textarea
                                                        {...field}
                                                        disabled={isPending}
                                                        className="w-full max-w-4xl min-h-[100px] mb-2"
                                                        placeholder="Tulis komentar..."
                                                      />
                                                    </FormControl>
                                                    <FormMessage className="text-sm" />
                                                  </FormItem>
                                                )}
                                              />
                                              {errorMessage && (
                                                <FormError
                                                  message={errorMessage}
                                                />
                                              )}
                                              {successMessage && (
                                                <FormSuccess
                                                  message={successMessage}
                                                />
                                              )}
                                              <div className="flex justify-end gap-2">
                                                <Button
                                                  className="bg-blue-600 hover:bg-blue-700"
                                                  type="submit"
                                                  disabled={isPending}
                                                >
                                                  Posting Komentar
                                                </Button>
                                              </div>
                                            </form>
                                          </Form>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <DialogFooter className="justify-between">
                                    <div className="flex items-center gap-2 text-gray-500">
                                      <InfoIcon size={16} />
                                      <span className="text-sm">
                                        Diskusi Public. Mohon saling menghargai.
                                      </span>
                                    </div>
                                    <DialogClose asChild>
                                      <Button type="button" variant="secondary">
                                        Close
                                      </Button>
                                    </DialogClose>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>

                              <Button
                                variant="ghost"
                                onClick={() =>
                                  handleLike(post.id, user?.id || "")
                                }
                                className={`flex items-center gap-2 ${post.like.filter((like) => like.userId === user?.id).length > 0 && "text-green-500 bg-green-50"} hover:text-green-500 hover:bg-green-50 transition-colors px-2 py-1 rounded-md `}
                              >
                                <ThumbsUp
                                  size={18}
                                  strokeWidth={
                                    post.like.filter(
                                      (like) => like.userId === user?.id
                                    ).length > 0
                                      ? 3
                                      : 1
                                  }
                                />
                                <span>{post.like.length}</span>
                              </Button>

                              <Button
                                variant="ghost"
                                onClick={() =>
                                  handleDislike(post.id, user?.id || "")
                                }
                                className={`flex items-center gap-2 ${post.dislike.filter((dislike) => dislike.userId === user?.id).length > 0 && "text-orange-500 bg-orange-50"} hover:text-orange-500 hover:bg-orange-50 transition-colors px-2 py-1 rounded-md `}
                              >
                                <ThumbsDown
                                  size={18}
                                  strokeWidth={
                                    post.dislike.filter(
                                      (dislike) => dislike.userId === user?.id
                                    ).length > 0
                                      ? 3
                                      : 1
                                  }
                                />
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
