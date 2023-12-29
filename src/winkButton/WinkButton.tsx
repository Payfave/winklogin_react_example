import SemicolonImage from './semicolon-white.svg';

interface WinkButtonProps {
  onClick?: () => void;
  text?: string;
}
interface WinkLoginButtonProps extends WinkButtonProps {
  type: 'login' | 'logout';
}

const WinkLoginButton: React.FC<WinkLoginButtonProps> = ({ onClick, type }) => {
  return (
    <button
      id='wink-oauth-button'
      className='wink-oauth-button wink-oauth-button--primary button'
      onClick={onClick}
    >
      <img src={SemicolonImage} alt='Wink' />
      {type === 'login' ? 'Login with Wink' : 'Logout'}
    </button>
  );
};

const WinkButton: React.FC<WinkButtonProps> = ({ onClick, text }) => {
  return (
    <button
      id='wink-oauth-button'
      className='wink-oauth-button wink-oauth-button--primary button'
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export { WinkLoginButton, WinkButton };
