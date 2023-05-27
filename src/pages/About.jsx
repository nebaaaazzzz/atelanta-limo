import React from "react";

import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import AboutSection from "../components/UI/AboutSection";
import { Container, Row, Col } from "reactstrap";

import driveImg from "../assets/all-images/drive.jpg";
import "../styles/about.css";

const About = () => {
  return (
    <Helmet title="About">
      <CommonSection title="About Us" />
      <AboutSection aboutClass="aboutPage" />

      <section className="about__page-section">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12">
              <div className="about__page-img">
                <img src={driveImg} alt="" className="w-100 rounded-3" />
              </div>
            </Col>

            <Col lg="6" md="6" sm="12">
              <div className="about__page-content">
                <h2 className="section__title">
                  We Are Committed To Provide Safe Ride Solution
                </h2>

                <p className="section__description">
                  We Are Committed To Provide Safe Ride Solutions: Prioritizing
                  safety and comfort, our service boasts meticulously maintained
                  vehicles, rigorously trained chauffeurs, and advanced safety
                  features. Enjoy peace of mind knowing your journey is secure,
                  allowing you to relax and savor the luxurious experience with
                  confidence.
                </p>

                <p className="section__description">
                  Our dedication to safe ride solutions is unwavering, as we
                  consistently update and enforce safety protocols, adhere to
                  stringent vehicle maintenance standards, and provide ongoing
                  training for our chauffeurs. Rest assured, we prioritize your
                  well-being, ensuring you arrive at your destination with ease
                  and elegance.
                </p>

                <div className=" d-flex align-items-center gap-3 mt-4">
                  <span className="fs-4">
                    <i class="ri-phone-line"></i>
                  </span>

                  <div>
                    <h6 className="section__subtitle">Need Any Help?</h6>
                    <h4>+00123456789</h4>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

    </Helmet>
  );
};

export default About;
