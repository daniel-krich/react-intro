import './App.css';
import Counter from './components/counter/counter';
import Parties from './components/parties/parties';
import TimeTick from './components/time-tick/time-tick';

function App() {
  return (
    <>
        <TimeTick />
        <Counter />
        <Parties />
    </>
  );
}

export default App;
