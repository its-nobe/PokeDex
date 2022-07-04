import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";

const Loader = () => {
	const navigate = useNavigate();

	const pokeArr = [
		".",
		".",
		".",
		".",
		".",
		"pikachu",
		"bulbasaur",
		"charmander",
		"houndour",
		"squirtle",
		"mew",
		"mr-mime",
		"dragonite",
		"glastrier",
		"magnezone",
		"diglett",
		"golbat",
		"carnivine",
		"arbok",
		"golduck",
		"arceus",
		"deoxys",
		"keldeo",
		"rookidee",
		"darkrai",
	];
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const tick = () => setIndex((i) => i + 1);

		const id = setInterval(tick, 200);
		return () => clearInterval(id);
	}, []);
	setTimeout(() => {
		gsap.fromTo(
			".mainLoader",
			{
				ease: "power3.out",
				duration: 2.8,
				delay: 1,

				opacity: 1,
			},
			{
				duration: 1.8,
				opacity: 0,
			}
		);
		navigate("/home");
	}, 5000);

	return (
		<div className="noback">
			<div className="mainLoader">
				<p>{pokeArr[index % pokeArr.length]}</p>
			</div>
		</div>
	);
};

export default Loader;
