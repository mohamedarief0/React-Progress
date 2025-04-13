import { useEffect, useState } from "react";
import axios from "axios";
import "./Form.css";

export default function Form() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    email: "",
    phone: "",
    city: "",
  });
  const [editing, setEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        setUsers(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(
          `http://localhost:5000/api/users/${formData._id}`,
          formData
        );
        setUsers(
          users.map((user) => (user._id === formData._id ? formData : user))
        );
        setEditing(false);
      } else {
        const response = await axios.post(
          "http://localhost:5000/api/users",
          formData
        );
        setUsers([...users, response.data]);
      }
    } catch (error) {
      console.error("Error creating/updating user:", error);
    }
    setFormData({ id: null, name: "", email: "", phone: "", city: "" });
  };

  const handleEdit = (user) => {
    setFormData(user);
    setEditing(true);
  };

  const confirmDelete = (user) => {
    setDeleteUserId(user._id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!deleteUserId) return;
    try {
      const deleteResponse = await axios.delete(
        `http://localhost:5000/api/users/${deleteUserId}`
      );
      console.log("Delete Response:", deleteResponse.data);
      setUsers(users.filter((user) => user._id !== deleteUserId));
    } catch (error) {
      console.error(
        "Error deleting user:",
        error.response ? error.response.data : error.message
      );
    }
    setShowModal(false);
    setDeleteUserId(null);
  };


  return (
    <>
      <div className="container">
        <h1 className="title">{editing ? "Edit User" : "Create User"}</h1>
        <form className="user-form" onSubmit={handleCreate}>
          <input
            placeholder="Full Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Phone Number"
            name="phone"
            type="text"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            placeholder="City"
            name="city"
            type="text"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <button className="submit-btn" type="submit">
            {editing ? "Update User" : "Create User"}
          </button>
        </form>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id || user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.city}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(user)}>
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => confirmDelete(user)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Do you really want to delete this user?</p>
            <button className="confirm-btn" onClick={handleDelete}>
              Yes
            </button>
            <button className="cancel-btn" onClick={() => setShowModal(false)}>
              No
            </button>
          </div>
        </div>
      )}
    </>
  );
}
