import {redirect} from "react-router-dom";
import AuthForm from '../components/AuthForm';
import { setAuthToken } from "../util/Auth";
function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export const action = async ({request}) => {

  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';

  if(mode!=='login' && mode!=='signup'){
    throw new Response({
      message: 'Unsupported Mode !!!!'
    }, {status:500});
  }

  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password')
  };

  const response = await fetch(
    'http://localhost:8080/' + mode,
    {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(authData)
    });

    // console.log(await response.json());

  if(response.status===422 || response.status===401){
    return response;
  }

  if(!response.ok){
    throw new Response({
      message: "Could not Authenticate User !!!!",
    }, {status:500});
  }

  const result = await response.json();
  if(result && result.token){
    setAuthToken(result.token);
    return redirect('/');
  }
  else{
    throw new Response({
      message: 'Auth Token..... Mooo..... !!!'
    }, {status:500});
  }
}