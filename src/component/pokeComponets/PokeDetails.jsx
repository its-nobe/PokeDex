import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import VanillaTilt from "vanilla-tilt";
import { RiseLoader } from "react-spinners";

// let id = 100;

const PokeDetails = () => {
	let navigate = useNavigate();
	const { pokeId } = useParams();
	let id = pokeId;

	const [isLoad, setIsLoad] = useState(true);

	const [pokeSpec, setPokeSpec] = useState({
		happy: "",
		capture: "",
		growth: "",
		genus: "",
		pokeColor: "",
	});
	const [pokeAPI, setPokeAPI] = useState({
		exp: "",
		name: "",
		hp: "",
		atk: "",
		def: "",
		satk: "",
		sdef: "",
		speed: "",
		weight: "",
		type: "",
		height: "",
		img: "",
	});

	const [poke1, setPoke1] = useState({
		id1: "",
		name1: "",
	});
	const [poke2, setPoke2] = useState({
		id2: "",
		name2: "",
	});
	const [poke3, setPoke3] = useState({
		id3: "",
		name3: "",
	});

	axios
		.get(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
		.then((response) => {
			setPokeSpec({
				happy: response.data.base_happiness,
				capture: response.data.capture_rate,
				growth: response.data.growth_rate.name,
				genus: response.data.genera[7].genus,
				pokeColor: response.data.color.name,
			});

			axios.get(response.data.evolution_chain.url).then((resp) => {
				axios.get(resp.data.chain.species.url).then((r1) => {
					setPoke1({
						id1: r1.data.id,
						name1: r1.data.name,
					});
				});
				axios.get(resp.data.chain.evolves_to[0].species.url).then((r2) => {
					setPoke2({
						id2: r2.data.id,
						name2: r2.data.name,
					});
				});
				axios
					.get(resp.data.chain.evolves_to[0].evolves_to[0].species.url)
					.then((r3) => {
						setPoke3({
							id3: r3.data.id,
							name3: r3.data.name,
						});
					});
			});
		});
	axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => {
		setPokeAPI({
			exp: res.data.base_experience,
			name: res.data.name,
			hp: res.data.stats[0].base_stat,
			atk: res.data.stats[1].base_stat,
			def: res.data.stats[2].base_stat,
			satk: res.data.stats[3].base_stat,
			sdef: res.data.stats[4].base_stat,
			speed: res.data.stats[5].base_stat,
			weight: res.data.weight,
			height: res.data.height,
			type: res.data.types[0].type.name,
			img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
		});
	});
	VanillaTilt.init(document.querySelector(".pokeNamedet"), {
		max: 25,
		speed: 400,
	});

	setTimeout(() => setIsLoad(false), 2500);

	return (
		<>
			{isLoad ? (
				<div className="allPokeLoader">
					<RiseLoader color="#ca1b1b" />
				</div>
			) : (
				<div className="pokeDetail">
					<div className="leftDetail">
						<div className="backBtn">
							<button className="pokebtnN" onClick={() => navigate("/allpoke")}>
								Back
							</button>
						</div>

						<img
							src={pokeAPI.img}
							alt="image"
							style={{
								background: `linear-gradient(${pokeSpec.pokeColor}, white)`,
							}}
							className="pokeDetailImg"
						/>
						<div className="pokeNamedet">
							<div style={{ color: `${pokeSpec.pokeColor}` }}>
								{pokeAPI.name}
							</div>
						</div>
					</div>
					<div className="rightDetail">
						<div className="PokeDetailsStat">
							<div className="statHead">
								<p>Stats:-</p>
							</div>
							<div className="statDetail">
								<p>Genus: {pokeSpec.genus}</p>
								<p>Type: {pokeAPI.type}</p>
								<p>Base Exp: {pokeAPI.exp}</p>
								<p>Base Happiness: {pokeSpec.happy}</p>
								<p>Catch Rate: {pokeSpec.capture}</p>
								<p>Growth Rate: {pokeSpec.growth}</p>
								<p>HP: {pokeAPI.hp}</p>
								<p>Atk: {pokeAPI.atk}</p>
								<p>Def: {pokeAPI.def}</p>
								<p>Special Atk: {pokeAPI.satk}</p>
								<p>Special Def: {pokeAPI.sdef}</p>
								<p>Speed: {pokeAPI.speed}</p>
								<p>Weight: {pokeAPI.weight / 10}kg</p>
								<p>Height: {pokeAPI.height / 10}m</p>
							</div>
						</div>
						<div className="PokeDetailsEvol">
							<div className="evolHead">
								<p>Evolution:-</p>
							</div>

							{poke3.name3 ? (
								<div className="evolStat">
									{poke2.name2 && poke3.name3 ? (
										<div className="evolSub">
											<div className="pokeEvol">
												<p>{poke1.name1}</p>
												<img
													src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke1.id1}.png`}
													alt="evo img"
													onClick={() => {
														navigate(`/poke/${poke1.id1}`);
														setIsLoad(true);
													}}
												/>
											</div>
											<div className="pokeEvol">
												<p>{poke2.name2}</p>
												<img
													src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke2.id2}.png`}
													alt="evo img"
													onClick={() => {
														navigate(`/poke/${poke2.id2}`);
														setIsLoad(true);
													}}
												/>
											</div>
											<div className="pokeEvol">
												<p>{poke3.name3}</p>
												<img
													src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke3.id3}.png`}
													alt="evo img"
													onClick={() => {
														navigate(`/poke/${poke3.id3}`);
														setIsLoad(true);
													}}
												/>
											</div>
										</div>
									) : null}
								</div>
							) : (
								<div className="evolStat">
									{poke1.name1 && poke2.name2 ? (
										<div className="evolSub">
											<div className="pokeEvol">
												<p>{poke1.name1}</p>
												<img
													src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke1.id1}.png`}
													alt="evo img"
													onClick={() => {
														navigate(`/poke/${poke1.id1}`);
														setIsLoad(true);
													}}
												/>
											</div>
											<div className="pokeEvol">
												<p>{poke2.name2}</p>
												<img
													src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke2.id2}.png`}
													alt="evo img"
													onClick={() => {
														navigate(`/poke/${poke2.id2}`);
														setIsLoad(true);
													}}
												/>
											</div>
										</div>
									) : (
										<div className="evolSub">
											<div className="pokeEvol">
												<p>{poke1.name1}</p>
												<img
													src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke1.id1}.png`}
													alt="evo img"
													onClick={() => {
														navigate(`/poke/${poke1.id1}`);
														setIsLoad(true);
													}}
												/>
											</div>
										</div>
									)}
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default PokeDetails;
