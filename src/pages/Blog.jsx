import React, { useEffect } from "react";
import { Container, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import BlogList from "../components/UI/BlogList";
import { getBlogs } from "../api";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import Loading from "../components/Loading";

const Blog = () => {
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const { data, fetchNextPage, isLoading, isError, error } = useInfiniteQuery(
    ["blogs"],
    ({ pageParam = 1 }) => {
      return getBlogs(pageParam);
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
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);
  return (
    <Helmet title="Blogs">
      <CommonSection title="Blogs" />
      <section>
        <Container>
          <Row>
            {data?.pages?.map((vehicles) => {
              return <BlogList blogs={vehicles} />;
            })}
          </Row>
          {isLoading && <Loading />}
          <div ref={ref}></div>
        </Container>
      </section>
    </Helmet>
  );
};

export default Blog;
