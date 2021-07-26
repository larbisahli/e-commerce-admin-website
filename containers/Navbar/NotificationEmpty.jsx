import { CartHeader, NoResultsContainer, NoResultsWrapper } from './styles';

const NotificationEmpty = () => {
  return (
    <NoResultsContainer>
      <NoResultsWrapper>
        <CartHeader>There is no notifications</CartHeader>
        <div
          style={{ width: '50%', background: '#d8d8d8' }}
          className="separator"
        ></div>
        <span>We will make sure to notify you when something happens</span>
      </NoResultsWrapper>
    </NoResultsContainer>
  );
};

export default NotificationEmpty;
