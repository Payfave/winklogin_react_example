import { useEffect, useState } from 'react';

import { WinkLoginButton, WinkButton } from './winkButton/WinkButton';

import useWinkAuth from './hooks/useWinkAuth';

import './App.css';

const App: React.FC = () => {
  const [isNotSignedIn, setIsNotSignedIn] = useState<boolean>(true);

  const {
    winkLogin,
    winkLogout,
    winkRefreshToken,
    winkValidateToken,
    keycloakData,
    clientId,
    tokenData,
    tokenDataLoading,
  } = useWinkAuth();

  useEffect(() => {
    setIsNotSignedIn(keycloakData === undefined);
  }, [keycloakData]);

  useEffect(() => {
    !isNotSignedIn && winkValidateToken();
  }, [isNotSignedIn, winkValidateToken]);

  return (
    <div className='container'>
      <h1> Demo test with client: {clientId} </h1>
      {!isNotSignedIn ? (
        <div>
          <div style={{ padding: '16px' }}>
            <table>
              <tbody>
                <tr>
                  <td>Username (winkTag):</td>
                  <td>{keycloakData?.username}</td>
                </tr>
                <tr>
                  <td>Name (firstName):</td>
                  <td>{keycloakData?.name}</td>
                </tr>
                <tr>
                  <td>Surname (lastName):</td>
                  <td>{keycloakData?.surname}</td>
                </tr>
                <tr>
                  <td>Phone (contactNo):</td>
                  <td>{keycloakData?.phone}</td>
                </tr>
                <tr>
                  <td>Email (email):</td>
                  <td>{keycloakData?.email}</td>
                </tr>
                <tr>
                  <td>ID (identityId):</td>
                  <td>{keycloakData?.oid}</td>
                </tr>
                <tr>
                  <td>WinkToken:</td>
                  <td>{keycloakData?.sub}</td>
                </tr>
                <tr>
                  <td>Expiration date (Access Token):</td>
                  <td>{keycloakData?.access_token_exp}</td>
                </tr>
                <tr>
                  <td>Access Token:</td>
                  <td>
                    <textarea
                      rows={3}
                      readOnly
                      value={keycloakData?.access_token}
                    ></textarea>
                  </td>
                </tr>
                <tr>
                  <td>Parsed Access Token:</td>
                  <td>
                    <textarea
                      rows={12}
                      readOnly
                      value={JSON.stringify(
                        keycloakData?.access_token_parsed,
                        null,
                        4
                      )}
                    ></textarea>
                  </td>
                </tr>
                <tr>
                  <td>Expiration date (Refresh Token):</td>
                  <td>{keycloakData?.refresh_token_exp}</td>
                </tr>
                <tr>
                  <td>Refresh Token:</td>
                  <td>
                    <textarea
                      rows={3}
                      readOnly
                      value={keycloakData?.refresh_token}
                    ></textarea>
                  </td>
                </tr>
                <tr>
                  <td>Parsed Refresh Token:</td>
                  <td>
                    <textarea
                      rows={12}
                      readOnly
                      value={JSON.stringify(
                        keycloakData?.refresh_token_parsed,
                        null,
                        4
                      )}
                    ></textarea>
                  </td>
                </tr>
                <tr>
                  <td>Expiration date (ID Token):</td>
                  <td>{keycloakData?.id_token_exp}</td>
                </tr>
                <tr>
                  <td>ID Token:</td>
                  <td>
                    <textarea
                      rows={3}
                      readOnly
                      value={keycloakData?.id_token}
                    ></textarea>
                  </td>
                </tr>
                <tr>
                  <td>Parsed ID Token:</td>
                  <td>
                    <textarea
                      rows={12}
                      readOnly
                      value={JSON.stringify(
                        keycloakData?.id_token_parsed,
                        null,
                        4
                      )}
                    ></textarea>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <WinkLoginButton
            onClick={(): Promise<void> =>
              winkLogout({
                redirectUri: window.location.href,
              })
            }
            type='logout'
          />

          <WinkButton
            onClick={(): Promise<void> => winkRefreshToken()}
            text='Refresh token'
          />
        </div>
      ) : (
        <WinkLoginButton onClick={() => winkLogin({})} type='login' />
      )}

      <div>
        {tokenDataLoading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <span>Loading...</span>
          </div>
        ) : (
          !isNotSignedIn && (
            <>
              <p>FirstName: {tokenData?.firstName}</p>
              <p>LastName: {tokenData?.lastName}</p>
              <p>ContactNo: {tokenData?.contactNo}</p>
              <p>Email: {tokenData?.email}</p>
              <p>WinkTag: {tokenData?.winkTag}</p>
              <p>WinkToken: {tokenData?.winkToken}</p>
              <p>ExpiryTime: {tokenData?.expiryTime}</p>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default App;
