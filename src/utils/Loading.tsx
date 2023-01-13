import { Spinner } from "react-bootstrap";

function Loading() {
	return (
		<div
			className="text-white d-flex flex-column align-items-center justify-content-center"
			style={{ width: "100vw", height: "100vh" }}
		>
			<Spinner animation="border" role="status" className="text-center">
				<span className="visually-hidden">Loading...</span>
			</Spinner>
		</div>
	);
}

export default Loading;
