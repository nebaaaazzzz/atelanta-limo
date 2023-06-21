import React, { useEffect } from "react";

import carData from "../assets/data/carData";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useParams } from "react-router-dom";
import BookingForm from "../components/UI/BookingForm";
import { BASE_URL, getVehicle } from "../api";
import { useQuery } from "react-query";

const CarDetails = () => {
  const { slug } = useParams();
  // const blog = blogData.find((blog) => blog.title === slug);
  const { data, isLoading, isError } = useQuery(["vehicle", slug], () =>
    getVehicle(slug)
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [data]);
  if (isError) return null;
  if (isLoading)
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
          <span className="visually-hidden">Loading....</span>
        </div>
      </div>
    );

  return (
    <Helmet title={data.name}>
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <img
                src={data.img}
                style={{ aspectRatio: "1/1", objectFit: "contain" }}
                alt=""
                className="w-100"
              />
            </Col>

            <Col lg="6">
              <div className="car__info">
                <h2 className="section__title">{data.name}</h2>

                

                <p className="section__description">{data.description}</p>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "4rem" }}
                >
                 

                  

                 
                </div>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "2.8rem" }}
                >
                 
                </div>
              </div>
            </Col>

            <Col lg="7" className="mt-5">
              <div className="booking-info mt-5">
                <h5 className="mb-4 fw-bold ">Booking Information</h5>
                <BookingForm id={slug} />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarDetails;
