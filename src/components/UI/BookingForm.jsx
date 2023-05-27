import React from "react";
import "../../styles/booking-form.css";
import { Form, FormGroup } from "reactstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { postReservation } from "../../api";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

const schema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required().email(),
    phoneNumber: yup.string().required(),
    fromAddress: yup.string().required(),
    toAddress: yup.string().required(),
    personCount: yup.number().required(),
    luggageCount: yup.number().required(),
    date: yup.date().required(),
    description: yup.string(),
    time: yup.string().required(),
  })
  .required();
const BookingForm = ({ id }) => {
  const mutation = useMutation("post-reservation", postReservation);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const submitHandler = (data) => {
    const dataClone = { ...data };
    const time = data.time.split(":");
    delete dataClone.date;
    delete dataClone.time;
    mutation.mutate({
      ...dataClone,
      journeyDate: new Date(new Date(data.date).setHours(time[0], time[1])),
      vehicleId: id,
    });
  };
  if (mutation.isSuccess) {
    toast("Reservation Successful", { type: "success" });
    mutation.reset();
    reset();
  }
  if (mutation.isLoading) {
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
  return (
    <Form onSubmit={handleSubmit(submitHandler)}>
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input
          {...register("firstName")}
          type="text"
          className={` ${errors.firstName ? "border-danger" : ""}`}
          placeholder="First Name"
        />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input
          {...register("lastName")}
          type="text"
          className={` ${errors.lastName ? "border-danger" : ""}`}
          placeholder="Last Name"
        />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input
          className={` ${errors.email ? "border-danger" : ""}`}
          {...register("email")}
          type="email"
          placeholder="Email"
        />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input
          className={` ${errors.phoneNumber ? "border-danger" : ""}`}
          {...register("phoneNumber")}
          type="tel"
          placeholder="Phone Number"
        />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input
          className={` ${errors.fromAddress ? "border-danger" : ""}`}
          {...register("fromAddress")}
          type="text"
          placeholder="from address"
        />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input
          type="text"
          className={` ${errors.toAddress ? "border-danger" : ""}`}
          {...register("toAddress")}
          placeholder="to address"
        />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input
          className={` ${errors.personCount ? "border-danger" : ""}`}
          {...register("personCount")}
          type="text"
          placeholder="person count"
        />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input
          className={` ${errors.luggageCount ? "border-danger" : ""}`}
          type="text"
          {...register("luggageCount")}
          placeholder="luggage count"
        />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input
          className={` ${errors.date ? "border-danger" : ""}`}
          type="date"
          {...register("date")}
          placeholder="Journey Date"
        />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input
          className={`time__picker ${errors.time ? "border-danger" : ""}`}
          type="time"
          {...register("time")}
          placeholder="Journey Time"
        />
      </FormGroup>

      <FormGroup>
        <textarea
          rows={5}
          className={`text_area ${errors.description ? " border-danger" : ""}`}
          {...register("description")}
          type="textarea"
          placeholder="Write"
        ></textarea>
      </FormGroup>
      <button className="bookbutton">Book Now</button>
    </Form>
  );
};

export default BookingForm;
