import { Menu, Transition } from '@headlessui/react';
import { Fragment, useContext } from 'react';
import { useSelector } from 'react-redux';
import downArrow from '../../Assets/Icons/dropdown-arrow.svg';
import { supportedChains } from '../../Config/ChainConfig';
import AuthContext from '../../Context/AuthContext';
import { RootState } from '../../Store';
import { getChainInfoValue, switchNetwork } from '../../Utils/ChainUtils';
import { getAlternateTokenIcon } from '../../Utils/GeneralUtils';

type SupportedChainListProps = {
  position: string;
  shade: string;
};
function SupportedChainList({ position, shade }: SupportedChainListProps) {
  const { chainId: currentChainId } = useContext(AuthContext);
  const { isUnsupportedChain } = useSelector(
    (state: RootState) => state.common,
  );
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div
        className={`${
          shade === 'light'
            ? 'dropdown_parent_light_theme dropdown_parent'
            : 'dropdown_parent'
        }`}
      >
        <Menu.Button
          className={`${
            shade === 'light' ? 'dropdown_light_theme dropdown' : 'dropdown'
          }`}
        >
          <div className="flex items-center dropdown_inner chain_list justify-between">
            <div className="flex items-center dropdown_text">
              {getChainInfoValue(currentChainId, 'name') ? (
                <div className='flex'>
                  {isUnsupportedChain ? (
                    <p className="text-red-500 font-semibold">Invalid chain</p>
                  ) : (
                    <>
                      <div className="dropdown_light" />
                      <img
                        src={getChainInfoValue(
                          currentChainId,
                          'icon',
                        )?.toString()}
                        className="w-6 h-6 object-contain mr-2.5"
                        alt="coin"
                      />
                      <p className="dropdown_text pt-px">
                        {getChainInfoValue(currentChainId, 'name')}
                      </p>
                    </>
                  )}
                </div>
              ) : (
                <>Select chain</>
              )}
            </div>
            <img src={downArrow} alt="down" className="-rotate-180 right-0" />
          </div>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Button
          className={`origin-top-right dropdown_list left-0 absolute right-0 ${
            position === 'top' ? 'top-12' : 'bottom-12'
          } rounded-md shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none`}
        >
          <div>
            {supportedChains.map((chainId) => (
              <Menu.Button
                disabled={currentChainId === chainId}
                onClick={() => switchNetwork(chainId)}
                className={`w-full dropdown_list_child ${
                  currentChainId === chainId && 'cursor-not-allowed'
                }`}
                key={chainId}
              >
                <img
                  src={getChainInfoValue(chainId, 'icon')?.toString()}
                  className="w-6 h-6 object-contain"
                  alt="coin"
                  onError={({ currentTarget: target }) => {
                    const currentTarget = target;
                    currentTarget.onerror = null;
                    currentTarget.src = getAlternateTokenIcon();
                  }}
                />
                <p className="dropdown_text">
                  {getChainInfoValue(chainId, 'name')}
                </p>
              </Menu.Button>
            ))}
          </div>
        </Menu.Button>
      </Transition>
    </Menu>
  );
}
export default SupportedChainList;
