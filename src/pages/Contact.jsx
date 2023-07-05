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
  
    // Only proceed if all fields are filled in
    if (name !== "" && email !== "" && phone !== "" && message !== "") {
      try {
        await contactFormMail({ name, email, phone, message });
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
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } catch (error) {
        // Handle any errors from contactFormMail
        toast.error("An error occurred while trying to send your message. Please try again.", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
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
                    required
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
                    required
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
                  required
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  className="contact__form"
                >
                  <Input required placeholder="Phone" type="text" name="user_phone" />
                </FormGroup>
                <FormGroup  required className="contact__form">
                  <textarea
                  required
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

            
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Contact;


