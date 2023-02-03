import { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";
import FlipNumbers from "react-flip-numbers";

interface CountdownProps {
	date: string;
}

function Countdown({ date }: CountdownProps) {
	const ref = useRef<any | null>(null);

	const [timer, setTimer] = useState("00:00:00:00");
	const [hasTimerInit, setHasTimerInit] = useState(false);

	const getWinDims = () => {
		const { innerWidth: width, innerHeight: height } = window;
		return { width, height };
	};

	const [winDim, setWinDim] = useState(getWinDims());

	useEffect(() => {
		const remainingTime = () => {
			const total = Date.parse(date) - Date.now();
			const seconds = Math.floor((total / 1000) % 60);
			const minutes = Math.floor((total / 1000 / 60) % 60);
			const hours = Math.floor((total / 1000 / 60 / 60) % 24);
			const days = Math.floor(total / 1000 / 60 / 60 / 24);
			return { total, seconds, minutes, hours, days };
		};

		const startTime = () => {
			const { total, seconds, minutes, hours, days } = remainingTime();
			if (total >= 0) {
				setTimer(
					days.toString().padStart(2, "0") +
						":" +
						hours.toString().padStart(2, "0") +
						":" +
						minutes.toString().padStart(2, "0") +
						":" +
						seconds.toString().padStart(2, "0")
				);
			}
			setHasTimerInit(true);
		};

		if (ref.current) clearInterval(ref.current);

		const id = setInterval(() => {
			startTime();
		}, 1000);
		ref.current = id;
	}, [date]);

	useEffect(() => {
		function handleResize() {
			setWinDim(getWinDims());
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const countdownGenerator = () => {
		if (winDim.width > 900) {
			if (hasTimerInit && timer === "00:00:00:00") {
				return (
					<>
						<Confetti width={110 * 8 + 50} />
						<FlipNumbers
							play
							numbers={timer}
							color="white"
							width={50}
							height={70}
							numberStyles={{ textAlign: "left", fontSize: "95px" }}
						/>
					</>
				);
			}
			return (
				<FlipNumbers
					play
					numbers={timer}
					color="white"
					width={50}
					height={70}
					numberStyles={{ textAlign: "left", fontSize: "95px" }}
				/>
			);
		} else {
			if (hasTimerInit && timer === "00:00:00:00") {
				return (
					<>
						<Confetti width={30 * 8 + 30} />
						<FlipNumbers
							play
							numbers={timer}
							color="white"
							width={30}
							height={50}
							numberStyles={{ textAlign: "left", fontSize: "45px" }}
						/>
					</>
				);
			}
			return (
				<FlipNumbers
					play
					numbers={timer}
					color="white"
					width={30}
					height={50}
					numberStyles={{ textAlign: "left", fontSize: "45px" }}
				/>
			);
		}
	};

	return countdownGenerator();
}

export default Countdown;
