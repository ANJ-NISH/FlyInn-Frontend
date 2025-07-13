// import Cookies from 'js-cookie';
import { Navigate} from 'react-router-dom';

const ProtectedRoute=({children})=>
{
  
    let token=localStorage.getItem('signstate');
    token= token==="true";

    if(!token)
    {
        return <Navigate to='/signin' replace/>
    }

    return children;
}

export default ProtectedRoute;