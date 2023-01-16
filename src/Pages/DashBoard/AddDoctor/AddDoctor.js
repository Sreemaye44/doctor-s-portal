import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Loader from '../../Shared/Loader/Loader';

const AddDoctor = () => {
    const {register,handleSubmit, formState: {errors}}=useForm();
    const imagehostkey=process.env.REACT_APP_imgbb_key;
    const navigate=useNavigate();   


    const {data: specialties, isLoading}=useQuery({
        queryKey: ['specialty'],
        queryFn: async()=>{
            const res=await fetch('http://localhost:5000/appointmentSpecialty');
            const data=await res.json();
            return data;
        }
    })
    const handleAddDoctor=data=>{
        console.log(data);
        const image=data.image[0];
        const formData=new FormData();
        formData.append('image', image);
        const url=`https://api.imgbb.com/1/upload?key=${imagehostkey}`
        fetch(url,{
            method: 'POST',
            body: formData
        })
        .then(res=>res.json())
        .then(imgData=> {
            if(imgData.success){
                console.log(imgData.data.url);
                const doctor={
                    name: data.name,
                    email: data.email,
                    specialty: data.specialty,
                    image: imgData.data.url

                }
                //save doctor info to the db
                fetch('http://localhost:5000/doctors',{
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(doctor)

                })
                .then(res=>res.json())
                .then(result=>{
                    console.log(result);
                    toast.success(`${data.name} is added successfully`);
                    navigate('/dashboard/managedoctors')
                })
            }
        })

        
    }
    if(isLoading){
        return <Loader></Loader>
    }
    return (
        <div className='w-96 p-7'>
            <h2>Add a doctor</h2>
            <form onSubmit={handleSubmit(handleAddDoctor)}>

      <div className="form-control w-full max-w-xs">
  <label className="label"><span className="label-text">Name</span></label>
  <input type="text" {...register("name", {required: "Name is required"})} className="input input-bordered w-full max-w-xs"/>  
  {errors.name && <span className='text-red-600'>{errors.name.message}</span>}
</div>

      <div className="form-control w-full max-w-xs">
  <label className="label"><span className="label-text">Email</span></label>
  <input type="email" {...register("email", {required: true} )} className="input input-bordered w-full max-w-xs"/>  
  {errors.email && <span className='text-red-600'>{errors.email.message}</span>}
</div>



      <div className="form-control w-full max-w-xs">
  <label className="label"><span className="label-text">Specialty</span></label>
  <select {...register("specialty", {required: true} )} 
  className="select select-bordered mb-5 w-full max-w-xs">

  {
    specialties.map(specialty=><option key={specialty._id} value={specialty.name}>{specialty.name}</option>)
  }
 
</select>
   <div className="form-control w-full max-w-xs">
  <label className="label"><span className="label-text">Photo</span></label>
  <input type="file" {...register("image", {required: "Photo is required"})} className="input input-bordered w-full max-w-xs"/>  
  {errors.name && <span className='text-red-600'>{errors.name.message}</span>}
</div>
  
</div>
 
      <input className="btn btn-accent w-full" value='Add Doctor' type="submit" />
     
    </form>
        </div>
    );
};

export default AddDoctor;