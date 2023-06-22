import React from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/car-item.css";
import { BASE_URL } from "../../api";

const CarItem = (props) => {
  //TODO ADD  SPEED AND AUTOMATIC
  const { img, model, pricePerDay, automatic, name, speed, id } = props.item;

  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div className="car__item">
        <div className="car__img">
          <img src={img} alt="" className="w-100" />
        </div>

        <div className="car__item-content mt-4">
          <h4 className="section__title" >{name}</h4> 
          <div className="car__item-info d-flex  justify-content-between mt-3 mb-4">
            <h1 >Price Per Day : {pricePerDay}$</h1>
            
          </div>

          <button
             className="w-50 car__item-btn car__btn-details"
             onClick={(e) => {
             e.preventDefault();
             window.location.href = `/cars/${id}`;
            }}>
              <Link to={`/cars/${id}`} className="car__link">
                Book Now
              </Link>
            </button>

        </div>
      </div>
    </Col>
  );
};

export default CarItem;
