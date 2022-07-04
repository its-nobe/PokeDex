import "./styles/main.scss";
import PokeHome from "./component/PokeHome";
import AllPoke from "./component/pokeComponets/AllPoke";
import PokeDetails from "./component/pokeComponets/PokeDetails";
import Loader from "./component/utils/Loader";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Loader />} />
				<Route path="/home" element={<PokeHome />} />
				<Route path="/allpoke" element={<AllPoke />} />
				<Route path="/poke/:pokeId" element={<PokeDetails />} />
			</Routes>
		</Router>
	);
}

export default App;
