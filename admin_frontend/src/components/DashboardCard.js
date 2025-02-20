import {Card} from "react-bootstrap";

const DashboardCard =({cardTitle, cardValue,cardIcon})=>{
    return(
        <>
            <Card style={{ width: '17rem', margin:"10px",height:"10rem"}} className="my-4">
                <Card.Body>
                    <h1 className="lead text-bg-success p-2" style={{marginBottom:"15px"}}>{cardTitle}</h1>
                    <hr/>
                    <div style={{display:"flex",margin:"auto"}}>
                        {cardIcon}
                        <h3 className="display-6" style={{marginLeft:"25px"}}>{cardValue}</h3>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}

export default DashboardCard