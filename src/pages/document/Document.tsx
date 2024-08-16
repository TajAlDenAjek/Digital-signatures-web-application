import { PayCircleOutlined } from "@ant-design/icons";
import CrudTable from "../../components/CrudTable";
import { documentColumns } from "../../constants/columns";
import { fakeDocumentDataSource } from "../../constants/fake";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "antd";
const Document = () => {
    const navigate = useNavigate();

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
            dataSource={fakeDocumentDataSource}
            endpoint="/api/document"
            route={"/document"}
            actions={actions}
            defaultActions={true}
        />
    </>
}

export default Document;