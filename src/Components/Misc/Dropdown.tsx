import { Listbox, Transition } from '@headlessui/react';
import { SelectorIcon } from '@heroicons/react/solid';
import { Fragment } from 'react';
import { TokenTypes } from '../../Types';
import { getAlternateTokenIcon } from '../../Utils/GeneralUtils';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

function Dropdown({ list }: { list: TokenTypes[] }) {
  const alternateIcon = getAlternateTokenIcon();
  return (
    <Listbox
    //   value={batchSellPrimaryTokenInfo}
    //   onChange={(info) => dispatch(setBatchSellPrimaryTokenInfo(info))}
    >
      {({ open }) => (
        <div className="mt-1 relative">
          <Listbox.Button className="relative w-40 batch_sell_dropdown pl-3 pr-10 py-2 text-left cursor-default sm:text-sm">
            <span className="flex items-center">
              <img
                // src={batchSellPrimaryTokenInfo.logo || alternateIcon}
                className="w-6 h-6 object-contain"
                alt="coin"
              />
              <span className="ml-3 block truncate">
                oiuytr
                {/* {batchSellPrimaryTokenInfo.symbol} */}
              </span>
            </span>
            <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 w-full batch_sell_dropdown_option shadow-lg max-h-44 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
              {list.map((item: TokenTypes) => {
                const isDisabled = false;
                return (
                  <Listbox.Option
                    key={item.contract}
                    disabled={isDisabled}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-gray-600' : 'text-gray-200',
                        'cursor-default select-none relative py-2 pl-3 pr-9',
                      )
                    }
                    value={item}
                  >
                    {({ selected: sel }) => (
                      <div
                        className={classNames(
                          isDisabled ? 'cursor-not-allowed' : 'cursor-pointer',
                          'flex items-center',
                        )}
                      >
                        <img
                          src={item.logo || alternateIcon}
                          className="w-6 h-6 object-contain"
                          alt="coin"
                        />
                        <span
                          className={classNames(
                            sel ? 'font-semibold' : 'font-normal',
                            'ml-3 block truncate',
                          )}
                        >
                          {item.symbol}
                        </span>
                      </div>
                    )}
                  </Listbox.Option>
                );
              })}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
}
export default Dropdown;
