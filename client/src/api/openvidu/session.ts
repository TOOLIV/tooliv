import { openviduInstance } from 'services/openviduInstance';

export const createToken = (sessionId: string) => {
  const data = {};
  return new Promise(async (resolve, reject) => {
    await openviduInstance
      .post(`/openvidu/api/sessions/${sessionId}/connection`, data)
      .then((response) => {
        console.log('TOKEN', response);
        resolve(response.data.token);
      })
      .catch((error) => reject(error));
  });
};

export const getSession = (sessionId: string) => {
  return new Promise(async (resolve, reject) => {
    await openviduInstance
      .get(`/openvidu/api/sessions/${sessionId}`)
      .then((response) => {
        console.log('GET SESSION', response);
        resolve(response);
      })
      .catch((e) => {
        const err = Object.assign({}, e);
      });
  });
};

export const createSession = (sessionId: string) => {
  const data = JSON.stringify({ customSessionId: sessionId });
  console.log(data);
  return new Promise(async (resolve, reject) => {
    await openviduInstance
      .post(`/openvidu/api/sessions`, data)
      .then((response) => {
        console.log('CREATE SESSION', response);
        resolve(response.data.id);
      })
      .catch((response) => {
        const err = Object.assign({}, response);
        if (err?.response?.status === 409) {
          resolve(sessionId);
        } else {
          console.log(err);
          console.warn(
            'No connection to OpenVidu Server. This may be a certificate error at ' +
              process.env.REACT_APP_OPENVIDU_SERVER_URL
          );
          if (
            window.confirm(
              'No connection to OpenVidu Server. This may be a certificate error at "' +
                process.env.REACT_APP_OPENVIDU_SERVER_URL +
                '"\n\nClick OK to navigate and accept it. ' +
                'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                process.env.REACT_APP_OPENVIDU_SERVER_URL +
                '"'
            )
          ) {
            window.location.assign(
              process.env.REACT_APP_OPENVIDU_SERVER_URL + '/accept-certificate'
            );
          }
        }
      });
  });
};
