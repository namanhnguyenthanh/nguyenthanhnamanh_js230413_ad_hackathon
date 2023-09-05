import React, { useEffect, useState } from "react";
import axios from "axios";

function UserInterface() {
  const [editAct, setEdiAct] = useState(false);
  const [id, setId] = useState("");
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    name: "",
    description: "",
  });
  const loadData = () => {
    axios
      .get("http://localhost:6001/api/v1/users")
      .then((res) => setUsers(res.data.users))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    loadData();
  }, [users]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  //add user
  const handleCreate = async () => {
    await axios.post("http://localhost:6001/api/v1/users", user);
    loadData();
  };

  //update user
  const handleEdit = async (id) => {
    setId(id);
    setEdiAct(true);
    await axios
      .get(`http://localhost:6001/api/v1/users/${id}`)
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => console.log(err));
  };
  const dandleUpdate = async () => {
    await axios.patch(`http://localhost:6001/api/v1/users/${id}`, user);
    loadData();
  };

  //delete user
  const handleDel = (idDel) => {
    axios.delete(`http://localhost:6001/api/v1/users/${idDel}`);
    loadData();
  };
  const { name, description } = user;
  return (
    <>
      <div className="container mt-3" style={{ width: "680px" }}>
        <button
          className="btn btn-success my-3 "
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => setEdiAct(false)}
        >
          Create
        </button>
        <h2 className="w-100 text-center">Student list</h2>
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col" style={{ width: "200px" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <th scope="row">{user.id}</th>
                <td>{user.name}</td>
                <td>{user.description}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => handleEdit(user.id)}
                  >
                    edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDel(user.id)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <>
        {/* Modal */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Modal title
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="recipient-name" className="col-form-label">
                      Name:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="recipient-name"
                      name="name"
                      value={name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message-text" className="col-form-label">
                      Description:
                    </label>
                    <textarea
                      className="form-control"
                      id="message-text"
                      type="text"
                      name="description"
                      value={description}
                      onChange={handleChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                {editAct ? (
                  <button
                    type="button"
                    className="btn btn-warning"
                    data-bs-dismiss="modal"
                    onClick={() => dandleUpdate()}
                  >
                    Update
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-success"
                    data-bs-dismiss="modal"
                    onClick={() => handleCreate()}
                  >
                    Create
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default UserInterface;
