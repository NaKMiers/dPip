import html from '../core.js'
import { connect } from '../store.js'
import Header from '../component/header.js'
import TodoList from './todoList.js' // TodoList nay la thuc chat la connect()(TodoList)
import Footer from '../component/footer.js'

function App({ todos }) { 
    return html`
        <section class="todoapp">
            ${Header()}
            ${todos.length >0 && TodoList()}
            ${todos.length >0 && Footer()}
        </section>
    `
}

export default connect()(App)