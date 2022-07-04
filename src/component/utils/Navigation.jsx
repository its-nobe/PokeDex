import React from "react";
import { useNavigate } from "react-router-dom";
import pokeNav from '../../img/pokeNav.png'

const Navigation = () => {
	let navigate = useNavigate();

	return (
		<div className="pokeNavi">
			<div className="pokeHeader">
				<h1>PokeDex</h1>
			</div>
			<div className="pokeNav">
				<input type="checkbox" />
				<img
					src={pokeNav}
					alt="poke"
				/>
				<div className="subPokeNav">
					{/* <p data-item="Search Pokemon" onClick={() => navigate("/searchpoke")}>
						Search <br /> Pokemon
					</p> */}
					<p data-item="Home" onClick={() => navigate("/home")}>
						Home
					</p>
					<p data-item="All Pokemons" onClick={() => navigate("/allpoke")}>
						All <br /> Pokemons
					</p>
				</div>
			</div>
		</div>
	);
};

export default Navigation;
