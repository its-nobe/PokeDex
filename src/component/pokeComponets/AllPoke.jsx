import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Navigation from "../utils/Navigation";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { BarLoader } from "react-spinners";
import info from '../../img/info.png'


const AllPoke = () => {
	let navigate = useNavigate();
	const [pokeData, setPokeData] = useState([]);
	// const [pokeRes, setPokeRes] = useState([]);
	const [searchPoke, setSearchPoke] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	const [pgNum, setPgNum] = useState(0);
	const userPerPage = 6;
	const pageVisited = pgNum * userPerPage;

	useEffect(() => {
		axios
			.get(`https://pokeapi.co/api/v2/pokemon?limit=898`)
			.then((response) => {
				// setPokeRes(response.data.results);
				const newPokeData = {};
				response.data.results.forEach((pokemon, index) => {
					newPokeData[index + 1] = {
						id: index + 1,
						name: pokemon.name,
						sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
							index + 1
						}.png`,
					};
				});
				setPokeData(newPokeData);
			});
	}, []);

	const displayPoke = Object.values(pokeData)
		.filter((value) => {
			if (searchPoke == "") {
				return value;
			} else if (value.name.toLowerCase().includes(searchPoke.toLowerCase())) {
				return value;
			}
		})
		.slice(pageVisited, pageVisited + userPerPage)
		.map((val, key) => {
			return (
				<div key={key} className="PokeList">
					<div>
						<img src={val.sprite} alt={val.name} className="allpokegsapimg" />

						<p>Id: {val.id}</p>
						<p>Name: {val.name}</p>
					</div>
					<img
						src={info}
						alt="i"
						className="iImage"
						onClick={() => navigate(`/poke/${val.id}`)}
					/>
				</div>
			);
		});
	setTimeout(() => {
		setIsLoading(false);
	}, 2500);
	const pageCount = Math.ceil(Object.values(pokeData).length / userPerPage);
	const changePage = ({ selected }) => {
		setPgNum(selected);
	};
	gsap.fromTo(
		".actualPokeList",
		{
			ease: "power3.out",
			duration: 2.8,
			delay: 1.5,
			y: 64,
			stagger: {
				amount: 0.15,
			},
			opacity: 0,
		},
		{
			y: 0,
			duration: 1.8,
			opacity: 1,
		}
	);

	return (
		<div className="main-allPoke">
			<Navigation />

			<div className="PokeSearch">
				<input
					type="text"
					placeholder="Pokemon..."
					onChange={(event) => {
						setSearchPoke(event.target.value);
					}}
				/>
			</div>
			{isLoading ? (
				<div className="pokeBarLoad">
					<BarLoader />
				</div>
			) : (
				<div className="actualPokeList">
					{/* <button onClick={()=>console.log(Object.values(pokeData)[898].sprite)}>get</button> */}
					{displayPoke}
				</div>
			)}
			<div
				className="pokePaginate"
				onClick={() => {
					setIsLoading(true);
				}}
			>
				<ReactPaginate
					previousLabel={"Previous"}
					nextLabel={"Next"}
					pageCount={pageCount}
					onPageChange={changePage}
					breakLabel={"..."}
					marginPagesDisplayed={2}
					pageRangeDisplayed={2}
					containerClassName={"paginationBttns"}
					previousLinkClassName={"previousBttn"}
					nextLinkClassName={"nextBttn"}
					disabledClassName={"paginationDisabled"}
					activeClassName={"paginationActive"}
				/>
			</div>
		</div>
	);
};

export default AllPoke;
