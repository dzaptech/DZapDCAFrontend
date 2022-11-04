import { ReactNode } from 'react';
import Header from './Header';

function MainAppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full grid-cols-small m-auto text-white grid">
      <div className="" />
      <div>
        <div>
          <Header />
        </div>
        {children}
      </div>
    </div>
  );
}
export default MainAppLayout;
