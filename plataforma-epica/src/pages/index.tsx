// pages/index.tsx
import withAuth from '../components/withAuth';

const Home = () => {
  return <div>Bienvenido a la Plataforma Épica</div>;
};

export default withAuth(Home);
