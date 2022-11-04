import nothingFound from '../../Assets/Icons/nothing-found.svg';

function ResultNotFound() {
  return (
    <div className="nothing_found">
      <img src={nothingFound} alt="nothing-found" />
      <p className='m-auto mt-12'>Nothing Found</p>
    </div>
  );
}
export default ResultNotFound;
