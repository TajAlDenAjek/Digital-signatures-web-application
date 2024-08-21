import { PayCircleOutlined } from "@ant-design/icons";
import CrudTable from "../../components/CrudTable";
import { documentColumns } from "../../constants/columns.tsx";
import { fakeDocumentDataSource } from "../../constants/fake";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "antd";
import { useGetDocumentsQuery, useGetMyDocumentsQuery } from "../../features/documents/documentsApiSlice";
import { selectCurrentPermission } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
const Document = () => {
    const navigate = useNavigate();

    const {data: documents  } = useGetDocumentsQuery({}) ;

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