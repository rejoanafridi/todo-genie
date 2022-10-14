import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function UpdateTodo({ modal, setModal }) {
	// const { history } = useHistory();
	const { id } = useParams();
	const [update, setUpdate] = useState({
		title: "",
		note: "",
		start_date: "",
		end_date: "",
		start_time: "",
		end_time: "",
	});
	console.log(update);
	// find single todo
	// const update_data = update?.find((fnd) => fnd.id == id);
	// console.log(update_data);
	useEffect(() => {
		if (id) {
			fetch(`http://task.atiar.info/api/todo`)
				.then((response) => response.json())
				.then((result) => {
					setUpdate(result?.data.find((fnd) => fnd.id == id));
				});
		}
	}, [id]);

	const handleUpdateTodo = () => {
		fetch(`http://task.atiar.info/api/todo/update`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(update),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Success:", data);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
		alert("successfully updated!!");
		setModal(false);
		// history.push("/");
	};

	return (
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
								onChange={(e) =>
									setUpdate((state) => {
										state[e.target.name] = e.target.value;
										return state;
									})
								}
								defaultValue={update?.title}
								name="title"
							/>
							<textarea
								className="px-3 mt-3 rounded-md h-40 border-2 border-gray-300"
								type="text"
								placeholder="write task note"
								onChange={(e) =>
									setUpdate((state) => {
										state[e.target.name] = e.target.value;
										return state;
									})
								}
								name="note"
								defaultValue={update?.note}
							/>
						</div>
						<div className="add-todo-datetimes flex justify-between gap-5 mt-5">
							<div className="dates flex flex-col  gap-5">
								<input
									className="border-2 border-gray-300 rounded-lg"
									type="date"
									placeholder="Start Date"
									onChange={(e) =>
										setUpdate((state) => {
											state[e.target.name] = e.target.value;
											return state;
										})
									}
									name="start_date"
									defaultValue={update?.start_date}
								/>
								<input
									className="border-2 border-gray-300 rounded-lg"
									type="date"
									defaultValue={update?.end_date}
									placeholder="End Date"
									onChange={(e) =>
										setUpdate((state) => {
											state[e.target.name] = e.target.value;
											return state;
										})
									}
									name="end_time"
								/>
							</div>
							<div className="times flex flex-col gap-5">
								<input
									className="border-2 border-gray-300 rounded-lg"
									type="time"
									placeholder="Start Time"
									onChange={(e) =>
										setUpdate((state) => {
											state[e.target.name] = e.target.value;
											return state;
										})
									}
									name="start_time"
									defaultValue={update?.start_time}
								/>
								<input
									className="border-2 border-gray-300 rounded-lg"
									type="time"
									placeholder="End Time"
									onChange={(e) =>
										setUpdate((state) => {
											state[e.target.name] = e.target.value;
											return state;
										})
									}
									name={update?.end_time}
									defaultValue={update?.end_time}
								/>
							</div>
						</div>
						<div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
							<div className="add-todo-submit text-center">
								<button
									className="bg-blue-500 text-white rounded-md px-12 py-1 mt-5"
									onClick={handleUpdateTodo}
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
	);
}
