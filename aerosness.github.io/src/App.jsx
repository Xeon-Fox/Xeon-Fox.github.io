import './App.css';
import Desktop from './components/Desktop.jsx';
import Window from './components/Window.jsx';
import Taskbar from './components/Taskbar';

function App() {
  return (
    <>
      <Desktop></Desktop>
      <Window></Window>
      <Taskbar></Taskbar>
    </>
  );
}

export default App;
