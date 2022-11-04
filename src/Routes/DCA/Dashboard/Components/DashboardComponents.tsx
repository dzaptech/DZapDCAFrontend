import '../../../../Assets/Css/DCA/Table.scss';
import DCATable from './Table/DCATable';
import TrxHead from './TrxHead/TrxHead';

function DashboardComponents() {
  return (
    <div className="px-16">
      <TrxHead />
      <DCATable />
    </div>
  );
}
export default DashboardComponents;
