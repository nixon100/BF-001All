import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import PropTypes from "prop-types"; // Import PropTypes
import { useEffect, useState } from "react";

// Images
import team2 from "assets/images/team-2.jpg";

export default function Data() {
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  // Add PropTypes validation for Author component
  Author.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  };

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  // Add PropTypes validation for Job component
  Job.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  };

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Fetch user data from the API
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("/api/v1/users/users", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setUserData(result.data);
        console.log(result.data);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  return {
    columns: [
      { Header: "author", accessor: "author", width: "45%", align: "left" },
      { Header: "role", accessor: "role", align: "left" },
      { Header: "phonenumber", accessor: "phonenumber", align: "center" },
      { Header: "created", accessor: "employed", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: userData.map((user) => ({
      author: <Author image={team2} name={user.username} email={user.email} />, // Replace with actual image, name, and email
      role: <Job title={user.results.name} description={user.department} />, // Replace with actual role and department
      phonenumber: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {user.phonenumber || "N/A"}
        </MDTypography>
      ),
      employed: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
        </MDTypography>
      ),
      action: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          Edit
        </MDTypography>
      ),
    })),
  };
}
