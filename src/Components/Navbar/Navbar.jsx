import "./Navbar.scss";
function Navbar() {
  return (
    <nav className="navbar ps-4 pe-4 justify-content-end ">
      <div className="right">
        {/* <i className="bx bx-cog"></i> */}
        {/* <div className="notification">
          <i className="bx bx-bell"></i>
          <span className="badge">1</span>
        </div> */}
        <img
          src="https://randomuser.me/api/portraits/men/1.jpg"
          alt="User"
          className="profile "
        />
      </div>
    </nav>
  );
}

export default Navbar;
