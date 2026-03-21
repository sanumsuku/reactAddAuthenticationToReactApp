import {useEffect} from 'react';
import { Outlet, useNavigation, useLoaderData, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { getTokenDuration } from '../util/Auth';

function RootLayout() {
  // const navigation = useNavigation();

  const isSignedIn = useLoaderData();
  const submit = useSubmit();

  useEffect(()=>{

    if(!isSignedIn){
      return;
    }

    const tokenDuration = getTokenDuration();
    if(tokenDuration < 0){
      return;
    }

    setTimeout(() => {
      submit(null,{
          action:'/logout',
          method: 'post'
      });
    }, 
    tokenDuration
    // 1 * 60 * 60 * 1000 // this will run after 1 hour
  );  
  },[isSignedIn,submit]);

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
