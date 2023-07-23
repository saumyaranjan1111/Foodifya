import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Signup() {

    // create a state variable credentials which is a js object containing the keys, name, password, email, geolocation
    // we can change the state of this variable only by using the setcredentials function
    // we are using a state variable because it can change its value without loading the whole page again 
    
    const [credentials, setcredentials] = useState({name : "", email:"",password:"",geolocation:""});
    const handleSubmit = async(e) => {
    // when the form is submitted, prevent the default action 
    // e.preventDefault();: This line prevents the default form submission behavior, which would cause the page to reload upon form submission. Instead, the custom handleSubmit function will be executed
        e.preventDefault();

        // response will contain the response that we will get once the submit button is pressed -> handlesubmit is triggered, response contains the result of the fetch request made to the url using the method post and using the header as content-type : application/json to indicate that the body following this post request is json
        // the body of the request made to the fetch url is in the format that we earlier defined the schema to be
        // and we send the data entered in our form, in the predefined structure of the schema
        // this data is sent to the /api/createuser
        // which is then handled by the backend and sends a success : true when recieved properly
        const response = await fetch("http://localhost:5000/api/createuser", {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(
            {
                name : credentials.name,
                email : credentials.email,
                password : credentials.password,
                location : credentials.geolocation,
            }
        )
        });

        const json = await response.json()
        console.log(json)
        
        if(!json.success){
            alert("Enter Valid Credentials");
        }
    }

    // working of onchange function

    // The user starts filling out the form. Let's say they type their name in the "Name" input field. The onChange function is connected to this input field through the onChange event.

// The onChange function is triggered when the user types something in the "Name" input field. It receives an event object representing the event that occurred.

// Let's assume the user typed the name "John Doe." The event.target in this case refers to the input element that triggered the event, which is the "Name" input field. The event.target.name would be "name" (since the input field has the name attribute set to "name"), and the event.target.value would be "John Doe" (the value entered by the user).

// The onChange function then updates the credentials state. It uses the spread operator ({ ...credentials }) to create a shallow copy of the current credentials object, so the original state remains unchanged.

// Next, the function uses computed property names to dynamically update the corresponding field in the copied credentials object. [event.target.name] is the computed property name, and in this case, it's [name], which evaluates to name. So, the name field in the copied object will be updated with the value "John Doe".

// The copied credentials object now looks like this:
// {
//   name: "John Doe",
//   email: "",
//   password: "",
//   geolocation: ""
// }

// Finally, the function calls setcredentials with the updated object. This updates the credentials state, and React will trigger a re-render of the component with the new state values.

    const onChange=(event)=>{
        setcredentials({...credentials, [event.target.name]:event.target.value});
    }
  return (
    <>
    <div className="container">

    {/* onsubmit hands over the data to be handled by the handleSubmit function to handle the data entered in the form when the form is submitted */}
        <form onSubmit={handleSubmit}>

        <div className="mb-3">
            <label htmlfor="name" className="form-label">Name</label>

            <input type="text" className="form-control" name = 'name' value = {credentials.name} onChange={onChange}/>
        </div>

        <div className="mb-3">
            <label htmlfor="exampleInputEmail1" className="form-label">Email address</label>

            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name = 'email' value = {credentials.email} onChange={onChange}/>

            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlfor="exampleInputPassword1" className="form-label">Password</label>

            <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} />
        </div>
        <div className="mb-3">
            <label htmlfor="exampleInputPassword1" className="form-label">Address</label>

            <input type="text" className="form-control" id="exampleInputPassword1" name='geolocation' value={credentials.geolocation} onChange={onChange}/>
        </div>
        
        <button type="submit" className="m-3 btn bg-teal-darken-4">Submit</button>
        
        <Link to='/login' className='m-3 btn btn-danger'>Already an User?</Link>
        </form>
    </div>
    </>
  )
}
