import { Modal, Button, Alert, ButtonGroup} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import {useEffect, useState } from 'react';
import Activity from './Activity';
import AddForm from './AddForm';
import PickDateForm from './PickDateForm';
import Auth from '../../Auth';
import { DateToYYYYMMDD } from '../../DateFormatter';

const ActivityList = () => {

    const history = useHistory();

    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [date, setDate] = useState(new Date())

    const handleChangedDate = (newDate) => {
        setDate(newDate)
    }

    const [activitiesDescription, setActivitiesDescription] = useState(null)

    /** Alert related controls */
    const [showAlert, setShowAlert] = useState(false);

    const handleShowAlert = () => {
        setShowAlert(true);
        setTimeout(()=> {
            setShowAlert(false);
        }, 2000)
    }

    /** Add form related controls. */
    const [showAdd, setShowAdd] = useState(false);
    
    const handleShowAdd = () => setShowAdd(true);
    const handleCloseAdd = () => setShowAdd(false);

    /** Pick form related controls */
    const [showPick, setShowPick] = useState(false);

    const handleShowPick = () => setShowPick(true);
    const handleClosePick = () => setShowPick(false);

    /* useEffect activated during updating the activitiesDescription state. */ 
    useEffect(() => {
        handleCloseAdd();
        handleClosePick();

        return () => {
            handleShowAlert();
        }
        
    }, [activitiesDescription])

    const handleErrorOnAction = (err) => {
        setError(true)
        setErrorMessage(err.message)
        handleCloseAdd();
        handleClosePick();
        handleShowAlert();
    }

    /* Fetching the activities description from API */
    useEffect(() => {
        
        const queryParams = new URLSearchParams({
            username: Auth.value(),
            date:     DateToYYYYMMDD(new Date(date))
        })
        const fetchURL = '/api/activity/select?' + queryParams.toString()

        fetch(fetchURL)
            .then(res => {
                if (!res.ok) {
                  throw Error('Unable to fetch the data, try to refresh the page or contact the administrator.')  
                } 
                return res.json()
            })
            .then(data => {
                setError(false)
                setActivitiesDescription(data)
            })
            .catch(err => {
                setError(true)
                setErrorMessage(err.message)
            })

    }, [date])

    const handleAddActivity = (activity) => {
        fetch('/api/activity/add', {
            method: 'POST',
            headers: { "content-type": "application/json; charset=utf-8"},
            body: JSON.stringify(activity)
            })
            .then(res => {
                if (!res.ok) {
                  throw Error('Error occured. Make sure that the month is not being frozen!')  
                } 
                return res.json()
            })
            .then((data) => {
                setError(false)
                if (DateToYYYYMMDD(new Date(date)) === DateToYYYYMMDD(new Date(activity.Date))) {
                    activity["Id"] = data.Id
                    setActivitiesDescription({
                        Active:     activitiesDescription.Active,
                        Activities: activitiesDescription.Activities.concat([activity])
                    })
                } else {
                    handleCloseAdd()
                }
            })
            .catch(err => handleErrorOnAction(err))
    }

    const handleDeleteActivity = (activity) => {
        const queryParams = new URLSearchParams({
            id: activity.Id
        })
        fetch('/api/activity/delete?' + queryParams.toString(), {
            method: 'DELETE',
            })
            .then(res => {
                if (!res.ok) {
                  throw Error('Error occured. Try to refresh the application.')  
                } 
                return res.json()
            })
            .then(() => {
                setError(false)
                setActivitiesDescription({
                    Active:     activitiesDescription.Active,
                    Activities: activitiesDescription.Activities.filter(act => act.Id !== activity.Id)
                })
            })
            .catch(err => handleErrorOnAction(err))
    }

    const handleEditActivity = (activity) => {
        fetch('/api/activity/update', {
            method: 'PUT',
            headers: { "content-type": "application/json; charset=utf-8"},
            body: JSON.stringify(activity)
            })
            .then(res => {
                if (!res.ok) {
                  throw Error('Error occured. Try to refresh the application.')  
                } 
                return res.json()
            })
            .then(() => {
                setError(false)
                const activities = Array.from(activitiesDescription.Activities)
                const oldActivity = activities.find(act => act.Id === activity.Id)
                const indexOfOldActivity = activities.indexOf(oldActivity) 
                activities[indexOfOldActivity] = activity
                setActivitiesDescription({
                    Active:     activitiesDescription.Active,
                    Activities: activities
                })
            })
            .catch(err => handleErrorOnAction(err))
    }

    return (
        <div className="container-xl">
            <div className="table-responsive">
                <div className="table-wrapper">
                    <div className="table-title">
                        <div className="row">
                            <div className="col-sm-6">
                                <h2>Manage <b>Activities</b></h2>
                            </div>
                            <div className="col-sm-6">
                                <Button onClick={handleShowAdd} className="btn btn-success" data-toggle="modal"><i className="material-icons">add</i> <span>Add New Activity</span></Button>
                                <Button onClick={handleShowPick} className="btn btn-success" data-toggle="modal"><i className="material-icons">event</i> <span>Pick a Date</span></Button>
                            </div>
                        </div>
                    </div>

                    <Alert show={showAlert} variant={error ? "danger" : "success"}>
                        {error ? errorMessage : "Activity List Updated Succefully!"}
                    </Alert>

                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Project</th>
                                <th>Sub-Activity</th>
                                <th>Time</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activitiesDescription &&
                                activitiesDescription.Activities.map(activity => (
                                    <tr key={activity.Id}>
                                        {<Activity
                                            activity={activity}
                                            active={activitiesDescription.Active}
                                            deleteActivity={handleDeleteActivity}
                                            editActivity={handleEditActivity}
                                        />}
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                    <ButtonGroup aria-label="Basic example">
                        <Button variant="secondary" onClick={() => history.push("/home")}>Back</Button>
                    </ButtonGroup>

                    {/** Add activity modal */}
                    <Modal show={showAdd} onHide={handleCloseAdd}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Add Activity
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <AddForm addActivity={handleAddActivity} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseAdd}>
                                Close Button
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    {/** Pick date modal */}
                    <Modal show={showPick} onHide={handleClosePick}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Choose Activities Date
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <PickDateForm changeDate={handleChangedDate} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClosePick}>
                                Close Button
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default ActivityList;