import { PayCircleOutlined } from "@ant-design/icons";
import CrudTable from "../../components/CrudTable";
import { documentColumns } from "../../constants/columns.tsx";
import { fakeDocumentDataSource } from "../../constants/fake";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "antd";
import { useGetDocumentsQuery } from "../../features/documents/documentsApiSlice";
const Document = () => {
    const navigate = useNavigate();
    const {data: documents , isLoading } = useGetDocumentsQuery({}) ;

    const actions: any[] = [
        {
            title:
                <Tooltip title='Payment'>
                    <PayCircleOutlined style={{ fontSize: '150%', color: 'gold' }} />
                </Tooltip>,
            handler(record: any) {
                navigate(`/document/${record.id}/payment`);
            }
        }
    ]
    console.log('documents',documents) 

    return <>
        <CrudTable
            columns={documentColumns}
            dataSource={documents}
            route={"/document"}
            actions={actions}
            defaultActions={['view','edit','delete']}
        />
    </>
}

export default Document;