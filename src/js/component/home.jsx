import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [tarea, setTarea] = useState("")
	const [lista, setLista] = useState([])
	function agregarTareas(e) {
		e.preventDefault()
		if(tarea != ""){

			setLista([...lista, tarea])
			setTarea("")
		}else{
			alert("Ingresar Tarea")
		}
		if(e.key==="Enter"){
			setLista([...lista, tarea])
			setTarea("")
		}
	}
	return (
		<div className="container text-center">
			<h1 className="text-center mt-5">Todolist</h1>
			<form className="row">
				<div className="col-12">
					<input type="text"
					//  onKeyDown={(e) => agregarTareas(e)} 
					 className="form-control" placeholder="task" value={tarea} onChange={(e) => setTarea(e.target.value)} />
				</div>
				<div className="col-12 mt-2">
					<button type="submit" onClick={(e) => agregarTareas(e)} className="btn btn-primary mb-3">Agregar Tarea</button>
				</div>
			</form>
			<ul className="list-group">
				{lista.map((item, index) => (

					<li className="list-group-item"key={index}>{item}</li>
				))}
			</ul>
		</div>
	);
};

export default Home;
