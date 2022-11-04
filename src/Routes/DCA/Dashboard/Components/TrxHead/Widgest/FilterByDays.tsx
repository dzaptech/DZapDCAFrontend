import { DatePicker } from 'antd';

function FilterByDays() {
  const { RangePicker } = DatePicker;
  return (
    <div className='flex gap-x-4 justify-center items-center ml-6'>
      <p className='font-bold text-sm dashboard_chain_sort text-gray-400'>Showing data for:</p>
      <RangePicker dropdownClassName="date_range" style={{
        background: '#21262A',
        border: '1px solid #00CC83',
        borderRadius: '2px',
      }} />
    </div>
  );
}
export default FilterByDays;