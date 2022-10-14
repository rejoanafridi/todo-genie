import React, { useEffect, useState } from "react";

export default function AddTodo({ modal, setModal }) {
	const [title, setTitle] = useState("");
	const [note, setNote] = useState("");
	const [start_date, setStartDate] = useState("");
	const [end_date, setEndDate] = useState("");
	const [start_time, setStartTime] = useState("");
	const [end_time, setEndTime] = useState("");
	const todoSubmit = {
		title,
		note,
		start_date,
		end_date,
		start_time,
		end_time,
	};
	// submit data and create new todo.
	const handleAddTodo = () => {
		fetch(`http://task.atiar.info/api/todo/create`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(todoSubmit),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Success:", data);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
		alert("successfully added!!");
		setModal(false);
	};

	return (
		<>
			{modal ? (
				<>
					<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
						<div className="relative w-auto my-6 mx-auto max-w-3xl">
							{/*content*/}
							<div className=" rounded-lg shadow-lg relative flex flex-col w-full bg-white px-10 py-5">
								{/*header*/}
								<div className="flex items-center justify-center p-5 border-b border-solid border-slate-200 rounded-t">
									<h3 className="text-3xl font-semibold">Add ToDo</h3>
									<button
										className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none flex justify-end items-center"
										type="button"
										onClick={() => setModal(false)}
									>
										<span className="pl-0">X</span>
									</button>
								</div>

								<div className="add-todo-title flex flex-col mt-4">
									<input
										className=" px-3 mt-3 border-2 border-gray-300 rounded-lg  h-10"
										type="text"
										placeholder="write task title"
										onChange={(e) => setTitle(e.target.value)}
										value={title}
									/>
									<textarea
										className="px-3 mt-3 rounded-md h-40 border-2 border-gray-300"
										type="text"
										placeholder="write task note"
										onChange={(e) => setNote(e.target.value)}
									/>
								</div>
								<div className="add-todo-datetimes flex justify-between gap-5 mt-5">
									<div className="dates flex flex-col  gap-5">
										<input
											className="border-2 border-gray-300 rounded-lg"
											type="date"
											placeholder="Start Date"
											onChange={(e) => setStartDate(e.target.value)}
										/>
										<input
											className="border-2 border-gray-300 rounded-lg"
											type="date"
											placeholder="End Date"
											onChange={(e) => setEndDate(e.target.value)}
										/>
									</div>
									<div className="times flex flex-col gap-5">
										<input
											className="border-2 border-gray-300 rounded-lg"
											type="time"
											placeholder="Start Time"
											onChange={(e) => setStartTime(e.target.value)}
										/>
										<input
											className="border-2 border-gray-300 rounded-lg"
											type="time"
											placeholder="End Time"
											onChange={(e) => setEndTime(e.target.value)}
										/>
									</div>
								</div>
								<div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
									<div className="add-todo-submit text-center">
										<button
											className="bg-blue-500 text-white rounded-md px-12 py-1 mt-5"
											onClick={handleAddTodo}
										>
											Add
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
				</>
			) : null}
		</>
	);
}
