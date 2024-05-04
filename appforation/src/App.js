import { Route, Routes } from 'react-router-dom';
import './App.css';
import SimpleForm from './componnents/machine';
import ModernInputs from './componnents/machine';
import Sidebar from './componnents/sidebar';
import CommandAffirmation from './componnents/command';

function App() {
  return (
    <>
      <Sidebar />
      <div className='right-content'>
        <Routes>
          <Route path='machine' element={<SimpleForm />} />
          <Route path='command' element={<CommandAffirmation />} />

        </Routes>

      </div>

    </>
  );
}

export default App;
