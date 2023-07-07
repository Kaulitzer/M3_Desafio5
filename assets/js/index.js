// Arreglo de tareas
const tareas = [
  {
    id: 1,
    descripcion: "Estudiar",
    realizada: false
  },
  {
    id: 2,
    descripcion: "Cocinar",
    realizada: false
  },
  {
    id: 3,
    descripcion: "Hacer ejercicio",
    realizada: false
  }
];

// Contador para generar IDs
let contadorId = 4;

// Elementos del DOM
const listaTareas = document.getElementById('listaTareas');
const totalTareas = document.getElementById('totalTareas');
const btnAgregarTarea = document.getElementById('btnAgregarTarea');
const inputDescripcion = document.getElementById('inputDescripcion');
const tareasMarcadas = document.getElementById('tareasMarcadas');

// Función para agregar una nueva tarea
function agregarTarea() {
  const descripcion = inputDescripcion.value.trim();
  if (descripcion === '') {
    alert('Debe agregar una tarea');
    return; // Salir de la función si la descripción está vacía
  }

  const nuevaTarea = {
    id: contadorId,
    descripcion: descripcion,
    realizada: false
  };

  tareas.push(nuevaTarea);

  contadorId++;
  mostrarTareas();
  actualizarTotalTareas();

  inputDescripcion.value = '';
  inputDescripcion.focus();
}


// Función para eliminar una tarea
function eliminarTarea(id) {
  const indice = tareas.findIndex(t => t.id === id);
  if (indice !== -1) {
    tareas.splice(indice, 1);
    mostrarTareas();
    actualizarTotalTareas();
    actualizarTareasMarcadas();
  }
}

// Función para cambiar el estado de una tarea
function cambiarEstadoTarea(id) {
  const tarea = tareas.find(t => t.id === id);
  tarea.realizada = !tarea.realizada;
  mostrarTareas();
  actualizarTareasMarcadas();
}

// Función para mostrar las tareas en la lista
function mostrarTareas() {
  listaTareas.innerHTML = '';

  tareas.forEach(tarea => {
    const tareaElemento = document.createElement('li');

    const idElemento = document.createElement('span');
    idElemento.textContent = `ID: ${tarea.id.toString().padStart(7, '0')}`;
    tareaElemento.appendChild(idElemento);

    const descripcionElemento = document.createElement('span');
    descripcionElemento.textContent = tarea.descripcion;

    if (tarea.realizada) {
      descripcionElemento.classList.add('realizada');
    }

    const cambiarEstadoElemento = document.createElement('button');
    cambiarEstadoElemento.textContent = tarea.realizada ? 'Desmarcar' : 'Marcar';
    cambiarEstadoElemento.addEventListener('click', () => cambiarEstadoTarea(tarea.id));

    const eliminarElemento = document.createElement('button');
    eliminarElemento.textContent = 'Eliminar';
    eliminarElemento.addEventListener('click', () => eliminarTarea(tarea.id));

    tareaElemento.appendChild(descripcionElemento);
    tareaElemento.appendChild(cambiarEstadoElemento);
    tareaElemento.appendChild(eliminarElemento);

    listaTareas.appendChild(tareaElemento);
  });
  actualizarTareasMarcadas();
}

// Función para actualizar el total de tareas
function actualizarTotalTareas() {
  const total = tareas.length;
  totalTareas.textContent = `Total: ${total}`;
}

// Función para actualizar el total de tareas marcadas
function actualizarTareasMarcadas() {
  const tareasMarcadasCount = tareas.filter(tarea => tarea.realizada).length;
  tareasMarcadas.textContent = `Tareas Hechas: ${tareasMarcadasCount}`;
}


// Evento click del botón Agregar Tarea
btnAgregarTarea.addEventListener('click', agregarTarea);



// Mostrar tareas iniciales
mostrarTareas();
actualizarTotalTareas();
actualizarTareasMarcadas();