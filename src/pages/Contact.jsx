import { Link } from "react-router-dom";
import { Container, Row, Col, FormGroup, Input } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

import "../styles/contact.css";

const socialLinks = [
  {
    url: "#",
    icon: "ri-facebook-line",
  },
  {
    url: "#",
    icon: "ri-instagram-line",
  },
  {
    url: "#",
    icon: "ri-linkedin-line",
  },
  {
    url: "#",
    icon: "ri-twitter-line",
  },
];

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_er3t4rd",
        "template_l8ral8f",
        form.current,
        "jCA_n2fcS5PuK4pQb"
      )
      .then(
        (result) => {
          console.log(result.text);
          toast.success("Message sent, We will contact you shortly", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        },
        (error) => {
          alert(
            "Sorry, your message could not be sent. Please try again later."
          );
        }
      );
    form.current.reset();
  };

  return (
    <Helmet title="Contact">
      <CommonSection title="Contact" />
      <section>
        <Container>
          <Row>
            <Col lg="7" md="7">
              <h6 className="fw-bold mb-4">Get In Touch</h6>
              <form ref={form} onSubmit={sendEmail}>
                <FormGroup className="contact__form">
                  <Input placeholder="Your Name" type="text" name="user_name" />
                </FormGroup>
                <FormGroup className="contact__form">
                  <Input placeholder="Email" type="email" name="user_email" />
                </FormGroup>

                <FormGroup className="contact__form">
                  <Input placeholder="Phone number" type="text" name="Phone number" />
                </FormGroup>
                <FormGroup className="contact__form">
                  <textarea
                    rows="5"
                    placeholder="Message"
                    className="text_area"
                    name="message"
                  ></textarea>
                </FormGroup>
                <input className="contact__btn" type="submit" value="Send" />
              </form>

              {/* <form ref={form} onSubmit={sendEmail}>
      
      <input type="text" name="user_name"  />
      
      <input type="email" name="user_email" />
     
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form> */}
              {/* <FormGroup className="contact__form">
                  <Input placeholder="Your Name" type="text"  name="user_name"/>
                </FormGroup>
                <FormGroup className="contact__form">
                  <Input placeholder="Email" type="email" name="user_email" />
                </FormGroup>
                <FormGroup className="contact__form">
                  <textarea
                    rows="5"
                    placeholder="Message"
                    className=""
                    name="message"
                  ></textarea>
                </FormGroup>
                <input type="submit" value="Send" /> */}
            </Col>

            <Col lg="5" md="5">
              <div className="contact__info">
                <h6 className="fw-bold">Contact Information</h6>
                <p className="section__description mb-0">
                  {/* 123 ZindaBazar, Sylhet, Bangladesh */} Working Area country
                </p>
                <div className=" d-flex align-items-center gap-2">
                  <h6 className="fs-6 mb-0">Phone:</h6>
                  <p className="section__description mb-0">+8868389636</p>
                </div>

                <div className=" d-flex align-items-center gap-2">
                  <h6 className="mb-0 fs-6">Email:</h6>
                  <p className="section__description mb-0">examp@gmail.com</p>
                </div>

                <h6 className="fw-bold mt-4">Follow Us</h6>

                <div className=" d-flex align-items-center gap-4 mt-3">
                  {socialLinks.map((item, index) => (
                    <Link
                      to={item.url}
                      key={index}
                      className="social__link-icon"
                    >
                      <i class={item.icon}></i>
                    </Link>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Contact;
