import EditBook from "@/components/editBook/EditBook";

const EditBookPage:React.FC <any> = ({params}) => {
    return ( <EditBook id={params.id}/>);
};

export default EditBookPage;

