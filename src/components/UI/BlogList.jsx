import React from "react";
import { Col } from "reactstrap";
import "../../styles/blog-item.css";
import { Link } from "react-router-dom";
import moment from "moment";
const BlogList = ({ blogs }) => {
  return (
    <>
      {blogs?.map((item) => (
        <BlogItem item={item} key={item.id} />
      ))}
    </>
  );
};

const BlogItem = ({ item }) => {
  const {
    img,
    title,
    user: { firstName },
    createdAt,
    content,
    id,
  } = item;
  
  return (
    <Col lg="4" md="6" sm="6" className="mb-5">
      <div
        className="blog__item"
        style={{
          wordBreak: "break-word",
          textOverflow: "ellipsis",
        }}
      >   
     
         <img src={img} alt="image is not loadin" className="w-100" /> 
        <div className="blog__info p-3">
          <Link to={`/blogs/${id}`}  className="blog__title">
            {title}
          </Link>
          <p className="section__description mt-3">
            {content.length > 100 ? content.substr(0, 100) : content}
          </p>

          <Link to={`/blogs/${id}`} className="read__more">
            Read More
          </Link>

          <div className="blog__time pt-3 mt-3 d-flex align-items-center justify-content-between">
            <span className="blog__author">
              <i class="ri-user-line"></i> {firstName}
            </span>

            <div className=" d-flex align-items-center gap-3">
              <span className=" d-flex align-items-center gap-1 section__description">
                <i class="ri-calendar-line"></i>{" "}
                {moment(createdAt).format("D MMM , YYYY")}
                {/* 19 april, 2023 */}
              </span>

              <span className=" d-flex align-items-center gap-1 section__description">
                <i class="ri-time-line"></i>{" "}
                {moment(createdAt).format("HH : mm a")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default BlogList;