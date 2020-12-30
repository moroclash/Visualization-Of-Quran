import Navbar from './components/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import { getAllQuranInfo, getSouraInfo } from './models/Prepare';

function App() {
  let Quran = getAllQuranInfo()
  console.log(Quran)
  getSouraInfo(112)
  return (
    <Navbar swar_names={Quran.swar_names} systems={Quran.systems_info} />
  );
}

export default App;
