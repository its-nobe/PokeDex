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

	const [baseHappy, setBaseHappy] = useState("");
	const [capture, setCapture] = useState("");
	const [growth, setGrowth] = useState("");
	const [genus, setGenus] = useState("");
	const [id1, setId1] = useState("");
	const [name1, setName1] = useState("");
	const [id2, setId2] = useState("");
	const [name2, setName2] = useState("");
	const [id3, setId3] = useState("");
	const [name3, setName3] = useState("");
	const [pokeColor, setPokeColor] = useState("");

	const [exp, setExp] = useState("");
	const [name, setName] = useState("");
	const [hp, setHp] = useState("");
	const [atk, setAtk] = useState("");
	const [def, setDef] = useState("");
	const [Satk, setSatk] = useState("");
	const [Sdef, setSdef] = useState("");
	const [speed, setSpeed] = useState("");
	const [weight, setWeight] = useState("");
	const [img, setImg] = useState("");
	const [type, setType] = useState("");
	const [height, setHeight] = useState("");

	axios
		.get(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
		.then((response) => {
			setBaseHappy(response.data.base_happiness);
			setCapture(response.data.capture_rate);
			setGrowth(response.data.growth_rate.name);
			setGenus(response.data.genera[7].genus);
			setPokeColor(response.data.color.name);
			axios.get(response.data.evolution_chain.url).then((resp) => {
				axios.get(resp.data.chain.species.url).then((r1) => {
					setId1(r1.data.id);
					setName1(r1.data.name);
				});
				axios.get(resp.data.chain.evolves_to[0].species.url).then((r2) => {
					setId2(r2.data.id);
					setName2(r2.data.name);
				});
				axios
					.get(resp.data.chain.evolves_to[0].evolves_to[0].species.url)
					.then((r3) => {
						setId3(r3.data.id);
						setName3(r3.data.name);
					});
			});
		});
	axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => {
		setExp(res.data.base_experience);
		setName(res.data.name);
		setHp(res.data.stats[0].base_stat);
		setAtk(res.data.stats[1].base_stat);
		setDef(res.data.stats[2].base_stat);
		setSatk(res.data.stats[3].base_stat);
		setSdef(res.data.stats[4].base_stat);
		setSpeed(res.data.stats[5].base_stat);
		setWeight(res.data.weight);
		setImg(
			`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
		);
		setType(res.data.types[0].type.name);
		setHeight(res.data.height);
		// setImg(res.data.sprites.other.official-artwork.front_default);
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
							src={img}
							alt="image"
							style={{ background: `linear-gradient(${pokeColor}, white)` }}
							className="pokeDetailImg"
						/>
						<div className="pokeNamedet">
							<div style={{ color: `${pokeColor}` }}>{name}</div>
						</div>
					</div>
					<div className="rightDetail">
						<div className="PokeDetailsStat">
							<div className="statHead">
								<p>Stats:-</p>
							</div>
							<div className="statDetail">
								<p>Genus: {genus}</p>
								<p>Type: {type}</p>
								<p>Base Exp: {exp}</p>
								<p>Base Happiness: {baseHappy}</p>
								<p>Catch Rate: {capture}</p>
								<p>Growth Rate: {growth}</p>
								<p>HP: {hp}</p>
								<p>Atk: {atk}</p>
								<p>Def: {def}</p>
								<p>Special Atk: {Satk}</p>
								<p>Special Def: {Sdef}</p>
								<p>Speed: {speed}</p>
								<p>Weight: {weight / 10}kg</p>
								<p>Height: {height / 10}m</p>
							</div>
						</div>
						<div className="PokeDetailsEvol">
							<div className="evolHead">
								<p>Evolution:-</p>
							</div>

							{name3 ? (
								<div className="evolStat">
									{name2 && name3 ? (
										<div className="evolSub">
											<div className="pokeEvol">
												<p>{name1}</p>
												<img
													src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id1}.png`}
													alt="evo img"
													onClick={() => {
														navigate(`/poke/${id1}`);
														setIsLoad(true);
													}}
												/>
											</div>
											<div className="pokeEvol">
												<p>{name2}</p>
												<img
													src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id2}.png`}
													alt="evo img"
													onClick={() => {
														navigate(`/poke/${id2}`);
														setIsLoad(true);
													}}
												/>
											</div>
											<div className="pokeEvol">
												<p>{name3}</p>
												<img
													src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id3}.png`}
													alt="evo img"
													onClick={() => {
														navigate(`/poke/${id3}`);
														setIsLoad(true);
													}}
												/>
											</div>
										</div>
									) : null}
								</div>
							) : (
								<div className="evolStat">
									{name1 && name2 ? (
										<div className="evolSub">
											<div className="pokeEvol">
												<p>{name1}</p>
												<img
													src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id1}.png`}
													alt="evo img"
													onClick={() => {
														navigate(`/poke/${id1}`);
														setIsLoad(true);
													}}
												/>
											</div>
											<div className="pokeEvol">
												<p>{name2}</p>
												<img
													src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id2}.png`}
													alt="evo img"
													onClick={() => {
														navigate(`/poke/${id2}`);
														setIsLoad(true);
													}}
												/>
											</div>
										</div>
									) : (
										<div className="evolSub">
											<div className="pokeEvol">
												<p>{name1}</p>
												<img
													src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id1}.png`}
													alt="evo img"
													onClick={() => {
														navigate(`/poke/${id1}`);
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
