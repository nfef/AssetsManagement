
interface Props  {
  label: string;
  value: any;
}
const FieldDetail = ({label,value}: Props) => {
  return (
    <div className="d-block w-100 form-field col-12 mt-0 p-0">
      {label && <label className="form-label mb-2 " >{label}: </label>}
      <span>
        {value}
      </span>
    </div>
  );
}
export default FieldDetail;