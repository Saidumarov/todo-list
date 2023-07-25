import React, { useState, useEffect } from "react";
import "./input.css";
import img from "../src/assets/oy1.png";
import img1 from "../src/assets/quyosh1.png";

const Input = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [Names, setNames] = useState([]);
  const [search, setSearch] = useState("");
  const [Open, setOpen] = useState(false);

  useEffect(() => {
    const Names1 = JSON.parse(localStorage.getItem("names"));
    if (Names1) {
      setNames(Names1);
    }
  }, []);

  const handlesev = () => {
    const updated = [...Names, { firstName, lastName, age }];
    setNames(updated);
    localStorage.setItem("names", JSON.stringify(updated));
    setFirstName("");
    setLastName("");
    setAge("");
    setOpen(false);
    setModal(false);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const [modal, setModal] = useState();

  const openModal = () => {
    setOpen(true);
    setModal(true);
  };

  const [Color, setColor] = useState();

  useEffect(() => {
    document.body.style.backgroundColor = Color;
  }, [Color]);

  const handleButtonClick = () => {
    setColor((Color) => (Color === "#171923" ? "#171923" : "#171923"));
    document.querySelector("nav").style.backgroundColor = "";
    document.querySelector(".con").style.backgroundColor = "";
    document.querySelectorAll(".res-con").forEach((e) => {
      e.style.backgroundColor = "";
    });
    document.querySelectorAll(".s").forEach((e) => {
      e.style.color = "";
    });
    document.querySelector(".dum").style.backgroundColor = "";
    document.querySelector("modal , h2").style.color = "";
    document.querySelector(".img").style.zIndex = "-1";
    document.querySelector(".img1").style.zIndex = "1";
    document.getElementById('delete').style.backgroundColor = "";
    document.getElementById('edit').style.backgroundColor = "";
  };

  const handleButtonClick1 = () => {
    setColor((Color) => (Color === "white" ? "white" : "white"));
    document.querySelector("nav").style.backgroundColor = "#ebeff1";
    document.querySelector(".con").style.backgroundColor = "#E2E8F0";
    document.querySelectorAll(".res-con").forEach((e) => {
      e.style.backgroundColor = "#F7FAFC";
    });
    document.querySelectorAll(".s").forEach((e) => {
      e.style.color = "#302033";
    });
    document.querySelector("modal , h2").style.color = "#556E8B";
    document.querySelector(".img1").style.zIndex = "-1";
    document.querySelector(".img").style.zIndex = "1";
    document.querySelector(".dum").style.backgroundColor = "rgb(204, 210, 215)";
    document.getElementById('delete').style.backgroundColor = "white";
    document.getElementById('edit').style.backgroundColor = "white";

  };

  const filter = Names.filter(
    ({ firstName, lastName }) =>
      firstName.toLowerCase().includes(search.toLowerCase()) ||
      lastName.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (entry) => {
    setOpen(true);
    setModal(true);
    setFirstName(entry.firstName);
    setLastName(entry.lastName);
    setAge(entry.age);
  };

  const handleDelete = (entryToDelete) => {
    const updatedEntries = Names.filter(
      (entry) =>
        entry.firstName !== entryToDelete.firstName ||
        entry.lastName !== entryToDelete.lastName ||
        entry.age !== entryToDelete.age
    );
    setNames(updatedEntries);
    localStorage.setItem("names", JSON.stringify(updatedEntries));
  };
  return (
    <div>
      <nav>
        <div className="modal">
          <h2>Forms</h2>
          <button onClick={openModal} className="add">
            Add New
          </button>
          <div>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={handleSearch}
              className="search"
            />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <div className="dum">
            <img
              src={img}
              alt=""
              className="img "
              onClick={handleButtonClick}
            />
            <img
              src={img1}
              alt=""
              className="img1"
              onClick={handleButtonClick1}
            />
          </div>
        </div>
      </nav>
      <div className="con">
        {modal && <div className="modall" style={{ display: "block" }}></div>}
        {Open && (
          <div className="modal1">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <button
              onClick={handlesev}
              disabled={!firstName || !lastName || !age}
              className="sav"
            >
              Save
            </button>
          </div>
        )}
        <div className="item-con">
          <div className="bush"></div>
          {filter.map(({ firstName, lastName, age }, index) => (
            <div key={index} className="res-con">
              <div className="pe">
                <p className="p">
                  <span className="span">First Name:</span>
                  <span className="s"> {firstName}</span>
                </p>
              </div>
              <div className="pe1">
                <p className="p1">
                  <span className="span">Last Name:</span>
                  <span className="s"> {lastName}</span>
                </p>
              </div>
              <div className="pe2">
                <p className="p2">
                  <span className="span">Age:</span>{" "}
                  <span className="s">{age}</span>
                </p>
              </div>
              <i class="fa-solid fa-trash"  id="delete"  onClick={() => handleDelete({ firstName, lastName, age })}></i>
              <i class="fa-solid fa-pen-to-square" id="edit"  onClick={() => handleEdit({ firstName, lastName, age })}></i>
            </div>
          ))}
        </div>
        <div className="bush"></div>
      </div>
    </div>
  );
};

export default Input;
