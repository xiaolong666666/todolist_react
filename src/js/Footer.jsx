import React, { Component } from 'react'

class Footer extends Component {
    render() {
        let { todoNum, view, viewTodo, deleteHasCompleted } = this.props
        return (
            <footer className="footer">
                <span className="todo-count">
                    <span>{todoNum}</span>
                    <span>{todoNum > 1 ? " items": " item"} left</span>
                </span>
                <ul className="filters">
                    <li>
                        <a
                            href="#/all"
                            onClick={() => viewTodo("all")}
                            className={view === "all" ? "selected" : ""}
                        >
                            all
                        </a>
                    </li>
                    <li>
                        <a
                            href="#/active"
                            onClick={() => viewTodo("active")}
                            className={view === "active" ? "selected" : ""}
                        >
                            active
                        </a>
                    </li>
                    <li>
                        <a
                            href="#/completed"
                            onClick={() => viewTodo("completed")}
                            className={view === "completed" ? "selected" : ""}
                        >
                            completed
                        </a>
                    </li>
                </ul>
                <button className="clear-completed" onClick={deleteHasCompleted}>Clear completed</button>
            </footer>
        )
    }
}

export default Footer