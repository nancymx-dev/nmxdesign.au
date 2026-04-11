import { animated, useSpring } from '@react-spring/web';
import { Link, useParams } from 'react-router-dom';

const ProjectPage = () => {
  const { projectId } = useParams();

  const animation = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
  });

  return (
    <animated.div style={animation} className="p-4 md:p-8 text-center">
      <h1 className="mb-4 font-pfMarlet text-4xl font-medium text-gray-700">
        Project: <span className="text-[#FF593E]">{projectId}</span>
      </h1>
      <p className="text-lg text-gray-600 mb-8">Coming soon!</p>
      <Link to="/case-studies" className="text-[#AAAADD] hover:underline font-bold">
        ← Back to Case Studies
      </Link>
    </animated.div>
  );
};

export default ProjectPage;
