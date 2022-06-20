import { useEffect, useState } from "react";
import Head from 'next/head';
import Image from 'next/image';
//Importing Compoents
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import TodoList from '../Components/Home/TodoList';

export default function Home() {

  const [name, setName] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch('http://localhost:8000/tasks');

      const content = await response.json();

      setTasks(content);
    })();
  }, []);

  useEffect(() => {
    console.log(`The tasks are equal to : ${tasks}`);
  })

  const handleAddTodo = async e => {
    if (name.length > 0) {
      e.preventDefault();

      const response = await fetch('http://localhost:8000/tasks', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name
        })
      });

      const task = await response.json();

      setTasks([...tasks, task]);
      alert(`The value will be added to TodoList: ${name}`);
    } else {
      alert('Please enter a value to add to TodoList');
    }
  }

  //Databases ke kaam
  const create = async e => {
    if (name.length > 0) {
      e.preventDefault();

      const response = await fetch('http://localhost:8000/tasks', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name
        })
      });

      const task = await response.json();

      setTasks([...tasks, task]);
      alert(`The value will be added to TodoList: ${name}`);
    } else {
      alert('Please enter a value to add to TodoList');
    }
  }

  const update = async (id, checked) => {
    await fetch(`http://localhost:8000/tasks/${id}`, {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        complete: checked
      })
    });
  }

  const del = async id => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await fetch(`http://localhost:8000/tasks/${id}`, {
        method: 'DELETE'
      });

      setTasks(tasks.filter(t => t.id !== id));
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
            <form className='form_styling' onSubmit={create}>
              <div className='d-flex'>
                <div className='addItemInput'>
                  <input className='form-control w-80' placeholder='Please Type Any Value to Add to the Todo' onChange={(e) => setName(e.target.value)} type="text" />
                </div>
                <button className='btn btn-dark' type="submit">Add Item</button>
              </div>
            </form>

            <br />

            <div className='todoListContainer'>
              {
                ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map((item, index) => {
                  return (
                    <div key={index}>
                      <TodoList index={index} title={item} />
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
