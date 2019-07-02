import React,{Component} from 'react'

class App extends Component {

    constructor(){
        super()
        this.state = {
            title: '',
            description: '',
            tasks:[],
            _id:''
        }
        this.addTask = this.addTask.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    deteleTask(task){
        console.log('Eliminando tarea')
        console.log(task)
        if(confirm('Estas seguro de querer eliminar este elemento?')){
            fetch(`/api/tasks/${task}`,{
                method:'DELETE',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
            .then(resp => resp.json())
            .then(res => {
                console.log(res)
                M.toast({html:'Tarea eliminada'})
            })
            this.fetchTask()
        }
    }

    editTask(task){
        fetch(`/api/tasks/${task}`)
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                this.setState({
                    title:data.title,
                    description:data.description,
                    _id: data._id
                })
            })
    }

    handleChange(e){
        const { name, value } = e.target
        this.setState({
            [name]:value
        })
    }

    addTask(e){
        console.log(this.state)
        if(this.state._id){
            fetch(`/api/tasks/${this.state._id}`,{
                method:'PUT',
                body: JSON.stringify(this.state),
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                this.setState({
                    title:'',
                    description:'',
                    _id:''
                })
                M.toast({html:'Tarea actualizada'})
                this.fetchTask()
            })
            .catch(err => console.log(err))

        } else {
            fetch('/api/tasks',{
                method: 'POST',
                body: JSON.stringify(this.state),
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
            .then(res => console.log(res))
            .then(data => {
                console.log(data)
                M.toast({html:'Tarea guardada'})
                this.setState({title:'', description:''})
                this.fetchTask()
            })
            .catch(err => console.log(err))
        }
        e.preventDefault()
    }

    componentDidMount(){
            this.fetchTask()
    }

    fetchTask(){
        fetch('/api/tasks')
        .then(res => res.json())
        .then(data => {
            this.setState({
                tasks:data
            })
        })
        .catch(err => console.log(err))
    }

    render(){
        return (
            <div>
                {/* Navegacion */}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">MERN Stack</a>
                    </div>
                </nav>
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input value={this.state.title} name="title" onChange={this.handleChange} type="text" placeholder="Titulo de tarea" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea value={this.state.description} onChange={this.handleChange} name="description" placeholder="Descripcion de la tarea..." className="materialize-textarea">
                                                </textarea>
                                            </div>
                                        </div>
                                        <button className="btn btn-light-blue darken-4">
                                            Send
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Titulo</th>
                                        <th>Descripcion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task => {
                                            return (
                                                <tr key={task._id}>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>
                                                        <button  className="btn btn-light-blue darken-4" onClick={() => this.deteleTask(task._id)}>
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                         <button onClick={() => this.editTask(task._id)} className="btn btn-light-blue darken-4" style={{margin:'4px'}}>
                                                            <i className="material-icons">edit</i>        
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App