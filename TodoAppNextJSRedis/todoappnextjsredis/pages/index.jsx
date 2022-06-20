import { useEffect, useState } from "react";
import Head from 'next/head';
import Image from 'next/image';
//Importing Compoents
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import TodoList from '../Components/Home/TodoList';

export default function Home() {

  const [addTodoValue, setAddTodoValue] = useState('');
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch('http://localhost:8000/todo');

      const content = await response.json();

      setTasks(content);
    })();
  }, []);

  useEffect(() => {
    console.log(`The tasks are equal to : ${todoList}`);
  })

  const handleAddTodo = async (e) => {
    if (addTodoValue.length > 0) {
      e.preventDefault();

      const response = await fetch('http://localhost:8000/todo', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          addTodoValue
        })
      });

      const todo = await response.json();

      setTodoList([...todoList, todo]);
      alert(`The value will be added to TodoList: ${addTodoValue}`);
    } else {
      alert('Please enter a value to add to TodoList');
    }
  }

  const update = async (id, checked) => {
    await fetch(`http://localhost:8000/todo/${id}`, {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        complete: checked
      })
    });
  }

  const del = async id => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await fetch(`http://localhost:8000/todo/${id}`, {
        method: 'DELETE'
      });

      setTodoList(todoList.filter(t => t.id !== id));
    }
  }

  return (
    <div>
      <Head>
        <title>TodoAppNextJSRedis</title>
      </Head>

      <Header />

      <div className={`container`}>
        <div className={`row`}>
          <div className={`col-12`}>
            <br />
            <h1 className='text-center text-info'>NextJS & Redis Based Todo App</h1>
            <form className='form_styling' onSubmit={handleAddTodo}>
              <div className='d-flex'>
                <div className='addItemInput'>
                  <input className='form-control w-80' placeholder='Please Type Any Value to Add to the Todo' onChange={(e) => setAddTodoValue(e.target.value)} type="text" />
                </div>
                <button className='btn btn-dark' type="submit">Add Item</button>
              </div>
            </form>

            <br />

            <div className='todoListContainer'>
              {
                todoList.map((item, index) => {
                  return (
                    <div key={index}>
                      <TodoList index={index} title={item.name} />
                    </div>
                  )
                })
              }
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
