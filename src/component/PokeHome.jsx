import React from "react";
import RandomPoke from "./pokeComponets/RandomPoke";
import Navigation from "./utils/Navigation";
import pokeHOme from "../img/pokeHOme.png";
import pokeNav from "../img/pokeNav.png";

const PokeHome = () => {
	return (
		<div className="mainDiv">
			<div className="pokeHome">
				<div>
					<Navigation />
				</div>
				<div className="randomPoke">
					<div className="pokeHomeHeader">
						<h1 className="startPoke">
							<span className="pokeMid1">
								Welcome to world of P
								<img src={pokeNav} alt="poke" id="pi1" />
								kem
								<img src={pokeNav} alt="pi2" />n
							</span>
							<span className="pokeMid2">
								<img src={pokeHOme} alt="poke" />
							</span>
						</h1>
					</div>
					<div>
						<RandomPoke />
					</div>
				</div>
				<div className="pokeAttribute">
					<a href="https://www.freepik.com/vectors/cartoon-castle">
						Background Credit
					</a>
					<p>
						Made by <a href="https://ranaabhay.com/">Abhay</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default PokeHome;
