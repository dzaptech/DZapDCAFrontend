import '../../../Assets/Css/DCA/Dashboard.scss';
import MainAppLayout from '../../../Components/Layouts/MainAppLayout';
import initDCADashboard from '../../../Logic/DCA/Dashboard/Hooks/initDCADashboard';
import DashboardComponents from './Components/DashboardComponents';

function DashboardPage() {
  initDCADashboard();
  return (
    <MainAppLayout>
      <DashboardComponents />
    </MainAppLayout>
  );
}
export default DashboardPage;
