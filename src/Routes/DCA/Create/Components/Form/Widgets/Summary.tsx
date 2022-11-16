import Button from '../../../../../../Components/Button/Button';
import useSummary from '../../../../../../Logic/DCA/Create/Hooks/useSummary';
import { TokenTypes } from '../../../../../../Types';

export default function Summary({
  currentFromToken,
  form,
  cycleKey,
  hasAllowance,
}: {
  currentFromToken: TokenTypes;
  form: any;
  cycleKey: string;
  hasAllowance: boolean;
}) {
  const { summary, isDisable, isLoading, btn } = useSummary({
    currentFromToken,
    cycleKey,
    form,
    hasAllowance,
  });
  return (
    <div className="md:col-span-1 ml-5 pt-7">
      {/* <div className="flex justify-end pb-3">
        <img src={refresh} alt="" />
        <img src={setting} alt="" className="ml-3" />
      </div> */}
      <div className="container-summary">
        <p className="pl-4 pt-4 text-sm font-semibold text-white">Summary</p>
        <div className="divide-y divide-gray-400">
          <div className="flow-root px-4">
            <ul className="">
              {summary.map((data, index) => (
                <li key={data.id}>
                  <div className="relative">
                    <span
                      className="h-full absolute top-4 -ml-px w-px bg-gray-400"
                      aria-hidden="true"
                      style={{ left: 5.5 }}
                    />
                    <div
                      className={`${
                        index === 0 ? 'pt-8' : 'pt-4'
                      } relative flex space-x-3`}
                    >
                      <div className="">
                        <span
                          style={{ backgroundColor: '#F4D257' }}
                          className="h-2.5 w-2.5 rounded-full flex items-center justify-center"
                        />
                      </div>
                      <div className="flex min-w-0 flex-1 justify-between space-x-4 -mt-0.5">
                        <div>
                          <p className="text-sm text-gray-400 font-normal">
                            {data.key}{' '}
                          </p>
                        </div>
                        <div className="whitespace-nowrap text-right text-sm font-medium text-slate-200">
                          {data.value}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 p-4 ">
            <div className="flex space-x-3">
              <div className="">
                <span
                  style={{ backgroundColor: '#00FFA4' }}
                  className="h-2.5 w-2.5 rounded-full flex items-center justify-center"
                />
              </div>
              <div className="flex min-w-0 flex-1 justify-between space-x-4 -mt-1">
                <div>
                  <p className="text-sm font-medium text-slate-200">Dzap Fee</p>
                </div>
                <div className="whitespace-nowrap font-semibold text-right text-sm text-slate-200">
                  <span className="line-through">0.1%</span> Fee
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <p className="text-sm text-gray-500 font-normal py-2">
        Withdraw and Modify functions available{' '}
        <Button className="btn-learn-more">
          <p className="underline underline-offset-4 font-semibold">
            Learn more
          </p>
        </Button>
      </p> */}
      <Button
        disabled={isDisable}
        loading={isLoading}
        isSubmit
        className="create-position-btn w-full mt-6"
      >
        {btn || <div className="dot__loader mb-5 m-auto" />}
      </Button>
    </div>
  );
}
