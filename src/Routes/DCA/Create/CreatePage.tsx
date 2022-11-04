import '../../../Assets/Css/DCA/Create.scss';
import MainAppLayout from '../../../Components/Layouts/MainAppLayout';
import CreateComponents from './Components/CreateComponents';

function CreatePage() {
  return (
    <MainAppLayout>
      <div className="create-layout py-6 px-10 mt-14 mb-24 w-1/2 m-auto">
        <CreateComponents />
      </div>
    </MainAppLayout>
  );
}
export default CreatePage;
