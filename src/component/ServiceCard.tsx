import { useAuth } from "../auth/AuthProvider"
import { Service } from "../types"

//ito kailangan ko ayusin hhahahaha tangina ang bagal ko hahahaha
const ServiceCard = ({name, image, price} : Service) => {
  const {user} = useAuth()

  const imageSrc = `https://fvbewilwgybzglyrlqux.supabase.co/storage/v1/object/public/ContractCo_storage/images/${image}`;
  console.log("image source :", imageSrc)
  return (	
    
    <div>
      <div>{user?.name}</div>
      <div>{name}</div> 
      <div>{price}</div>
      
      <img src={imageSrc} alt="image" />
    </div>
  )
}

export default ServiceCard