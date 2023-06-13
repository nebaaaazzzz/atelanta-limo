import { Link } from "react-router-dom";
import { Container, Row, Col, FormGroup, Input } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import "../styles/contact.css";
import { contactFormMail } from "../api";

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
    icon: "ri-twitter-line",
  },
];

const Contact = () => {
  const form = useRef();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const sendEmail = async (e) => {
    e.preventDefault();
    await contactFormMail({ name, email, phone, message });
    // emailjs
    //   .sendForm(
    //     "service_er3t4rd",
    //     "template_l8ral8f",
    //     form.current,
    //     "jCA_n2fcS5PuK4pQb"
    //   )
    //   .then(
    //     (result) => {
    //       console.log(result.text);
    //
    //     },
    //     (error) => {
    //       alert(
    //         "Sorry, your message could not be sent. Please try again later."
    //       );
    //     }
    //   );
    toast.success("Message sent, We will contact you shortly", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
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
                  <Input
                    value={name}
                    placeholder="Your Name"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    type="text"
                    name="user_name"
                  />
                </FormGroup>
                <FormGroup className="contact__form">
                  <Input
                    value={email}
                    placeholder="Email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    type="email"
                    name="user_email"
                  />
                </FormGroup>
                <FormGroup
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  className="contact__form"
                >
                  <Input placeholder="Phone" type="text" name="user_phone" />
                </FormGroup>
                <FormGroup className="contact__form">
                  <textarea
                    rows="5"
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                    placeholder="Message"
                    className="text_area"
                    name="message"
                  ></textarea>
                </FormGroup>
                <input className="contact__btn" type="submit" value="Send" />
              </form>
            </Col>

            <Col lg="5" md="5">
              <div className="contact__info">
                <h6 className="fw-bold">Contact Information</h6>
                <p className="section__description mb-0">
                  {/* 123 ZindaBazar, Sylhet, Bangladesh */} Working Area
                  country
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
