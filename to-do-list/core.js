export default function html([first, ...strings], ...values) { // day goi la template engine
    return values.reduce(
        (acc, cur) => acc.concat(cur, strings.shift()),
        [first]
    )
    .filter(x => x && x !== true || x === 0) 
    .join('')
}

export function createStore(reducer) { // reducer co tac dung tao ra du lieu trong store
    let state = reducer()
    const roots = new Map()

    function render() { // render ra view
        for (const [root, component] of roots) {
            const output = component()  
            root.innerHTML = output
        }
    }

    return {
        // co tac dung nhan may cai view va day vao trong root de hien thi ra view
        attach(component, root) {
            roots.set(root, component) // doi voi obj thuong thi gan luon, nhung voi Map thi dung phuon thuc set
            render()
        },

        // co the co nhieu man hinh va connect cho ta biet se render ra man hinh nao
        connect(selector = state => state) {
            return component => (props, ...args) =>
                component(Object.assign({}, props, selector(state), ...args))
        },

        dispatch(action, ...args) {
            state = reducer(state, action, args)
            render()
        }
    }
}

