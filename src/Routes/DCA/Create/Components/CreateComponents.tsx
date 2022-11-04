import '../../../../Assets/Css/DCA/Table.scss';
import CreatePositionForm from './Form/CreatePositionForm';
import Summary from './Form/Widgets/Summary';

function CreateComponents() {
  return (
    <div className="mt-10 sm:mt-0">
      <div className="md:grid md:grid-cols-2 md:gap-6">
        <CreatePositionForm />
        <Summary />
      </div>
    </div>
  );
}
export default CreateComponents;
