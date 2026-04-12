import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import Homepage from './Homepage.tsx';
import './index.css';
import CaseStudies from './CaseStudies.tsx';
import ProjectPage from './ProjectPage.tsx';
import Resume from './Resume.tsx';
import UplinkPage from './UplinkPage.tsx';
import JiraPlaybookPage from './JiraPlaybookPage.tsx';
import ApexWrappedPage from './ApexWrappedPage.tsx';
import Aboutme from './Aboutme.tsx';
import PortfolioRedirect from './PortfolioRedirect.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <Homepage /> },
      { path: 'aboutme', element: <Aboutme /> },
      { path: 'demo', element: <Navigate to="/case-studies" replace /> },
      { path: 'demos', element: <Navigate to="/case-studies" replace /> },

      { path: 'case-studies', element: <CaseStudies /> },
      { path: 'case-studies/uplinked', element: <UplinkPage /> },
      { path: 'case-studies/jiraplaybook', element: <JiraPlaybookPage /> },
      { path: 'case-studies/apex-wrapped', element: <ApexWrappedPage /> },
      { path: 'case-studies/apexwrapped', element: <Navigate to="/case-studies/apex-wrapped" replace /> },
      { path: 'case-studies/:projectId', element: <ProjectPage /> },

      // Legacy /case-study routes → redirect to /case-studies
      { path: 'case-study', element: <Navigate to="/case-studies" replace /> },
      { path: 'case-study/uplinked', element: <Navigate to="/case-studies/uplinked" replace /> },
      { path: 'case-study/jiraplaybook', element: <Navigate to="/case-studies/jiraplaybook" replace /> },
      { path: 'case-study/apex-wrapped', element: <Navigate to="/case-studies/apex-wrapped" replace /> },
      { path: 'case-study/apexwrapped', element: <Navigate to="/case-studies/apex-wrapped" replace /> },
      { path: 'case-study/:projectId', element: <PortfolioRedirect /> },

      // Legacy /portfolio routes → redirect to /case-studies
      { path: 'portfolio', element: <Navigate to="/case-studies" replace /> },
      { path: 'portfolio/uplinked', element: <Navigate to="/case-studies/uplinked" replace /> },
      { path: 'portfolio/apex-wrapped', element: <Navigate to="/case-studies/apex-wrapped" replace /> },
      { path: 'portfolio/apexwrapped', element: <Navigate to="/case-studies/apex-wrapped" replace /> },
      {
        path: 'portfolio/jiraplaybook',
        element: <Navigate to="/case-studies/jiraplaybook" replace />,
      },
      { path: 'portfolio/:projectId', element: <PortfolioRedirect /> },

      { path: 'resume', element: <Resume /> },
    ],
  },
]);

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  );
} else {
  console.error('Failed to find the root element');
}
