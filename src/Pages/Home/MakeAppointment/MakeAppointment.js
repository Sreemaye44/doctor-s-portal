import React from "react";
import doctor from '../../../assets/images/doctor.png'
import appointment from '../../../assets/images/appointment.png'
import PrimaryButton from "../../../Components/PrimaryButton/PrimaryButton";

const MakeAppointment = () => {
  return (
    <section className="mt-32"
    style={{background:`url(${appointment})`}}
    >
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src={doctor}
            className=" hidden lg:w-1/2 lg:block md:block rounded-lg shadow-2xl -mt-32" alt=""
          />
          <div>
          <h4 className="text-primary text-lg font-bold ">Appointment</h4>
            <h1 className="text-4xl font-bold text-white">Make an Appointment Today</h1>
            <p className="py-6 text-white">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam officia repudiandae asperiores enim exercitationem possimus fuga facilis. Nulla amet facilis ab suscipit adipisci accusantium, necessitatibus culpa illum. Amet, laborum Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis odio perspiciatis quasi ducimus consequuntur ad ipsum 
            </p>
            <PrimaryButton>Appointment</PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MakeAppointment;
