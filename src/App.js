import './App.css';
import React, {useState} from 'react';
import {nanoid} from 'nanoid'

function id() {
    return nanoid(10)
}

const initProds = [
    {id: id(), name: 'prod1', catg: 'catg1', cost: 100},
    {id: id(), name: 'prod2', catg: 'catg2', cost: 200},
    {id: id(), name: 'prod3', catg: 'catg3', cost: 300},
];
function App() {
    const [notes, setNotes] = useState(initProds)
    const [obj, setObj] = useState(getInitObj());
    const [editId, setEdit] = useState(null)
    function remItem(id){
        setNotes(notes.filter(note => note.id !== id))
    }

    function getInitObj() {
        return {
            id: id(),
            name : '',
            catg : '',
            cost : ''
        }
    }

    function changeItem(prop, event) {
        if(editId || editId === 0){
            setNotes(notes.map(note => note.id === editId ? {...note, [prop]: event.target.value} : note));
        } else {
            setObj({...obj, [prop]: event.target.value})
        }
    }

    function getValue(prop) {
        if(editId || editId === 0){
           return  notes.reduce((res,note) =>
                note.id === editId ? note[prop]:  note);
        } else {
            return obj[prop]
        }
    }

    function saveItem(){
        if (editId || editId === 0){
            setEdit(null)
        } else {
            setNotes([...notes, obj])
            setObj(getInitObj())
        }
    }

console.log(notes)
    let result = notes.map(item => {
        return (
            <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.catg}</td>
                <td>{item.cost}</td>
                <td><button onClick={()=> remItem(item.id)}>delete</button></td>
                <td><button onClick={() => setEdit(item.id)}>edit</button></td>
            </tr>
        ) })
    return <>
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Cost</th>
            </tr>
            </thead>
            <tbody>
            {result}
            </tbody>
        </table>
        <br/>
        <input value={getValue('name')} onChange={event => changeItem('name', event)} />
        <input value={getValue('catg')} onChange={event => changeItem('catg', event)} />
        <input value={getValue('cost')} onChange={event => changeItem('cost', event)} />
        <button onClick={saveItem}>save</button>
    </>
}
export default App;
