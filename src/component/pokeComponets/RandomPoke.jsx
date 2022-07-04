import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { BounceLoader } from "react-spinners";
import info from '../../img/info.png'

const RandomPoke = () => {
	let navigate = useNavigate();
	const [pokeName, setpokeName] = useState("");
	const [pokeImg, setPokeImg] = useState("");
	const [pokeId, setPokeId] = useState("1");
	const [pokeColor, setPokeColor] = useState("");
	const [isLoad1, setIsLoad1] = useState(false);

	const RanPoke = () => {
		setPokeId(Math.floor(Math.random() * 898) + 1);

		setIsLoad1(true);
		gsap.fromTo(
			".cardRandom",
			{
				ease: "power3.out",
				duration: 1.8,
				delay: 1,

				opacity: 0,
				scale: 0,
			},
			{
				opacity: 1,
				duration: 0.8,
				scale: 1,
			}
		);
	};

	axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeId}`).then((response) => {
		setpokeName(response.data.name);
		setPokeImg(
			`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeId}.png`
		);
	});
	axios
		.get(`https://pokeapi.co/api/v2/pokemon-species/${pokeId}/`)
		.then((res) => {
			setPokeColor(res.data.color.name);
		});

	setTimeout(() => {
		setIsLoad1(false);
	}, 2500);
	// gsap.fromTo(
	// 	".randGSAP",
	// 	{
	// 		ease: "power3.out",
	// 		duration: 2.8,
	// 		delay: 1.5,
	// 		y: 64,
	// 		stagger: {
	// 			amount: 0.15,
	// 		},
	// 		opacity: 0,
	// 	},
	// 	{
	// 		y: 0,
	// 		duration: 0.8,
	// 		opacity: 1,
	// 	}
	// );

	return (
		<div className="RandomPokeMain">
			<div className="leftRandom">
				<a
					className="pokeBtn"
					data-back="Get Random Pokemon"
					data-front="Click Here"
					onClick={RanPoke}
				></a>
			</div>
			<div className="rightRandom">
				<div className="cardRandom">
					<div className="PokeList">
						{isLoad1 ? (
							<div className="randLoader">
								<BounceLoader color="white" />
							</div>
						) : (
							<>
								<div className="randGSAP">
									<img src={pokeImg} alt="image" />

									<p>Id: {pokeId}</p>
									<p style={{ color: `${pokeColor}` }}> {pokeName}</p>
								</div>
								<img
									src={info}
									alt="i"
									className="iImage"
									onClick={() => navigate(`/poke/${pokeId}`)}
								/>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
export default RandomPoke;
