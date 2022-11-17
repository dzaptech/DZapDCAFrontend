import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AuthContext from '../../../../Context/AuthContext';

import { getAllPositions } from '../Store/Action';

function initDCADashboard() {
  const { account, chainId } = useContext(AuthContext);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    if (account && chainId) {
      dispatch(getAllPositions({ account, chainId }));
    }
  }, [account, chainId]);
}

export default initDCADashboard;
