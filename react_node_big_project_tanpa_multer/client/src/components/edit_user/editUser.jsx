import React, { Fragment, useState } from "react";

const EditTodo = ({ contact }) => {
    const [updatename, setupdatename] = useState(contact.name);
    const [updateemail, setupdateemail] = useState(contact.email);
    const [updatepassword, setupdatepassword] = useState(contact.password);
    const [updaterole, setupdaterole] = useState(contact.role);
    const [updatemobile, setupdatemobile] = useState(contact.mobile);

  //edit description function

  const updateContact = async e => {
    e.preventDefault();
    try {
      const body = { updatename, updateemail, updatepassword, updaterole,updatemobile };
      const response = await fetch(
        `http://localhost:3500/contacts/${contact.username}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );

      window.location = "/contacts";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      
      <button
        type="button"
        class="btn btn-warning"
        data-bs-toggle="modal"
        data-bs-target={`#username${contact.username}`}
      >
        Edit
      </button>

      <div
        class="modal"
        id={`username${contact.username}`}
        
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit Users</h4>
              <button
                type="button"
                class="close"
                data-bs-dismiss="modal"
                
              >
                &times;
              </button>
            </div>

            <div class="modal-body">
              <input
                name = "name"
                type="text"
                className="form-control"
                value={updatename}
                onChange={e => setupdatename(e.target.value)}
              />
              <input
                name = "email"
                type="text"
                className="form-control"
                value={updateemail}
                onChange={e => setupdateemail(e.target.value)}
              />

            <input
                name = "password"
                type="text"
                className="form-control"
                value={updatepassword}
                onChange={e => setupdatepassword(e.target.value)}
              />

            <input
                name = "role"
                type="text"
                className="form-control"
                value={updaterole}
                onChange={e => setupdaterole(e.target.value)}
              />    

              <input
                name= "mobile"
                type="text"
                className="form-control"
                value={updatemobile}
                onChange={e => setupdatemobile(e.target.value)}
              />
            </div>

            
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-warning"
                data-bs-dismiss="modal"
                onClick={e => updateContact(e)}
              >
                Edit
              </button>
              <button
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => setupdatename(contact.name)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditTodo;
