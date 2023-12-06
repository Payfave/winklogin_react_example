/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactJson from 'react-json-view';
import WinkButton from './winkButton/WinkButton';
import useWinkAuth from './hooks/useWinkAuth';

import './App.css';

function App() {
  const { userData, winkClient } = useWinkAuth();

  return (
    <>
      {userData?.preferred_username ? (
        <>
          <h2 className='welcome-message'>
            Welcome {`${userData.preferred_username}`}
          </h2>
          <div className='json-view-container'>
            <ReactJson src={userData} theme='summerfruit' collapsed={false} />
          </div>

          <WinkButton
            onClick={() =>
              winkClient.winkLogout({
                onFailure: (error: any) => console.error(error),
              })
            }
            type='logout'
          />
        </>
      ) : (
        <WinkButton
          onClick={() =>
            winkClient.winkLogin({
              onFailure: (error: any) => console.error(error),
            })
          }
          type='login'
        />
      )}
    </>
  );
}

export default App;
