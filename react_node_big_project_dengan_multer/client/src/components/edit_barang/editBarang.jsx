import React, { Fragment, useState } from "react";

const EditTodo = ({ barang }) => {
    
    const [updateNamaBarang, setupdatenamabarang] = useState(barang.nama_barang);
    const [updateJumlahBarang, setupdatejumlahbarang] = useState(barang.jumlah_barang);
    const [updateHargaBarang, setupdatehargabarang] = useState(barang.harga_barang);
    const [updateIdPenginput, setupdateidpenginput] = useState(barang.id_penginput);

  //edit description function

  const updateBarang = async e => {
    e.preventDefault();
    try {
      const body = {  updateNamaBarang, updateJumlahBarang, updateHargaBarang,updateIdPenginput };
      const response = await fetch(
        `http://localhost:3500/list_barang/${barang.id_barang}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );

      window.location = "/list_barang";
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
        data-bs-target={`#id_barang${barang.id_barang}`}
      >
        Edit
      </button>

      <div
        class="modal"
        id={`id_barang${barang.id_barang}`}
        
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit Barang</h4>
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
                name = "name_barang"
                type="text"
                className="form-control"
                value={updateNamaBarang}
                onChange={e => setupdatenamabarang(e.target.value)}
              />
              <input
                name = "jumlah_barang"
                type="text"
                className="form-control"
                value={updateJumlahBarang}
                onChange={e => setupdatejumlahbarang(e.target.value)}
              />

            <input
                name = "harga_barang"
                type="text"
                className="form-control"
                value={updateHargaBarang}
                onChange={e => setupdatehargabarang(e.target.value)}
              />

            <input
                name = "id_penginput"
                type="text"
                className="form-control"
                value={updateIdPenginput}
                onChange={e => setupdateidpenginput(e.target.value)}
              />    

              
            </div>

            
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-warning"
                data-bs-dismiss="modal"
                onClick={e => updateBarang(e)}
              >
                Edit
              </button>
              <button
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => setBarang(barang.nama_barang)}
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
