import React, { useEffect, useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import { apiUrl } from "../utils/constants";
// import Chip from "@material-ui/core/Chip";

const columns = [
  {
    field: "project",
    headerName: "Project",
    flex: 0.2,
    description: "Project",
  },
  {
    field: "start_date",
    headerName: "Start Date",
    flex: 0.2,
    description: "Start Date",
  },
  {
    field: "end_date",
    headerName: "End Date",
    flex: 0.2,
    description: "End Date",
  },
  {
    field: "priority",
    headerName: "Priority",
    flex: 0.2,
    description: "Priority",
  },
  { field: "status", headerName: "Status", flex: 0.2, description: "Status" },
];

const rows = [
  {
    id: 1,
    project: "ToDo App",
    start_date: "11/8/21",
    end_date: "11/12/21",
    priority: "high",
    status: "pending",
  },
  {
    id: 2,
    project: "Color Gen",
    start_date: "1/7/21",
    end_date: "1/08/21",
    priority: "high",
    status: "complete",
  },
  {
    id: 3,
    project: `Inventory`,
    start_date: "3/4/21",
    end_date: "3/5/21",
    priority: "high",
    status: "complete",
  },
  {
    id: 4,
    project: "Ecommerce",
    start_date: "3/4/21",
    end_date: "3/5/21",
    priority: "high",
    status: "complete",
  },
  {
    id: 5,
    project: "Slack 2.0",
    start_date: "3/4/21",
    end_date: "3/5/21",
    priority: "high",
    status: "complete",
  },
  {
    id: 6,
    project: "FB",
    start_date: "3/4/21",
    end_date: "3/5/21",
    priority: "high",
    status: "complete",
  },
];

// const useStyles = makeStyles((theme) => ({}));

const ProjectsTable = () => {
  // const classes = useStyles();
  const [projects, setProjects] = useState({});

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await axios.get(`${apiUrl}/projects`);
        setProjects(response.data);
      } catch (error) { 
        console.error(error);
      }
    };

    loadProjects();
    
  }, []);

  console.log(projects)
  

  return (
    <>
      <div style={{ height: 600, width: "100%" }}>
        
        <DataGrid
          key={(row) => row.id}
          rows={rows}
          columns={columns}
          pageSize={10}
        />
      </div>
    </>
  );
};

export default ProjectsTable;
