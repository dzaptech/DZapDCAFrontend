import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { STATUS } from '../../../../Constants/AppConstants';
import AuthContext from '../../../../Context/AuthContext';
import useBalance from '../../../../Hooks/useTokenBalance';
import { apiGetAllTokens } from '../../../../Store/Action';
import { setTokenList } from '../../../../Store/CommonReducer';
import { isSupportedChain } from '../../../../Utils/ChainUtils';

function initDCA() {
  const { account, chainId } = useContext(AuthContext);
  const dispatch = useDispatch();
  const { getAllWalletBalances } = useBalance();

  useEffect(() => {
    if (isSupportedChain(chainId)) {
      apiGetAllTokens({ chainId }).then((res) => {
        if (res.status === STATUS.success) {
          dispatch(setTokenList(res.data));
        } else {
          dispatch(setTokenList([]));
        }
      });
    }
  }, [chainId]);
  
  useEffect(() => {
    if (account && chainId) {
      getAllWalletBalances();
    }
  }, [account, chainId]);
}
export default initDCA;
