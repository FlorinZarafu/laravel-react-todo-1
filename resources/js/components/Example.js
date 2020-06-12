import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class Example extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            newTaskData: {
                name: "",
                description: ""
            }
        };
        this.addTask = this.addTask.bind(this);
    }
    componentDidMount() {
        this.loadTask();
    }

    loadTask() {
        axios.get(`http://127.0.0.1:8000/api/tasks`).then(res => {
            this.setState({
                tasks: res.data
            });
        });
    }

    addTask(e) {
        e.preventDefault();
        axios
            .post(`http://127.0.0.1:8000/api/task`, this.state.newTaskData)
            .then(res => {
                let { tasks } = this.state;
                this.loadTask();
                this.setState({
                    tasks
                });
            });
    }

    deleteTask(id) {
        axios.delete(`http://127.0.0.1:8000/api/task/${id}`).then(res => {
            this.loadTask();
        });
    }

    render() {
        const { newTaskData } = this.state;
        let tasks = this.state.tasks.map(task => {
            return (
                <tr key={task.id}>
                    <td>{task.id}</td>
                    <td>{task.name}</td>
                    <td>{task.description}</td>
                    <td>
                        <button>Edit</button>
                        <button onClick={e => this.deleteTask(task.id)}>
                            Delete
                        </button>
                    </td>
                </tr>
            );
        });
        return (
            <div className="container">
                <form onSubmit={this.addTask.bind(this)}>
                    <input
                        type="text"
                        value={newTaskData.name}
                        onChange={e => {
                            newTaskData.name = e.target.value;
                            this.setState({
                                newTaskData
                            });
                        }}
                    />
                    <input
                        type="text"
                        value={newTaskData.description}
                        onChange={e => {
                            newTaskData.description = e.target.value;
                            this.setState({
                                newTaskData
                            });
                        }}
                    />
                    <button type="submit">Add</button>
                </form>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>{tasks}</tbody>
                </table>
            </div>
        );
    }
}

export default Example;

if (document.getElementById("example")) {
    ReactDOM.render(<Example />, document.getElementById("example"));
}
