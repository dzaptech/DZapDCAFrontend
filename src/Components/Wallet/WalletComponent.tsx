import { message } from 'antd';
import { useContext, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useSelector } from 'react-redux';
import copy from '../../Assets/Icons/copy.svg';
import disconnect from '../../Assets/Icons/disconnect.svg';
import explorer from '../../Assets/Icons/explorer.svg';
import metamaskGlow from '../../Assets/Icons/metamask-glow.svg';
import wallet from '../../Assets/Icons/wallet.svg';
import { METAMASK } from '../../Constants/AppConstants';
import AuthContext from '../../Context/AuthContext';
import { RootState } from '../../Store';
import {
  getAddressExplorerLink,
  getChainInfoValue,
  shortAddress,
} from '../../Utils/ChainUtils';

function WalletComponent() {
  const { handleNetwork, chainId } = useContext(AuthContext);
  const { nativeCurrencyInfo } = useSelector(
    (state: RootState) => state.common,
  );
  const { balance } = nativeCurrencyInfo;
  const [showWalletInfo, setShowWalletInfo] = useState(false);
  const { account } = useContext(AuthContext);

  const walletConnector = localStorage.getItem('walletConnector');
  return (
    <div>
      {account ? (
        <div className="relative wallet_connected_parent">
          <button
            type="button"
            onClick={() => {
              setShowWalletInfo(!showWalletInfo);
            }}
          >
            <div className="wallet_connected h-full flex justify-center items-center gap-x-3">
              <div className="h-4 w-4">
                <img
                  src={walletConnector === METAMASK ? metamaskGlow : wallet}
                  className="h-4 w-4 object-contain"
                  alt="token"
                />
              </div>
              <div className="wallet_connected_address h-full ml-0.5 flex justify-center items-center">
                <p>{shortAddress(account)}</p>
              </div>
            </div>
          </button>
          {showWalletInfo && (
            <div className="absolute wallet_connected_box z-10">
              <div className="wallet_connected_box_inner flex flex-col justify-between">
                <div className="flex w-full justify-between items-center">
                  <div className="flex items-center gap-x-3">
                    <div className="wallet_connected_box_inner_address px-8 flex justify-center items-center">
                      <p>{shortAddress(account)}</p>
                    </div>
                    <CopyToClipboard
                      text={account}
                      onCopy={() => {
                        message.success({
                          content: 'Copied!',
                        });
                      }}
                    >
                      <img
                        src={copy}
                        alt="copy"
                        className="w-3 h-3 object-contain"
                      />
                    </CopyToClipboard>
                    <button
                      type="button"
                      onClick={() => {
                        window.open(
                          getAddressExplorerLink(account || '', chainId),
                          '_blank',
                        );
                      }}
                    >
                      <img
                        src={explorer}
                        alt="explorer"
                        className="w-3 h-3 object-contain"
                      />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      handleNetwork();
                      setShowWalletInfo(false);
                    }}
                  >
                    <img
                      src={disconnect}
                      alt="disconnect"
                      className="w-6 h-6 object-contain"
                    />
                  </button>
                </div>
                <div className="flex items-center gap-x-3">
                  {/* <img
                    src={clock}
                    alt="transactions"
                    className="w-6 h-6 object-contain"
                  /> */}
                  <p className="wallet_connected_box_inner_trx">
                    {balance} {getChainInfoValue(chainId, 'symbol')}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => {
            handleNetwork();
          }}
          className="header_right_btn_connect flex justify-center items-center metamask_glow"
        >
          <img src={wallet} alt="metamask" />
          <p> CONNECT </p>
        </button>
      )}
    </div>
  );
}
export default WalletComponent;
