import HeroComponent from 'hero/HeroComponent';
import Birthday from 'hero/Birthday';
import Today from './Today';

const App = () => {
  return (
    <div>
      <Today />
      <h1>Hello World, this is a React App.</h1>
      <HeroComponent />
      <Birthday />
    </div>
  );
};

export default App;
