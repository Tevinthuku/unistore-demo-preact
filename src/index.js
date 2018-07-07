import { Component, render } from "preact";
import { Provider, createStore, connect } from "unistore";
const initialState = {
  count: 0,
  secondcount: 0,
  list: []
}

let store = createStore(initialState);

let actions = store => ({
  
  increment(state) {
    return { count: state.count + 1 };
  },

  increment2: ({ secondcount }) => ({ secondcount: secondcount + 1 }),

  addTodo: (state, data)  => {
    return {
      ...state,
      list: [...state.list, data]
    }
  },

});

const App = connect(["count", "secondcount", "list"], actions)(({ 
  count, secondcount, list, addTodo, increment, increment2 }) => (
  <div>
    <p>Count: {count}</p>
    <button onClick={increment}>Increment</button>
    <p>Second count: {secondcount}</p>
    <button onClick={increment2}>Increment</button>
    <p>Todo List</p>
    <List {...{addTodo,list}} />
  </div>
));

class List extends Component {
  state = {
    input: ''
  }
  onChange = event => {
    this.setState({input: event.target.value})
  }

  render() {
    const { addTodo, list } = this.props;
    const { input } = this.state;
    return (
      <div>
        <form onSubmit={() => addTodo(input)} action="javascript:">
        <input type="text" onChange={this.onChange} />
        </form>
        {list.map(item => (
          <li>{item}</li>
        ))}
      </div>

    )
  }
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.body
);
