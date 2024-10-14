
import { Notifications } from "../../../components/notifications";
import { UserDto, useDeleteUser, useUsers } from "..";
import "@tanstack/react-table";
import { MRT_ColumnDef, MantineReactTable } from "mantine-react-table";
import PaginationControls from "../../../components/Table/PaginationControls";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import TableAction from "../../../components/Table/TableAction";
import { selectPageSize } from "../../../app/PageSlice";

interface UserListTableProps {
  queryFilter?: string | undefined;
}

export function UserListTable({ queryFilter }: UserListTableProps) {
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = useSelector(selectPageSize);

  
  const deleteUserApi = useDeleteUser();
  function deleteUser(id: string) {
    deleteUserApi
      .mutateAsync(id)
      .then(() => {
        Notifications.success("User deleted successfully");
      })
      .catch((e) => {
        Notifications.error("There was an error deleting the user");
        console.error(e);
      });
  }

  const { data: userResponse, isLoading } = useUsers({
    //sortOrder: sorting as SortingState,
    pageSize,
    pageNumber,
    filters: queryFilter,
    hasArtificialDelay: true,
  });
  const userData = userResponse?.data;
  const userPagination = userResponse?.pagination;

  const columns = useMemo<MRT_ColumnDef<UserDto>[]>(
    () => [
    // {
    //     accessorKey: "userId",
    //     id: "userId", // id required if you use accessorFn instead of accessorKey
    //     header: "UserId",
    //     maxSize: 50
    // },
    {
        accessorKey: "username",
        id: "username", // id required if you use accessorFn instead of accessorKey
        header: "Username",
        maxSize: 50
    },
    {
        accessorKey: "password",
        id: "password", // id required if you use accessorFn instead of accessorKey
        header: "Password",
        maxSize: 50
    },
    {
        accessorKey: "role",
        id: "role", // id required if you use accessorFn instead of accessorKey
        header: "Role",
        maxSize: 50
    },
      {
        accessorFn: (originalRow) => {
          return <TableAction 
          data={originalRow}
          consultUrl={`/users/consult/${originalRow.id}`}
          editUrl={`/users/edit/${originalRow.id}`}
          deleteData={ deleteUser }  
          />
        }, //alternate way
        id: 'action', //id required if you use accessorFn instead of accessorKey
        header: 'Action',
        Header: "Action", //optional custom markup
        maxSize: 50
      }
  ],[]);

  return (

<>
    <div style={{
        maxHeight:"calc(100vh - 260px)",
        minHeight: "calc(100vh - 260px)",
        borderBottom: "1px solid #ccc"
        }} className="tiny-scroll">
        <MantineReactTable 
          
          enableFullScreenToggle={false}
          enablePagination={false}
          enableBottomToolbar={false}
          columns={columns}
          data={userData??[]}
          enableRowSelection={false} //enable some features
          enableColumnOrdering={false}
          enableGlobalFilter={false} //turn off a feature
          enableDensityToggle={false}
          enableFilters={false}
          enableColumnActions={false}
          enableColumnDragging={false}
          enableHiding={false}
          initialState={{ density: 'xs' }}
          enableStickyHeader={true}
          state={{isLoading:isLoading}}
          mantineTableContainerProps={{
            sx:{ maxHeight: 'calc(100vh - 265px)', minHeight:"200px", overflow: "auto !important" },
            className:"tiny-scroll"
          }}
          
          mantineTableBodyCellProps={{
            sx:{padding:"0px !important"}
          }}
          
        />
      </div>
        
      <PaginationControls
        pageNumber={pageNumber}
        totalPages={userPagination?.totalPages}
        onPageNumberChange={setPageNumber}
        // onPageSizeChange={setPageSize}
        // pageSize={pageSize}
      /> 
    </>
  );
}