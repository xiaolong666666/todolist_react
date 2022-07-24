import React, { Component, createRef } from 'react'

class Item extends Component {
    state = {
        inEdit: false,
        flag: true
    }

    myInput = createRef(null)
    
    handdle = () => {
        this.setState(
            { inEdit: true },
            () => {
                let { todo } = this.props
                this.myInput.current.value = todo.value
                this.myInput.current.focus()
            }
        )
    }

    onEditInputBlur = () => {
        const { todo, editTodo } = this.props
        const { flag } = this.state
        if (flag) {
            todo.value = this.myInput.current.value.trim()
            editTodo(todo)
            this.setState({ inEdit: false })
        }
    }

    onEditInputKeyup = (e) => {
        const { todo, editTodo } = this.props
        if (e.key !== "Enter" && e.key !== "Escape") return false
        if (e.key === "Enter") {
            todo.value = this.myInput.current.value.trim()
            editTodo(todo)
            this.setState({ inEdit: false })
        }
        if (e.key === "Escape") {
            this.setState({ inEdit: false, flag: false })
            setTimeout(() => this.setState({ flag: true }), 10)
        }
    }

    render() {
        let { todo, deleteTodo, changeHasCompleted } = this.props
        let { inEdit } = this.state
        let completed = todo.hasCompleted ? "completed" : ""
        let className = inEdit ? `${completed} editing`  : completed
        return (
            <li className={className}>
                <div className="view">
                    <input
                        type="checkbox"
                        onChange={() => changeHasCompleted(todo)}
                        checked={todo.hasCompleted}
                        className="toggle"
                    />
                    <label onDoubleClick={this.handdle}>{todo.value}</label>
                    <button className="destroy" onClick={() => deleteTodo(todo)}></button>
                </div>
                <input type="text" className="edit" ref={this.myInput}
                    onBlur={this.onEditInputBlur}
                    onKeyUp={this.onEditInputKeyup}
                />
            </li>
        )
    }
}

export default Item