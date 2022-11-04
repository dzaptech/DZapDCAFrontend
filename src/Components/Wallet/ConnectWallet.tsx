import { Modal } from 'antd';
import metamask from '../../Assets/Icons/metamask-glow.svg';
import walletconnect from '../../Assets/Icons/wallet-connect.svg';

function ConnectWallet() {
  return (
   <div className="h-screen modal_main_blur_bg w-full m-auto flex justify-center items-center fixed z-10 top-0 right-0 left-0">
       <Modal
        centered
        width={424}
        visible
        footer={null}
        onCancel={() => { }}
       >
           <div className='connect_wallet relative pt-0.5'>
            <button type='button' className='cursor-pointer absolute top-4 right-6 '>
                <p className='text-xl connect_wallet_close'>&#x2715;</p>
            </button>
            <h2 className='connect_wallet_title m-auto text-center mt-10'>Connect a wallet</h2>
            <div className='flex gap-x-6 justify-center items-center mb-20 mt-8'>
                <div className='flex flex-col justify-center items-center gap-y-2.5'>
                    <div className='w-12 h-12 connect_wallet_box flex justify-center items-center'>
                        <img src={metamask} className='w-6 h-6 object-contain' alt="wallet" />
                    </div>
                    <p className='connect_wallet_box_text'>Metamask</p>
                </div>
                <div className='flex flex-col justify-center items-center gap-y-2.5'>
                    <div className='w-12 h-12 connect_wallet_box flex justify-center items-center'>
                        <img src={walletconnect} className='w-6 h-6 object-contain' alt="wallet" />
                    </div>
                    <p className='connect_wallet_box_text'>Metamask</p>
                </div>
            </div>
            <p className='connect_wallet_info m-auto'>By connecting your wallet you agree to our <span> Terms of Services, Privacy</span> and <span>Cookie Policy</span> </p>
            <div className='connect_wallet_border w-full' />
            <p className='connect_wallet_download m-auto'>By Don’t have a wallet? <span>Download here</span></p>
           </div>
       </Modal>
   </div>
  );
}
export default ConnectWallet;