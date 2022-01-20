import { Form, Button } from "react-bootstrap"

import {useState, useEffect} from 'react';
import { DateToYYYYMMDD } from "../../DateFormatter";

const EditForm = ({theActivity, editActivity}) =>{

    const [possibleSubActivities, setPossibleSubActivities] = useState(null)

    const [updatedActivity, setUpdatedActivity] = useState(theActivity)

    const onInputChange = (e) => {
        setUpdatedActivity({...updatedActivity,[e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        editActivity(updatedActivity)
    }

    useEffect(() => {

        const queryParams = new URLSearchParams({
            id: theActivity.ProjectId
        })
        const fetchURL = '/api/project/select?' + queryParams.toString()

        fetch(fetchURL)
        .then(res => {
            if (!res.ok) {
              throw Error('Unable to fetch the data, try to refresh the page or contact the administrator')  
            } 
            return res.json()
        })
        .then(data => {
            const subActivities = data[0].Subactivities + ''
            setPossibleSubActivities(subActivities.split(' '))
        })
        .catch(err => {
            setPossibleSubActivities([])
            console.log(err.message)
        })
    }, [theActivity.ProjectId])

     return (
            <>
            {possibleSubActivities &&
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Project"
                            value={updatedActivity.ProjectId}
                            readOnly
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Select name="Subactivity" onChange={(e) => onInputChange(e)} value={updatedActivity.Subactivity}>
                            <option value="">Pick a sub-activity</option>
                            {
                                possibleSubActivities.map(subActivity => (
                                    <option key={subActivity} value={subActivity} label={subActivity} />
                                ))
                            }
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="date"
                            value={DateToYYYYMMDD(new Date(updatedActivity.Date))}
                            readOnly
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="number"
                            name="Time"
                            placeholder="Time"
                            value={updatedActivity.Time}
                            onChange = { (e) => onInputChange(e)}
                            required
                            min="1"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            as="textarea"
                            placeholder="Description"
                            rows={3}
                            name="Description"
                            value={updatedActivity.Description}
                            onChange = { (e) => onInputChange(e)}
                        />
                    </Form.Group>
                    <Button variant="success" type="submit">
                        Save changes
                    </Button>
                </Form>
            }
            </>

     )
}

export default EditForm;