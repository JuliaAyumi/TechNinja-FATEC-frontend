import Sidebar from '@ui/components/Sidebar/Sidebar';
import HeaderHome from '@ui/layout/HeaderHome/HeaderHome';
import HeaderArrowBack from '@ui/layout/HeaderArrowBack/HeaderArrowBack';
import useMediaQuery from '@hooks/UseMediaQuery';

const PageLayout = ({ children, backTo, showHome = false }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const renderHeader = () => {
    if (isMobile) {
      return showHome ? <HeaderHome /> : <HeaderArrowBack to={backTo} />;
    }
    return <Sidebar to={backTo} />;
  };

  return (
    <div>
      {renderHeader()}
      {children}
    </div>
  );
};

export default PageLayout;
