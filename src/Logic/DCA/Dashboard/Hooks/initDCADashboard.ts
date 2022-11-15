import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { STATUS } from '../../../../Constants/AppConstants';
import AuthContext from '../../../../Context/AuthContext';
import { RootState } from '../../../../Store';
import { apiGetAllTokens } from '../../../../Store/Action';
import { setTokenList } from '../../../../Store/CommonReducer';
import { TokenTypes } from '../../../../Types';
import { getPastEvent } from '../../../../Utils/ContractUtils';

import { setIsLoading, setPositions } from '../Store';
import { getAllPositions } from '../Store/Action';
import { getPositionEventParams, parsePositionEventData } from '../Utils';

function initDCADashboard() {
  const { account } = useContext(AuthContext);
  const { chainFilter } = useSelector((state: RootState) => state.dcaDashboard);
  const { tokenList } = useSelector((state: RootState) => state.common);
  const dispatch = useDispatch<any>();
  const [parsedPositions, setParsedPositions] = useState([]);
  const [positionsTokenList, setPositionsTokenList] = useState<string[]>([]);

  const getPositions = async () => {
    try {
      const chainId = chainFilter[0];
      const { contract, provider, data, abiPath } = getPositionEventParams(
        chainId,
        account || '',
      );
      const result = await getPastEvent(contract, provider, data);
      const parsedData = parsePositionEventData(result, abiPath, chainId);
      setParsedPositions(parsedData.data);
      setPositionsTokenList(parsedData.tokenAddresses);
    } catch (error) {
      dispatch(setIsLoading(false));
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(getAllPositions());
  }, []);

  useEffect(() => {
    apiGetAllTokens({ chainId: chainFilter[0] }).then((res) => {
      if (res.status === STATUS.success) {
        dispatch(setTokenList(res.data));
      } else {
        dispatch(setTokenList([]));
      }
    });
  }, [chainFilter]);

  useEffect(() => {
    if (account && false) {
      getPositions();
    }
  }, [chainFilter, account]);

  useEffect(() => {
    if (parsedPositions.length > 0 && tokenList.length > 0) {
      const filterredTokenInfo = tokenList.filter((item: TokenTypes) =>
        positionsTokenList.includes(item.contract),
      );
      const positions = parsedPositions.map((position: any) => {
        const fromToken = filterredTokenInfo.find(
          (item) => item.contract === position.fromToken,
        );
        const toToken = filterredTokenInfo.find(
          (item) => item.contract === position.toToken,
        );
        return {
          ...position,
          fromToken,
          toToken,
        };
      });
      dispatch(setPositions(positions));
      dispatch(setIsLoading(false));
    }
  }, [parsedPositions, tokenList]);
}

export default initDCADashboard;
