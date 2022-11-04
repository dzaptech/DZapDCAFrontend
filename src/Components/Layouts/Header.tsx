import { useContext } from 'react';
import logo from '../../Assets/Logo/dzap.svg';
import AuthContext from '../../Context/AuthContext';
import SupportedChainList from '../Wallet/SupportedChainList';
import WalletComponent from '../Wallet/WalletComponent';

function Header() {
  const { account } = useContext(AuthContext);
  return (
    <div className="w-full header lg:px-24">
      <div className="pl-8 pr-5 flex h-full justify-between items-center main_page m-auto">
        <div className="flex items-center gap-x-3">
          <a href="/">
            <img src={logo} alt="logo" />
          </a>
        </div>
        <div className="flex justify-center items-center gap-x-3">
          <div className="md:block hidden">
            {' '}
            {account && <SupportedChainList position="top" shade="dark" />}
          </div>
          <WalletComponent />
        </div>
      </div>
    </div>
  );
}
export default Header;
