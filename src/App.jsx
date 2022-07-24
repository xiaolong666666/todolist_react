import React, { Component } from 'react'
import Item from './js/Item'
import Footer from './js/Footer'
import './css'

class App extends Component{

    state = {
        todoDatas: [],
        todoNum: 0,
        view: "all",
        flag: false
    }

    // 添加Todo
    addTodo = e => {
        if(e.keyCode !== 13) return false
        if(e.target.value.trim() === "") return false
        let { todoDatas, todoNum } = this.state
        let todo = {
            id: new Date().getTime(),
            value: e.target.value.trim(),
            hasCompleted: false,
        }
        todoDatas.push(todo)
        todoNum++
        this.setState({ todoDatas, todoNum })
        e.target.value = ""
    }

    // 删除Todo
    deleteTodo = (todo) => {
        let { todoDatas, todoNum } = this.state
        todoDatas = todoDatas.filter(value => {
            if(todo.id === value.id){
                !todo.hasCompleted && todoNum--
                return false
            }
            return true
        })
        this.setState({ todoDatas, todoNum })
    }

    // 改变Todo状态
    changeHasCompleted = (todo) => {
        let { todoDatas, todoNum } = this.state
        todoDatas = todoDatas.map(value => {
            if(todo.id === value.id){
                value.hasCompleted = !todo.hasCompleted
                value.hasCompleted ? todoNum-- : todoNum++
            }
            return value
        })
        this.setState({ todoDatas, todoNum })
    }

    // 修改Todo
    editTodo = (todo) => {
        let { todoDatas } = this.state
        todoDatas = todoDatas.map(value => {
            if(todo.id === value.id){
                value.vlaue = todo.value
            }
            return value
        })
        this.setState({ todoDatas })
    }

    // 过滤Todo
    viewTodo = (view) => this.setState({ view })

    // 全选或全不选
    isAll = () => {
        let { todoDatas, todoNum, flag } = this.state
        flag = !flag
        todoDatas = todoDatas.map(value => {
            value.hasCompleted = flag
            return value
        })
        if (flag) {
            todoNum = 0
        } else {
            todoNum = todoDatas.length
        }
        this.setState({ todoDatas, todoNum, flag })
    }

    // 删除已完成Todo
    deleteHasCompleted = () => {
        let { todoDatas } = this.state
        todoDatas = todoDatas.filter(({ hasCompleted }) => !hasCompleted)
        this.setState({ todoDatas })
    }

    render(){
        let { addTodo, isAll } = this
        let { todoDatas, view } = this.state
        let filterTodoDatas = todoDatas.filter(({ hasCompleted }) => {
            switch (view) {
                case "all": return true
                case "active": return !hasCompleted
                case "completed": return hasCompleted
            }
        })
        let items = filterTodoDatas.map((todo,index) => {
            return <Item key={index} todo={todo} {...this}/>
        })
        return (
            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <input type="text" className="new-todo" placeholder="What needs to do done?" onKeyUp={addTodo}/>
                </header>
                <section className="main">
                    <input type="checkbox" className="toggle-all" id="toggle-all" onChange={isAll}/>
                    <label htmlFor="toggle-all"></label>
                    <ul className="todo-list">
                        {
                            items
                        }
                    </ul>
                </section>
                <Footer {...this} {...this.state}/>
            </section>
        )
    }
}

export default App
