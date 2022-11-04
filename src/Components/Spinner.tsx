import { Spin, SpinProps } from 'antd';

function Spinner({ spinning, style }: SpinProps) {
  return (
    <div
      style={style || {}}
      className="min-h-full mx-auto flex flex-col"
      data-testid="spinner"
    >
      <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto">
        <div className="flex-shrink-0 flex justify-center">
          <Spin className="pt-16 pb-12" spinning={spinning} />
        </div>
      </main>
    </div>
  );
}
export default Spinner;
