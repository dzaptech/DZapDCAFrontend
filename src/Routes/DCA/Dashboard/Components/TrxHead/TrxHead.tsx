import FilterByChain from './Widgest/FilterByChain';

function TrxHead() {
  return (
    <div>
      <p className="my-6 text-white font-medium text-lg">My Transactions</p>
      <div className="flex justify-between items-center mb-4">
        <div className="flex justify-center items-center gap-x-4">
          <p className="font-bold text-sm dashboard_chain_sort text-gray-400">
            Filter by:
          </p>
          <FilterByChain />
          {/* <FilterByDays /> */}
        </div>
      </div>
    </div>
  );
}
export default TrxHead;
