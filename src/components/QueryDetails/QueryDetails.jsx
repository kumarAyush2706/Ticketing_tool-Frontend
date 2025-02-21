// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Header from "../Header/Header";

// const QueryDetails = () => {
//   const [query, setQuery] = useState([]);
//   useEffect(() => {
//     const getQuery = async () => {
//       try {
//         const URL = "http://localhost:3000/api/getQuery";
//         const options = {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           Credential: "include",
//         };
//         const response = await fetch(URL, options);
//         const data = await response.json();
//         console.log(data);
//         if (data.success) {
//           setQuery(data.data);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getQuery();
//   }, []);
//   return (
//     <>
//       <Header />
//       <h1>query details page</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>S no.</th>
//             <th>Token ID</th>
//             <th>name</th>
//             <th>Email</th>
//             <th>query</th>
//             <th>Created at</th>
//             {/* <th>Description</th> */}
//           </tr>
//         </thead>
//         <tbody>
//           {query.map((item, index) => {
//             return (
//               <Link to="/description" key={index}>
//                 <tr>
//                   <td>{index + 1}</td>
//                   <td>{item.token}</td>
//                   <td>{item.name}</td>
//                   <td>{item.email}</td>
//                   <td>{item.query}</td>
//                   <td>{item.createdAt}</td>
//                   {/* <td>{item.description}</td> */}
//                 </tr>
//               </Link>
//             );
//           })}
//         </tbody>
//       </table>
//     </>
//   );
// };

// export default QueryDetails;

import { useEffect, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";

const QueryDetails = () => {
  const [query, setQuery] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getQuery = async () => {
      try {
        const URL = "http://localhost:3000/api/getQuery";
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          Credential: "include",
        };
        const response = await fetch(URL, options);
        const data = await response.json();
        console.log(data);
        if (data.success) {
          setQuery(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getQuery();
  }, []);

  const getDateFormat = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  const handleClick = (queryData) => {
    navigate("/description", { state: { queryData } });
  };

  const columns = [
    {
      accessorKey: "name",
      header: "name",
      size: 5,
    },
    {
      accessorKey: "token",
      header: "Token ID ",
      size: 5,
    },
    {
      accessorKey: "email",
      header: "Email",
      size: 5,
    },
    {
      accessorKey: "query",
      header: "query",
      size: 5,
    },
    {
      accessorKey: "description",
      header: "Description",
      size: 5,
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      size: 5,
      accessorFn: (row) => getDateFormat(row.createdAt),
    },

    {
      accessorKey: "status",
      header: "Status",
      size: 5,
    },
    {
      accessorKey: "Action",
      header: "Action",
      size: 5,
      accessorFn: (row) => (
        <button className="edit-button" onClick={() => handleClick(row)}>
          reply
        </button>
      ),
    },
  ];

  const table = useMaterialReactTable({
    data: query,
    columns,
    enableColumnFilters: false,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableColumnActions: false,
    enableHiding: false,
    paginationDisplayMode: "pages",
    muiTablePaperProps: {
      elevation: 0,
    },
    globalFilterFn: "contains",
    muiTableHeadCellProps: {
      align: "center",
    },
    muiTableBodyCellProps: {
      align: "center",
    },
  });

  return (
    <div>
      <Header />
      <div>
        <MaterialReactTable table={table} />
      </div>
    </div>
  );
};

export default QueryDetails;
