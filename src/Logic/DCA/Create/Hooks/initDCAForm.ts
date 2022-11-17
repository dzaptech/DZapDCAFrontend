import { Form } from 'antd';
import { BigNumber } from 'ethers';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { defaultChainId } from '../../../../Config/AppConfig';
import { nativeCurrencyAddresses } from '../../../../Config/ChainConfig';
import { SAMPLE_TOKEN } from '../../../../Constants';
import { APP } from '../../../../Constants/AppConstants';
import AuthContext from '../../../../Context/AuthContext';
import { RootState } from '../../../../Store';
import { TokenTypes } from '../../../../Types';
import { getDefaultToken } from '../../../../Utils/AppUtils';
import { parseJsonString } from '../../../../Utils/GeneralUtils';
import { DCA_FORM_FIELD, SECONDARY_TOKEN } from '../Constants';
import { getFormValues, setFormValues } from '../Utils/FormUtils';

function initDCAForm() {
  const [form] = Form.useForm();
  const [hasAllowance, setHasAllowance] = useState(false);
  const { chainId: currentChainId } = useContext(AuthContext);
  const chainId = currentChainId || defaultChainId;
  const defualtFromToken = getDefaultToken(APP.dca, chainId);
  const defualtToToken = SECONDARY_TOKEN[chainId];
  const [fromTokens, setFromTokens] = useState<TokenTypes[]>([
    defualtFromToken,
  ]);
  const { walletTokenList, tokenList: toTokens } = useSelector(
    (state: RootState) => state.common,
  );
  const { trxState } = useSelector((state: RootState) => state.dca);

  const mapBalance = () => {
    const mappedData = toTokens.map((item) => {
      const { balance, allowance } = walletTokenList.find(
        (walletItem) =>
          walletItem.contract.toLowerCase() === item.contract.toLowerCase(),
      ) || { balance: '0', allowance: '0' };
      return {
        ...item,
        balance,
        allowance,
      };
    });
    return mappedData;
  };

  useEffect(() => {
    if (toTokens.length > 0) {
      setFromTokens(mapBalance());
    }
  }, [toTokens, walletTokenList]);

  useEffect(() => {
    if (fromTokens.length > 0) {
      const selectFrom = fromTokens.find(
        (item) => item.contract === defualtFromToken.contract,
      );
      if (selectFrom) {
        setFormValues(
          form,
          DCA_FORM_FIELD.fromToken,
          JSON.stringify(selectFrom),
        );
        setHasAllowance(BigNumber.from(selectFrom.allowance || 0).gt('0'));
      }
    }
  }, [fromTokens]);
  useEffect(() => {
    if (toTokens.length > 0) {
      const selectTo =
        toTokens.find((item) => item.contract === defualtToToken.contract) ||
        null;

      if (selectTo) {
        setFormValues(form, DCA_FORM_FIELD.toToken, JSON.stringify(selectTo));
      }
    }
  }, [toTokens]);

  const currentFromToken =
    parseJsonString(Form.useWatch(DCA_FORM_FIELD.fromToken, form)) ||
    SAMPLE_TOKEN;
  const currentToToken =
    parseJsonString(Form.useWatch(DCA_FORM_FIELD.toToken, form)) ||
    SAMPLE_TOKEN;

  const swapToken = () => {
    const fromToken = parseJsonString(
      getFormValues(form, DCA_FORM_FIELD.fromToken),
    );
    const toToken = parseJsonString(
      getFormValues(form, DCA_FORM_FIELD.toToken),
    );
    const newFromToken = fromTokens.find(
      (item) => item.contract === toToken?.contract,
    );
    const newToToken = toTokens.find(
      (item) => item.contract === fromToken?.contract,
    );
    if (newFromToken && newToToken) {
      setFormValues(form, DCA_FORM_FIELD.toToken, JSON.stringify(newToToken));
      setFormValues(
        form,
        DCA_FORM_FIELD.fromToken,
        JSON.stringify(newFromToken),
      );
      setHasAllowance(BigNumber.from(newFromToken.allowance || 0).gt('0'));
    }
  };
  const cycleKey = Form.useWatch(DCA_FORM_FIELD.cycle, form) || 'daily';

  const onChangeFromToken = ({ allowance, contract }: TokenTypes) => {
    if (nativeCurrencyAddresses.includes(contract)) {
      setHasAllowance(true);
    } else {
      setHasAllowance(BigNumber.from(allowance || 0).gt('0'));
    }
  };

  return {
    fromTokens,
    toTokens: toTokens.length > 0 ? toTokens : [defualtToToken],
    form,
    defaultSelect: {
      from: defualtFromToken,
      to: defualtToToken,
    },
    currentFromToken,
    swapToken,
    currentToToken,
    cycleKey,
    onChangeFromToken,
    hasAllowance,
    trxState,
  };
}
export default initDCAForm;
