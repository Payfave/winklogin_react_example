import SemicolonImage from './semicolon-white.svg';

interface WinkLoginButtonProps {
  onClick?: () => void;
  type: 'login' | 'logout';
}

const WinkLoginButton: React.FC<WinkLoginButtonProps> = ({ onClick, type }) => {
  return (
    <button
      id='wink-oauth-button'
      className='wink-oauth-button wink-oauth-button--primary'
      onClick={onClick}
    >
      <img src={SemicolonImage} alt='Wink' />
      {type === 'login' ? 'Login with Wink' : 'Logout'}
    </button>
  );
};

export default WinkLoginButton;
