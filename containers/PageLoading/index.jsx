import DropGala from '@/components/svg/DropGala';

import { Container, Wrapper } from './styles';

const PageLoading = () => {
  return (
    <Container>
      <Wrapper>
        <div className="loader-container">
          <div className="loader-wrapper">
            <div className="circle">
              <div className="inner"></div>
            </div>
            <div className="circle">
              <div className="inner"></div>
            </div>
            <div className="circle">
              <div className="inner"></div>
            </div>
            <div className="circle">
              <div className="inner"></div>
            </div>
            <div className="circle">
              <div className="inner"></div>
            </div>
          </div>
        </div>
        <DropGala width={100} height={100} />
      </Wrapper>
    </Container>
  );
};

export default PageLoading;
