import { Button, Modal } from 'antd';
import React from 'react';
import { STATUS } from '../../../../../Constants/AppConstants';
import useTrx from '../../../../../Logic/DCA/Create/Hooks/useTrx';
import Receipt from './Receipt';

function DCATrxStateModal() {
  const {
    headIcon,
    onDismiss,
    head,
    message,
    status,
    closable,
    data,
    onFinish,
  } = useTrx();
  return (
    <Modal
      centered
      width={534}
      visible
      closeIcon={<span className="text-white">&#x2715;</span>}
      footer={null}
      onCancel={() => {
        onDismiss();
      }}
      closable={closable}
    >
      <div className="w-full h-340px m-auto rounded-lg bg-gray850">
        {status === STATUS.success ? (
          <Receipt data={data} onFinish={onFinish} />
        ) : (
          <div className="pb-12">
            <div className="w-full h-14 flex justify-center items-center border-b-gray700 border-b">
              <p className="text-white">{closable ? 'ERROR' : head}</p>
            </div>
            <img
              src={headIcon}
              alt="transaction"
              className="h-32 my-12 m-auto"
            />
            {closable && (
              <p className="error-head w-full text-center mt-3 mb-5">{head}</p>
            )}
            <p className="text-gray50 w-full text-center mt-3 px-14 mb-5">
              {message}
            </p>

            {status === STATUS.error && (
              <Button
                className="flex justify-center m-auto uppercase items-center h-10 w-28 rounded-sm border bg-green300 border-green300 font-bold text-black hover:bg-green400 hover:border-green400"
                form="createPosition"
                key="submit"
                htmlType="submit"
              >
                Try Again
              </Button>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}
export default React.memo(DCATrxStateModal);
