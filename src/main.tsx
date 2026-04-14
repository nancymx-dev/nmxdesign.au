import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import Homepage from './Homepage.tsx';
import './index.css';
import Resume from './Resume.tsx';
import Aboutme from './Aboutme.tsx';
import PortfolioRedirect from './PortfolioRedirect.tsx';
import MODCCaseStudyPage from './case-studies/modc/MODCCaseStudyPage.tsx';

const CaseStudies = lazy(() => import('./CaseStudies.tsx'));
const ProjectPage = lazy(() => import('./ProjectPage.tsx'));
const UplinkPage = lazy(() => import('./UplinkPage.tsx'));
const JiraPlaybookPage = lazy(() => import('./JiraPlaybookPage.tsx'));
const ApexWrappedPage = lazy(() => import('./ApexWrappedPage.tsx'));

const routeFallback = (
  <div className="flex min-h-[40vh] items-center justify-center bg-[#FFF6ED] px-6 text-center text-lg text-gray-600">
    Loading…
  </div>
);

const withSuspense = (element: React.ReactNode) => (
  <Suspense fallback={routeFallback}>{element}</Suspense>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <Homepage /> },
      { path: 'aboutme', element: <Aboutme /> },
      { path: 'demo', element: <Navigate to="/case-studies" replace /> },
      { path: 'demos', element: <Navigate to="/case-studies" replace /> },

      { path: 'case-studies', element: withSuspense(<CaseStudies />) },
      { path: 'case-studies/uplinked', element: withSuspense(<UplinkPage />) },
      { path: 'case-studies/jiraplaybook', element: withSuspense(<JiraPlaybookPage />) },
      { path: 'case-studies/apex-wrapped', element: withSuspense(<ApexWrappedPage />) },
      { path: 'case-studies/modc', element: withSuspense(<MODCCaseStudyPage />) },
      { path: 'case-studies/apexwrapped', element: <Navigate to="/case-studies/apex-wrapped" replace /> },
      { path: 'case-studies/:projectId', element: withSuspense(<ProjectPage />) },

      // Legacy /case-study routes → redirect to /case-studies
      { path: 'case-study', element: <Navigate to="/case-studies" replace /> },
      { path: 'case-study/uplinked', element: <Navigate to="/case-studies/uplinked" replace /> },
      { path: 'case-study/jiraplaybook', element: <Navigate to="/case-studies/jiraplaybook" replace /> },
      { path: 'case-study/apex-wrapped', element: <Navigate to="/case-studies/apex-wrapped" replace /> },
      { path: 'case-study/modc', element: <Navigate to="/case-studies/modc" replace /> },
      { path: 'case-study/apexwrapped', element: <Navigate to="/case-studies/apex-wrapped" replace /> },
      { path: 'case-study/:projectId', element: <PortfolioRedirect /> },

      // Legacy /portfolio routes → redirect to /case-studies
      { path: 'portfolio', element: <Navigate to="/case-studies" replace /> },
      { path: 'portfolio/uplinked', element: <Navigate to="/case-studies/uplinked" replace /> },
      { path: 'portfolio/apex-wrapped', element: <Navigate to="/case-studies/apex-wrapped" replace /> },
      { path: 'portfolio/modc', element: <Navigate to="/case-studies/modc" replace /> },
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
