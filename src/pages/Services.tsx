import { useEffect, useState } from 'react'
import PostService from '../component/PostService';
import ServiceCard from '../component/ServiceCard';
import { Service } from '../types';



const Services = () => {

  const [services, setServices] = useState<Service[]>([]);        

    useEffect(() => {
        const getMyServices = async () => {

          try { 
            console.log("nag aano ba dito?");
            const response = await fetch('http://localhost:3000/api/servicebyid', {
              credentials : "include"
            });
            
            if(response.ok) {
              const data = await response.json();
              console.log(data);
              setServices(data);
              
            }
          } catch (error : any) {
            console.log(error.message);
          }
        }
        getMyServices();
    },[])

    useEffect(() => {
      console.log("Updated services:", services);
    }, [services]); 

  return (
    <>

    <PostService/>

    {services && services.map((service, index)=> {
      return(
        <ServiceCard key={index} 
          name={service.name}
          image={service.image}
          price={service.price}
        />
      )
    })}
    </>
  )
}

export default Services