import "./PaginationControls.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from 'react-paginate';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { selectPageSize, setPageSize } from "../../app/PageSlice";
import { EnumPageSize } from "../../types/apis";

const pageSizeList = [1,10,25,50,100] as EnumPageSize[];

interface Props {
  pageNumber?: number;
  onPageNumberChange?: Function;
  totalPages?: number;
}

const PaginationControls = ({
  pageNumber = 1,
  onPageNumberChange = () => {},
  totalPages = 1
}  : Props) => {

  const dispatch = useDispatch();
  const pageSize = useSelector(selectPageSize);
  
  return (
    <div className="paginate">
      <div className="paginate-text">
        Page {pageNumber} sur {totalPages}
      </div>
      <div className="paginate-btns">
        <span>Selectionner</span>
        <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={pageSize}
            onChange={(e)=>{
              onPageNumberChange(1);
              dispatch(setPageSize(e.target.value as EnumPageSize));
            }}
          >
            {pageSizeList.map((size) => (
              <MenuItem value={size} key={size}>{size}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <ReactPaginate
          breakLabel="..."
          nextLabel={<FaChevronRight />}
          onPageChange={(event) => onPageNumberChange(event.selected + 1 )}
          pageRangeDisplayed={4}
          pageCount={totalPages}
          previousLabel={<FaChevronLeft />}
          renderOnZeroPageCount={null}
          pageClassName="page-item"
          marginPagesDisplayed={1}
          nextClassName="invf-nav-arrow next"
          previousClassName="invf-nav-arrow prev"
          activeClassName="active"
        />
      </div>
    </div>
  );
};

export default PaginationControls;
