import { Button, Alert, ButtonGroup} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import {useEffect, useState } from 'react';
import Auth from '../../Auth';


const ReportList = () => {
    const history = useHistory();

    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [reports, setReports] = useState(null)

    /** Alert related controls */
    const [showAlert, setShowAlert] = useState(false);

    const handleShowAlert = () => {
        setShowAlert(true);
        setTimeout(()=> {
            setShowAlert(false);
        }, 2000)
    }

    useEffect(() => {
        const queryParams = new URLSearchParams({
            reporter: Auth.value()
        })
        const fetchURL = '/api/report/select?' + queryParams.toString()

        fetch(fetchURL)
            .then(res => {
                if (!res.ok) {
                  throw Error('Unable to fetch the data, try to refresh the page or contact the administrator.')  
                } 
                return res.json()
            })
            .then(data => {
                setError(false)
                setReports(data)
            })
            .catch(err => {
                setError(true)
                setErrorMessage(err.message)
            })
    }, [])

    /* useEffect activated during updating the reports state. */ 
    useEffect(() => {
        handleShowAlert()
    }, [reports])

    return (
        <div className="container-xl">
            <div className="table-responsive">
                <div className="table-wrapper">
                    <div className="table-title">
                        <div className="row">
                            <div className="col-sm-6">
                                <h2>Presenting <b>Acceptances</b></h2>
                            </div>
                        </div>
                    </div>

                    <Alert show={showAlert} variant={error ? "danger" : "success"}>
                        {error ? errorMessage : "Acceptances List Updated Succefully!"}
                    </Alert>

                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Project</th>
                                <th>Time Reported</th>
                                <th>Time Accepted</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports &&
                                reports.map(report => (
                                    <tr key={report.Id}>
                                        <td>{report.ProjectId}</td>
                                        <td>{report.TimeReported}</td>
                                        <td>{report.TimeAccepted}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                    <ButtonGroup aria-label="Basic example">
                        <Button variant="secondary" onClick={() => history.push("/home")}>Back</Button>
                    </ButtonGroup>

                </div>
            </div>
        </div>
        )
}

export default ReportList;