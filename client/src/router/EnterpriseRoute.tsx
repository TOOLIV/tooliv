import { Navigate } from 'react-router-dom';

type privateRouteTypes = {
  outlet: JSX.Element;
  fallback: string;
};
const EnterpriseRoute = ({ fallback, outlet }: privateRouteTypes) => {
  const isEnterprise = localStorage.getItem('baseURL') ? true : false;
  if (!isEnterprise) {
    return <Navigate to={`/${fallback}`} />;
  }

  return outlet;
};

export default EnterpriseRoute;
