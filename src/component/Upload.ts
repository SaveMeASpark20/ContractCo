
import { createClient } from '@supabase/supabase-js';

import { v4 as uuidv4 } from 'uuid';

async function UploadFile(file : File , path :string ) {

  
  const supabase = createClient(import.meta.env.VITE_SUPABASEURL, import.meta.env.VITE_SUPABASEKEY)
  const unique_identifier = uuidv4()
  const file_path = `${path}/${unique_identifier}`

  // Upload file using standard upload
  
    const { data, error } = await supabase.storage.from('ContractCo_storage').upload(file_path, file)
    if (error) {
      console.log(error.message);
      return(error.message);
    } else {
      console.log(data);
      return data.id;
    }
    

}

export default UploadFile;