import { Modal } from 'antd';
import arrow from '../../Assets/Icons/arrow-sign.svg';
import logoEthereum from '../../Assets/Icons/ethereum.svg';
import walletGlow from '../../Assets/Icons/wallet-glow.svg';
import SupportedChainList from './SupportedChainList';

function UnsupportedChainModal() {
  return (
    <div className="h-screen modal_main_blur_bg w-full m-auto flex justify-center items-center fixed z-10 top-0 right-0 left-0">
      <Modal
        centered
        width={436}
        visible
        footer={null}
        // onCancel={() => {
        //   dispatch(networkSwitchModalHandler(!networkSwitchModal));
        // }}
      >
        <div className="pt-4 px-7 pb-12 unsupported_chain">
          {/* <div className="flex justify-end items-center">
            <button
              onClick={() => {
                dispatch(networkSwitchModalHandler(!networkSwitchModal));
              }}
              type="button"
              className="text-xl text-white"
            >
              &#x2715;
            </button>
          </div> */}
          <div className="unsupported_chain_flow gap-x-6">
            <img
              src={walletGlow}
              className="w-12 h-12 object-contain"
              alt="wallet"
            />
            <div className="flex justify-center items-center">
              <img src={arrow} alt="arrow" className="mx-1" />
              <img src={arrow} alt="arrow" className="mx-1" />
              <img src={arrow} alt="arrow" className="mx-1" />
            </div>
            <img
              src={logoEthereum}
              className="w-12 h-12 object-contain"
              alt="wallet"
            />
          </div>
          <h2 className="unsupported_chain_message">
            Oops, your wallet is on unsupported network
          </h2>
          <p className="unsupported_chain_desc">
            It seems your wallet is runing on a different network from Dzap app.
          </p>
          {/* <button
            disabled={walletConnector !== METAMASK}
            type="button"
            onClick={() => switchNetwork(primaryChainId)}
            className="unsupported_chain_button"
          >
            Switch network
          </button> */}
          <h1 className='unsupported_chain_switch text-center w-full mt-8 mb-5'>SWITCH NETWORK</h1>
          <div className="flex justify-center items-center gap-x-3">
            <SupportedChainList shade='light' position='bottom' />
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default UnsupportedChainModal;
