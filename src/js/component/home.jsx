import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [tarea, setTarea] = useState("")
	const [lista, setLista] = useState([])
	function agregarTareas(evento) {
		evento.preventDefault()
		if (tarea != "") {

			setLista([...lista, tarea])
			setTarea("")
		} else {
			alert("Ingresar Tarea")
		}
		if (evento.key === "Enter") {
			setLista([...lista, tarea])
			setTarea("")
		}
	}
	return (
		<div className="container text-center ">
			<h1 className="text-center mt-5 ">Todos</h1>
			<form className="row">
				<div className="col-12 ">
					<input type="text "
						//  onKeyDown={(e) => agregarTareas(e)} 
						className="form-control border border-primary" placeholder="Nueva Tarea" value={tarea} onChange={(evento) => setTarea(evento.target.value)} />
				</div>
				<div className="col-12 mt-2">
					<button type="submit" onClick={(evento) => agregarTareas(evento)} className="btn btn-primary mb-3">Agregar Tarea</button>
				</div>
			</form>
			<ul className="list-group border-primary">
				{lista.map((item, index) => (
					<li className="list-group-item border border-primary" key={index}>{item}<i onClick={() => {

						let listaFiltrada = lista.filter((task, subindex) => {
							return (subindex != index)
						})
						setLista(listaFiltrada)

					}}
						className="m-1 fa-solid fa-trash icono-oculto"></i></li>
				))}
			</ul>
			<span className="text-primary
			">{(lista.length==0)?"No hay Tareas , Agregar Una ":""}</span>
			<p></p>
			<span className="text-success">{lista.length} Items Left</span>
		</div>
	);
};

export default Home;
