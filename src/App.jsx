import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UpdateTodo from "./components/UpdateTodo";

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<TodoList />}></Route>
					<Route path="/add" element={<AddTodo />}></Route>
					<Route path="/update/:id" element={<UpdateTodo />}></Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
