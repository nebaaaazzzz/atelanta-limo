import React, { useEffect } from "react";
import { Container, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import carData from "../assets/data/carData";
import { useInView } from "react-intersection-observer";
import { getVehicles } from "../api";
import { useInfiniteQuery } from "react-query";

const CarListing = () => {
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const { data, fetchNextPage, isLoading, isError, error } = useInfiniteQuery(
    ["vehicles"],
    ({ pageParam = 1 }) => {
      return getVehicles(pageParam);
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
    <Helmet title="Cars">
      <CommonSection title="Car Listing" />

      <section>
        <Container>
          <Row>
            {data?.pages?.map((vehicles) => {
              return vehicles?.map((vehicle) => {
                return <CarItem item={vehicle} key={vehicle.id} />;
              });
            })}
          </Row>
          {isLoading && (
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
          )}
          <div ref={ref}></div>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
