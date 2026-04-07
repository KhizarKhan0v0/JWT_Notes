import axios from 'axios'
import { useForm } from "react-hook-form";
// 👇
axios.defaults.withCredentials = true;

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onlogin = async (val)=>{
    console.log(val);
    let {username, password} = val
    let dbres = await axios.get('http://localhost:8080/login', {params:val})
    console.log(dbres)
  }

  const lvoData= async()=>{
    let d = await axios.get('http://localhost:8080/getdata')
    console.log('\n\n\n😀 Data : ', d)
    console.log('\n\n\n')
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onlogin)}>
        <input type="text" {...register('username')}/>
        <input type="text" {...register('password')}/>
        <button type='submit'>Login</button>
      </form>
      <button onClick={lvoData}>Get Data Admin Only</button>
    </div>
  )
}

export default App
