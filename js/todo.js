const formulario = document.getElementById('formulario')
const listaTareas = documet.getElementById('lista-tareas')
const template = document.getElementById('template').content //Le agregamos el content para soloagregar el contenido
const fragment = document.createDocumentFragment()

//Variable Global para las tareas como objeto
let tareas = {}

//Agregamos lo eventos 
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('tareas')){
        tareas = JSON.parse(localStorage.getItem('tareas'))
    }
    pintarTareas()
})

const pintarTareas = () => {
    localStorage.setItem('tareas', JSON.stringify(tareas)) //jsson a variabole 
    if (Object.values(tareas).length === 0){ 
        listaTareas.innerHTML = `
        <div class="alert alert-dark">
                No task pending😢
            </div>
        `
        return 
    }
    listaTareas.innerHTML = ''
    Object.values(tareas).forEach((tarea) => {
        const clone = template.cloneNode(true)
        clone.querySelector('p').textContent = tarea.texto 
        if(tarea.estado){
            clone.querySelectorAll('.fas')[0].classList.replace('fa-circle-check', 'fa-undo-alt')
            clone.querySelector('.alert').classList.replace('alert-warning', 'alert-primary')
            clone.querySelector('p').style.textDecoration = 'line-through'
        }
        clone.querySelectorAll('.fas')[0].dataset.id = tarea.id
        clone.querySelectorAll('.fas')[1].dataset.id = tarea.id
        fragment.appendChild(clone)
    })
    listaTareas.appendChild(fragment)
}