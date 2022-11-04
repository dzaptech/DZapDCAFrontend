import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import downArrow from '../../../../../../Assets/Icons/dropdown-arrow.svg';
import info from '../../../../../../Assets/Icons/information.svg';
import { supportedChains } from '../../../../../../Config/ChainConfig';
import { getChainInfoValue } from '../../../../../../Utils/ChainUtils';

function FilterByChain() {
  return (
    <div className="flex justify-center items-center gap-x-4">
      <Menu as="div" className="relative inline-block text-left">
        <div className="dropdown_parent">
          <Menu.Button className="dropdown">
            <div className="flex items-center dropdown_inner chain_list justify-between">
              <div className="flex items-center dropdown_text">
                <div className="flex items-center gap-x-1">
                  <div className="h-6 w-6 flex justify-center items-center rounded-full info_bg">
                    <img src={info} className="h-3" alt="info" />
                  </div>
                  <p>All Chains</p>
                </div>
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
          <Menu.Button className="origin-top-right dropdown_list z-10 left-0 absolute right-0 top-12 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
            <div>
              {supportedChains.map((chainId) => (
                <Menu.Button className="w-full dropdown_list_child">
                  <img
                    src={getChainInfoValue(chainId, 'icon')?.toString() || ''}
                    className="w-6 h-6 object-contain"
                    alt="coin"
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
    </div>
  );
}
export default FilterByChain;
