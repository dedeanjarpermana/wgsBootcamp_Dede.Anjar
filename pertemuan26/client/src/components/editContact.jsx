import React, { Fragment, useState } from "react";

const EditTodo = ({ contact }) => {
  const [updatename, setupdatename] = useState(contact.name);
  const [updateemail, setupdateemail] = useState(contact.email);
  const [updatemobile, setupdatemobile] = useState(contact.mobile);

  //edit description function

  const updateContact = async e => {
    e.preventDefault();
    try {
      const body = { updatename, updateemail, updatemobile };
      const response = await fetch(
        `http://localhost:3000/contacts/${contact.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );

      window.location = "/";
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
        data-bs-target={`#id${contact.id}`}
      >
        Edit
      </button>

      <div
        class="modal"
        id={`id${contact.id}`}
        
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit Contact</h4>
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
                onClick={() => setName(contact.name)}
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
