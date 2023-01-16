import { format } from "date-fns";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../Context/AuthProvider";

const BookingModal = ({ treatment, setTreatment, selectedDate, refetch }) => {
  const { name: treatmentName, slots,price } = treatment; //treatment is appointment option, just differenct name
  const date = format(selectedDate, "PP");
  const {user}=useContext(AuthContext);

  const handleBooking=(e)=>{
    e.preventDefault();
    const form=e.target;
    const name=form.name.value;
    const email=form.email.value;
    const slot=form.slot.value;
    const phone=form.phone.value;
    console.log(date, slot, name, email, phone)
    const booking={
      selectedDate: date,
      treatment: treatmentName,
      patient: name,
      slot,
      email,
      phone,
      price


    }
    //TO DO: send data to the server and once data is saved the4n close the modal
    //and display success toast
    fetch('http://localhost:5000/bookings',{
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(booking)
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      if(data.acknowledged){
        setTreatment(null)
        toast.success('Booking Confirmed');
        refetch();
      }
      else{
        toast.error(data.message);
      }
     
    })
    

  }
  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{treatmentName}</h3>
          <form onSubmit={handleBooking} className="grid grid-cols-1 gap-3 mt-6">
            <input
              type="text"
              disabled
              value={date}
              className="input w-full input-bordered"
            />
            <select className="select select-bordered w-full" name="slot">
              {slots.map((slot,i)=><option
              key={i}
              value={slot}>{slot}</option>)
              }
            </select>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              defaultValue={user?.displayName}
              disabled
              className="input w-full input-bordered"
            />
            <input
              type="text"
              name="email"
              defaultValue={user?.email}
              placeholder="Email Address"
              className="input w-full input-bordered"
              disabled
            />
            <input
              type="text"
              name="phone"
              placeholder="phone number"
              className="input w-full input-bordered"
            />
            <br></br>
            <input
              className="btn w-full btn-accent"
              type="submit"
              value="submit"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
