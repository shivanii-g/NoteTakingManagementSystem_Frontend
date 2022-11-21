import React, { useState, useEffect }  from 'react';
import {withRouter} from 'react-router-dom'
import Navbar from './Navbar';
import { Nav,Container, Row, Col, Form, FormControl,FormGroup,FormLabel, Button, Modal} from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import LoadingBar from './LoadingBar';
import '../css/Notes.css'
import { FaRegPlusSquare , FaTrash, FaEdit} from "react-icons/fa";

const Notes = (props) =>{

        let temp=JSON.parse(localStorage.getItem('local'));

        const initialState = {
            note:{
                noteTitle:'',
                noteDesc:'',
                noteImg:null,
                noteFile:null,
                setShow: false,
                notes: [],
                image:null,
                document:null,
                idUser: temp.user.idUser,
               
            },
            idNote:-1,
            add:false,
            update: false,
            delete: false,
            get: false,
            // show: false,
            colors: ["green","yellow","black","blue","orange","pink","cyan"],  
        }

        const [fullState, setFullState] = useState(initialState);

        useEffect(() => {
            localStorage.setItem('method','POST')
            console.log("localstorage "+localStorage.getItem('method'));
    
            let temp=JSON.parse(localStorage.getItem('local'));
            console.log("here notes 2  "+temp.user.idUser);
            console.log(' id id id', fullState.note.idUser);
            fetchAllNotes ();
           
            return ()=>{
                document.body.style.background=null;
            }
        }, [])
        

    function handleChange (event) {
        setFullState ({
            ...fullState,
          note: Object.assign ({}, fullState.note, {
              [event.target.name]: event.target.value,
          }),
        });
    }

    const handleClose = () => {
        setFullState ({
                ...fullState,
                note: Object.assign ({}, fullState.note, {
                    setShow: false
                }),
            });
    }

    const handleShow = () => {
            console.log('first clo: ',fullState);
            const dummyState = {...fullState};
            dummyState.note.setShow = true;
            setFullState(dummyState);
            
    }

    

    function handleSave(){
        localStorage.setItem("method","POST");
        setFullState ({
            ...fullState,
            note: Object.assign ({}, fullState.note, {
                noteTitle:'',
                noteDesc:''
            }),
          });
    }

    function handleDelete(){
        console.log("in delete id "+fullState.idNote);
        setFullState({
            ...fullState,
            delete: true
        })
              fetch('http://ntrs-backend.herokuapp.com/notes/deleteNotes/'+fullState.idNote, {
                method: 'DELETE',
                })
                .then(res =>res.json())
                  .then (res => {
                      setFullState({
                          ...fullState,
                          delete:false
                      })
                      console.log("result "+JSON.stringify(res));
                    if (res.msg === "deleted") {
                      console.log("deleted");
                      alert('note deleted');
                      setFullState({
                        ...fullState,
                        delete: false
                    })
                      handleClose();
                      window.location.reload(true);
                    //   props.history.push('/reminders');
                    } else  {
                        setFullState({
                            ...fullState,
                            delete: false
                        })
                        alert('failed to delete')
                      console.log("Error in deleting");
                    }
                  })
                  .catch (err => {
                    setFullState({
                        ...fullState,
                        delete: false
                    })
                    alert('failed to delete')
                    console.log (err);
                  })
                
            
    }

    const handleEdit = ( note)=>{
        if(note!=''){
            console.log("note "+note.idNote);
            // setFullState({
            //     ...fullState,
            //     idNote: note.idNote
            // })
            // const dummyState = {...fullState};
            // dummyState.idNote = note.idNote;
            // console.log('dummy :', dummyState.idNote)
            // setFullState(dummyState);

            fullState.idNote = note.idNote;
            console.log('id '+fullState.idNote+" length "+fullState.note.notes.length);
            for (let index = 0; index < fullState.note.notes.length; index++) {
                console.log("inner lop");
                if (note.idNote === fullState.note.notes[index].idNote) {
                    setFullState ({
                        ...fullState,
                        note: Object.assign ({}, fullState.note, {
                            noteTitle : fullState.note.notes[index].noteTitle,
                            noteDesc:fullState.note.notes[index].noteDesc,
                            // noteImg:fullState.note.notes[index].noteImg,
                            // noteFile: fullState.note.notes[index].noteFile
                        })
                    })

                    localStorage.setItem("method","PATCH");
                    console.log("later "+localStorage.getItem("method"));
                 
                }
                
            }
           }
    }
    
    const fetchAllNotes= () => {
        setFullState({
            ...fullState,
            get:true
        })
        console.log("here "+fullState.idNote+" iduser "+fullState.note.idUser);
        fetch('http://ntrs-backend.herokuapp.com/notes/getNoteByidUser/'+fullState.note.idUser, {
            headers: {Authorization: localStorage.getItem('token')},
            method: 'GET',
            responseType:"blob"
        })
        .then(response => response.json())
        .then (data => {

            setFullState({
                ...fullState,
                get:false
            })

            if(data.status== 200){
                console.log('result',data);
    
                setFullState({
                    ...fullState,
                    note: Object.assign ({}, fullState.note, {
                        notes: data.data
                    })
                    
                })
            }
            else if(data.status==401){
                
                alert("session expired");
                props.history.push('/login');
            }
            else{
                console.log("error");
            }
           

        })
        .catch(error => {
            console.log('error', error)
            setFullState({
                 ...fullState,
                get: false
            })
        });
    }

    function onSubmit(e){
        e.preventDefault();
        let temp=JSON.parse(localStorage.getItem('local'));
        const data=new FormData()
        data.append('idUser',temp.user.idUser);
        data.append('noteTitle',fullState.note.noteTitle);
        data.append('noteDesc',fullState.note.noteDesc);

        console.log("here save "+temp.user.idUser+" has title "+fullState.note.noteTitle+" has title "+fullState.note.noteTitle);
        console.log("onsubmit "+localStorage.getItem("method")); 
        {localStorage.getItem("method")=="POST"? setFullState({
                 ...fullState, add: true}): setFullState({
                 ...fullState, update: true})}
        {localStorage.getItem("method")=="POST"? 

        fetch('http://ntrs-backend.herokuapp.com/notes/addNotes', {
            method: 'POST',
            body: data
           
            })
            .then(res =>res.json())
              .then (res => {
                setFullState({
                 ...fullState, add: false, update:false})
                  console.log("result "+JSON.stringify(res));
                if (res.msg === "notes inserted") {
                  console.log("Inserted");
                  alert('note added');
                  setFullState({
                 ...fullState,
                    add: false,
                    update:false
                })
                  handleClose();
                  window.location.reload(true);
                  return;
                //   props.history.push('/reminders');
                } else  {
                    setFullState({
                 ...fullState,
                        add: false,
                        update:false
                    })
                  console.log("Error in inserting");
                }
              })
              .catch (err => {
                setFullState({
                 ...fullState,
                    add: false,
                    update:false
                })
                console.log (err);
              })

           
              :

              console.log("in update "+fullState.idNote);
              fetch('http://ntrs-backend.herokuapp.com/notes/updateNotes/'+fullState.idNote, {
                method: 'PUT',
                // headers: {
                //     'Content-Type': 'application/json',
                //   },
                body: data
                })
                .then(res =>res.json())
                  .then (res => {
                    setFullState({
                 ...fullState, add: false, update:false})
                      console.log("result "+JSON.stringify(res));
                    if (res.msg === "updated") {
                      console.log("updated");
                      alert('note updated');
                      setFullState({
                 ...fullState,
                        add: false,
                        update: false
                    })
                      handleClose();
                      window.location.reload(true);
                    //   props.history.push('/reminders');
                    } else  {
                        setFullState({
                 ...fullState,
                            add: false,
                            update:false
                        })
                        alert('failed to update')
                      console.log("Error in updating");
                    }
                  })
                  .catch (err => {
                    setFullState({
                 ...fullState,
                        add: false,
                        update:false
                    })
                    console.log (err);
                  })
               
        
        }
              
    }

    if(fullState.add || fullState.update || fullState.delete || fullState.get){
        if(fullState.add){
            return(
                <LoadingBar text="Adding Notes..."></LoadingBar>
            )
        }
        else if(fullState.update){
            return(
                <LoadingBar text="Updating Notes..."></LoadingBar>
            )
        }
        else if(fullState.delete){
            return(
                <LoadingBar text="Deleting Notes..."></LoadingBar>
            )
        }
        else{
            return(
                <LoadingBar text="Fetching your Notes..."></LoadingBar>
            )
        }
    }
    else{
        return (
            <div className="noted">
                <Navbar/>
                
                <div className='text-center'>
                <div id="add">
                    <div className="noteAdd">
                        
                        
                        <div onClick={(newFavorite) => {handleShow(); handleSave();}}>
                        <h2>Add New NOTE   {"  "}   <FaRegPlusSquare/></h2>
                        </div>
                        
                    </div>
                    <Modal 
                    // size="sm"
                            className="customModal"
                            show={fullState.note.setShow}
                            onHide={handleClose}
                            backdrop="static"
                            keyboard={false}
                            >
                            {/* <Modal.Header closeButton> */}
                            <p style={{textAlign: 'center',marginTop: '20px'}}>
                            {localStorage.getItem("method")=="POST"? <h2>ADD NOTE</h2>:<h2>EDIT NOTE</h2>}
                
                            </p>
                           
                            
                            <div className="notePopup">
                            <table style={{width:'80%'}}>
                                <tr>
                                    <td style={{fontSize:'18px', fontWeight:'600'}}>Title</td>
                                    <td style={{fontSize:'16px'}}><FormGroup className="form-inline">
                                    <FormControl
                                        type="text"
                                        name="noteTitle"
                                        placeholder="Name"
                                        onChange={handleChange}
                                        value={fullState.note.noteTitle}
                                        className="input col-xl-12"
                                        required
                                        style={{border:'1px solid grey'}}
                                    /> 
                                    </FormGroup> </td>
                                </tr>
                                <tr>
                                    <td style={{fontSize:'18px', fontWeight:'600'}}>Description</td>
                                    <td style={{fontSize:'16px'}}><FormGroup className="form-inline">
                                    <FormControl
                                        // type="textarea"
                                        as="textarea"
                                        name="noteDesc"
                                        placeholder="Desc"
                                        onChange={handleChange}
                                        value={fullState.note.noteDesc}
                                        className="input col-xl-12"
                                        required
                                        style={{border:'1px solid grey'}}
                                    />
                                    </FormGroup> </td>
                                </tr>
                                
                            </table>
                                    
                            </div>

                            <div id="noteBtn" style={{textAlign: 'center'}}>
                            {localStorage.getItem("method")=="POST"?
                            null
                            : <button id="noteBtn3" onClick={handleClose}>Cancel</button>}

                            {localStorage.getItem("method")=="POST"?
                            <button id="noteBtn3" onClick={handleClose}>Cancel</button>
                            : <button id="noteBtn1" onClick={onSubmit}>Update</button>}
                            
                            {localStorage.getItem("method")=="POST"?
                            <button id="noteBtn2"  onClick={onSubmit}>Save</button>
                            : <button id="noteBtn2" onClick={handleDelete}>Delete</button>}
                            </div>
                         
                        </Modal>
                </div>
                <div id="rem-card">
                    <Container style={{marginTop: '50px', display: 'flex', justifyContent : 'center'}}>

                        { fullState.note.notes.map((note, index) => {

                            return(
                                <Row style={{marginRight:'15px', marginLeft:'15px'}}>
                                    <Col xs={10} md={4}>
                                        <div class="noteCard">
                                        <div  onClick={(newFavorite) => { setFullState({...fullState,idNote: note.idNote}); handleShow(); handleEdit(note);}} >
                        
                                            <h4 >{note.noteTitle}</h4>
                                            <p style={{fontSize: '16px'}}>{note.noteDesc}</p>
                                            
                                        </div>
                                        </div>
                                    </Col>
                                </Row>
                            )
                        })

                        }
                        
                            
                    </Container>
                </div>     
                </div>
            </div>

        )
    }
}
export default withRouter(Notes);