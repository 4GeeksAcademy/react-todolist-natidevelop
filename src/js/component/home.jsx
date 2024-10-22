import React, { useState, useEffect } from "react";


//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [tarea, setTarea] = useState("")
	const [lista, setLista] = useState([])

	async function agregarTareas(evento) {
		evento.preventDefault()
		if (tarea != "") {
			guardarTareas()
			setTarea("")
		} else {
			alert("Ingresar Tarea")
		}
		if (evento.key === "Enter") {
			guardarTareas()
			setTarea("")
		}
	}

	const guardarTareas = async () => {
		try {
			const url = "https://playground.4geeks.com/todo/todos/nati"
			const resp = await fetch(url, {
				method: "POST",
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					label: tarea,
					is_done: false
				})
			})
			if (resp.ok) {
				cargarTareas()
				return true
			}
		} catch (error) {
			console.log(error)
			return false
		}
	}
	const cargarTareas = async () => {
		try {
			const url = "https://playground.4geeks.com/todo/users/nati"
			const resp = await fetch(url)
			if (resp.status == 404) {
				crearUsuario()
				return
			}
			const data = await resp.json()
			setLista(data.todos)
			return true
		} catch (error) {
			console.error(error)
			return false
		}
	}

	const crearUsuario = async () => {
		try {
			const resp = await fetch("https://playground.4geeks.com/todo/users/nati", {
				method: "POST",
				headers: { "Content-Type": "application/json" }
			})
			if (resp.status == 201) {
				cargarTareas()
			}
		} catch (error) {
			console.log(error)
			return false
		}
	}

	const borrar = async (id) => {
		// console.log(id)
		try {
			const resp = await fetch("https://playground.4geeks.com/todo/todos/" + id, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" }
			})
			// console.log(resp.status)
			if (resp.status == 204) {
				cargarTareas()
				return true
			}
		} catch (error) {
			console.log(error)
			return false
		}
	}

	useEffect(() => {
		cargarTareas()
	}, [])

	return (
		<div className="container text-center ">
			<h1 className="text-center mt-5 ">Todos</h1>
			<form className="row">
				<div className="col-12 ">
					<input type="text "
						//  onKeyDown={(e) => agregarTareas(e)} 
						className="form-control border border-success" placeholder="Nueva Tarea" value={tarea} onChange={(evento) => setTarea(evento.target.value)} />
				</div>
				<div className="col-12 mt-2">
					<button type="submit" onClick={(evento) => agregarTareas(evento)} className="btn btn-success mb-3">Agregar Tarea</button>
				</div>
			</form>
			<ul className="list-group border-success">
				{lista.map((item, index) => (
					<li className="list-group-item border border-success" key={index}>
						{item.label}
						<i onClick={() => borrar(item.id)} className="m-1 fa-solid fa-trash icono-oculto"></i>
					</li>
				))}
			</ul>
			<span className="text-success">
				{(lista.length == 0) ? "No hay Tareas , Agregar Una " : ""}
			</span>
			<p></p>
			<span className="text-success">{lista.length} Items Left</span>
		</div>
	);
};

export default Home;
