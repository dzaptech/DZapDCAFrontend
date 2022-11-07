import React from 'react';
import approved from '../../../../../Assets/Icons/approved.svg';
import explorer from '../../../../../Assets/Icons/explorer-green.svg';
import twitter from '../../../../../Assets/Icons/twitter.svg';
import ShareOnTwitter from '../../../../../Components/Misc/ShareOnTwitter';

function Receipt() {
  return (
    <div className="w-full m-auto rounded-lg bg-gray850">
      <div className="w-full h-16 flex justify-center items-center border-b-gray700 border-b">
        <p className="text-white">TRANSACTION COMPLETED</p>
      </div>
      <div className="md:p-8 p-4 w-full">
        <div className="mt-2 mb-3 w-full">
          <img
            src={approved}
            className="w-75px m-auto h-75px object-contain"
            alt="transaction"
          />
        </div>
        <p className="text-gray50 text-center w-full mb-1">
          Your transaction was completed!
        </p>
        <div className="w-full flex justify-center items-center mb-5">
          <ShareOnTwitter url={'https://www.dzap.io/\n\n'} nofTokens={10}>
            <div className="flex">
              <img
                src={twitter}
                className="w-5 h-5 mr-2 object-contain"
                alt="twitter"
              />
              <p className="text-green300">Spread the word on Twitter</p>
            </div>
          </ShareOnTwitter>
        </div>
        <button
          type="button"
          onClick={() => {
            window.open('trxUrl');
          }}
          className="w-full mt-8 flex justify-start items-center gap-x-2"
        >
          <p className="text-green300">View Transaction</p>
          <img
            src={explorer}
            className="w-5 h-5 object-contain"
            alt="explorer"
          />
        </button>
        <button
          //   onClick={() => onFinish()}
          type="button"
          className="h-12 mt-5 w-full bg-green300 rounded flex justify-center items-center text-black font-semibold"
        >
          Start new trade
        </button>
      </div>
    </div>
  );
}
export default React.memo(Receipt);