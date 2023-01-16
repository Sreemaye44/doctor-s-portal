import React from 'react';
import fluoride from '../../../../assets/images/fluoride.png'
import cavity from '../../../../assets/images/cavity.png'
import whitening from '../../../../assets/images/whitening.png'
import Service from './Service';

const Services = () => {
    const servicesData=[
        {
            id: 1,
            name: 'Fluoride Treatment',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ipsum mollitia aliquid vel hic amet enim sed sit, suscipit, commodi facere est quaerat odit nemo explicabo nostrum doloremque accusantium at.',
            img: fluoride
        },
        {
            id: 2,
            name: 'Cavity Filling',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ipsum mollitia aliquid vel hic amet enim sed sit, suscipit, commodi facere est quaerat odit nemo explicabo nostrum doloremque accusantium at.',
            img: cavity
        },
        {
            id: 3,
            name: 'Teeth Whitening',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ipsum mollitia aliquid vel hic amet enim sed sit, suscipit, commodi facere est quaerat odit nemo explicabo nostrum doloremque accusantium at.',
            img: whitening
        }
    ]

    return (
        <div className='mt-16'>
        <div className='text-center'>
            <h3 className='text-primary font-xl font-bold'>Our Services</h3>
            <h2 className='font-3xl'>Services we Provide</h2>

        </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {
                    servicesData.map(service=><Service
                    key={service.id}
                    service={service}
                    ></Service>)
                }
            </div>
        </div>
    );
};

export default Services;