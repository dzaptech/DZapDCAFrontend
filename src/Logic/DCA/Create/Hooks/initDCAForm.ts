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
import { errorNotification } from '../../../../Utils/NotificationUtils';
import { DCA_FORM_FIELD, SECONDARY_TOKEN } from '../Constants';
import { getFormValues, setFormValues } from '../Utils/FormUtils';

function initDCAForm() {
  const [form] = Form.useForm();
  const [hasAllowance, setHasAllowance] = useState(false);
  const { chainId: currentChainId } = useContext(AuthContext);
  const chainId = currentChainId || defaultChainId;
  const defualtFromToken = getDefaultToken(APP.dca, chainId);
  const defualtToToken = SECONDARY_TOKEN[chainId];
  const { walletTokenList, tokenList } = useSelector(
    (state: RootState) => state.common,
  );
  const { trxState } = useSelector((state: RootState) => state.dca);

  const fromTokens =
    walletTokenList.length > 0 ? walletTokenList : [defualtFromToken];
  const toTokens = tokenList.length > 0 ? tokenList : [defualtToToken];

  const from =
    fromTokens.find((item) => item.contract === defualtFromToken.contract) ||
    null;
  const defaultSelect = {
    from,
    to:
      toTokens.find((item) => item.contract === defualtToToken.contract) ||
      null,
  };

  useEffect(() => {
    if (from) {
      setFormValues(form, DCA_FORM_FIELD.fromToken, JSON.stringify(from));
      setHasAllowance(BigNumber.from(from.allowance || 0).gt('0'));
    }
  }, [from]);

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
    } else {
      errorNotification('Swap not allowed!', 'Temporary');
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
    toTokens,
    form,
    defaultSelect,
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
