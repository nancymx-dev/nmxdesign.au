import { Navigate, useParams } from 'react-router-dom';

function PortfolioRedirect() {
  const { projectId } = useParams();

  return <Navigate to={`/case-studies/${projectId ?? ''}`} replace />;
}

export default PortfolioRedirect;
