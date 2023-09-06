import React, { useState } from 'react'
import PageHeader from '../page-header/PageHeader';

const Form = (props) => {
    const [name, setName] = useState("");
    const handelSubmit = e => {
        e.preventDefault();
        props.handelName(name);
    }
  return (
    <>
        <PageHeader>
      My Favorites
    </PageHeader>
    <div>
        <h3>Get started right now!</h3>
        <form onSubmit={handelSubmit}>
            <div>
                <label>I want to start chatting with the name...</label><br/>
                <input type="text" placeholder="My name.." value={name} onChange={e=>setName(e.target.value)} />
                <input type="submit" value="Start Chatting"/>
            </div>
        </form>
    </div>
    </>
  )
}

export default Form