import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useEffect } from "react";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";

import { useParams } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";

import commentImg from "../assets/all-images/ava-1.jpg";

import "../styles/blog-details.css";
import {
  QueryErrorResetBoundary,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { BASE_URL, getBlog, getComments, postComment } from "../api.js";
import moment from "moment";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const BlogDetails = () => {
  const { slug } = useParams();
  // const blog = blogData.find((blog) => blog.title === slug);
  const { data, isLoading, isError } = useQuery(["blog", slug], () =>
    getBlog(slug)
  );
  const {
    data: commentData,
    fetchNextPage: fetchCommentNextPage,
    isLoading: isCommentLoading,
    isError: isCommentError,
    hasNextPage: commentHasNextPage,
    error: commentError,
  } = useInfiniteQuery(
    ["comments", slug],
    ({ pageParam = 1 }) => {
      return getComments(slug, pageParam);
    },
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length) {
          return pages.length + 1;
        }
      },
    }
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [data]);
  if (isError) return null;
  if (isLoading) return <Loading />;
  return (
    <Helmet title={data.title}>
      <section>
        <Container>
          <Row>
            <Col lg="8" md="8">
              <div className="blog__details">
                <img
                  src={data.img}
                  alt=""
                  className="w-100"
                  style={{ aspectRatio: "1/1", objectFit: "contain" }}
                />
                <h2 className="section__title mt-4">{data.title}</h2>

                <div className="blog__publisher d-flex align-items-center gap-4 mb-4">
                  <span className="blog__author">
                    <i class="ri-user-line"></i> {data?.user?.firstName}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i class="ri-calendar-line"></i>{" "}
                    {moment(data.createdAt).format("D MMM , YYYY")}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i class="ri-time-line"></i>{" "}
                    {moment(data.createdAt).format("HH : mm a")}
                  </span>
                </div>

                <p className="section__description">{data.content}</p>
              </div>

              {/* <div className="comment__list mt-5">
                <h4 className="mb-5">Comments</h4>
                {commentData?.pages?.map((comments) => {
                  return comments.map((comment) => {
                    return <Comment data={comment} />;
                  });
                })}
                {isCommentLoading && <Loading />}
                {commentHasNextPage && (
                  <button
                    onClick={() => fetchCommentNextPage()}
                    className="btn btn-primary"
                  >
                    Load more
                  </button>
                )}
                {/* =============== comment form ============ */}
                {/* <CommentForm id={data.id} />
              </div> */} *
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};
function Comment({ data }) {
  return (
    <div className="single__comment d-flex gap-3">
      <div className="comment__content">
        <h6 className=" fw-bold">{data.fullName}</h6>
        <p className="section__description mb-0">
          {" "}
          {moment(data.createdAt).format("HH : mm a")}
        </p>
        <p className="section__description">{data.comment}</p>
      </div>
    </div>
  );
}
export const commentPostSchema = yup
  .object({
    fullName: yup.string().required(),
    email: yup.string().email().required(),
    comment: yup.string().required(),
  })
  .required();
function CommentForm({ id }) {
  const queryClient = useQueryClient();
  const mutation = useMutation("blog-comment", postComment);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      comment: "",
    },
    resolver: yupResolver(commentPostSchema),
  });
  const onSubmit = (data) => {
    mutation.mutate({ ...data, blogId: id });
  };
  if (mutation.isLoading) {
    return <Loading />;
  }
  if (mutation.isSuccess) {
    (async () => {
      await queryClient.invalidateQueries(["comments", id]);
    })();
    toast("Comment added successfully", { type: "success" });
    mutation.reset();
    reset();
  }
  return (
    <div className="leave__comment-form mt-5">
      <h4>Leave a Comment</h4>
      <p className="section__description">
        You must sign-in to make or comment a post
      </p>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup className=" d-flex gap-3">
          <input
            innerRef={register("fullName")["ref"]}
            {...register("fullName")}
            type="text"
            className={`form-control ${errors.fullName && "border-danger"}`}
            placeholder="Full name"
          />
          <input
            className={`form-control ${errors.email && "border-danger"}`}
            {...register("email")}
            type="email"
            placeholder="Email"
          />
        </FormGroup>

        <FormGroup>
          <textarea
            rows="5"
            {...register("comment")}
            className={`w-100 py-2 px-3 ${errors.comment && "border-danger"}`}
            placeholder="Comment..."
          ></textarea>
        </FormGroup>

        <button className="btn comment__btn mt-3">Post a Comment</button>
      </Form>
    </div>
  );
}
function Loading() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        aspectRatio: "3 / 1",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="spinner-border spinner-border-lg text-primary"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
export default BlogDetails;
