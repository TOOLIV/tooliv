import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isLoginState } from 'recoil/auth';

type privateRouteTypes = {
  outlet: JSX.Element;
  fallback: string;
};
const PrivateRoute = ({ fallback, outlet }: privateRouteTypes) => {
  const isLogined = useRecoilValue(isLoginState);

  if (!isLogined) {
    return <Navigate to={`/${fallback}`} />;
  }

  return outlet;
};

export default PrivateRoute;
