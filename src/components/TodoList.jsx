import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddTodo from "./AddTodo";
import "./style.css";
const Todos = () => {
	const [modal, setModal] = useState(false);

	const [todo, setTodo] = useState([]);

	const [select, setSelect] = useState(true);
	// handle delete function
	const handleDelete = (id) => {
		fetch(`http://task.atiar.info/api/todo/delete`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id: id }),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Success:", data);
				alert("successfully deleted");
				window.location.reload();
			})
			.catch((error) => {
				console.error("Error:", error);
				alert("unsuccessfully delete!!!!");
			});
	};

	useEffect(() => {
		fetch("http://task.atiar.info/api/todo")
			.then((response) => response.json())
			.then((data) => setTodo(data));
	}, []);

	return (
		<div className="container mx-auto mt-10">
			<button
				className="bg-blue-500 text-white active:bg-blue-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 flex items-center justify-end"
				type="button"
				onClick={() => setModal(true)}
			>
				Add ToDo
			</button>
			{modal ? <AddTodo setModal={setModal} modal={modal} /> : null}

			{todo?.data?.map((todo, idx) => (
				<React.Fragment key={idx}>
					<article className="shadow-lg rounded-xl bg-white p-6 ring ring-gray-200 sm:p-8 mt-5">
						<React.Fragment key={todo.id}>
							<div className="flex items-start">
								<div className="sm:ml-8 flex-1">
									<div>
										<h2 className="mt-4 text-lg font-medium sm:text-xl">
											<a href="" className={select ? "hover:underline" : ""}>
												{todo?.title}
											</a>
										</h2>

										<p className="mt-1 text-sm text-gray-700 ">{todo?.note}</p>
									</div>

									<div className="mt-4 sm:flex sm:items-start sm:gap-2">
										<div className="flex items-center text-gray-500">
											<p>
												{`start date: ${todo?.start_date} at ${todo?.start_time}- ${todo?.end_date} at ${todo?.end_time}`}
											</p>
										</div>
									</div>
								</div>
								<div className="flex-1 flex justify-end items-center gap-10">
									<input
										onClick={() => setSelect(false)}
										type="checkbox"
										className="outline-none f-icons"
									/>
									<Link to={`/update/${todo?.id}`}>
										<i className="fa-regular fa-pen-to-square text-purple-600"></i>
									</Link>
									<i
										onClick={() => handleDelete(todo?.id)}
										className="fa-regular fa-trash-can text-red-700 cursor-pointer"
									></i>
								</div>
							</div>
						</React.Fragment>
					</article>
				</React.Fragment>
			))}
		</div>
	);
};

export default Todos;
