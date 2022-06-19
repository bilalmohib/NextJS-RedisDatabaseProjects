import Head from 'next/head'
import Image from 'next/image'
//Importing Compoents
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import TodoList from '../Components/Home/TodoList';

export default function Home() {
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
            <form className='form_styling' action="javascript:void(0);">
              <div className='d-flex'>
                <div className='addItemInput'>
                  <input className='form-control w-80' placeholder='Please Type Any Value to Add to the Todo' type="text" />
                </div>
                <button className='btn btn-dark'>Add Item</button>
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
