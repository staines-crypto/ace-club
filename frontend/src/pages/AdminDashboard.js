import "./AdminDashboard.css";

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <div className="dashboard-cards">
        <div className="dash-card">Add Technical News</div>
        <div className="dash-card">Add Non-Technical News</div>
        <div className="dash-card">Manage Magazine</div>
        <div className="dash-card">Manage Stories</div>
        <div className="dash-card">Manage Events</div>
        <div className="dash-card">Manage Coordinators</div>
      </div>
    </div>
  );
}

export default AdminDashboard;
